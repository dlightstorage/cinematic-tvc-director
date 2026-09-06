# Production Logistics Audit (Stage 6, 1st AD and Line Producer pass)

*Extracted from the gate-role craft bibles as executable procedure. Full craft reasoning behind every step is in `bibles/11-Director.md`, `bibles/12-Script-Supervisor.md`, `bibles/13-First-AD-and-Line-Producer.md`.*

# PART 3: FIRST AD AND LINE PRODUCER (source 13-First-AD-and-Line-Producer.md)

---

## 3.1 THE PRODUCTION-LOGISTICS AUDIT PROTOCOL (source B2)

Run it in order. Do not skip steps because an earlier document looked fine. Do not stop at the first finding.

**GOVERNING INSTRUCTION:** read the creative document hunting specifically for scheduling and cost implications that were never flagged as such. The document will not tell you where it is expensive. It was not written to. Assume every descriptive sentence may contain a logistics event and check it as one.

### STEP 1. Inventory the document for unflagged logistics events
Read the creative document, treatment, shot list and every crew bible end to end, and extract into a flat list:
- every place named
- every person named or implied
- every costume state named or implied
- every time of day stated or implied
- every technical specification stated
- every physical effect, animal, vehicle, minor or specialist element
- every stated rule or constraint

Do not evaluate yet. Extract first. The purpose is to convert prose into a countable list, because prose hides quantity and lists do not.

**Output of step 1:** a raw inventory with a source reference for each item (which document, which section).

### STEP 2. Location resolution and move detection
For every place in the inventory, resolve it into exactly one of four categories:

| Category | Definition | Schedule consequence |
|---|---|---|
| **Same space** | Genuinely the same physical area, same lighting build, same dressing | None |
| **Same property, new setup** | Different room or angle in the same building, requiring its own light and dressing | Sub-move. Add 1 to 2 hours. Own line on the schedule |
| **Separate address** | A different location requiring travel | Full company move. Add 2.5 to 4 hours. Own permit, own parking, own hospital, own safety brief |
| **Unresolved** | The document does not say, and nobody has confirmed | THIS IS A FINDING. Report it as an open item with both cost outcomes stated |

**Do not resolve an unresolved location by guessing.** Report both outcomes. Example form: "If the yard is on the same property as the workshop, this costs 1 to 2 hours. If it is a separate address, it costs 2.5 to 4 hours and a second permit. Confirmation required before the schedule can lock."

**Output of step 2:** every place categorised, every move counted, every hospital requirement identified, and every unresolved location flagged with a two-sided cost.

### STEP 3. Cast and prep-budget revalidation
For every performer in the inventory:
1. Count LOOKS, not people.
2. Assign a makeup and hair time band: light (30 to 45 min), standard (45 to 75 min), constructed (90 min or more).
3. Compute total chair-hours required.
4. Divide by budgeted chairs to get elapsed prep time.
5. Compute the crew call and cast call that elapsed prep time implies, working backwards from the required first shot.
6. Count fittings required (performers times looks) and compare against the fittings budgeted.
7. Count on-day costume changes and place each one in the shooting order as a NAMED GAP.

Then apply THE STALENESS LAW (3.2). If the cast list has changed at all since the prep window was agreed, the prep window is VOID and must be RECOMPUTED, not adjusted.

**Output of step 3:** a prep-hours total, an implied call time, a fittings count, a chair count requirement, and an explicit statement of whether the previously agreed prep window still holds.

### STEP 4. Gear, lens and package consistency check
1. Build a table of every camera, lens, format and specialty item named anywhere across all documents.
2. Flag every inconsistency, including inconsistencies of OMISSION where one entry specifies and another does not.
3. Determine whether the union of all named items fits inside one rental package or forces a package change.
4. For each package change, state: the rate delta, whether it needs an additional technician, whether it needs an additional prep day at the rental house, and whether it changes the truck requirement.
5. Check whether any item requires a specialist operator who is not on the crew list.

**Output of step 4:** a consistency table, a package decision, and any crew additions the gear implies.

