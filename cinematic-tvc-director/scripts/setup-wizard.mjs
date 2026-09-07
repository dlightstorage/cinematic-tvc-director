import * as prompts from './lib/prompts.mjs';
import { existsSync } from 'node:fs';
import { ROLES } from './lib/roles.mjs';
import {
  configLocation,
  defaultConfig,
  loadConfig,
  validateConfig,
  writeConfig,
} from './lib/config.mjs';
import { discover } from './lib/adapter.mjs';

const GROUPS = Object.freeze([
  { id: 'strategy', label: 'Strategy, concept and story', roles: ['creative', 'research', 'treatment', 'storyboard'] },
  { id: 'picture', label: 'Picture and production world', roles: ['dop', 'colorist', 'production-design'] },
  { id: 'performance', label: 'Casting and performance', roles: ['casting', 'wardrobe', 'makeup', 'voice'] },
  { id: 'post', label: 'Edit, VFX and sound', roles: ['editor', 'vfx', 'sound'] },
  { id: 'control', label: 'Continuity, production and locks', roles: ['continuity', 'producer', 'production-bible'] },
  { id: 'generation', label: 'AI media prompt packages', roles: ['image-prompts', 'video-prompts', 'sfx-prompts', 'vo-prompts', 'motion-prompts', 'music-prompts'] },
]);

class Cancelled extends Error {}

function answer(value) {
  if (prompts.isCancel(value)) throw new Cancelled();
  return value;
}

function sameBinding(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function roleBinding(config, roleId) {
  return roleId === 'director' ? config.orchestrator : config.roles[roleId] || config.default;
}

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

export function renderDiscovery(report) {
  const rows = report.discovered.map(item => [
    item.key,
    item.authenticated === true ? 'ready' : item.authenticated === false ? 'login needed' : 'unknown',
    item.models?.status || 'unknown',
    item.models?.values?.length || 0,
    item.version || 'unknown',
  ]);
  if (!rows.length) rows.push(['none', 'not ready', 'none', 0, 'Install a provider CLI first']);
  return table(['Provider', 'Account', 'Models', '#', 'Version'], rows, [10, 12, 8, 3, 23]);
}

export function renderCrewTable(config, basis = {}) {
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
      profileIds.get(JSON.stringify(binding)),
      binding.implementer,
      basis[item.id] || basis.default || 'default binding',
    ];
  });
  return [
    table(['ID', 'Provider', 'Exact model', 'Reasoning'], profileRows, [3, 10, 31, 16]),
    '',
    table(['Advertising role/task', 'Profile', 'Provider', 'Basis'], rows, [22, 7, 10, 22]),
  ].join('\n');
}

function providerEntries(report, existing) {
  const entries = [...report.discovered];
  for (const key of Object.keys(existing?.customProviders || {})) if (!entries.some(item => item.key === key)) {
    entries.push({ key, version: 'custom relay', authenticated: null, models: { status: 'unsupported', values: [] }, supports: ['model', 'effort'] });
  }
  return entries;
}

function modelOptions(entry, current) {
  const values = [...new Set([...(current?.model ? [current.model] : []), ...(entry.models?.values || [])])];
  const options = values.map(value => ({ value, label: value }));
  if (entry.key !== 'opencode') options.unshift({ value: '', label: 'Use provider default' });
  return options;
}

async function chooseBinding(entry, current = {}, pace = 'balanced') {
  const options = modelOptions(entry, current);
  let model = '';
  if (options.length) {
    model = answer(await prompts.select({
      message: `Model for ${entry.key}`,
      options,
      initialValue: current.model || (entry.key === 'opencode' ? options[0]?.value : ''),
    }));
  } else if (entry.supports.includes('model')) {
    model = answer(await prompts.text({
      message: `Exact model ID for ${entry.key}`,
      placeholder: entry.key === 'opencode' ? 'provider/model (required)' : 'Leave blank for provider default',
      initialValue: current.model || '',
      validate: value => entry.key === 'opencode' && !/^[^/]+\/.+/.test(value || '') ? 'OpenCode requires provider/model.' : undefined,
    }));
  }
  const binding = { implementer: entry.key, ...(model ? { model } : {}) };
  const dialName = entry.supports.includes('variant') ? 'variant' : entry.supports.includes('effort') ? 'effort' : null;
  if (dialName) {
    const preferred = current[dialName] || (pace === 'fast' ? 'low' : pace === 'thorough' ? 'high' : 'medium');
    const dial = answer(await prompts.select({
      message: `${dialName === 'variant' ? 'Thinking variant' : 'Thinking effort'} for ${entry.key}`,
      options: [
        { value: '', label: 'Use provider default' },
        { value: 'low', label: 'Low - fast / light' },
        { value: 'medium', label: 'Medium - balanced' },
        { value: 'high', label: 'High - thorough' },
        ...(entry.key === 'codex' ? [{ value: 'xhigh', label: 'XHigh - heavy' }, { value: 'max', label: 'Max - heaviest' }] : []),
      ],
      initialValue: preferred,
    }));
    if (dial) binding[dialName] = dial;
  }
  return binding;
}

