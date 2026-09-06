# 17. PRODUCTION LOCKS AND DECISION RECORDS

### Locked Rules, Numbered Decisions and the Discipline of Not Letting a Document Argue From Something That No Longer Exists
**Film Craft Bible series. Reusable across any project, any client, any format.**

---

## HOW TO READ THIS DOCUMENT

Two halves, deliberately separated.

**Part A** is a craft reference. A human reads it to understand what a lock actually is, where the convention comes from in film, print and software, and why the maintenance of locks is a separate discipline from the making of them.

**Part B** is an operating manual for an AI subagent that writes, numbers, audits and consolidates the locked rules inside a production document, and that has to catch the specific class of error where a document still contains the fossil of a decision that was reversed three revisions ago.

**Claim tagging.** Statements are tagged one of two ways:

| Tag | Meaning |
|---|---|
| **[SOURCED]** | Traceable to an established industry convention, standard practice, or documented method. |
| **[PRINCIPLE]** | Craft reasoning, arithmetic, or logical consequence. True in practice, not attributed to one source. |

**One structural warning before you start.** Every other bible in this series is about producing something. This one is about a failure that only happens after something has already been produced well. A production document that was correct on the day it was written becomes wrong not through carelessness but through success: it gets revised, extended, argued over, improved. Each of those improvements is locally correct and globally corrosive, because each one changes a fact that some other paragraph, written weeks earlier by someone reasoning carefully, quietly depends on. **[PRINCIPLE]** The document does not become wrong. It becomes internally inconsistent, which is worse, because it still reads as authoritative to everyone downstream.

This document is about the mechanism that prevents that, and about the audit that catches it when the mechanism fails.

---
---

# PART A: CRAFT REFERENCE

---

## A1. WHAT A LOCK IS

A **lock** is a decision that has been declared closed, recorded in one authoritative place, given an identifier, and made expensive to change.

The word comes from film post-production, where **picture lock** is the point at which the edit is declared final and the cut will not change further. **[SOURCED]** Picture lock is not a creative milestone. It is a logistical starting gun. Sound design, dialogue editing, ADR, music composition to picture, visual effects finishing, colour grading, titles, subtitling and delivery mastering cannot sensibly begin until the frame count of the cut is fixed, because every one of those crafts works against timecode. **[SOURCED]** A composer scoring to a cut that later loses eleven frames has written music that no longer lands. A VFX vendor rendering a two hundred frame plate that gets trimmed to one hundred and sixty has rendered forty frames of nothing at full cost. **[PRINCIPLE]**

The same logic gives the parallel term **locked script**, the point at which the screenplay is frozen, scene numbers are assigned and will not be reused, and the whole scheduling and budgeting apparatus is built on top of the page count and scene inventory. **[SOURCED]**

So a lock has two faces, and it is important to hold both at once:

**What a lock buys.** It buys downstream commitment. Once a decision is locked, every dependent department may spend real resource against it: order the equipment, build the set, book the talent, render the frames, print the material, cut the deal. Without locks, nobody can commit, so nobody starts, so the project stalls in an infinite loop of provisional work. **[PRINCIPLE]** A lock is fundamentally a permission slip issued to other people.

**What a lock costs.** It makes change expensive and, critically, it makes change *invisible if untracked*. Before a lock, changing your mind costs nothing because nothing was built on the old answer. After a lock, changing your mind means every dependent thing must be revisited, and the number of dependent things is usually larger than the person changing their mind believes. **[PRINCIPLE]**

That asymmetry is the entire subject of this document. The moment you lock something, you create a hidden dependency graph. The maintenance discipline exists to keep that graph visible.

---

## A2. THE REVISION COLOUR SYSTEM AND WHAT IT IS REALLY SOLVING

Once a script is locked, revisions are issued on coloured paper following a standard order. The conventional sequence used across the industry is: **White (the original locked draft), Blue, Pink, Yellow, Green, Goldenrod, Buff, Salmon, Cherry, then Second Blue, Second Pink and so on, cycling again.** **[SOURCED]** Revised pages are distributed on the current colour, and only the changed pages are issued. Pages that must be inserted between existing pages take the preceding page number with a letter suffix, so an insert between 24 and 25 becomes 24A, preserving the page numbering that the schedule, the budget and the breakdown are all built on. **[SOURCED]** Changed lines carry an asterisk in the margin. **[SOURCED]**

Every element of that system is worth reading as a design decision, because almost all of it can be borrowed.

| Element of the convention | The problem it solves |
|---|---|
| **Only changed pages are reissued** | Reduces the reader's job from "reread everything" to "read the four pages that moved". Change becomes a bounded task rather than an unbounded one. **[PRINCIPLE]** |
| **Colour, not just a version number** | A version number is invisible across a room and requires trust in filing. A colour is verifiable at a glance from the physical stack. Anyone holding a script can see instantly that they are holding a mixture of colours and therefore what generation each page belongs to. **[PRINCIPLE]** |
| **A fixed, agreed colour order** | Two people can determine which of two pages is newer without reference to a central authority. The ordering is embedded in the artefact itself. **[SOURCED]** |
| **Page numbers never renumber; inserts use letter suffixes** | Protects the addressing scheme. Everything downstream (schedule, breakdown, budget, call sheets) references page numbers. Renumbering would silently invalidate all of it. **[SOURCED]** |
| **Asterisks in the margin** | Localises the change within the page. You know not just that the page changed but which lines. **[SOURCED]** |
| **A dated revision header on every page** | Every page carries its own provenance, so a loose page separated from its stack is still self-identifying. **[PRINCIPLE]** |

Strip the paper away and the principle underneath is a single sentence: **the system exists to make change visible rather than silent.** **[PRINCIPLE]**

That is the whole point, and it is the thing most digital workflows lose. A document edited in place, saved over itself, and redistributed by link has performed the change perfectly and communicated it not at all. Every reader who had already internalised the old version continues to act on it. The revision colour system does not make change cheaper. It makes change *loud*.

A production document that changes silently produces the most dangerous failure state available: a team that is confidently synchronised on different facts. **[PRINCIPLE]** Nobody is confused, so nobody asks. They simply build two incompatible halves of the same thing and discover it on the day.

---

## A3. BRAND GUIDELINES AS A PARALLEL DISCIPLINE

The second place this discipline is fully developed is brand and identity guidelines. A brand book is, structurally, a locks document. It contains a set of non-negotiable rules, each stated once and precisely, each with a defined scope, each with a set of dependent applications. **[SOURCED]**

The classic categories are worth listing because they map cleanly onto production locks:

| Brand rule type | Form it takes | Production equivalent |
|---|---|---|
| **Reserved colour** | A specific colour is reserved for a single function and may not appear elsewhere. A signature colour reserved for the logo and never used in supporting graphics. | A visual element reserved for one story function and forbidden elsewhere. |
| **Clear space** | A minimum exclusion zone around the logo, expressed as a ratio of the logo itself so it scales. | A framing rule, a safe area, a minimum headroom, a titles-safe zone. |
| **Minimum size** | Below a stated dimension the mark may not be used at all. | Minimum shot size at which a detail is legible, minimum on-screen duration for a legibility-dependent element. |
| **Prohibited alterations** | Do not rotate, recolour, stretch, outline, add effects to. | Do not modify a locked technical parameter to solve a local problem. |
| **Approved variants and when each is used** | Primary, secondary, monochrome, reversed, stacked. | Approved formats, aspect ratios, cutdowns and their governing rules. |
| **Typographic hierarchy** | Which weight and size for which role, non-negotiable. | Naming and labelling conventions across all production paperwork. |

The reason to look at brand books rather than only at film is that brand guardianship has developed one distinction that film paperwork usually leaves implicit, and it turns out to be the single most operationally useful idea in this document after the premise distinction.

**The difference between a rule tightened and a rule loosened.** **[PRINCIPLE]**

A **loosened** rule expands what is permitted. The exclusion zone shrinks from two units to one. A colour previously reserved is now available for supporting use. The consequence of a loosened rule is that all existing work remains compliant. Nothing in the archive is now illegal. The loosening only matters going forward, and it gets applied deliberately, case by case, by someone actively deciding to use the new freedom. Loosened rules therefore tend to propagate *broadly and safely*, because applying them is an act of intent and non-application is harmless.

