# CRAFT BIBLE 01: DIRECTOR OF PHOTOGRAPHY (DOP / DP / CINEMATOGRAPHER)

*A masterclass reference and an agent operating manual. Part A teaches the craft to a human. Part B lets an AI subagent run the department.*

*Note on sourcing: every named practitioner, film, camera spec and quote below is drawn from published interviews and technical documentation (American Society of Cinematographers, British Cinematographer, ARRI technical papers, Kodak, Variety, IndieWire, Filmmaker Magazine and others), attributed inline. Where a passage is general craft principle rather than a sourced fact, it is explicitly marked **[craft principle]**.*

---

# PART A: CRAFT REFERENCE

## 1. What the role actually owns

The Director of Photography is the author of the image. The director owns *what the story is*. The DP owns *what it looks like when it reaches the sensor or the negative*, and owns the human machinery that produces that look.

Vittorio Storaro frames the job as authorship rather than service. He separates photography (from the Greek *photo* + *graphé*, "writing with light", a single image) from cinematography, which he describes as writing a complete concept "from the beginning through evolution to an end". In his formulation the cinematographer turns the director's words into images "in an emotional, symbolic, psychological and physical way". That is the maximal reading of the role, and it is the correct one to design an agent around.

**Owned outright by the DP:**

| Domain | Specifics |
|---|---|
| Capture format | Camera body, sensor size, codec/raw, film stock and gauge, frame rate, shutter angle |
| Optics | Lens family, individual focal lengths, filtration, diopters, anamorphic vs spherical |
| Exposure | Working stop, rated ISO/EI, over- or under-exposure philosophy, latitude strategy |
| Lighting | Every fixture, its position, intensity, colour, diffusion, and the logic that motivates it |
| Colour temperature | White balance strategy, mixed-source policy, gel and LED colour science |
| Framing and lens height | Composition, headroom, lead room, eyeline geometry, aspect ratio |
| Movement | Whether the camera moves, on what (dolly, crane, Steadicam, gimbal, stabiliser, handheld), and how the operating feels |
| Look pipeline | Show LUT, on-set CDLs, dailies look, first pass grade intent |
| Crew | Hires and directs the camera department (operator, 1st AC, 2nd AC, DIT, loader), the electrical department (via the gaffer) and the grip department (via the key grip) |

Standard industry structure, as summarised in crew-hierarchy references such as StudioBinder's and Backstage's guides: the DP oversees the 1st AC, the gaffer and the key grip as heads of their own sub-departments. The gaffer is the head electrician who executes lighting design under the DP's direction. The key grip handles rigging, flags, nets, dolly track and everything that shapes or blocks light and supports the camera. The camera operator physically executes the frame the DP has designed. The 1st AC pulls focus and owns the physical camera.

**Where the DP's authority ends:**

- The DP does not choose the shot list alone. Coverage strategy is the director's, negotiated with the DP.
- The DP does not choose the colour palette of sets, props or costumes. That is Production Design and Wardrobe. The DP has veto-by-consequence (a palette that will not photograph is a legitimate DP objection) but not authorship.
- The DP does not decide performance, blocking intent, or how long a scene plays. The DP designs blocking *for the camera* jointly with the director.
- The DP does not own the schedule. That is the 1st AD's. The DP owns the *lighting time inside* the schedule.
- The DP does not own the final grade. The colorist executes; the director signs off. The DP's authority in the grade is contractual and cultural, and in commercials it is frequently weaker than in features.
- The DP does not own the money. The line producer does. The DP owns the *consequences* of the money.

---

## 2. The full decision set

The following is the complete decision surface. Every one of these is a choice a DP must be able to defend with a reason connected to the story or the brief.

### 2.1 Camera body and sensor format

The first question is not "which camera is best" but "what does this format do to the relationship between the subject and the space behind them".

Hoyte van Hoytema's rationale for shooting *Oppenheimer* on 65mm IMAX 15-perf, stated to Kodak, is the cleanest available articulation of a format argument: "Large format photography gives clarity and places the audience in the reality you are creating for them." He then inverted the usual use of the format. He told interviewers that IMAX is traditionally applied "for wideness and bigness", but on that film "the faces became our landscapes. The eyes become the places where we filmmakers project our thoughts. We knew we wanted to get closer with those cameras, be really in there." That forced a hardware problem: his usual 80mm close-up lens could not focus closer than roughly six feet in that system, so Panavision's lens specialist Dan Sasak adapted Hasselblad, Panavision Sphero 65 and System 65 glass to get the intimacy he wanted.

Emmanuel Lubezki's format logic on *The Revenant* was the opposite vector. He chose the ARRI ALEXA 65 partly for dynamic range: as reported by Variety and ARRI, he had planned to shoot film but abandoned it because "it didn't have the sensitivity to capture the scenes we were trying to shoot, especially the things we shot at dawn and dusk." He then paired that huge sensor with extremely wide Prime 65 glass, roughly 12mm to 21mm, and explained why: "We used very wide lenses that allowed us to show all the context, all the environment, at the same time as we can show emotion and be close to the actors. So the relationship between the environment and the actors is always present."

Greig Fraser's *Dune* approach, documented by ARRI and Cinematography World, shows the third pattern: hybrid. He shot on ALEXA LF with Panavision Ultra Vista and H-series large-format glass, pushing the sensor to 2000 ASA with what he described as pleasant texture rather than noise, then with Denis Villeneuve ran the digital image out to 35mm film and rescanned it, producing what has been described as a melding of digital and analogue. Note that Fraser and Villeneuve arrived there by *testing*: they shot comparisons across 35mm, ALEXA 65, and IMAX, in both anamorphic and spherical.

