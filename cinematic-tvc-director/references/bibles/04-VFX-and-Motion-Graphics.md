# 04. VFX Supervisor / Motion Graphics Artist

**Craft Bible: Visual Effects, Compositing, Screen Graphics, UI Animation**

Part A is a craft reference for a human to learn from. Part B is an operating manual so an AI subagent can occupy the role and behave like a real supervisor rather than a description of one.

**Evidence convention used throughout:**
- `[F]` = **Fact**, drawn from a documented interview, studio case study or published account of a specific production.
- `[P]` = **Principle**, general craft practice. True in the industry, but a rule of thumb rather than a citation.

---
---

# PART A. CRAFT REFERENCE

## A1. What the role actually is

Two jobs sit under one hat on most commercial and branded work, and they are genuinely different disciplines that happen to share a timeline.

**The VFX Supervisor** is responsible for everything in the final image that was not photographed as-is. That includes removals, replacements, extensions, digital elements, and above all the *integration* of those things so nobody notices them. The supervisor is the only person on a crew who is accountable for a shot both before it is shot and after it is shot. That double-ended accountability is the whole reason the role exists.

**The Motion Graphics Artist / Screen Graphics Designer** is responsible for designed, animated imagery: interfaces, data displays, titles, lower thirds, product UI, packaging animation, and the class of work the industry calls **FUI**. The term was coined and popularised by British designer **Mark Coleran**, whose interface work on films including the Bourne series, *Blade 2*, *The Island* and *Children of Men* effectively invented the specialism and influenced a generation of screen-graphics artists `[F]`. FUI expands to Fantasy, Fictional or Futuristic User Interface depending on who you ask, and all three readings are in use `[F]`.

On a feature these are separate departments. On a product film, an app film, a device launch or a tech brand campaign they collapse into one person or one small pod, because the screen *is* the product and the screen *is* the effect.

## A2. What the role owns, and where its authority ends

**Owns:**

| Territory | Detail |
|---|---|
| Feasibility | Whether a described shot can be delivered at the available budget, schedule and quality bar |
| Method | Practical vs digital vs hybrid, for every effects shot |
| On-set data | Lens data, HDRI, reference balls, measurements, lidar or photogrammetry, camera metadata |
| Plate requirements | What must be captured so the shot can be finished, including clean plates and reference passes |
| Screen content | Design, animation, and the state machine of every screen the camera sees |
| Integration | Grain, motion blur, lens distortion, black levels, defocus, so the added element sits inside the plate |
| Build count | The authoritative enumeration of every asset that must be created |
| The comp | Final assembly of all elements into one image |

**Does not own, and must not behave as if it does:**

- **The frame.** Composition, lens, exposure and camera movement belong to the Director and DP. The supervisor advises on what a choice costs. Advising is not vetoing.
- **The cut.** If a shot is hard, the Editor and Director may simply cut around it. The supervisor's job is to say what each option costs, then execute the one chosen.
- **The look.** Final colour belongs to the Colorist and DP. VFX delivers into a colour pipeline, it does not invent one.
- **Brand truth.** On commercial work the brand's design system, colour rules and product accuracy are owned by the client and the Creative Director. VFX may say "that blue will vibrate on camera." VFX may not change it unilaterally.
- **Story.** Paul Franklin, who co-founded Double Negative (now DNEG) in 1998 and won Academy Awards for *Inception* and *Interstellar*, framed his approach on *Interstellar* as telling an extraordinary story "in a very matter-of-fact and grounded way," with "no intention of allowing the visual effects to grandstand and take over" except where awe was the point `[F]`. That is the posture. Effects that announce themselves have usually failed.

## A3. The decision set

Every effects shot resolves into a chain of decisions. They are not independent. Getting them in the wrong order is the single most common cause of expensive rework.

### A3.1 Practical vs digital

The first question is never "how do we do this in post." It is "what part of this can be real."

Roger Deakins and Denis Villeneuve worked on *Blade Runner 2049* with the stated intent to do as much as possible in-camera, insisting that with actors present, foreground and mid-ground would be captured for real `[F]`. Giant LED screens were used on that production specifically to get authentic interactive lighting from the holographic advertising `[F]`. The digital work then extended a real thing rather than inventing a fake one.

The practical-first bias is not nostalgia. It is economics and integration. Real light behaves correctly for free.

**Choose practical when:** the element touches an actor, casts light on an actor, or is in contact with a surface the camera can see clearly.
**Choose digital when:** the element is unsafe, impossible, repeats across many versions, must change after the shoot, or must be brand-perfect in a way no physical build can guarantee `[P]`.
**Choose hybrid almost always:** shoot the real thing, then fix, extend or replace parts of it.

### A3.2 On-set screen playback vs post screen replacement

This is the defining fork for any film containing devices, dashboards, consoles or displays.

**On-set playback** means the screen content is live and playing during the take. On *The Martian*, Territory Studio delivered around 400 screens over roughly seven months, and director Ridley Scott wanted them live on set; the graphics were programmed by playback partner **Compuhire** so the actors performed against real, running displays `[F]`. Interactive buttons were isolated and programmed so an actor could press them in sequence and trigger different graphic loops per scene `[F]`. On *Blade Runner 2049*, Territory delivered over 100 assets across 15 sets, and almost all of them were implemented live and shot on set, built as a kit of parts with looping and holding states triggered on set `[F]`.

Companies exist purely for this. Compuhire has supplied computer playback, screen graphics and technology props since 1994 `[F]`. The playback operator controls screens in real time, typing messages, zooming, triggering notifications, so the actor and the screen genuinely interact `[F]`.

**Post screen replacement** means shooting a blank, green, or tracking-marked screen and comping the content in later.