### STEP 5. Locked Rule achievability check
For each stated technical rule, test it against the schedule AS SCHEDULED, not as imagined.
- A fixed wide aperture in a bright exterior at midday requires ND. Is ND in the package?
- A natural-light-only rule for an interior at a scheduled hour of 4pm in winter requires you to check actual light levels at that hour. Is the scene scheduled inside the available light?
- A golden-hour rule gives you 30 to 50 minutes. How many setups are assigned to that window? If more than two, the rule and the schedule contradict.
- A single-take rule requires rehearsal hours. Are they on the schedule as production hours, or is the rehearsal assumed to be free?
- A fixed frame rate that implies a light level requires you to check whether the fixture package can deliver it in that space.

Any rule that cannot be achieved in the hours scheduled is reported as a CONTRADICTION, with both resolutions offered: change the rule, or change the schedule.

**Output of step 5:** a rule-by-rule achievable / not achievable / conditional verdict, with the condition stated.

### STEP 6. Day arithmetic
Compute, explicitly, in this order:

```
Total scheduled hours              (call to wrap)
  minus meal break                 (typically 30 to 60 min, non-negotiable)
  minus company moves              (from step 2)
  minus sub-moves                  (from step 2)
  minus safety briefings           (10 min per location)
  minus client approval loop       (10 to 15 min per setup, if client attending)
  minus costume change gaps        (from step 3)
  minus wrap and strike            (if the unit must restore the location same-day)
= NET SHOOTING TIME

NET SHOOTING TIME divided by SETUP COUNT = MINUTES PER SETUP
```

Compare minutes per setup against the realistic band. If the number comes out below roughly 20 minutes per setup on a lit job, THE DAY DOES NOT EXIST AS SCHEDULED and the report must say so in those words.

Realistic bands to test against:
- Lit interior setup with a lighting change: roughly 30 to 60 minutes from previous cut to next roll
- Re-angle within an existing lighting state: 10 to 25 minutes
- A fully new location within the same building with power, blackout and dressing: effectively a small company move
- Adjust for crew size and gear. Never quote these as fact to a client. Use them to test whether a proposed day is arithmetic or fantasy.

**Output of step 6:** the arithmetic, shown as arithmetic, plus a verdict: achievable, tight, or not achievable.

### STEP 7. Report every finding with its hours and cost implication
A finding is not "the second location is unclear." A finding is:

> "The second location is unresolved. If it is a separate address, it adds a company move of 2.5 to 4 hours, a second permit, a second parking plan, a second nearest-hospital entry on the call sheet, and it removes approximately 6 to 9 setups from the day at the current pace. Confirmation required before the schedule can be issued."

Every finding carries all six fields:
- **What** the finding is
- **Where** it came from (document and section)
- **The hours** it costs or risks
- **The money** it costs, or the line items it creates
- **What it invalidates** (which previously agreed number is now stale)
- **The decision required**, and from whom

**Never report a logistics finding as a preference or an observation. Report it as a quantity.**

---

## 3.2 THE STALENESS LAW (source B3)

**Any previously agreed prep window, headcount, build count, day count, chair count, fitting count, truck count or hours estimate goes stale the moment a structural addition is made anywhere in the project, and must be re-totalled from scratch rather than assumed to still hold.**

### What counts as a structural addition
- Any new location, including one that turns out to be a room rather than an address
- Any new performer, principal or background
- Any new costume look
- Any new build, set piece or constructed element
- Any new shot that introduces a new angle in an existing space, because a new angle can mean a new zone to dress and a new lighting state
- Any new deliverable, because a new aspect ratio or cut-down can carry its own capture requirement
- Any change to the shoot day count or the day length
- Any change to a technical Locked Rule
- Any change to the crew size, up or down

### How to apply it
1. **Do not adjust. Re-total.** An adjusted number carries the old assumptions inside it. A re-totalled number does not.
2. **Name the stale numbers explicitly** in the report, by their old value and their new value. "Prep window previously agreed at 3 hours for 4 performers. With 6 performers across 2 chairs, prep is now 4 hours 30 minutes. The 3-hour figure is void."
3. **Say what the staleness cascades into.** A longer prep window moves the crew call, which moves the wrap, which may breach turnaround for tomorrow, which is a penalty and a fatigue event.
4. **Refuse to carry a stale number forward silently.** If a number is stale and cannot be recomputed because information is missing, the report says so and marks the schedule as UNLOCKABLE.

Rationale: everyone else in the pipeline experiences an addition as an INCREMENT ("just one more person," "just one more angle"). This seat is the only one that experiences it as a MULTIPLIER, because this seat is the only one holding the totals. If this seat also treats it as an increment, nobody in the entire production is holding the truth.

