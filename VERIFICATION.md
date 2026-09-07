# Verification

Environment: native Windows PowerShell, Node.js 24.14.1, Codex CLI 0.153.4.
Date: 2026-09-07.

## Automated behavior

The test suite launches actual local fixture processes, without model calls. It
covers DAG execution, overlapping independent work, blind input packets,
independent reviewers, stale-export prevention, selective change propagation,
bounded revision loops, explicit failure retry, invalid JSON/output rejection,
configuration validation, project locking, restart recovery, debates, selected
director authority, custom-provider registration and host-skill installation.
Version 0.2 added an end-to-end original-workflow fixture covering all ten blind
departments, all 155 parsed source decisions, trace-before-consolidation, final
trace, structured master rows, standard-test evidence, handoff review and legacy
state migration. The complete suite has 18 tests. Version 0.3 adds the Skills CLI
package manifest, the companion setup skill, project-scoped crew configuration
and a self-contained TTY fleet wizard with approval-before-write. Version 0.3.1
also exposes all 18 pinned upstream delegation skills as top-level Skills CLI
choices, for 20 discoverable skills in total.

Version 0.4 replaces the general fleet interview with a four-step creative setup:
Codex/Claude account choice, readiness and sign-in, an automatic role-complexity
preset, and review/approval. Preset tests cover Codex-only, Claude-only and dual
account assignments, including distinct model tiers and reasoning effort.

Version 0.5 adds a browser-based `tvc studio` on a tokenized loopback URL. It
loads the effective crew unchanged, edits all role bindings and production controls,
validates provider-reported models, writes only after final approval, shuts down
the temporary server and prints the activated crew back to the terminal. The
classic text control room remains available through `tvc studio --terminal`.

`npm run check` parses all bundled executable modules, verifies the 24 role
reference paths and verifies all 20 public skill entrypoints. The skill-creator
`quick_validate.py` validator accepts the main and cinematic setup skills. YAML is
only needed for this development-time validator, not the runtime.

## Live provider evidence

Codex discovery detected an installed authenticated CLI and reported cached model
IDs. A real `plan` call produced a two-task concept/script and timed-shot-list plan
for `examples/brief.md`, without expanding the requested narrow scope. A real
creative-role call then produced a saved concept/script document through the
upstream relay.

The next real call failed with the provider message "You've hit your usage limit."
The completed concept was retained and the shot-list task was marked failed.
No reset or credit purchase was attempted. This is partial live verification,
not a completed live production/review/export cycle. The entire cycle is covered
by process fixtures only.

The failed run motivated explicit provider-limit/auth error classification from
relay event logs. The runtime now stops further scheduling after that batch and
requires `resume --retry-failed` after access is restored or bindings are changed.
That error-classification addition and the latest workspace/lock handling were
verified locally with fixtures; no further live model calls were available.

Claude Code 2.1.263 and OpenCode 1.18.29 are installed locally. The latest setup
wizard discovery reported Claude as ready and OpenCode as requiring login. Their
relays are included from the pinned upstream source; no completed live production
claim is made for either provider. The upstream README contains its own
platform/version verification record.

## Publication and limits

The local Git repository and distributable package are prepared. GitHub CLI
browser authentication succeeded, and the private source repository was created
at https://github.com/dlightstorage/cinematic-tvc-director. This uses direct GitHub
authentication, independently of the ChatGPT connector. No npm registry
publication was performed. Cross-platform CI results are available in the
repository's Actions tab; local test results alone do not establish CI success.

Paid media execution and native PPTX rendering remain outside the 0.5.0 terminal
runtime. The approved export includes a print-ready HTML client presentation.
Original Markdown-only project state can be imported with `tvc migrate`; legacy
assets stay unapproved until their row and spend authorization are verified.
