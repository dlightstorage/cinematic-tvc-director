# 15. THE SHOT LIST AND THE STORYBOARD

### Shot Design, Coverage, Boards and Previsualization: Turning a Script Into a Buildable Plan
**Film Craft Bible series. Reusable across any project, any client, any format.**

---

## HOW TO READ THIS DOCUMENT

Two halves, deliberately separated.

**Part A** is a craft reference. A human reads it to learn how shot listing and boarding actually think. It is grounded in standard industry forms, the stated methods of working directors, storyboard artists and previs supervisors, and the published nomenclature of camera departments, with attribution inline.

**Part B** is an operating manual for an AI subagent that builds, audits and defends shot lists and boards inside a multi-department pipeline. It contains the questions the role asks, the completeness audit it runs on any shot list, the disciplines that keep a locked structure from silently rotting, and the triggers that force a rebuild.

**Claim tagging.** Statements are tagged one of two ways:

| Tag | Meaning |
|---|---|
| **[SOURCED]** | Traceable to a named practitioner, guild, trade body, standard form, or published technical fact. Attribution is inline. |
| **[PRINCIPLE]** | Widely held craft convention, arithmetic, or physical fact. True in practice, not attributed to one person. |

**One structural warning before you start.** A shot list looks like a description of a film. It is not. It is a **contract between departments**, and every line of it is load bearing for somebody who is not in the room when you write it. The moment you treat a shot list as prose, it stops being usable and other departments start guessing. This document is mostly about not letting that happen.

---
---

# PART A: CRAFT REFERENCE

---

## A1. WHAT A SHOT LIST IS FOR, AND WHO ACTUALLY READS IT

A shot list is a numbered inventory of every camera setup required to complete a scene, a sequence, or a whole film. It is generated in prep, usually by the director working with the director of photography, and it becomes the spine of the shooting day. **[PRINCIPLE]**

The common misunderstanding is that the shot list exists so the director remembers what they wanted. That is the least important of its functions. The director could keep that in their head. The shot list exists because **five separate constituencies need to read the same plan and extract five completely different things from it.** **[PRINCIPLE]**

| Reader | What they extract | What breaks if the list is vague |
|---|---|---|
| **Director of photography** | Lens package, lighting design per setup, how many looks per location, what has to be rigged and when | The wrong glass gets ordered. A shot that needs a 200mm compressed background arrives on a set lit for a wide. |
| **1st AD** | Setup count, which is the primary driver of how long the day is | The day is scheduled against a fantasy. Setups get dropped at 6pm without a decision. |
| **Editor / post** | Whether the cut is possible, whether the transitions exist, whether there is enough material to solve a problem | Assembly stalls. The editor discovers a missing angle weeks after the crew wrapped. |
| **Every craft department** | Whether they are involved in a given shot at all | Makeup, wardrobe, art and props either over-prepare everything or under-prepare the one thing that is on camera. |
| **Producer / client** | Cost, feasibility, whether the promised idea survives the budget | The bid is built on a setup count that the creative no longer matches. |

That fifth column is the reason the shot list is the most cross-departmental document on a production after the call sheet. **[PRINCIPLE]** A production designer reads a shot list to find out which wall of the set is ever seen. A makeup artist reads it to find out whose face is in a close-up and whose is not. A gaffer reads it to find out how many times the room has to be relit. None of them are reading it for the story.

**The operational test of a good shot list:** can a department head read it alone, without the director present, and correctly identify everything they are responsible for and everything they are not? **[PRINCIPLE]** If they have to ask, the list is under-specified.

---

## A2. THE STANDARD FIELD SET, AND WHY EACH FIELD EXISTS

Professional shot list templates vary in cosmetics and converge almost completely on content. The field set below is the industry-standard core found across studio production paperwork, StudioBinder and Shot Lister style tools, and the shot list templates published by the American Society of Cinematographers community and by working ADs. **[SOURCED]**

Every field on this list exists because a specific department once got burned by its absence. **[PRINCIPLE]**

| Field | What it holds | Why it exists (who consumes it) |
|---|---|---|
| **Shot number** | Unique identifier, conventionally scene number plus letter (24A, 24B) or a flat sequential index for short form | The single addressable key. Slate, script supervisor notes, editor bins, VFX pulls and the schedule all reference it. Change a shot number and you break every downstream document. |
| **Scene** | Which scene of the script this shot belongs to | Ties the shot to script pages, to the stripboard, and to story-day continuity. |
| **Timecode / duration** | Intended screen time of this shot, either as a duration or as an in-and-out against a locked timeline | On fixed-runtime work this is the governing constraint. It tells the editor what was intended, tells the AD how many takes of what length, and tells VFX and animation how many frames to render. |
| **Shot size** | ELS, LS, MLS, MS, MCU, CU, ECU and so on | Determines lens choice, distance, set extent that must be dressed, and whether a face needs full makeup detail. This is the single most consequential field for other departments. |
| **Angle** | Eye level, high, low, overhead, Dutch, OTS, POV, profile, three-quarter | Determines rigging, ceiling and floor treatment, whether a set piece needs a lid, and what the grip department has to build. |
| **Movement** | Static, pan, tilt, dolly, track, crane, Steadicam, gimbal, handheld, zoom, push, whip | Determines the support package, the floor prep, the number of crew, and a large fraction of the setup time. |
| **Lens** | Focal length or lens family | Determines the rental package and the physical distance the camera stands from the subject, which determines how much room, track and lighting space is required. |
| **Subject / character** | Who or what is in frame | The department involvement switch. If a name is not in this field, that person is not on camera in this shot. |
| **Action** | What physically happens in the shot | The only field the actors and the AD actually rehearse against. |
| **Dialogue / VO line** | The specific words carried under or in the shot | On scripted and voice-driven work this is what synchronizes picture to copy. It is also how a shot list is audited against approved language. |
| **Sound** | Sync, MOS, wild track, playback, effects capture | Tells the sound department whether they are recording, and tells post what to expect. |
| **Location / set / zone** | Where the shot happens, down to the named area of a location | Drives grouping, company moves, and which department pre-dresses what. Also drives the schedule more than anything except cast availability. |
| **Notes** | Anything conditional, exceptional or fragile | The catch-all for exceptions, safety flags, VFX requirements, dependencies and the reason a rule is being broken. |

Two optional fields appear on most professional lists and are worth adopting by default:

- **Equipment / support**: the specific rig (dolly, jib, slider, drone, technocrane, tripod, bag). Redundant with movement in theory, load bearing in practice, because "push in" can mean a dolly, a slider or a Steadicam, and those are three different orders. **[PRINCIPLE]**
- **Frame rate / format flag**: for slow motion, high speed, or shots that will change format. This is the field whose absence causes the most unrecoverable damage, because a shot intended for 96fps and captured at 25fps cannot be fixed later. **[PRINCIPLE]**

---

## A3. SHOT SIZE NOMENCLATURE

Shot size is defined by how much of the frame the human figure occupies. The vocabulary is standardized well enough that a crew from three different countries will agree on it. **[SOURCED]** Boundaries between adjacent sizes are conventionally soft, which is why serious lists name the framing landmark, not just the abbreviation.

