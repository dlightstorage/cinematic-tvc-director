import { spawn } from 'node:child_process';

export const CORE_PROVIDERS = Object.freeze(['codex', 'claude']);

export function providerRecord(report, key) {
  return report.discovered.find(item => item.key === key) || null;
}

export function providerState(report, key) {
  const entry = providerRecord(report, key);
  if (!entry) return 'install-required';
  if (entry.authenticated === true) return 'ready';
  if (entry.authenticated === false) return 'sign-in-required';
  return 'verification-required';
}

export function loginCommand(provider) {
  if (provider === 'codex') return { label: 'codex login', args: ['login'] };
  if (provider === 'claude') return { label: 'claude auth login', args: ['auth', 'login'] };
  throw new Error(`Interactive sign-in is not supported for ${provider}.`);
}

export function loginProvider(provider, report) {
  const entry = providerRecord(report, provider);
  if (!entry) throw new Error(`${provider} CLI is not installed.`);
  const command = loginCommand(provider);
  return new Promise((resolve, reject) => {
    const child = spawn(entry.path || entry.binary || provider, command.args, {
      stdio: 'inherit',
      windowsHide: false,
      shell: process.platform === 'win32',
    });
    child.once('error', reject);
    child.once('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`${command.label} exited with code ${code}.`));
    });
  });
}
