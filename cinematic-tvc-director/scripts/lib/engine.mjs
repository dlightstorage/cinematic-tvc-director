import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { invoke, parseObject, completedRun } from './adapter.mjs';
import { role, CREWS } from './roles.mjs';
import { saveProject, inside, now, hash } from './store.mjs';

const isText = value => typeof value === 'string' && value.trim().length > 0;
const stringList = value => Array.isArray(value) && value.every(isText);
const safeId = value => typeof value === 'string' && /^[a-z][a-z0-9-]{0,63}$/.test(value);
function requireThat(test, message) { if (!test) throw new Error(message); }
function questions(value) {
  requireThat(Array.isArray(value), 'questions must be an array.');
  for (const q of value) requireThat(safeId(q.id) && isText(q.question), 'Each question needs a safe id and question text.');
  requireThat(new Set(value.map(q => q.id)).size === value.length, 'Duplicate question IDs.');
}
export function validatePlan(plan) {
  requireThat(isText(plan.summary), 'Plan needs a summary.');
  requireThat(Array.isArray(plan.tasks) && plan.tasks.length > 0 && plan.tasks.length <= 60, 'Plan must contain 1..60 tasks.');
  questions(plan.questions);
  const ids = new Set();
  for (const task of plan.tasks) {
    requireThat(safeId(task.id) && !ids.has(task.id), `Invalid or duplicate task ID: ${task.id}`);
    ids.add(task.id); role(task.role);
    requireThat(task.role !== 'director', 'Director is reserved for orchestration.');
    requireThat(isText(task.brief) && stringList(task.dependsOn) && stringList(task.entities) && task.entities.length > 0, `Invalid task: ${task.id}`);
  }
  const tasks = new Map(plan.tasks.map(t => [t.id, t]));
  const active = new Set(), done = new Set();
  function visit(id) {
    requireThat(tasks.has(id), `Unknown dependency: ${id}`);
    requireThat(!active.has(id), `Cyclic task dependency: ${id}`);
    if (done.has(id)) return;
    active.add(id);
    for (const dep of tasks.get(id).dependsOn) visit(dep);
    active.delete(id); done.add(id);
  }
  for (const id of ids) visit(id);
  for (const task of plan.tasks.filter(t => CREWS.departments.includes(t.role))) {
    const seen = new Set();
    function check(id) {
      if (seen.has(id)) return; seen.add(id);
      const dep = tasks.get(id);
      requireThat(!CREWS.departments.includes(dep.role), 'Blind department plans cannot depend on peer department plans.');
      dep.dependsOn.forEach(check);
    }
    task.dependsOn.forEach(check);
  }
  const departments = plan.tasks.filter(t => CREWS.departments.includes(t.role));
  const packets = new Set(departments.map(t => JSON.stringify([...new Set(t.dependsOn)].sort())));
  requireThat(packets.size <= 1, 'Blind departments must receive identical shared dependencies.');
  return plan;
}
export function validateDeliverable(result) {
  requireThat(isText(result.content), 'Deliverable needs nonempty content.');
  requireThat(stringList(result.assumptions) && stringList(result.tensions), 'Deliverable needs assumptions and tensions arrays.');
  requireThat(Array.isArray(result.decisions), 'Deliverable needs a decisions array.');
  for (const d of result.decisions) requireThat(isText(d.key) && isText(d.value) && isText(d.reason), 'Each proposed decision needs key, value and reason.');
  return result;
}
export function validateReview(result, tasks) {
  requireThat(['approved', 'revise', 'needs-user'].includes(result.verdict), 'Invalid review verdict.');
  requireThat(isText(result.summary) && stringList(result.checkedClean), 'Review needs summary and checkedClean.');
  requireThat(Array.isArray(result.revisions), 'Review needs revisions.');
  for (const r of result.revisions) requireThat(tasks.some(t => t.id === r.taskId) && isText(r.instruction), 'Revision must name an existing task and an instruction.');
  questions(result.questions);
  if (result.verdict === 'approved') requireThat(!result.revisions.length && !result.questions.length, 'Approved reviews cannot contain unresolved revisions/questions.');
  if (result.verdict === 'revise') requireThat(result.revisions.length > 0, 'A revise verdict must include actionable revisions.');
  if (result.verdict === 'needs-user') requireThat(result.questions.length > 0, 'A needs-user verdict must include questions.');
  if (result.locks === undefined) result.locks = [];
  requireThat(Array.isArray(result.locks), 'Review locks must be an array.');
  const keys = new Set();
  for (const lock of result.locks) {
    requireThat(safeId(lock.key) && isText(lock.value) && isText(lock.reason) && !keys.has(lock.key), 'Locks need unique safe keys, values and reasons.');
    keys.add(lock.key);
  }
  return result;
}
function addQuestions(state, list, source) {
  for (const q of list) {
    const id = `${source}-${q.id}`;
    const old = state.decisions.find(d => d.id === id);
    if (old?.status === 'answered' && old.question === q.question) continue;
    if (old) { old.status = 'pending'; old.question = q.question; delete old.value; }
    else state.decisions.push({ id, question: q.question, status: 'pending', source });
  }
}
function baseInput(state) {
  return { brief: state.brief, briefRevision: state.briefRevision, entities: state.entities,
    locks: state.locks, decisions: state.decisions.filter(d => d.status === 'answered'),
    changes: state.changes, authority: state.config.authority };
}
const PLAN_PROMPT = `Plan this advertising assignment using the cinematic source workflow.
Return {"summary":"...","questions":[{"id":"runtime","question":"..."}],"tasks":[{"id":"concept","role":"creative","brief":"...","dependsOn":[],"entities":["brand","product"]}]}.
Task roles available: creative, treatment, storyboard, dop, colorist, editor, vfx, casting, wardrobe, makeup, voice, production-design, sound, continuity, producer, production-bible, image-prompts, video-prompts, sfx-prompts, vo-prompts, motion-prompts, music-prompts.
IDs use lowercase ASCII letters, digits and hyphens. Dependencies must form a DAG.
Questions are only essential missing scope/creative decisions, not things already supplied.
For a full commercial, build the concept/script/treatment and shot list, then all ten blind departments, then production-bible and applicable generation prompt documents.
Each department must depend on the SAME complete creative/shot packet and cannot depend on another department. Production-bible can depend on all departments. Final independent reviews are run by the engine; do not add them as tasks.
Respect a single-stage or narrow user request: do not expand it to a whole commercial.
The task entities list is the change dependency index. Use concrete IDs such as product, lead, kitchen, camera, shot-004; include every fact the task reasons from. Use "*" for global documents. Do not make up approved facts. Media output means prompt documents only; never schedule paid media execution.`;
const DELIVERABLE_PROMPT = `Complete the task using the supplied dependencies and current locks. The references include your craft bible and operational procedures.
Return {"content":"complete production-ready Markdown document","assumptions":["..."],"tensions":["other department and exact incompatible assumption"],"decisions":[{"key":"...","value":"...","reason":"..."}]}.
Decisions are proposals. Give specific physical/artistic choices, meaningful source-based reasoning, anti-cliche and brief traceability. Include shot/entity IDs and explicit checked-and-clean or not-checked verdicts when auditing. Do not claim unavailable research or actual media generation. Preserve the previous deliverable's unaffected content when revising.`;
const REVIEW_PROMPT = `Review the current complete production output and task-specific tensions against the brief and source workflow.
Return {"verdict":"approved|revise|needs-user","summary":"...","checkedClean":["test and evidence"],"revisions":[{"taskId":"existing-id","instruction":"exact correction and reason"}],"questions":[{"id":"safe-id","question":"decision needed"}],"locks":[{"key":"safe-id","value":"specific approved production choice","reason":"why this is supported by the reviewed output"}]}.
Classify tensions as REAL CONFLICT, FALSE ALARM, or NEW RISK in the summary. Do not average incompatible plans. A false alarm requires a checked-and-clean reason.
Apply specificity, attribution, anti-cliche and traceability tests. Check continuity, locks, shot timing, product/character identity, current versus obsolete descriptions and missing deliverables within the requested scope.
An approved verdict requires all checks clean and no unresolved questions/revisions. Unsupported conclusions are not passes. Respect the user's authority setting: with ask, unresolved major creative alternatives require questions; with director, resolve within scope but still ask for missing user facts.
Final review must verify revision-history language is absent from handoff documents, not just take the writer's word for it.`;

