# FILM CRAFT BIBLE 24: AI TEXT-TO-MUSIC GENERATION

## Prompt Engineering for Musical Scores, Themes, and Tracks

**Series:** Film Craft Bibles (Part 24 of series)
**Scope:** Prompt engineering craft for generating music, score cues, songs, and short-form music beds from text descriptions using AI music generation tools.
**Tagging key:** [SOURCED] = confirmed from an official product page, official documentation, or a live tool fetch on 2026-07-26. [PRINCIPLE] = craft judgment or industry-standard practice not tied to a single verifiable source. [UNVERIFIED] = a specific number or claim found only in secondary/aggregator sources that could not be confirmed directly against an official page as of this writing; treat as directional, not contractual.

---

## PREFACE: WHY THIS CRAFT IS DIFFERENT FROM EVERY OTHER BIBLE IN THIS SERIES

Every other Film Craft Bible in this series deals with a visual or a sound-effect medium where the AI is asked to depict something: a face, a room, an explosion, a footstep. Music generation is different in one fundamental way. Music is not asked to depict anything. It is asked to *feel like something while filling a specific amount of time*. There is no "wrong" chord in the way there is a wrong number of fingers on a hand. The two things that actually go wrong in AI music generation are (1) the mood, genre, or instrumentation drifting from what the scene needs, and (2) the duration, structure, or looping behavior not fitting the technical slot it has to occupy. This bible is built around those two failure points, because they are the ones that actually break a deliverable.

It is also worth saying plainly, up front, why this bible exists as a companion to (not a replacement for) the Sound Design and Music craft bible elsewhere in this series: that bible covers the craft of composing to picture and the human/creative side of scoring decisions. This bible is narrower and more mechanical. It is about what to type into a text box to get a machine to produce audio that serves those creative decisions.

---

## PART A: CRAFT REFERENCE

### A1. What AI music generation prompt engineering actually is

AI text-to-music generation prompt engineering is the practice of describing, in words, the musical and production qualities you want a model to render into audio: genre and subgenre, mood and emotional arc, named instrumentation, tempo, song or cue structure, and, where the tool supports it, lyrics and vocal performance style. The prompt is not a request for the model to "understand a scene" the way a human composer would after watching a rough cut. It is a specification sheet, and the more concretely it names real musical vocabulary (genre labels, instrument names, tempo descriptors, production-era references) the more the model's output distribution narrows toward a repeatable, controllable result. [PRINCIPLE]

This is meaningfully different from two adjacent disciplines that live elsewhere in this series:

**Versus SFX / sound-design prompting.** A sound-design prompt (see the dedicated Sound Design and Music bible) describes a physical or textural event: a door creak, a metal impact, a wind gust. It is judged by whether it sounds like the *thing* it claims to be. A music prompt is judged by whether it sounds like the *genre and mood* it claims to be, and by whether its emotional trajectory (build, release, tension, resolution) tracks the scene. There is no equivalent to "does this sound like a real door" in music generation; there is only "does this sound like a real string section playing something tense in this style." [PRINCIPLE]

**Versus directing a human composer.** A human composer works from a spotting session, a temp track, verbal notes about narrative intent ("this needs to feel like hope arriving too late"), and iterative feedback across days or weeks. An AI music prompt has to compress all of that into a single text block (plus, in some tools, a reference audio upload) that the model interprets in one pass. There is no back-and-forth spotting conversation, no music-theory negotiation, no live musician improvising around a director's hand gesture. The craft of AI music prompting is therefore the craft of *front-loading* everything a human composer would normally discover through conversation into the prompt itself, before generation, because there is no equivalent mid-process conversation once the render starts. [PRINCIPLE]

### A2. The anatomy of a strong music generation prompt

A complete, well-formed music prompt is built from up to seven components. Not every tool exposes every field (some, like Suno and Udio, split "style" and "lyrics" into separate boxes; others, like Stable Audio or Higgsfield's sonilo_music, take a single text field with far fewer controllable dimensions), but the underlying components are the same across the craft:

1. **Genre and subgenre tags.** Name the genre precisely and, where it helps, name the subgenre or scene ("lo-fi hip hop" is more useful than "hip hop"; "progressive house" is more useful than "electronic"). The first tag mentioned generally carries the most weight in how the model resolves the sound, so lead with the dominant genre. [PRINCIPLE], consistent with prompting-guide guidance surfaced in research on Suno's style-tag field [SOURCED to secondary guides, treat weighting claim as PRINCIPLE].

2. **Mood and emotion descriptors.** Words like melancholic, euphoric, tense, triumphant, wistful, ominous, playful. These do more work than genre alone in steering the emotional read of the output, and they matter even more for score cues than for songs, because a cue is judged almost entirely on whether its emotional temperature matches the scene. [PRINCIPLE]

3. **Instrumentation, named specifically.** "Music" is not a prompt component; "solo piano," "muted trumpet," "808 sub bass," "bowed double bass," "detuned analog synth pads," "taiko drums" are. Naming instruments is the single highest-leverage lever in the entire prompt, because it constrains the model's timbral palette directly rather than asking it to infer instrumentation from genre alone. [PRINCIPLE]

4. **Tempo.** Either a literal BPM figure ("92 BPM") or a descriptive band (slow / mid-tempo / uptempo / driving). BPM is the more precise lever where the tool honors it; descriptive tempo is the fallback for tools that do not expose reliable BPM control. Tempo is also the component most directly tied to whether a cue will feel right cut against picture, because tempo drift against an edit's cutting rhythm is one of the most common "doesn't sit right" complaints in temp-to-final music swaps. [PRINCIPLE]

5. **Song or cue structure.** For full-song tools with lyric support (Suno, Udio), structure is expressed as literal section tags: [Intro] [Verse] [Pre-Chorus] [Chorus] [Bridge] [Outro]. For instrumental score cues and short beds, structure is expressed descriptively instead: "starts sparse, builds through the middle, resolves to a soft final chord" or "constant tension with no release, ends on a sudden cut rather than a fade." [SOURCED for the Suno/Udio section-tag convention; PRINCIPLE for descriptive-structure cue prompting].

6. **Vocal style direction**, where the tool supports vocals at all. Gender of voice, tone (breathy, belted, spoken-word, whispered), and language. Vocal delivery cues can be inserted inline in lyrics fields on tools like Suno, e.g. "(whispered)" or "(belting)". [SOURCED]

7. **Negative prompting.** Naming what to avoid: "no vocals," "no distorted electric guitar," "avoid harsh cymbals," "no 4-on-the-floor kick." Most music tools support this as a dedicated "exclude" or "negative" field, or as plain-language instruction appended to the main prompt (phrasing varies by tool). This is the music equivalent of a negative prompt in image generation, and it is underused; it is often more effective at fixing a recurring unwanted element than trying to re-word the positive prompt to talk around it. [PRINCIPLE]

**On reference-track-style prompting.** It is both a craft convention and, on the major full-song tools, a policy requirement that you should describe a style or era rather than name a specific living artist. "In the style of early-2000s British trip-hop" or "a pop ballad built around acoustic guitar and heartfelt lyrics, in the vein of confessional singer-songwriter records" both do the descriptive work that naming an artist would do, without the compliance risk. Suno's help documentation and generation policy flag well-known artist and public-figure names among the content categories that can block a generation outright, and multiple independent guides confirm the same for Udio-adjacent workflows, though enforcement strictness varies by tool and has been reported inconsistently by users. [SOURCED for Suno's documented policy stance; UNVERIFIED for the exact universality of enforcement across every tool and every prompt phrasing]. The safer, more durable craft habit, and the one this bible recommends regardless of any single tool's current enforcement leniency, is to describe genre, era, and production qualities rather than name a living artist, both because policy enforcement changes without notice and because "style of X genre/era" is more portable across tools than an artist name that only some models will even recognize usefully.