function assignGroup(config, groupId, binding, basis, label) {
  const group = GROUPS.find(item => item.id === groupId);
  for (const roleId of group.roles) {
    setRoleBinding(config, roleId, binding);
    basis[roleId] = label;
  }
}

function assignBalancedGroups(config, providerOrder, profiles, basis, label) {
  const order = providerOrder.filter((key, index) => profiles[key] && providerOrder.indexOf(key) === index);
  GROUPS.forEach((group, index) => {
    const provider = order[index % order.length];
    assignGroup(config, group.id, profiles[provider], basis, `${label}: ${provider}`);
  });
}

function usageTable(report) {
  return table(['Provider', 'Sessions', 'Last used'], report.discovered.map(item => [
    item.key,
    item.usage?.sessions ?? 'unknown',
    item.usage?.lastUsed || 'unknown',
  ]), [12, 8, 28]);
}

async function interview(enabled) {
  const critical = answer(await prompts.select({
    message: 'Which advertising work matters most in your usual projects?',
    options: GROUPS.map(group => ({ value: group.id, label: group.label })),
  }));
  const burn = answer(await prompts.multiselect({
    message: 'Which subscriptions should this crew actively use?',
    options: enabled.map(key => ({ value: key, label: key })),
    required: false,
  }));
  const spare = answer(await prompts.multiselect({
    message: 'Which subscriptions should the crew protect or use sparingly?',
    options: enabled.map(key => ({ value: key, label: key })),
    required: false,
  }));
  const trusted = answer(await prompts.select({
    message: 'Which provider do you trust for critical creative review?',
    options: [{ value: '', label: 'No preference' }, ...enabled.map(key => ({ value: key, label: key }))],
  }));
  const pace = answer(await prompts.select({
    message: 'Default working style',
    options: [
      { value: 'fast', label: 'Fast and economical' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'thorough', label: 'Slow and thorough' },
    ],
    initialValue: 'balanced',
  }));
  return { critical, burn, spare, trusted, pace };
}

function baseProposal(existing, enabled, defaultBinding, directorBinding) {
  const config = existing ? structuredClone(existing) : defaultConfig(defaultBinding.implementer, defaultBinding.model);
  config.enabled = [...enabled];
  config.default = structuredClone(defaultBinding);
  config.orchestrator = structuredClone(directorBinding);
  config.roles = {};
  config.workflowMode ||= 'original';
  config.authority ||= 'ask';
  config.concurrency ||= 3;
  config.maxRounds ||= 2;
  config.timeoutSeconds ||= 1200;
  return config;
}

async function productionSettings(config) {
  config.workflowMode = answer(await prompts.select({
    message: 'Production workflow',
    options: [
      { value: 'original', label: 'Original - all six stages and 155 decisions' },
      { value: 'focused', label: 'Focused - deliberately narrow work' },
    ],
    initialValue: config.workflowMode,
  }));
  config.authority = answer(await prompts.select({
    message: 'Who owns unresolved creative choices?',
    options: [
      { value: 'ask', label: 'Ask me before locking major choices' },
      { value: 'director', label: 'Let the director decide inside the brief' },
    ],
    initialValue: config.authority,
  }));
  config.concurrency = Number(answer(await prompts.select({
    message: 'Maximum parallel department runs',
    options: [1, 2, 3, 4, 6, 8].map(value => ({ value, label: String(value) })),
    initialValue: config.concurrency,
  })));
  config.maxRounds = Number(answer(await prompts.select({
    message: 'Maximum review and revision rounds',
    options: [1, 2, 3, 4, 5].map(value => ({ value, label: String(value) })),
    initialValue: config.maxRounds,
  })));
  config.timeoutSeconds = Number(answer(await prompts.select({
    message: 'Timeout for each model run',
    options: [600, 1200, 1800, 3600].map(value => ({ value, label: `${value / 60} minutes` })),
    initialValue: config.timeoutSeconds,
  })));
}

