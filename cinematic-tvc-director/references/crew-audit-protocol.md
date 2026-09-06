# Crew Audit Protocol

The blind parallel department pass and the Director reconciliation that follows. This is Tier 5 and Tier 6 of the lock order, and it is the mechanic that makes this skill a crew rather than a single voice.

Full source: `director-protocol.md` sections 1.1 (lock order) and 1.2 (conflict resolution), drawn from Bible 11. Continuity gating: `continuity-audit.md`, from Bible 12. Per-department identity, decisions and output templates: `gates-crew-departments.md`.

## Precondition

Tiers 0 through 4 must be locked before you brief anyone. Check the state file.

If the tone statement is vague, blind parallel briefing produces incompatible plans and it will look like the departments failed when the brief actually did. Do not brief early to save time. It does not save time.

## Step 1: Assemble the identical brief packet

Every department gets **the same** packet. Assemble it once:

- The locked concept and proposition
- The locked script and VO copy, final wording
- The locked shot list with timecodes, character assignments, and location assignments
- Tiers 0 to 4 locks verbatim: tone, pacing, polish, world rules, cast, ratio, format, lens family, movement grammar, colour logic, palette policy, sound intent
- The active production locks with their scope
- Any research files relevant to the market or culture
- Delivery specs: runtime, ratios, platforms, languages

Nothing department-specific goes in the shared packet. Nothing is withheld from one department that another receives.

## Step 2: Brief all ten departments blind and in parallel

Fire ten subagents **in a single message** so they run concurrently and cannot see each other's output.

Departments, with their `dept_id` from `gates-crew-departments.md`:

| # | Department | dept_id |
|---|---|---|
| 1 | Director of Photography | `director-of-photography` |
| 2 | Colorist | `colorist` |
| 3 | Editor | `editor` |
| 4 | VFX and Motion Graphics | `vfx-and-motion-graphics` |
| 5 | Casting Director | `casting-director` |
| 6 | Costume and Wardrobe | `costume-and-wardrobe` |
| 7 | Makeup and Hair | `makeup-and-hair` |
| 8 | VO Casting and Voice Direction | `vo-casting-and-voice-direction` |
| 9 | Production Design and Locations | `production-design-and-locations` |
| 10 | Sound Design and Music | `sound-design-and-music` |

Each subagent brief must contain:

1. **Its identity**: the `role_one_liner` from its section, which includes what it does *not* own. The scope guard matters as much as the scope.
2. **Its craft bible path**: `references/bibles/NN-<name>.md`, to be read before planning.
3. **The identical shared packet** from Step 1.
4. **Its own lockable decisions** from `gates-crew-departments.md`, to be answered within its plan.
5. **Its output template** from the same file, to be followed exactly.
6. **The instruction to flag tensions**: name every place another department's likely plan could conflict with its own, and say which department and why.
7. **An explicit statement that it cannot see the other departments' plans**, and should therefore state its assumptions about them rather than hedging.

Point 7 is what makes the method work. A department that states "I am assuming the set palette is warm-toned wood, and if it is matte black my fill plan changes" has given you a checkable assumption. A department that hedges gives you nothing.

## Step 3: Hold every plan until all ten return

Do not read and act on plans as they arrive. Reconciliation requires the full set, because a tension flagged by department 3 is often already resolved by department 8's independent choice, and you cannot know that until you have both.

## Step 4: Reconcile as Director, classifying every flagged tension

This is the core of the pass. For each flagged tension, classify it into exactly one of three:

| Class | Test | Action |
|---|---|---|
| **REAL CONFLICT** | The two departments' plans are genuinely mutually incompatible. Both cannot be executed as written | Resolve it. Write a numbered resolution naming both positions and the decision |
| **FALSE ALARM** | Both departments flagged each other, but their independent choices already agree, or one department's own plan already solves the other's concern | Write a "checked, no change needed, here is why" verdict. Change nothing |
| **NEW RISK** | Not a conflict between two plans, but a genuine new problem that one department's proposed fix would introduce | Resolve the new risk explicitly, and note that it did not exist before the fix |

Over-correcting a false alarm is as damaging as missing a real conflict. The bibles document real cases where a DOP and Colorist independently chose identical colour temperatures without seeing each other's notes, and where a casting concern was already solved by the makeup plan. Manufacturing a fix for two departments that already agree adds a constraint nobody needed and can break something that was working.

**Do not average away a real disagreement.** A synthesis that splits the difference between two incompatible plans usually satisfies neither and quietly produces a third plan no department has costed.

## Step 5: Issue the decision record

One numbered entry per resolution. Format in `director-protocol.md` section 1.6, Director's Decision Record output template.

Each entry carries: the number, the two positions, the decision, the reason, which departments must now change what, and its status.

Write the false-alarm verdicts into the same record. A record listing only what changed is indistinguishable from one that forgot to check the rest, which is Law 3.

## Step 6: Re-derive every changed premise

For every resolution that changed a physical or technical premise, re-derive rather than relabel. Then write the resolution's actionable content into the department's own plan, not only into the resolution list, because a crew member reads their department's plan and not the meta-history.

## Step 7: Fold and prune

Resolutions with real actionable content get folded into the relevant department's plan or into a production lock. Resolutions that only confirm alignment carry no production value once that alignment is stated as fact in both plans.

The test: **does this record carry information a reader needs that is not already stated as fact somewhere else?** If no, fold it in or delete it. If yes, keep it where a crew member would actually look for it.

## Re-briefing after a change

**A Tier 2 change (tone, pacing, polish) after briefing voids every department plan.** Re-brief from Step 1. Do not patch, because ten plans each built on a tone statement that no longer holds cannot be individually corrected into coherence.

**A narrower change** re-opens only the departments its trigger table names. Read the affected departments' re-open trigger tables in `gates-crew-departments.md` and re-brief only those, with the changed lock stated explicitly and the old value named so the department knows what it is replacing.

When you re-brief a subset, the un-briefed departments' plans still reference the old value. That is a Stage 3 trace-gate job, not something to fix inside this protocol.
