import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('./tvc.mjs', import.meta.url));
const menu = `
CINEMATIC TVC DIRECTOR
  1  Setup / edit fleet
  2  Doctor: installed tools and account access
  3  Model catalog: refresh and search
  4  Subscription and billing guide
  5  Show all role assignments
  6  Create a production project
  7  Select an existing project
  8  Plan / continue intake gates
  9  Show decisions
 10  Approve a decision
 11  Approve plan
 12  Run / resume production
 13  Show status
 14  Export approved packages
 15  Assign provider/model to one role
 16  List or install provider CLIs
  0  Exit
`;
function call(args, cwd) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd, stdio: 'inherit', windowsHide: false });
  if (result.error) throw result.error;
  return result.status;
}
export async function studio() {
  if (!stdin.isTTY) throw new Error('tvc studio needs an interactive terminal.');
  const terminal = createInterface({ input: stdin, output: stdout });
  let project = process.cwd();
  try {
    while (true) {
      stdout.write(`${menu}\nCurrent project: ${project}\n`);
      const choice = (await terminal.question('Choose: ')).trim();
      if (choice === '0') break;
      if (choice === '1') {
        call(['setup']);
      } else if (choice === '2') call(['doctor']);
      else if (choice === '3') {
        const source = (await terminal.question('Refresh source [openrouter/modelsdev] (openrouter): ')).trim() || 'openrouter';
        call(['catalog', 'refresh', source]);
        const search = (await terminal.question('Search name/provider (blank for all): ')).trim();
        const band = (await terminal.question('Cost band [free/economy/standard/premium/unknown] (blank for all): ')).trim();
        call(['catalog', 'list', source, ...(search ? ['--search', search] : []), ...(band ? ['--band', band] : [])]);
      } else if (choice === '4') {
        const provider = (await terminal.question('Provider (blank for overview): ')).trim(); call(['plans', ...(provider ? [provider] : [])]);
      } else if (choice === '5') call(['roles']);
      else if (choice === '15') {
        const role = (await terminal.question('Role ID (director, creative, dop, ...): ')).trim();
        const provider = (await terminal.question('Provider CLI ID: ')).trim();
        const model = (await terminal.question('Exact model ID (blank uses provider default): ')).trim();
        const effort = (await terminal.question('Effort (blank if unsupported): ')).trim();
        call(['assign', role, '--provider', provider, ...(model ? ['--model', model] : []), ...(effort ? ['--effort', effort] : [])]);
      }
      else if (choice === '16') {
        call(['providers', 'list']);
        const provider = (await terminal.question('Install provider ID (blank to return): ')).trim();
        if (provider) call(['providers', 'install', provider]);
      }
      else if (choice === '6') {
        const directory = (await terminal.question('New project directory: ')).trim();
        const brief = (await terminal.question('Brief file path: ')).trim();
        if (call(['init', directory, '--brief', brief]) === 0) project = directory;
      } else if (choice === '7') project = (await terminal.question('Project directory: ')).trim() || project;
      else if (choice === '8') call(['plan', '--project', project]);
      else if (choice === '9') call(['decisions', '--project', project]);
      else if (choice === '10') {
        const id = (await terminal.question('Pending decision ID: ')).trim();
        const value = (await terminal.question('Your exact decision: ')).trim();
        call(['approve', id, '--value', value, '--project', project]);
      } else if (choice === '11') call(['approve', 'plan', '--project', project]);
      else if (choice === '12') call(['resume', '--retry-failed', '--project', project]);
      else if (choice === '13') call(['status', '--project', project]);
      else if (choice === '14') call(['export', '--project', project]);
      else stdout.write('Unknown choice.\n');
      await terminal.question('\nPress Enter to return to the control room...');
    }
  } finally { terminal.close(); }
  return 'Studio closed.';
}