export async function makePlan(root, state, onProgress = () => {}) {
  requireThat(!state.tasks.length, 'A plan already exists. Use change/revise to update work rather than replacing its history.');
  const response = await invoke(root, state, { id: 'plan', role: 'director', mode: 'plan', prompt: PLAN_PROMPT,
    input: baseInput(state), onSave: () => saveProject(root, state), onProgress });
  const plan = validatePlan(parseObject(response.content));
  state.plan = { summary: plan.summary, approved: false, runId: response.runId, createdAt: now() };
  state.tasks = plan.tasks.map(t => ({ id: t.id, role: t.role, brief: t.brief, dependsOn: [...new Set(t.dependsOn)],
    entities: [...new Set(t.entities)], status: 'pending', attempts: [], revision: 1, output: null }));
  addQuestions(state, plan.questions, 'plan');
  state.stage = 'plan-approval';
  saveProject(root, state);
  return state.plan;
}

export function invalidate(state, ids, reason) {
  const affected = new Set(ids);
  let changed = true;
  while (changed) {
    changed = false;
    for (const task of state.tasks) if (!affected.has(task.id) && task.dependsOn.some(id => affected.has(id))) { affected.add(task.id); changed = true; }
  }
  for (const task of state.tasks) if (affected.has(task.id)) {
    if (task.output) { task.previousOutput = task.output; task.output = null; }
    task.status = 'pending'; task.revision += 1; task.revisionReason = reason;
    delete task.error;
  }
  state.reconciliation = null; state.reviews = {}; state.stage = 'draft';
  return [...affected];
}
export function changeEntity(state, entity, value, reason) {
  requireThat(isText(entity) && isText(reason), 'Change needs entity and reason.');
  const broad = ['*', 'tone', 'scope', 'language', 'runtime', 'aspect-ratio', 'brief'].includes(entity);
  const direct = state.tasks.filter(t => broad || t.entities.includes(entity) || t.entities.includes('*')).map(t => t.id);
  // Undeclared entities have unknown dependencies: conservatively re-open all work.
  const known = state.tasks.some(t => t.entities.includes(entity));
  const ids = invalidate(state, broad || !known ? state.tasks.map(t => t.id) : direct, reason);
  state.entities[entity] = value;
  state.locks[entity] = value;
  state.briefRevision += 1; state.reviewRound = 0;
  state.changes.push({ entity, value, reason, affected: ids, at: now(), coverage: known || broad ? 'declared' : 'unknown-all-reopened' });
  return ids;
}
function finishTask(root, state, task, response) {
  const output = validateDeliverable(parseObject(response.content));
  task.output = output; task.status = 'completed'; task.runId = response.runId;
  task.outputHash = hash(output); task.completedAt = now(); delete task.error;
  const dir = join(root, 'deliverables'); mkdirSync(dir, { recursive: true });
  writeFileSync(inside(dir, `${task.id}.md`), `${output.content}\n`);
  saveProject(root, state);
}
async function executeTask(root, state, task, onProgress) {
  task.status = 'running';
  saveProject(root, state);
  const dependencyIds = task.dependsOn;
  const packet = { ...baseInput(state), task: { id: task.id, role: task.role, brief: task.brief, entities: task.entities,
    revision: task.revision, revisionReason: task.revisionReason || null },
    dependencies: state.tasks.filter(t => dependencyIds.includes(t.id)).map(t => ({ id: t.id, role: t.role, output: t.output })),
    previousOutput: task.previousOutput || null };
  try {
    const response = await invoke(root, state, { id: task.id, role: task.role, mode: 'deliverable',
      prompt: DELIVERABLE_PROMPT, input: packet, onSave: () => saveProject(root, state), onProgress });
    task.attempts.push(response.runId);
    finishTask(root, state, task, response);
  } catch (error) {
    task.status = 'failed'; task.error = error.message; task.errorCode = error.code || null;
    if (error.code === 'provider-limit' || error.code === 'provider-auth') state.providerBlocked = error.message;
    saveProject(root, state);
  }
}
function recover(root, state, retryFailed) {
  // Refuse concurrent orphan launches, including interrupted planning/review calls.
  for (const run of state.runs.filter(r => r.status === 'running')) {
    let alive = false;
    if (run.pid) { try { process.kill(run.pid, 0); alive = true; } catch {} }
    if (alive) throw new Error(`Delegate PID ${run.pid} is still running. Wait for it before resuming.`);
    const task = state.tasks.find(t => t.id === run.taskId && t.status === 'running');
    try {
      const result = completedRun(root, run);
      if (!result) throw new Error('Interrupted run has no completed result.');
      run.status = 'completed';
      if (task) finishTask(root, state, task, { ...result, runId: run.id });
    } catch (error) {
      run.status = 'failed'; run.error = error.message;
      if (task) { task.status = 'failed'; task.error = error.message; }
    }
  }
  for (const task of state.tasks) {
    if (task.status === 'running') { task.status = 'failed'; task.error = 'Interrupted before task result was saved.'; }
    if (task.status === 'failed' && retryFailed) task.status = 'pending';
  }
}
const allOutputs = state => state.tasks.map(t => ({ id: t.id, role: t.role, entities: t.entities, output: t.output }));
function signature(state) { return hash({ briefRevision: state.briefRevision, authority: state.config.authority, decisions: state.decisions, locks: state.locks,
  outputs: state.tasks.map(t => [t.id, t.outputHash, t.revision]) }); }