A **tightened** rule contracts what is permitted. The exclusion zone grows. A colour previously available is now reserved. The consequence of a tightened rule is the exact inverse: **every existing instance is now potentially in violation, and none of them will announce themselves.** **[PRINCIPLE]** The tightened rule requires a hunt. It requires someone to go back through every application, every template, every reference sheet, every appendix, and find the survivors.

That asymmetry is not a curiosity. It is the highest-yield prediction available when auditing a production document. **If you have limited time to audit, audit the tightened rules first, because a tightened rule is always the one most likely to still be violated somewhere.** **[PRINCIPLE]** A loosened rule leaves the document merely conservative. A tightened rule leaves the document self-contradictory, and self-contradiction is what gets built wrong.

---

## A4. ARCHITECTURE DECISION RECORDS, AND WHAT FILM CAN STEAL

Software engineering formalised this problem into a document type called the **Architecture Decision Record**, usually shortened to ADR. **[SOURCED]** The form is small, which is why it survives, and it is worth reproducing exactly.

An ADR has these parts: **[SOURCED]**

| Part | Content |
|---|---|
| **Title** | A number and a short noun phrase. Numbers are sequential and never reused. |
| **Status** | Proposed, Accepted, Deprecated, or Superseded by ADR-NNN. |
| **Context** | The forces in play at the time. What situation made a decision necessary. What was true when the decision was made. |
| **Decision** | The choice, stated in the active voice as a commitment. |
| **Consequences** | What becomes easier, what becomes harder, and what is now constrained downstream. Both positive and negative. |

Four properties of the ADR convention are the ones worth transplanting.

**1. Decisions are numbered, and the numbers are permanent.** **[SOURCED]** An ADR number is an address. Other documents, tickets and conversations reference "ADR-14" and that reference must remain resolvable forever. This is the same instinct as never renumbering script pages. **[PRINCIPLE]** The moment identifiers are reused or resequenced, every external reference becomes ambiguous, and ambiguity in a reference is worse than a broken link because it fails silently.

**2. Decisions are immutable once accepted.** **[SOURCED]** You do not edit an accepted ADR to reflect a new decision. You write a new one.

**3. Superseding is recorded, not erased.** **[SOURCED]** When ADR-27 replaces ADR-14, ADR-14 is not deleted. Its status becomes "Superseded by ADR-27" and it stays in the record. The reason is that ADR-14 contains something ADR-27 cannot contain: **the context that made the old decision reasonable.** Six months later, when someone proposes the old approach again in good faith, the superseded record answers them. A deleted record cannot. **[PRINCIPLE]** The archive of rejected paths is a large part of what stops a team relitigating settled ground.

**4. Consequences are stated, which makes the dependency graph explicit.** **[SOURCED]** This is the part film paperwork most often lacks. A locked rule in a production document typically states what is true. It rarely states *what was built on top of it*. Without the consequences field, the dependency graph exists only in the head of whoever wrote the rule, and that person is not available at the moment the rule is challenged.

**What film production should borrow, concretely: [PRINCIPLE]**

- Number every lock, permanently.
- Give every lock a status field, so a reader can see at a glance whether a rule is live, retired or replaced.
- State the consequences, meaning the departments and sections that depend on this lock. This converts an invisible dependency graph into a checklist.
- Record supersession rather than deleting, but see Section A12: this applies during development. At handoff, the audit trail moves out of the deliverable.

---

## A5. REQUIREMENTS TRACEABILITY

The third borrowable discipline is **requirements traceability**, standard in regulated engineering and systems work. **[SOURCED]** The premise is that for any element of a finished system you must be able to walk backwards to the requirement it satisfies, and forwards from any requirement to every element that implements it. The artefact that carries this is conventionally a **traceability matrix**, a grid mapping requirements to design elements to tests. **[SOURCED]**

Two consequences of traceability matter for production documents.

**The forward walk answers change impact.** If a requirement changes, the matrix tells you the complete set of things that must be revisited. Without it, change impact is estimated by memory, and memory systematically under-counts. **[PRINCIPLE]**

**The backward walk answers orphan detection.** Anything in the finished artefact that cannot be traced back to a requirement is one of three things: a leftover from a superseded requirement, an undocumented decision someone made privately, or scope that arrived without being agreed. **[PRINCIPLE]** All three are worth surfacing. The orphan is the fossil.

There is a discipline attached to this that is easy to state and hard to practise. **When traceability finds a broken link, patch the traceability, not only the symptom.** **[PRINCIPLE]**

Concretely: you discover that a reference table lists a value that contradicts the locked rule. The tempting fix is to correct the number in that table and move on. That fix takes thirty seconds and is almost always insufficient, because the wrong number in that table is not the disease. The disease is that a lock was changed and the set of dependent locations was never enumerated. If the table was missed, other locations were probably missed too, and the ones that were missed are by definition the ones nobody has thought about. The correct response to a single contradiction found is to treat it as evidence of an un-run audit, and run the audit. **[PRINCIPLE]**

The visible symptom is a sample, not the population.

---

## A6. THE PREMISE VERSUS DESCRIPTION DISTINCTION

This is the most important idea in this document. Everything else here is administration. This one is about how documents actually go wrong.

**A fact stated in a production document exists in two forms at once.**

It exists as a **description**: a statement about how something is. "The location is a polished modern office." "The film runs sixty seconds." "The talent is a woman in her early thirties." "The palette is cool with a single warm accent."

And it exists as a **premise**: an input that other reasoning was built on top of. Somebody read the description, reasoned from it, and wrote down conclusions. Those conclusions do not carry a visible label saying which premise produced them. They read as independent facts.

Take the polished modern office. Written once as a description, it silently generates a fan of derived decisions across the document:

- **Art department** derives that clutter is unrealistic in an open-plan minimal space, so the one desk that carries lived-in detail becomes the story anchor, and everything else is kept clean. The set dressing list is built to that logic.
- **Lighting** derives that the practicals are recessed downlights and edge-lit glass partitions, that there is a large glazed wall as the key source, and that the ambience is even and cool. The lighting plan is built to that logic.
- **Wardrobe** derives that clothing must read against glass, pale surfaces and reflective floors, so mid-tones and texture are needed to avoid the talent dissolving into the background. The costume palette is built to that logic.
- **Camera** derives that the space is deep and geometric, so long lenses can compress the architecture into graphic bands, and that reflections are a constant hazard requiring specific angles.
- **Sound** derives that hard surfaces mean a live, reflective acoustic, so dialogue capture needs treatment and the sound design will carry room tone with a particular character.
- **Schedule** derives that a controlled interior means no weather contingency and a predictable turnaround per setup.

Now somebody changes the description. The location becomes a converted warehouse workspace with exposed brick, timber and industrial windows. The change is made in the location section. It is a good change. It is approved, and it is correct.

**Every one of the six derived decisions above is now unsupported, and not one of them looks wrong.** **[PRINCIPLE]**

The clutter logic inverts, because a warehouse space is characterised by accumulated texture, so the story anchor cannot be "the one messy desk in a clean room" any more. The practicals are now pendant fixtures and large industrial windows, so the lighting plan describes fixtures that do not exist in the space. The wardrobe palette was calibrated to read against pale reflective surfaces and now sits in front of warm brick, where mid-tone earth colours will disappear. The lens logic was built on geometric depth. The acoustic assumption reverses from reflective to a mixture of absorption and slap. The schedule assumption about a controlled interior may not hold in a building with single glazing and street noise.

None of those sections mention the office. They mention downlights, mid-tones, long lenses, room tone. They read as independent departmental decisions. **They are not. They are conclusions in an argument whose first premise has been quietly deleted.** **[PRINCIPLE]**

This is the characteristic failure of a well-maintained document. Badly maintained documents fail obviously: they still say "office" in three places. Well-maintained documents fail invisibly: every instance of the word "office" was found and replaced, the document reads as fully updated, and it is now arguing from something that no longer exists.

### The test

For any fact you are about to change, ask: **is this fact only a description, or has anyone reasoned from it?** **[PRINCIPLE]**

If anyone has reasoned from it, the change is not a change to one line. It is an instruction to re-run a set of derivations. The correct unit of work is not "update the fact" but "update the fact and re-derive every conclusion that took it as input".

### A second worked example: the runtime

"The film runs sixty seconds" reads as a description. As a premise it has generated:

- A beat structure with a specific number of story beats and an allocation of seconds to each.
- A shot count, because at an average shot length the number of setups is bounded.
- A voiceover word count, because there is a defensible words-per-second rate for the intended delivery pace.
- A music structure with a specific number of bars at a specific tempo, and a placement for the drop or the turn.
- A logo endframe duration, because the brand requires a minimum hold.
- A media buying assumption, because slot lengths are sold in fixed units.

Change the runtime to forty-five seconds. If you change only the runtime line, the document now contains a sixty second beat structure, a sixty second shot count, a sixty second script, and a piece of music that is fifteen seconds too long, all sitting under a heading that says forty-five seconds. Every one of those numbers was correct arithmetic against the old premise. **[PRINCIPLE]**

### A third: the aspect ratio

"Delivered 9:16 vertical" as a premise generates: framing rules for headroom and safe areas, a decision about whether wide establishing shots are viable at all, a titles and lower-third layout, a rule about how many people can be in frame at once, the shape of any graphic element, the logo lockup variant used, and the way a horizontal environment must be shot to survive a vertical crop. Change the delivery to 16:9 and every one of those is invalid. The two-shot that was impossible becomes easy. The stacked-title layout becomes wrong. The vertical lockup should now be the horizontal one. **[PRINCIPLE]**

### The general form

> A description is a fact. A premise is a fact plus everything somebody built on it. Changing a description is one edit. Changing a premise is an audit. **[PRINCIPLE]**

---

## A7. RE-DERIVE VERSUS RELABEL

The premise problem has a particularly dangerous special case: **changes that look like naming changes but are actually changes to a physical or technical constant.**

When a change touches a physical or technical premise, the dependent figures cannot be edited by find-and-replace. They have to be **re-derived from first principles**, because they were never really about the name. They were arithmetic against a constant. **[PRINCIPLE]**

The class of premises this applies to:

| Premise type | Examples |
|---|---|
| **Sensor and format** | Sensor dimensions, capture resolution, crop factor, recording codec and its data rate |
| **Optical** | Focal length set, maximum aperture, minimum focus distance, close-focus capability |
| **Spatial** | Location dimensions, ceiling height, throw distance, available power |
| **Temporal** | Runtime, frame rate, shutter angle, playback speed |
| **Photometric** | Base sensitivity, exposure index, dynamic range, colour temperature of the key |
| **Colour** | Working colour space, transfer function, reserved colour values, gamut |
| **Framing** | Aspect ratio, safe areas, minimum headroom, extraction crop allowances |

### Worked example: the camera swap that is not a camera swap

A document is written around a camera with a Super 35 sized sensor, roughly 24.9mm wide in its open gate. Every dependent figure in that document was calibrated against that width, whether or not anyone wrote the number down:

- The **lens list** is a set of focal lengths chosen for the fields of view they produce on that sensor width. A 32mm is "the normal-ish lens that sees the room". A 75mm is "the clean single".
- The **blocking and floor plan** assume specific camera-to-subject distances, because a given framing at a given focal length puts the camera at a specific point on the floor. That point determines where the lights go, where the dolly track lies, and whether the camera fits in the room at all.
- The **depth of field notes** assume a specific relationship between aperture, distance and how much of the background falls away, because depth of field depends on the format's circle of confusion.
- The **background compression** described in the treatment ("the background stacks up behind her") is a statement about focal length relative to sensor width.
- The **safe area and extraction plan** assume the recorded frame has particular proportions and pixel dimensions.
- The **data budget**, media count and backup time assume a particular codec at a particular resolution.

Now the production changes to a large-format camera with a sensor 36.70mm wide (ALEXA LF open gate), from a Super 35 sensor 27.99mm wide (ALEXA 35 open gate). Note that Super 35 width is quoted differently across the industry depending on gate and aperture, so state which width you are computing from rather than assuming a reader shares your figure. On paper this is a product name change. It is not. **It is a change to a physical constant that every one of the figures above was calibrated against.** **[PRINCIPLE]**

Approximately, and this is the part that must be recomputed rather than assumed, the crop factor between those widths is 1.31, derived as 36.70mm / 27.99mm = 1.311 from ARRI's own open-gate sensor widths. That means:

- The 32mm no longer sees the room the way it did. To reproduce the same field of view you need 32 x 1.311, which is roughly a 42mm, which may not exist in that lens set, which means the lens list is not "the same list" and may require a different rental package entirely.
- If instead you keep the 32mm, the field of view widens substantially, the camera moves closer or the frame includes more of the set, which means **more set has to be dressed, more floor has to be lit, and the edge of the build may now be in shot.** That is an art department and gaffer consequence hiding inside a camera decision.
- Camera-to-subject distances change, so the floor plan changes, so the lighting positions change, so the setup time changes, so the day changes.
- Depth of field at a matched field of view and matched aperture becomes shallower on the larger format, so the focus plan, the focus puller's margin and the practical viability of moving shots all change.
- Coverage of the lenses matters: glass that covered the smaller sensor may vignette on the larger one, which is a hard technical failure, not a stylistic one.
- Resolution and codec change, so data per hour changes, so card count, drive capacity, backup window and the DIT's day all change.

**The wrong response is to open the document and replace the camera name in eleven places.** That produces a document that is superficially current and technically incoherent: a large-format shoot with a Super 35 lens list, a Super 35 floor plan and a Super 35 data budget. **[PRINCIPLE]**

**The right response is to identify every figure that was derived from sensor width and recompute it.** The re-derivation list is the deliverable, not the renamed document.

### The generalised rule

> If a change alters a number that other numbers were calculated from, the other numbers are not out of date. They are wrong. Recompute them, do not rename them. **[PRINCIPLE]**

### The tell

The tell for this failure is a document in which a technical name has been consistently updated and no dependent number has changed. **[PRINCIPLE]** If the sensor changed and not one focal length, distance, depth of field note, safe area or data figure moved, the change was cosmetic and the document is now lying.

---

## A8. TIGHTENED VERSUS LOOSENED RULES IN PRACTICE

Section A3 introduced the asymmetry from brand guardianship. It deserves its own operational treatment because it is the second highest-yield audit heuristic after the premise test.

### Why loosened rules are self-correcting

A loosened rule is applied by an act of will. Someone wants the new freedom, reaches for it, and uses it in the section they are writing. Because it is opt-in and because non-use is harmless, a loosened rule spreads gradually and safely. **[PRINCIPLE]** It may end up applied inconsistently, but inconsistent application of a permission produces a document that is merely more conservative in places than it needs to be. Nothing built from it is wrong.

Typical loosened rules: a colour restriction lifted, a permitted shot type added, an approved variant expanded, a duration ceiling raised, a previously forbidden technique allowed in a defined context.

The audit question for a loosened rule is mild: **has anyone actually taken up the new freedom, and if not, was that deliberate?** **[PRINCIPLE]**

### Why tightened rules are actively dangerous

A tightened rule is enforced by an act of search. Nobody is motivated to find their own violations. The old permitted usage sits in the document looking exactly like it did when it was legal, because it *is* the same text. Nothing about it flags. **[PRINCIPLE]**

Typical tightened rules: a colour now reserved, a shot type now forbidden, a maximum count reduced, an exception withdrawn, a technique restricted to one scene only, a minimum raised.

The audit question is severe: **where does the old permitted usage still survive?** And the answer is almost never "nowhere".

### Where the survivors hide

In practice, tightened rules survive in five places, roughly in order of likelihood: **[PRINCIPLE]**

1. **Reference tables and appendices.** The main body gets rewritten. The lookup table at the back does not, because the rewrite was reasoned through prose, and nobody re-read a grid.
2. **Examples and worked illustrations.** An example written to demonstrate the old rule now demonstrates a violation, with the full authority of being labelled "example".
3. **Summary or overview sections.** Often written early, rarely revisited, and read first by exactly the people who will not read the detail.
4. **Cross-references in other departments' sections.** The rule lives in one department's section; another department quoted it in passing months ago.
5. **Templates and boilerplate.** The most durable fossils of all, because a template is copied forward into new work and re-injects the retired rule into documents written after the tightening.

### The operational instruction

> When a rule is tightened, the rewrite is not the work. **The hunt is the work.** Enumerate every location the old permission could have been exercised, including every table, example, summary, appendix and template, and check each one explicitly. **[PRINCIPLE]**