### A3. Worked prompt templates (six goals, line-by-line)

Each template below is written as a realistic, tool-agnostic prompt block, formatted the way it would be typed into a style/description field, with a line-by-line breakdown of what each clause is doing.

---

**Template 1: Short instrumental underscore bed for a film scene (dialogue-driven, needs to sit under speech)**

> Prompt: *"Minimal ambient piano and soft string pad, warm and intimate, slow tempo around 68 BPM, no percussion, no vocals, low dynamic range so it sits quietly under dialogue, gentle rise in the final third, soft fade rather than a hard stop."*

Breakdown:
- "Minimal ambient piano and soft string pad" = named instrumentation, deliberately sparse so it doesn't compete with dialogue.
- "warm and intimate" = mood descriptor.
- "slow tempo around 68 BPM" = tempo, both descriptive and numeric for tools that honor BPM.
- "no percussion, no vocals" = negative prompting, critical for a dialogue bed (percussion transients and any vocal content both fight with speech intelligibility).
- "low dynamic range so it sits quietly under dialogue" = production/mix instruction, telling the model not to build to a loud peak.
- "gentle rise in the final third, soft fade rather than a hard stop" = descriptive structure, plus an instruction about the ending shape, which matters enormously for a bed that has to be edited against a scene's out-point.

---

**Template 2: Full song with lyrics and verse/chorus structure (for a needle-drop-style branded film or closing-credits song)**

> Prompt (style field): *"Indie folk-pop, warm acoustic guitar, brushed drums, upright bass, female vocal, breathy and warm tone, uplifting but bittersweet, mid-tempo around 100 BPM, clean modern production, radio-ready mix."*
> Prompt (lyrics field): *"[Intro] [Verse 1] soft acoustic guitar figure, sparse vocal entrance [Pre-Chorus] building layers [Chorus] full band, wide vocal harmony [Verse 2] [Chorus] [Bridge] stripped back to just voice and guitar [Chorus] final, biggest version [Outro] fade on guitar alone."*

Breakdown:
- Style field carries genre, instrumentation, vocal style, mood, tempo, and production quality, all in one block, following the "[Genre + Era], [Mood], [Instruments], [Vocal], [Production]" formula that full-song tools are built around. [SOURCED convention from Suno/Udio prompting guides]
- Lyrics field uses literal section tags ([Intro], [Verse 1], [Chorus], [Bridge], [Outro]) which both tools parse as structural instructions, not just labels. [SOURCED]
- Inline descriptive notes inside each bracketed section ("sparse vocal entrance," "full band, wide vocal harmony") steer the arrangement moment-to-moment within the structure, which is how you get a song that actually builds rather than staying flat for three minutes.

---

**Template 3: Tense, suspenseful score cue (thriller or horror beat)**

> Prompt: *"Dark orchestral tension cue, low sustained strings, dissonant cluster chords, sparse prepared-piano hits, distant metallic percussion, no clear melody, constant unresolved tension with no release, occasional sudden stinger hit, ends abruptly rather than fading, no vocals, no warm or major-key elements."*

Breakdown:
- "Dark orchestral tension cue" sets genre/category immediately.
- "low sustained strings, dissonant cluster chords, sparse prepared-piano hits, distant metallic percussion" is dense, specific instrumentation naming exactly the sound palette associated with suspense scoring, rather than leaving the model to guess.
- "no clear melody... constant unresolved tension with no release" is descriptive structure for a cue that should NOT resolve, which is the opposite instruction from most music prompts and needs to be stated explicitly, because most training data biases toward resolution.
- "occasional sudden stinger hit" flags a specific event type the model should include.
- "ends abruptly rather than fading" is an ending-shape instruction, critical because a suspense cue that fades softly undercuts the cut it's meant to support.
- "no vocals, no warm or major-key elements" is negative prompting that guards against the model defaulting to something more consonant than the brief calls for.