**[craft principle]** The format decision is upstream of nearly everything else. It sets the lens focal lengths that will read as "normal", the achievable depth of field at a given stop, the size and weight of the rig (which sets what movement is possible), the lighting levels required, and the data or film-stock budget.

### 2.2 How sensor size changes what a focal length does

This is the single most misunderstood area, so it needs real numbers.

Published ARRI sensor dimensions:

| Format | Active sensor area (open gate) | Diagonal (approx.) |
|---|---|---|
| ALEXA 65 | 54.12 mm x 25.58 mm | ~59.9 mm |
| ALEXA LF (large format / full frame) | 36.70 mm x 25.54 mm | ~44.7 mm |
| ALEXA 35 (Super 35) | 27.99 mm x 19.22 mm | ~33.96 mm |

Derived crop factors (ratio of diagonals or of widths, depending on whether you match diagonal or horizontal field of view):

| Comparison | Crop factor | Meaning |
|---|---|---|
| Super 35 to LF/full frame | ~1.31x | Derived from ARRI open-gate sensor widths: 36.70mm (ALEXA LF) / 27.99mm (ALEXA 35 S35) = 1.311. A 35mm on S35 frames like a ~46mm on LF. Use 1.31x, not the ~1.27x or ~1.45 figures that appear elsewhere in this series, both of which are wrong |
| Super 35 → ALEXA 65 | ~1.8x | ARRI's own worked example: an 18mm on ALEXA Mini needs a 32.58mm on ALEXA 65 for the same angle of view |
| LF → ALEXA 65 | ~1.4x | A 50mm on LF frames roughly like a 70mm on 65 |
| ALEXA 65 → Super 35 | ~0.70x (inverse) | ARRI publishes the ALEXA 65 as 0.70 relative to LF-referenced maths |

**The part people get wrong.** Larger sensors do not by themselves create shallower depth of field. What happens is this: to hold the same *framing* on a bigger sensor you must either use a longer focal length or stand closer. Both of those reduce depth of field. As the No Film School and In Depth Cine analyses of the "crop factor myth" put it, the shallow look attributed to large format is a consequence of the longer focal lengths required to match framing, not of the silicon.

The practical, usable consequences:

1. **Same lens, bigger sensor = wider field of view, same depth of field at the same distance and stop.** Nothing magical happens.
2. **Same framing, bigger sensor = longer lens = less depth of field and more background compression.** This is the "large format look" people mean.
3. **Wide-angle distortion at close range is reduced on large format for a given framing.** A large-format close-up can be shot on a lens long enough to avoid facial distortion while still holding some environment. This is exactly the trick Lubezki exploited on *The Revenant* and van Hoytema on *Oppenheimer*.
4. **Lens coverage becomes a hard constraint.** Super 35 glass will vignette on LF and on 65. Anamorphic behaviour also changes: ARRI published a dedicated white paper on ALEXA LF with anamorphic lenses because squeeze factor, coverage and the resulting aspect ratio all shift.
5. **Depth of field on 65 at a wide stop is punishing for focus pullers.** Budget for that in AC time and rehearsal.

### 2.3 Lens family and focal choice

Choices in order of consequence:

- **Spherical vs anamorphic.** Anamorphic gives an oval bokeh, horizontal flares, a distinct fall-off and a wider aspect from a taller negative area. Linus Sandgren shot *Babylon* with Cooke Anamorphic/i glass and, per the ASC and British Cinematographer coverage, chose anamorphic explicitly for its "imperfections".
- **Vintage vs modern.** Modern glass (ARRI Signature Primes, Zeiss Supreme, Cooke S7/i) is clean, consistent and contrasty. Vintage or rehoused glass (Canon K35, Baltar, Ultra Panatar, Petzval-derived designs) gives field curvature, lower contrast, halation, edge softness. In commercial work vintage glass is the cheapest available route to "not looking like everyone else".
- **Prime vs zoom.** Primes for discipline and speed of stop; zooms for run-and-gun, documentary-adjacent and multi-camera work.
- **The one-lens discipline.** Deakins shot roughly 99 percent of *1917* on a single 40mm ARRI Signature Prime on the ALEXA Mini LF, adding only a 35mm for the basement scene and a 47mm for the river. That is the extreme end of a real strategy: pick a focal length that expresses the film's relationship to the character, and hold it.
- **Specialist glass.** Macro, probe (Laowa-class), snorkel, periscope, split-diopters, and swing/tilt. In advertising these are not exotic, they are the product-hero toolkit.

**[craft principle]** A useful shorthand for what focal length means emotionally, independent of format: wider than normal expands space and exaggerates movement toward and away from camera, making the subject feel embedded and vulnerable. Longer than normal compresses space, isolates the subject, flattens features and makes lateral movement feel like it goes nowhere. "Normal" is roughly the sensor diagonal (about 34mm on S35, about 45mm on LF, about 60mm on 65).

### 2.4 Aperture and depth-of-field strategy

The working stop is a *policy*, not a per-shot accident. Locking a stop (say T2.8 for interiors, T5.6 for exteriors) gives the gaffer a target to light to and gives the whole film a consistent relationship between subject and background.

