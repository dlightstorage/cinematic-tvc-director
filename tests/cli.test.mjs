import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync, mkdirSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { renderCrewTable } from '../cinematic-tvc-director/scripts/setup-wizard.mjs';
import { defaultConfig } from '../cinematic-tvc-director/scripts/lib/config.mjs';
import { buildRecommendedConfig } from '../cinematic-tvc-director/scripts/lib/tvc-presets.mjs';
import { createStudioSession } from '../cinematic-tvc-director/scripts/studio.mjs';
const cli = fileURLToPath(new URL('../cinematic-tvc-director/scripts/tvc.mjs', import.meta.url));
const fixture = fileURLToPath(new URL('./fixtures/fake-relay.mjs', import.meta.url));
test('terminal setup, custom provider, model binding, install and project snapshots', t => {
  const dir = mkdtempSync(join(tmpdir(), 'tvc-cli-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const env = { ...process.env, TVC_HOME: join(dir, 'settings') };
  const call = (...args) => {
    const r = spawnSync(process.execPath, [cli, ...args, '--json'], { env, cwd: dir, encoding: 'utf8', windowsHide: true });
    assert.equal(r.status, 0, r.stderr); return JSON.parse(r.stdout);
  };
  call('setup','--provider','codex','--workflow','focused');
  const scoped = join(dir, 'scoped'); mkdirSync(scoped);
  call('setup','--provider','codex','--model','gpt-test','--scope','project','--project',scoped);
  assert.equal(JSON.parse(readFileSync(join(scoped,'.tvc/config.json'))).default.model, 'gpt-test');
  call('providers','add','fixture','--relay',fixture);
  call('assign','director','--provider','fixture');
  const config = JSON.parse(readFileSync(join(env.TVC_HOME,'config.json')));
  assert.equal(config.orchestrator.implementer, 'fixture');
  const brief = join(dir, 'brief.md'); writeFileSync(brief, 'A test campaign');
  const project = join(dir, 'ad'); call('init',project,'--brief',brief);
  call('assign','dop','--provider','fixture','--model','custom-model');
  const before = JSON.parse(readFileSync(join(project,'.tvc/project.json')));
  assert.equal(before.config.roles.dop, undefined, 'project config is snapshotted');
  call('use-config','--project',project);
  const after = JSON.parse(readFileSync(join(project,'.tvc/project.json')));
  assert.equal(after.config.roles.dop.model, 'custom-model');
  const installed = call('install-skill','--target',join(dir,'skills'));
  assert.ok(existsSync(join(installed.destination,'scripts/tvc.mjs')));
  assert.ok(existsSync(join(dir,'skills','cinematic-tvc-setup','SKILL.md')));
  const linkedRoot = join(dir, 'linked-skills'); mkdirSync(linkedRoot);
  symlinkSync(installed.destination, join(linkedRoot, 'cinematic-tvc-director'), process.platform === 'win32' ? 'junction' : 'dir');
  symlinkSync(join(dir, 'skills', 'cinematic-tvc-setup'), join(linkedRoot, 'cinematic-tvc-setup'), process.platform === 'win32' ? 'junction' : 'dir');
  const linkedUpdate = call('install-skill', '--target', linkedRoot, '--update');
  assert.equal(linkedUpdate.preservedSymlinks.length, 2);
  const duplicate = spawnSync(process.execPath,[cli,'install-skill','--target',join(dir,'skills')],{env,cwd:dir,encoding:'utf8',windowsHide:true});
  assert.equal(duplicate.status,1);
  assert.match(duplicate.stderr,/already exists/);
});

test('setup proposal table names the director and every advertising role', () => {
  const output = renderCrewTable(defaultConfig('codex', 'gpt-example'), { default: 'test' });
  assert.match(output, /\* director/);
  for (const id of ['creative','research','dop','casting','production-bible','image-prompts','music-prompts']) {
    assert.match(output, new RegExp(id));
  }
  assert.equal(output.split('\n').filter(line => /^\| /.test(line)).length, 27);
});

test('advertising presets cover single and dual account choices by role complexity', () => {
  const report = { discovered: [
    { key: 'codex', supports: ['model', 'effort'], models: { values: ['gpt-6-astra', 'gpt-5.6-sol', 'gpt-5.6-luna'] } },
    { key: 'claude', supports: ['model', 'effort'], models: { values: ['opus', 'sonnet', 'haiku'] } },
  ] };
  const dual = buildRecommendedConfig({ accountMode: 'dual', report });
  assert.deepEqual(dual.config.enabled, ['codex', 'claude']);
  assert.deepEqual(dual.config.orchestrator, { implementer: 'codex', model: 'gpt-6-astra', effort: 'xhigh' });
  assert.equal(dual.config.roles.creative.implementer, 'codex');
  assert.deepEqual(dual.config.roles.treatment, { implementer: 'claude', model: 'opus', effort: 'high' });
  assert.deepEqual(dual.config.roles.wardrobe, { implementer: 'codex', model: 'gpt-5.6-luna', effort: 'low' });
  assert.match(renderCrewTable(dual.config, dual.basis, dual.complexity), /treatment\s+\| heavy\s+\| claude/);
  assert.match(renderCrewTable(dual.config, dual.basis, dual.complexity), /Refs/);

  for (const mode of ['codex', 'claude']) {
    const { config } = buildRecommendedConfig({ accountMode: mode, report });
    const expected = mode;
    assert.equal(config.orchestrator.implementer, expected);
    assert.ok(Object.values(config.roles).every(binding => binding.implementer === expected));
  }
});

test('visual Studio edits and saves the validated runtime configuration', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'tvc-studio-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const previousHome = process.env.TVC_HOME;
  process.env.TVC_HOME = join(dir, 'settings');
  t.after(() => {
    if (previousHome === undefined) delete process.env.TVC_HOME;
    else process.env.TVC_HOME = previousHome;
  });
  const report = { discovered: [
    { key: 'codex', authenticated: true, version: 'test-codex', supports: ['model', 'effort'], models: { status: 'reported', values: ['gpt-6-astra', 'gpt-5.6-sol', 'gpt-5.6-luna'] } },
    { key: 'claude', authenticated: true, version: 'test-claude', supports: ['model', 'effort'], models: { status: 'aliases', values: ['opus', 'sonnet', 'haiku'] } },
  ] };
  const session = await createStudioSession({ cwd: dir, openBrowser: false, report });
  t.after(() => session.close());
  const stateResponse = await fetch(new URL('api/state', session.url));
  assert.equal(stateResponse.status, 200);
  const state = await stateResponse.json();
  assert.equal(state.accountMode, 'dual');
  assert.equal(state.roles.length, 24);
  assert.equal(state.config.orchestrator.model, 'gpt-6-astra');

  state.config.roles.creative = { implementer: 'claude', model: 'sonnet', effort: 'high' };
  state.basis.creative = 'Studio test override';
  const saveResponse = await fetch(new URL('api/save', session.url), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ config: state.config, accountMode: state.accountMode, scope: 'project', basis: state.basis, complexity: state.complexity }),
  });
  assert.equal(saveResponse.status, 200, await saveResponse.text());
  const result = await session.done;
  assert.equal(result.action, 'saved');
  const saved = JSON.parse(readFileSync(join(dir, '.tvc', 'config.json')));
  assert.deepEqual(saved.roles.creative, { implementer: 'claude', model: 'sonnet', effort: 'high' });
  assert.equal(saved.setup.preset, 'advertising-studio.v1');
});