---

**Template 4: Upbeat commercial jingle (short-form ad, broadcast or social)**

> Prompt: *"Upbeat commercial jingle, bright pop-funk, punchy horns, slap bass, claps, energetic male-female vocal duet, catchy singable hook, fast tempo around 128 BPM, polished radio-ready mix, short and punchy, 15 to 30 seconds, big confident ending hit rather than a fade."*

Breakdown:
- "Upbeat commercial jingle" immediately signals category and register (short, memorable, hook-forward) rather than a long-form song.
- "bright pop-funk, punchy horns, slap bass, claps" is a specific, recognizable instrumentation palette associated with commercial jingles.
- "energetic male-female vocal duet, catchy singable hook" specifies vocal arrangement and calls out the need for a repeatable, memorable line, which is the entire commercial function of a jingle.
- "fast tempo around 128 BPM" locks energy level.
- "short and punchy, 15 to 30 seconds" is a duration instruction; naming the target runtime explicitly matters more here than almost anywhere else, because ad slots are fixed-length deliverables.
- "big confident ending hit rather than a fade" specifies the ending shape a commercial needs (a hard, brandable stop, not a trail-off).

---

**Template 5: Looping short-form game/UI music bed (seamless loop, no build, no ending)**

> Prompt: *"8-bit chiptune style, cheerful and light, simple repeating melodic phrase, steady tempo, no build or climax, consistent energy throughout, designed to loop seamlessly with no fade in or fade out, short duration, 8 seconds."*

