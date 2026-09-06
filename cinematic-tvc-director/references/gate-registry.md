# Gate Registry

The executable gate sequence. This file is the **router**: it says which questions to ask, in what order, and where to get the real answer options. The options themselves live in `gates-crew-departments.md`, which carries all 155 department decisions extracted from the craft bibles with their real, bible-sourced option sets.

Read this file at Stage 2 before asking anything.

## Why a registry and not just "ask everything"

155 department decisions exist. They are not 155 questions to a human, and treating them that way would be both unusable and wrong on the craft. Every decision falls into one of three classes:

| Class | Meaning | Behaviour |
|---|---|---|
| **GATE** | A genuine creative or commercial choice with real, mutually exclusive options and consequences the user owns | Ask via AskUserQuestion. Never assume |
| **DERIVED** | Mechanically determined by an already-locked GATE | Compute it, state the derivation, do not ask. Surface it only if the computed value conflicts with something else locked |
| **CONDITIONAL** | Only exists if the project has a particular feature (screens in frame, a second location, an ensemble, vocals in the music) | Check the condition. If met, it becomes a GATE. If not, record "not applicable, and here is why" rather than leaving a silent gap |

The DERIVED class is not a shortcut, it is the craft. When a sensor format is locked, the focal length ranges follow from it by arithmetic. Asking the user to pick focal lengths independently would let them choose a set that contradicts the format they already chose. Law 2 (re-derive, do not relabel) applies here in the forward direction: derive rather than ask.

## How to fire a gate round

AskUserQuestion takes up to 4 questions per call. Group each round's questions into one call so the user answers a coherent batch rather than a drip of single questions.

Rules that keep rounds honest:
- **Never present a gate whose dependency is unlocked.** Check the tier order below.
- **Options must be the bible's own options**, pulled from `gates-crew-departments.md`. That file's option descriptions carry the stated tradeoff, which is what makes a choice informed rather than arbitrary.
- **Put your recommendation first** and mark it "(Recommended)", with the reason in its description. You are the Director, you are expected to have a view.
- **Record every answer in the state file's locked-decisions table** immediately, with the departments that now depend on it. That dependency list is what the trigger map uses later.

## The lock order

From the Director bible's Tier 0 to Tier 7 structure. **Tiers 0 through 4 must all be locked before any department can be briefed at Tier 5.** This is a hard rule, not a preference: blind parallel briefing off vague locks produces incompatible plans, and the failure looks like bad departments when it is actually a bad brief.

Harder rule from the same bible: **if a Tier 2 decision changes after Tier 5 has been briefed, the department plans are void. Re-brief, do not patch.**

---

## ROUND 1  -  Scope and mandate (Tier 0)

Fires at Stage 1 INTAKE. Nothing else can start.

| # | Question | Options from |
|---|---|---|
| 1 | Runtime and its cutdowns | Bible 15 shot-count discipline, Bible 03 pacing bands |
| 2 | Native aspect ratio and platform, plus derived ratios | `gates-crew-departments.md` DEPT-01 `aspect_ratio` and `multi_ratio_strategy` |
| 3 | Language: English only, Arabic only, or both as two independent passes | Bible 18 bilingual rule, Bible 22 Part B Bilingual Production Protocol |
| 4 | Deliverable priority: presentation, production package, generation package, or all three | This skill's three deliverables |

On question 3, the bibles are unambiguous and you should say so when asking: a second language is its own copywriting and casting pass with its own candidate lines, never a translation of a chosen line. Choosing "both" doubles the copy and VO work rather than adding a translation step.

**Unlocks:** everything. **State file:** write the Scope table.

---

## ROUND 2  -  Interpretation and intent (Tier 1)

Fires at Stage 2, immediately after the brief is mined.

| # | Question | Options from |
|---|---|---|
| 1 | The single-minded proposition: which one of the candidate propositions is this film built on | Bible 18 observation/insight/proposition tests, applied to the mined brief |
| 2 | Which audience segment this execution serves, when the brief names more than one | Bible 18 audience-naming requirement |
| 3 | Point of view: whose film is this, and is the camera an observer, a participant, or a subjective consciousness | DEPT-01 `visual_intent` |
| 4 | The anti-brief: what must this never look or feel like | DEPT-01 `visual_intent`, anti-brief-led option |

