---
name: cinematic-tvc-director
description: >-
  Develop cinematic commercials and brand films with a configurable production crew.
  Use for advertising briefs, concepts, treatments, shot lists, department plans,
  continuity reviews, production packages and AI media prompts, or to set up and
  run a commercial-production delegation fleet through local agent CLIs.
---

# Cinematic TVC Director

Turn a commercial brief into production documents using the supplied cinematic
library and real delegated CLI runs. The user chooses the orchestrator and every
department's tool, model and supported reasoning settings. The terminal runtime
is bundled in this skill; no separate chat service is required.

## Start from saved state

Read the current project's `.tvc/project.json` when present. It is authoritative;
`_state/project-state.md` is its generated human-readable view. Do not reset a
project to intake or re-ask answered decisions. For older projects that only have
the Markdown state file, inspect it and carry its decisions into a new runtime
project deliberately; automatic legacy-state migration is not implemented.

Use `node "<skill-dir>/scripts/tvc.mjs" help` to inspect commands. `<skill-dir>` is
the installed directory containing this file, not the current project directory.
The same runtime is available as `tvc` after installing the npm package.

## Configure the crew

Read [delegation.md](references/delegation.md) for setup and provider configuration.
Use `doctor` to discover installed CLIs and available model IDs; missing or unknown
authentication is not successful verification. `setup` selects enabled providers,
the default department model and a separately selectable director. `assign` changes
individual roles. `skills attach` adds domain guidance to a role.

The bundled relays come from `amElnagdy/delegate-skills`; see
[upstream.md](references/upstream.md) for provenance. Use the CLI adapters as code,
not as evidence that every provider is installed or has been tested locally.
Additional providers require an actual relay implementation. Distinguish a CLI
tool from a model available through that tool.

## Produce the commercial

1. Create a project from the user's brief using `init`, then `plan`. The selected
   director produces a saved task graph, missing-input questions and a reviewable
   summary. Keep narrow requests narrow.
2. Present the plan and essential missing decisions. Use `approve plan` and
   `approve <decision-id> --value ...` to record the user's answers. Existing user
   authorization can satisfy plan approval; do not ask again merely because a
   command needs to record it. Never invent missing campaign facts.
3. Use `run` or `resume`. Tasks execute in separate working directories, with
   explicit input packets and saved results. Blind department plans cannot depend
   on peer department plans. Concurrency is bounded by configuration.
4. The director reconciles the full output. Real conflicts and new risks become
   targeted revisions; false alarms need recorded checked-and-clean reasoning.
   Independent continuity and producer reviews run before completion. A missing
   result, failed process or invalid response never counts as approval.
5. Use `export` only after the runtime reports `complete`. Production documents
   are also available individually in `deliverables/` while work is in progress.

For explicit plan debates use `debate`: two configured roles first propose blindly,
then critique each other, then the selected director reconciles. A debate does not
approve production locks. `crew` provides a standalone pass using a supplied brief
packet; the departments preset includes all ten department heads.

## Cinematic rules and references

Preserve these rules in briefs and reviews:

- Trace a changed fact as a premise, not only as a phrase in a document.
- Recompute dependent physical choices when sensors, lenses, framing or timing
  change. Do not just relabel equipment.
- Record checked-and-clean and not-checked verdicts explicitly.
- Keep specificity, attribution, anti-cliche and brief traceability checkable.
- Preserve character, product, costume, location, voice and shot continuity.

Read only the relevant material for the current stage:

| Work | Reference |
|---|---|
| Original six-stage production process | [original-workflow.md](references/original-workflow.md) |
| Brief, concept, treatment, storyboard and master tables | [templates-documents.md](references/templates-documents.md) |
| Director decisions and conflicts | [director-protocol.md](references/director-protocol.md) |
| Blind department briefing | [crew-audit-protocol.md](references/crew-audit-protocol.md) |
| Department questions and choices | [gate-registry.md](references/gate-registry.md), [gates-crew-departments.md](references/gates-crew-departments.md) |
| Continuity and logistics | [continuity-audit.md](references/continuity-audit.md), [logistics-audit.md](references/logistics-audit.md) |
| Research | [research-protocol.md](references/research-protocol.md) |
| Final packages | [deliverables.md](references/deliverables.md) |
| Media prompts and execution requirements | [generation-runbook.md](references/generation-runbook.md), [generation-ai-toolchain.md](references/generation-ai-toolchain.md) |
| Detailed craft reasoning | `references/bibles/01-24*.md`, selected by role |

The imported references contain host-specific names such as AskUserQuestion and
subagent APIs. Use the current host's available tools or the bundled terminal
commands for those operations. User choices and current runtime contracts take
precedence over defaults in the imported material. Verify time-sensitive media
capability and pricing claims before relying on them.

## Changes, recovery and media

Use `change` with the entity ID and reason to invalidate affected tasks and their
dependents. Unknown dependency coverage reopens all tasks conservatively. `revise`
targets a specific task. Review failures have a bounded revision loop; inspect
`status` before requesting another pass. `resume --retry-failed` explicitly retries
failed tasks while retaining completed unrelated work.

This version generates media prompt documents and registers externally generated
assets using `assets add`. It does not call paid image/video/audio services itself.
When the host has a generation connector and generation is requested, apply the
production gates and the user's spend authorization, then register every result
against its entity and master row. Do not claim that planning-model selection
also installs a media-generation connector.