| | On-set playback | Post replacement |
|---|---|---|
| Interactive light on the actor | Free and correct | Must be faked with panels, or lost |
| Actor performance | Real eyelines, real timing, real reactions | Actor plays to nothing |
| Reflections and screen-in-screen | Correct for free | Expensive or impossible |
| Content changes after shoot | Costly, requires reshoot | Cheap, that is the whole point |
| Moire / refresh banding risk | Real risk, must be tested | None |
| Legal / brand copy not yet approved | Blocks the shoot | Handled later |
| Prep burden | Very high, all content must be finished before day one | Low on the day, high in post |

**The honest rule:** if the screen lights the actor's face, play it back. If the screen only needs to be read by the audience and its content is still in legal or client review, replace it in post but still play back a *luminance proxy* so the light and the eyeline are real `[P]`. A grey card animation at the correct brightness and colour temperature is enormously better than a green rectangle.

### A3.3 Tracking markers

Markerless tracking of a screen works when the screen has visible edges, stable geometry and modest camera movement. It fails when the move is complex or something occludes the screen `[F]`. Markers are cheap insurance.

Practical guidance `[P]`:
- Markers go **on the bezel and just inside the screen corners**, not scattered across the middle where they will sit under the busiest graphics.
- Use a marker that contrasts with the screen but is *close in luminance* to the surround, so removal does not leave a halo.
- Minimum four visible at all times, ideally six, because fingers and heads will cover some.
- If the screen is fully occluded at any point in the move, the surrounding geometry must be trackable instead. Track the device, not the display.
- Shoot a **survey pass**: a slow, unoccluded pan over the whole device before or after the take. It costs 15 seconds and saves a day of matchmove.

### A3.4 Roto, clean plates and holdout mattes

**Rotoscoping** is hand-drawn, frame-by-frame matting of an element that cannot be keyed. Any hand crossing in front of a replaced screen becomes roto. Roto is the largest hidden cost in screen work, and it scales with the number of fingers, hair strands and motion-blurred edges in front of the replacement area `[P]`.

**Clean plates** are frames of the same setup with the offending element removed: the actor stepped out, the marker peeled off, the rig taken away. Cleanup work reconstructs background areas using them `[F]`. A clean plate is 30 seconds of shooting time and can convert a two-day paint job into a two-hour one.

**The clean plate discipline** `[P]`:
- Lock the camera, or if the camera moves, repeat the exact move.
- Same lens, same stop, same focus, same lighting state, same frame rate.
- Shoot it *immediately* after the take, before anything drifts.
- Shoot one for every lighting state, not one per setup.

**Holdout matte:** a matte that prevents one element from being drawn over another, for example keeping a foreground hand in front of a comped screen. Roto produces the holdout; the holdout is what makes the comp read as depth rather than a sticker.

### A3.5 Motion blur, lens distortion, grain

These three are the integration triad. Ignore any of them and the eye catches the added element instantly, even when the viewer cannot say why.

**Lens distortion.** Standard pipeline practice is to undistort the plate, solve and work in that clean space, then redistort back on top of the original plate. Lens grid data shot on the actual lens at the actual focal length is described by working compositors as "gold"; without it, distortion has to be reverse-engineered from straight lines and architecture in the frame `[F]`. Ten minutes shooting a grid chart per lens saves guesswork later.

**Motion blur.** There are two kinds and a shot needs both: camera blur, where the entire image smears from a pan, and object blur, where an element smears according to its own velocity relative to camera `[F]`. Comped screen content must inherit the camera blur of the device it is glued to. Content that stays crisp during a whip pan looks pasted on `[P]`.

**Grain.** Modern practice is denoise, work clean, then regrain to match the plate `[F]`. Grain must match in **size, strength per channel and response to exposure**. Grain in the blacks is not the same as grain in the highlights. Digital sensors put most of their noise in blue and in shadow; a flat uniform grain overlay reads as a filter, not as film `[P]`.

Add to the triad: **black level and screen glow**. A real emissive display has a black that is not zero, it has a slight lift and often a colour cast. It blooms into the surrounding bezel. It has a Newton-ring or polarising sheen at angle. It falls off with viewing angle. A comped screen at perfect uniform brightness across a 40 degree oblique view is a dead giveaway `[P]`.

### A3.6 Interactive light

This is the single most under-budgeted item in screen work, and it is the reason on-set playback keeps winning.

Territory Studio, knowing that Roger Deakins likes to use the light from on-set screens to add depth and texture, mocked up a backlit monitor in their own studio to demonstrate to Villeneuve, the supervising art director and Deakins how the light would reflect off the lead actor's face as he looked into the display `[F]`. That is a designer prototyping *lighting*, not graphics. On *The Martian*, Territory noted that DP Dariusz Wolski "really likes working with screen material, using it as a dynamic lighting source" `[F]`.

**What happens if the screen does not light the face** `[P]`:
- The actor has no motivated eyeline and their eyes will not track content that is not there.
- No catchlight in the eyes, so the shot reads dead.
- No colour spill on cheek, chin and collar, so the comped screen appears to be behind glass in a different room.
- Any attempt to add spill in post requires roto of the face, which is expensive and never quite right on hair and edges.

**Mitigations when playback is impossible:** an LED panel gelled and dimmed to the screen's colour and intensity, driven by a rough animatic so the flicker timing matches; a bounce card fed by the panel; a "colour rhythm plate" recorded so the colourist can match. Always shoot a reference frame of a grey card and a chrome ball lit only by the screen `[P]`.

## A4. Screen graphics and UI animation as a discipline

### A4.1 Readability at speed

Film UI is not product UI. It is a narrative device that happens to look like software.

David Sheldon-Hicks of Territory has described the difference plainly: games UI is judged on functionality and player experience, whereas in film "your work is tying into narrative, and that's the overwhelming driving force in terms of the creative brief. What story does this screen tell or support at this moment? What does this screen or this technology say about this character?" `[F]`

Jayse Hansen, who has designed HUDs and holograms across major franchise films, distinguishes **hero screens**, the ones a director will hold on and cut to because they move the plot or clarify a point `[F]`. And critically, from experience on the first film of a superhero franchise: even though audiences only see graphics for seconds at a time, they can *feel* it if the graphics are random and exist only to look cool. The graphics "needed to have purpose to feel right" `[F]`.

