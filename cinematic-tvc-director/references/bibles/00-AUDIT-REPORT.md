# 00 AUDIT REPORT: Film Craft Bibles

**Scope:** Narrow negative-brief audit of the 18 craft bibles (01 to 18), ~194,000 words.
**Date:** 2026-07-25
**Method:** Targeted grep across all 18 files, selective reading of needs/owes tables, claim-tag blocks, technical-claim passages and sourcing notes. This is not a general quality review. Only the five named failure classes were hunted.
**Nothing was fixed. This is a report only.**

---

## FAILURE CLASS 1: CROSS-DEPARTMENT DISAGREEMENT

The 18 files were written blind and in parallel. Each department bible declares what it NEEDS from others and what it OWES others. Those declarations were compared as reciprocal pairs. Below are the pairs that do not reconcile.

### 1.1 DOP and Colorist both claim to hand the other the show LUT [HIGH]

**Files:** `01-Director-of-Photography.md` (line 386), `02-Colorist.md` (line 606)

01 OWES table:
> | **Colorist** | The show LUT, the on-set CDLs, exposure and intent notes per scene, and attendance in the grade |

02 OWES table:
> | **Cinematography** | The show LUT, plus a demonstration of what can be added later (diffusion, halation, film texture) so they can decide what to shoot clean **[SOURCED: Shoul, Doyle]** | At the test |

**Why it is a problem.** The show LUT is the single most consequential shared artifact in the pipeline. Six other files (06, 07, 09, 04, 02, 01) declare a dependency on it. Two departments each believe they are the author and the other is the recipient. In practice this produces either two competing LUTs or none, and every downstream file that says "show LUT if one exists" inherits the ambiguity.

**Recommended fix.** Assign LUT authorship once, in a single file, and make the other file's entry explicitly a receipt rather than a delivery. The craft-standard answer is that the colorist builds the LUT at the camera test from the DP's stated intent, and the DP owns approval. State that sentence identically in both files.

### 1.2 DOP and Colorist disagree on who supplies the delivery colour space [MEDIUM]

**Files:** `01` (line 364), `02` (lines 593, 599)

01 NEEDS:
> | **Colorist** | Involvement during prep, not after; agreement on the show LUT; the delivery colour space; whether on-set CDLs will be honoured |

02 NEEDS:
> | **Production / Client** | Full delivery matrix, per-platform technical specs, review and approval chain | Before colour space lock |

**Why it is a problem.** The DP expects the colorist to supply the delivery colour space. The colorist treats the delivery matrix as an input received from production. Neither file states that the colorist derives the colour space from production and then passes it to the DP, so the chain has an unowned link.

**Recommended fix.** Add a row in 02's OWES table: "Cinematography: the delivery colour space, once derived from the production delivery matrix."

### 1.3 VFX and Colorist invert the colour-space handoff [HIGH]

**Files:** `04-VFX-and-Motion-Graphics.md` (line 412), `02-Colorist.md` (line 594)

04 NEEDS:
> | **Colorist** | Working colour space, show LUT, whether VFX delivers scene-linear or display-referred, node structure across seams | Screen glow, black lift and brand colour accuracy are all colour-space dependent. Delivering into the wrong space silently destroys brand colour |

02 NEEDS:
> | **VFX** | Plate list, which shots are comps, delivery schedule for finals, confirmation the show LUT does not break their keys, and the colour space they will work and deliver in | Before LUT distribution |

**Why it is a problem.** This is a clean inversion. VFX says the colorist dictates the working colour space and the scene-linear versus display-referred decision. The colorist says VFX declares it. Both files also mark the item as a hard blocker. Two departments each waiting on the other is a deadlock, and 04's own text warns that getting this wrong "silently destroys brand colour."

**Recommended fix.** The colorist should own the colour pipeline definition and VFX should confirm compliance. Rewrite 02's VFX NEEDS row to request confirmation of compliance rather than the space itself, and add "working colour space and node structure across seams" to 02's OWES-to-VFX rows.

### 1.4 Production Design and Wardrobe each claim the other must move first on palette [HIGH]

**Files:** `06-Costume-and-Wardrobe.md` (lines 368, 381), `09-Production-Design-and-Locations.md` (lines 474, 494)

06 NEEDS:
> | **Production Design** | Set palette per location as named colours or hexes. Dominant surface values. Key set-dressing colours in the background of principal coverage. Floor and wall finishes. | A wardrobe palette chosen without this will either disappear into the set or fight it. **This is the hardest blocker and it is non-negotiable.** |

09 NEEDS:
> | **Wardrobe** | Palette in physical samples, per character, per scene | Wall and large-surface hue and value. **Do not paint before this exchange.** |

**Why it is a problem.** This is the predicted palette clash and it is a genuine circular deadlock, stated in maximal language on both sides. 06 calls the dependency "non-negotiable"; 09 issues a prohibition ("do not paint before this exchange"). Each file's OWES table mirrors the same direction, so both agents will correctly conclude they are blocked by the other. Neither file contains a tie-breaker, a sequencing rule, or an acknowledgment that the other department believes it goes first.

**Secondary problem: medium mismatch.** 06 requests the set palette "as named colours or hexes"; 09 delivers it as "physical samples plus photographed camera tests." 09 requests wardrobe palette "in physical samples"; 06 owes "the wardrobe palette per character per location" with no medium named. The two departments are not agreeing on the artifact, only on the noun.

**Recommended fix.** Add an identical arbitration sentence to both files. The craft-standard resolution is that the set anchors first because paint and build have longer lead times and higher sunk cost, wardrobe responds, and both are re-validated jointly at the camera test. Also fix the medium so both sides specify hexes plus physical samples plus a camera test frame.

### 1.5 Makeup and Wardrobe assert a detailed technical dependency on the DP that the DP never acknowledges [HIGH]

**Files:** `07-Makeup-and-Hair.md` (line 356), `06-Costume-and-Wardrobe.md` (line 369), `01-Director-of-Photography.md` (line 377)

07 NEEDS:
> | **Director of Photography** | Format, resolution, sensor size, lens set, typical stop, lighting plan per scene (colour temperature, hardness, practicals), show LUT, **and the tightest framing per character** | Determines product weight, finish, blend tolerance, and whether a face is even seen |

06 NEEDS:
> | **Director of Photography** | Lighting colour temperature per scene. Source type. **Framing rule per character (tightest and widest).** Camera and lens package. Show LUT if one exists. |