| Term | Abbrev. | Definition | Framing landmark |
|---|---|---|---|
| Extreme long shot / extreme wide | ELS / EWS | Subject tiny or absent, environment dominant | Figure occupies a small fraction of frame height |
| Long shot / wide shot | LS / WS | Full figure with headroom and space around | Head to feet, air above and below |
| Full shot | FS | Full figure filling the frame | Head at top of frame, feet at bottom |
| Medium long shot / American shot | MLS / Cowboy | Cut around mid-thigh or knee | Historically framed to include a holstered gun, hence "cowboy" |
| Medium shot | MS | Waist up | Cut at or just below the waist |
| Medium close-up | MCU | Chest up | Cut mid-chest, shoulders included |
| Close-up | CU | Head and a little shoulder | Cut just below the collarbone, top of head at or near frame top |
| Big close-up | BCU | Face fills frame | Chin to forehead |
| Extreme close-up | ECU | A feature or a detail | Eyes only, mouth only, a hand, a logo, a switch |
| Two shot / three shot | 2S / 3S | Number of people in frame | Named by headcount rather than by body cut |
| Over the shoulder | OTS | Subject framed past the near shoulder of another | Foreground shoulder occupies a defined corner of frame |
| Insert | INS | A detail shot of an object or action, usually shot separately | Typically no principal face involved |
| Cutaway | CA | A shot of something outside the main action | Used for time compression and repair in the edit |
| Establishing shot | EST | Any size, functional label. Orients the viewer in place | Usually wide, but a detail can establish |

**Why size is not a stylistic note. [PRINCIPLE]** Size is a budget and a staffing instruction wearing a creative costume. A wide shot means the whole set is dressed, the whole floor is lit, every extra is costumed, and every visible surface is finished. A close-up means one face is fully made up, one small area is lit precisely, and the rest of the room can be a mess. When a director changes a wide to a close-up, they have not made an aesthetic adjustment. They have released four departments from most of their work. When they change a close-up to a wide, they have added it back, usually after those departments have already stopped planning for it.

---

## A4. ANGLE NOMENCLATURE

| Term | Definition | Consequence for other departments |
|---|---|---|
| **Eye level** | Lens at subject's eye height | Neutral. Baseline for everything else. |
| **High angle** | Camera above, looking down | Floor and set dressing become visible. Floor must be finished and clean. |
| **Low angle** | Camera below, looking up | Ceiling, lighting rig and grid become visible. Lamps have to hide. This single choice can double a lighting plan. |
| **Overhead / top shot / bird's eye** | Directly above | Requires rigging, a crane or a drone. Almost always a separate setup with its own crew time. |
| **Worm's eye** | Extreme low, from the ground | Requires floor cut, low hat or a hole. Often a build. |
| **Dutch angle / canted** | Camera rolled off horizontal | Changes what enters frame corners. Frequently exposes edge-of-set. |
| **Over the shoulder (OTS)** | Framed past a foreground figure | Requires the foreground performer to be present and dressed even though barely seen. A commonly missed casting and wardrobe cost. |
| **Point of view (POV)** | Camera stands in for a character's eyes | Often requires a matching eyeline shot to make it read. A POV without its bracketing look does not cut. |
| **Profile / three-quarter / frontal** | Angle of the subject relative to lens | Determines which side of makeup and hair is finished, and which side of a set is dressed. |
| **Reverse** | The opposing angle across the axis of a conversation | The single largest driver of relighting time on a dialogue day. |

---

## A5. CAMERA MOVEMENT VOCABULARY

| Term | Definition | Notes |
|---|---|---|
| **Static / locked off** | Camera does not move | Cheapest and fastest. Also the required state for most clean VFX plates and split-screen work. |
| **Pan** | Rotation on the vertical axis, camera body stationary | |
| **Tilt** | Rotation on the horizontal axis | |
| **Roll / canting** | Rotation on the lens axis | |
| **Dolly / track** | Camera physically translates on wheels or rails | Requires flat floor or laid track. Floor prep time is the hidden cost. |
| **Push in / pull out** | Dolly toward or away from subject | Distinct from a zoom. A push changes perspective, a zoom does not. |
| **Truck / crab** | Lateral translation, camera stays parallel to subject | |
| **Pedestal / boom** | Vertical translation of the camera head | |
| **Crane / jib** | Camera moves through an arc on an arm | Crew and rigging heavy. |
| **Steadicam** | Stabilized body-mounted rig, operator walks | Buys movement without track. Costs an operator and rig day rate. |
| **Gimbal** | Motorized stabilizer, handheld or vehicle mounted | |
| **Handheld** | Operator-held, unstabilized | Cheap, fast, and a specific aesthetic statement. Not neutral. |
| **Zoom** | Focal length changes during the shot | Perspective does not change. Reads differently from a push. |
| **Dolly zoom / Vertigo shot** | Dolly and zoom in opposite directions | Perspective distorts while subject size stays constant. Named for Hitchcock's use in *Vertigo*, executed by Irmin Roberts. **[SOURCED]** |
| **Whip pan** | Very fast pan, usually as a transition | Requires a matching whip on the other side to cut cleanly. |
| **Snorricam** | Camera rigged to the actor's body, actor static in frame while world moves | |
| **Arc** | Camera circles the subject | High floor-prep and lighting cost, because every background gets seen. |
| **Follow / lead** | Camera behind or ahead of a moving subject | |
| **Rack focus** | Focus shifts between planes within the shot | Not a movement, but conventionally logged in the movement column. Requires a focus puller and rehearsal. |

**[PRINCIPLE]** Movement is the field most often written aspirationally and least often costed. A one-line note reading "slow arc around the subject as they turn" is a track lay, a lighting plan that works in 360 degrees, a floor with no cable, and a crew that can hide. Whoever writes that line owes the AD an honest setup-time estimate.

---

## A6. COVERAGE THEORY

### What "covered" means

A scene is **covered** when enough distinct angles exist that the editor can assemble it in more than one way, cut around a performance problem, and control pace without being forced into a single unbroken take. **[PRINCIPLE]**

The classical coverage pattern, sometimes called the standard triangle or the Hollywood pattern, is:

1. **The master.** A wide that plays the whole scene start to finish. It establishes geography, position and screen direction. It is the safety net.
2. **Mediums.** Tighter passes on the principal groupings, still playing substantial chunks of the scene.
3. **Singles / over-the-shoulders.** Each principal covered individually across the axis, usually playing the whole scene again from their side.
4. **Inserts and cutaways.** Hands, objects, letters, screens, details, reactions of non-speaking characters.

This is the pattern behind the "shoot the master, then work your way in" heuristic taught in nearly every film school. **[PRINCIPLE]** Its logic is that after the master, every tighter setup only needs to relight and reframe a smaller portion of the same geography, so the day gets faster as it goes.

### Coverage as insurance

The honest description of full coverage is that it is **insurance purchased with shooting time.** **[PRINCIPLE]** You buy options in the edit at the price of setups on the day. If a performance is uneven, coverage saves you. If a line is cut in post, coverage lets you bridge. If the client asks for a version six seconds shorter, coverage lets you deliver it without a reshoot.

The cost is real and it compounds. Every additional angle means a relight, a reslate, a new focus mark and a new set of takes. On a dialogue scene, going from three setups to seven can be the difference between a half day and a full day.

### The opposite philosophy: shooting only the cut