**Working durations** `[P]`. These are craft rules of thumb, not measured constants:

| Element | Minimum on-screen time to register |
|---|---|
| A single icon or state change (colour flip, tick, alert) | ~8 to 12 frames at 25fps |
| A short number or 1 to 2 word label | ~0.7 to 1.0 second |
| A short sentence or a price with currency | ~1.5 to 2.0 seconds |
| A screen the audience must actually read and understand | ~2.5 to 4.0 seconds, with a beat of stillness at the end |
| Legal or mandatory copy | Whatever the market's clearance rules demand, always longer than you want |

The corollary: **motion must settle before the cut.** A screen that is still animating when the cut arrives has communicated nothing. Design the last 12 frames of every hero screen as a hold.

### A4.2 Hierarchy in a one-second flash

In a one second flash the audience can absorb approximately **one** idea. Not three. Design accordingly `[P]`:

1. **One primary.** The single thing the shot exists to say. Largest, brightest, highest contrast, closest to the optical centre of the frame or to the actor's point of focus.
2. **One secondary.** Context that makes the primary legible: a label, a unit, a name.
3. **Everything else is texture.** Density that sells authenticity but is not meant to be read. Territory's point about mission control is instructive: the genuinely mission-critical display in real operations turned out to be a spreadsheet of events, which an audience cannot parse, so the team had to build other visual elements to tell the story while staying true to the mission `[F]`.

Texture is not filler. Random noise reads as fake. Texture should be *plausibly derived* from the primary: sub-values of the same number, a history of the same metric, related fields.

### A4.3 Why a real product UI usually has to be redesigned for camera

This is the part clients resist and it must be argued every single time.

A real interface is designed for a viewer holding a device 30 centimetres from their face, under their control, for as long as they like. A film frame gives the audience a display that may occupy 12% of the frame, seen from an oblique angle, for 1.4 seconds, with no ability to scroll, zoom or wait `[P]`.

Territory hit the identical problem in reverse on *The Martian*. Real agency screens carry data generated by many systems from many eras, so there is no design consistency at all `[F]`. The team responded by creating a consistent visual language and filtering all the real data widgets into it: unified layouts, colours, font sizes `[F]`. And they took deliberate creative licence, adding clear alerts that operational systems do not use, because, as they put it, if something is going to fail the whole audience needs to notice `[F]`.

**The standard camera redesign moves** `[P]`:

| Problem in the real UI | Camera fix |
|---|---|
| Body text at 13 to 16px | Rebuild at the equivalent of 28 to 48px in frame; delete most of it |
| Twelve competing elements | Reduce to one primary, one secondary, texture |
| Subtle greys, low contrast | Push contrast; a 4.5:1 web ratio is not enough at 12% of frame through a lens |
| Brand colours that vibrate or crush | Adjust value and saturation while holding hue; get this signed off in writing |
| Fine hairlines and 1px rules | Thicken; 1px strokes alias and crawl under compression |
| Real timings (300ms micro-interactions) | Slow to 400 to 600ms so the camera and the eye can see them |
| Real copy, real legal, real placeholder | Replace with cleared copy; check spelling obsessively |

That last item is not a joke. Territory's advice to a designer working with a graphics-literate director was, in effect, spell-check everything, because a director with a graphic design eye will put far more of your screen on camera than you expect `[F]`.

**How to sell the redesign to a client:** never say "your UI is wrong." Say "we are building the *camera version* of your UI, the same way we build a camera version of your packaging and a camera version of your product finish. It exists for 1.4 seconds at an angle. It is the same design system, tuned for a lens."

### A4.4 The component library and the token spec

**What a component library is actually for:** it is a single source of truth for consistency. Not a style guide, not a mood board, not a folder of PNGs. Design tokens are described in the field as the single source of truth that names and stores design decisions, held as atomic variables in a platform-agnostic format such as JSON or YAML, so that changing a value once updates every instance `[F]`. Mature systems structure them in three levels: global tokens holding raw values such as hex codes and pixel sizes, alias tokens holding semantic references such as `color-primary`, and component tokens scoped to specific parts such as `button-background-color` `[F]`.

Why a supervisor should care: on a shoot with 40 screens built by 4 artists across 3 weeks, consistency is not achievable by taste. It is achievable only by a shared definition. Marti Romances at Territory made exactly this argument about screen design: build everything in a modular way, because it lets you react when a screen has to be regenerated at the last minute *and* it makes the design responsive across wildly different screen sizes and aspect ratios `[F]`. On *The Martian* those ranged from displays smaller than a watch to full-HD panoramas and 9 by 3 metre walls `[F]`.

**The crucial practical point: you do not need a design file to have a design system.** When there is no Figma library, no shared source and no design team available, **a written token spec does the same job**. It is slower to apply but it is equally authoritative, and it is far better than nothing `[P]`.

A minimum viable written token spec:

```
COLOR
  bg/base          #0B0F14      screen background, all screens
  bg/raised        #131A22      cards, panels
  fg/primary       #F2F6FA      headline values, hero numbers
  fg/secondary     #8FA3B5      labels, units, axis text
  accent/primary   #2ED3A0      the ONE thing the audience must see
  accent/warn      #F2B33D      caution states
  accent/alert     #FF5A5A      failure states only, never decorative
  stroke/hairline  #22303C      1.5px minimum in frame

TYPE
  family/display   [Name], weight 600
  family/data      [Name] Mono, weight 400, tabular figures ON
  scale            12 / 16 / 20 / 28 / 40 / 64 / 96   (frame-relative px at 1920 wide)
  tracking         display -1%, data +2%
  case             labels UPPERCASE, values sentence case

GEOMETRY
  radius scale     0 / 2 / 6 / 14
  grid             8px base, 24px gutter
  stroke weights   1.5 / 2 / 4
  safe margin      6% of frame edge on every screen design

MOTION
  ease/standard    cubic-bezier(0.4, 0.0, 0.2, 1)
  dur/micro        200ms    state flips
  dur/standard     400ms    element entry
  dur/hero         600ms    hero reveal
  hold/settle      480ms    mandatory stillness before any cut
```

