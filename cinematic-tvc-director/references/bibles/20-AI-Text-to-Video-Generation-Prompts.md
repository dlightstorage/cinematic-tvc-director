# 20. AI TEXT-TO-VIDEO GENERATION PROMPTS

### Prompt Engineering for Generating Video Clips Directly From Text Descriptions
**Film Craft Bible series. Reusable across any project, any client, any format.**

---

## HOW TO READ THIS DOCUMENT

Two halves, deliberately separated.

**Part A** is a craft reference. A human reads it to learn how text-to-video prompting actually thinks: the anatomy of a strong prompt, worked example prompts across six different creative goals, the engine landscape as of mid-2026, and the reference-driven continuity techniques that turn a pile of disconnected clips into a coherent sequence.

**Part B** is an operating manual for an AI subagent that writes, audits and defends text-to-video prompts inside a production pipeline. It contains the questions the role asks before writing a single word of prompt, a reusable construction template, the continuity protocol for multi-clip sequences, a model-selection decision table, and the triggers that force a prompt or generation rebuild.

**Part C** is a dated cost snapshot. AI video pricing changes on a monthly cadence, sometimes faster. Every figure in Part C is timestamped 2026-07-26 and flagged for refresh before it is used in a real budget.

**Claim tagging.** Statements are tagged one of three ways:

| Tag | Meaning |
|---|---|
| **[SOURCED]** | Traceable to an official vendor prompting guide, official pricing page, or a named documentation source, cited inline or in Part C. |
| **[PRINCIPLE]** | Widely held craft convention, working practice, or logical inference from how these systems are documented to behave. True in practice, not attributed to one named source. |
| **[UNVERIFIED]** | A specific number, claim, or status that could not be confirmed against a primary source at the time of writing, or that conflicting sources disagree on. Treat as directional only and verify before relying on it. |

**One structural warning before you start.** A text-to-video prompt looks like a shot description. It is not. A shot list assigns work to a crew: it tells a gaffer what to light, a grip what to rig, an actor what to do, and it can stay silent about anything another department will handle. A text-to-video prompt has no crew to fill gaps. It is the entire creative decision for that clip, compressed into one paragraph, and everything you do not specify gets decided by the model instead of you. **[PRINCIPLE]** This document exists because that difference changes the craft completely.

---
---

# PART A: CRAFT REFERENCE

---

## A1. WHAT TEXT-TO-VIDEO PROMPT ENGINEERING ACTUALLY IS

A text-to-video prompt is a single, self-contained instruction that must simultaneously specify what a shot list normally splits across a dozen people: who or what is on screen, what they physically do across the full duration of the clip, where the camera is and how it moves, what the light and atmosphere feel like, what physically realistic behavior the world should exhibit, and, on models that support it, what the clip sounds like. **[PRINCIPLE]**

OpenAI's own Sora 2 prompting guide states the core mental model directly: prompting should be like briefing a cinematographer who has never seen your storyboard. If you leave out details, they will improvise, and you may not get what you envisioned. **[SOURCED]** That is the entire craft in one sentence, and it is the reason this discipline is not "writing a caption for a video." It is closer to writing a director's shot description, an actor's blocking note, a DP's lighting brief and a composer's cue sheet at the same time, in one paragraph, for a stranger who will execute it literally and exactly once.

### The core difference from a film shot list

| | Film shot list | Text-to-video prompt |
|---|---|---|
| Who fills the gaps | A trained crew, each department reading the parts relevant to them and using professional judgment on the rest | Nobody. The model fills every gap with a statistical guess, and that guess is rarely the guess you wanted |
| Unit of work | One line per camera setup, dozens of lines per scene | One paragraph per generation, four to twenty seconds of screen time |
| Silence on a detail means | "Use standard craft judgment" (lighting continuity, coverage grammar, safe eyeline) | "This will be randomized. Expect drift, morphing, or a default the model considers plausible" |
| Continuity across shots | Enforced by a script supervisor watching continuity live on set | Not enforced automatically at all. Continuity across separate generations must be manufactured with reference images, reference video, or careful re-prompting |
| Revision cost | Re-shoot, expensive, slow | Re-generate, cheap in money, still slow in iteration cycles, and every re-generation is a new roll of the dice unless you lock it down with references |
| Duration is a planning input | The editor cuts to whatever length the story needs | The model imposes a hard duration ceiling per generation (commonly 4 to 20 seconds depending on model), so anything longer than that ceiling is always an editorial assembly of multiple generations, never one continuous shot **[PRINCIPLE]** |

The practical consequence: a text-to-video prompt writer is not a screenwriter and not a shot lister. The closest real job description is a hybrid of director, DP, and script supervisor, working alone, one clip at a time, with no crew to catch what the prompt did not say.

---

## A2. THE ANATOMY OF A STRONG TEXT-TO-VIDEO PROMPT

Every credible prompting guide across every major engine converges on the same set of ingredients, in roughly the same order of importance. **[PRINCIPLE]** They differ in vocabulary and emphasis, not in structure.

### 1. Subject and action, described as continuous motion, never a static pose

The single most common beginner mistake is describing a picture instead of a performance. "A woman standing in a kitchen" is a pose. "A woman in a kitchen cracks an egg one-handed into a steel bowl, flicking the shell aside without looking down" is continuous motion across the clip's duration. Runway's own Gen-4 guidance frames this exactly: when an image is already doing the work of establishing appearance, the text should be almost entirely about the desired motion, not a re-description of what is already visible. **[SOURCED]** MiniMax's Hailuo documentation makes the same point from the opposite direction, describing Hailuo as a "director's AI" that wants a script with narrative flow and temporal relationships rather than a checklist of static facts, rewarding transitional language like "the camera starts focused on a single raindrop, then gradually pulls back to reveal a stormy cityscape." **[SOURCED]**

### 2. Camera movement language

Precise, named camera vocabulary is the highest-leverage clause in the entire prompt because it is the one piece of language every major engine has been specifically trained to recognize: dolly in / dolly out, push in / pull back, pan left / pan right, tilt up / tilt down, orbit / arc, crane up / crane down, tracking shot, handheld, static / locked-off, whip pan, crash zoom, rack focus. Kling's own camera control documentation groups this into basic movements, dynamic tracking, focus control and special perspectives, and states plainly that a missing camera instruction is one of the most common causes of an accidentally static, flat result. **[SOURCED]** Runway's guidance adds a discipline point worth treating as a hard rule: one clean primary movement plus at most one secondary movement outperforms three conflicting ones in the same clip. **[SOURCED]**

### 3. Shot duration and pacing within the clip

Because every generation has a hard ceiling, the prompt must budget the action to fit inside it. A prompt asking for three distinct beats of action inside a 5-second clip will get a rushed, compressed version of all three, none of them landing. Runway's documentation is explicit that simple single-beat actions suit a shorter duration well, while prompts describing multiple sequential movements need the longer duration option to execute completely and naturally rather than rushing. **[SOURCED]** The fix is either to trim the action to what the duration can actually hold, or to explicitly pace it with transitional language ("for the first two seconds, X holds still, then X turns to camera").

### 4. Lighting and atmosphere

