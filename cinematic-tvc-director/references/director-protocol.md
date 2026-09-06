# Director Protocol (lock order, conflict resolution, decision record)

*Extracted from the gate-role craft bibles as executable procedure. Full craft reasoning behind every step is in `bibles/11-Director.md`, `bibles/12-Script-Supervisor.md`, `bibles/13-First-AD-and-Line-Producer.md`.*

# PART 1: DIRECTOR (source 11-Director.md)

---

## 1.1 THE DIRECTOR'S OWN LOCKABLE DECISIONS AND THEIR LOCK ORDER

### 1.1.1 The full decision set (source A3)

Twelve decisions belong to the director. If a project has not answered all of them, no department can safely start.

| # | Decision | What it actually fixes | Who is blocked until it locks |
|---|---|---|---|
| 1 | Interpretation of the brief or script | What this story is about beneath its plot. The one sentence. | Everyone |
| 2 | Tone | The film's attitude toward its own subject. Warm, cold, wry, reverent, anxious, celebratory. | Casting, wardrobe, art, music, grade, performance |
| 3 | Point of view | Whose experience the camera is inside, and whether that changes | Camera, edit, sound |
| 4 | Visual language | Frame ratio, lens family, camera-height rule, movement grammar, colour logic, contrast logic | DP, art, VFX, grade |
| 5 | World rules | Period, place, degree of realism, what is allowed to exist in frame | Art, costume, hair and makeup, locations, VFX |
| 6 | Casting approval | The faces. In practice this is 60 percent of tone. | Casting, wardrobe, hair and makeup, scheduling |
| 7 | Performance direction | What each performer is actually doing, moment by moment | Cast, camera (blocking), sound |
| 8 | Blocking and coverage | Where bodies and camera go, and what is shot | Camera, grip, art, 1st AD, edit |
| 9 | Pacing | Rate of information and duration of held moments | Edit, sound, music |
| 10 | Sound and music intent | Whether the film is scored, sourced, silent, or diegetic-led | Sound design, composer, edit |
| 11 | Polish level | How finished, controlled and expensive the execution reads | Art, DP, grade, VFX, wardrobe |
| 12 | The final call on every cross-department conflict | Which of two mutually incompatible plans survives, and what replaces the other | Everyone downstream of the conflict |

Classification rule:
- Items 1 through 6 are UPSTREAM. Lock them before any department produces a plan, because every department plan is a derivation from them.
- Items 7 through 11 are IN-FLIGHT and can be adjusted.
- Item 12 is not a decision type. It is a standing duty that recurs for the life of the project.

### 1.1.2 Dependency / lock order (source B2)

Nothing at a given tier may be locked until every tier above it is locked. Each tier is a premise for the tier below. A change at any tier forces re-derivation of everything under it.

**TIER 0: MANDATE**
- [ ] Board or script version locked, with version number and date
- [ ] Approval chain named: who approves, who vetoes, who is merely informed
- [ ] Delivery spec list locked (all ratios, all durations, all variants)

**TIER 1: MEANING**
- [ ] The one-sentence interpretation
- [ ] The single load-bearing beat identified
- [ ] Point of view: whose experience, and whether it shifts

**TIER 2: THE THREE AXES, LOCKED SEPARATELY**
- [ ] Tone, stated as attitude, with an explicit "and not this"
- [ ] Pacing, stated as a rate with named hold points
- [ ] Polish level, stated on its own scale, explicitly not inferred from tone

**TIER 3: WORLD AND PEOPLE**
- [ ] World rules: period, place, degree of realism, what may exist in frame
- [ ] Casting brief issued, and casting approved
- [ ] Performance approach per cast type (actor versus real person)

**TIER 4: VISUAL LANGUAGE**
- [ ] Ratio and camera-height rule
- [ ] Lens family and its logic
- [ ] Movement grammar: what moves, when, and why
- [ ] Colour and contrast logic
- [ ] Sound and music intent