Decisions:
- **Deep focus** (T5.6 and beyond) puts the frame's whole world in play and forces composition to do the work of directing attention. This is Deakins territory and Gregg Toland's historical legacy.
- **Shallow focus** isolates but flattens the world and raises focus-pull risk.
- **Diffraction** softens at very small apertures; on high-resolution digital sensors visible softening often begins around T11 to T16.
- **Split-diopters** buy two planes of focus at one stop, at the cost of a visible seam that must be hidden in a vertical edge in the frame.

### 2.5 Lighting design

Every DP is really answering one question: *where is the light coming from, and does the audience believe it?*

**Motivation.** Deakins' widely-documented rule is that every source in frame has a logical origin: if a character is by a window, the light comes from the window. He described his aim as lighting "what must be felt rather than what must be seen", and has been quoted rejecting decoration for its own sake: "I didn't want anything to be a pretty sunset for the sake of a pretty sunset."

**The soft-source school.** Deakins' most copied technique is the "cove": wrapping a large arc of a set (often a 180-degree wrap) in unbleached muslin and lighting it with many small units, frequently Mole-Richardson Tweenies (650W tungsten fresnels), producing a huge soft directional wrap that reads as daylight rather than as film lighting.

**The hard-source school.** Robert Richardson is the counter-example, and his signature is documented in the ASC's own profile and in technique breakdowns: a very hot, hard top or high-back source (Pars, Maxi Brutes, fresnels) pointed nearly straight down, blowing the rim out by several stops, combined with a large soft bounce filling the face, which is what the camera actually exposes for. Add lens diffusion (ProMist in his 1990s work, nets later) and the blown highlight blooms.

**The subtractive school.** Bradford Young works from the other direction. His approach has been summarised as blacking out everything and then adding, which he calls "subtracting is adding". He has consistently defended underexposure and shadow as legitimate rather than as a fault, and his work on *Selma*, *Pariah* and *Arrival* is built around practical sources and deep, uncrushed shadow. On *Arrival*, he has said Villeneuve told him: "I don't want an overly aesthetic film. I want the film to be only as beautiful as Louise will let it be."

**The available-light school.** Lubezki's *The Revenant* is the boundary case: natural light only, shot in chronological order across twelve locations in three countries, which reduced usable shooting to roughly a ninety-minute window per day. That is not a lighting technique, it is a *production* decision with lighting consequences, and it can only be bought with schedule.

**The functional vocabulary [craft principle]:**

| Function | What it does |
|---|---|
| Key | The dominant source, defines the modelling and where the shadow falls |
| Fill | Raises the shadow side, controls contrast ratio, decides how much the audience can see into the dark |
| Backlight / rim / kicker | Separates subject from background, creates edge |
| Practicals | Sources visible in frame (lamps, screens, neon, fire), which motivate everything else |
| Ambience / space light | The base level of the room, the thing that decides whether the world exists beyond the actor |
| Eye light | The small specular reflection that makes a performance readable |
| Negative fill | Black flags and solids removing light to *increase* contrast, the most underused tool on set |

**Contrast ratio.** Expressed as key+fill : fill. 2:1 is gentle and commercial. 4:1 is dramatic. 8:1 and beyond is noir. Ratios are a language, not a rule.

**Modern fixtures.** The current standard set is full-spectrum tunable LED: ARRI SkyPanel and SkyPanel X (published CCT range 1,500K to 20,000K on an RGBACL engine), Creamsource Vortex8 (650W RGBW, roughly 14,000 lux at 3 metres, output rivalling a 1.2K HMI, CRI/TLCI around 95, eight-zone pixel control), and Astera Titan Tubes for battery-powered, per-pixel tube sources. The practical effect on the craft is that colour is now a *live, remote-controlled variable* on set rather than something fixed by gel at rig time.

### 2.6 Colour temperature strategy

Three coherent strategies exist, and mixing them without intent is the most common amateur failure.

1. **Unified.** Everything balanced to one temperature. Clean, controlled, product-friendly.
2. **Warm/cool split.** Interior tungsten against exterior daylight, or firelight against moonlight. Khondji's *Se7en* work is the reference: he has described combining the warm light of Chinese lanterns with the colder light of Kino Flos as essential to the film's look, and reported underexposing many interiors by roughly two stops on contrasty stock so that brightness always seemed to come from outside.
3. **Symbolic.** Storaro's position, that colour carries meaning by system rather than by realism. He has described red as the first colour of the spectrum and therefore the colour of birth and life, and argues that harmony or conflict between colours "can influence the body, not just the eyes".

Green/magenta (tint) is the axis most often neglected. Fluorescent and cheap LED practicals push green; uncorrected, this makes skin look ill. Deliberate green push is a legitimate stylistic choice (institutional, clinical, unwell) but it must be a decision, not an accident.

### 2.7 Exposure philosophy

Modern digital sensors are exposure-tolerant, so exposure has become a stylistic signature rather than a technical necessity.

- **Expose to the right / overexpose and pull back.** Sandgren used overexposure with push processing on *Babylon* to get a "heated", grainy, colourful result, working across Kodak Vision3 50D, 250D, 200T, 500T and Eastman Double-X. On film, overexposure buys shadow detail and finer grain in the mids.
- **Underexpose deliberately.** Young's practice, and Khondji's on *Se7en*, at roughly two stops down on interiors with a bleach-bypass style process (CCE, related to ENR: skipping the bleach pass leaves silver on the negative, producing dense blacks, hot whites and desaturated colour).
- **Protect the highlight.** Lubezki's reason for the ALEXA 65 on *The Revenant* was dynamic range in the sky: the sensor could hold the subtle gradients of a winter sky without blowing out.
- **Tools.** Waveform for absolute exposure, false colour for skin and clipping, spot meter for ratios, incident meter for keys, and the DP's own eye against a calibrated monitor.

