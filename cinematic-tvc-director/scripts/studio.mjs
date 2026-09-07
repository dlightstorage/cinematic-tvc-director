import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { stdout } from 'node:process';
import { ROLES } from './lib/roles.mjs';
import { configLocation, loadConfig, validateConfig, writeConfig } from './lib/config.mjs';
import { discover } from './lib/adapter.mjs';
import { installProvider, installSkill } from './lib/install.mjs';
import { CORE_PROVIDERS, loginProvider, providerState } from './lib/accounts.mjs';
import { ACCOUNT_MODES, ROLE_PRESETS, buildRecommendedConfig } from './lib/tvc-presets.mjs';
import { GROUPS, renderCrewTable, renderProductionSummary } from './setup-wizard.mjs';

const ASSETS = Object.freeze({
  '': ['index.html', 'text/html; charset=utf-8'],
  'app.js': ['app.js', 'text/javascript; charset=utf-8'],
  'styles.css': ['styles.css', 'text/css; charset=utf-8'],
});
const EFFORTS = Object.freeze({ codex: ['', 'low', 'medium', 'high', 'xhigh', 'max'], claude: ['', 'low', 'medium', 'high'] });

function accountModeFor(config) {
  const codex = config?.enabled?.includes('codex');
  const claude = config?.enabled?.includes('claude');
  if (codex && claude) return 'dual';
  if (claude) return 'claude';
  return 'codex';
}

function roleBinding(config, roleId) {
  return roleId === 'director' ? config.orchestrator : config.roles[roleId] || config.default;
}

function metadata(config) {
  const setup = config.setup || {};
  return {
    basis: Object.fromEntries(Object.keys(ROLES).map(id => [id, setup.basis?.[id] || ROLE_PRESETS[id]?.why || 'Current manual configuration'])),
    complexity: Object.fromEntries(Object.keys(ROLES).map(id => [id, setup.complexity?.[id] || ROLE_PRESETS[id]?.level || 'custom'])),
  };
}

function clientState({ config, report, cwd, scope, basis, complexity, onboarding }) {
  const groupByRole = Object.fromEntries(GROUPS.flatMap(group => group.roles.map(id => [id, group.id])));
  groupByRole.director = 'direction';
  return {
    product: { name: 'Cinematic TVC Director', version: '0.6.0' },
    cwd,
    scope,
    onboarding,
    accountMode: accountModeFor(config),
    config,
    basis,
    complexity,
    accountModes: ACCOUNT_MODES,
    groups: [{ id: 'direction', label: 'Direction', roles: ['director'] }, ...GROUPS],
    roles: Object.values(ROLES).map(item => ({ ...item, group: groupByRole[item.id] })),
    providers: CORE_PROVIDERS.map(key => {
      const entry = report.discovered.find(item => item.key === key);
      return {
        key,
        name: key === 'codex' ? 'Codex (OpenAI)' : 'Claude Code',
        state: providerState(report, key),
        version: entry?.version || 'Not installed',
        models: entry?.models?.values || [],
        supports: entry?.supports || [],
        efforts: EFFORTS[key],
      };
    }),
  };
}

function json(response, status, value) {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(body);
}

async function bodyJSON(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) throw new Error('Request is too large.');
  }
  return JSON.parse(body || '{}');
}

