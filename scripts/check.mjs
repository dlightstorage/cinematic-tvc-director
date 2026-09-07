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
for (const role of Object.values(ROLES)) for (const ref of role.references) {
  if (!existsSync(join(SKILL_ROOT, 'references', ref))) throw new Error(`Missing ${ref}`);
}
const entry = readFileSync(join(SKILL_ROOT, 'SKILL.md'), 'utf8');
if (!entry.startsWith('---') || !entry.includes('name: cinematic-tvc-director')) throw new Error('Invalid skill entrypoint.');
const setupEntry = readFileSync(join(SKILL_ROOT, '..', 'cinematic-tvc-setup', 'SKILL.md'), 'utf8');
if (!setupEntry.startsWith('---') || !setupEntry.includes('name: cinematic-tvc-setup')) throw new Error('Invalid setup skill entrypoint.');
const manifest = JSON.parse(readFileSync(join(SKILL_ROOT, '..', 'skills.sh.json'), 'utf8'));
const listed = manifest.groupings.flatMap(group => group.skills);
for (const name of ['cinematic-tvc-director', 'cinematic-tvc-setup']) if (!listed.includes(name)) throw new Error(`skills.sh.json is missing ${name}`);
console.log(`${files.length} scripts parse; all ${Object.keys(ROLES).length} role reference paths and both skill entrypoints exist.`);