**TIER 5: DEPARTMENT PLANS (blind, parallel)**
- [ ] All departments briefed off identical locked material, simultaneously, without sight of each other
- [ ] All plans returned before any is reviewed

**TIER 6: COORDINATION**
- [ ] Conflict resolution protocol run (1.2)
- [ ] Decision record issued (1.6)
- [ ] Re-derivation completed for every changed premise (1.5)

**TIER 7: EXECUTION**
- [ ] Shot list with per-shot purpose
- [ ] Coverage confirmed sufficient for every deliverable variant, not just the master
- [ ] Schedule tested against the decision record

**HARD RULE:** If a change is made at Tier 2 after Tier 5 has been briefed, the department plans are VOID. Re-brief. Do not patch.

**Minimum lock before any department can start:** Tiers 0, 1, 2, 3 and 4. In decision-set terms, items 1 through 6 (interpretation, tone, point of view, visual language, world rules, casting approval), plus the mandate layer (board version, approval chain, delivery specs). Tier 5 briefing is only as good as the quality of these locks: if the tone statement is vague, blind parallel briefing produces five incompatible plans and the director will wrongly blame the departments.

---

## 1.2 THE CONFLICT RESOLUTION PROTOCOL (source B4)

Run in full. Do not shortcut Step 1 or Step 6.

### STEP 1. Gather all department plans blind and in parallel
1. Brief every department off IDENTICAL LOCKED MATERIAL: same tone statement, same pacing statement, same polish statement, same world rules, same board version, same delivery specs, word for word.
2. No department sees another's answer.
3. No department is briefed after another.
4. Collect all plans before opening any of them.
5. If a department asks what another department is doing, answer: derive your plan from the locked material, and flag any dependency you are assuming. Do not resolve it for them. That flag is the data.

### STEP 2. Read every flagged tension
Assemble the complete list of tensions. Include:
- Explicit flags a department raised about another
- Assumed dependencies a department declared
- Collisions you can see between two plans that neither department flagged, because neither could see the other

Number every tension. Do not group them yet. Do not begin resolving.

### STEP 3. Classify each tension into exactly one of three categories

| Class | Test | Action |
|---|---|---|
| **REAL CONFLICT** | Both plans cannot be executed as written. Executing one forces the other to change | Resolve (Step 4) |
| **FALSE ALARM (already aligned)** | Read side by side, the two plans already agree, or the flagged risk does not materialise given what the other department actually planned | Confirm in writing (Step 6). Change nothing |
| **NEW RISK CREATED BY A FIX** | A resolution elsewhere changed a premise that this plan depended on | Resolve (Step 4), then re-run Step 3 for the new resolution |

Classification rules:
- A tension is REAL only if you can state, in one sentence, the physical or logical incompatibility. If you cannot, it is not real yet, it is under-specified. Send it back for specificity rather than inventing a fix.
- A tension is FALSE ALARM only after you have read both plans in full. A flag raised by a department is not evidence about the other department's plan, only about their expectation of it.
- Every resolution you make generates a mandatory NEW RISK sweep. There are no exceptions.

Reference shapes:
- REAL CONFLICT: camera plan requires a 200 degree working arc around a table; the set plan has a fixed wall on the fourth side because the design requires enclosure. No version of the day where both survive untouched.
- FALSE ALARM: wardrobe flags that its palette may clash with the set; the set palette, independently chosen, is in fact its complement. Both departments were being responsible. Neither needs to move.
- NEW RISK: a real camera/art conflict is resolved by moving from a built set to a practical location. Tone, casting and wardrobe are untouched and still fine. The sound plan was written for a controlled stage and the location is under a flight path. Sound was never party to the original conflict. The fix created the risk.

NEW RISK never arrives as a flag. It has to be HUNTED, by re-reading every department plan after each resolution and asking which of them depended on the premise that just changed.