And the corollary, which is the single most useful sentence in this section:

> **If you find exactly one surviving violation of a tightened rule, you have not finished. You have confirmed the hunt was never run.** **[PRINCIPLE]**

---

## A9. SCOPED RULES AND THE NEW ENTITY PROBLEM

A **blanket rule** is one written without an explicit scope. "All talent wears mid-tone earth colours." "Every product shot uses the macro package." "No on-screen text." "All environments are interior."

Blanket rules are written blanket for a good reason: at the time of writing, the scope was obvious and universal. There were four characters and the rule applied to all four. There was one product and the rule described how it is shot. **[PRINCIPLE]**

Then the document grows. A new entity is added from a different world: a fifth character who is a child, or an animal, or a period figure; a second product with different physical properties; an additional location in a different climate; a partner brand with its own identity constraints; a second format with different rules.

**The blanket rule silently stops being universal at the moment that entity is added, and nothing in the document registers the event.** **[PRINCIPLE]** The rule still reads as universal because it still says "all". The new entity either gets forced into a rule that was never designed for it, or gets tacitly exempted by whoever is doing the work, with no record that an exemption was granted.

Both outcomes are bad in different ways. Forcing produces absurdity, and worse, it produces absurdity with the authority of a written rule, so the person doing the work assumes it was intended. Tacit exemption produces a live contradiction between the written rule and the actual plan, which the next reader will resolve arbitrarily.

### The three-way fix

When a blanket rule meets a new entity, exactly one of three things must be recorded explicitly: **[PRINCIPLE]**

| Resolution | What it means | How it is recorded |
|---|---|---|
| **Re-scope** | The rule was always about a specific group. Say so. "All adult principal talent wears mid-tone earth colours" rather than "all talent". | Rewrite the rule with its real scope, in the one place it lives. |
| **Extend** | The rule genuinely should cover the new entity too. Confirm it and check feasibility. | Leave the rule blanket, and note explicitly that the new entity was checked against it. |
| **Except** | The rule does not apply here, deliberately. | Record the exception as a numbered decision with its reason and its consequence. Never as a silent omission. |

The one thing that is not permitted is leaving the contradiction in place, because a contradiction in a production document is resolved on the day by whoever is standing there, under time pressure, without the context. **[PRINCIPLE]**

### The audit form

> For every blanket rule, list every entity currently in the document. For each entity added after the rule was written, state which of re-scope, extend or except applies. **[PRINCIPLE]**

The phrase "added after the rule was written" is doing the work. Entities that predate the rule were considered when it was drafted. Entities that arrived afterwards were not, by definition.

---

## A10. STALE COUNTS

Any number stated once, early, is a time bomb with a fuse of unknown length. **[PRINCIPLE]**

Counts and totals are uniquely vulnerable because they are *summaries of structure*. They are correct only relative to the structure at the instant they were written, and the structure changes constantly, additively, and by people who are not thinking about summaries.

The recurring offenders:

| Count | How it goes stale |
|---|---|
| **Cast or character headcount** | "Four principals" written in the overview. A fifth is added in a later section. The overview is not touched, because the person adding the character was working in the character section. |
| **Set or build count** | "Two builds and one practical location." A third build is agreed in a production meeting and added to the design section. The budget summary still says two. |
| **Shot count or setup range** | "Approximately 22 setups." Six shots are added during boarding. The schedule is still built on 22, which means the day is still built on 22. |
| **Scene count** | "Six scenes." A transition scene is inserted. Everything that says six is now wrong, including anything computing average scene length. |
| **Prop or hero item count** | "Three hero props." A fourth appears in a scene description. The prop budget, the fabrication lead time and the continuity plan all still assume three. |
| **Deliverable count** | "Three cutdowns." A fourth format is requested by the client and added to the delivery section. The post schedule and the grade day count still assume three. |
| **Location day count** | "Two shoot days." A pickup day is agreed. The catering, crew cost and equipment rental totals still say two. |
| **Runtime totals** | Sum of beat durations no longer equals the stated runtime after a beat is added. |

Two structural facts make this worse than it looks.

**First, additions are local and totals are global.** The person adding a character is thinking about the character. The total lives somewhere else entirely, usually in a section written by someone else, weeks earlier. There is no natural moment at which the adder encounters the total. **[PRINCIPLE]**

**Second, totals feed money and time.** Almost every stale count has a budget or schedule consequence, which means a stale count is not a documentation error, it is a costing error wearing documentation clothes. **[PRINCIPLE]**

### The rule

> **Re-total after every structural addition.** Not at the end. At the moment of addition, because at the end nobody remembers what was added. **[PRINCIPLE]**

And the standing habit that makes it survivable:

> Every stated count should be recomputable from an enumerable list somewhere else in the document. **[PRINCIPLE]** A count with no corresponding list cannot be audited, only believed. If the document says "four principals", there must be a place where four principals are individually named, and the audit is a comparison, not a memory test.

---

## A11. CONFIRMATION-ONLY RECORDS

As a document is developed, decisions accumulate in a resolutions list. Not all of them are decisions.

Some of them are **confirmations**: records that say, in effect, "sections 4 and 9 were checked against each other and were already consistent, no change required."

At the moment it was written, that record had real value. It was the output of an audit, it closed an open question, and it stopped anyone re-opening it. **[PRINCIPLE]**

Once the underlying alignment is stated as fact in both places, the record has no standalone value. It carries no information the reader needs. It is a receipt for a check, not a statement of what is true. **[PRINCIPLE]**

The test is a single question, and it is worth applying to every entry in any resolutions or decisions list at handoff time:

> **Does this record carry information a reader of the final document needs, that is not already stated as fact elsewhere?** **[PRINCIPLE]**

| Answer | Action |
|---|---|
| **Yes, it states a rule or constraint** | It is a lock. Move it into the locks list, phrased as a rule, and delete the resolution entry. |
| **Yes, but the fact is stated ambiguously elsewhere** | Fix the ambiguity at the source, then delete the record. Fold in, then remove. |
| **No, both sides already state it correctly** | Delete it outright. It is a confirmation-only record. |
| **No, but it records why a tempting alternative was rejected** | Keep it, but move it to the process log, not the deliverable. See A12. |

The fourth row is the only real exception, and it belongs to the ADR tradition: the record of a rejected path has value precisely because the path is tempting. **[SOURCED]** But it belongs in the process log, not in the production document, because the production document is read by people who need to know what to build, not what was considered.

The failure mode here is a resolutions list that grows to be longer than the rules it resolved, in which four real constraints are buried among twenty confirmations that nothing was wrong. The signal-to-noise ratio collapses and the whole list stops being read. **[PRINCIPLE]** A locks list that nobody reads provides negative value, because it creates the appearance of governance without the function.

---

## A12. DECISION VERSUS DECISION-HISTORY: TWO DOCUMENTS, TWO READERS

A production document in development and a production document at handoff are different artefacts serving different readers, and the most common structural error in late-stage documents is failing to notice the moment the reader changes. **[PRINCIPLE]**

| | Development document | Handoff document |
|---|---|---|
| **Reader** | The people making the decisions | The people executing them |
| **Question being answered** | "Why are we doing it this way, and what did we already rule out?" | "What am I building, exactly?" |
| **Value of history** | High. Prevents relitigating, preserves context. | Low to negative. Reads as uncertainty. |
| **Tone** | Deliberative. Options, trade-offs, open questions. | Declarative. Statements of fact. |
| **Presence of superseded records** | Essential | Harmful |
| **Presence of "changed from" language** | Useful | Corrosive |

The corrosion is specific and worth naming. Revision-history language inside a deliverable does three bad things: **[PRINCIPLE]**

1. **It re-opens closed decisions.** A department head who reads "originally we considered a warehouse, but we moved to an office" now knows a warehouse was on the table, and will raise it again the moment the office presents a problem.
2. **It signals instability.** A document full of "updated", "revised", "previously" reads as a document that is still moving, which encourages readers to wait rather than commit. That is the exact opposite of the purpose of a lock.
3. **It creates two competing statements of fact in one paragraph.** The old value is right there on the page, in the same sentence as the new one. Under time pressure, on a set, someone will read the wrong half.

The rule is therefore a handoff step, not a writing style:

> **At handoff, the audit trail moves to a process log. It is not archived inside the deliverable.** **[PRINCIPLE]**

The process log is a real artefact with a real purpose. It preserves the ADR value: numbered decisions, their context, their supersessions, and the paths rejected. It is kept, it is referenceable, and it is available to anyone who asks why. It simply does not travel with the thing people are building from.

The deliverable states what is true. The process log states how it came to be true. Mixing them produces a document that is both harder to execute and harder to audit. **[PRINCIPLE]**

---

## A13. WHAT MAKES A LOCK SURVIVE

Not all locked rules are equally durable. Some rules stay correct through six revisions and some rot after one. The difference is structural, not a matter of care. **[PRINCIPLE]**

**Locks that survive have these properties:**

| Property | Why it protects the rule |
|---|---|
| **Stated once, in full, in one place** | A rule stated in three places will be updated in one or two of them. The number of copies is the number of opportunities to diverge. |
| **Self-contained** | The rule can be read and applied without reading anything else. A rule that says "as above" or "per the palette section" breaks when the referenced section moves or changes. |
| **Located where a reader would actually look** | A wardrobe rule lives in wardrobe. A rule filed in a general principles section at the front will not be found by the person who needs it and will be independently reinvented, differently. |
| **Explicitly scoped** | Says who and what it applies to, so a new entity cannot silently fall inside or outside it. See A9. |
| **Stated as a rule, not a description** | "Talent never appears in saturated primaries" is a rule. "The palette is muted" is a description, and descriptions cannot be violated, only interpreted. |
| **Carries its dependents** | Names the departments and sections that rely on it, so change impact is visible from the rule itself. |
| **Has a status** | Live, superseded, or retired. Without status, retired rules are indistinguishable from live ones. |
| **Falsifiable** | You can look at a frame or a plan and say yes or no. "Warm and human" is not auditable. "No fixture above 4000K in any interior" is. |

**Locks that rot have the inverse properties**, and the two most lethal are duplication and vagueness. A duplicated rule rots because copies diverge. A vague rule rots because it never constrained anything in the first place, so its violation is not detectable, so its erosion is invisible until the material comes back wrong. **[PRINCIPLE]**

---

## A14. VOCABULARY GLOSSARY

| Term | Meaning |
|---|---|
| **Lock** | A decision declared closed, recorded once, numbered, and made expensive to change. |
| **Picture lock** | The point at which a cut is final and downstream post crafts can commit to the frame count. **[SOURCED]** |
| **Locked script** | The point at which a screenplay is frozen and scene numbering becomes permanent. **[SOURCED]** |
| **Revision colour** | The paper colour identifying the generation of a revised script page, in a standard fixed order. **[SOURCED]** |
| **A-page** | An inserted page carrying the preceding page number plus a letter, so existing page numbering is never disturbed. **[SOURCED]** |
| **ADR (Architecture Decision Record)** | A numbered, immutable record of one architectural decision, with context, decision, consequences and status. **[SOURCED]** |
| **Supersession** | Replacing a decision by writing a new record and marking the old one superseded rather than deleting it. **[SOURCED]** |
| **Traceability** | The ability to walk from any element of a finished artefact back to the requirement it satisfies, and forward from any requirement to all its implementations. **[SOURCED]** |
| **Traceability matrix** | The grid that carries those mappings. **[SOURCED]** |
| **Description** | A statement of how something is. |
| **Premise** | A fact that other reasoning has been built on top of. Changing it invalidates the conclusions drawn from it. |
| **Re-derivation** | Recomputing dependent figures from a changed constant, rather than renaming them. |
| **Relabelling** | Changing a name without recomputing what depended on the thing named. A failure mode, not a method. |
| **Tightened rule** | A rule that contracts what is permitted. Requires an active hunt for surviving violations. |
| **Loosened rule** | A rule that expands what is permitted. Self-correcting, applied by choice. |
| **Blanket rule** | A rule written without explicit scope, presumed universal at the time of writing. |
| **Re-scoping** | Rewriting a blanket rule to state the group it was actually written for. |
| **Recorded exception** | A deliberate, numbered exemption from a rule, with its reason and consequence stated. |
| **Silent exception** | An undocumented exemption. A contradiction waiting to be resolved arbitrarily on the day. |
| **Stale count** | A total that was correct when written and was not recomputed after a structural addition. |
| **Confirmation-only record** | A resolution stating that two things were already consistent. No standalone value once the consistency is stated as fact. |
| **Orphan** | An element of the finished artefact that traces back to no live requirement. Usually a fossil of a superseded decision. |
| **Fossil** | A surviving fragment of a reversed decision, still present because it was never enumerated as a dependent. |
| **Process log** | The development-history artefact that carries decisions, supersessions and rejected paths. Does not travel with the deliverable. |
| **Handoff document** | The declarative, execution-facing artefact. States what is true, not how it came to be true. |
| **Dependency graph** | The set of decisions built on a given lock. Invisible unless written down. |
| **Change impact** | The complete set of things that must be revisited when a lock changes. Systematically under-estimated from memory. |

---
---

# PART B: AGENT OPERATING MANUAL

---

## B1. THE AGENT'S JOB IN ONE PARAGRAPH

This role does not create the creative content of a production document. It creates and maintains the **spine of non-negotiable decisions** that the content hangs on, and it runs the audits that catch the moment the content and the spine have come apart. Its default posture is suspicion of any document that reads as finished, because a document that reads as finished has usually been revised several times, and revision is the mechanism by which fossils are created. **[PRINCIPLE]**

---

## B2. THE LOCK RECORD FORMAT

Every lock is written in this form. It is short deliberately. A lock that takes a paragraph to state is not a lock, it is a discussion.

```
LOCK-[NN]  [Short noun-phrase title]

RULE:        [The rule, stated once, in full, as a constraint that can be
             violated. One or two sentences. No cross-references.]

SCOPE:       [Exactly who and what this applies to. If it applies to a group,
             name the group's boundary. If there are exceptions, they are
             listed here or they do not exist.]

DEPENDS ON:  [Any other lock this rule was derived from, by number.
             "None" if it is a root premise.]

DEPENDENTS:  [Every department and every named section that has reasoned from
             this rule. This is the change-impact checklist.]

STATUS:      LIVE | SUPERSEDED BY LOCK-NN | RETIRED [date]

DERIVED
FIGURES:     [Only for technical locks. Every number elsewhere in the document
             that was calculated from this one. Blank means "this lock has no
             arithmetic downstream", which must be true, not assumed.]
```

### Field notes

**Number.** Sequential, permanent, never reused, never resequenced. If LOCK-07 is retired, the number stays retired. Renumbering breaks every external reference and fails silently. **[SOURCED, by analogy with ADR and script page numbering]**

**Rule.** Must be falsifiable. Write it so a person can point at a plan, a frame or a line and say yes or no. Reject any rule phrased as an adjective. "Grounded and warm" is not a lock. "No practical fixture warmer than 3200K in any exterior night scene" is. **[PRINCIPLE]**

**Scope.** The single most under-written field, and the origin of the entire A9 failure class. Never write "all" without asking "all of what, bounded how". If the answer is "all of the four things that exist today", write the boundary, not the word "all". **[PRINCIPLE]**

**Dependents.** This is the field that converts an invisible dependency graph into a checklist, and it is the field that makes the lock audit possible at all. Write it at the moment the lock is created, when the dependencies are known, not later when they must be reconstructed. **[PRINCIPLE]**

**Status.** During development, superseded locks remain visible with their status set. At handoff, they leave (see B7). **[SOURCED, ADR convention]**

**Derived figures.** Mandatory for any lock that states a number, a dimension, a duration, a format or a physical constant. This is the re-derivation list from A7, written in advance. If this field is blank on a technical lock, the lock is not finished. **[PRINCIPLE]**

---

## B3. HOW TO WRITE A LOCK SO IT DOES NOT DRIFT

Six rules. Each one prevents a specific, observed failure. **[PRINCIPLE]**

**1. State it once.** Exactly once, in full. Every additional full statement of a rule is a future divergence. If another section needs the rule, it references the lock number, it does not restate the rule. A reference cannot drift from its target. A copy can.

**2. Put it where the reader would actually look.** The test is: which person will need this rule at the moment of doing their work, and what section will they be reading? Put it there. A locks appendix at the back is a good index and a bad home. If the rule governs costume, it lives in costume and the appendix points to it.

