# GENERATION AI TOOLCHAIN: EXECUTION EXTRACT

**Source bibles:** 19 (AI Image Generation), 20 (AI Text-to-Video), 21 (AI Text-to-Audio / Sound Design), 22 (AI Arabic and English VO), 23 (AI Image-to-Video), 24 (AI Text-to-Music).
**Extracted:** 2026-07-26. All Higgsfield model capability claims below are the CORRECTED, verified matrix from the `models_explore` live schema fetch of 2026-07-26 as recorded in bibles 20 and 23.
**Purpose:** this file is built to be wired directly into an execution skill. Prompt templates and worked examples are reproduced verbatim. Do not paraphrase them when firing a generation.
**Cost data is deliberately excluded.** Part C of every source bible is dated and stale-by-design; re-fetch live before any budget answer.

---
---

# SECTION 1: STILL IMAGE GENERATION (Bible 19)

## 1.1 Prompt construction template (verbatim, Bible 19 B2)

Fill in each bracket; leave a bracket empty and delete its clause only if you have deliberately decided it does not matter for this shot (per the A2 "would the image change" test).

```
[SHOT SIZE / FRAMING] of [SUBJECT: concrete description, age/material/condition/distinguishing detail],
[ACTION OR POSE], in [ENVIRONMENT: location, time of day, weather/atmosphere].
Shot on [FOCAL LENGTH]mm lens at [APERTURE], [DEPTH OF FIELD DESCRIPTION].
Camera at [ANGLE/HEIGHT].
Lighting: [KEY LIGHT direction/quality], [FILL/RIM if any], [COLOR TEMPERATURE], [NAMED LIGHTING STYLE if applicable].
Color palette: [2-4 named colors or a described grade].
Mood/atmosphere: [1-3 words], [supporting texture detail].
Reference: [named film/photographer/era/style, used specifically, not vaguely].
Negative prompt: [explicit list of unwanted elements/artifacts].
Aspect ratio: [X:Y]. Resolution target: [1K/2K/4K or exact pixel dimensions].
```

### The ten canonical clause slots (Bible 19 A2), in the order they tend to be written

1. **Subject** (age, build, expression, wardrobe, distinguishing detail)
2. **Action / pose** (mid-motion or held; stills still need a verb)
3. **Environment** (location, set dressing, time of day, weather)
4. **Lighting description** (direction: key/fill/rim/back; quality: hard/soft/diffused/harsh; color temperature; named style: chiaroscuro, Rembrandt, high-key, low-key, practical-only)
5. **Lens / camera language** (focal length, aperture, camera angle and height, shot size)
6. **Color palette** (named colors or a described grade)
7. **Mood / atmosphere** (emotional register in one or two words plus supporting texture)
8. **Art direction references** (named film stocks, photographers, directors, eras: a compass, not a costume)
9. **Negative prompting** (explicit list of what must not appear; know whether your engine has a dedicated negative channel or takes it as prose)
10. **Aspect ratio and resolution** (decided before the first draft, because it changes what the model composes into frame)

**Sanity check on any prompt:** read it back and ask "if I removed this clause, would the image change in a way I'd notice?" If no, it is filler and can be cut.

## 1.2 Worked fill of the template (verbatim, Bible 19 B2)

Worked fill (a mid-shoot cutaway for a fictional documentary-style piece, not tied to any real project):

```
Medium close-up of a research scientist in her forties, silver-streaked hair pulled back,
wearing a plain lab coat over a grey sweater, hands resting on a lab bench covered in
handwritten notes, in a sunlit university laboratory, late afternoon, dust visible in
the light shafts through tall windows.
Shot on 50mm lens at f/2.2, moderate depth of field, bench sharp, background softly blurred.
Camera at eye level, slightly off-center composition.
Lighting: soft key light from the window camera-right, gentle warm fill bounced from the
bench surface, natural daylight color temperature, high-key documentary style.
Color palette: warm neutral tones, soft cream and grey, single muted green accent from a
plant on the windowsill.
Mood/atmosphere: quiet focus, unhurried, genuine; dust motes visible in the light.
Reference: in the style of an observational science documentary still, not staged.
Negative prompt: no lab coat wrinkling artifacts, no extra fingers, no text on papers
legible enough to misread, no overly dramatic lighting, no smiling at camera.
Aspect ratio: 3:2. Resolution target: 2K.
```

## 1.3 The six worked example prompts (verbatim, Bible 19 A3)

These are proven templates. Fire them as-is or swap only the bracketed specifics.

**Template 1: Moody character portrait**

> "Close-up cinematic portrait of a weathered fisherman in his sixties, deep creases around his eyes, salt-and-pepper stubble, wearing a faded yellow oilskin jacket beaded with sea spray. He looks slightly past camera, jaw set, not smiling. Shot on an 85mm lens at f/1.8, shallow depth of field, background a soft blur of a foggy harbor at dawn. Single hard rim light from behind separating him from the fog, dim cool blue fill from camera left, otherwise low-key lighting. Desaturated teal-and-grey palette with a single warm highlight on his face. Mood: solitary, weathered, quietly proud. In the style of a National Geographic environmental portrait. Negative prompt: no text, no logo, no extra fingers, no oversharpened skin texture, not smiling. Aspect ratio 4:5."

**Template 2: Wide establishing / environment shot**

> "Extreme wide establishing shot of a rain-soaked megacity intersection at night, neon signage in Mandarin and English reflecting on wet asphalt, a lone figure with an umbrella crossing in the foreground, tiny against the scale of the buildings. Shot on a 24mm wide-angle lens, deep focus, everything sharp from foreground to the towering signage. Camera at street level, slight low angle looking up to emphasize the height of the buildings. Color palette: saturated magenta and cyan neon against a near-black wet street, Blade-Runner-adjacent but with recognizable East Asian signage rather than invented glyphs. Atmosphere: steam rising from a street vendor cart, light drizzle visible in the neon glow. Negative prompt: no readable brand logos, no gibberish text on signs unless illegible at this distance, no daytime lighting leaking in. Aspect ratio 21:9."

**Template 3: Product hero shot**

> "Studio product hero shot of a matte black wireless earbuds case, lid open, earbuds nestled inside, floating at a 45-degree angle against a deep charcoal gradient background. Softbox lighting from camera left with a large soft key, subtle rim light from behind to separate the product edge from the background, no harsh reflections on the glossy earbud surface beyond one controlled highlight streak. Shot as if on a 100mm macro lens, product tack-sharp, background falling into a smooth gradient blur. Color palette: charcoal, matte black, single accent of electric blue from the case's status LED. Clean commercial mood, no props, no hands, no environment, pure product isolation. Negative prompt: no dust, no fingerprints, no visible seams or manufacturing defects, no text or logo unless specified, no reflections showing studio equipment. Aspect ratio 1:1."

**Template 4: Diagram / text-rendering-heavy image**

> "Clean infographic-style diagram on a white background titled 'THE FOUR STAGES OF ONBOARDING' in bold sans-serif black text at the top. Below it, four vertical panels each containing a simple flat icon and a one-line caption in the same sans-serif font: Panel 1 icon of a handshake, caption 'WELCOME'. Panel 2 icon of a document with a checkmark, caption 'PAPERWORK'. Panel 3 icon of a laptop, caption 'SETUP'. Panel 4 icon of two people talking, caption 'FIRST WEEK'. Flat vector illustration style, minimal color palette of navy blue, white, and one orange accent. All text must be spelled exactly as written above, legible, no distorted or invented characters. Negative prompt: no photorealistic elements, no gradients, no extra decorative text, no misspelled words. Aspect ratio 16:9."

**Template 5: Stylized / illustrative image**

> "Hand-painted gouache illustration of a small coastal town at golden hour, terracotta rooftops cascading down a hillside toward a turquoise bay, laundry lines strung between buildings, a single fishing boat on the water. Loose, visible brushstrokes, warm limited palette of terracotta, ochre, and turquoise with soft white highlights. Painterly light, no photographic detail, no hard edges, flattened perspective in the style of a mid-century travel poster illustrator. Negative prompt: no photorealism, no 3D rendering, no digital airbrush smoothness, no visible AI artifacts in the brushwork pattern. Aspect ratio 3:2."

**Template 6: Photorealistic UGC-style image**

> "Casual iPhone-style selfie of a young woman in her twenties, natural everyday makeup, wearing a plain white t-shirt, standing in a sunlit bathroom holding up a small skincare bottle at chest height so the label faces camera, genuine candid smile, slightly imperfect framing as if shot handheld, natural window light from the side with soft shadows, minor skin texture and pores visible, no studio retouching, no professional lighting rig, authentic phone-camera color rendering with a touch of natural warmth. Negative prompt: no studio lighting, no airbrushed skin, no professional makeup, no perfect symmetry, no visible camera or tripod, no overly staged pose. Aspect ratio 9:16."

## 1.4 Model selection decision table (verbatim, Bible 19 B4)

| Creative goal | Best-fit model(s) from the landscape | Why |
|---|---|---|
| Photoreal character portrait, moody/cinematic | Midjourney, FLUX Pro/Max, Higgsfield Soul Cinema | Strongest painterly-to-photoreal lighting control and aesthetic default |
| Diagram, infographic, or in-image typography | GPT Image family, OpenAI Hazel, Nano Banana Pro, Ideogram | Purpose-built or best-in-class text/layout rendering |
| Product ad / brand-kit-aware hero shot | Recraft (vector/logo work), Marketing Studio / ms_image (brand-kit folding), FLUX Pro (photoreal product) | Precise palette/logo control or brand-asset awareness baked into the tool |
| Stylized / illustrative image | Midjourney, z_image (fast/cheap stylized), Recraft (vector illustration) | Strongest non-photoreal aesthetic defaults |
| Fast iteration / cheap drafts before committing | Nano Banana (base), z_image, FLUX Schnell | Explicitly the budget/speed tier in their respective families |
| Final 4K client deliverable | Nano Banana Pro, Cinema Studio 2.5, Seedream (4K-6K), FLUX Max, plus a Topaz/bytedance upscale pass if source resolution falls short | Native high-resolution output tiers, or dedicated upscaling to bridge a strong low-res draft |
| Recurring character across many images | Higgsfield Soul/Soul Cast (`soul_id`), Midjourney `--cref`, a trained SD LoRA | Purpose-built identity persistence rather than a single reference image |
| Recurring location/environment across many images | Higgsfield `soul_location`, ControlNet + IP-Adapter (SD ecosystem) | Purpose-built or structural consistency for backgrounds/sets |

### Supporting engine landscape (Bible 19 A4, condensed to the routing-relevant axis)

| Engine | Best at | Falls short at |
|---|---|---|
| Midjourney | Painterly, atmospheric, art-directed images; mature `--cref`/`--sref` consistency system | Precise text rendering; prompt-literal adherence; no first-party API |
| DALL-E / GPT Image family (OpenAI) | Instruction-following, in-context editing, text/typography; diagrams, infographics, logo-adjacent work | Photographic "epic" cinematic look; per-image cost at high quality tiers |
| Stable Diffusion ecosystem (SDXL, SD3.5, forks) | Total control: open weights, ControlNet/LoRA/IP-Adapter for exact pose, depth, identity | Out-of-box aesthetic varies by checkpoint; requires real technical setup |
| Google Nano Banana / Nano Banana Pro / Imagen | Nano Banana Pro leads on in-image text, diagram rendering, multi-image consistency; strong image-to-image editing | Base/lite trades quality for speed; less painterly default than Midjourney |
| Black Forest Labs FLUX (Pro/Flex/Max/Schnell/Dev) | Prompt adherence and photorealism at speed; Flex exposes sampling controls; Dev is open-weight | Neutral/photographic aesthetic defaults; pricing scales with megapixels |
| Ideogram | Best-in-class typography and logo/text-in-image accuracy | Photographic realism and cinematic lighting nuance |
| Recraft | Vector output, icon and logo generation, precise brand color-palette control | Not built for photoreal cinematic scenes |
| Leonardo.Ai | Accessible all-in-one workflow, large model library | No standout ceiling feature |
| Adobe Firefly | Creative Cloud integration; commercially "safe" training data claims | Raw aesthetic ceiling and prompt adherence trail frontier models |
| Bytedance Seedream (v4/v4.5/v5) | 4K-6K resolution with instruction-based editing and multi-image referencing | Thinner Western documentation and prompt libraries |
| Higgsfield-hosted (Soul / Soul Cinema / Soul Cast / Cinema Studio) | Recurring characters, locations, cinematic stills via `soul_id`; brand-kit-aware batch product ads via Marketing Studio | Hosted layer, ceiling bounded by the base model it wraps; opaque per-model credit pricing |

### Aspect ratio as a pre-generation decision (Bible 19 A7)

| Deliverable | Typical ratio | Why it is chosen before generation |
|---|---|---|
| Instagram/TikTok Reel, Story | 9:16 | Needs a vertically-composed subject; horizontal ideas cropped to 9:16 lose most of the frame |
| Instagram feed post, product hero | 1:1 or 4:5 | Centered, symmetrical compositions read best; 1:1 safest default for e-commerce |
| Cinema title card, widescreen key art | 21:9 (or 2.39:1) | Needs environmental storytelling that fills the width |
| Standard streaming/TV frame | 16:9 | Default "cinematic but not extreme"; safest for diagram, slide, general landscape |
| Print poster, editorial spread | 3:2 or custom to page trim | Match the physical page before generating, since bleed and margin planning depends on it |

## 1.5 Consistency protocol (verbatim, Bible 19 B3)

Use this sequence whenever more than one image in a set must share a character, product, or world. Skipping steps is the single most common cause of a client-facing batch coming back with visibly "different person in every photo."

