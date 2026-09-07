#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFileSync, existsSync, cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { stdin, stdout } from 'node:process';
import {
  defaultConfig,
  validateConfig,
  writeConfig,
  writeEffectiveConfig,
  loadConfig,
  configPath,
  configLocation,
  globalConfigPath,
  projectConfigPath,
  listRoles,
  IMPLEMENTERS,
} from './lib/config.mjs';
import { ROLES, CREWS, role } from './lib/roles.mjs';
import { discover, invoke, parseObject } from './lib/adapter.mjs';
import { readJSON, atomicJSON, createProject, loadProject, saveProject, withProjectLock, now, inside } from './lib/store.mjs';
import { makePlan, runProject, debate, exportProject, changeEntity, invalidate, validateDeliverable } from './lib/engine.mjs';
import { installSkill, installProvider } from './lib/install.mjs';
import { answerGate, productionSignature } from './lib/workflow.mjs';
import { refreshCatalog, catalog, estimateTokens } from './lib/catalog.mjs';
import { plans } from './lib/plans.mjs';
import { migrateLegacy } from './lib/migrate.mjs';
import { interactiveSetup } from './setup-wizard.mjs';

const help = `Cinematic TVC Director 0.6.0

  tvc onboard                       Open first-run account and crew setup
  tvc setup                         Account choice, automatic preset and approval wizard
  tvc setup --provider codex [--model MODEL] [--enable LIST] [--scope global|project]
  tvc doctor                         Discover installed CLIs, auth and models
  tvc providers list                 Bundled relay catalog
  tvc providers install NAME         Install codex, claude or agy via vendor installer
  tvc providers add NAME --relay /absolute/custom.mjs
  tvc models --provider NAME         Discover available model IDs
  tvc catalog refresh [openrouter|modelsdev]
  tvc catalog list [--search TEXT] [--band free|economy|standard|premium] [--size compact|medium|large] [--limit N]
  tvc catalog estimate MODEL --input-tokens N --output-tokens N
  tvc plans [PROVIDER]               Subscription/API access guide (no purchase)
  tvc roles                          Show role bindings
  tvc assign ROLE --provider NAME [--model MODEL] [--effort LEVEL]
  tvc configure [--workflow original|focused] [--authority ask|director] [--concurrency N] [--max-rounds N]
  tvc studio                         Open the visual crew configuration Studio
  tvc studio --terminal              Open the classic terminal control room
  tvc skills attach ROLE PATH        Attach another skill folder to a role
  tvc install-skill --host codex|claude|agents [--target PATH] [--update]

  tvc init DIRECTORY --brief FILE    Create a production project
  tvc migrate DIRECTORY --brief FILE Import an original Markdown-only project state
  tvc plan                          Have the selected director plan the work
  tvc extend --deliverables LIST     Add generation deliverables without restarting
  tvc generation authorize --file QUOTE.json --yes
  tvc approve plan                   Approve the saved execution plan
  tvc decisions                      Show required user decisions
  tvc approve ID --value TEXT        Answer a decision
  tvc run [--retry-failed]            Execute the plan, reconcile, independently review
  tvc resume [--retry-failed]         Resume from saved project state
  tvc status                         Inspect tasks, failures and review state
  tvc change --entity ID --value TEXT --reason TEXT
  tvc revise TASK --instruction TEXT Request a bounded targeted revision
  tvc debate --brief FILE --roles creative,dop
  tvc crew departments --brief FILE  Create a blind crew plan for an approved packet
  tvc export                         Export the approved production package
  tvc assets add --file MANIFEST     Register a generated asset and its master row
  tvc use-config                     Apply saved model bindings to this project

Project commands use the current directory or --project PATH.
--json produces machine-readable output. Plans and model runs are persisted locally.
`;