Against the coverage tradition sits a lineage of directors who shoot only what will appear in the finished film. Alfred Hitchcock is the canonical figure. He famously said that he never looked through the camera because the film was already complete in his head before shooting began, and he worked with storyboard artists including Harold Michelson to fix the film on paper first. **[SOURCED]** The practical consequence was that Hitchcock delivered material a studio could not recut, because the alternative angles did not exist. Shooting the cut is therefore not only an efficiency method. It is also a **control method**. **[SOURCED]**

Modern practitioners of the same discipline include Bong Joon-ho, who boards his films himself in extraordinary detail and has said that this is precisely how he protects the film from being reshaped later, and Ridley Scott, who trained as a designer at the Royal College of Art and draws his own detailed frames, known within the industry as "Ridleygrams." **[SOURCED]** Denis Villeneuve is similarly associated with a lean, pre-decided approach to coverage rather than shooting every possible angle. **[SOURCED]**

Steven Spielberg sits between the two poles. He is one of the most heavily boarded directors in the business, working over decades with artists such as Ed Verreaux and David Lowery on sequence design, yet he retains the ability to invent on the day. **[SOURCED]** The board for Spielberg is a floor, not a ceiling.

### How to choose between the two philosophies

| Condition | Lean toward full coverage | Lean toward shooting the cut |
|---|---|---|
| Runtime | Elastic (feature, documentary) | Locked (commercial, ident, title sequence, trailer) |
| Approval chain | Many stakeholders who will want options | Approved board or animatic already signed off |
| Performance risk | Untrained or non-professional cast | Rehearsed cast or non-performance content |
| Budget shape | Time-rich, decision-poor | Time-poor, decision-rich |
| Post plan | Cut will be explored in the edit | Cut already exists on paper |
| VFX load | Low | High. Every unboarded angle is an unbudgeted VFX shot |

**[PRINCIPLE]** The failure mode is not choosing either one. A production that half-covers is the worst of both: it spends the time of coverage and arrives in post without the options that justify the spend.

---

## A7. STORYBOARDING

### What a board communicates that a list cannot

A shot list is a table of attributes. A storyboard is a **picture of the frame**. The difference is not decoration. Four things exist only in the board: **[PRINCIPLE]**

1. **Composition.** Where the subject sits in the frame, what the negative space does, what the eye does when the cut lands.
2. **Screen direction and the axis.** Whether the subject moves left to right, and therefore whether two shots will cut together at all.
3. **The relationship between consecutive frames.** A list gives you shots in sequence. A board gives you the *cut*, which is the only thing the audience actually experiences.
4. **What is not in frame.** A drawing settles the edges of the picture, which is what the art department, VFX and the gaffer actually need to know.

Storyboarding as a discipline is generally traced to the Walt Disney studio in the early 1930s, where the practice of pinning sequential drawings to a board was formalized by artists including Webb Smith, and it moved into live action from there. **[SOURCED]** Harold Michelson, who boarded *The Birds*, *The Graduate*, *Star Trek: The Motion Picture* and much of *Full Metal Jacket*, is the practitioner most often credited with elevating live-action boarding into genuine visual design rather than mere illustration, to the extent that he was later credited as a production designer and art director. **[SOURCED]** Sylvain Despretz, who has boarded and conceptually designed for Ridley Scott, Terry Gilliam, David Fincher and Luc Besson, and Martin Asbury, whose credits run from Bond films through Christopher Nolan and Ridley Scott productions, are among the most established live-action board artists of the modern era. **[SOURCED]**

### When boards are worth the cost

Boarding takes days and money. It pays for itself under specific conditions. **[PRINCIPLE]**

| Board it | Reason |
|---|---|
| Action, stunts, chases | Safety and continuity. The board is the shared plan the stunt coordinator works from. |
| VFX shots | The board is the basis of the VFX bid. An unboarded VFX shot is an unpriced VFX shot. |
| Fixed-runtime films | The board plus timings is the only way to know the piece fits before you shoot it. |
| Complex geography | Any sequence where the axis could be crossed or where the audience could lose orientation. |
| Anything with multiple approvers | The board is the artifact clients approve. Words get reinterpreted, drawings do not. |
| Sequences with a hidden element | If a face, a product or a reveal is deliberately withheld, the board is what proves the withholding actually works from every angle. |

| Do not board it | Reason |
|---|---|
| Simple dialogue coverage | The standard pattern is understood by everyone. Boarding it wastes prep. |
| Documentary and reactive shooting | The subject does not take direction. |
| Anything genuinely improvised | Boarding creates a false expectation that will be breached. |

### Animatics

An **animatic** is the boards cut together in a timeline, held for their intended durations, with scratch voice, temp music and rough sound. **[PRINCIPLE]** It converts a static board into a time-based object.

This is the single highest-value artifact on short-form work, and the reason is arithmetic. **[PRINCIPLE]** A board tells you the film has nineteen shots. An animatic tells you those nineteen shots run thirty-eight seconds and you sold a thirty-second film. That discovery costs nothing on paper and costs a shoot day if it happens in the edit.

In advertising, the animatic is also a formal sales artifact. Agencies routinely test animatics with audiences before production, and a client approval on an animatic is functionally an approval of shot count, shot order and shot duration. **[SOURCED]** That has a consequence people forget: once an animatic is approved, **the shot count is part of the approved deliverable**, not an internal implementation detail.

### Previsualization

Previs is animated, three-dimensional, camera-accurate storyboarding, built in software and delivered as sequences the whole crew can measure against. The Previsualization Society defines the practice as a collaborative process that generates preliminary versions of shots or sequences predominantly using 3D animation and a virtual environment. **[SOURCED]**

The major dedicated studios are **The Third Floor**, **Halon Entertainment** and **Proof Inc.**, all founded by artists who came out of the early 2000s wave of digital previs on large-scale productions. **[SOURCED]** Their work now routinely spans:

- **Pitchvis**: a sequence built to sell the project before it is greenlit.
- **Previs**: the pre-production shot design, with real lens values, real set dimensions and real timing.
- **Techvis**: the engineering layer. Exact crane arcs, camera heights, rig positions, motion control paths and the physical measurements the grip department builds to. **[SOURCED]**
- **Postvis**: rough CG composited into the shot footage so the edit can proceed before final VFX exists. **[SOURCED]**

**[PRINCIPLE]** The distinction worth internalizing is that previs and techvis are the point where a drawing becomes a **measurable claim**. A board can show a camera swooping over a wall. Techvis states the arm length, the height, the speed and whether the crane fits through the door. Any production where a creative idea depends on a physical impossibility should be finding that out in techvis, not on the day.

---

## A8. TIMECODED SHOT LISTS FOR SHORT-FORM

Short-form work inverts the normal order of operations, and this is the most commonly misunderstood point in the whole craft. **[PRINCIPLE]**

On a feature, the script comes first, the shots are designed to serve it, and the runtime is discovered afterward in the edit. On a thirty-second film, **the runtime is the specification and the script is written to fit it.** Everything downstream inherits that.

### How the document is actually built

1. **The runtime is fixed first.** Thirty seconds, fifteen, six, sixty. This is a delivery spec, often contractual, often tied to a media buy.
2. **The script or copy is locked to that runtime.** Voice over is timed by reading it aloud at delivery pace. Egyptian and Gulf Arabic voice over, like any language with different syllable density from English, will not run at the same length as an English script of the same word count, and the timing must be measured on the actual language of delivery, not estimated. **[PRINCIPLE]**
3. **The locked audio is laid on a timeline.** Every line, every music hit, every logo end-frame gets an in-point and an out-point.
4. **Picture is then cut TO the script.** Each shot is allocated a slice of the timeline. The shot list is written against those slices.

