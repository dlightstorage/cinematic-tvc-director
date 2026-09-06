# Verification

Environment: native Windows PowerShell, Node.js 24.14.1, Codex CLI 0.153.4.
Date: 2026-09-06.

## Automated behavior

The test suite launches actual local fixture processes, without model calls. It
covers DAG execution, overlapping independent work, blind input packets,
independent reviewers, stale-export prevention, selective change propagation,
bounded revision loops, explicit failure retry, invalid JSON/output rejection,
configuration validation, project locking, restart recovery, debates, selected
director authority, custom-provider registration and host-skill installation.

`npm run check` parses all bundled executable modules and verifies the 23 role
reference paths. The skill-creator `quick_validate.py` validator accepts the main
skill. YAML is only needed for this development-time validator, not the runtime.

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

Claude Code, Antigravity and the other bundled CLIs are not installed in this
environment. Their relays are included from the pinned upstream source; no local
authenticated support claim is made for them. The upstream README contains its
own platform/version verification record.

## Publication and limits

The local Git repository and distributable package are prepared. GitHub CLI
browser authentication succeeded, and the private source repository was created
at https://github.com/dlightstorage/cinematic-tvc-director. This uses direct GitHub
authentication, independently of the ChatGPT connector. No npm registry
publication was performed. Cross-platform CI results are available in the
repository's Actions tab; local test results alone do not establish CI success.

Paid media execution, deck rendering and automatic migration from the original
Markdown-only project state are outside the implemented 0.1.0 terminal runtime.
The original knowledge files remain available for use in a capable host.
