# 23. AI Image-to-Video Generation: The Motion Prompt Engineer

**Craft Bible: Animating a Still Reference Image Into Motion (Prompt Engineering for Image-to-Video, as Distinct From Text-to-Video)**

Part A is a craft reference for a human to learn from. Part B is an operating manual so an AI subagent can occupy the role and behave like a working motion prompt engineer rather than a description of one. Part C is a dated cost snapshot that must be refreshed before it is used for budgeting.

**Evidence convention used throughout:**
- `[SOURCED]` = drawn from a documented platform guide, help article, or published account, cited at point of use.
- `[PRINCIPLE]` = general craft practice, true across the field but a rule of thumb rather than a citation.
- `[UNVERIFIED]` = a figure or claim that could not be confirmed against a primary source at time of writing. Treat as directional only.

All pricing in this document is dated 2026-07-26 and will drift. AI platform pricing changes on a timescale of weeks, not years. Re-check every number in Part C before it touches a client budget or an internal cost estimate.

---
---

# PART A. CRAFT REFERENCE

## A1. Why image-to-video prompting is a different discipline from text-to-video prompting

Text-to-video prompting starts from nothing. The prompt has to invent the subject, the setting, the lighting, the framing, the wardrobe, the lens, and the motion, all at once, in one block of language. Every noun and adjective in the prompt is load-bearing because there is no image to carry any of it.

Image-to-video prompting starts from something. The reference image has already made every one of those decisions. Composition is fixed. Subject appearance is fixed. Lighting is fixed. Framing and lens character are fixed. The moment a human or an agent writes a still-image prompt and hands it to an image-to-video model, roughly eighty percent of what a text-to-video prompt would have to specify has already been decided and locked into pixels `[PRINCIPLE]`.

This changes what the prompt's job actually is. Runway's own image-to-video guidance states the point directly: "your prompt's role is to describe what should happen, the motion, camera work, and temporal progression you want to see," and that the image already defines composition, lighting, style, and subjects, so "your prompt's main job is to describe motion" `[SOURCED]`. Hailuo/MiniMax's guidance makes the same point from the opposite direction, as a warning: "when using image-to-video mode, Hailuo already sees your input image, so describing static elements wastes tokens and confuses the motion generator. Only prompt for what changes, the motion and transformation elements" `[SOURCED]`.

That second framing matters more than it looks. Re-describing what the image already shows is not neutral, it is actively harmful. A prompt that says "a woman with red hair in a green coat standing on a cliff at sunset" when the model can already see a woman with red hair in a green coat standing on a cliff at sunset does two bad things. First, it wastes prompt budget that could have gone to precise motion instruction. Second, and more seriously, it gives the model competing signals about the subject, and some models will interpret a restated appearance description as an instruction to *regenerate* or drift the subject toward the described text rather than hold the photographed one. The net effect is a video that looks less like the reference image than an untouched still would, which defeats the entire point of doing image-to-video in the first place.