1. **Build the reference set first, before any shoot prompt is written.** Generate (or gather, if a real photo exists) three to five reference angles: front, three-quarter, profile/back, and if relevant a full-body or full-product view. Treat this step as its own deliverable with its own review, not a throwaway.
2. **Choose and lock the identity mechanism for the whole shoot.** Decide up front which consistency technique this shoot will use (Midjourney `--cref`/`--cw`, a Higgsfield `soul_id`, a trained LoRA, or a native `image_references` array) and commit to it for every image in the set; switching methods mid-shoot re-introduces drift.
3. **Lock a seed where the tool supports it**, in addition to the identity mechanism, when reproducibility of a specific frame (not just the character) matters, e.g. re-running the same shot at a different resolution or fixing a small defect.
4. **Generate a small test batch (3-5 images) across a range of the poses/angles the full shoot will need, before committing to the full batch.** This surfaces identity drift, lighting inconsistency, or palette drift cheaply, while it is still 3-5 images to fix rather than 30.
5. **Verify identity drift explicitly.** Lay the test batch side by side and check: same facial structure/proportions (not just "similar-looking"), same product geometry and color, same environment/world details. Do not rely on a first impression; check specific features (nose shape, product logo placement, wall color) against the reference sheet.
6. **Correct before scaling up, not after.** If drift is found, the fix is almost always to strengthen the reference set (add an angle that is clearly missing) or increase the identity weight/strength parameter, not to write a more detailed text prompt; text description rarely fixes an identity-lock problem because the model is already trying to follow the text, the reference channel is what is underperforming.
7. **Only then generate the full batch**, using the same locked identity mechanism, the same negative prompt discipline, and the same review pass (spot-check every image against the reference sheet, not just the first few).
8. **Archive the reference set and the identity ID/seed with the project files.** The whole point of building it once is to reuse it for every future image this character/product/world needs, including next month's follow-up shoot; losing track of the reference set means redoing step 1 from scratch.

### The four identity-lock mechanisms (Bible 19 A5)

1. **Midjourney `--cref` / `--sref`.** `--cref [image URL]` locks facial features, hair, and (depending on weight) clothing. `--cw [0-100]` controls enforcement: `--cw 100` (default) locks face, hair and clothes; `--cw 0` locks only the face, freeing the outfit per shot. `--sref [image URL]` with `--sw [0-1000]` (default 100) separately locks palette and rendering style and can be combined with `--cref` in the same prompt. Practical use: generate one strong anchor image first, then reuse its URL as `--cref` across every subsequent shot, lowering `--cw` when wardrobe or setting must vary.
2. **IP-Adapter / LoRA / ControlNet (Stable Diffusion ecosystem).** IP-Adapter steers generation toward a reference image's visual identity with no training step. LoRA is the heavier, tighter version: a small model fine-tuned on a handful to a few dozen images of a specific character, product, or style. ControlNet locks *structure* (pose skeleton, depth map, edge map) rather than identity, and is frequently combined: ControlNet fixes the pose, IP-Adapter/LoRA fixes the identity.
3. **Higgsfield `soul_id`.** `soul_2`/`soul_v2` and `soul_cinematic` both expose `soul_id`, creating and reusing a personalized character identity across many separate generations. `soul_cast` is built around "consistent cinematic character identity" with a tunable `budget` parameter (10-500). `soul_location` applies the same logic to environments and backgrounds. Functionally the productized equivalent of training a character LoRA.
4. **Native `image_references` inputs** (Nano Banana family, Seedream, FLUX). One or more reference images fed alongside the text prompt with no training step. Faster to set up than a LoRA, more flexible than a single locked `--cref`, but weaker at holding exact identity across a large batch because there is no persistent identity object.

**Reference sheet rule.** Never rely on a single reference image. Assemble a front-on face/product shot, a three-quarter angle, a profile or back view, and where relevant one full-body or full-product shot. Feed the *set*, not a single frame, into whichever consistency system is in use.

**Seed locking.** Locking the seed and holding the prompt constant reproduces the same image. Locking the seed and changing only one clause isolates the effect of that change, which is the fastest way to debug a prompt. Locking the seed across a shoot with a changing prompt can nudge compositional consistency, but is a much weaker consistency tool than a dedicated identity system and is not a substitute for one.

## 1.6 Failure modes and under-specification tells (Bible 19 B5)

- **Camera jargon the model quietly ignores.** Tell: two different lens descriptions in the same tool produce visually identical depth-of-field results. Fix: stop adding lens jargon, use compositional language the model does respond to ("background heavily blurred," "only the subject in focus").
- **A reference image fighting the text prompt.** Tell: the result looks like neither the reference nor the described scene. Fix: choose a reference shot in lighting closer to the target, or lower the reference/identity weight and accept looser identity match.
- **Aspect ratio decided after generation.** Tell: a composition that feels "cropped" rather than "composed"; a subject uncomfortably close to one edge, empty dead space. Fix: redo natively in the correct ratio rather than cropping.
- **Over-trusting a vague reference.** "Cinematic style," "epic," "high quality" are filler. Tell: removing the phrase changes nothing about the output. Fix: replace with a named, specific reference or cut it.
- **Text-heavy prompts on the wrong model.** Tell: garbled, misspelled, or dropped characters no matter how many times the prompt repeats the correct spelling. This is a model-selection problem, not a prompt problem. Route to a text-rendering specialist.
- **Skipping the test batch in a consistency shoot.** Tell: a full 20-image batch delivered with visible identity drift across half of them.

### Text/diagram prompting differs structurally (Bible 19 A6)
- Repeat and isolate the exact text; put the literal string in quotes and repeat that it must be spelled exactly as given.
- Describe layout explicitly and enumerate elements ("Panel 1... Panel 2..."), never a flowing paragraph.
- Choose the model before writing the prompt, not after.
- Expect more iteration; budget two or three regenerations and proofread at full resolution before delivery.

## 1.7 Regeneration trigger list (Bible 19 B6)

- **A brand palette change.** Every prompt template and reference sheet encoding the old palette needs revisiting; a palette clause update alone is not enough if reference images still show the old colors.
- **A new character joining an existing set.** Requires building that character's own reference set and identity lock from scratch before generating them alongside existing characters. Do not blend them in with a single added description.
- **A resolution or deliverable change.** Requires regenerating natively at the new target resolution/ratio or running a dedicated upscale pass. Not simply re-exporting larger.
- **A new required aspect ratio for an existing shot.** Requires a compositional rethink or an outpaint pass, not a crop.
- **Migration to a different model or engine.** Prompt vocabulary, negative-prompt behavior and reference mechanics differ across engines; rebuild using the new engine's actual mechanics rather than assuming portability.
- **A text/typography requirement added to a previously photoreal brief.** Forces a model-selection change and a prompt-structure change, not just an added clause.

---
---

# SECTION 2: TEXT-TO-VIDEO GENERATION (Bible 20)

## 2.1 Prompt construction template (verbatim, Bible 20 B2)

Use this skeleton for any new text-to-video prompt. Each row is a clause; fill every row deliberately, and leave a row explicitly empty (rather than omitting it) if that element genuinely does not apply, so a reviewer can tell "considered and skipped" from "forgotten."

| Slot | Instruction | Worked fill (example: a coffee brand product-to-lifestyle transition clip) |
|---|---|---|
| Subject | Who or what, described with enough specificity to avoid a generic default | "A ceramic espresso cup, matte white, sitting on a rough-hewn wooden table" |
| Action (continuous, full duration) | What physically happens, across the whole clip, not a pose | "Steam rises steadily from the cup as a hand enters frame from the right and lifts it slowly toward camera" |
| Camera | Named movement, one primary plus at most one secondary | "Camera: slow push in, static aside from the push" |
| Duration and pacing | Explicit time budget matched to the action | "Duration: 5 seconds, the lift completes by the 4-second mark, cup settles in the final second" |
| Lighting | Named key, direction, quality | "Soft morning window light from camera left, warm color temperature" |
| Physics / realism cue | Named physical behavior expected | "Steam should thin and dissipate naturally as the cup moves, not remain a fixed shape" |
| Audio (if native audio in use) | Sound description, or explicit "no audio" | "Sound: soft ambient kitchen tone, a faint ceramic clink as the hand makes contact with the cup" |
| Negative prompt | The one or two failure modes most likely here | "Negative: no warping of the steam, no doubling of the hand, no label distortion on the cup" |
| Reference asset in use | Which start_image / image_reference / video_reference, if any | "start_image: locked product still, `cup_hero_v3.png`, approved 2026-07-20" |
| Model and parameters | Which engine, which mode/tier, why | "seedance1_5, 1080p, native audio on, 5-second duration; chosen for reliable general motion and native audio without needing Seedance 2.0's reference system since no cross-clip identity lock is required here" |

### The seven prompt ingredients (Bible 20 A2)
1. Subject and action, described as **continuous motion, never a static pose**.
2. **Camera movement language** (dolly in/out, push in/pull back, pan, tilt, orbit/arc, crane, tracking, handheld, static/locked-off, whip pan, crash zoom, rack focus). One clean primary movement plus at most one secondary outperforms three conflicting ones.
3. **Shot duration and pacing within the clip.** Budget the action to fit the hard ceiling; pace it explicitly ("for the first two seconds, X holds still, then X turns to camera").
4. **Lighting and atmosphere.** Name the key, note the direction, note the quality, let mood follow.
5. **Physics and realism cues.** "The metal chain swings and settles with visible weight" beats "the chain moves."
6. **Audio and sound cues**, on models with native audio. Sora 2 guidance requires dialogue in its own clearly labeled block below the visual description, lines brief and natural.
7. **Negative prompting** naming the exact flaw (warping, morphing, extra limbs, face deformation, flicker, distorted logos or on-screen text, unstable motion). Never a blanket list of generic negatives.

## 2.2 The six worked example prompts (verbatim, Bible 20 A3)

**Template 1: Dialogue-free character beat**

> A weathered fisherman in his sixties, deep sun lines on his face, sits alone at the bow of a small wooden boat at dawn. He slowly coils a length of wet rope around his forearm, his eyes fixed on the horizon, breath visible in the cold air. The boat rocks gently with the water. Camera: slow, steady push in from a medium shot to a close-up on his face over four seconds, static aside from the push, no handheld shake. Lighting: cold blue pre-dawn light with a thin warm rim from the rising sun behind him. Mood: quiet, weathered, patient. No dialogue. Negative: no warping of the rope, no extra fingers, no flickering horizon line.

**Template 2: Product-in-motion shot**

> An unbranded matte aluminum beverage can, condensation beading on its surface, spins slowly in mid-air against a solid charcoal-grey background, catching a single hard studio light that sweeps across its surface as it rotates. A fine mist of cold vapor drifts off the can's shoulder. Camera: static, locked-off, centered composition, macro lens feel with shallow depth of field. Duration: four seconds, one full 360-degree rotation, constant rotation speed. Lighting: single hard key light from upper camera-left, deep black background, high contrast, no fill. Negative: no label warping, no melting geometry, no doubled or ghosted edges.

**Template 3: Fast-cut action sequence via multi-shot**

> Multi-shot sequence, three consecutive shots, same character and alley location throughout.
> Shot 1: A young courier in a bright yellow jacket sprints down a narrow, rain-slicked city alley, dodging a stack of crates, camera in a low, fast tracking shot running alongside her at hip height.
> Shot 2: Close-up, her hand slams against a rusted metal door to push it open, sparks of rust flying, camera static, hard whip-pan follows her hand.
> Shot 3: Wide shot from above as she bursts out onto a busy street into golden late-afternoon light, camera holds static, crowd continues moving around her.
> Style: gritty, high-contrast, handheld energy on shots 1 and 3, kinetic. Genre hint: action. Sound: continuous urgent footsteps and breathing carrying across all three shots, brief metallic clang on shot 2, street ambience swells in on shot 3.

**Template 4: Slow atmospheric establishing shot**

> Wide establishing shot of an endless salt flat at first light, the ground cracked into a vast honeycomb pattern stretching to the horizon. A thin layer of ground mist drifts slowly across the surface, catching the first warm light. Nothing moves in the frame except the mist and a very slow, almost imperceptible shift in the light as the sun clears the horizon. Camera: extremely slow drone-style crane, rising four meters over twelve seconds, no pan, no tilt, pure vertical rise. Lighting: cold pre-dawn blue transitioning to warm amber as the sun breaches the horizon line, practical sun flare allowed. Mood: vast, silent, contemplative. No people, no vehicles, no audio.

**Template 5: UGC-style handheld clip**

> Selfie-style handheld video, shot on what looks like a phone front camera, slight natural shake and occasional minor refocus hunt. A woman in her twenties in a cozy sweater sits on a couch, talking directly to camera with animated, casual hand gestures, laughing partway through. Background is a slightly cluttered, warm-lit living room, softly out of focus. Lighting: warm, uneven indoor lamp light, slightly overexposed near a window, authentic and imperfect, not studio-graded. Camera: handheld, close, casual framing that drifts slightly off-center, occasional small reframe as if she shifted the phone in her hand. Audio: casual spoken voice, natural room tone, no music. Negative: no cinematic color grade, no perfectly stable frame, no studio lighting polish.

**Template 6: VFX-style transformation / effect shot**

> Extreme close-up on a life-size ice sculpture of a human hand, fingers slightly curled. Over the course of the clip, the ice begins to crack along fine fracture lines, then rapidly transforms, the ice surface rippling and turning to liquid mercury, which reshapes itself into the same hand pose but now fully metallic and reflective. Camera: slow, continuous orbit around the hand at a fixed radius, constant speed, no cuts. Lighting: single cool spotlight from above, the reflective mercury stage should catch and distort the light realistically as it moves. Pacing: first third of the clip is the ice cracking, middle third is the liquid transformation, final third is the metal hand settling into stillness. Sound: subtle ice-cracking texture at the start, a low liquid, resonant tone during the transformation, a soft metallic ring as it settles. Negative: no flickering during the material transition, no loss of hand shape or proportion at any stage, no double exposure ghosting.

## 2.3 Model selection decision table (verbatim, Bible 20 B4)

