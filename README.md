# Cinematic TVC Director

An installable terminal production crew for cinematic commercials. Choose the
orchestrator and each department's agent CLI/model, delegate actual processes,
review disagreements, and resume projects from saved state.

Built on the real [delegate-skills](https://github.com/amElnagdy/delegate-skills)
relays from the [reference video](https://www.youtube.com/watch?v=YZbu0fndK40),
with the supplied cinematic production library preserved. Source revision and
license attribution are in [THIRD-PARTY.md](THIRD-PARTY.md).

## Install

Requirements: Node.js 22+, Git, and at least one installed/authenticated agent CLI.
Clone the repository (GitHub access is required while it is private):

```sh
git clone https://github.com/dlightstorage/cinematic-tvc-director.git
cd cinematic-tvc-director
```

On Windows:

```powershell
.\install.ps1
tvc setup
tvc doctor
```

On macOS/Linux use `sh install.sh`. Or run `npm install --global .` directly.
No npm registry release is claimed; installation currently uses the repository
or the generated `.tgz` archive. To try it without global installation:

```sh
node cinematic-tvc-director/scripts/tvc.mjs help
```

Install the self-contained skill into a host:

```sh
tvc install-skill --host codex
tvc install-skill --host claude
tvc install-skill --host agents
```

The installer refuses to overwrite an existing skill. Use `--target` for a separate
comparison installation. Existing cinematic source files are not discarded.

## Choose Your Fleet

Interactive `tvc setup` selects enabled tools, the default crew binding, and the
director independently. For scripted setup:

```sh
tvc setup --provider codex --enable codex,claude,agy
tvc assign director --provider claude --model sonnet
tvc assign dop --provider codex
tvc assign voice --provider agy
tvc models --provider codex
tvc configure --concurrency 3 --authority ask
```

Examples are configurable choices, not prescribed model assignments. `tvc roles`
shows all 23 roles; `tvc providers list` lists the 17 bundled upstream relays.
Tool/model availability depends on the installed CLI and account. Invalid dials
are rejected instead of silently ignored.

`tvc providers install codex`, `claude` or `agy` invokes that tool's official
installer. Authentication remains in the provider CLI. Other provider tools use
their vendor's installation flow. These install tools, not hosted model weights.

## Run a Commercial

```sh
tvc init ./my-ad --brief ./examples/brief.md
tvc plan --project ./my-ad
tvc approve plan --project ./my-ad
tvc decisions --project ./my-ad
# Answer the actual pending IDs using: tvc approve ID --value TEXT --project ./my-ad
tvc run --project ./my-ad
tvc status --project ./my-ad
tvc export --project ./my-ad
```

The director creates a task graph, then workers receive explicit, isolated input
packets and their cinematic references. Department passes are blind. The director
classifies conflicts and sends targeted revisions. Script-supervisor and producer
reviews run independently before the package can be exported.

`authority ask` routes major unresolved creative decisions to the user;
`authority director` lets the director resolve choices within the supplied scope.
Missing user facts still remain questions. Review loops are bounded; a revision
limit pauses work with actionable findings.

## Continue and Revise

```sh
tvc resume --project ./my-ad
tvc resume --retry-failed --project ./my-ad
tvc change --project ./my-ad --entity product --value "New bottle shape" --reason "Client packaging update"
tvc run --project ./my-ad
tvc revise picture --project ./my-ad --instruction "Recalculate the lens for the new sensor"
```

Changes reopen affected tasks and their dependents. Unknown dependency coverage
reopens all work conservatively. Unaffected output is retained. Final reviews are
bound to current output signatures and cannot approve stale revisions.

Global model settings are snapshotted into each project. Apply new settings to an
existing project using `tvc use-config --project ./my-ad`. Completed run metadata
retains the actual tool/model used at the time.

## Crews and Debates

```sh
tvc debate --project ./my-ad --brief ./examples/debate.md --roles creative,dop
# On a fresh project, for a standalone pass using a prepared packet:
tvc crew departments --project ./crew-pass --brief ./approved-packet.md
```

Debates run two blind proposals, cross-critiques, then a director synthesis.
Recommendations do not silently become locks. Crew presets: `creative`,
`departments`, `review`, `prompts`.

Additional skill folders can be attached with
`tvc skills attach casting /absolute/path/skill`.
Custom relay providers can be registered using
`tvc providers add local --relay /absolute/path/relay.mjs`.
See the [adapter contract](cinematic-tvc-director/references/delegation.md).

## Outputs and State

| Location | Contents |
|---|---|
| `.tvc/project.json` | Authoritative project state, tasks, decisions, locks and run history |
| `.tvc/runs/` | Input snapshots, role references, raw relay results and logs |
| `_state/project-state.md` | Generated readable status view |
| `deliverables/` | Individual production documents, including drafts |
| `exports/` | Approved combined package and asset manifest |
| `master-tables/generated-assets.json` | Entity/row-linked registered media assets |

Project run folders contain briefs and production content; keep them out of the
software repository. `TVC_HOME` selects a separate global configuration directory.

This release creates production documents and media prompts, and registers assets
generated elsewhere. Paid media execution, presentation rendering and automatic
legacy Markdown-state migration are not implemented. Worker directories are
coordination isolation, not an OS sandbox; each provider retains its own permission
mechanisms. The runtime does not pass blanket bypass flags.

## Verify

```sh
npm test
npm run check
npm pack
```

Tests execute a deterministic custom relay as real child processes, covering
parallel work, failure/retry, targeted changes, review gates, bounded revisions,
blind debate and configuration validation. Fixture success is not a live provider
test. Live verification status is recorded in [VERIFICATION.md](VERIFICATION.md).