**The rule that follows from this, and the single most important discipline in this craft bible:** an image-to-video prompt should describe motion, and as close to nothing else as possible. What moves, how it moves, how much, how fast, and what the camera itself does independently of the subject. Everything the image already shows is off-limits for restatement unless the writer specifically intends to override or contradict it (and even then, understand that fighting the image is fighting the model's strongest prior).

## A2. The motion-only prompting discipline

A strong image-to-video motion prompt has five components. Not every prompt needs all five in every sentence, but a professional prompt should have deliberately considered all five before it is submitted, because the failure mode for an underspecified prompt is not "nothing happens," it is "the model guesses, and it guesses wrong, expensively."

### A2.1 What specifically moves

Name the exact element and the exact action. Not "the person moves" but "her eyes blink slowly and her shoulders rise and fall with breath." Not "the scene comes alive" but "steam rises from the cup and the curtain behind the window sways." Precision here is not stylistic preference, it is the mechanism by which the model knows where to spend its motion budget. Vague global instructions like "make it come to life" or "add movement" are the number one cause of over-animation, because a model with no specified target for motion will often animate everything indiscriminately, including things the shot depended on holding still `[PRINCIPLE]`.

Isolate elements with general, unambiguous language rather than pointing at pixel coordinates. Runway's guidance recommends referring to characters and objects with general descriptive language specifically so the model can isolate them as distinct movable regions `[SOURCED]`. "The woman in the red coat" is a better handle than "the subject" if there are two people in frame, and far better than a spatial description like "the thing on the left," which breaks the moment the framing changes.

### A2.2 The camera's own, independent movement

The camera is a separate actor from the subject and needs its own instruction. A prompt can specify subject motion with zero camera movement (static lockoff, subject animates), camera movement with zero subject motion (subject frozen, camera moves around them, this is the orbit and push-in family), or both at once (harder to control, higher risk, reserve for cases that specifically need it).

Standard camera vocabulary transfers directly from live-action grammar and every major model responds to it: push in, pull out, orbit (clockwise or counter-clockwise, and a fraction like "orbit 30 degrees" versus "orbit 180 degrees" if the model's dial supports partial values), pan, tilt, static/lockoff, handheld drift, dolly, crane up or down, rack focus. Ambience AI's Kling prompting guide specifically recommends using a platform's built-in camera movement controls (push, pull, pan, tilt, orbit, zoom) where they exist, rather than relying purely on free text, precisely because dedicated camera controls are more reliably obeyed than the same instruction buried in a sentence `[SOURCED]`.

**Keep it to one clear camera intention.** Ambience AI's guidance on Kling explicitly advises keeping the motion description to "one clear action rather than several competing ones" `[SOURCED]`. A prompt that asks for a push-in, a subtle handheld sway, and a slow orbit simultaneously is not more cinematic, it is three instructions fighting for the same four seconds of generation, and the model will average them into something mushy and directionless.

### A2.3 Speed and intensity

Every motion instruction needs a magnitude, not just a direction. "Slowly," "gently," "subtly," "gradually" versus "rapidly," "sharply," "abruptly," "violently." A prompt that says "the hair moves in the wind" without a speed cue is a coin flip between a barely-perceptible drift and a hurricane. Pair the speed word with the specific motion it modifies rather than a blanket adverb at the end of the sentence: "her hair lifts gently in a light breeze" reads correctly to the model; "her hair moves, gently" as a bolted-on afterthought is weaker.

### A2.4 What must stay still (the most under-used and most valuable instruction in this whole craft)

This is the instruction most human prompt-writers forget, and it is frequently more consequential than the motion instruction itself. Image-to-video models are, by default, eager: left with an ambiguous brief, many will animate background elements, secondary characters, text, logos, or fine details that the shot needed locked, simply because the model has learned that "video" implies movement everywhere.

A professional motion prompt explicitly protects what must not move: "the background remains static," "her expression stays neutral throughout," "the logo on the product does not distort," "the framing does not drift," "everything outside the subject's face remains frozen." This is the direct analogue of "what stays in and out of frame" instructions on a live-action call sheet, it is a constraint, not a suggestion, and it should be written with the same specificity as the motion instruction it sits beside.

### A2.5 Physics and realism cues

Motion that ignores physical plausibility is the fastest way to break audience trust in an otherwise convincing shot. Cloth, hair, liquid, smoke, and secondary jiggle (breasts, jowls, loose fabric responding a beat after the primary motion) all have expected physical behavior, and naming that behavior explicitly, rather than assuming the model will infer it, measurably improves output quality `[PRINCIPLE]`. "Fabric responds naturally to the turn, with a slight delay before settling" is a stronger instruction than "fabric moves." Similarly, naming a light-physics interaction that should track the motion, such as "highlights shift across her cheekbone as she turns her head toward the window," gives the model a concrete target instead of a vague mood.

---

## A3. Start frame versus end frame versus reference: the three distinct input roles

Not every image input into an image-to-video model plays the same role, and confusing the three is one of the most common and most expensive mistakes in this craft. The Higgsfield-hosted model roster makes the distinction unusually explicit: most models (cinematic_studio_3_0, cinematic_studio_video, cinematic_studio_video_v2, minimax_hailuo, seedance1_5, seedance_2_0, seedance_2_0_mini, kling2_6, kling3_0, kling3_0_turbo, happy_horse_video, grok_video, grok_video_v15, veo3, veo3_1, veo3_1_lite, wan2_7) accept a `start_image` and often an `end_image` as their literal image-to-video mechanism, while a smaller set additionally or exclusively accept `image_references`, `video_references`, and `audio_references` as separate, distinct input types.

**Corrected model capability matrix [SOURCED, live `models_explore` schema fetch 2026-07-26].** An earlier draft of this section grouped these three models incorrectly. The verified truth is:

| Model | start_image | end_image | image_references | video_references | audio_references |
|---|---|---|---|---|---|
| `wan2_6` | NO | NO | YES | YES | YES |
| `wan2_7` | YES | YES | NO | NO | YES |
| `gemini_omni` | NO | NO | YES | YES | NO |
| `seedance_2_0` / `_mini` | YES | YES | YES | YES | YES |

Three operational consequences follow directly. First, `wan2_6` and `wan2_7` are NOT interchangeable variants of the same model: `wan2_6` cannot accept a first frame at all, so it can never be used for true image-to-video off a locked still. Second, `gemini_omni` does not accept `audio_references`, so it cannot be synced to a pre-existing voiceover or music track despite generating its own native audio. Third, the Seedance 2.0 pair is the only family in the roster exposing all five input roles simultaneously, which is why it is the default choice whenever a shot must be frame-locked, identity-consistent, and audio-synced at once.

| Role | What it does | What it is for | Which models expose it |
|---|---|---|---|
| **start_image** | This exact image becomes the literal first frame of the generated clip. The model animates forward from it. | The standard image-to-video case: you have one still and want to bring it to life. | Nearly universal across current image-to-video models, including the full Higgsfield roster listed above. |
| **end_image** | Used together with start_image on models that support both. The model is told what the first frame is AND what the last frame is, and it generates the motion that plausibly connects the two. | Precise handoffs: you need the clip to land on an exact composition, either because the next shot's start_image depends on it, or because the ending pose/framing is creatively non-negotiable. Also used to build perfect seamless loops by feeding the same image as both start and end. | Kling 3.0 specifically supports both together `[SOURCED, per grounding data]`. This is documented industry-wide as "First Last Frame to Video" or FLF2V, and Luma Dream Machine's keyframes feature does the equivalent job under different naming `[SOURCED]`. |
| **image_references** | Style or identity influence carried into the generation without that image being the literal first or last frame of the clip. | Keeping a character, product, or visual identity consistent across shots that are NOT directly continuous with each other, i.e. cutaways, a different angle on the same subject, or a different scene that still needs to feel like the same world. | gemini_omni, wan2_6, seedance_2_0, seedance_2_0_mini `[SOURCED, live schema fetch 2026-07-26]`. Note wan2_7 does NOT expose this. |
| **audio_references** | An existing audio track the generated picture must sync to. Inverts the normal order: audio is locked first, picture is built to match it. | A voiceover, music cue, or line reading that already exists and cannot be regenerated, where the picture must land against it. | wan2_6, wan2_7, seedance_2_0, seedance_2_0_mini `[SOURCED, live schema fetch 2026-07-26]`. Of these, only wan2_7 and the Seedance pair also accept start_image, so those three are the only options for audio-synced AND frame-locked in one generation. gemini_omni does NOT expose this. |

**The distinction that must never be confused:** `start_image` says "this pixel-for-pixel image is where the video begins." `image_references` says "let this image inform who/what this looks like, without constraining the first frame to be identical to it." Feeding a style/identity reference into a `start_image` slot on a model that does not separate the two will force the clip to open on that exact frame, which is usually not what was wanted if the intent was merely "keep this character consistent." Conversely, feeding a true first-frame image into an `image_references` slot on a model that supports both will under-use the control the model actually offers, since references-only input gives up the frame-lock guarantee that `start_image` provides.

### A3.1 First-and-last-frame mode in depth (Kling 3.0 and equivalents)

When both `start_image` and `end_image` are supplied, the model is not generating "a video that starts here," it is solving an interpolation problem: find a plausible motion path between two known compositions. This is a fundamentally different and more constrained generation task than single-image animation, and it has its own best practices, independently corroborated across multiple platform guides:

- **Similarity between the two frames matters enormously.** Documentation on Kling's first/last frame mode advises choosing "two similar images with the same theme for smoother transitions," warning that "significant differences may cause a lens switch" `[SOURCED]`. The two frames should ideally share the same aspect ratio `[SOURCED]`.
- **The prompt should describe the transition, not either endpoint.** Because both endpoints are already fixed by the images, a prompt describing what either frame looks like is pure waste, and worse, potential contradiction. The prompt's entire job in FLF2V mode is to describe the motion path between the two: what happens, how fast, and via what camera behavior, with the two supplied images doing all the compositional work `[SOURCED]`.
- **Perfect loops are a specific, deliberate technique.** Uploading the identical image as both start_image and end_image produces motion that begins and ends at the same point, i.e. a seamless infinite loop, which is broadly useful for background plates, ambient loops, and social loop content `[SOURCED]`.
- **This mode is the correct tool for shot-to-shot handoffs.** If shot 2 must open on a precise composition that shot 1 is building toward, generating shot 1 with an end_image equal to shot 2's intended opening frame (or generating shot 2 with a start_image extracted from shot 1's last frame) is the mechanism that makes a sequence of independently-generated clips read as one continuous piece of footage. See A7 below.

---

## A4. Templated versus free-text image-to-video

There are two structurally different ways to get from a still image to a moving clip, and treating them as the same skill is a mistake that costs either time or money depending on which direction the error runs.

**Free-text motion prompting** is what the rest of this craft bible mostly describes: the operator writes a natural-language instruction describing motion, camera behavior, speed, and stillness constraints, and the model generates according to that instruction. This is the general-purpose path. It offers full creative control, meaning any motion concept that can be described in words is at least attemptable. The tradeoff is risk: an ambiguous, contradictory, or over-loaded prompt can produce artifacts, unwanted secondary motion, morphing, or a result that simply does not match what was pictured. Free-text prompting also requires iteration, since the first generation on a genuinely novel motion idea is rarely the keeper.

**Templated (preset-routed) image-to-video** is a different animal entirely. Higgsfield's `higgsfield_preset` system is the clearest working example: the operator supplies a single required input image and a `preset_id` (retrieved via `presets_show`), and no free-text motion prompt is written at all. The preset itself encodes a complete, pre-engineered motion recipe that has already been tuned and validated against that specific effect. Live examples pulled from the Higgsfield preset catalog on 2026-07-26 illustrate the range: EARTH ZOOM (a single dive from orbit into a scene built around the uploaded photo), FLOAT SPIN (the subject levitates and rotates 360 degrees with pose frozen), STICKER PEEL (a hand peels the subject off the photo like a sticker), ORBIT 360 (the camera orbits the subject while the subject stays still), ACTION FIGURE (the subject is lifted out of frame like a rigid toy and rotated), CGI BREAKDOWN (a mesh-to-beauty-pass render reveal), ICE STATUE (frost sweeps down the frame turning the subject into a translucent ice statue), ANDROID ASSEMBLE (robot parts fly in and snap onto a core), and 3D RENDER (the camera orbits a hyper-detailed 3D model built from the photo), among 60-plus presets spanning stylized, game-menu, broadcast, and paparazzi-style effects `[SOURCED, per grounding data fetched live from Higgsfield MCP on 2026-07-26]`.

### A4.1 When each approach is the right call

| Situation | Right call | Why |
|---|---|---|
| A proven visual effect exists as a named preset and matches the creative goal exactly | Templated (preset) | Minimal prompting risk, the recipe has already been solved, fastest path to an acceptable result. |
| A quick social clip, meme format, or trend-following effect | Templated (preset) | Presets exist specifically because these effects are common asks. Writing a bespoke free-text prompt to reinvent EARTH ZOOM or STICKER PEEL from scratch is wasted effort when a validated template already exists. |
| A professional job with a specific, brand-defined motion requirement not covered by any preset | Free-text | Presets are built for their own named effect and are not adjustable to arbitrary brand specifications. Bespoke motion needs bespoke prompting. |
| A subtle, restrained "living portrait" effect for a hero brand image | Free-text | This class of motion needs precise control over exactly which micro-motion happens (breath, blink) and exactly what stays frozen (everything else). Presets are built for legible, often theatrical effects, not restraint. |
| Multi-shot continuity work where a clip must hand off cleanly to the next shot's start_image | Free-text, generally, sometimes first/last-frame mode | Preset outputs are self-contained effects, not designed to end on a controllable, reusable handoff frame. |
| Client-facing deliverable where any visible AI artifact is unacceptable | Depends on stakes: templated for lower risk on simple asks, free-text with heavy QA and multiple generations for anything bespoke | Templates are lower-variance because they are pre-validated; free-text has a wider quality distribution and needs more generations to land. |

**The general heuristic:** reach for a preset when the goal is "I want this specific, recognizable effect," and reach for free-text motion prompting when the goal is "I want this specific, custom result that has to match my reference image's mood, brand, or narrative need exactly." Presets trade creative control for reliability; free-text trades reliability for creative control. Neither is categorically superior, they solve different jobs.

---

## A5. Worked prompt templates

Each template below assumes a `start_image` has already been supplied and the prompt is written for a general-purpose free-text image-to-video model (Runway, Kling free-text mode, Luma, Pika, Hailuo, or the equivalent Higgsfield-hosted models). Line-by-line breakdown follows each prompt.

### Template 1: Subtle living-portrait effect

**Prompt:** "Her eyes blink once, slowly, and her chest rises and falls gently with breath. A faint smile begins to form at the corners of her mouth. Everything else in the frame, her hair, her clothing, the background, and the framing, remains completely still. No camera movement."

**Breakdown:**
- Line 1 names the exact micro-motions (blink, breath) with a speed qualifier (slowly, gently). This is the entire motion budget for the shot, deliberately tiny.
- Line 2 adds a single secondary motion (the smile) so the shot has a narrative beat, not just biological idle motion.
- Line 3 is the stillness lock, and it is the most important line in the prompt. Without it, an eager model will likely add hair movement, background drift, or clothing sway that was never asked for.
- Line 4 closes off the camera as a variable entirely, which is necessary because an unspecified camera is itself a form of ambiguity the model may resolve with unwanted drift or zoom.

### Template 2: Camera-only orbit around a static subject

**Prompt:** "The camera orbits slowly around the subject, moving from left to right, completing a partial arc of roughly 45 degrees. The subject remains completely frozen throughout, including expression, pose, and clothing. Lighting stays consistent as the camera moves."

**Breakdown:**
- Line 1 gives the camera its own instruction, direction, speed, and a bounded magnitude (45 degrees, not an open-ended "orbit"), which avoids over-rotation.
- Line 2 is the stillness lock applied to the subject rather than the background, since in this shot the subject is what must not move.
- Line 3 pre-empts a known artifact: some models let lighting shift unrealistically as the virtual camera moves around a subject that was photographed under fixed real-world lighting. Naming the constraint reduces the chance of it happening.

### Template 3: Product rotating in place

**Prompt:** "The product rotates smoothly on its own vertical axis, a slow, continuous 360-degree turn. The camera does not move. The background and surface beneath the product remain completely static. Reflections and highlights shift naturally across the surface as it turns."

**Breakdown:**
- Line 1 specifies the axis and the completeness of the rotation, both of which matter for a product shot destined for e-commerce or ad use, where a partial or wobbly turn reads as a defect rather than a stylistic choice.
- Line 2 removes the camera as a variable, which matters specifically for product work where any parallax or framing drift undermines the sense of a controlled studio turntable.
- Line 3 locks everything that is not the product itself.
- Line 4 is a physics cue: without it, some models render a rotating object with static, pasted-on highlights that visibly fail to track the turn, breaking the illusion of a real object.

### Template 4: Character walking toward camera from a portrait

**Prompt:** "The man walks steadily toward the camera, his stride natural and unhurried. As he approaches, he grows larger in frame and the background behind him blurs slightly with a shallow depth of field. His expression stays calm and unchanged throughout. The camera holds its position, static, letting him walk into the shot."

**Breakdown:**
- Line 1 gives the primary action a pace qualifier (steadily, unhurried), which prevents an over-eager, unnaturally fast walk cycle.
- Line 2 explicitly anticipates the compositional consequence of the walk (he grows larger, background blurs), rather than leaving the model to infer that forward motion changes scale and focus. Naming the expected visual outcome directly tends to produce a more physically coherent result.
- Line 3 locks the one thing (expression) that could otherwise drift into an unwanted emotional read across the several seconds of the clip.
- Line 4 fixes the camera as the passive element, which is the correct choice for a portrait-to-approach shot where the camera's job is to receive the subject, not chase them.

### Template 5: First-frame-to-last-frame interpolation (both start_image and end_image supplied)

**Setup:** start_image is a wide shot of a car parked at the curb at dusk. end_image is the same framing, same car, but headlights on and the sky noticeably darker.

**Prompt:** "The scene transitions from dusk to early night. The headlights switch on partway through, casting a warm glow onto the road ahead. The sky gradually deepens in color. The camera does not move."

**Breakdown:**
- No line describes either endpoint's specific look (the exact color of the car, the exact framing), because both are already fixed by the two supplied images. The prompt's only job is the path between them.
- "Partway through" gives the model a rough temporal cue for when the headlights-on event should occur within the clip's duration, rather than leaving it ambiguous whether that event should happen at the start, middle, or end.
- "The camera does not move" removes camera behavior as a variable, which is standard practice for FLF2V shots per platform guidance that recommends keeping first/last-frame prompts to one clear change rather than several competing ones `[SOURCED]`.
- Per platform guidance, the two source images should share aspect ratio and be reasonably similar in composition, since large compositional differences between start and end risk an unwanted "lens switch" artifact rather than a smooth interpolation `[SOURCED]`.

### Template 6: Environmental/atmospheric animation on an otherwise still landscape

**Prompt:** "Wind moves gently through the tall grass in the foreground, causing it to sway and ripple. Distant clouds drift slowly across the sky from left to right. The mountains, the lake, and the framing remain completely static. No camera movement."

**Breakdown:**
- Two distinct atmospheric motions are named separately (grass, clouds) rather than a single vague instruction like "add wind," which risks the model choosing arbitrary, possibly conflicting things to animate.
- Direction is specified for the clouds (left to right) to prevent an ambiguous or reversed drift.
- The stillness lock names the specific large static elements (mountains, lake, framing) rather than a vague "everything else stays the same," because explicit naming of the big, easily-disturbed landscape elements reduces the odds of unwanted parallax or geological "breathing" that some models introduce on wide static landscapes.

---

## A6. The tool and engine landscape

### A6.1 Runway

Runway's image-to-video treats the uploaded image as the literal first frame, and its official prompting guide states the prompt's job is to describe motion, camera work, and temporal progression, not to re-describe the image `[SOURCED]`. Runway's distinguishing feature is **Motion Brush**, a region-specific motion painting tool: rather than describing an element in words and hoping the model correctly isolates it, the operator paints directly over the region of the image that should move and assigns it a motion vector. The Multi-Motion Brush extension allows different motion vectors to be assigned to multiple distinct painted regions within a single frame, for example painting a waterfall to flow downward while separately painting rising mist to drift upward in the same shot `[SOURCED]`. Motion Brush is the closest thing in this craft to literal, spatial motion instruction, as opposed to describing motion in language and trusting the model to find the right pixels.

### A6.2 Kling

Kling's image-to-video supports both the standard single-image start_image case and, from Kling 3.0 onward per the grounding data for this document, a first/last-frame (FLF2V) mode that accepts both start_image and end_image together and interpolates the motion between them `[SOURCED, per grounding data]`. Kling's prompting guidance recommends motion-only prompts, use of built-in camera movement controls over free text where available, and keeping instructions to one clear action `[SOURCED]`.

### A6.3 Luma Dream Machine

Luma's equivalent mechanism is called **keyframes**: a start frame and an end frame, either uploaded or generated in-app, with an optional text prompt to guide the transition between them `[SOURCED]`. Functionally this is the same technique as Kling's FLF2V under different product naming, and the same craft principles apply (similar compositions transition more predictably than dissimilar ones, and the prompt should describe the path, not either endpoint).

### A6.4 Pika

Pika's distinguishing feature is **Scene Ingredients**, a semi-structured prompting approach that separates a prompt into discrete fields (objects, characters, environment, mood) rather than a single unstructured sentence, intended to give the model more precision and produce more consistent results `[SOURCED]`. For image-to-video specifically, Pika's own guidance notes that starting from an image "reduces guessing and stabilizes the scene" `[SOURCED]`, which is the same start_image discipline as every other platform in this landscape.

### A6.5 Hailuo / MiniMax

Hailuo (MiniMax) is described in independent guidance as fundamentally a "Director's AI" that "wants a script, not a checklist," with an LLM backbone that responds well to narrative flow and temporal relationships `[SOURCED]`. Its **Subject Reference** feature accepts a close-up reference image (typically a face) alongside the main prompt specifically to hold subject identity consistent across generations, which functions similarly to the `image_references` role described in A3, distinct from the literal first-frame `start_image` role `[SOURCED]`. Hailuo's own guidance is explicit that describing static elements already visible in the source image "wastes tokens and confuses the motion generator" `[SOURCED]`, the clearest single statement of this entire craft bible's core discipline found anywhere in the research for this document.

### A6.6 The Higgsfield-hosted roster

Per the grounding data fetched live from the connected Higgsfield MCP on 2026-07-26, the majority of Higgsfield's video models expose `start_image` and/or `end_image` as their image-to-video mechanism: cinematic_studio_3_0, cinematic_studio_video, cinematic_studio_video_v2, minimax_hailuo, seedance1_5, seedance_2_0, seedance_2_0_mini, kling2_6, kling3_0, kling3_0_turbo, happy_horse_video, grok_video, grok_video_v15, veo3, veo3_1, veo3_1_lite, and wan2_7. Kling3_0 supports both start_image and end_image together, i.e. the FLF2V technique described in A3.1. grok_video_v15 is explicitly described in its own model documentation as a model that "animates one start image into cinematic video with native audio direction," making it a specialist for start-image animation with a built-in audio layer rather than a general free-text image-to-video model. The reference-input picture is more nuanced than a single grouping, and the corrected matrix in A3 is the authoritative version: `gemini_omni` and `wan2_6` expose `image_references` and `video_references` but no frame conditioning at all, `wan2_6` additionally exposes `audio_references` while `gemini_omni` does not, `wan2_7` inverts this by exposing `start_image`, `end_image` and `audio_references` but no loose references, and the `seedance_2_0` pair is the only family exposing all five roles at once. That last fact is why Seedance 2.0 is the default whenever a shot must be frame-locked, identity-consistent and audio-synced simultaneously. Higgsfield's dedicated `higgsfield_preset` system, covered in A4, sits alongside this roster as the templated alternative to free-text prompting on any of these models.

---

## A7. Multi-shot continuity built from image-to-video specifically

A sequence of several seconds each, generated shot by shot from image-to-video, can be built into a continuous-feeling scene using a chaining technique that has no equivalent in pure text-to-video work, because it depends entirely on the still-image input mechanism.

**The chain:**

1. Generate or select a strong reference still for shot 1 (cross-reference the image-generation craft bible in this series for still-image prompt discipline).
2. Animate that still using image-to-video, per the motion-only discipline in A2.
3. Extract the last frame of the resulting clip. Most editing tools and several generation platforms expose a "grab last frame" or frame-export function; where that is not available, a screenshot at the final timecode of the rendered clip works, ideally taken at the highest resolution export available.
4. Use that extracted last frame as shot 2's `start_image` (or as shot 1's `end_image` if the model supports FLF2V and both shots are being planned together in advance, per A3.1).
5. Animate shot 2 from that frame.
6. Repeat for each subsequent shot.