| Creative goal | Best-fit model(s) | Why |
|---|---|---|
| Physics-heavy action (falls, impacts, crowd or gymnastic motion) | Hailuo/MiniMax 2.3 (`minimax_hailuo`, `minimax-2.3` variant), Kling 3.0 | Both are documented specifically around advanced physics and body-motion realism |
| Dialogue-free emotional character beat | Kling (2.6/3.0), Sora 2, Veo 3.1 | Strong facial/emotional nuance and camera control without needing native dialogue sync |
| Product ad, single hero SKU, or multi-SKU consistency across a campaign | Seedance 2.0 (`seedance_2_0`), falling back to Seedance 1.5 Pro if the SKU includes a person | Seedance 2.0 is the vendor-stated flagship for reference-driven identity and multi-SKU consistency; use 1.5 or Kling/Veo instead the moment a human subject needs to be reference-locked |
| Stylized / experimental look | Wan (`wan2_6`, `wan2_7`) | Open-weight family explicitly positioned for stylized and experimental output rather than photoreal default |
| Fastest and cheapest iteration | `happy_horse_video` (Higgsfield budget tier), Pika at 720p | Named as budget-tier options; use for rough animatics and idea validation |
| Native audio required, tightly coupled to picture | Veo 3.1, Seedance 1.5 Pro, Kling 3.0, Grok Video, Gemini Omni | All generate audio and video in the same pass rather than requiring a post-production audio layer |
| Longest single-generation duration needed without editorial stitching | Sora 2 (documented up to 20 seconds), Higgsfield's `cinematic_studio_3_0` (4 to 15 seconds) | Highest duration ceilings in the landscape as of this writing |
| Multi-shot narrative inside one generation | Kling 3.0, `cinematic_studio_video_v2` (`multi_shots` + `multi_prompt`) | Native multi-shot support, avoiding manual stitching for short continuous sequences |
| Templated ad format rather than a bespoke shot | `marketing_studio_video` | Built around hooks/settings/ad_reference_id; faster and more consistent than hand-writing a free-text prompt for a standard ad structure |

**Critical routing correction to apply on top of this table:** the "stylized / experimental" row names `wan2_6` and `wan2_7` together, but they are NOT interchangeable. `wan2_6` cannot accept a first frame at all. If the stylized shot must open on a locked still, it must be `wan2_7`. See Section 7 (unified matrix).

### Native multi-shot versus stitching (Bible 20 A6)

| | Native multi-shot (one generation, several internal shots) | Stitching separate single-shot generations |
|---|---|---|
| Continuity | The model carries lighting, environment and character logic across the internal cuts | Continuity must be manufactured manually with reference images/video between generations |
| Iteration granularity | Coarse: revising one shot means regenerating the whole multi-shot output | Fine: each shot can be regenerated, approved and locked independently |
| Best used for | A short run of shots sharing one location and one continuous beat of action | A sequence spanning different locations, different times, or any shot needing independent client approval |
| Native audio handling | Sound cues sequenced across internal shots in one pass, on the same internal clock | Audio added or aligned per clip, or handled entirely in post |

### Native audio versus post audio (Bible 20 A7)
- **Trust native audio** when sound is tightly coupled to visible action in frame (door slam, footstep, lip-synced dialogue).
- **Override or replace in post** when sound must match an existing brand asset (locked VO read, licensed track, established sonic identity), when native audio quality is inconsistent across a sequence, or when delivery requires separate dialogue/music/effects stems.
- **`audio_references` is the middle path:** new picture generated synchronized to an audio track already locked. Native-feeling sync without giving up control of the audio content.

## 2.4 Consistency protocol (verbatim, Bible 20 B3)

1. **Generate or select a locked reference still first**, for every character or product that must persist across more than one clip in the sequence. Get it approved before generating any motion. This is the cheapest point in the entire pipeline to catch a wrong look.
2. **Use that locked still as `start_image` for every clip featuring that character or product**, rather than re-describing appearance in each new prompt. Re-describing appearance in words, when a start_image is already fixing it, is a known failure mode.
3. **Use `end_image` or `video_references` to hand off between consecutive clips.** The last frame of clip one becomes the `start_image` (or an `image_reference`) of clip two whenever the action continues; a `video_reference` to clip one is the right tool when what needs to carry forward is motion or pacing rather than a literal frame match.
4. **Keep a written log**, one row per generation, with at minimum: clip ID, which reference asset(s) were used, which model and parameters, the prompt text actually submitted, the date, and the approval status.
5. **Re-verify the chain after any regeneration.** If clip three in a five-clip sequence is regenerated for any reason, check whether its new last frame still matches what clip four's `start_image` expects. A silent mismatch here is invisible until the clips are cut together.

### Worked mini-log example (verbatim)

| Clip ID | Reference used | Model / params | Approved | Notes |
|---|---|---|---|---|
| SEQ01-A | `cup_hero_v3.png` (locked still, approved 2026-07-20) | seedance1_5, 1080p, native audio on | Yes, 2026-07-21 | Product lift, opening shot |
| SEQ01-B | last frame of SEQ01-A, used as start_image | seedance1_5, 1080p, native audio on | Yes, 2026-07-21 | Continuation, cup reaches mouth level |
| SEQ01-C | `cup_hero_v3.png` reused as start_image (scene resets to tabletop) | kling3_0, pro mode, no audio (will be scored in post) | Pending | Wide cutaway, needs its own approval before final assembly |

### Reference mechanisms in order of how tightly they lock appearance (Bible 20 A5)
1. **`start_image`** (first-frame conditioning): the strongest continuity mechanism. The generation begins from a specific still, so the model only has to animate from a fixed starting point.
2. **`end_image`** (last-frame conditioning): used with `start_image` to define both endpoints and let the model solve the motion between. Also the natural handoff point between consecutive clips.
3. **`image_references`**: style or subject reference images that are not the literal first frame. Looser than `start_image`, useful when the character or product must be recognizable but the opening framing should differ.
4. **`video_references`**: a reference clip carrying motion quality, pacing, or scene continuation. Reach for it when what must persist is movement, not appearance.
5. **`audio_references`**: sync a new clip to existing audio. Exposed by exactly four Higgsfield models: `wan2_6`, `wan2_7`, `seedance_2_0`, `seedance_2_0_mini`. NOT exposed by `gemini_omni`. Of the four, only `wan2_7`, `seedance_2_0` and `seedance_2_0_mini` also accept a `start_image`, so those three are the only options that can sync to existing audio AND open on a locked frame in the same generation.

**Seedance 2.0 reference-loading discipline:** the model assigns each uploaded asset a filename-based reference (`@image1`, `@video1`) the prompt addresses directly. Vendor guidance warns against over-loading: the recommended configuration is four to five assets total, each with one clearly assigned job (character anchor, scene tone, camera reference, atmosphere reference), not a pile of loosely related images. Seedance 2.0 is documented as weaker specifically on human subjects; use Seedance 1.5 Pro, Kling, or Veo 3.1 when the reference-locked subject is a person.

## 2.5 Failure modes and under-specification tells (Bible 20 B5)

| Failure mode | What it looks like | Why it happens | Fix |
|---|---|---|---|
| **Words fighting the image** | A prompt re-describes appearance ("a woman with long red hair in a green dress") when a `start_image` has already fixed it | The writer treated the text field as if it still needed to establish appearance | Once a `start_image` is set, describe motion, camera, lighting and sound only; strip appearance to the minimum needed to disambiguate action ("she turns", not "the red-haired woman in the green dress turns") |
| **Multi-shot prompt with no clear handoff logic** | Second or third internal shot does not follow from the first: lighting jumps, wardrobe changes, location shifts | Shots listed as independent, without repeating fixed identity details | Restate the fixed identity anchor in every shot block, and open the prompt with an explicit continuity statement before the per-shot breakdown |
| **Audio generated before picture is locked** | A native-audio clip approved for sound, then picture is revised and no longer matches the audio's timing | Audio and picture treated as separately approvable when the model generates them in one coupled pass | Do not sign off on a native-audio generation's sound as final until picture is final; budget for audio to regenerate with it |
| **Negative prompt used as a blanket incantation** | A long generic negative ("no blur, no distortion, no artifacts, no bad quality") copied onto every generation | Treating negative prompting as a universal quality booster | Identify the one or two failure modes actually likely in this shot and name only those |
| **Duration and resolution set to maximum by default** | Every generation at highest resolution and longest duration "to be safe" | No deliberate decision about delivery requirements | Decide the delivery spec first, approve creative at the lowest sufficient tier, re-render higher only once creative is locked |
| **Reference asset drift with no log** | Clips generated against different or outdated reference stills, nobody can say which used which | No continuity log kept | Maintain the written reference log from the first clip onward, not retroactively |

## 2.6 Regeneration trigger list (Bible 20 B6)

A prompt or an already-generated clip must be rebuilt, not patched, when any of the following changes:

- **The reference image changes.** A new or revised `start_image`, `image_reference`, or `video_reference` means every clip conditioned on the old asset is out of sync and needs regeneration, not a text-only edit.
- **A runtime change.** If the cut length changes materially, the action and camera pacing written into the prompt no longer fit and must be re-paced, not stretched or trimmed after the fact.
- **A shift from silent to native-audio delivery, or the reverse.** This is a model-selection change as much as a prompt change; reconsider the whole generation against the model selection table, do not patch with an audio bolt-on.
- **A platform or aspect-ratio change.** Changes the framing language written into the original prompt (composition, headroom, camera distance); not reliably solved by cropping the finished output.
- **A change in which subject must stay consistent.** If a sequence that did not need cross-clip identity lock now needs it, revisit the whole sequence against the continuity protocol, including generating or selecting a proper locked reference still retroactively before any further clips are built.

---
---

# SECTION 3: SOUND EFFECTS, AMBIENCE AND SOUNDSCAPE (Bible 21)

## 3.1 Prompt construction template (verbatim, Bible 21 B2)

Use this five-slot structure for any SFX/ambience generation, matching the anatomy from A2:

```
[SOURCE: physical object/action] + [MATERIAL/TEXTURE] + [SPACE: indoor/outdoor, near/far, wet/dry acoustics] + [TEMPORAL SHAPE: one-shot / sustained loop / evolving arc, with attack-decay language] + [INTENSITY: subtle to dramatic] + [NEGATIVE INSTRUCTIONS: no music, no dialogue, no reverb, no extra events]
```

### The five prompt layers (Bible 21 A2), in order of importance
1. **Source description:** what is physically making the sound. Not "a scary sound" but "a large wooden door on rusted iron hinges."
2. **Material and texture cues:** wood vs metal vs glass vs flesh vs fabric; wet vs dry; rough vs smooth; hollow vs solid. These map directly to frequency content and transient shape.
3. **Spatial and environmental cues:** indoor/outdoor, close-mic/distant, reverberant (stone hall, parking garage) or dry (padded room, open field).
4. **Temporal shape:** single transient hit, sustained loopable texture, or evolving arc. Governs both rendering approach and requested duration.
5. **Intensity and dynamics:** subtle vs dramatic; aggressive, tentative, mechanical, organic.

**The vocabulary rule:** there is no lens, no color, no composition, no lighting direction. There is material, space, and time. Writers moving from image/video prompting consistently make the mistake of describing what a sound "looks like" (cinematic, epic, dramatic) instead of what physically produces it and where it is happening.

## 3.2 Worked fills of the template (verbatim, Bible 21 B2)

**Worked fill, ambience bed for an office scene:**
- Source: "a busy open-plan office"
- Material/texture: "keyboard typing, muffled phone conversations, a distant printer"
- Space: "indoor, moderate room reflections, mid-distance perspective"
- Temporal shape: "continuous, seamless loop, no variation in overall intensity"
- Intensity: "low-to-moderate background level, unobtrusive"
- Negative instructions: "no distinct words audible, no music, no sudden loud events"

Resulting prompt: "A continuous, seamless loop of a busy open-plan office, distant keyboard typing, muffled unintelligible phone conversations, an occasional distant printer, indoor with moderate room reflections, mid-distance perspective, low-to-moderate background level, unobtrusive, no distinct words audible, no music, no sudden loud events."

**Worked fill, single UI error tone:**
- Source: "a digital error notification"
- Material/texture: "low buzzy tone, slightly dissonant"
- Space: "dry, no reverb, close and direct"
- Temporal shape: "one-shot, sharp attack, short decay under half a second"
- Intensity: "firm but not jarring"
- Negative instructions: "no melody, no musical scale, no reverb tail"

Resulting prompt: "A single digital error notification tone, low and slightly dissonant, dry with no reverb, close and direct, sharp attack with a short decay under half a second, firm but not jarring, no melody or musical scale, no reverb tail."

## 3.3 The five worked example prompts (verbatim, Bible 21 A3)

**Template 1: Short UI / notification chime**
**Prompt:** "A soft, clean two-note notification chime, bright bell-like tone, gentle attack, quick decay, minimal reverb, suitable for a mobile app alert."
**Duration:** 1 second, specified explicitly.

**Template 2: Single hard impact / hit sound**
**Prompt:** "A single heavy metal impact, like a large steel door slamming shut in an empty industrial warehouse, sharp transient, deep low-end thud, short natural reverb tail, no music."
**Duration:** 2 seconds.

**Template 3: Sustained ambience bed / loop**
**Prompt:** "A continuous, seamless loop of steady rainfall on a corrugated metal roof, medium intensity, occasional distant low rumble of thunder, no wind, no dialogue, no music, consistent texture throughout with no variation in intensity."
**Duration:** 30 seconds (the platform maximum for a single seamless-loop generation on most current tools), intended to be looped in the edit for however long the scene runs.

**Template 4: Whoosh / transition element**
**Prompt:** "A fast whoosh, like an object flying quickly past camera left to right, airy and ghostly texture, rising pitch then sharp cutoff, no impact at the end, dry with minimal room tone, for a hard cut transition."
**Duration:** 1.5 seconds.

**Template 5: Foley-style object interaction sound**
**Prompt:** "A hand picking up a ceramic coffee mug from a wooden table, soft clink of ceramic on wood, subtle finger contact, then a light scrape as the mug is lifted, close-mic perspective, dry room with no reverb, natural and unprocessed."
**Duration:** 2.5 seconds.

## 3.4 Model selection decision table (verbatim, Bible 21 B4)