The result is a **timecoded shot list**: every shot carries not a vague duration but a real in and out against a locked master timeline.

| Shot | In | Out | Dur | Copy line under this shot |
|---|---|---|---|---|
| 01 | 00:00.0 | 00:01.6 | 1.6s | (silence, ambience) |
| 02 | 00:01.6 | 00:03.4 | 1.8s | "line one of the approved copy" |
| 03 | 00:03.4 | 00:04.9 | 1.5s | "line two" |

**[PRINCIPLE]** Three properties follow from this structure, and all three are counterintuitive to anyone trained on long form:

- **The shot count is a fixed quantity, not an open one.** The timeline has a finite number of slices. Adding a shot does not extend the film. It shortens every other shot.
- **Duration is an input, not an output.** In long form, you shoot and then discover the length. Here, the length is given and the shooting serves it.
- **The film is legible on paper before anything is shot.** If the timeline sums correctly and every line of copy has a picture under it, the piece already works structurally. If it does not sum, no amount of good shooting will fix it.

### Why the timecode column is non-negotiable in short form

Without it, three things become impossible: the editor cannot know the intended rhythm, the AD cannot know how many takes of what length are needed, and nobody can detect that the piece is over length until it is too late to do anything cheap about it. **[PRINCIPLE]** A short-form shot list with a "duration" column full of blanks or the word "short" is not a shot list. It is a wish.

---

## A9. THE CHARACTER COLUMN

Every shot list must state **who is in frame** in every single shot. Not who is in the scene. Who is in the frame. **[PRINCIPLE]**

This looks like a bookkeeping detail and it is actually the master switch for department involvement. Consider what a single name in that column triggers:

| Department | What the name in the character column triggers |
|---|---|
| Casting | This person must be cast, not just implied |
| Wardrobe | A costume must exist, be fitted, be doubled if there is a stunt or a mess |
| Makeup and hair | A chair slot in the prep schedule, at a level of finish set by the shot size |
| 1st AD | A call time, a working-hours calculation, and possibly a chaperone if a minor |
| Production | A release, a fee, a meal, a transport slot |
| Continuity | A state to track across every other shot this person appears in |

Remove the name and every one of those obligations disappears. Add the name and every one of them appears. **[PRINCIPLE]** This is why "who is in frame" cannot live in a prose description. It has to be a structured field that can be read by scanning a column.

### Making an ensemble real without expanding the film

There is a specific and very common problem in commercial work: the film is supposed to represent a group, a range of people, a team, a family, a set of customers, and the shot list as written only ever actually shows one or two of them. The idea of the ensemble lives in the treatment. The shot list quietly contradicts it.

There are two ways to fix that, and they are not equivalent. **[PRINCIPLE]**

**The expensive fix: add shots.** Insert new shots featuring the missing members of the ensemble. This is what people instinctively reach for. On a fixed-runtime piece it is close to catastrophic. Every added shot changes the shot count, changes every subsequent shot number, and shortens every other shot to make room. Every downstream document built on the old count and the old timecodes becomes wrong.

**The cheap fix: reassign existing shot slots.** Take shots that already exist in the structure and change *who is in them*. The hand in the insert becomes a different person's hand. The figure in the wide becomes a different member of the group. The reaction that was going to be character A becomes character B.

The reassignment costs almost nothing structurally. The shot count is unchanged. The timecodes are unchanged. The duration total is unchanged. The AD's setup count is unchanged. What changes is a value in one column, and the downstream consequences are limited to the departments that read that column: casting, wardrobe, makeup, and continuity. Those departments get a specific, bounded change request instead of a rebuild.

**[PRINCIPLE] The rule: when the problem is representation, reassign. When the problem is genuinely missing narrative information, add, and accept the rebuild.** Confusing the two is how a locked short-form structure quietly becomes forty seconds long.

---

## A10. FRAMING RULES ARE LOAD-BEARING CONSTRAINTS, NOT DESCRIPTION

This is the section of this document with the highest cost-per-word, and it is the one most often skipped.

A creative document will frequently contain a sentence like one of these:

- "The camera never widens past a medium."
- "We never see this character's face."
- "The product is never shown in full until the final frame."
- "We stay in close-ups for the entire first act."
- "The location is never revealed."

These read like tone notes. They are not. **They are engineering constraints, and other departments immediately build real plans on top of them.** **[PRINCIPLE]**

### What each department does the moment such a rule is written

| Rule as written | What a department legitimately concludes and acts on |
|---|---|
| "Never widens past a medium" | **Art department:** only the dressed area inside the medium frame needs finishing. The rest of the location does not get built, painted or dressed. **Gaffer:** only that volume gets lit. **Costume:** shoes and lower halves may not need to be sourced. **Extras:** background population may not be needed. |
| "This character's face is never seen" | **Makeup:** no facial makeup call for this performer, no prosthetics, no continuity photography of the face. **Casting:** the role can be filled by a body double or a non-actor, at a lower fee and with no screen-test requirement. **Wardrobe:** no collar or neckline detail needed. |
| "The product is never shown in full" | **Props:** a partial or unfinished hero prop is acceptable. Only the seen portion needs finishing to hero standard. |
| "We stay in close-ups throughout act one" | **1st AD:** setup times estimated for tight lighting, not room lighting. **Production design:** the wider set gets a later build date or no build at all. |

Every one of those is a real decision, made in prep, that costs money to reverse. **[PRINCIPLE]**

### The reversal cost

When someone later writes a shot that breaks the rule, for example a single wide at the end because "it feels like it needs one," they are not adding a shot. They are **re-opening every department that had closed a decision on the strength of that rule.** The wide requires the room to be dressed, lit, populated and finished. The face on camera requires makeup, a real performer, and continuity tracking from that point backward. The full product reveal requires a finished hero prop.

**[PRINCIPLE] The operational rule: a framing constraint, once written and circulated, has the status of a locked spec. It can be changed, but changing it is a production event, not an editorial tweak, and every department that read it must be explicitly re-notified.** The failure is never the change itself. The failure is the change being made silently, in a revision, without anyone telling makeup that the face they were told never appears now appears in shot 17.

### Corollary: never write a framing rule you do not intend to honor

A rule written for flavor, with no intention of enforcement, is worse than no rule at all, because it causes departments to stop planning for things they will later be asked to deliver on no notice. **[PRINCIPLE]** If the rule is soft, write it as a preference: "predominantly tight, with the option of one wide at the resolution." That sentence causes the art department to keep planning for a wide. The absolute version does not.

---

## A11. NAMED PRACTITIONERS, STUDIOS AND REFERENCE POINTS