Breakdown:
- "8-bit chiptune style, cheerful and light" sets genre and mood for a UI/menu context.
- "simple repeating melodic phrase, steady tempo" is the key structural instruction for loop-oriented music: no evolving arrangement, no dynamic arc, because a loop that changes over its length will create an audible "seam" or mismatch when it repeats.
- "no build or climax, consistent energy throughout" explicitly overrides the model's default tendency toward musical development, which is necessary because most music training data rewards a cue that goes somewhere.
- "designed to loop seamlessly with no fade in or fade out" is the single most important line in this template. Tools that expose an explicit loop or seamless-loop mode should have that mode engaged in addition to this text instruction; tools that do not expose a loop mode (this is the case for thin, short-form tools like Higgsfield's sonilo_music, whose only exposed parameter is duration) rely entirely on this kind of text instruction, with mixed reliability, because the underlying model has no guarantee that the waveform's start and end will match cleanly. This is a real limitation, not a phrasing problem alone; expect to manually verify (and sometimes manually crossfade in post) any "seamless loop" claim from a short-form tool rather than trusting the label. [PRINCIPLE, grounded in the tool's documented "duration only" control surface]
- "short duration, 8 seconds" gives the exact runtime, matching the tool's actual controllable parameter.

---

**Template 6: Emotional string-led theme (a recurring emotional motif, e.g. a character or brand theme)**

> Prompt: *"Emotional orchestral theme, solo cello leading into full string section, simple memorable melodic motif that could recur throughout a film, warm and hopeful with an undercurrent of sadness, slow to moderate tempo around 76 BPM, sparse piano support, no percussion, no vocals, builds gradually from solo instrument to full ensemble, ends on a resolved, warm final chord."*

Breakdown:
- "Emotional orchestral theme" sets category.
- "solo cello leading into full string section" specifies both the lead voice and the arrangement arc from solo to ensemble, which is the classic craft shape of a theme statement.
- "simple memorable melodic motif that could recur throughout a film" is a direct instruction toward writing something hook-like and repeatable, because a theme (unlike a one-off cue) needs to be recognizable if it returns later, edited into other scenes.
- "warm and hopeful with an undercurrent of sadness" is a compound, two-layered mood descriptor, useful because pure single-adjective moods tend to produce flatter, less nuanced output.
- "slow to moderate tempo around 76 BPM" and "sparse piano support, no percussion, no vocals" narrow the palette to keep the focus on the string melody.
- "builds gradually from solo instrument to full ensemble, ends on a resolved, warm final chord" is the full descriptive structure and ending shape, both essential for a theme cue that is likely to be used at an emotional high point in an edit.

### A4. The tool and engine landscape

| Tool | What it actually is | What it's genuinely best at | Where it falls short |
|---|---|---|---|
| **Suno** | Full-song generation platform with a two-field prompt system (style tags + lyrics with section markers), plus stem separation, vocal/instrumental add-ons, and audio upload/remix tools on paid tiers. [SOURCED] | Full songs with lyrics, verse/chorus structure, and convincing vocal performance across a huge range of genres. The strongest tool in this landscape for anything that needs to sound like an actual song with a singer. [PRINCIPLE] | Not built for scoring to a locked picture duration; no frame-accurate cue-to-picture workflow. Artist-name prompting is policy-restricted. [SOURCED for the artist-name restriction] |
| **Udio** | Full-song generation platform, closely comparable to Suno, with its own guidance-tag system and manual structure editing (adjusting chorus/bridge/verse sections after generation). [SOURCED] | Strong genre fidelity and production-quality output; well regarded for nuanced genre blending and manual post-generation structural edits. [PRINCIPLE, based on prompting-guide consensus] | Same category limitation as Suno: built for standalone songs, not picture-locked scoring; also subject to living-artist-name restrictions in practice. [UNVERIFIED on exact enforcement wording] |
| **Google Lyria (Lyria 2 / successor models) and MusicFX** | Lyria is Google DeepMind's instrumental music generation model family, offered both as a free consumer surface (MusicFX in Google Labs, producing short instrumental clips) and as a pay-as-you-go API via Vertex AI / third-party API resellers such as Segmind. [SOURCED] | High-fidelity 48kHz stereo instrumental generation with reasonably precise control over tempo, key, and mood; the API path is well suited to developers who want programmatic, pay-per-call music generation rather than a subscription UI. [SOURCED for the technical description] | MusicFX's free consumer surface produces short clips (historically in the tens of seconds), not full songs, and has no lyric/vocal support; it is instrumental-only across the whole family as far as could be confirmed. [SOURCED for instrumental-only positioning; UNVERIFIED on exact current clip-length ceiling, which has been reported to have moved over time] |
| **Stability AI's Stable Audio** | Instrumental and production-music-focused generation model, explicitly marketed on the claim that its training data is licensed, which is a meaningful differentiator versus tools facing copyright controversy. Available both as a consumer app with tiered subscriptions and as a pay-as-you-go developer API (credits priced at $0.01 each on Stability's platform, with per-endpoint credit costs published). [SOURCED for the licensing claim and the API credit-pricing mechanic; UNVERIFIED for exact current consumer-app tier prices, which could not be confirmed directly because the pricing page requires JavaScript rendering not available to this research pass] | Clean-licensing instrumental and production music, and self-hostable open variants (Stable Audio Open) for developers who want to run and fine-tune the model themselves. Strong choice when the commercial question "can I prove where the training data came from" matters to a client or platform. [SOURCED] | Not built for full songs with lyrics or vocal performance; the value proposition is instrumental production music and licensing clarity, not songwriting. [PRINCIPLE] |
| **AIVA** | AI composition assistant with a specific orchestral/classical/cinematic-scoring lean, offering over 250 style presets, MIDI export, and a tiered plan structure where copyright ownership itself is gated by plan level. [SOURCED] | Cinematic, orchestral, and classical-leaning score work, especially where MIDI export or fine-grained editing of the generated composition (not just the final audio) matters. The MIDI export option is a genuine differentiator versus the pure-audio-out tools in this table. [PRINCIPLE] | Free and mid tier outputs are copyright-owned by AIVA, not the user, meaning commercial ownership requires the top Pro tier specifically; lower tiers are workable for scratch/temp use but not for a deliverable requiring full ownership. [SOURCED] |
| **Soundraw** | Royalty-free background-music-as-a-service platform: generate a track by selecting genre/mood/length parameters (a more menu-driven, less free-text experience than Suno/Udio), then license it for content use under a paid plan. [SOURCED for the general model; UNVERIFIED for exact current tier prices, which vary across secondary sources and could not be confirmed against a live official price list during this research pass] | Fast, licensable background music for YouTube, podcasts, ads, and general content work, where "good enough, on-brief, and legally clean" matters more than singular creative distinctiveness. [PRINCIPLE] | Not a free-text prompt engineering tool in the same sense as Suno/Udio/Stable Audio; the "prompt" is closer to a structured menu of parameters, and there is no free trial that includes downloads, meaning you cannot fully evaluate output-to-license before paying. [SOURCED for the no-free-download-trial point] |
| **Mubert** | Royalty-free, generative background-music service with both a consumer render product and a real-time generative API aimed at apps, platforms, and streaming/interactive use cases (e.g., music that adapts live rather than being rendered once). [SOURCED for the general product shape; UNVERIFIED for exact current tier prices, reported only through secondary aggregators as of this research pass] | Scalable, licensable background music at the API level for products that need music generated programmatically and continuously (apps, live streams, games), not just a one-off track for a single video. [PRINCIPLE] | Consumer-tier tracks are explicitly not licensed for Content ID clearance, standalone streaming-platform release, or stock-music-site resale on any plan, per the platform's own pricing-page disclaimer, a genuinely important licensing ceiling to know about before relying on it for a client deliverable. [SOURCED] |
| **Higgsfield-hosted sonilo_music** | A thin, FAL-hosted text-to-music generation tool inside the Higgsfield `generate_audio` tool, explicitly marked "game pipeline only" in its own tool schema, with duration as its only exposed parameter (e.g., 8 seconds). [SOURCED, grounded in the connected tool's live schema] | Fast, low-friction short music loops for games and UI contexts where a full song, structured lyric arrangement, or fine mix control is not the requirement. It is genuinely useful for exactly that narrow job and should not be oversold as more than that. [PRINCIPLE] | No genre/mood/instrumentation/tempo/structure controls exposed beyond duration; no lyric or vocal support; no explicit seamless-loop guarantee; not a competitor to Suno/Udio for full songs, and not positioned as a scoring tool for picture-locked cues needing narrative structure. Honest framing: it is a utility, not a composer. [PRINCIPLE, grounded in the tool's documented single-parameter schema] |

### A5. Scoring to picture versus writing standalone music

Writing a standalone song or a generic royalty-free bed is a fundamentally looser task than scoring to picture. A standalone track can run however long feels musically right; a cue that has to hit a specific narrative beat (a reveal, a cut, a punchline, a death) or fit a specific locked duration (a 28-second product-shot montage, a 6-second logo sting) has an external constraint the music must obey regardless of what feels musically ideal in isolation. This is exactly the distinction the companion Sound Design and Music craft bible draws between composing to locked picture and writing to an open script, and it applies with even more force to AI-generated music than to AI-generated sound effects, for one simple reason: duration control is far less precise across most of these tools than it is for a five-second door-slam SFX prompt. [PRINCIPLE]

Practically, this means:

- **When a cue must hit an exact beat**, generate longer than needed and edit down in post, rather than trying to prompt for an exact narrative timing the model has no way to guarantee. Almost none of these tools accept "make the tension peak land at second 14" as an instruction with any reliability; they accept general descriptive-structure language ("builds gradually, peaks two-thirds of the way through") at best. [PRINCIPLE]
- **When a cue must fit an exact duration** (a fixed ad slot, a fixed loop length), prefer tools with explicit, reliable duration parameters (Higgsfield's sonilo_music is honest and narrow here: duration is its only lever, but it is a real lever) over tools where duration is only loosely steerable through descriptive language in a style prompt. [SOURCED for sonilo_music's parameter surface; PRINCIPLE for the general guidance]
- **Full-song tools like Suno and Udio are the wrong tool** for hard-locked-picture score cues in the first place; they are built to write songs with their own internal musical logic, not to hit externally imposed sync points. Use them for songs (opening titles, closing credits, a needle-drop moment) and use instrumental/production-focused tools (Stable Audio, Lyria/MusicFX, AIVA) or bespoke human composition for anything that must obey a locked edit's timing. [PRINCIPLE]

### A6. Licensing and rights: the question that matters more here than anywhere else in this series

Music licensing deserves more caution than SFX or image licensing for one structural reason: music is far more likely to be used in a context with its own separate legal exposure (public performance, broadcast, sync licensing for a commercial client, platform monetization) and far more likely to be challenged by rights holders (via Content ID-style systems) even when it is entirely AI-generated, because detection systems flag musical similarity, not proof of theft. [PRINCIPLE]

Three distinctions matter, and they differ meaningfully by tool:

1. **"Royalty-free" is not one single legal thing.** It generally means you do not owe a per-use royalty each time the track is played, but it does not automatically mean you have full ownership, or that every use case is covered. Mubert's own pricing page discloses, in plain text, that its tracks are not licensed for Content ID, standalone streaming release, or stock-music-site resale on any plan; that is a real ceiling on a "royalty-free" claim, not a technicality. [SOURCED]

2. **Owning the generated track outright is different from holding a subscription-license that expires if you cancel.** AIVA is the clearest illustration of this in the current landscape: on its Standard tier, AIVA itself retains copyright and you receive limited monetization rights (only on named platforms like YouTube/Twitch/TikTok/Instagram); only its Pro tier grants you outright copyright ownership of what you generate, including compositions made before you upgraded. [SOURCED] This is the single most commercially important fact in this whole licensing section: if a client deliverable needs a music track the agency can prove it owns outright, years after the subscription that generated it might have lapsed, the plan tier at the moment of generation is the thing that determines that, not the track itself.

3. **Training-data provenance is now a marketed differentiator, not a footnote.** Stability AI explicitly markets Stable Audio's training data as coming from licensed sources, positioning this as a lower-risk choice for commercial and enterprise use versus models trained on unclear-provenance data. [SOURCED] For any DLight-style commercial deliverable where a client might ask "where did this music come from" during a legal review, this is a genuinely relevant selling point to know how to explain, and a genuine point of differentiation to weigh against tools that do not make an equivalent claim.

**Working rule for any commercial deliverable:** before a generated track is locked into a client-facing deliverable, confirm (a) which plan tier generated it, (b) whether that tier includes outright ownership or only a use-license, (c) whether that use-license survives a future subscription cancellation, and (d) whether the platform makes any claim about training-data licensing that a client's legal team might ask about. Treat this as a checklist item, not an assumption, on every project. [PRINCIPLE]

### A7. Style-reference for continuity across multiple tracks

Just as the other Film Craft Bibles in this series address the "consistency" problem for a recurring visual character or a recurring voice, music generation has its own version of this problem: a project with multiple cues (an opening theme, three scene cues, a closing song) will sound disjointed if each cue is prompted from a blank page with no shared reference, because each generation is a fresh, independent inference from the model with no built-in memory of what a previous cue in the same project sounded like. [PRINCIPLE]

Three concrete tactics address this:

1. **Lock a written master brief and reuse its exact wording across every cue.** The same self-contained-prompt discipline used elsewhere in this series applies here: write one paragraph covering genre, instrumentation palette, tempo range, and the project's overall mood arc, and paste that same paragraph as the shared foundation of every individual cue prompt, varying only the cue-specific mood/structure/duration details on top of it. This is the single highest-leverage tactic for score consistency and is covered in full as a protocol in Part B. [PRINCIPLE]

2. **Use a tool's continuation, stem, or remix features where available**, rather than generating every cue from scratch. Suno and Udio both support extending, remixing, and stem-separating existing generations; using "extend this track" or "remix this track" for a second cue in the same project carries forward actual audio DNA from the first generation, which a from-scratch prompt with merely similar wording cannot replicate. [SOURCED for the feature existence on Suno/Udio] Where a tool does not expose this (Stable Audio's and Lyria's continuation/extension capabilities vary by access tier and were not fully confirmed in this research pass; sonilo_music exposes no such feature at all, consistent with its narrow, single-parameter design), the written master brief is the only available consistency mechanism, and it should be leaned on harder. [UNVERIFIED for Stable Audio/Lyria continuation feature availability at time of writing; SOURCED for sonilo_music's lack of one]