| Goal | Best-fit tool (as of 2026-07-26) | Why |
|---|---|---|
| Short UI / notification sound | ElevenLabs Sound Effects | Purpose-built natural-language SFX prompting, precise duration control down to 0.1s, dry/close results are easy to steer toward |
| Big impact / hit sound | ElevenLabs Sound Effects | Strong prompt adherence for named audio terminology (impact, braam), 30s max window comfortably covers any hit-plus-tail |
| Ambience bed / loop | ElevenLabs Sound Effects (seamless looping feature), Stable Audio as secondary | ElevenLabs' documented seamless-loop capability is purpose-built for exactly this; Stable Audio's longer native coherent duration can also serve extended ambience needs |
| Transition element (whoosh/riser) | ElevenLabs Sound Effects | Documented audio-terminology vocabulary (whoosh, riser, glitch) with strong prompt adherence for these named categories |
| Foley substitute | ElevenLabs Sound Effects, with AudioCraft/AudioGen as a free fallback if in-house ML compute exists | Natural-language causal-chain prompting is well supported; AudioGen is viable free alternative for teams able to self-host, at a quality tradeoff |
| Game-pipeline short SFX one-shot, already on the Higgsfield platform | Higgsfield `mirelo_text_to_audio` | Only if Higgsfield is already the working platform; its own schema flags it as game-pipeline oriented, so validate output quality before relying on it for a client-facing deliverable |
| Anything requiring spoken words | Neither tool in this bible | Route to the dedicated VO/text-to-speech companion bible; do not attempt to coax spoken words out of an SFX tool, and do not use Higgsfield's `seed_audio` for anything other than actual speech |

**Higgsfield audio coverage warning:** `seed_audio` ("Seed Audio 1.0", ByteDance) is labeled text-to-audio but its parameter set (voice_type, voice_id, speech_rate, pitch_rate) shows it is a speech-oriented TTS tool, not a soundscape or SFX tool. Do not use it for ambience, foley, or abstract sound design.

## 3.5 Consistency and placement protocol: the frame-exact handoff (verbatim, Bible 21 B3)

1. **Identify the exact timecode or frame** in the edit where the sound needs to land (for example, frame 142 of a 24fps sequence, where a punch visually connects).
2. **Generate the element with duration matched to that moment's need**, not trimmed after the fact. If the visual action from anticipation to impact to settle spans 1.8 seconds, request a 1.8 to 2.0 second generation with the temporal shape described precisely (a build, then a hit, then a short decay), rather than generating a generic 5-second clip and cutting it down.
3. **Place the file so its transient (not its file start) lands on the frame.** Many generated one-shots have a few frames of lead-in before the actual hit; the editor must nudge the clip so the perceptual attack, not the waveform's zero point, aligns with the visual event.
4. **Confirm against Part 10's sync tolerance standard** before considering the placement final. The generated element's placement must be checked against that same tolerance; it does not get a looser standard just because it was AI-generated rather than recorded.

### Layering discipline (Bible 21 A6)
One soundscape is many generations, never one. Generate: one clean ambience bed (looped, textural, no discrete foreground events), plus separate one-shot generations for each foreground event and each transition element the edit calls for. Layer and mix them as separate stems. Reasons a monolithic generation fails: you cannot pull an element back out of a fixed blend; foreground events need individual frame placement; different elements need different processing.

### Duration control (Bible 21 A5)
- **One-shot duration:** set to comfortably contain the transient and its natural decay tail with a small margin. Too short clips the decay; too long invites unwanted extra content after the natural event ends.
- **Loop duration:** request with the explicit vocabulary of looping ("seamless loop," "continuous," "no variation in intensity," "consistent texture throughout"). The prompt's job is to describe a texture with no internal arc so the loop point is inaudible.

## 3.6 Failure modes and under-specification tells (Bible 21 B5)

- **A prompt asking for music-like qualities from an SFX tool.** Tell: the output sounds like a vague, undirected pad rather than a controlled musical phrase. Fix: route to a dedicated music tool, or use genuinely non-musical "drone"/"riser" descriptors instead of music-theory language.
- **A looping ambience with an audible seam.** Tell: a periodic click, pop, or perceptible jump in texture at a regular interval matching the source clip's length. Fix: regenerate using the tool's explicit seamless-loop parameter or vocabulary; if the seam persists, crossfade a short overlap (roughly 5 to 10 frames) at the loop point.
- **A duration mismatch forcing an awkward edit.** Tell: a sound visibly stretched (pitch-shifted, time-stretched, audibly degraded) or abruptly cut off mid-decay. Fix: regenerate with the corrected duration rather than force-fitting.
- **A foley-style prompt that reads like a mood board instead of a cue sheet.** Tell: vague, adjective-heavy prompts ("a tense, unsettling sound") producing generic, unusable texture. Fix: rewrite as a causal chain, object, material, action.
- **Treating Higgsfield's `seed_audio` as a soundscape tool because its label says "text-to-audio."** Tell: passing an ambience or SFX description into a tool whose parameters are voice_type, voice_id, speech_rate, pitch_rate. Fix: always check a tool's actual parameter schema, not just its display name.

## 3.7 Regeneration trigger list (Bible 21 B6)

- **A cut's duration changes.** The sound's duration and internal temporal shape likely no longer fit; regenerate to the new duration rather than stretching or re-cutting.
- **A scene's location or material changes.** If a wooden door becomes metal, or an exterior becomes an interior, the source and spatial cues are now wrong; regenerate with updated source/material/space language.
- **A platform loudness or technical delivery requirement changes.** Regenerate at the correct native sample rate rather than up-sampling after the fact, or re-process in the mix.
- **A generated loop's seam becomes audible once placed under other elements in the mix.** Regenerate with more conservative "no variation" language rather than masking it with editing tricks.
- **The model or tool version changes.** Previously generated assets are not automatically upgraded; on longer-running or reopened projects, consider regenerating older assets on the current model for tonal consistency.

---
---

# SECTION 4: ARABIC AND ENGLISH VO GENERATION (Bible 22)

## 4.1 Prompt / direction construction template (verbatim, Bible 22 B2)

```markdown
# AI VOICE GENERATION REQUEST

Piece:                    [title]
Language:                 [English / Arabic / both, as separate passes]
Dialect (if Arabic):      [MSA / Egyptian / Gulf / Levantine / other, named]
Voice source:             [preset / voice-designed / cloned]
Consent on file (if cloned):  [YES / NO / N.A.]  Do not proceed if NO.

## SCRIPT TEXT (final, with all punctuation intact)
[exact text, exactly as it should be read, punctuation preserved]

## PRONUNCIATION CONTROL
| Word / term | Risk | Control applied |
|---|---|---|
|  |  | [diacritics added / phoneme tag / respelling / none needed] |

## EMOTIONAL REGISTER
Target register, stated as a situation:      [ ]
Anti-register (what to avoid), named:        [ ]
Reference (a piece or performer this should resemble):  [ ]

## PACING
Target runtime:            [ ] sec
Rate control available:    [YES / NO. If NO, pacing is engineered via sentence and punctuation construction]
Pause control available:   [YES / NO. If NO, pacing relies on punctuation only]

## ENGINE / PROVIDER
Provider and model/variant:      [ ]
Style or instruction field used: [ ] (leave blank and note "not supported" if unavailable)

## OUTPUT
[ ] Generated take 1
[ ] Generated take 2, alternate point of view
[ ] Native-dialect or native-language reviewer check completed (required for any Arabic dialect deliverable)
```

### The five direction layers (Bible 22 A2)
1. **The text itself, as pacing control.** Punctuation is the primary prosody instruction set available in every engine. Comma = short rise-then-pause; period = falling pitch and fuller stop; ellipsis = trailing unresolved pause; question mark = rising terminal pitch; exclamation = energy and emphasis upward. Never strip punctuation before sending text to an engine.
2. **Explicit emotion and style direction**, via a natural-language instruction field, inline emotion tags, or a style/stability parameter.
3. **Pronunciation control** for ambiguous words and names, via SSML phoneme tags where supported, or phonetic respelling in the script where not.
4. **Pacing and speed control**, via an explicit rate parameter where it exists, or engineered through sentence length and punctuation density where it does not.
5. **Deliberate pause insertion**, via explicit break/pause tags where supported, or punctuation plus the period-and-capital trick where not (a workaround, discarded once the audio is generated).

## 4.2 Worked example fills (verbatim, Bible 22 B2)

**Worked fill, English**

```
Language:                 English
Voice source:             Preset
SCRIPT TEXT:  "We didn't rush this. We built it, we broke it, and we built it again. That's the part nobody sees."
EMOTIONAL REGISTER:  A person telling a friend, matter-of-fact, slightly proud but not performing pride.
ANTI-REGISTER:  Salesy, upward inflection at the end of every clause, founder-explaining-the-product energy.
PACING:  Full stops kept hard. No rate adjustment needed, punctuation carries the pacing.
```

**Worked fill, Arabic (Egyptian dialect, illustrating the diacritics and dialect disciplines from A4)**

```
Language:                 Arabic
Dialect:                   Egyptian (Ammiya), explicitly not MSA
Voice source:             Cloned, native Egyptian speaker, consent on file
SCRIPT TEXT:  [Egyptian dialect script, written in dialect vocabulary and grammar, not an MSA sentence given a dialect label]
PRONUNCIATION CONTROL:  Brand name diacritized manually to lock the vowel pattern; two words flagged as ambiguous without diacritics and diacritized in the delivered script.
EMOTIONAL REGISTER:  Someone explaining something to a neighbor over tea, unhurried, warm, no announcer energy.
ANTI-REGISTER:  MSA newsreader cadence bleeding into the dialect words. Explicitly flagged for the native reviewer to check.
OUTPUT:  Native Egyptian-dialect reviewer check completed before delivery. [required, not optional]
```

### The named English register patterns and their worked example (verbatim, Bible 22 A3)

**Worked example, English, natural conversational:**

> Input text: "Look, we've tried the easy version of this before. It didn't work. So this time we did it properly."
> Style instruction (where supported): "A person telling a friend something slightly frustrating that turned out fine. Not performing it. Just telling it."

**Natural conversational construction pattern:** short sentences mixed with occasional longer ones; contractions kept in, never expanded; commas used sparingly and only where a genuine breath falls; where a style field exists, an instruction naming a specific listener and register beats an adjective.

**Announcer construction pattern:** full sentences, fuller stops, short punchy fragments used deliberately ("New. Bigger. Now available."); a slightly slower-than-default rate where rate control exists; style instruction naming energy and audience scale ("a big room, a big claim, full projection, no hedging"). Use sparingly.

**Documentary-realist construction pattern:** longer, more measured sentences with genuine internal commas marking real thought-breaks; avoid stacking short punchy fragments; style instruction naming curiosity and proximity beats one naming authority ("someone standing next to the thing, quietly fascinated by it, not narrating from above it"); place emphasis on the noun or verb carrying new information, not the adjective.

**The recurring lesson across all three registers:** the instruction that actually changes the output is a situation ("who is speaking, to whom, under what circumstance"), not an adjective ("warm," "confident," "premium").

## 4.3 Model / provider selection decision table (verbatim, Bible 22 B4)

| Goal | Best-fit provider(s), based on current documented capability | Why |
|---|---|---|
| English conversational or documentary read | ElevenLabs, WellSaid Labs, Azure Neural TTS | Deep English voice libraries with strong stated emotional range; WellSaid specifically built for narration-grade English delivery. |
| English announcer read | ElevenLabs, Azure Neural TTS | Broad preset libraries include projected, high-energy voice options; verify against a specific sample rather than assuming by category. |
| Arabic MSA formal read | Amazon Polly (Zeina), Azure Neural TTS, Google Cloud TTS, ElevenLabs Multilingual/v3 | All document credible MSA support; MSA is also the register these models are most likely to default toward even without special selection, which is an advantage here specifically. |
| Arabic Egyptian-dialect colloquial read | A named dialect-specific voice where available (check current Azure documentation for its named Egyptian voice), or reference-audio voice cloning from a native Egyptian dialect speaker | Dialect authenticity is the single hardest problem in this entire landscape; a generic "Arabic" preset is the least reliable path, a documented dialect-specific voice is better, and a native-speaker clone is the most reliable of the three. |
| Arabic Gulf-dialect colloquial read | Amazon Polly (Hala, Zayd), Cartesia (Emirati Arabic variant documented) | Currently the most clearly named, documented Gulf-dialect commercial options identified in this research pass. |
| Voice cloning of a specific real voice | ElevenLabs (instant and professional cloning tiers), Resemble AI, Higgsfield's `create_voice` / `create_voice_from_confirmed_audio` (which itself typically routes to an underlying engine) | ElevenLabs has the most detailed published cloning tier structure; always confirm written consent per Bible 08 Section A13 before any cloning work begins, regardless of provider. |
| Fastest / cheapest option for a quick English scratch or internal use | ElevenLabs Free or Starter tier, or a free tier of a comparable provider | Sufficient for scratch tracks and internal previsualization; not for client-facing broadcast delivery. |
| Real-time or conversational voice AI application (not pre-recorded narration) | Cartesia, PlayHT | Both are positioned and marketed specifically around low-latency, conversational delivery rather than cinematic narration; a different selection axis than the rest of this table. |

### Higgsfield routing facts that change model selection
- `text2speech_v2` is a **router**, not a model. It requires a `variant` parameter selecting one of five underlying engines: `elevenlabs`, `minimax`, `seed_speech`, `vibe_voice`, `cozy_voice`, plus `voice_type` (preset vs element/cloned) and `voice_id`.
- The `elevenlabs` variant is a reseller layer with Higgsfield's own margin on top of ElevenLabs' own cost, not a pass-through.
- Higgsfield's own preset voice library is English-oriented and surfaces no obvious named Arabic presets.
- `qwen_audio_tts` exposes an attractive natural-language `instruction` parameter for emotion, dialect, speed and style, but its documented language list is `zh, en, fr, de, ja, ko, ru, pt, th, id, vi, it, ms`. **Arabic is not among them. Do not reach for it on an Arabic job.**
- `inworld_text_to_speech` explicitly includes two named Arabic voices, "Nour (ar)" and "Omar (ar)". This is the one model in the connected environment with a confirmed native Arabic preset pairing. Its game-pipeline framing means it should be tested before assuming parity with a dedicated commercial VO provider.
- `seed_audio` exposes `voice_type` and `voice_id` but no documented language list; Arabic capability unconfirmed.

## 4.4 Consistency protocol: the bilingual production protocol (verbatim, Bible 22 B3)

**The rule, stated plainly: generate the English and Arabic reads as two fully separate passes, with two separately chosen voices or engines, never as one multilingual voice covering both.**