const strings = ['provider','model','enable','effort','variant','project','brief','value','entity','reason','instruction','roles','host','target','relay','file','authority','concurrency','max-rounds','timeout','workflow','search','band','size','input-tokens','output-tokens','deliverables','limit','offset','scope','port'];
const options = Object.fromEntries(strings.map(key => [key, { type: 'string' }]));
for (const key of ['help','json','retry-failed','yes','update','terminal','no-open']) options[key] = { type: 'boolean' };
const { values: flags, positionals } = parseArgs({ options, allowPositionals: true });
const [command, subcommand, argument] = positionals;
const root = resolve(flags.project || process.cwd());
function show(value) { stdout.write(typeof value === 'string' && !flags.json ? `${value}\n` : `${JSON.stringify(value, null, 2)}\n`); }
function required(value, message) { if (!value) throw new Error(message); return value; }
const progress = event => {
  if (flags.json) process.stderr.write(`${JSON.stringify(event)}\n`);
  else process.stderr.write(`${event.event}: ${event.task}${event.binding ? ` [${event.binding.implementer}${event.binding.model ? ` / ${event.binding.model}` : ''}]` : ''}${event.error ? ` - ${event.error}` : ''}\n`);
};
function applyDials(config) {
  if (flags.authority) config.authority = flags.authority;
  if (flags.concurrency) config.concurrency = Number(flags.concurrency);
  if (flags['max-rounds']) config.maxRounds = Number(flags['max-rounds']);
  if (flags.timeout) config.timeoutSeconds = Number(flags.timeout);
  if (flags.workflow) config.workflowMode = flags.workflow;
  return config;
}
async function setup() {
  const scope = flags.scope || configLocation(root).source;
  required(['global', 'project'].includes(scope), 'scope must be global or project.');
  const scopedPath = scope === 'project' ? projectConfigPath(root) : globalConfigPath();
  const existing = existsSync(scopedPath) ? (scope === 'project' ? loadConfig(root) : loadConfig())
    : existsSync(globalConfigPath()) ? loadConfig() : null;
  let config;
  if (flags.provider) {
    config = existing ? structuredClone(existing) : defaultConfig(flags.provider, flags.model);
    config.default = { implementer: flags.provider, ...(flags.model ? { model: flags.model } : {}) };
    config.enabled = [...new Set([...(flags.enable ? flags.enable.split(',').map(s => s.trim()) : config.enabled), flags.provider])];
  } else {
    required(stdin.isTTY, 'For non-interactive setup pass --provider NAME and optional --model.');
    return interactiveSetup({ cwd: root });
  }
  config = applyDials(config);
  const saved = writeConfig(config, { scope, cwd: root });
  show({ saved, scope, config });
}
function summary(state) {
  return { name: state.name, stage: state.stage, workflow: state.workflow?.mode, phase: state.workflow?.phase, plan: state.plan,
    tasks: state.tasks.map(t => ({ id: t.id, role: t.role, status: t.status, dependsOn: t.dependsOn, entities: t.entities, error: t.error })),
    pending: state.decisions.filter(d => d.status === 'pending'), pendingRevisions: state.pendingRevisions || [],
    reviews: Object.fromEntries(Object.entries(state.reviews).map(([id, r]) => [id, { verdict: r.verdict, summary: r.summary }])) };
}
async function projectAction(fn) {
  return withProjectLock(root, async () => {
    const state = loadProject(root);
    validateConfig(state.config);
    const result = await fn(state);
    saveProject(root, state);
    if (result !== undefined) show(result);
  });
}
async function main() {
  if (!command || command === 'help' || flags.help) return show(help);
  if (command === 'setup') return setup();
  if (command === 'doctor') {
    const report = await discover();
    if (existsSync(configPath(root))) {
      const config = loadConfig(root);
      const unavailable = config.enabled.filter(id => !config.customProviders[id] && !report.discovered.some(d => d.key === id && d.authenticated !== false));
      report.enabledUnavailable = unavailable;
      if (unavailable.length) process.exitCode = 1;
    }
    return show(report);
  }
  if (command === 'models') {
    const report = await discover();
    return show(flags.provider ? report.discovered.find(d => d.key === flags.provider)?.models || { status: 'unavailable' } : report.discovered.map(d => ({ provider: d.key, ...d.models })));
  }
  if (command === 'catalog') {
    if (subcommand === 'refresh') return show(await refreshCatalog(argument || 'openrouter'));
    if (subcommand === 'list' || !subcommand) {
      const result = catalog({ source: argument, search: flags.search, band: flags.band, size: flags.size, provider: flags.provider });
      const limit = flags.limit === undefined ? 50 : Number(flags.limit), offset = Number(flags.offset || 0);
      required(Number.isSafeInteger(limit) && limit >= 1 && limit <= 500 && Number.isSafeInteger(offset) && offset >= 0, 'limit must be 1..500 and offset must be nonnegative.');
      return show({ ...result, matched: result.models.length, offset, limit, models: result.models.slice(offset, offset + limit) });
    }
    if (subcommand === 'estimate') {
      const result = catalog({ search: required(argument, 'Specify a model ID.') });
      const model = result.models.find(m => m.id === argument);
      required(model, 'Model is not in the cached catalog. Refresh it first.');
      return show({ model: model.id, advertisedPricing: { input: model.input, output: model.output },
        estimate: estimateTokens(model, Number(flags['input-tokens']), Number(flags['output-tokens'])) });
    }
    throw new Error('Unknown catalog command.');
  }
  if (command === 'plans') return show(plans(subcommand));
  if (command === 'onboard') {
    const module = await import('./studio.mjs');
    const port = flags.port === undefined ? 0 : Number(flags.port);
    required(Number.isInteger(port) && port >= 0 && port <= 65535, 'port must be 0..65535.');
    return show(await module.onboard({ port, openBrowser: !flags['no-open'] }));
  }
  if (command === 'studio') {
    if (flags.terminal) {
      const module = await import('./terminal-studio.mjs');
      return show(await module.terminalStudio());
    }
    const module = await import('./studio.mjs');
    const port = flags.port === undefined ? 0 : Number(flags.port);
    required(Number.isInteger(port) && port >= 0 && port <= 65535, 'port must be 0..65535.');
    return show(await module.studio({ port, openBrowser: !flags['no-open'] }));
  }
  if (command === 'providers') {
    if (subcommand === 'list' || !subcommand) return show(IMPLEMENTERS.map(i => ({ id: i.key, binary: i.binary, supports: i.supports, verification: 'upstream-relay; local live status documented separately' })));
    if (subcommand === 'install') return show(await installProvider(required(argument, 'Specify provider name.')));
    if (subcommand === 'add') {
      const config = loadConfig(root);
      required(argument, 'Specify custom provider name.');
      config.customProviders[argument] = { relay: resolve(required(flags.relay, 'Pass --relay /path/provider.mjs')) };
      config.enabled = [...new Set([...config.enabled, argument])];
      writeEffectiveConfig(config, root); return show({ added: argument });
    }
    throw new Error('Unknown providers command.');
  }
  if (command === 'roles') return show(existsSync(configPath(root)) ? listRoles(loadConfig(root)) : Object.values(ROLES));
  if (command === 'assign') {
    role(subcommand);
    const config = loadConfig(root);
    const binding = { implementer: required(flags.provider, 'Pass --provider NAME'),
      ...Object.fromEntries(['model','effort','variant'].filter(k => flags[k]).map(k => [k, flags[k]])) };
    config.enabled = [...new Set([...config.enabled, binding.implementer])];
    if (subcommand === 'director') config.orchestrator = binding; else config.roles[subcommand] = binding;
    writeEffectiveConfig(config, root); return show({ role: subcommand, binding, projectNote: 'Existing projects retain their snapshot; apply with tvc use-config.' });
  }
  if (command === 'configure') { const config = applyDials(loadConfig(root)); writeEffectiveConfig(config, root); return show(config); }
  if (command === 'skills' && subcommand === 'attach') {
    const config = loadConfig(root); role(argument);
    const path = resolve(required(positionals[3], 'Pass a skill folder path.'));
    config.skills[argument] = [...new Set([...(config.skills[argument] || []), path])];
    writeEffectiveConfig(config, root); return show({ role: argument, attached: path });
  }
  if (command === 'install-skill') return show(installSkill(flags.host, flags.target, flags.update));
  if (command === 'init') {
    const dir = resolve(required(subcommand, 'Pass a project directory.'));
    const brief = readFileSync(required(flags.brief, 'Pass --brief FILE'), 'utf8');
    required(brief.trim(), 'Brief cannot be empty.');
    return show(summary(createProject(dir, basename(dir), brief, loadConfig(dir))));
  }
  if (command === 'migrate') {
    const dir = resolve(required(subcommand, 'Pass the legacy project directory.'));
    const brief = readFileSync(required(flags.brief, 'Pass --brief FILE'), 'utf8');
    return show(migrateLegacy(dir, brief, loadConfig(dir)));
  }
  if (command === 'status') return show(summary(loadProject(root)));
  if (command === 'decisions') return show(loadProject(root).decisions);
  if (command === 'plan') return projectAction(async state => { await makePlan(root, state, progress); return summary(state); });
  if (command === 'approve') return projectAction(state => {
    if (subcommand === 'plan') {
      required(state.plan, 'No plan to approve.'); state.plan.approved = true; state.plan.approvedAt = now();
      const amendment = state.plan.amendments?.at(-1); if (amendment) { amendment.approved = true; amendment.approvedAt = now(); }
    }
    else {
      const decision = state.decisions.find(d => d.id === subcommand && d.status === 'pending');
      required(decision, 'No pending decision with that ID.');
      decision.value = required(flags.value, 'Pass --value TEXT'); decision.status = 'answered'; decision.answeredAt = now();
      answerGate(state, decision, decision.value);
      if (decision.lockKey) state.locks[decision.lockKey] = decision.value;
      // A user answer can change a premise used by any existing deliverable.
      if (state.tasks.some(t => t.output)) invalidate(state, state.tasks.map(t => t.id), `User decision ${decision.id}: ${decision.value}`);
      state.reviewRound = 0;
    }
    return summary(state);
  });
  if (command === 'run' || command === 'resume') return projectAction(async state => {
    await runProject(root, state, { retryFailed: flags['retry-failed'], onProgress: progress });
    if (['failed','review-failed','revision-limit','provider-blocked','interrupted'].includes(state.stage)) process.exitCode = 1;
    return summary(state);
  });
  if (command === 'extend') return projectAction(state => {
    required(state.plan, 'Plan the project first.');
    const requested = required(flags.deliverables, 'Pass --deliverables image-prompts,video-prompts,...').split(',').map(s => s.trim()).filter(Boolean);
    const allowed = new Set(['image-prompts','video-prompts','sfx-prompts','vo-prompts','motion-prompts','music-prompts']);
    required(requested.length && requested.every(id => allowed.has(id)), `Generation choices: ${[...allowed].join(', ')}`);
    const bible = state.tasks.find(t => t.role === 'production-bible' && t.status === 'completed');
    required(bible, 'Complete the production bible before extending into generation prompts.');
    const added = [];
    const bilingual = /both|arabic.*english|english.*arabic|عربي.*إنجليزي|انجليزي.*عربي/i.test(state.locks.language || '');
    for (const roleId of requested) {
      const variants = roleId === 'vo-prompts' && bilingual ? [['vo-prompts-ar', 'ar'], ['vo-prompts-en', 'en']] : [[roleId, 'neutral']];
      for (const [id, language] of variants) if (!state.tasks.some(t => t.id === id)) {
        state.tasks.push({ id, role: roleId, language, brief: `Build the complete ${roleId} package from locked production${language === 'neutral' ? '' : ` as an independent ${language} pass`}.`,
          dependsOn: [bible.id], entities: ['*'], status: 'pending', attempts: [], revision: 1, output: null }); added.push(id);
      }
    }
    required(added.length, 'All requested generation deliverables already exist.');
    state.plan.amendments ||= [];
    state.plan.amendments.push({ at: now(), added, approved: false }); state.plan.approved = false; state.stage = 'plan-approval';
    return { added, instruction: 'Review the amended task list, then run tvc approve plan.' };
  });
  if (command === 'use-config') return projectAction(state => { state.config = loadConfig(root); return { applied: true, note: 'Completed artifacts keep their recorded model provenance.' }; });
  if (command === 'change') return projectAction(state => {
    const affected = changeEntity(state, required(flags.entity, 'Pass --entity ID'), required(flags.value, 'Pass --value TEXT'), required(flags.reason, 'Pass --reason TEXT'));
    return { affected, stage: state.stage };
  });
  if (command === 'revise') return projectAction(state => {
    required(state.tasks.some(t => t.id === subcommand), 'Unknown task ID.');
    const affected = invalidate(state, [subcommand], required(flags.instruction, 'Pass --instruction TEXT'));
    state.reviewRound = 0; state.pendingRevisions = [];
    return { affected };
  });
  if (command === 'debate') return projectAction(async state => {
    const brief = readFileSync(required(flags.brief, 'Pass --brief FILE'), 'utf8');
    return debate(root, state, brief, (flags.roles || 'creative,dop').split(','), progress);
  });
  if (command === 'crew') return projectAction(state => {
    required(Object.hasOwn(CREWS, subcommand), `Crew choices: ${Object.keys(CREWS).join(', ')}`);
    required(!state.tasks.length, 'Use a fresh project for a standalone crew pass.');
    const brief = readFileSync(required(flags.brief, 'Pass --brief approved-packet.md'), 'utf8');
    state.plan = { approved: false, summary: `${subcommand} crew pass`, createdAt: now() };
    state.tasks = CREWS[subcommand].map(id => ({ id, role: id, language: 'neutral', brief, dependsOn: [], entities: ['*'],
      status: 'pending', attempts: [], revision: 1, output: null }));
    state.stage = 'plan-approval'; return summary(state);
  });
  if (command === 'export') return projectAction(state => ({ file: exportProject(root, state) }));
  if (command === 'generation' && subcommand === 'authorize') return projectAction(state => {
    required(flags.yes, 'Review the quote, then repeat with --yes for explicit spend authorization.');
    required(state.stage === 'complete', 'Generation authorization requires a completed handoff gate.');
    const quote = readJSON(required(flags.file, 'Pass --file QUOTE.json'));
    for (const key of ['id','modality','model','resolution','duration','currency']) required(typeof quote[key] === 'string' && quote[key].trim(), `Quote requires ${key}.`);
    required(Number.isFinite(quote.estimatedCost) && quote.estimatedCost >= 0, 'Quote requires a nonnegative numeric estimatedCost.');
    required(!state.generationApprovals?.some(a => a.id === quote.id), 'Generation quote ID already exists.');
    state.generationApprovals ||= [];
    state.generationApprovals.push({ ...quote, status: 'approved', productionSignature: productionSignature(state), approvedAt: now(),
      disclaimer: 'Estimate only. Provider billing is authoritative; this command does not execute or purchase generation.' });
    return { approved: quote.id, estimatedCost: quote.estimatedCost, currency: quote.currency };
  });
  if (command === 'assets' && subcommand === 'add') return projectAction(state => {
    const asset = readJSON(required(flags.file, 'Pass --file asset.json'));
    for (const key of ['id','type','model','url','entity','row']) required(typeof asset[key] === 'string' && asset[key].trim(), `Asset requires ${key}.`);
    required(/^[a-zA-Z0-9_-]+$/.test(asset.id), 'Asset id must be letters, digits, underscore or hyphen.');
    required(!state.assets.some(a => a.id === asset.id), 'Asset already registered.');
    required(/^(https?:\/\/|\/|[a-zA-Z]:[\\/])/.test(asset.url), 'Asset URL must be HTTP(S) or an absolute local path.');
    const row = (state.masterRows || []).find(r => r.entity === asset.entity && r.row === asset.row);
    required(row, 'Asset must reference an entity/row emitted by the approved production-bible masterRows ledger.');
    const batch = required(asset.batch, 'Asset requires batch, linked to an approved generation authorization.');
    required(state.generationApprovals?.some(a => a.id === batch && a.status === 'approved' && a.productionSignature === productionSignature(state)), 'Generation batch is not explicitly approved for the current production revision.');
    state.assets.push({ ...asset, status: asset.status || 'generated', productionRevision: state.briefRevision, recordedAt: now() });
    row.assets ||= []; row.assets.push(asset.id);
    const tables = join(root, 'master-tables'); mkdirSync(tables, { recursive: true });
    atomicJSON(join(tables, 'generated-assets.json'), state.assets);
    atomicJSON(join(tables, 'production-rows.json'), state.masterRows);
    return { registered: asset.id, masterRow: { entity: asset.entity, row: asset.row } };
  });
  throw new Error(`Unknown command: ${command}. Run tvc help.`);
}
main().catch(error => { process.stderr.write(`tvc: ${error.message}\n`); process.exitCode = 1; });
