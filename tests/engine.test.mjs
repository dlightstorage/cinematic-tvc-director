import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultConfig, validateConfig, bindingFor } from '../cinematic-tvc-director/scripts/lib/config.mjs';
import { createProject, saveProject, loadProject, withProjectLock, inside } from '../cinematic-tvc-director/scripts/lib/store.mjs';
import { makePlan, runProject, validatePlan, validateReview, invalidate, changeEntity, exportProject, debate } from '../cinematic-tvc-director/scripts/lib/engine.mjs';
import { relayArgs, parseObject, delegateFailure } from '../cinematic-tvc-director/scripts/lib/adapter.mjs';
import { ROUNDS, departmentRegistry, requireStandardTests } from '../cinematic-tvc-director/scripts/lib/workflow.mjs';
import { normalizeCatalog, estimateTokens } from '../cinematic-tvc-director/scripts/lib/catalog.mjs';
import { migrateLegacy } from '../cinematic-tvc-director/scripts/lib/migrate.mjs';
const relay = fileURLToPath(new URL('./fixtures/fake-relay.mjs', import.meta.url));
function project(t, brief = 'A fictional commercial') {
  const root = mkdtempSync(join(tmpdir(), 'tvc-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const config = defaultConfig('fixture');
  config.workflowMode = 'focused';
  config.customProviders = { fixture: { relay } };
  config.timeoutSeconds = 5;
  validateConfig(config);
  return { root, state: createProject(root, 'Fixture', brief, config) };
}
async function planned(t, brief) {
  const p = project(t, brief);
  await makePlan(p.root, p.state);
  p.state.plan.approved = true;
  return p;
}
test('real child-process DAG run, two independent reviews and final export', async t => {
  const { root, state } = await planned(t);
  await runProject(root, state);
  assert.equal(state.stage, 'complete');
  assert.ok(state.reviews.continuity.runId !== state.reviews.producer.runId);
  assert.equal(state.tasks.filter(t => t.status === 'completed').length, 2);
  assert.ok(existsSync(exportProject(root, state)));
  const runsBefore = state.runs.length;
  await runProject(root, state);
  assert.equal(state.runs.length, runsBefore, 'resume does not repeat completed work or reviews');
  const workers = state.runs.filter(r => r.mode === 'deliverable');
  const timing = workers.map(r => JSON.parse(readFileSync(join(root, r.directory, 'relay/fixture-timing.json'))));
  assert.ok(timing[0].start < timing[1].end && timing[1].start < timing[0].end, 'independent work overlaps');
  for (const r of workers) {
    const packet = JSON.parse(readFileSync(join(root, r.directory, 'work/input.json')));
    assert.deepEqual(packet.input.dependencies, [], 'blind peers do not see each other');
  }
});
test('targeted product change preserves independent output and invalidates reviews', async t => {
  const { root, state } = await planned(t);
  await runProject(root, state);
  state.assets.push({ id: 'old-product-still', entity: 'product', status: 'approved' });
  const before = state.tasks.find(t => t.id === 'cut').runId;
  assert.deepEqual(changeEntity(state, 'product', 'new bottle', 'new packaging'), ['picture']);
  assert.equal(state.assets[0].status, 'superseded');
  assert.throws(() => exportProject(root, state), /Final export/);
  await runProject(root, state);
  assert.equal(state.tasks.find(t => t.id === 'cut').runId, before);
  assert.equal(state.stage, 'complete');
  assert.equal(changeEntity(state, 'unknown-entity', 'new', 'not indexed').length, 2);
});
test('review revisions rerun only affected tasks, bounded against infinite loops', async t => {
  const { root, state } = await planned(t, 'REVISE');
  await runProject(root, state);
  assert.equal(state.stage, 'complete');
  assert.equal(state.tasks.find(t => t.id === 'picture').revision, 2);
  assert.equal(state.tasks.find(t => t.id === 'cut').revision, 1);
  const p = await planned(t, 'LOOP');
  p.state.config.maxRounds = 1;
  await runProject(p.root, p.state);
  assert.equal(p.state.stage, 'revision-limit');
  assert.ok(p.state.pendingRevisions.length);
  await assert.rejects(runProject(p.root, p.state), /Revision limit/);
});
test('failed child is never successful and explicit retry preserves completed siblings', async t => {
  const { root, state } = await planned(t, 'FAIL');
  await runProject(root, state);
  assert.equal(state.stage, 'failed');
  const failed = state.tasks.find(t => t.id === 'picture');
  assert.equal(failed.status, 'failed');
  const goodRun = state.tasks.find(t => t.id === 'cut').runId;
  const count = state.runs.length;
  await runProject(root, state);
  assert.equal(state.runs.length, count, 'failure does not auto retry');
  invalidate(state, ['picture'], 'correct request');
  await runProject(root, state, { retryFailed: true });
  assert.equal(state.stage, 'complete');
  assert.equal(state.tasks.find(t => t.id === 'cut').runId, goodRun);
});
test('invalid deliverables and unanswered decisions block completion', async t => {
  const p = await planned(t, 'INVALID');
  await runProject(p.root, p.state);
  assert.equal(p.state.stage, 'failed');
  assert.equal(p.state.tasks[0].output, null);
  const q = await planned(t, 'PAUSE');
  await runProject(q.root, q.state);
  assert.equal(q.state.stage, 'user-decision');
  assert.equal(q.state.decisions[0].status, 'pending');
  assert.throws(() => exportProject(q.root, q.state), /Final export/);
});
test('plan validation rejects cycles, traversal and non-blind department dependencies', () => {
  const one = { id: 'a', role: 'dop', brief: 'x', dependsOn: [], entities: ['product'] };
  assert.throws(() => validatePlan({ summary: 'x', questions: [], tasks: [{ ...one, id: '../escape' }] }), /Invalid/);
  assert.throws(() => validatePlan({ summary: 'x', questions: [], tasks: [{ ...one, dependsOn: ['a'] }] }), /Cyclic/);
  assert.throws(() => validatePlan({ summary: 'x', questions: [], tasks: [one, { ...one, id: 'b', role: 'editor', dependsOn: ['a'] }] }), /Blind/);
  assert.throws(() => validateReview({ verdict: 'approved', summary: 'x', checkedClean: [], revisions: [{ taskId: 'a', instruction: 'x' }], questions: [] }, [one]), /Approved/);
  assert.throws(() => parseObject('not json'), /invalid JSON/);
});
test('configuration keeps director selectable and rejects unsupported dials', () => {
  const c = defaultConfig('claude', 'sonnet');
  c.enabled.push('codex'); c.orchestrator = { implementer: 'codex' };
  assert.equal(bindingFor(validateConfig(c), 'director').implementer, 'codex');
  assert.equal(bindingFor(c, 'dop').implementer, 'claude');
  assert.throws(() => validateConfig({ ...c, orchestrator: { implementer: 'codex', model: 'x & bad' } }), /token/);
  const other = defaultConfig('opencode');
  assert.throws(() => validateConfig(other), /provider\/model/);
  assert.ok(relayArgs({ implementer: 'agy' }, c, 'work', 'out', 'brief').includes('--read-only'));
  assert.ok(relayArgs({ implementer: 'vibe' }, c, 'work', 'out', 'brief').includes('--plan-only'));
});
test('atomic state, path boundaries, and project writer lock', async t => {
  const { root, state } = project(t);
  await withProjectLock(root, async () => {
    await assert.rejects(withProjectLock(root, async () => {}), /Another command/);
    saveProject(root, state);
  });
  assert.equal(loadProject(root).name, 'Fixture');
  assert.throws(() => inside(root, '../elsewhere'), /outside/);
  assert.equal(existsSync(join(root, '.tvc/run.lock')), false);
});
test('debate executes two blind proposals, cross critiques and a selected director', async t => {
  const { root, state } = project(t);
  await debate(root, state, 'Which opening shot?', ['creative','dop']);
  assert.equal(state.runs.length, 5);
  assert.equal(state.debates.length, 1);
  assert.deepEqual(state.locks, {}, 'debate recommendation does not silently lock decisions');
});
test('restart recovers an orphan completed result without dispatching it again', async t => {
  const { root, state } = await planned(t);
  await runProject(root, state);
  const task = state.tasks[0];
  const run = state.runs.find(r => r.id === task.runId);
  task.status = 'running'; task.output = null;
  run.status = 'running'; run.pid = null;
  saveProject(root, state);
  const restarted = loadProject(root);
  const count = restarted.runs.length;
  await runProject(root, restarted);
  assert.equal(restarted.stage, 'complete');
  assert.equal(restarted.tasks[0].runId, run.id);
  assert.equal(restarted.runs.length, count);
});
test('director authority promotes reviewed locks; ask authority waits for user', async t => {
  const p = await planned(t, 'LOCK');
  p.state.config.authority = 'director';
  await runProject(p.root, p.state);
  assert.equal(p.state.locks.palette, 'green and white');
  assert.equal(p.state.stage, 'complete');
  assert.ok(existsSync(exportProject(p.root, p.state)));
  const q = await planned(t, 'LOCK');
  await runProject(q.root, q.state);
  assert.equal(q.state.stage, 'user-decision');
  assert.equal(q.state.locks.palette, undefined);
  assert.equal(q.state.decisions[0].lockKey, 'palette');
});
test('provider usage errors retain the real reason from relay events', async t => {
  const { root, state } = await planned(t);
  const run = state.runs[0];
  writeFileSync(join(root, run.directory, 'relay/events.jsonl'), JSON.stringify({ type: 'turn.failed', error: { message: "You've hit your usage limit." } }) + '\n');
  const error = delegateFailure(root, run, 1);
  assert.equal(error.code, 'provider-limit');
  assert.match(error.message, /usage limit/);
});
test('original workflow enforces source decisions, trace gates, master rows and handoff evidence', async t => {
  const root = mkdtempSync(join(tmpdir(), 'tvc-original-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const config = defaultConfig('fixture');
  config.customProviders = { fixture: { relay } }; config.timeoutSeconds = 5;
  const state = createProject(root, 'Original', 'ORIGINAL English commercial', validateConfig(config));
  for (const round of ROUNDS) {
    state.workflow.rounds[round.id] = {};
    for (const key of round.keys) { state.workflow.rounds[round.id][key] = { status: 'locked', value: 'approved' }; state.locks[key] = 'approved'; }
  }
  for (const decision of departmentRegistry()) state.locks[decision.id] = 'approved';
  await makePlan(root, state); state.plan.approved = true;
  await runProject(root, state);
  assert.equal(state.stage, 'complete', JSON.stringify(state.tasks.filter(task => task.status !== 'completed').map(task => ({ id: task.id, error: task.error }))));
  assert.equal(departmentRegistry().length, 155);
  assert.equal(state.masterRows[0].row, 'shot-001');
  assert.ok(state.workflow.reports['trace-before-consolidate-continuity']);
  assert.ok(state.workflow.reports['trace-final']);
  assert.ok(existsSync(join(root, 'audits', 'handoff-continuity.md')));
  assert.ok(existsSync(join(root, 'master-tables', 'production-rows.json')));
});
test('standard tests and model catalog metadata are structurally validated', () => {
  assert.throws(() => requireStandardTests({ verdict: 'approved', checkedClean: [], notChecked: [], standardTests: {}, historyStripped: true }, true), /standard test/);
  const models = normalizeCatalog('openrouter', { data: [{ id: 'qwen/example-72b', name: 'Qwen Example 72B', pricing: { prompt: '0.000001', completion: '0.000002' }, supported_parameters: ['tools'], architecture: {} }] });
  assert.equal(models[0].sizeClass, 'large');
  assert.equal(models[0].priceBand, 'standard');
  assert.equal(estimateTokens(models[0], 1_000_000, 1_000_000).usd, 3);
});
test('legacy Markdown migration preserves source and imports only explicit locks', t => {
  const root = mkdtempSync(join(tmpdir(), 'tvc-migrate-test-')); t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, '_state'));
  writeFileSync(join(root, '_state', 'project-state.md'), `# Project State: Legacy
**Current stage:** 2 DRAFT
## Scope (locked at Stage 1)
| Field | Value | Locked |
|---|---|---|
| Runtime | 30s | yes |
| Language(s) | both as two independent passes | yes |
## Locked decisions
| ID | Decision | Locked value | Locked at | Departments depending on it |
|---|---|---|---|---|
| palette | Brand palette | red only | 2026-01-01 | wardrobe |
## Open decisions
| ID | Decision | Blocked by | Notes |
|---|---|---|---|
| cast | Choose cast | none | client decision |
`);
  const result = migrateLegacy(root, 'Original brief', defaultConfig('codex'));
  const state = loadProject(root);
  assert.equal(state.locks.runtime, '30s'); assert.equal(state.locks.palette, 'red only');
  assert.equal(state.decisions.find(d => d.legacyId === 'cast').status, 'pending');
  assert.ok(existsSync(result.backup));
});