**What this means operationally:**
- The English pass and the Arabic pass are treated as two separate generation requests, each filled out on its own copy of the template in B2, each reviewed on its own terms.
- The English voice and the Arabic voice do not need to sound alike, match in timbre, or come from the same provider. Chasing a matched voice across languages optimizes for a similarity the audience in neither market perceives, at the cost of quality in both.
- Each language's script is written natively for that language and that register, not translated from the other. A translated Arabic script read by an Arabic voice will still surface the translation in its rhythm and idiom even if the voice itself is excellent.
- Timing will differ between the two languages. Plan for separate edits or separate cut lengths per language rather than assuming one runtime serves both.

**The scoped exception.** A single voice covering both languages is acceptable only where a specific, deliberate brand requirement makes voice continuity across languages more valuable than per-language native quality, for example a recurring brand mascot voice whose recognizability is itself the asset being protected. Where this exception is invoked, it must be documented as a conscious tradeoff, naming the quality cost being accepted in the weaker-represented language.

### Voice-identity consistency mechanisms (Bible 22 A6)
- **Preset voice:** provider-trained, ready-made. Consistency is automatic within a project as long as the same `voice_id` is reused; direction works entirely through text, punctuation and style controls.
- **Voice design:** an entirely new synthetic voice generated from a text description of vocal qualities. No real person's likeness. Consistency depends on saving and reusing the generated voice, not re-describing it.
- **Voice cloning:** built from reference audio of a specific real person, instant clone (short sample) or professional clone (longer session). **The reference audio is a hard ceiling:** a clone cannot reliably generate an emotional register, dialect, or performance quality never present in its reference material. Written, specific consent is required before any cloning work begins.

### Arabic-specific consistency controls (Bible 22 A4)
- **Diacritization (tashkeel).** Manually diacritizing a specific word, or the whole line around it, is the single most reliable pronunciation-control lever for Arabic, more reliable than re-phrasing and more reliable than hoping a second generation lands differently. Apply to any brand name, technical term, genuinely ambiguous word, or any word the engine has already mispronounced once.
- **The MSA-default problem.** A model trained mostly on MSA will apply MSA phoneme habits and cadence underneath dialect vocabulary, producing "reading Ammiya in a newsreader's mouth." Mitigations in order of reliability: (1) a documented dialect-specific voice, (2) reference-audio cloning from a native dialect speaker, (3) targeted diacritization/transliteration hints for problem words, (4) native-speaker testing before commitment.
- **Native-dialect review is a mandatory delivery gate** for any Arabic dialect deliverable. Ask the reviewer the specific question "does this sound like someone from here, or does it sound like a newsreader," not the general question "does this sound good."

## 4.5 Failure modes and under-specification tells (verbatim, Bible 22 B5)

| Tell | What it actually means | The fix |
|---|---|---|
| An Arabic script with no diacritics produces an unexpected or wrong pronunciation on a specific word | Genuine, well documented ambiguity in undiacritized Arabic text, not a model malfunction | Diacritize that specific word or the surrounding line manually |
| A dialect script comes back sounding like a newsreader | The MSA-default problem, the single most common Arabic AI voiceover failure | Switch to a documented dialect-specific voice, or move to reference-audio cloning from a native dialect speaker |
| A single voice is asked to read both an English script and an Arabic script | Violates the Bilingual Production Protocol | Split into two separate generation passes with two separately chosen voices, unless the brand-continuity exception is deliberately and explicitly invoked |
| Punctuation was stripped or "cleaned up" before sending text to the engine | All pacing control has been discarded, whether or not anyone intended that | Restore the punctuation exactly as it should be spoken; treat punctuation as an instruction layer, not a formatting nicety |
| A cloned voice cannot produce the requested emotional register no matter how the text is adjusted | The reference audio never contained that register in the first place (the ceiling effect) | Re-record reference audio containing the needed register, or accept the ceiling and adjust the brief |
| An "Arabic voice" was selected with no dialect specified at all | The dialect decision was silently defaulted, almost always to MSA-flavored output | Ask which dialect is actually required before generating anything |
| A generation sounds "close but wrong" and nobody can say exactly why | Almost always an unstated layer from A2: missing emotional direction, missing pronunciation control, or stripped pacing punctuation | Walk the five layers in A2 in order and check which one was never specified |
| A native-dialect reviewer was never in the approval chain for an Arabic deliverable | The MSA-versus-dialect failure is frequently invisible to a non-native reviewer | Make native-dialect review a mandatory delivery gate for any Arabic dialect work |

## 4.6 Regeneration trigger list (verbatim, Bible 22 B6)

| Upstream change | Regeneration required | Notes |
|---|---|---|
| **Script edit, any wording or punctuation change** | Yes, full regeneration of the affected lines at minimum | Punctuation changes alone can change the read; do not assume a wording-only change leaves pacing untouched |
| **Language or dialect change** | Yes, full regeneration, and this is never a same-voice swap if a language changed | Also triggers a fresh review by a native speaker of the new target dialect |
| **Gender or age recast of the voice** | Yes, full regeneration | If cloned, also confirm consent covers the new intended use context |
| **Runtime change** | Yes, re-derive pacing and possibly re-cut the script itself | Pace, word count and runtime are linked, not independent |
| **Switch from a preset voice to a cloned voice, or the reverse** | Yes, full regeneration, plus a consent check if moving toward a clone | Treat as a new casting decision, not a technical substitution |
| **Reference audio for an existing clone is replaced or extended** | Yes, the clone's usable emotional and dialect range may have changed | Re-test the full range of registers the project needs against the new reference material |
| **Provider or engine switch (e.g. moving from one variant to another on a router like Higgsfield)** | Yes, full regeneration and full re-review | Different engines have different pronunciation defaults, pacing behavior, and dialect handling even for "the same" requested language |
| **A pronunciation error is caught late** | Yes, targeted regeneration of the affected line, with pronunciation control applied this time | Do not patch a mispronunciation by re-recording around it if a direct phoneme or diacritic fix is available |

---
---

# SECTION 5: IMAGE-TO-VIDEO GENERATION (Bible 23)

## 5.1 Prompt construction template (verbatim, Bible 23 B2)

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

### The five motion-prompt components (Bible 23 A2)
1. **What specifically moves.** Name the exact element and the exact action. Isolate elements with general unambiguous descriptive language ("the woman in the red coat"), not spatial pointers ("the thing on the left").
2. **The camera's own, independent movement.** Push in, pull out, orbit (with a degree value if supported), pan, tilt, static/lockoff, handheld drift, dolly, crane, rack focus. **One clear camera intention only.**
3. **Speed and intensity.** Every motion instruction needs a magnitude. Pair the speed word with the specific motion it modifies, not a bolted-on adverb.
4. **What must stay still.** The most under-used and most valuable instruction in the craft. Explicitly protect what must not move.
5. **Physics and realism cues.** Cloth, hair, liquid, smoke, secondary jiggle, and light-physics interactions that should track the motion.

**The core discipline:** an image-to-video prompt should describe motion, and as close to nothing else as possible. Re-describing what the image already shows is not neutral, it is actively harmful: it wastes prompt budget and gives the model competing signals that can cause it to drift the subject away from the photographed one.

## 5.2 The six worked example prompts (verbatim, Bible 23 A5)

**Template 1: Subtle living-portrait effect**

**Prompt:** "Her eyes blink once, slowly, and her chest rises and falls gently with breath. A faint smile begins to form at the corners of her mouth. Everything else in the frame, her hair, her clothing, the background, and the framing, remains completely still. No camera movement."

**Template 2: Camera-only orbit around a static subject**

**Prompt:** "The camera orbits slowly around the subject, moving from left to right, completing a partial arc of roughly 45 degrees. The subject remains completely frozen throughout, including expression, pose, and clothing. Lighting stays consistent as the camera moves."

**Template 3: Product rotating in place**

**Prompt:** "The product rotates smoothly on its own vertical axis, a slow, continuous 360-degree turn. The camera does not move. The background and surface beneath the product remain completely static. Reflections and highlights shift naturally across the surface as it turns."

**Template 4: Character walking toward camera from a portrait**

**Prompt:** "The man walks steadily toward the camera, his stride natural and unhurried. As he approaches, he grows larger in frame and the background behind him blurs slightly with a shallow depth of field. His expression stays calm and unchanged throughout. The camera holds its position, static, letting him walk into the shot."

**Template 5: First-frame-to-last-frame interpolation (both start_image and end_image supplied)**

**Setup:** start_image is a wide shot of a car parked at the curb at dusk. end_image is the same framing, same car, but headlights on and the sky noticeably darker.

**Prompt:** "The scene transitions from dusk to early night. The headlights switch on partway through, casting a warm glow onto the road ahead. The sky gradually deepens in color. The camera does not move."

**Template 6: Environmental/atmospheric animation on an otherwise still landscape**

**Prompt:** "Wind moves gently through the tall grass in the foreground, causing it to sway and ripple. Distant clouds drift slowly across the sky from left to right. The mountains, the lake, and the framing remain completely static. No camera movement."

## 5.3 Model and approach selection decision table (verbatim, Bible 23 B4)

| Goal | Best-fit tool/approach | Why |
|---|---|---|
| Subtle living-portrait effect (breath, blink, minimal motion) | Free-text prompting on a general model (Runway, Kling, Hailuo), using the stillness-lock discipline heavily | Requires fine control over exactly what tiny motion happens and what stays frozen, which presets are not built for. |
| Camera-only motion around a static subject | Free-text with explicit camera vocabulary, OR Higgsfield's ORBIT 360 preset if the exact effect matches | If a full-circle or fixed-arc orbit is the whole ask, the preset is faster and lower-risk. If a partial, specifically-angled, or non-orbital camera move is needed, free-text with dedicated camera controls (Kling, Runway) is the better fit. |
| Precise first-to-last-frame interpolation | Kling 3.0 FLF2V, or Luma Dream Machine keyframes | Both explicitly support supplying both a start and end image, and both have platform-native guidance on how to prompt the transition rather than either endpoint. |
| Viral / templated effect (turning into a sticker, action figure, ice statue, CGI breakdown, etc) | Higgsfield preset system (higgsfield_preset) | These are pre-solved, named recipes for exactly this class of effect. |
| Bespoke, complex, brand-specific motion with no existing analogue | Free-text prompting, budgeted for multiple iterations, possibly with Motion Brush if region-specific control is needed | No preset will match a genuinely novel brief. Region-specific painting (Runway Motion Brush) is the strongest tool when different parts of the frame need different, independently-controlled motion. |
| Fastest and cheapest acceptable result, quality bar is low | Preset-routed generation on whichever platform the operator already has credits for | Minimizes iteration count, which is the main cost driver in image-to-video work. |
| Multi-shot continuity/handoff between clips | Free-text, generally with FLF2V for the final link in a chain wherever the next shot's opening frame is creatively fixed in advance | Presets are self-contained effects, not designed to end on a controllable, reusable handoff frame. |

### Templated versus free-text decision table (verbatim, Bible 23 A4.1)

| Situation | Right call | Why |
|---|---|---|
| A proven visual effect exists as a named preset and matches the creative goal exactly | Templated (preset) | Minimal prompting risk, the recipe has already been solved, fastest path to an acceptable result. |
| A quick social clip, meme format, or trend-following effect | Templated (preset) | Presets exist specifically because these effects are common asks. |
| A professional job with a specific, brand-defined motion requirement not covered by any preset | Free-text | Presets are built for their own named effect and are not adjustable to arbitrary brand specifications. |
| A subtle, restrained "living portrait" effect for a hero brand image | Free-text | This class of motion needs precise control over exactly which micro-motion happens and exactly what stays frozen. |
| Multi-shot continuity work where a clip must hand off cleanly to the next shot's start_image | Free-text, generally, sometimes first/last-frame mode | Preset outputs are self-contained effects, not designed to end on a controllable, reusable handoff frame. |
| Client-facing deliverable where any visible AI artifact is unacceptable | Depends on stakes: templated for lower risk on simple asks, free-text with heavy QA and multiple generations for anything bespoke | Templates are lower-variance because they are pre-validated. |

**Named Higgsfield presets observed live 2026-07-26 (60-plus in catalog):** EARTH ZOOM, FLOAT SPIN, STICKER PEEL, ORBIT 360, ACTION FIGURE, CGI BREAKDOWN, ICE STATUE, ANDROID ASSEMBLE, 3D RENDER. Retrieve `preset_id` via `presets_show`. Preset generations take one required input image and a `preset_id`, with no free-text motion prompt written at all.

### Engine-specific mechanisms (Bible 23 A6)
- **Runway:** Motion Brush and Multi-Motion Brush, region-specific motion painting with per-region motion vectors. The closest thing in this craft to literal spatial motion instruction.
- **Kling:** FLF2V mode from 3.0 onward; built-in camera movement controls that are more reliably obeyed than the same instruction in free text.
- **Luma Dream Machine:** keyframes, a start frame and end frame with an optional text prompt guiding the transition. Functionally the same as Kling FLF2V.
- **Pika:** Scene Ingredients, a semi-structured prompt split into discrete fields (objects, characters, environment, mood).
- **Hailuo / MiniMax:** Subject Reference, a close-up reference image (typically a face) holding subject identity consistent across generations. Functions like `image_references`, distinct from `start_image`.

### FLF2V mode rules (Bible 23 A3.1)
- Choose two similar images with the same theme; significant differences cause a lens switch artifact. Both frames should share aspect ratio.
- The prompt describes the transition only, never either endpoint.
- Identical image as both start and end produces a seamless infinite loop.
- This mode is the correct tool for shot-to-shot handoffs.

## 5.4 Consistency protocol: the shot-chaining protocol (verbatim, Bible 23 B3)

**The chain (Bible 23 A7):**
1. Generate or select a strong reference still for shot 1.
2. Animate that still using image-to-video, per the motion-only discipline.
3. Extract the last frame of the resulting clip, at the highest resolution export available.
4. Use that extracted last frame as shot 2's `start_image` (or as shot 1's `end_image` if the model supports FLF2V and both shots are planned together in advance).
5. Animate shot 2 from that frame.
6. Repeat for each subsequent shot.

**Log format, one row per shot (verbatim):**