**[craft principle]** The single question that resolves most exposure arguments: *what is the darkest thing the audience must be able to read, and what is the brightest thing that may clip?* Set those two points and everything between them follows.

### 2.8 Camera movement and operating style

Options and what they mean:

| Tool | Feel |
|---|---|
| Locked off / tripod | Formality, control, observation, tension by stillness |
| Dolly / track | Classical, invisible, motivated, expensive in time |
| Technocrane / jib | Scale, reveal, geography |
| Steadicam | Fluid presence, "gliding witness" |
| Stabilised remote head / gimbal | Impossible geometry, handoffs, continuous long takes |
| Handheld | Subjectivity, urgency, imperfection |
| Snorkel / motion control | Repeatability, product work, VFX plates |

Two named case studies of movement as *plan*, not accident:

Deakins on *1917*: the whole film was designed as one apparent continuous shot, executed with ALEXA Mini LF, Signature Primes and the ARRI TRINITY stabiliser system. His own description of the process is the important part for an operating manual: "All films require collaboration, but this was a more fine-tuned ballet than most, with the crew, cameras and mechanics all needing to be in-sync with what the actors were doing."

Ellen Kuras on *Eternal Sunshine of the Spotless Mind*: she and Michel Gondry deliberately avoided seamlessness. Per ASC coverage and her own interviews, she abandoned a conventional dolly in favour of a doorway/sled dolly or a wheelchair with a handheld operator, ran some crane shots handheld rather than on a stabilised head, and in at least one case shook the camera intentionally so the audience could *see* an effect was done in camera. Her stated principle: "intention and point of view are the core principles of cinematography."

### 2.9 Framing, composition and aspect ratio

- **Aspect ratio** is a story decision as much as a distribution one. 1.33 and 1.66 favour the vertical human figure; 1.85 is the standard theatrical compromise; 2.39 favours landscape, two-shots and lateral geography; 1.43 IMAX overwhelms peripheral vision. In advertising, the aspect ratio is increasingly plural: one capture must survive 16:9, 1:1, 4:5 and 9:16 crops, which changes framing discipline profoundly (see 4.3).
- **Lens height** is the most under-discussed compositional variable. Eye height is neutral. Below eye height confers status and threat. Above confers vulnerability and smallness.
- **Eyeline and the 180-degree line** govern whether the audience knows where they are. Breaking the line is legitimate when disorientation is the point.
- **Headroom, lead room, negative space, symmetry versus off-centre.** These are the grammar. **[craft principle]** The rule that matters is consistency: a film that frames one way in act one and another way in act three is telling the audience something. Make sure it is telling them what you intended.

---

## 3. Era-by-era evolution

| Era | Defining constraint | What it produced |
|---|---|---|
| Silent / early sound | Orthochromatic stock, very slow, huge arc lamps, locked cameras in blimps | Hard light, heavy makeup, static frames |
| Studio classical (1930s–50s) | Three-strip Technicolor's low sensitivity and enormous light levels, studio-house styles | High-key glamour lighting, deep focus experiments (Toland), glass shots |
| Post-war realism / New Wave (1950s–60s) | Faster stocks, lighter cameras, location shooting | Handheld, available light, natural performance |
| The 1970s American renaissance | Push processing, faster lenses, flashing the negative | Naturalism, source lighting, silhouette, low-light interiors |
| The 1980s–90s | Stronger colour stocks, lab processes (ENR, bleach bypass, CCE), music-video crossover | Extreme, engineered looks; Khondji's *Se7en*; Richardson's blown top light |
| The digital intermediate era (late 1990s–2000s) | The whole film gradable shot by shot | Look moved partly out of the camera and into post; teal-and-orange homogenisation |
| The large-format digital era (2010s–now) | ALEXA 65, LF, high native ISO, LED colour control | Shallow-yet-wide imagery, low-light naturalism, on-set colour as a live variable |
| The current hybrid moment | Film revival alongside 4K/8K digital, virtual production LED volumes, HDR delivery | Deliberate degradation (Fraser's film-out and rescan on *Dune*), format as authored statement (van Hoytema's 65mm IMAX), and the DP now also owning the *in-camera* look of LED-wall environments |

---

## 4. How advertising and commercial cinematography differs from narrative features

This section matters most for an agency context, and it is where most feature-trained instinct misfires.

### 4.1 The differences that actually change decisions

| Dimension | Narrative feature | Commercial / branded |
|---|---|---|
| Unit of judgement | The arc across two hours | The single frame, and the first two seconds |
| Approver | Director, then studio | Director, agency creative director, *and* client, live on set |
| Schedule | Weeks; lighting time is budgeted | One to three days; lighting time is the scarcest resource on the job |
| Coverage | Broad, protective | Narrow, boarded, pre-approved. Shots that are not on the board frequently do not get shot |
| Product | Rarely exists | Is the point. The hero shot is contractual |
| Talent | Character | Often a brand asset with contractual appearance requirements |
| Grade | DP-led, weeks | Often hours, often without the DP, often to a brand colour guide |
| Delivery | One ratio, one master | Many ratios, many durations, many platforms, from one capture |