The result is a sequence where every cut is visually anchored: shot 2 opens exactly where shot 1 ended, because it was generated from that exact frame, not from a fresh, independently-prompted still that merely resembles it. This is meaningfully stronger continuity than generating each shot from scratch and hoping the subject, wardrobe, and environment happen to match closely enough across independent generations. It is also the only reliable way to guarantee visual continuity when the underlying model has no persistent "character" or "world" memory across separate generation calls, which is the normal case for most of the tools covered in this document.

The discipline this requires on the operator's side is a written log: which still fed which shot, which frame of which clip was extracted to feed the next shot, and what prompt was used at each link in the chain. See B3 for the exact log format, which mirrors the self-contained-record discipline used in the production bible craft bible elsewhere in this series.

---

## A8. Vocabulary glossary

| Term | Definition |
|---|---|
| First-frame conditioning | Providing an image (start_image) that the model treats as the literal opening frame of the generated clip, and animates forward from. |
| Last-frame conditioning | Providing an image (end_image) that the model treats as the literal closing frame, used together with a start_image so the model interpolates the motion between the two. |
| Motion brush | Runway's region-specific motion painting tool: painting directly over a part of the image and assigning it a motion vector, rather than describing that region in words. |
| Frame interpolation | The technique of generating the motion path between two known, fixed images (start and end), as opposed to generating motion forward from a single known image with an unconstrained ending. |
| Motion prior | The model's learned default assumption about how a given kind of scene or subject tends to move, absent explicit instruction. Eager, over-general motion priors are the source of unwanted animation when a prompt fails to specify what should stay still. |
| Templated generation | Using a pre-built, curated motion recipe (a named preset keyed to a preset_id) rather than writing a free-text motion prompt. Trades creative control for reliability. |
| Region-specific motion | Motion instruction scoped to a specific painted or masked area of the frame rather than to the frame as a whole, the mechanism behind Motion Brush and Multi-Motion Brush. |
| Image references | An input role, distinct from start_image, in which an image informs style or subject identity without being the literal first frame of the output. |
| Scene ingredients | Pika's semi-structured prompting format, separating a prompt into discrete fields (object, character, environment, mood) rather than one unstructured sentence. |
| Subject reference | Hailuo/MiniMax's mechanism for holding a subject's identity consistent across a generation using a dedicated reference image, functionally adjacent to image_references. |