| Shot ID | Source still / extracted frame | Extraction method + timecode (if applicable) | Model / preset used | Prompt or preset_id | start_image used | end_image used (if any) | Output clip location | Last frame extracted for next shot? |
|---|---|---|---|---|---|---|---|---|
| SHOT_01 | Reference still generated fresh | n/a | kling3_0, free-text | "[full prompt text]" | reference_still_01.png | none | shot_01_output.mp4 | Yes, frame at 00:03:24 |
| SHOT_02 | Extracted last frame of SHOT_01 | Exported at 00:03:24, full-res PNG | kling3_0, free-text | "[full prompt text]" | shot_01_lastframe.png | none | shot_02_output.mp4 | Yes, frame at 00:04:01 |
| SHOT_03 | Extracted last frame of SHOT_02, planned FLF2V with a new end frame | Exported at 00:04:01, full-res PNG | kling3_0, FLF2V mode | "[transition-only prompt text]" | shot_02_lastframe.png | new_end_frame_03.png | shot_03_output.mp4 | No, sequence ends here |

**Protocol rules:**
- Every extracted frame gets a filename and a stored location before the next shot is generated, never "I'll grab it later." Clips get regenerated, re-cropped, and overwritten; a frame extracted after the fact from a file that has since changed is not reliable.
- Log the full prompt or preset_id verbatim, not a paraphrase. If a shot needs regenerating six weeks later, the exact prompt is the only way to reproduce or deliberately vary the result.
- If any shot in the chain is regenerated, every downstream shot that depended on its extracted last frame is now stale and must be flagged for review, even if the new version looks similar. A frame that looks similar to a human eye is not guaranteed to be similar enough for a model performing FLF2V interpolation.
- Note the model/version explicitly. Model versions change their motion behavior between releases.

### The three input roles, never to be confused (Bible 23 A3)

| Role | What it does | What it is for | Which models expose it |
|---|---|---|---|
| **start_image** | This exact image becomes the literal first frame of the generated clip. The model animates forward from it. | The standard image-to-video case: you have one still and want to bring it to life. | Nearly universal across current image-to-video models. |
| **end_image** | Used together with start_image. The model is told the first frame AND the last frame, and generates the motion that plausibly connects the two. | Precise handoffs, creatively non-negotiable ending compositions, and perfect seamless loops (same image as both start and end). | Kling 3.0 specifically supports both together; industry term FLF2V; Luma keyframes is the equivalent. |
| **image_references** | Style or identity influence carried into the generation without that image being the literal first or last frame. | Keeping a character, product, or visual identity consistent across shots that are NOT directly continuous: cutaways, different angles, a different scene in the same world. | gemini_omni, wan2_6, seedance_2_0, seedance_2_0_mini. **wan2_7 does NOT expose this.** |
| **audio_references** | An existing audio track the generated picture must sync to. Inverts the normal order: audio locked first, picture built to match. | A voiceover, music cue, or line reading that already exists and cannot be regenerated. | wan2_6, wan2_7, seedance_2_0, seedance_2_0_mini. Of these, only wan2_7 and the Seedance pair also accept start_image, so those three are the only options for audio-synced AND frame-locked in one generation. **gemini_omni does NOT expose this.** |

**The distinction that must never be confused:** `start_image` says "this pixel-for-pixel image is where the video begins." `image_references` says "let this image inform who/what this looks like, without constraining the first frame to be identical to it."

## 5.5 Failure modes and under-specification tells (verbatim, Bible 23 B5)

- **Re-describing the subject instead of specifying motion.** Tell: the output looks like the still image with minor, unpredictable drift rather than deliberate animation, or the subject's appearance visibly shifts away from the reference, because the restated description competed with the image as a source of truth.
- **Forgetting to specify what must stay still.** Tell: unwanted secondary animation appears everywhere, background elements sway, unrelated objects shift, text or logos warp, none of which were asked for.
- **Chaining shots without extracting a clean handoff frame.** Tell: visible discontinuity at the cut, a slightly different wardrobe detail, a slightly different head angle, a slightly different lighting state, adding up to a sequence that reads as several different generations stitched together.
- **Choosing free-text prompting when a proven preset would have been safer.** Tell: multiple generation attempts that each get closer to, but never quite match, a well-known effect a preset would have delivered on the first try.
- **Overloading a single prompt with competing camera and subject instructions.** Tell: the camera move reads as vague or directionless, an averaged compromise between instructions rather than a clean execution of any one.

## 5.6 Regeneration trigger list (verbatim, Bible 23 B6)

- **The source reference image changes.** A new still, a re-crop, a re-grade, or any pixel-level change to the start_image invalidates the existing motion prompt's assumptions about composition and framing. Rebuild, do not reuse blindly.
- **The next shot's requirements change.** If a downstream shot's needs shift (a different opening composition, a different pacing, a different aspect ratio), the current shot's end_image or its intended last-frame extraction point must be reconsidered.
- **A shift from single-image to first/last-frame mode, or vice versa.** These are different generation tasks with different prompting rules. A prompt written for single-image animation will not transfer cleanly to FLF2V mode, and vice versa.
- **A platform or aspect-ratio change.** Can break FLF2V mode specifically, since start and end frames are expected to share aspect ratio, and can change which camera-control vocabulary is native versus which needs spelling out in free text.

---
---

# SECTION 6: TEXT-TO-MUSIC GENERATION (Bible 24)

## 6.1 Prompt construction template (verbatim, Bible 24 B2)

Use this seven-line skeleton for any cue, instrumental or vocal, and fill each line explicitly rather than skipping ones that "feel obvious." An empty line is a control you are choosing not to use, which is a real decision, not a default.

```
GENRE / SUBGENRE:        [named genre, dominant tag first]
MOOD / EMOTION:          [2-4 adjectives, can be compound e.g. "warm but uneasy"]
INSTRUMENTATION:         [named instruments, not "music" or "a beat"]
TEMPO:                   [BPM figure and/or slow/mid/uptempo descriptor]
STRUCTURE:               [section tags for full songs; descriptive arc for cues,
                          e.g. "builds gradually, no release" or "flat, steady, no build"]
VOCAL STYLE (if any):    [gender, tone, language, or "instrumental only"]
NEGATIVE / EXCLUDE:      [what to avoid: instruments, qualities, structural moves]
DURATION / LOOP:         [exact seconds/minutes; "must loop seamlessly" if applicable]
```

**Worked fill, example: a 20-second product-hero cue for a commercial deliverable.**

```
GENRE / SUBGENRE:        Modern electronic-pop, minimal
MOOD / EMOTION:          Confident, clean, aspirational
INSTRUMENTATION:         Analog synth pads, subtle plucked synth arpeggio, soft clap layer
TEMPO:                   Mid-tempo, around 104 BPM
STRUCTURE:               Starts minimal, one clear lift at the midpoint, ends on a
                          confident held chord, no fade
VOCAL STYLE (if any):    Instrumental only, no vocals
NEGATIVE / EXCLUDE:      No distorted guitar, no aggressive drum fills, no dissonance
DURATION / LOOP:         Exactly 20 seconds, does not need to loop, hard end acceptable
```

Assembled into a single style-field prompt: *"Modern minimal electronic-pop, confident and clean, aspirational, analog synth pads with a subtle plucked arpeggio and soft claps, mid-tempo around 104 BPM, starts minimal and lifts once at the midpoint, ends on a confident held chord with no fade, instrumental only, no vocals, no distorted guitar, no aggressive drum fills, no dissonance, 20 seconds."*

### The seven prompt components (Bible 24 A2)
1. **Genre and subgenre tags.** Lead with the dominant genre; the first tag carries the most weight.
2. **Mood and emotion descriptors.**
3. **Instrumentation, named specifically.** The single highest-leverage lever in the entire prompt.
4. **Tempo.** BPM figure where honored, descriptive band as fallback.
5. **Song or cue structure.** Literal section tags ([Intro] [Verse] [Pre-Chorus] [Chorus] [Bridge] [Outro]) for full-song tools; descriptive arc for instrumental cues.
6. **Vocal style direction** where supported: gender, tone (breathy, belted, spoken-word, whispered), language. Inline delivery cues like "(whispered)" or "(belting)" can be placed in lyrics fields on Suno.
7. **Negative prompting.** "No vocals," "no distorted electric guitar," "avoid harsh cymbals," "no 4-on-the-floor kick." Underused and often more effective than rewording the positive prompt.

**Reference-track rule:** describe a style or era, never name a specific living artist. "In the style of early-2000s British trip-hop" does the descriptive work without the compliance risk. Artist names can block a generation outright and are less portable across tools.

## 6.2 The six worked example prompts (verbatim, Bible 24 A3)

**Template 1: Short instrumental underscore bed for a film scene (dialogue-driven, needs to sit under speech)**

> Prompt: *"Minimal ambient piano and soft string pad, warm and intimate, slow tempo around 68 BPM, no percussion, no vocals, low dynamic range so it sits quietly under dialogue, gentle rise in the final third, soft fade rather than a hard stop."*

**Template 2: Full song with lyrics and verse/chorus structure (for a needle-drop-style branded film or closing-credits song)**

> Prompt (style field): *"Indie folk-pop, warm acoustic guitar, brushed drums, upright bass, female vocal, breathy and warm tone, uplifting but bittersweet, mid-tempo around 100 BPM, clean modern production, radio-ready mix."*
> Prompt (lyrics field): *"[Intro] [Verse 1] soft acoustic guitar figure, sparse vocal entrance [Pre-Chorus] building layers [Chorus] full band, wide vocal harmony [Verse 2] [Chorus] [Bridge] stripped back to just voice and guitar [Chorus] final, biggest version [Outro] fade on guitar alone."*

**Template 3: Tense, suspenseful score cue (thriller or horror beat)**

> Prompt: *"Dark orchestral tension cue, low sustained strings, dissonant cluster chords, sparse prepared-piano hits, distant metallic percussion, no clear melody, constant unresolved tension with no release, occasional sudden stinger hit, ends abruptly rather than fading, no vocals, no warm or major-key elements."*

**Template 4: Upbeat commercial jingle (short-form ad, broadcast or social)**

> Prompt: *"Upbeat commercial jingle, bright pop-funk, punchy horns, slap bass, claps, energetic male-female vocal duet, catchy singable hook, fast tempo around 128 BPM, polished radio-ready mix, short and punchy, 15 to 30 seconds, big confident ending hit rather than a fade."*

**Template 5: Looping short-form game/UI music bed (seamless loop, no build, no ending)**

> Prompt: *"8-bit chiptune style, cheerful and light, simple repeating melodic phrase, steady tempo, no build or climax, consistent energy throughout, designed to loop seamlessly with no fade in or fade out, short duration, 8 seconds."*

**Template 6: Emotional string-led theme (a recurring emotional motif, e.g. a character or brand theme)**

> Prompt: *"Emotional orchestral theme, solo cello leading into full string section, simple memorable melodic motif that could recur throughout a film, warm and hopeful with an undercurrent of sadness, slow to moderate tempo around 76 BPM, sparse piano support, no percussion, no vocals, builds gradually from solo instrument to full ensemble, ends on a resolved, warm final chord."*

## 6.3 Model / tool selection decision table (verbatim, Bible 24 B4)

| Goal | Best-fit tool(s) | Why |
|---|---|---|
| Full song with lyrics and vocal performance | Suno or Udio | Only tools in this landscape genuinely built for verse/chorus songwriting with convincing vocals. |
| Instrumental score cue tied to picture | Stable Audio, Lyria/MusicFX, or AIVA (for orchestral-leaning cues) | Instrumental-first models with more usable duration/mood control than song-generation tools, none of which are built for locked-picture sync but all of which are closer than Suno/Udio. |
| Short seamless loop (game/UI/ambient bed) | Higgsfield sonilo_music for very short game/UI loops within its duration-only control surface; Mubert or Soundraw for longer branded background loops with clearer commercial licensing | sonilo_music is honestly narrow (duration only, "game pipeline only") but fit-for-purpose at this exact job; Mubert/Soundraw add real licensing structure for anything beyond an internal game loop. |
| Classical / orchestral score | AIVA | The only tool in this table purpose-built around a large classical/cinematic preset library and MIDI-level editing. |
| Commercially licensed production music at scale (agency library use) | Soundraw or Mubert (paid tiers), or Stable Audio where licensed-training-data provenance matters to the client | These are the tools explicitly built as licensed-production-music services rather than single-artifact songwriting tools. |
| Fastest and cheapest first pass / scratch temp track | Google MusicFX (free) for a quick instrumental idea, or Suno/Udio free tiers for a quick song sketch | Free, no-commitment tiers exist on both; note both carry no-commercial-use restrictions, so treat outputs from free tiers as temp/scratch only, never as the delivered final asset. |

### Scoring to picture rules (Bible 24 A5)
- **When a cue must hit an exact beat:** generate longer than needed and edit down in post. Almost none of these tools accept "make the tension peak land at second 14" with any reliability.
- **When a cue must fit an exact duration:** prefer tools with explicit, reliable duration parameters over tools where duration is only loosely steerable through descriptive language.
- **Full-song tools (Suno, Udio) are the wrong tool** for hard-locked-picture score cues. Use them for songs (opening titles, closing credits, a needle-drop moment) and use instrumental/production-focused tools for anything that must obey a locked edit's timing.

### Licensing gate before any generated track is locked (Bible 24 A6)
Confirm (a) which plan tier generated it, (b) whether that tier includes outright ownership or only a use-license, (c) whether that use-license survives a future subscription cancellation, and (d) whether the platform makes any training-data licensing claim a client's legal team might ask about. AIVA is the clearest illustration: only its Pro tier grants outright copyright ownership.

## 6.4 Consistency protocol: the score-consistency protocol (verbatim, Bible 24 B3)

**Step 1: Write one master music brief before generating anything.** It should cover, in prose, the following four elements for the whole project:
- **Genre and instrumentation palette:** the family of sounds every cue in this project will draw from (e.g., "acoustic and lightly electronic, built around piano, warm strings, and soft analog synth texture; no heavy distortion, no aggressive electronic genres").
- **Tempo range:** the band the whole project should live within (e.g., "60-110 BPM across all cues, no cue faster than uptempo-moderate").
- **Mood arc:** how the emotional tone is allowed to move across the project (e.g., "opens hopeful, moves through tension in the middle act, resolves warm at the end").
- **Any hard exclusions for the whole project:** instruments, genres, or qualities that should never appear in any cue regardless of individual cue mood (e.g., "no vocals anywhere in the score," "never use a full drum kit, only hand percussion").