---

## 3.3 THE HIDDEN-COST READING TABLE (source A8)

Catalogue of tells in ordinary descriptive language, with what each silently adds.

| Phrase pattern in a creative document | What it may silently add |
|---|---|
| Two environments named with different nouns, no relationship stated | A company move, a second permit, a second hospital, two to four hours |
| "Later, at the same place" | A time-of-day change, which is a full relight, or a scheduling constraint tying two blocks to specific hours |
| "Golden hour", "just before dawn", "as the sun sets" | A fixed, unmovable, roughly 30 to 50 minute window, and a mandatory contingency plan |
| A new character name appearing once, midway through | A full cast engagement: casting, fitting, makeup chair, release, catering, DOOD entry |
| "A group of", "a crowd", "onlookers", "a team" | Background performers, and therefore casting, wrangling, wardrobe throughput, catering count, and an AD department headcount increase |
| "He is now wearing" | A costume change: a unit, a fitting, a continuity record, a standby dresser, and a schedule gap |
| "We move through the door into" | Possibly a single continuous space, possibly two lighting states, possibly two locations. Never assume |
| "Shot on [specific camera or lens]" appearing in only some entries | Package inconsistency. Either the package is bigger than budgeted or the document contradicts itself |
| "Rain", "smoke", "fire", "water", "wind" | SFX crew, safety brief, reset time between takes, wardrobe doubles, permits, and frequently a dedicated block |
| "Practical light source", "the lamp is on" | Art department owns the fixture, lighting owns the bulb and the power, and someone has to establish which and dim it |
| A build, a set piece, a constructed element | Build days, materials, a space rented at build rate before shoot rate, and a strike |
| Any animal | A handler, welfare provision, a wrangler day, insurance, and a scene that will take longer than any human scene of equal length |
| Any minor | Legal hour limits, a chaperone, a tutor in some jurisdictions, and reduced usable hours |
| "One continuous shot", "no cuts" | Rehearsal hours as production hours, and a fallback plan that must be scheduled |
| "Drone", "aerial", "vehicle-mounted", "underwater" | A specialist unit, a permit, an operator, a licence and usually a separate block |
| A technical rule stated absolutely, such as a fixed stop or a fixed lens for the whole piece | Check it against the light available at each scheduled time. A rule that cannot be achieved in the light available is a schedule problem, not a camera problem |

**Governing note:** the most expensive line in any creative document is the one that reads as a small clarification. "Also in the second half, we see her at home." Eleven words. A location, a permit, a move, a dressing day, a continuity check and a hospital.

### Companion: creative decision to line item conversion (source A5)

| Creative decision | Immediate line items it creates |
|---|---|
| "We see the same character in a second environment" | Location fee, permit, possible company move, transport, extra dressing, possible additional wardrobe change and therefore a costume standby and continuity stills, revised call sheet, second hospital |
| "She changes outfit between shots" | Wardrobe unit count, fitting hours, standby dresser time, on-set change space, continuity photography, schedule gap between setups |
| "Shot at golden hour" | A hard, unmovable, roughly 30 to 50 minute window that the entire day must be reverse-engineered around, plus a contingency plan if the sun does not cooperate |
| "A crowd fills the background" | Background performer count and rate, casting time, wrangling headcount in the AD department, catering count, holding area, wardrobe and makeup throughput, release forms |
| "Practical rain" | SFX crew, water supply and disposal, drying time between takes, wardrobe doubles, extended reset, safety brief, likely a whole scheduling block on its own |
| "Shot on a specialty lens set" | Rental package change, possible camera body change, possible additional assistant, insurance value, prep day at the rental house |
| "A built environment rather than a found one" | Build days, stage or space rental split between build and shoot rates, construction labour, materials, strike, storage |
| "One continuous take" | Rehearsal hours that must be scheduled as production hours, blocking time, possibly a full day for one shot, and an explicit fallback |

Note: almost none of the right-hand cells are the item that was named. The named item is usually the cheapest thing in the row. The cost is in what the named item drags behind it.

---

## 3.4 COMPANY MOVE COST FIGURES (source A6)

### Anatomy of a move, in hours, on a modest commercial crew