01 OWES, in full:
> | **Wardrobe / HMU** | Test footage under the show LUT before the shoot; clear guidance on what will and will not photograph |

**Why it is a problem.** Two departments both declare a hard, itemised technical dependency on the DP. The DP's entire obligation to them is one row promising test footage and "clear guidance." Format, resolution, sensor size, lens set, typical stop and tightest framing per character are nowhere in 01's OWES table for HMU or wardrobe. 07 states that without the tightest framing it cannot determine "product weight, finish, blend tolerance," and its B5 makes per-character enumeration "non-negotiable," so this is a blocking gap rather than a nicety.

**Recommended fix.** Expand 01's Wardrobe/HMU OWES row to enumerate the items 06 and 07 actually ask for, or split it into two rows.

### 1.6 Three-way disagreement on who owns "tightest framing per character" [MEDIUM]

**Files:** `06` (line 369), `07` (line 356), `15-Shot-List-and-Storyboard.md` (line 746), `01` (line 377)

15 OWES:
> | Casting, wardrobe, makeup | A Character column with real names, and immediate notification whenever a name or a framing rule changes |

**Why it is a problem.** 06 and 07 both name the DP as the source of the framing rule. 15 says the shot list supplies framing-rule changes to wardrobe and makeup. 01 supplies neither. Three files, three different owners for the same input, and no file cross-references another.

**Recommended fix.** Name the shot list as the single carrier of framing per character and per shot, name the DP as its author, and make 06 and 07 request it from the shot list rather than from the DP directly.

### 1.7 Editor and VO Casting form a circular lock deadlock [HIGH]

**Files:** `03-Editor.md` (lines 429, 435), `08-VO-Casting-and-Voice-Direction.md` (lines 358, 370)

03 NEEDS, plus its hard rule:
> | **VO / Casting** | Final approved read, delivered with pauses intact, alternate tempo reads, isolated takes per line, pronunciation-locked mandatory wording | The read's duration and its breathing room define the film's structure when VO runs full runtime |
>
> **Hard rule for the agent: if the VO is not final and it runs full runtime, nothing downstream of step 4 in B2 can lock. Say so explicitly rather than proceeding quietly.**

08 NEEDS:
> | **Editor** | The locked runtime, the timing map of where VO sits and where picture is clear, and a cut with the scratch track in it | Pace is derived arithmetic, not taste. Without timing there is no pace |

**Why it is a problem.** The editor declares a hard rule that nothing locks without a final VO. VO declares that pace cannot be derived without a locked runtime from the editor. Each names the other as the blocking upstream, and each states the dependency as non-optional. Two agents running these files against the same project will both correctly report themselves blocked and the pipeline will stop.

**Partial mitigation that neither file states.** 08 OWES the editor "a scratch track early, at the intended pace, so the cut is built to real timing rather than to a guess." That is the intended escape hatch, but 03's hard rule does not acknowledge the scratch track as sufficient for provisional locking, and 10 (Sound) explicitly rejects the scratch: "The final read, **not a scratch**, with its actual timing."

**Recommended fix.** Write the sequence explicitly and identically into 03, 08 and 10: scratch track at target pace, offline built to it, VO recorded to the offline, picture conformed to the final read, then lock. Amend 03's hard rule to permit provisional lock against a scratch and to name what re-derives when the final read arrives.

### 1.8 Sound never acknowledges VFX, Production Design, Locations or the 1st AD [HIGH]

**File:** `10-Sound-Design-and-Music.md` (B3 lines 323 to 336, B4 lines 338 to 348)

10's complete counterparty list across both tables: Editor, VO, Director, VFX/Motion, Production Sound, Producer, Client/Brand.

Dependencies asserted on Sound by other files that 10 does not carry:
- `09-Production-Design-and-Locations.md` line 480 NEEDS from **Sound**: "Noise floor tolerance, whether HVAC must be off, whether hard surfaces are a problem." 10 has no Production Design or Locations row in either direction.
- `13-First-AD-and-Line-Producer.md` line 767 NEEDS from **Sound**: "Any location noise problem, any playback requirement, any radio mic count that affects wardrobe." 10 has no 1st AD row in either direction.
- `15-Shot-List-and-Storyboard.md` line 747 OWES **Sound**: "A capture requirement on every row." 10 does not list the shot list as an input.

**Why it is a problem.** Sound is named as an upstream authority by three other departments and acknowledges none of them. An agent running 10 will never volunteer location acoustic constraints, which 09 says it cannot lock a location without.

**Recommended fix.** Add Production Design/Locations, 1st AD and Shot List rows to both of 10's tables.

### 1.9 VFX does not acknowledge Sound, but Sound asserts a hard dependency on VFX [HIGH]

**Files:** `10` (line 331), `04` (B3 line 405 to 415, B5 line 468 to 480)

10 NEEDS:
> | **VFX / Motion** | A frame-numbered list of every screen event, UI state change, reveal, and transition that needs audio, delivered before lock | A screen event discovered at the mix is a re-open |

04's OWES table lists: Director, DP, Gaffer, 1st AD, Art Department, Playback operator, Editor, Colorist, Client/Brand. **No Sound row.** 04's NEEDS table has no Sound row either.

**Why it is a problem.** 10 OWES VFX "confirmation of which screen events will be sonified, so motion can time the visual to the sound where useful," so the relationship is asserted from one side only. 04 builds an elaborate build-count discipline enumerating every screen state and never exports that list to Sound, which is precisely the artifact 10 requires.

**Recommended fix.** Add a Sound row to both of 04's tables. The build count already contains the required data.

### 1.10 Four files give four different owners for location acoustics [MEDIUM]

**Files:** `09` (line 480), `10` (B3/B4), `11-Director.md` (line 471), `13` (line 767)

- 09 needs it from Sound.
- 11 OWES it to Sound: "| **Sound design and music** | ... | Pacing with named hold points, tone, whether the film is scored or sourced, and **any location acoustic reality** |"
- 13 needs it from Sound.
- 10 never mentions it as an input or an output.

**Why it is a problem.** The Director's file claims to hand location acoustics to Sound. Production Design and the 1st AD both expect to receive it from Sound. Sound itself is silent. The object has three claimed recipients, one claimed supplier who is not a location expert, and no acknowledged owner.

**Recommended fix.** Assign it to Locations (inside file 09), delivered to Sound and to the 1st AD, with the Director receiving it rather than issuing it.