async function editProposal(config, basis, entries, profiles) {
  const action = answer(await prompts.select({
    message: 'Review the proposed TVC fleet',
    options: [
      { value: 'approve', label: 'Approve this table' },
      { value: 'role', label: 'Modify one role' },
      { value: 'group', label: 'Modify a department group' },
      { value: 'settings', label: 'Modify production settings' },
      { value: 'restart', label: 'Restart setup' },
      { value: 'cancel', label: 'Cancel without saving' },
    ],
  }));
  if (action === 'role') {
    const roleId = answer(await prompts.select({
      message: 'Role to modify',
      options: Object.values(ROLES).map(item => ({ value: item.id, label: `${item.id} - ${item.name}` })),
    }));
    const provider = answer(await prompts.select({
      message: `Provider for ${roleId}`,
      options: config.enabled.map(key => ({ value: key, label: key })),
      initialValue: roleBinding(config, roleId).implementer,
    }));
    const entry = entries.find(item => item.key === provider);
    const binding = await chooseBinding(entry, roleBinding(config, roleId));
    profiles[provider] = binding;
    setRoleBinding(config, roleId, binding);
    basis[roleId] = 'your modification';
  } else if (action === 'group') {
    const groupId = answer(await prompts.select({
      message: 'Department group to modify',
      options: GROUPS.map(group => ({ value: group.id, label: group.label })),
    }));
    const provider = answer(await prompts.select({
      message: `Provider for ${GROUPS.find(item => item.id === groupId).label}`,
      options: config.enabled.map(key => ({ value: key, label: key })),
    }));
    const entry = entries.find(item => item.key === provider);
    const binding = await chooseBinding(entry, profiles[provider] || {});
    profiles[provider] = binding;
    assignGroup(config, groupId, binding, basis, 'your group choice');
  } else if (action === 'settings') await productionSettings(config);
  return action;
}