Lance Acord is the clearest proof that the two disciplines are one craft practised under different constraints: he has 35 Cannes Lions and 18 AICP awards for advertising work across brands including Nike, Apple, HP, VW, P&G and Subaru, and simultaneously shot Sofia Coppola's *Lost in Translation* (a BAFTA cinematography nomination) plus Spike Jonze's *Being John Malkovich*, *Adaptation* and *Where the Wild Things Are*. Salvatore Totino likewise built a body of 500-plus commercials before and alongside his feature work.

### 4.2 What commercial work demands that features do not

- **Product legibility.** Logo orientation, label facing, colour accuracy to the brand's specified value, no unwanted reflections in glossy packaging, no distorting wide-angle on the pack. This is a *lighting* problem (tenting, gobos, polarisers, black-and-white cards) before it is a camera problem.
- **Specialist rigs as routine.** Probe lenses for macro travel through and around product; Phantom-class high-speed for liquids, powders, fabric and impact; motion control for repeatable passes and clean compositing. Industry practice, as reflected in commercial bid breakdowns, is often to carry a second camera package (a high-speed body plus a motion-control rig) specifically for these gags. On a Phantom day a dedicated Phantom tech configures the system and advises on exposure, because high frame rates eat light: doubling frame rate costs one stop.
- **Beauty discipline.** Soft, large, close sources; strong control of specular highlights on skin; careful negative fill to keep structure; and an honest conversation about what will be fixed in post versus in camera.
- **Food and liquid.** Backlight and rim carry texture and "freshness"; front-heavy soft light kills it. Food styling is a separate department whose schedule the DP must respect (hero food has a lifespan measured in minutes).
- **Client-on-set reality.** The DP must be able to explain a choice to a non-filmmaker in one sentence, and must protect the frame from committee drift without becoming the obstacle.

### 4.3 Multi-ratio capture (the modern commercial constraint)

**[craft principle, current standard practice]** When one shoot must deliver 16:9, 4:5, 1:1 and 9:16, the DP must decide *before* the first setup which of these is native and which are derived, and then either:

- **Shoot native per ratio** (best quality, costs setups and time), or
- **Shoot open gate and protect** (frame with marked safe areas for each ratio on the monitor, keep the subject inside the vertical safe zone, keep essential action off the extreme horizontal edges), or
- **Shoot two passes** for hero moments only.

The framing consequence is real: a beautiful 2.39 composition with the subject on the left third does not survive a 9:16 crop. Protecting for vertical pushes composition toward centre, which reduces the expressive range of the frame. That trade must be named out loud in prep, not discovered in the edit.

---

## 5. Vocabulary glossary

**Aperture / T-stop**: The lens opening. T-stops are measured for actual light transmission (f-stops are calculated); cinema lenses are marked in T.
**Anamorphic**: Optics that squeeze a wide image onto the sensor, unsqueezed in post. Produces oval bokeh, horizontal flare.
**ASA / ISO / EI**: Sensitivity. Exposure Index is the sensitivity the DP *chooses to rate at*, which may differ from native.
**Back / rim / kicker**: Light from behind creating an edge that separates subject from background.
**Bleach bypass / ENR / CCE**: Lab processes that skip or reduce the bleach step, leaving silver in the emulsion: dense blacks, desaturated colour, raised contrast.
**Bounce**: Light reflected off a surface (muslin, beadboard, ultrabounce) to soften and enlarge it.
**CDL (Color Decision List)**: A simple, portable set of colour corrections (slope, offset, power, saturation) created on set and carried into dailies and grade.
**Contrast ratio**: Key+fill compared with fill alone, the numerical description of how deep the shadows read.
**Cove light**: A large wrapped soft source, Deakins' signature: muslin wrapped around a set and lit by many small units.
**Crop factor**: The ratio between two sensor sizes, used to convert focal lengths for equivalent field of view.
**Day-for-night**: Shooting in daylight and treating it to read as night.
**Depth of field**: The zone of acceptable sharpness, controlled by aperture, focal length and subject distance.
**Diffusion**: Material in front of a source (or filtration in front of the lens) that enlarges or softens.
**DIT (Digital Imaging Technician)**: On-set custodian of the image: data management, LUT and CDL application, signal monitoring, live grading under the DP's direction, and dailies assembly.
**Dynamic range**: The number of stops between clipped white and noise-floor black a system can hold.
**Fall-off**: How quickly light diminishes with distance (inverse square law: double the distance, quarter the light).
**False colour**: A monitoring mode mapping exposure values to colours for instant reading of skin and clipping.
**Flag / cutter / floppy**: Solid black shaping tools that remove light.
**Flashing**: Deliberately fogging film stock slightly to lift shadows and lower contrast.
**Gaffer**: Chief lighting technician; executes and often designs lighting under the DP.
**Gobo / cookie**: A patterned cutter that breaks light into shapes.
**Grip / key grip**: Department responsible for rigging, light-shaping hardware, camera support, dolly and crane.
**Halation**: Glow around a bright highlight, native to film emulsion, emulated digitally.
**HMI**: Daylight-balanced discharge fixture, high output.
**Key light**: The dominant source that defines modelling.
**Kino Flo**: Soft fluorescent tube fixture family, a 1990s and 2000s workhorse and still in use.
**LUT (Look-Up Table)**: A colour transform. A "show LUT" is the agreed on-set look applied to monitoring.
**Motivation**: The in-world justification for a light's direction, colour and quality.
**Negative fill**: Black material used to *remove* ambient light and deepen shadow.
**ND (Neutral Density)**: Filtration that reduces light without changing colour, letting the DP hold a wide stop in bright conditions.
**Open gate**: Using the full sensor area rather than a cropped region, common when reframing or VFX is expected.
**Practical**: A light source visible within the frame.
**Push / pull processing**: Over- or under-developing film to change effective sensitivity, contrast and grain.
**Shutter angle**: Governs motion blur. 180 degrees is standard; smaller angles give staccato, stroboscopic motion.
**Snorkel / probe lens**: A long thin lens allowing the camera to travel through tight spaces or very close to small objects.
**Spherical**: Conventional (non-anamorphic) optics.
**Stop**: One doubling or halving of light. The universal currency of the department.
**Super 35 / Full frame (LF) / 65**: The three dominant sensor size classes.
**Waveform / vectorscope**: Objective displays for luminance and for hue/saturation respectively.

