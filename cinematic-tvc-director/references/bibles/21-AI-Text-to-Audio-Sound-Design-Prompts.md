# 21. AI Text-to-Audio Generation: Sound Effects, Ambience, and Soundscape Prompting

## Craft Bible Series, Part 21

### Scope note (read this first)

This bible covers **text-to-audio generation for sound effects, ambience beds, and abstract soundscapes only**. It does not cover:

- **Speech, voiceover, or dialogue synthesis.** That is a separate discipline with its own craft bible (see Part 8, VO Casting and Voice Direction, and any dedicated text-to-speech prompting companion). A tool that takes a script and returns a spoken performance is not in scope here, even if it is marketed under a general "audio generation" umbrella.
- **Music generation.** Scored themes, songs, stingers built from musical structure (key, tempo, chord progression), and generative music tools (Suno-class, ElevenLabs Music) belong to a separate companion bible. Where an SFX tool's vocabulary overlaps with music terms (a "riser," a "braam," a drum loop), this bible treats those as sound-design elements used for transitions and tension, not as music composition.
- **Sound design craft itself as a discipline** (spotting sessions, stems, mix hierarchy, dialogue/music/effects balance, foley recording on a stage). That is Part 10, Sound Design and Music. This bible is the narrower discipline of writing prompts that generate individual audio elements which a sound designer then places, layers, and mixes. Every section below assumes Part 10's frame-exact sync discipline as the downstream destination for whatever gets generated here.

What is in scope: any generative tool where you type a text description of a sound (a footstep, a door slam, a rain bed, a sci-fi whoosh, a UI chime) and the model renders an audio file, with no music-theory input and no spoken words required.

### How to read the claim tags

Every substantive claim in this bible carries one of three tags, matching the convention used across the whole series:

| Tag | Meaning |
|---|---|
| **[SOURCED]** | Drawn from a named, checkable source: vendor documentation, an official pricing page, a published interview, or a live schema fetch. The source is named inline. |
| **[PRINCIPLE]** | General craft reasoning, not a sourced fact. True in the author's professional judgement and consistent with practice, but not attributable to a specific citation. Treat as a strong default, not as evidence. |
| **[UNVERIFIED]** | A specific figure or claim that could not be confirmed against a primary source, usually because a vendor page was inaccessible or ambiguous. Confirm before relying on it, especially for budgeting. |

---

## PART A: CRAFT REFERENCE

### A1. What text-to-audio generation is for in a production pipeline

Text-to-audio SFX tools exist to fill a specific set of gaps in a production's sound budget, not to replace a sound department. In practice they are used for:

- **Foley substitution.** When there is no foley stage, no foley artist, or no time to record a physical prop hit, a generated one-shot (a glass clink, a fabric rustle, a keychain jingle) can stand in. This is the most common use on lean digital and social productions.
- **Ambience beds.** A generated loop of rain, wind, traffic, crowd murmur, or room tone gives a scene a sense of place under the dialogue and music, especially for AI-generated or stock footage that arrived with no usable production audio.
- **Transitional whooshes and impacts.** Cut punctuation. A whoosh under a hard cut, an impact under a logo reveal, a riser leading into a beat drop. These are abstract, non-diegetic elements that exist to serve the edit rather than the story world.
- **UI and notification sounds.** App interactions, message pings, button taps, error tones, for explainer videos, app demo reels, and product films.
- **Abstract sound design elements.** Drones, glitches, textures, and sci-fi or horror processing beds that would be expensive or impossible to source any other way.

What it is explicitly not for: dialogue replacement (ADR), music scoring, or generating a finished mixed soundscape in one shot. [PRINCIPLE] The tools in this space generate individual elements. A finished scene's soundscape is always an edit-and-mix assembly of multiple generated (and often multiple recorded) elements, never a single generation.

### A2. The anatomy of a strong SFX/ambience prompt

A visual generation prompt (image or video) describes what a camera sees: subject, action, lighting, lens, composition. An audio generation prompt describes an entirely different set of physical properties, because sound has no frame and no camera. A strong prompt for this discipline stacks the following layers, roughly in order of importance:

1. **Source description: what is physically making the sound.** Not "a scary sound" but "a large wooden door on rusted iron hinges." The model needs a physical, causal source, the same way a foley artist needs to know what object and what surface before they can perform a hit.
2. **Material and texture cues.** Wood versus metal versus glass versus flesh versus fabric. Wet versus dry. Rough versus smooth. Hollow versus solid. These words carry enormous weight in audio prompts because they map directly to frequency content and transient shape, the two things that make one impact sound different from another.
3. **Spatial and environmental cues.** Indoor or outdoor. Close-mic or distant. Reverberant (a large stone hall, a parking garage) or dry (a padded room, an open field with no reflective surfaces). This is the audio equivalent of a visual prompt's "wide shot" versus "extreme close-up," and it needs to be stated just as explicitly.
4. **Temporal shape.** Is this a single transient hit (a snap, a slam, a clink), a sustained loopable texture (wind, rain, a drone), or an evolving arc (a whoosh that rises then falls, a riser that builds over 4 seconds)? This governs both the model's rendering approach and the duration you should request.
5. **Intensity and dynamics.** Subtle versus dramatic. A soft tap versus a violent crash. Loudness in a generated file is relative and gets set properly in the mix, but the character of intensity (aggressive, tentative, mechanical, organic) needs to be in the prompt because it shapes the performance of the sound, not just its volume.

This vocabulary is fundamentally different from a visual prompt's vocabulary. There is no lens, no color, no composition, no lighting direction. Instead there is material, space, and time. Writers moving from image/video prompting to audio prompting for the first time consistently make the mistake of describing what a sound "looks like" (cinematic, epic, dramatic) instead of what physically produces it and where it is happening. [PRINCIPLE]

### A3. Worked prompt templates (5 goals, full breakdowns)