export async function interactiveSetup({ cwd = process.cwd() } = {}) {
  try {
    prompts.intro('Cinematic TVC Director - fleet setup');
    const spin = prompts.spinner();
    spin.start('Discovering installed agent CLIs and model access');
    let report = await discover();
    spin.stop(`Found ${report.discovered.length} installed provider CLI(s)`);
    const location = configLocation(cwd);
    const existing = existsSync(location.path) ? loadConfig(cwd) : null;
    prompts.note(renderDiscovery(report), 'Discovery');
    if (existing) prompts.note(renderCrewTable(existing, { default: location.source }), `Current ${location.source} fleet`);

    while (true) {
      const mode = answer(await prompts.select({
        message: 'How should the TVC crew be prepared?',
        options: [
          { value: 'quick', label: 'Quick defaults', hint: 'I propose a complete crew' },
          { value: 'interview', label: 'Interview', hint: 'Ask about workload, subscriptions and quality' },
          { value: 'usage', label: 'Usage scan', hint: 'Session counts and dates only; never reads chats' },
          ...(existing ? [{ value: 'keep', label: 'Keep current fleet', hint: 'Review or edit it before saving' }] : []),
        ],
      }));
      if (mode === 'usage') {
        spin.start('Counting local session metadata without reading conversations');
        report = await discover({ usage: true });
        spin.stop('Usage metadata scan complete');
        prompts.note(usageTable(report), 'Usage metadata');
      }
      const entries = providerEntries(report, existing);
      if (!entries.length) throw new Error('No provider CLI was found. Install Codex, Claude, OpenCode or another supported CLI, then rerun setup.');
      const initialEnabled = existing?.enabled?.filter(key => entries.some(item => item.key === key)) || entries.filter(item => item.authenticated !== false).map(item => item.key);
      const enabled = answer(await prompts.multiselect({
        message: 'Select the provider CLIs this advertising crew may use',
        options: entries.map(item => ({
          value: item.key,
          label: item.key,
          hint: item.authenticated === true ? 'ready' : item.authenticated === false ? 'login required' : 'authentication unknown',
        })),
        initialValues: initialEnabled.length ? initialEnabled : [entries[0].key],
        required: true,
      }));

      let interviewAnswers = { pace: 'balanced', burn: [], spare: [], trusted: '', critical: 'strategy' };
      if (mode === 'interview') interviewAnswers = await interview(enabled);
      const enabledEntries = entries.filter(item => enabled.includes(item.key));
      const defaultProvider = answer(await prompts.select({
        message: 'Default provider for unassigned departments',
        options: enabled.map(key => ({ value: key, label: key })),
        initialValue: enabled.includes(existing?.default?.implementer) ? existing.default.implementer : enabled[0],
      }));
      const directorProvider = answer(await prompts.select({
        message: 'Top-level director / orchestrator',
        options: enabled.map(key => ({ value: key, label: key })),
        initialValue: enabled.includes(existing?.orchestrator?.implementer) ? existing.orchestrator.implementer : defaultProvider,
      }));

      const profiles = {};
      for (const entry of enabledEntries) {
        const current = entry.key === existing?.orchestrator?.implementer ? existing.orchestrator
          : entry.key === existing?.default?.implementer ? existing.default : {};
        profiles[entry.key] = await chooseBinding(entry, current, interviewAnswers.pace);
      }
      const config = mode === 'keep' && existing ? structuredClone(existing)
        : baseProposal(existing, enabled, profiles[defaultProvider], profiles[directorProvider]);
      config.enabled = [...enabled];
      config.default = structuredClone(profiles[defaultProvider]);
      config.orchestrator = structuredClone(profiles[directorProvider]);
      for (const [roleId, binding] of Object.entries(config.roles || {})) {
        if (!enabled.includes(binding.implementer)) delete config.roles[roleId];
      }
      const basis = { default: mode === 'quick' ? 'quick default' : mode === 'usage' ? 'usage-informed' : mode === 'keep' ? 'existing' : 'interview' };
      basis.director = 'your orchestrator choice';

      if (mode !== 'keep') {
        if (mode === 'quick') {
          assignBalancedGroups(config, enabled, profiles, basis, 'quick assignment');
          assignGroup(config, 'control', profiles[directorProvider], basis, 'director review gate');
        } else if (mode === 'interview') {
          const interviewOrder = [
            ...interviewAnswers.burn,
            ...enabled.filter(key => !interviewAnswers.burn.includes(key) && !interviewAnswers.spare.includes(key)),
            ...interviewAnswers.spare,
          ];
          assignBalancedGroups(config, interviewOrder, profiles, basis, 'interview assignment');
          const criticalProvider = interviewAnswers.trusted && !interviewAnswers.spare.includes(interviewAnswers.trusted)
            ? interviewAnswers.trusted : directorProvider;
          assignGroup(config, interviewAnswers.critical, profiles[criticalProvider], basis, 'interview: critical work');
          const burnProvider = interviewAnswers.burn.find(key => !interviewAnswers.spare.includes(key));
          if (burnProvider) assignGroup(config, 'generation', profiles[burnProvider], basis, 'interview: burn quota');
          assignGroup(config, 'control', profiles[directorProvider], basis, 'independent control gate');
        } else if (mode === 'usage') {
          const ranked = report.discovered.filter(item => enabled.includes(item.key) && item.usage).sort((a, b) => a.usage.sessions - b.usage.sessions);
          const usageOrder = [...ranked.map(item => item.key), ...enabled];
          assignBalancedGroups(config, usageOrder, profiles, basis, 'usage-balanced');
          assignGroup(config, 'control', profiles[directorProvider], basis, 'director review gate');
        }
      }
      await productionSettings(config);
      validateConfig(config);

      let restart = false;
      while (true) {
        prompts.note(renderCrewTable(config, basis), 'Proposed advertising fleet');
        const action = await editProposal(config, basis, entries, profiles);
        if (action === 'restart') { restart = true; break; }
        if (action === 'cancel') throw new Cancelled();
        if (action !== 'approve') continue;
        const scope = answer(await prompts.select({
          message: 'Where should this approved crew apply?',
          options: [
            { value: 'global', label: 'Global - all TVC projects on this machine' },
            { value: 'project', label: `Project - ${cwd}` },
          ],
          initialValue: location.source,
        }));
        config.setup = { version: 'tvc-fleet-setup.v1', mode, scope, approvedAt: new Date().toISOString(), basis };
        validateConfig(config);
        prompts.note(JSON.stringify(config, null, 2), 'Exact configuration to write');
        const approved = answer(await prompts.confirm({ message: 'Write this exact fleet configuration?', initialValue: true }));
        if (!approved) continue;
        const path = writeConfig(config, { scope, cwd });
        prompts.outro(`Fleet approved and saved to ${path}. Run tvc studio to start a commercial.`);
        return { saved: path, scope, config };
      }
      if (!restart) break;
    }
    return null;
  } catch (error) {
    if (error instanceof Cancelled) {
      prompts.cancel('Setup cancelled. No settings were written.');
      return null;
    }
    throw error;
  }
}

export { GROUPS, assignBalancedGroups };