3. **Recognize the actual risk of skipping this.** A project scored entirely from independent, from-scratch prompts, even ones written by the same person with a consistent personal style, will tend to drift in instrumentation choice, production polish, and tempo feel across cues, because the model has no persistent state between calls. This is the music equivalent of a recurring character's face subtly changing across independently generated images; it is avoidable, but only by deliberate written-brief discipline, not by assumption that "the same prompter will naturally keep it consistent." [PRINCIPLE]

### A8. Vocabulary glossary

| Term | Definition |
|---|---|
| **BPM** | Beats per minute; the numeric tempo measurement. Central to cutting music against an edit's pacing. |
| **Stem** | An isolated component of a mix (e.g., just drums, just vocals, just strings) that can be exported, muted, or remixed separately from the full mixed track. |
| **One-shot loop** | A single audio clip designed to play once per trigger event (a UI click sound, a single musical sting), as opposed to repeating continuously. |
| **Seamless loop** | An audio clip engineered so its end connects to its beginning with no audible gap, click, or mismatch, allowing indefinite repetition, essential for game/UI/ambient beds. |
| **Sync licensing** | The specific license required to pair a piece of music with a moving image (film, ad, video) for a given use, distinct from a general performance or mechanical license. |
| **Royalty-free** | Music licensed for a flat fee (or included in a subscription) rather than a per-use or per-play royalty; does not automatically imply full ownership or unlimited use rights (see A6). |
| **Needle drop** | Industry term for licensing an existing pre-recorded song into a film/ad, as opposed to commissioning a new original score; "needle drop energy" is sometimes used descriptively to mean "should sound like a real released song," which is a useful phrase in prompts aimed at song-generation tools. |
| **Underscore** | Background instrumental music that supports a scene (often under dialogue) without drawing attention to itself; typically low in dynamic range and sparse in arrangement. |
| **Sting** | A very short musical hit (often under two seconds) used to punctuate a moment, a logo reveal, or a scene transition. |
| **Motif** | A short, recurring melodic or rhythmic idea, often tied to a character, brand, or theme, that reappears across multiple cues in a project to build recognition and emotional continuity. |