### 1.11 Makeup and the 1st AD each ask the other for the chair count [MEDIUM]

**Files:** `07` (line 362), `13` (line 762)

07 NEEDS:
> | **1st Assistant Director** | Call times, day-out-of-days, **number of chairs**, hours available before crew call, background counts per day, and removal windows |

13 NEEDS:
> | **Hair and Makeup** | Time band per performer, **chair count required**, artist count required, touch-up cadence during the day | Chair-hours |

**Why it is a problem.** Direct inversion on a single quantity. 07 treats the chair count as a production constraint handed down; 13 treats it as a departmental requirement handed up. 07's OWES to the 1st AD is only "accurate per-character timings," so the artist count and chair count 13 asks for are never supplied.

**Recommended fix.** Makeup derives the chair and artist count from its own timings against the AD's call window. Make 07 own the number and the AD own the window, stated in both files.

### 1.12 The 1st AD asks several departments for units they never agree to supply [MEDIUM]

**File:** `13` B4 (line 751), against 01, 06, 07, 09

| 13 asks for | From | What the source file actually owes |
|---|---|---|
| "crew size required, package list" in "Hours and headcount" | Cinematographer | 01 owes only "Realistic lighting time per setup, the pre-light and rig requirements" |
| "Looks per performer, fitting hours, alterations lead time, on-day change count and duration, standby headcount" | Costume | 06 owes only "Change count per character, time required per change, and any change that needs more than the standard window" |
| "Zone count per location, dressing hours, build days, strike and restore time, load-in requirements" in "Hours, days, vehicle count" | Production Designer / Art | 09 owes build days, dressing days, load-in and strike durations, zone dependencies, swing set turnaround. No zone count, no vehicle count |
| "Confirmed addresses, access hours, permit status, power availability, parking, load-in route, nearest hospital, restrictions" | Locations | 09 covers Locations but its OWES table has **no 1st AD row for location logistics at all** |

**Why it is a problem.** 13 states "**[PRINCIPLE]** If a department cannot give a number, that is the finding," which means an agent running 13 will correctly report four blocking gaps on every project, permanently, because the source files never promised those numbers.

**Recommended fix.** Reconcile line by line. The location logistics gap is the most serious, since permits, power and nearest hospital are safety-critical and currently owed by nobody.

### 1.13 VFX and the 1st AD agree on the handoff but state it in incompatible units [LOW]

**Files:** `04` (line 474), `13` (line 768)

04 OWES: "| **1st AD** | Time requirements, **in minutes**, per setup: clean plates, survey passes, HDRI, grids, ball reference |"
13 NEEDS from VFX/Post: unit column reads "**Additional setups**".

**Why it is a problem.** Minutes added to an existing setup and an additional setup are different schedule objects with different cost consequences. 04's own rule is that the supervisor "must have asked in minutes, not in principle."

**Recommended fix.** Standardise on minutes-per-setup plus a separate count of genuinely additional setups.

### 1.14 Production Design cannot lock without a lens plan the DOP never agrees to give [MEDIUM]

**Files:** `09` (line 475), `01` (line 375)

09 NEEDS:
> | **DP** | Lens plan per zone, lighting approach, contrast intent, camera positions and movement, whether ceilings and floors are seen | Dressing density, wall values and sheens, practical positions, **which walls need to be built at all** |

01 OWES:
> | **Production Design** | Early notification of which walls must fly, which practicals must be swapped, which surfaces cannot be gloss, and where the camera will actually be so build effort is not wasted |

**Why it is a problem.** 01 gives camera position but not the lens plan, contrast intent, or whether ceilings and floors are seen. 09 says build scope depends on all of them.

**Recommended fix.** Add the lens plan per zone and the ceiling/floor visibility answer to 01's Production Design OWES row.

### 1.15 DOP and Production Design ask each other the same practicals question in opposite directions [LOW]

**Files:** `01` (line 358), `09` (line 476)

01 NEEDS from Production Design: "whether the art dept will accept a dimmer/bulb swap"
09 NEEDS from Gaffer: "whether the fixture bulbs will be replaced"

**Why it is a problem.** Same decision, routed through two different counterparties, resolved by neither file.

**Recommended fix.** Make it a single agenda item owned by the gaffer at the tech scout, referenced identically in 01 and 09.

### 1.16 Colorist and Wardrobe disagree on the scope of the garment list [MEDIUM]

**Files:** `02` (line 592), `06` (line 383)

02 NEEDS from Wardrobe: "Palette per character per scene block, fabric samples, any fluorescent dyes, saturated blues, metallics, high-contrast patterns"
06 OWES Colorist: "A named list of garments with critical colour identity, so they are protected in the grade rather than sacrificed. Flag any garment adjacent to skin-tone hue."

**Why it is a problem.** The colorist requests the full palette plus physical samples. Wardrobe offers only the subset it considers colour-critical. The colorist's stated failure consequence is "out-of-gamut costumes; skin/costume conflicts," which are discovered precisely in the garments wardrobe did not think were critical.

**Recommended fix.** Make 06 owe the full palette, with the critical subset flagged inside it.

### 1.17 Casting needs from the Director two things the Director does not list as owed [LOW]

**Files:** `05-Casting-Director.md` (lines 401, 403), `11` (line 469)

05 NEEDS from Director: "whether improvisation is expected" and "Which relationships are load-bearing."
11 OWES Casting: "The one-sentence interpretation, the tone, and an explicit statement of whether these are actors or real people."

**Why it is a problem.** 05 says the improvisation answer determines whether "everyone in frame [must] be an actor, not an extra (the Finn rule)," which is a budget-level consequence. It is not in the Director's owed set.

**Recommended fix.** Add both items to 11's Casting OWES cell.

### 1.18 Director and Colorist disagree on the direction of reference-passing [MEDIUM]

**Files:** `11` (line 472), `02` (line 588)

11 NEEDS from Colour: "A reference response tied to the stated tone and polish, **not to a look book**"
02 NEEDS from Director: "Story intent, emotional arc, **references (named)**, explicit negatives, approval authority chain | Before camera test | Look is guesswork; grade gets rebuilt late"

**Why it is a problem.** The colorist declares that named references from the Director are a hard prerequisite before the camera test. The Director's file explicitly refuses to supply a look book and instead demands the colorist generate references in response to abstract tone and polish statements. Both are defensible positions; together they are a stalemate at the camera test, which is the one gate both files call decisive.

