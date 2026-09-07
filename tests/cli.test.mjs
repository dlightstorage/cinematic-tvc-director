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
