import { parseArgs } from 'node:util';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const { values: flags } = parseArgs({ options: Object.fromEntries(['brief','cd','out-dir','timeout','model','effort','variant','provider'].map(k => [k, { type: 'string' }])) });
const { mode, role, input } = JSON.parse(readFileSync(join(flags.cd, 'input.json'), 'utf8'));
const start = Date.now();
await new Promise(resolve => setTimeout(resolve, mode === 'deliverable' ? 600 : 80));
let answer;
const content = { content: `${role}: production document`, assumptions: [], tensions: [], decisions: [] };
if (mode === 'plan') {
  if (input.brief.includes('ORIGINAL')) {
    const heads = ['dop','colorist','editor','vfx','casting','wardrobe','makeup','voice','production-design','sound'];
    answer = { summary: 'Complete original workflow', questions: [], tasks: [
      { id: 'creative', role: 'creative', brief: 'Concept', dependsOn: [], entities: ['*'], language: 'neutral' },
      { id: 'treatment', role: 'treatment', brief: 'Treatment', dependsOn: [], entities: ['*'], language: 'neutral' },
      { id: 'storyboard', role: 'storyboard', brief: 'Storyboard', dependsOn: [], entities: ['*'], language: 'neutral' },
      ...heads.map(id => ({ id, role: id, brief: `${id} plan`, dependsOn: ['creative','treatment','storyboard'], entities: ['*'], language: 'neutral' })),
      { id: 'production-bible', role: 'production-bible', brief: 'Consolidate', dependsOn: heads, entities: ['*'], language: 'neutral' },
    ] };
  } else answer = { summary: 'Fixture commercial plan', questions: [], tasks: [
    { id: 'picture', role: 'dop', brief: 'Plan product picture', dependsOn: [], entities: ['product','camera'] },
    { id: 'cut', role: 'editor', brief: 'Plan pacing', dependsOn: [], entities: ['runtime'] },
  ] };
}
else if (mode === 'deliverable') {
  if (input.brief.includes('FAIL') && input.task.id === 'picture' && input.task.revision === 1) process.exit(7);
  answer = { ...content, content: `${role} revision ${input.task.revision}: complete document` };
  if (input.sourceDecisions?.length) answer.gateDecisions = input.sourceDecisions.map(d => d.classification === 'DERIVED'
    ? { id: d.id, value: 'derived fixture value', reason: 'Derived from the pre-approved fixture dependencies.', status: 'derived' }
    : { id: d.id, value: 'approved', reason: 'Pre-approved fixture lock.', status: 'locked', lockKey: d.id });
  if (role === 'production-bible') answer.masterRows = [{ kind: 'shot', entity: 'product', row: 'shot-001', summary: 'Locked hero shot.' }];
  if (input.brief.includes('INVALID') && input.task.id === 'picture') answer = { nonsense: true };
} else if (mode === 'review') {
  answer = { verdict: 'approved', summary: 'All scoped checks pass', checkedClean: ['specificity','attribution','anti-cliche','traceability'], revisions: [], questions: [] };
  if (input.brief.includes('REVISE') && role === 'director' && input.outputs.find(t => t.id === 'picture')?.output.content.includes('revision 1')) {
    answer = { ...answer, verdict: 'revise', revisions: [{ taskId: 'picture', instruction: 'Correct the focal length.' }] };
  }
  if (input.brief.includes('LOOP') && role === 'director') answer = { ...answer, verdict: 'revise', revisions: [{ taskId: 'picture', instruction: 'Revise again.' }] };
  if (input.brief.includes('PAUSE') && !input.decisions.length && role === 'director') answer = { ...answer, verdict: 'needs-user', questions: [{ id: 'tone', question: 'What tone?' }] };
  if (input.brief.includes('LOCK') && role === 'director') answer.locks = [{ key: 'palette', value: 'green and white', reason: 'Reviewed product palette.' }];
  if (input.workflowGate) {
    answer.standardTests = Object.fromEntries(['specificity','attribution','anti-cliche','traceability'].map(key => [key, { verdict: 'pass', evidence: `${key} checked against locked output.` }]));
    answer.historyStripped = true;
    answer.notChecked = [];
  }
} else answer = content;
mkdirSync(flags['out-dir'], { recursive: true });
writeFileSync(join(flags['out-dir'], 'fixture-timing.json'), JSON.stringify({ start, end: Date.now(), mode, role }));
writeFileSync(join(flags['out-dir'], 'result.json'), JSON.stringify({ status: 'completed', exitCode: 0, finalMessage: JSON.stringify(answer), sessionId: `${role}-fixture` }));