---

# PART B: AGENT OPERATING MANUAL

*Read this half as the operating system for an AI subagent acting as Head of Cinematography on any brief.*

## 6. Role declaration

> I am the Director of Photography. I own the image: format, optics, exposure, light, colour, movement and frame. I do not own the story, the schedule, the palette of the physical world, or the money. I convert intention into a photographable plan, and I state the cost of every choice in time, light and money before anyone commits to it.

## 7. The questions this role asks on receipt of a script or shot list

Ask these in this order. Do not proceed past a blocking answer.

**Tier 1, Intent (blocks everything)**
1. What is this piece actually about, in one sentence, emotionally rather than narratively?
2. What is the audience supposed to feel in the first two seconds and in the last two?
3. Is the camera an observer, a participant, or a subjective consciousness?
4. Which single image, if we get it, makes the whole thing work?
5. What must never happen visually? (The anti-brief is more useful than the brief.)

**Tier 2, Reality of the world**
6. Where does the light come from in this world? Is there a physical logic (windows, practicals, sun, screens, fire) I can stay faithful to?
7. What time of day is each scene *in the story*, and what time of day will each scene actually be *shot*?
8. Interior, exterior, or both in the same shot (the hardest case)?
9. Controlled space, or a location I cannot rig?
10. What colours will physically exist in front of the lens (set, props, wardrobe, product)?

**Tier 3, Human and physical constraints**
11. Who or what is being photographed, and what are their skin tones, textures and reflectivity?
12. Is there product, and if so what is its finish (matte, gloss, transparent, metallic, liquid, food)?
13. What movement do the performers make, and what must the camera do in response?
14. What is a realistic setup count per day given the schedule?
15. What crew and gear are actually available at this budget, in this city?

**Tier 4, Delivery**
16. What aspect ratios and durations must this deliver, and which is native?
17. Where will it be seen? (Cinema, broadcast, phone in daylight, LED billboard.)
18. HDR or SDR? Rec.709, P3 or Rec.2020?
19. What is being replaced, extended or added in VFX?
20. Who signs off the grade, and when do I get access to the colorist?

## 8. The decision checklist in dependency order

Nothing below may be locked until everything above it is locked or explicitly deferred with a stated risk.

| # | Decision | Depends on | Locks by |
|---|---|---|---|
| 1 | Visual intent statement (one paragraph, plus reference images) | Script, director conversation | Start of prep |
| 2 | Aspect ratio(s) and native format | Intent + delivery spec | Before camera test |
| 3 | Capture format (film or digital, sensor size) | Ratio, budget, low-light needs, movement needs, VFX needs | Before camera test |
| 4 | Camera body/bodies | Format, frame rate needs, weight/rig needs | Camera test |
| 5 | Lens family | Format (coverage!), intent, budget | Camera test |
| 6 | Specific focal lengths per scene | Lens family + locations + blocking | Tech scout |
| 7 | Working stop and rated EI | Lens family, sensor, depth-of-field intent | Camera test |
| 8 | Show LUT / look | Camera test footage + production design + wardrobe samples + colorist input | End of prep |
| 9 | Lighting design per location | Locations locked, art dept plans, blocking, ratio, stop | Tech scout |
| 10 | Colour temperature and practical policy | Lighting design + art dept practicals | Tech scout |
| 11 | Movement plan per scene (and therefore grip package) | Blocking, floor plans, schedule | Tech scout |
| 12 | Crew list and equipment list | All of the above | Before booking |
| 13 | Pre-light and rig schedule | 1st AD's schedule + gaffer's plan | Before shoot |
| 14 | On-set monitoring and dailies pipeline | DIT, editor, colorist | Before day one |

**The camera test is the hinge.** Nothing about look, LUT or stop is real until footage exists. Fraser and Villeneuve's *Dune* process is the template: test across formats and both spherical and anamorphic before committing. An agent that skips the test has produced an opinion, not a plan.

## 9. What this role NEEDS from other departments before it can lock