async function review(root, state, roleId, onProgress) {
  const response = await invoke(root, state, { id: `review-${roleId}`, role: roleId, mode: 'review',
    prompt: REVIEW_PROMPT, input: { ...baseInput(state), outputs: allOutputs(state), reviewRole: roleId },
    onSave: () => saveProject(root, state), onProgress });
  return { ...validateReview(parseObject(response.content), state.tasks), reviewer: roleId, inputHash: signature(state), runId: response.runId };
}
function processVerdicts(state, reports) {
  const revisions = reports.flatMap(r => r.revisions);
  for (const r of reports) addQuestions(state, r.questions, `review-${state.reviewRound}-${r.reviewer}`);
  if (revisions.length) {
    if (state.reviewRound >= state.config.maxRounds) {
      state.stage = 'revision-limit'; state.pendingRevisions = revisions; return 'stop';
    }
    state.reviewRound += 1;
    const ids = revisions.map(r => r.taskId);
    const affected = invalidate(state, ids, revisions.map(r => `${r.taskId}: ${r.instruction}`).join('\n'));
    state.changes.push({ at: now(), reason: 'review', affected, revisions });
    return state.decisions.some(d => d.status === 'pending') ? 'stop' : 'continue';
  }
  if (reports.some(r => r.verdict !== 'approved')) { state.stage = 'user-decision'; return 'stop'; }
  return 'approved';
}

