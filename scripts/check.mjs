import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROLES, SKILL_ROOT } from '../cinematic-tvc-director/scripts/lib/roles.mjs';
const files = [];
function scan(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) scan(path);
    else if (path.endsWith('.mjs')) files.push(path);
  }
}
scan(join(SKILL_ROOT, 'scripts'));
for (const path of files) {
  const r = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8', windowsHide: true });
  if (r.status !== 0) throw new Error(`${path}\n${r.stderr}`);
}
const studioClient = join(SKILL_ROOT, 'scripts', 'assets', 'studio', 'app.js');
const clientCheck = spawnSync(process.execPath, ['--check', studioClient], { encoding: 'utf8', windowsHide: true });
if (clientCheck.status !== 0) throw new Error(`${studioClient}\n${clientCheck.stderr}`);
for (const asset of ['index.html', 'styles.css']) {
  if (!existsSync(join(SKILL_ROOT, 'scripts', 'assets', 'studio', asset))) throw new Error(`Missing Studio asset: ${asset}`);
}
for (const role of Object.values(ROLES)) for (const ref of role.references) {
  if (!existsSync(join(SKILL_ROOT, 'references', ref))) throw new Error(`Missing ${ref}`);
}
const entry = readFileSync(join(SKILL_ROOT, 'SKILL.md'), 'utf8');
if (!entry.startsWith('---') || !entry.includes('name: cinematic-tvc-director')) throw new Error('Invalid skill entrypoint.');
const setupEntry = readFileSync(join(SKILL_ROOT, '..', 'cinematic-tvc-setup', 'SKILL.md'), 'utf8');
if (!setupEntry.startsWith('---') || !setupEntry.includes('name: cinematic-tvc-setup')) throw new Error('Invalid setup skill entrypoint.');
const manifest = JSON.parse(readFileSync(join(SKILL_ROOT, '..', 'skills.sh.json'), 'utf8'));
const listed = manifest.groupings.flatMap(group => group.skills);
const delegateNames = [
  'agy-delegate', 'aider-delegate', 'claude-delegate', 'cline-delegate',
  'codex-delegate', 'commandcode-delegate', 'copilot-delegate',
  'cursor-delegate', 'delegate-setup', 'grok-delegate', 'kimi-delegate',
  'omp-delegate', 'opencode-delegate', 'pi-delegate', 'qoder-delegate',
  'vibe-delegate', 'warp-delegate', 'zcode-delegate',
];
const publicSkills = ['cinematic-tvc-director', 'cinematic-tvc-setup', ...delegateNames];
for (const name of publicSkills) {
  if (!listed.includes(name)) throw new Error(`skills.sh.json is missing ${name}`);
  if (!existsSync(join(SKILL_ROOT, '..', name.startsWith('cinematic-') ? name : join('skills', name), 'SKILL.md'))) {
    throw new Error(`Missing public skill entrypoint: ${name}`);
  }
}
console.log(`${files.length} scripts parse; ${Object.keys(ROLES).length} role references and all ${publicSkills.length} public skills exist.`);
