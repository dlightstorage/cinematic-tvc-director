import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { configHome } from './config.mjs';
import { atomicJSON, readJSON, now } from './store.mjs';

export const SOURCES = {
  openrouter: 'https://openrouter.ai/api/v1/models',
  modelsdev: 'https://models.dev/api.json',
};
const amount = n => n !== null && n !== undefined && n !== '' && Number.isFinite(Number(n)) && Number(n) >= 0 ? Number(n) : null;
const clean = s => String(s || '').replace(/[\u0000-\u001f\u007f-\u009f]/g, '').slice(0, 500);
export function normalizeCatalog(source, data) {
  let models;
  if (source === 'openrouter') {
    if (!Array.isArray(data.data)) throw new Error('Invalid OpenRouter model response.');
    models = data.data.map(m => ({ id: m.id, name: m.name, provider: 'openrouter', author: m.id?.split('/')[0],
      input: amount(m.pricing?.prompt) === null ? null : amount(m.pricing.prompt) * 1e6,
      output: amount(m.pricing?.completion) === null ? null : amount(m.pricing.completion) * 1e6,
      context: amount(m.context_length), outputLimit: amount(m.top_provider?.max_completion_tokens),
      modalities: m.architecture?.output_modalities || [], tools: m.supported_parameters?.includes('tools') ?? null,
      reasoning: m.supported_parameters?.includes('reasoning') ?? null, openWeights: null,
      link: `https://openrouter.ai/${m.id}`, source }));
  } else if (source === 'modelsdev') {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid models.dev response.');
    models = Object.entries(data).flatMap(([provider, p]) => Object.entries(p.models || {}).map(([id, m]) => ({
      id, provider, author: m.family || provider, name: m.name, input: amount(m.cost?.input), output: amount(m.cost?.output),
      context: amount(m.limit?.context), outputLimit: amount(m.limit?.output), modalities: m.modalities?.output || [],
      tools: typeof m.tool_call === 'boolean' ? m.tool_call : null, reasoning: typeof m.reasoning === 'boolean' ? m.reasoning : null,
      openWeights: typeof m.open_weights === 'boolean' ? m.open_weights : null,
      link: /^https:\/\//.test(p.doc || '') ? p.doc : 'https://models.dev', source,
    })));
  } else throw new Error('Unknown catalog source.');
  if (!models.length) throw new Error('Empty catalog; existing cache retained.');
  return models.filter(m => typeof m.id === 'string' && m.id.trim()).map(m => {
    const parameters = [...`${m.id} ${m.name}`.matchAll(/(?:^|[^0-9.])(\d+(?:\.\d+)?)\s*b(?:[^a-z]|$)/ig)].map(x => Number(x[1]));
    const largest = parameters.length ? Math.max(...parameters) : null;
    return ({ ...m,
    id: clean(m.id), name: clean(m.name || m.id), provider: clean(m.provider), author: clean(m.author),
    // Price bands describe cost only, never benchmark quality or model size.
    priceBand: m.input === null || m.output === null ? 'unknown' : m.input + m.output === 0 ? 'free'
      : m.input + m.output <= 2 ? 'economy' : m.input + m.output <= 15 ? 'standard' : 'premium',
    parameterBillions: largest, sizeClass: largest === null ? 'unknown' : largest <= 15 ? 'compact' : largest <= 70 ? 'medium' : 'large',
    access: 'catalog-only; account entitlement and relay compatibility unverified',
  }); });
}
export async function refreshCatalog(source = 'openrouter', fetcher = fetch) {
  if (!SOURCES[source]) throw new Error('Catalog source must be openrouter or modelsdev.');
  const response = await fetcher(SOURCES[source], { signal: AbortSignal.timeout(30000), redirect: 'error' });
  if (!response.ok) throw new Error(`Catalog HTTP ${response.status}; existing cache retained.`);
  const text = await response.text();
  if (text.length > 40_000_000) throw new Error('Catalog response too large.');
  const result = { source, url: SOURCES[source], fetchedAt: now(), models: normalizeCatalog(source, JSON.parse(text)) };
  atomicJSON(join(configHome(), `catalog-${source}.json`), result);
  return { source, fetchedAt: result.fetchedAt, count: result.models.length };
}
export function catalog({ source, search = '', band, size, toolsOnly = false, provider } = {}) {
  if (source && !SOURCES[source]) throw new Error('Unknown catalog source.');
  if (band && !['free', 'economy', 'standard', 'premium', 'unknown'].includes(band)) throw new Error('Invalid price band.');
  if (size && !['compact', 'medium', 'large', 'unknown'].includes(size)) throw new Error('Invalid size class.');
  const snapshots = Object.keys(SOURCES).filter(s => !source || source === s).flatMap(s => {
    const path = join(configHome(), `catalog-${s}.json`); return existsSync(path) ? [readJSON(path)] : [];
  });
  const query = search.toLowerCase();
  return { sources: snapshots.map(({ source: name, fetchedAt }) => ({ source: name, fetchedAt,
    stale: Date.now() - Date.parse(fetchedAt) > 86400000 })),
  priceUnit: 'USD per 1M tokens; advertised API rates, not subscription allowance',
  bandMeaning: 'input + output: free=0, economy<=2, standard<=15, premium>15; not quality rankings',
  models: snapshots.flatMap(s => s.models).filter(m => (!query || `${m.id} ${m.name} ${m.provider} ${m.author}`.toLowerCase().includes(query))
    && (!band || m.priceBand === band) && (!size || m.sizeClass === size) && (!toolsOnly || m.tools === true) && (!provider || m.provider === provider)) };
}
export function estimateTokens(model, inputTokens, outputTokens) {
  if (![inputTokens, outputTokens].every(n => Number.isSafeInteger(n) && n >= 0)) throw new Error('Token counts must be nonnegative integers.');
  if (model.input === null || model.output === null) return { usd: null, reason: 'Pricing unavailable.' };
  return { usd: (inputTokens * model.input + outputTokens * model.output) / 1e6,
    excludes: 'cache, tools, search, media, taxes, provider surcharges and long-context tiers; not a spend cap' };
}