**Recommended fix.** Distinguish "named references as evidence of intent" (which the Director should supply) from "a look book to be copied" (which 11 is right to refuse). Say so in both files.

### 1.19 Files 16 and 15 each need the object they also owe [MEDIUM]

**Files:** `15` (lines 736, 744), `16-Production-Bible-and-Master-Tables.md` (lines 976, 992)

15 NEEDS from Casting: "Named performers for every Character cell." 15 OWES Casting: "A Character column with real names."
16 NEEDS from Costume, makeup and hair: "Change counts, prep times and continuity requirements." 16 OWES Costume, makeup and hair: "Per-person treatment, change counts and prep times, with continuity stated by shot."

**Why it is a problem.** In both files the same named object appears on both sides of the same relationship with no directionality rule. An agent cannot tell whether it is the source or the sink.

**Recommended fix.** State the direction explicitly. The bible and shot list aggregate and redistribute; say "receives from X, republishes in canonical form to X and to all others."

### 1.20 Files 13 and 16 both claim to be the master aggregator, and form a loop [MEDIUM]

**Files:** `13` (B4), `16` (B12, B13)

16 NEEDS from 1st AD: "The schedule and the unit structure | Shoot day columns cannot be filled and no axis can be verified"
16 OWES 1st AD: "Both axes, complete, so people and spaces can be scheduled against independently"
13 NEEDS the same departmental numbers directly from each department and never mentions a production bible.

**Why it is a problem.** 16 both derives from and feeds the schedule. 13 does not know 16 exists. Two documents collect the same quantified inputs from the same departments with no stated precedence, so departments will be asked twice and may answer differently.

**Recommended fix.** Name one as canonical. The standard answer is that the bible is the canonical store and the schedule is derived from it, with the AD's day-shape constraints fed back in as a second pass.

---

## FAILURE CLASS 2: CONTRADICTORY CRAFT CLAIMS

### 2.1 Crop factor: 01 and 17 give incompatible Super 35 numbers, and 01 contradicts its own table [HIGH]

**Files:** `01` (lines 66 to 79), `17` (lines 231, 242)

01 publishes ALEXA 35 (Super 35) as 27.99 mm wide, diagonal ~33.96 mm, and ALEXA LF as 36.70 mm wide, diagonal ~44.7 mm. It then states:
> | Super 35 → LF/full frame | **~1.27x** | A 35mm on S35 frames like a ~44mm on LF |

17 states:
> A document is written around a camera with a Super 35 sized sensor, **roughly 24.9mm wide** in its open gate.
> ... the crop factor between those widths is **around 1.45**.

**Two separate problems.**

1. **Internal arithmetic error in 01.** 01's own figures give 44.7 / 33.96 = 1.316 by diagonal and 36.70 / 27.99 = 1.311 by width. Neither is 1.27. The stated 1.27x does not follow from the table immediately above it. The worked example in the same row is also inconsistent: at 1.27x a 35mm maps to 44.5mm, which the row states, but at the file's own 1.31x it maps to ~46mm.
2. **Cross-file contradiction.** 17's 1.45 is arithmetically correct for its own premise (36 / 24.9 = 1.446), but its premise is the classic 4-perf Super 35 academy width, while 01's premise is the ALEXA 35 open gate. Both files call the format "Super 35" and neither flags the ambiguity. An agent reading 01 and an agent reading 17 will compute different lens lists from the same camera swap, and 17's entire worked example is a lens-list recomputation.

**Why it is a problem.** 17 line 261 states the tell for a bad change is "a document in which a technical name has been consistently updated and no dependent number has changed." The set currently contains two dependent numbers that disagree by 14 percent, which is a whole lens position.

**Recommended fix.** Correct 01's 1.27x to ~1.31x. Add to both files a sentence that "Super 35" is not a single dimension and that the crop factor must be recomputed from the actual open-gate width of the specific body, with both the 24.9 mm and 27.99 mm cases named.

### 2.2 VO read rate: 08 and 18 give non-overlapping working figures [MEDIUM]

**Files:** `08` (line 127), `18-Creative-Brief-and-Concept.md` (line 214)

08:
> Conversational English narration lands roughly in the **140 to 170 words per minute** band. An urgent retail read pushes past 180. An interior or documentary read sits at 110 to 130 and sometimes lower.

18:
> Spoken voiceover in a commercial register runs, as a working figure, at roughly **two to two and a half words per second** in English, slower for a warm or intimate read, faster for a listing or urgent read.

**Why it is a problem.** 18's figure converts to 120 to 150 wpm. 08's conversational band is 140 to 170 wpm. The bands overlap only across 140 to 150, and the two files use different units so the discrepancy is invisible to a reader. Both figures are used for the same operation: checking whether locked copy fits a locked runtime. 03 line 148 calls this "the single most useful number to state in an editor's plan, because it is directly checkable against the VO's actual word count and read speed," so three files depend on a number that two of them state differently.

**Recommended fix.** Adopt one band and one unit across 03, 08, 15 and 18. Cross-reference 08 as the owning file.

### 2.3 Doctrinal conflict on coverage: 15 champions minimal coverage, 03 declares it uncuttable [MEDIUM]

**Files:** `15` (lines 174 to 178, 357 to 364), `03` (line 427)

15 presents minimal coverage approvingly and at length, citing Hitchcock, Bong Joon-ho, Ridley Scott and Villeneuve as "contemporary evidence that limited coverage is a live professional practice."

03 NEEDS from DP/Camera:
> | **DP / Camera** | Full coverage plan, confirmed captured shot list, sizes and angles per beat ... | Coverage determines which cuts are available at all. **A beat with one angle cannot be paced, only trimmed** |

**Why it is a problem.** These are two real and opposed schools, and both files state their position as operating doctrine without acknowledging the other. 15 does have a partial hedge (it NEEDS from Editor "Whether the intended cut actually assembles") but never states the cost of the pre-decided approach in editorial terms, and 03 never allows for a deliberately uncovered beat.

**Recommended fix.** Add a shared paragraph to both: pre-decided coverage is legitimate when the cut is designed and boarded, and it transfers risk from the shoot to the board. Name the editor's sign-off on the board as the control.

### 2.4 The never-show-the-mouth VO rule has no carrier in the shot list [MEDIUM]

**Files:** `08` (A5 lines 107 to 119, plus lines 302, 337, 390, 425, 519, 531), `15` (B2 template, B9, B10)