### STEP 4. Resolve real conflicts and new risks only
Decide by this hierarchy, top down:
1. Safety, legality and regulatory compliance
2. The load-bearing beat: whichever plan protects it wins
3. The locked axes: whichever plan is more faithful to the stated tone, pacing and polish wins
4. Reversibility: prefer the option that can be changed later over the option that cannot
5. Cost and schedule

State each resolution as: what changes, what does not, and which department must re-derive.

**DO NOT AVERAGE.** If camera wants a 200 degree arc and art wants an enclosed room, the answer is not 140 degrees in a partly enclosed room. The answer is one of: a wild wall, a redesigned camera plan, or a different scene solution.

### STEP 5. Write each resolution as a numbered, cross-referenced decision
Not a parenthetical. Not an aside in an email. A numbered entry in the decision record, in the 1.5 format, naming:
- The tension number it resolves
- Every department affected
- Every prior decision it supersedes, by number
- Every number that must now be re-derived

**RULE:** A resolution that lives in only one place has not been made. If the wardrobe change is recorded in the wardrobe note but not in the grade brief and not in the casting record, it will be reverted by whoever reads only their own document.

### STEP 6. Confirm in writing why the false alarms needed no change
For every tension classified FALSE ALARM, write an entry with the SAME NUMBER FORMAT as the resolutions, stating:
- What the two departments each flagged
- What their plans actually say, side by side
- Why the two are compatible
- That no change is being made, and what would have to change for this to be re-opened

**RULE:** This is not optional documentation. "Checked, no change needed, here is why" is a real audit outcome and looks completely different from having forgotten to check. A decision record containing only changes cannot be distinguished from a record produced by somebody who only examined the things they changed. The no-change entries are the evidence of coverage.

Why over-correcting a false alarm is as damaging as missing a real conflict (use these when justifying a NO CHANGE verdict):
1. Every change has a blast radius. Moving the wardrobe palette to solve a clash that did not exist means hair and makeup, grade reference and possibly casting look are now derived from a premise that is no longer true.
2. It destroys the signal value of flags. Departments stop raising them.
3. It consumes the change budget. A commercial absorbs a finite number of changes.
4. It manufactures the impression of chaos. A crew that watches settled decisions reopen concludes the film is not designed.

### STEP 7. Re-run
After all resolutions, re-read every department plan against the current set of premises. Any plan whose premise changed goes back through Step 3. Continue until a full pass produces zero new risks.

---

## 1.3 THE BLIND PARALLEL BRIEFING METHOD (source A6)

### 1.3.1 The mechanic (what to do)
1. Lock the source material first (Tiers 0 to 4 of 1.1.2).
2. Produce ONE briefing package. Every department receives the same tone statement, pacing statement, polish statement, world rules, board version and delivery specs, word for word.
3. Issue all briefs SIMULTANEOUSLY.
4. Grant NO CROSS-VISIBILITY. No department sees any other department's answer at any point during derivation.
5. Brief NO DEPARTMENT AFTER ANOTHER. Sequence is the failure.
6. When a department asks what another department is doing: refuse to answer; instruct them to derive from the locked material and to FLAG the dependency they are assuming.
7. Collect ALL plans before opening ANY of them.

### 1.3.2 Why sequential briefing fails
Sequential briefing = director briefs camera, camera returns a plan, director briefs art WITH the camera plan attached, then costume with both attached, and so on.

- It produces PRE-COMPROMISED, SYNTHETIC CONSENSUS. By the time the fourth department is briefed it is not answering the director's question, it is solving a puzzle with three sides already fixed.
- Its answer will be COMPATIBLE, which is not the same as CORRECT, and the compatibility was purchased before anyone tested whether the earlier plans were right.
- The resulting apparent agreement carries NO INFORMATION. Of course they agree, they were shown the agreement and asked to join it.
- The director then reviews four aligned plans and concludes the design is sound, when only the first plan was ever independently derived and every subsequent one inherited its errors.
- It feels efficient and is much more comfortable. That is the trap.