Each template below is written in the natural-language style that the current generation of tools (ElevenLabs Sound Effects, Stable Audio) is optimized for: a plain descriptive sentence or two, not a tag-soup keyword list. [SOURCED: ElevenLabs' own documentation explicitly recommends clear, concise natural-language descriptions over keyword stacking for simple effects, and sequential natural-language description for complex multi-part sounds.]

#### Template 1: Short UI / notification chime

**Prompt:** "A soft, clean two-note notification chime, bright bell-like tone, gentle attack, quick decay, minimal reverb, suitable for a mobile app alert."

**Duration:** 1 second, specified explicitly.

Line-by-line breakdown:
- "Soft, clean" sets intensity and material quality (not harsh, not distorted).
- "Two-note" gives the model a structural target, since a chime is more than one transient.
- "Bright bell-like tone" gives a timbral reference without invoking musical notation.
- "Gentle attack, quick decay" specifies the temporal envelope explicitly, this is a one-shot, not a sustained tone.
- "Minimal reverb" locks the spatial cue: dry, close, digital, not a cathedral bell.
- "Suitable for a mobile app alert" gives the model a use-case anchor that steers away from cinematic or musical interpretations.

#### Template 2: Single hard impact / hit sound

**Prompt:** "A single heavy metal impact, like a large steel door slamming shut in an empty industrial warehouse, sharp transient, deep low-end thud, short natural reverb tail, no music."

**Duration:** 2 seconds.

Line-by-line breakdown:
- "Single heavy metal impact" names the event count (one) and the material (metal), which governs the harmonic content of the hit.
- "Like a large steel door slamming shut" gives a concrete, physically real source object rather than an abstract description.
- "Empty industrial warehouse" sets the spatial cue: reverberant, large, hard-surfaced.
- "Sharp transient, deep low-end thud" separates the two components of an impact sound explicitly, the attack and the body, which is exactly how a sound designer thinks about a hit.
- "Short natural reverb tail" bounds the decay so the model doesn't render an unnaturally long ring.
- "No music" is a negative instruction, useful because impact prompts often drift toward "cinematic braam" territory unless explicitly excluded.

#### Template 3: Sustained ambience bed / loop

**Prompt:** "A continuous, seamless loop of steady rainfall on a corrugated metal roof, medium intensity, occasional distant low rumble of thunder, no wind, no dialogue, no music, consistent texture throughout with no variation in intensity."

**Duration:** 30 seconds (the platform maximum for a single seamless-loop generation on most current tools), intended to be looped in the edit for however long the scene runs.

Line-by-line breakdown:
- "Continuous, seamless loop" is the explicit instruction that tells the model this is not a one-shot, and it is the trigger word for whichever looping feature the tool offers.
- "Steady rainfall on a corrugated metal roof" gives source and surface material, which is what differentiates this from rain-on-grass or rain-on-a-window.
- "Medium intensity" sets a dynamic ceiling so the loop doesn't swing unpredictably.
- "Occasional distant low rumble of thunder" is deliberately hedged ("occasional," "distant") because an ambience bed needs enough variation to not sound like a frozen loop, but not so much that it creates a non-repeatable event inside the loop window.
- "No wind, no dialogue, no music" are negative instructions that keep the bed clean for layering (see A6, layering discipline).
- "Consistent texture throughout with no variation in intensity" is the anti-seam instruction, explicitly telling the model not to build an arc, which would create an audible jump at the loop point.

#### Template 4: Whoosh / transition element

**Prompt:** "A fast whoosh, like an object flying quickly past camera left to right, airy and ghostly texture, rising pitch then sharp cutoff, no impact at the end, dry with minimal room tone, for a hard cut transition."

**Duration:** 1.5 seconds.

Line-by-line breakdown:
- "Fast whoosh" and "flying quickly past" set both the named sound-design term and the physical motion behind it.
- "Camera left to right" is a directional cue, useful for tools and downstream panning even though the mono or stereo render will need manual panning in the edit.
- "Airy and ghostly texture" gives timbral character, distinguishing this from a heavier, more mechanical whoosh.
- "Rising pitch then sharp cutoff" specifies the temporal shape precisely, this is the difference between a whoosh that "arrives" (cutoff) versus one that "passes through and fades" (which would need a different instruction).
- "No impact at the end" is a negative instruction that prevents the model from tacking on an unwanted hit, since whooshes and impacts are frequently generated together by default.
- "Dry with minimal room tone" keeps it purpose-built for editing into a mix rather than sounding like it was recorded in a specific location.

#### Template 5: Foley-style object interaction sound

**Prompt:** "A hand picking up a ceramic coffee mug from a wooden table, soft clink of ceramic on wood, subtle finger contact, then a light scrape as the mug is lifted, close-mic perspective, dry room with no reverb, natural and unprocessed."

**Duration:** 2.5 seconds.

Line-by-line breakdown:
- The full causal chain (pick up, mug, table) reads like a foley cue sheet line, which is precisely the mental model that produces good results, this is the discipline of thinking like a foley artist, not a sound-effects librarian.
- "Ceramic on wood" specifies both contact materials, which governs the pitch and hardness of the clink.
- "Subtle finger contact, then a light scrape" sequences two sub-events in the correct order, matching how a real foley pass layers multiple micro-sounds into one action.
- "Close-mic perspective" sets proximity explicitly, this is a foley element meant to sit intimately in a scene, not an ambient background element.
- "Dry room with no reverb" and "natural and unprocessed" are both negative/anchoring instructions that stop the model from adding cinematic polish that would make the sound feel designed rather than incidental, which is wrong for foley.

### A4. The tool and engine landscape

Honest state of the market as of 2026-07-26. This field has far fewer serious players than image, video, or music generation, and the gap between "production-ready commercial product" and "research demo" is wide and important to know.

**ElevenLabs Sound Effects.** [SOURCED] A shipped, commercial, API-and-UI product. Generates sound effects and ambience from natural-language text prompts, with explicit duration control (0.1 to 30 seconds per generation) and a seamless-looping feature for effects longer than 30 seconds intended for atmospheric, ambient, background use. The current model generation (SFX V2, released September 2025 per third-party reporting) [SOURCED, per elevenlabsmagazine.com reporting, treat as secondary source pending confirmation against ElevenLabs' own changelog] extended maximum clip duration, added seamless looping, moved to 48kHz output, and improved prompt adherence. ElevenLabs' own documentation explicitly separates "simple effects" (short, concrete, single-sentence descriptions), "complex sequences" (multi-part, describing an ordered sequence of events), and "musical elements" (drum loops, bass stabs, which the docs themselves flag as better suited to their dedicated Music product for full compositions). This is the most production-ready, most widely adopted tool in this specific niche.

**Stability AI's Stable Audio.** [SOURCED] A shipped, commercial API product (Stable Audio 2.5, with a newer Stable Audio 3.0 generation also in market) available directly through Stability's platform and through partner hosts (fal, Replicate). Stable Audio's headline strength is music and longer coherent compositions (Stable Audio 3.0 produces tracks up to roughly six minutes), but the family includes text-to-audio and audio-to-audio generation modes usable for sound design and effects work, and reporting indicates a dedicated lightweight variant built specifically for sound-effects-only inference (described in some reporting as a "Small-SFX" model with a maximum length around 120 seconds). [UNVERIFIED: the exact branding and availability of a dedicated "Small-SFX" Stable Audio variant could not be confirmed against Stability's own primary documentation in this research pass; treat this specific claim as unconfirmed until checked against platform.stability.ai directly.] For pure one-shot SFX and ambience work (as opposed to music), Stable Audio is a viable but secondary option behind ElevenLabs in the market's current center of gravity, given Stable Audio's design center is closer to music.

**Meta's AudioGen / AudioCraft.** [SOURCED] A research release, not a production SaaS product. AudioCraft is Meta's open-source audio generation codebase (bundling AudioGen for sound effects, MusicGen for music, and EnCodec for compression), released publicly in August 2023 with an interactive demo. AudioGen specifically is trained on environmental sounds and sound effects (footsteps, cars, dogs barking, etc.) and in its original released form generates short clips (around 5 seconds) from a text prompt. This is open-weight, self-hostable, and free of per-generation cost, but it requires you to run the model yourself (GPU compute, inference pipeline), it has no polished commercial UI or managed API with SLAs, and its quality and prompt-following are behind the current commercial leaders. It belongs in this bible as the honest research-grade option for teams with in-house ML capacity, not as a drop-in production tool for a lean creative agency.

**Higgsfield's audio generation coverage (as connected via MCP, verified live 2026-07-26).** Higgsfield exposes a `generate_audio` capability with two relevant entries:
- `mirelo_text_to_audio`, "Mirelo Text to Audio" (hosted via FAL), described in its own tool schema as text-to-audio sound effect generation with controllable duration, and explicitly marked "game pipeline only" in that schema. It requires a duration parameter (example: 2 seconds). This is the closest thing Higgsfield has to a general SFX/ambience generator, but its own labeling restricts its intended use case to game-pipeline audio, and its parent company Mirelo's broader public product line is centered on video-to-audio (matching sound to an uploaded video clip) rather than pure text-to-audio, per market research in this pass. [SOURCED: Higgsfield MCP tool schema, fetched live 2026-07-26]
- `seed_audio`, "Seed Audio 1.0" (ByteDance), labeled by Higgsfield as text-to-audio synthesis, but its actual parameter set (voice_type, voice_id, speech_rate, pitch_rate) shows this is a **speech-oriented text-to-speech tool, not a general soundscape or SFX tool**. Do not use it for ambience, foley, or abstract sound design; its parameters have no concept of source material, space, or a one-shot versus loop distinction, they are the parameters of a voice engine. [SOURCED: Higgsfield MCP tool schema, fetched live 2026-07-26]

**Honest assessment:** Higgsfield's own native SFX/ambience coverage is genuinely thin relative to the market leaders. It has one narrow, game-flagged tool for actual sound-effect generation and one mislabeled speech tool. For any serious ambience, foley, or transition-element work on a client production, ElevenLabs Sound Effects is currently the stronger default, with Stable Audio as a secondary option, and Higgsfield's `mirelo_text_to_audio` as a workable option only when it is already the platform in use for a project and the need is a short, game-style SFX one-shot. [PRINCIPLE, based on the sourced facts above]

### A5. Looping and duration control

Duration must always be specified deliberately, never left to a model's default. [PRINCIPLE, reinforced by SOURCED ElevenLabs documentation, which frames duration as an explicit optional parameter with a stated default fallback behavior of "automatically determined based on the prompt," meaning an unspecified duration hands control to the model's own guess rather than the edit's actual need]

Two fundamentally different intents:

- **One-shot duration.** A single hit, chime, or foley event has a natural length determined by the physical event itself (a slam, a clink, a tap). Here, duration should be set to comfortably contain the transient and its natural decay tail, with a small margin, not padded arbitrarily. Requesting too short a duration risks clipping the decay; requesting too long invites the model to add unwanted extra content after the natural event ends.
- **Loop duration.** A sustained ambience bed or texture needs to be requested with the explicit vocabulary of looping ("seamless loop," "continuous," "no variation in intensity," "consistent texture throughout"). Current commercial tools (ElevenLabs SFX V2 per its documentation) support a seamless-looping mode specifically because naive loop construction (just repeating a generated clip back to back) produces an audible seam, a perceptible click, pop, or jump where the clip restarts. The prompt's job is to describe a texture with no internal arc, no beginning-middle-end shape, so that the loop point is inaudible.

Why deliberate duration matters for a production pipeline specifically: the generated file will ultimately be dropped onto a timeline at an exact frame. If the generation runs long, it gets trimmed, which is safe for loops (trim anywhere in a seamless loop) but risky for one-shots (trimming a one-shot risks cutting off the transient or the decay tail, destroying the sound's realism). If it runs short, the editor is stuck either stretching audio (which degrades quality and pitch) or requesting a regeneration. Specifying duration precisely at generation time, matched to the edit's actual need, is cheaper and higher quality than fixing it after the fact. This connects directly to Part B's frame-exact handoff discipline below.

### A6. Layering discipline: why one soundscape is many generations, not one

A rich, believable soundscape is built from multiple one-shot and loop elements layered together in an edit, not from one single generated "ambience" doing everything. [PRINCIPLE] This is the same structural logic Part 10 (Sound Design and Music) uses for stems and beds: a finished scene mix separates dialogue, music, and effects, and within the effects layer, a sound designer further separates a base ambience bed from discrete foreground events (footsteps, door, prop handling) from transitional punctuation (whooshes, risers, impacts). Each of those layers has a different spatial treatment, a different dynamic role, and a different sync requirement.

A single generated clip cannot serve all of these roles at once, because:

- A model asked for "a busy street ambience" will produce one fixed, non-editable blend of traffic, voices, and footsteps. If the edit later needs to isolate or remove the voices (because a real actor's dialogue needs to sit in that space), there is no way to pull that element back out of a monolithic generation.
- Foreground events need to be individually placeable at exact frames (a specific footstep syncing to a specific footfall on screen), which is impossible if that footstep is baked into a background bed at an arbitrary, non-adjustable position in time.
- Different elements often need different processing in the mix (a distant thunder rumble needs a low-pass filter and reverb; a close foley clink needs neither), which is only possible if they are separate audio files, not baked into one track.

The correct practice is to generate: one clean ambience bed (looped, textural, no discrete foreground events), plus separate one-shot generations for each foreground event and each transition element the edit calls for, and to layer and mix all of them together as separate stems in the edit, exactly as Part 10 describes for a conventional sound edit. Treat every text-to-audio generation as raw material for a stem, never as a finished mix.

### A7. Vocabulary glossary

| Term | Definition |
|---|---|
| One-shot | A single, non-repeating sound event (a hit, a clink, a chime), as opposed to a loop |
| Loop | A repeating audio segment, constructed to play back to back with no audible seam |
| Bed | A continuous background ambience track that establishes a scene's environment (also called an ambience bed) |
| Stinger | A short, sharp musical or sound-design hit used to punctuate a moment (a reveal, a joke beat, a jump scare) |
| Whoosh | A movement-through-air sound effect, used to sell motion or to punctuate a transition/cut |
| Riser | A sound that builds in intensity and often pitch over a duration, used to build tension into a cut, reveal, or beat |
| Foley | Sound effects created to match specific physical actions on screen (footsteps, cloth movement, object handling), traditionally performed live on a foley stage, here generated from text description of the same physical action |
| Transient | The very beginning of a sound, its sharp initial attack, which carries most of the information that identifies a sound's material and character |
| Decay | The tail of a sound after its initial transient, how it fades or resonates away, often the hardest part of a sound for a model to render convincingly |
| Seamless loop point | The exact moment a loop restarts; "seamless" means this point is inaudible, with no click, pop, or perceptible jump in texture or level |
| Braam | A big, brassy, cinematic hit sound, common in trailers, that signals an epic or dramatic moment (a sound-design/music hybrid term) |
| Drone | A continuous, textured, often low or sustained sound used to build atmosphere or suspense without a clear rhythmic pulse |

---

## PART B: AGENT OPERATING MANUAL

### B1. Questions to ask before generating any SFX/ambience element

Ask these, in this order, before writing a single prompt:

1. **Is this a one-shot or a loop?** This determines the entire prompt vocabulary (temporal-shape language for one-shots, continuity/no-variation language for loops) and the duration-setting approach.
2. **What is the exact duration needed?** Not "about a few seconds," an exact number, pulled from the edit (a specific cut length, a specific scene duration, a specific loop window). If the edit isn't locked yet, get the best current estimate and flag that this element may need regeneration once picture is locked (see B6, trigger list).
3. **Will this be layered with other elements, or does it need to stand alone?** If it's one layer of a multi-element bed, it should be generated clean and isolated (no other elements baked in) so it can sit in its own stem. If it's a standalone effect (a UI chime, a single foley hit), it can be generated with its natural, complete character.
4. **Does it need to sync to a specific visual event?** If yes, the exact timecode or frame of that event needs to be known before generation (see B3), because the generated file's internal timing (where the transient lands inside the clip) needs to match how it will be placed.
5. **What is the target platform's technical requirement?** Sample rate, loudness target (LUFS), and format needed for final delivery, so the generated asset isn't silently mismatched to spec at the mix stage.

### B2. Reusable prompt-construction template

Use this five-slot structure for any SFX/ambience generation, matching the anatomy from A2:

```
[SOURCE: physical object/action] + [MATERIAL/TEXTURE] + [SPACE: indoor/outdoor, near/far, wet/dry acoustics] + [TEMPORAL SHAPE: one-shot / sustained loop / evolving arc, with attack-decay language] + [INTENSITY: subtle to dramatic] + [NEGATIVE INSTRUCTIONS: no music, no dialogue, no reverb, no extra events]
```

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

### B3. The frame-exact handoff

A generated sound element is only useful once it lands at the correct place in an edited timeline, and this is where audio generation discipline meets editorial discipline directly. Cross-reference: Part 10 (Sound Design and Music) establishes the frame-exact sync point as the standard for placing any discrete sound event against picture, meaning a sound is placed at the specific frame where a visual action occurs (a door closing, a footfall landing, a cut happening), not "somewhere in the vicinity."

The practical chain for a generated element:

1. **Identify the exact timecode or frame** in the edit where the sound needs to land (for example, frame 142 of a 24fps sequence, where a punch visually connects).
2. **Generate the element with duration matched to that moment's need**, not trimmed after the fact. If the visual action from anticipation to impact to settle spans 1.8 seconds, request a 1.8 to 2.0 second generation with the temporal shape described precisely (a build, then a hit, then a short decay), rather than generating a generic 5-second clip and cutting it down. A model asked for a precise duration and a precise temporal arc will place its transient more predictably inside the file than a longer, untargeted generation that then gets chopped.
3. **Place the file so its transient (not its file start) lands on the frame.** Many generated one-shots have a few frames of lead-in before the actual hit; the editor must nudge the clip so the perceptual attack, not the waveform's zero point, aligns with the visual event. This is standard audio editing practice carried over unchanged from recorded foley, and it applies exactly the same way to a generated file.
4. **Confirm against Part 10's sync tolerance standard** before considering the placement final. If Part 10 specifies a tolerance (for example, within one or two frames for a hard sync point), the generated element's placement must be checked against that same tolerance, it does not get a looser standard just because it was AI-generated rather than recorded.

Why prompting for precise duration beats generate-then-trim: trimming a one-shot risks cutting into its natural decay tail or its pre-hit anticipation, both of which are perceptually important and hard to fully mask with a fade. Getting the duration and internal shape right at generation time, informed by the actual edit, produces a cleaner result and avoids a second round trip to regenerate.

### B4. Model selection decision table

| Goal | Best-fit tool (as of 2026-07-26) | Why |
|---|---|---|
| Short UI / notification sound | ElevenLabs Sound Effects | Purpose-built natural-language SFX prompting, precise duration control down to 0.1s, dry/close results are easy to steer toward |
| Big impact / hit sound | ElevenLabs Sound Effects | Strong prompt adherence for named audio terminology (impact, braam), 30s max window comfortably covers any hit-plus-tail |
| Ambience bed / loop | ElevenLabs Sound Effects (seamless looping feature), Stable Audio as secondary | ElevenLabs' documented seamless-loop capability is purpose-built for exactly this; Stable Audio's longer native coherent duration (built for music) can also serve extended ambience needs |
| Transition element (whoosh/riser) | ElevenLabs Sound Effects | Documented audio-terminology vocabulary (whoosh, riser, glitch) with strong prompt adherence for these specific named categories |
| Foley substitute | ElevenLabs Sound Effects, with AudioCraft/AudioGen as a free fallback if in-house ML compute exists | Natural-language causal-chain prompting (object plus action plus surface) is well supported; AudioGen is a viable free alternative for teams able to self-host, at a quality tradeoff |
| Game-pipeline short SFX one-shot, already on the Higgsfield platform | Higgsfield `mirelo_text_to_audio` | Only if Higgsfield is already the working platform for the project; its own schema flags it as game-pipeline oriented, so validate output quality against the specific need before relying on it for a client-facing broadcast or social deliverable |
| Anything requiring spoken words | Neither tool in this bible | Route to the dedicated VO/text-to-speech companion bible; do not attempt to coax spoken words out of an SFX tool, and do not use Higgsfield's `seed_audio` for anything other than actual speech |

### B5. Failure modes and tells

- **A prompt asking for music-like qualities from an SFX tool.** Requesting "an epic emotional swell" or "a melodic rising tone in C major" from a pure sound-effects engine produces inconsistent, often disappointing results, because these tools are optimized for physical/textural description, not harmonic or melodic composition. Tell: the output sounds like a vague, undirected pad rather than a controlled musical phrase. Fix: route to the music companion bible and a dedicated music generation tool, or accept a genuinely non-musical "drone" or "riser" descriptor instead of musical-theory language.
- **A looping ambience with an audible seam.** Tell: a periodic click, pop, or perceptible jump in texture at a regular interval matching the source clip's length. Cause: either the generation wasn't requested with explicit "seamless loop" / "no variation" language, or the tool's non-looping default output was manually chained back-to-back without using the tool's dedicated looping feature. Fix: regenerate using the tool's explicit seamless-loop parameter or vocabulary, and if the seam persists, crossfade a short overlap (roughly 5 to 10 frames) at the loop point in the edit as a manual patch.
- **A duration mismatch forcing an awkward edit.** Tell: a sound that has been visibly stretched (pitch-shifted, time-stretched, and audibly degraded) or abruptly cut off mid-decay to fit a slot. Cause: duration wasn't specified precisely at generation time, or the edit's cut length changed after the audio was generated. Fix: regenerate with the corrected duration rather than force-fitting the existing file; see the trigger list below for when a cut-length change specifically requires this.
- **A foley-style prompt that reads like a mood board instead of a cue sheet.** Tell: vague, adjective-heavy prompts ("a tense, unsettling sound") that produce generic, unusable texture instead of a specific, placeable event. Fix: rewrite as a causal chain, object, material, action, exactly like Template 5 in Part A.
- **Treating Higgsfield's `seed_audio` as a soundscape tool because its label says "text-to-audio."** Tell: attempting to pass an ambience or SFX description into a tool whose actual parameters are voice_type, voice_id, speech_rate, and pitch_rate. This will either fail outright or produce a spoken/vocal artifact, not a sound effect. Fix: always check a tool's actual parameter schema, not just its display name, before use; this exact mislabeling is called out explicitly in Part A4.

### B6. Trigger list: what forces regenerating an audio element

- **A cut's duration changes.** If the edit trims, extends, or re-times the shot or sequence a sound was matched to, the sound's duration and internal temporal shape (where the transient falls) likely no longer fit, and it should be regenerated to the new duration rather than stretched or re-cut.
- **A scene's location or material changes.** If a door that was wood becomes metal, or an exterior scene becomes an interior one, the physical source and spatial cues in the original prompt are now wrong, and the element needs to be regenerated with updated source/material/space language, not just re-used and hoped to pass.
- **A platform loudness or technical delivery requirement changes.** If the deliverable shifts to a platform with a different loudness standard (LUFS target), sample rate, or format requirement, existing generated assets may need to be regenerated at the correct native sample rate (rather than up-sampled after the fact) or re-processed in the mix; check the platform spec before assuming an existing asset library carries over cleanly.
- **A generated loop's seam becomes audible once placed under other elements in the mix.** A loop that sounded seamless in isolation can reveal a seam once EQ'd, compressed, or layered with other stems in the final mix; if this happens, regenerate with more conservative "no variation" language rather than trying to fully mask it with editing tricks.
- **The model or tool version changes.** If the underlying model is updated (a new SFX version, as happened with ElevenLabs' shift to SFX V2), previously generated assets on an active project are not automatically upgraded, and if consistency across a project's whole sound palette matters, consider whether older assets should be regenerated on the current model for tonal consistency, particularly on longer-running or reopened projects.

---

## PART C: DATED COST SNAPSHOT (as of 2026-07-26, refresh before relying on for budgeting)

AI pricing in this category changes fast and this snapshot will go stale. Every figure below is flagged with its confidence level. Re-verify directly against each vendor's live pricing page before using any number here for a client quote or an internal budget.

### C1. ElevenLabs Sound Effects

[SOURCED, from ElevenLabs' own documentation, fetched 2026-07-26]

- **Per-generation cost driver:** Sound effects consume credits at a rate of **40 credits per second of audio when duration is explicitly specified.** If duration is left unspecified, the model auto-determines length and the credit cost follows the resulting length at the same per-second rate.
- **Duration range:** 0.1 to 30 seconds per generation. Seamless looping is available for effects intended to play longer than 30 seconds (generate a loopable 30-second unit, then loop it in the edit).
- **Plan credit allowances** [SOURCED, from ElevenLabs' pricing page, fetched 2026-07-26]:

| Plan | Monthly price | Credits per month | Approx. SFX seconds this buys (at 40 credits/sec, if ALL credits went to SFX) |
|---|---|---|---|
| Free | $0 | 10,000 | ~250 seconds |
| Starter | $6/mo | 30,000 | ~750 seconds |
| Creator | $11/mo (first month promo pricing seen at time of fetch; list price varies) | 121,000 | ~3,025 seconds |
| Pro | $99/mo | 600,000 | ~15,000 seconds |
| Scale | $299/mo | 1,800,000 | ~45,000 seconds |
| Business | $990/mo | 6,000,000 | ~150,000 seconds |

**Important caveat:** [PRINCIPLE] Credits are shared across ElevenLabs' entire product suite (speech, music, dubbing, sound effects, image, video). The "SFX seconds this buys" column above assumes a plan's entire credit allowance is spent only on sound effects, which will never be true in a real production workflow that also uses the platform for other purposes. Treat that column as a theoretical ceiling, not a realistic monthly SFX budget.

**Rough per-second cost translation** (credits-to-dollars, back-of-envelope, [UNVERIFIED as an official vendor figure, derived by DLight from the two sourced numbers above]): on the Starter plan, $6 for 30,000 credits implies roughly $0.0002 per credit, so 40 credits/second works out to roughly $0.008 per second of generated SFX (about $0.48 per minute) if paying at that plan's blended rate. On the Pro plan the blended per-credit rate is cheaper (roughly $0.000165/credit), bringing the effective SFX cost down to roughly $0.0066 per second (about $0.40 per minute). These are derived approximations, not a published per-second price, and should not be quoted to a client without verifying current plan terms directly on elevenlabs.io/pricing.

### C2. Stability AI, Stable Audio

[SOURCED via a third-party pricing aggregator (developer.puter.com, updated June 2026) cross-checked against a second independent source citing the same figures; NOT confirmed directly against Stability's own primary pricing page in this research pass, so treat the specific numbers below as [SOURCED, secondary] rather than vendor-primary.]

- **Text-to-Audio and Audio-to-Audio generation:** 20 credits per generation. Stability's credit rate is 1 credit = $0.01, so this is **$0.20 per generation**, a flat per-call rate regardless of the requested duration within the model's supported range.
- **Third-party hosting (fal.ai, Replicate):** Independent pricing references found in this research pass cite Stable Audio 2.5 Edit at **$0.20 per generation** on both fal.ai and Replicate, consistent with Stability's own direct-API rate above.
- **Free credits:** Google social sign-up grants 25 one-time free credits (roughly enough for one to a few generations at 20 credits each), not a recurring monthly allowance.
- **Model variant note:** [UNVERIFIED] Some third-party reporting references a lightweight "Small-SFX" Stable Audio 3 variant purpose-built for sound-effects-only inference with a maximum length around 120 seconds. This could not be confirmed against Stability's own primary documentation in this pass; verify directly at platform.stability.ai before relying on it for planning.
- **No dedicated "sound design mode" pricing tier was found as a separately labeled, separately priced feature.** [UNVERIFIED] Stable Audio's text-to-audio and audio-to-audio endpoints appear to be the operative modes for SFX-style work, priced at the flat 20-credit rate above; a distinctly branded "sound design mode" with its own pricing was not located in this research pass.

### C3. Meta AudioGen / AudioCraft

[SOURCED]

- **Cost: $0 in licensing/generation fees.** AudioCraft (including AudioGen) is released open-source with published model weights, available for self-hosted inference.
- **Real cost is compute, not license.** Running AudioGen requires your own (or rented) GPU infrastructure and an inference pipeline; there is no managed API, no per-call billing, and no official commercial SLA from Meta for this release. Budget for cloud GPU rental (highly variable by provider and instance type, not estimated here) rather than a per-generation fee.
- **Not a like-for-like substitute for ElevenLabs or Stable Audio on quality or convenience** for a lean creative agency without in-house ML engineering support; include here for completeness and for teams evaluating a zero-license-fee, full-control option.

### C4. Higgsfield-hosted audio generation (mirelo_text_to_audio, seed_audio)

[SOURCED, fetched live from the connected Higgsfield MCP, 2026-07-26]

- **Plan pricing (platform-wide, not audio-specific):**

| Plan | Monthly price | Credits/month |
|---|---|---|
| PLUS | $49/mo ($39/mo billed annually) | 1,000 credits |
| ULTRA | $129/mo ($99/mo billed annually) | 3,000 credits |

- **One-time top-ups:** 500 credits for $26, 1,000 credits for $49, 2,000 credits for $95, 4,000 credits for $190, working out to roughly 19 to 21 credits per dollar depending on the tier purchased.
- **Known limitation, flagged explicitly:** Higgsfield does not publish a per-model credit table specifically for its audio generation tools. There is no confirmed figure in this snapshot for how many credits a single `mirelo_text_to_audio` or `seed_audio` generation consumes. Do not estimate a per-generation cost for Higgsfield audio without first checking the actual credit deduction on a live test generation, since the platform-wide credit allowances above cannot be converted into a reliable per-SFX-clip cost without that missing number.
- **Coverage caveat, restated from Part A:** even where pricing is known, `mirelo_text_to_audio` is explicitly schema-flagged as "game pipeline only," and `seed_audio` is a speech tool mislabeled as text-to-audio, not a soundscape/SFX tool. Neither should be treated as Higgsfield's answer to ElevenLabs Sound Effects or Stable Audio for general production ambience/foley work.

### C5. Refresh discipline

Re-fetch all four vendor sections above before using this snapshot for any client quote, project budget, or tool-selection decision more than a few weeks old. Confirmed changes to watch for: ElevenLabs plan/credit restructuring (their pricing FAQ indicates plan terms are actively reviewed), Stability AI's per-credit rate and model lineup (Stable Audio 3.0 is a newer generation than 2.5 and pricing parity between the two was not separately confirmed here), and any future publication by Higgsfield of a per-model audio credit table, which would materially change the accuracy of C4 above.