---
---

# PART B. AGENT OPERATING MANUAL

This part is written for an AI agent that has been asked to animate a reference still into a video clip, whether as a one-off social asset or as one link in a multi-shot sequence. It assumes the agent has already read Part A and understands the motion-only discipline, the three input roles, and the templated-versus-free-text choice.

## B1. The exact questions to ask before animating a reference image

Do not generate on the first request. A request to "animate this image" is underspecified in exactly the ways that cause wasted generations. Ask, or reason through if the requester is unavailable, all four of the following before writing a prompt or choosing a preset:

1. **What specifically should move, and what must stay locked?** If the requester has not said, do not guess with a blanket instruction. Ask which element is the point of the animation (a face, a product, an environment, the camera itself) and confirm that everything else should default to frozen. Absent an explicit answer, the safe default is minimal motion plus an explicit stillness lock on everything not named, because over-animation is a harder failure to walk back than under-animation (under-animation just needs a stronger prompt on the next pass; over-animation often needs a different generation strategy entirely, such as Motion Brush, to correct).

2. **Is this a standalone clip, or does it need to hand off to another shot?** This determines whether the job is a simple single-image animation or whether it needs to be planned as a link in a chain (see B3), which changes what frame the clip needs to end on and whether end_image/FLF2V mode should be used from the start rather than bolted on after the fact.

