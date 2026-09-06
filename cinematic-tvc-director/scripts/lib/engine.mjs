import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { invoke, parseObject, completedRun } from './adapter.mjs';
import { role, CREWS } from './roles.mjs';
import { saveProject, inside, now, hash } from './store.mjs';
import { original, prepareGates, phase, departmentRegistry, validateDepartmentDecisions, collectDepartmentDecisions,
  requireStandardTests, productionSignature, resetWorkflowReports } from './workflow.mjs';

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
    if (task.language !== undefined) requireThat(['ar', 'en', 'neutral'].includes(task.language), `Invalid task language: ${task.id}`);
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
Return {"summary":"...","questions":[{"id":"runtime","question":"..."}],"tasks":[{"id":"concept","role":"creative","brief":"...","dependsOn":[],"entities":["brand","product"],"language":"ar|en|neutral"}]}.
Task roles available: creative, research, treatment, storyboard, dop, colorist, editor, vfx, casting, wardrobe, makeup, voice, production-design, sound, continuity, producer, production-bible, image-prompts, video-prompts, sfx-prompts, vo-prompts, motion-prompts, music-prompts.
IDs use lowercase ASCII letters, digits and hyphens. Dependencies must form a DAG.
Questions are only essential missing scope/creative decisions, not things already supplied.
Schedule named research tasks before the work that needs them when market, culture, location, casting norm, dialect or factual product evidence is unavailable. Persist each topic as its own deliverable and never fabricate findings.
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
  if (!await prepareGates(root, state, { scopeOnly: true, onProgress })) return null;
  const response = await invoke(root, state, { id: 'plan', role: 'director', mode: 'plan', prompt: PLAN_PROMPT,
    input: baseInput(state), onSave: () => saveProject(root, state), onProgress });
  const plan = validatePlan(parseObject(response.content));
  if (original(state)) {
    const required = ['creative', 'treatment', 'storyboard', 'production-bible', ...CREWS.departments];
    for (const id of required) requireThat(plan.tasks.some(t => t.role === id), `Original full workflow requires ${id}; use focused mode for a single-stage request.`);
    const departments = plan.tasks.filter(t => CREWS.departments.includes(t.role));
    for (const d of departments) for (const r of ['creative', 'treatment', 'storyboard']) {
      requireThat(d.dependsOn.some(id => plan.tasks.find(t => t.id === id)?.role === r), `Department ${d.id} needs the complete ${r} packet.`);
    }
    for (const b of plan.tasks.filter(t => t.role === 'production-bible')) {
      requireThat(departments.every(d => b.dependsOn.includes(d.id)), 'Consolidation must depend on all departments.');
    }
    for (const p of plan.tasks.filter(t => CREWS.prompts.includes(t.role))) requireThat(p.dependsOn.some(id => plan.tasks.find(t => t.id === id)?.role === 'production-bible'), 'Generation prompts must depend on the consolidated production bible.');
    if (/both|arabic.*english|english.*arabic|عربي.*إنجليزي|انجليزي.*عربي/i.test(state.locks.language || '')) {
      for (const roleId of ['creative', 'voice']) for (const language of ['ar', 'en']) requireThat(plan.tasks.some(t => t.role === roleId && t.language === language), `Bilingual workflow requires an independent ${roleId} task for ${language}.`);
    }
  }
  state.plan = { summary: plan.summary, approved: false, runId: response.runId, createdAt: now() };
  state.tasks = plan.tasks.map(t => ({ id: t.id, role: t.role, brief: t.brief, dependsOn: [...new Set(t.dependsOn)],
    entities: [...new Set(t.entities)], language: t.language || 'neutral', status: 'pending', attempts: [], revision: 1, output: null }));
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
  resetWorkflowReports(state);
  return [...affected];
}
export function changeEntity(state, entity, value, reason) {
  requireThat(isText(entity) && isText(reason), 'Change needs entity and reason.');
  const broad = ['*', 'tone', 'scope', 'language', 'runtime', 'aspect-ratio', 'brief'].includes(entity);
  const triggers = {
    palette: ['dop','colorist','vfx','wardrobe','makeup','production-design'], framing: ['dop','vfx','wardrobe','makeup','production-design'],
    aesthetic: ['dop','colorist','vfx','wardrobe','makeup','production-design'], 'colour-logic': ['dop','colorist','vfx','wardrobe','production-design'],
    camera: ['dop','editor','vfx','producer','storyboard'], lens: ['dop','editor','vfx','producer','storyboard'],
    location: ['dop','casting','wardrobe','makeup','production-design','producer','storyboard'],
    casting: ['casting','wardrobe','makeup','production-design','producer','storyboard'],
  };
  const roles = original(state) ? triggers[entity] || [] : [];
  const direct = state.tasks.filter(t => broad || roles.includes(t.role) || t.entities.includes(entity) || t.entities.includes('*')).map(t => t.id);
  // Undeclared entities have unknown dependencies: conservatively re-open all work.
  const known = state.tasks.some(t => t.entities.includes(entity));
  const oldValue = state.locks[entity] ?? state.entities[entity];
  const tierTwo = original(state) && ['tone', 'pacing', 'polish', 'realism'].includes(entity);
  const ids = invalidate(state, broad || !known || tierTwo ? state.tasks.map(t => t.id) : direct, reason);
  resetWorkflowReports(state, entity, oldValue, value, reason);
  state.entities[entity] = value;
  state.locks[entity] = value;
  state.briefRevision += 1; state.reviewRound = 0;
  const invalidatesAssets = broad || Object.hasOwn(triggers, entity);
  for (const asset of state.assets || []) if (invalidatesAssets || asset.entity === entity) {
    asset.status = 'superseded'; asset.supersededAt = now(); asset.supersededReason = reason;
  }
  state.changes.push({ entity, value, reason, affected: ids, at: now(), coverage: known || broad ? 'declared' : 'unknown-all-reopened' });
  return ids;
}
function finishTask(root, state, task, response) {
  const output = validateDeliverable(parseObject(response.content));
  validateDepartmentDecisions(state, task, output);
  if (original(state) && task.language !== 'neutral' && ['creative', 'voice', 'vo-prompts'].includes(task.role)) {
    requireThat(output.language === task.language && output.copyPass === 'independent', `${task.id} must prove an independent ${task.language} copy/voice pass.`);
  }
  if (original(state) && task.role === 'production-bible') {
    requireThat(Array.isArray(output.masterRows) && output.masterRows.length > 0, 'Production bible requires structured masterRows.');
    const keys = new Set();
    for (const row of output.masterRows) {
      requireThat(['cast', 'location', 'shot', 'voice', 'music', 'sfx'].includes(row.kind) && isText(row.entity) && isText(row.row) && isText(row.summary), 'Invalid production-bible master row.');
      const key = `${row.entity}\u0000${row.row}`; requireThat(!keys.has(key), 'Duplicate production-bible master row.'); keys.add(key);
    }
    state.masterRows = output.masterRows;
    const tables = join(root, 'master-tables'); mkdirSync(tables, { recursive: true });
    writeFileSync(join(tables, 'production-rows.json'), JSON.stringify(state.masterRows, null, 2));
  }
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
      prompt: DELIVERABLE_PROMPT + (original(state) && CREWS.departments.includes(task.role) ? `
Additionally return gateDecisions, exactly one entry per supplied source decision. Each entry has id, value, reason, status (proposed|derived|not-applicable|locked), and options [{value,tradeoff}] for proposals or lockKey for existing locks. DERIVED entries must show calculations or the specific documented derivation in reason. CONDITIONAL entries must explicitly evaluate their condition. GATE entries cannot be marked not-applicable. Never claim a new proposal is already locked. Read each decision's original options and dependency order.` : '') + (original(state) && task.role === 'production-bible' ? `
Additionally return masterRows: [{"kind":"cast|location|shot|voice|music|sfx","entity":"stable entity id","row":"stable row id","summary":"current locked row contents"}]. Include every cast, location, shot and applicable audio row so later assets can only attach to a real approved row.` : '') + (original(state) && task.language !== 'neutral' && ['creative', 'voice', 'vo-prompts'].includes(task.role) ? `
Additionally return language:"${task.language}" and copyPass:"independent". Create this language from the insight and culture directly; do not translate the other language's chosen copy.` : ''),
      input: { ...packet, ...(original(state) ? { sourceDecisions: departmentRegistry().filter(d => d.role === task.role) } : {}) },
      onSave: () => saveProject(root, state), onProgress });
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