Naming a lighting quality (golden hour rim light, harsh overhead fluorescent, soft window light from camera left, moody single practical) does more to control the finished look than almost any other clause, because it is language the model has seen paired with millions of real cinematographic examples. Treat it the way a DP treats a lighting plot: name the key, note the direction, note the quality (hard or soft), and let the mood follow from that rather than naming the mood directly.

### 5. Physics and realism cues

The newer generation of models (Hailuo 2.3 in particular) are explicitly documented as physics-aware engines that reward prompts describing the physical weight and interaction of a movement, not just its direction. **[SOURCED]** "The metal chain swings and settles with visible weight" produces more convincing motion than "the chain moves." This is also where negative prompting against known physics failure modes belongs (see point 7).

### 6. Audio and sound cues, on models that support native audio

Where the underlying model generates audio in the same pass as picture (Veo 3.1, Seedance 1.5 Pro, Kling 3.0, Grok Video, Gemini Omni, and several of the Higgsfield-hosted models below), the prompt should describe the soundscape as its own clause: dialogue if any, ambient sound, sound effects tied to specific actions, and whether music is wanted. Google's own Veo guidance for the first/last-frame audio-inclusive transition feature instructs writers to describe both the visual transition and the desired audio explicitly in the same prompt. **[SOURCED]** OpenAI's Sora 2 guide goes further and requires dialogue to be placed in its own clearly labeled block below the visual description, with lines kept brief and natural to match the video's length. **[SOURCED]**

### 7. Negative prompting for artifacts to avoid

Where the interface exposes a negative prompt field (or the model accepts negative instructions inline), it exists to suppress specific, named failure modes, not to declare general disapproval of "bad quality." Documented best practice is to name the exact flaw: warping, morphing, extra limbs, face deformation, flicker, distorted logos or on-screen text, unstable motion. **[SOURCED]** The same guidance warns against over-constraining with a long list of generic negatives ("no blur, no distortion, no artifacts, no low quality"), which tends to produce a sterile, over-sharpened, inconsistent result instead of a cleaner one. **[SOURCED]** Treat negative prompting as a scalpel for a known, recurring problem in your specific shot, not a blanket incantation copied onto every prompt.

---

## A3. SIX WORKED PROMPT TEMPLATES

Each template below is a complete, usable prompt, followed by a clause-by-clause breakdown of what each part is controlling and why it is written the way it is. These are written as reusable patterns: swap the bracketed specifics, keep the structural bones.

### Template 1: Dialogue-free character beat

> A weathered fisherman in his sixties, deep sun lines on his face, sits alone at the bow of a small wooden boat at dawn. He slowly coils a length of wet rope around his forearm, his eyes fixed on the horizon, breath visible in the cold air. The boat rocks gently with the water. Camera: slow, steady push in from a medium shot to a close-up on his face over four seconds, static aside from the push, no handheld shake. Lighting: cold blue pre-dawn light with a thin warm rim from the rising sun behind him. Mood: quiet, weathered, patient. No dialogue. Negative: no warping of the rope, no extra fingers, no flickering horizon line.

**Breakdown**

| Clause | Controls | Why it is written this way |
|---|---|---|
| "weathered fisherman... deep sun lines... sixties" | Subject identity and age, in enough physical detail that the model does not default to a generic young adult | Specificity here front-loads casting decisions the model would otherwise guess at randomly |
| "slowly coils a length of wet rope around his forearm" | Continuous action, not a pose | Gives the model a physical task to animate across the whole clip, not just a look to render once |
| "his eyes fixed on the horizon" | Performance direction / emotional read | Directs facial performance without dialogue, the way a director would note an actor's internal state |
| "boat rocks gently with the water" | Environmental physics cue | Prevents a dead, static background and cues the physics engine to add plausible secondary motion |
| "Camera: slow, steady push in... over four seconds, static aside from the push" | Camera movement and pacing | One primary movement only, explicitly time-boxed to the clip length, avoids competing or unresolved motions |
| "cold blue pre-dawn light with a thin warm rim" | Lighting design | Named key and quality, mirrors how a DP would brief a gaffer |
| "No dialogue" | Explicit silence flag | Prevents the model from inventing mouth movement or a voice track it was never asked for |
| "Negative: no warping of the rope..." | Negative prompt | Targets the two failure modes most likely in this specific shot: rope (thin, high-motion object) and hands (known weak point across nearly every model) |

### Template 2: Product-in-motion shot

> An unbranded matte aluminum beverage can, condensation beading on its surface, spins slowly in mid-air against a solid charcoal-grey background, catching a single hard studio light that sweeps across its surface as it rotates. A fine mist of cold vapor drifts off the can's shoulder. Camera: static, locked-off, centered composition, macro lens feel with shallow depth of field. Duration: four seconds, one full 360-degree rotation, constant rotation speed. Lighting: single hard key light from upper camera-left, deep black background, high contrast, no fill. Negative: no label warping, no melting geometry, no doubled or ghosted edges.

**Breakdown**

| Clause | Controls | Why it is written this way |
|---|---|---|
| "unbranded matte aluminum... condensation beading" | Surface material and micro-detail | Product shots live or die on surface realism; naming the material and a specific surface effect (condensation) anchors the render to something photographable rather than generic |
| "spins slowly in mid-air... catching a single hard studio light that sweeps across its surface as it rotates" | The one continuous action | A rotating object is the correct choice of motion for a product beauty shot because it reveals the whole surface without needing camera movement to compete with it |
| "fine mist of cold vapor drifts off the can's shoulder" | Atmosphere / physics cue | Adds a small, controlled secondary motion that reads as premium and product-real without introducing chaos |
| "Camera: static, locked-off... macro lens feel with shallow depth of field" | Camera and lens language | Explicitly rules out camera movement so the only motion in frame is the product itself, the standard convention for beauty/product shots |
| "one full 360-degree rotation, constant rotation speed" | Duration budget and pacing | Ties the action precisely to the stated duration so the rotation completes cleanly instead of stopping mid-turn or looping unnaturally |
| "single hard key light from upper camera-left, deep black background, high contrast, no fill" | Lighting | Studio product lighting described the way a photographer would brief it, not as a mood adjective |
| "Negative: no label warping, no melting geometry, no doubled or ghosted edges" | Negative prompt | Targets the three most common product-shot failure modes: text/label distortion, geometry drift on rotation, and ghosting artifacts from fast rotation |

### Template 3: Fast-cut action sequence via multi-shot

> Multi-shot sequence, three consecutive shots, same character and alley location throughout.
> Shot 1: A young courier in a bright yellow jacket sprints down a narrow, rain-slicked city alley, dodging a stack of crates, camera in a low, fast tracking shot running alongside her at hip height.
> Shot 2: Close-up, her hand slams against a rusted metal door to push it open, sparks of rust flying, camera static, hard whip-pan follows her hand.
> Shot 3: Wide shot from above as she bursts out onto a busy street into golden late-afternoon light, camera holds static, crowd continues moving around her.
> Style: gritty, high-contrast, handheld energy on shots 1 and 3, kinetic. Genre hint: action. Sound: continuous urgent footsteps and breathing carrying across all three shots, brief metallic clang on shot 2, street ambience swells in on shot 3.

**Breakdown**