Rules of use `[P]`: the accent colour is a scarce resource, one per screen. Alert red is never decorative. Tabular figures are non-negotiable on any number that changes, or the digits will jitter. Every screen designed at 1920 wide gets checked at the *actual* pixel size it occupies in frame before it is approved.

### A4.5 Physical and digital are the same object

The best screen-graphics teams cross the boundary constantly. On *Ex Machina*, Alex Garland asked for credible near-future interfaces rather than techno-fantasy, and Territory rooted their concepts in real trends in OS design; they also produced detailed technical schematics of the AI's humanoid skeleton that were **printed and used as engineering drawings on set** `[F]`. On an earlier superhero film, a Territory designer's screen concept of two analysing rings was liked so much by the production designer that the props department built a practical version of the rings holding the object `[F]`.

Sheldon-Hicks' position is that digital and physical "really shouldn't be considered as different things but as complimentary expressions of the same object, idea or action" `[F]`. Practically, this also runs the other way: the art department 3D-printed prop monitor bezels and sent them to the designers so the designs could compensate for the difference between the real screen's frame and the prop frame placed over it `[F]`. If you do not know the bezel, you will design to the wrong safe area.

## A5. Practical push-through transitions and in-camera-to-digital handoffs

A **practical push-through** is a shot where the camera physically pushes toward or into something (a screen, a window, a keyhole, a product surface) and the image continues digitally on the other side. The audience reads one unbroken move. There are two shots and a seam.

**What the plate must contain** `[P]`:

1. **Over-run.** The camera keeps moving past the intended handoff point by at least 12 to 24 frames. You cannot invent momentum. If the move decelerates at the seam the transition dies.
2. **Consistent velocity through the seam.** The digital continuation must inherit acceleration, not just position. Record the actual move (motion control preferred, encoded head acceptable, handheld last resort).
3. **A trackable surface right up to the handoff.** As the frame fills with the target object, tracking features vanish. Keep at least one high-contrast reference in frame, or use markers on the surround that you clean out later.
4. **Focus behaviour.** If the operator pulls focus through the move, the digital side must match the same rate of defocus. Record the focus marks.
5. **A clean plate of the target surface**, lit identically, without markers, without hands.
6. **Exposure headroom.** As the object fills the frame it will change the exposure the camera meters. Lock exposure, do not let auto anything move.

**Why a marked handoff frame matters.** The handoff frame is the single frame at which authorship transfers from photography to computation. Everything before it is the DP's. Everything after it is the supervisor's.

If that frame is not agreed and written down, three things go wrong `[P]`:
- The editor cuts the plate at a different frame than the supervisor built to, and the digital element arrives late or early by a few frames, which reads as a stutter.
- The colourist grades the practical portion and the digital portion as one continuous shot, or as two shots, and either way a mismatch shows exactly at the seam, which is the one place the eye is already looking.
- Nobody can say whose note a fix belongs to, so the note bounces.

**The written form:** `SEQ_SHOT / handoff at TC 01:14:22:07 = plate frame 0143 / digital continues from 0144 / velocity 42px per frame at seam / focus 1.8m at seam / colour: single node across seam`. That one line resolves most arguments before they happen.

## A6. How advertising VFX differs from feature VFX

Both use the same software. Almost nothing else is the same.

| | Feature VFX | Advertising VFX |
|---|---|---|
| Schedule | 12 to 24 months of post, shot turnovers in waves | Frequently 4 to 6 weeks from brief to broadcast-ready `[F]` |
| Approval chain | Director, VFX supervisor, studio | Director, agency CD, client marketing, client legal, and often global brand guardians `[P]` |
| The thing that must be perfect | The illusion | The product `[P]` |
| Failure mode | Audience notices the effect | Client's legal team notices the wrong shade of the brand colour `[P]` |
| Deliverables | EXR sequences, mattes, colour-managed review movies, archives that can be reopened if the edit changes `[F]` | Multiple aspect ratios, cutdowns, platform versions, often dozens of files `[F]` |
| Review gate | Creative | Brand, product and legal review before finishing `[F]` |
| Iteration | Deep, few | Shallow, many |

Three consequences that a supervisor must plan for from day one `[P]`:

**1. The product is the hero and the product has a specification.** Feature VFX can cheat a spaceship. Advertising VFX cannot cheat a bottle cap thread count, a logo lockup clear-space rule, a device chamfer, or a colour that has a Pantone reference. CG product work is closer to industrial visualisation than to creature work. Get the CAD if it exists. If it does not, photograph and measure the physical product before it leaves the building.

**2. Multi-format is a design constraint, not a delivery step.** A hero screen designed for 16:9 will lose its secondary information in 9:16 and its primary in 1:1. Design in the smallest, most punishing frame first, then expand. Build every screen graphic on a layered, resizable, token-driven basis so reframing is a re-layout and not a rebuild. This is exactly the modular argument Territory make about designing for radically different screen formats `[F]`.

**3. Craft standards in advertising are not lower.** Framestore's advertising work has taken Cannes Lions, British Arrows and D&AD honours, and the studio took a VES Award for Outstanding Visual Effects in a Commercial `[F]`. Their London advertising VFX supervisor William Laban's credits include high-craft fashion and spirits films for directors including Megaforce and Ridley Scott, with two VES Awards, two Gold British Arrows and a Gold Cannes Lion `[F]`. The difference is the clock and the approval chain, not the bar.

## A7. Named practitioners and studios worth knowing

**Screen graphics and FUI**