---

## PART B: AGENT OPERATING MANUAL

### B1. The exact questions to ask before generating a music cue

An agent (human or AI) should not open a music generation tool until every one of these questions has an answer. Skipping any of them is the single biggest source of wasted generations and mismatched deliverables in this craft.

1. **Instrumental or with vocals?** This alone eliminates most of the tool table. If vocals with lyrics are required, the realistic candidates are Suno and Udio. If instrumental only, every tool in the landscape is in play.
2. **What is the exact duration needed?** Not "about a minute", the literal number: 8 seconds, 15 seconds, 28 seconds, 2:30. Tools vary wildly in how precisely they honor this, so know the number before picking the tool, not after.
3. **Does it need to loop seamlessly?** If yes, this changes both the tool choice (favor tools with an explicit loop mode or a track record of clean loop points) and the prompt (explicit "no build, no fade, consistent energy" language, per Template 5 in Part A).
4. **What mood, genre, and tempo does the scene or brief actually call for?** Not a vague impression, actual words: 2-4 mood adjectives, a named genre/subgenre, a tempo band or BPM figure.
5. **Is this for a commercial deliverable requiring clear usage rights?** If yes, the plan-tier ownership question from A6 must be answered and documented before generation, not discovered after the track is already cut into the final deliverable.
6. **Does it need to relate sonically to other cues already generated in the same project?** If yes, pull up the project's master music brief (see B3) before writing a single word of the new prompt, and build the new prompt on top of it rather than from a blank page.

### B2. Reusable prompt-construction template with worked fills

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

### B3. The score-consistency protocol

For any project with more than one music cue (which is most real projects), do not generate cue-by-cue from scratch. Follow this protocol:

**Step 1: Write one master music brief before generating anything.** It should cover, in prose, the following four elements for the whole project:
- **Genre and instrumentation palette**: the family of sounds every cue in this project will draw from (e.g., "acoustic and lightly electronic, built around piano, warm strings, and soft analog synth texture; no heavy distortion, no aggressive electronic genres").
- **Tempo range**: the band the whole project should live within (e.g., "60-110 BPM across all cues, no cue faster than uptempo-moderate").
- **Mood arc**: how the emotional tone is allowed to move across the project (e.g., "opens hopeful, moves through tension in the middle act, resolves warm at the end").
- **Any hard exclusions for the whole project**: instruments, genres, or qualities that should never appear in any cue regardless of individual cue mood (e.g., "no vocals anywhere in the score," "never use a full drum kit, only hand percussion").

**Step 2: Generate every individual cue as a variation on that same written brief**, not as an independent prompt. Concretely, this means the master brief's genre/instrumentation/tempo-range/exclusions language should appear, close to verbatim, inside every individual cue prompt, with only the cue-specific mood, structure, and duration layered on top (exactly the way Part A's Template 6 layers "solo cello leading into full string section" and "slow to moderate tempo around 76 BPM" on top of what would be the shared project palette).

**Step 3: Keep a log of which brief-version produced which cue.** Music briefs get revised mid-project (a director asks for more energy, a client asks to cut the strings entirely). When that happens, do not silently start using a new brief for new cues while old cues still reflect the old one; log it. A simple table works:

| Cue | Brief version used | Tool | Generated date | Notes |
|---|---|---|---|---|
| Opening theme | v1 | Suno | (date) | Full song, sets the vocal identity for the project |
| Scene 4 tension cue | v1 | Stable Audio | (date) | Instrumental, drawn from v1 palette |
| Scene 9 tension cue | v2 (strings removed per director note) | Stable Audio | (date) | Brief revised; earlier cues NOT regenerated, flag for review |
| Closing song | v2 | Suno | (date) | Should be checked against v1 opening theme for continuity risk |

This traceability discipline is the same rule this series applies to visual reference sheets and voice-clone version logs elsewhere: never assume everyone remembers which version of the brief generated which asset, write it down.

### B4. Model/tool selection logic