| Name | Contribution | Why it matters here |
|---|---|---|
| **Alfred Hitchcock** | Boarded his films exhaustively and shot minimal coverage. Said the film was complete in his head before the camera rolled **[SOURCED]** | The archetype of shot listing as a control instrument, not just a plan |
| **Harold Michelson** | Storyboard artist and later production designer. *The Birds*, *The Graduate*, *Star Trek: The Motion Picture*, *Full Metal Jacket* **[SOURCED]** | Elevated boarding from illustration to design. Subject of the documentary *Harold and Lillian: A Hollywood Love Story* |
| **Sylvain Despretz** | Storyboard and concept artist for Ridley Scott, Fincher, Gilliam, Besson **[SOURCED]** | Boarding as high-level visual authorship on large-scale productions |
| **Martin Asbury** | Long-serving British storyboard artist, Bond films, Nolan and Scott productions **[SOURCED]** | The professional board artist as a permanent fixture of large-unit prep |
| **Steven Spielberg** | Heavily boarded, especially for action and effects sequences **[SOURCED]** | Boards as a floor for invention rather than a ceiling |
| **Ridley Scott** | Draws his own frames, known as "Ridleygrams." Design-school trained **[SOURCED]** | Director as visual author. Also the model for commercial directors who board their own spots |
| **Bong Joon-ho** | Draws his own detailed boards for entire films **[SOURCED]** | Boarding as protection of the intended cut |
| **Denis Villeneuve** | Known for a pre-decided, lean approach to coverage **[SOURCED]** | Contemporary evidence that limited coverage is a live professional practice |
| **The Third Floor** | Previs and virtual production studio **[SOURCED]** | Industry-scale previs, techvis, postvis |
| **Halon Entertainment** | Previs and virtual production studio **[SOURCED]** | Same |
| **Proof Inc.** | Previs studio **[SOURCED]** | Same |
| **The Previsualization Society** | Trade body that formalized the definitions of previs, techvis, postvis and pitchvis **[SOURCED]** | The reference for what the terms actually mean |
| **Walt Disney studio, early 1930s** | Formalized sequential board practice, associated with Webb Smith **[SOURCED]** | Origin point of the storyboard as a document type |

---

## A12. HOW COMMERCIAL SHOT LISTS DIFFER FROM FEATURE SHOT LISTS

| Dimension | Feature | Commercial / branded |
|---|---|---|
| **Runtime** | Discovered in the edit | Fixed in advance and contractual |
| **What comes first** | Script, then shots, then runtime | Runtime, then copy, then shots |
| **Duration column** | Optional, often estimated | Mandatory, often a real timecode |
| **Approval of the shot list** | Internal, director and DP | External. Agency and client approve boards and animatics, sometimes formally |
| **Cost of adding a shot** | Time on the day | Time on the day plus re-approval plus the loss of duration from every other shot |
| **Coverage philosophy** | Frequently full coverage | Frequently shoot-the-cut, because the board is already approved |
| **Shots per day** | Often 20 to 40 setups | Often far fewer setups but many takes and many product-perfect passes |
| **Shot density** | Perhaps 1 shot per 3 to 8 seconds of finished film | Often 1 shot per 1 to 2 seconds |
| **Product and logo** | Rarely governed | Governed by brand guidelines, legal, and often a mandatory end-frame duration |
| **Versions** | One film | Multiple cutdowns and aspect ratios derived from the same shoot, which must be planned into framing |
| **Who reads the list** | The unit | The unit, plus the agency producer, plus the client, plus in many markets a compliance or regulatory reviewer |

**[PRINCIPLE]** The two most consequential differences are the last two. First, commercial shot lists are usually **multi-delivery**: the same shot must survive a 16:9 crop, a 1:1 crop and a 9:16 crop, which means the framing has to be designed with protected areas from the start, and that has to appear on the shot list as a note per shot, not as a general instruction. Second, a commercial shot list has **external approvers**, which means the document is not merely a plan, it is a record of what was agreed. Changing it is a client conversation.

---

## A13. VOCABULARY GLOSSARY

| Term | Definition |
|---|---|
| **Setup** | A distinct camera position and lighting state. The unit the AD schedules by. One setup can yield several shots |
| **Shot** | A continuous run of camera. The unit the editor cuts by |
| **Take** | One recorded attempt at a shot |
| **Slate** | The identifier that ties a take to a shot number in the record |
| **Coverage** | The set of angles that make a scene assemblable in the edit |
| **Master** | The wide take that plays a whole scene through |
| **Single** | A shot with one person in frame |
| **Two-hander** | A scene between two characters, and by extension the coverage pattern for it |
| **Insert** | A tight shot of a detail, usually shot separately from the main action |
| **Cutaway** | A shot outside the main action, used to compress time or repair a cut |
| **The axis / the line** | The imaginary line of action. Crossing it reverses screen direction and can break a cut |
| **180-degree rule** | The convention of keeping the camera on one side of the axis |
| **30-degree rule** | The convention that consecutive shots of the same subject should differ by at least 30 degrees to avoid a jump cut |
| **Eyeline** | Where a performer looks relative to camera, so that separate shots read as looking at each other |
| **Screen direction** | Which way across frame a subject faces or moves |
| **Lined script** | The script marked with vertical lines showing which setup covers which lines |
| **Board / frame** | One panel of a storyboard |
| **Animatic** | Boards cut to time with scratch audio |
| **Previs** | 3D animated shot design with real camera values |
| **Techvis** | Previs extended into exact physical measurements for rigging and grip |
| **Postvis** | Rough CG composited into shot plates so the edit can proceed |
| **Pitchvis** | Previs made to sell a project before greenlight |
| **Floor plan / overhead** | Top-down diagram of camera, subject and lighting positions. The companion document to a shot list |
| **Shooting order** | The order shots are captured, which is almost never the order they appear in the film |
| **Story order** | The order shots appear in the finished film |
| **Protected area / safe area** | The region of frame guaranteed to survive all delivery crops |
| **End frame** | The final held frame of a commercial, typically logo and legal, often with a mandated minimum duration |
| **MOS** | Shot without sync sound |
| **Plate** | A clean background or element shot intended for compositing |
| **Hero** | The version of a prop, product or performer that is finished to full on-camera standard |

---
---

# PART B: AGENT OPERATING MANUAL

---

## B1. THE QUESTIONS THIS ROLE ASKS BEFORE BUILDING ANYTHING

Do not begin listing shots until these are answered. An unanswered question here becomes a wrong column later. **[PRINCIPLE]**

### On the shape of the deliverable
1. What is the exact finished runtime, and is it contractual?
2. How many versions and aspect ratios are delivered from this shoot? List every one.
3. Is there a mandated end-frame, logo hold, legal card or disclaimer, and how many seconds does it consume?
4. Is the script or copy locked? If not, what is the lock date, and am I listing shots against a moving target?
5. Is there an approved board or animatic already? If yes, the shot count is already approved and I am not free to change it.

### On the source material
6. Is there a treatment, a scene script, a copy deck, or all three, and do they agree with each other?
7. Does the copy contain any explicit enumerated list ("every X, every Y, every Z")? If so, that list governs both the shot order and the shot content.
8. Are there stated framing rules, tonal rules or absolute prohibitions anywhere in the source documents? Extract them verbatim before doing anything else.

### On cast and subject
9. Who is the ensemble, in full? Name every person the film is meant to represent.
10. Is every named person actually in a frame somewhere, or only in the treatment?
11. Are any faces deliberately withheld, obscured, or shot from behind? For whom, and in which shots?
12. Are there minors, animals, real customers, real staff or non-professionals? Each carries scheduling and release consequences.

