# CREW DEPARTMENT GATES

Machine-readable-ish decision reference extracted from the 10 crew department craft bibles in `Film Craft Bibles/`. Built so an AI skill can turn each department into an AskUserQuestion gate.

**Source files:** 01-Director-of-Photography.md, 02-Colorist.md, 03-Editor.md, 04-VFX-and-Motion-Graphics.md, 05-Casting-Director.md, 06-Costume-and-Wardrobe.md, 07-Makeup-and-Hair.md, 08-VO-Casting-and-Voice-Direction.md, 09-Production-Design-and-Locations.md, 10-Sound-Design-and-Music.md

**Extraction rule:** every decision, option, dependency, trigger and template line below is drawn from the bible's own Part A decision set, Part B decision checklist in dependency order, Part B "what this role NEEDS from other departments" table, Part B trigger table, and Part B output template. Nothing is invented. Where a bible is silent, the entry reads "not stated in bible".

**How to read each department section:**

| Block | Use for |
|---|---|
| `dept_id` / `role_one_liner` | Agent identity and scope guard |
| Lockable decisions | One AskUserQuestion gate per decision. Decision id is the lock key, **Ask** is the prompt, the options table is the answer set |
| Dependency order (internal) | Gate sequencing within the department. Never present a gate whose dependency is unlocked |
| Dependency order (upstream) | Which other departments must be locked before this department opens at all |
| Re-open triggers | On an upstream change, which locks must be RE-DERIVED (new work, new decision) versus merely RELABELED (documentation only) |
| Output template | The section structure the department's plan document must contain |

---

## DECISION CLASSES

Every lockable decision in this file carries a `**CLASS:**` line directly under its heading. The class decides whether the agent asks the user or works the answer out itself. The three classes are the ones defined in `gate-registry.md`.

| Class | Definition | Agent behaviour |
|---|---|---|
| **GATE** | A genuine creative or commercial choice with real, mutually exclusive options and consequences the user owns. | ASK via AskUserQuestion. Never assume, never infer from taste. |
| **DERIVED** | Mechanically determined by an already-locked GATE, by arithmetic, physics or documented convention. | Compute it, state the derivation in the plan, do not ask. Surface it only if the computed value conflicts with something else already locked. |
| **CONDITIONAL** | Only exists if the project has a particular feature: screens in frame, a second location, an ensemble, vocals in the music, a specific language, a period setting, a montage, a hero sound. | Check the condition. If met it becomes a GATE and is asked. If not met, record an explicit not-applicable entry with the reason, never leave a silent gap. |

**Counts in this file:** 155 decisions total. **80 GATE**, **39 DERIVED**, **36 CONDITIONAL**.

**The rule:** an agent must ask every GATE, must compute and show its work for every DERIVED, and must check the condition for every CONDITIONAL and record an explicit not-applicable entry when the condition is false. A DERIVED entry with no stated derivation is treated as unlocked. A CONDITIONAL entry with neither an answer nor a not-applicable reason is treated as unlocked.

**Cross-department derivations:** where a DERIVED line names a decision belonging to another department, that department must be locked first. The upstream department is named in brackets on the CLASS line.

**Department-level conditions:** DEPT-08 as a whole hangs on `vo_exists_no_speaking_mouth`. If no voice-over exists, the remaining sixteen VO decisions are recorded not-applicable as a block rather than individually.

---

## DEPARTMENT INDEX

| # | Department | dept_id |
|---|---|---|
| 01 | Director of Photography | `director-of-photography` |
| 02 | Colorist | `colorist` |
| 03 | Editor | `editor` |
| 04 | VFX and Motion Graphics | `vfx-and-motion-graphics` |
| 05 | Casting Director | `casting-director` |
| 06 | Costume and Wardrobe | `costume-and-wardrobe` |
| 07 | Makeup and Hair | `makeup-and-hair` |
| 08 | VO Casting and Voice Direction | `vo-casting-and-voice-direction` |
| 09 | Production Design and Locations | `production-design-and-locations` |
| 10 | Sound Design and Music | `sound-design-and-music` |

---

## DEPT-01: Director of Photography

**dept_id:** `director-of-photography`
**role_one_liner:** I own the image: format, optics, exposure, light, colour, movement and frame. I do not own the story, the schedule, the palette of the physical world, or the money.

### Lockable decisions

**Classes:** 13 GATE, 2 DERIVED, 1 CONDITIONAL

#### `visual_intent` - Visual intent statement
**CLASS:** GATE
**Ask:** In one paragraph, what is the image doing emotionally, what is the one visual rule that is always true, and what must this never look like?
**Options:**
| Option | Description (from bible) |
|---|---|
| Camera as observer | One of the three stated positions. The camera watches. Tier 1 question 3 forces this choice before anything else can be answered. |
| Camera as participant | The camera is inside the action rather than watching it. Choosing this drives handheld and subjective operating downstream. |
| Camera as subjective consciousness | The image tracks a mind rather than an event. Kuras' stated principle applies: "intention and point of view are the core principles of cinematography." |
| Anti-brief led | The bible states the anti-brief is more useful than the brief. Lock what must never happen visually first, then derive the rest. |

#### `aspect_ratio` - Aspect ratio(s) and native format
**CLASS:** GATE
**Ask:** Which aspect ratio is native, which are derived, and what is the safe-area policy?
**Options:**
| Option | Description (from bible) |
|---|---|
| 1.33 / 1.66 | Favour the vertical human figure. |
| 1.85 | The standard theatrical compromise. |
| 2.39 | Favours landscape, two-shots and lateral geography. |
| 1.43 IMAX | Overwhelms peripheral vision. |

#### `multi_ratio_strategy` - Multi-ratio capture strategy
**CLASS:** CONDITIONAL on the locked delivery list requiring more than one aspect ratio (16:9 plus 4:5, 1:1 or 9:16) | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** One shoot must deliver 16:9, 4:5, 1:1 and 9:16. How do we get all of them?
**Options:**
| Option | Description (from bible) |
|---|---|
| Shoot native per ratio | Best quality, costs setups and time. |
| Shoot open gate and protect | Frame with marked safe areas for each ratio on the monitor, keep the subject inside the vertical safe zone, keep essential action off the extreme horizontal edges. Protecting for vertical pushes composition toward centre, which reduces the expressive range of the frame. |
| Shoot two passes for hero moments only | Native passes only where it matters, derived elsewhere. |
| Decide in the edit | Named as a failure of specification: "Aspect ratio unresolved until the edit." Not a valid option. |

#### `capture_format` - Capture medium and sensor size
**CLASS:** GATE
**Ask:** Film or digital, and which sensor size class?
**Options:**
| Option | Description (from bible) |
|---|---|
| Super 35 (ALEXA 35, 27.99 x 19.22 mm) | Smallest of the three dominant classes. "Normal" is roughly the sensor diagonal, about 34mm. Widest depth of field for a given framing, easiest on the focus puller. |
| Large format / full frame (ALEXA LF, 36.70 x 25.54 mm) | 1.31x crop factor from S35 (36.70 / 27.99 = 1.311), so a 35mm on S35 frames like a ~46mm on LF. Same framing on a bigger sensor means a longer lens, therefore less depth of field and more background compression. Fraser's Dune route: ALEXA LF plus Ultra Vista, pushed to 2000 ASA with pleasant texture. |
| 65mm large format (ALEXA 65, 54.12 x 25.58 mm) | ~1.8x from S35. Lubezki's Revenant reason was dynamic range: film "didn't have the sensitivity" at dawn and dusk. Very wide lenses (12mm to 21mm) hold environment and emotion at once. Depth of field at a wide stop is punishing for focus pullers, budget AC time and rehearsal. |
| 65mm IMAX 15-perf film | Van Hoytema on Oppenheimer: "Large format photography gives clarity and places the audience in the reality you are creating for them." He inverted the usual wideness use so "the faces became our landscapes," which forced custom close-focus glass because his 80mm could not focus closer than roughly six feet. |
| Hybrid digital with film-out and rescan | Fraser and Villeneuve ran the digital image out to 35mm and rescanned it, a melding of digital and analogue. Arrived at by testing across 35mm, ALEXA 65 and IMAX, spherical and anamorphic. |

#### `camera_body` - Camera body / bodies
**CLASS:** GATE
**Ask:** Which bodies, including second unit and specialist bodies?
**Options:**
| Option | Description (from bible) |
|---|---|
| Single body matched to format | Depends on format, frame rate needs, weight and rig needs. Locks at camera test. |
| Lightweight body for continuous movement | Deakins on 1917 used ALEXA Mini LF with the ARRI TRINITY stabiliser for the one-apparent-shot design. |
| Second camera package: high-speed body | Commercial practice carries a Phantom-class body for liquids, powders, fabric and impact. On a Phantom day a dedicated tech configures the system. High frame rates eat light: doubling frame rate costs one stop. |
| Second camera package: motion control rig | For repeatable passes and clean compositing, standard in product work and VFX plates. |

#### `lens_family` - Lens family
**CLASS:** GATE
**Ask:** Which lens family, and does it cover the chosen sensor?
**Options:**
| Option | Description (from bible) |
|---|---|
| Spherical modern (ARRI Signature Primes, Zeiss Supreme, Cooke S7/i) | Clean, consistent and contrasty. |
| Anamorphic | Oval bokeh, horizontal flares, distinct fall-off, wider aspect from a taller negative area. Sandgren shot Babylon on Cooke Anamorphic/i explicitly for its "imperfections." On LF, squeeze factor, coverage and resulting aspect all shift. |
| Vintage or rehoused (Canon K35, Baltar, Ultra Panatar, Petzval-derived) | Field curvature, lower contrast, halation, edge softness. In commercial work the cheapest available route to "not looking like everyone else." |
| Zooms | For run-and-gun, documentary-adjacent and multi-camera work. Primes give discipline and speed of stop. |
| Specialist glass (macro, probe, snorkel, periscope, split-diopter, swing/tilt) | In advertising these are not exotic, they are the product-hero toolkit. |

#### `focal_map` - Focal lengths per scene
**CLASS:** DERIVED from `capture_format` and `lens_family` | normal is the sensor diagonal of the locked format (about 34mm on S35, about 45mm on LF, about 60mm on 65), the per-scene wider or longer offset is computed against that reference and then matched to the focals the locked lens family actually covers
**Ask:** What focal length does each scene get, and what is that saying?
**Options:**
| Option | Description (from bible) |
|---|---|
| Wider than normal | Expands space and exaggerates movement toward and away from camera, making the subject feel embedded and vulnerable. |
| Normal (roughly the sensor diagonal: ~34mm S35, ~45mm LF, ~60mm on 65) | The neutral reference point. |
| Longer than normal | Compresses space, isolates the subject, flattens features and makes lateral movement feel like it goes nowhere. |
| One-lens discipline | Deakins shot roughly 99 percent of 1917 on a single 40mm, adding only a 35mm for the basement and a 47mm for the river. Pick a focal length that expresses the film's relationship to the character and hold it. |

#### `working_stop` - Working stop and rated EI
**CLASS:** GATE
**Ask:** What stop is the gaffer lighting to, and at what EI are we rating?
**Options:**
| Option | Description (from bible) |
|---|---|
| Deep focus (T5.6 and beyond) | Puts the frame's whole world in play and forces composition to do the work of directing attention. Deakins territory and Toland's legacy. |
| Locked mid stop policy (e.g. T2.8 interiors, T5.6 exteriors) | The working stop is a policy, not a per-shot accident. Gives the gaffer a target and gives the whole film a consistent subject-to-background relationship. |
| Shallow focus | Isolates but flattens the world and raises focus-pull risk. |
| Split-diopters | Buy two planes of focus at one stop, at the cost of a visible seam that must be hidden in a vertical edge in the frame. Note: diffraction softens at very small apertures, visible softening often begins around T11 to T16 on high-resolution sensors. |

#### `lighting_philosophy` - Lighting design school
**CLASS:** GATE
**Ask:** Where is the light coming from, and will the audience believe it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Motivated soft-source (Deakins) | Every source in frame has a logical origin. Light "what must be felt rather than what must be seen." The cove: a 180-degree wrap of unbleached muslin lit by many small units, frequently Mole-Richardson Tweenies, reading as daylight rather than as film lighting. |
| Hard-source (Richardson) | A very hot, hard top or high-back source pointed nearly straight down, blowing the rim out by several stops, combined with a large soft bounce filling the face, which is what the camera exposes for. Add lens diffusion and the blown highlight blooms. |
| Subtractive (Bradford Young) | Black out everything then add: "subtracting is adding." Underexposure and shadow as legitimate rather than faulty, built around practicals and deep uncrushed shadow. |
| Available light (Lubezki) | Natural light only. On The Revenant this reduced usable shooting to roughly a ninety-minute window per day. Not a lighting technique, a production decision with lighting consequences, and it can only be bought with schedule. |

#### `contrast_ratio` - Contrast ratio target
**CLASS:** GATE
**Ask:** How deep do the shadows read, expressed as key+fill : fill?
**Options:**
| Option | Description (from bible) |
|---|---|
| 2:1 | Gentle and commercial. |
| 4:1 | Dramatic. |
| 8:1 and beyond | Noir. |
| Negative fill led | Black flags and solids removing light to increase contrast. The most underused tool on set. |

#### `colour_temp_policy` - Colour temperature strategy
**CLASS:** GATE
**Ask:** How do sources relate in colour, and is any mixing deliberate?
**Options:**
| Option | Description (from bible) |
|---|---|
| Unified | Everything balanced to one temperature. Clean, controlled, product-friendly. |
| Warm/cool split | Interior tungsten against exterior daylight, or firelight against moonlight. Khondji's Se7en: warm Chinese lanterns against colder Kino Flos, with interiors underexposed by roughly two stops so brightness always seemed to come from outside. |
| Symbolic (Storaro) | Colour carries meaning by system rather than by realism. Red as the first colour of the spectrum, therefore birth and life. Harmony or conflict between colours "can influence the body, not just the eyes." |
| Deliberate green/magenta push | The tint axis is the one most often neglected. Fluorescent and cheap LED practicals push green and make skin look ill. Deliberate green push is legitimate (institutional, clinical, unwell) but it must be a decision, not an accident. |

#### `exposure_philosophy` - Exposure philosophy
**CLASS:** GATE
**Ask:** What is the darkest thing the audience must be able to read, and what is the brightest thing that may clip?
**Options:**
| Option | Description (from bible) |
|---|---|
| Expose to the right / overexpose and pull back | Sandgren used overexposure with push processing on Babylon for a heated, grainy, colourful result. On film, overexposure buys shadow detail and finer grain in the mids. |
| Deliberate underexposure | Young's practice and Khondji's on Se7en, roughly two stops down on interiors with a bleach-bypass style process (CCE, related to ENR): dense blacks, hot whites, desaturated colour. |
| Protect the highlight | Lubezki's reason for the ALEXA 65: dynamic range in the sky, holding the subtle gradients of a winter sky without blowing out. |
| Unmotivated darkness | Named as a failure of judgement. Young's darkness is a stated position about what deserves to be seen; unmotivated darkness is just an underexposed image. |

#### `movement_plan` - Camera movement and operating style
**CLASS:** GATE
**Ask:** Does the camera move, on what, and how should the operating feel?
**Options:**
| Option | Description (from bible) |
|---|---|
| Locked off / tripod | Formality, control, observation, tension by stillness. |
| Dolly / track | Classical, invisible, motivated, expensive in time. |
| Technocrane / jib | Scale, reveal, geography. |
| Steadicam | Fluid presence, "gliding witness." |
| Stabilised remote head / gimbal | Impossible geometry, handoffs, continuous long takes. Deakins on 1917 used the ARRI TRINITY: "a more fine-tuned ballet than most, with the crew, cameras and mechanics all needing to be in-sync with what the actors were doing." |
| Handheld | Subjectivity, urgency, imperfection. Kuras on Eternal Sunshine deliberately avoided seamlessness, using a doorway/sled dolly or a wheelchair, running crane shots handheld, and shaking the camera intentionally so the audience could see an effect was done in camera. |
| Snorkel / motion control | Repeatability, product work, VFX plates. |

#### `framing_rules` - Framing, lens height and eyeline policy
**CLASS:** GATE
**Ask:** What are the standing rules for lens height, headroom, symmetry and the 180-degree line?
**Options:**
| Option | Description (from bible) |
|---|---|
| Eye height | Neutral. |
| Below eye height | Confers status and threat. |
| Above eye height | Confers vulnerability and smallness. |
| Line-breaking permitted | Eyeline and the 180-degree line govern whether the audience knows where they are. Breaking the line is legitimate when disorientation is the point. The rule that matters is consistency: a film that frames one way in act one and another way in act three is telling the audience something. |

#### `show_lut` - Show LUT and look pipeline
**CLASS:** GATE
**Ask:** What is the show LUT, how was it derived, and what is the on-set CDL policy?
**Options:**
| Option | Description (from bible) |
|---|---|
| Derived from a camera test including wardrobe, set paint and skin tone | The camera test is the hinge. Nothing about look, LUT or stop is real until footage exists. A show LUT built without wardrobe, set paint and skin tone in the test is named as a failure of specification. |
| Derived with colorist input during prep | Requires the colorist's involvement during prep, not after, plus agreement on the delivery colour space and whether on-set CDLs will be honoured. Prevents the on-set look from being discarded in the grade. |
| Untested / references only | An agent that skips the test has produced an opinion, not a plan. |

#### `delivery_colour_space` - Delivery colour space and HDR/SDR intent
**CLASS:** DERIVED from `delivery_matrix` (DEPT-02 Colorist) | colour space and dynamic range follow from the locked platform per deliverable: Rec.709 for broadcast and most social, P3 for cinema and HDR mastering, Rec.2020 container for HDR delivery
**Ask:** HDR or SDR, and which colour space?
**Options:**
| Option | Description (from bible) |
|---|---|
| Rec.709 | One of the three named delivery colour spaces. |
| P3 | One of the three named delivery colour spaces. |
| Rec.2020 | One of the three named delivery colour spaces. |
| HDR vs SDR | A delivery-spec decision that drives monitoring standard, exposure headroom policy and highlight-clipping decisions. Where it will be seen (cinema, broadcast, phone in daylight, LED billboard) governs. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | `visual_intent` | Script, director conversation | Start of prep |
| 2 | `aspect_ratio` (and `multi_ratio_strategy`) | Intent + delivery spec | Before camera test |
| 3 | `capture_format` | Ratio, budget, low-light needs, movement needs, VFX needs | Before camera test |
| 4 | `camera_body` | Format, frame rate needs, weight/rig needs | Camera test |
| 5 | `lens_family` | Format (coverage), intent, budget | Camera test |
| 6 | `focal_map` | Lens family + locations + blocking | Tech scout |
| 7 | `working_stop` | Lens family, sensor, depth-of-field intent | Camera test |
| 8 | `show_lut` | Camera test footage + production design + wardrobe samples + colorist input | End of prep |
| 9 | `lighting_philosophy` and `contrast_ratio` per location | Locations locked, art dept plans, blocking, ratio, stop | Tech scout |
| 10 | `colour_temp_policy` | Lighting design + art dept practicals | Tech scout |
| 11 | `movement_plan` per scene (and therefore grip package) | Blocking, floor plans, schedule | Tech scout |
| 12 | Crew list and equipment list | All of the above | Before booking |
| 13 | Pre-light and rig schedule | 1st AD's schedule + gaffer's plan | Before shoot |
| 14 | On-set monitoring and dailies pipeline (incl. `delivery_colour_space`) | DIT, editor, colorist | Before day one |

Standing rule: nothing may be locked until everything above it is locked or explicitly deferred with a stated risk. The camera test is the hinge.

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Tone statement, references, coverage philosophy, willingness to commit to a visual rule | Nothing below Tier 1 can be answered without it |
| Production Design | Locked floor plans with ceiling heights, wall and window positions; whether walls fly; surface finishes (gloss vs matte); the colour palette with physical samples or paint chips; the list and type of every practical fixture including its bulb; whether the art dept will accept a dimmer or bulb swap | Wall reflectivity and window position determine the entire lighting plan. A gloss wall reflects the lighting rig. A locked ceiling removes top light |
| Wardrobe | Fabric samples under the show LUT, especially whites, blacks, high-saturation colours, and anything with sheen, stripes or fine pattern (moire risk) | Wardrobe sets the exposure floor and ceiling on the actor. A pure white shirt clips before a face is correctly exposed |
| Hair and Makeup | Skin prep and sheen policy; whether the look is matte or dewy | Specular control is a lighting decision that depends on skin finish |
| Locations | Sun path and orientation, times of usable light, power availability and amperage, rigging points, permitted rig sizes, neighbouring reflectors and obstructions, noise windows | Determines whether an exterior is even shootable in the scheduled slot |
| 1st AD | Realistic setup count per day, scene order, company move times, turnaround, when the sun is scheduled to be used, pre-light and rig days | Lighting design is meaningless without the time to execute it |
| Editor | Whether shots will be reframed or speed-changed; how much handle is needed; whether any shot will be cut into a different ratio | Drives open-gate decisions, resolution headroom, and frame rate |
| VFX | Which shots are plates; tracking marker requirements; clean plate requirements; HDRI and lighting reference capture; lens distortion grids; whether any shot needs motion control; whether green or blue, and how far from the subject | VFX requirements can override lens choice, stop, movement and lighting entirely |
| Colorist | Involvement during prep, not after; agreement on the show LUT; the delivery colour space; whether on-set CDLs will be honoured | Prevents the on-set look from being discarded in the grade |
| Producer / Line Producer | The real number for camera, lighting, grip and crew; the number of pre-light days; the contingency for weather | Determines the achievable version of the plan |
| Client / Agency (commercial only) | Brand colour specifications, product handling rules, mandatory pack shots, legal and label requirements, which frames are contractual | A pack shot that fails brand colour standards is a reshoot regardless of how beautiful it is |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Location swap | Entire lighting plot for that location; sun path and time-of-day plan; power and rigging plan; movement plan (floor, ceiling, doorways); focal lengths for that scene; setup-count estimate; risk register entries | Scene numbering; nothing else. A location swap is never cosmetic |
| Camera / sensor format swap | Every focal length (recompute by crop factor); lens coverage validity; depth of field at the working stop; rated EI and required light levels; rig weight, therefore movement tools; data or stock budget; show LUT (different colour science) | Delivery ratio if it happens to be unchanged; framing rules if the format class is identical |
| Lens family swap (same format) | Working stop if maximum aperture changed; filtration (different flare and contrast behaviour); show LUT check; focus risk for the 1st AC | Focal length map, if the new family covers the same focals with the same character |
| Casting change | Skin tone and exposure policy; key placement and contrast ratio for that character; wardrobe and makeup tests; lens choice if facial geometry demands a different focal length | Names in the scene breakdown |
| Framing rule change (e.g. added 9:16 deliverable) | Composition policy for every shot; safe-area monitoring setup; open-gate decision; potentially setup counts if native vertical passes are added; movement plan (a lateral dolly may not survive a vertical crop) | Nothing. This always costs something |
| Palette pivot (Production Design or Wardrobe) | Show LUT; contrast ratio targets; gel and LED colour choices; new camera test with the new physical materials; product colour verification if commercial | Reference images, if the pivot is within the same value range |
| Schedule compression (1st AD) | Setup counts; lighting design simplified to a lower-fixture-count version; which scenes are "look" scenes; pre-light requirements; movement tools dropped in favour of faster ones | Nothing about the look, unless the DP explicitly renegotiates the look with the director |
| VFX scope change | Green/blue screen lighting; clean plate list; motion control needs; lens distortion capture; atmosphere policy (haze breaks keys); possibly camera body for higher resolution | Shot numbering |
| Delivery spec change (SDR to HDR, or new platform) | Monitoring standard; exposure headroom policy; show LUT and grade path; highlight-clipping decisions | Aspect ratio, if unchanged |
| Budget cut | Equipment list; crew list; lighting design scaled to available fixtures; pre-light days; possibly capture format | The visual intent statement, which should survive a budget cut or it was never a real intent |
| Weather / daylight loss on the day | Immediate fallback from the risk register: interior cover set, day-for-night, or artificial recreation of the intended source | Nothing. This is why the risk register exists |

### Output template
```
1. VISUAL INTENT
 1.1 One-paragraph statement of what the image is doing emotionally
 1.2 The visual rule (the one thing that is always true of this piece)
 1.3 The anti-brief (what this will never look like)
 1.4 Reference images, each annotated with WHY, not just WHAT

2. FORMAT AND CAPTURE
 2.1 Aspect ratio(s), native vs derived, and safe-area policy
 2.2 Capture medium and sensor size, with the reason
 2.3 Camera body/bodies and any second unit or specialist bodies
 2.4 Frame rate and shutter angle policy, plus any high-speed requirements
 2.5 Codec / raw / stock, resolution, and open-gate decision

3. OPTICS
 3.1 Lens family and why, including coverage confirmation for the chosen sensor
 3.2 Focal length map, scene by scene
 3.3 Working stop and rated EI
 3.4 Filtration policy (ND, diffusion, polarisers) and specialist glass

4. LIGHT
 4.1 Lighting philosophy in one paragraph (motivated / stylised / available)
 4.2 Per-location lighting plot: sources, positions, intensities, colour, shaping
 4.3 Contrast ratio targets and skin exposure policy
 4.4 Practicals: which fixtures, which bulbs, who supplies, who dims
 4.5 Colour temperature policy and mixed-source rules
 4.6 Atmosphere (haze/smoke) policy and its consequences for continuity

5. COLOUR
 5.1 Show LUT description and how it was derived
 5.2 Palette agreement with Production Design and Wardrobe
 5.3 On-set monitoring standard and CDL policy
 5.4 Delivery colour space and HDR/SDR intent

6. CAMERA MOVEMENT AND FRAMING
 6.1 Movement philosophy and the tools it requires
 6.2 Operating style (who operates, and how it should feel)
 6.3 Framing rules: lens height, headroom, symmetry, eyeline policy
 6.4 Any shot-specific choreography requiring rehearsal

7. SCENE-BY-SCENE BREAKDOWN
 For each scene: location, story time, shoot time, format, focal lengths,
 stop, key source, ratio, movement, special requirements, estimated setups

8. DEPARTMENT INTERFACES
 8.1 Requests to Production Design, Wardrobe, HMU, Locations, VFX
 8.2 Commitments made to 1st AD (setups per day, pre-light needs)
 8.3 Post pipeline: DIT, dailies, editor handles, colorist involvement

9. CREW AND EQUIPMENT
 9.1 Camera, electrical and grip crew lists with roles
 9.2 Equipment list with the reason for anything unusual
 9.3 Pre-light and rig schedule

10. RISK REGISTER
 Weather, daylight windows, power, access, focus risk, product handling,
 with a stated fallback for each
```


---

## DEPT-02: COLORIST

**dept_id:** `colorist`
**role_one_liner:** The last creative pass on the image before it becomes a deliverable, taking everything upstream as one stream of pixels and making it read as one coherent, intentional world in service of the DP's and the director's vision.

### Lockable decisions

**Classes:** 12 GATE, 4 DERIVED, 4 CONDITIONAL

#### `visual_worlds` - Number of distinct visual worlds and their relationship
**CLASS:** GATE
**Ask:** Does the piece contain more than one visual world, timeframe, or mental state, and should they feel like one thing or like separate things?
**Options:**
| Option | Description (from bible) |
|---|---|
| Single continuous world | The visual world does not change across the piece, so there is no colour arc to design. |
| Distinct worlds that read as distinct | Discrete worlds, timeframes, or mental states requiring distinct looks, meant to read as separate. Crossover points must be named. |
| Distinct worlds that flow together seamlessly | The same discrete worlds, but the change is meant to be felt rather than noticed. |
| Look tracks a subjective character's state | The image follows a point of view. Sonnenfeld and Tony Scott on Man on Fire manipulated the image to evoke different emotions for the lead's different states of mind. |

#### `show_lut_structure` - How many show LUTs, and who builds them
**CLASS:** GATE
**Ask:** Do we build one look table for the whole job, or more than one, and who owns it?
**Options:**
| Option | Description (from bible) |
|---|---|
| One LUT per show plus CDLs | Bogdanowicz's target. Like choosing a film stock for the movie. CDLs are the smaller shot by shot corrections that follow through the process. The reason is workflow: LUTs do not travel with the EDL, CDLs do. |
| Two LUTs, or one extra for an extreme sequence | She will use two if she must, or a separate LUT for something extreme such as a black and white sequence. |
| A LUT built specifically for the shooting package | Poole builds a LUT per show rather than carrying a go to LUT, because there are too many variables in lens quality, filtration and lighting. He wants a base of how the project was shot that works for the package. |
| No LUT, look built manually in nodes | Masick's training discipline. Attempt the task without any LUT, using every tool and as many nodes or layers as needed to recreate the look manually, to understand where the tools can go. |

#### `working_colour_space` - Colour management pipeline
**CLASS:** DERIVED from `capture_format` (DEPT-01 Director of Photography) | documented ACES convention: the grade runs in log AP1 (ACEScct, or ACEScc where no toe is wanted), scene-linear AP1 or AP0 only where the same pipeline feeds compositing, with the input transform fixed by the locked capture format
**Ask:** Which colour space do we actually grade in, and how does material get in and out of it?
**Options:**
| Option | Description (from bible) |
|---|---|
| ACEScct (AP1, log with a toe) | What most DI facilities actually use, because the toe makes lift operations behave like traditional log film scans. |
| ACEScc (AP1, pure log) | Grading space. Volpatto works in ACEScc/ACEScct specifically because an offset there is mathematically equivalent to an exposure change. |
| ACEScg (AP1, scene linear) | CG rendering and compositing. |
| ACES2065-1 (AP0, scene linear) | Interchange and archive. |

