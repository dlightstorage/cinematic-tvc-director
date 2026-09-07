import * as prompts from './lib/prompts.mjs';
import { existsSync } from 'node:fs';
import { ROLES } from './lib/roles.mjs';
import { configLocation, loadConfig, validateConfig, writeConfig } from './lib/config.mjs';
import { discover } from './lib/adapter.mjs';
import { installProvider } from './lib/install.mjs';
import { ACCOUNT_MODES, buildRecommendedConfig } from './lib/tvc-presets.mjs';
import { CORE_PROVIDERS, loginProvider, providerRecord, providerState, loginCommand } from './lib/accounts.mjs';

const GROUPS = Object.freeze([
  { id: 'strategy', label: 'Strategy, concept and story', roles: ['creative', 'research', 'treatment', 'storyboard'] },
  { id: 'picture', label: 'Picture and production world', roles: ['dop', 'colorist', 'production-design'] },
  { id: 'performance', label: 'Casting and performance', roles: ['casting', 'wardrobe', 'makeup', 'voice'] },
  { id: 'post', label: 'Edit, VFX and sound', roles: ['editor', 'vfx', 'sound'] },
  { id: 'control', label: 'Continuity, production and locks', roles: ['continuity', 'producer', 'production-bible'] },
  { id: 'generation', label: 'AI media prompt packages', roles: ['image-prompts', 'video-prompts', 'sfx-prompts', 'vo-prompts', 'motion-prompts', 'music-prompts'] },
]);

class Cancelled extends Error {}
class SetupRequired extends Error {}

function answer(value) {
  if (prompts.isCancel(value)) throw new Cancelled();
  return value;
}

function sameBinding(left, right) { return JSON.stringify(left) === JSON.stringify(right); }
function roleBinding(config, roleId) { return roleId === 'director' ? config.orchestrator : config.roles[roleId] || config.default; }
function setRoleBinding(config, roleId, binding) {
  const copy = structuredClone(binding);
  if (roleId === 'director') config.orchestrator = copy;
  else if (sameBinding(copy, config.default)) delete config.roles[roleId];
  else config.roles[roleId] = copy;
}

function clip(value, width) {
  const text = String(value ?? '');
  return text.length <= width ? text : `${text.slice(0, Math.max(1, width - 3))}...`;
}

function table(headers, rows, widths) {
  const line = `+-${widths.map(width => '-'.repeat(width)).join('-+-')}-+`;
  const row = values => `| ${values.map((value, index) => clip(value, widths[index]).padEnd(widths[index])).join(' | ')} |`;
  return [line, row(headers), line, ...rows.map(row), line].join('\n');
}

function readableProviderState(report, key) { return providerState(report, key).replaceAll('-', ' '); }

export function renderDiscovery(report) {
  const rows = CORE_PROVIDERS.map(key => {
    const item = providerRecord(report, key);
    return [key === 'codex' ? 'Codex' : 'Claude', readableProviderState(report, key), item?.models?.values?.length || 0, item?.version || 'not installed'];
  });
  return table(['Account', 'Status', 'Models', 'CLI version'], rows, [10, 19, 6, 27]);
}

export function renderCrewTable(config, basis = {}, complexity = {}) {
  const ordered = Object.values(ROLES);
  const profiles = [];
  const profileIds = new Map();
  for (const item of ordered) {
    const binding = roleBinding(config, item.id);
    const key = JSON.stringify(binding);
    if (!profileIds.has(key)) {
      const id = `M${profiles.length + 1}`;
      profileIds.set(key, id);
      profiles.push({ id, binding });
    }
  }
  const profileRows = profiles.map(({ id, binding }) => {
    const dial = binding.effort ? `effort:${binding.effort}` : binding.variant ? `variant:${binding.variant}` : 'provider default';
    return [id, binding.implementer, binding.model || 'provider default', dial];
  });
  const rows = ordered.map(item => {
    const binding = roleBinding(config, item.id);
    return [
      item.id === 'director' ? '* director' : item.id,
      complexity[item.id] || 'custom',
      binding.implementer,
      profileIds.get(JSON.stringify(binding)),
      item.references.length,
      basis[item.id] || basis.default || 'Manual configuration',
    ];
  });
  return [
    table(['ID', 'Provider', 'Exact model', 'Reasoning'], profileRows, [3, 10, 31, 16]),
    '',
    table(['Advertising role', 'Level', 'Provider', 'ID', 'Refs', 'Purpose'], rows, [18, 6, 8, 3, 4, 17]),
  ].join('\n');
}