### On location and geography
13. How many distinct locations, and how many distinct zones within each?
14. Does every shot have a zone assignment? A shot with no zone will be discovered on the day.
15. Is the axis established for every multi-person scene, and does any shot cross it?

### On camera and technical
16. What is the lens package, and is it a set or a rental to be specified?
17. Any high-speed, format change, macro, drone, underwater, or motion-control shot? Each is a separate order.
18. Any shot that is a VFX plate? Plates need a locked-off note and a clean pass.
19. What is the setup budget for the day? Divide the total setups by the available hours and check the answer is sane.

### On downstream commitments
20. Which departments have already been sent a version of this plan, and what did they close a decision on?

---

## B2. THE FULL SHOT LIST TEMPLATE

Use this column set. Every column is mandatory unless marked optional. A blank in a mandatory column is a finding, not a formatting issue. **[PRINCIPLE]**

| # | Column | Mandatory | Definition | Accepted values |
|---|---|---|---|---|
| 1 | **Shot No.** | Yes | Unique stable key. Never renumber without a change note | `01`, `02` or `24A`, `24B` |
| 2 | **Scene / Sequence** | Yes | Parent scene or act | Scene number or named beat |
| 3 | **In** | Yes on fixed runtime | Start point on the master timeline | `00:04.2` |
| 4 | **Out** | Yes on fixed runtime | End point | `00:05.8` |
| 5 | **Duration** | Yes | Intended screen time | Seconds to one decimal |
| 6 | **Shot size** | Yes | Framing | ELS / LS / FS / MLS / MS / MCU / CU / BCU / ECU / 2S / OTS / INS |
| 7 | **Angle** | Yes | Camera position relative to subject | Eye / High / Low / Overhead / Dutch / OTS / POV / Profile / Reverse |
| 8 | **Movement** | Yes | What the camera does | Static / Pan / Tilt / Dolly / Push / Track / Arc / Crane / Steadicam / Gimbal / Handheld / Zoom / Rack |
| 9 | **Lens** | Yes | Focal length or family | `35mm`, `85mm`, `100mm macro`, or `wide / normal / long` if the package is not yet set |
| 10 | **Character / Subject** | Yes | Who or what is in frame. Names, not roles-in-general | Named person, named object, `none` |
| 11 | **Action** | Yes | What physically happens | One sentence, present tense, physical only |
| 12 | **Copy / VO / Dialogue** | Yes if the film has copy | The exact words carried under this shot | Verbatim, quoted |
| 13 | **Location / Zone** | Yes | Named location and named zone within it | `Workshop / bench area` |
| 14 | **Sound** | Yes | Capture requirement | Sync / MOS / Wild / Playback |
| 15 | **Equipment** | Recommended | The physical support | Tripod / dolly / slider / jib / Steadicam / drone / handheld |
| 16 | **Frame rate / format** | Recommended | Any deviation from base | `50fps`, `96fps`, `base` |
| 17 | **Crop safety** | Recommended on multi-delivery | Which crops this framing survives | `16:9 / 1:1 / 9:16 safe` |
| 18 | **Notes / Exceptions** | Yes when applicable | Conditions, dependencies, safety flags, and any explicit rule exception with its reason | Free text, but exceptions must be labelled `EXCEPTION:` |

**Formatting rules for the agent. [PRINCIPLE]**
- One row per shot. Never merge rows. Never write "shots 4 to 7" as one row.
- The Action column describes physical events only. Intent, emotion and meaning belong in the treatment, not the shot list. A camera department cannot shoot "a feeling of pride."
- The Character column takes names. Never "the team," never "a customer," never "people." Those are casting requests disguised as descriptions and they produce no wardrobe, makeup or call-time obligation.
- Durations must sum. State the sum at the bottom of the table and state the target. If they differ, say so in the same line.

---

## B3. THE COMPLETENESS AUDIT

Run this on any shot list, including your own, before releasing it. It is a mechanical pass, not a judgment pass. **[PRINCIPLE]**

### The four mandatory attributes

Every single shot must carry all four. A shot missing any one is **under-specified** and must be reported as such.

| Attribute | The question it answers | The department that is blocked without it |
|---|---|---|
| **Duration or timecode** | How long is this on screen? | Editor, AD, VFX, animation |
| **Lens or lens family** | How far away does the camera stand? | DP, camera rental, grip, location scout |
| **Character or subject** | Who or what is in frame? | Casting, wardrobe, makeup, continuity, production |
| **Location or zone** | Where does this happen? | AD, art department, locations, gaffer |

### How to run it

1. Build a matrix. Rows are shot numbers, columns are the four attributes. Fill in every cell from the document as written, not as you assume it.
2. Mark every empty cell.
3. Report the count of under-specified shots as a headline number before discussing anything else.
4. For each gap, name the blocked department. A gap with no named consequence gets ignored. A gap with a named consequence gets fixed.

### How gaps typically appear

The two most common gap patterns, and both are invisible to casual reading. **[PRINCIPLE]**

**Pattern 1: the shot that falls between two named ranges.** A document says "shots 1 to 6 are in the workshop" and later "shots 8 to 14 are in the showroom." Shot 7 has no location. Nobody notices because both sentences are individually correct and the gap only exists in the space between them. This is the single most reliable place to find under-specification, and the way to find it is to **enumerate every shot number individually and check membership, never to read the ranges as prose.**

The same pattern produces lens gaps ("the opening is on long glass, the finale is on wides"), character gaps ("the first half follows person A, the last third is the group"), and timing gaps ("the first ten seconds are the setup, the final five are the end frame," which leaves fifteen seconds unaccounted).

**Pattern 2: the attribute stated for a group and never distributed.** A note says "all product shots are macro." Which shots are product shots? If that set is never enumerated, no individual shot carries the attribute, and the camera assistant has to guess.

### The audit output format

Report as a table, not prose:

| Shot | Missing | Blocked department | Suggested resolution |
|---|---|---|---|
| 07 | Location/zone | Art, AD, gaffer | Falls between the workshop range and the showroom range. Assign explicitly. |
| 11 | Lens | Camera, grip | No focal length stated anywhere. Nearest neighbours are 85mm. Propose 85mm. |
| 15, 16 | Character | Casting, wardrobe, makeup | "People" is not a name. Assign named ensemble members. |

---

## B4. THE WORD-FOR-WORD AUDIT

This audit applies whenever the copy, voice over or on-screen text contains an **explicit enumerated list**. Constructions to watch for: "every X, every Y, every Z," "from A to B to C," "whether you are a P, a Q or an R," "for the M, the N and the O."

**The rule. [PRINCIPLE]** When copy enumerates a list, three things must be true simultaneously:

1. **Every enumerated word has a matching visual beat.** If the copy says three things, three shots must show those three things.
2. **Every visual beat has a matching enumerated word.** If a fourth thing gets a shot but is not named in the copy, it is an orphan.
3. **The shot order matches the word order.** If the copy names A, B, C, the shots must appear A, B, C.

### Why the third condition matters as much as the first two

An audience processes voice over and picture simultaneously. When the word and the picture arrive together, the pairing is invisible and feels intentional. When the picture arrives a beat before or after its word, the viewer experiences a small unresolved mismatch, and the item that is shown but never named reads as **an afterthought, a filler shot, or worse, a group that the film included visually but could not be bothered to mention.** **[PRINCIPLE]** In representational copy about people, that reading is not a craft error. It is a message.

