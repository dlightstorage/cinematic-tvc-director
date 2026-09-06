# Upstream Provenance

The user's reference video is https://www.youtube.com/watch?v=YZbu0fndK40.
Its `shortDescription` directly links https://github.com/amElnagdy/delegate-skills.
The description names model selection, thinking effort, crews and setup discovery.
The implementation was inspected from a shallow clone, not inferred from the
video's title. A full video transcript was not available during this work.

Pinned source revision: `b781ee2e23089630e2fbee1cfd6174afe4edeb76`.
License: MIT, copyright 2026 Ahmed Mohammed (amElnagdy).

`scripts/vendor/delegate-skills/` preserves the upstream skills, relay scripts,
setup utilities, README and license. These files are vendored without manual
changes. Upstream verification claims describe upstream's environment, not this
package's local testing.

## What the source actually provides

- Seventeen provider-specific `relay.mjs` programs with model-specific flags,
  timeout handling, structured results and (where supported) session continuation.
- Discovery of installed CLIs and supported model/dial information.
- A lane configuration workflow and host-agent instructions for briefing,
  reviewing and landing coding changes.
- The host AI agent is the orchestrator. The repository is not a standalone
  scheduler that automatically plans an entire campaign.

## Commercial adaptation

The TVC runtime invokes those actual relays, with role-specific craft references
and explicit input packets. Coding lanes become cinematic role bindings. The
existing brief / dispatch / result / review loop is preserved. The added local
runtime supplies a selectable director, task dependency scheduling, blind crew
passes, proposal/critique debates, durable project state, entity-change
invalidation and final production review gates.

The TVC configuration intentionally does not reuse `.delegate/fleet.json`: it also
needs role skills, director authority and production settings. It supplies validated
explicit flags to the upstream relays instead of `--lane`. Both systems can coexist.
The original cinematic library is preserved under `references/`; the former
entrypoint is saved verbatim as `references/original-workflow.md`.

## Scope of this version

The shipped terminal workflow is a commercial adaptation, not a claim of pixel-
or command-identical video reproduction. Paid media execution, automatic legacy
Markdown-state migration and a client presentation renderer are not implemented.
The source library still provides the knowledge for these tasks in capable hosts.