**Step 2: Generate every individual cue as a variation on that same written brief**, not as an independent prompt. The master brief's genre/instrumentation/tempo-range/exclusions language should appear, close to verbatim, inside every individual cue prompt, with only the cue-specific mood, structure, and duration layered on top.

**Step 3: Keep a log of which brief-version produced which cue.**

| Cue | Brief version used | Tool | Generated date | Notes |
|---|---|---|---|---|
| Opening theme | v1 | Suno | (date) | Full song, sets the vocal identity for the project |
| Scene 4 tension cue | v1 | Stable Audio | (date) | Instrumental, drawn from v1 palette |
| Scene 9 tension cue | v2 (strings removed per director note) | Stable Audio | (date) | Brief revised; earlier cues NOT regenerated, flag for review |
| Closing song | v2 | Suno | (date) | Should be checked against v1 opening theme for continuity risk |

**Additional continuity tactic (Bible 24 A7):** use a tool's continuation, stem, or remix features where available rather than generating every cue from scratch. Suno and Udio both support extending, remixing, and stem-separating existing generations, which carries forward actual audio DNA that a from-scratch prompt with similar wording cannot replicate. Where a tool does not expose this (sonilo_music exposes none), the written master brief is the only available consistency mechanism and must be leaned on harder.

## 6.5 Failure modes and under-specification tells (verbatim, Bible 24 B5)

- **A prompt naming a specific living artist by name, where the tool's terms prohibit it.** Tell: any prompt containing a proper name of a musician, band, or living public figure. Fix: rewrite as a genre/era/production description.
- **A looping cue with an audible seam.** Tell: a click, pop, or tonal jump at the loop point when the clip repeats back-to-back. Fix: request an explicit loop mode where offered; otherwise generate longer than needed and manually crossfade the loop point in an audio editor.
- **A cue generated with no reference to the project's established sonic palette.** Tell: a scene cue that sounds fine in isolation but next to the rest of the score sounds like it belongs to a different project (mismatched instrumentation family, tempo far outside range, mismatched production polish). Fix: regenerate the offending cue against the actual written master brief rather than trying to fix it in the mix.
- **Unclear licensing terms discovered after a track is already locked into a deliverable.** Tell: someone asks "can we actually use this commercially" only after the cue is in a client-facing cut. Fix: add a licensing sign-off checkpoint before any cue is locked into a final edit, not just before final delivery.

## 6.6 Regeneration trigger list (verbatim, Bible 24 B6)

- **A cut's duration changes.** Any cue whose structure or ending was built around the old duration should be treated as provisionally invalid until re-checked against the new cut length, not assumed to "probably still work."
- **A scene's tone changes.** A re-edit shifting a scene from ambiguous tension to clear resolution invalidates a cue built around the old tonal read; regenerate against an updated cue-specific brief, not a tempo tweak on the old one.
- **A shift from temp track to final licensed music.** Any cue generated on a free tier, a scratch basis, or a plan tier without full ownership must be explicitly regenerated (or its licensing status explicitly upgraded) before it is treated as a final deliverable asset.
- **A platform or delivery licensing requirement changes.** A track approved for one platform's licensing terms is not automatically cleared for a different distribution context. Any change in where or how the final asset will be distributed triggers a fresh licensing check for that specific use case.

---
---

# SECTION A (SYNTHESIS): THE UNIFIED HIGGSFIELD MODEL CAPABILITY MATRIX

**Ground truth for the four disputed video models is the CORRECTED matrix from the live `models_explore` schema fetch of 2026-07-26 (Bibles 20 and 23). It is reproduced here without alteration and overrides any older grouping.**

## A.0 The verified core (reproduce exactly, never re-derive)

| Model | start_image | end_image | image_references | video_references | audio_references |
|---|---|---|---|---|---|
| `wan2_6` | NO | NO | YES | YES | YES |
| `wan2_7` | YES | YES | NO | NO | YES |
| `gemini_omni` | NO | NO | YES | YES | NO |
| `seedance_2_0` / `_mini` | YES | YES | YES | YES | YES |

Three operational consequences, stated in the source and binding on any skill built from this file:
1. `wan2_6` and `wan2_7` are NOT interchangeable variants. `wan2_6` cannot accept a first frame at all, so it can never be used for true image-to-video off a locked still.
2. `gemini_omni` does not accept `audio_references`, so it cannot be synced to a pre-existing voiceover or music track despite generating its own native audio.
3. The Seedance 2.0 pair is the only family exposing all five input roles simultaneously, which is why it is the default whenever a shot must be frame-locked, identity-consistent and audio-synced at once.

## A.1 Full video model matrix