export function renderProductionSummary(config, accountMode) {
  return table(['Setting', 'Selected value', 'Why'], [
    ['Account mode', ACCOUNT_MODES[accountMode]?.label || accountMode, 'Your only required choice'],
    ['Workflow', config.workflowMode, 'Full six-stage TVC process'],
    ['Decision authority', config.authority, 'Major choices return to you'],
    ['Parallel runs', config.concurrency, 'Safe production throughput'],
    ['Review rounds', config.maxRounds, 'Bounded quality refinement'],
    ['Run timeout', `${config.timeoutSeconds / 60} minutes`, 'Allows long creative passes'],
  ], [20, 19, 27]);
}

function accountModeFor(config) {
  const hasCodex = config?.enabled?.includes('codex');
  const hasClaude = config?.enabled?.includes('claude');
  if (hasCodex && hasClaude) return 'dual';
  if (hasClaude) return 'claude';
  return 'codex';
}

function accountHint(report, providers) { return providers.map(key => `${key}: ${readableProviderState(report, key)}`).join(', '); }

async function rediscover(spin, message) {
  spin.start(message);
  const report = await discover();
  spin.stop('Account check complete');
  return report;
}

async function ensureAccounts(providers, initialReport, spin) {
  let report = initialReport;
  for (const provider of providers) {
    let entry = providerRecord(report, provider);
    if (!entry) {
      prompts.note(
        `${provider === 'codex' ? 'Codex' : 'Claude'} CLI is not installed. The official installer will run; account authorization remains with the provider.`,
        'CLI installation required',
      );
      const install = answer(await prompts.confirm({ message: `Install ${provider} CLI now?`, initialValue: true }));
      if (!install) throw new SetupRequired(`No settings changed. Install later with: tvc providers install ${provider}`);
      await installProvider(provider);
      report = await rediscover(spin, `Checking ${provider} after installation`);
      entry = providerRecord(report, provider);
    }
    if (!entry) throw new SetupRequired(`The ${provider} CLI is still unavailable. Open a fresh terminal and run tvc setup again.`);
    if (entry.authenticated !== true) {
      prompts.note(
        'A provider-owned browser or terminal sign-in will open. This skill never reads or stores your password or API key.',
        `${provider === 'codex' ? 'Codex' : 'Claude'} sign-in`,
      );
      const signIn = answer(await prompts.confirm({ message: `Sign in to ${provider} now?`, initialValue: true }));
      if (!signIn) throw new SetupRequired(`No settings changed. Sign in later with: ${loginCommand(provider).label}`);
      await loginProvider(provider, report);
      report = await rediscover(spin, `Verifying ${provider} account access`);
      entry = providerRecord(report, provider);
      if (entry?.authenticated !== true) {
        throw new SetupRequired(`${provider} is not ready yet. Complete sign-in with: ${loginCommand(provider).label}, then rerun tvc setup.`);
      }
    }
  }
  return report;
}

function modelOptions(entry, current) {
  const values = [...new Set([...(current?.model ? [current.model] : []), ...(entry.models?.values || [])])];
  return [{ value: '', label: 'Use provider default' }, ...values.map(value => ({ value, label: value }))];
}

async function chooseBinding(entry, current = {}) {
  const model = answer(await prompts.select({ message: `Model for ${entry.key}`, options: modelOptions(entry, current), initialValue: current.model || '' }));
  const binding = { implementer: entry.key, ...(model ? { model } : {}) };
  if (entry.supports.includes('effort')) {
    const effort = answer(await prompts.select({
      message: `Reasoning effort for ${entry.key}`,
      options: [
        { value: '', label: 'Use provider default' },
        { value: 'low', label: 'Low - routine role' },
        { value: 'medium', label: 'Medium - standard production role' },
        { value: 'high', label: 'High - complex creative role' },
        ...(entry.key === 'codex' ? [
          { value: 'xhigh', label: 'XHigh - director-level reasoning' },
          { value: 'max', label: 'Max - exceptional final review' },
        ] : []),
      ],
      initialValue: current.effort || '',
    }));
    if (effort) binding.effort = effort;
  }
  return binding;
}

