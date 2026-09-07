import { createInterface, emitKeypressEvents } from 'node:readline';
import { stdin, stdout } from 'node:process';

const CANCEL = Symbol('cancel');
const ESC = '\u001b[';

export function isCancel(value) { return value === CANCEL; }

function write(line = '') { stdout.write(`${line}\n`); }
function erase(lines) {
  if (!lines) return;
  stdout.write(Array.from({ length: lines }, (_, index) => `${index ? ESC + '1A' : ''}${ESC}2K\r`).join(''));
}

export function intro(message, subtitle = '') {
  const line = '+--------------------------------------------------------------------------+';
  write(`\n${line}`);
  write(`| ${message}`);
  if (subtitle) write(`| ${subtitle}`);
  write(line);
}
export function section(step, title, subtitle = '') {
  write(`\n[ ${step} ] ${title}`);
  write('--------------------------------------------------------------------------');
  if (subtitle) write(subtitle);
}
export function outro(message) { write(`\n[done] ${message}\n`); }
export function cancel(message) { write(`\n[cancelled] ${message}\n`); }
export function note(message, title = 'Details') {
  write(`\n[${title}]`);
  for (const line of String(message).split(/\r?\n/)) write(`  ${line}`);
}

export function spinner() {
  let active = false;
  return {
    start(message) { active = true; stdout.write(`\n[..] ${message}`); },
    stop(message) {
      if (active) stdout.write(`\r${ESC}2K`);
      write(`[ok] ${message}`);
      active = false;
    },
  };
}

function normalizedOptions(options) {
  return options.map(option => typeof option === 'object' ? option : { value: option, label: String(option) });
}

function interactive(render, onKey) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') return Promise.reject(new Error('Interactive setup requires a TTY terminal.'));
  emitKeypressEvents(stdin);
  stdin.setRawMode(true);
  stdin.resume();
  return new Promise((resolve, reject) => {
    let renderedLines = 0;
    const repaint = () => {
      erase(renderedLines);
      const lines = render();
      stdout.write(lines.join('\n'));
      renderedLines = lines.length;
    };
    const cleanup = () => {
      stdin.off('keypress', keypress);
      stdin.setRawMode(false);
      stdin.pause();
    };
    const keypress = (character, key = {}) => {
      try {
        if (key.ctrl && key.name === 'c') { cleanup(); resolve(CANCEL); return; }
        const result = onKey(character, key);
        if (result?.done) { cleanup(); erase(renderedLines); resolve(result.value); return; }
        repaint();
      } catch (error) { cleanup(); reject(error); }
    };
    stdin.on('keypress', keypress);
    repaint();
  });
}

function filtered(options, query) {
  if (!query) return options.map((option, index) => ({ option, index }));
  const needle = query.toLowerCase();
  return options.map((option, index) => ({ option, index })).filter(({ option }) => `${option.label} ${option.hint || ''}`.toLowerCase().includes(needle));
}

function keyQuery(character, key, state) {
  if (key.name === 'backspace') state.query = state.query.slice(0, -1);
  else if (!key.ctrl && !key.meta && character && character.length === 1 && /[\x20-\x7e]/.test(character)) state.query += character;
}

export function select({ message, options, initialValue }) {
  const values = normalizedOptions(options).filter(option => !option.disabled);
  if (!values.length) return Promise.reject(new Error(`No choices available for: ${message}`));
  const initial = Math.max(0, values.findIndex(option => option.value === initialValue));
  const state = { cursor: initial, query: '' };
  const render = () => {
    const matches = filtered(values, state.query);
    if (state.cursor >= matches.length) state.cursor = Math.max(0, matches.length - 1);
    const from = Math.max(0, Math.min(state.cursor - 5, Math.max(0, matches.length - 12)));
    const visible = matches.slice(from, from + 12);
    return [
      `? ${message}`,
      ...(values.length > 12 || state.query ? [`  Filter: ${state.query || '(type to search)'}`] : []),
      ...(visible.length ? visible.map(({ option }, offset) => {
        const active = from + offset === state.cursor;
        return `${active ? '>' : ' '} ${active ? '(*)' : '( )'} ${option.label}${option.hint ? ` - ${option.hint}` : ''}`;
      }) : ['  No matching choices. Backspace to change the filter.']),
      '  Arrow keys move, type filters, Enter selects, Ctrl+C cancels',
    ];
  };
  return interactive(render, (character, key) => {
    const matches = filtered(values, state.query);
    if (key.name === 'up') state.cursor = Math.max(0, state.cursor - 1);
    else if (key.name === 'down') state.cursor = Math.min(Math.max(0, matches.length - 1), state.cursor + 1);
    else if (key.name === 'home') state.cursor = 0;
    else if (key.name === 'end') state.cursor = Math.max(0, matches.length - 1);
    else if (key.name === 'return' && matches.length) return { done: true, value: matches[state.cursor].option.value };
    else keyQuery(character, key, state);
    return null;
  });
}

export function multiselect({ message, options, initialValues = [], required = false }) {
  const values = normalizedOptions(options).filter(option => !option.disabled);
  if (!values.length) return Promise.reject(new Error(`No choices available for: ${message}`));
  const selected = new Set(initialValues);
  const state = { cursor: 0, query: '' };
  const render = () => {
    const matches = filtered(values, state.query);
    if (state.cursor >= matches.length) state.cursor = Math.max(0, matches.length - 1);
    const from = Math.max(0, Math.min(state.cursor - 5, Math.max(0, matches.length - 12)));
    const visible = matches.slice(from, from + 12);
    return [
      `? ${message}`,
      ...(values.length > 12 || state.query ? [`  Filter: ${state.query || '(type to search)'}`] : []),
      ...visible.map(({ option }, offset) => {
        const active = from + offset === state.cursor;
        return `${active ? '>' : ' '} [${selected.has(option.value) ? 'x' : ' '}] ${option.label}${option.hint ? ` - ${option.hint}` : ''}`;
      }),
      `  ${selected.size} selected. Arrow keys move, Space toggles, Enter confirms`,
    ];
  };
  return interactive(render, (character, key) => {
    const matches = filtered(values, state.query);
    if (key.name === 'up') state.cursor = Math.max(0, state.cursor - 1);
    else if (key.name === 'down') state.cursor = Math.min(Math.max(0, matches.length - 1), state.cursor + 1);
    else if (key.name === 'space' && matches.length) {
      const value = matches[state.cursor].option.value;
      if (selected.has(value)) selected.delete(value); else selected.add(value);
    } else if (key.name === 'return') {
      if (!required || selected.size) return { done: true, value: [...selected] };
    } else keyQuery(character, key, state);
    return null;
  });
}

export function confirm({ message, initialValue = false }) {
  return select({
    message,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    initialValue,
  });
}

export function text({ message, placeholder = '', initialValue = '', validate }) {
  if (!stdin.isTTY) return Promise.reject(new Error('Interactive setup requires a TTY terminal.'));
  return new Promise(resolve => {
    const ask = () => {
      const suffix = initialValue ? ` [${initialValue}]` : placeholder ? ` (${placeholder})` : '';
      const terminal = createInterface({ input: stdin, output: stdout });
      terminal.question(`? ${message}${suffix}: `, value => {
        terminal.close();
        const result = value || initialValue || '';
        const error = validate?.(result);
        if (error) { write(`! ${error}`); ask(); }
        else resolve(result);
      });
    };
    ask();
  });
}