#### `lut_vfx_safety` - VFX safety of the show LUT
**CLASS:** CONDITIONAL on any shot being locked to `method_per_shot` = digital or hybrid in DEPT-04, so that a look table is handed to a VFX vendor at all | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Has anyone checked that the look table will not break VFX work, and who did the check?
**Options:**
| Option | Description (from bible) |
|---|---|
| Checked by a colour science team | Company 3 runs a colour science team that checks every LUT she makes for exactly this. |
| Checked by a named person outside the facility | If a production is not using her facility, someone still has to do that check, and early. |
| Modified LUT issued to VFX | The colorist owes VFX confirmation the LUT will not break their keys, or a modified LUT that will not. |
| Unchecked LUT of unknown provenance | It is possible to build something into a LUT that is destructive to visual effects, for instance making keying harder. Provenance must be established: who made it, from what test, in what colour space. |

#### `grade_pass_structure` - Order of grading passes
**CLASS:** GATE
**Ask:** In what order do we actually work through the material?
**Options:**
| Option | Description (from bible) |
|---|---|
| Balance, then look, then shape | Shoul's structure. Balance shots together, then a pass for the look of the film, then further passes to shape the images with grads and shapes. He balances scenes together before adjusting face colour or skies. |
| Basic matching pass, then secondaries, then a third pass | Ensby's shape, adopted to gauge the flow rather than getting bogged down in smaller details too early. |
| Colour bible pass, then sizzle reel review | Poole sets a couple of shots per scene and moves on, then strings the selects together as a sizzle reel to see how the scenes play off each other. Sculpture method: chip off big blocks first, then detail. |
| Grade the film three times | Doyle says you have to grade a film three times before you find where it should be, and carries multiple grade versions of scenes to delivery. |

#### `black_point` - Where the shadows sit
**CLASS:** GATE
**Ask:** Do the blacks go to true black, sit lifted, or carry a colour?
**Options:**
| Option | Description (from bible) |
|---|---|
| True black | Shadows sit at true black. The single most identifiable stylistic choice in a grade. |
| Lifted / milky | Shadows lifted off true black. |
| Tinted | Shadows carry a hue. |
| Crushed | Deliberately clipping shadow detail to black. Note that lifting crushed shadows lifts the noise with it. |

#### `highlight_rolloff` - Shoulder and highlight detail
**CLASS:** GATE
**Ask:** How fast do the highlights roll off, and where do we protect detail?
**Options:**
| Option | Description (from bible) |
|---|---|
| Soft photographic roll-off | Poole wants an image that could be printed on photographic paper, with texture in the highlights and texture in the black, so it does not feel like a video image. |
| Hard roll-off | How fast highlights roll off is what separates video from photographic. |
| Detail deliberately clipped | The colorist owns where detail is retained and where it is crushed or clipped. |

#### `saturation_strategy` - Technical saturation approach
**CLASS:** DERIVED from `saturation_emotional_register` and `skin_policy` | the technical method follows the intent: global saturation for a global register move, luminance or hue conditional for a selective one, split strategy wherever skin is being held out of the world move
**Ask:** Is saturation moved globally, or conditionally by brightness or by hue?
**Options:**
| Option | Description (from bible) |
|---|---|
| Global saturation | The bluntest tool in the room and rarely the right one. |
| Luminance dependent | Desaturating shadows and highlights while holding midtone saturation. The most common filmic move, because film stocks behave roughly this way. |
| Hue dependent | Pulling saturation out of one hue family, commonly greens or yellows, while holding or boosting another. How a world gets a dominant colour identity without looking tinted. |
| Split strategy (skin against world) | The Barbie case: skin tones pastel and not very saturated while pinks, turquoises and other colours really stood out. |

#### `saturation_emotional_register` - Saturation as an emotional tool
**CLASS:** GATE
**Ask:** What is the saturation move supposed to make the audience feel, and what is the risk?
**Options:**
| Option | Description (from bible) |
|---|---|
| Global desaturation | Reads as memory, grief, austerity, documentary truth, moral seriousness. Fails when applied to material with no other source of interest; the image just goes dead. |
| Selective desaturation, world down and one element held | Reads as focus, obsession, symbolic weight. Fails when too obvious; the held colour becomes a gimmick. |
| Global saturation lift | Reads as vitality, appetite, childhood, artifice, celebration. Fails when skin goes ruddy, product goes wrong, reds clip first. |
| Selective saturation, one hue family lifted | Reads as brand presence, world identity, fantasy. Fails and reads as a filter if the hue is not physically present in the world. |

#### `hue_scheme` - Dominant hue relationship
**CLASS:** GATE
**Ask:** What is the colour scheme of the world, and what motivates it physically?
**Options:**
| Option | Description (from bible) |
|---|---|
| Complementary orange and teal | Genuinely efficient because skin sits in the orange family, so pushing everything non-skin toward blue-cyan maximises subject separation with one move. The cliche is not the scheme, it is applying it without motivation. |
| Red and green | Aggressive, festive, or sickly depending on value and saturation. |
| Yellow and violet | Rarely used, high impact, reads as heightened or theatrical. |
| Analogous single family | All amber, all cyan, all green. Reads as immersion, oppression, or a controlled institutional world. Loses subject separation, so it needs contrast or value to do the separating instead. |

#### `temperature_policy` - Warm against cool
**CLASS:** DERIVED from `colour_temp_policy` (DEPT-01 Director of Photography) and `practical_fixtures` (DEPT-09 Production Design) | what reads warm and what reads cool is computed from the Kelvin values of the locked sources and in-frame fixtures against the rated white point, and the verdict of no usable separation or a faked split is a measurement of the shot material rather than a preference
**Ask:** What is warm in this world, what is cool, and is the separation actually there in the material?
**Options:**
| Option | Description (from bible) |
|---|---|
| Warm practicals against cool ambient or screens | Physically true, since domestic practicals run warm and screens, LED panels and daylight run cool. Creates depth for free because warm advances and cool recedes. Gives the colorist two independent handles that can be graded separately without a global tint. Carries meaning cheaply: warm equals human, domestic, safe, past, alive; cool equals institutional, technological, isolated, future, surveilled. |
| No usable separation | If the practical and the ambient are within a few hundred kelvin of each other, or the practical is not in frame or not motivating anything, the device fails. |
| Split faked with masks | Where separation was not shot, the colorist can only fake the split with masks, and masks on a moving subject in an interior are expensive and fragile. |

#### `skin_policy` - Skin tone protection
**CLASS:** GATE
**Ask:** How are faces protected from the look, and how many complexions are in the same frame?
**Options:**
| Option | Description (from bible) |
|---|---|
| Qualify skin before pushing the world | A hue/saturation/luminance qualifier or a tracked shape isolates faces so global moves do not drag them. Treat a LUT as a starting point and always run secondary correction per subject. |
| Per subject balance pass for mixed complexions | Mixed skin tones in one frame are the hard case. They require per subject balance passes, not one global compromise. |
| Warmth held in darker complexions under a cooling look | Melanin rich skin loses depth fast under cooling and under naive contrast increases. Keep warmth present in darker skin areas even while the rest of the frame cools. Do not boost saturation globally to make dark skin richer, because it over saturates lighter skin in the same frame. |
| Deliberately pushed, heightened skin | A pushed grade where environments and skin tones look unnatural or heightened can work for fantasy or comic book material, but it might jar the viewer if applied to a documentary or more natural feeling film. |

#### `local_shaping_toolkit` - Which local tools shape the frame
**CLASS:** GATE
**Ask:** How do we isolate parts of the frame, and what is the risk of each method?
**Options:**
| Option | Description (from bible) |
|---|---|
| Grads | Linear or radial density ramps for skies, floors, ceiling falloff. Risk: visible edge if the frame has strong horizontal features. |
| Vignettes | Draw the eye to centre or to a subject. Risk: reads cheap if too fast or too circular. |
| Tracked power windows | Follow a face, a product, a moving object. Risk: tracking failure on occlusion, softness mismatch. |
| HSL qualifiers and hue curves | Isolate by hue, saturation and luminance, or rotate hue surgically without a hard mask. Risk: chatter and buzzing edges on noisy or compressed footage, banding if pushed hard on 8 bit sources. |
| Relighting / shaping passes | Simulating a key or a bounce that was not there. Only convincing when it matches the physical light logic of the scene. |

#### `shape_vs_hue_tools` - Toolkit governed by depth of field
**CLASS:** DERIVED from `capture_format`, `working_stop` and `focal_map` (DEPT-01 Director of Photography) | depth of field is a physical result of format, stop and focal length: shallow coverage separates planes and permits shape based windows, deep focus collapses them and forces hue based qualifiers
**Ask:** Does the coverage give us shape based tools or force us into hue based tools?
**Options:**
| Option | Description (from bible) |
|---|---|
| Shape based tools on shallow depth of field | The background is already separated optically, so the colorist need not build separation. Power windows are easier because the soft background hides mask edges. Halation and bloom on defocused practicals is where most of the visible look ends up living. |
| Hue based tools on deep focus | Every plane is legible so every plane must be graded, and continuity errors in the background become visible. Power windows are dangerous because a soft edged mask crossing a sharp background edge is immediately visible. Secondaries by hue become the primary local tool because they respect edges automatically. |
| Separation carried by upstream palette | On deep focus, separation must come from value and hue, which means the colorist depends far more heavily on Production Design and Wardrobe having built real contrast into the world. |

#### `sky_and_screen_treatment` - Skies and in frame screens
**CLASS:** CONDITIONAL on a sky or an in-frame screen actually appearing in the locked shot list | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Are the skies and screens being graded, or manufactured, and who pays for it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Grade the sky in place | A sky that still has data can be graded: density via a grad, hue via a qualifier, cloud contrast via a luminance restricted contrast move. |
| Composite a replacement sky | A sky clipped to white cannot be graded, it must be replaced, which is a comp. Shoul will composite a new sky from another take or stock if possible, which is a favour, is billable time, and depends on the plate. |
| Isolate and grade a practical screen separately | If the screen content is correct in camera, isolate it and grade it separately so the show look does not shift the UI's brand colours. |
| Seat a VFX screen insert | The colorist grades the plate to final, VFX comps the screen insert, and the colorist does a final pass to seat the insert with matching grain, halation, black level and slight softness. Grain and noise mismatch is the number one tell of a bad screen comp. |

#### `film_emulation` - Photochemical character
**CLASS:** GATE
**Ask:** Should this feel like film, and if so, emulated at which level?
**Options:**
| Option | Description (from bible) |
|---|---|
| None | Ensby's counter position: he has pulled back a little from everything having to look like 35mm film. Both positions remain valid. |
| Stock response curve emulation | The characteristic S curve with its toe and shoulder, plus film's cross channel behaviour where density in one channel affects the others. |
| Bespoke stock emulation built with the DP | Lucas built a film emulation LUT plus a three strip Technicolor emulation with Prieto and Panzani, engineered into a proprietary Baselight plug in, to design the film stock as the basis for the final look. |
| Print emulation | The second stage. Grading to the target print stock, historically via printer lights. |

#### `texture_spec` - Grain, halation and patina
**CLASS:** GATE
**Ask:** What texture goes on the image, and what job is it doing?
**Options:**
| Option | Description (from bible) |
|---|---|
| Grain as dither | Breaks up banding in gradients, especially skies and soft falloff on walls. |
| Grain as unification | Seats VFX comps, stock footage, archive and mixed camera material into one texture. |
| Grain as perceptual sharpening | A finely grained image reads as more detailed than a clean one at the same resolution. |
| Halation, bloom and selective softening or sharpening | Red biased bloom around bright sources. Doyle used blurs and flares to keep focus on the lead's eyes, sharpening eyes and dropping down backgrounds. Omoshebi's warning is the counterweight: do not strip away the lovely imperfections. |

#### `hdr_policy` - HDR treatment and highlight ceiling
**CLASS:** CONDITIONAL on `delivery_matrix` containing an HDR deliverable | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Is HDR a second grade or a derivative, and how bright do the highlights go?
**Options:**
| Option | Description (from bible) |
|---|---|
| HDR as a second grade | Soret: some clients embrace HDR and it almost becomes a second grade. |
| HDR close to the SDR | Others do not, and the HDR looks almost the same as the SDR. |
| HDR as expansion | Some scenes explode with contrast and detail. |
| HDR as containment | Other scenes require a lot of containment because the image needs a subtler, softer approach. |

Highlight ceiling is set before any of the above: Ferstl's first rule is to establish the brightness levels and how far you want to push the highlights before you even start doing the creative colour.

#### `brand_colour_handling` - Brand and product colour (commercial only)
**CLASS:** CONDITIONAL on the job being commercial work with brand or product colours specified in writing | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Which colours are locked by the brand, and may the show look touch them at all?
**Options:**
| Option | Description (from bible) |
|---|---|
| Brand element fully held out of the global grade | The brand element (logo, pack, livery, uniform) is qualified and held out of the global grade. Brand colour is graded to spec independently and the look applies to everything else. Non negotiable in commercial work. |
| Brand element partially held out | The same qualifier approach, applied partially, so the element takes some of the show look. |
| Brand colour allowed to take the show look | The intake question is explicitly whether the brand colour may be affected by the show look at all. |
| Tolerance specified in Delta E | Brands specify identity colours as Pantone/PMS references and hex values, and increasingly specify tolerance in Delta E. Hex values are display referred sRGB and do not translate directly to a P3 or Rec.2020 grade, so somebody has to make the conversion decision consciously. |

#### `delivery_matrix` - Deliverables and cross platform strategy
**CLASS:** GATE
**Ask:** Every format, aspect ratio, duration, platform and territory. What is the full list?
**Options:**
| Option | Description (from bible) |
|---|---|
| Grade for a single optimised target | Optimising for one viewing condition. |
| Thick negative approach | Bogdanowicz aims to produce something that holds up across all formats and variables, almost making a thick negative as they used to say in the all film days, meaning a well exposed negative that could be manipulated later without an increase in grain. |
| One master, multiple derived formats | Doyle: HDR with its larger colour space and dynamic range is slowly moving the industry toward one master version of the film, from which the various delivery formats are generated. |
| Per platform versions each QC'd separately | One grade has to hold up on a calibrated broadcast chain, on a phone in daylight, on an in store LED wall, and on a print derived from a frame grab. Every deliverable has different levels, different compression, and different viewing conditions. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | `story_intent_and_arc` | Script | Any look conversation |
| 2 | `visual_worlds` | 1 | LUT design |
| 3 | `reference_set` (positive and negative) | 1, 2 | Camera test |
| 4 | `delivery_matrix` | Production / client | Colour space choice |
| 5 | `working_colour_space` | 4 | Camera test |
| 6 | `camera_lens_filtration_package` | DP | LUT design |
| 7 | `palette_lock` (Production Design and Wardrobe) | Design departments | Camera test |
| 8 | `brand_colour_handling` (commercial) | Client | LUT design |
| 9 | `camera_wardrobe_hair_makeup_test` with those departments present | 5, 6, 7 | Principal photography |
| 10 | `show_lut_structure` built, tested and locked | 9 | First day of dailies |
| 11 | `lut_vfx_safety` validated | 10, VFX | LUT distribution |
| 12 | `lut_distribution` to DIT, dailies colorist, every VFX vendor | 10, 11 | First day of dailies |
| 13 | `cdl_discipline` (who sets, who tracks, how it travels) | 12 | First day of dailies |
| 14 | `hdr_policy` and highlight ceiling | 4, 10 | Any creative HDR grading |
| 15 | `watch_the_cut_end_to_end` before touching anything | Editorial | The DI |
| 16 | `conform_verified` against the cut | Editorial, 15 | Grade start |
| 17 | `balance_pass`, neutral, matched, no look | 16 | Look pass |
| 18 | `look_pass`, scene level, big blocks only | 17 | Detail pass |
| 19 | `sizzle_reel_review` of scene selects in order | 18 | Detail pass |
| 20 | `shape_pass` (grads, windows, qualifiers, relighting) | 19 | Skin pass |
| 21 | `skin_policy` pass, per subject, per complexion | 20 | Texture pass |
| 22 | `brand_product_verification_pass` (commercial) | 21, 8 | Client review |
| 23 | `texture_spec` pass (grain, halation, softening, sharpening) | 21 | VFX seating |
| 24 | `vfx_seating_pass` | 23, VFX finals | Master render |
| 25 | `master_render_and_qc` | 24 | Trims |
| 26 | `hdr_trim_passes`, required 100 nit Rec.709 first, then optional targets | 25 | Delivery |
| 27 | `platform_and_aspect_versions`, each QC'd for levels and reframe safety | 26 | Delivery |
| 28 | `archive` (ACES2065-1 or camera native plus grade data, every LUT and CDL used) | 27 | Wrap |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Story intent, emotional arc, named references, explicit negatives, approval authority chain. Needed before camera test | Look is guesswork and the grade gets rebuilt late |
| Cinematography | Camera bodies, lenses, filtration, exposure rating and philosophy, lighting plan per scene block, colour temperature strategy per location, high speed and mixed format material list. Needed before camera test | LUT built on wrong assumptions, latitude unknown |
| Cinematography | Confirmation of which look elements are in camera versus deferred to the grade. Needed before shoot | Double application (diffusion in camera and in grade) or a gap |
| Production Design | Palette per set with named values, dominant hue per location, paint and material samples, any fluorescent or metallic surfaces. Needed before camera test | Separation problems that cannot be fixed with masks |
| Wardrobe | Palette per character per scene block, fabric samples, any fluorescent dyes, saturated blues, metallics, high contrast patterns. Needed before camera test | Out of gamut costumes, skin and costume conflicts |
| Hair and Makeup | Lipstick, foundation and any strong hue decisions, plus the complexion range of the cast. Needed before camera test | Hundreds of shot level fixes later |
| VFX | Plate list, which shots are comps, delivery schedule for finals, confirmation the show LUT does not break their keys, and the colour space they will work and deliver in. Needed before LUT distribution | Comps that will not seat, keying failures |
| Editorial | Locked or near locked cut, EDL/AAF/XML, media list, and the list of any speed changes, reframes or stabilisation applied. Needed before conform | Conform errors, grading shots that get cut |
| DIT / dailies | CDLs per shot, confirmation the correct show LUT is loaded, on set monitoring colour space. Needed daily | No trace of on set intent, disconnect at the DI |
| Production / Client | Full delivery matrix, per platform technical specs, review and approval chain. Needed before colour space lock | Wrong master, expensive re grades |
| Brand / Client (commercial) | Brand guideline document with Pantone and hex values, tolerance in Delta E if specified, product colour references, and which elements are immutable. Needed before LUT design | Brand colour violation discovered at client review |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Camera body swap, different manufacturer | IDT, show LUT, entire camera test, noise and latitude assumptions, VFX LUT re issue, dailies pipeline. Full re open: different sensor colour science means the LUT is invalid, not adjustable | Reference list, emotional arc |
| Camera body swap, same family | LUT validation, a confirmation test. Confirm, do not assume | IDT if the manufacturer states equivalence, look spec |
| Adding a second camera type mid shoot | Matching plan, second IDT, a match test between bodies, added grading time estimate. Budget event, flag to production immediately | Look spec |
| Lens package change | Texture spec (halation, flare, softness), any grade elements compensating for the previous glass, the test. Lenses change contrast and flare behaviour more than most people expect | Colour arc, palette |
| Filtration change, adding or removing in camera diffusion | Texture spec, the deferred versus in camera split with the DP, VFX plate cleanliness expectation. If diffusion moves from in camera to grade, the grade budget grows | Colour arc |
| Palette pivot from Production Design | Separation strategy, secondaries plan, saturation strategy per hue family, possibly the LUT if the dominant hue changed, the test. If the new dominant hue collides with skin, this is a full re derive | Emotional arc, delivery matrix |
| Wardrobe rule change | Skin and costume conflict analysis, qualifier plan, a fabric test. Fluorescents and highly saturated blues are the reliable emergencies | Colour arc |
| Hair and makeup change (lipstick, foundation) | Skin pass plan, a makeup test. Cheap to re derive in prep, brutal to fix in the DI | Everything else |
| Location swap | Ambient colour temperature assumptions, practical strategy, that scene's look, any grad or window plan built for the old geography. Scene level re derive, not project level, unless it is a hero location | Global look spec, LUT |
| Interior to exterior, or reverse, for a hero scene | Temperature contrast device, practicals plan, sky handling, the scene's place in the colour arc. The device that carried the scene may no longer exist | LUT |
| Brand colour rule change (commercial) | Qualifier plan for the brand element, verification pass, possibly the show look if the new brand colour collides with it, all delivered versions if already mastered. If already delivered this is a re master, not a note | Emotional arc |
| Product colour or packaging change | Product verification pass, any secondary built on the old colour, all masters containing the product | Everything else |
| New deliverable added, for example HDR or a new platform | Colour space validation, highlight ceiling policy, trim passes, per platform QC. If HDR is added after the SDR grade is locked, the highlight policy was never set and the HDR grade is a new pass, not a conversion | Look spec |
| Aspect ratio change | Every window, grad and vignette positioned relative to frame edges, plus reframe safety QC on all versions. Windows do not survive reframing | Look spec, LUT |
| VFX vendor change or new vendor added | LUT and CDL re issue, VFX safety re validation, colour space handshake with the new vendor | Look spec |
| Show LUT replaced or revised | Every grade built on the old LUT, all dailies, all VFX reference, all previously approved versions. The most expensive change in the list. Resist it after dailies begin | Reference list |
| Cut change (re edit) | Conform, shot matching at new cut points, any scene level flow decisions. Routine: design the node tree to survive it | LUT, look spec, palette |
| Director or DP replaced | Everything in Tier 0 and Tier 1 of intake. Start again at intent | Technical spine (colour space, IDT) if capture is unchanged |
| Approval chain change, new client side approver | Nothing technical | Approval chain section. Expect notes on already approved work, and re present with the reasoning, not just the image |

General rule: re derive anything whose inputs changed, relabel anything whose inputs did not. The failure mode to avoid is the middle path, quietly patching a grade built on invalidated assumptions because a re derive looks expensive.

### Output template
```markdown
# COLOUR PLAN: [PROJECT], v[N], [DATE]
Colorist: [name] | Status: DRAFT / TEST-VALIDATED / LOCKED

## 1. INTENT IN ONE PARAGRAPH
[What the image is doing for the story. No technical language. If this
paragraph is not true, nothing below matters.]

## 2. THE COLOUR ARC
| Act / Sequence / Block | Emotional register | Look direction | Felt or noticed? |
|---|---|---|---|
| | | | |

## 3. VISUAL WORLDS
| World | Where it appears | Distinct or continuous with others | Crossover points |
|---|---|---|---|

## 4. REFERENCES
### Positive
| Reference | Type (film / photo / painting) | Attribution (DP, photographer, era) | What we are taking |
|---|---|---|---|
### Negative (what this is NOT)
- 

## 5. TECHNICAL SPINE
- Working colour space:
- Camera(s) and IDT(s):
- On-set monitoring space:
- Show LUT: [one / more, and why]
- LUT provenance and validation status:
- VFX-safety check: [PASS / PENDING / N/A] by [who]
- CDL policy: [who sets, who tracks, how it travels]
- Grading system:

## 6. LOOK SPECIFICATION
- **Black point:** [true / lifted / tinted, and how far]
- **Highlight roll-off:** [hard / soft, and where detail is protected]
- **Contrast character:** 
- **Saturation strategy:** [global / luminance-dependent / hue-dependent, per range]
- **Dominant hue relationship:** [complementary / analogous / split, and what motivates it physically]
- **Temperature policy:** [what is warm, what is cool, and what motivates each]
- **Skin policy:** [protection method, complexion range in cast, per-subject pass required Y/N]
- **Texture:** [grain type and strength, halation Y/N, softening or sharpening, per-world variation]
- **Film emulation:** [none / stock emulated / print emulation, and source of the model]

## 7. DEPENDENCIES: WHAT I NEED AND BY WHEN
| From | Item | Needed by | Status | Blocking? |
|---|---|---|---|---|

## 8. WHAT I AM HANDING OTHER DEPARTMENTS
| To | Deliverable | By when |
|---|---|---|

## 9. SHOOT-SIDE REQUESTS (things only the shoot can fix)
| Request | Scene / condition | Why it cannot be fixed in the grade |
|---|---|---|
| [e.g. protect the window highlight] | | Clipped data is unrecoverable |
| [e.g. do not place talent against the window] | | HDR will make them read as less visible |

## 10. RISK REGISTER
| Risk | Scene / element | Likelihood | Mitigation | Owner |
|---|---|---|---|---|

## 11. BRAND & PRODUCT COLOUR (commercial only)
| Element | Pantone / Hex | Tolerance | Held out of the look? | Verified by |
|---|---|---|---|---|

## 12. DELIVERY MATRIX
| Deliverable | Colour space | Resolution / AR | Duration | Levels spec | Notes |
|---|---|---|---|---|---|
- HDR required: [Y/N] | Nit target: | Trim targets: | Highlight ceiling policy:

## 13. APPROVAL CHAIN
1. 
2. 
3. 
Final authority:

## 14. OPEN QUESTIONS
- [ ] 
```

---

## DEPT-03: EDITOR

**dept_id:** `editor`
**role_one_liner:** The last writer, the only person on the crew whose entire job is deciding what the audience will and will not see, in what order, and for exactly how long.

### Lockable decisions

**Classes:** 9 GATE, 6 DERIVED, 6 CONDITIONAL

#### `runtime_specification` - Is the runtime hard or soft
**CLASS:** GATE
**Ask:** What is the exact required runtime, and is it a purchased broadcast slot or a target?
**Options:**
| Option | Description (from bible) |
|---|---|
| Hard broadcast duration, exact to the frame | A 30 is 30 seconds, to the frame, because a broadcast slot is a purchased unit. Structure and pace are locked to each other from the first frame of assembly, and if a beat runs long another beat must lose exactly that duration. |
| Soft target | Features negotiate runtime. Commercials do not. |
| Stated as "about 30 seconds" | Under specification. Establish whether this is a broadcast slot. If yes, it is exactly 30 seconds and everything is arithmetic. |

#### `assembly_order` - Picture first or script first
**CLASS:** GATE
**Ask:** Do we build the sequence visually and place audio against it, or build the sound spine first?
**Options:**
| Option | Description (from bible) |
|---|---|
| Picture first | Build the sequence visually on its own logic, then place audio against it. Appropriate when the piece is performance driven, dialogue driven with sync sound, or when the visual event is the story. |
| Script first, the radio cut | The paper edit turned into a radio cut: an assembly driven strictly by sound with no regard for visuals. The test is explicit, does the story work if you close your eyes and only listen. Then flesh out with B roll, graphics, natural sound and music. |
| Script first, forced by full runtime VO | If the VO runs wall to wall, it is the spine. Its duration is the film's duration, every picture decision must land inside an existing word window, and any picture reorder is also a script reorder. Attempting picture first here produces a beautiful sequence the VO does not fit. |

#### `cut_point_placement` - Where exactly the cut lands
**CLASS:** GATE
**Ask:** Why this frame and not the one before it?
**Options:**
| Option | Description (from bible) |
|---|---|
| On the blink, at the end of a thought | Murch: a blink is emotional punctuation marking the end of one thought and the start of the next. If you cannot say what thought is ending and what thought is beginning, you do not have a cut, you have a splice. |
| Inside the performance | Coates described herself as very much an actor's editor who cut for performance rather than for action. The cut point is usually inside the performance, not at the tidy edge of the shot. |
| Frame level trim to perfect a join | The Lawrence match cut was perfected by taking two frames off the outgoing shot. That is the resolution the job operates at. |
| Sacrificed per the Rule of Six | When a cut cannot satisfy all six criteria, give away 3D continuity first, then screen geometry, then eye trace. Never give away emotion, which alone is weighted 51%. |

#### `continuity_vs_discontinuity` - Hide the cut or expose it
**CLASS:** GATE
**Ask:** Should the audience notice the joins?
**Options:**
| Option | Description (from bible) |
|---|---|
| Continuity cutting | Hides the cut. Match on action, respect screen direction, respect the 180 degree line, keep eyelines consistent. The intent is that the audience never notices the join. |
| Discontinuity cutting | Exposes the cut and uses it as an expressive device. Jump cuts, deliberate mismatches, temporal ellipsis, smash cuts. |
| Systematic discontinuity | A pattern of jump cuts reads as a voice. Discontinuity must be systematic. |
| Isolated discontinuity | One jump cut in an otherwise continuous piece reads as a mistake. |

#### `match_cut_rhyme` - Whether a join carries meaning
**CLASS:** CONDITIONAL on the shot design containing at least one adjacent pair proposed as a match cut or rhyme | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Do these two shots rhyme, and on what axis?
**Options:**
| Option | Description (from bible) |
|---|---|
| Graphic rhyme | A match cut joins two shots that share a graphic rhyme so the join itself carries meaning. |
| Motional rhyme | The same, on movement. |
| Conceptual rhyme | The same, on idea. |
| A dissolve in the same position | The Coates match was scripted as a dissolve and became a cut. Lean and Coates both recognised immediately that the harder join was the better one. A cut is almost always stronger than the dissolve that was scripted in its place. |

#### `montage_type` - How a montage is constructed
**CLASS:** CONDITIONAL on the piece containing a montage sequence | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** What kind of montage is this, and what sentence is it making?
**Options:**
| Option | Description (from bible) |
|---|---|
| Metric | Cut on a fixed frame count regardless of content. The fastest way to make a montage feel mechanical, and also the fastest way to make it feel musical. Use it on purpose, never by default. |
| Rhythmic | Cut driven by the content and movement within frame. |
| Tonal | Shots that share an emotional register and accumulate a theme. |
| Overtonal / associational | Combining metric, rhythmic and tonal. |
| Intellectual | Colliding shots to produce an idea that is in neither shot. |

Every montage needs an argument, not just a set of pretty images, and needs escalation: shot 6 must be doing more than shot 2 in scale, intensity or specificity.

#### `split_edits` - How audio and picture cuts relate
**CLASS:** GATE
**Ask:** Where does sound lead the picture, and where does it trail it?
**Options:**
| Option | Description (from bible) |
|---|---|
| J-cut | The audio of the incoming shot arrives before its picture. The audience hears the next scene before they see it. Effect: anticipation, momentum, pull through. |
| L-cut | The audio of the outgoing shot continues under the incoming picture. Effect: lingering, reflection, letting a line land on a listening face. |
| Straight cut on picture and sound together | Audibly abrupt. In a dialogue scene, if every audio cut is aligned with every picture cut, the scene has not been edited, it has been assembled. Split edits are the default in dialogue and under voiceover, not a special technique. |