Question 4 earns its place. The DOP bible states the anti-brief is more useful than the brief, because locking what must never happen constrains the solution space productively where a positive brief leaves it open.

**Unlocks:** Round 3. **State file:** locked decisions, plus the named audience gap if only one segment is served.

---

## ROUND 3  -  Tone, pacing, polish (Tier 2)

The most load-bearing round. A Tier 2 change after department briefing voids the plans.

| # | Question | Options from |
|---|---|---|
| 1 | Tonal register | Bible 11 tone axis, DEPT-01 `visual_intent` |
| 2 | Pacing, stated as a rate with named hold points | Bible 03 ASL bands and cuts-per-line, DEPT-03 pacing decisions |
| 3 | Polish level, on its own scale | Bible 11 POLISH-vs-TONE axis, Bible 09 realism dial |
| 4 | Degree of realism and what may exist in frame | DEPT-09 world rules |

**Ask 2 and 3 as separate questions and say why.** Pacing and tone are independent axes, and so are polish and tone. Reversing a pacing decision does not reverse a tone decision. Making a location more polished does not make the film's tone glossier. Collapsing them is the single most common director-level error the bibles document, and the diagnostic questions for each are in `director-protocol.md` section 1.4.

**Unlocks:** Round 4. **State file:** locked decisions. Flag this round's IDs as tier-2-critical, because a later change to any of them voids department plans.

---

## ROUND 4  -  World and people (Tier 3)

| # | Question | Options from |
|---|---|---|
| 1 | Period, place, and the world's rules | DEPT-09 |
| 2 | Cast structure: single lead, lead plus featured, or full ensemble | DEPT-05 ensemble tiers |
| 3 | Casting attributes per role: age band, gender, casting type | DEPT-05 `attribute_cast_or_create`, `type_or_person`, `strategy_pole`, and `segment_relationship` |
| 4 | Performance approach: trained actors, real people, or mixed | DEPT-05 real-people-vs-professional decision |

**CONDITIONAL follow-up.** If the answer to 2 is an ensemble, a second gate round fires covering per-character screen-time tiers, because the bibles are explicit that screen time drives how much specification each character needs, and a "light-touch" character with a face-forward shot is a budget failure waiting to happen.

Before asking 3, consider firing a research subagent: casting norms, physical casting conventions, and what reads as authentic differ sharply by market. See `research-protocol.md`.

**Unlocks:** Round 5. **State file:** locked decisions plus the cast roster.

---

## ROUND 5  -  Visual language (Tier 4)

The last tier before departments can be briefed.

| # | Question | Options from |
|---|---|---|
| 1 | Capture format and sensor size | DEPT-01 `capture_format`, then `camera_body` |
| 2 | Lens family and its logic | DEPT-01 `lens_family` |
| 3 | Colour and contrast logic, including the warm/cool policy | DEPT-01 `colour_temp_policy`, DEPT-02 `hue_scheme` and `temperature_policy` |
| 4 | Movement grammar: what moves, when, and why | DEPT-01 `movement_plan` |

Then a second round for the remaining Tier 4 items:

| # | Question | Options from |
|---|---|---|
| 1 | Working stop and rated EI | DEPT-01 `working_stop` |
| 2 | Framing rules, lens height, eyeline policy | DEPT-01 `framing_rules` |
| 3 | Palette: the reserved brand colour policy and the wardrobe/set palette relationship | DEPT-06 and DEPT-09 palette decisions |
| 4 | Sound and music intent | DEPT-10 |

Two things to get right here.

**The framing rule in question 2 of the second round is load-bearing, not description.** A rule like "the camera never widens past X" or "this character's face never enters frame" is something makeup, wardrobe, lighting and set dressing will each build a real, costed plan against. Changing it later re-opens all of them. Say this when you ask.

**The palette question is where the classic conflict lives.** The wardrobe palette and the set palette cannot be chosen independently, and a reserved brand hex constrains both. Lock the relationship, not just the two palettes.

**DERIVED from this round, do not ask:**