| Goal | Best-fit tool(s) | Why |
|---|---|---|
| Full song with lyrics and vocal performance | Suno or Udio | Only tools in this landscape genuinely built for verse/chorus songwriting with convincing vocals. [SOURCED] |
| Instrumental score cue tied to picture | Stable Audio, Lyria/MusicFX, or AIVA (for orchestral-leaning cues) | Instrumental-first models with more usable duration/mood control than song-generation tools, none of which are built for locked-picture sync but all of which are closer than Suno/Udio. [PRINCIPLE] |
| Short seamless loop (game/UI/ambient bed) | Higgsfield sonilo_music for very short game/UI loops within its duration-only control surface; Mubert or Soundraw for longer branded background loops with clearer commercial licensing | sonilo_music is honestly narrow (duration only, "game pipeline only") but fit-for-purpose at this exact job; Mubert/Soundraw add real licensing structure for anything beyond an internal game loop. [SOURCED] |
| Classical / orchestral score | AIVA | The only tool in this table purpose-built around a large classical/cinematic preset library and MIDI-level editing. [SOURCED] |
| Commercially licensed production music at scale (agency library use) | Soundraw or Mubert (paid tiers), or Stable Audio where licensed-training-data provenance matters to the client | These are the tools explicitly built as licensed-production-music services rather than single-artifact songwriting tools. [PRINCIPLE, SOURCED for Stable Audio's licensing claim] |
| Fastest and cheapest first pass / scratch temp track | Google MusicFX (free) for a quick instrumental idea, or Suno/Udio free tiers for a quick song sketch | Free, no-commitment tiers exist on both; note both carry no-commercial-use restrictions, so treat outputs from free tiers as temp/scratch only, never as the delivered final asset. [SOURCED] |

### B5. Failure modes and tells

- **A prompt naming a specific living artist by name, where the tool's terms prohibit it.** The generation may be blocked outright, silently altered, or (worse) allowed through in a way that creates downstream legal exposure once the client asks "whose sound is this actually based on." Tell: any prompt containing a proper name of a musician, band, or living public figure. Fix: rewrite as a genre/era/production description (see A2's reference-track-style prompting guidance).
- **A looping cue with an audible seam.** Tell: a click, pop, or tonal jump at the loop point when the clip repeats back-to-back. This is common on tools without an explicit, engineered loop mode, including thin single-parameter tools. Fix: request an explicit loop mode where the tool offers one; otherwise, generate longer than needed and manually crossfade the loop point in an audio editor rather than trusting the raw output.
- **A cue generated with no reference to the project's established sonic palette.** Tell: a scene cue that, in isolation, sounds fine, but next to the rest of the score sounds like it belongs to a different project (mismatched instrumentation family, tempo far outside the project's range, a production polish level that doesn't match neighboring cues). Fix: this is exactly what the score-consistency protocol in B3 exists to prevent; if it happens, the fix is usually to regenerate the offending cue against the actual written master brief rather than trying to "fix it in the mix."
- **Unclear licensing terms discovered after a track is already locked into a deliverable.** Tell: someone on the production or legal side asks "can we actually use this commercially" only after the cue has been edited into a client-facing cut. Fix: this should never happen if B1's question 5 (commercial rights check) is answered before generation; if it does happen anyway, treat it as a process failure and add a licensing sign-off checkpoint before any cue is locked into a final edit, not just before final delivery.

### B6. Trigger list: what forces a music cue regeneration