export async function runProject(root, state, { retryFailed = false, onProgress = () => {} } = {}) {
  requireThat(state.plan?.approved, 'Review the plan then run tvc approve plan.');
  recover(root, state, retryFailed);
  state.interrupted = false;
  if (retryFailed) state.providerBlocked = null;
  saveProject(root, state);
  if (state.decisions.some(d => d.status === 'pending')) { state.stage = 'user-decision'; saveProject(root, state); return state; }
  if (state.providerBlocked) { state.stage = 'provider-blocked'; saveProject(root, state); return state; }
  if (state.stage === 'revision-limit') throw new Error('Revision limit reached. Inspect pendingRevisions, then use tvc revise to request another bounded pass.');
  while (true) {
    state.stage = 'draft'; saveProject(root, state);
    while (state.tasks.some(t => t.status === 'pending')) {
      const ready = state.tasks.filter(t => t.status === 'pending' && t.dependsOn.every(id => state.tasks.find(d => d.id === id)?.status === 'completed'));
      if (!ready.length) break;
      const batch = ready.slice(0, state.config.concurrency);
      await Promise.allSettled(batch.map(t => executeTask(root, state, t, onProgress)));
      if (state.interrupted) { state.stage = 'interrupted'; saveProject(root, state); return state; }
      if (state.providerBlocked) { state.stage = 'provider-blocked'; saveProject(root, state); return state; }
    }
    if (state.tasks.some(t => t.status !== 'completed')) { state.stage = 'failed'; saveProject(root, state); return state; }
    const inputHash = signature(state);
    if (!state.reconciliation || state.reconciliation.inputHash !== inputHash) {
      state.stage = 'reconcile'; saveProject(root, state);
      state.reconciliation = await review(root, state, 'director', onProgress);
      saveProject(root, state);
    }
    const direction = processVerdicts(state, [state.reconciliation]);
    saveProject(root, state);
    if (direction === 'continue') continue;
    if (direction === 'stop') return state;
    for (const lock of state.reconciliation.locks || []) {
      if (state.locks[lock.key] === lock.value) continue;
      if (state.config.authority === 'ask') {
        const id = `lock-${lock.key}`;
        const question = `Approve ${lock.key}: ${lock.value}? ${lock.reason}`;
        const existing = state.decisions.find(d => d.id === id);
        if (existing) Object.assign(existing, { status: 'pending', question, lockKey: lock.key, proposedValue: lock.value });
        else state.decisions.push({ id, question, status: 'pending', source: 'director-lock', lockKey: lock.key, proposedValue: lock.value });
      } else {
        state.locks[lock.key] = lock.value;
        state.changes.push({ at: now(), reason: lock.reason, entity: lock.key, value: lock.value, source: 'director-approved' });
      }
    }
    if (state.decisions.some(d => d.status === 'pending')) { state.stage = 'user-decision'; saveProject(root, state); return state; }
    state.reconciliation.inputHash = signature(state);
    state.stage = 'handoff-review'; saveProject(root, state);
    const reviewRoles = ['continuity', 'producer'];
    const results = await Promise.allSettled(reviewRoles.map(async id => {
      if (state.reviews[id]?.inputHash !== signature(state)) state.reviews[id] = await review(root, state, id, onProgress);
      saveProject(root, state);
    }));
    const failed = results.find(r => r.status === 'rejected');
    if (failed) { state.stage = 'review-failed'; saveProject(root, state); throw failed.reason; }
    const outcome = processVerdicts(state, reviewRoles.map(id => state.reviews[id]));
    if (outcome === 'continue') { saveProject(root, state); continue; }
    state.stage = outcome === 'approved' ? 'complete' : state.stage;
    saveProject(root, state);
    return state;
  }
}

