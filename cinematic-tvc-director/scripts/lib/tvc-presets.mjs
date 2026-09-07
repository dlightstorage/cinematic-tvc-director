import { defaultConfig } from './config.mjs';

export const ACCOUNT_MODES = Object.freeze({
  codex: { label: 'Codex only', providers: ['codex'] },
  dual: { label: 'Codex + Claude', providers: ['codex', 'claude'] },
  claude: { label: 'Claude only', providers: ['claude'] },
});

export const ROLE_PRESETS = Object.freeze({
  director: { provider: 'codex', level: 'heavy', tier: 'flagship', effort: 'xhigh', why: 'Final creative synthesis and approvals' },
  creative: { provider: 'codex', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Core campaign idea and creative direction' },
  research: { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Deep cultural and market reasoning' },
  dop: { provider: 'codex', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Camera language and visual system' },
  colorist: { provider: 'codex', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Controlled look design and matching' },
  editor: { provider: 'codex', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Rhythm, timing and version structure' },
  vfx: { provider: 'codex', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Complex visual execution planning' },
  casting: { provider: 'codex', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Creative casting criteria and options' },
  wardrobe: { provider: 'codex', level: 'light', tier: 'fast', effort: 'low', why: 'Bounded styling decisions' },
  makeup: { provider: 'codex', level: 'light', tier: 'fast', effort: 'low', why: 'Bounded continuity-led decisions' },
  voice: { provider: 'claude', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Language, tone and performance detail' },
  'production-design': { provider: 'codex', level: 'heavy', tier: 'flagship', effort: 'high', why: 'World building and visual coherence' },
  sound: { provider: 'codex', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Audio structure and sonic direction' },
  continuity: { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Independent cross-document consistency' },
  producer: { provider: 'claude', level: 'heavy', tier: 'balanced', effort: 'high', why: 'Constraints, feasibility and risk review' },
  treatment: { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Long-form story and treatment writing' },
  storyboard: { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Narrative breakdown and shot logic' },
  'production-bible': { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Detailed master documentation and locks' },
  'image-prompts': { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Precise cinematic image prompting' },
  'video-prompts': { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Motion, camera and temporal prompting' },
  'sfx-prompts': { provider: 'claude', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Structured sound-effect prompting' },
  'vo-prompts': { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Arabic and English voice prompting' },
  'motion-prompts': { provider: 'claude', level: 'heavy', tier: 'flagship', effort: 'high', why: 'Image-to-video motion instructions' },
  'music-prompts': { provider: 'claude', level: 'medium', tier: 'balanced', effort: 'medium', why: 'Music structure, mood and exclusions' },
});

const MODEL_PREFERENCES = Object.freeze({
  codex: {
    flagship: ['gpt-6-astra', 'gpt-5.6-sol', 'gpt-5.6-terra', 'gpt-5.5'],
    balanced: ['gpt-5.6-sol', 'gpt-5.6-terra', 'gpt-6-astra', 'gpt-5.6-luna'],
    fast: ['gpt-5.6-luna', 'gpt-5.4-mini', 'gpt-5.6-sol'],
  },
  claude: {
    flagship: ['opus', 'fable', 'sonnet', 'haiku'],
    balanced: ['sonnet', 'fable', 'opus', 'haiku'],
    fast: ['haiku', 'sonnet', 'fable', 'opus'],
  },
});

function entryFor(report, provider) {
  return report.discovered.find(item => item.key === provider) || {
    key: provider,
    supports: ['model', 'effort'],
    models: { values: [] },
  };
}

function selectedModel(entry, tier) {
  const values = entry.models?.values || [];
  const preferred = MODEL_PREFERENCES[entry.key]?.[tier] || [];
  return preferred.find(model => values.includes(model)) || values[0] || '';
}

function normalizedEffort(provider, effort) {
  if (provider === 'claude' && ['xhigh', 'max'].includes(effort)) return 'high';
  return effort;
}

export function recommendedBinding(report, provider, tier, effort) {
  const entry = entryFor(report, provider);
  const model = selectedModel(entry, tier);
  const binding = { implementer: provider };
  if (model && entry.supports.includes('model')) binding.model = model;
  if (entry.supports.includes('effort')) binding.effort = normalizedEffort(provider, effort);
  return binding;
}

export function buildRecommendedConfig({ accountMode, report, existing = null }) {
  const mode = ACCOUNT_MODES[accountMode];
  if (!mode) throw new Error(`Unknown account mode: ${accountMode}`);
  const enabled = [...mode.providers];
  const defaultProvider = accountMode === 'claude' ? 'claude' : 'codex';
  const config = defaultConfig(defaultProvider);
  config.enabled = enabled;
  config.default = recommendedBinding(report, defaultProvider, 'balanced', 'medium');
  config.roles = {};
  config.skills = structuredClone(existing?.skills || {});
  config.customProviders = structuredClone(existing?.customProviders || {});
  config.workflowMode = 'original';
  config.authority = 'ask';
  config.concurrency = accountMode === 'dual' ? 4 : 3;
  config.maxRounds = 3;
  config.timeoutSeconds = 1800;

  const basis = {};
  const complexity = {};
  for (const [roleId, preset] of Object.entries(ROLE_PRESETS)) {
    const provider = accountMode === 'dual' ? preset.provider : defaultProvider;
    const binding = recommendedBinding(report, provider, preset.tier, preset.effort);
    complexity[roleId] = preset.level;
    basis[roleId] = preset.why;
    if (roleId === 'director') config.orchestrator = binding;
    else config.roles[roleId] = binding;
  }

  return { config, basis, complexity, accountMode };
}