#### `transition_use` - When a transition is justified
**CLASS:** CONDITIONAL on any join other than a straight cut being proposed in the edit | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Is this transition carrying information, or covering a problem?
**Options:**
| Option | Description (from bible) |
|---|---|
| Carrying information a cut cannot | A change of time, a change of place, a change of consciousness, or a deliberate softening at a structural boundary. |
| Hiding shots that do not cut together | Cop out. Fix the shots or fix the order. |
| Padding runtime | Cop out. A 20 frame dissolve is not content. |
| Decoration, or substituting for a missing beat | If the transition is the most interesting thing in the sequence, the sequence is weak. If the story needs a shot you do not have, a whip pan does not create it. Test: replace it with a straight cut, and if the piece is not measurably worse, the transition was decoration. |

#### `target_asl` - Pace band, stated as a number
**CLASS:** DERIVED from `runtime_specification` and `pace_and_tone_combination` | average shot length is arithmetic: locked runtime divided by the shot count the chosen cut speed implies, expressed as the band that result falls in
**Ask:** What average shot length are we cutting to?
**Options:**
| Option | Description (from bible) |
|---|---|
| 8 sec and above | Reads contemplative, observational, confident. Prestige drama, luxury brand film, testimony. |
| 4 to 8 sec | Reads classical, invisible, comfortable. Mainstream narrative, corporate film, most 60s. |
| 2 to 4 sec | Reads energetic, propulsive. Most 30 second spots, sports, retail. |
| Under 2 sec | Reads aggressive, kinetic, potentially exhausting. Trailer, montage sections, social hook stacks. |

Pace is shot frequency, not shot count. Adding runtime while holding shot count constant slows the film down; removing runtime while holding shot count constant speeds it up, whether anyone intended that or not.

#### `cuts_per_line` - Picture density against the read
**CLASS:** DERIVED from `target_asl` and `pace_band` (DEPT-08 VO Casting and Voice Direction) | picture changes per spoken line is arithmetic: line duration at the locked words per minute divided by the locked average shot length
**Ask:** How many picture changes sit under one spoken line?
**Options:**
| Option | Description (from bible) |
|---|---|
| 0 to 1 cut per line | The line is being trusted. The performance carries it. |
| 2 to 3 cuts per line | The line is being illustrated. Standard for VO over visuals advertising. |
| 4 or more cuts per line | The line is being outrun by the picture. The audience will retain the images and lose the words. |

#### `pace_and_tone_combination` - The two axes set separately
**CLASS:** GATE
**Ask:** What register is the piece in, stated in register words, and separately what cut speed?
**Options:**
| Option | Description (from bible) |
|---|---|
| Warm tone, slow pace | Family drama, heritage brand film. |
| Warm tone, fast pace | Upbeat lifestyle spot, wedding film. |
| Cold tone, slow pace | Psychological thriller, minimalist tech film. |
| Cold tone, fast pace | Action sequence, hard sell retail. |

Pacing and tone are orthogonal. Slowing the cut does not add warmth, it adds weight, and a cold piece cut slowly becomes colder because the audience has more time to sit inside the coldness. Tone is changed by shot selection, music, sound texture, what you hold on, and what you cut away from and toward.

#### `vo_read_request` - What is asked of the record session
**CLASS:** CONDITIONAL on `vo_exists_no_speaking_mouth` (DEPT-08) resolving to a voice-over existing, so that there is a record session to brief at all | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** What reads do we need delivered, and with how much air?
**Options:**
| Option | Description (from bible) |
|---|---|
| Read with pauses intact | A read is words plus air. The editor needs the VO delivered with the pauses intact. |
| Slower alternate read | Always request the slower read as well as the faster one. A read with too much air can always be tightened. |
| Faster alternate read | The session captures at least one slower and one faster full read. |
| Read with no air | A read with no air cannot be paced. A voice perfect in timbre but read flat out with no gaps leaves the editor no cut points. |

#### `held_shot_purpose` - What a hold is buying
**CLASS:** CONDITIONAL on the cut containing at least one shot running past its information floor | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** This shot runs past its information floor. What is the extra duration for?
**Options:**
| Option | Description (from bible) |
|---|---|
| Dread and suspense | Lee Smith on Dunkirk created tension through how long shots were held, tuning exposed soldier moments endlessly to sustain dread, while deliberately providing intermittent relief. |
| Interiority | Walker: cut from somebody looking very intently, then cut to something else, and it reads as though they are thinking about it. The hold on the look is what makes the following shot read as thought rather than as geography. |
| Weight and consequence | Scorsese encourages Schoonmaker to hold shots longer than feels comfortable, building tension before the cut. |
| Trust | A held shot tells the audience the filmmaker is not nervous. Frequent cutting reads, subconsciously, as insecurity about the material. |

The cost: a hold that carries no emotional charge is dead air. Hold on faces, decisions and consequences, not on scenery unless the scenery is the subject.

#### `duration_floor_allocation` - Minimum readable duration per element
**CLASS:** DERIVED from `runtime_specification` and the locked shot list | the minimum readable duration per shot type is a documented perceptual floor, and every shot is checked arithmetically against the frames the locked runtime actually gives it
**Ask:** Does every shot get enough frames to actually be perceived?
**Options:**
| Option | Description (from bible) |
|---|---|
| Close up of a known face or object | 8 to 12 frames. |
| New close up, new object | 16 to 20 frames. |
| Medium shot with action | 20 to 30 frames. |
| Wide establishing shot, new location | 1.5 to 3 seconds. |
| Shot containing readable text or a product name | 2 seconds minimum, longer for long words. |
| End card with a call to action | 1.5 to 2.5 seconds absolute minimum. |

Below the floor the shot is not perceived, it is only registered as motion.

#### `frame_budget_shape` - Section allocation across a 30
**CLASS:** DERIVED from `runtime_specification`, `reveal_beat_placement` and `end_card_handling` | seconds per beat are computed by taking the locked end card duration off the locked runtime and dividing the remainder across the named sections around the fixed reveal position
**Ask:** How do the required seconds get divided between beats?
**Options:**
| Option | Description (from bible) |
|---|---|
| Hook / setup | 3 to 5 sec. |
| Development / demonstration | 15 to 18 sec. |
| Reveal beat | 3 to 5 sec. |
| Resolution / payoff | 2 to 4 sec. |
| End card | 2 to 3 sec. |

This is a zero sum arithmetic problem, which is why commercial editors think in frame budgets per beat before they think in cuts.

#### `reveal_beat_placement` - Where the subject lands
**CLASS:** GATE
**Ask:** Where is the reveal, and what prepares it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Prepared, with a held shot immediately before it | Everything before the reveal exists to make it land. The reveal usually wants a held shot immediately before it, not immediately after. You buy attention with a hold, then spend it. |
| Given its own acoustic space | The reveal must not coincide with the busiest audio moment. |
| Placed in the last 3 seconds | If the reveal is in the last 3 seconds, the piece has no payoff, it has an ending. |

#### `end_card_handling` - The final branded frame
**CLASS:** GATE
**Ask:** How long does the end card hold, and how does the piece arrive at it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Duration set by reading speed | The end card has a duration floor set by reading speed, not by taste, plus legal, brand and legibility requirements. |
| Cut to the end card on the music's final hit | Habitual error. It makes the brand feel like a full stop rather than a destination. |
| Less time than the longest word needs | Habitual error. Giving the end card less time than the longest word on it needs to be read. |
| Trimmed to buy frames elsewhere | Failure mode. Always trim from the middle. In a runtime change, the end card allocation must be protected first, not last. |

#### `cutdown_construction` - How versions get made
**CLASS:** CONDITIONAL on `delivery_matrix` (DEPT-02) listing more than one duration or aspect ratio | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Is each version built, or exported?
**Options:**
| Option | Description (from bible) |
|---|---|
| Built from intent, as a system of assets | The professional position is that this is a system of assets, not one master with variations, and each version must be built for the platform's native viewing behaviour. |
| Derived by trimming or exporting the master | Rejected. Do not derive a new version by trimming an existing one. |
| Vertical as a re cut | Vertical is a re cut, not a re crop. The framing changes what the eye can find, which changes minimum shot durations upward. |
| 6 second cut carrying one idea | The 6 second cut has room for one idea. Choose it deliberately: usually the reveal beat plus the end card, nothing else. |

Sound off viewing means every essential story beat must survive muted. The hook is a separate craft problem: in a feed you have between one and three seconds to earn the viewer, which changes which shot goes first regardless of narrative logic.

#### `sync_authority_per_event` - Whether picture or sound yields
**CLASS:** GATE
**Ask:** At this sound event, does the picture move or does the sound move?
**Options:**
| Option | Description (from bible) |
|---|---|
| Picture conforms to sound | Where a specific sound event is structurally load bearing (a hit, a drop, a reveal sting), the director rules that picture conforms to sound at that point and the editor gives up the frame. |
| Sound conforms to picture | Everywhere else. The rule is decided per event, in advance, and written down. |
| Sync point expressed as a frame number | "SFX_WHOOSH transient peak lands at 00:00:14:07, one frame before the cut at 00:00:14:08." Sound and picture are conformed in different applications and the only thing that survives translation is a number. |
| Sync point expressed as prose | "The whoosh hits as we cut to the product." Unlockable. Refuse to lock, convert to a frame number and circulate for confirmation. |

#### `temp_music_policy` - How temp is used and flagged
**CLASS:** DERIVED from `temp_track_approach` and `music_route` (DEPT-10 Sound Design, Mix and Music) | editorial temp handling follows the locked sound department temp approach: where the final route is a licensed track already cleared, the temp is that track, otherwise the temp is chosen for function and declared as temp in writing
**Ask:** What is the temp, is the real track known, and how is temp love prevented?
**Options:**
| Option | Description (from bible) |
|---|---|
| Temp stylistically close to what is achievable | Mitigation against temp love, where the director, client or editor becomes attached to a track that was never licensable and every subsequent score is judged against a ghost. |
| Temp declared as temp in writing | State in writing that the temp is temp, at every review. |
| A version cut without music | Menke's method. Make the first pass with no music, work purely emotionally and dramatically, then lay the track and tune to the beats. Proves the picture stands alone. |
| Built on temp from frame one | Failure mode. You lose the ability to tell whether the cut works or the track works. |

#### `note_classification` - What class of work a note actually is
**CLASS:** DERIVED from the note itself measured against the locked decision set | class follows mechanically: a tweak touches no lock, a re-cut re-executes inside the existing locks, a re-derive invalidates a lock and reopens everything downstream of it
**Ask:** Is this note a tweak, a re cut, or a re derivation?
**Options:**
| Option | Description (from bible) |
|---|---|
| Tweak | Frame level, within the current structure. |
| Re-cut | Section rebuild, structure retained. |
| Re-derive | A pace, tone or runtime pivot that invalidates downstream work. The producer prices and schedules against the classification, and the director signs off on which class a note belongs to when it is disputed. |

### Dependency order

**Internal order (must lock before):**
Each step depends on all steps above it. If an upstream item is unresolved, mark it and note what downstream work is now provisional.

| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | `confirm_runtime_and_frame_rate` | Producer / client spec | Everything else is arithmetic against this |
| 2 | `assembly_order` | 1 | Must be stated explicitly before cutting |
| 3 | `radio_cut` (if script first) | 2 | The read must be approved before any picture is cut |
| 4 | `sentence_grid` (every VO sentence boundary timecoded) | 3 | If the VO is not final and runs full runtime, nothing downstream of this step can lock |
| 5 | `frame_budget_shape` per beat | 4 | Section durations must sum to exactly the required runtime |
| 6 | `log_the_selects` | 5 | not stated in bible |
| 7 | `identify_load_bearing_shots` | 6 | not stated in bible |
| 8 | `reveal_beat_placement` | 7 | Its timecode is fixed before cutting around it |
| 9 | `assemble` (all beats present, in order, no polish) | 8 | not stated in bible |
| 10 | `target_asl` and `cuts_per_line` applied and measured | 9 | Reconciled deliberately, not by feel |
| 11 | `cut_point_placement` refined per join | 10 | not stated in bible |
| 12 | `split_edits` added | 11 | not stated in bible |
| 13 | `held_shot_purpose` set and defended in frames | 12 | not stated in bible |
| 14 | `duration_floor_allocation` verified | 13 | not stated in bible |
| 15 | `temp_music_policy` applied, all temp flagged in writing | 14 | not stated in bible |
| 16 | `sync_authority_per_event`, every sync point frame numbered | 15 | not stated in bible |
| 17 | `sound_off_pass` | 16 | If the story breaks, fix the picture, not the mix |
| 18 | `runtime_verification` exact to the frame | 17 | not stated in bible |
| 19 | `note_classification` at review, then revise | 18 | Classify each note as pace, tone, structure or content before acting on it |
| 20 | `picture_lock` and turnover | 19 | Turnover to sound, VFX and grade with EDL, AAF, reference file at matching timecode, and a VFX shot list with frame ranges |
| 21 | `cutdown_construction` | 20 | Each version built from intent, not by trimming the master |
| 22 | `change_list_discipline` | 21 | Any post lock picture change is documented and circulated to every downstream department |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Named final cut authority, tone brief in register words, pace target as a number, the reveal beat identified | Without a stated pace target and a named approver, every note is arbitrary and the cut cannot converge |
| DP / Camera | Full coverage plan, confirmed captured shot list, sizes and angles per beat, screen direction notes, any deliberate line crossings, frame rate and any overcranking, camera move durations | Coverage determines which cuts are available at all. A beat with one angle cannot be paced, only trimmed |
| Sound | Design intent per section, named sync points with frame numbers, whether music is licensed or temp, the mixer's required turnover format, the stem structure | A sync point without a frame number is unlockable. The picture cannot be committed against an ambiguous audio target |
| VO / Casting | Final approved read delivered with pauses intact, alternate tempo reads, isolated takes per line, pronunciation locked mandatory wording | The read's duration and its breathing room define the film's structure when VO runs full runtime |
| VFX | Handoff frame ranges per shot, plate availability dates, whether a shot's duration can change after handoff, temp comps for offline | A shot that becomes a VFX handoff stops being trimmable. Its duration is now a contract |
| Music / Composer | Tempo, structure map, hit points, whether the cut leads the music or the music leads the cut | Determines whether pace is negotiable or fixed to a bar grid |
| Producer | Exact deliverable list, exact runtimes, review round count, lock date, legal wording requirements | Frame budgets cannot be allocated against an unknown deliverable list |
| Art / Wardrobe | Continuity notes and any known mismatches | Tells the editor in advance which joins will need a cutaway |

### Re-open triggers
A re open means the plan returns to an earlier step in the checklist and the affected downstream work is invalidated, not adjusted. The agent must state which step it is returning to.

| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Runtime change, any amount | Re open to step 5. The entire frame budget, every beat duration, the ASL even if no shot is added or removed because pace is frequency not count, all cutdowns, all sync points after the change. The end card allocation must be protected first, not last | not stated in bible |
| Pacing pivot, target ASL changes | Re open to step 10. Every cut point in the affected sections, the hold list because holds that read as tension at one ASL read as dead air at another, the split edit map, and almost always the temp music because the track's tempo was chosen against the old pace | not stated in bible |
| Tone pivot, register changes | Re open to step 6. Shot selection, not cut points: which take, which expression, which angle. The music. What the film cuts away from and toward | The ASL. Do not change it in response to a tone note unless the note also names a pace change |
| VO recast or re record | Re open to step 3. The radio cut, the sentence grid, every picture placement bound to a word, breathing room per line. If the new read differs in duration by more than about 5%, the frame budget re derives and beats will be lost or gained | not stated in bible |
| VO script wording change | Re open to step 4. The sentence grid from the changed line onward. Everything downstream shifts in time, so every sync point after it is invalid | not stated in bible |
| Shot added | Re open to step 5. The frame budget for its section, every neighbouring shot's duration because the added shot's frames are taken from somewhere, and the ASL for that section | not stated in bible |
| Shot removed | Re open to step 7. Whether the removed shot was load bearing. If it carried a story beat, the beat must be rebuilt from remaining coverage or the story changes. If no coverage remains, escalate: this is a reshoot question, not an editing question | not stated in bible |
| A cut becomes a VFX handoff | Re open to step 20 partially, then section 12 of the plan. That shot's duration is now frozen. Re derive the surrounding beat's frame budget against a fixed value, confirm handles, and re issue the VFX list. Any subsequent trim in that section must come from adjacent shots only | not stated in bible |
| Music track changes | Re open to step 10. The rhythm map, every cut placed against a beat of the old track, hit points, and whether the piece now leads or follows the music | not stated in bible |
| Sync point moves | Re open to step 16. The frame number, circulated to sound, and whether picture yields or sound yields at that point, decided by the director | not stated in bible |
| New deliverable or platform added | Re open to step 21. That version's intent, built from scratch. Do not derive it by trimming an existing version | not stated in bible |
| Aspect ratio added, vertical or square | Re open to step 21. Reframing per shot, and upward revision of minimum shot durations because a reframed shot takes longer to read | not stated in bible |
| Coverage discovered to be missing | Re open to step 7. Which beats are now unpaceable. Escalate to the director with the specific list of notes that can no longer be actioned | not stated in bible |
| Approver changes | Re open to step 1. Confirm the tone and pace targets with the new approver before continuing. Previous approvals of structure are not automatically inherited | not stated in bible |
| Any picture change after lock | Formal change list. Sound conform, VFX conform, grade conform. Every downstream department is notified with exact frame deltas. Nothing is changed silently | not stated in bible |

Standing rule: when any trigger fires, the correct first output is not a new cut. It is a restated Editor's Plan showing the new frame budget, the re derived ASL, and the explicit list of what has been invalidated.

### Output template
```markdown
# EDITOR'S PLAN
Project: [name] Version: [n] Date: [date]
Editor: [name] Approver: [name] Final cut authority: [name]

## 1. SPECIFICATION
Runtime (master): [MM:SS:FF, exact]
Frame rate: [fps] Timecode start: [TC]
Deliverables: [list every version with exact runtime and aspect ratio]
Sound-off requirement: [yes/no, which versions]

## 2. ASSEMBLY ORDER
Method: [script-first / picture-first]
Reason: [one sentence, e.g. "VO runs full runtime, therefore the read is the spine"]
Radio cut approved: [yes/no/na] Date: [date]

## 3. PACE AND TONE (stated separately)
Target ASL: [n.n sec] Measured ASL current cut: [n.n sec]
Target cuts per VO line: [n] Measured: [n]
Tone register: [3 to 5 adjectives, no tempo words]
Pace contrast plan: [where the piece deliberately slows or accelerates]

## 4. STRUCTURE AND FRAME BUDGET
| Beat | Intent | Start TC | End TC | Duration | Shots | Notes |
|---|---|---|---|---|---|---|
| Hook | | | | | | |
| ... | | | | | | |
| Reveal | | | | | | |
| End card | | | | | | |
| **TOTAL** | | | | **must equal spec** | | |

## 5. THE REVEAL BEAT
Located at: [TC]
What is revealed: [one sentence]
Preparation: [what the preceding 3 seconds do]
Held shot before reveal: [shot, duration in frames]

## 6. HELD SHOTS (deliberate, with justification)
| Shot | TC in | Duration | What the hold buys |
|---|---|---|---|

## 7. DURATION FLOORS
| Element | Content | Minimum required | Allocated |
|---|---|---|---|
| On-screen text | | | |
| Product / logo | | | |
| End card | | | |

## 8. SPLIT EDITS
[List every intended J-cut and L-cut with TC and frames of overlap]

## 9. SYNC POINTS (frame-exact, for sound)
| ID | Event | Picture frame TC | Audio landing TC | Notes |
|---|---|---|---|---|

## 10. TEMP ELEMENTS (all provisional, flagged)
| Element | Source | Licensed? | Risk |
|---|---|---|---|

## 11. LOAD-BEARING SHOTS
[Shots with no alternate coverage. Any note affecting these requires a reshoot, not a re-cut.]

## 12. VFX HANDOFF
| Shot | Frame range | Handles | Duration frozen? | Plate date |
|---|---|---|---|---|

## 13. CUTDOWN STRATEGY
| Version | Duration | Single retained idea | Built from intent or derived from master |
|---|---|---|---|

## 14. OPEN DEPENDENCIES (nothing locks until these clear)
| Item | Owner | Needed by | Blocks |
|---|---|---|---|

## 15. ASSUMPTIONS MADE
[Every value invented in the absence of a specification, listed explicitly]
```


---

## DEPT-04: VFX Supervisor / Motion Graphics Artist

**dept_id:** `vfx-and-motion-graphics`
**role_one_liner:** Owns everything in the final image that was not photographed as-is, plus the designed and animated screen imagery, and is accountable for a shot both before it is shot and after it is shot.

### Lockable decisions

**Classes:** 1 GATE, 3 DERIVED, 7 CONDITIONAL

#### `method_per_shot` - Practical vs digital vs hybrid
**CLASS:** GATE
**Ask:** For this shot, how much of it should be real on the day and how much should be made later?
**Options:**
| Option | Description (from bible) |
|---|---|
| Practical | Choose when the element touches an actor, casts light on an actor, or is in contact with a surface the camera can see clearly. Real light behaves correctly for free. |
| Digital | Choose when the element is unsafe, impossible, repeats across many versions, must change after the shoot, or must be brand-perfect in a way no physical build can guarantee. |
| Hybrid | Choose almost always: shoot the real thing, then fix, extend or replace parts of it. The digital work extends a real thing rather than inventing a fake one. |

#### `screen_playback_method` - On-set playback vs post screen replacement
**CLASS:** CONDITIONAL on a display or screen appearing in frame in the locked shot list | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** For this display, is the content running live during the take, or added afterwards?
**Options:**
| Option | Description (from bible) |
|---|---|
| On-set playback | Interactive light on the actor is free and correct, eyelines and timing and reactions are real, reflections and screen-in-screen are correct for free. Costs: content changes after the shoot require a reshoot, moire and refresh banding are a real risk that must be tested, unapproved legal or brand copy blocks the shoot, and prep burden is very high because all content must be finished before day one. |
| Post replacement | Shoot a blank, green or tracking-marked screen and comp the content later. Content changes are cheap, that is the whole point, no moire risk, unapproved copy is handled later, low burden on the day. Costs: interactive light must be faked with panels or lost, the actor plays to nothing, reflections are expensive or impossible, and the burden moves to post. |
| Post replacement with a luminance proxy | If the screen only needs to be read by the audience and its content is still in legal or client review, replace it in post but still play back a luminance proxy so the light and the eyeline are real. A grey card animation at the correct brightness and colour temperature is enormously better than a green rectangle. |

#### `screen_designation` - Hero screen vs texture
**CLASS:** CONDITIONAL on a display or screen appearing in frame in the locked shot list | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Must the audience actually read this screen, or only feel that it is real?
**Options:**
| Option | Description (from bible) |
|---|---|
| Hero screen | A screen the director will hold on and cut to because it moves the plot or clarifies a point. The audience must read it, so it needs a stated on-screen duration and one thing it must communicate. |
| Texture | Density that sells authenticity but is not meant to be read. Texture should be plausibly derived from the primary, because random noise reads as fake, and audiences can feel it if graphics are random and exist only to look cool. |

#### `tracking_strategy` - How the shot will be tracked
**CLASS:** DERIVED from `screen_playback_method` and `movement_plan` (DEPT-01 Director of Photography) | tracking need follows mechanically: post replacement under a moving camera requires markers on the bezel and inside the screen corners or a survey pass, a locked-off frame or live on-set playback requires none
**Ask:** How will we give post something reliable to lock the replaced screen onto?
**Options:**
| Option | Description (from bible) |
|---|---|
| Markerless | Works when the screen has visible edges, stable geometry and modest camera movement. Fails when the move is complex or something occludes the screen. |
| Markers on bezel and just inside the screen corners | Markers are cheap insurance. Not scattered across the middle where they will sit under the busiest graphics. Marker contrasts with the screen but is close in luminance to the surround so removal does not leave a halo. Minimum four visible at all times, ideally six, because fingers and heads will cover some. |
| Track the device, not the display | If the screen is fully occluded at any point in the move, the surrounding geometry must be trackable instead. |
| Add a survey pass | A slow, unoccluded pan over the whole device before or after the take. It costs 15 seconds and saves a day of matchmove. |

#### `clean_plate_policy` - Whether and how clean plates are captured
**CLASS:** DERIVED from `screen_playback_method` and `lighting_philosophy` (DEPT-01 Director of Photography) | plates are required wherever post replacement is locked, counted at one per lighting state per setup, and no clean plate is named in the bible as a failure rather than an option
**Ask:** Are we shooting the same frame with the offending element removed, and how often?
**Options:**
| Option | Description (from bible) |
|---|---|
| One clean plate per lighting state | The stated discipline: shoot one for every lighting state, not one per setup. Lock the camera, or if the camera moves repeat the exact move. Same lens, same stop, same focus, same lighting state, same frame rate. Shoot it immediately after the take, before anything drifts. |
| One clean plate per setup | Explicitly rejected by the discipline, which requires one per lighting state rather than one per setup. |
| No clean plate | The missing clean plate is a named failure mode: discovered three weeks after wrap, on the one shot that needed it. A clean plate is 30 seconds of shooting time and can convert a two-day paint job into a two-hour one. |

#### `token_spec_source` - Where the screen design system comes from
**CLASS:** CONDITIONAL on screen graphics or FUI existing, meaning at least one screen designated as hero rather than texture | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Whose written design rules are all the screens being built against, and who signed them?
**Options:**
| Option | Description (from bible) |
|---|---|
| Client design system / existing component library or token set | A single source of truth for consistency, holding design decisions as atomic variables in a platform-agnostic format so changing a value once updates every instance. |
| Written token spec authored by VFX and signed off | You do not need a design file to have a design system. When there is no shared source and no design team available, a written token spec does the same job. Slower to apply, equally authoritative, far better than nothing. Must state who signs it and by when. |
| No spec | Cannot design without it. On a shoot with 40 screens built by 4 artists across 3 weeks, consistency is not achievable by taste, only by a shared definition. |

#### `ui_redesign_stance` - Real product UI vs camera version
**CLASS:** CONDITIONAL on a real product interface appearing on a screen the audience is meant to read | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Are we putting the shipping interface on screen, or a version rebuilt for the lens?
**Options:**
| Option | Description (from bible) |
|---|---|
| Build the camera version | A real interface is designed for a viewer holding a device 30 centimetres from their face for as long as they like. A film frame may give the audience a display occupying 12 percent of the frame, at an oblique angle, for 1.4 seconds, with no ability to scroll, zoom or wait. Rebuild type larger, reduce to one primary plus one secondary plus texture, push contrast, thicken hairlines, slow micro-interactions to 400 to 600ms, replace copy with cleared copy. |
| Unify and filter real data into a consistent language | The response when real screens carry data from many systems and eras with no design consistency: create a consistent visual language and filter all the real data widgets into it, with unified layouts, colours and font sizes, and take deliberate creative licence such as adding clear alerts operational systems do not use. |
| Match the shipping product pixel for pixel | The client position in the standard tension. Resolved by reframing it as the camera version of the system, and won by showing an A/B frame grab at actual on-screen size, never by arguing in words. |

#### `interactive_light_method` - How the screen lights the actor
**CLASS:** DERIVED from `screen_playback_method` | the light on the face follows the playback method: real light where playback runs live, a gelled and dimmed LED panel substitute where the screen is replaced in post, and no screen light only where no screen faces the performer
**Ask:** Where is the light on the actor's face coming from if a screen is supposed to be lighting them?
**Options:**
| Option | Description (from bible) |
|---|---|
| Real light from on-set playback | The reason on-set playback keeps winning. Screen light adds depth and texture and is used as a dynamic lighting source. |
| Gelled and dimmed LED panel substitute | An LED panel gelled and dimmed to the screen's colour and intensity, driven by a rough animatic so the flicker timing matches, plus a bounce card fed by the panel, plus a colour rhythm plate recorded so the colourist can match. Always shoot a reference frame of a grey card and a chrome ball lit only by the screen. |
| No screen light | The actor has no motivated eyeline and their eyes will not track content that is not there, no catchlight so the shot reads dead, no colour spill on cheek, chin and collar. Adding spill in post requires roto of the face, which is expensive and never quite right on hair and edges. |

#### `screen_state_build_type` - Still, loop or triggered transition
**CLASS:** CONDITIONAL on a screen appearing in frame and carrying more than one state across the piece | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** For each screen state, is it a static frame, a running loop, or something an actor triggers on the day?
**Options:**
| Option | Description (from bible) |
|---|---|
| Still | The baseline unit of the build count. |
| Loop | Roughly 2x the work of a still. |
| Triggered transition with an on-set button press | Roughly 4x, because it needs a state machine and a playback programme. Interactive buttons can be isolated and programmed so an actor presses them in sequence and triggers different graphic loops per scene. |

#### `plate_move_record_method` - How the camera move through a seam is recorded
**CLASS:** CONDITIONAL on the design containing a practical push-through or a camera move through a seam that the digital side must inherit | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** For a practical push-through, how are we capturing the move so the digital side can inherit it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Motion control | Preferred. The digital continuation must inherit acceleration, not just position. |
| Encoded head | Acceptable. |
| Handheld | Last resort. |