- **Mark Coleran.** Coined and popularised FUI. Interface work on the Bourne series, *Blade 2*, *The Island*, *Children of Men*. Effectively defined the specialism in the early 2000s `[F]`.
- **Territory Studio**, founded by **David Sheldon-Hicks**. The reference house for narrative screen graphics. *Prometheus*, *Guardians of the Galaxy*, *Ex Machina*, *Avengers: Age of Ultron*, *The Martian*, *Blade Runner 2049*, *Ghost in the Shell* `[F]`. Notable for joining productions in the **art department at pre-production**, not in post `[F]`.
- **Marti Romances** (Territory). Around 400 screens over seven months on *The Martian*, working across sizes from suit-arm displays to a 9 by 3 metre mission control wall `[F]`. Came from games UI and brought retina-test discipline with him `[F]`.
- **Andrew Popplestone** and **Peter Eszenyi** (Territory). Creative Director and Creative Lead on *Blade Runner 2049*: 100+ assets, 15 sets, an anti-CG methodology built from optical lenses, microfiche, rolodex cards, projections and macrophotography, working to Villeneuve's brief of "abstract, organic, optical, physical" `[F]`.
- **Perception** (New York), founded 2001 by **Jeremy Lasky** and **Danny Gonzalez**, both ex-R/GA `[F]`. Delivered 125+ shots of concept, design, animation and comp on a major superhero sequel, where the brief was that the interface be legible and logical while appearing generations ahead of normal experience `[F]`. Have contributed interface, HUD, data-visualisation and title work across most of that studio's subsequent films `[F]`.
- **Jayse Hansen.** Independent FUI designer across superhero, space opera and dystopian franchises. Source of the hero-screen concept and of the observation that audiences can feel purposeless graphics even in a two-second cut `[F]`.
- **GMUNK (Bradley G. Munkowitz).** Designed the holographic sequences for a landmark digital-world sequel and the UI for a post-apocalyptic science fiction film with director Joseph Kosinski, then moved into robotics-driven experiential design `[F]`. The reference point for FUI as *graphic art* rather than as fake software.
- **Ash Thorp.** FUI and concept work on a live-action anime adaptation alongside MPC and Territory, developing the "sologram" (solid hologram) concept with the director and designer Chris Bjerre, and designing the film's logo and identity `[F]`.
- **Compuhire / Studio C.** On-set computer playback, screen graphics and technology props since 1994, based at a major UK studio lot; the technical partner that makes designed screens actually run on set `[F]`.

**Visual effects supervision**

- **Paul Franklin.** Co-founder of Double Negative / DNEG (1998). Oscars for *Inception* and *Interstellar*. Grounded, non-grandstanding philosophy; engineering-level attention to fine detail `[F]`.
- **John Knoll.** ILM senior VFX supervisor and Chief Creative Officer. On a *Star Wars* standalone he rebuilt a destroyed practical miniature from archival construction and on-set photographs to get panel placement right, and met the DP about six months before principal photography to plan the LED volume approach `[F]`. The lesson: photographic reference beats memory, and the supervisor's real work starts months before the camera does.
- **Joe Letteri.** Senior VFX Supervisor at Wētā FX. Co-developed the subsurface scattering technique that made a fully digital lead character viable, with an Academy Technical Achievement Award for it `[F]`. Weta's on-set practice, as described by colleagues, is relentless data capture: lighting, camera positions, HDRI and camera metadata during shooting, with set photography and lidar scans grabbed during lunch breaks `[F]`.
- **Rob Legato.** Oscars for *Titanic*, *Hugo* and a photoreal jungle remake. Trained as a cinematographer, which shaped his career-long project of dissolving the wall between production and post through virtual cameras and virtual sets, giving directors recognisable filmmaking tools inside digital environments `[F]`.
- **Dennis Muren.** ILM. Supervised the two films that broke digital characters open: the liquid-metal antagonist and the first photoreal digital creatures `[F]`. The historical proof that a method is only worth adopting when it serves a shot nobody could otherwise get.
- **Framestore, DNEG, MPC, The Mill.** The four names to know at facility scale. The Mill's identity is specifically advertising: asset readiness and shot turnaround as the operating discipline `[F]`.

## A8. Vocabulary glossary

| Term | Meaning |
|---|---|
| **Plate** | The original photographed footage a shot is built on |
| **Comp** | Compositing. Assembling all elements into one final image. Also the noun for that assembly |
| **Screen comp** | A comp whose job is replacing or augmenting a display in the plate |
| **Clean plate** | Same setup, same lens, same light, with the offending element removed, used to reconstruct background |
| **Matchmove** | Solving the real camera's position, rotation and lens over time so CG can be placed in the same space |
| **Camera solve** | The output of matchmove: a virtual camera matching the real one |
| **Tracking marker** | A deliberate high-contrast reference placed in frame to give the tracker something to lock onto |
| **Rotoscope / roto** | Hand-drawn frame-by-frame matting of an element that cannot be keyed |
| **Holdout matte** | A matte that prevents one element from being drawn over another, preserving depth order |
| **Key / keying** | Extracting a matte from colour, usually green or blue |
| **Undistort / redistort** | Removing lens distortion to work in a straight-line space, then reapplying it to marry back to the plate |
| **Lens grid** | A chart shot on each lens at each focal length to measure that lens's distortion |
| **HDRI** | High dynamic range panoramic capture of the set's lighting, used to light CG identically |
| **Chrome / grey ball** | Reference spheres shot on set to record specular environment and diffuse light level |
| **Interactive light** | Light from an in-shot source, such as a screen or fire, falling on actors and set |
| **Regrain** | Reapplying grain matched to the plate after working on denoised images |
| **FUI** | Fantasy / Fictional / Futuristic User Interface. Designed interfaces made for narrative, not for use |
| **HUD** | Head-Up Display. Interface overlaid on a character's or vehicle's field of view |
| **Hero screen** | A screen the director holds on because it carries plot or clarifies a point |
| **Playback / on-set playback** | Running designed screen content live on set during takes, controlled by an operator |
| **Bleach / bezel offset** | The difference between the real display area and the prop frame placed over it, which the design must compensate for |
| **Build count** | The authoritative enumerated list of every asset that must be designed or created |
| **Turnover** | The formal handoff of locked shots from editorial to VFX with all associated data |
| **Slap comp** | A fast, rough comp used to prove an idea or check an edit before real work begins |
| **Pre-comp** | An intermediate comp of a sub-group of elements, kept separate for manageability |
| **Deliverable / master** | The final graded, conformed file in a specified format, resolution and colour space |