### The audit procedure

1. Extract the enumerated list from the copy verbatim. Write out the items in order, numbered.
2. Extract every shot that visually presents one of those items, in shot order.
3. Build a two-column alignment table.
4. Flag three failure classes:

| Failure class | Definition | Severity |
|---|---|---|
| **Said, not shown** | An item is named in copy and has no visual beat | High. The line has nothing under it |
| **Shown, not said** | An item gets a visual beat and no word | High. Reads as an afterthought |
| **Out of order** | Both exist but the sequence differs | Medium to high. Reads as sloppy or as a deliberate demotion |

5. Propose the cheapest fix. Reordering existing shots is cheaper than rewriting copy. Rewriting one word of copy is cheaper than adding a shot. **Adding a shot is the last resort.**

### Output format

| # | Copy word (verbatim) | Word position | Shot showing it | Shot position | Status |
|---|---|---|---|---|---|
| 1 | "the first item" | 1 | 04 | 1 | Aligned |
| 2 | "the second item" | 2 | 09 | 3 | Out of order |
| 3 | "the third item" | 3 | 06 | 2 | Out of order |
| 4 | (none) | n/a | 11 | 4 | Shown, not said |

---

## B5. THE SHOT-COUNT DISCIPLINE

**The law. [PRINCIPLE] A locked shot count is a structural fact that other documents are built on. Changing it invalidates every one of them.**

### What is built on the shot count and the timecodes

| Downstream artifact | What it inherits | What breaks on a shot insert |
|---|---|---|
| The animatic | Frame count and durations | The whole timeline reflows |
| The client approval | The approved film | Approval no longer covers what is being made |
| The AD's setup count and day plan | Number of camera positions | The day gets longer, silently |
| The budget and the bid | Setups, crew hours, rental days | The bid no longer matches the plan |
| Every shot number after the insertion point | Their own identity | Slate numbers, VFX pull lists and editor bins all shift by one |
| The VFX shot list and bid | Which shot numbers are VFX shots | Every reference points at the wrong shot |
| The music and sound design | Hit points against timecodes | Every cue lands in the wrong place |
| Storyboard panel numbering | Panel-to-shot mapping | The board and the list disagree |

That is eight documents from one added shot, and on a fixed-runtime piece there is a ninth consequence: **the film does not get longer, so every other shot gets shorter.** A thirty-second piece that gains a 1.5 second shot has to find 1.5 seconds from the other nineteen shots, which means nineteen durations change, which means every one of the eight artifacts above changes twice.

### The cheap alternative: attribute reassignment

Reassigning an attribute within the existing structure touches only the departments that read that attribute.

| Change type | Structural cost | Departments re-opened |
|---|---|---|
| **Change who is in an existing shot** | Zero. Count, numbering and timecodes unchanged | Casting, wardrobe, makeup, continuity |
| **Change the framing of an existing shot** | Zero structurally | DP, art, gaffer, and any framing-rule dependency |
| **Change the location of an existing shot** | Zero structurally, real scheduling cost | AD, locations, art, gaffer |
| **Reorder existing shots** | Low. Timecodes reassign but the count holds | Editor, animatic, sound cue map |
| **Add a shot** | High. Everything above, plus renumbering, plus duration redistribution | Effectively all |
| **Remove a shot** | High, same reason | Effectively all |

### The agent's default behavior

When asked to solve a content problem in a locked shot list, the agent proposes solutions **in this order** and states explicitly which tier it is proposing: **[PRINCIPLE]**

1. Reassign an attribute in an existing shot (who, what, where, how framed).
2. Reorder existing shots.
3. Rewrite copy to match what already exists visually.
4. Split an existing shot's duration into two shots only if the beat genuinely requires two pieces of information.
5. Add a shot, and only with an explicit statement of every artifact that must now be revised.

**The agent must never silently perform step 5.** If a shot is added, the response includes the sentence: "This changes the shot count from N to N+1. The following must be re-derived:" followed by the list.

---

## B6. EXCEPTION DISCIPLINE

A standing rule plus a shot that quietly violates it produces the worst possible document state: everyone reading believes the rule holds, and one line of the plan assumes it does not. **[PRINCIPLE]**

### The rule

**Every deliberate breach of a standing rule must be labelled as an exception, in the document, at the point of breach, with a stated reason.**

Format:

> `EXCEPTION: This shot widens to a full shot. The rule "never widens past a medium" is deliberately broken here because the resolution requires the whole group to be visible in one frame. Consequence: the full room must be dressed and lit for this setup, and all six ensemble members must be present and costumed.`

Three components, all required:
1. **The rule being broken**, quoted.
2. **The reason**, stated as a creative or practical necessity, not as an accident.
3. **The consequence**, naming every department that must now re-open a decision.

### Why the consequence line is the important one

A labelled exception without its consequence is only marginally better than a silent one. The value of the label is that it triggers notification. **[PRINCIPLE]** Anyone can read the exception, see their department named, and act. If the consequence is not written, the reader has to work out for themselves whether they are affected, which is exactly the work the document exists to eliminate.

### What the agent does when it detects an unlabelled contradiction

It does not resolve it. It **surfaces it as a choice**, in this form:

> Shot 17 is a wide shot. The document states "the camera never widens past a medium." These cannot both be true. Either:
> (a) Shot 17 changes to a medium, in which case the rule stands and no department is affected, or
> (b) The rule becomes a preference and shot 17 is labelled an exception, in which case art, gaffer, wardrobe and casting must be re-notified because they have closed decisions on the absolute version.
> This is a director's call. Say which.

**[PRINCIPLE]** The agent's authority is informational, not executive. It does not choose. It makes sure the choice is made knowingly.

---

## B7. FAILURE MODES AND UNDER-SPECIFICATION TELLS

| Tell in the document | What it usually means | Real consequence | Fix |
|---|---|---|---|
| Duration column says "short", "beat", "quick" | Nobody has timed the film | The piece is over length and nobody knows yet | Assign a number to every shot. Sum. Compare to target |
| A shot number is missing from the sequence | A shot was removed without renumbering, or the list was written in two passes | The slate and the editor bin will disagree | Enumerate all numbers, close the gap or document it |
| Character column reads "people", "the team", "customers" | Casting has not happened and the shot list is hiding that | No call times, no wardrobe, no makeup slots | Replace every generic with a named person |
| Lens column blank on some rows | Written by someone thinking in composition, not optics | Wrong rental package. Wrong camera distance. Location may be too small | Assign a focal length or family to every row |
| Location described only in the section header | Shots that fall between headers have no location | A shot is discovered on the day with no home | Assign per row, never per section |
| Movement reads "camera moves beautifully through the space" | Aspiration, not instruction | Grip and AD cannot cost it | Convert to a named move plus support plus estimated setup time |
| Same shot number appears twice | Two authors, merged document | Everything downstream is ambiguous | Renumber once, publish the mapping |
| A framing rule appears in the treatment but not the shot list | The rule will be broken by accident | Departments closed decisions on a rule the shooting document does not carry | Propagate every rule into the shot list Notes column on affected rows |
| VFX shots not flagged | The VFX bid is missing shots | Unbudgeted post work | Add a VFX flag column and mark every plate |
| No sound column | Sync assumed everywhere | Sound department over-staffed or a wild track missed | Add the column |
| Shot count changed but timecodes unchanged | Someone edited content without editing structure | Durations no longer sum to runtime | Re-derive the whole timeline |
| A copy line has no shot under it | Picture ran out before words did | The line plays over black or over the wrong image | Assign a shot or cut the line |
| A shot has no copy and no action | Placeholder that survived to lock | An empty second in the finished film | Fill or delete |
| Aspect ratio noted once, globally | Multi-delivery not actually planned | Crops cut off heads and product | Note crop safety per shot |
| "Approx." anywhere in a mandatory column | The author knew it was unresolved | An unresolved item entered the locked document | Resolve or flag explicitly as open with an owner and a date |

