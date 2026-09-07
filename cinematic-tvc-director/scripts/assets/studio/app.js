const $ = selector => document.querySelector(selector);
const api = route => `api/${route}`;
let state;
let dirty = false;
let busy = false;

function node(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(options)) {
    if (key === 'class') element.className = value;
    else if (key === 'text') element.textContent = value;
    else if (key.startsWith('data-')) element.dataset[key.slice(5)] = value;
    else element.setAttribute(key, value);
  }
  for (const child of children) element.append(child);
  return element;
}

async function request(route, options = {}) {
  const response = await fetch(api(route), {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const value = await response.json();
  if (!response.ok) throw new Error(value.error || 'Studio request failed.');
  return value;
}

function bindingFor(roleId) {
  return roleId === 'director' ? state.config.orchestrator : state.config.roles[roleId] || state.config.default;
}

function setBinding(roleId, binding) {
  if (roleId === 'director') state.config.orchestrator = binding;
  else state.config.roles[roleId] = binding;
  state.basis[roleId] = 'Your Studio override';
  markDirty();
  renderMetrics();
  renderTechnical();
}

function provider(key) { return state.providers.find(item => item.key === key); }
function selectedProviders() { return state.accountModes[state.accountMode].providers; }

function option(value, label = value) {
  return node('option', { value, text: label });
}

function select(values, selected, labelFor = value => value) {
  const control = node('select');
  for (const value of values) control.append(option(value, labelFor(value)));
  control.value = selected ?? '';
  return control;
}

function markDirty(value = true) {
  dirty = value;
  $('#change-status').textContent = dirty ? 'Unsaved changes' : 'No unsaved changes';
}

function showToast(message, error = false) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.className = `toast show${error ? ' error' : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = 'toast'; }, 3600);
}

function renderAccounts() {
  const modes = $('#account-modes');
  modes.replaceChildren();
  for (const [key, mode] of Object.entries(state.accountModes)) {
    const unavailable = mode.providers.some(id => provider(id).state !== 'ready');
    const button = node('button', {
      type: 'button',
      class: key === state.accountMode ? 'active' : '',
      'aria-checked': String(key === state.accountMode),
      role: 'radio',
      text: mode.label,
    });
    button.disabled = unavailable || busy;
    button.title = unavailable ? 'Install or sign in from tvc setup first' : '';
    button.addEventListener('click', () => changeMode(key));
    modes.append(button);
  }

  const status = $('#provider-status');
  status.replaceChildren();
  for (const item of state.providers) {
    const chip = node('div', { class: `provider-chip ${item.state}` }, [
      node('strong', { text: item.name }),
      node('span', { class: 'state', text: item.state.replaceAll('-', ' ') }),
      node('span', { text: `${item.models.length} models` }),
      node('span', { text: item.version }),
    ]);
    status.append(chip);
  }
}

async function changeMode(mode, force = false) {
  if (mode === state.accountMode && !force) return;
  if (dirty && !force && !window.confirm('Load a new expert preset and replace the edits currently on screen?')) return;
  try {
    busy = true;
    renderAccounts();
    state = await request('preset', { method: 'POST', body: JSON.stringify({ accountMode: mode }) });
    dirty = true;
    renderAll();
    showToast('Expert advertising preset loaded. Review it before applying.');
  } catch (error) {
    showToast(error.message, true);
  } finally {
    busy = false;
    renderAccounts();
  }
}

function renderMetrics() {
  const director = bindingFor('director');
  $('#metric-director').textContent = `${director.implementer} / ${director.model || 'default'}`;
  $('#metric-roles').textContent = String(state.roles.length);
  $('#metric-accounts').textContent = selectedProviders().map(id => provider(id).name).join(' + ');
  $('#metric-concurrency').textContent = String(state.config.concurrency);
}

function currentFilter() {
  return { search: $('#role-search').value.trim().toLowerCase(), group: $('#group-filter').value };
}

function renderCrew() {
  const body = $('#crew-body');
  body.replaceChildren();
  const filter = currentFilter();
  const visible = state.roles.filter(role => {
    const haystack = `${role.id} ${role.name} ${state.basis[role.id] || ''}`.toLowerCase();
    return (!filter.search || haystack.includes(filter.search)) && (filter.group === 'all' || role.group === filter.group);
  });
  for (const role of visible) body.append(roleRow(role));
  $('#visible-count').textContent = `${visible.length} of ${state.roles.length} roles`;
}

function roleRow(role) {
  const binding = bindingFor(role.id);
  const providerSelect = select(selectedProviders(), binding.implementer, id => provider(id).name);
  const modelSelect = selectModels(binding.implementer, binding.model || '');
  const effortSelect = selectEfforts(binding.implementer, binding.effort || '');

  providerSelect.addEventListener('change', () => {
    const nextProvider = providerSelect.value;
    const next = { implementer: nextProvider };
    const models = provider(nextProvider).models;
    if (models.length) next.model = models[0];
    if (provider(nextProvider).supports.includes('effort')) next.effort = 'medium';
    setBinding(role.id, next);
    renderCrew();
  });
  modelSelect.addEventListener('change', () => {
    const next = { ...bindingFor(role.id) };
    if (modelSelect.value) next.model = modelSelect.value;
    else delete next.model;
    setBinding(role.id, next);
  });
  effortSelect.addEventListener('change', () => {
    const next = { ...bindingFor(role.id) };
    if (effortSelect.value) next.effort = effortSelect.value;
    else delete next.effort;
    setBinding(role.id, next);
  });

  return node('tr', {}, [
    node('td', { class: 'role-name' }, [node('strong', { text: role.name }), node('small', { text: state.basis[role.id] })]),
    node('td', {}, [node('span', { class: `level ${state.complexity[role.id]}`, text: state.complexity[role.id] })]),
    node('td', {}, [providerSelect]),
    node('td', {}, [modelSelect]),
    node('td', {}, [effortSelect]),
    node('td', { class: 'refs', text: String(role.references.length) }),
  ]);
}

function selectModels(providerId, selected) {
  const values = ['', ...provider(providerId).models];
  if (selected && !values.includes(selected)) values.push(selected);
  return select(values, selected, value => value || 'Provider default');
}

function selectEfforts(providerId, selected) {
  return select(provider(providerId).efforts, selected, value => value ? value.toUpperCase() : 'Provider default');
}

function renderProduction() {
  $('#workflow').value = state.config.workflowMode;
  $('#authority').value = state.config.authority;
  $('#concurrency').value = String(state.config.concurrency);
  $('#rounds').value = String(state.config.maxRounds);
  $('#timeout').value = String(state.config.timeoutSeconds);
}

function renderTechnical() {
  $('#technical-json').textContent = JSON.stringify(state.config, null, 2);
}

function renderScope() {
  $('#scope').value = state.scope;
  $('#scope-path').textContent = state.scope === 'global' ? 'Saved in your user configuration.' : state.cwd;
}

function renderAll() {
  renderAccounts();
  renderMetrics();
  renderCrew();
  renderProduction();
  renderTechnical();
  renderScope();
  markDirty(dirty);
}

function fact(label, value) {
  return node('div', {}, [node('span', { text: label }), node('strong', { text: value })]);
}

function reviewSave() {
  const director = bindingFor('director');
  $('#confirm-summary').textContent = 'The terminal runtime will use these assignments for future advertising work. Existing project snapshots remain unchanged until you run tvc use-config inside them.';
  $('#confirm-facts').replaceChildren(
    fact('Accounts', state.accountModes[state.accountMode].label),
    fact('Director', `${director.implementer} / ${director.model || 'default'}`),
    fact('Scope', state.scope),
  );
  $('#confirm-dialog').showModal();
}

async function save() {
  if (busy) return;
  try {
    busy = true;
    $('#confirm-save').disabled = true;
    $('#save').disabled = true;
    const result = await request('save', {
      method: 'POST',
      body: JSON.stringify({ config: state.config, accountMode: state.accountMode, scope: state.scope, basis: state.basis, complexity: state.complexity }),
    });
    dirty = false;
    window.onbeforeunload = null;
    document.body.replaceChildren(node('div', { class: 'complete-screen' }, [
      node('div', { class: 'loader-mark', text: 'OK' }),
      node('h1', { text: 'Production crew activated' }),
      node('p', { text: 'Your settings are now printed in the terminal. This tab will close.' }),
    ]));
    setTimeout(() => window.close(), 350);
    return result;
  } catch (error) {
    busy = false;
    $('#confirm-save').disabled = false;
    $('#save').disabled = false;
    $('#confirm-dialog').close();
    showToast(error.message, true);
  }
}

async function cancel() {
  if (dirty && !window.confirm('Close Studio without saving these changes?')) return;
  window.onbeforeunload = null;
  try { await request('cancel', { method: 'POST', body: '{}' }); } catch {}
  window.close();
  document.body.replaceChildren(node('div', { class: 'complete-screen' }, [
    node('h1', { text: 'Studio closed' }),
    node('p', { text: 'No settings were changed. You can close this tab.' }),
  ]));
}

function bindEvents() {
  $('#role-search').addEventListener('input', renderCrew);
  $('#group-filter').addEventListener('change', renderCrew);
  $('#scope').addEventListener('change', event => {
    state.scope = event.target.value;
    markDirty();
    renderScope();
  });
  for (const [id, key, numeric] of [
    ['workflow', 'workflowMode', false], ['authority', 'authority', false], ['concurrency', 'concurrency', true],
    ['rounds', 'maxRounds', true], ['timeout', 'timeoutSeconds', true],
  ]) {
    $(`#${id}`).addEventListener('change', event => {
      state.config[key] = numeric ? Number(event.target.value) : event.target.value;
      markDirty();
      renderMetrics();
      renderTechnical();
    });
  }
  $('#tabs').addEventListener('click', event => {
    const tab = event.target.closest('[data-tab]');
    if (!tab) return;
    document.querySelectorAll('.tab').forEach(item => item.classList.toggle('active', item === tab));
    document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('active', panel.id === `panel-${tab.dataset.tab}`));
    if (tab.dataset.tab === 'technical') renderTechnical();
  });
  $('#reset-preset').addEventListener('click', () => changeMode(state.accountMode, true));
  $('#save').addEventListener('click', reviewSave);
  $('#confirm-save').addEventListener('click', event => { event.preventDefault(); save(); });
  $('#cancel').addEventListener('click', cancel);
  window.onbeforeunload = () => dirty ? true : undefined;
}

async function start() {
  try {
    state = await request('state');
    const groups = $('#group-filter');
    for (const group of state.groups) groups.append(option(group.id, group.label));
    bindEvents();
    renderAll();
    $('#loading').hidden = true;
    $('#app').hidden = false;
  } catch (error) {
    $('#loading').replaceChildren(node('div', { class: 'complete-screen' }, [
      node('h1', { text: 'Studio could not start' }),
      node('p', { text: error.message }),
    ]));
  }
}

start();