| Derived value | Derived from | How |
|---|---|---|
| Focal length ranges per lens role | Capture format + lens family | Recompute for the locked sensor. A format change re-derives every focal length. See DEPT-01 `focal_map` and Bible 01's crop-factor worked examples |
| Depth of field behaviour and its compensation | Format + working stop + focal map | Smaller formats carry more DOF at equivalent framing, which weakens any "shallow DOF separates subject from set" technique. If that technique is load-bearing, the compensation (wider stop, longer end of the range, closer subject distance, built-in ND for exposure) must be specified, not left as a flag |
| Colour temperature values in Kelvin | Colour temp policy | Follows from the policy |
| Show LUT structure | Colour logic + delivery colour space | DEPT-02 `show_lut_structure` |

**Unlocks:** Tier 5, department briefing. **State file:** locked decisions, plus a derivation note for each derived value so a later audit can trace it.

---

## ROUND 6  -  Department plans (Tier 5)

**No AskUserQuestion here.** This is the blind parallel crew pass. Follow `crew-audit-protocol.md` exactly: every department briefed off identical locked material, simultaneously, with no sight of each other, all plans returned before any is reviewed.

Each department will surface its own internal decisions from `gates-crew-departments.md`. Those that turn out to be genuine user choices rather than department craft calls get batched into a single follow-up round after reconciliation, so the user answers a coherent set rather than ten departments' worth of drip.

---

## ROUND 7  -  Coordination (Tier 6)

Fires after the department plans return. Present the reconciliation, then gate only what the Director cannot decide alone.

| # | Question | When |
|---|---|---|
| 1 | Each genuine cross-department conflict, with the two departments' positions and your recommended resolution | One question per real conflict, batched up to 4 per call |
| 2 | Any scoped exception a department proposed (a blanket rule that needs re-scoping for a new entity) | Bible 17 scoped-rule rule |

False alarms do not become questions. They get a written "checked, no change needed, here is why" verdict in the decision record. Presenting a false alarm as a choice manufactures a decision that does not exist and wastes the user's attention.

**State file:** production locks table, with each lock's scope and dependent departments.

---

## ROUND 8  -  Generation gates

Fires per generation batch, after Stage 6 passes. Never before.

| # | Question | Options from |
|---|---|---|
| 1 | Model selection for this batch, with your recommendation and its reason | `generation-ai-toolchain.md` model matrix and per-modality selection tables |
| 2 | Resolution and duration, with the credit cost implication of each | `generation-ai-toolchain.md` cost sections, plus the runbook's honesty note on estimate limits |
| 3 | Reference-continuity approach for this batch | `generation-ai-toolchain.md` consistency protocols |
| 4 | Explicit approval to spend, with the estimated credit total stated | The running spend in the state file |

Question 4 is not a formality. Credits are real money, a wrong lock burns them silently, and the estimate should be stated as a number before the go, not after.

**CONDITIONAL gates within generation:**

| Condition | Gate that opens |
|---|---|
| Any screen or UI appears in frame | VFX build count and design-token spec, DEPT-04. Re-total the build count after any scene is added |
| VO is required | Language, dialect, preset voice vs clone, read register. Bible 22. For Arabic, the diacritics and MSA-vs-dialect decisions are separate and both matter |
| Music is required | Instrumental vs vocals, genre, tempo, exact duration, loop or one-shot, and the licensing model. Bible 24 |
| Audio is locked before picture | Which models can sync to it. Only `wan2_7`, `seedance_2_0`, `seedance_2_0_mini` accept both a start frame and an audio reference |
| A second physical location exists | Scheduling gate: separate call time or company move. Bible 13, and it is a cost question not just a creative one |

---

## Re-asking rules

**Do not re-ask a locked decision.** Read the state file first. This is the most common way a multi-session project wastes the user's time.

**When a locked decision changes**, do not ask the dependent decisions again from scratch. Consult the trigger map in SKILL.md, re-derive what is mechanically determined, and gate only what is a genuine new choice. A camera swap re-derives the focal lengths automatically; it does not require the user to re-pick them.

**When a re-open trigger fires**, read that department's re-open trigger table in `gates-crew-departments.md`. It states, per trigger, which of its locks must be RE-DERIVED (new work) versus merely RELABELED (documentation only). That distinction is the difference between a correct fix and a fake one.