08 states the rule at maximum force:
> There is a rule that experienced VO-heavy productions apply almost reflexively: **never show the mouth of whoever is speaking the voice-over.**
> ... **3. In AI-generated pipelines the rule hardens from advisable to near-mandatory.**
> Any speaking mouth in frame: [NO is the required default. If YES, escalate.]

**Why it is a problem.** 08 makes this a project-defining constraint requiring escalation to Director and Producer, and lists "A speaking mouth added to frame" as a trigger that re-opens "the entire premise." The shot list (15) is the only document that records what is actually in frame per shot. Its field set and its OWES table contain no mouth-in-frame or lip-sync-exposure flag, and 08 does not list the shot list among its inputs. The rule is therefore unenforceable by the document that would catch a violation.

**Recommended fix.** Add a "speaking mouth in frame Y/N" column to 15's shot list template, and add the shot list to 08's B3 NEEDS table.

### 2.5 Colorist and Sound disagree with each other and with the Editor about whether a scratch VO is acceptable [MEDIUM]

**Files:** `08` (line 358), `10` (line 328), `03` (line 431)

10 NEEDS: "| **VO / Voice Direction** | **The final read, not a scratch**, with its actual timing ... | Read pacing sets the piece's rhythm. Recasting invalidates the entire mix approach. |"
08 OWES Editor: "A scratch track early, at the intended pace, so the cut is built to real timing rather than to a guess."

**Why it is a problem.** Part of the same deadlock as 1.7, but stated as a craft claim rather than a dependency. Sound rejects the scratch outright; VO offers the scratch as the enabling artifact; the Editor is caught between.

**Recommended fix.** Distinguish the scratch as valid for offline timing and invalid for mix design. State it in all three files.

### 2.6 Checked and found consistent: colour temperature doctrine [CLEAN]

01, 02, 06, 07 and 09 were compared on colour temperature and palette doctrine. They agree. 02 line 267 gives domestic practicals at "roughly 2700 to 3000K" and screens and daylight at "6500K and up"; 09 line 273 gives "3200K tungsten" and "5600K daylight"; 06 and 07 both route colour approval through a camera test under the show LUT. No contradiction found. See CHECKED AND CLEAN.

### 2.7 Checked and found consistent: what a colorist can and cannot fix [CLEAN]

02's A3 tables (lines 73 to 110) were compared against 01, 06, 07 and 09. No file claims a fix that 02 lists as impossible. 07 line 360 explicitly defers ("leaving something to post that post cannot fix"); 06 line 371 explicitly defers ("A garment approved on an ungraded monitor is not approved"); 09 line 693 treats a palette pivot as requiring a full camera-test re-run rather than a grade fix. The set is aligned on this. See CHECKED AND CLEAN.

### 2.8 Checked and found consistent: depth-of-field physics [CLEAN]

01 lines 81 to 89 state the crop-factor myth correctly ("Larger sensors do not by themselves create shallower depth of field ... a consequence of the longer focal lengths required to match framing, not of the silicon"). 17 line 247 states the matched-field-of-view case ("Depth of field at a matched field of view and matched aperture becomes shallower on the larger format"), which is 01's point 2 and not a contradiction. Only the crop-factor arithmetic (2.1) is wrong.

---

## FAILURE CLASS 3: BRAND OR PROJECT CONTAMINATION

**Result: essentially clean. Two borderline hits, zero hard hits.**

Case-insensitive grep across all 18 files for `dedo`, `DLight`, `Nour`, `Mona`, `Karim`, `Sara`, `Youssef`, `Laila`, `Layla`, `Hassan`, `Dalia`, `Elrouby`, `Nada Arafa`, `Mohamed Tarek`, `Marigold`, `Torch Red`, `Aztec Purple`: **no matches in any file.**

Extended sweep for regional and agency residue (`Egypt`, `Egyptian`, `Cairo`, `Arabic`, `Gulf`, `Khaleeji`, `MENA`, `Ramadan`, `Heliopolis`, `Merghany`, `Osoul`, `EGP`) returned exactly two hits.

### 3.1 Regional residue in file 15 [LOW, borderline]

**File:** `15-Shot-List-and-Storyboard.md` line 259

> **The script or copy is locked to that runtime.** Voice over is timed by reading it aloud at delivery pace. **Egyptian and Gulf Arabic** voice over, like any language with different syllable density from English, will not run at the same length as an English script of the same word count, and the timing must be measured on the actual language of delivery, not estimated. **[PRINCIPLE]**

**Why it is a problem.** The craft point is generic and correct. The two named dialects are not. This is the only place in 194,000 words where a specific market is assumed, and it identifies the authoring agency's home market. In a bible intended to be fully generic it reads as leaked context.

**Recommended fix.** Replace "Egyptian and Gulf Arabic" with "Arabic, or any language with a different syllable density from the source language." Note that file 18 line 214 already handles the identical point generically ("Arabic and other languages have different syllable densities and must be timed independently"), so 18 is the model.

### 3.2 File 18 line 214, checked and acceptable [CLEAN]

18's mention of Arabic is generic and paired with "and other languages." No fix needed. Listed here only so the grep hit is accounted for.

---

## FAILURE CLASS 4: MISSING REQUIRED STRUCTURE

Required elements: Part A, Part B, a claim-tagging convention or equivalent, a vocabulary glossary, a failure-modes section, an output template, a trigger list or table, and needs/owes sections.

**All 18 files have: Part A, Part B, a vocabulary glossary, a failure-modes section, an output template, and a trigger list.** Verified by heading grep across all files. No file is missing any of those six.

### 4.1 Files 14, 17 and 18 have no needs/owes sections at all [HIGH]

**Files:** `14-Directors-Treatment.md`, `17-Production-Locks-and-Decision-Records.md`, `18-Creative-Brief-and-Concept.md`

Full B-section inventories:

- **14:** B1 Intake, B2 Section-by-section output template, B3 Internal-consistency requirement, B4 Cross-document sync checklist, B5 Failure modes, B6 Trigger table, B7 Pre-submission audit. **No needs, no owes.**
- **17:** B1 through B12, covering lock record format, lock audit, premise change, re-derivation, consolidation, handoff, triggers, failure modes, templates, behavioural rules. **No needs, no owes.** B8 "The handoff protocol" is the nearest equivalent but it describes a document-to-document handoff, not departmental reciprocity.
- **18:** B1 Intake, B2 Stage-by-stage, B3 Traceability, B4 Audience naming, B5 Removal protocol, B6 Failure modes, B7 Templates, B8 Trigger table, B9 Pre-release audit. **No needs, no owes.**