function representativeProfiles(config) {
  const bindings = [config.orchestrator, config.default, ...Object.values(config.roles || {})];
  return Object.fromEntries(config.enabled.map(provider => [
    provider,
    structuredClone(bindings.find(binding => binding.implementer === provider) || { implementer: provider }),
  ]));
}

function assignGroup(config, groupId, binding, basis, label) {
  const group = GROUPS.find(item => item.id === groupId);
  for (const roleId of group.roles) {
    setRoleBinding(config, roleId, binding);
    basis[roleId] = label;
  }
}

async function productionSettings(config) {
  prompts.section('3A / 4', 'Production Controls', 'Change only what your workflow genuinely needs.');
  config.workflowMode = answer(await prompts.select({
    message: 'Production workflow',
    options: [
      { value: 'original', label: 'Original', hint: 'all six stages and 155 decisions' },
      { value: 'focused', label: 'Focused', hint: 'deliberately narrow production' },
    ],
    initialValue: config.workflowMode,
  }));
  config.authority = answer(await prompts.select({
    message: 'Unresolved creative decisions',
    options: [
      { value: 'ask', label: 'Ask me', hint: 'recommended for client-facing work' },
      { value: 'director', label: 'Director decides', hint: 'inside the approved brief only' },
    ],
    initialValue: config.authority,
  }));
  config.concurrency = Number(answer(await prompts.select({ message: 'Parallel department runs', options: [1, 2, 3, 4, 6, 8].map(value => ({ value, label: String(value) })), initialValue: config.concurrency })));
  config.maxRounds = Number(answer(await prompts.select({ message: 'Maximum review rounds', options: [1, 2, 3, 4, 5].map(value => ({ value, label: String(value) })), initialValue: config.maxRounds })));
  config.timeoutSeconds = Number(answer(await prompts.select({ message: 'Timeout for each model run', options: [600, 1200, 1800, 3600].map(value => ({ value, label: `${value / 60} minutes` })), initialValue: config.timeoutSeconds })));
}

async function editProposal(config, basis, report, profiles) {
  const action = answer(await prompts.select({
    message: 'What would you like to do?',
    options: [
      { value: 'approve', label: 'Approve recommended crew' },
      { value: 'role', label: 'Change one advertising role' },
      { value: 'group', label: 'Change a department group' },
      { value: 'settings', label: 'Change production controls' },
      { value: 'technical', label: 'View technical configuration' },
      { value: 'restart', label: 'Change account choice' },
      { value: 'cancel', label: 'Cancel without saving' },
    ],
  }));
  if (action === 'role') {
    const roleId = answer(await prompts.select({ message: 'Advertising role to change', options: Object.values(ROLES).map(item => ({ value: item.id, label: `${item.id} - ${item.name}` })) }));
    const provider = answer(await prompts.select({ message: `Provider for ${roleId}`, options: config.enabled.map(key => ({ value: key, label: key })), initialValue: roleBinding(config, roleId).implementer }));
    const entry = providerRecord(report, provider);
    const current = roleBinding(config, roleId);
    const binding = await chooseBinding(entry, current.implementer === provider ? current : profiles[provider]);
    profiles[provider] = binding;
    setRoleBinding(config, roleId, binding);
    basis[roleId] = 'Your manual role override';
  } else if (action === 'group') {
    const groupId = answer(await prompts.select({ message: 'Department group to change', options: GROUPS.map(group => ({ value: group.id, label: group.label })) }));
    const provider = answer(await prompts.select({ message: `Provider for ${GROUPS.find(item => item.id === groupId).label}`, options: config.enabled.map(key => ({ value: key, label: key })) }));
    const entry = providerRecord(report, provider);
    const binding = await chooseBinding(entry, profiles[provider]);
    profiles[provider] = binding;
    assignGroup(config, groupId, binding, basis, 'Your department override');
  } else if (action === 'settings') await productionSettings(config);
  else if (action === 'technical') prompts.note(JSON.stringify(config, null, 2), 'Technical configuration preview');
  return action;
}