| Clause | Controls | Why it is written this way |
|---|---|---|
| "Multi-shot sequence, three consecutive shots, same character and alley location throughout" | Declares the multi-shot mode and locks continuity intent | On engines with a native multi-shot parameter (Kling 3.0, Higgsfield's cinematic_studio_video_v2 multi_shots), this line is the instruction that tells the model to treat the following shots as one continuous scene rather than three unrelated clips |
| "Shot 1 / Shot 2 / Shot 3" labeled blocks | Per-shot direction inside one generation | Mirrors a shot list inside a single prompt; each block gets its own action and camera line, the way a multi_prompt field expects discrete entries |
| Repeated character and wardrobe description ("young courier in a bright yellow jacket") across shots | Identity anchor within the sequence | Multi-shot mode still benefits from restating the subject's fixed details in each shot block, since the model is not guaranteed to carry appearance forward perfectly without an explicit reference image |
| "camera in a low, fast tracking shot" / "camera static, hard whip-pan" / "camera holds static" | Distinct camera treatment per shot | Deliberately varies coverage the way an edit would: a moving shot, a whip-pan punctuation, and a static wide as a release beat |
| "Genre hint: action" | Genre-conditioning parameter | On models exposing a genre hint (Higgsfield's Cinema Studio models), this steers pacing, color and grain toward action-genre conventions rather than leaving tone to chance |
| "Sound: continuous urgent footsteps... clang on shot 2... street ambience swells in on shot 3" | Native audio cue, sequenced across shots | Where native audio is supported, sound needs its own timeline cue exactly like picture does, tied to the same shot markers so effects land on the correct beat |

**When to use multi-shot instead of stitching separate generations:** multi-shot is the better tool when the shots share one continuous location and one continuous character action across a few seconds of screen time, because the model can carry motion and lighting logic across the internal cuts itself. Stitching separate single-shot generations in an edit is the better tool when the shots span different locations, different times, or need independent iteration and approval per shot (see A6).

### Template 4: Slow atmospheric establishing shot

> Wide establishing shot of an endless salt flat at first light, the ground cracked into a vast honeycomb pattern stretching to the horizon. A thin layer of ground mist drifts slowly across the surface, catching the first warm light. Nothing moves in the frame except the mist and a very slow, almost imperceptible shift in the light as the sun clears the horizon. Camera: extremely slow drone-style crane, rising four meters over twelve seconds, no pan, no tilt, pure vertical rise. Lighting: cold pre-dawn blue transitioning to warm amber as the sun breaches the horizon line, practical sun flare allowed. Mood: vast, silent, contemplative. No people, no vehicles, no audio.

**Breakdown**

| Clause | Controls | Why it is written this way |
|---|---|---|
| "endless salt flat... cracked into a vast honeycomb pattern" | Location and texture specificity | Grounds an otherwise abstract landscape in a recognizable, photographable real-world reference (salt flat texture), which produces more coherent geometry than a vaguer "desert" |
| "Nothing moves in the frame except the mist and a very slow... shift in the light" | Explicit motion budget | Establishing shots fail when the model adds unwanted incidental motion (birds, dust devils, random characters); explicitly bounding what moves prevents that drift |
| "extremely slow drone-style crane, rising four meters over twelve seconds, no pan, no tilt, pure vertical rise" | Camera movement, single axis, tied to duration | Locking the movement to one axis and pacing it exactly to the full duration is what produces the meditative, controlled feel establishing shots need; any secondary axis reads as noise at this pace |
| "cold pre-dawn blue transitioning to warm amber" | Lighting arc across the clip's duration | A lighting transition needs to be written as a described arc, not a single static adjective, or the model will pick one state and hold it |
| "No people, no vehicles, no audio" | Explicit exclusions | Functions as inline negative prompting for content, not just artifacts; establishing shots are one of the few shot types where the absence of subjects is itself the instruction |

### Template 5: UGC-style handheld clip

> Selfie-style handheld video, shot on what looks like a phone front camera, slight natural shake and occasional minor refocus hunt. A woman in her twenties in a cozy sweater sits on a couch, talking directly to camera with animated, casual hand gestures, laughing partway through. Background is a slightly cluttered, warm-lit living room, softly out of focus. Lighting: warm, uneven indoor lamp light, slightly overexposed near a window, authentic and imperfect, not studio-graded. Camera: handheld, close, casual framing that drifts slightly off-center, occasional small reframe as if she shifted the phone in her hand. Audio: casual spoken voice, natural room tone, no music. Negative: no cinematic color grade, no perfectly stable frame, no studio lighting polish.

**Breakdown**

| Clause | Controls | Why it is written this way |
|---|---|---|
| "shot on what looks like a phone front camera, slight natural shake and occasional minor refocus hunt" | Format and lens-language framing for imperfection | UGC authenticity depends on naming the imperfections the model would otherwise smooth away by default; "phone front camera" is doing real optical-language work here, not just a style label |
| "talking directly to camera with animated, casual hand gestures, laughing partway through" | Continuous performance action | Gives a full-duration behavior arc (talk, gesture, laugh) rather than a single static "smiling" pose |
| "slightly cluttered, warm-lit living room, softly out of focus" | Depth and setting | Background specificity with an explicit depth-of-field note keeps attention on the subject the way a real UGC shot naturally would |
| "warm, uneven indoor lamp light, slightly overexposed near a window, authentic and imperfect, not studio-graded" | Lighting, deliberately anti-polish | The single most important line in the whole prompt for this genre: without an explicit instruction against polish, most models default toward a cleaner, more "produced" look that reads as fake UGC |
| "camera... drifts slightly off-center, occasional small reframe" | Camera imperfection as a designed element | Handheld energy has to be described as intentional behavior, the same way a documentary DP would brief an operator, or it collapses into either a perfectly stable shot or unusable chaotic shake |
| "Negative: no cinematic color grade, no perfectly stable frame, no studio lighting polish" | Negative prompt against the model's own default bias | This is negative prompting used correctly: it targets the model's known tendency to "improve" toward a polished look, which is precisely the opposite of the goal here |

### Template 6: VFX-style transformation / effect shot

> Extreme close-up on a life-size ice sculpture of a human hand, fingers slightly curled. Over the course of the clip, the ice begins to crack along fine fracture lines, then rapidly transforms, the ice surface rippling and turning to liquid mercury, which reshapes itself into the same hand pose but now fully metallic and reflective. Camera: slow, continuous orbit around the hand at a fixed radius, constant speed, no cuts. Lighting: single cool spotlight from above, the reflective mercury stage should catch and distort the light realistically as it moves. Pacing: first third of the clip is the ice cracking, middle third is the liquid transformation, final third is the metal hand settling into stillness. Sound: subtle ice-cracking texture at the start, a low liquid, resonant tone during the transformation, a soft metallic ring as it settles. Negative: no flickering during the material transition, no loss of hand shape or proportion at any stage, no double exposure ghosting.

**Breakdown**

| Clause | Controls | Why it is written this way |
|---|---|---|
| "life-size ice sculpture of a human hand, fingers slightly curled" | Starting state, anchored to a real-world reference object | Transformation shots need a clearly defined starting state before they can be asked to change, exactly like a VFX supervisor would define a "hero asset" before scripting its transformation |
| "begins to crack... then rapidly transforms... reshapes itself into the same hand pose but now fully metallic" | The transformation arc, staged explicitly | Naming each material state in sequence (ice, cracking, liquid mercury, reshaped metal) is what prevents the model from skipping straight to an unrelated end state or losing the object's identity mid-transform |
| "same hand pose" | Explicit consistency instruction | This single clause is doing the job an image reference would normally do; naming the constraint directly in words is the fallback when no start/end image is available for this kind of shot |
| "slow, continuous orbit around the hand at a fixed radius, constant speed, no cuts" | Camera as a stable, uninterrupted observer | Deliberately restrained camera work is correct here because the transformation itself is the entire spectacle; a busy camera would compete with it |
| "Pacing: first third... middle third... final third" | Explicit time budget across the full duration | VFX transformation shots are the category most likely to be rushed or truncated by a model without an explicit act structure tied to clip length |
| "Sound: subtle ice-cracking... liquid, resonant tone... soft metallic ring" | Native audio staged to match the visual stages | Sound cues are given their own three-beat structure that mirrors the visual pacing exactly, so audio and picture stay synchronized to the same internal clock |
| "Negative: no flickering during the material transition, no loss of hand shape or proportion..." | Negative prompt targeted at the single highest-risk failure mode of this shot type | Material transformation shots are the category most prone to flicker and shape drift; the negative prompt is written to name exactly those two failure modes rather than a generic list |

---

## A4. THE TOOL AND ENGINE LANDSCAPE

### A4a. The major external engines

| Engine | Best at | Falls short on |
|---|---|---|
| **OpenAI Sora 2 / Sora 2 Pro** | Cinematic narrative coherence, character reference support (objects and animals), synchronized dialogue, longer single-shot duration (up to 20 seconds documented) **[SOURCED]** | Costs scale sharply with resolution and the Pro tier; API access itself is reported to be time-limited (see the discontinuation note below, flagged unverified) |
| **Runway Gen-3 / Gen-4** | Precise, DP-literate camera control language, strong image-to-video motion fidelity, professional workflow tooling (keyframing, extend) **[SOURCED]** | Text-only (no reference image) generation is the weaker mode; credit costs rise steeply at Turbo/4K tiers |
| **Kling (2.6, 3.0, 3.0 Turbo)** | Genuinely responsive camera movement instructions (pans, zooms, sweeps), native multi-shot and audio sync on 3.0, motion transfer | Prompt structure is unusually sensitive to overload; too many elements or vague spatial language causes visible distortion **[SOURCED]** |
| **Google Veo 3 / 3.1** | Native audio quality (dialogue, ambient, effects), first-frame/last-frame conditioned transitions with synchronized audio, strong quality-tier flexibility **[SOURCED]** | Clip duration capped at 8 seconds per generation; premium quality and 4K carry a steep per-second premium |
| **Luma Dream Machine (Ray series)** | Keyframe-based start/end frame control for clean transitions, video-to-video modification with character reference (Ray3 Modify) **[SOURCED]** | Narrower feature set for native audio compared to Veo, Kling 3.0 or Seedance 1.5 |
| **Pika (2.2 and later)** | Fast iteration, Pikaframes keyframing, accessible pricing at lower resolutions **[SOURCED]** | 1080p/10-second generations consume credits quickly relative to plan allowances |
| **Hailuo / MiniMax (2.0, 2.3)** | Natural physics and facial emotion, narrative-style prompting that rewards a described action arc rather than a static description **[SOURCED]** | Best results depend on writing genuinely narrative prompts; terse keyword-style prompts underperform relative to other engines |
| **Bytedance Seedance 1.5 Pro** | Simultaneous audio and video generation from one dual-branch architecture, millisecond-precision lip sync, reliable general-purpose motion **[SOURCED]** | Not the reference-consistency specialist; that role belongs to Seedance 2.0 |
| **Bytedance Seedance 2.0** | State of the art for reference-driven consistency: combinable image, video, and audio reference inputs addressed by filename, explicitly built for consistent identity and multi-SKU product work **[SOURCED]** | Documented as weaker specifically on people; vendor guidance recommends Seedance 1.5, Kling, or Veo 3.1 for human subjects and reserves 2.0 for scenes, objects and architecture **[SOURCED]** |
| **Wan (open-weight family)** | Stylized and experimental looks, open-weight flexibility for teams running custom pipelines | Less consistent out-of-the-box realism than the closed commercial flagships |
| **Grok Video (xAI, Aurora-based)** | Native audio generated from the start (music, sound effects, ambient, lip-synced dialogue and singing), responsive to detailed shot/camera/timing direction **[SOURCED]** | Newer entrant; documentation and third-party track record are thinner than the more established engines |

### A4b. The Higgsfield-hosted roster (as surfaced live via the connected MCP, 2026-07-26)

Higgsfield does not build these models itself for the most part; it hosts and exposes a curated roster of the engines above (and a few of its own) through one unified `generate_video` interface. **[SOURCED, live MCP fetch]**

| Model ID | What it is | Distinguishing parameters |
|---|---|---|
| `cinematic_studio_3_0` ("Cinema Studio Video 3.0") | Higgsfield's most advanced cinema-grade model | 480p to 4K, genre hint (action / horror / comedy / noir / drama / epic), optional `generate_audio`, duration 4 to 15 seconds |
| `cinematic_studio_video_v2` | Prior generation cinema-grade model, still relevant for its unique controls | Genre control, pro/std mode, sound on/off, `speedramp` control (slowmo / speedup / impact), `multi_shots` param to split one `multi_prompt` into several shots, `cfg_scale` for prompt adherence |
| `minimax_hailuo` | Hosted access to Hailuo | Variants minimax / minimax-fast / minimax-2.3 / minimax-2.3-fast, 6 or 10 second duration, up to 1080p |
| `wan2_6`, `wan2_7` | Open-weight, stylized/experimental. NOT interchangeable, see below | Both expose `audio_references`. They differ in every other input: `wan2_6` is reference-only (`image_references`, `video_references`, `audio_references`, and NO frame conditioning at all), while `wan2_7` is frame-conditioned (`start_image`, `end_image`, `audio_references`, and NO loose references). To animate a locked still with synced audio you must use `wan2_7`; `wan2_6` cannot accept a first frame. **[SOURCED, live `models_explore` schema fetch 2026-07-26]** |
| `seedance1_5` ("Seedance 1.5 Pro") | Bytedance's reliable general-purpose model | 4/8/12 second duration, up to 1080p, native audio |
| `seedance_2_0`, `seedance_2_0_mini` | Bytedance's flagship consistency model | Explicitly reference-driven video with image/video/audio reference inputs, consistent identity, multi-SKU support, std vs fast mode, up to 4K |
| `kling2_6`, `kling3_0`, `kling3_0_turbo` | Kling family | Cinematic motion and advanced physics; `kling3_0` adds multi-shot, audio sync and motion transfer; modes std/pro/4k |
| `veo3`, `veo3_1`, `veo3_1_lite` | Google Veo family | veo-3-preview vs veo-3-fast variants; `veo3_1` adds basic/high/ultra quality tiers |
| `grok_video`, `grok_video_v15` | xAI Grok Video | Native audio direction |
| `gemini_omni` ("Gemini Omni Flash") | Google reference-driven model | Generates native audio, but accepts `image_references` and `video_references` ONLY. It does NOT accept `audio_references` and does NOT accept `start_image`, so it cannot be synced to a pre-existing audio track and cannot be frame-locked. **[SOURCED, live `models_explore` schema fetch 2026-07-26]** |
| `cinematic_studio_video` | Earlier Cinema Studio generation, still in the roster | Accepts `image`, `start_image`, `end_image`. Simple control set: `slow_motion` bool and `sound` bool. Fixed durations of 5 or 10 seconds only **[SOURCED, live schema fetch 2026-07-26]** |
| `happy_horse_video` | Budget option | Text-to-video at the lowest cost tier in the roster |
| `marketing_studio_video` | Templated ads pipeline, not a free-text model | Built around hooks, settings and an `ad_reference_id` rather than a from-scratch prompt; worth using instead of hand-written prompts when the deliverable is a templated ad format rather than a bespoke creative shot |

The practical read: for anything requiring reference-locked identity across multiple clips (a recurring product, a recurring character), `seedance_2_0` is the current state of the art for that specific job **[SOURCED, per Bytedance's own vendor guidance]**, while `cinematic_studio_video_v2` or `kling3_0` are the right tools when the job is a multi-shot sequence inside one generation rather than a cross-clip consistency problem.

---

## A5. REFERENCE-DRIVEN CONSISTENCY ACROSS CLIPS

This is the single most important technical shift separating a professional AI video workflow from an amateur one. A prompt alone, no matter how well written, cannot guarantee that the same character or product looks identical across two separate generations. Text describes; it does not lock. The fix is to condition each generation on a fixed visual reference rather than re-describing appearance in words every time. **[PRINCIPLE]**

### The mechanisms, in order of how tightly they lock appearance

- **`start_image` (first-frame conditioning).** The single strongest continuity mechanism available. The generation begins from a specific still image, so the model does not have to guess appearance, wardrobe, product geometry, or environment; it only has to animate from that fixed starting point. This is why the standard professional workflow is to generate a strong, approved still first (using the companion text-to-image craft bible in this series) and then use that still as the `start_image` for every clip featuring that character or product, rather than describing appearance in the video prompt at all. **[PRINCIPLE]**
- **`end_image` (last-frame conditioning).** Used in combination with `start_image` to define both endpoints of a transition and let the model solve the motion in between. Google's Veo 3.1 documentation frames this precisely: provide a starting and an ending image, and Veo generates the transition between them, complete with accompanying audio, while the prompt describes the transition and the desired sound. **[SOURCED]** `end_image` is also the natural handoff point between consecutive clips in a sequence: the last frame of clip one can be reused, directly or after a small re-render, as the `start_image` of clip two.
- **`image_references`.** Style or subject reference images that are not necessarily the literal first frame, used to steer appearance, style, or identity without pinning the exact opening composition. Looser than `start_image`, useful when you want the character or product recognizable but the shot's opening framing to differ from the reference image itself.
- **`video_references`.** A reference clip used to carry over motion quality, pacing, or scene continuation from a prior generation, rather than a still. This is the mechanism to reach for when what needs to persist across clips is not appearance but movement: a camera move, a walk cycle, an established rhythm.
- **`audio_references`.** Used to sync a new clip to an existing audio performance. In the Higgsfield roster this is exposed by exactly four models: `wan2_6`, `wan2_7`, `seedance_2_0`, and `seedance_2_0_mini`. It is NOT exposed by `gemini_omni`, which accepts `image_references` and `video_references` only. **[SOURCED, live `models_explore` schema fetch 2026-07-26]** This is the right tool when the audio (a voiceover, a piece of music, a line reading) already exists and was locked before the picture, and the picture needs to be built to match it, the reverse of the usual picture-first order. Note the practical constraint: of the four, only `wan2_7`, `seedance_2_0`, and `seedance_2_0_mini` also accept a `start_image`, so those are the only three that can sync to existing audio AND open on a locked frame in the same generation.

### Seedance 2.0 as the current state of the art for this problem

Bytedance's Seedance 2.0 is the model in this landscape explicitly built around solving reference-driven consistency as its core design goal rather than as a bolt-on feature. It accepts four combinable input types (image, video, audio, and text), assigns each uploaded asset a filename-based reference (`@image1`, `@video1`) that the prompt then addresses directly, and its documented core use case is "consistent identity, multi-SKU" work, meaning it is purpose-built for scenarios like a single product appearing across a dozen ad variants, or a recurring brand character appearing across an episodic content series. **[SOURCED]** Vendor guidance is explicit on a real limitation, however: because the model is optimized for object, scene and architectural consistency, it is documented as weaker specifically on human subjects, and the guidance is to use Seedance 1.5 Pro, Kling, or Veo 3.1 instead when the reference-locked subject is a person. **[SOURCED]** Vendor guidance also warns against over-loading references: using the full allowance of assets tends to degrade results, because the model struggles to prioritize which feature should dominate, producing style conflicts, blurry subject identification, and drift from the brief. The recommended configuration is four to five assets total, each with one clearly assigned job (character anchor, scene tone, camera reference, atmosphere reference), not a pile of loosely related images. **[SOURCED]**

### The still-first workflow, as the default professional pattern

1. Generate or select a single strong still image of the character, product, or environment that must persist across the sequence (see the companion text-to-image craft bible for how to build that still).
2. Get that still approved before any motion generation begins. Every downstream clip inherits whatever is wrong with this still, so this is the cheapest point in the whole pipeline to catch a problem.
3. Use that approved still as `start_image` for the first clip.
4. For the next clip in the sequence, either reuse the same still as `start_image` again (if the shot restarts from that same look) or use the previous clip's last frame as the new `start_image` / feed the previous clip in as a `video_reference` (if the shot is a continuation).
5. Keep a written log of exactly which reference file was used for which generation (see Part B, the continuity protocol).

---

## A6. MULTI-SHOT GENERATION VERSUS STITCHING SEPARATE GENERATIONS

Several engines now expose a native multi-shot mode: Higgsfield's `cinematic_studio_video_v2` accepts a `multi_shots` parameter that splits one `multi_prompt` into several internal shots within a single generation, and Kling 3.0 supports native multi-shot generation directly. This is functionally different from generating several separate single-shot clips and cutting them together in an edit.

| | Native multi-shot (one generation, several internal shots) | Stitching separate single-shot generations |
|---|---|---|
| Continuity | The model itself carries lighting, environment and character logic across the internal cuts, since it is reasoning about them as one continuous scene | Continuity must be manufactured manually with reference images/video between each separate generation |
| Iteration granularity | Coarse: revising one shot inside the sequence generally means regenerating the whole multi-shot output | Fine: each shot can be regenerated, approved, and locked independently without touching the others |
| Best used for | A short run of shots that share one location and one continuous beat of action, where speed and internal coherence matter more than per-shot control (see Template 3) | A sequence spanning different locations, different times, or any shot that needs independent client approval or repeated iteration |
| Native audio handling | Sound cues can be sequenced across the internal shots in one pass, keeping audio and picture on the same internal clock | Audio must be added or aligned per clip, or handled entirely in post across the stitched sequence |

The practical rule: reach for native multi-shot when the sequence is short, contained, and continuous. Reach for stitched single generations the moment any individual shot in the sequence needs its own approval cycle, its own reference image, or lives in a genuinely different location or time.

---

## A7. NATIVE AUDIO VERSUS ADDING AUDIO IN POST

Native audio generation (Veo 3.1, Seedance 1.5 Pro, Kling 3.0, Grok Video, Gemini Omni, and the `generate_audio` / sound toggles on several Higgsfield-hosted models) produces sound in the same generation pass as the picture, which is the only way to get certain effects: millisecond-accurate lip sync, footsteps and impacts perfectly timed to visible contact, and ambient sound that responds to camera perspective. **[PRINCIPLE]**

Trust native audio when the sound is tightly coupled to visible action in the frame (a door slam, a footstep, lip-synced dialogue) because that coupling is exactly what a separate post-production audio pass struggles to time perfectly against AI-generated motion, which itself is not perfectly predictable in advance.

Override or replace native audio in post when the sound needs to match an existing brand asset (a locked VO read, a licensed music track, an established sonic identity) that already exists independently of this clip, when the native audio quality is inconsistent across a multi-clip sequence and needs to be normalized in the edit, or when the final delivery requires stems (separate dialogue, music and effects tracks) that a single native-audio generation does not provide. `audio_references` (as on `wan2_7`) is the middle path: it generates new picture that is synchronized to an audio track you already locked, giving you native-feeling sync without giving up control of the actual audio content.

---

## A8. DURATION AND RESOLUTION AS COST AND CREATIVE DECISIONS

Every engine in this landscape caps single-generation duration, commonly somewhere between 4 and roughly 15 to 20 seconds depending on the model. **[PRINCIPLE]** This is not an incidental technical limit; it is the reason every AI-generated "film" longer than about fifteen seconds is, without exception, an editorial assembly of many separate generations rather than one continuous take. Treat duration the way a line producer treats a shooting day: as a budget to be spent deliberately, not a constraint to be discovered by accident mid-generation.

Resolution and duration both scale cost, usually multiplicatively rather than additively: a longer clip at higher resolution with native audio switched on is typically the single most expensive combination available on any given model, and the jump from standard to 4K, or from silent to native-audio, is frequently priced as a distinct tier rather than a small add-on (see Part C for the specific, dated figures). The creative decision and the budget decision are the same decision here: choose the shortest duration and lowest resolution that the final delivery actually requires, generate and approve at that tier, and only re-render at a higher tier once the creative is locked, rather than iterating expensively at final delivery quality.

---

## A9. VOCABULARY GLOSSARY

| Term | Meaning |
|---|---|
| **Frame conditioning** | Generating a clip so that a specific still image is used as a fixed frame (typically the first, sometimes the last) that the rest of the video is generated around |
| **Temporal consistency** | The degree to which appearance, lighting and identity stay stable across the duration of a single generated clip, without drifting or morphing frame to frame |
| **Motion prior** | The model's learned expectation of how a given subject or material should move, based on its training data; a strong motion prior is why physically grounded language ("the chain swings and settles with visible weight") produces more convincing results than vague direction |
| **Native audio** | Audio generated by the same model, in the same pass, as the picture, rather than added afterward in post-production |
| **Multi-shot** | A single generation that internally contains more than one distinct shot or camera setup, driven by a structured multi-part prompt rather than one continuous description |
| **Genre hint** | A parameter (seen on Higgsfield's Cinema Studio models) that biases pacing, color, grain and composition toward the conventions of a named genre (action, horror, comedy, noir, drama, epic) |
| **CFG scale (classifier-free guidance scale)** | A parameter controlling how strictly the generation adheres to the literal text prompt versus how much creative latitude the model takes; higher values generally mean tighter prompt adherence, at some cost to natural variation |
| **Speedramp** | A parameter controlling in-clip speed changes (slowmo, speedup, impact) rather than a constant playback speed across the whole generation |
| **Start image / end image** | The first-frame and last-frame reference images used to anchor the beginning and end state of a generation |
| **Image / video / audio references** | Auxiliary reference assets, distinct from start/end image, used to steer style, subject identity, motion quality, or audio sync without literally fixing the opening or closing frame |
| **Reference-driven / consistency-driven generation** | A generation approach (Seedance 2.0 being the current flagship example) explicitly designed around holding a subject's identity fixed across multiple outputs using reference assets rather than relying on text description alone |

---
---

# PART B: AGENT OPERATING MANUAL

---

## B1. THE QUESTIONS TO ASK BEFORE WRITING A SINGLE PROMPT

An agent (or a human prompt writer) should not open a text-to-video tool until these questions have answers. Every one of them changes either which model to use, which parameters to set, or how the prompt itself should be structured. **[PRINCIPLE]**

1. **What happens immediately before this clip, and immediately after it?** A clip generated in isolation, with no knowledge of its neighbors, is the single most common cause of a sequence that does not cut together. Establish the shot before and the shot after in the sequence, even in one sentence, before writing this clip's prompt.
2. **Does a character or product in this clip need to match an existing reference?** If yes, identify the exact reference asset (a locked still, a prior clip's last frame, an approved product photo) before writing the prompt, and plan to use `start_image` / `image_references` rather than describing appearance in words (see B3, the continuity protocol).
3. **Does this clip need native audio, or will audio be added entirely in post?** This decision changes model selection outright (see B4) and changes whether the prompt needs a sound design clause at all. Deciding this after generation, once picture is already locked, is a common and expensive mistake (see B5).
4. **What duration and resolution does the final edit actually need?** Do not default to the model's maximum on either axis. A clip destined for a 3-second cutdown inside a 15-second social edit does not need a 4K, 15-second, native-audio generation; it needs the cheapest tier that will not visibly degrade once placed in that cut.
5. **Is this a single, self-contained shot, or one beat inside a multi-shot sequence?** If it is part of a longer continuous action inside one location, evaluate whether a native multi-shot generation (A6) is a better fit than a separate single-shot generation.
6. **What platform and aspect ratio is this for?** Vertical social, horizontal broadcast/web, and square all need to be decided before generation, not cropped after, since AI video composition is written into the prompt's framing language and cannot be reliably recomposed after the fact without regenerating.
7. **What is the one failure mode most likely in this specific shot?** Every shot type has a known weak point (hands and fine objects in a character beat, label/logo distortion in a product shot, flicker in a transformation shot, over-polish in a UGC shot). Identify it before generating so the negative prompt can target it directly rather than being written generically after a bad result comes back.

---

## B2. A REUSABLE PROMPT-CONSTRUCTION TEMPLATE, WITH WORKED FILLS

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

---

## B3. THE CONTINUITY PROTOCOL FOR A MULTI-CLIP SEQUENCE

The same self-contained-record discipline used in the production bible craft (every locked decision written down, dated, and attributable) applies here, adapted for AI generation. A multi-clip AI sequence with no written reference log is not auditable, and an unauditable sequence cannot be fixed efficiently when a client asks for one clip to be redone six weeks later. **[PRINCIPLE]**

1. **Generate or select a locked reference still first**, for every character or product that must persist across more than one clip in the sequence. Get it approved before generating any motion. This is the cheapest point in the entire pipeline to catch a wrong look.
2. **Use that locked still as `start_image` for every clip featuring that character or product**, rather than re-describing appearance in each new prompt. Re-describing appearance in words, when a start_image is already fixing it, is a known failure mode (see B5).
3. **Use `end_image` or `video_references` to hand off between consecutive clips.** The last frame of clip one becomes the `start_image` (or an `image_reference`) of clip two whenever the action continues; a `video_reference` to clip one is the right tool when what needs to carry forward is motion or pacing rather than a literal frame match.
4. **Keep a written log**, one row per generation, with at minimum: clip ID, which reference asset(s) were used, which model and parameters, the prompt text actually submitted, the date, and the approval status. This is the same discipline as a production bible's decision record, applied to a generation pipeline instead of a shoot.
5. **Re-verify the chain after any regeneration.** If clip three in a five-clip sequence is regenerated for any reason, check whether its new last frame still matches what clip four's `start_image` expects. A silent mismatch here is invisible until the clips are cut together.

### Worked mini-log example

| Clip ID | Reference used | Model / params | Approved | Notes |
|---|---|---|---|---|
| SEQ01-A | `cup_hero_v3.png` (locked still, approved 2026-07-20) | seedance1_5, 1080p, native audio on | Yes, 2026-07-21 | Product lift, opening shot |
| SEQ01-B | last frame of SEQ01-A, used as start_image | seedance1_5, 1080p, native audio on | Yes, 2026-07-21 | Continuation, cup reaches mouth level |
| SEQ01-C | `cup_hero_v3.png` reused as start_image (scene resets to tabletop) | kling3_0, pro mode, no audio (will be scored in post) | Pending | Wide cutaway, needs its own approval before final assembly |

---

## B4. MODEL SELECTION DECISION TABLE

| Creative goal | Best-fit model(s) | Why |
|---|---|---|
| Physics-heavy action (falls, impacts, crowd or gymnastic motion) | Hailuo/MiniMax 2.3 (`minimax_hailuo`, `minimax-2.3` variant), Kling 3.0 | Both are documented specifically around advanced physics and body-motion realism **[SOURCED]** |
| Dialogue-free emotional character beat | Kling (2.6/3.0), Sora 2, Veo 3.1 | Strong facial/emotional nuance and camera control without needing native dialogue sync |
| Product ad, single hero SKU, or multi-SKU consistency across a campaign | Seedance 2.0 (`seedance_2_0`), falling back to Seedance 1.5 Pro if the SKU includes a person | Seedance 2.0 is the vendor-stated flagship for reference-driven identity and multi-SKU consistency **[SOURCED]**; use 1.5 or Kling/Veo instead the moment a human subject needs to be reference-locked, per Bytedance's own guidance |
| Stylized / experimental look | Wan (`wan2_6`, `wan2_7`) | Open-weight family explicitly positioned for stylized and experimental output rather than photoreal default |
| Fastest and cheapest iteration | `happy_horse_video` (Higgsfield budget tier), Pika at 720p | Named as budget-tier options; use for rough animatics and idea validation before committing to a premium generation |
| Native audio required, tightly coupled to picture | Veo 3.1, Seedance 1.5 Pro, Kling 3.0, Grok Video, Gemini Omni | All generate audio and video in the same pass rather than requiring a post-production audio layer |
| Longest single-generation duration needed without editorial stitching | Sora 2 (documented up to 20 seconds), Higgsfield's `cinematic_studio_3_0` (4 to 15 seconds) | Highest duration ceilings in the landscape as of this writing; still confirm current limits before committing a schedule to them |
| Multi-shot narrative inside one generation | Kling 3.0, `cinematic_studio_video_v2` (`multi_shots` + `multi_prompt`) | Native multi-shot support, avoiding manual stitching for short continuous sequences |
| Templated ad format rather than a bespoke shot | `marketing_studio_video` | Built around hooks/settings/ad_reference_id; faster and more consistent than hand-writing a free-text prompt for a standard ad structure |

---

## B5. FAILURE MODES AND TELLS

| Failure mode | What it looks like | Why it happens | Fix |
|---|---|---|---|
| **Words fighting the image** | A prompt re-describes a character's or product's appearance in detail ("a woman with long red hair in a green dress") when a `start_image` has already fixed exactly that appearance | The prompt writer treated the text field as if it still needed to establish appearance, out of habit from text-only prompting | Once a `start_image` is set, the text prompt should describe motion, camera, lighting and sound only; strip appearance description down to the minimum needed to disambiguate action (e.g. "she turns" not "the red-haired woman in the green dress turns") |
| **Multi-shot prompt with no clear handoff logic** | A multi-shot generation where the second or third internal shot does not visibly follow from the first: lighting jumps, the subject's wardrobe changes, or the location silently shifts | The prompt listed shots as if they were independent, without repeating the fixed identity details or explicitly stating "same character and location throughout" | Restate the fixed identity anchor in every shot block (see Template 3), and open the whole prompt with an explicit continuity statement before the per-shot breakdown |
| **Audio generated before picture is locked** | A native-audio clip is approved for its sound, then the picture needs a revision, and the regenerated picture no longer matches the audio's timing or content | Audio and picture were treated as separately approvable when the model generates them in one coupled pass | Do not sign off on a native-audio generation's sound design as final until the picture itself is also final; if the picture needs another pass, budget for the audio to regenerate with it, not be preserved in isolation |
| **Negative prompt used as a blanket incantation** | A long, generic negative prompt ("no blur, no distortion, no artifacts, no bad quality, no low quality") is copied onto every generation regardless of shot type | Treating negative prompting as a universal quality booster rather than a scalpel for a specific, identified risk | Identify the one or two failure modes actually likely in this specific shot (per B1, question 7) and name only those |
| **Duration and resolution set to maximum by default** | Every generation is run at the highest available resolution and longest available duration "to be safe," regardless of what the final edit needs | No deliberate decision was made about what the delivery actually requires before generating | Decide the actual delivery spec first (B1, question 4), generate and approve creative at the lowest sufficient tier, and only re-render at a higher tier once the creative itself is locked |
| **Reference asset drift with no log** | A sequence is assembled from clips that turn out to have been generated against different or outdated reference stills, and nobody can say which clip used which reference | No continuity log was kept (see B3) | Maintain the written reference log from the first clip onward, not retroactively after a mismatch is noticed |

---

## B6. TRIGGER LIST: WHAT FORCES A PROMPT OR GENERATION REBUILD

A prompt or an already-generated clip must be rebuilt, not patched, when any of the following changes:

- **The reference image changes.** A new or revised `start_image`, `image_reference`, or `video_reference` means every clip conditioned on the old asset is now out of sync with the new one and needs regeneration, not a text-only edit.
- **A runtime change.** If the edit's cut length for this clip changes materially (a 5-second clip now needs to hold for 8 seconds, or vice versa), the action and camera pacing written into the prompt no longer fit the new duration and must be re-paced, not stretched or trimmed after the fact.
- **A shift from silent to native-audio delivery, or the reverse.** Moving from a silent picture-only clip to a native-audio requirement (or dropping native audio in favor of a post-production score) is a model-selection change as much as a prompt change; the whole generation should be reconsidered against the model selection table in B4, not patched with an audio bolt-on.
- **A platform or aspect-ratio change.** Moving a clip from horizontal to vertical, or from one platform's safe-area convention to another's, changes the framing language that was written into the original prompt (composition, headroom, camera distance) and is not reliably solved by cropping the finished output.
- **A change in which subject must stay consistent.** If a sequence that did not originally need cross-clip identity lock now needs it (a one-off hero shot becomes the seed of a recurring character or a recurring product), the whole sequence should be revisited against the continuity protocol in B3, including generating or selecting a proper locked reference still retroactively before any further clips are built.

---
---

# PART C: DATED COST SNAPSHOT (AS OF 2026-07-26, REFRESH BEFORE RELYING ON FOR BUDGETING)

---

**Read this before using any number below.** AI video pricing changes on a monthly cadence, sometimes faster, and vendors regularly restructure plans, rename tiers, or change credit-to-output ratios without much notice. Every figure below was current as of 2026-07-26 at the time of research for this document. Treat all of it as directional. Re-verify against the vendor's live pricing page before it informs an actual client budget or an internal cost-per-deliverable model.

## C1. Higgsfield (the connected MCP roster), verified live 2026-07-26

**Subscription plans**

| Plan | Monthly price | Annual price (per month) | Credits included |
|---|---|---|---|
| PLUS | $49/mo | $39/mo (billed annually) | 1,000 credits/mo |
| ULTRA | $129/mo | $99/mo (billed annually) | 3,000 credits/mo |

**One-time credit top-ups**

| Top-up size | Price | Approx. credits per dollar |
|---|---|---|
| 500 credits | $26 | ~19.2 |
| 1,000 credits | $49 | ~20.4 |
| 2,000 credits | $95 | ~21.1 |
| 4,000 credits | $190 | ~21.1 |

**Blended average, not a per-model rate:** Higgsfield's own in-app tooltip states roughly "200 videos per 1,000 credits" as a blended average across the whole roster. **[SOURCED, live MCP fetch, 2026-07-26]** This is not a usable per-model number; a budget or fast/low-resolution model consumes far fewer credits per video than a 4K, long-duration, native-audio generation on a premium model, and the blended figure will misprice both ends of that range if used directly.

**The one per-model anchor Higgsfield does surface:** the in-app tooltip separately calls out Kling 3.0 specifically as running roughly "200 Kling 3.0 videos" per 1,000 credits on the Plus tier, which works out to roughly 5 credits per video as a rough anchor at standard settings. **[SOURCED, live MCP fetch, 2026-07-26, but flagged]** This figure is explicitly *not* independently verified per resolution, duration, or mode (std vs pro vs 4K) by Higgsfield's own tooltip; it is a single blended reference point for one model at unspecified default settings. 4K output, pro mode, and longer durations all cost meaningfully more than this anchor, by an unspecified multiplier.

**Known limitation, stated plainly rather than papered over:** exact per-model, per-resolution, per-duration credit cost is only shown at the moment of generation inside the Higgsfield app itself. This MCP interface does not expose a full price table across all fourteen-plus hosted models and their parameter combinations. Any DLight cost-per-clip estimate built from this document should be treated as a rough planning figure, confirmed against the actual in-app credit cost shown immediately before generating, not as a firm quote. **[UNVERIFIED, known gap, flagged deliberately, do not paper over]**

## C2. External engines, native/API pricing, as researched 2026-07-26

| Engine | Reported pricing (2026-07-26) | Tag |
|---|---|---|
| **OpenAI Sora 2** (standard) | $0.10 per second at 720p | [SOURCED, per third-party pricing aggregation of OpenAI's published rate; verify against OpenAI's own pricing page before use] |
| **OpenAI Sora 2 Pro** | $0.30/sec at 720p, $0.50/sec at 1024p, $0.70/sec at 1080p (standard processing); Batch API pricing reported at roughly half the standard rate | [SOURCED, same caveat] |
| **Sora API availability** | Multiple third-party sources report the Sora web/app experience ended April 26, 2026, and the Sora API itself is scheduled for discontinuation around September 24, 2026 | [UNVERIFIED, significant claim from non-official sources only, could not be corroborated against an official OpenAI statement in this research pass. Confirm directly with OpenAI before making any commitment that depends on continued Sora API access] |
| **Runway Gen-4 / Gen-4.5** | Roughly 10 to 15 credits per second of video at standard quality, roughly 25 to 40 credits per second at Turbo/4K. Gen-4.5 specifically reported at 25 credits/sec. Plans: Free (125 one-time credits), Standard $12/user/mo annual (625 credits/mo), Pro $28/user/mo (2,250 credits/mo), Max $76/user/mo (9,500 credits/mo) | [UNVERIFIED, figures drawn from third-party aggregator commentary, not confirmed directly against Runway's own current pricing page] |
| **Kling AI** | Free tier: 66 credits/day. Paid plans reported as Standard ~$10/mo (660 credits), Pro ~$37/mo (3,000 credits), Premier ~$92/mo (8,000 credits), Ultra ~$180/mo (26,000 credits). Kling 3.0 reported at roughly 6 credits/sec (720p, no audio) up to roughly 12 credits/sec (1080p + native audio) | [UNVERIFIED, third-party aggregation. Kling's own official pricing page should be checked directly, as reported figures varied noticeably between sources in this research pass] |
| **Google Veo 3.1 (API / Vertex AI / Gemini API)** | Reported roughly $0.40/sec at 720p or 1080p standard quality, $0.60/sec at 4K. A "Fast" tier reported around $0.10 to $0.15/sec. A "Lite" tier reported around $0.03 to $0.05/sec. An 8-second standard clip works out to roughly $3.20 | [UNVERIFIED, figures varied across sources in this research pass. Confirm against Google's official Gemini API / Vertex AI pricing page, especially the audio-inclusive surcharge, before budgeting] |
| **Luma Dream Machine** | A newer 2026 tier structure reported as Plus $30/mo, Pro $90/mo, Ultra $300/mo, with no free tier. Some sources still reference an older ladder (Lite $9.99/mo, Plus $29.99/mo, Unlimited $94.99/mo) | [UNVERIFIED, sources conflicted on which tier structure is currently live. Confirm directly with Luma before quoting a client] |
| **Pika (2.2+)** | Free (80 credits/mo, 480p), Standard $8/mo, Pro $28/mo, Fancy $76/mo. A 10-second 1080p clip reported at roughly 80 credits | [UNVERIFIED, third-party aggregation, confirm against Pika's own pricing page] |
| **Hailuo / MiniMax, Bytedance Seedance, Wan, Grok Video** | No independently confirmed, current, standalone consumer/API price list was found for these engines as of this research pass. Where relevant, cost exposure for DLight is via the Higgsfield roster in C1 rather than a direct vendor account | [UNVERIFIED, flagged as a genuine research gap rather than an estimate] |

## C3. What this means for DLight budgeting right now

- **For any live DLight project using Higgsfield**, use the C1 figures as the working reference, but always confirm the exact credit cost shown in-app immediately before generating, since neither this document nor the MCP interface exposes the full per-model/per-parameter table.
- **For any project considering a direct account with an external engine** (Sora, Runway, Kling, Veo, Luma, Pika, or any other), treat every figure in C2 as a starting estimate only. Re-fetch the vendor's own current pricing page before quoting a client or committing an internal budget line, the same discipline this workspace already applies to FS2026 for financial data.
- **Set a recurring reminder to refresh this Part C**, ideally on the same cadence as other fast-moving external cost data in this workspace. AI video pricing in 2026 has moved fast enough, in both directions, that a snapshot older than roughly 60 to 90 days should not be trusted for a real quote without re-verification.