export async function debate(root, state, brief, roleIds, onProgress = () => {}) {
  requireThat(roleIds.length === 2 && roleIds[0] !== roleIds[1], 'Debate requires two distinct roles.');
  roleIds.forEach(role);
  const invokeRole = (roleId, phase, input) => invoke(root, state, { id: `debate-${phase}-${roleId}`, role: roleId, mode: 'debate',
    prompt: `${DELIVERABLE_PROMPT}\nDebate phase: ${phase}. Propose or critique the supplied approach from your specialty.`,
    input, onSave: () => saveProject(root, state), onProgress });
  const proposals = await Promise.allSettled(roleIds.map(id => invokeRole(id, 'proposal', { ...baseInput(state), task: brief })));
  if (proposals.some(r => r.status === 'rejected')) throw new Error('Debate proposal failed; inspect run artifacts.');
  const parsed = proposals.map(p => validateDeliverable(parseObject(p.value.content)));
  const critiques = await Promise.allSettled(roleIds.map((id, i) => invokeRole(id, 'critique', { ...baseInput(state), task: brief, own: parsed[i], other: parsed[1 - i] })));
  if (critiques.some(r => r.status === 'rejected')) throw new Error('Debate critique failed; inspect run artifacts.');
  const synthesis = await invoke(root, state, { id: 'debate-director', role: 'director', mode: 'debate',
    prompt: `${DELIVERABLE_PROMPT}\nReconcile the two proposals and critiques. State agreement, real disagreements, and a reasoned recommendation. Do not silently lock it.`,
    input: { ...baseInput(state), task: brief, proposals: parsed, critiques: critiques.map(c => validateDeliverable(parseObject(c.value.content))) },
    onSave: () => saveProject(root, state), onProgress });
  const result = validateDeliverable(parseObject(synthesis.content));
  state.debates.push({ at: now(), brief, roles: roleIds, result, runId: synthesis.runId });
  saveProject(root, state);
  return result;
}

export function exportProject(root, state) {
  requireThat(state.stage === 'complete', 'Final export requires completed tasks and both current handoff reviews.');
  requireThat(state.reconciliation?.inputHash === signature(state) && state.reconciliation.verdict === 'approved' &&
    ['continuity', 'producer'].every(id => state.reviews[id]?.inputHash === signature(state) && state.reviews[id].verdict === 'approved'), 'Review results are stale. Run tvc run.');
  const dir = join(root, 'exports'); mkdirSync(dir, { recursive: true });
  const file = join(dir, 'production-package.md');
  const content = [`# ${state.name}`, '', ...state.tasks.flatMap(t => [`## ${t.id}`, '', t.output.content, ''])].join('\n');
  writeFileSync(file, content);
  writeFileSync(join(dir, 'asset-manifest.json'), JSON.stringify(state.assets, null, 2));
  return file;
}
