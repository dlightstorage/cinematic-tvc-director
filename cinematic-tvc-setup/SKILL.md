---
name: cinematic-tvc-setup
description: >-
  Discover installed agent CLIs and configure the Cinematic TVC Director production
  fleet through an approval-first setup wizard. Use when the user asks to install,
  set up, configure, reconfigure, choose models, assign advertising departments,
  select an orchestrator, or review the TVC crew table.
---

# Cinematic TVC Setup

Configure the advertising production fleet without dispatching production work.
This is the setup companion to `cinematic-tvc-director`.

## Flow

1. Locate the sibling `cinematic-tvc-director` skill in the current agent's skill
   directory. Prefer the global `tvc` command when it exists; otherwise run
   `node <cinematic-tvc-director>/scripts/tvc.mjs setup`.
2. Start `tvc setup` in an interactive terminal. Do not replace the wizard with a
   hand-written config.
3. Let discovery report installed CLIs, authentication state and model IDs.
4. The user chooses Quick defaults, Interview, Usage scan, or the existing fleet.
   Usage scan reads session counts and timestamps only, never conversation text.
5. The user chooses enabled providers, the top-level director/orchestrator, exact
   model IDs and supported reasoning effort or variant.
6. Show the model-profile table followed by the complete 24-role advertising
   table. Every role row must point to a profile and include its task, provider
   and assignment basis; every profile includes its exact model and reasoning.
7. Keep offering Approve, Modify one role, Modify a department group, Modify
   production settings, Restart and Cancel. Do not write before approval.
8. On approval, choose Global or Project scope, show the exact JSON and ask for
   final confirmation. A cancellation writes nothing.

Never claim that an installed CLI is authenticated when discovery reports false
or unknown. Never invent model IDs. Catalog availability is not account access.
Do not buy subscriptions, enable overages, create API keys, or dispatch a TVC run
from this setup skill.