- **A cut's duration changes.** If an edit is retimed (a scene trimmed, a montage re-cut to a different length), any cue whose structure or ending was built around the old duration should be treated as provisionally invalid until re-checked against the new cut length, not assumed to "probably still work."
- **A scene's tone changes.** A re-edit that shifts a scene from, say, ambiguous tension to clear resolution invalidates a cue whose mood and structure were built around the old tonal read; regenerate against an updated cue-specific brief, not just a faster tempo tweak on the old one.
- **A shift from temp track to final licensed music.** Any cue generated on a free tier, a scratch/temp basis, or a plan tier that does not grant full ownership must be explicitly regenerated (or its licensing status explicitly upgraded) before it is treated as a final, deliverable asset. Never let a temp-tier generation silently become the delivered final simply because nobody remembered to swap it.
- **A platform or delivery licensing requirement changes.** A track approved for one platform's licensing terms (e.g., a client's internal use) is not automatically cleared for a different distribution context (e.g., paid broadcast, a different client's platform, a stock library resale). Any change in where or how the final asset will be distributed should trigger a fresh check of the generating tool's licensing terms for that specific use case, per A6.

---

## PART C: DATED COST SNAPSHOT (as of 2026-07-26, refresh before relying on for budgeting)

**This entire section expires quickly.** AI pricing across every tool in this landscape changes on a rolling basis, often without notice, and several of the figures below could only be confirmed through secondary aggregator sites rather than a live official pricing page at the time of this research pass (JavaScript-rendered pricing pages on Soundraw and Stable Audio's consumer app blocked a direct fetch). Do not use this table for a client quote or an internal budget without re-verifying every figure against the tool's own live pricing page first.

### C1. Full-song generation tools

| Tool | Free tier | Paid tier(s) | Commercial rights | Verification status |
|---|---|---|---|---|
| **Suno** | 50 credits/day, no commercial use | Pro: $10/mo monthly or $8/mo annual, 2,500 credits/mo, commercial rights included. Premier: $30/mo monthly or $24/mo annual, 10,000 credits/mo, commercial rights included. Credit cost is linear at roughly 5 credits per song. | Commercial use rights included on both paid tiers for newly generated songs; free tier explicitly non-commercial. | [SOURCED] fetched directly from suno.com/pricing on 2026-07-26 |
| **Udio** | 100 credits/month (10 daily + monthly fallback), capped around 3 two-minute songs/day, no credit card required | Standard: reported around $10/mo, up to 2,400 credits/mo. Pro: reported around $30/mo, up to 6,000 credits/mo. | Paid tiers required for extended commercial use; free-tier credits do not roll over, purchased add-on credits reportedly do not expire. | [UNVERIFIED] official udio.com/pricing page did not return readable pricing content on direct fetch; figures above are drawn from multiple converging secondary sources and should be re-confirmed live before quoting to a client |

### C2. Instrumental / production-music and scoring-lean tools

| Tool | Free tier | Paid tier(s) | Commercial rights | Verification status |
|---|---|---|---|---|
| **Google Lyria / MusicFX** | MusicFX in Google Labs is free, no subscription, no credit card, produces short instrumental clips | Lyria API access via Vertex AI and third-party resellers (e.g., Segmind) is pay-as-you-go; Segmind lists a per-generation price of $0.09 on its own platform for Lyria 2 as of this research pass | Enterprise/API-tier generation is intended for commercial/product use; MusicFX's free consumer surface is best treated as exploratory/temp use pending confirmation of its exact commercial terms | [SOURCED] $0.09/generation figure fetched directly from segmind.com/models/lyria-2/pricing on 2026-07-26; this is a third-party reseller price, not Google's own direct consumer or Vertex AI list price, which was not independently confirmed |
| **Stability AI Stable Audio** | Not clearly confirmed as a no-cost consumer tier; the platform emphasizes licensed training data as a commercial-safety differentiator | Stability's developer platform prices API usage at $0.01 per credit, with per-endpoint credit costs published for specific generation calls; consumer-app subscription tier prices could not be confirmed live | Businesses under $1M annual revenue reportedly do not need to pay separately to use/distribute output of the Core Models under Stability's community license terms; enterprise/higher-revenue use requires a paid license | [SOURCED] for the $0.01/credit API mechanic and the sub-$1M-revenue community license provision, both drawn from stability.ai's own license page per search research; [UNVERIFIED] for exact current consumer Stable Audio app subscription tier prices, which a JavaScript-blocked fetch could not confirm directly |
| **AIVA** | Free, forever: non-commercial only, AIVA-branded, 3 downloads/month, up to 3-minute tracks | Standard (annual billing): EUR 11/month + VAT, limited monetization on YouTube/Twitch/TikTok/Instagram only, AIVA retains copyright, 15 downloads/month, up to 5-minute tracks. Pro (annual billing): EUR 33/month + VAT, full monetization, user owns copyright outright (including tracks made before upgrading), 300 downloads/month, up to 5:30 tracks, full WAV/stems export | Copyright ownership is plan-gated: free and Standard tiers leave copyright with AIVA; only Pro grants the user outright ownership | [SOURCED] fetched directly from aiva.ai/plans on 2026-07-26; note this page displayed annual-billing prices only, monthly (non-annual) list prices were not independently confirmed and are likely somewhat higher |

### C3. Royalty-free background-music-as-a-service tools

| Tool | Free tier | Paid tier(s) | Commercial rights | Verification status |
|---|---|---|---|---|
| **Soundraw** | No free download tier; can use the editor/preview but not download or use tracks legally without a paid plan | Reported tiers in the rough range of $11-24/month depending on source (e.g., Creator, Artist Starter, Artist Pro naming conventions), with figures varying meaningfully across secondary aggregators | Commercial license included with all paid plans per secondary sources | [UNVERIFIED] soundraw.io/pricing returned no readable content on direct fetch (JavaScript-rendered); reported price points varied across sources by several dollars per tier and must be re-confirmed live before any budgeting use |
| **Mubert** | Ambassador (free) tier reportedly allows a limited number of tracks/month for personal use only | Reported: Creator around $14/month, Pro around $39/month, Business around $199/month, plus a custom-quote API/Enterprise tier for platform-scale generative use | Explicitly, on the platform's own pricing page: no plan (subscription or perpetual license) covers Content ID clearance, standalone streaming-platform release, or stock-music-site resale | [SOURCED] the licensing exclusions were fetched directly from mubert.com/render/pricing on 2026-07-26; [UNVERIFIED] the specific dollar figures per tier, which the JavaScript-rendered page did not expose directly and which are drawn from secondary aggregators only |

### C4. Higgsfield-hosted sonilo_music (grounded in live MCP tool schema, 2026-07-26)

Higgsfield's `generate_audio` tool exposes `sonilo_music` ("Sonilo Music", FAL-hosted) as a text-to-music option explicitly marked "game pipeline only" in its own tool schema. Its only exposed parameter is duration (e.g., 8 seconds). Higgsfield does not expose a per-track or per-second credit rate specifically for music generation; this is a real, current limitation of the platform's cost transparency for this feature, not an oversight in this document, and should be flagged plainly to anyone budgeting for it.

What is confirmed about Higgsfield's general plan economics, independent of any music-specific rate:

| Plan | Price | Credits |
|---|---|---|
| PLUS | $49/month (or $39/month billed annually) | 1,000 credits |
| ULTRA | $129/month (or $99/month billed annually) | 3,000 credits |

One-time top-up credit packs:

| Top-up | Price |
|---|---|
| 500 credits | $26 |
| 1,000 credits | $49 |
| 2,000 credits | $95 |
| 4,000 credits | $190 |

All of the above plan and top-up figures are [SOURCED] directly from a live Higgsfield MCP fetch on 2026-07-26. What is explicitly NOT known and should not be estimated or guessed at: how many credits a single sonilo_music generation actually costs, whether that cost scales with the requested duration, and whether it differs from the credit cost of Higgsfield's other `generate_audio` options. Anyone budgeting a project that depends on sonilo_music volume should generate a small test batch first and back-calculate the actual credit burn from the account's credit balance before committing to a production schedule, rather than estimating from the general plan credit pool alone.

### C5. Refresh checklist

Before using any figure in this Part C for a real budget, client quote, or vendor comparison:

1. Re-fetch suno.com/pricing, udio.com/pricing, aiva.ai/plans, mubert.com/render/pricing, and soundraw.io/pricing directly (a browser-rendering fetch, not a static HTML fetch, will be required for Udio, Mubert's numeric tiers, Stable Audio's consumer tiers, and Soundraw).
2. Re-check Stability AI's platform.stability.ai/pricing for current per-credit API rates, and stability.ai/license for any change to the sub-$1M-revenue community license terms.
3. Re-check the live Higgsfield plan/credit figures via the connected MCP `show_plans_and_credits` tool rather than reusing the numbers in C4, since Higgsfield pricing (like the rest of this market) moves without notice.
4. Flag to Mohamed explicitly if any figure has moved by more than roughly 10-15% since 2026-07-26, since that is the threshold at which a prior cost comparison in a proposal or internal budget should be treated as stale rather than approximately still true.