function open(url) {
  let child;
  if (process.platform === 'win32') {
    const candidates = [
      process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
      process.env['ProgramFiles(x86)'] && `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
      process.env.PROGRAMFILES && `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
      process.env['ProgramFiles(x86)'] && `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
      process.env.PROGRAMFILES && `${process.env.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe`,
    ].find(path => path && existsSync(path));
    child = candidates
      ? spawn(candidates, [`--app=${url}`], { windowsHide: false, detached: true, stdio: 'ignore' })
      : spawn('cmd.exe', ['/d', '/s', '/c', `start "" "${url}"`], { windowsHide: true, detached: true, stdio: 'ignore' });
  }
  else if (process.platform === 'darwin') child = spawn('open', [url], { detached: true, stdio: 'ignore' });
  else child = spawn('xdg-open', [url], { detached: true, stdio: 'ignore' });
  child.on('error', () => {});
  child.unref();
}

function assertReady(report, mode) {
  for (const provider of ACCOUNT_MODES[mode].providers) {
    const state = providerState(report, provider);
    if (state !== 'ready') throw new Error(`${provider} is ${state.replaceAll('-', ' ')}. Run tvc setup to install or sign in, then reopen Studio.`);
  }
}

function knownModels(report, original) {
  const values = Object.fromEntries(CORE_PROVIDERS.map(provider => [provider, new Set(
    report.discovered.find(item => item.key === provider)?.models?.values || [],
  )]));
  if (original) for (const roleId of Object.keys(ROLES)) {
    const binding = roleBinding(original, roleId);
    if (binding?.model && values[binding.implementer]) values[binding.implementer].add(binding.model);
  }
  return values;
}

function validateStudioConfig(candidate, { mode, report, original }) {
  if (!Object.hasOwn(ACCOUNT_MODES, mode)) throw new Error('Choose a valid account mode.');
  assertReady(report, mode);
  const config = structuredClone(candidate);
  config.enabled = [...ACCOUNT_MODES[mode].providers];
  const models = knownModels(report, original);
  for (const roleId of Object.keys(ROLES)) {
    const binding = roleBinding(config, roleId);
    if (!binding || !config.enabled.includes(binding.implementer)) throw new Error(`${roleId} must use one of the selected accounts.`);
    if (binding.model && !models[binding.implementer]?.has(binding.model)) throw new Error(`${binding.model} was not reported by the ${binding.implementer} CLI.`);
    if (binding.effort && !EFFORTS[binding.implementer]?.includes(binding.effort)) throw new Error(`${binding.effort} is not available for ${binding.implementer}.`);
  }
  return validateConfig(config);
}

export async function createStudioSession({
  cwd = process.cwd(),
  port = 0,
  openBrowser = true,
  mode = 'studio',
  report: suppliedReport,
  discoverFn = discover,
  installProviderFn = installProvider,
  loginProviderFn = loginProvider,
  installSkillFn = installSkill,
} = {}) {
  let report = suppliedReport || await discoverFn();
  const location = configLocation(cwd);
  const existing = existsSync(location.path) ? loadConfig(cwd) : null;
  const onboarding = mode === 'onboard' || !existing;
  const defaultMode = existing ? accountModeFor(existing)
    : CORE_PROVIDERS.every(key => providerState(report, key) === 'ready') ? 'dual'
      : providerState(report, 'claude') === 'ready' ? 'claude' : 'codex';
  const initial = existing ? { config: structuredClone(existing), ...metadata(existing) }
    : buildRecommendedConfig({ accountMode: defaultMode, report });
  const token = randomBytes(24).toString('hex');
  const prefix = `/${token}/`;
  let current = clientState({ ...initial, report, cwd, scope: location.source, onboarding });
  let finish;
  const done = new Promise(resolveDone => { finish = resolveDone; });
  let settled = false;
  let providerOperation = false;

  const server = createServer(async (request, response) => {
    try {
      const host = request.headers.host || '';
      if (!/^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(host)) return json(response, 403, { error: 'Loopback access only.' });
      const url = new URL(request.url, `http://${host}`);
      if (!url.pathname.startsWith(prefix)) return json(response, 404, { error: 'Not found.' });
      const route = url.pathname.slice(prefix.length);
      if (request.method === 'GET' && Object.hasOwn(ASSETS, route)) {
        const [file, type] = ASSETS[route];
        const body = readFileSync(new URL(`./assets/studio/${file}`, import.meta.url));
        response.writeHead(200, {
          'Content-Type': type,
          'Content-Length': body.length,
          'Cache-Control': 'no-store',
          'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
          'Referrer-Policy': 'no-referrer',
          'X-Content-Type-Options': 'nosniff',
        });
        return response.end(body);
      }
      if (request.method === 'GET' && route === 'api/state') return json(response, 200, current);
      if (request.method === 'POST' && route === 'api/provider') {
        if (providerOperation) return json(response, 409, { error: 'Another account operation is still running.' });
        const { provider, action } = await bodyJSON(request);
        if (!CORE_PROVIDERS.includes(provider)) return json(response, 400, { error: 'Choose Codex or Claude.' });
        if (!['install', 'login', 'refresh'].includes(action)) return json(response, 400, { error: 'Unknown account action.' });
        const before = providerState(report, provider);
        if (action === 'install' && before !== 'install-required') return json(response, 409, { error: `${provider} CLI is already installed.` });
        if (action === 'login' && before === 'install-required') return json(response, 409, { error: `Install ${provider} CLI before signing in.` });
        if (action === 'login' && before === 'ready') return json(response, 409, { error: `${provider} is already signed in.` });
        providerOperation = true;
        try {
          if (action === 'install') await installProviderFn(provider);
          if (action === 'login') await loginProviderFn(provider, report);
          report = await discoverFn();
          current = clientState({ ...current, report, cwd, onboarding });
          const status = providerState(report, provider);
          return json(response, 200, { ...current, accountResult: { provider, action, status } });
        } finally {
          providerOperation = false;
        }
      }
      if (request.method === 'POST' && route === 'api/preset') {
        const { accountMode } = await bodyJSON(request);
        if (!Object.hasOwn(ACCOUNT_MODES, accountMode)) return json(response, 400, { error: 'Unknown account mode.' });
        assertReady(report, accountMode);
        const preset = buildRecommendedConfig({ accountMode, report, existing: current.config });
        current = clientState({ ...preset, report, cwd, scope: current.scope, onboarding });
        return json(response, 200, current);
      }
      if (request.method === 'POST' && route === 'api/save') {
        const payload = await bodyJSON(request);
        if (!['global', 'project'].includes(payload.scope)) return json(response, 400, { error: 'Choose global or project scope.' });
        const config = validateStudioConfig(payload.config, { mode: payload.accountMode, report, original: existing });
        config.setup = {
          version: 'tvc-fleet-setup.v3',
          preset: 'advertising-studio.v1',
          accountMode: payload.accountMode,
          scope: payload.scope,
          approvedAt: new Date().toISOString(),
          basis: payload.basis || current.basis,
          complexity: payload.complexity || current.complexity,
        };
        const saved = writeConfig(config, { scope: payload.scope, cwd });
        current = clientState({ config, report, cwd, scope: payload.scope, basis: config.setup.basis, complexity: config.setup.complexity, onboarding });
        const skillInstalls = [];
        const warnings = [];
        if (onboarding) for (const provider of config.enabled) {
          try {
            const installed = installSkillFn(provider, undefined, true);
            skillInstalls.push({ provider, destination: installed.destination });
          } catch (error) {
            warnings.push(`${provider}: ${error.message}`);
          }
        }
        const result = { action: 'saved', saved, scope: payload.scope, accountMode: payload.accountMode, config, basis: current.basis, complexity: current.complexity, skillInstalls, warnings };
        json(response, 200, { ok: true, saved, skillInstalls, warnings });
        settled = true;
        finish(result);
        return setTimeout(() => {
          server.close();
          server.closeAllConnections?.();
        }, 700);
      }
      if (request.method === 'POST' && route === 'api/cancel') {
        json(response, 200, { ok: true });
        settled = true;
        finish({ action: 'cancelled' });
        return setTimeout(() => {
          server.close();
          server.closeAllConnections?.();
        }, 200);
      }
      return json(response, 404, { error: 'Not found.' });
    } catch (error) {
      return json(response, 400, { error: error.message });
    }
  });

  server.on('close', () => {
    if (!settled) finish({ action: 'closed' });
  });
  await new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolveListen);
  });
  const address = server.address();
  const url = `http://127.0.0.1:${address.port}${prefix}`;
  if (openBrowser) open(url);
  return { url, done, close: () => server.close() };
}

export async function studio(options = {}) {
  const firstRun = options.mode === 'onboard';
  stdout.write(`${firstRun ? 'Cinematic TVC Onboarding' : 'Cinematic TVC Studio'} is checking your accounts and models...\n`);
  const session = await createStudioSession(options);
  stdout.write(`Studio opened at ${session.url}\nKeep this terminal open until you choose Save & Apply or Cancel.\n`);
  const result = await session.done;
  if (result.action !== 'saved') return 'Studio closed. No settings were changed.';
  return [
    '',
    'CINEMATIC TVC DIRECTOR - ACTIVE CREW',
    renderProductionSummary(result.config, result.accountMode),
    '',
    renderCrewTable(result.config, result.basis, result.complexity),
    '',
    `Saved: ${result.saved}`,
    ...(result.skillInstalls?.length ? [`Skills: ${result.skillInstalls.map(item => `${item.provider} -> ${item.destination}`).join('; ')}`] : []),
    ...(result.warnings?.length ? [`Warnings: ${result.warnings.join('; ')}`] : []),
    'The selected crew is active for future TVC work.',
  ].join('\n');
}

export async function onboard(options = {}) {
  return studio({ ...options, mode: 'onboard' });
}