3. **Is a proven preset template appropriate, or does this need bespoke motion?** Check the goal against the templated-versus-free-text logic in A4.1. If the creative goal matches a named, existing preset closely, default to the preset, it is lower-risk and faster. If the goal is brand-specific, narratively specific, or restrained in a way presets are not built for, use free-text and budget for iteration.

4. **Does the next shot need this clip's last frame as its own start_image (or end_image)?** If yes, plan the extraction step before generating, confirm what resolution/format the last frame needs to be exported at, and log the dependency (see B3) so the chain does not silently break if this clip gets regenerated later.

## B2. Reusable motion-prompt-construction template

Use this skeleton to build a free-text motion prompt. It is deliberately structured so that re-describing the image (composition, subject appearance, lighting, framing) never sneaks back in.

**Skeleton:**

```
[PRIMARY MOTION]: [named element] [action verb] [speed/intensity qualifier].
[SECONDARY MOTION, optional]: [named element] [action verb] [speed/intensity qualifier].
[CAMERA]: [camera behavior, one clear instruction] OR [camera does not move].
[STILLNESS LOCK]: [named element(s) that must not move] remain(s) [static/frozen/unchanged].
[PHYSICS CUE, optional]: [expected physical consequence of the primary motion, named explicitly].
```

**Worked fill, example A (product hero shot):**