**3. Make it self-contained.** No "as described above", no "consistent with the palette section", no "per the treatment". Those phrases outsource the meaning of the rule to a document that will change without notifying this one. A self-contained rule survives being extracted, quoted in an email, or pasted into a call sheet.

**4. State the scope inside the rule sentence.** Not in a nearby note. In the sentence. The rule and its boundary travel together or they eventually travel separately.

**5. Phrase it as a constraint, not a description.** A constraint has a violation condition. A description does not, and a rule with no violation condition cannot be audited, so it will erode invisibly.

**6. Give a number, a threshold or an enumerated set wherever possible.** "Minimal on-screen text" cannot be checked. "No more than one text element on screen at any time, maximum four words" can. Vagueness in a lock does not preserve flexibility, it transfers the decision to whoever is standing on set at the moment it matters. **[PRINCIPLE]**

---

## B4. THE LOCK AUDIT PROTOCOL

This is the core procedure of the role. It is run in full at every trigger listed in B9, and never partially, because the value of the audit is entirely in its exhaustiveness. A partial lock audit produces false confidence, which is worse than no audit. **[PRINCIPLE]**

Run the seven steps in order. Do not skip a step because it "obviously has no findings". The steps are ordered so that each one uses the output of the previous.

---

### Step 1: Enumerate every lock

Produce a complete numbered list of every locked rule currently in the document, including rules that function as locks without being labelled as such.

The second half of that sentence matters. Most documents contain unlabelled locks: a sentence in the treatment that four departments have quietly treated as binding, a technical parameter stated once in a production note, a client constraint mentioned in a brief. **[PRINCIPLE]**

**How to find unlabelled locks:** scan for the linguistic markers of commitment. Words like *always, never, all, every, only, must, no, none, at least, no more than, exactly*, and any bare number, dimension, duration, ratio, colour value or format name. Each one is a candidate lock. Each candidate gets a number in the working list even if it is not yet formalised.

Output: a numbered list, each entry with its current location in the document.

---

### Step 2: For each lock, list every dependent department and section

For every lock, answer: **who reasoned from this?**

Work through the department list explicitly rather than from memory, because memory under-counts: camera, lighting, art, props, wardrobe, hair and makeup, sound, music, cast, locations, schedule, budget, post, VFX, grade, delivery, legal and clearance, client and brand.

For each department, the question is not "does this rule mention them" but **"would a competent head of that department have changed anything about their plan if this rule were different?"** If yes, they are a dependent, whether or not the document says so. **[PRINCIPLE]**

Write the dependents into the lock record. If the lock record already has a dependents field, compare it to what you just derived. **A gap between the recorded dependents and the derived dependents is itself a finding**, because it means past change impact was assessed against an incomplete list. **[PRINCIPLE]**

---

### Step 3: Check whether anything added AFTER the lock was written intersects with it

This is the step that catches the A9 new-entity failure and it is the step most often skipped, because it requires knowing the order in which the document was built.

Establish, as well as possible, what was added late: new characters, new locations, new products, new deliverables, new scenes, new formats, new partners, new sequences. Sources for this include the process log, the revision history, section ordering anomalies, and material that reads in a different register from the rest.

Then, for every lock, ask: **does this late addition fall inside the rule's scope?**

For each intersection found, force one of the three A9 resolutions and record it:

| Resolution | Recorded as |
|---|---|
| **Re-scope** | Rewrite the rule to state the group it was actually written for. |
| **Extend** | Leave the rule, and add the new entity to the scope line explicitly so the check is visible. |
| **Except** | Write a numbered exception with reason and consequence. |

An intersection left unresolved is reported as a finding, never left to the reader's judgement. **[PRINCIPLE]**

---

### Step 4: Check every count against the current structure

Find every number in the document that is a total, a headcount, a range or a summary. For each one, locate the enumerable list it is supposed to summarise, and count that list.

If there is no enumerable list, that is a finding in itself: an unauditable count. Either produce the list or remove the number. **[PRINCIPLE]**

The standard sweep:

- Characters and cast against the named character list
- Scenes against the scene list
- Setups and shots against the shot list
- Locations and sets against the location list
- Builds against the design list
- Hero props against the prop list
- Deliverables and cutdowns against the delivery schedule
- Shoot days against the schedule
- Sum of beat durations against the stated runtime
- Sum of line items against any stated budget total
- Word count of voiceover against the runtime at the stated delivery rate

Report every mismatch with both numbers and both locations.

---

### Step 5: Check every tightened rule for surviving old exceptions

Identify every rule that has been tightened at any point: a permission withdrawn, a maximum lowered, a minimum raised, an option removed, a technique restricted, a colour reserved.

For each one, run the hunt explicitly through the five hiding places from A8, in this order:

1. Reference tables and appendices
2. Examples and worked illustrations
3. Summary and overview sections
4. Cross-references inside other departments' sections
5. Templates and boilerplate

Search for the *old permitted usage*, not for the rule text. The fossil does not quote the rule. It exercises it. **[PRINCIPLE]** If the rule now forbids a saturated accent colour, search for the accent colour, not for the word "saturated".

**Stopping condition:** all five locations checked for every tightened rule. Not "no findings so far". Finding one survivor and stopping is the characteristic failure of this step. **[PRINCIPLE]**

---

### Step 6: Check every blanket rule for a new entity it was never scoped for

Steps 3 and 6 overlap deliberately, and the overlap is the point. Step 3 approaches from the additions. Step 6 approaches from the rules. Each catches items the other misses, because Step 3 depends on correctly identifying what was added late, which is often incomplete. **[PRINCIPLE]**

Take every rule containing a universal quantifier: *all, every, always, never, no, none, each, any*.

For each, enumerate every entity in the document that the quantifier now captures, including the ones nobody was thinking about when the rule was written. Then ask, per entity, whether the rule makes sense applied to it.

The characteristic finding is a rule that produces an absurd or impossible result for one entity: a wardrobe rule applied to an animal, a dialogue rule applied to a character with no lines, a framing rule applied to a graphic-only sequence, a colour rule applied to a partner brand with mandated colours, a technical rule applied to a format it was never designed for. **[PRINCIPLE]**

---

### Step 7: Report each finding with its exact location

The report format. Every finding gets all seven fields, and a finding missing a location is not a finding, it is a complaint. **[PRINCIPLE]**

```
FINDING [N]  [CLASS]

WHERE:        [Exact section, subsection and, where possible, the quoted line]
LOCK:         [Which lock number this violates, or "unlabelled lock" plus the rule]
WHAT IT SAYS: [The current text, quoted]
WHY IT IS WRONG: [Which premise, count or scope it contradicts, and where the
              contradicting statement lives]
CLASS:        FOSSIL | STALE COUNT | UNSCOPED RULE | UN-RE-DERIVED FIGURE |
              SILENT EXCEPTION | DUPLICATE STATEMENT | ORPHAN | HISTORY LEAK
SEVERITY:     BLOCKING (something will be built wrong) |
              CORRECTING (a reader will be misled) |
              HYGIENE (correct but degrades the document)
FIX:          [The exact replacement text, or the exact re-derivation required]
```

Sort the report by severity, then by section order. Blocking findings first, always, because reports are read from the top and abandoned from the bottom. **[PRINCIPLE]**

---

## B5. THE PREMISE CHANGE PROTOCOL

Run this whenever any fact in the document changes, before making the edit. It takes two minutes and it is the difference between an edit and a fossil. **[PRINCIPLE]**

**1. Classify the fact.** Is it a pure description, or has anyone reasoned from it? If any department's plan would have been different had this fact been different, it is a premise.

**2. If it is a premise, list the derivations before touching anything.** Go department by department. For each, write the sentence "because [old fact], we decided [X]". Every X on that list is now in play.

**3. Classify the change.** Is it a change to a *characterisation* (a mood, a register, a style) or to a *constant* (a number, a dimension, a format, a physical parameter)?

**4. If it is a constant, switch to the re-derivation protocol in B6.** Do not proceed with an edit.

**5. If it is a characterisation, re-derive each conclusion in turn.** Not "check whether it still works". Re-derive it: pretend the old premise never existed, read the new one, and write what follows. Then compare to what is on the page. Anything that differs must be rewritten. Anything that survives should be noted as having survived, so the next audit does not redo the work.

