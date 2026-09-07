import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, delimiter } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { SKILL_ROOT } from './roles.mjs';

export function installSkill(host, target, update = false) {
  const roots = { codex: join(process.env.CODEX_HOME || join(homedir(), '.codex'), 'skills'),
    claude: join(homedir(), '.claude/skills'), agents: join(homedir(), '.agents/skills') };
  if (!target && !roots[host]) throw new Error('Choose --host codex, claude, agents, or provide --target <skills-directory>.');
  const hostRoot = resolve(target || roots[host]);
  const destination = join(hostRoot, 'cinematic-tvc-director');
  const setupSource = join(dirname(SKILL_ROOT), 'cinematic-tvc-setup');
  const setupDestination = join(hostRoot, 'cinematic-tvc-setup');
  mkdirSync(hostRoot, { recursive: true });
  const sync = (source, targetPath) => {
    let stat = null;
    try { stat = lstatSync(targetPath); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (stat && !update) throw new Error(`Skill already exists at ${targetPath}. Pass --update after reviewing the new version, or install to a separate --target.`);
    if (stat?.isSymbolicLink()) return { existed: true, linked: true };
    if (stat && !stat.isDirectory()) throw new Error(`Cannot overwrite non-directory skill path: ${targetPath}`);
    cpSync(source, targetPath, { recursive: true });
    return { existed: Boolean(stat), linked: false };
  };
  const main = sync(SKILL_ROOT, destination);
  const setup = existsSync(setupSource) ? sync(setupSource, setupDestination) : null;
  return {
    destination,
    setupDestination: setup ? setupDestination : null,
    updated: main.existed,
    preservedSymlinks: [main.linked ? destination : null, setup?.linked ? setupDestination : null].filter(Boolean),
  };
}
function run(command, args) {
  return new Promise((resolveResult, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', windowsHide: true });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolveResult() : reject(new Error(`Installer exited ${code}`)));
  });
}
export async function installProvider(id) {
  if (!['codex', 'claude', 'agy'].includes(id)) throw new Error('Automatic installers: codex, claude, agy. Install other CLIs through their official installer, then run tvc doctor.');
  if (id === 'codex') {
    const candidates = (process.env.PATH || '').split(delimiter).flatMap(p => [join(p, 'node_modules/npm/bin/npm-cli.js'), join(p, '../lib/node_modules/npm/bin/npm-cli.js')]);
    const npm = candidates.find(existsSync);
    if (!npm) throw new Error('Cannot locate npm-cli.js. Install Node with npm, or run npm install -g @openai/codex.');
    await run(process.execPath, [npm, 'install', '--global', '@openai/codex']);
  } else {
    const extension = process.platform === 'win32' ? 'ps1' : 'sh';
    const url = id === 'claude' ? `https://claude.ai/install.${extension}` : `https://antigravity.google/cli/install.${extension}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Vendor installer download failed: HTTP ${response.status}`);
    const content = await response.text();
    if (!content.trim() || /^\s*<!doctype html/i.test(content)) throw new Error('Vendor returned a web page rather than an installer.');
    const path = join(mkdtempSync(join(tmpdir(), 'tvc-installer-')), `install.${extension}`);
    writeFileSync(path, content);
    await run(process.platform === 'win32' ? 'powershell.exe' : 'bash', process.platform === 'win32' ? ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path] : [path]);
  }
  return 'Installer finished. Open a fresh terminal, sign in through the provider CLI, then run tvc doctor.';
}
