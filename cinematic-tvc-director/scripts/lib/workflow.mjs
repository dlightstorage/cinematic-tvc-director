import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SKILL_ROOT, CREWS } from './roles.mjs';
import { invoke, parseObject } from './adapter.mjs';
import { hash, now, saveProject } from './store.mjs';

export const ROUNDS = [
  { id: 'scope', tier: 0, keys: ['runtime', 'aspect-ratio', 'language', 'deliverable-priority'] },
  { id: 'intent', tier: 1, keys: ['proposition', 'audience', 'point-of-view', 'anti-brief'] },
  { id: 'tone', tier: 2, keys: ['tone', 'pacing', 'polish', 'realism'] },
  { id: 'world', tier: 3, keys: ['world', 'cast-structure', 'casting-attributes', 'performance'] },
  { id: 'visual', tier: 4, keys: ['camera', 'lens-family', 'colour-logic', 'movement'] },
  { id: 'craft', tier: 4, keys: ['working-stop', 'framing', 'palette', 'sound-intent'] },
];
export const STANDARD_TESTS = ['specificity', 'attribution', 'anti-cliche', 'traceability'];
export const original = state => state.workflow?.mode === 'original';
export function enableWorkflow(state) {
  if (state.tasks.length) throw new Error('Enable the original workflow before planning; existing projects retain their current mode.');
  state.workflow = { mode: 'original', phase: '1-intake', rounds: {}, history: [], reports: {}, departmentDecisions: {} };
}
export function phase(state, name) {
  if (!original(state) || state.workflow.phase === name) return;
  state.workflow.phase = name;
  state.workflow.history.push({ phase: name, at: now(), briefRevision: state.briefRevision });
}