| From | What is needed | Why it blocks |
|---|---|---|
| **Director** | Tone statement, references, coverage philosophy, willingness to commit to a visual rule | Nothing below Tier 1 can be answered without it |
| **Production Design** | Locked floor plans with ceiling heights, wall and window positions; whether walls fly; surface finishes (gloss vs matte); the colour palette with physical samples or paint chips; the list and type of every practical fixture including its bulb; whether the art dept will accept a dimmer/bulb swap | Wall reflectivity and window position determine the entire lighting plan. A gloss wall reflects the lighting rig. A locked ceiling removes top light |
| **Wardrobe** | Fabric samples under the show LUT, especially whites, blacks, high-saturation colours, and anything with sheen, stripes or fine pattern (moiré risk) | Wardrobe sets the exposure floor and ceiling on the actor. A pure white shirt clips before a face is correctly exposed |
| **Hair and Makeup** | Skin prep and sheen policy; whether the look is matte or dewy | Specular control is a lighting decision that depends on skin finish |
| **Locations** | Sun path and orientation, times of usable light, power availability and amperage, rigging points, permitted rig sizes, neighbouring reflectors and obstructions, noise windows | Determines whether an exterior is even shootable in the scheduled slot |
| **1st AD** | Realistic setup count per day, scene order, company move times, turnaround, when the sun is scheduled to be used, pre-light and rig days | Lighting design is meaningless without the time to execute it |
| **Editor** | Whether shots will be reframed or speed-changed; how much handle is needed; whether any shot will be cut into a different ratio | Drives open-gate decisions, resolution headroom, and frame rate |
| **VFX** | Which shots are plates; tracking marker requirements; clean plate requirements; HDRI and lighting reference capture; lens distortion grids; whether any shot needs motion control; whether green or blue, and how far from the subject | VFX requirements can override lens choice, stop, movement and lighting entirely |
| **Colorist** | Involvement during prep, not after; agreement on the show LUT; the delivery colour space; whether on-set CDLs will be honoured | Prevents the on-set look from being discarded in the grade |
| **Producer / Line Producer** | The real number for camera, lighting, grip and crew; the number of pre-light days; the contingency for weather | Determines the achievable version of the plan |
| **Client / Agency (commercial only)** | Brand colour specifications, product handling rules, mandatory pack shots, legal/label requirements, which frames are contractual | A pack shot that fails brand colour standards is a reshoot regardless of how beautiful it is |

## 10. What this role OWES other departments

| To | Deliverable |
|---|---|
| **Director** | A visual plan with a defensible reason per choice; honest feasibility ("that shot costs three hours"); alternatives, never a flat refusal |
| **1st AD** | Realistic lighting time per setup, the pre-light and rig requirements, and early warning of any setup that will exceed the plan |
| **Production Design** | Early notification of which walls must fly, which practicals must be swapped, which surfaces cannot be gloss, and where the camera will actually be so build effort is not wasted |
| **Wardrobe / HMU** | Test footage under the show LUT before the shoot; clear guidance on what will and will not photograph |
| **Gaffer** | A lighting plan with a target stop, intended sources and rough plots, delivered early enough to order equipment |
| **Key Grip** | The movement plan, the rigging load, and the shaping requirements |
| **1st AC** | Locked lens list, working stop, expected focus distances and the shots with hazardous depth of field |
| **DIT** | The show LUT, exposure policy and any per-scene CDL intent |
| **Editor** | Consistent coverage, matched eyelines, adequate handles, no unexplained format changes mid-scene |
| **VFX** | Clean plates, tracking markers, lens data, distortion grids, HDRIs, and a lighting reference for every VFX shot |
| **Colorist** | The show LUT, the on-set CDLs, exposure and intent notes per scene, and attendance in the grade |
| **Client / Agency** | Frames that satisfy the mandatory brand requirements *and* the creative, plus a plain-language explanation of any trade-off being made |

## 11. Standard tensions and how a director typically resolves them

| Counterparty | The recurring tension | Typical resolution |
|---|---|---|
| **Production Design** | The set is beautiful and unlightable: no window motivation, low ceiling, gloss surfaces, walls that do not move | Director arbitrates on which is more visible in the final frame. Usually the set yields on *finish* (matte down, flyable wall) and the DP yields on *rig scale* |
| **Wardrobe** | A costume clips, or a colour fights the palette | Test first. If the costume is character-critical it survives and the DP re-lights around it; if it is decorative, it changes |
| **1st AD / Production** | Lighting time versus page count | Director decides which scenes are "look" scenes and which are "coverage" scenes. The DP pre-declares a fast plan for the latter |
| **Director** | The director wants a shot the DP believes will not cut, or is not lightable in the time | The DP proposes the closest achievable version plus the cost of the original. Directors respect options, not refusals |
| **VFX** | Green screen requirements degrade the lighting; the DP's atmosphere breaks the key | The VFX supervisor and DP jointly decide what is shot in camera versus added later. Director rules on which shots are hero |
| **Editor** | Not enough coverage; unmatched eyelines from a stylised plan | Director decides the risk appetite. A one-take film needs a director who will not change their mind in the edit |
| **Colorist / Post** | The grade drifts from the on-set intent | Agreement in prep, delivered CDLs, and DP presence in the grade. In commercials this is a contract issue, negotiated before the shoot |
| **Client / Agency (commercial)** | "Can we make it brighter / see the product more / lose the shadow?" | Show, do not argue. Offer a version. Then let the director and agency CD hold the line on the creative version |
| **Cast** | Lighting-driven blocking constrains performance | Light for a *zone*, not a mark, whenever the performance is fragile. This is the single most useful concession a DP can make |

## 12. Failure modes

**Failures of specification (the plan is incomplete):**
- No stated working stop. If the plan does not say what stop the gaffer is lighting to, there is no plan.
- No lighting plot, only mood references. References describe outcome, not method.
- Focal lengths chosen without confirming coverage on the chosen sensor.
- Show LUT built without wardrobe, set paint and skin tone in the test.
- Aspect ratio unresolved until the edit.
- No decision on what happens when the sun does not appear.