| Phase | What happens | Typical cost in time |
|---|---|---|
| Call the wrap on location 1 | Last shot, safety, begin strike | 0 |
| De-rig | Lights down, stands collapsed, cable coiled, camera broken down, art department strikes and restores the space | 30 to 90 minutes |
| Load | Into trucks and vehicles, gear checked against the list | 20 to 40 minutes |
| Travel | Convoy, not a car. Slowest vehicle sets the pace | Actual drive time plus 50 percent |
| Unload and stage | Position trucks, get gear to the working area, which may involve stairs, lifts or a long carry | 20 to 45 minutes |
| Re-rig | Lighting rebuilt, camera built, art dressed, sound reset | 45 to 120 minutes |
| Safety brief for the new location | Non-negotiable, and it is a genuinely different brief | 10 minutes |
| First shot | | |

**HEADLINE FIGURE:** the honest number for a real second location in the same city, with a normal crew, is **2.5 to 4 hours of paid, non-shooting time**, before anything goes wrong. On a ten hour day that is a quarter to nearly half the day gone.

**SUB-MOVE FIGURE:** a move within a single property is not free. Different floor, different power, different blackout, different noise environment, different access for gear. If the second space needs its own lighting plan built from zero, it is functionally a company move with a shorter drive. **Budget 1 to 2 hours and put it on the schedule as a named event, not as a gap.**

**Detection rule:** the most dangerous version is the location described creatively but never labelled as a move. "The workshop" and "the yard" may be one property or two properties forty minutes apart. "The corridor" and "the roof" may be one building with roof access, or a building plus a permit plus a lift plus a separate risk assessment. Nothing in the language distinguishes them. Only asking distinguishes them.

**Framing rule:** adding a location is a scheduling decision at least as much as a creative one. The creative conversation is "should this moment happen somewhere else." The scheduling conversation is "which shots are we deleting to pay for it." Both must happen, and the second does not happen by itself. It has to be forced into the room by the person holding the schedule.

---

## 3.5 PREP-TIME ARITHMETIC RULES (source A7)

### 3.5.1 Makeup and hair throughput (chairs times hours)
- A CHAIR is a physical position with an artist in it. Two artists and one mirror is ONE chair for throughput purposes.
- A straightforward clean beauty look: roughly **30 to 45 minutes per person**.
- A constructed look (period, character, effects or extensive hair): **60 to 120 minutes and up**.
- Background performers are usually batched at a much lower per-head time, but batching requires space and a second artist.
- Nobody can be in the chair and on set simultaneously. The makeup schedule and the shooting order must agree with each other.

**Worked rule:** with TWO chairs and a 45 minute look:
- 4 cast members = 90 minutes
- 6 cast members = 135 minutes
- 8 cast members = 180 minutes

Adding two people to a cast list does not add two units of anything. It adds a block of time at the very front of the day, which either pushes the crew call earlier, pushes the first shot later, or requires a third artist. All three are budget events.

**Time bands to assign in the audit:** light 30 to 45 min / standard 45 to 75 min / constructed 90 min or more.

### 3.5.2 Wardrobe fittings (looks, not people)
- A fitting is per performer PER LOOK, not per performer. One performer with three costume changes is three fittings' worth of work, or one long fitting, plus three continuity records.
- Standard commercial practice: roughly **45 to 90 minutes per performer for a single look**, including alterations assessment. Longer for period or constructed costume.
- Alterations are a separate labour line with a lead time measured in DAYS, not hours.
- On the day, every costume change is a scheduled gap in the shooting order, typically **10 to 30 minutes** depending on complexity and whether there is a private change space at the location.

**Worked rule:** a cast expansion from four to six performers, each with two looks, moves the wardrobe prep requirement from **8 fitting units to 12**, plus four more continuity records, plus additional standby time on the day. If the previously agreed prep window was built for eight, it is now wrong, by a margin no amount of goodwill on the day recovers.

### 3.5.3 Set dressing hours (zones and surfaces, not locations)
- A ZONE is any area the camera will see that has to be composed: a desk, a wall, a corner, a threshold, a table top.
- A modest zone takes an art department PAIR roughly **45 to 90 minutes** to dress from a prepared kit.
- A zone that needs sourcing, building or repainting is **a day or more of prep** before anyone dresses anything.
- A location seen from multiple angles has more zones than a location seen from one angle. A 360 degree usable space is a MULTIPLE, not an increment.
- Strike and restore is real. On a practical location it is often **50 to 80 percent of the dressing time**, and it happens at the end of the day when everyone is tired and the clock is already lost.

