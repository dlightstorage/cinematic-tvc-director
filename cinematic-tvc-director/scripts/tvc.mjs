#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFileSync, existsSync, cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { defaultConfig, validateConfig, writeConfig, loadConfig, configPath, listRoles, IMPLEMENTERS } from './lib/config.mjs';
import { ROLES, CREWS, role } from './lib/roles.mjs';
import { discover, invoke, parseObject } from './lib/adapter.mjs';
import { readJSON, atomicJSON, createProject, loadProject, saveProject, withProjectLock, now, inside } from './lib/store.mjs';
import { makePlan, runProject, debate, exportProject, changeEntity, invalidate, validateDeliverable } from './lib/engine.mjs';
import { installSkill, installProvider } from './lib/install.mjs';

const help = `Cinematic TVC Director 0.1.0

  tvc setup [--provider codex] [--model MODEL] [--enable codex,claude,agy]
  tvc doctor                         Discover installed CLIs, auth and models
  tvc providers list                 Bundled relay catalog
  tvc providers install NAME         Install codex, claude or agy via vendor installer
  tvc providers add NAME --relay /absolute/custom.mjs
  tvc models --provider NAME         Discover available model IDs
  tvc roles                          Show role bindings
  tvc assign ROLE --provider NAME [--model MODEL] [--effort LEVEL]
  tvc configure [--authority ask|director] [--concurrency N] [--max-rounds N]
  tvc skills attach ROLE PATH        Attach another skill folder to a role
  tvc install-skill --host codex|claude|agents [--target PATH]

  tvc init DIRECTORY --brief FILE    Create a production project
  tvc plan                          Have the selected director plan the work
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

const strings = ['provider','model','enable','effort','variant','project','brief','value','entity','reason','instruction','roles','host','target','relay','file','authority','concurrency','max-rounds','timeout'];
const options = Object.fromEntries(strings.map(key => [key, { type: 'string' }]));
for (const key of ['help','json','retry-failed','yes']) options[key] = { type: 'boolean' };
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
  return config;
}
async function setup() {
  if (existsSync(configPath())) throw new Error('Config already exists. Use assign/configure/providers add to update it.');
  let config;
  if (flags.provider) {
    config = defaultConfig(flags.provider, flags.model);
    if (flags.enable) config.enabled = [...new Set([flags.provider, ...flags.enable.split(',').map(s => s.trim())])];
  } else {
    required(stdin.isTTY, 'For non-interactive setup pass --provider NAME and optional --model.');
    const report = await discover();
    show({ installed: report.discovered.map(d => ({ name: d.key, authenticated: d.authenticated, models: d.models })) });
    const terminal = createInterface({ input: stdin, output: stdout });
    try {
      const enabled = (await terminal.question('Enable tools (comma-separated, e.g. codex,claude,agy): ')).split(',').map(s => s.trim()).filter(Boolean);
      required(enabled.length, 'Select at least one tool.');
      const provider = (await terminal.question(`Default crew tool [${enabled[0]}]: `)).trim() || enabled[0];
      const model = (await terminal.question('Default model ID (blank uses tool settings): ')).trim();
      config = defaultConfig(provider, model); config.enabled = enabled;
      const orchestrator = (await terminal.question(`Director tool [${provider}]: `)).trim() || provider;
      const directorModel = (await terminal.question('Director model ID (blank uses tool settings): ')).trim();
      config.orchestrator = { implementer: orchestrator, ...(directorModel ? { model: directorModel } : {}) };
      if (!config.enabled.includes(orchestrator)) config.enabled.push(orchestrator);
      config.authority = (await terminal.question('Creative decision authority [ask / director] (ask): ')).trim() || 'ask';
      validateConfig(config);
      show(config);
      const answer = (await terminal.question('Save these settings? [y/N]: ')).trim().toLowerCase();
      if (answer !== 'y') return show('Setup cancelled.');
    } finally { terminal.close(); }
  }
  writeConfig(applyDials(config));
  show({ saved: configPath(), config });
}
function summary(state) {
  return { name: state.name, stage: state.stage, plan: state.plan,
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
    if (existsSync(configPath())) {
      const config = loadConfig();
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
  if (command === 'providers') {
    if (subcommand === 'list' || !subcommand) return show(IMPLEMENTERS.map(i => ({ id: i.key, binary: i.binary, supports: i.supports, verification: 'upstream-relay; local live status documented separately' })));
    if (subcommand === 'install') return show(await installProvider(required(argument, 'Specify provider name.')));
    if (subcommand === 'add') {
      const config = loadConfig();
      required(argument, 'Specify custom provider name.');
      config.customProviders[argument] = { relay: resolve(required(flags.relay, 'Pass --relay /path/provider.mjs')) };
      config.enabled = [...new Set([...config.enabled, argument])];
      writeConfig(config); return show({ added: argument });
    }
    throw new Error('Unknown providers command.');
  }
  if (command === 'roles') return show(existsSync(configPath()) ? listRoles(loadConfig()) : Object.values(ROLES));
  if (command === 'assign') {
    role(subcommand);
    const config = loadConfig();
    const binding = { implementer: required(flags.provider, 'Pass --provider NAME'),
      ...Object.fromEntries(['model','effort','variant'].filter(k => flags[k]).map(k => [k, flags[k]])) };
    config.enabled = [...new Set([...config.enabled, binding.implementer])];
    if (subcommand === 'director') config.orchestrator = binding; else config.roles[subcommand] = binding;
    writeConfig(config); return show({ role: subcommand, binding, projectNote: 'Existing projects retain their snapshot; apply with tvc use-config.' });
  }
  if (command === 'configure') { const config = applyDials(loadConfig()); writeConfig(config); return show(config); }
  if (command === 'skills' && subcommand === 'attach') {
    const config = loadConfig(); role(argument);
    const path = resolve(required(positionals[3], 'Pass a skill folder path.'));
    config.skills[argument] = [...new Set([...(config.skills[argument] || []), path])];
    writeConfig(config); return show({ role: argument, attached: path });
  }
  if (command === 'install-skill') return show(installSkill(flags.host, flags.target));
  if (command === 'init') {
    const dir = resolve(required(subcommand, 'Pass a project directory.'));
    const brief = readFileSync(required(flags.brief, 'Pass --brief FILE'), 'utf8');
    required(brief.trim(), 'Brief cannot be empty.');
    return show(summary(createProject(dir, basename(dir), brief, loadConfig())));
  }
  if (command === 'status') return show(summary(loadProject(root)));
  if (command === 'decisions') return show(loadProject(root).decisions);
  if (command === 'plan') return projectAction(async state => { await makePlan(root, state, progress); return summary(state); });
  if (command === 'approve') return projectAction(state => {
    if (subcommand === 'plan') { required(state.plan, 'No plan to approve.'); state.plan.approved = true; state.plan.approvedAt = now(); }
    else {
      const decision = state.decisions.find(d => d.id === subcommand && d.status === 'pending');
      required(decision, 'No pending decision with that ID.');
      decision.value = required(flags.value, 'Pass --value TEXT'); decision.status = 'answered'; decision.answeredAt = now();
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
  if (command === 'use-config') return projectAction(state => { state.config = loadConfig(); return { applied: true, note: 'Completed artifacts keep their recorded model provenance.' }; });
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
    state.tasks = CREWS[subcommand].map(id => ({ id, role: id, brief, dependsOn: [], entities: ['*'],
      status: 'pending', attempts: [], revision: 1, output: null }));
    state.stage = 'plan-approval'; return summary(state);
  });
  if (command === 'export') return projectAction(state => ({ file: exportProject(root, state) }));
  if (command === 'assets' && subcommand === 'add') return projectAction(state => {
    const asset = readJSON(required(flags.file, 'Pass --file asset.json'));
    for (const key of ['id','type','model','url','entity','row']) required(typeof asset[key] === 'string' && asset[key].trim(), `Asset requires ${key}.`);
    required(/^[a-zA-Z0-9_-]+$/.test(asset.id), 'Asset id must be letters, digits, underscore or hyphen.');
    required(!state.assets.some(a => a.id === asset.id), 'Asset already registered.');
    required(/^(https?:\/\/|\/|[a-zA-Z]:[\\/])/.test(asset.url), 'Asset URL must be HTTP(S) or an absolute local path.');
    state.assets.push({ ...asset, recordedAt: now() });
    const tables = join(root, 'master-tables'); mkdirSync(tables, { recursive: true });
    atomicJSON(join(tables, 'generated-assets.json'), state.assets);
    return { registered: asset.id, masterRow: { entity: asset.entity, row: asset.row } };
  });
  throw new Error(`Unknown command: ${command}. Run tvc help.`);
}
main().catch(error => { process.stderr.write(`tvc: ${error.message}\n`); process.exitCode = 1; });