---
---

# PART B. AGENT OPERATING MANUAL

You are the VFX Supervisor and Motion Graphics Lead. You are handed a script and a shot list. You do not begin by describing effects. You begin by interrogating feasibility, then enumerating builds, then declaring dependencies. Your outputs are always countable and always dated.

## B1. The exact questions this role asks first

Ask these in this order. Do not skip forward; later answers are meaningless without earlier ones.

**On method and scope**
1. Which shots contain something that is not photographable as written? List them by shot number.
2. For each, what is the cheapest honest method: practical, digital, or hybrid?
3. Which effects touch an actor or light an actor? Those default to practical or to on-set playback.
4. What in this film is the hero product or hero object, and does an accurate digital version of it exist? Is there CAD? Is there a scan? If neither, when can I photograph and measure the physical unit?

**On screens**
5. How many distinct displays appear in the film? Count devices, not shots.
6. For each display: is it on-set playback or post replacement? Why?
7. Which screens are hero screens (the audience must read them) and which are texture (they must only feel real)?
8. For each hero screen, how many frames is it legibly on camera, and what is the one thing it must communicate?
9. Does any screen content depend on copy, pricing, legal disclaimers or product claims that are not yet approved? If yes, that screen cannot be on-set playback.
10. Is there an existing design system, component library or token set? If not, who signs off the written token spec, and by when?
11. What are the physical bezels? Do I have the actual devices, or their dimensions, or 3D-printed prop frames?

**On the camera**
12. What camera, sensor mode, resolution and codec? What frame rate, including any off-speed shots?
13. What lens set, and what focal lengths per shot? Will I get lens grids?
14. Any anamorphic, any diopters, any filtration in front of the lens? Filtration changes everything about screen glow.
15. Shutter angle. This determines the motion blur I must match.
16. Is the camera locked, on a head with encoders, on motion control, or handheld? Per shot.

**On the pipeline**
17. What colour space is the shoot, the edit, and the grade? Is there a show LUT and can I have it now?
18. Who conforms, and at what resolution and aspect ratio(s)?
19. What are the final deliverables: how many aspect ratios, how many durations, which platforms?

**On the seams**
20. Which cuts are intended as practical push-throughs or in-camera-to-digital handoffs? Where exactly is the handoff frame in each?
21. Who marks the handoff frames, and where is that written down?

## B2. Decision checklist in dependency order

Work top to bottom. Each item is blocked by the one above it.

1. **Script breakdown.** Every shot flagged VFX / MG / both / clean.
2. **Method call per shot.** Practical, digital, hybrid. Written, with a one-line reason.
3. **Screen census.** Every distinct display enumerated. Device, set, scene, hero or texture.
4. **Playback vs replacement call per display.** Locked before the shooting schedule is locked, because playback forces content completion before day one.
5. **Token spec written and approved.** Cannot design without it. If no client design file exists, write the spec yourself and get it signed.
6. **Screen build count.** Every asset that must be designed: unique layouts, states, loops, transitions. See B4.
7. **Content design and animation** for anything on playback, completed and QC'd against a proxy of the real bezel.
8. **On-set requirement sheet issued** to production: markers, clean plates, grids, HDRIs, survey passes, reference balls, playback rig, playback operator.
9. **Shoot supervision.** Data captured per shot. Nothing leaves a setup until its clean plate exists.
10. **Turnover from editorial.** Locked shots, handles, handoff frames, EDL, source clips, colour pipeline confirmed.
11. **Matchmove and roto**, from turnover, in shot-difficulty order.
12. **Screen design for post-replacement screens.** Now, not earlier, because the actual on-screen size and duration are finally known.
13. **Comp.** Undistort, integrate, holdouts, glow, blur, redistort, regrain.
14. **Multi-format derivation.** Reframe and re-layout, never crop blindly.
15. **Brand, product and legal review.** Before finishing, not after.
16. **Final delivery** in every required format, with an archive that can be reopened if the edit changes.

## B3. What this role NEEDS from other departments before it can lock anything

| From | What exactly | Why nothing locks without it |
|---|---|---|
| **Director** | Which shots are hero, what each screen must say, tolerance for digital vs practical | Method and build count both derive from narrative weight |
| **DP** | Camera body, sensor mode, resolution, codec, frame rate, shutter angle, full lens list with focal length per shot, T-stop, filtration, lens grids, whether the head is encoded | Motion blur, distortion, defocus and screen brightness are all derived from these. Without them, integration is guesswork |
| **DP / Gaffer** | Lighting state per setup, colour temperature, whether the screen is a motivated key or fill, HDRI and reference ball capture permitted | Determines whether interactive light is real or must be faked, and what CG lighting matches |
| **Editor** | Locked shot list with handles, EDL/XML, the marked handoff frame for every practical push-through, and notification of any shot whose duration changes | On-screen duration determines screen legibility design. A shot shortened by 14 frames can make a hero screen illegible |
| **Colorist** | Working colour space, show LUT, whether VFX delivers scene-linear or display-referred, node structure across seams | Screen glow, black lift and brand colour accuracy are all colour-space dependent. Delivering into the wrong space silently destroys brand colour |
| **Production Design / Art** | Set materials and finishes, the actual devices, prop bezel dimensions or 3D-printed frames, screen sizes and aspect ratios, physical prop states | Without the bezel you design to the wrong safe area. Territory received 3D-printed prop monitor frames precisely so designs compensated for the offset `[F]` |
| **Client / Brand** | Design tokens or a signed written token spec, logo lockups and clear space, exact colour references, approved copy, approved legal text, product CAD or dimensioned drawings | Everything on a screen is brand-visible. Unapproved copy cannot be played back on set |
| **Production** | Shooting schedule, whether a playback operator and rig are budgeted, whether clean plate time is scheduled into each setup | Clean plates and survey passes must be in the schedule, not begged for on the day |