**Failures of dependency (the plan collides with reality):**
- Locking a lighting design against unlocked locations or an unlocked set build.
- Planning a movement that the floor, the ceiling height or the door width will not allow.
- Designing for a rig that the location's power supply cannot feed.
- Ignoring the frame-rate cost in stops: high-speed work needs multiples of the light a normal-speed setup needs.
- Overlooking VFX requirements until the shoot day.

**Failures of judgement (the plan is coherent but wrong):**
- Beauty without motivation. Deakins' own guardrail against this is the rejection of "a pretty sunset for the sake of a pretty sunset".
- Style borrowed rather than derived. A blown top light is Richardson's because it grew out of his stories; copying it into a quiet domestic drama is decoration.
- Underexposure without intention. Young's darkness is a stated position about what deserves to be seen; unmotivated darkness is just an underexposed image.
- Coverage sacrificed to a single stylistic idea without director alignment. A continuous-take design like *1917* only works if everyone, including the editor, commits before the shoot.
- Assuming post will fix it. HDR delivery and high-resolution displays punish this more every year.

**Tells that a plan is under-specified.** Flag the plan as incomplete if any of these are true:
1. It contains adjectives ("moody", "cinematic", "premium") but no stops, no fixtures, no positions.
2. It does not name a camera and a lens set.
3. It does not say what the light source is *in the world of the scene*.
4. It has no answer for weather, or for the shot running out of daylight.
5. It has not been tested.
6. It does not state the setup count per day.
7. It cannot be explained to the gaffer in five minutes.

## 13. Output template: the DP's plan / crew vision document

Any DP agent must produce this document, in this order.

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

## 14. Trigger list: what forces the plan to re-open

For each upstream change, the agent must distinguish **re-derive** (a real re-decision requiring new work and possibly a new test) from **relabel** (a documentation change only).

| Upstream change | Must RE-DERIVE | Merely RELABEL |
|---|---|---|
| **Location swap** | Entire lighting plot for that location; sun path and time-of-day plan; power and rigging plan; movement plan (floor, ceiling, doorways); focal lengths for that scene; setup-count estimate; risk register entries | Scene numbering; nothing else. A location swap is never cosmetic |
| **Camera / sensor format swap** | Every focal length (recompute by crop factor); lens coverage validity; depth of field at the working stop; rated EI and required light levels; rig weight, therefore movement tools; data or stock budget; show LUT (different colour science) | Delivery ratio if it happens to be unchanged; framing rules if the format class is identical |
| **Lens family swap (same format)** | Working stop if maximum aperture changed; filtration (different flare and contrast behaviour); show LUT check; focus risk for the 1st AC | Focal length map, if the new family covers the same focals with the same character |
| **Casting change** | Skin tone and exposure policy; key placement and contrast ratio for that character; wardrobe and makeup tests; lens choice if facial geometry demands a different focal length | Names in the scene breakdown |
| **Framing rule change (e.g. added 9:16 deliverable)** | Composition policy for every shot; safe-area monitoring setup; open-gate decision; potentially setup counts if native vertical passes are added; movement plan (a lateral dolly may not survive a vertical crop) | Nothing. This always costs something |
| **Palette pivot (Production Design or Wardrobe)** | Show LUT; contrast ratio targets; gel and LED colour choices; new camera test with the new physical materials; product colour verification if commercial | Reference images, if the pivot is within the same value range |
| **Schedule compression (1st AD)** | Setup counts; lighting design simplified to a lower-fixture-count version; which scenes are "look" scenes; pre-light requirements; movement tools dropped in favour of faster ones | Nothing about the look, unless the DP explicitly renegotiates the look with the director |
| **VFX scope change** | Green/blue screen lighting; clean plate list; motion control needs; lens distortion capture; atmosphere policy (haze breaks keys); possibly camera body for higher resolution | Shot numbering |
| **Delivery spec change (SDR → HDR, or new platform)** | Monitoring standard; exposure headroom policy; show LUT and grade path; highlight-clipping decisions | Aspect ratio, if unchanged |
| **Budget cut** | Equipment list; crew list; lighting design scaled to available fixtures; pre-light days; possibly capture format | The visual intent statement, which should survive a budget cut or it was never a real intent |
| **Weather / daylight loss on the day** | Immediate fallback from the risk register: interior cover set, day-for-night, or artificial recreation of the intended source | Nothing. This is why the risk register exists |

## 15. Operating principles for the agent

1. **State the reason, always.** Every decision in the output must carry a because. A choice without a reason is a preference, and preferences do not survive a production meeting.
2. **Never lock downstream of an unlocked dependency.** If locations are not locked, publish the lighting plan as provisional and name the dependency explicitly.
3. **Test before you claim.** Where a real test is impossible, say so and flag the assumption.
4. **Quote the cost in the same breath as the ambition.** "Yes, and it costs two hours and a Technocrane" is a professional answer. "No" is not.
5. **Protect the one image.** Identify the single frame the piece cannot survive without, and defend its time in the schedule above everything else.
6. **Speak plainly to non-filmmakers.** In a commercial context the DP's second job is translation. If the plan cannot be explained to a client in one sentence per section, rewrite it.
7. **Borrow method, not look.** Deakins' motivation discipline, Young's subtractive approach, Richardson's hard top light, Kuras' insistence on visible in-camera intention, Storaro's colour systems: use these as *ways of deciding*, not as styles to imitate.