export async function interactiveSetup({ cwd = process.cwd() } = {}) {
  try {
    prompts.intro('CINEMATIC TVC DIRECTOR', 'Professional advertising crew setup - choose accounts, review, approve.');
    const spin = prompts.spinner();
    let report = await rediscover(spin, 'Checking Codex and Claude on this machine');
    const location = configLocation(cwd);
    const existing = existsSync(location.path) ? loadConfig(cwd) : null;

    setupLoop: while (true) {
      prompts.section('1 / 4', 'Choose Your AI Accounts', 'No model or technical setup is required at this stage.');
      prompts.note(renderDiscovery(report), 'Account readiness');
      if (existing) prompts.note(`A ${location.source} crew already exists. It remains unchanged until final approval.`, 'Safe update');
      const accountMode = answer(await prompts.select({
        message: 'Which accounts will produce this advertising work?',
        options: [
          { value: 'codex', label: 'Codex only', hint: accountHint(report, ['codex']) },
          { value: 'dual', label: 'Codex + Claude', hint: accountHint(report, ['codex', 'claude']) },
          { value: 'claude', label: 'Claude only', hint: accountHint(report, ['claude']) },
        ],
        initialValue: accountModeFor(existing),
      }));
      report = await ensureAccounts(ACCOUNT_MODES[accountMode].providers, report, spin);

      prompts.section('2 / 4', 'Advertising Preset', 'Models and effort are assigned automatically by role complexity.');
      spin.start('Building the recommended 24-role production crew');
      const { config, basis, complexity } = buildRecommendedConfig({ accountMode, report, existing });
      validateConfig(config);
      spin.stop('Advertising preset ready');
      prompts.note(renderProductionSummary(config, accountMode), 'Production settings');
      const profiles = representativeProfiles(config);

      while (true) {
        prompts.section('3 / 4', 'Review Your Crew', 'Every role can be changed before anything is saved.');
        prompts.note(renderCrewTable(config, basis, complexity), 'Recommended advertising crew');
        const action = await editProposal(config, basis, report, profiles);
        if (action === 'restart') continue setupLoop;
        if (action === 'cancel') throw new Cancelled();
        if (action !== 'approve') continue;

        const scope = answer(await prompts.select({
          message: 'Where should this approved crew apply?',
          options: [
            { value: 'global', label: 'Global', hint: 'all TVC projects on this machine' },
            { value: 'project', label: 'This project only', hint: cwd },
          ],
          initialValue: location.source,
        }));
        config.setup = { version: 'tvc-fleet-setup.v2', preset: 'advertising-expert.v1', accountMode, scope, approvedAt: new Date().toISOString(), basis, complexity };
        validateConfig(config);

        prompts.section('4 / 4', 'Final Approval', 'The configuration is written only after your confirmation.');
        prompts.note(renderProductionSummary(config, accountMode), 'Approved settings');
        prompts.note(
          `Director: ${config.orchestrator.implementer} / ${config.orchestrator.model || 'provider default'} / ${config.orchestrator.effort || 'provider effort'}\nRoles: ${Object.keys(ROLES).length}\nRole references: ${Object.values(ROLES).reduce((total, role) => total + role.references.length, 0)}\nScope: ${scope}`,
          'Save summary',
        );
        const approved = answer(await prompts.confirm({ message: 'Save and activate this advertising crew?', initialValue: true }));
        if (!approved) continue;
        const path = writeConfig(config, { scope, cwd });
        prompts.outro(`Crew activated at ${path}. Run tvc studio whenever you want to edit it visually.`);
        return { saved: path, scope, config };
      }
    }
  } catch (error) {
    if (error instanceof Cancelled || error instanceof SetupRequired) {
      prompts.cancel(error.message || 'Setup cancelled. No settings were written.');
      return null;
    }
    throw error;
  }
}

export { GROUPS };