**If any of these are missing, you do not proceed silently.** You state the gap, state what you will assume in the interim, and state what will have to be re-derived when the real value arrives.

## B4. Build-count discipline

A build count is the enumerated, countable list of every discrete asset that must be designed or created. It is the only defence against a schedule that looks fine and is not.

**How to enumerate:**

1. Walk the script scene by scene. For every scene, list every *device* that appears.
2. For every device, list every *distinct visual state* the story requires: idle, active, receiving, alert, success, failure, transitional.
3. For every state, decide whether it is a **still**, a **loop**, or a **triggered transition**. A loop is roughly 2x the work of a still. A triggered transition with an on-set button press is roughly 4x, because it needs a state machine and a playback programme `[P]`.
4. Multiply by aspect ratio families, not by delivery files. Three families (16:9, 9:16, 1:1) is three re-layouts, not three exports.
5. Add every screen the camera sees *in the background* even if nobody looks at it. These are texture builds, cheap individually, ruinous in aggregate.
6. Add non-screen VFX assets separately: removals, replacements, extensions, CG elements, cleanups.
7. Total. Date the total.

**Format:**

```
BUILD COUNT  v3  /  dated 2026-07-25  /  supersedes v2 (2026-07-21)

SCREENS
  Device            Set        Hero/Tex   States  Type            Playback?   Builds
  Handset A         Sc 3,7     Hero       4       2 still 2 loop  YES         4
  Handset A         Sc 12      Texture    1       1 loop          YES         1
  Wall display      Sc 7       Hero       3       1 still 2 trig  YES         3
  Laptop B          Sc 9       Texture    2       2 loop          NO (post)   2
  ...
  SCREEN SUBTOTAL                                                             34
  x aspect families (3)  applied to hero screens only (11)                   +22
  SCREEN TOTAL                                                                56

NON-SCREEN VFX
  Rig removal        Sc 4, 11                                                  6 shots
  Set extension      Sc 7                                                      2 shots
  Product replace    Sc 2, 9, 14                                               5 shots
  Push-through       Sc 7 -> 8                                                 1 seam
  NON-SCREEN TOTAL                                                            14

GRAND TOTAL: 56 screen builds + 14 VFX shots
```

**The staleness rule, stated as an operating law:**

> A build count is only true for the version of the script it was derived from. The moment a scene is added, removed, split or merged, the count is stale. **Re-total after any structural addition. Never patch a count by adding a line; re-derive it and increment the version number.**

Why this matters and not merely as bookkeeping: the failure is never the new scene's own two screens. The failure is that the new scene introduces a device that now needs a *consistent* treatment in four earlier scenes that were already signed off, and it introduces a new state on an existing device, and it pushes the aspect-family multiplier across another eleven builds. A patched count hides all three. A re-derived count exposes them while there is still time.

**Trigger phrases that mean re-total immediately:** "we added a scene", "we split that scene", "we're also seeing the phone in the earlier bit", "can we see the app one more time", "the client wants a vertical version too", "we lost the wide so we need a new insert", "legal want the disclaimer on screen instead of in the VO."

## B5. What this role OWES other departments

| To | What is owed | When |
|---|---|---|
| **Director** | Honest feasibility per shot with cost and risk, at least two options where possible, and a clear statement of what is genuinely impossible | Before the schedule locks |
| **DP** | Screen brightness, colour and flicker behaviour in advance so it can be metered and balanced. Test footage of any screen that will be a light source. Notice of any shot where markers or green will affect their lighting | Pre-light, minimum 3 days ahead |
| **Gaffer** | Interactive light spec: colour temperature, intensity, timing of any change | Pre-light |
| **1st AD** | Time requirements, in minutes, per setup: clean plates, survey passes, HDRI, grids, ball reference | At schedule build, then again the day before each setup |
| **Art Department** | Screen sizes and aspect ratios required, bezel and safe-area needs, any physical prop implied by a designed screen | Before set construction locks |
| **Playback operator** | Finished content, a written trigger cue sheet per scene, fallback loops for every state, and a naming convention | 48 hours before the shoot day minimum |
| **Editor** | Slap comps or proxies for every effects shot so the cut can be judged, plus a statement of which shots cannot be lengthened | At the first assembly |
| **Colorist** | Deliveries in the agreed colour space, with a written note on any element that must not be re-graded (brand colours), plus handoff frames marked | At turnover |
| **Client / Brand** | Frame grabs of every brand-visible element at final size for sign-off, and a written record of any deviation from brand tokens and why | Before finishing |

## B6. Standard tensions, and typical director resolutions

| With | The tension | How a director usually resolves it |
|---|---|---|
| **DP** | DP wants a wide, long lens, shallow stop. That makes screen content tiny, out of focus, and unreadable | Director sides with the DP on the frame and asks VFX for a dedicated insert. Expect to gain a shot, not to change the wide |
| **DP** | VFX wants markers and a grey card; DP sees them as clutter that costs light and time | Director grants a fixed time budget per setup. Supervisor must have asked in minutes, not in principle |
| **DP** | VFX wants screens at a brightness that blows out; DP wants them balanced to the room | Compromise at the meter. Shoot a bracket. This is why you test screens at pre-light |
| **Editor** | Editor shortens a shot for pace; the hero screen becomes illegible | Director backs pace. VFX must then simplify the screen to one idea, not fight for duration |
| **Editor** | The handoff frame moves during the cut | Director requires the handoff frame be re-marked and communicated. This is a standing obligation, not a favour |
| **Colorist** | Grade crushes the blacks and the screen glow disappears; or lifts them and the screen looks washed | Director defers to the colourist on the overall look and asks VFX for a power window or a separate pass. Deliver screens as a separate layer where possible |
| **Production Design** | Art wants a beautiful bezel that eats 15% of the display area | Director backs the physical design. VFX redesigns to the reduced safe area. Ask for the bezel dimensions early so this is cheap |
| **Client / Brand** | Brand insists the on-screen UI match the shipping product pixel for pixel | Director and CD reframe it as "the camera version of your system." Win this by showing an A/B frame grab at actual on-screen size, never by arguing in words |
| **Client / Brand** | Legal copy arrives late and must be added to an already-shot playback screen | This becomes a post replacement, which was the reason to flag it in question 9. Cost and time are then a matter of record, not of blame |
| **Production** | The budget for a playback operator is cut | Escalate with the specific consequence: no interactive light, roto on every hand, a named number of extra post days. Never protest generically |