// The imported reference has a stable explicit heading/class grammar; preserve its
// option text verbatim instead of maintaining a second hand-authored decision list.
export function departmentRegistry() {
  const text = readFileSync(join(SKILL_ROOT, 'references/gates-crew-departments.md'), 'utf8');
  const sections = [...text.matchAll(/^## DEPT-(\d+): (.+)$/gm)];
  return sections.flatMap((s, i) => {
    const body = text.slice(s.index, sections[i + 1]?.index ?? text.length);
    const decisions = [...body.matchAll(/^#### `([^`]+)`[^\n]*\n\*\*CLASS:\*\* (GATE|DERIVED|CONDITIONAL)([^\n]*)/gm)];
    return decisions.map((d, j) => {
      const dependency = body.indexOf('### Dependency', d.index + 1);
      const end = decisions[j + 1]?.index ?? (dependency >= 0 ? dependency : body.length);
      return ({ id: `${CREWS.departments[Number(s[1]) - 1]}.${d[1]}`,
      role: CREWS.departments[Number(s[1]) - 1], key: d[1], classification: d[2], condition: d[3].trim(),
      reference: body.slice(d.index, end).trim() });
    });
  });
}
export function roundComplete(state, round) {
  return round.keys.every(key => state.workflow.rounds[round.id]?.[key]?.status === 'locked');
}
export function answerGate(state, decision, value) {
  if (!decision.gateKey) return false;
  if (!String(value).trim()) throw new Error('A gate answer cannot be empty.');
  state.locks[decision.gateKey] = value;
  const entry = { status: 'locked', value, reason: 'Explicit user answer', at: now() };
  if (decision.gateRound) state.workflow.rounds[decision.gateRound][decision.gateKey] = entry;
  if (decision.departmentGate) state.workflow.departmentDecisions[decision.departmentGate] = entry;
  return true;
}
export async function prepareGates(root, state, { scopeOnly = false, onProgress = () => {} } = {}) {
  if (!original(state)) return true;
  for (const round of ROUNDS.filter(r => !scopeOnly || r.tier === 0)) {
    if (roundComplete(state, round)) continue;
    if (state.decisions.some(d => d.status === 'pending')) { state.stage = 'user-decision'; return false; }
    const entries = state.workflow.rounds[round.id] ||= {};
    const missing = round.keys.filter(k => entries[k]?.status !== 'locked');
    const response = await invoke(root, state, { id: `gates-${round.id}`, role: 'director', mode: 'gates',
      prompt: `Read references/original-workflow.md, references/gate-registry.md and references/gates-crew-departments.md.
Resolve only the supplied gate round in dependency order. Return {"entries":[{"key":"...","value":"...","reason":"...","source":"brief|proposal|missing","evidence":"exact substring from supplied brief or approved input","options":[{"value":"...","tradeoff":"..."}]}]}.
Exactly one entry for each requested key. A source=brief entry requires an exact quote establishing that choice, not an inference. Explicit existing user locks can be reused. Proposals need 2-4 meaningful options with tradeoffs. Missing user facts remain missing even with director authority. Do not invent product claims, scope or approval. Conditional nonapplicability must be explained in the proposed value. No silent defaults.`,
      input: { brief: state.brief, locks: state.locks, round, keys: missing, authority: state.config.authority },
      onSave: () => saveProject(root, state), onProgress });
    const result = parseObject(response.content);
    if (!Array.isArray(result.entries) || result.entries.length !== missing.length || new Set(result.entries.map(e => e.key)).size !== missing.length) throw new Error('Gate response must cover every requested key exactly once.');
    for (const e of result.entries) {
      if (!missing.includes(e.key) || !['brief', 'proposal', 'missing'].includes(e.source) || typeof e.reason !== 'string' || !e.reason.trim()
        || typeof e.value !== 'string' || (e.source !== 'missing' && !e.value.trim())) throw new Error('Invalid gate entry.');
      const already = typeof state.locks[e.key] === 'string' && state.locks[e.key] === e.value;
      const quoted = e.source === 'brief' && typeof e.evidence === 'string' && e.evidence.trim().length > 3 && state.brief.includes(e.evidence);
      if (e.source === 'brief' && !quoted && !already) throw new Error(`Gate ${e.key} claimed a brief lock without exact evidence.`);
      if (quoted || already) {
        entries[e.key] = { status: 'locked', value: e.value, reason: e.reason, evidence: e.evidence || null, source: 'user-input' };
        state.locks[e.key] = e.value;
      } else {
        if (e.source === 'proposal' && (!Array.isArray(e.options) || e.options.length < 2 || e.options.length > 4 || e.options.some(o => !o.value || !o.tradeoff))) throw new Error('Proposed gates need 2-4 options with tradeoffs.');
        const id = `gate-${round.id}-${e.key}`;
        entries[e.key] = { status: 'pending', proposed: e.value, reason: e.reason };
        const q = { id, question: `${e.key}: ${e.reason}`, proposedValue: e.value, options: e.options || [],
          gateRound: round.id, gateKey: e.key, source: 'workflow', status: 'pending' };
        const previous = state.decisions.find(d => d.id === id);
        if (previous) Object.assign(previous, q); else state.decisions.push(q);
      }
    }
    saveProject(root, state);
    if (!roundComplete(state, round)) { state.stage = 'user-decision'; saveProject(root, state); return false; }
  }
  return true;
}
export function validateDepartmentDecisions(state, task, output) {
  if (!original(state) || !CREWS.departments.includes(task.role)) return;
  const registry = departmentRegistry().filter(d => d.role === task.role);
  if (!Array.isArray(output.gateDecisions) || output.gateDecisions.length !== registry.length) throw new Error(`${task.role} must account for all ${registry.length} source decisions.`);
  const ids = new Set();
  for (const e of output.gateDecisions) {
    const d = registry.find(d => d.id === e.id);
    if (!d || ids.has(e.id) || typeof e.reason !== 'string' || !e.reason.trim() || typeof e.value !== 'string' || !e.value.trim()) throw new Error('Invalid department decision ledger.');
    ids.add(e.id);
    if (d.classification === 'DERIVED') {
      if (e.status !== 'derived') throw new Error(`${e.id} requires a written derivation.`);
    } else if (e.status === 'not-applicable') {
      if (d.classification !== 'CONDITIONAL') throw new Error(`${e.id} is not conditional.`);
    } else if (e.status === 'locked') {
      if (!e.lockKey || state.locks[e.lockKey] !== e.value) throw new Error(`${e.id} references no matching approved lock.`);
    } else if (e.status !== 'proposed' || !Array.isArray(e.options) || e.options.length < 2 || e.options.length > 4
      || e.options.some(o => !o.value || !o.tradeoff)) throw new Error(`${e.id} requires options and tradeoffs.`);
  }
}
export function collectDepartmentDecisions(state) {
  if (!original(state)) return true;
  for (const task of state.tasks.filter(t => CREWS.departments.includes(t.role) && t.output)) {
    for (const e of task.output.gateDecisions || []) {
      if (state.workflow.departmentDecisions[e.id]?.value === e.value && state.workflow.departmentDecisions[e.id]?.status === 'locked') continue;
      if (e.status !== 'proposed') {
        state.workflow.departmentDecisions[e.id] = { ...e, status: 'locked', at: now() };
        if (e.status !== 'not-applicable') state.locks[e.id] = e.value;
      } else {
        const id = `dept-${e.id}`;
        if (!state.decisions.some(d => d.id === id && d.status === 'pending')) state.decisions.push({ id,
          question: `${e.id}: ${e.reason}`, proposedValue: e.value, options: e.options, departmentGate: e.id,
          gateKey: e.id, source: 'department', status: 'pending' });
      }
    }
  }
  return !state.decisions.some(d => d.status === 'pending');
}
export function requireStandardTests(report, requireHistory = false) {
  if (!Array.isArray(report.notChecked)) throw new Error('Review must include a NOT-CHECKED ledger.');
  for (const test of STANDARD_TESTS) {
    const check = report.standardTests?.[test];
    if (!check || !['pass', 'fail', 'not-checked'].includes(check.verdict) || typeof check.evidence !== 'string' || !check.evidence.trim()) throw new Error(`Missing evidenced standard test: ${test}`);
    if (report.verdict === 'approved' && check.verdict !== 'pass') throw new Error(`Cannot approve with ${test} ${check.verdict}.`);
  }
  if (typeof report.historyStripped !== 'boolean') throw new Error('Review must report whether revision-history language is stripped.');
  if (report.verdict === 'approved' && (!report.checkedClean.length || report.notChecked.length || (requireHistory && report.historyStripped !== true))) throw new Error('Approval requires checked-clean evidence, no NOT-CHECKED gaps, and any required independent history-stripping verification.');
}
export function productionSignature(state) {
  return hash({ revision: state.briefRevision, locks: state.locks, decisions: state.decisions,
    outputs: state.tasks.filter(t => !CREWS.prompts.includes(t.role)).map(t => [t.id, t.outputHash, t.revision]) });
}
export function resetWorkflowReports(state, entity, oldValue, value, reason) {
  if (!original(state)) return;
  state.workflow.reports = {};
  state.workflow.departmentDecisions = {};
  phase(state, '4-fix');
  if (['palette', 'tone', 'framing', 'polish', 'realism', 'aesthetic', 'colour-logic'].includes(entity)) {
    state.workflow.negativeBrief = { oldValue: oldValue ?? 'Previous deliverables and change log', newValue: value, entity, reason };
  }
  if (entity) {
    const round = ROUNDS.find(r => r.keys.includes(entity));
    if (round) {
      for (const r of ROUNDS.filter(r => r.tier > round.tier || (r.tier === round.tier && r.id !== round.id))) delete state.workflow.rounds[r.id];
      state.workflow.rounds[round.id] ||= {};
      state.workflow.rounds[round.id][entity] = { status: 'locked', value, reason, source: 'user-change' };
    }
  }
}
