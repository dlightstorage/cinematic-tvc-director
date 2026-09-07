# Cinematic TVC Director

An installable terminal production crew for cinematic commercials. Choose the
orchestrator and each department's agent CLI/model, delegate actual processes,
review disagreements, and resume projects from saved state.

Built on the real [delegate-skills](https://github.com/amElnagdy/delegate-skills)
relays from the [reference video](https://www.youtube.com/watch?v=YZbu0fndK40),
with the supplied cinematic production library preserved. Source revision and
license attribution are in [THIRD-PARTY.md](THIRD-PARTY.md).

Version 0.4 runs the supplied original six-stage workflow by default. Its intake
rounds, source decision ledger, trace gate, consolidation barrier, handoff gate,
negative-brief review and generation approvals are enforced in state instead of
being prompt-only guidance. Use `--workflow focused` only for deliberately narrow
single-stage work.

## Install

Requirements: Node.js 22+ and Git. The recommended first-run command installs the
terminal app from the public repository, then opens the local onboarding Studio:

```powershell
npm.cmd install --global "git+https://github.com/dlightstorage/cinematic-tvc-director.git"; if ($LASTEXITCODE -eq 0) { tvc onboard }
```

The first screen detects Codex and Claude Code. Install or sign in to either one,
or prepare both, then select the ready accounts and continue. The official
provider CLI owns authentication; this package does not read or store credentials.
It detects account-reported models, builds the complete 24-role advertising crew,
lets you review every model and effort assignment, and installs the skill into the
selected agent hosts when you approve.

The separate Skills CLI installation matches the Delegate Skills flow shown in
the reference video and is useful when only the skill files are wanted:

```powershell
npx skills add dlightstorage/cinematic-tvc-director
```

The installer now exposes 20 selectable skills, matching the upstream list-style
experience: the two cinematic skills plus all 18 upstream delegation skills.
Use Space to select `cinematic-tvc-director` and `cinematic-tvc-setup`; optionally
select any individual delegate bridges you also want. Then choose the agent hosts,
Global or Project scope, Symlink or Copy, and confirm. Symlink is the recommended
Skills CLI default. These entries are agent/CLI skills, not model names and do not
install the provider binaries. After installation, open any selected orchestrating
agent and ask:

```text
Use $cinematic-tvc-setup to configure Codex, Claude, or both for my advertising production crew.
```

The setup wizard follows `choose accounts -> install/sign in if needed -> automatic
advertising preset -> review or modify -> approve -> save`. The only required
creative-user choice is Codex only, Codex + Claude, or Claude only. The preset
selects reported model IDs and reasoning effort per role complexity, then displays
linked model profiles, the director, all 24 advertising roles and their attached
reference counts before saving.

After installation, reopen first-run setup or edit an existing crew at any time:

```powershell
tvc onboard
tvc studio
```

`tvc onboard` handles account readiness, automatic presets and skill installation.
`tvc studio` opens the same private localhost configuration page and keeps the terminal
waiting. Edit account mode, provider, exact model, reasoning effort, scope and
production controls, then choose **Save & Apply**. The temporary page shuts down
and the activated 24-role crew is printed back in the terminal. Existing settings
are loaded unchanged when Studio opens. The former text menu remains available as
`tvc studio --terminal`.

No npm registry release is claimed. To try the runtime from a source checkout:

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

Visual `tvc onboard` is the recommended first-time experience. Interactive
`tvc setup` remains available for terminal-only environments. Both are designed for advertising creatives rather than coding
fleet administration. It asks whether the production uses Codex, Claude, or both;
offers official CLI installation and provider-owned sign-in when needed; then
builds an expert preset automatically. The user can modify one role, a department
group, its exact model/effort, the director, or production controls before choosing
Global or Project scope. For scripted setup:

```sh
tvc setup --provider codex --enable codex,claude
tvc assign director --provider claude --model sonnet
tvc assign dop --provider codex
tvc assign voice --provider agy
tvc models --provider codex
tvc configure --concurrency 3 --authority ask
```

The interactive advertising preset intentionally limits its account choice to
Codex and Claude. Advanced terminal commands still support the 17 bundled upstream
relays for specialist or coding workflows. `tvc roles` shows all 24 TVC roles.
Tool/model availability depends on the installed CLI and account. Invalid dials
are rejected instead of silently ignored.

`tvc catalog refresh openrouter` and `tvc catalog refresh modelsdev` build a live,
cached browsing catalog. Filter it by family/name, advertised API-price band or
parameter size. Catalog presence never claims that a selected CLI, subscription
or account can run the model. Use `tvc models --provider NAME` for the model IDs
reported by an installed CLI, then bind the exact ID with `tvc assign`.

`tvc plans` separates subscription access from API billing and links to current
vendor pages. It is reference information, not a checkout surface: this package
does not buy plans, enable overages, redeem credits or store API keys.

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

In the default original mode the runtime accounts for all 155 source department
decisions. GATE choices remain user-owned; DERIVED decisions need written
derivation; CONDITIONAL decisions need either a result or an explicit
not-applicable reason. A dedicated research role persists culture, market,
location, casting and dialect findings when needed. English and Arabic copy/voice
work is enforced as separate passes when both languages are locked.

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
generated elsewhere. Paid media execution and native PPTX rendering are not
implemented. Use `tvc migrate` for original Markdown-only state. Worker directories are
coordination isolation, not an OS sandbox; each provider retains its own permission
mechanisms. The runtime does not pass blanket bypass flags.

Approved export now writes `production-package.md`, a print-ready
`client-presentation.html`, `ai-generation-package.md`, `decision-log.json` and
`asset-manifest.json`. Asset registration requires a current explicit generation
quote approval and a real entity/row from the structured production-bible ledger;
changed assets are retained as superseded rather than silently deleted.

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
