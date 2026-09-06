import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { IMPLEMENTERS } from '../vendor/delegate-skills/skills/delegate-setup/scripts/implementers.mjs';
import { atomicJSON, readJSON } from './store.mjs';
import { ROLES, role } from './roles.mjs';

export { IMPLEMENTERS };
export const configHome = () => resolve(process.env.TVC_HOME || join(homedir(), '.config/cinematic-tvc-director'));
export const configPath = () => join(configHome(), 'config.json');
const safeToken = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/;
export function validateBinding(binding, config) {
  if (!binding || typeof binding !== 'object' || Array.isArray(binding)) throw new Error('Invalid model binding.');
  const impl = IMPLEMENTERS.find(i => i.key === binding.implementer);
  const custom = Object.hasOwn(config.customProviders || {}, binding.implementer || '') ? config.customProviders[binding.implementer] : null;
  if (!impl && !custom) throw new Error(`Unknown implementer: ${binding.implementer}`);
  for (const key of Object.keys(binding)) {
    if (!['implementer', 'model', 'effort', 'variant', 'provider'].includes(key)) throw new Error(`Unsupported binding field: ${key}`);
    if (key === 'implementer') continue;
    if (typeof binding[key] !== 'string' || !safeToken.test(binding[key])) throw new Error(`Invalid ${key} token.`);
    if (impl && !impl.supports.includes(key)) throw new Error(`${binding.implementer} does not expose ${key} through its relay.`);
  }
  if (binding.implementer === 'opencode' && !/^[^/]+\/.+/.test(binding.model || '')) throw new Error('OpenCode requires model in provider/model form.');
  return binding;
}
export function validateConfig(config) {
  if (config.schema !== 'tvc-config.v1') throw new Error('Unsupported config schema.');
  if (!Array.isArray(config.enabled) || !config.enabled.length) throw new Error('Select at least one implementer.');
  if (!Number.isInteger(config.concurrency) || config.concurrency < 1 || config.concurrency > 10) throw new Error('concurrency must be 1..10');
  if (!Number.isInteger(config.maxRounds) || config.maxRounds < 1 || config.maxRounds > 5) throw new Error('maxRounds must be 1..5');
  if (!Number.isInteger(config.timeoutSeconds) || config.timeoutSeconds < 5 || config.timeoutSeconds > 7200) throw new Error('timeoutSeconds must be 5..7200');
  if (!['ask', 'director'].includes(config.authority)) throw new Error('authority must be ask or director');
  for (const [key, custom] of Object.entries(config.customProviders || {})) {
    if (!/^[a-z][a-z0-9-]{0,40}$/.test(key) || IMPLEMENTERS.some(i => i.key === key)) throw new Error(`Invalid custom provider name: ${key}`);
    if (typeof custom.relay !== 'string' || !existsSync(custom.relay) || !custom.relay.endsWith('.mjs')) throw new Error(`Custom provider ${key} needs an existing absolute .mjs relay.`);
    if (resolve(custom.relay) !== custom.relay) throw new Error('Custom relay paths must be absolute.');
  }
  for (const id of config.enabled) {
    if (!IMPLEMENTERS.some(i => i.key === id) && !Object.hasOwn(config.customProviders || {}, id)) throw new Error(`Unknown enabled implementer: ${id}`);
  }
  for (const binding of [config.default, config.orchestrator, ...Object.values(config.roles || {})]) {
    validateBinding(binding, config);
    if (!config.enabled.includes(binding.implementer)) throw new Error(`${binding.implementer} is not enabled.`);
  }
  for (const id of Object.keys(config.roles || {})) role(id);
  for (const [id, skills] of Object.entries(config.skills || {})) {
    role(id);
    if (!Array.isArray(skills) || skills.some(s => typeof s !== 'string' || !existsSync(join(s, 'SKILL.md')))) throw new Error(`Invalid skills for ${id}`);
  }
  return config;
}
export function defaultConfig(implementer = 'codex', model) {
  const binding = { implementer, ...(model ? { model } : {}) };
  return { schema: 'tvc-config.v1', enabled: [implementer], default: binding, orchestrator: { ...binding },
    roles: {}, skills: {}, customProviders: {}, concurrency: 3, maxRounds: 2, timeoutSeconds: 1200, authority: 'ask' };
}
export function loadConfig() {
  if (!existsSync(configPath())) throw new Error('No configuration. Run tvc setup first.');
  return validateConfig(readJSON(configPath()));
}
export function writeConfig(config) { atomicJSON(configPath(), validateConfig(config)); }
export function bindingFor(config, id) {
  role(id);
  return validateBinding(id === 'director' ? config.orchestrator : config.roles[id] || config.default, config);
}
export function listRoles(config) {
  return Object.values(ROLES).map(r => ({ id: r.id, name: r.name, ...bindingFor(config, r.id), skills: config.skills[r.id] || [] }));
}