**6. Re-run the count check.** Premise changes frequently add or remove entities as a side effect.

**7. Record the change as a numbered decision** with the list of re-derived sections attached, so the next auditor can see the impact assessment that was performed, not just its conclusion.

---

## B6. THE RE-DERIVATION PROTOCOL

Triggered whenever a technical or physical constant changes. The output of this protocol is **a list of recomputed numbers**, not an edited document. If the protocol produces no changed numbers, the protocol was not run. **[PRINCIPLE]**

**Step 1. Name the constant that actually changed.** Not the product. The constant. "The camera changed" is not usable. "The sensor width changed from approximately 24.9mm to approximately 36mm" is usable. Push every product-level change down to the physical parameter underneath it, because that parameter is what the arithmetic used. **[PRINCIPLE]**

**Step 2. Find every figure derived from that constant.** Use the DERIVED FIGURES field of the lock if it exists. If it does not, build it now by sweeping the document for anything the constant participates in:

| Constant changed | Sweep for |
|---|---|
| **Sensor size or format** | Focal lengths, fields of view, camera-to-subject distances, floor plans, depth of field notes, lens coverage, safe areas, extraction crops, resolution, data rate, media count, backup time |
| **Aspect ratio** | Framing rules, headroom, safe areas, title and graphic layouts, number of figures per frame, viability of wide shots, logo lockup variant, crop strategy for other deliverables |
| **Runtime** | Beat structure and per-beat durations, shot count, voiceover word count, music bar count and tempo, endframe hold, slot length, cutdown structure |
| **Frame rate** | Shutter angle, exposure, motion rendering, playback speed of any effect, data rate, sync sound viability, conform and delivery specification |
| **Location or space** | Camera distances, lens choices, lighting positions and fixture count, power requirement, set dressing extent, crew movement, company move time, acoustic treatment, schedule per setup |
| **Colour rule or colour space** | Every dependent palette, wardrobe, set finish, grade note, graphic element, reserved-colour compliance, brand lockup usage |
| **Framing rule** | Every shot in the shot list, board panel, coverage plan, and any count of setups |
| **Base sensitivity or dynamic range** | Exposure plan, fixture wattage and count, ND requirement, night exterior viability, grade latitude claims |

**Step 3. Recompute from first principles.** Do not scale the old answer. Do not adjust it. Derive it again from the new constant, because the old answer may have been a rounded or negotiated value whose provenance is no longer visible, and scaling a negotiated value propagates the negotiation into a domain where it no longer applies. **[PRINCIPLE]**

**Step 4. Flag the second-order consequences.** These are the ones that hurt, because they cross departments. A change to a lens field of view is a camera fact that becomes an art department fact (more set is visible) and a gaffer fact (more floor is lit) and a schedule fact (more setup time). Every re-derivation must be walked out to the department that pays for it. **[PRINCIPLE]**

**Step 5. Report as a re-derivation table.**

```
CONSTANT CHANGED: [old value] -> [new value]

| Figure | Section | Old value | New value | Second-order consequence |
|---|---|---|---|---|
```

**Step 6. Verify no relabelling survived.** Search the document for the old product name and the old constant value. Any survivor is a finding. Then apply the tell from A7: if the name changed and no dependent number changed, reject the change as incomplete. **[PRINCIPLE]**

---

## B7. THE CONSOLIDATION PROTOCOL

Used when a document has accumulated both a **resolutions list** (a record of issues found and closed) and a **locks list** (a record of binding rules), and the two have grown to duplicate each other. This is close to universal in any document that has been through more than three revision cycles. **[PRINCIPLE]**

The symptom: a reader cannot tell which list is authoritative, so they read both, find overlapping and slightly different phrasings of the same rule, and are now less certain than before they started.

### The procedure

**1. Extract every entry from both lists into one working table.** Columns: source list, entry text, what it asserts, whether it asserts a rule or reports an event.

**2. Classify each entry into one of five types.**

| Type | Definition | Disposition |
|---|---|---|
| **Rule** | Asserts a constraint on what may be built | Becomes or merges into a numbered lock |
| **Fact** | States something true about the project, not a constraint | Belongs in the relevant department section as prose. Delete from the list. |
| **Confirmation** | Reports that two things were checked and already agreed | Apply the A11 test. Almost always delete outright. |
| **Rejection** | Records a path considered and not taken | Move to the process log. Keep only if the path is genuinely tempting and likely to be re-proposed. |
| **Open question** | Not actually resolved | Escalate. This is the most valuable thing the consolidation finds, because it was hiding in a list labelled "resolutions". **[PRINCIPLE]** |

**3. Merge duplicates by taking the strictest version, not the newest.** Where two entries state the same rule differently, the tighter phrasing is the one to keep, unless there is an explicit dated decision loosening it. Newness is not evidence of intent, because the newer entry may simply be a careless restatement. Strictness is at least a safe default, and if it is wrong someone will object, which is the outcome you want. **[PRINCIPLE]**

**4. Fold in what belongs in the body.** For every entry classified as Fact, verify that the fact is actually stated, unambiguously, in the section where a reader would look for it. If it is not, put it there first. **Fold in, then delete. Never delete first.** **[PRINCIPLE]**

**5. Delete outright.** Confirmations that survive the A11 test, duplicates that have been merged, and entries about the document's own process rather than about the work.

**6. Renumber nothing.** The consolidated locks list keeps existing lock numbers. New locks created by promotion from the resolutions list take fresh numbers at the end of the sequence. Numbers that no longer have entries are left as gaps. A gap is information. A resequenced list is a broken reference. **[SOURCED, by analogy with ADR practice]**

**7. Produce a disposition report** so the change is visible, per A2: for every entry that existed before, state whether it became a lock, was folded into a section, moved to the process log, or was deleted, and why. Silent consolidation is exactly the silent change the whole discipline exists to prevent. **[PRINCIPLE]**

---

## B8. THE HANDOFF PROTOCOL

Run once, at the transition from development document to deliverable, per A12.

### Pass 1: Strip revision-history language

Remove from the deliverable:

- Every "changed from", "previously", "originally", "updated to", "revised", "no longer", "we had considered"
- Every superseded lock record, moved to the process log with its status intact
- Every confirmation-only resolution
- Every open-question marker, either resolved or escalated, never shipped as a comment
- Every parenthetical alternative and every "or possibly"
- Every editorial aside about the document itself rather than about the work
- Every date-stamped note that only made sense during development

Rewrite each affected passage as a **declarative statement of fact**. Not "the location was changed to a warehouse space" but "the location is a warehouse space".

### Pass 2: Verify the strip independently

**This is the non-optional part, and it is the part that gets cut.** **[PRINCIPLE]**

The stripping pass must be verified by a pass that does not inherit the stripper's assumptions. The reason is specific and it is the single most important operational claim in Part B:

> **The most dangerous leftover errors are the ones old enough that every previous audit already read past them.** **[PRINCIPLE]**

A fossil that has survived four audits did not survive because it is well hidden. It survived because each auditor had already read it, in a previous pass, in a context where it was correct, and their eye now treats it as verified background. Familiarity is the camouflage. The longer an error survives, the safer it becomes, which is the exact inverse of the intuition that old text is well tested. **[PRINCIPLE]**

The independent verification must therefore break the reading habit. Practical methods, in descending order of effectiveness:

| Method | Why it works |
|---|---|
| **A verifier with no memory of the document's history** | Cannot recognise anything as already-checked. Nothing is familiar, so nothing is skipped. |
| **Read in reverse section order** | Breaks the narrative flow that carries the eye past known passages. |
| **Audit by artefact type, not by section** | Read all the tables in sequence, then all the examples, then all the summaries. Fossils cluster in these and this reading order makes the cluster visible. |
| **Mechanical search for the old values** | Search for the retired constant, the retired name, the retired count. Search does not get tired and does not recognise. |
| **Check every number against its enumerable source** | Arithmetic does not care whether you have read the sentence before. |
| **Read each department's sections as that department** | Ask only "can I execute this", which surfaces contradictions that a reader checking for consistency will rationalise. |

The verification pass reports in the B4 Step 7 format, with the **HISTORY LEAK** class used for surviving revision language.

### Pass 3: Final consistency sweep