**Worked rule:** adding one wall of a room to the shot list can add a zone, and a zone is roughly **one hour of pre-call art department labour**, bought either by starting the art department earlier (a pre-call day) or by adding a body (a rate).

### 3.5.4 Pre-light and pre-rig
If the lighting plan for a space is more than a couple of sources, someone has to build it before the crew call, or the crew spends the first two hours of the day watching it get built. A pre-light day, or a pre-light morning with a skeleton crew, is a LINE ITEM. Prep crew is structurally separate from shoot crew.

### 3.5.5 Client approval loop arithmetic
Budget **10 to 15 minutes per setup** for client viewing and discussion. On a day with twelve setups that is two to three hours. If it is not in the plan it comes out of shooting time, and the shots that get cut are the ones at the end of the list.

---

## 3.6 PRODUCTION-LOGISTICS AUDIT REPORT TEMPLATE (source B8)

Keep the arithmetic visible. Never soften a quantity.

```markdown
# PRODUCTION-LOGISTICS AUDIT
## [Project] | [Version of documents audited] | [Date]

### 0. VERDICT
[One of: SCHEDULE ACHIEVABLE / SCHEDULE TIGHT, CONDITIONS BELOW /
SCHEDULE NOT ACHIEVABLE AS WRITTEN]
[One sentence stating the single biggest driver of that verdict.]

### 1. DOCUMENTS AUDITED
| Document | Version / date | Sections reviewed |
|---|---|---|

### 2. DAY ARITHMETIC
Scheduled hours (call to wrap):        [ ]
  less meal:                           [ ]
  less company moves ([n] x [hrs]):    [ ]
  less sub-moves ([n] x [hrs]):        [ ]
  less safety briefings ([n] x 10min): [ ]
  less client approval loop
       ([n] setups x [min]):           [ ]
  less costume change gaps ([n]):      [ ]
  less wrap / restore:                 [ ]
= NET SHOOTING TIME:                   [ ]

Setup count:                           [ ]
MINUTES PER SETUP:                     [ ]
Realistic band for this job type:      [ ]
VERDICT ON PACE:                       [achievable / tight / not achievable]

### 3. LOCATION RESOLUTION
| Place named | Source | Resolved as | Move type | Hours | Permit | Hospital listed |
|---|---|---|---|---|---|---|
[One row per place. Unresolved entries marked UNRESOLVED with both cost outcomes.]

**Company moves detected:** [n]
**Sub-moves detected:** [n]
**Unresolved locations requiring confirmation before lock:** [n]

### 4. CAST AND PREP REVALIDATION
| Performer | Looks | MU/hair band | Chair-hours | Fittings | On-day changes |
|---|---|---|---|---|---|

Total chair-hours:                 [ ]
Chairs budgeted:                   [ ]
Elapsed prep time:                 [ ]
Implied cast call:                 [ ]
Implied crew call:                 [ ]

**PREVIOUSLY AGREED PREP WINDOW:** [old value]
**STATUS:** [HOLDS / VOID]
**RECOMPUTED PREP WINDOW:** [new value]
**CASCADE:** [what else this moves: crew call, wrap, turnaround, overtime]

### 5. GEAR AND PACKAGE CONSISTENCY
| Item | Named in | Named where else | Consistent? |
|---|---|---|---|

**Inconsistencies found:** [n]
**Package change required:** [yes / no]
**Package delta:** [rate, extra technician, extra prep day, extra truck]

### 6. LOCKED RULE ACHIEVABILITY
| Rule | Stated in | Scheduled at | Achievable? | Condition or contradiction |
|---|---|---|---|---|

### 7. FINDINGS
[One numbered entry per finding. Each MUST carry all six fields.]

**F1. [Title]**
- What: [ ]
- Source: [document, section]
- Hours implication: [ ]
- Cost implication / line items created: [ ]
- Invalidates: [which agreed number is now stale]
- Decision required from: [role]

**F2. ...**

### 8. STALE NUMBERS REGISTER
| Number | Old value | New value | Why it went stale | Cascade |
|---|---|---|---|---|

### 9. WHAT GETS CUT IF NOTHING CHANGES
[Ranked list of the setups that will not happen, in the order they will be lost.
This is the most useful section in the document. Write it plainly.]

### 10. DECISIONS REQUIRED BEFORE SCHEDULE LOCK
| # | Decision | Owner | Deadline | Cost of deciding late |
|---|---|---|---|---|

### 11. SAFETY ITEMS
- Locations requiring their own safety briefing: [n]
- Nearest hospital confirmed for each location: [yes / no per location]
- Turnaround check, wrap to next call, per person: [pass / breach, and for whom]
- Meal break placement: [time, and whether it interrupts a lighting state]
- Specific hazards requiring named mitigation: [list]
```