#### `multi_format_approach` - How other aspect ratios are produced
**CLASS:** CONDITIONAL on `delivery_matrix` (DEPT-02) requiring more than one aspect ratio while screens or graphics are in frame | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** How do we get the vertical and square versions without wrecking the screens?
**Options:**
| Option | Description (from bible) |
|---|---|
| Design the smallest, most punishing frame first, then expand | Multi-format is a design constraint, not a delivery step. A hero screen designed for 16:9 loses its secondary information in 9:16 and its primary in 1:1. |
| Build every screen on a layered, resizable, token-driven basis | Reframing becomes a re-layout and not a rebuild. Modular building lets you react when a screen has to be regenerated at the last minute and makes the design responsive across wildly different screen sizes and aspect ratios. |
| Crop blindly | Rejected: reframe and re-layout, never crop blindly. The aspect ambush is a named failure mode, where vertical deliverables are requested after all screens were designed for 16:9 with information at the edges. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | Script breakdown, every shot flagged VFX / MG / both / clean | Nothing above it | not stated in bible |
| 2 | `method_per_shot` | Script breakdown | Written, with a one-line reason |
| 3 | Screen census, every distinct display enumerated by device, set, scene, `screen_designation` | Method call per shot | not stated in bible |
| 4 | `screen_playback_method` per display | Screen census | Locked before the shooting schedule is locked, because playback forces content completion before day one |
| 5 | `token_spec_source` written and approved | Playback vs replacement call | Cannot design without it |
| 6 | Screen build count, including `screen_state_build_type` per state | Token spec | Date the total. Valid only for the script version it was derived from |
| 7 | Content design and animation for anything on playback | Build count | Completed and QC'd against a proxy of the real bezel, before the shoot |
| 8 | On-set requirement sheet issued to production, covering `tracking_strategy`, `clean_plate_policy`, `interactive_light_method` | Content design and animation | At schedule build, then again the day before each setup. Playback operator gets finished content 48 hours before the shoot day minimum |
| 9 | Shoot supervision, data captured per shot | On-set requirement sheet | Nothing leaves a setup until its clean plate exists |
| 10 | Turnover from editorial: locked shots, handles, handoff frames, EDL, source clips, colour pipeline | Shoot supervision | not stated in bible |
| 11 | Matchmove and roto, in shot-difficulty order | Turnover | not stated in bible |
| 12 | Screen design for post-replacement screens | Matchmove and roto | Now, not earlier, because the actual on-screen size and duration are finally known |
| 13 | Comp: undistort, integrate, holdouts, glow, blur, redistort, regrain | Post-replacement screen design | not stated in bible |
| 14 | `multi_format_approach` derivation | Comp | not stated in bible |
| 15 | Brand, product and legal review | Multi-format derivation | Before finishing, not after |
| 16 | Final delivery in every required format | Brand, product and legal review | With an archive that can be reopened if the edit changes |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Which shots are hero, what each screen must say, tolerance for digital vs practical | Method and build count both derive from narrative weight |
| DP | Camera body, sensor mode, resolution, codec, frame rate, shutter angle, full lens list with focal length per shot, T-stop, filtration, lens grids, whether the head is encoded | Motion blur, distortion, defocus and screen brightness are all derived from these. Without them, integration is guesswork |
| DP / Gaffer | Lighting state per setup, colour temperature, whether the screen is a motivated key or fill, HDRI and reference ball capture permitted | Determines whether interactive light is real or must be faked, and what CG lighting matches |
| Editor | Locked shot list with handles, EDL/XML, the marked handoff frame for every practical push-through, and notification of any shot whose duration changes | On-screen duration determines screen legibility design. A shot shortened by 14 frames can make a hero screen illegible |
| Colorist | Working colour space, show LUT, whether VFX delivers scene-linear or display-referred, node structure across seams | Screen glow, black lift and brand colour accuracy are all colour-space dependent. Delivering into the wrong space silently destroys brand colour |
| Production Design / Art | Set materials and finishes, the actual devices, prop bezel dimensions or 3D-printed frames, screen sizes and aspect ratios, physical prop states | Without the bezel you design to the wrong safe area |
| Client / Brand | Design tokens or a signed written token spec, logo lockups and clear space, exact colour references, approved copy, approved legal text, product CAD or dimensioned drawings | Everything on a screen is brand-visible. Unapproved copy cannot be played back on set |
| Production | Shooting schedule, whether a playback operator and rig are budgeted, whether clean plate time is scheduled into each setup | Clean plates and survey passes must be in the schedule, not begged for on the day |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Camera body or sensor mode swap | Resolution and reframing headroom, noise/grain profile, screen moire test, colour pipeline check | Delivery filenames, camera name in the plan |
| Lens swap or new focal length | Distortion model, lens grid requirement, defocus behaviour, on-screen size of every screen in those shots, therefore hero screen legibility | Lens list in the plan header |
| Frame rate or shutter angle change | Motion blur match, loop durations of all animated content, any triggered timing on playback | Frame rate field |
| New scene added | Full build count re-total, screen census, consistency of any device that now appears in more scenes, aspect multiplier, on-set requirements for the new setups | Scene numbering downstream |
| Scene cut or merged | Build count re-total, whether a device now appears only once and may downgrade hero to texture, clean-plate needs | Scene numbering |
| New character added | Any device that character carries, any HUD or POV attached to them, eyelines and interactive light in their coverage | Cast list |
| Palette pivot / brand colour rule change | Every token value and every downstream build, contrast checks at actual on-screen size, screen glow and interactive light colour temp, colour-space verification of the new values | Token names, file names |
| A cut becomes a practical push-through | Plate over-run requirement, handoff frame, velocity and focus at seam, tracking strategy, clean plate of the target surface, colour treatment across seam. This is a new shot, not a modified one | The shot's slug line |
| Shot shortened in the edit | On-screen legibility of every hero screen in it, likely simplification to a single idea, possible downgrade to texture | Duration field |
| New aspect ratio added | Re-layout of every hero screen, safe-area check, information hierarchy in the tighter frame | Export presets |
| Playback operator or rig cut from budget | Every playback screen becomes a post replacement: roto estimate, interactive light substitute plan, comp days. Re-total the schedule | Vendor name |
| Product design revised | CAD or scan, all product hero shots, any screen showing the product, any UI that reflects the new hardware | Product name in copy |
| Legal copy changes | Any playback screen carrying it becomes post replacement, readability duration recheck | Copy deck reference |
| Colour pipeline or LUT change | Every delivered element re-verified, brand colours re-checked in the new space, screen glow and black levels | LUT filename |

### Output template
```
================================================================
VFX & MOTION GRAPHICS PLAN
Project: [name] Version: [n] Date: [YYYY-MM-DD]
Supersedes: [version, date]
Derived from: script v[n] dated [date] / shot list v[n] dated [date]
================================================================

1. CREW VISION (max 150 words)
 What the effects work is FOR in this film. The one integration
 principle everything obeys. What the audience must never notice.

2. METHOD TABLE
 Shot | Description | Method (practical/digital/hybrid) | Reason | Risk (L/M/H)

3. SCREEN CENSUS
 Device | Set/Scene | Hero or Texture | States | Loop/Still/Triggered |
 Playback or Post | On-screen duration (frames) | The ONE thing it says

4. PLAYBACK VS POST RATIONALE
 Per device, one line. Explicitly note every screen carrying copy or
 claims that are not yet approved.

5. DESIGN TOKEN SPEC
 Full colour / type / geometry / motion spec as written contract.
 State the source: client design system, or written by VFX and signed by [name] on [date].

6. BUILD COUNT (see B4 format)
 Screens subtotal / aspect multiplier / non-screen VFX / GRAND TOTAL
 STALENESS NOTE: this count is valid only for script v[n].

7. ON-SET REQUIREMENTS SHEET
 Per setup: markers (where), clean plate (yes/no, how long), lens grid,
 HDRI, chrome+grey ball, survey pass, playback rig, playback operator,
 estimated minutes required.

8. HANDOFF FRAMES
 Seam ID | Shots | Handoff TC and frame | Velocity at seam | Focus at seam |
 Colour treatment across seam | Marked by | Date

9. INTERACTIVE LIGHT PLAN
 Per screen that lights an actor: brightness, colour temp, timing of change,
 who owns it, tested at pre-light on [date].

10. DEPENDENCY REGISTER
 What I need | From whom | By when | What it blocks if late

11. DELIVERABLES
 Aspect ratios | Durations | Platforms | Colour space | Codec |
 Who approves brand-visible frames | Legal review date

12. RISK REGISTER
 Risk | Likelihood | Impact | Mitigation | Owner

13. ASSUMPTIONS
 Every value assumed in the absence of real data, flagged for re-derivation.
================================================================
```

---

## DEPT-05: The Casting Director

**dept_id:** `casting-director`
**role_one_liner:** The person who decides who the audience will be asked to believe, owning the breakdown, the search, the pool, the audition, the shortlist and its argument, availability and compliance, but not the final choice.

### Lockable decisions

**Classes:** 5 GATE, 2 DERIVED, 3 CONDITIONAL

#### `tier_assignment` - Which tier each on-camera human belongs to
**CLASS:** GATE
**Ask:** For this person on camera, how much do they have to be able to do?
**Options:**
| Option | Description (from bible) |
|---|---|
| Lead | Carries the through-line, the audience tracks their state across the whole piece. Must take direction, sustain across takes, change register, carry dialogue, hold a close-up in silence. Full spec depth. |
| Featured player | Named, seen clearly, has lines or a decisive action, the audience registers them as a person. Must deliver lines credibly, hit a mark, hold one clear intention, survive a close-up. Substantial spec depth. |
| Light-touch featured player | Named or clearly seen but with a single beat: a glance, a reaction, a handover, one word. Must be interesting in one frame, take a simple redirect, not pull focus. Focused spec depth. |
| Background extra | Populates the world, not intended to be individually registered. Must be plausible in the world, repeat an action, not look at camera. Group-level spec only. |

#### `type_or_person` - Casting a type versus casting a person
**CLASS:** GATE
**Ask:** For this role, are we finding the best instance of a category, or building around one specific human being?
**Options:**
| Option | Description (from bible) |
|---|---|
| Type | Starts from a category and finds the best available instance of it. Fast, defensible to clients, low-risk, and produces work that looks like other work. |
| Person | Starts from a specific human being's particular strangeness and reshapes the role slightly around it. Slower, harder to sell, and where every memorable performance came from. |

#### `professional_or_real` - Professional actors versus real people / street casting
**CLASS:** GATE
**Ask:** Does this role need a trained performer, or a real person the camera has never seen?
**Options:**
| Option | Description (from bible) |
|---|---|
| Professional | Buys repeatability, direction-taking, stamina across takes, dialogue capability, emotional control on cue, contract and usage clarity, agent-mediated logistics. Costs: the audience may recognise the face or the type, performance can read as performance, higher fee and quote structure. Right when dialogue-driven, multi-scene, emotionally graduated, tight schedule, complex blocking, heavy usage terms. |
| Real people / street cast | Buys unrepeatable authenticity, faces the audience has never seen, texture that reads as truth, sometimes a genuine skill. Costs: slower days, fewer usable takes, dialogue often unusable, availability chaos, no agent to solve problems, consent and rights handled from scratch, wardrobe and continuity risk. Right when face-driven, near-silent, single-scene, documentary register, period texture, crowd worlds, or any role where recognisability would break belief. |
| Hybrid | Usually correct and what the current award-winning work actually does: non-actors paired with award-winning leads, a non-actor lead surrounded by professionals, real faces sourced around a professional core. The more a role has to say, the more professional it should be. The more a role has to simply be true, the more real it can be. |

#### `segment_relationship` - The on-screen person's relationship to the target segment (advertising)
**CLASS:** CONDITIONAL on the piece being advertising with a defined target segment | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** In relation to the people we are selling to, who is this person on screen?
**Options:**
| Option | Description (from bible) |
|---|---|
| Mirror | Demographically the target. Works when the message is "this is for someone like you", the category is low-consideration, and recognition is the job. |
| Aspiration | Slightly ahead of the target in status, age, competence or looks. Works when the purchase is identity-driven and the buyer wants to become something. |
| Authority | Not the target at all: an expert, a professional, a maker. Works when the barrier is credibility rather than desire. |
| Beneficiary | The person the target buys for, such as a child, a parent or a partner. Works when the buyer's motivation is care rather than self-interest. |
| Antagonist / foil | The person the target is not, played for contrast or comedy. Works when the strategy is differentiation from a rival behaviour. |
| Absent | Nobody, or hands only, or a voice. Works when the product is the protagonist and any face would compete with it. |

#### `strategy_pole` - Relatability versus aspiration versus authority
**CLASS:** GATE
**Ask:** What is this ad asking the viewer to feel about themselves?
**Options:**
| Option | Description (from bible) |
|---|---|
| Relatability | If the answer is "seen", cast relatable and cast close to the segment. Some degree of similarity between viewer and on-screen figure is required, or the viewer is alienated rather than inspired. |
| Aspiration | If the answer is "capable of more", cast aspirational and cast one notch ahead. Aspirational work performs best when the on-screen person sits only slightly ahead of the target on the dimension being sold, so the well-cast neighbour outperforms the movie star for most everyday categories. Pushing too far into the unrealistic causes disengagement. |
| Authority | If the answer is "reassured", cast authority. |
| Both relatability and aspiration | A brief that asks for both usually gets neither. Force a choice. |

#### `search_channel` - Where each role is sourced from
**CLASS:** DERIVED from `tier_assignment`, `type_or_person` and `professional_or_real` | the sourcing route follows the locked role definition: agency submission against a breakdown for professionals, open call or street scout for real people, specialist community where a specific attribute or skill is required, targeted offer where a named person is the point
**Ask:** Where are we actually going to look for this person?
**Options:**
| Option | Description (from bible) |
|---|---|
| Agency submission against a breakdown | The default channel. On commercials the volume shape runs from thousands of submissions down to 50 to 100 actors brought in to read per role. |
| Open call | A public audition open to anyone, not agency-filtered. The channel that found young Forrest Gump at a Mississippi open call. |
| Street scout | Sourcing non-professionals directly from the world, documentary-rooted, used to fill large numbers of period-correct roles outside the established acting pipeline. |
| Specialist community | Widening beyond agency submissions into places where the specific skill lives, such as music schools, colleges and blues clubs, and accepting self-tapes from anyone who could plausibly play the part. When the role is genuinely specific, the pool is not where you find it. |
| Targeted offer | Listed as a search channel option per role. Further detail not stated in bible. |

#### `audition_design` - The format of each round
**CLASS:** DERIVED from `tier_assignment` and `professional_or_real` | round format follows the tier: leads run self-tape, then the room, then a callback with the director, with a chemistry read added wherever two locked roles share scenes, while background is cast from photographs and availability
**Ask:** How are we going to see this person, and what are we testing?
**Options:**
| Option | Description (from bible) |
|---|---|
| Self-tape | Has replaced the room as the default first round. Allows many more actors to have a go and lets you audition more people. Governed by a written spec covering framing, orientation, background, slate, take count, file naming and secure delivery. |
| The room | What Zoom auditions lose. Detail beyond that not stated in bible. |
| Callback with the director | Not a repeat of round one. Where the director tests direction-taking: can this person change what they are doing when asked, and does the changed version get better. |
| Chemistry read | Callback-stage tool pairing two or more candidates to test the relationship rather than the performance, used mainly on leads and on any pairing the story structurally depends on. Reads comfort, rhythm compatibility, whether one performer's energy makes the other better or smaller. Test contrasting pairings, not similar ones. |

#### `commitment_stage` - How a finalist is held
**CLASS:** GATE
**Ask:** How firmly are we holding this performer's date right now?
**Options:**
| Option | Description (from bible) |
|---|---|
| Avail / avail check | A non-binding request that the performer keep the shoot date open. A courtesy, not a booking. |
| Pin | Informal signal that the performer is one of the final two or three for the role. Production wants the time held but is not ready to contract. |
| First refusal | Used primarily on commercials. The decision is not made, but the performer agrees to contact casting before accepting another booking on the same dates, giving the original production the first opportunity to book. |
| Hold | The stronger form. Casting directors technically cannot hold performers under SAG rules, which is precisely why pinning and on avail exist as language. |
| Book / offer | The actual commitment. |

#### `attribute_cast_or_create` - Cast a physical attribute or create it
**CLASS:** CONDITIONAL on a role carrying a required physical attribute that could either be cast or built by hair and makeup | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Do we find someone who already has this, or do hair and makeup build it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Cast it | Default to casting it if the attribute is structural: bone, height, body. |
| Create it | Default to creating it if the attribute is surface: hair, ageing, colour, facial hair. Check lead time, because an elaborate created look changes the earliest call time and therefore who can work. |

#### `ensemble_contrast` - How the supporting cast is designed relative to the lead
**CLASS:** CONDITIONAL on an ensemble existing, meaning at least one supporting or featured role alongside the lead | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Are the supporting roles being chosen against the lead or alongside them?
**Options:**
| Option | Description (from bible) |
|---|---|
| Cast against the lead | If the lead is warm, cast at least one cold. If the lead is fast, cast one slow. A strong supporting cast reduces what the lead must explain. |
| Cast alongside the lead | Sameness in an ensemble is the most common and least visible casting error, because each individual choice looks correct in isolation. If everyone around the lead is flat, the lead has to generate the entire tonal weather alone, which forces bigger performance, which reads as acting. |
| Everyone in frame is an actor, not an extra | Where the lead is likely to turn to anyone at any moment and improvise, the lead's working method sets the minimum capability of everyone in frame with them. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | Enumerate every on-camera human from script, treatment and shot list | Nothing above it | Produce the complete list before any judgement |
| 2 | `tier_assignment` | Enumeration | Assigned using frame size from the shot list, not script prominence |
| 3 | Cross-check tiering against the shot list | Tier assignment | Any entity receiving a close-up or face-forward frame is at minimum a light-touch featured player. Promote and flag |
| 4 | `segment_relationship` (advertising only) | Tiering reconciliation | Set for every on-screen role before casting anyone |
| 5 | `type_or_person` | Segment relationship | Decide role by role and write the reason. A brief that is silent has defaulted to type for everything |
| 6 | `professional_or_real` | Type or person | Driven by dialogue load and repeatability demand |
| 7 | `ensemble_contrast` | Professional or real | Design the ensemble against the lead, checking deliberately for sameness across the supporting cast |
| 8 | Write the breakdowns | Ensemble design | Role, not actor. Range on age, precision on behaviour. Disclose all non-standard requirements. Include usage terms on commercials |
| 9 | Clear conflicts and exclusivity | Breakdowns | Before anyone is presented |
| 10 | `search_channel` per role | Conflicts cleared | not stated in bible |
| 11 | `audition_design` | Search channel | Which sides, what redirect will be given, what the self-tape spec is |
| 12 | Run round one, cut and order the tapes as an authored shortlist | Audition design | Three to five per role with a written argument each |
| 13 | Callback with the director | Round one shortlist | Test direction-taking, not repetition |
| 14 | Chemistry-test every load-bearing relationship | Callback | Using contrasting pairings |
| 15 | Present to the approval chain | Chemistry tests | With genuinely different options and a documented second choice per role |
| 16 | `commitment_stage` on the finalists | Approval chain presentation | Confirm real availability against the 1st AD's schedule |
| 17 | Book, contract, confirm usage, conflicts and options | Pin / avail / first refusal | In writing |
| 18 | Hand off to Wardrobe, Hair and Makeup, 1st AD and Production | Booking | Immediately on booking, never later. Availability to 1st AD before the schedule is published |
| 19 | Hold the second choice live | Handoff | Until the shoot day is complete |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Tonal register, acting style, whether performance is naturalistic or heightened, whether improvisation is expected | Improvisation-heavy direction forces everyone in frame to be an actor, not an extra. Register determines the entire pool |
| Director | Which relationships are load-bearing | Determines what gets chemistry-tested |
| DP | Shot sizes per character, lens plan, how much of each person is actually in frame, whether faces are lit or silhouetted | Determines tier. A background performer with a close-up is a featured player. Determines how much specification each role needs |
| DP | Skin-tone and lighting approach | Casting must not deliver a face the lighting plan cannot serve |
| 1st AD | Shoot dates, day-by-day scene order, which roles work which days, turnaround and minors' hour limits | Determines availability, holds, and whether a preferred candidate is castable at all |
| Wardrobe | The costume plan, silhouette intent, whether costume is period, sizing latitude, whether anything is pre-built | Body type and size are casting constraints when garments exist already. Period silhouette constrains physique |
| Hair and Makeup | The grooming plan, whether prosthetics, ageing, hair change, tattoo cover or facial hair is planned, lead time per look | Determines whether a physical attribute must be cast or can be created. Also sets earliest call time, which constrains who can work |
| Production Design / Locations | The world of each location and who plausibly populates it | A location change creates a new population of characters that must be cast |
| Producer / Line Producer | Cast budget by tier, union status, territory, travel and accommodation allowance | Determines the achievable pool and whether out-of-market casting is possible |
| Agency / Client (advertising) | Segment definition, strategy pole, usage terms, conflict categories, approval chain, campaign extension intent | Determines the segment relationship, the deal, and who can legally accept |
| Writer / Director | Whether dialogue can be trimmed for a role | Enables real-people casting on roles that currently speak |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| An ensemble is added, a group appears where there was one person or none | The whole ensemble contrast check against the lead. What the lead now has to carry, which usually decreases. Tiering of every new member. Whether any new member gets a frame that makes them featured. Budget by tier | Headcount totals, call sheets, the enumeration table |
| An age change on any role | Wardrobe register, makeup and hair plan, location plausibility, relational geometry with every other character, segment relationship if advertising, physical action feasibility, the pool and search channel | The number in the breakdown |
| A gender change on any role | Every assumption the scene was silently making about that character. Dialogue that now reads differently. Relational geometry. Wardrobe from scratch. Whether the change creates or removes a sameness problem in the ensemble | Pronouns, name |
| A framing rule change that puts previously-unseen faces on camera | Tiering of every affected background performer. Whether the background world was specified at all. Whether the crowd can survive being seen. Budget, because featured performers cost more than background. Possibly the entire background sourcing approach | Nothing. This is a full re-open of the background plan and is the most commonly under-reacted-to trigger |
| A location change adding a new world | The population of that world from scratch: who plausibly exists there, at what ages, in what dress, in what numbers. New specs for any named entity in the new location | Location name in existing specs |
| The director changes | Tonal register, acting style, whether improvisation is now expected, which may promote every extra to actor, the shortlist arguments, possibly the entire pool | Contact details |
| The strategy pole flips, relatability to aspiration or the reverse | Every segment relationship. Age, grooming, attractiveness register, accent, and how finished each person should look. Frequently the whole cast | The strategy line in the deck |
| Usage, term or territory changes | Who can legally accept. Conflicts clearance for every booked and shortlisted performer. Deal structure and total cast cost. Possibly the entire shortlist | Contract paperwork, if nobody's conflicts are affected |
| A conflict is discovered on a booked performer | That role, from the shortlist forward. Verify the second choice is still available and still conflict-clear | Nothing else, if the second choice holds |
| The schedule moves | Availability of every booked and pinned performer. Minors' hour limits. Whether the preferred performer is now castable or now lost | Dates on the cast list |
| Wardrobe locks a built costume before casting | Body-type constraints on the affected role, and therefore the pool | Sizing notes |
| A dialogue line is added to a real-people role | Professional-versus-real decision for that role. Very likely a re-cast | Nothing. Do not paper over this one |
| Budget is cut | Tier allocation: what moves from featured to light-touch, from professional to real, from cast to not-seen. What the lead must now carry alone as a consequence | Budget spreadsheet |

### Output template
```
# CASTING PLAN

## 1. BRIEF SUMMARY
Project, format, runtime, register, shoot dates, territory, union status.
Cast budget by tier.

## 2. STRATEGY (advertising only)
Target segment (as given by strategy, not invented):
Strategy pole chosen: RELATABILITY | ASPIRATION | AUTHORITY (one, not several)
Rationale in two sentences:
Campaign extension intent: YES / NO. Options to negotiate:

## 3. FULL ON-CAMERA ENUMERATION
Every human who appears, from every source document. Numbered.
Source column shows where each was found (script / treatment / shot list / location logic).

| # | Character | Source | Tier | Screen time | Largest shot size | Speaks? |

## 4. TIERING RECONCILIATION
Any character whose shot-list frame size promotes them above their script prominence.
Any character named in the shot list with no script presence.
FLAGS RAISED TO DIRECTOR:

## 5. PER-CHARACTER SPECS
For each character, at the depth its tier requires:

### [Character name] / Tier: [lead / featured / light-touch featured / background]
- Age range:
- Gender:
- Physical read (what the audience must believe in frame one):
- Interior life:
- Register / acting style:
- Dialogue and skill demands:
- Segment relationship (advertising): mirror / aspiration / authority / beneficiary / foil
- TYPE or PERSON, and why:
- PROFESSIONAL or REAL, and why:
- Search channel:
- Wardrobe implication:
- Hair and makeup implication:
- Chemistry pairings to test:
- Second choice policy:

## 6. BACKGROUND AND CROWD WORLDS
Per location: world description, headcount, age and gender distribution,
wardrobe register, any individual who must be cast to featured standard
because of the DP's plan.

## 7. ENSEMBLE CONTRAST CHECK
Lead's dominant register:
Deliberate contrasts placed in the supporting cast:
Sameness risks identified and resolved:

## 8. BREAKDOWNS (as they will be distributed)
One per role, in distribution language, including all non-standard
requirements and, on commercials, usage terms.

## 9. AUDITION DESIGN
Sides selected per role:
Self-tape specification:
The redirect that will be given, and what it tests:
Chemistry-read pairings and the contrast each pairing probes:

## 10. DEAL AND COMPLIANCE
Usage: term / territory / media
Exclusivity and conflict categories:
Buyout or session-plus-use structure:
Options for extension:
Minors, permits, guardians:
Consent and release for real-people casting:

## 11. APPROVAL CHAIN
Layers, in order, with veto rights noted:
Presentation strategy (three genuinely different options per role):
Documented second choice per role:

## 12. DEPENDENCIES (nothing locks until these clear)
From Director:
From DP (shot sizes per character):
From Wardrobe:
From Hair and Makeup:
From 1st AD (schedule):
From Producer (budget):
From Client (usage, conflicts):

## 13. ASSUMPTIONS MADE
Every assumption made in the absence of an answer, stated plainly
so it can be overturned cheaply.
```


---

## DEPT-06: COSTUME DESIGNER / WARDROBE STYLIST

**dept_id:** `costume-and-wardrobe`
**role_one_liner:** The seat that takes a script or board, shot list, cast list, set and location plan, palette brief and brand rules, and produces a wardrobe plan any crew can execute without asking a question.

### Lockable decisions

**Classes:** 5 GATE, 5 DERIVED, 4 CONDITIONAL

#### `palette` - Which hues each character occupies and how that changes across the story
**CLASS:** GATE
**Ask:** How is colour assigned across the cast, and what system lets an audience tell people apart?
**Options:**
| Option | Description (from bible) |
|---|---|
| Per-character colourway derived from an in-story object | Durran's Little Women method. Each character is assigned a colourway derived from an object inside the story. Not decoration, an identification system that lets the audience track similar-looking characters in a crowded frame with no dialogue. |
| Family or faction level palette system | Mirojnick's Bridgerton method. One family in soft dusty pastels, the rival family in acid fruit colours. One glance tells you which house a character belongs to. |
| Neutral scheme, palette expressed as value and texture | Neutrals buy you: set and product own the colour, faces stay the most saturated thing in frame, nothing dates, nothing fights the brand hex, maximum grade latitude, calm wides. Cost: character separation collapses, the DP inherits the separation problem, value flattening in the mid-tones, memorability loss. If chosen, every character still gets a distinct signature expressed as a luminance position and a material. |
| Colour as symbolic architecture | Canonero's approach. Palette decisions get made from a physical sample in a room, not from a deck. |

#### `palette_strategy` - Relationship between wardrobe palette and set palette
**CLASS:** GATE | separation, integration or deliberate collision is a directorial choice per location, not a computation. Hue and value distance can describe a relationship after the fact but cannot decide whether wardrobe should fight its set, which is a tonal decision the user owns. Ask it against the locked set anchor from `palette_anchor` (DEPT-09) so the choice is informed, but do not derive it
**Ask:** Per location, does wardrobe stand out from the set, sit inside it, or fight it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Separation | Wardrobe sits in a hue or value band the set does not occupy. The character reads as figure against ground. The default for most narrative and almost all product-adjacent commercial work. |
| Integration | Wardrobe sits inside the set palette. The character belongs to the world, is absorbed by it, or is camouflaged in it. Powerful, but requires the DP to buy in and light for separation by luminance or backlight instead. |
| Deliberate collision | Wardrobe is chosen to fight the set. Reserved for a specific dramatic beat, an outsider, a rupture. A scene-level decision, not a film-level one. |

Failure modes if this is not declared: disappearance, where a character in muted earth tones vanishes against a naturalistic earth-toned set and the DP has to solve it with separation lighting that may not suit the scene. Collision, where a character in saturated primaries fights a high-contrast set palette and the frame becomes noisy with nowhere for the eye to rest.

#### `silhouette` - The outline the body makes
**CLASS:** GATE
**Ask:** What shape does each character cut before any garment detail is decided?
**Options:**
| Option | Description (from bible) |
|---|---|
| Period-diagnostic silhouette | Silhouette is period-diagnostic in a way colour is not. It reads first at distance and in wide shots. |
| Historically matched silhouette from reference | Mirojnick on Oppenheimer worked from reference images across every decade of a life, including a 1970s silhouette that matched the historical figure's actual proportions. |
| Legible-to-a-modern-audience silhouette across many periods | Keep the costumes readable to a contemporary audience while the piece travels through multiple periods. |
| Restraint / minimal | Mirojnick has described learning the joy of being restrained and working minimally. |

#### `fabric_and_texture` - Weight, weave, sheen, drape, behaviour in motion
**CLASS:** GATE
**Ask:** What is each garment actually made of, and how does it move and hold light?
**Options:**
| Option | Description (from bible) |
|---|---|
| Fabric-first method, garment before sketch | Powell's method. Research books with a chapter per character, then straight to fabric. The idea for a costume often arrives standing in a fabric shop rather than from paper. Sketching comes after the garment exists and the actor has tested it. |
| Matte fabrics | Matte fabrics hold colour and shape. |
| High-sheen fabrics (satin, patent, metallic, coated synthetics) | Create specular hits that clip white regardless of the garment's base colour, and those hits move with the actor. A legitimate design tool when intended and lit for, a liability when it arrives by accident. |
| Custom-engineered textile | Atwood on Wednesday could not find a fabric with the right gradation of black to grey on camera, so she had the fabric hand painted and hand silk screened to get it, specifically to avoid a strobing effect. Custom dyeing hits a palette that does not exist commercially. |