async function review(root, state, roleId, onProgress, gate = 'handoff') {
  const response = await invoke(root, state, { id: `review-${gate}-${roleId}`, role: roleId, mode: 'review',
    prompt: REVIEW_PROMPT + (original(state) ? `
This is the ${gate} gate in the original six-stage workflow. Read references/original-workflow.md and the gate's audit procedure. Also return notChecked:["explicitly unverified area and reason"] and standardTests: an object with exactly specificity, attribution, anti-cliche, traceability, each {verdict:pass|fail|not-checked,evidence:"specific check and finding"}. Return historyStripped:boolean based on an independent inspection; it must be true for handoff gates and may be false at an earlier trace gate. An approved verdict needs an empty notChecked list and every standard test pass. For a negative-brief review, hunt only the supplied old vocabulary/premises against the new rule, checking tables as well as prose.` : ''),
    input: { ...baseInput(state), outputs: allOutputs(state).filter(t => t.output), reviewRole: roleId,
      workflowGate: gate, negativeBrief: gate === 'negative-brief' ? state.workflow?.negativeBrief : undefined },
    onSave: () => saveProject(root, state), onProgress });
  const result = validateReview(parseObject(response.content), state.tasks);
  if (original(state)) requireStandardTests(result, gate.includes('handoff') || gate === 'negative-brief');
  const report = { ...result, reviewer: roleId, inputHash: signature(state), runId: response.runId };
  const dir = join(root, 'audits'); mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${gate}-${roleId}.json`), JSON.stringify(report, null, 2));
  writeFileSync(join(dir, `${gate}-${roleId}.md`), [`# ${gate}: ${roleId}`, report.summary, '## CHECKED-AND-CLEAN', ...report.checkedClean,
    '## NOT-CHECKED', ...(report.notChecked?.length ? report.notChecked : ['None']),
    '## STANDARD TESTS', ...Object.entries(report.standardTests || {}).map(([key, value]) => `- ${key}: ${value.verdict}. ${value.evidence}`),
    '## Revisions', ...report.revisions.map(r => `- ${r.taskId}: ${r.instruction}`)].join('\n\n'));
  return report;
}