---

## 3.7 1st AD / LINE PRODUCER TRIGGER LIST (source B9)

Any of these events invalidates the current plan. The right-hand column is not optional and not a subset. Re-total everything listed.

| Trigger | What it forces you to re-total |
|---|---|
| **A location is added** | Move count, move hours, net shooting time, minutes per setup, permit list, parking, hospital list, safety briefing count, transport, dressing hours, art department call, truck count, call sheet |
| **A location turns out to be a separate address rather than the same property** | Same as above. Treat as a new location, not as a clarification |
| **A performer is added** | Chair-hours, chair count, artist count, elapsed prep, cast call, crew call, fittings count, wardrobe units, continuity records, catering count, release forms, DOOD, day rate, background wrangling headcount |
| **A costume look is added** | Fittings count, alterations lead time, on-day change gaps, standby headcount, continuity records, schedule gaps, net shooting time |
| **A background crowd is added or resized** | Casting, wrangling headcount in the AD department, wardrobe throughput, makeup throughput, catering, holding space, releases, and the AD department's own crew size |
| **A setup is added to the shot list** | Setup count, minutes per setup, net shooting time, and the ranked cut list |
| **A new angle is added in an existing space** | Dressing zones, art department hours, possible lighting state change, setup count |
| **A build or set piece is added** | Build days, materials, construction labour, stage or space rental at build rate, strike, storage, load-in, and the prep calendar |
| **A camera, lens or format is added or changed** | Package boundary, rate, technician count, prep day at the rental house, truck, insurance value, and consistency across every document |
| **A technical Locked Rule is added or changed** | Achievability against every scheduled hour, package requirements, and possibly the entire shooting order |
| **The shoot day count or day length changes** | Everything. Restart the audit |
| **The crew size changes** | Overtime exposure per hour, catering, transport, rig and de-rig times, move times |
| **A time-of-day requirement is added** | Shooting order, the position of every other block in the day, meal placement, and whether the day still fits |
| **An effect, animal, minor or vehicle is added** | A dedicated schedule block, specialist crew, permits, welfare provision, insurance, safety brief, and reset time between takes |
| **A deliverable, cut-down or aspect ratio is added** | Whether it requires its own capture, and therefore setups |
| **The client adds attendance** | Approval loop minutes per setup, hospitality logistics, seating, catering, and a named minder |
| **A day slips or a shot is lost** | Tomorrow's plan, turnaround per person, overtime exposure, and the hot cost report |
| **Weather forecast changes** | Cover set requirement, shooting order, and whether the exterior block still has a viable window |
| **Any change at all after the PPM** | Whether it is inside the agreed scope or a chargeable change, and if chargeable, its price in hours and money, stated in writing before it is executed |

### Standing rules for the seat (source B10)
1. Never report a logistics observation without a quantity attached. Hours, money, or setups lost. A note without a number is not a finding.
2. Never resolve an ambiguity by guessing. Report both outcomes with both costs and name who must decide.
3. Re-total, do not adjust. Every structural addition voids the previous total.
4. The safety authority is absolute and is not traded against the schedule. If a plan only works when the safety step is skipped, the plan is void.
5. The call sheet is a promise. Nothing goes on it that has not been confirmed, and everything on it is updated after a move.
6. The meal break is not negotiable.
7. Turnaround is a fatigue control, not a payroll line. Check it per person, including anyone brought in early for a pre-light.
8. Say what it costs, not whether to do it.
9. Defend the art department's prep time.
10. Write down what was agreed. The PPM record is the only baseline that makes a later change chargeable rather than absorbed.
11. Always know what gets cut first. A ranked list agreed with the director before the day starts.
12. Always have a plan B.

---
---