**Why it is a problem.** Files 15 and 16, which are the same class of artifact (documents rather than departments), both do have needs/owes sections (15 B9/B10, 16 B12/B13). So the omission is inconsistent within the document-bible subset, not a principled exclusion. It also means the three files that sit furthest upstream (brief, treatment, locks) declare no obligations to anyone, while eight downstream files declare dependencies on the brief, the treatment and the locks.

**Recommended fix.** Add needs/owes tables to 14, 17 and 18, modelled on 15 B9/B10.

### 4.2 Four different claim-tagging conventions across the set [MEDIUM]

All 18 files have a convention, so none fails the requirement outright, but they are not interoperable:

| Convention | Files |
|---|---|
| `**[SOURCED]** / **[PRINCIPLE]**` declared in a tag table | 02, 03, 06, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18 |
| `` `[SOURCED]` / `[PRINCIPLE]` `` in backticks, declared in prose | 07 |
| `` `[F]` = Fact / `[P]` = Principle `` | 04 |
| `**[craft principle]**` only, with sourcing handled by an inline prose note and no positive sourced tag | 01, 05 |

**Why it is a problem.** 01 and 05 have no machine-findable marker for sourced claims. Their note says attribution "is inline," so a consuming agent cannot separate sourced from principle by pattern, only by reading. 04's `[F]`/`[P]` will not match a grep for `[SOURCED]`. Any downstream tool that filters on claim confidence will silently drop 01, 04, 05 and 07.

**Recommended fix.** Normalise all 18 to `**[SOURCED]**` and `**[PRINCIPLE]**` in bold, unbackticked.

### 4.3 Files 06, 11 and 13 declare the two-tag convention and then barely use one of the tags [MEDIUM]

Tag counts:

| File | `[SOURCED]` | `[PRINCIPLE]` |
|---|---|---|
| 06 Costume | **1** | 9 |
| 11 Director | **1** | 24 |
| 13 First AD | **3** | 27 |
| 14 Treatment | **1** | 37 |

Against, for comparison, 12 Script Supervisor at 52 sourced, 08 VO at 38, 03 Editor at 35.

**Why it is a problem.** These files contain plainly sourced material that carries no tag. Two examples:

`06-Costume-and-Wardrobe.md` line 38, untagged verbatim quote from a named practitioner:
> Arianne Phillips, who designed *Once Upon a Time in Hollywood* and *A Single Man*, describes the same tool from the actor's side: costume details act as *"a kind of beam-me-up to help access that character."*

`11-Director.md` line 289, untagged claim about a named living director:
> | **Greta Gerwig** | Publicly frames directing as a fundamentally collaborative act rather than a solo authorial one, and is documented as letting casting reshape adaptation ...

A file that declares "[SOURCED] means traceable to a named practitioner ... Attribution is inline" and then leaves a direct quotation from a named practitioner untagged has broken its own contract. 07's note warns "Do not blur the two when you quote this document to a client or a director," which is exactly the risk here.

**Recommended fix.** Sweep 06, 11, 13 and 14 and tag every named-practitioner claim and every verbatim quotation.

---

## FAILURE CLASS 5: SOURCING HONESTY

Files 15, 16, 17 and 18 were written without live web research. They nonetheless carry 26, 5, 24 and 5 `[SOURCED]` tags respectively. Each tagged claim in those four files was inspected. Below are the ones that are specific and checkable enough to be worth verifying before this material is quoted to a client or a director.

### 5.1 HIGH RISK: 15 attributes Spielberg storyboard work to David Lowery

**File:** `15` line 178

> Steven Spielberg sits between the two poles. He is one of the most heavily boarded directors in the business, working over decades with artists such as **Ed Verreaux and David Lowery** on sequence design, yet he retains the ability to invent on the day. **[SOURCED]**