Texture is what survives compression and small screens after colour has been flattened by a grade.

#### `period_accuracy` - Where the accuracy dial is set
**CLASS:** CONDITIONAL on the piece being set in an identifiable period other than the present day | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** How strictly does this follow the real period, and who sets that?
**Options:**
| Option | Description (from bible) |
|---|---|
| Documentary-strict | One of the two tolerances the role must ask for on intake: documentary-strict, or vibe-accurate. |
| Vibe-accurate | The looser of the two stated tolerances. |
| Deliberate departure from period rules for story reasons | Durran did not hold strictly to Victorian dress rules on Little Women, layering in a vibrancy that paralleled the family's radicalism and putting her lead in corset-free clothes she could move in. |
| Convincing period pastiche derivative of nobody | Bridges on Phantom Thread built 1950s couture convincing enough to pass as the work of a real couturier of the period, while being derivative of none of them. |

Accuracy is a dial, not a switch, and the director sets it. The director must set a single accuracy dial for the whole film so that costume and grooming calibrate to it.

#### `character_arc_expression` - How clothing changes when the person changes
**CLASS:** CONDITIONAL on the script giving at least one character a change of state across the piece | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** What does each character's clothing say, and how does it change across the piece?
**Options:**
| Option | Description (from bible) |
|---|---|
| Function-driven garment logic per operational mode | Carter on Black Panther. A character undercover in a casino full of world travellers is put in a chic dress because that is camouflage in that room. The same character in a different operational mode is dressed to disappear among captives. Same person, different function, different garment logic. |
| Script breakdown to arc to palette | Carter's theatre-formed method: break down the script, find a character's arc, then arrive at a colour palette. |
| Costume as the actor's access tool | Phillips describes costume details as a way to help the performer access the character. On Once Upon a Time in Hollywood the most character-defining decisions were footwear: cowboy boots to carry the machismo of a fading star, moccasins to signal a man comfortably in step with the times. |
| Time, place, economic status, interior feeling and outward intent | Bridges' stated method: mindful of time, place, economic status, how somebody feels inside and what they are trying to do in the world outside. |

Clothing has to change when the person changes, and the change must be legible without being announced.

#### `contemporary_realism_level` - How lived-in contemporary clothing reads
**CLASS:** CONDITIONAL on the piece being set in the present day | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Are these clothes meant to look owned and worn, or newly presented?
**Options:**
| Option | Description (from bible) |
|---|---|
| Wear, not damage | Softened collars, slightly stretched necklines, faded knees, a belt worn to a specific hole, shoes creased where a foot actually bends. Breakdown at low intensity. The difference between "clothing" and "his clothing." |
| Mixed provenance | Real people do not buy an outfit. They own garments from different years, price points and fit qualities, worn together. A perfectly coordinated contemporary look reads as costume. |
| Fit imperfection with intent | One garment slightly too big or too small, in the way a real person tolerates. |
| The repeat garment | Real people rewear things. If the story spans days, deliberately repeating one item with a different second layer is one of the strongest realism signals available and it costs nothing. |

Supporting requirements stated in the bible: correct body-adjacent details (watch, phone, lanyard, wedding band, bag wear pattern, what is in the pockets and whether it visibly deforms them), and grooming coherence, because wardrobe realism collapses if hair and makeup are at a different level of finish.

#### `breakdown_and_aging` - Deliberate degradation level per garment
**CLASS:** DERIVED from `finish_level` (DEPT-09 Production Design) and `contemporary_realism_level` | the degradation level per garment follows from the locked finish level and realism level, stated on the scale from level 0 new through low-intensity breakdown to full distressing
**Ask:** How worn, dirty or damaged is each garment, on a stated scale?
**Options:**
| Option | Description (from bible) |
|---|---|
| Level 0, new | The template scale runs 0 new to 5 destroyed. Everything arriving looking new reads as costume. |
| Low-intensity breakdown | Wear rather than damage: softened collars, faded knees, creased shoes. |
| Breakdown / aging | Deliberate degradation of a new garment to make it read as worn, dirty, damaged, or lived-in. Done by textile artists and dyers under the designer's direction, using dye, sandpaper, wire brush, grease, wax and airbrush. |
| Distressing (mechanical damage subset) | In stricter usage, breakdown is the whole discipline and distressing is the mechanical damage subset: abrasion, tearing, fraying. |

#### `brand_colour_rule` - Reserve or flood, commercial only
**CLASS:** CONDITIONAL on the job being commercial work with a brand hex specified in writing | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Does the brand colour stay off the talent so the product owns it, or does it flood the whole world?
**Options:**
| Option | Description (from bible) |
|---|---|
| Reserve the hex, keep it off every garment | The brand colour is declared exclusive to the product, pack, logo and end frame. No garment, accessory or prop in a talent's hand carries it. Every time that colour appears the eye goes straight to the product because nothing else competes for that wavelength. Use when the product is small in frame or appears late, when the film is product-demonstration or product-hero, when the brand colour is high-saturation (a saturated red, orange or yellow will always beat a face for attention), or when multiple SKUs must be individually legible. |
| Flood: dress the talent in brand colour | The brand colour becomes the atmosphere. Talent, set, props and grade all live inside it. The product does not need to pop because the entire film is already the brand. Use when the brand colour is the primary asset and near-universally recognised, when the piece is a brand film, anthem or identity spot rather than a product demo, when the product is physically large or is the environment itself, or when the brief calls for ownership of a colour as a category-level claim. Cost: you lose the product's automatic pop and must buy attention back with light, motion, scale or contrast in another dimension. |
| The split | Offered in the bible as the resolution when the client wants talent in brand colour on a product demo. Brand colour appears on one designated character or one designated garment area and is reserved everywhere else. Or brand colour appears in the environment and never on talent. Present it as two named strategies with named consequences, not as a refusal. |

Governing rule for all options: never state a brand colour rule without a named hex or Pantone and a named tolerance. "Avoid brand colours" is an under-specification that will be resolved incorrectly by whoever is standing at the rail at 6am. A real instruction names the reserved hex, the hue range, and the saturation and luminance thresholds where the rule stops applying.

#### `on_camera_risk_verdict` - What each garment does after a lens, sensor, codec, grade and compression pass
**CLASS:** DERIVED from `fabric_and_texture`, `palette`, `capture_format` and `show_lut` (DEPT-01 Director of Photography) | the verdict per garment is physics and codec behaviour, not taste: pure white clips before a face is correctly exposed, pure black crushes and loses weave, high-saturation red and orange smear under chroma subsampling, and fine repeating pattern moires against the sensor
**Ask:** Which garments will misbehave on camera, and what replaces them?
**Options:**
| Option | Description (from bible) |
|---|---|
| Pure white, replaced by off-white, bone, ivory, oyster, ecru or pale warm grey | Pure white blows out. If exposure is set for a correctly rendered face it clips to featureless paper, loses all texture and seam information, and pulls the eye off the face. Worse with darker-skinned talent because the exposure gap between skin and garment is larger. |
| Pure black, replaced by charcoal, ink, deep navy or near-black with visible weave or sheen | Pure black crushes. Against lighter-skinned talent exposed correctly a true black garment becomes a formless hole with no shoulder line, no lapel, no fold. |
| High-saturation red and orange, replaced by oxblood, brick, rust or burgundy | Red is the first channel to clip in most sensors and the least gracefully recoverable in a grade. Reddish-orange sits adjacent to the skin-tone hue family, so it contaminates faces with bounce and makes the colorist's skin-tone qualifier unreliable. Use saturated red only as a deliberate, controlled event in the frame. |
| Chroma-day palette: blue, orange, yellow, purple, grey, black, tan, off-white | On greenscreen days, no green anywhere on talent including bright, olive, moss, khaki, or a green thread in a mixed weave. No shiny or reflective fabric, because it will mirror the backdrop and the key will punch holes through the garment. Same logic applies inverted on bluescreen. |

Also in scope of this verdict: fine, high-contrast, regularly repeating patterns (thin stripes, small checks, herringbone, corduroy, houndstooth) beat against the sensor's photosite grid and produce moire that moves when the actor moves, cannot be reliably removed in post and is not fixable by the colorist. The failure is scale-dependent and distance-dependent, so a patterned garment must be camera tested at the actual lens and actual distance. And metamerism: two fabrics that match under one light source can visibly diverge under another, more aggressively under narrow-spectrum LED than continuous-spectrum sources. Fabric approval under office light is not approval.

#### `continuity_method` - The record that keeps an out-of-order shoot coherent
**CLASS:** DERIVED from `breakdown_and_aging`, `multiples_count` and the locked shooting order | the record type follows mechanically: a costume plot and wearing-state notes wherever the schedule shoots out of order, plus continuity stills per look per damage state, one entry per state the locked breakdown scale defines
**Ask:** How is the wearing state of every look recorded and rebuilt on a later day?
**Options:**
| Option | Description (from bible) |
|---|---|
| Continuity book / costume bible | The master document tracking every change against script day and scene, with dressing lists, photographs and notes. The department's memory. |
| Continuity polaroids | Reference photographs taken at fitting and on set, front, back and sides, recording exactly how a look was worn on a given script day. Digital now, the name persists. |
| Costume plot | Grid of characters against scenes showing which look each character wears when. The scheduling backbone. |
| Wearing-state notes | Record how it is worn, not just the garment list. Sleeves rolled to where, buttons open to which one, collar up or down, tuck. |

#### `multiples_count` - Number of physical copies per garment
**CLASS:** DERIVED from `breakdown_and_aging` and `tier_assignment` (DEPT-05 Casting Director) | copy count is arithmetic: a floor of three per principal look, one further copy per damage state plus a spare, and additional stunt, double and background copies wherever those roles exist in the locked tier assignment
**Ask:** How many copies of each garment exist, and what named risk justifies each one?
**Options:**
| Option | Description (from bible) |
|---|---|
| Floor of three per principal look | Experienced supervisors work to a floor of three versions of every principal costume: one to shoot, one backup, one for stunt or effects work. |
| One copy per damage state plus a spare | Where a garment is progressively damaged, bloodied or soaked. |
| Doubles copy | A performer standing in for the principal must be dressed identically, and body differences mean the garment is often remade rather than reused. |
| Hero garment plus stunt and background copies | The hero garment is the specific copy that goes in front of the camera for close work: cleanest, best-finished, most controlled. |

Budget note from the bible: a line item of a few hundred for a principal's look routinely multiplies fivefold once multiples are properly broken down. Multiples justified by a named event survive budget review. Multiples justified by "in case" do not.

#### `sourcing_mode` - Where each garment comes from
**CLASS:** GATE
**Ask:** Are we making this or finding it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Build (costume designer mode) | If the answer to "where does this garment come from?" is "we will make it," you have a costume designer. Often made, cut, dyed, aged to spec. Governing logic is narrative, character arc across a story. Prep is weeks to months. In commercial work building is the exception, reserved for a hero garment. |
| Pull (stylist mode) | To borrow or rent garments from a showroom, brand, or costume house for consideration. Also the noun for the resulting rail. Governing logic is image, the look of a single moment or campaign. Prep is days, sometimes hours. |
| Buy or rent with returnability preserved | Central in commercial work. Tags stay in. Nothing is altered irreversibly without a purchase decision. |
| Contingency rail | Commercial wardrobe is an optionality discipline. Carry alternates in multiple sizes, in the approved palette, for every role including background. Multiple size options, backup looks, alternate colourways, accessories, footwear, undergarments, outerwear and jewellery for every role, tested under the intended lighting. |