Re-run B4 Steps 4, 5 and 6 (counts, tightened rules, blanket rules) after the strip, because the stripping itself edits text and every edit is a chance to create a new inconsistency. A handoff document is not finished when it is stripped. It is finished when it has been audited *after* being stripped. **[PRINCIPLE]**

---

## B9. TRIGGER LIST: WHAT FORCES A FULL LOCK AUDIT

| Trigger | Why | Minimum audit |
|---|---|---|
| **Any location, set or environment change** | Root premise. Drives art, lighting, wardrobe, camera, sound, schedule. | Full B4 plus B5 |
| **Any camera, sensor, format or codec change** | Physical constant. Every derived figure invalid. | Full B4 plus B6 |
| **Any aspect ratio or delivery format change** | Physical constant. Framing, layout, graphics, crops. | Full B4 plus B6 |
| **Any runtime or duration change** | Physical constant. Beats, shots, copy, music, endframe. | Full B4 plus B6 |
| **Any frame rate change** | Physical constant. Exposure, motion, data, conform. | B6 plus schedule and post review |
| **Adding a character, product, brand or entity** | New entity meets blanket rules. Counts change. | B4 Steps 3, 4 and 6 |
| **Removing a character, product or entity** | Orphan risk. Counts change. Rules may now over-scope. | B4 Steps 1, 2 and 4 |
| **Adding or removing a scene or sequence** | Counts, runtime, beat structure, coverage. | B4 Steps 4 and 6 |
| **Any rule being tightened** | Highest-yield failure class. Survivors are certain. | B4 Step 5, exhaustively, all five locations |
| **Any rule being loosened** | Low risk, but check deliberate non-application. | B4 Steps 1 and 2 |
| **Any colour, palette or reserved-value change** | Cascades into wardrobe, art, grade, graphics, brand compliance. | Full B4 |
| **Any framing or coverage rule change** | Every shot and board panel is a dependent. | B4 plus shot list rebuild |
| **Adding a deliverable, cutdown or format** | New entity plus stale delivery counts plus new scope questions. | B4 Steps 3, 4 and 6 |
| **Any budget or schedule constraint change** | Forces re-derivation of counts that were feasibility-bounded. | B4 Step 4 plus feasibility review |
| **Any client or brand mandate arriving late** | Almost always a tightened rule arriving after the rules were written. | Full B4 with Step 5 emphasis |
| **Merging two documents or two lists** | Guaranteed duplication and divergence. | B7 then full B4 |
| **Handoff to execution** | Reader changes. History becomes harmful. | B8 all three passes |
| **Any prior audit that found exactly one violation** | Evidence the audit was never run, per A5 and A8. | Full B4 from Step 1 |

---

## B10. FAILURE MODES AND TELLS

| Failure mode | What it looks like | The tell that exposes it |
|---|---|---|
| **Fossil** | A statement that was correct before a reversed decision, still present | Any passage that only makes sense under a premise the document no longer states |
| **Relabelling** | A name updated everywhere, no dependent number changed | Technical name is current, every derived figure is unchanged. If the constant moved and no arithmetic moved, the edit was cosmetic |
| **Un-re-derived figure** | A number calibrated against an old constant | The number is a suspiciously round or familiar value that matches the previous configuration |
| **Stale count** | A total that no longer matches its list | Count the list. Any mismatch. Also: totals stated in overview sections written first |
| **Surviving tightened-rule violation** | Old permitted usage in a table, example or template | The main body complies and an appendix does not. Examples that predate the tightening |
| **Unscoped blanket rule** | "All" applied to an entity nobody considered | A universal rule that produces an absurd result for exactly one entity |
| **Silent exception** | A plan that contradicts a rule with no recorded exemption | A rule stated in one section and quietly violated in another, with no note either way |
| **Duplicate divergence** | The same rule stated twice, differently | Two statements of a rule with different thresholds, scopes or wording |
| **Confirmation bloat** | A resolutions list mostly saying nothing changed | Entries that assert no constraint. Length of list far exceeds number of real rules |
| **History leak** | Revision language inside a deliverable | "Previously", "updated", "changed from", "no longer", parenthetical alternatives |
| **Vague lock** | A rule that cannot be violated | Adjectives with no threshold. Nobody has ever been told they broke it |
| **Orphan** | Content tracing to no live requirement | A section nothing else references and nothing depends on |
| **Familiarity blindness** | An error surviving multiple audits | The passage is old, was correct once, and every auditor has read it before. Only breaking the reading order finds it |
| **Reference rot** | "See the section above" pointing nowhere useful | Cross-references whose targets have moved, merged or changed meaning |
| **Renumbered list** | External references now point to the wrong item | Lock or scene numbers that are contiguous with no gaps after items were removed |

---

## B11. TEMPLATES

### Template 1: Lock record

```
LOCK-[NN]  [Title]

RULE:        
SCOPE:       
DEPENDS ON:  
DEPENDENTS:  
STATUS:      LIVE
DERIVED FIGURES:  
```

### Template 2: Lock list

```
# LOCKED RULES

Every rule below is binding. Each is stated once, here or at the
referenced location, and nowhere else. To change any of them, run the
lock audit protocol first.

| # | Rule (short form) | Scope | Lives in | Dependents | Status |
|---|---|---|---|---|---|
| 01 |  |  |  |  | LIVE |
| 02 |  |  |  |  | LIVE |

## Exceptions
| Exception to | Applies to | Reason | Consequence | Decided |
|---|---|---|---|---|

## Retired and superseded
(Development document only. Removed at handoff, moved to process log.)
| # | Rule | Status | Replaced by |
|---|---|---|---|
```

### Template 3: Handoff checklist

```
HANDOFF CHECKLIST

STRUCTURE
[ ] Every lock stated exactly once, in the section a reader would look in
[ ] No lock relies on a cross-reference to be understood
[ ] Every lock has an explicit scope, no bare "all"
[ ] Every lock is falsifiable, no adjective-only rules
[ ] Lock numbering intact, gaps preserved, nothing resequenced

COUNTS
[ ] Every stated total recomputed against its enumerable list
[ ] Every count has an enumerable list to be checked against
[ ] Sum of parts equals every stated whole (runtime, budget, beats)

RULES
[ ] Every tightened rule hunted through all five hiding places
[ ] Every blanket rule checked against every current entity
[ ] Every exception recorded with reason and consequence
[ ] No contradiction left for a reader to resolve

TECHNICAL
[ ] Every changed constant re-derived, not renamed
[ ] Old constants and old product names searched for and absent
[ ] Second-order consequences walked out to the paying department

HISTORY
[ ] All revision-history language removed
[ ] All superseded locks moved to the process log
[ ] All confirmation-only records folded in or deleted
[ ] All open questions closed or escalated, none shipped
[ ] Document reads declaratively throughout

VERIFICATION
[ ] Strip pass verified INDEPENDENTLY, not by the stripper
[ ] Verification used a broken reading order or a fresh reader
[ ] All tables, examples and summaries read as a group
[ ] Counts, tightened rules and blanket rules re-audited AFTER the strip
[ ] Findings report produced, blocking items resolved
```

---

## B12. THE AGENT'S STANDING BEHAVIOURAL RULES

1. **Never edit a premise in place.** Classify first, list the derivations, then edit. **[PRINCIPLE]**
2. **Never rename a constant.** Re-derive everything calculated from it, and report the re-derivation table as the deliverable.
3. **Treat one contradiction as evidence of an un-run audit.** Fix the traceability, not only the symptom.
4. **Audit tightened rules before anything else** when time is short. They are where the surviving violations are.
5. **Never write "all" without a boundary.** If the boundary is "the four that exist today", say so.
6. **Re-total at the moment of addition**, never at the end.
7. **Never delete a fact from a list before confirming it is stated in the body.** Fold in, then delete.
8. **Never resequence identifiers.** Gaps are information.
9. **Never verify your own strip pass.** Familiarity is the camouflage that hides the oldest errors.
10. **Report every finding with an exact location and an exact replacement.** A finding without a location is a complaint.
11. **Escalate open questions found inside resolved lists.** They are the highest-value output of any consolidation.
12. **Prefer the strictest phrasing when merging duplicates.** If that is wrong, someone will object, which is the outcome you want.
13. **Refuse to declare a document handed off** until the post-strip audit has run. A stripped document is not a finished document.

---

*End of Bible 17.*
