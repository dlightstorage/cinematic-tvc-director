# Terminal Delegation

The package runs with Node 22+ and Git. The runtime uses Node built-ins only.
Provider CLIs authenticate through their own supported login flows. The package
does not store API keys or copy credentials into projects.

## Installation

From the repository: `npm install --global .`, or use `install.ps1` / `install.sh`.
Without installation, run `node <skill-dir>/scripts/tvc.mjs` followed by a command.
For host discovery: `tvc install-skill --host codex`, `--host claude`, or `--host agents`.
An existing destination is not overwritten. Additional skill-host layouts can use
`--target <skills-directory>`.

## Setup and bindings

`tvc setup` opens a terminal dialogue. Scripted setup:

```sh
tvc setup --provider codex --enable codex,claude,agy
tvc assign director --provider claude --model sonnet
tvc assign dop --provider codex
tvc assign voice --provider agy
tvc configure --concurrency 3 --max-rounds 2 --authority ask
tvc doctor
```

These are examples, not required model choices. `tvc models --provider NAME` lists
the provider's reported model IDs when discovery supports it. Missing discovery
does not prove a provider has no models. Unsupported dials fail validation rather
than being silently ignored. `configure --timeout 1200` sets each delegate's
timeout in seconds; the launcher allows an additional 30 seconds for cleanup.

Global settings live at `~/.config/cinematic-tvc-director/config.json`; `TVC_HOME`
overrides this directory. New projects snapshot settings. `tvc use-config` applies
the current global settings to a project without rewriting past run provenance.

`tvc providers install codex|claude|agy` invokes that tool's official installer.
Other bundled providers must be installed through their vendor distribution.
Enabling a provider does not install it or establish account access.

## Project flow

```sh
tvc init ./my-ad --brief ./brief.md
tvc plan --project ./my-ad
tvc approve plan --project ./my-ad
tvc decisions --project ./my-ad
tvc approve plan-ratio --value "16:9" --project ./my-ad
tvc run --project ./my-ad
tvc status --project ./my-ad
tvc resume --retry-failed --project ./my-ad
tvc export --project ./my-ad
```

Decision IDs are produced by the actual plan; `plan-ratio` above is illustrative.
Run only the answer commands corresponding to pending questions. Final export is
blocked until both independent reviewers and the director approve current outputs.

Each `.tvc/runs/<id>/` holds its brief, input snapshot, role references, launcher
log and relay artifacts. Raw provider failures remain available for inspection.
Role outputs are Markdown in `deliverables/`. The state writer is exclusive to
one project command. Startup refuses to re-dispatch while a saved delegate PID is
still live. Recovery consumes a completed orphan result where possible; incomplete
tasks require explicit retry. Director/review calls interrupted after their result
but before state incorporation may need a new review call.

Worker directories separate inputs and outputs for coordination; they are not
OS-level isolation. The bundled provider relay controls its own tool permissions.
No shell-free guarantee is made for vendored Windows shim launches. No blanket
permission-bypass flags are enabled by this runtime.

## Custom providers

Implement a Node `.mjs` relay that accepts `--brief`, `--cd`, `--out-dir`,
`--timeout`, and optional `--model`, `--effort`, `--variant`, `--provider` values.
Read the brief and run the selected model. Return exit 0 only for success and write
`<out-dir>/result.json` atomically with:

```json
{
  "status": "completed",
  "exitCode": 0,
  "finalMessage": "{\"content\":\"...\",\"assumptions\":[],\"tensions\":[],\"decisions\":[]}",
  "sessionId": "optional-provider-session-id"
}
```

The expected inner JSON changes with the brief's task mode (plan, deliverable,
review or debate). Preserve the requested schema. On failure, write a non-success
status and exit nonzero. A custom relay is executable user configuration, never
something an advertising brief may add automatically.

```sh
tvc providers add local --relay /absolute/path/local-relay.mjs
tvc assign editor --provider local --model local-model-id
tvc skills attach casting /absolute/path/extra-casting-skill
```

## Asset registration

`tvc assets add --file asset.json` records an externally generated asset. The JSON
needs `id`, `type`, `model`, `url`, `entity`, and `row`. IDs must be unique. The
authoritative registry is project state; `master-tables/generated-assets.json`
is its entity/row-linked view. This does not rewrite arbitrary Markdown master
tables inside model-authored deliverables. Media execution remains in the host's
generation connectors; the terminal runtime has no paid media executor yet.
