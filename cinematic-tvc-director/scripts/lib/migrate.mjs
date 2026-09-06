import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { createProject, now, saveProject } from './store.mjs';

function section(markdown, heading) {
  const start = markdown.indexOf(`## ${heading}`);
  if (start < 0) return '';
  const end = markdown.indexOf('\n## ', start + 4);
  return markdown.slice(start, end < 0 ? markdown.length : end);
}
function table(markdown, heading) {
  return section(markdown, heading).split(/\r?\n/).filter(line => /^\|.*\|\s*$/.test(line))
    .map(line => line.slice(1, line.lastIndexOf('|')).split('|').map(cell => cell.trim()))
    .filter((row, index) => index > 0 && !row.every(cell => /^:?-{3,}:?$/.test(cell)) && row.some(Boolean));
}
const useful = value => value && !/^\[.*\]$/.test(value) ? value : '';
export function migrateLegacy(root, brief, config) {
  root = resolve(root);
  const source = join(root, '_state', 'project-state.md');
  if (!existsSync(source)) throw new Error('No legacy _state/project-state.md found.');
  if (existsSync(join(root, '.tvc', 'project.json'))) throw new Error('A runtime project already exists; migration will not overwrite it.');
  const markdown = readFileSync(source, 'utf8');
  copyFileSync(source, join(root, '_state', 'legacy-project-state.md'));
  const migrationConfig = structuredClone(config); migrationConfig.workflowMode = 'original';
  const state = createProject(root, basename(root), brief, migrationConfig);
  state.workflow.migratedFrom = '_state/legacy-project-state.md'; state.workflow.migratedAt = now();
  const stage = markdown.match(/\*\*Current stage:\*\*\s*(.+)/i)?.[1]?.trim();
  state.workflow.legacyStage = useful(stage) || 'unknown';
  const scopeKeys = { runtime: 'runtime', 'aspect ratio / platform': 'aspect-ratio', 'language(s)': 'language', 'deliverable priority': 'deliverable-priority' };
  state.workflow.rounds.scope = {};
  for (const [field, value, locked] of table(markdown, 'Scope (locked at Stage 1)')) {
    const key = scopeKeys[field.toLowerCase()];
    if (key && useful(value) && /^yes$/i.test(locked)) {
      state.locks[key] = value; state.workflow.rounds.scope[key] = { status: 'locked', value, source: 'legacy-import' };
    }
  }
  for (const [id, question, value] of table(markdown, 'Locked decisions')) if (useful(id) && useful(value)) {
    state.locks[id] = value; state.decisions.push({ id: `legacy-${id}`, legacyId: id, question, value, status: 'answered', source: 'legacy-import' });
  }
  for (const [id, question, blockedBy, notes] of table(markdown, 'Open decisions')) if (useful(id)) {
    state.decisions.push({ id: `legacy-open-${id}`, legacyId: id, question: useful(question) || id, blockedBy: useful(blockedBy), notes: useful(notes), status: 'pending', source: 'legacy-import' });
  }
  for (const [number, rule, scope, departments, status] of table(markdown, 'Production locks')) if (useful(number) && useful(rule)) {
    state.locks[`production-${number}`] = { rule, scope, departments, status: useful(status) || 'active', source: 'legacy-import' };
  }
  state.legacyAssets = table(markdown, 'Generated assets').filter(row => row.some(useful)).map(row => ({
    name: useful(row[0]), type: useful(row[1]), model: useful(row[2]), promptFile: useful(row[3]), url: useful(row[4]),
    legacyId: useful(row[5]), writtenBackTo: useful(row[6]), credits: useful(row[7]), status: 'needs-row-and-approval-verification' }));
  state.stage = state.decisions.some(d => d.status === 'pending') ? 'user-decision' : 'intake-migrated';
  saveProject(root, state);
  return { project: root, importedLocks: Object.keys(state.locks).length, pendingDecisions: state.decisions.filter(d => d.status === 'pending').length,
    legacyAssets: state.legacyAssets.length, backup: join(root, '_state', 'legacy-project-state.md'), next: 'Review imported state, then run tvc plan.' };
}