```
PRIMARY MOTION: the watch rotates slowly on its vertical axis, a full 360-degree turn.
CAMERA: static, does not move.
STILLNESS LOCK: the background and the surface beneath the watch remain completely static.
PHYSICS CUE: light reflects naturally across the watch face and metal band as it turns.
```

**Worked fill, example B (talent close-up for a brand film opener):**

```
PRIMARY MOTION: he turns his head slowly from profile to face the camera.
SECONDARY MOTION: a slight, genuine smile forms as he completes the turn.
CAMERA: static, does not move.
STILLNESS LOCK: the background, his posture, and his clothing remain unchanged throughout.
PHYSICS CUE: highlights shift across his cheekbone and jaw as the angle to camera changes.
```

**Why this skeleton works:** every line has a job, and none of the jobs is "describe what the image already shows." An agent using this skeleton should refuse to fill in any line with information already visible in the reference image (hair color, clothing description, background contents, lighting setup) and should treat the temptation to add that information as a signal that the actual motion instruction is under-specified and needs more thought, not more restated context.

## B3. The shot-chaining protocol

When a sequence is being built entirely from image-to-video links (per A7), maintain a written log for the whole sequence. This mirrors the self-contained-record discipline used elsewhere in this series for production locks and decision records: anyone picking up the sequence later, including a future instance of this agent with no memory of the session that built it, must be able to reconstruct exactly which frame fed which shot without re-deriving it from the rendered footage.