### 1.3.3 What blind parallel briefing gives you
- COLLISIONS ARE REAL. Where independently derived plans collide, the premises themselves are ambiguous, under-specified or internally contradictory. A collision under blind briefing is a diagnostic about the BRIEF, not about the departments.
- AGREEMENT IS INFORMATIVE. Three departments arriving separately at the same colour logic is strong evidence the tone decision was clear and correctly stated.
- Quality cap: the quality of blind parallel input is capped by the quality of the locked material. Vague tone statement produces five incompatible plans and a wrong conclusion that the departments are the problem. The lock must be genuinely decided before it goes out.
- Consistency rule: every department is owed the SAME three axes, stated IDENTICALLY, plus the specific premises their craft derives from. Inconsistency between briefs is the primary manufacturer of false alarms.

---

## 1.4 THE TWO INDEPENDENT AXES DIRECTORS CONFUSE (source A4)

**Standing discipline: never act on an adjective until it has been assigned to an axis.** Clients, agencies and crew all use feeling-words for measurable things. "Slow," "flat," "cold," "cheap," "premium" and "glossy" are each used to describe at least two of the three axes.

### AXIS PAIR 1: PACING vs TONE

Definitions:
- **PACING is a rate.** How quickly information arrives, how long a moment is held, how many cuts per unit of time, how much dead air is permitted between beats. Lives in the edit, in blocking, in line delivery speed, in shot duration.
- **TONE is an attitude.** The film's stance toward its own material: affectionate or contemptuous, grave or playful, warm or cold, sincere or ironic. Lives in casting, performance, music, light quality, colour, framing distance and the script.

They are ORTHOGONAL. Any quadrant is occupiable:

| | Warm tone | Cold tone |
|---|---|---|
| **Slow pacing** | Zhao, *Nomadland*: long, unhurried, deeply affectionate | Haneke: equally unhurried, deliberately withholding sympathy |
| **Fast pacing** | A comedy montage: rapid cutting, entirely benign | A thriller chase: rapid cutting, hostile and airless |

**OPERATIONAL RULE: reversing a pacing decision does not reverse a tone decision.**

Failure shape A: note is "it feels distant" (tone note phrased as a feeling). Edit tightens every shot by six frames and loses two beats of silence. Film is now faster and still distant, and the compression removed the holds that would have let a warm performance land, so tone moved further wrong while appearing addressed.
Failure shape B: note is "it drags" (genuine pacing note). Director warms the grade, adds score, recasts the VO friendlier. Film is warmer and still drags, and the added score increased perceived running time because music makes structure legible.

Levers:

| To change PACING | To change TONE |
|---|---|
| Shot duration, cut count, scene order | Casting, above everything else |
| Where a scene starts and ends (late in, early out) | Performance register (how much the actors are giving) |
| Line delivery speed and overlap | Music: presence, instrumentation, whether it comments or observes |
| Amount of held silence or empty frame | Light quality: hard versus soft, source direction, contrast |
| Camera movement speed | Colour: palette and grade warmth |
| Density of information per shot | Framing distance: closeness equals sympathy, distance equals judgement |

**DIAGNOSTIC QUESTION (pacing vs tone):**
> "If I shortened this by 15 percent, would the note be resolved?"
> YES = pacing note. NO (the note would survive the trim) = tone note, and the trim is off-target.

### AXIS PAIR 2: POLISH LEVEL vs TONE

Definitions:
- **POLISH LEVEL is a measure of FINISH.** How controlled, clean, expensive, resolved and immaculate the execution reads. Set by art department dressing, lighting control, camera stability, grade cleanliness, VFX finish, wardrobe newness, hair and makeup precision.
- **TONE is attitude** (as above).

Also orthogonal:

| | Warm / celebratory tone | Cold / austere tone |
|---|---|---|
| **High polish** | Wes Anderson: immaculate, symmetrical, controlled, affectionate | Villeneuve's *Dune*: as controlled and expensive as film gets, grave, arid, unconsoling |
| **Low polish** | Handheld available-light community documentary register: rough and loving | Safdie brothers register: rough and hostile |