#### `frame_scope_posture` - How much of the body gets specified
**CLASS:** GATE
**Ask:** Do we spec only what the camera sees, or the whole look?
**Options:**
| Option | Description (from bible) |
|---|---|
| Specify the full garment always, at higher resolution in the in-frame region | The professional posture. Not "specify only what is seen." The cost difference between a documented full look and a documented cuff is a paragraph of writing. The cost difference on the day is a stalled unit. |
| Partial-frame detail layer (cuff and hand work) | When the camera sees a forearm and a cuff, what genuinely matters is the cuff (fabric weight, weave visibility at macro distance, colour under the specific key, crisp or soft edge, button or link, distance from the wrist bone), skin and hand condition (nails, cuticles, hair, visible jewellery, tan lines, watch and strap), the immediate sleeve ten to fifteen centimetres above the cuff because a gesture will reveal it, anything catching specular light, and contact behaviour when the arm rests or the hand grips the product. |
| Truncated spec (named as a failure, not a valid choice) | A character whose wardrobe is described only for the body part currently in frame is the single most reliable under-specification tell in this craft. That spec is not finished, it is truncated, and it will fail the moment the shot list changes. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | `period_accuracy` (genre and accuracy tolerance locked) | Nothing. Everything else inherits from this. | not stated in bible |
| 2 | Set palette received from Production Design, per location, as named colours | Step 1 | not stated in bible. Bible notes wardrobe should raise a palette clash before the set is built, because garments can be re-pulled and sets cannot be repainted. |
| 3 | Lighting colour temperature and framing rule received from the DP | Step 2 | not stated in bible |
| 4 | `brand_colour_rule` locked as reserve or flood, with hexes and tolerance (commercial only) | Step 3 | not stated in bible |
| 5 | `palette_strategy` declared: separation, integration or deliberate collision, per location, in writing | Step 4 | not stated in bible |
| 6 | `palette` character assignment. Every named character gets a hue and a value position. In a neutral world, a value and a texture position. | Step 5 | not stated in bible |
| 7 | `silhouette` per character. Outline first, before any garment detail. | Step 6 | not stated in bible |
| 8 | `fabric_and_texture` per garment. Weight, weave, sheen, drape, behaviour in motion. | Step 7 | not stated in bible |
| 9 | `frame_scope_posture`, full garment enumeration per character, head to feet, including undergarments where they affect line, accessories, and what is in the pockets if it deforms them | Step 8 | not stated in bible |
| 10 | `on_camera_risk_verdict`. Every garment checked against white, black, saturated red, green on chroma days, fine pattern, sheen, metamerism. | Step 9 | not stated in bible |
| 11 | `breakdown_and_aging` spec per garment. Intensity level and technique. | Step 10 | not stated in bible |
| 12 | `multiples_count` per garment, derived from stunts, damage states, doubles and weather. Never below the working floor. | Step 11 | not stated in bible |
| 13 | `continuity_method`. Costume plot grid, script-day mapping, photograph protocol. | Step 12 | not stated in bible |
| 14 | Camera test list. Which garments must be tested through the actual camera and LUT before lock, and by when. | Step 13 | Before lock. The bible requires the test list to carry a named deadline. |
| 15 | Fitting schedule | Step 14 | Set against the last-safe-change date. |
| 16 | `sourcing_mode` contingency rail. Alternates in the approved palette, in carried sizes, per role. | Step 15 | LAST SAFE CHANGE DATE. The plan must state it, and state what happens to anything landing after it. |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Production Design | Set palette per location as named colours or hexes. Dominant surface values. Key set-dressing colours in the background of principal coverage. Floor and wall finishes. | A wardrobe palette chosen without this will either disappear into the set or fight it. This is the hardest blocker and it is non-negotiable. |
| Director of Photography | Lighting colour temperature per scene. Source type. Framing rule per character, tightest and widest. Camera and lens package. Show LUT if one exists. Whether separation will come from lighting or must come from wardrobe. | Metamerism, moire scale, and how much of the body must be built all derive from this. |
| Colorist | Grade intention. Saturation strategy. Whether skin tone will be protected by qualifier, which a reddish garment will break. Whether the look pushes warm or cool, which shifts every neutral in the film. | A garment approved on an ungraded monitor is not approved. |
| Casting | Confirmed cast, with measurements, heights, skin tones and hair. Confirmed background counts. | Skin tone determines the white and black limits per performer. Two performers in the same room may need different value ceilings. |
| Brand / Client | Brand palette hexes. Reserve or flood decision. Product colour and finish. Logo and competitor rules. Approval chain and last-change date. | Commercial only, but absolutely binding when present. |
| VFX | Which days and which characters are chroma or volume. Any garment that will be tracked, replaced or extended. | Green is a hard prohibition, not a preference. |
| 1st AD / Production | Shooting schedule mapped to script days. Which scenes shoot on which days. Weather and location conditions. Stunt and effects days. | The entire multiples count and continuity plan derive from schedule, not from script order. |
| Hair and Makeup | Grooming finish level, period accuracy tolerance, any prosthetics or body makeup that contacts garments. | Realism collapses if wardrobe and grooming are at different finish levels. Body makeup transfers onto and ruins collars. |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Framing rule widens (a character previously seen only partially is now full-length, or a new wide is added). Re-open from step 9. | Every previously unspecified body region for that character: legs, feet, socks, waist, full silhouette. Silhouette becomes load-bearing where it was not. Moire risk changes because pattern scale is distance-dependent. Multiples may change if a new full look now exists. | Nothing. This is the trigger most often mishandled by pretending the existing partial spec covers it. |
| Framing rule tightens. Re-open from step 9. | Detail resolution on the newly dominant region: cuff, collar, texture at macro distance, nails, jewellery. Fabric weave visibility becomes critical where it was not. | Regions now out of frame keep their existing spec. Do not delete them. |
| Palette pivot (director or client changes the film's colour direction). Re-open from step 5. | The separation, integration or collision strategy per location. Every character's hue assignment. Every on-camera risk flag, because the risk list is palette-dependent. Brand colour compatibility. | Silhouettes, fabric weights, breakdown levels and multiples counts usually survive. Garment structure is palette-independent. |
| Set or location swap. Re-open from step 2. | The entire palette strategy for that location, because the ground has changed. Value relationships. Whether characters separate. Any garment chosen specifically against a surface that no longer exists. | Character identity, silhouette and arc logic hold. Only the colour relationship is invalidated. |
| New cast member added. Re-open from step 6. | A complete, self-contained spec for that character. Their palette position relative to everyone else in every scene they share. Whether their addition breaks the value spread of an ensemble frame. | Existing characters' specs hold unless the new arrival collides with one, in which case the collided character re-opens too. |
| Cast member replaced. Re-open from step 6. | Fit. Also white and black limits, which are skin-tone dependent per performer. A near-white that worked on one performer may clip on another. Hair colour interaction with collar and neckline. | Palette assignment and silhouette intent usually hold. |
| Brand colour rule tightens (a colour becomes newly prohibited). Re-open from step 4. | Every garment in or near the newly prohibited band, including background. The tolerance band. Whether any character loses their palette identity and needs a new one. | Garments outside the band. |
| Brand colour rule loosens (talent may now wear brand colour). Re-open from step 4. | The strategic question, not just the permission. Loosening does not mean add brand colour. It means re-decide reserve versus flood. If the answer stays reserve, nothing changes. This is the trigger most often over-applied. | Everything, if the strategy stays the same. Loosened permission is not an instruction. |
| Lighting package or colour temperature changes. Re-open from step 10. | Metamerism risk on every custom-dyed or colour-critical garment. Anything matched under the old source must be re-evaluated. Sheen behaviour. | Silhouette, fabric weight, breakdown. |
| A chroma or volume day is added. Re-open from step 10. | Full green or blue audit on every character shooting that day, including background, including accessories, including any green thread in a mixed weave. Reflective surfaces. | Non-chroma days are unaffected. |
| Schedule reorders (scenes move between days). Re-open from step 12. | Multiples counts, because damage progression and turnaround windows are schedule-derived. Continuity risk points. Change windows. | Garment design is unaffected. |
| Grade intention changes. Re-open from step 10. | The protected-hue list handed to the colorist. Any character whose identity depends on saturation that a new desaturated look will remove. Neutrals shift with grade temperature, so a neutral palette in a warm grade is a warm palette. | Structure, silhouette, fabric. |
| New aspect ratio or crop deliverable added. Re-open from step 9. | What is visible in the crop. A 9:16 crop of a wide can remove feet entirely or, worse, make a mid-body region newly dominant. | Full spec already exists if the per-character enumeration discipline was followed. This trigger is cheap if the discipline was kept, and expensive if it was not. |

### Output template
```
WARDROBE PLAN
Project:
Version / date:
Author: Costume Designer
Status: DRAFT / FOR REVIEW / LOCKED

------------------------------------------------------------
1. GOVERNING STATEMENT
One paragraph. What the clothing in this piece is doing and why.

2. INPUTS RECEIVED
Set palette (from Production Design): RECEIVED / PENDING [source, date]
Framing rule per character (from DP): RECEIVED / PENDING
Lighting colour temp per scene (from DP): RECEIVED / PENDING
Grade intention (from Colorist): RECEIVED / PENDING
Confirmed cast + measurements: RECEIVED / PENDING
Brand colour rules: RECEIVED / PENDING / N/A
Chroma / volume days (from VFX): RECEIVED / PENDING / N/A

3. UNRESOLVED
Item | Owner | Needed by | Default I am proceeding on

4. PALETTE STRATEGY
Accuracy tolerance:
Per location:
 Location:
 Set palette (named):
 Wardrobe strategy: SEPARATION / INTEGRATION / DELIBERATE COLLISION
 Rationale:

5. BRAND COLOUR RULE (commercial only)
Strategy: RESERVE / FLOOD
Reserved or mandated hex/Pantone:
Tolerance band (hue range, saturation threshold, luminance threshold):
Permitted adjacent colours:
Prohibited everywhere:
Logo and competitor rules:

6. CHARACTER SPECS
[Repeat in full for EVERY named character. No cross-references.]

 CHARACTER:
 Role in the piece:
 Frame exposure: tightest / widest / body regions ever visible:
 Palette assignment (hue, or value + texture if neutral scheme):
 Silhouette:
 Head & neck:
 Torso, outer to inner:
 Arms & cuffs:
 Hands (jewellery, watch, nails, condition):
 Waist:
 Legs:
 Feet & socks (in frame? Y/N):
 Fabric & texture per layer (weight / weave / sheen / drape):
 Colour per item (named specifically or hex):
 Breakdown / aging level per item (0 new to 5 destroyed):
 On-camera risk flags:
 Multiples (count + justification):
 Changes (how many, at what story point):
 Continuity notes (sleeve roll, button state, collar, tuck):
 Sourcing (build / buy / rent / pull) + return condition:

7. BACKGROUND & EXTRAS
Palette rule:
Value range:
Prohibited:
Density guidance (how many in each band):

8. COSTUME PLOT
Grid: character (rows) x scene or script day (columns), cell = look ID.

9. ON-CAMERA RISK REGISTER
Garment | Risk | Severity | Mitigation | Tested? | Owner

10. CAMERA TEST LIST
Garment | Why | Camera + LUT | Lighting condition | Deadline | Result

11. SCHEDULE
Fitting dates:
Approval rounds and dates:
LAST SAFE CHANGE DATE:
What happens to changes after that date:

12. CONTINGENCY RAIL
Role | Alternate look | Sizes carried | Palette-compliant? Y/N

13. DEPENDENCIES I OWE
To whom | What | By when
------------------------------------------------------------
```

## DEPT-07: MAKEUP & HAIR DESIGNER / STYLIST

**dept_id:** `makeup-and-hair`
**role_one_liner:** The seat that owns the readable surface of every human being who appears in frame, skin, feature emphasis, hair, prosthetics and the continuity of all of it, and produces a defensible department plan.

### Lockable decisions

**Classes:** 4 GATE, 4 DERIVED, 4 CONDITIONAL

#### `register_per_character` - Which makeup register each face is in
**CLASS:** GATE
**Ask:** For each character, what level of makeup is this, and how long does it take in the chair?
**Options:**
| Option | Description (from bible) |
|---|---|
| No-makeup makeup | Correction only. Skin evened, shine controlled, brows groomed, nothing that reads as applied. 15 to 30 minutes in the chair. Camera risk: reads as "done" if the base does not match tone exactly. |
| Naturalistic / character-appropriate | The makeup the character would plausibly wear in their own life. 20 to 45 minutes. Camera risk: anachronism, over-perfection. |
| Beauty / polished | Deliberately camera-ready. Defined eye, sculpted skin, controlled lip. 45 to 90 minutes. Camera risk: product texture, powder catch, dated technique. |
| Character makeup | Aging, illness, injury, grime, weather, occupation. Paint and stipple, no appliances. 30 minutes to 2 hours. Camera risk: muddiness, symmetry, painted-on edges. |
| Prosthetic transformation | Sculpted appliances bonded to skin, then painted and blended. 2 to 6 hours plus removal. Camera risk: edges, seams, translucency, motion. |
| Creature / full conversion | Full head, body, dentures, lenses, hair punching. 4 hours and up. Camera risk: everything above, plus performance restriction. |

The bible states beauty versus character is not a hierarchy. The register determines the arithmetic and the arithmetic determines whether the day is possible.

#### `dominant_register_and_exceptions` - The piece-level world and how exceptions are scoped
**CLASS:** GATE
**Ask:** What world are all the faces in, and who is allowed to look different?
**Options:**
| Option | Description (from bible) |
|---|---|
| Documentary-realist | Skin retains texture, pores, uneven tone and marks. Hair is styled the way the character would style it, including badly. Nothing is symmetrical, nothing looks fresh. Makeup wears down across a story day and the department tracks that wear. The audience should be unable to name a single choice. |
| Polished-commercial | Skin reads as an ideal surface. Hair holds. Lip and eye are defined and consistent. Symmetry is pursued. Nothing wears down unless the story asks it to. The audience is meant to register the person as presented. |
| Dominant register with a scoped diegetic exception | The correct way to write the rule is to scope it and name the exceptions in the same sentence. The exception's polish is diegetic: they are made up within the world of the story because their job or self-presentation requires it. Their finish is slightly imperfect in believable ways, a lip that is not perfectly lined, a base that stops at the jaw, a real lash rather than a false one. Their polish is consistent with their access and budget as a character. |
| Authorial exception | Named in the template as the alternative justification to diegetic. Not further described in the bible. |

Test stated in the bible: if the exception cannot survive being in the same frame as the unpolished characters, the exception is wrong, or the blanket rule is. The contrast must be deliberate and legible in the same shot so the audience reads it as characterisation rather than as inconsistency.

#### `base_and_skin_approach` - How skin is handled at modern acquisition resolution
**CLASS:** DERIVED from `register_per_character` and `capture_format` (DEPT-01 Director of Photography) | coverage follows from the register plus acquisition resolution: at the resolution of the locked format, skin prep and thin buildable sheer layers, with heavy coverage-first foundation named in the bible as the failure rather than an option
**Ask:** What goes on the skin, and how much of it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Skin prep instead of coverage | Cleansing, exfoliation, hydration and the right primer do more at 4K than any amount of foundation. The base becomes correction, not concealment. |
| Thin, buildable, sheer layers | Multiple micro-layers instead of one heavy one. |
| Airbrush | Compressed-air application of thinned product in fine, even, low-volume layers. Adopted broadly as the HD-era answer to coverage without texture. Airbrush and ultra-HD formulations both exist specifically because ultra-sharp lenses and high-resolution acquisition demanded finishes that survive that scrutiny. |
| Heavy coverage-first foundation (named as the failure) | An opaque layer with a visible edge, a visible texture, and a light response fundamentally different from skin, which is translucent, subsurface-scattering and irregular. Once the sensor can resolve pore-level detail this stops reading as flawless skin and starts reading as a layer of something on a face. |

Supporting rules: powder discipline, because powder is the most common HD failure and too much flattens, catches in lines and reads chalky under a hard key. Colour matching became forensic, because a base half a step off in undertone is invisible at SD and obvious at 4K.

#### `no_makeup_read` - How an un-made-up face is actually achieved
**CLASS:** CONDITIONAL on at least one character sitting at `register_per_character` = no-makeup makeup | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** If the note says the character wears no makeup, what does the department actually do?
**Options:**
| Option | Description (from bible) |
|---|---|
| Correct, do not cover | Spot-conceal only what breaks the read. Leave freckles, moles, texture and natural colour variation. These are the things that sell real. |
| Match the base to the exact undertone | Working artists identify base-to-skin mismatch as the single dead giveaway of a supposedly no-makeup look. |
| Control shine, not sheen | Skin should still look alive. A completely matte face is as artificial as a heavily made-up one. Groom the brows and lashes, since brow shape is disproportionately responsible for whether a face reads as put together or just woke up. Manage the lip, because a bare lip on camera often reads paler and flatter than in life and a tint returning it to its natural colour is invisible and necessary. Warm slightly, to keep actors from washing out under bright sources while still reading natural. |
| Genuinely nothing on the face (named as the failure) | Under a modern sensor and a hard practical source this reads as shiny, blotchy and unevenly toned, with visible flush around the nose, a bright T-zone and dark under-eye. It reads as an accident, not as a choice. |

Instruction that follows: never write "no makeup" on a character sheet. Write "no-makeup makeup, correction-only, texture retained."

#### `prosthetic_approach` - How a transformation is built
**CLASS:** CONDITIONAL on character makeup or a transformation being required, meaning at least one character at `register_per_character` = character makeup, prosthetic transformation or full conversion | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Is this paint, appliances, or a full conversion, and in what material?
**Options:**
| Option | Description (from bible) |
|---|---|
| Paint and stipple only, no appliances | The character-makeup register. Stipple is application by dabbing rather than stroking, with sponge, brush or textured tool, to build irregular skin-like texture such as broken capillaries, five o'clock shadow, grime and bruising. |
| Silicone appliances | High-resolution acquisition is more sensitive to colour and material behaviour, and the demand for appliances that look and move like real skin pushed the industry toward silicone, whose translucency, flexibility and durability suit close-up work at high definition. |
| Foam latex | Retains its place for full-head and body work where weight and comfort dominate. |
| Multi-piece silicone system | Coulier on Suspiria built a tubular silicone neck plus separate cheeks, chin, top lip, nose, forehead, ears, back of head, hand prosthetics, fingernails, wig and body padding. Multi-piece silicone exists because a single rigid piece cannot survive both HD scrutiny and facial motion. |

Method note: Kazu Hiro works from lifecast and 3D scan, and for Charlize Theron as Megyn Kelly built a nose plug and nose tape, a chin piece, jawline pieces for angularity and eyelid adjustment, plus a contact lens to darken eye colour, in a roughly three-hour daily application. The lesson is that a transformation is an enumerated list of specific anatomical deltas, not a vibe. Cannom's constraint: with monsters you design whatever you want, with age makeup everybody knows what they look like so it has to be really good. Realism is the strict register, fantasy is the forgiving one.

#### `hair_approach` - Cut, colour, wig, and reversibility
**CLASS:** GATE
**Ask:** Is this the performer's own hair, a wig, or a real irreversible change?
**Options:**
| Option | Description (from bible) |
|---|---|
| Own hair, styled per state | The B5 field set requires cut, colour, styling, wig or own hair, per state. |
| Wig over a bald cap | Shircore on Mary Queen of Scots: on heavy days for Margot Robbie the build was around three hours, comprising a skin condition, a thinning wig over a bald cap, and the heavy white base. Hair, skin condition and base were one design, not three. A bald cap is a thin cap creating a shaved or hairless head, usually the foundation layer for a wig or prosthetic build. |
| Lace front and punched hair | A lace front is a wig or facial-hair piece with a fine lace edge that allows an invisible hairline at close range. Punching or knotting is hand-inserting individual hairs into lace or silicone for realistic hairlines, brows and beards. |
| Real cut or real colour (irreversible within a shooting day) | The intake asks whether any state is irreversible within a shooting day, such as a haircut, a shave or a real dye. A hair change that is irreversible scheduled before scenes that need the prior state is a hard contradiction, and must be checked against the day-out-of-days, not the script order. |

Hair design is a parallel, equally deep discipline and should never be treated as an accessory to makeup. Period hair work begins with primary research, as with Shircore researching smallpox presentation and deciding which stage of the disease was most relevant to the story, and finding modern equivalents for period cosmetics historically mixed with mercury and other toxic substances.

#### `lighting_compensation` - What the makeup does under the actual key
**CLASS:** DERIVED from `colour_temp_policy`, `lighting_philosophy` and `contrast_ratio` (DEPT-01 Director of Photography) | the makeup answer is computed from the locked key per scene: a warm key adds the warmth already in the skin so the base cools, a cool key drains it so warmth is put back, and a hard source resolves texture so texture is controlled at the skin
**Ask:** What is the key light in each scene, and how does the makeup answer it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Warm key (tungsten, firelight, sodium practicals, low sun) | Pushes skin toward orange and red. Flattens redness distinction, so blemishes and flush blend in but the overall face can read sunburnt or jaundiced. Compensation: cool the base marginally, reduce warm blush and bronzer, watch yellow-heavy foundations turning sallow. |
| Cool key (daylight-balanced LED, north-facing window, overcast, moonlight effect) | Emphasises redness, blue-green undertones under the eye, and any grey in the skin. Makes people read tired and ill. Compensation: warm-correct the base, colour-correct under-eye, add controlled warmth at cheek and jaw so the face is not corpse-like. |
| Mixed (practical tungsten plus daylight window) | Different halves of the face read as different skin tones. Compensation: split-difference base, and flag it to the DP early. This is a lighting problem before it is a makeup problem. |
| Hard versus soft source | Hard light throws sharp shadows and reveals texture, edges, prosthetic seams, powder buildup in fine lines and any unblended boundary, so everything must be blended further and applied thinner. Soft light wraps and fills, hiding texture and edges but flattening dimension, so the makeup often has to add back structure with subtle contour and highlight that would look overdone under hard light. |

Screen and practical light: contemporary productions frequently key faces off monitors, phones, televisions and neon. These sources are highly saturated, often at extreme colour temperatures, and close to the face. A face lit by a blue screen at close range needs a base with enough warmth to survive the cast, and blush and lip choices that do not turn brown or grey under the specific hue. The only reliable way to know is a camera test with the actual practical.

#### `sweat_and_shine_policy` - How shine is managed on set
**CLASS:** DERIVED from `practical_fixtures` (DEPT-09 Production Design) and `lighting_philosophy` (DEPT-01 Director of Photography) | the on-set plan follows from the heat load of the locked in-frame fixtures and the specular behaviour of the locked key, which sets whether shine is prevented, blotted and micro-powdered, or accepted as a designed sheen
**Ask:** What is the plan when the actor sweats under hot practicals?
**Options:**
| Option | Description (from bible) |
|---|---|
| Prevention: cool the actor between takes | Fans, cold packs at the neck, ice water. Prevention beats correction. First in the management stack. |
| Blot, then micro-powder | Blot before powdering, because powder over sweat cakes instantly. Micro-powder targeted at T-zone, upper lip and hairline only. |
| Setting spray at build, not mid-take | Fourth in the stated stack. |
| Accept and control with a designed sheen | In a scene that is supposed to be hot, the answer is a designed, even sheen, sometimes deliberately applied, rather than an eliminated one. Wet and sweaty looks must be designed, not improvised, because real sweat on camera is patchy, dries between takes, and is a continuity disaster. |

#### `partial_frame_verdict` - What is specified when no face is in shot
**CLASS:** CONDITIONAL on at least one character appearing only as hands, forearm, shoulder or the back of the head | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** For characters seen only as hands, forearm, shoulder or back of head, what is the written verdict?
**Options:**
| Option | Description (from bible) |
|---|---|
| Hand and forearm grooming pass | Hands are their own discipline. Nails cleaned, shaped, and either bare-buffed or in an agreed colour. Cuticles managed. Knuckle redness corrected. Veins can be reduced with base or raised deliberately. Hydration matters because dry skin on a hand at macro is unusable. |
| Forearm skin verdict | Tan lines, watch marks, bruises, tattoos, scars and healing marks all need a verdict: keep, cover, or reposition. Arm hair needs a decision, because at macro on a large sensor it is extremely visible and often unflattering under a hard source. |
| No face means no face makeup | A legitimate, cost-saving verdict, and it should be written down as a verdict, not omitted. |
| Silence / omission (named as the failure) | An omission is indistinguishable from an oversight. A verdict is a decision. Downstream departments read the plan as a complete list. |

Every partial-frame entry must carry the line that if framing changes to include the face, the entry is void and must be re-derived from scratch. That sentence is the load-bearing part and the bible instructs writing it every time.

#### `chair_hour_resolution` - How the design is fitted to the clock
**CLASS:** CONDITIONAL on the summed chair hours for the locked design exceeding what the call sheet allows | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** The build does not fit the call sheet. What changes?
**Options:**
| Option | Description (from bible) |
|---|---|
| Simplify the build | First of the usual outcomes when the director rules on chair time versus shooting hours. |
| Stagger call times | Second of the usual outcomes. |
| Add artists | Third of the usual outcomes. Presenting the chair-hour arithmetic is the only argument that works against a line producer counting headcount, since one artist cannot maintain eight principals on set. |
| Use second team to protect the makeup during lighting | Stand-ins occupy the marks while lighting is set, sparing first team hours under hot sources. HMU's ally, because it protects the makeup. |

Note from the bible: Hannon's team on Wicked averaged roughly two hours fifteen to two hours forty-five per day on Cynthia Erivo's full green makeup, driven down from longer. That number is a schedule negotiation as much as a craft achievement. Under-quoting chair time to look cooperative is the most expensive lie in the department.

#### `practical_vs_post_split` - What is done in camera and what is left to post
**CLASS:** GATE
**Ask:** Which fixes happen on the day, and which are handed to retouch or grade?
**Options:**
| Option | Description (from bible) |
|---|---|
| Do practically | Base match, undertone, evenness. Texture and finish (matte, satin, dewy). Shine and sweat control. Eye, lip, brow shape and colour. Hairline, flyaways, parting. Anything that has to move naturally in a moving shot. |
| Leave to post | Stray-hair cleanup on a moving frame. Sensor dust, rig removal. Minor continuity mismatches between takes. Global colour temperature and skin-tone grade. Blemish removal where the actor genuinely developed one overnight. Anything that would require removing real skin texture. |
| Negotiate the line in writing before the shoot | Best practice named in the field: book a shared reference call, document measurable skin goals, and define retouch rounds, approvers and deadlines in writing before the shoot. |
| Design to reduce reliance on retouching | Professional artists deliberately design to reduce heavy retouching because getting it right on set is faster and better, though the client's final vision typically still requires additional colour and makeup manipulation in post. |

Line to hold: do not remove texture practically that post could remove digitally, because texture cannot be added back convincingly. Over-applied product is a permanent decision. Retouching is a reversible one.

#### `continuity_method` - How a look survives an out-of-order schedule
**CLASS:** DERIVED from `register_per_character` and the locked shooting order | the record follows mechanically: continuity stills per character per state, a named artist responsible for each principal, a touch-up rhythm tied to the setup count, and a story-day map wherever the schedule shoots out of order
**Ask:** How is each character's state recorded and rebuilt on a later day?
**Options:**
| Option | Description (from bible) |
|---|---|
| Continuity stills per character per state | Reference photographs of each character in each state, logged against scene numbers, used to rebuild a look on a later shooting day. |
| Named artist responsible for each principal | The department is responsible for ensuring everyone on camera carries the correct look for where the character sits chronologically. In practice this means continuity stills logged by scene number and a named artist responsible for each principal, plus a named on-set continuity owner. |
| Touch-up rhythm on set | Touch-up is a rhythm, not an event. The department watches the monitor, moves in on the last looks call before a take, works fast, and gets out of the DP's light. The good version is invisible to the schedule. The bad version becomes the reason a company falls behind. |
| Story-day map | Built from the script as the first step of the checklist: every character, every scene, every chronological state. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | Read the script and build the story-day map (`continuity_method`, story-day map component) | Nothing | not stated in bible |
| 2 | `dominant_register_and_exceptions` confirmed in writing, including scoped exceptions | Step 1 | not stated in bible |
| 3 | Confirm the frame: format, resolution, tightest shot per character, who is ever face-forward | Step 2 | not stated in bible |
| 4 | Confirm the light per scene: colour temperature, hardness, practicals, heat (`lighting_compensation`) | Step 3 | not stated in bible |
| 5 | Get the actual cast | Step 4 | Nothing before this point is a specification, only an intention. |
| 6 | `register_per_character` for every named character, including partial-frame characters with an explicit verdict (`partial_frame_verdict`) | Step 5 | not stated in bible |
| 7 | `prosthetic_approach` and `hair_approach`. Identify transformations needing prosthetics, wigs or facial hair, and separate them from paint-only work. | Step 6 | not stated in bible |
| 8 | Cost each look in minutes, per character, per state | Step 7 | not stated in bible |
| 9 | Multiply by cast and days. Produce the chair-hours requirement. | Step 8 | not stated in bible |
| 10 | `chair_hour_resolution`. Negotiate chair-hours against the call sheet with the 1st AD. | Step 9 | If the arithmetic does not fit, redesign now, not on the day. |
| 11 | Reconcile with wardrobe palette and colourist intent. Adjust base warmth, lip and hair colour so nothing fights the costume or the grade. (`base_and_skin_approach`) | Step 10 | not stated in bible |
| 12 | Run the camera test: real cast, real makeup, real lighting, real lens, real LUT | Step 11 | Before lock. |
| 13 | Lock and document. Continuity stills, product lists, application notes, per-character sheets. | Step 12 | not stated in bible |
| 14 | Assign artists to principals and name an on-set continuity owner | Step 13 | not stated in bible |
| 15 | Plan removal and recovery, including skin care for performers in daily appliances | Step 14 | Removal is a scheduled, non-negotiable end-of-day process and must be in the call sheet. |
| 16 | Establish the change-trigger protocol with the AD and the DP | Step 15 | So that upstream changes reach the department before the day, not on it. |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Register, tone, the emotional read of each character, and explicit rulings on exceptions | Without the register the department is guessing at the whole design |
| Director of Photography | Format, resolution, sensor size, lens set, typical stop, lighting plan per scene (colour temperature, hardness, practicals), show LUT, and the tightest framing per character | Determines product weight, finish, blend tolerance, and whether a face is even seen |
| Casting | The final, actual cast. Real skin tones, hair, conditions, allergies, tattoos, facial hair, and any contractual restrictions | A design built on a casting brief rather than a cast person is fiction |
| Costume / Wardrobe | Full palette, fabric sheen, necklines, headwear, collars, and the change schedule per character | Base warmth, lip and hair colour must sit against the costume, not fight it. Necklines determine how far body makeup extends. Headwear determines wig construction |
| Production Design / Art | Set and location palette and the colour of practical sources | A set that throws green or amber onto every face changes every base |
| Colourist / Post | Skin-tone intention, the show LUT, and the agreed practical/post split | Prevents building a look that the grade will undo, or leaving something to post that post cannot fix |
| 1st Assistant Director | Call times, day-out-of-days, number of chairs, hours available before crew call, background counts per day, and removal windows | Converts design into feasibility. This is the hardest constraint in the department |
| VFX | Any digital extension, de-aging, face replacement or cleanup planned, plus tracking-marker requirements | Determines whether a prosthetic is the final image or a base layer |
| Stunts / SFX | Water, fire, wind, rain, blood rigs, harness points | Determines set life, waterproofing and rebuild frequency |
| Script Supervisor | The continuity log and scene order | HMU continuity is only as good as the shared record of story order |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Framing rule change that puts previously unseen faces on camera | Full specification for every newly visible character: skin, features, hair, chair time, artist assignment, continuity stills, camera test inclusion. The old partial-frame entry is void, not editable. | Nothing. This is a full re-open for the affected characters. |
| Resolution or format change, for example 2K to 8K, S35 to large format | Product weight, powder policy, blend and edge tolerance, prosthetic material choice, base-match precision, hand and skin detail work at macro | Register names, story-day map |
| New character from a different world or faction | Their entire register and its relationship to the dominant rule. Whether their presence breaks the existing contrast logic. Chair time and crew impact. | Nothing about existing characters, unless the new character shares frames with them |
| Casting change on any role | Base tone and undertone, hair (own versus wig), facial hair, prosthetic fit (a lifecast is person-specific and does not transfer), allergy and sensitivity profile, chair time | The character's register and story states, if the role is unchanged |
| Costume palette pivot | Base warmth, blush and lip colour, hair colour where it sits against fabric, body-makeup coverage boundary against new necklines | Prosthetic design, skin condition work, story-day map |
| Lighting plan change (temperature, hardness, or new practicals near the face) | The compensation row for every affected scene. Finish and shine policy. Blend and edge scrutiny under a new hardness. Sweat plan if heat changed. | Character registers |
| LUT or colourist intention change | Base neutrality versus correction, lip and blush saturation, how much warmth to carry in camera | Chair times, hair design |
| Schedule compression or chair reduction | The design itself. Simplify builds, restage transformations, or reassign. Do not simply promise the same look in less time. | Nothing. Time is a design input, not a delivery variable. |
| Story-order or day-out-of-days change | Continuity map. Irreversible-change ordering (cuts, real colour). Which state is built on which day. | Per-character look design |
| New macro or extreme close-up added | The specification for whatever is in that frame, at a resolution that was not previously required. Hands, nails, lashes, hairline, lip texture. | Everything not in that frame |
| VFX scope change (de-aging, face replacement, digital cleanup added or removed) | Whether the practical build is the final image or a base layer. Marker requirements. Edge tolerance. | Register, story states |
| Reshoot or pickup scheduled | Nothing new in design, but the continuity stills and product log become the primary deliverable, and any cast physical change since the original block must be matched | The plan itself |

Standing protocol stated in the bible: on receiving any change above, do not patch the affected line. Mark the character's specification VOID, RE-DERIVING, re-run the decision checklist from the first step the change touches, and re-issue with a change-log entry naming what was re-derived and what was carried forward.

### Output template
```markdown
# MAKEUP & HAIR DESIGN: [PROJECT]
Designer: [name] | Version: [n] | Date: [date] | Status: [draft / camera-test / locked]

## 1. DESIGN THESIS
[Three to five sentences. What the department is doing and why, in story terms.
Name the dominant register. Name every exception and scope it in the same paragraph.]

## 2. REGISTER RULE
Dominant register: [ ... ]
Applies to: [all characters except ... ]
Named exceptions: [character / register / justification, diegetic or authorial]
Rule of contrast: [how the exception reads as characterisation in a shared frame]

## 3. TECHNICAL BASIS
Acquisition: [format, resolution, sensor]
Lens set / typical stop: [ ... ]
Show LUT / grade intention: [ ... ]
Tightest frame in the piece: [shot, on whom]
Implications for the department: [product weight, finish, blend tolerance, powder policy]

## 4. LIGHTING RESPONSE MAP
| Scene / block | Key temp | Hardness | Practicals / heat | HMU compensation |
|---|---|---|---|---|

## 5. PER-CHARACTER SPECIFICATIONS
[One block per named character, using the B5 field set.
Include partial-frame and light-touch characters with explicit verdicts.]

CHARACTER: [name or role label]
SEEN: [face-forward / partial-frame only / background]
TIGHTEST FRAME: [e.g. MCU, or CU on hands only]
REGISTER: [no-makeup makeup / naturalistic / polished / character / prosthetic]
STORY STATES: [state 1, state 2, state 3, with scene numbers]
SKIN: [prep, base approach, correction level, texture retained or reduced, finish]
FEATURES: [brow, eye, lip, cheek, or "none" with reason]
HAIR: [cut, colour, styling, wig or own hair, per state]
FACIAL / BODY HAIR: [verdict]
BODY MAKEUP: [coverage boundary, or "none"]
PROSTHETICS: [pieces, or "none"]
LIGHTING NOTES: [key temperature and hardness in their scenes, and the compensation]
CHAIR TIME: [minutes, per state]
ARTIST ASSIGNED: [name]
CONTINUITY OWNER: [name]
RISKS: [sweat, water, adhesive sensitivity, long day under hot practicals]

## 6. BACKGROUND & CROWD
Per day counts, states, reference pack, time per person, artists required.

## 7. STORY-DAY / CONTINUITY MAP
| Character | Story day | State | Scenes | Notes |
|---|---|---|---|---|

## 8. CHAIR-HOUR ARITHMETIC
| Shoot day | Characters | Total minutes | Artists required | Earliest HMU call | Removal window |
|---|---|---|---|---|---|

## 9. PRACTICAL vs POST SPLIT
Done practically: [ ... ]
Left to post: [ ... ]
Approver: [ ... ] | Retouch rounds: [n] | Deadline: [ ... ]

## 10. CAMERA TEST PLAN
Date, cast, looks, lighting conditions, lenses, LUT, who attends, what gets signed off.

## 11. DEPENDENCIES & OPEN QUESTIONS
| Owed by | What | Needed by | Blocks |
|---|---|---|---|

## 12. RISKS
[Sweat and heat, water, adhesive sensitivity, minors, irreversible changes,
long-day set life, reshoot matching.]

## 13. CHANGE LOG
| Version | Date | What changed | What was re-derived |
```


---

## DEPT-08: VO CASTING AND VOICE DIRECTION

**dept_id:** `vo-casting-and-voice-direction`
**role_one_liner:** Two jobs bolted together: voice casting, the search that narrows a very large candidate pool down to one instrument, and voice direction, the extraction of a specific read in the booth take by take, plus knowing which take is the one.

### Lockable decisions

**Classes:** 14 GATE, 3 DERIVED, 0 CONDITIONAL

#### `vo_exists_no_speaking_mouth` - Is this a voice-over at all, and is any speaking mouth in frame
**CLASS:** GATE
**Ask:** Is there a voice-over, or is this dialogue delivered by a visible character, and will any speaking mouth appear in frame?
**Options:**
| Option | Description (from bible) |
|---|---|
| VO with no speaking mouth in frame (required default) | Sync is the most expensive form of continuity. With no visible mouth, a copy revision at the eleventh hour costs one hour of booth time, and the voice can be recast, re-aged, re-gendered or re-languaged after picture is locked. |
| Speaking on-screen character | If the Director wants a speaking on-screen character, that is not a voice-over. That is dialogue, it is a picture-casting decision, and it must be budgeted, scheduled and cleared as such. |
| Mouth concealed by staging | Back of head, over the shoulder, hands and objects, walking away, faces turned to the light, mouths obscured by frame edge or foreground, wide shots where the mouth is too small to read, and simply never being on a face when a line lands. |
| AI-generated pipeline with bolt-on lip-sync | A large share of generated footage is silent or produces audio whose mouth movement does not sync reliably. Each bolt-on pass is another generation, another cost, another artifact risk and another quality-control gate. |

#### `person_and_pov` - The person and point of view of the copy
**CLASS:** GATE
**Ask:** Is the copy written in first, second or third person, and was that a decision or an accident?
**Options:**
| Option | Description (from bible) |
|---|---|
| First person | The voice is a specific person with a specific history. If anyone is on screen, the audience will try to attach the voice to a body, and if the attachment is ambiguous they spend the film solving a puzzle instead of watching. |
| Second person | Draws the reader in, makes the voice conversational, lets the audience place themselves inside the scenario. It frees the VO from being any on-screen character's voice, dissolves the lip-sync and gender-matching problems, and is the cheapest structural insurance policy available to a VO-driven film. |
| Third person | The voice is outside the world, observing. Documentary and fable register. Highest authority and highest coldness risk, and the register most likely to slip back toward announcer if the performer is not directed away from it. |

#### `voice_function` - What the voice is
**CLASS:** GATE
**Ask:** Is this voice a narrator, a character's interior voice, or a brand voice?
**Options:**
| Option | Description (from bible) |
|---|---|
| Narrator | Not stated in bible beyond the function label. Failure if left blank: the performer does not know who they are, so they default to selling. |
| Character's interior voice | The voice inside a character's head. Quieter, closer to the mic, lower energy, more air, and not addressed to the audience. It is overheard, and almost always demands the tightest mic and the most silence around it. |
| Brand voice | Not stated in bible beyond the function label. Failure if left blank: the performer does not know who they are, so they default to selling. |

#### `read_register` - The read register
**CLASS:** GATE
**Ask:** Which register is the read, stated against a named reference rather than an adjective?
**Options:**
| Option | Description (from bible) |
|---|---|
| Announcer | Polished, projected, authoritative, hard-sell. Now a niche rather than a norm. Survives in sports, some automotive retail advertising, and deliberate pastiche where the point is that the audience recognises the convention. |
| Conversational | Speaking naturally, as in everyday conversation, without fanfare or embellishment. The default register of contemporary advertising. The internal risk is that conversational is itself an under-specification: a conversation between whom, about what, in what mood. |
| Authentic or unpolished | Favours performers who can leave a breath ragged, land a word slightly off the beat, and resist the trained instinct to smooth. Failure mode is affected artlessness, a polished performer performing unpolishedness. |
| Interior | Quieter, closer to the mic, lower energy, more air, not addressed to the audience but overheard. Demands the tightest mic and the most silence around it. |
| Wry | Dry, slightly amused, holding the copy at a distance. Useful when the copy would be unbearable if delivered sincerely. |
| Documentary | Authority earned through apparent restraint. Traditional form is voice of God, omniscient and unseen. The modern refinement moves toward presence and intimacy, so the audience feels they are standing beside the narrator observing rather than being lectured from above. |

#### `anti_register` - The read that must not be produced
**CLASS:** GATE
**Ask:** What register must be actively avoided, and why?
**Options:**
| Option | Description (from bible) |
|---|---|
| Avoid the founder-explaining-the-product read | Slightly too invested, slightly too pleased, upward inflection at the end of every clause, and an audible awareness that the words are selling something. Casting alone will not remove it, because the copy itself induces it. |
| Avoid announcer drift | The announcer read now reads as disconnected from how people actually talk, and a read without breathing room becomes a list, which is the fastest route back to announcer regardless of who is performing. |
| Avoid affected artlessness | The failure mode of the authentic read: a polished performer performing unpolishedness. |
| No anti-register named | The read to avoid is more useful direction than the read to achieve. Leaving it blank is the single most common under-specification in the entire discipline. |

#### `pace_band` - Words per minute and how much runtime the VO occupies
**CLASS:** DERIVED from `runtime_specification` (DEPT-03 Editor) and the locked word count | words per minute is arithmetic: word count divided by the seconds the VO occupies, then checked against whether silence still exists at that rate
**Ask:** What pace does the word count and locked runtime imply, and does silence still exist at that pace?
**Options:**
| Option | Description (from bible) |
|---|---|
| Conversational band, roughly 140 to 170 wpm | The band conversational English narration lands in. |
| Urgent retail, past 180 wpm | An urgent retail read pushes past 180. Speeding the read costs warmth, authority and comprehension, and is for retail and urgency-led work only. |
| Interior or documentary, 110 to 130 wpm and sometimes lower | The same script has a runtime range of nearly two to one depending only on register. |
| Pace only fits when the performer is pushed | The script is too long. Pushing the performer is not a fix, it is a symptom. Copy should be cut until the selected read fits at the intended pace with silence still present. |

#### `vo_coverage` - How the VO sits across the timeline
**CLASS:** GATE
**Ask:** Does the VO run wall to wall, or in blocks with picture-only passages between, and does the piece end on words or on picture?
**Options:**
| Option | Description (from bible) |
|---|---|
| Wall to wall | The edit loses its freedom. Every cut must respect a sentence boundary, because cutting picture across a word inside a phrase creates an audible mismatch between image rhythm and speech rhythm. It converts the edit from a picture-led cut into an audio-led cut. |
| Blocks with picture-only passages | Not stated in bible beyond the option label, other than that letting picture carry silence requires footage strong enough to hold, and suits premium and brand-film work. |
| VO overlaid with a music or sound-design bed | Reduces perceived silence without stealing seconds. Very frequently the practical compromise. |

#### `gender_match_or_contrast` - Voice gender against the on-screen cast
**CLASS:** GATE
**Ask:** Which gender, and is it matching or deliberately contrasting with the on-screen cast?
**Options:**
| Option | Description (from bible) |
|---|---|
| Match the on-screen cast | Casting the voice to match the on-screen cast is the safe move. |
| Gender contrast | A female voice over a male-led scene, or the reverse, immediately signals that the voice is not inside the scene. It buys distance and commentary for free. |
| Unstated, defaulted | Defaults to whatever the writer heard in their head. |

#### `age_band` - Perceived age of the voice
**CLASS:** GATE
**Ask:** What perceived age band, and does it match or contrast the on-screen subjects?
**Options:**
| Option | Description (from bible) |
|---|---|
| Perceived age matched | Perceived age, not actual age. Failure if left blank: casting the wrong life-experience weight behind the words. |
| Older voice over young protagonists | Reads as retrospection, memory, or inherited wisdom. |
| Younger voice over older subjects | Reads as inheritance, succession, or challenge. |

#### `accent_and_dialect` - Region, social register and strength
**CLASS:** GATE
**Ask:** Which region, which social register, and how strong is the accent?
**Options:**
| Option | Description (from bible) |
|---|---|
| Light, medium or full strength | Strength is a stated field. Failure if the accent decision is left blank: wrong belonging signal, audience hears "not from here". |
| Accent contrast against the on-screen cast | Belonging or outsiderness, depending on which way the contrast runs. |
| Approximated regional dialect | A regional dialect is a belonging signal, and getting it approximately right is worse than not attempting it, because approximation reads as parody to native ears. |

#### `timbre` - The instrument itself
**CLASS:** GATE
**Ask:** What weight, rasp, brightness, breathiness and resonance is being cast for?
**Options:**
| Option | Description (from bible) |
|---|---|
| Weight | Named timbre axis. Failure if left blank: casting on adjectives instead of on sound. |
| Rasp | Named timbre axis. Failure if left blank: casting on adjectives instead of on sound. |
| Brightness | Named timbre axis. Failure if left blank: casting on adjectives instead of on sound. |
| Breathiness or resonance | Named timbre axes. Deliberately quiet or breathy passages must be flagged to Sound so they are not compressed flat in the mix. |

#### `languages` - Language count, primacy and how each version is written
**CLASS:** GATE
**Ask:** How many languages, which is primary, and was each written natively or translated?
**Options:**
| Option | Description (from bible) |
|---|---|
| Single language | Not stated in bible beyond the option label. |
| Each language written natively, own casting pass | Each writer should be a native speaker working in-market who understands current cultural usage, with the brand voice and core message held constant while the cultural execution changes. Voice qualities do not transfer across languages. |
| Translated script reused across languages | Translation transfers meaning only. Advertising VO copy sits at the transcreation-to-original-copywriting end of the spectrum, because the persuasive load is carried by rhythm, idiom and cultural reference, none of which survive literal transfer. |
| Matched voice chased across languages | Optimises for a similarity nobody in either audience will ever perceive, at the cost of casting the best voice in each market. The exception is genuine dubbing where a single visible character must sound continuous. |

#### `usage_and_rights` - Usage, term, territory and exclusivity
**CLASS:** GATE
**Ask:** Where does it run, in which territories, for how long, and is exclusivity or category conflict required?
**Options:**
| Option | Description (from bible) |
|---|---|
| Union session fee plus residuals | The session fee covers the recording and the use fees cover the exposure, with residuals payable each time the commercial airs or each usage cycle renews. For a national campaign running a year, residuals routinely exceed the original session fee many times over. |
| Buyout scoped by media, territory and term | A one-time fee exchanged for extended or unlimited usage rights instead of recurring payments. It must be scoped, because the value being transferred is exposure, and exposure without a defined limit is unpriceable. |
| Broad, undefined or perpetual usage | Costs more, not less, because a professional performer prices the loss of future category work into it. In perpetuity is treated in the performer community as a red flag term. |
| Exclusivity or category conflict imposed | A restriction preventing the performer from voicing competing brands or categories during the usage period. A performer already voicing a competing category may be unavailable regardless of budget. |

#### `shortlist` - How the shortlist is built and presented
**CLASS:** DERIVED from `read_register`, `gender_match_or_contrast`, `age_band`, `accent_and_dialect`, `timbre` and `usage_and_rights` | the shortlist is assembled rather than chosen: three to five voices that satisfy the locked attribute set, each carrying a stated reason and a stated risk, filtered to quotes that survive the locked usage, term and territory
**Ask:** Which voices are auditioned at all, and in what order are they presented?
**Options:**
| Option | Description (from bible) |
|---|---|
| Three to five voices, each with a stated reason and a stated risk | The prescribed form. Not a ranked list of favourites. |
| Ranked list of favourites | Explicitly not the required form. |
| Only voices the client already likes | Reference-gathering has replaced casting. The question to ask is what the read is, independent of who performs it. |
| Shortlist including quotes that cannot survive the actual usage | Never present a shortlist that includes performers whose quotes cannot survive the actual usage. Usage determines which performers are affordable at all. |

#### `direction_ladder_entry_level` - Where on the adjustment ladder direction starts
**CLASS:** DERIVED from `read_register` and `anti_register` | the ladder is a documented convention: direction enters at the highest rung that still moves the read toward the locked register and away from the locked anti-register, who or to whom first, adjectives last and only as a fallback
**Ask:** What kind of instruction is given between takes to change the read?
**Options:**
| Option | Description (from bible) |
|---|---|
| Who, or to whom | Level 1 and 2. "You are telling this to one person, not a room." "Say it to someone who already agrees with you." |
| Circumstance or relationship | Level 3 and 4. "You have just walked in from the cold and you are still catching your breath." "You know something they do not know yet, and you are not going to say it." |
| Physical or mechanical | Level 5 and 6. "Sit back. Hands off the desk. Do it on the exhale." "Same read, drop the stress off the third word, put it on the last." |
| Demonstration | Level 7. Contentious and to be used sparingly. Perform it yourself, then let them find their own version. The risk is producing an imitation instead of a performance, so it should be followed by an explicit "now do it your way." |
| Adjectives | "Warmer." "More confident." "Less salesy." These are evaluations of the output, not instructions for the input, and produce a more decorated version of the wrong read. |

#### `alternate_take_policy` - What else is recorded beyond the selected read
**CLASS:** GATE
**Ask:** What alternates are captured in the session regardless of whether the first read works?
**Options:**
| Option | Description (from bible) |
|---|---|
| Alternate on a genuinely different point of view | Record the alternate point of view every time, even when the first read works. It costs minutes and prevents an entire re-record when a client note lands. A strong alternate take means committing fully to a new point of view, not slightly adjusting the previous take. |
| Both dry-and-close and open-and-big versions | Record both when Sound wants a drier, closer read and the Director wants a bigger one. Decide in the mix, not in the booth. Cheap insurance and should be default practice. |
| Variation on the same point of view | Explicitly not an alternate. A variation is not a genuinely different point of view. |

#### `synthetic_voice_use` - Whether synthetic voice is used and how
**CLASS:** GATE
**Ask:** Is synthetic voice permitted, prohibited or undecided by the client and the delivery contract, and what is it proposed for?
**Options:**
| Option | Description (from bible) |
|---|---|
| Scratch, animatic, previs and internal use only | So the edit can be built to real timing before a booth session exists, plus pitch material and concept tests clearly labelled as such, and language variants for internal comprehension checks, not for broadcast. |
| High-volume, low-emotion information narration | Interface prompts, procedural explainers, personalised variants at a scale no human session could produce. |
| Licensed voices under an explicit written licence | Used strictly within the terms of that licence. |
| Emotional core narration in premium brand work | Inappropriate or high-risk. The remaining quality gap is exactly the thing being bought, and undisclosed synthetic voice in work whose whole persuasive proposition is authenticity has an asymmetric reputational downside. |
| Any voice resembling an identifiable real person without separate written consent | The single largest legal exposure in the entire discipline. Consent must be clear and conspicuous, in a separate signed writing, with a reasonably specific description of both the generated performance and the anticipated use. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | `vo_exists_no_speaking_mouth` | Nothing | Before anything else. If a mouth is in frame, escalate to Director before any other work |
| 2 | `person_and_pov` | 1 | Nothing below this line is stable until this is written down. Ask before shortlisting, not after |
| 3 | `voice_function` | 2 | Before register and attributes |
| 4 | Locked runtime and locked script received | 3 | Word count and pace fall out of these |
| 5 | `pace_band` | 4 | If silence does not exist at that pace, return to the writer for cuts before casting anything |
| 6 | `read_register` | 5 | Set with at least one named reference performer or named reference piece |
| 7 | `anti_register` | 6 | Named before the session |
| 8 | `gender_match_or_contrast`, `age_band`, `accent_and_dialect`, `timbre` | 6, 7, and the on-screen cast | Match or contrast decided deliberately against the on-screen cast |
| 9 | Substitution test | 8 | Run before the shortlist. Flip one attribute, usually gender, and investigate every break as a possible unstated assumption |
| 10 | `usage_and_rights` | 9 | Ask for usage terms before the shortlist, not after |
| 11 | `shortlist` | 10 | Filtered by what usage the fee can actually cover |
| 12 | `direction_ladder_entry_level` | 11 | Written before the session, including two or three alternate points of view to be tried regardless |
| 13 | Session run, room tone captured, takes logged by number | 12 | At the session |
| 14 | `alternate_take_policy` and take selection | 13 | At delivery. Nominate one selected read, one alternate with a different POV, and flag any line needing a pickup |
| 15 | Delivery to Sound and Editor with take log, room tone and pickup list | 14 | At delivery |
| n/a | `vo_coverage` | 4 | Not stated in bible as a numbered checklist step. Recorded in the timing section of the plan |
| n/a | `languages` | 2, 4 | Deciding timing and native writing before the session, not after, is the difference between a pickup and a re-record |
| n/a | `synthetic_voice_use` | Client policy and delivery contract | Before any use where the delivery contract, the client's AI policy or the applicable union agreement has not been checked |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Writer / Director | The final locked script, with person and POV explicitly declared | Casting against a moving script produces a session that must be repeated |
| Editor | The locked runtime, the timing map of where VO sits and where picture is clear, and a cut with the scratch track in it | Pace is derived arithmetic, not taste. Without timing there is no pace |
| Sound | Mix intentions: how much music and sound design will sit under the VO, and where the VO is the only element | A voice cast for a bare mix will disappear under a dense one, and a voice cast for a dense mix will feel harsh when exposed |
| Director | The tonal register of the whole piece, stated against references, and the anti-register | The single most common under-specification in the entire discipline |
| Picture Casting | The on-screen cast: gender, age, accent and screen presence | Contrast cannot be designed without knowing what is being contrasted against |
| Producer | Usage, territory, term, exclusivity requirements and the budget envelope | Determines which performers are legally and financially available |
| Producer / Legal | The client's AI and synthetic voice policy, plus any delivery contract restrictions | Determines whether a whole category of solution is even permitted |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| On-screen cast gender or age recast | Match-or-contrast decision, gender and age of the VO, the substitution test, any first-person attribution, music brief coherence | Cast names in the document, shot list captions |
| Script rewrite | Word count, pace, whether silence still exists, person and POV (verify it did not drift), the difficult-line list, the anti-register if the tone of the copy moved | Script version number, date |
| Runtime change | Pace band, whether copy must be cut, VO coverage pattern, block structure, the entire read register if the change is large | Delivery spec, format label |
| Language added or changed | Native writing pass, casting pass for that language, word count and timing for that language, whether that version needs its own edit, accent and dialect strength within that language | Language field in the deliverables table |
| Pacing pivot, slower or faster overall | Read register (pace and register are coupled, not independent), the shortlist itself, breathing-room negotiation with the Editor, music brief | Nothing. A pacing pivot is a real re-open |
| POV change, first to second person or the reverse | Everything below function in the checklist. This is the deepest re-open available. Casting, lip-sync exposure, contrast strategy, and every line of copy | Nothing |
| A speaking mouth added to frame | The entire premise. This ceases to be VO. Escalate to Director and Producer before any other work | Nothing |
| Usage expanded | Affordability of the entire shortlist, exclusivity and conflict clearance, contract terms, possibly the selected performer | Territory list, term dates |
| Mix intention changed, bare to dense or dense to bare | Whether the selected read survives, whether a re-record at a different energy is needed, notes to Sound | Mix version number |
| Synthetic voice permitted or prohibited mid-project | The solution class, budget, consent and licence documentation, disclosure position | Nothing if prohibited late. If permitted late, treat as an addition, not a replacement, and re-derive whether it is appropriate for this piece at all |
| Editor requests seconds back | Copy content, which words go, not the pace. Do not resolve a runtime problem by speeding the read | Timecodes |

### Output template
```
# VO CASTING AND VOICE DIRECTION PLAN
Piece: [title] Runtime: [locked, in seconds]
Script status: [LOCKED / MOVING] Date:

## 1. FUNCTION AND GRAMMAR
Voice function: [narrator / interior voice / brand voice]
Person and POV: [first / second / third] DECIDED BY: [name]
Speaking to: [viewer / another character / nobody]
Voice belongs to an on-screen character: [YES / NO]
Any speaking mouth in frame: [NO is the required default. If YES, escalate.]

## 2. TIMING
Locked runtime: [ ] sec
Word count: [ ]
Implied pace: [ ] wpm
Silence present at that pace: [YES / NO. If NO, copy must be cut before casting]
VO coverage: [wall to wall / blocks]
Piece ends on: [words / picture]

## 3. THE READ
Register: [announcer / conversational / authentic-unpolished / interior / wry / documentary]
Reference (positive): [named piece or named performer, and what specifically to take from it]
Reference (negative): [named piece, and what specifically to avoid]
ANTI-REGISTER: [the read we must not get, named explicitly]

## 4. ATTRIBUTES
Gender: [ ] Relationship to on-screen cast: [MATCH / CONTRAST] Why:
Perceived age band: [ ]
Accent / dialect: [ ] Strength: [light / medium / full]
Timbre: [weight, rasp, brightness, breathiness]
Pace band: [ ] wpm

## 5. SUBSTITUTION TEST
Attribute flipped: [usually gender]
What broke: [list every line, shot note, or brief item that stopped making sense]
Unstated assumptions found: [ ]
Resolution: [ ]

## 6. LANGUAGES
| Language | Primary? | Written natively by | Own edit? | Word count | Runtime |
|---|---|---|---|---|---|

## 7. USAGE AND COMMERCIAL
Media: [ ]
Territories: [ ]
Term: [ ]
Exclusivity / conflict required: [YES / NO. Category: ]
Buyout or residual model: [ ]
Budget envelope: [ ]
Pickup session allowance: [booked by default]

## 8. SHORTLIST
| # | Voice | Why this one | Risk | Quote at stated usage |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## 9. DIRECTION PLAN FOR THE SESSION
Opening point of view: [who the performer is, and who they are talking to]
Planned alternate POV 1: [ ]
Planned alternate POV 2: [ ]
Adjustment ladder, prepared in advance:
 L1 who: [ ]
 L2 to whom: [ ]
 L3 circumstance: [ ]
 L4 relationship: [ ]
 L5 physical: [ ]
 L6 mechanical: [ ]
Lines flagged as difficult: [ ]
Record both dry-and-close and open-and-big versions: [YES by default]

## 10. SYNTHETIC VOICE
Permitted by client policy: [YES / NO / UNCONFIRMED]
Permitted by delivery contract: [YES / NO / UNCONFIRMED]
Proposed use: [scratch only / none / licensed voice / production use]
If a real person is resembled: separate written consent obtained [YES / NO / N.A.]
Disclosure position: [ ]

## 11. DELIVERABLES
[ ] Selected read, clean line stems, unprocessed
[ ] Alternate read on a different POV
[ ] Take log with reasons
[ ] Room tone, 30 to 60 sec, same room, same session
[ ] Pickup list
[ ] Notes to Sound on deliberately quiet or breathy passages

## 12. OPEN ITEMS BLOCKING LOCK
- [ ]
```

## DEPT-09: PRODUCTION DESIGN, ART DIRECTION AND LOCATION DESIGN

**dept_id:** `production-design-and-locations`
**role_one_liner:** The only department that builds the thing the camera photographs, owning what the world looks like as a large amount of invisible reasoning delivered as physical space, from world statement and palette through builds, dressing, props and locations.

### Lockable decisions

**Classes:** 9 GATE, 4 DERIVED, 3 CONDITIONAL

#### `build_location_hybrid` - Build versus location versus hybrid, per zone
**CLASS:** GATE
**Ask:** For this zone, are we building it, finding it, or splitting it across both?
**Options:**
| Option | Description (from bible) |
|---|---|
| Build | Total control of walls, ceiling, floor and light, including removable walls and ceilings. Good sound control on a proper stage. High fixed cost, low variable. Risk is construction overrun. Best for repeated use, stunt or effects work, and extreme palette control. A 360 degree build removes the constraint that limits every partial build: the director cannot turn around. |
| Location | No to partial control of walls, light constrained by windows and sun path, sound often the deciding problem. Low fixed cost, high variable in fees, permits and restoration. Risk is weather, noise, access withdrawn, neighbours. Best for texture and scale that money cannot fake. |
| Hybrid | Partial control, mixed sound and light, both cost profiles, longest lead time. Risk is continuity between the two halves: floor finish, skirting profile, door hardware, wall value and light temperature all have to match across two different physical facts. Best for a place that needs one impossible feature. |
| Design of locations with no construction department | On contemporary work the job becomes almost entirely the design of locations, augmenting interiors with dressing and props. |

#### `tone` - The tone of the piece, named in words
**CLASS:** GATE
**Ask:** What is the tone, named in words, separately from the finish level?
**Options:**
| Option | Description (from bible) |
|---|---|
| Warm and comic | One end of the tone axis as stated. A tone note does not tell the art department whether to buy new furniture or worn furniture. |
| Cold and severe | The opposite end of the same stated axis. |
| Hopeful to bleak | A stated alternative tone axis. |
| Intimate to institutional | A stated alternative tone axis. |

#### `finish_level` - Realism and finish level, 1 to 5
**CLASS:** GATE
**Ask:** What is the finish level, 1 to 5, scrappy to pristine, given as a separate number from tone?
**Options:**
| Option | Description (from bible) |
|---|---|
| Scrappy and lived-in | One end of the material condition axis: how worn, how cluttered, how improvised, how expensive, how maintained. In a scrappy, aged, high-texture space believable disorder is nearly free. |
| Polished and aspirational | The other end. Achieved by taking away black, white, wind, rain, sun, electricity, patina, clutter. Polish did not make the tone glossy. |
| Premium delivered through wear | A premium tone can be delivered by a beautifully worn, richly textured, well-used space. Assuming premium means pristine is a common and expensive mistake in commercial work. |
| Pristine without a separate tone note | A pristine environment can read as cold, corporate and unlikeable if the tone note is not separately handled by palette, warmth and human evidence. |

#### `palette_anchor` - The anchor hue and its counterweight
**CLASS:** GATE
**Ask:** What is the anchor colour, what counterweight keeps it visible, and has it been tested on camera under the intended illuminant?
**Options:**
| Option | Description (from bible) |
|---|---|
| Pure pigment base generating a derived palette | Candidate hues started to look really dull and grey once photographed, so the resolution was to start from a pure fluorescent pigment as the base, which generated a workable palette of roughly eleven pinks, from which the other hues were derived. A palette is generated from an anchor, not assembled from a list. |
| Anchor plus a deliberate counterweight hue | If you use too much of a dominant colour you stop seeing it because it is everywhere. Other colours have to be added specifically so the dominant one can be perceived. A dominant colour needs a contrast colour to remain visible. |
| Single hue with no counterweight | A palette with only one hue is not a palette, it is a wash. |
| Anchor derived from the brand's permitted colours | In branded work the neutral field is the colours the set is actually built from, chosen to make the reserved colour maximally legible. If the chosen anchor is the reserved brand hue or a prohibited competitor hue, the set yields and the palette is re-derived from a permitted anchor. |

#### `brand_colour_treatment` - How brand colours are handled in the environment
**CLASS:** CONDITIONAL on the job being commercial work with brand colour specifications issued in writing before palette lock | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Which colours are reserved, permitted, neutral or prohibited, and is that in writing before palette lock?
**Options:**
| Option | Description (from bible) |
|---|---|
| Reserved, brand primary | May not appear on walls, large furniture or large dressing. May appear only on the product itself and on approved brand surfaces. |
| Permitted brand secondary | May be used, usually at limited coverage, often specified as a percentage of frame. |
| Neutral field | The colours the set is actually built from, chosen to make the reserved colour maximally legible. |
| Prohibited | Competitor-associated hues, and hues that clash with the product's own packaging. |

#### `materials_and_finishes` - Surface material, sheen, value, texture, age and reflectivity
**CLASS:** DERIVED from `finish_level`, `palette_anchor`, `lighting_philosophy` and `contrast_ratio` (DEPT-01 Director of Photography) | sheen, value and reflectivity per surface follow from the locked finish level and the locked lighting plan as physics: a gloss wall reflects the rig, high-reflectance white walls raise the ambient and destroy the ratio, so wall value drops one or two steps under a subtractive key
**Ask:** Per surface, what is the material, sheen, value, texture, age and reflectivity?
**Options:**
| Option | Description (from bible) |
|---|---|
| Matte, eggshell or satin | Part of the sheen decision set alongside gloss. Materials are what survive compression, small screens and grading after hue has been flattened. |
| Gloss | One of the two finishes most likely to generate on-day problems: gloss shows the light sources and the crew. |
| High-reflectance white walls | Throw uncontrolled fill onto faces and force the DP to flag or negatively fill, costing setup time. |
| Wall value dropped one or two steps | Almost always the cheapest fix in the whole production, and the designer should offer it before being asked. A wall's paint value is an exposure decision as much as a colour decision. |

#### `furniture_and_layout` - Layout, furniture and camera access per zone
**CLASS:** DERIVED from `build_location_hybrid` and `movement_plan` (DEPT-01 Director of Photography) | camera positions, walk length, clean eyelines and the need for a wild wall are measured off the locked footprint against the locked movement plan rather than chosen
**Ask:** Where can the camera stand, how far can a performer walk, is there a clean eyeline, and can a door or wall be removed?
**Options:**
| Option | Description (from bible) |
|---|---|
| Full 360 degree build laid out for actors | Build everything so it can be shot from 360 degrees, creating spaces for actors rather than for the camera alone, so performers can cross in and out of real structures. |
| Camera-facing partial build | A partial build carries the constraint that the director cannot turn around. A designer who builds a beautiful wall the camera never sees has wasted money, not made art. |
| Location layout augmented with dressing and props | The contemporary no-construction approach where the design is the location choice. |
| Wild wall or removable element | A set wall built to be removable so the camera can shoot from where the wall would be. Only exists on builds, which is one of the main arguments for building. |

#### `practical_fixtures` - Practical lighting fixtures as design elements
**CLASS:** GATE
**Ask:** Which in-frame light sources exist in this zone, at what position, height, quantity, colour temperature and dimmability?
**Options:**
| Option | Description (from bible) |
|---|---|
| A designed practical that is also the lighting design | A set piece, a story object and the key light at once. When a practical is designed rather than merely bought, the lighting plan is partly written before the gaffer arrives, and the scene gains a light source the audience believes in. |
| A few well-chosen lamps | Most projects answer the question of where the light in the room comes from with three well-chosen lamps. Both are the same act. |
| No practicals in an interior night zone | The lighting has no motivation and the gaffer will invent it, usually as flat ambient. A set with no practicals gives the DP no motivated sources, which forces either flat ambient light or lighting the audience cannot explain. |
| Screens as practicals | Monitors, phones and televisions are practicals. Their brightness, content, refresh behaviour and colour are art department decisions with direct exposure and flicker consequences. |

#### `dressing_density` - How dense the dressing is, against the lens
**CLASS:** DERIVED from `focal_map` and `working_stop` (DEPT-01 Director of Photography) | the density that survives is computed from the lens plan for that zone: the same dressing that reads behind a long lens at a wide stop turns to noise behind a wide focal length at a deep stop, so density is reduced behind the subject specifically
**Ask:** What density level, and does it survive the DP's lens plan for this zone?
**Options:**
| Option | Description (from bible) |
|---|---|
| High density behind a subject at a wide focal length and deep stop | Becomes visual noise competing with a face. |
| The same density behind a long lens at a wide stop | Becomes texture. |
| Density reduced behind the subject specifically, not everywhere | Keep density in the frame's periphery and in cutaways. Density is a joint decision with the DP, not a unilateral one. |
| "Generic dressing" or "dress it appropriately" | Nobody can buy this. It produces whatever the runner found. |

#### `disorder_approach` - How believable mess is achieved
**CLASS:** CONDITIONAL on at least one zone being scripted as disordered, messy or degraded | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** In this space, how is disorder made believable, and what is the countable list?
**Options:**
| Option | Description (from bible) |
|---|---|
| Degrade the space itself | Add wear, cabling, coffee rings, sun-faded patches, wall marks, mismatched added furniture. A paint and dressing cost. |
| Make the disorder specific, recent and explained | An active project spread out, a deadline, a move, an incident. A design and continuity cost. |
| Accept a lower disorder level and express overwhelm otherwise | Density of people, scale of the task visible on screens and boards, evidence of hours rather than evidence of chaos. |
| "Make it messy" | Not a specification, an abdication. Produces crew-scattered objects and continuity failure. Disorder must have a vector, must survive continuity as a photographed reset list, and must not eat the frame's subject. |

#### `hero_props` - Hero prop identification, multiples and close-up plan
**CLASS:** GATE
**Ask:** Which objects are story-critical and shot close, how many exist, and who owns them?
**Options:**
| Option | Description (from bible) |
|---|---|
| Designed hero with multiples | A hero prop is designed rather than sourced, exists in multiples (a hero, a stunt or rough version, and usually a spare), and must survive being photographed at a metre or closer with a macro or long lens. |
| Hero plus one spare minimum, more if handled or consumed | The stated fix for a hero prop with no multiples count. |
| A single hero object with no spare | The most common commercial failure is discovering on the day that the one hero object has a fingerprint, a scratch, or a logo in the wrong place, and there is no second one. |
| Hero product as a cast member | Hero product staging is its own sub-discipline: surface condition, label alignment, fingerprints, condensation, pour and melt behaviour, and the fact that macro and long-lens close-ups expose flaws invisible to the eye. Product close-ups are commonly grouped into a single block. |

#### `location_selection` - Which location is taken
**CLASS:** GATE
**Ask:** Does this location merely look right, or does it actually work?
**Options:**
| Option | Description (from bible) |
|---|---|
| Looks right | Satisfies the design idea in a photograph taken by one person standing still holding a phone. |
| Works | Additionally survives a crew of a given size inside it, the lighting package it needs, the sound it must record, the schedule it must fit, the number of setups it must yield, the blocking of the scene, and the load-in it demands. |
| The perfect real space that cannot be controlled | Cannot repaint, cannot kill the HVAC, cannot close it. Control usually wins, because a controllable plain room can be designed into the right room, while an uncontrollable perfect room cannot be shot. |
| Untested, photographs only | No power, no sound, no ceiling height, no compass bearing, no access notes. The three most common ways a beautiful location fails: the sound floor is unusable, the room is too small for the lighting the look requires, or the production cannot control access for long enough to shoot the day. |

#### `location_count_and_moves` - How many locations, and what that costs the day
**CLASS:** GATE
**Ask:** How many locations in total, and does any shooting day contain more than one?
**Options:**
| Option | Description (from bible) |
|---|---|
| Single location per shooting day | Grouping scenes by location to avoid mid-day relocations can save on the order of 20% of total daily shooting hours. |
| Second location with a company move | Relocates the entire cast, crew and equipment during a single shooting day, taking anywhere from thirty minutes to several hours. A poorly planned move can derail a schedule, exhaust the crew, and cut into shooting time. |
| Second location as a separate call time or day | Converts the move into an extra day of crew, kit and catering. |
| Second location absorbed silently | The most expensive silent failure in the seat. A second location is roughly a second half-day of production time even when it is ten minutes away, and frequently a second full day once dressing and lighting are counted. It also brings its own lighting package, dressing pass, scout, permit, insurance, fee, risk profile and continuity obligations. |

#### `graphics_and_screens` - In-frame graphics, signage and screen content
**CLASS:** CONDITIONAL on in-frame graphics, signage or screen content existing in the locked shot list | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** What is on every graphic and screen, is it cleared, and how bright is it?
**Options:**
| Option | Description (from bible) |
|---|---|
| Specified content, brightness and clearance per screen | Monitors and phones are practicals, graphics, clearance items and exposure risks at once. |
| Cleared or removed third-party material | Competitor products cannot appear, third-party logos must be cleared or removed, regulated categories have depiction rules. |
| Constrained by client brand guidelines | In many markets the client's own brand guidelines constrain materials, typography on any in-shot graphic, and even the finish of surfaces near the product. |
| Unspecified screen content | Legal problem or flicker problem. |

#### `continuity_protocol` - Who photographs and resets each dressed zone
**CLASS:** DERIVED from `dressing_density`, `disorder_approach` and `hero_props` | the named owner per zone and the reset list are generated from the locked dressing specification: every countable disorder item and every hero prop position becomes a line on the reset list
**Ask:** Who is the named continuity owner for this zone, and what is the reset list?
**Options:**
| Option | Description (from bible) |
|---|---|
| Named person per zone | Named person who photographs and resets. Without one, dressing drifts across takes and days and reverses mismatch. |
| Minimum clutter checklist doubling as the reset list | Mess is photographed before the first take and restored between takes. This is why the fixed list exists: it is also the reset list. |
| Undocumented mess | Will be different in the reverse, and the edit will show it. |

#### `on_the_day_change_policy` - What can move once the client is on set
**CLASS:** GATE
**Ask:** Which elements are locked and which can be adjusted on the day without collapsing the schedule?
**Options:**
| Option | Description (from bible) |
|---|---|
| Pre-agreed locked list | Identify in advance which elements are locked and which can be adjusted on the day, and say so before the client arrives. |
| Menu of pre-approved on-the-day adjustments | Offered so the answer is never a flat no. |
| Live approval that would break the schedule | The set is a venue for client attendance and approvals may happen live on the day, so design must accommodate a video village and a client area. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | World statement, one sentence | Nothing | Agreed with the director. Root of the tree |
| 2 | `tone` and `finish_level` | 1 | Two separate values, agreed with the director |
| 3 | Zone enumeration | 2 | Agreed with the 1st AD and the DP against the shot list |
| 4 | `build_location_hybrid` per zone | 3 | Agreed with the producer, because it is a money decision |
| 5 | `location_selection` shortlisted and scouted | 4 | Against the shootability checklist, not against photographs |
| 6 | `palette_anchor`, anchor chosen | 5 | Derived from research or from the brand's reserved colour, then tested on camera under the intended illuminant |
| 7 | Full palette derived from the anchor, including counterweight | 6, `brand_colour_treatment` | Cross-checked against wardrobe samples and brand reservations. Palette cannot lock before wardrobe samples are seen |
| 8 | `materials_and_finishes` per surface per zone | 7 | Cross-checked with the DP for exposure and reflectivity. Before paint |
| 9 | `practical_fixtures` per zone | 8 | Agreed with the DP and gaffer |
| 10 | `furniture_and_layout` per zone | 9 | Drawn, checked against blocking and camera positions with the director and DP |
| 11 | `dressing_density` and the minimum clutter checklist, plus `disorder_approach` | 10 | Written as countable items, checked against the DP's lens plan |
| 12 | `hero_props` | 11 | With multiples counts and owners, before rehearsal |
| 13 | `graphics_and_screens` | 12 | With clearance status |
| 14 | Build days, dressing days, load-in and strike, plus `location_count_and_moves` | 13 | Placed on the schedule with the 1st AD, before schedule lock |
| 15 | `continuity_protocol` | 14 | Who photographs each dressed zone before the first take |
| 16 | Contingency named per zone, plus `on_the_day_change_policy` | 15 | Before the client arrives |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Director | Tone, finish level, period strictness, blocking intent, what the scene is about | Everything. This is the root dependency |
| DP | Lens plan per zone, lighting approach, contrast intent, camera positions and movement, whether ceilings and floors are seen | Dressing density, wall values and sheens, practical positions, which walls need to be built at all |
| Gaffer | Rigging requirements, power draw, whether the fixture bulbs will be replaced | Practical fixture spec, ceiling treatment, power planning at location |
| Wardrobe | Palette in physical samples, per character, per scene | Wall and large-surface hue and value. Do not paint before this exchange |
| Casting / 1st AD | Final headcount, principals and background, per zone | Furniture count, desk count, seating, dressing footprint, holding area size |
| Colorist | Grade intention: saturation level, contrast, any hue shift, whether a LUT is agreed for on-set monitoring | Whether a subtle hue distinction will survive to the final image. A palette that dies in the grade was wasted money |
| 1st AD | Shooting schedule per zone, day order, build and dressing windows, company move plan | Build days, dressing passes, strike, whether a swing set is required |
| Producer | Budget split, location fees and permits, restoration obligations | Build versus location, scope of dressing, hero prop multiples |
| Client / brand | Colour reservations, prohibitions, competitor exclusions, logo and graphics clearance rules, product supply date and quantity | Palette lock, all in-frame graphics, hero product staging |
| Sound | Noise floor tolerance, whether HVAC must be off, whether hard surfaces are a problem | Location approval, floor and wall material choices |
| VFX (if any) | What is extended, replaced or removed, tracking marker requirements, greenscreen extents | Which set walls actually get built and how far |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Location swap, same zone, different place | Physical description in full. Ceiling height, window orientation and compass bearing, floor and wall materials, power, sound, access, load-in, parking. Practical fixture positions and heights. Layout and camera positions. Wall values, because the new walls are a different colour. Sun path. Risk. Scheduling: re-scout and re-tech-scout, and a company move may now exist that did not before | Zone ID, zone name, palette intent, tone, finish level, hero prop list |
| New second location added | Everything for the new zone from scratch. Also the existing zones' schedule allocation, because the day now has less time in it. Scheduling: either a company move of thirty minutes to several hours plus repeated lighting setup and a second dressing pass, or a separate call time or day. State it explicitly. Never let an added location enter the plan without a stated time cost | Nothing about the existing zones' design |
| Ensemble added, headcount up | Occupancy per zone. Furniture and seating counts. Dressing footprint, because more occupants means more personal-object clutter and more surfaces. Layout, because blocking changes. Possibly the zone count itself, if the new people occupy areas previously out of frame. Load-in volume. Budget. Scheduling: more furniture is more load-in and more dressing time | World statement, tone, finish level, palette |
| Palette pivot | Wall values and hues per surface. Materials and finishes. Dressing item selection: fabric, upholstery, artwork, books, packaging. Practical fixture colour temperature, if the anchor changed warmth. Wardrobe cross-check, fully re-run. Camera test, fully re-run. Scheduling: repaint days, possible re-purchase of dressing, hard cost if anything was already bought or painted | Layout, furniture counts, physical descriptions, access logistics, sound notes |
| Framing rule change that widens what is seen, wider lens, wider aspect, ceiling or floor now visible, 9:16 crop added | The extent of every build, since walls that were not needed now are. Ceiling treatment. Floor treatment. Dressing coverage across the newly visible area. Practical positions, because more of the room's light sources are now in frame. Density, because a wider lens changes what competes with the subject. Scheduling: additional build and dressing pass, one of the few changes that can add build days late, flag to the 1st AD immediately | Palette, tone, finish level, hero props |
| DP changes the lens or lighting plan | Dressing density. Wall sheen and value. Practical positions and dimming. Whether a wall must be wild. Scheduling: usually absorbed, unless a wild wall is newly required, which is a build change | Physical description, palette intent, occupancy |
| Wardrobe palette change | Wall and large-surface hue and value in every zone that character appears in. Re-run the camera test. Scheduling: repaint risk if paint is already done | Everything structural |
| Grade intention changes, for example heavy desaturation added | Whether subtle hue distinctions are still worth paying for. Value separation may need to increase to compensate for lost hue separation. Scheduling: minimal impact if caught in prep, severe if caught in the grade | Layout, logistics, occupancy |
| Schedule compression, a day removed | Build scope. Which zones become swing sets. Which zones convert from build to location or from location to a corner of an existing set. Dressing density, since the first thing to cut is depth of dressing in zones with few setups. Every removal must be traded against something specific, not absorbed silently | World statement, tone, palette |
| Brand rules issued or changed | Palette anchor if the anchor is now reserved or prohibited. All in-frame graphics. All screen content. Product staging. Competitor removal sweep across every zone. Scheduling: a late brand rule change can invalidate purchased dressing, so get the rules in writing before the palette section is locked | Physical descriptions, layout, logistics |
| Weather forecast change on an exterior or window-dependent zone | Sun path assumptions. Practical and supplementary lighting. Greens condition. Cover-set plan. Scheduling: may force a schedule reorder, which is the 1st AD's call, but a dressed cover set must be ready if one is nominated | Palette, layout |

### Output template
```
PRODUCTION DESIGN PLAN
Project: [name] Version: [n] Date: [date]
Designer: [name] Status: DRAFT / FOR REVIEW / LOCKED

----------------------------------------
1. WORLD STATEMENT
One sentence. Not a genre label. What kind of place is this and
what does it believe about the people in it.

2. TONE AND FINISH (two separate values)
Tone: [named in words]
Finish level: [1-5, scrappy to pristine]
Note on why these two are set where they are, independently.

3. DESIGN REFERENCES
3-8 images with a one-line note on WHAT is being referenced in each
(shape / palette / material / density / light). Never a bare mood board.

4. PALETTE
Anchor hue: [with a physical reference, not a hex code alone]
Counterweight: [the hue that keeps the anchor visible]
Wall value range: [light/mid/dark, with reflectance intent]
Floor value: [ ]
Permitted accents: [ ]
RESERVED (do not use in environment): [brand primary, etc.]
PROHIBITED: [competitor hues, clash hues]
Camera test status: [not tested / tested under X illuminant / approved]
Wardrobe cross-check status: [samples exchanged y/n, date, outcome]

5. BUILD / LOCATION STRATEGY
Table: zone | build/location/hybrid | status | why

6. ZONE SPECIFICATIONS
[Repeat the full block below for EVERY zone. Self-contained. Never
"same as above."]

 ZONE [ID]: [NAME]
 a. PHYSICAL DESCRIPTION
 Shape and size (m):
 Ceiling height (m):
 Floor: material / finish / condition
 Walls: material / finish / sheen / value
 Windows: count / size / orientation (compass) / treatment
 Doors and openings: count / position / practical or dressed
 Architectural period and condition:
 What the room is, in one plain sentence:
 b. BUILD OR LOCATION
 [ ] Status, address or stage, fallback
 c. PALETTE IN THIS ZONE
 d. MATERIALS AND FINISHES (per surface)
 e. FURNITURE AND LAYOUT
 Item list with counts. Plan sketch attached.
 Camera-position notes and any wild wall / removable element.
 f. PRACTICAL FIXTURES
 type | position | height | qty | colour temp | dimmable | in-frame
 g. DRESSING DENSITY
 Density level [1-5] and the MINIMUM CLUTTER CHECKLIST
 (countable, buyable, also serves as the reset list)
 h. HERO PROPS IN THIS ZONE
 item | multiples | owner | close-up plan
 i. GRAPHICS AND SCREENS
 content | clearance status | brightness note
 j. OCCUPANCY
 Max humans in frame | seats required | background count
 k. ACCESS AND LOGISTICS
 Load-in route | lift dimensions | carry distance | power | parking
 l. SOUND NOTES
 Noise sources | HVAC control | reverb
 m. RISK AND CONTINGENCY
 Most likely failure | fallback
 n. CONTINUITY OWNER
 Named person

7. CROSS-DEPARTMENT LOCKS
Table: department | what was received | date | status
(DP lens plan, wardrobe samples, headcount, grade intent, schedule,
brand rules)

8. SCHEDULE IMPLICATIONS
Build days | dressing days | load-in | strike | swing set turnarounds
COMPANY MOVES: [list every one, with estimated time cost]
Any zone that adds a location gets an explicit line here.

9. BUDGET SPLIT
Build | dressing | props | greens | locations and fees | restoration |
contingency %

10. OPEN QUESTIONS AND WHO OWNS THEM
----------------------------------------
```


---

## DEPT-10: SOUND DESIGN, MIX, AND MUSIC

**dept_id:** `sound-design-mix-and-music`
**role_one_liner:** Decide what the audience should be paying attention to at every moment, and then make that unavoidable.

### Lockable decisions

**Classes:** 8 GATE, 6 DERIVED, 4 CONDITIONAL

#### `music_route` - Original score, licensed track, or production library
**CLASS:** GATE
**Ask:** Where is the music coming from, and who has already decided that?
**Options:**
| Option | Description (from bible) |
|---|---|
| Original score | Music written to your exact structure, owned or licensed cleanly, thematic material you can reuse. Costs time, a composer fee, and needs a brief and a lock. Right for anything with a distinct emotional arc, anything that will run for years, anything needing cutdowns. |
| Licensed track | Instant cultural recognition, an existing fanbase, a pre-formed emotional association. Costs a sync licence plus a master licence, with term, territory, media, exclusivity, and a fee that scales with all of them. Right when the recognition IS the idea. |
| Production library | Speed, low cost, predictable clearance. Non-exclusive, so a competitor may use the same cue, and generic by construction. Right for fast-turnaround, low-stakes, or high-volume social work. |

#### `music_writing_method` - Writing to script, to locked picture, or by transformation
**CLASS:** DERIVED from `music_route` and `assembly_order` (DEPT-03 Editor) | a licensed track or library cue is already written so the method is necessarily to locked picture, and only original score can start from the script, which the locked assembly order then decides
**Ask:** Does the composer start from the script, from the locked cut, or by reprocessing one existing theme?
**Options:**
| Option | Description (from bible) |
|---|---|
| Write to the script, before picture | Gives the film music with its own architecture rather than music that follows edits. Guonadottir began writing Joker straight from the script, Johannsson wrote an Arrival theme in the first week of filming before seeing footage, and Nolan wrote Dunkirk in a musical shape for Zimmer. |
| Write to a locked picture | Gives you precision and hit points, at the cost of the music becoming subordinate to the edit's existing rhythm. Reznor and Ross came onto The Social Network over a rough cut, absorbing pacing first, generating material then editing material rather than composing linearly to picture. |
| Transformation of one theme | Britell wrote a straight piano and violin piece for Moonlight, then slowed and pitched that same recording down roughly three octaves so the theme returns as a sub-bass rumble. One theme, processed, carries a character across a whole film, which is how you build a music asset that survives a three-year campaign. |

#### `tempo_authority` - Who is authoritative, music or picture
**CLASS:** GATE
**Ask:** Is the edit allowed to move to fit the music, or must the music fit the edit?
**Options:**
| Option | Description (from bible) |
|---|---|
| Music leads the edit | Choosing music early constrains the edit. That can be good, it gives the piece a spine. Once music is on a grid, every cut either lands on the grid or fights it. |
| Picture leads the music | Choosing music late constrains the music. The composer inherits a rhythm that was set by picture and must accommodate it. |
| Explicitly deferred | If deferred, state that the edit is authoritative and the composer will conform. You cannot have both freedoms, and the choice must be declared in writing by the director before either department commits, because it cannot be chosen retroactively. |

#### `mix_hierarchy` - Default order of attention
**CLASS:** DERIVED from `vo_exists_no_speaking_mouth` (DEPT-08 VO Casting and Voice Direction) | the default order follows the locked speech situation: VO-led where a voice-over is locked, dialogue-led narrative order where a speaking character is in frame, with any deliberate inversion named at a stated timecode range
**Ask:** At any instant, which single element is the audience listening to?
**Options:**
| Option | Description (from bible) |
|---|---|
| Narrative default: dialogue, then effects, then music | The default priority for narrative work, with the order violated deliberately at specific moments for effect. |
| VO-led default: VO, then music, then effects | The default for VO-led commercial work, with the same rule about deliberate violation. |
| Deliberate inversion at a stated timecode range | The order is violated on purpose at specific moments. Sound design is not ninety-six channels all at eleven, it is detail and nuance, things you might not notice until the second or third viewing. |

#### `density_budget` - How many simultaneous layers
**CLASS:** GATE
**Ask:** How many things are allowed to compete at once?
**Options:**
| Option | Description (from bible) |
|---|---|
| One foreground, one support, everything else texture | Beyond about two and a half comparable elements the ear stops resolving them individually and starts hearing texture. If three things are all competing for foreground, none of them is in foreground. |
| Minimalism, a sound design haiku | Lievsay describes No Country for Old Men as a very good collaboration in minimalism, a minimum number of sounds made to tell the story. Restraint is a supervising decision, not a mixing decision, because you cannot mix your way out of a track that has forty elements when it needed four. |
| Four moves in a 30-second spot | A 30-second spot has roughly four sonic moves: an attention event in the first two seconds, a bed that establishes tone, one designed hero sound at the story turn, and the end-card sting. Anything else is decoration. |

#### `diegetic_position` - Diegetic, non-diegetic, or crossing the boundary
**CLASS:** GATE
**Ask:** Can the characters hear this, or is it only for the audience?
**Options:**
| Option | Description (from bible) |
|---|---|
| Diegetic | Exists in the world of the film. Characters could hear it. A radio, a door, a phone, a room. |
| Non-diegetic | Exists only for the audience. Score, VO from outside the scene, a designed emotional swell. |
| Boundary crossing | The interesting work lives on the boundary. Music that begins non-diegetic and is revealed to be coming from a car stereo, or a designed effect that starts as a real sound and morphs into score, gives you a free change of register. Klyce and Fincher used a strict version on The Killer, and the rule created the style. |

#### `sound_palette` - What the piece is allowed and forbidden to use
**CLASS:** GATE
**Ask:** What is the finite written list of materials this piece may use, and what is banned?
**Options:**
| Option | Description (from bible) |
|---|---|
| Texture families plus a tonal centre | The palette should name texture families (metallic, organic, breath-based, synthetic, room-based) and a tonal centre if there is one. |
| Exclusion list | Names what is forbidden, for example no synth risers, no stock whooshes, no sub-drops on cuts. An exclusion list is worth more than an inspiration list, because it is falsifiable. |
| Inspiration list | Worth less than an exclusion list, because it is not falsifiable. |

#### `hero_sound_specification` - How the single designed sound is defined
**CLASS:** CONDITIONAL on the design naming a single hero sound at all | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Is the hero sound authored and located, or just wished for?
**Options:**
| Option | Description (from bible) |
|---|---|
| Authored and located at a frame | A designed sound has a chosen fundamental pitch, a chosen attack, a chosen decay, and a chosen relationship to the score's key, built from a stack of real recordings chosen for their emotional character, not their literal accuracy, and placed at a specific frame of a specific shot with pitch and decay tail stated. Buildable, checkable, and arguable. |
| Stock selection | A stock notification tone is a stock notification tone. The sound must be authored, not selected. |
| Unlocated wish | "There is an approval chime somewhere" is not a specification, it is a wish. A designed sound named but never located is unbuildable and untestable, and this is the single most common failure in short-form briefs. |

#### `hero_sound_placement` - Relationship of the sound to the picture event
**CLASS:** CONDITIONAL on a hero sound existing per `hero_sound_specification` | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** Does the sound land on the frame, before it, or on the incoming shot?
**Options:**
| Option | Description (from bible) |
|---|---|
| On the frame | A sound placed precisely on the visual event often reads as slightly late, since the eye is already tracking the change. |
| One or two frames early | Leading by one or two frames tends to feel locked, so the ear leads the eye. A judgement to test on the day, not a law, but the right first guess. |
| On the first frame of the incoming shot | Listed in the bible as one of the intended relationships that must be stated when locking a sound to a frame. Tradeoff not stated in bible. |

#### `sync_lock_policy` - How frame-locked events survive editorial trims
**CLASS:** GATE
**Ask:** What happens when the editor trims two frames after lock?
**Options:**
| Option | Description (from bible) |
|---|---|
| Hard lock with a change list | Picture locks, and any change after lock is issued as a formal change note with frame counts. This is the feature standard and it works. |
| Protected regions | Certain shots containing sync points are declared untrimmable. The editor gets total freedom everywhere else. |
| Sound conforms, on a clock | The editor keeps trimming freedom and sound re-conforms, but the producer accepts a stated cost per re-conform. Honest and usually the cheapest option in short-form. |
| Fix it in the mix | The wrong resolution, because a broken sync point is not a level problem. |

#### `breathing_room_resolution` - Who absorbs the cost of VO air
**CLASS:** CONDITIONAL on the locked VO air, the locked cut pace and the music bar structure actually being in conflict | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** The VO wants air, the editor wants pace, the music wants a bar structure. Which two bend?
**Options:**
| Option | Description (from bible) |
|---|---|
| Cut a line | The most common and usually the best. If the runtime is fixed and the read needs air, the script is too long. Removing a phrase buys air everywhere. |
| Take the air from the top | Establishing shots are almost always more compressible than the VO's landing beats. |
| Let the music resolve past the last frame | Rather than forcing the music to land exactly on the end card, let the tail run under the logo hold. Cheap, and usually invisible. |
| Re-record the read to a timing target | Only viable if the VO is not yet locked. |

#### `ducking_approach` - How music makes room for the voice
**CLASS:** DERIVED from `music_route` and `mix_hierarchy` | arrangement-led space is only available where the music is original or delivered as stems, otherwise the room for the voice has to be taken by automation against the locked hierarchy
**Ask:** Is the space for the voice written into the arrangement, or taken by automation?
**Options:**
| Option | Description (from bible) |
|---|---|
| Arrangement-led | The music is written or edited so that it thins where the VO sits, and the ducking only has to do a few dB of work. A composer told in advance writes a thinner middle. |
| Automation-led | Done badly, a fast automatic sidechain makes the music audibly pump and the piece sounds cheap. A composer told after the fact gets EQ'd. |
| Both | Listed as a permitted approach in the plan template. Tradeoff not stated in bible. |

#### `temp_track_approach` - How to use a temp without inducing temp love
**CLASS:** GATE
**Ask:** How do we keep the director from being unable to accept anything but the temp?
**Options:**
| Option | Description (from bible) |
|---|---|
| Temp with the function, not the record | Choose temp that has the right shape and energy, not the record you wish you could afford. Listed first in order of usefulness. |
| Write down what the temp is doing | Record tempo, instrumentation, where it lifts, where it drops, so the composer is briefed on function, not asked to imitate. |
| Get an original sketch in early | Put a rough original into the cut early so the ear has an alternative before the temp becomes load-bearing. |

#### `loudness_target` - Integrated loudness per delivery context
**CLASS:** DERIVED from `delivery_matrix` (DEPT-02 Colorist) | each deliverable carries a published integrated loudness spec set by its platform: EBU R128 for European broadcast, ATSC A/85 for US broadcast, the platform normalisation target for YouTube, Spotify and social, and the podcast spec for audio-only
**Ask:** What loudness spec does each deliverable have to meet?
**Options:**
| Option | Description (from bible) |
|---|---|
| European broadcast, EBU R128 | -23 LUFS integrated, tolerance about plus or minus 1 LU, true peak -1 dBTP, loudness range capped at 20 LU. Broadcast compliance is typically a hard delivery requirement rather than a recommendation. |
| US broadcast, ATSC A/85 | -24 LKFS, true peak typically -2 dBTP. Broadcast compliance is a hard delivery requirement. |
| YouTube, Spotify and most social | Around -14 LUFS, true peak -1 dBTP. Streaming targets are normalisation behaviours you are mixing to meet rather than legal obligations. |
| Podcast / Apple | Around -16 LUFS, true peak -1 dBTP. |

#### `master_count` - How many masters are cut
**CLASS:** DERIVED from `delivery_matrix` (DEPT-02 Colorist) and `loudness_target` | master count is arithmetic: one master per distinct combination of channel format and loudness target in the locked delivery list, which is why cinema involvement forces a third
**Ask:** Can one master serve every platform?
**Options:**
| Option | Description (from bible) |
|---|---|
| Single master for all platforms | Broadcast and social loudness targets are incompatible. A -23 LUFS broadcast master uploaded to social will be normalised up and sound flat and over-limited. A -14 LUFS social master delivered to broadcast will be rejected. |
| Two masters minimum | The practical rule, because a single master cannot serve broadcast and social. |
| Three masters if cinema is involved | Listed as the fix when cinema is part of the delivery set. |

#### `format_and_fold_down_checks` - Which playback checks are mandatory
**CLASS:** DERIVED from `master_count` and `delivery_matrix` (DEPT-02 Colorist) | the mandatory checks follow from the locked channel formats and platforms: mono fold-down and a phone-speaker check wherever social is delivered, binaural headphone fold-down where headphone listening dominates, immersive plus stereo fold-down wherever an immersive master exists
**Ask:** Which fold-down checks must pass before this is finished?
**Options:**
| Option | Description (from bible) |
|---|---|
| Mono fold-down | Does anything phase-cancel or disappear. A non-negotiable check. |
| Phone-speaker check | Is the dialogue or VO still intelligible with no low end, given much of the audience hears it on a single phone speaker with essentially no bass below about 300Hz. A non-negotiable check. |
| Binaural headphone fold-down | The equivalent trap in immersive workflows, where dialogue routinely gets buried by music and effects that were perfectly clear in the room. |
| Immersive plus stereo fold-down | Cinema and premium streaming may want Dolby Atmos or 5.1 plus a stereo fold-down. Everything else wants stereo. |

#### `cutdown_and_sonic_asset_strategy` - How short versions and the audio logo are built
**CLASS:** CONDITIONAL on `delivery_matrix` (DEPT-02) listing short cutdowns or a brand sting as deliverables | becomes a GATE when true, otherwise record an explicit not-applicable entry
**Ask:** How do the 6 and 15 second versions and the brand sting get made?
**Options:**
| Option | Description (from bible) |
|---|---|
| Separate mix per duration | The 6-second version is not the 30 with the middle removed. It is a separate mix with its own hierarchy, usually VO plus sting plus one effect. |
| The 30 with the middle removed | Rejected by the bible. Plan the cutdowns while designing the hero, or you will discover the hero sound only works at 30. |
| Design at the shortest duration first, then extend | An audio logo is designed once and deployed across years, so it must survive a phone speaker, a shopping centre, the end of a 6-second bumper, and a 60-second brand film. Effective audio logos are short, roughly two to three seconds, distinctive, flexible, and materially more effective when they include the brand name. |

#### `sound_off_survival` - How the piece performs muted
**CLASS:** GATE
**Ask:** Does the story survive with the sound off, and what rewards the viewer who unmutes?
**Options:**
| Option | Description (from bible) |
|---|---|
| Survives muted and rewards unmuting | The consequence of high sound-off viewing is not that sound does not matter. The piece must survive muted and must reward unmuting, with a distinct payoff for the minority who hear it. |
| Story depends on an audio-only reveal | Rejected, because the story cannot depend on an audio-only reveal when a large share of social video is played muted, with figures around 85% on Facebook, around 80% on LinkedIn, and around 40% on Instagram. |
| Captioned version | Captioned video is associated with substantially higher completion, and a meaningful share of viewers turn sound on because the captions caught them. |

### Dependency order

**Internal order (must lock before):**
| # | Decision id | Depends on | Locks by / cannot be deferred past |
|---|---|---|---|
| 1 | `loudness_target`, `master_count`, `format_and_fold_down_checks`, `sound_off_survival` | Nothing internal. Delivery targets fixed first: platforms, durations, loudness specs, mono and phone-speaker requirement | Everything downstream is judged against this. Refuse to premix until the platform list and LUFS targets are written down |
| 2 | `sound_palette`, `diegetic_position` | Delivery targets fixed | Register and palette agreed on one page, approved by the director |
| 3 | `music_route`, `music_writing_method` | Register and palette agreed | If licensed, the rights position is confirmed before the track is cut into anything anyone will see |
| 4 | `tempo_authority` | Music route decided | Tempo and grid decided, or explicitly deferred. If original and tempo is set, the editor now knows the frame grid |
| 5 | `mix_hierarchy`, `ducking_approach` | VO final read received and timed | No mix approach is real against a scratch read |
| 6 | `hero_sound_placement`, `density_budget` | Spotting pass on the locked cut with director and editor, marking every cue in and out, every hero sound, every silence, every hit point. Produces the sync point register | Spotting pass |
| 7 | `hero_sound_specification` | Spotting pass | Hero sound designed and located. One or two, no more, each at a named frame |
| 8 | Ambience and foley plan | Hero sound located | Which spaces exist, which bodies exist |
| 9 | `sync_lock_policy` | Sync point register | Register signed off jointly by editor and sound, versioned to the cut |
| 10 | Premix | Steps 1 to 9 | Departments balanced internally |
| 11 | Final mix | Premix | Mixed against the primary delivery target |
| 12 | `cutdown_and_sonic_asset_strategy` | Final mix | Fold-downs and derivatives: mono check, phone check, alternate loudness masters, cutdowns |
| 13 | Stem delivery and archive | Fold-downs complete | D-M-E plus any splits the client will need for future versioning |
| n/a | `temp_track_approach` | Runs alongside the offline | Get an original sketch into the cut early, before the temp becomes load-bearing |
| n/a | `breathing_room_resolution` | VO final read and locked runtime | Director's call, made explicitly, because whichever way it goes one department is absorbing a cost |

**Upstream departments required before this department can start:**
| From | What is needed | Why it blocks |
|---|---|---|
| Editor | A locked cut, versioned, with a frame-accurate timeline and shot IDs. Any change after lock notified with a change list. | Every sync point is relative to a cut. An unversioned cut makes every locked sound provisional. |
| Editor | The sync point register, jointly maintained | Sound cannot police frames it cannot see change |
| Editor | Guaranteed air around key VO lines | Ducking cannot create time that is not in the picture |
| VO / Voice Direction | The final read, not a scratch, with its actual timing, plus alternate takes for at least the hero lines | Read pacing sets the piece's rhythm. Recasting invalidates the entire mix approach. |
| Director | The tonal register in concrete terms, and a decision on whether picture or music is authoritative | Adjective-only briefs produce infinite revision |
| Director | A named single moment the piece is about | Determines where the hero sound goes |
| VFX / Motion | A frame-numbered list of every screen event, UI state change, reveal, and transition that needs audio, delivered before lock | A screen event discovered at the mix is a re-open |
| Production Sound | Clean ISO tracks, room tone from every location, and honest sound reports | Missing room tone means ADR and audible edit holes |
| Producer | The music budget, the rights term and territory, and the platform list | Determines whether the music route is even legal |
| Client / Brand | The existing sonic assets in usable form (stems, not an MP3 of an old ad) | You cannot extend an audio logo you only have as a mixdown |

### Re-open triggers
| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| Pacing pivot (the cut's rhythm changes materially) | Tempo map, cue in and out points, every hit point, ducking automation, the density plan (a faster cut supports fewer simultaneous layers) | Palette, register, forbidden list, delivery targets |
| VO recast | Everything downstream of the read: mix hierarchy, ducking depth, air allocation, cue timings, whether lines still fit. Treat the entire mix approach as invalid. | Hero sound design (the sound itself survives), palette, music route |
| VO re-read, same voice, same script | Line-by-line timings, air allocation, ducking automation, any cue whose in point was tied to a line | Palette, hierarchy, hero sound build, music selection |
| Runtime change | Cue structure and music arrangement (a 30 cut to 20 is not a 30 with 10 seconds removed), sting placement, which sonic moves survive, loudness measurement (integrated LUFS changes with duration) | Palette, register, hero sound build |
| Shot added | Ambience for the new space, foley for any body in it, whether the added shot creates a new screen event, sync point register verification for every point after the insertion | Everything before the insertion point, if timecodes are re-issued rather than assumed |
| Shot removed or trimmed | Every sync point after the change, room tone continuity across the new join, whether a cue's hit point still exists at all | Palette, hero design, music route |
| New screen event needing audio (VFX or motion adds a UI state, reveal, or transition) | Whether it competes with the existing hero sound (two hero moments cancel each other), its frame position, its place in the density budget, its pitch relationship to the score | The overall palette, provided the new sound is drawn from it |
| Platform or delivery change | Loudness targets, dynamic range, limiting, fold-down checks, whether low-frequency content survives, whether the story still works muted, master count | The creative content of the mix, mostly. This change is usually technical, but if the new platform is phone-only it can also invalidate any sub-bass-dependent hero sound. |
| Music route change (original becomes licensed, or the reverse) | Tempo map, cue structure, all hit points, the arrangement's relationship to VO frequency space, rights position and its cost | Palette, hero sound, ambience plan |
| Licensed track fails clearance | The entire music plan. Do not attempt a "similar" track. Re-derive the music function from the register, then source. | Sound design layers, which are independent of music selection |
| Aspect ratio or vertical version added | Nothing in sound, technically. But confirm whether the vertical cut has a different runtime or shot order, in which case treat it as a runtime change plus shot changes. | Usually everything, if the audio timeline is identical |
| Director changes the tonal register | Palette, exclusion list, music brief, hero sound build, ambience character. This is the most expensive change and it should be resisted after lock. | Delivery targets, sync point locations (the events still happen where they happen) |

Standing rule for all triggers: when any change arrives, the first action is not to fix audio. It is to re-verify the sync point register against the new cut version and report which points survived, which moved, and which no longer have an event to attach to. Everything else follows from that list.

### Output template
```
# SOUND AND MUSIC PLAN
Project: [name] Version: [n] Date: [date]
Cut version this plan is written against: [cut version ID + runtime to the frame]
Author: [role] Approved by: [director]

## 1. DELIVERY TARGETS
| Deliverable | Duration | Aspect | Platform | Loudness target | True peak | Channels |
|---|---|---|---|---|---|---|
| Master A | 00:30 | 16:9 | Broadcast | -23 LUFS | -1 dBTP | Stereo |
| Master B | 00:30 | 16:9 | Social | -14 LUFS | -1 dBTP | Stereo |
| Cutdown 1 | 00:15 | 9:16 | Social | -14 LUFS | -1 dBTP | Stereo |
| Cutdown 2 | 00:06 | 9:16 | Social bumper | -14 LUFS | -1 dBTP | Stereo |
Sound-off requirement: [does the story survive muted? yes/no + what carries it]
Phone-speaker check required: [yes/no] Mono fold-down check required: [yes/no]

## 2. REGISTER AND INTENT
One sentence on what the audience should feel, and where.
The single moment this piece is about: [shot ID + timecode]

## 3. SOUND PALETTE
Permitted texture families: [list]
Tonal centre: [key / pitch anchor, if any]
Forbidden: [explicit exclusion list]

## 4. HERO SOUND(S)
| # | Sound | Shot ID | Timecode (master) | Relationship | Build description | Duration / tail |
|---|---|---|---|---|---|---|
| 1 | [name] | SH-14 | 00:00:21:14 | 1 frame before visual state change | [layers, sources] | 600ms tail under next cut |

## 5. AMBIENCE AND FOLEY
| Scene / shot range | Space | Ambience bed | Foley required | Notes |
|---|---|---|---|---|

## 6. SILENCE
| # | In frame | Out frame | What is removed | What it is buying |
|---|---|---|---|---|

## 7. MUSIC
Route: [original / licensed / library]
If licensed: track, publisher, master owner, term, territory, media, exclusivity, quoted fee, clearance status
If original: composer, brief summary, tempo, key, instrumentation, delivery date for sketch and final
Authoritative party: [MUSIC leads the edit] or [PICTURE leads the music] <- must be answered
Tempo map: [BPM, therefore beat = X frames at Y fps]
Temp track used in offline: [track] / Function it is standing in for: [description]

### Cue list
| Cue | In (TC) | Out (TC) | Function | Hit points (TC) | Notes |
|---|---|---|---|---|---|

### Brand sonic assets
Audio logo: [asset, source format, stems available yes/no]
Sting placement: [shot ID + timecode]

## 8. VO AND MIX HIERARCHY
VO status: [scratch / final] Recorded against: [cut version]
Default hierarchy: [e.g. VO > music > effects]
Deliberate inversions: | Timecode range | What leads instead | Why |
Ducking approach: [arrangement-led / automation-led / both] Target duck depth: [dB]
Air required: [seconds before and after each key line]

## 9. SYNC POINT REGISTER (jointly owned with Editor)
| # | Shot ID | Timecode | Event | Sound | Relationship | Owner | Verified against cut version |
|---|---|---|---|---|---|---|---|

## 10. DEPENDENCIES AND BLOCKERS
| Needed | From | By when | Status |
|---|---|---|---|

## 11. OPEN QUESTIONS FOR THE DIRECTOR
1.
2.
```


---