---

## B8. TRIGGER LIST: WHAT FORCES A REBUILD AND WHAT MUST BE RE-DERIVED

Any of the following upstream events invalidates part or all of an existing shot list. The agent must detect the trigger and state exactly what is now stale. **[PRINCIPLE]**

| Trigger (upstream change) | Scope of invalidation | What must be re-derived |
|---|---|---|
| **Runtime changes** (30s becomes 20s) | Total | Every duration, every in and out, the shot count itself, the animatic, the copy timing, all sound cue points |
| **Copy or VO rewritten** | High | Copy column on every affected shot, all timings for those lines, the word-for-word alignment audit, shot order if the enumerated list changed |
| **A line of copy added or cut** | High | Durations of surrounding shots, the sum against target, possibly the shot count |
| **A framing rule added or removed** | High | Every shot's size and angle checked against the new rule, every exception relabelled, and re-notification of art, gaffer, wardrobe, makeup and casting |
| **An ensemble member added or removed** | Medium | The Character column across all shots, the representation check, casting, wardrobe and makeup schedules. Prefer reassignment over addition |
| **Casting changes** (a role recast or doubled) | Medium | Character column, makeup and wardrobe prep budget, any shot where that person's face is or is not seen |
| **A location changes or is lost** | Medium to high | Location and zone columns for the affected block, lens choices if the new space has different dimensions, movement if track no longer fits, the AD's grouping and any company move |
| **A zone within a location becomes unavailable** | Medium | Zone assignment for affected shots, possibly the shot order |
| **Lens package changes** | Medium | Lens column, camera-to-subject distances, whether every shot still fits the space |
| **Aspect ratio or delivery set changes** | Medium | Crop safety per shot, framing on every shot with edge-critical content, end-frame layout |
| **The board or animatic is approved** | Locking event | Nothing is re-derived, but the shot count and order become externally committed. All subsequent changes become client conversations |
| **A shot is added or removed** | Total on fixed runtime | Shot numbering from the insertion point, every duration, the animatic, the AD setup count, the VFX list, sound cue points, the budget |
| **Budget or shoot days reduced** | High | Setup count must fall. Decide which shots merge, which become inserts, which are cut. Then re-derive durations |
| **A VFX shot is added or descoped** | Medium | The VFX flag column, plate requirements, whether the shot must now be locked off, the post schedule |
| **Frame rate or format change on any shot** | Low but sharp | That shot's capture spec, the camera order, and the editor's conform notes |
| **Product, prop or hero item changes** | Medium | Every insert and ECU featuring it, macro lens requirements, whether a partial prop is still acceptable under the framing rules |
| **Weather, permit or safety restriction** | Variable | The affected block's location, movement (drone and crane are the first casualties), and the AD's day plan |

### The re-derivation statement

Whenever the agent applies any trigger, it outputs a short block in this exact shape before doing the work: **[PRINCIPLE]**

> **Trigger:** [what changed]
> **Scope:** [total / high / medium / low]
> **Now stale:** [list of columns, shots and downstream artifacts]
> **Re-deriving:** [what the agent is about to recompute]
> **Requires a decision from a human:** [anything the agent cannot resolve alone]

---

## B9. WHAT THIS ROLE NEEDS FROM OTHER DEPARTMENTS

| From | What is needed | Without it |
|---|---|---|
| Director | The framing rules, the coverage philosophy, and the answer to every either-or the agent surfaces | The document guesses and the guesses become commitments |
| Copywriter / creative | Locked copy with delivery timings measured in the actual language | Every duration is provisional |
| DP | Lens package, movement feasibility, setup-time estimates | The lens column is fiction |
| 1st AD | Available setups per day | The list may be undeliverable and nobody knows |
| Casting | Named performers for every Character cell | Generic names persist and no obligations get created |
| Production design | Which zones exist and are dressable | Location and zone assignments are unverified |
| VFX | Which shots are plates and what they require | Unbudgeted post work |
| Editor | Whether the intended cut actually assembles | Missing transitions found after wrap |

## B10. WHAT THIS ROLE OWES OTHER DEPARTMENTS

| To | What is owed |
|---|---|
| 1st AD | A stable setup count and honest per-setup complexity notes |
| DP and camera | A lens value on every row and a movement description that names a support |
| Casting, wardrobe, makeup | A Character column with real names, and immediate notification whenever a name or a framing rule changes |
| Art and locations | A zone assignment on every row and explicit notice of every shot that widens |
| Sound | A capture requirement on every row |
| VFX | A flag on every plate and a locked-off note where required |
| Editor | Durations that sum to the target, and a stated shot order |
| Producer and client | A shot count that does not move without a written change note |

---

## B11. STANDARD TENSIONS AND TYPICAL RESOLUTIONS

| Tension | Typical resolution |
|---|---|
| Director wants more coverage, AD has no time | Convert coverage requests into inserts that can be shot at any point, or into a second-unit list |
| Client wants an extra product shot on a locked 30s | Reassign an existing insert rather than add. If genuinely additional, state which shot loses its duration |
| The ensemble is not represented and the count is locked | Reassign Character values in existing shots. Never add first |
| A framing rule blocks a shot everyone wants | Label it an exception with its consequence, and notify every affected department in the same message |
| Copy enumerates four things, the film has time for three | Cut the copy item, not the shot. The word is cheaper to lose than the second |
| A shot has no lens because the package is not set | Assign a lens family, mark it provisional with an owner and a date, and re-audit on lock |
| Two documents disagree on shot count | The most recently approved external artifact wins. Usually the animatic |

---

## B12. THE AGENT'S STANDING BEHAVIOURAL RULES

1. **Enumerate, never skim.** Ranges hide gaps. Check every shot number individually against every mandatory attribute.
2. **Names, not categories.** "People," "the team," "a customer" are unresolved casting, and unresolved casting produces no obligations anywhere.
3. **Structure is expensive, attributes are cheap.** Always propose the reassignment before the addition.
4. **Never break a rule silently.** Label exceptions with rule, reason and consequence.
5. **Never change a shot count without listing what it invalidates.** Eight downstream artifacts is the normal figure, not an exaggeration.
6. **Durations must sum, and the sum must be stated.** Every version of the list carries the arithmetic in plain sight.
7. **Words and pictures must align in count, content and order.** A shown-but-not-said item is a finding, not a nuance.
8. **Framing rules are specs.** Treat "never widens past X" the way a build spec treats a load limit.
9. **Surface choices, do not make them.** The role is informational. The director decides.
10. **Every finding names its blocked department.** A gap without a consequence gets ignored. A gap with a named department gets fixed.

---

**End of Craft Bible 15.**