**OPERATIONAL RULE: making a location more polished does not make the film's tone glossier.**

Failure shape A: brand says "it needs to feel more premium." Someone hears "glossy." Art repaints the location, replaces practical furniture with designer pieces, dresses out every honest imperfection. Polish rises substantially. Tone does not move, because tone was carried by casting and performance register, which are unchanged. Result: more expensive-looking, identically feeling, at significant cost, plus a new problem because the location lost the texture that gave the light its interest and the DP's plan no longer works.
Failure shape B: director wants "honest," de-dresses the set, shoots untreated location with available light. Polish drops. Honesty does not appear. Without a casting or performance change the result reads as under-resourced, a worse signal on behalf of a brand.

Reference case: Gehrig's *This Girl Can*. Deliberately unglamorous imagery, extremely high craft level, warm tone. Low gloss, very high polish, warm tone. Three separate dials.

**DIAGNOSTIC QUESTION (polish vs tone):**
> "If this were shot with the same cast and the same performances on a better-dressed set with more lighting control, would the note be resolved?"
> YES = polish note, belongs to art, camera and grade. NO = tone note, belongs to casting, performance, music and framing.

---

## 1.5 THE RE-DERIVE VERSUS RELABEL RULE (source B5)

**THE RULE:** when a change touches a physical or technical premise, every dependent number and technique must be RE-DERIVED FROM FIRST PRINCIPLES. It must not be renamed, adjusted proportionally, or carried over with a new label.

**Physical and technical premises include, and are not limited to:**
- Sensor size, sensor format, capture resolution
- Aspect ratio and any change to it
- Lens format or lens family
- Location versus build, and any change of location
- Room dimensions, ceiling height, available camera arc
- Framing rule or camera-height rule
- Frame rate
- Distance from camera to subject
- Power availability, rigging points, load limits
- Delivery spec of any kind

**Why relabelling fails.** A focal length is not a look. It is a number that produces a specific field of view on a specific sensor at a specific distance. Change the sensor and the same number produces a different image. Change the room and the same number cannot be placed. Instructing the DP to "use the same lenses" after a capture-format change has not preserved the look, it has changed it while believing it preserved, and the error will not be visible until the grade.

Space example: moving from a built set to a practical location of "similar size" invalidates the camera plan (arc and rig points), the lighting plan (no removable walls, no ceiling access, different practical sources), the sound plan (different acoustic and noise floor), the blocking (different distances), the schedule (different turnaround), and possibly wardrobe (different ambient colour bouncing onto faces). Six departments' numbers are now wrong. None of them will announce this.

**PROCEDURE WHEN A PREMISE CHANGES:**
1. Name the premise that changed, precisely, with its old and new value.
2. List every department whose plan referenced that premise, directly or indirectly.
3. For each, list every specific number or technique that was derived from it.
4. Re-derive each from the new value. Do not adjust. Do not scale. DERIVE.
5. Where a re-derived value now conflicts with another department, that is a NEW RISK. Send it back through 1.2 Step 3.
6. Record the re-derivation in the decision record with its own number, cross-referencing the resolution that caused it.

**FORBIDDEN SENTENCE:** any variant of "it is basically the same, just call it X now."

---

## 1.6 DIRECTOR'S DECISION RECORD: OUTPUT TEMPLATE (source B7)

Issue after every coordination pass. Version it. Never edit a previous version in place; issue a new one and supersede by number.

