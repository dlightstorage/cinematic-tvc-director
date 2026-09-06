import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SKILL_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const VENDOR = join(SKILL_ROOT, 'scripts/vendor/delegate-skills');
export const REPO_ROOT = dirname(SKILL_ROOT);
const bibles = readdirSync(join(SKILL_ROOT, 'references/bibles'));
const bible = n => `bibles/${bibles.find(f => f.startsWith(`${String(n).padStart(2, '0')}-`))}`;
const definitions = [
  ['director', 'Director / Orchestrator', 11, 'director-protocol.md'],
  ['creative', 'Creative Brief and Concept', 18, 'templates-documents.md'],
  ['dop', 'Director of Photography', 1, 'gates-crew-departments.md'],
  ['colorist', 'Colorist', 2, 'gates-crew-departments.md'],
  ['editor', 'Editor', 3, 'gates-crew-departments.md'],
  ['vfx', 'VFX and Motion Graphics', 4, 'gates-crew-departments.md'],
  ['casting', 'Casting Director', 5, 'gates-crew-departments.md'],
  ['wardrobe', 'Costume and Wardrobe', 6, 'gates-crew-departments.md'],
  ['makeup', 'Makeup and Hair', 7, 'gates-crew-departments.md'],
  ['voice', 'VO Casting and Voice Direction', 8, 'gates-crew-departments.md'],
  ['production-design', 'Production Design and Locations', 9, 'gates-crew-departments.md'],
  ['sound', 'Sound Design and Music', 10, 'gates-crew-departments.md'],
  ['continuity', 'Script Supervisor', 12, 'continuity-audit.md'],
  ['producer', 'First AD / Line Producer', 13, 'logistics-audit.md'],
  ['treatment', 'Director Treatment', 14, 'templates-documents.md'],
  ['storyboard', 'Shot List and Storyboard', 15, 'templates-documents.md'],
  ['production-bible', 'Production Bible and Locks', 16, 'deliverables.md'],
  ['image-prompts', 'Image Generation Prompts', 19, 'generation-runbook.md'],
  ['video-prompts', 'Text-to-Video Prompts', 20, 'generation-runbook.md'],
  ['sfx-prompts', 'Sound Effect Prompts', 21, 'generation-runbook.md'],
  ['vo-prompts', 'Arabic and English VO Prompts', 22, 'generation-runbook.md'],
  ['motion-prompts', 'Image-to-Video Prompts', 23, 'generation-runbook.md'],
  ['music-prompts', 'Music Prompts', 24, 'generation-runbook.md'],
];
export const ROLES = Object.fromEntries(definitions.map(([id, name, n, protocol]) => [id, {
  id, name, references: [bible(n), protocol],
}]));
export const CREWS = {
  creative: ['creative', 'treatment', 'storyboard'],
  departments: ['dop', 'colorist', 'editor', 'vfx', 'casting', 'wardrobe', 'makeup', 'voice', 'production-design', 'sound'],
  review: ['continuity', 'producer'],
  prompts: ['image-prompts', 'video-prompts', 'sfx-prompts', 'vo-prompts', 'motion-prompts', 'music-prompts'],
};

export function role(id) {
  if (!Object.hasOwn(ROLES, id)) throw new Error(`Unknown role: ${id}. Run tvc roles.`);
  return ROLES[id];
}
