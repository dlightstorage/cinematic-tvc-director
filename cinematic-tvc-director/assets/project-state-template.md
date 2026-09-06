# Project State: [PROJECT NAME]

*The single source of truth for where this project sits in the loop. Read this before doing anything. Update it at every stage exit. A stale state file makes the next session re-ask locked decisions and re-run passed gates, which is the one failure that breaks everything downstream.*

**Created:** [YYYY-MM-DD]
**Last updated:** [YYYY-MM-DD]
**Current stage:** [1 INTAKE | 2 DRAFT | 3 TRACE GATE | 4 FIX | 5 CONSOLIDATE | 6 HANDOFF GATE | DONE]
**Why this stage:** [one line: what put us here, e.g. "location swapped on 2026-07-26, re-entered Stage 2 then 3"]

---

## Scope (locked at Stage 1)

| Field | Value | Locked |
|---|---|---|
| Runtime | [e.g. 30s] | [yes/no] |
| Aspect ratio / platform | | |
| Language(s) | [English / Arabic / both as two independent passes] | |
| Deliverable priority | [presentation / production package / generation package / all three] | |
| Client / brand | | |
| Deadline | | |

---

## Locked decisions

Every decision closed by a gate. Do not re-ask anything on this table. If one changes, consult the trigger map in SKILL.md and re-enter at the named stage.

| ID | Decision | Locked value | Locked at | Departments depending on it |
|---|---|---|---|---|
| | | | | |

## Open decisions

Decisions reached but not yet answered, or conditional decisions whose condition is now met.

| ID | Decision | Blocked by | Notes |
|---|---|---|---|

---

## Production locks

The numbered non-negotiables. One row each, stated in full, self-contained. Full format in `references/templates-documents.md` (Bible 17 section).

| # | Rule (stated in full) | Scope (who it applies to) | Departments depending on it | Status |
|---|---|---|---|---|
| | | | | active / superseded by #N |

---

## Gate history

Which gates have run, when, and their verdict. A passed gate does not re-run unless a trigger re-opens it.

| Stage | Gate | Date | Verdict | Findings | Report file |
|---|---|---|---|---|---|
| | | | | | |

---

## Research files

Every research subagent's persisted findings. One topic per file.

| Topic | File | Date | Used by |
|---|---|---|---|
| | | | |

---

## Generated assets

Every asset fired at a generation model. The URL and ID must ALSO be written into the relevant master table row, this table is the index, not the only home.

| Asset | Type | Model | Prompt file | Asset URL | Asset ID | Written back to | Credits |
|---|---|---|---|---|---|---|---|
| | still / clip / VO / music / SFX | | | | | [table + row] | |

**Running credit spend:** [total]

---

## Deliverable status

| Deliverable | Status | File |
|---|---|---|
| Client presentation | not started / drafting / gated / final | |
| Treatment | | |
| Shot list | | |
| Crew bible (Cast + Locations tables) | | |
| Production locks | | |
| AI generation package | | |

---

## Change log

Every change that re-entered the loop, and where it re-entered. This is the decision *history*, which stays here and is stripped out of the deliverables at Stage 6.

| Date | What changed | Re-entered at | What was re-derived | Closed |
|---|---|---|---|---|
| | | | | |