**Why it is high risk.** Ed Verreaux is a genuine and well documented Spielberg storyboard artist and production designer. David Lowery is a film director (*A Ghost Story*, *Pete's Dragon*, *The Green Knight*), not a Spielberg storyboard artist. This has the shape of a name conflation. It is presented as [SOURCED] in a file written without live verification, and it names a living working professional.

**Recommended fix.** Verify or remove the second name. Verreaux alone carries the point.

### 5.2 HIGH RISK: 15 attributes Full Metal Jacket to Harold Michelson

**File:** `15` line 206, repeated in the practitioner table at line 358

> Harold Michelson, who boarded *The Birds*, *The Graduate*, *Star Trek: The Motion Picture*, ***Full Metal Jacket*** ...
> | **Harold Michelson** | Storyboard artist and later production designer. *The Birds*, *The Graduate*, *Star Trek: The Motion Picture*, *Full Metal Jacket* **[SOURCED]** |

**Why it is high risk.** *The Birds*, *The Graduate* and *Star Trek: The Motion Picture* are securely associated with Michelson. *Full Metal Jacket* is not part of the standard Michelson filmography and its production design is associated with Anton Furst. A specific film credit attached to a named individual is exactly the class of claim that should not be asserted without verification.

**Recommended fix.** Verify the credit or drop it. The other three titles are sufficient.

### 5.3 MEDIUM RISK: 15's previs-studio founding claim

**File:** `15` line 239

> The major dedicated studios are **The Third Floor**, **Halon Entertainment** and **Proof Inc.**, **all founded by artists who came out of the early 2000s wave of digital previs on large-scale productions.** **[SOURCED]**

**Why it is medium risk.** The three studios are real and correctly identified as the major players. "All founded by artists who came out of the early 2000s wave" is a universal claim about three separate companies' founding circumstances, presented as sourced. It is plausible but it is three factual assertions, not one.

**Recommended fix.** Soften to "each emerged from the early 2000s wave of digital previs" or verify each founding individually.

### 5.4 MEDIUM RISK: 15's Martin Asbury credit list

**File:** `15` line 360

> | **Martin Asbury** | Long-serving British storyboard artist, Bond films, **Nolan** and Scott productions **[SOURCED]** |

**Why it is medium risk.** Asbury is a real and long-serving British storyboard artist with Bond and Ridley Scott credits. The Nolan association is the least secure element and is asserted without a title.

**Recommended fix.** Name the specific films or drop the Nolan reference.

### 5.5 MEDIUM RISK: 15's Hitchcock anecdote is presented as fact

**File:** `15` line 174

> Alfred Hitchcock is the canonical figure. He famously said that he **never looked through the camera** because the film was already complete in his head before shooting began ...

Repeated at line 357 with a **[SOURCED]** tag.

**Why it is medium risk.** This is a genuine and much-repeated Hitchcock anecdote, but it is an anecdote with disputed literalness, and it is being used to underwrite an operating doctrine (minimal coverage) in section 2.3 above. Tagging a legend as [SOURCED] is the specific honesty failure this class is meant to catch.

**Recommended fix.** Retag as a reported remark with the word "reportedly," or attribute to the specific interview.

### 5.6 HIGH RISK: 14's Kim Gehrig quote carries a precise date

**File:** `14-Directors-Treatment.md` line 269

> | **Kim Gehrig**, Somesuch director and **2023 Cannes Lions Film Craft Jury President**, who has said *"As a director, I am only as good as my collaborators... It's the alchemy of these people and their crafts that elevates a piece of film"* **[SOURCED: Cannes Lions announcement, 23 February 2023]** |

**Why it is high risk.** This is the single most checkable claim in the entire set: a named living person, a specific institutional role, a specific year, a verbatim quotation with an ellipsis, and a source dated to the day. Every one of those elements is independently falsifiable. Kim Gehrig and Somesuch are certainly real. The jury presidency, the exact wording and the 23 February 2023 date are not verifiable from within this audit.

**Recommended fix.** Verify against canneslions.com before this is ever pasted into a client-facing treatment. If unverifiable, keep the craft point and drop the attribution.

### 5.7 HIGH RISK: 14's Genero citation names an obscure individual and a year

**File:** `14` line 272

> | **Genero** and similar bid platforms | Formalised treatment submission for a wider pool of directors ... **[SOURCED: Dima Svichkar's published account of pitching through Genero, 2023]** |

**Why it is high risk.** A named private individual plus a year, cited as the authority for an industry-structural claim. Neither the person nor the account is a recognised trade source, and the claim does not need a personal citation to stand.

**Recommended fix.** Drop the personal attribution and retag as [PRINCIPLE], or cite Genero's own published submission guidelines.

### 5.8 LOW RISK, verified as accurate: 18's account-planning history

**File:** `18` lines 125 to 131

> **[SOURCED] Account planning as a formal agency discipline emerged in London in 1968, developed in parallel by Stephen King at J. Walter Thompson and Stanley Pollitt at Boase Massimi Pollitt.**
> **[SOURCED] Stephen King is associated with the framework thinking behind the JWT Planning Cycle and its five questions:** where are we, why are we here, where could we be, how could we get there, and are we getting there.
> **[SOURCED] Jon Steel's "Truth, Lies and Advertising: The Art of Account Planning" (1998) is the most widely read single text on the discipline**
> **[SOURCED] Award bodies shape what briefs aspire to.** D&AD, founded in the UK in 1962 ... Cannes Lions, running since 1954 ...

**Assessment.** Despite being written without live research, all of these are correct: the 1968 date, both names and both agencies, the five JWT Planning Cycle questions verbatim, the Steel title and 1998 publication year, D&AD 1962, Cannes Lions 1954. The claim that D&AD "judges craft against an absolute standard rather than a relative one, which is why its top awards are not always issued" is also correct.

**One nuance worth a footnote.** Pollitt developed the discipline at Pritchard Wood before BMP was founded in 1968, so "developed in parallel ... at Boase Massimi Pollitt" compresses the chronology slightly. Not an error of substance.

**Recommended action.** No fix required. Flagged only because the brief asked for high-risk specific claims in this file and these are the specific claims. They survive scrutiny.

### 5.9 LOW RISK, verified as accurate: 17's revision-colour order and ADR conventions

**File:** `17` lines 54, 104 to 124

> **White (the original locked draft), Blue, Pink, Yellow, Green, Goldenrod, Buff, Salmon, Cherry, then Second Blue, Second Pink and so on, cycling again.** **[SOURCED]**

**Assessment.** The colour order is the correct industry-standard sequence. The Architecture Decision Record material is accurate and, notably, 17 does not name a specific originator, which is the safe choice. 17 also uses honest hedged tags such as **[SOURCED, by analogy with ADR and script page numbering]** (line 524) and **[SOURCED, ADR convention]** (line 532), which is the best sourcing behaviour in the entire set. No fix required.

### 5.10 LOW RISK, verified as accurate: 16's Hannah Beachler claim

**File:** `16` line 79

> The best documented modern example is the bible built by production designer **Hannah Beachler** for the fictional nation in the 2018 Marvel film *Black Panther*. Beachler assembled an extensive world-building document, **widely reported as running to hundreds of pages** ...

**Assessment.** Correct, and appropriately hedged ("widely reported as"). Beachler's *Black Panther* bible is a real and heavily documented artifact. 16 carries only 5 [SOURCED] tags total and none of them are risky. No fix required.

### 5.11 Spot-check of the other 14 files for implausible precision

Sampled the most numerically or biographically specific claims outside 15 to 18. Three worth a verification pass, none clearly wrong:

- `07-Makeup-and-Hair.md` line 211: "| **Mark Coulier** | Oscars for *The Iron Lady* and *The Grand Budapest Hotel*. *Suspiria*, ***Pinocchio* (33 distinct prosthetic designs)**, *Wicked*." The Oscars are correct. **"33 distinct prosthetic designs" is an oddly exact figure** for which no source is named inline. Verify or soften.
- `03-Editor.md` line 85: Schoonmaker "said David Lean told her to make it perfect, and she did it by **taking two frames off the outgoing shot**." A precise, quotable anecdote. Plausible and consistent with published Schoonmaker interviews, but the two-frame specific is the kind of detail that drifts in retelling.
- `08-VO-Casting-and-Voice-Direction.md` line 269: informed-consent obligations "under state law in **California, Illinois** ..." A legal claim naming specific jurisdictions. Legally accurate in outline (both states have biometric or digital-replica statutes) but law changes; date-stamp it.

Otherwise the 14 researched files sustain heavy, plausible, inline attribution. 02 (Colorist) and 12 (Script Supervisor) are the strongest, with dense named-source citations carrying publication and year.

---

## CHECKED AND CLEAN

Verified with no problem found:

**Structure.**
- Part A present in all 18 files. Confirmed by heading grep. Line numbers 9 to 30 in every file.
- Part B present in all 18 files. Line numbers 267 to 547 depending on file length.
- Vocabulary glossary present in all 18 files, under headings "Vocabulary glossary", "VOCABULARY", or "VOCABULARY GLOSSARY".
- Failure-modes section present in all 18 files, most as "Failure modes and under-specification tells".
- Output template present in all 18 files. Files 16, 17 and 18 carry multiple templates.
- Trigger list or trigger table present in all 18 files.
- A claim-tagging convention is present in all 18 files, though in four variants (see 4.2).

**Contamination.**
- Zero hits across all 18 files for: dedo, DLight, Nour, Mona, Karim, Sara, Youssef, Laila, Layla, Hassan, Dalia, Elrouby, Nada Arafa, Mohamed Tarek, Marigold, Torch Red, Aztec Purple.
- Zero hits for: Cairo, Heliopolis, Merghany, Osoul, EGP, Ramadan, MENA, Khaleeji, Egypt as a market reference.
- Only two hits in the extended sweep, both about Arabic syllable density. One is generic and fine (18), one names specific dialects (15, reported at 3.1).
- No client names, no project names, no internal role names, no currency figures found anywhere in the set.

**Craft claims verified as internally consistent.**
- Colour temperature doctrine across 01, 02, 06, 07, 09: consistent (2.6).
- What a colorist can and cannot fix, 02 against 01, 06, 07, 09: consistent, with every other file correctly deferring to 02's limits (2.7).
- Depth-of-field physics in 01 against 17: consistent in substance. Only the crop-factor arithmetic disagrees (2.8, 2.1).
- Shot-size vocabulary in 15 against 01 and 07: no definitional conflict. 15's table (ELS through EST) is standard and 01 and 07 use the same terms compatibly.
- ADR, picture lock, locked script and revision-colour conventions in 17: accurate.
- Account planning history, D&AD and Cannes Lions dates in 18: accurate.
- Hannah Beachler / *Black Panther* bible in 16: accurate and appropriately hedged.

**Reciprocal pairs checked and found to reconcile.**
- DOP to Production Design on floor plans, ceiling heights, wall finishes, practical fixture schedule and wild walls: 01 line 356 and 09 line 493 match closely.
- Casting to Wardrobe: 05 line 421 owes "Full sizing and measurements, body notes, any physical constraint, confirmed as soon as booked"; 06 line 372 needs exactly that. Clean match.
- Casting to Hair and Makeup: 05 line 422 owes "Current hair length and colour, facial hair, skin notes, tattoos and piercings, allergies"; 07 line 357 needs exactly that. Clean match.
- Casting to 1st AD: 05 line 423 and 13 line 766 match on availability, minors, permits and agent contact.
- Editor to Sound on turnover: 03 line 441 owes "AAF plus OMF fallback plus EDL; reference file at matching timecode; separated dialogue, music and effects tracks; a frame-numbered sync list"; 10 line 325 needs a locked, versioned, frame-accurate cut with change lists. Compatible.
- Editor to Colour: 03 line 444 owes "Conformed EDL, reference file, and a note on any speed changes, reframes, or stabilisation"; 02 line 596 needs precisely that list. Clean match, one of the best-aligned pairs in the set.
- Script Supervisor to Makeup: 07 line 366 owes continuity notes tied to scene numbers; 12 needs each department's own state record. Compatible.
- Script Supervisor to Production Design: 09 line 497 owes reference stills of every dressed zone. Compatible.
- VFX to Art Department on bezel and safe area: 04 line 411 needs bezel dimensions, 04 line 473 owes screen sizes and aspect ratios. Internally coherent, and 09 does not contradict it.
- Colorist to VFX on the LUT not breaking keys: 02 line 610 owes it, 04 line 413 needs it. Clean match.

---

## NOT CHECKED

Stated so that this report is distinguishable from one that forgot.

1. **General quality, prose, structure and usefulness.** Explicitly out of scope by instruction. No judgment offered on whether these are good bibles.
2. **Full-text reading.** Roughly 194,000 words were not read end to end. The audit was grep-targeted at needs/owes tables, claim-tag blocks, technical-claim passages, glossaries, trigger lists and sourcing notes. Contradictions buried in mid-Part-A prose that do not use the searched vocabulary would not have surfaced.
3. **Live verification of any sourced claim.** No web research was performed as part of this audit. Every assessment in Failure Class 5 rests on internal plausibility and prior knowledge, not on fetching the cited source. The claims marked LOW RISK and "verified as accurate" are verified against general knowledge only. The four HIGH RISK claims (5.1, 5.2, 5.6, 5.7) require an actual source check before anyone relies on them.
4. **Internal arithmetic beyond the crop-factor tables.** Only 01's sensor and crop-factor maths were recomputed. Other numeric tables (04's build-count multipliers, 13's chair-hour and hot-cost arithmetic, 18's runtime accounting template, 16's reconciliation blocks) were not checked for arithmetic soundness.
5. **Output templates were not test-driven.** No template in any file was filled in against a hypothetical project to see whether its fields are sufficient, mutually consistent, or compatible with the templates in adjacent files. Template-to-template field-name collisions across 15, 16, 17 and 18 are a likely source of further disagreement and were not examined.
6. **Trigger lists were not cross-compared.** Each file has a trigger list. Whether a single upstream change (say a camera swap) triggers the same set of re-derivations across 01, 04, 15, 16 and 17 was not verified. 17 line 716 gives a sensor-change consequence list that could serve as the reference set for that comparison.
7. **Pairs not examined.** The following reciprocal pairs were not opened: Script Supervisor to Editor in detail, Director to Producer, VFX to Playback operator, Casting to Producer on deal terms, Colorist to Client on brand colour, and all relationships involving Gaffer, Key Grip, 1st AC and DIT as counterparties in files other than 01.
8. **Files 14, 17 and 18 could not be checked for reciprocal disagreement at all**, because they contain no needs/owes sections (finding 4.1). Their cross-department consistency is therefore unknown rather than clean.
9. **Duplicate and hidden files.** Two hidden files (`.fuse_hidden0000000e00000001`, `.fuse_hidden0000001000000002`) sit in the directory, sized to match 01 and 02. They were not opened and are presumed filesystem artifacts, but they were not confirmed as such.
10. **Consistency of the vocabulary glossaries against each other.** Each file has a glossary. Whether the same term is defined identically in two files (for example "insert", "coverage", "lock", "plate", "handoff frame") was not systematically compared. 2.4 and 1.19 suggest this would be productive.