| Model ID | Output type | Best at | start_image | end_image | image_references | video_references | audio_references | Max resolution | Duration range | Special params |
|---|---|---|---|---|---|---|---|---|---|---|
| `cinematic_studio_3_0` | Video | Higgsfield's most advanced cinema-grade model | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 4K (480p to 4K) | 4 to 15 sec | `genre` (action / horror / comedy / noir / drama / epic), optional `generate_audio` |
| `cinematic_studio_video_v2` | Video | Prior-generation cinema-grade model, unique control set; native multi-shot inside one generation | YES | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | `genre`, pro/std `mode`, sound on/off, `speedramp` (slowmo / speedup / impact), `multi_shots` (splits one `multi_prompt` into several shots), `cfg_scale` |
| `cinematic_studio_video` | Video | Earlier Cinema Studio generation, simple control set | YES (also accepts `image`) | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Fixed 5 or 10 sec only | `slow_motion` (bool), `sound` (bool) |
| `minimax_hailuo` | Video | Hosted Hailuo: natural physics, facial emotion, narrative-style prompting | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 1080p | 6 or 10 sec | Variants: minimax / minimax-fast / minimax-2.3 / minimax-2.3-fast |
| `wan2_6` | Video | Open-weight stylized/experimental; reference-only, no frame conditioning | **NO** | **NO** | **YES** | **YES** | **YES** | UNKNOWN | UNKNOWN | None documented beyond the reference inputs |
| `wan2_7` | Video | Open-weight stylized/experimental; frame-conditioned, audio-syncable | **YES** | **YES** | **NO** | **NO** | **YES** | UNKNOWN | UNKNOWN | None documented beyond frame + audio inputs |
| `seedance1_5` ("Seedance 1.5 Pro") | Video + native audio | Reliable general-purpose motion; millisecond lip sync; the fallback when a reference-locked subject is a person | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 1080p | 4 / 8 / 12 sec | Native audio |
| `seedance_2_0` | Video + native audio | State of the art for reference-driven consistency; multi-SKU product work; scenes, objects, architecture (documented weaker on people) | **YES** | **YES** | **YES** | **YES** | **YES** | 4K | UNKNOWN | std vs fast `mode`; filename-addressed references (`@image1`, `@video1`); recommended 4-5 assets total, each with one assigned job |
| `seedance_2_0_mini` | Video + native audio | Same five input roles as seedance_2_0, lighter tier | **YES** | **YES** | **YES** | **YES** | **YES** | 4K | UNKNOWN | std vs fast `mode` |
| `kling2_6` | Video | Cinematic motion, advanced physics | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | modes std / pro / 4k |
| `kling3_0` | Video + native audio | Cinematic motion, advanced physics, native multi-shot, audio sync, motion transfer; FLF2V (start + end together) | YES | YES | UNKNOWN | UNKNOWN | UNKNOWN | 4K (mode) | UNKNOWN | multi-shot, audio sync, motion transfer; modes std / pro / 4k |
| `kling3_0_turbo` | Video | Faster Kling 3.0 tier | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | modes std / pro / 4k |
| `veo3` | Video + native audio | Google Veo: native audio quality (dialogue, ambient, effects) | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 8 sec cap per generation (Veo family) | veo-3-preview vs veo-3-fast variants |
| `veo3_1` | Video + native audio | Veo 3.1: first-frame/last-frame conditioned transitions with synchronized audio | YES | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 8 sec cap per generation | basic / high / ultra quality tiers |
| `veo3_1_lite` | Video + native audio | Budget Veo 3.1 tier | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 8 sec cap per generation | UNKNOWN |
| `grok_video` | Video + native audio | xAI Grok Video, native audio direction from the start (music, SFX, ambient, lip-synced dialogue and singing) | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Native audio direction |
| `grok_video_v15` | Video + native audio | Specialist: animates one start image into cinematic video with native audio direction | YES | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Native audio direction |
| `gemini_omni` ("Gemini Omni Flash") | Video + native audio | Google reference-driven model; generates native audio but cannot be synced to existing audio and cannot be frame-locked | **NO** | **NO** | **YES** | **YES** | **NO** | UNKNOWN | UNKNOWN | Native audio generation |
| `happy_horse_video` | Video | Budget tier: lowest-cost text-to-video in the roster, for animatics and idea validation | UNKNOWN (listed among start_image models in Bible 23 A6.6) | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | None documented |
| `marketing_studio_video` | Video (templated ad) | Templated ads pipeline, not a free-text model | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Built around hooks, settings and `ad_reference_id` rather than a from-scratch prompt |
| `higgsfield_preset` | Video (templated image-to-video) | Pre-engineered, validated named motion recipes (EARTH ZOOM, FLOAT SPIN, STICKER PEEL, ORBIT 360, ACTION FIGURE, CGI BREAKDOWN, ICE STATUE, ANDROID ASSEMBLE, 3D RENDER, 60-plus total) | Requires one input image (the preset's only image input) | NO | NO | NO | NO | UNKNOWN | UNKNOWN | `preset_id` (required, retrieved via `presets_show`); no free-text motion prompt written at all |

## A.2 Full image model matrix (models named in Bible 19)

| Model ID | Output type | Best at | start_image | end_image | image_references | video_references | audio_references | Max resolution | Duration range | Special params |
|---|---|---|---|---|---|---|---|---|---|---|
| `soul_2` / `soul_v2` | Image | Recurring character identity across many separate generations | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | `soul_id` |
| `soul_cinematic` ("Soul Cinema") | Image | Photoreal, moody, cinematic character portraits with recurring identity | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | `soul_id` |
| `soul_cast` | Image | Consistent cinematic character identity as its core feature | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | `soul_id`, `budget` (10-500) |
| `soul_location` | Image | Recurring environments, sets and backgrounds across angles and times of day | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | Location-consistency equivalent of `soul_id` |
| `nano_banana` (base) | Image | Fast, cheap drafts before committing | n/a | n/a | YES (native `image_references`) | n/a | n/a | 1K / 2K / 4K tiers exist across the family; base tier ceiling UNKNOWN | n/a | Explicit resolution tiers |
| `nano_banana_2` | Image | Mid-tier Nano Banana | n/a | n/a | YES | n/a | n/a | 1K minimum tier confirmed; ceiling UNKNOWN | n/a | Resolution tiers |
| `nano_banana_2_lite` | Image | Cheap/fast tier | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | UNKNOWN |
| `nano_banana_pro` | Image | Best text/diagram rendering; multi-image consistency; final 4K client deliverable | n/a | n/a | YES | n/a | n/a | 4K (explicit 1K/2K/4K tiers) | n/a | Resolution tier selection |
| `cinematic_studio_2_5` ("Cinema Studio 2.5") | Image | Final 4K cinematic client deliverable | n/a | n/a | UNKNOWN | n/a | n/a | 4K (explicit 1K/2K/4K tiers) | n/a | Resolution tier selection |
| `z_image` | Image | Fast/cheap stylized drafts | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | UNKNOWN |
| `marketing_studio_image` / `ms_image` | Image (templated ad) | Batch-friendly, brand-kit-aware product ad generation | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | Brand-kit folding; batch runs |
| `gpt_image_2` (GPT Image family, hosted) | Image | Best text rendering; logos, diagrams, infographics | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | UNKNOWN |
| OpenAI Hazel (hosted) | Image | Best text rendering; logos, diagrams, infographics | n/a | n/a | UNKNOWN | n/a | n/a | UNKNOWN | n/a | UNKNOWN |
| Seedream (v4 / v4.5 / v5, hosted) | Image | High resolution with precise instruction-based editing and multi-image referencing | n/a | n/a | YES (multi-image referencing) | n/a | n/a | 4K to 6K | n/a | UNKNOWN |
| FLUX family (Pro / Flex / Max / Schnell / Dev, hosted) | Image | Prompt adherence and photorealism; Schnell for drafts, Max/Pro for final | n/a | n/a | YES (native `image_references`) | n/a | n/a | Scales by megapixel; ceiling UNKNOWN | n/a | Flex exposes fine-grained sampling controls |
| `outpaint` | Image (edit) | Extending an existing image beyond its borders to change aspect ratio without full regeneration | Takes a source image | n/a | n/a | n/a | n/a | UNKNOWN | n/a | UNKNOWN |
| bytedance image upscaler | Image (edit) | Bridging a good low-res draft up to delivery quality | Takes a source image | n/a | n/a | n/a | n/a | UNKNOWN | n/a | UNKNOWN |

## A.3 Audio and voice models named in the connected environment (for completeness of routing)

| Model ID | Output type | Best at | Notes / special params |
|---|---|---|---|
| `text2speech_v2` | Speech | Router, not a model | Required `variant`: `elevenlabs` / `minimax` / `seed_speech` / `vibe_voice` / `cozy_voice`; plus `voice_type` (preset vs element/cloned) and `voice_id`. The `elevenlabs` variant is a reseller layer with its own margin. |
| `create_voice` / `create_voice_from_confirmed_audio` | Voice asset | Building a cloned voice from reference audio | Written, specific consent required before use. |
| `qwen_audio_tts` ("Qwen Audio 3.0 TTS Flash") | Speech | Natural-language `instruction` parameter for emotion, dialect, speed, style | Documented languages: `zh, en, fr, de, ja, ko, ru, pt, th, id, vi, it, ms`. **Arabic NOT supported.** |
| `inworld_text_to_speech` | Speech | The one model in the environment with confirmed named Arabic presets: "Nour (ar)", "Omar (ar)" | FAL-hosted, marked game-pipeline; test before assuming parity with a commercial VO provider. |
| `seed_audio` ("Seed Audio 1.0", ByteDance) | Speech | Mislabeled as text-to-audio; it is TTS | Params: voice_type, voice_id, speech_rate, pitch_rate. **Never use for SFX, ambience or foley.** Language list UNKNOWN. |
| `mirelo_text_to_audio` | SFX / audio | Text-to-audio sound effect generation with controllable duration | FAL-hosted, schema-flagged "game pipeline only". Requires a `duration` parameter. |
| `sonilo_music` ("Sonilo Music") | Music | Short game/UI music loops | FAL-hosted, schema-flagged "game pipeline only". **`duration` is its only exposed parameter.** No genre/mood/instrumentation/tempo/structure/lyric controls, no loop mode. |

---
---

# SECTION B (SYNTHESIS): THE CROSS-MODALITY CONTINUITY CHAIN

How the six modalities hand off to one another in a real production, stating exactly which asset from which step feeds which parameter of which next step.

## B.1 The canonical order of operations

The pipeline is **still first, audio locked second, motion third, sound design fourth, score fifth**, with one deliberate inversion: any picture that must be lip-synced or beat-synced to a pre-existing performance requires the audio to be locked BEFORE the motion generation, because it enters that generation through `audio_references`.

```
STEP 1  Bible 19   Locked still (character / product / location)
                   OUT: approved_still.png
                          |
                          |-----------------------------> feeds STEP 3 as `start_image`
                          |-----------------------------> feeds STEP 3 as `image_references` (non-continuous cutaways)
                          v
STEP 2  Bible 22   Locked VO take (per language, separate passes)
                   OUT: vo_take_final.wav
                          |
                          |-----------------------------> feeds STEP 3 as `audio_references`
                          v
STEP 3  Bible 23/20 Shot clip, frame-locked and audio-synced
                   OUT: shot_XX_output.mp4  +  shot_XX_lastframe.png
                          |
                          |-- shot_XX_lastframe.png ----> feeds NEXT shot's `start_image`
                          |-- shot_XX_output.mp4 -------> feeds NEXT shot's `video_references` (motion/pacing carry)
                          |-- exact frame numbers ------> feeds STEP 4 sync points
                          |-- locked runtime -----------> feeds STEP 5 cue duration
                          v
STEP 4  Bible 21   SFX elements + ambience bed, generated to frame-exact duration
                   OUT: separate stems, one per element
                          v
STEP 5  Bible 24   Music cues generated against the master music brief and the locked cut length
                   OUT: cue stems
                          v
                   MIX (Bible 10 hierarchy: VO > music > effects by default)
```

## B.2 The exact handoffs, parameter by parameter

| # | Handoff | Source asset (from) | Destination parameter (to) | Binding rule |
|---|---|---|---|---|
| 1 | Still to motion, frame-locked | The approved locked still from Bible 19's consistency protocol step 7 (`approved_still.png`) | `start_image` on the video model | Bible 20 B3 step 2: use the locked still as `start_image` for EVERY clip featuring that character or product, rather than re-describing appearance. Once `start_image` is set, the text prompt describes motion, camera, lighting and sound ONLY. |
| 2 | Still to motion, identity-only (non-continuous shot) | The same reference SET (front, three-quarter, profile/back, full-body) from Bible 19 B3 step 1 | `image_references` on `wan2_6`, `gemini_omni`, `seedance_2_0`, `seedance_2_0_mini` | Use for cutaways, different angles, and different scenes in the same world where the opening framing must NOT be identical to the reference. **`wan2_7` cannot take this input.** |
| 3 | Locked VO to motion, lip/beat sync | The approved VO take from Bible 22 (after native-dialect reviewer sign-off for any Arabic dialect deliverable) | `audio_references` on `wan2_6`, `wan2_7`, `seedance_2_0`, `seedance_2_0_mini` | **`gemini_omni` cannot accept this.** If the shot must ALSO open on a locked still, only `wan2_7`, `seedance_2_0` and `seedance_2_0_mini` can do both in one generation (`start_image` + `audio_references`). `wan2_6` can take the audio but cannot take the first frame. |
| 4 | Music to motion, beat sync | A locked music cue from Bible 24 | `audio_references` on the same four models as handoff 3 | Same model constraint. This is the "audio locked first, picture built to match" inversion described in Bible 20 A5 and Bible 23 A3. |
| 5 | Shot to next shot, frame continuity | `shot_XX_lastframe.png`, extracted at full resolution at the clip's final timecode before the next generation is fired | `start_image` of shot XX+1 | Bible 23 B3: never "I'll grab it later". Filename and stored location assigned before the next shot is generated. |
| 6 | Shot to next shot, planned interpolation | The intended opening composition of shot XX+1, generated as a still | `end_image` of shot XX (FLF2V mode, Kling 3.0 / Luma keyframes / `wan2_7` / `seedance_2_0` / `veo3_1` / `cinematic_studio_video_v2`) | Both frames must share aspect ratio. The prompt describes the transition only, never either endpoint. Identical image as both start and end produces a seamless loop. |
| 7 | Shot to next shot, motion continuity | `shot_XX_output.mp4` | `video_references` of shot XX+1 on `wan2_6`, `gemini_omni`, `seedance_2_0`, `seedance_2_0_mini` | Reach for this when what must persist is movement (camera move, walk cycle, established rhythm), not appearance. |
| 8 | Locked picture to SFX | The locked cut's exact frame number for each sync event (e.g. frame 142 of a 24fps sequence) and the measured span of the visual action | The `duration` parameter of the SFX generation, plus the temporal-shape clause of the prompt | Bible 21 B3: generate to the exact duration and internal arc rather than generating generic and trimming. Place the file so its TRANSIENT, not its file start, lands on the frame. |
| 9 | Locked picture to ambience | The scene's runtime and the space's material/acoustic description (which comes from the Locations master table's Physical description, Practical sources and Color accents columns) | The SOURCE / MATERIAL / SPACE slots of the Bible 21 template, plus the loop vocabulary | One clean bed, no discrete foreground events baked in. Every foreground event is a separate one-shot generation, layered as its own stem. |
| 10 | Locked picture to music | The locked cut length and, where a cue must hit a beat, the hit-point timecodes from the Bible 10 cue list | The DURATION / LOOP slot and the STRUCTURE slot of the Bible 24 template | Generate longer than needed and edit down when a cue must hit an exact beat; no current tool reliably honors "peak at second 14". |
| 11 | Native audio versus locked audio decision | Whether a locked VO / licensed track / brand sonic asset already exists | Whether the video model's `generate_audio` / `sound` toggle is on, and whether `audio_references` is used at all | Bible 20 A7: trust native audio when sound is tightly coupled to visible action; override in post when it must match an existing brand asset, when quality must be normalized across a sequence, or when stems are required for delivery. |

## B.3 Chain-integrity rules

1. **The still is approved before any motion is generated.** Every downstream clip inherits whatever is wrong with it. This is the cheapest point in the whole pipeline to catch a problem (Bible 20 A5, Bible 23 A7).
2. **The VO is approved, including native-dialect review, before it is used as `audio_references`.** Regenerating VO after picture is built to it invalidates the picture, not just the audio (Bible 22 B6).
3. **Do not sign off native-audio sound design as final until picture is final.** They regenerate together (Bible 20 B5).
4. **If any shot in a chain is regenerated, every downstream shot conditioned on its extracted last frame is stale and must be flagged for review**, even if the new version looks similar to a human eye (Bible 23 B3).
5. **If a cut length changes, three things regenerate, not one:** the shot clip (re-paced prompt), the SFX elements matched to that cut, and any music cue whose structure was built around the old duration (Bibles 20, 21, 24 trigger lists, all in agreement).
6. **Model version changes break the chain silently.** Log the model and version on every link; a re-generation on a newer version does not guarantee the same frame-to-frame interpolation (Bible 23 B3).

---
---

# SECTION C (SYNTHESIS): THE ASSET WRITE-BACK SCHEMA

Every generated asset must be written back to the master table row it belongs to, so no asset is orphaned from its reference entry. Master tables referenced: the **Cast and Character Master Table** and the **Locations and Sets Master Table** (Bible 16 B3 and B4), the **Shot List** (Bible 15 B2), and the **Sound and Music Plan** sections (Bible 10 B7). Where an existing column already carries the semantic meaning, write into it; where none exists, add the named column once, project-wide, and treat it as mandatory from that point (Bible 16's missing-column discipline).

## C.1 The write-back table

| Asset type | Produced by | Master table it belongs to | Row it belongs to | Column the URL / ID is written into | Also write |
|---|---|---|---|---|---|
| **Location reference still** | Bible 19 (still generation, `soul_location` or `image_references` set) | Locations and Sets Master Table (Bible 16 B4) | The row for that zone, keyed on **ID** and **Zone name** | New column **Reference still asset** (file path/URL of every angle in the reference set, not just one frame). If a single column is preferred, append to **Physical description** as a named asset line, never as a replacement for the written description. | The identity mechanism and its value (`soul_id` / seed / `image_references` filenames) in a new **Identity lock** column; the generating prompt verbatim in a **Generation prompt** column; **Status** set to locked/provisional |
| **Cast / character reference still** | Bible 19 (still generation, `soul_id` / `--cref` / LoRA / `image_references` set) | Cast and Character Master Table (Bible 16 B3) | The row for that person or character, keyed on **ID** and **Name / character** | New column **Reference still asset** (the full reference SET: front, three-quarter, profile/back, full-body, each with its own path) | **Identity lock** column holding the `soul_id`, `--cref` URL + `--cw` value, LoRA name, or `image_references` filenames; **Generation prompt** column with the verbatim prompt; the seed if locked; **Wardrobe: continuity notes** updated if the still fixes a look |
| **Shot video clip** | Bibles 20 / 23 (text-to-video or image-to-video) | Shot List (Bible 15 B2) | The row for that shot, keyed on **Shot No.** | New column **Output clip** (path to `shot_XX_output.mp4`) | New columns: **start_image used**, **end_image used**, **image/video/audio references used**, **Model + version + params**, **Prompt (verbatim)**, **Last frame extracted (filename + timecode)**, **Approval status + date**. These are exactly the columns of the Bible 23 B3 shot-chaining log; the log IS the shot list extension, not a parallel document (Bible 16 A10, parallel table drift) |
| **Extracted handoff frame** | Bible 23 (frame extraction) | Shot List | Two rows: the shot it came FROM and the shot it feeds INTO | Written into **Last frame extracted** on the source shot's row AND into **start_image used** on the destination shot's row | Both cells carry the same filename and the extraction timecode, so the dependency is visible from either end |
| **VO take** | Bible 22 (TTS / cloned voice generation) | Sound and Music Plan, section 8 (VO and Mix Hierarchy) as the primary home; cross-linked to the Shot List | Sound and Music Plan section 8 for the take itself; the Shot List row(s) whose **Copy / VO / Dialogue** column carries those exact words | New column/field **VO take asset** in section 8, one entry per language pass (English and Arabic are separate rows, never one row with two files) | Provider + model/variant + `voice_id`; voice source (preset / voice-designed / cloned) and consent status if cloned; dialect if Arabic; native-dialect reviewer sign-off date (mandatory gate); the script text verbatim WITH its punctuation intact; **VO status** set to scratch or final and **Recorded against** set to the cut version |
| **Music cue** | Bible 24 (text-to-music) | Sound and Music Plan, section 7, the **Cue list** table | The cue's row, keyed on **Cue** with its **In (TC)** and **Out (TC)** | New column **Cue asset** (path to the rendered cue) | New columns: **Brief version used** (v1/v2, per the Bible 24 B3 log), **Tool**, **Generated date**, **Plan tier at generation** and **Ownership status** (the licensing gate from Bible 24 A6, answered before the cue is locked, not after); **Hit points (TC)** confirmed against the delivered audio |
| **SFX element (one-shot / foley / transition)** | Bible 21 (text-to-audio) | Sound and Music Plan, section 4 (**Hero sounds**) for hero elements, or section 5 (**Ambience and Foley**) for everything else; sync-critical elements ALSO get a row in section 9 (**Sync point register**) | The element's row, keyed on its **#** plus **Shot ID** plus **Timecode (master)** | New column **SFX asset** (path to the generated file) | Generated **duration** and the requested temporal shape; the prompt verbatim; whether the transient sits at the file start or after a lead-in (so the editor nudges correctly); in section 9, the **Relationship** (e.g. "1 frame before visual state change"), **Owner**, and **Verified against cut version** |
| **Ambience bed / loop** | Bible 21 (text-to-audio, seamless loop mode) | Sound and Music Plan, section 5 (**Ambience and Foley**) | The row for that scene/shot range and space | New column **Ambience asset** | The **Space** cell must name the same zone name used in the Locations and Sets Master Table, by **ID** plus name, so the acoustic description and the generated bed stay joined; loop length; whether the seam was verified in the mix, not just in isolation |

## C.2 Standing write-back rules

1. **Write back before the next generation fires, never afterwards.** An asset that exists only in a generation tool's history and not in a master table row is orphaned the moment the session ends.
2. **The join key is always the master table's stable ID** (character ID, location zone ID, Shot No., Cue name). Never file an asset under a filename alone.
3. **Every cell is self-contained** (Bible 16 A7). "Same as SHOT_01" is not an acceptable value in a start_image column; write the filename out in full in both rows.
4. **A cut, dropped or superseded asset keeps its row** with a status value and a date. Deleting the row causes existence drift against every table that still references it (Bible 16 B3 rule 3, B4 rule 1).
5. **Prompts are logged verbatim, never paraphrased.** This is stated independently in Bible 20 B3 step 4 and Bible 23 B3, and it is the only mechanism by which a six-week-old asset can be reproduced or deliberately varied.
6. **Model, version and parameters are logged with every asset.** Model versions change motion, pronunciation, and interpolation behavior between releases.
7. **Approval status and date are mandatory columns, never blank.** The whole chain-integrity model in Section B depends on being able to tell an approved locked still from a provisional one at a glance.
8. **When one asset regenerates, walk the write-back schema forward** and flag every downstream row whose column references the old asset. This is the mechanical form of the trigger lists in Sections 1.7, 2.6, 3.7, 4.6, 5.6 and 6.6.