**Log format, one row per shot:**

| Shot ID | Source still / extracted frame | Extraction method + timecode (if applicable) | Model / preset used | Prompt or preset_id | start_image used | end_image used (if any) | Output clip location | Last frame extracted for next shot? |
|---|---|---|---|---|---|---|---|---|
| SHOT_01 | Reference still generated fresh | n/a | kling3_0, free-text | "[full prompt text]" | reference_still_01.png | none | shot_01_output.mp4 | Yes, frame at 00:03:24 |
| SHOT_02 | Extracted last frame of SHOT_01 | Exported at 00:03:24, full-res PNG | kling3_0, free-text | "[full prompt text]" | shot_01_lastframe.png | none | shot_02_output.mp4 | Yes, frame at 00:04:01 |
| SHOT_03 | Extracted last frame of SHOT_02, planned FLF2V with a new end frame | Exported at 00:04:01, full-res PNG | kling3_0, FLF2V mode | "[transition-only prompt text]" | shot_02_lastframe.png | new_end_frame_03.png | shot_03_output.mp4 | No, sequence ends here |

**Protocol rules:**
- Every extracted frame gets a filename and a stored location before the next shot is generated, never "I'll grab it later." Clips get regenerated, re-cropped, and overwritten; a frame extracted after the fact from a file that has since changed is not reliable.
- Log the full prompt or preset_id verbatim, not a paraphrase. If a shot needs regenerating six weeks later, the exact prompt is the only way to reproduce or deliberately vary the result.
- If any shot in the chain is regenerated, every downstream shot that depended on its extracted last frame is now stale and must be flagged for review, even if the new version looks similar. A frame that looks similar to a human eye is not guaranteed to be similar enough for a model performing FLF2V interpolation.
- Note the model/version explicitly. Model versions change their motion behavior between releases; a chain built on one version's frame-to-frame results does not guarantee that a re-generation on a newer version will interpolate the same way.

## B4. Model and approach selection logic

| Goal | Best-fit tool/approach | Why |
|---|---|---|
| Subtle living-portrait effect (breath, blink, minimal motion) | Free-text prompting on a general model (Runway, Kling, Hailuo), using the stillness-lock discipline heavily | Requires fine control over exactly what tiny motion happens and what stays frozen, which presets are not built for. |
| Camera-only motion around a static subject | Free-text with explicit camera vocabulary, OR Higgsfield's ORBIT 360 preset if the exact effect matches | If a full-circle or fixed-arc orbit is the whole ask, the preset is faster and lower-risk. If a partial, specifically-angled, or non-orbital camera move is needed, free-text with dedicated camera controls (Kling, Runway) is the better fit. |
| Precise first-to-last-frame interpolation | Kling 3.0 FLF2V, or Luma Dream Machine keyframes | Both explicitly support supplying both a start and end image, and both have platform-native guidance on how to prompt the transition rather than either endpoint. |
| Viral / templated effect (turning into a sticker, action figure, ice statue, CGI breakdown, etc) | Higgsfield preset system (higgsfield_preset) | These are pre-solved, named recipes for exactly this class of effect. Writing a free-text prompt to reinvent a known trend effect is slower and less reliable than using the validated template. |
| Bespoke, complex, brand-specific motion with no existing analogue | Free-text prompting, budgeted for multiple iterations, possibly with Motion Brush if region-specific control is needed | No preset will match a genuinely novel brief. Region-specific painting (Runway Motion Brush) is the strongest tool when different parts of the frame need different, independently-controlled motion. |
| Fastest and cheapest acceptable result, quality bar is low | Preset-routed generation on whichever platform the operator already has credits for | Minimizes iteration count, which is the main cost driver in image-to-video work (see Part C). |
| Multi-shot continuity/handoff between clips | Free-text, generally with FLF2V for the final link in a chain wherever the next shot's opening frame is creatively fixed in advance | Presets are self-contained effects, not designed to end on a controllable, reusable handoff frame. |

## B5. Failure modes and tells

**Re-describing the subject instead of specifying motion.** The prompt spends its length restating hair color, clothing, background, and framing that the image already shows, and gives the model little or no explicit motion instruction. Tell: the output looks like the still image with minor, unpredictable drift rather than deliberate animation, or the subject's appearance visibly shifts away from the reference, because the restated description competed with the image as a source of truth.

**Forgetting to specify what must stay still.** The prompt names the intended motion but never locks anything down. Tell: unwanted secondary animation appears everywhere, background elements sway, unrelated objects shift, text or logos warp, none of which were asked for and all of which the model added because an eager motion prior filled the silence.

**Chaining shots without extracting a clean handoff frame.** A sequence is built by generating each shot from a fresh, independently-prompted still that merely resembles the previous shot's ending, rather than from the actual extracted last frame. Tell: visible discontinuity at the cut, a slightly different wardrobe detail, a slightly different head angle, a slightly different lighting state, none of them individually glaring but all of them adding up to a sequence that reads as several different generations stitched together rather than one continuous scene.

**Choosing free-text prompting when a proven preset would have been safer.** The goal matches an existing named preset closely, but the operator writes a bespoke prompt anyway, burning iterations trying to hand-recreate an effect the platform had already solved. Tell: multiple generation attempts that each get closer to, but never quite match, a well-known effect that a preset would have delivered correctly on the first try.

**Overloading a single prompt with competing camera and subject instructions.** The prompt asks for a push-in, a handheld sway, and subject motion all at once. Tell: the resulting camera move reads as vague or directionless, an averaged compromise between instructions rather than a clean execution of any one of them.

## B6. Trigger list: what forces a motion-prompt rebuild