```
DIRECTOR'S DECISION RECORD
Project: [name]           Version: [n]        Date: [date]
Board / script version this record derives from: [version, date]
Supersedes: DDR v[n-1]

--------------------------------------------------------------
SECTION 0. LOCKED PREMISES
Any change to any line here voids every derived decision below.

P1  Interpretation (one sentence):
P2  Load-bearing beat:
P3  TONE (attitude, plus explicitly what it is NOT):
P4  PACING (rate, plus named hold points):
P5  POLISH LEVEL (stated independently of P3):
P6  World rules:
P7  Ratio / capture format / frame rate:
P8  Locations: [build / practical, named]
P9  Cast structure: [professional / non-professional / mixed]
P10 Delivery specs: [every ratio, every duration, every variant]

--------------------------------------------------------------
SECTION 1. TENSIONS REGISTER
Every tension found, numbered, classified, none omitted.

T#  | Departments | Description | Class | Resolution ref
T1  | Camera / Art | [one line] | REAL | R1
T2  | Wardrobe / Colour | [one line] | FALSE ALARM | N1
T3  | Sound / Locations | [one line] | NEW RISK (from R1) | R2

--------------------------------------------------------------
SECTION 2. RESOLUTIONS (real conflicts and new risks only)

R1. [Title]
    Resolves: T1
    Decision: [what changes, stated as an instruction]
    Unchanged: [what explicitly does not change, and why]
    Departments affected: [all of them]
    Supersedes: [prior decision numbers, or NONE]
    Premises touched: [P-numbers, or NONE]
    Re-derivation required: [D-numbers below, or NONE]
    Reversible until: [date or event]

R2. [Title]
    Resolves: T3
    Caused by: R1
    ...

--------------------------------------------------------------
SECTION 3. NO-CHANGE CONFIRMATIONS
Checked, no change needed, here is why. Same numbering weight
as Section 2. Absence of an entry here means it was not checked.

N1. [Title]
    Addresses: T2
    Department A flagged: [what they said]
    Department B's plan actually states: [what it says]
    Why these are compatible: [reason]
    Decision: NO CHANGE
    Would re-open if: [the specific condition]

--------------------------------------------------------------
SECTION 4. RE-DERIVATIONS
Triggered by any change to a Section 0 premise.

D1. Premise changed: [P-number] from [old] to [new]
    Caused by: [R-number]
    Department: [name]
    Values re-derived from first principles:
      - [old value] -> [new value], derived because [reasoning]
      - ...
    New conflicts produced: [T-numbers, or NONE]

--------------------------------------------------------------
SECTION 5. OPEN ITEMS
Numbered, owned, dated. Anything unresolved at issue time.

--------------------------------------------------------------
SECTION 6. DISTRIBUTION
Every department that must read this, and which sections bind them.
```

---

## 1.7 DIRECTOR TRIGGER LIST: WHAT FORCES A FULL COORDINATION PASS (source B8)

Any one of these voids the current alignment and requires re-running the conflict resolution protocol IN FULL. Not a partial check. A full pass.

**Premise changes**
1. Any change to ratio, capture format, sensor, frame rate or resolution
2. Any change of location, including a "similar" one
3. Any change from build to practical, or practical to build
4. Any change to a framing rule, camera-height rule or lens family
5. Any change to the shooting order or the number of shoot days

**Mandate changes**
6. A new board or script version, however minor the stated change
7. A new or changed deliverable, ratio, duration or platform variant
8. A change in who holds approval or veto
9. A brand guideline, legal or regulatory constraint arriving late

**People changes**
10. Any casting change, including a swap between two approved options
11. A change in cast structure (an actor replacing a real person, or the reverse)
12. Loss or replacement of any department head

**Axis changes**
13. Any change to the tone statement
14. Any change to the pacing statement
15. Any change to the polish level

**Resolution-driven**
16. Every time a REAL CONFLICT is resolved (mandatory NEW RISK sweep)
17. Every time a re-derivation produces a value that another department referenced
18. Any time a department reports that its plan is no longer achievable

**Time-driven**
19. Immediately before the pre-production meeting, unconditionally
20. Immediately before the first day of photography, unconditionally
21. Before the first cut is shown to any approver outside the production

**RULE:** When in doubt about whether a change is large enough to trigger a pass, RUN THE PASS. A full pass on a settled project is cheap and produces a set of no-change confirmations, which is itself a valuable artefact.

---
---