test('visual onboarding prepares one or both accounts and installs selected host skills', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'tvc-onboard-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const previousHome = process.env.TVC_HOME;
  process.env.TVC_HOME = join(dir, 'settings');
  t.after(() => {
    if (previousHome === undefined) delete process.env.TVC_HOME;
    else process.env.TVC_HOME = previousHome;
  });

  let discovered = { discovered: [
    { key: 'codex', authenticated: false, version: 'test-codex', supports: ['model', 'effort'], models: { status: 'reported', values: ['gpt-6-astra', 'gpt-5.6-sol'] } },
  ] };
  const skillHosts = [];
  const session = await createStudioSession({
    cwd: dir,
    mode: 'onboard',
    openBrowser: false,
    report: structuredClone(discovered),
    discoverFn: async () => structuredClone(discovered),
    installProviderFn: async provider => {
      assert.equal(provider, 'claude');
      discovered.discovered.push({ key: 'claude', authenticated: false, version: 'test-claude', supports: ['model', 'effort'], models: { status: 'aliases', values: ['opus', 'sonnet'] } });
    },
    loginProviderFn: async provider => {
      const entry = discovered.discovered.find(item => item.key === provider);
      assert.ok(entry);
      entry.authenticated = true;
    },
    installSkillFn: host => {
      skillHosts.push(host);
      return { destination: join(dir, `${host}-skills`, 'cinematic-tvc-director') };
    },
  });
  t.after(() => session.close());
  const post = (route, body) => fetch(new URL(route, session.url), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  let state = await (await fetch(new URL('api/state', session.url))).json();
  assert.equal(state.onboarding, true);
  assert.equal(state.providers.find(item => item.key === 'codex').state, 'sign-in-required');
  assert.equal(state.providers.find(item => item.key === 'claude').state, 'install-required');
  assert.equal((await post('api/provider', { provider: 'agy', action: 'refresh' })).status, 400);

  assert.equal((await post('api/provider', { provider: 'codex', action: 'login' })).status, 200);
  assert.equal((await post('api/provider', { provider: 'claude', action: 'install' })).status, 200);
  state = await (await post('api/provider', { provider: 'claude', action: 'login' })).json();
  assert.ok(state.providers.every(item => item.state === 'ready'));

  state = await (await post('api/preset', { accountMode: 'dual' })).json();
  assert.equal(state.accountMode, 'dual');
  assert.equal(state.config.roles.treatment.implementer, 'claude');
  const saveResponse = await post('api/save', {
    config: state.config,
    accountMode: 'dual',
    scope: 'global',
    basis: state.basis,
    complexity: state.complexity,
  });
  const saveText = await saveResponse.text();
  assert.equal(saveResponse.status, 200, saveText);
  const savedResponse = JSON.parse(saveText);
  assert.deepEqual(skillHosts, ['codex', 'claude']);
  assert.equal(savedResponse.skillInstalls.length, 2);
  const result = await session.done;
  assert.equal(result.action, 'saved');
  assert.equal(JSON.parse(readFileSync(join(process.env.TVC_HOME, 'config.json'))).setup.accountMode, 'dual');
});