- **The source reference image changes.** A new still, a re-crop, a re-grade, or any pixel-level change to the start_image invalidates the existing motion prompt's assumptions about composition and framing. Rebuild, do not reuse blindly.
- **The next shot's requirements change.** If a downstream shot's needs shift (a different opening composition, a different pacing, a different aspect ratio), the current shot's end_image or its intended last-frame extraction point must be reconsidered, since the whole point of the chain in A7/B3 is that each link is built to serve the next one.
- **A shift from single-image to first/last-frame mode, or vice versa.** These are different generation tasks with different prompting rules (A3.1). A prompt written for single-image animation describing an open-ended motion will not transfer cleanly to FLF2V mode, which needs a prompt describing only the transition between two fixed points, and vice versa.
- **A platform or aspect-ratio change.** Moving the same creative brief from one model to another, or changing the target aspect ratio mid-sequence, can break FLF2V mode specifically, since start and end frames are expected to share aspect ratio for reliable interpolation (A3.1), and it can change which camera-control vocabulary is native versus which needs to be spelled out in free text (A6).

---
---

# PART C. DATED COST SNAPSHOT (as of 2026-07-26, refresh before relying on for budgeting)

AI generation pricing across every platform in this document changes on the order of weeks, driven by new model releases, new tiers, and competitive repricing. Every figure below is dated 2026-07-26 and must be re-verified against the platform's live pricing page before it is used in a client quote, an internal cost model, or any budgeting decision. Treat this section as a starting point for a fresh check, not as a number to copy into a spreadsheet unverified.

## C1. Higgsfield (verified live via connected MCP on 2026-07-26)

This is the one pricing set in this document confirmed directly against a live source at time of writing, rather than aggregated from third-party commentary.

| Plan | Monthly price | Annual price | Credits included |
|---|---|---|---|
| PLUS | $49/mo | $39/mo (billed annually) | 1,000 credits |
| ULTRA | $129/mo | $99/mo (billed annually) | 3,000 credits |

**One-time top-up packs:**

| Credits | Price |
|---|---|
| 500 | $26 |
| 1,000 | $49 |
| 2,000 | $95 |
| 4,000 | $190 |

**Blended usage estimate:** Higgsfield's own tooltip guidance places roughly 200 videos per 1,000 credits as a blended estimate. This is explicitly a blended figure across the whole model roster, not a per-model number, and it should not be treated as the cost of any specific model, resolution, or duration.

**Known limitation, stated plainly:** exact per-model, per-resolution, per-duration credit cost for image-to-video specifically is not exposed through the current Higgsfield interface. An operator cannot currently look up, for example, "how many credits does a 5-second kling3_0 image-to-video generation at 1080p cost" as a discrete number, only the blended 200-videos-per-1,000-credits estimate across the whole roster. This is a real limitation of the interface as it stands on 2026-07-26, not an oversight in this document, and it should be flagged to anyone doing per-shot cost modeling against Higgsfield credits.

## C2. Other platforms (aggregated from third-party sources, largely UNVERIFIED)

The figures below were gathered from aggregator and comparison sites during research for this document, not from each platform's own live pricing page at the time of writing. They are directional only, and several carry meaningful uncertainty about which tier, resolution, or model version they actually describe. Every figure in this subsection is tagged `[UNVERIFIED]` and must be checked against the platform's own current pricing page before use.

| Platform | Reported figure | Status |
|---|---|---|
| Runway | Tiers reported as roughly Free / Standard around $12 per month / Pro around $28 per month / Unlimited around $76 per month, plus enterprise options | `[UNVERIFIED]`, aggregator-sourced, exact credit-per-second cost for image-to-video not confirmed |
| Kling | Entry paid tier reported around $7.99 per month, with a per-second generation cost reported around $0.07 per second in some comparisons | `[UNVERIFIED]`, figures came from a comparison blog rather than Kling's own pricing page |
| Luma Dream Machine | Plus tier reported around $30 per month; a "Pro" per-video cost around $0.075 was cited at high volume in one comparison | `[UNVERIFIED]`, high variance across sources, tier names and inclusions not independently confirmed |
| Pika | Entry paid tier reported starting around $8 per month | `[UNVERIFIED]`, no confirmed per-generation image-to-video cost found |
| Hailuo / MiniMax | No reliable subscription or per-generation figure could be confirmed during research for this document | Not stated, flagged as a gap rather than guessed |

**Free tier notes (directional, unverified):** aggregator commentary describes daily or one-time free credit allowances on several platforms (for example, a Kling daily free-credit allowance, a Runway one-time free credit allowance, and limited free monthly usage on Pika and Luma), each typically watermarked and/or capped in resolution or priority. None of these free-tier figures were confirmed against a primary source and should not be relied on for planning a paid production workflow.

## C3. What this means for budgeting a job today

- **Do not quote a client off this document's numbers.** Re-fetch Higgsfield's live plan and credit pricing, and re-check each other platform's own pricing page, on the day the quote is prepared.
- **Model the real cost driver: iteration count, not sticker price.** Because free-text motion prompting (A4) routinely needs several generations to land a result, and because over-animation or under-specified stillness locks (B5) are a leading cause of wasted generations, the practical cost of an image-to-video shot is heavily a function of prompt discipline, not just the platform's per-credit or per-second rate. A well-built prompt using the A2 motion-only discipline and the B2 skeleton will generally need fewer regenerations than an ad hoc one, and that difference matters more to the actual bill than which platform's headline price is marginally lower.
- **Templated generation (A4) has a more predictable cost profile than free-text.** Because a preset is pre-validated, it typically needs fewer retries to reach an acceptable result, which makes its effective cost more predictable even where its nominal per-generation credit cost is similar to a free-text generation on the same platform.
- **Set a recurring reminder to re-run this snapshot.** Given the pace of change in this market, this cost section should be treated as stale within a matter of weeks of 2026-07-26, and a fresh pull of live pricing (via the connected Higgsfield MCP where available, and via direct pricing-page checks for every other platform) should precede any budgeting decision of consequence.