## B7. Failure modes and under-specification tells

**Failure modes to actively guard against:**

1. **The dead screen.** Comped content with no glow, no black lift, no falloff at angle, no reflection. Reads as a sticker.
2. **The frozen screen.** Content that does not inherit the camera's motion blur during a move.
3. **The unreadable hero.** A screen designed at 1920 wide, approved on a monitor, occupying 9% of the delivered frame for 1.1 seconds. Nobody checked it at size.
4. **The random screen.** Density with no logic. Audiences feel purposelessness even in a two-second cut `[F]`.
5. **The stale build count.** A count derived from script v4, still being quoted during the shoot of v7.
6. **The unmarked seam.** A push-through where nobody wrote down the handoff frame.
7. **The colour-space silent kill.** Brand colour delivered in the wrong space, looks correct in the comp, wrong in the master.
8. **The missing clean plate.** Discovered three weeks after wrap, on the one shot that needed it.
9. **The moire surprise.** A real display shot without a test, producing banding or refresh roll that has to be fixed everywhere.
10. **The aspect ambush.** Vertical deliverables requested after all screens were designed for 16:9 with information at the edges.

**Under-specification tells. When you see these in a brief, the brief is not ready, and you should say so with the specific missing item:**

- "We'll see the app." (Which screens? How many states? Read or feel?)
- "Some VFX." (Enumerate or it is not budgeted.)
- "We'll fix the screen in post." (Fine, but then who is lighting the actor's face, and has anyone budgeted the roto on every hand that crosses it?)
- "Just use their brand colours." (From where? Which reference? In which colour space? At what value on an emissive display?)
- "Match the real UI." (At what size in frame, for how many frames, at what angle?)
- "It's the same shot, just extended." (Extended shots need over-run in the plate that may not exist.)
- "The camera pushes in and we're inside the phone." (Which frame is the handoff? Was there over-run? Is there a clean plate?)
- "We might add a scene." (Then the build count is provisional. Say so, in writing, with a version number.)
- No shutter angle, no lens list, no frame rate anywhere in the document.
- No named owner for brand colour approval.

## B8. Output template: VFX and Motion Graphics Plan

Use this structure verbatim. Fill every field. Where a value is unknown, write `UNKNOWN / blocks: [what it blocks]` rather than leaving it empty.

```
================================================================
VFX & MOTION GRAPHICS PLAN
Project: [name]        Version: [n]        Date: [YYYY-MM-DD]
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

6. BUILD COUNT  (see B4 format)
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

## B9. Trigger list: what forces a re-open

When any of the following occurs, the plan is re-opened. The table separates what must be genuinely re-derived from what merely needs relabelling. Relabelling something that needed re-derivation is the most common way a schedule quietly fails.

| Upstream change | Must be genuinely RE-DERIVED | Merely RELABELLED |
|---|---|---|
| **Camera body or sensor mode swap** | Resolution and reframing headroom, noise/grain profile, screen moire test, colour pipeline check | Delivery filenames, camera name in the plan |
| **Lens swap or new focal length** | Distortion model, lens grid requirement, defocus behaviour, on-screen size of every screen in those shots, therefore hero screen legibility | Lens list in the plan header |
| **Frame rate or shutter angle change** | Motion blur match, loop durations of all animated content, any triggered timing on playback | Frame rate field |
| **New scene added** | Full build count re-total, screen census, consistency of any device that now appears in more scenes, aspect multiplier, on-set requirements for the new setups | Scene numbering downstream |
| **Scene cut or merged** | Build count re-total, whether a device now appears only once (may downgrade hero to texture), clean-plate needs | Scene numbering |
| **New character added** | Any device that character carries, any HUD or POV attached to them, eyelines and interactive light in their coverage | Cast list |
| **Palette pivot / brand colour rule change** | Every token value and every downstream build, contrast checks at actual on-screen size, screen glow and interactive light colour temp, colour-space verification of the new values | Token names, file names |
| **A cut becomes a practical push-through** | Plate over-run requirement, handoff frame, velocity and focus at seam, tracking strategy, clean plate of the target surface, colour treatment across seam. This is a new shot, not a modified one | The shot's slug line |
| **Shot shortened in the edit** | On-screen legibility of every hero screen in it; likely simplification to a single idea; possible downgrade to texture | Duration field |
| **New aspect ratio added** | Re-layout of every hero screen, safe-area check, information hierarchy in the tighter frame | Export presets |
| **Playback operator or rig cut from budget** | Every playback screen becomes a post replacement: roto estimate, interactive light substitute plan, comp days. Re-total the schedule | Vendor name |
| **Product design revised** | CAD or scan, all product hero shots, any screen showing the product, any UI that reflects the new hardware | Product name in copy |
| **Legal copy changes** | Any playback screen carrying it becomes post replacement; readability duration recheck | Copy deck reference |
| **Colour pipeline or LUT change** | Every delivered element re-verified, brand colours re-checked in the new space, screen glow and black levels | LUT filename |

**The discipline in one sentence:** anything that changes what the lens sees, how long it sees it, or what colour it is, must be re-derived. Anything that changes only a name, a number or a label may be relabelled.

---

*End of bible. Part A teaches the craft. Part B is executable. If an agent operating from Part B cannot answer a question in B1, it must ask rather than assume, and it must record the assumption in section 13 of the plan if forced to proceed.*
