---
name: cinematic-tvc-setup
description: >-
  Discover installed agent CLIs and configure the Cinematic TVC Director production
  fleet through an approval-first terminal wizard or local visual Studio. Use when the user asks to install,
  set up, configure, reconfigure, choose models, assign advertising departments,
  select an orchestrator, or review the TVC crew table.
---

# Cinematic TVC Setup

Configure the advertising production fleet without dispatching production work.
This is the setup companion to `cinematic-tvc-director`.

## Flow

1. Locate the sibling `cinematic-tvc-director` skill in the current agent's skill
   directory. Prefer `tvc onboard` when the global command exists; otherwise run
   `node <cinematic-tvc-director>/scripts/tvc.mjs onboard`. Use `setup` instead
   when a browser cannot be opened.
2. Use `tvc onboard` for visual first-time CLI installation, sign-in, account
   selection and host-skill installation. Use `tvc setup` for terminal-only first
   runs and `tvc studio` for later visual edits. All flows write the same validated config;
   do not replace these flows with a hand-written config.
3. Let discovery report Codex and Claude CLI, authentication state and model IDs.
4. Ask only which account mode the creative user wants: Codex only, Codex + Claude,
   or Claude only. Offer official CLI installation and provider-owned sign-in when
   a selected account is not ready.
5. Build the advertising preset automatically. Select only model IDs reported by
   the installed CLI, and scale effort from low for routine roles through medium
   and high to director-level reasoning for complex roles.
6. Show the production controls and model-profile table followed by the complete 24-role advertising
   table. Every role row must point to a profile and include its task, provider
   assignment basis and reference count; every profile includes its exact model
   and reasoning.
7. Keep offering Approve, change one role, change a department group, change
   production controls, view technical configuration, change accounts and Cancel.
   Do not write before approval.
8. On approval, choose Global or Project scope, show a concise final summary and
   ask for confirmation. A cancellation writes nothing.

The browser Studio must bind to loopback only, preserve the current crew on open,
and accept models reported by the installed provider CLIs. Its Save & Apply action
writes only after final approval, closes the temporary server, and returns the
complete activated crew summary to the launching terminal. Use `tvc studio
--terminal` only when the user prefers the classic terminal control room.

Never claim that an installed CLI is authenticated when discovery reports false
or unknown. Never invent model IDs. Keep non-Codex/Claude providers out of the
creative setup wizard; they remain available through advanced CLI configuration.
Catalog availability is not account access.
Do not buy subscriptions, enable overages, create API keys, or dispatch a TVC run
from this setup skill.