async function workflowBarrier(root, state, nextTasks, onProgress) {
  if (!original(state)) return 'approved';
  const consolidate = nextTasks.some(t => t.role === 'production-bible');
  const prompts = nextTasks.some(t => CREWS.prompts.includes(t.role));
  if (!consolidate && !prompts) return 'approved';
  if (!collectDepartmentDecisions(state)) { state.stage = 'user-decision'; return 'stop'; }
  const gate = consolidate ? 'trace-before-consolidate' : 'handoff-before-prompts';
  phase(state, consolidate ? '3-trace' : '6-handoff');
  const inputHash = productionSignature(state);
  const roles = consolidate ? ['director', 'continuity'] : ['continuity', 'producer'];
  for (const id of roles) {
    const key = `${gate}-${id}`;
    if (state.workflow.reports[key]?.productionHash !== inputHash) {
      state.workflow.reports[key] = { ...await review(root, state, id, onProgress, gate), productionHash: inputHash };
      saveProject(root, state);
    }
  }
  const outcome = processVerdicts(state, roles.map(id => state.workflow.reports[`${gate}-${id}`]));
  if (outcome === 'approved') phase(state, consolidate ? '5-consolidate' : 'generation-prompts');
  return outcome;
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
  if (!await prepareGates(root, state, { onProgress })) { saveProject(root, state); return state; }
  phase(state, '2-draft');
  while (true) {
    state.stage = 'draft'; saveProject(root, state);
    while (state.tasks.some(t => t.status === 'pending')) {
      const ready = state.tasks.filter(t => t.status === 'pending' && t.dependsOn.every(id => state.tasks.find(d => d.id === id)?.status === 'completed'));
      if (!ready.length) break;
      const batch = ready.slice(0, state.config.concurrency);
      const barrier = await workflowBarrier(root, state, batch, onProgress);
      saveProject(root, state);
      if (barrier === 'stop') return state;
      if (barrier === 'continue') continue;
      await Promise.allSettled(batch.map(t => executeTask(root, state, t, onProgress)));
      if (state.interrupted) { state.stage = 'interrupted'; saveProject(root, state); return state; }
      if (state.providerBlocked) { state.stage = 'provider-blocked'; saveProject(root, state); return state; }
    }
    if (state.tasks.some(t => t.status !== 'completed')) { state.stage = 'failed'; saveProject(root, state); return state; }
    if (original(state)) {
      if (!collectDepartmentDecisions(state)) { state.stage = 'user-decision'; saveProject(root, state); return state; }
      phase(state, '3-trace');
      const key = 'trace-final';
      if (state.workflow.reports[key]?.inputHash !== signature(state)) state.workflow.reports[key] = await review(root, state, 'continuity', onProgress, key);
      const trace = processVerdicts(state, [state.workflow.reports[key]]);
      saveProject(root, state);
      if (trace === 'continue') continue;
      if (trace === 'stop') return state;
    }
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
    phase(state, '6-handoff');
    if (original(state) && state.workflow.negativeBrief) {
      const key = 'negative-brief';
      if (state.workflow.reports[key]?.inputHash !== signature(state)) state.workflow.reports[key] = await review(root, state, 'continuity', onProgress, key);
      const negative = processVerdicts(state, [state.workflow.reports[key]]);
      saveProject(root, state);
      if (negative === 'continue') continue;
      if (negative === 'stop') return state;
    }
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
    if (state.stage === 'complete') phase(state, 'complete');
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
  const production = state.tasks.filter(t => !CREWS.prompts.includes(t.role));
  const prompts = state.tasks.filter(t => CREWS.prompts.includes(t.role));
  const content = [`# ${state.name}: Production Package`, '', ...production.flatMap(t => [`## ${t.id}`, '', t.output.content, ''])].join('\n');
  writeFileSync(file, content);
  const presentationSections = state.tasks.filter(t => ['creative', 'treatment', 'storyboard', 'production-bible'].includes(t.role));
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  writeFileSync(join(dir, 'client-presentation.html'), `<!doctype html><html><head><meta charset="utf-8"><title>${escape(state.name)}</title><style>
body{margin:0;background:#111;color:#f5f5f0;font:18px/1.5 Arial,sans-serif}section{box-sizing:border-box;min-height:100vh;padding:8vh 9vw;border-bottom:1px solid #444}h1{font-size:52px}h2{font-size:36px;color:#ffd54a}pre{white-space:pre-wrap;font:inherit;max-width:1000px}@media print{section{page-break-after:always}}
</style></head><body><section><h1>${escape(state.name)}</h1><p>Locked cinematic TVC treatment</p></section>${presentationSections.map(t => `<section><h2>${escape(t.id)}</h2><pre>${escape(t.output.content)}</pre></section>`).join('')}</body></html>`);
  writeFileSync(join(dir, 'ai-generation-package.md'), [`# ${state.name}: AI Generation Package`, '',
    `Production revision: ${state.briefRevision}`, `Handoff passed: ${state.updatedAt}`, '',
    ...(prompts.length ? prompts.flatMap(t => [`## ${t.id}`, '', t.output.content, '']) : ['No generation modalities were requested.'])].join('\n'));
  writeFileSync(join(dir, 'decision-log.json'), JSON.stringify({ decisions: state.decisions, locks: state.locks, changes: state.changes }, null, 2));
  writeFileSync(join(dir, 'asset-manifest.json'), JSON.stringify(state.assets, null, 2));
  return file;
}
