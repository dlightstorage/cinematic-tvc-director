# FILM CRAFT BIBLE 22: AI VOICE GENERATION, ARABIC AND ENGLISH TEXT TO SPEECH AND VOICE CLONING

**Role:** AI Voice Generation Prompt Engineer / Synthetic VO Director
**Scope:** Prompt and direction engineering for generating spoken voice over from text, in Arabic and English, across preset synthetic voices, voice design, and voice cloning. Commercials, brand films, explainers, social cutdowns, dubbing, and any AI-native production pipeline.
**Status:** Reusable craft reference. Contains no client-specific or project-specific material.
**Series position:** Part 22 of the Film Craft Bibles series. Sits alongside Bible 08 (VO Casting and Voice Direction), which this document assumes as background for casting judgment, consent, and rights. This bible is specifically about the mechanics of getting a text-to-speech or voice-cloning engine to produce the read you actually want, in both Arabic and English.

**Sourcing convention used throughout this document:**
- **[SOURCED]** = attributable to a named provider's published documentation or pricing page, a published interview, a research paper, or published trade reporting, with the source identified.
- **[PRINCIPLE]** = general craft consensus, teachable and defensible, but not tied to one named source or one specific published number.
- **[UNVERIFIED]** = a figure or claim that could not be confirmed against a primary source at the time of writing. Flagged rather than guessed.

**Dating notice.** Every dollar figure, credit figure, and tier feature in this document was checked against live sources on 2026-07-26. AI voice pricing and feature tiers change on the order of weeks, not years. Part C of this document is explicitly dated and explicitly flagged for periodic refresh. Do not quote any number in this document to a client without re-checking it first if more than a few weeks have passed.

---

# PART A: CRAFT REFERENCE

## A1. What AI Voice Generation Prompt Engineering Actually Is

Text to speech turns written words into audio. Prompt and direction engineering for text to speech is the discipline of controlling everything the raw words do not control on their own, so that the output sounds like a directed performance instead of a machine reading a page.

This matters because a TTS engine is not a stenographer running in reverse. Given the same sentence, it must still decide, on every single generation, four things a human actor would decide by instinct: how to pronounce ambiguous words, where to place emphasis, how fast to speak, and where to breathe. A human VO performer answers those questions using lived context: the meaning of the sentence, the brand's history, the director's note from a minute ago. A TTS engine answers them from statistical patterns learned in training, unless it is given explicit signals to override its defaults. Prompt and direction engineering is the practice of supplying those explicit signals. **[PRINCIPLE]**

Four separate control problems sit inside this discipline, and they are worth naming separately because each one fails in a different way and is fixed with a different tool.

**Text normalization.** Written text is full of things that are not meant to be read literally: numbers, dates, currency symbols, abbreviations, acronyms. "3/7" could be a date or a fraction. "Dr." could be "doctor" or "drive." "EGP 45K" could be read as "E G P forty five K" or "forty five thousand Egyptian pounds," and only one of those is correct in a voice over. Text normalization is the process, automatic or manual, of resolving the written form into the form that should actually be spoken, before the engine ever touches pronunciation. **[PRINCIPLE]**

**Phonetic and pronunciation control.** Even after normalization, some words remain genuinely ambiguous or are proper nouns the model has never seen. A brand name, a client name, a product SKU, a place name transliterated from another language: all of these are guesses unless something tells the engine exactly how to say them. This is where phoneme tags and, where supported, SSML (Speech Synthesis Markup Language) become load-bearing rather than optional. **[PRINCIPLE]**

**Emotional and pacing direction.** This is the layer most people mean when they say "prompting" a voice engine. Some engines expose this as natural-language instruction (an explicit instruction or style field, sometimes called direction or style prompt), some expose it as inline emotion tags inside the script text itself, and some expose almost none of it, leaving pacing and emotion to be engineered entirely through punctuation and phrasing in the text. Which mechanism exists for a given engine is not a small detail. It determines whether a director's note can be given directly to the model or has to be smuggled into the script as punctuation. **[PRINCIPLE]**

**Pause insertion.** Silence is part of a read. Where a model has no explicit pause control, punctuation is the only lever, and different punctuation marks produce different pause lengths and different pitch behavior at the pause. Where a model supports explicit break tags or bracketed pause markers, pause length becomes a directable, repeatable parameter instead of a hopeful side effect of a comma. **[PRINCIPLE]**

### How this differs for a preset voice versus a cloned voice

A **preset voice** is a voice the provider trained and ships as a selectable option. Direction engineering for a preset voice works entirely through the levers above: text, punctuation, tags, and any style or instruction parameter the engine exposes. The performer, in effect, already exists and has fixed habits. Direction is about steering an existing performer's default tendencies toward what the script needs.

A **cloned voice** is trained, in the loosest sense, on reference audio from a specific real recording, either through a short instant-clone sample or a longer professional clone. Direction engineering for a cloned voice has an added upstream lever that a preset voice does not: the reference audio itself. The performance qualities present in the reference recording (its pacing, its emotional range, its accent, its dialect) become a soft ceiling on what the clone can produce convincingly. A cloned voice trained on a single flat, neutral reading will struggle to produce a genuinely angry or genuinely delighted take later, no matter how the text is punctuated or tagged, because the model has only ever heard that voice do one thing. **[PRINCIPLE]** This is the single most important practical difference between the two paths, and it is explored further in A9.

## A2. The Anatomy Of A Strong VO Generation Request

A strong request to any voice generation engine, in any language, is built from five layers. Under-specifying any one of them produces a generation that sounds "close but wrong," which is the most expensive failure mode in this discipline because it is the hardest one to diagnose from the output alone.

### Layer 1: the text itself, as pacing control

Punctuation is not decoration in a script destined for TTS. It is the primary prosody instruction set available in every engine, including the ones with no other direction controls at all. TTS models are trained on enormous volumes of naturally punctuated text read aloud, so they have learned strong statistical associations between punctuation marks and specific prosodic behavior: a comma produces a short rise-then-pause, a period produces a falling pitch and a fuller stop, an ellipsis produces a trailing, unresolved pause, an em dash (where a script uses one) produces an abrupt interruption in pitch, a question mark produces a rising terminal pitch, and an exclamation mark pushes energy and emphasis upward. **[PRINCIPLE]**

The practical consequence: two scripts with identical words but different punctuation will generate audibly different reads. Consider:

> Version A: "We built this for you. Not for the market. For you."
> Version B: "We built this for you, not for the market, not for you."

Version A, with hard periods, will generate as three separate declarative beats with real space between them, landing as deliberate and weighty. Version B, with commas, will generate as one continuous breath with only soft internal lifts, landing as a fast, almost apologetic list. Nothing about the words changed. Everything about the punctuation did, and the read changed with it. **[PRINCIPLE]**

This is why the single most common and most avoidable failure in AI VO generation is stripping or "cleaning up" punctuation before sending text to the engine, on the theory that punctuation is a writing convention rather than a functional instruction. In a TTS pipeline, punctuation is instruction. Removing it removes pacing control, not clutter.

### Layer 2: explicit emotion and style direction

Where the engine exposes it (natural-language instruction fields, inline emotion tags, or a style/stability parameter), this layer lets the operator say directly what would otherwise have to be reverse-engineered from punctuation choices: warmth, urgency, sarcasm, intimacy, confidence. Some engines accept this as a separate parameter alongside the script text. Others require the emotional cue to be embedded as bracketed tags inside the text stream itself, for example a tag indicating a laugh, a whisper, or a hesitant pause placed directly at the point in the sentence where it should occur. The mechanism differs by engine, but the underlying need is constant: somewhere, the emotional target has to be stated, not assumed. **[PRINCIPLE]**

### Layer 3: pronunciation control for ambiguous words and names

Brand names, personal names, foreign loanwords, acronyms, and numbers are the recurring failure points. Where SSML is supported, the phoneme tag lets an operator specify the exact phonetic pronunciation of a single word using a defined phonetic alphabet, overriding whatever the model would have guessed. Where full SSML is not supported, the practical workaround is respelling: writing the difficult word phonetically inside the script itself, purely for the engine's benefit, then keeping the correctly spelled version for any on-screen or printed use of the same word. **[PRINCIPLE]**

### Layer 4: pacing and speed control

Some engines expose an explicit speed or rate parameter, adjustable independently of the text. Where this exists, it is the cleanest lever, because it changes delivery speed without forcing a rewrite. Where it does not exist, pacing has to be engineered through sentence length and punctuation density: short sentences with hard stops read slower and more deliberate by default; long, comma-linked sentences read faster and more breathless by default. **[PRINCIPLE]**

### Layer 5: deliberate pause insertion

Where an engine supports an explicit break or pause tag, silence duration becomes a specified, repeatable value rather than an emergent property of punctuation choice. Where it does not, the fallback is again punctuation, plus in some cases the trick of inserting a period and a capital letter to force a harder stop than a comma would produce, even where the grammatical sentence has not actually ended. This is a known workaround, not a grammatical recommendation, and it should be used and then discarded once the audio is generated; it should never survive into a printed or on-screen version of the same copy. **[PRINCIPLE]**

## A3. English VO Craft: Named, Proven Prompt And Direction Patterns

The read registers named in Bible 08 (announcer, conversational, documentary, wry, interior) are casting and direction concepts written for human performers. The question this section answers is different: given a text-to-speech engine and no human performer at all, what specific, repeatable combination of text construction, punctuation, and (where available) style instruction reliably produces each of those registers.

### The natural conversational read

**Goal:** sounds like one person talking to another person, not a script being read.

**Construction pattern:**
- Short sentences, mixed with occasional longer ones, mirroring how people actually speak rather than how they write.
- Contractions kept in ("we're," "don't," "you'll"), never expanded, because expanded forms read as formal by default across most engines.
- Commas used sparingly and only where a genuine breath would fall; over-punctuating a conversational script produces a chopped, list-like read instead of a flowing one.
- Where a style or instruction field exists, an instruction naming a specific listener and register works better than an adjective: "explain this to a friend who just asked you a direct question, matter-of-fact, no performance" outperforms "sound conversational," because it gives the engine a situation to model rather than a quality to imitate. **[PRINCIPLE]**

**Worked example, English, natural conversational:**

> Input text: "Look, we've tried the easy version of this before. It didn't work. So this time we did it properly."
> Style instruction (where supported): "A person telling a friend something slightly frustrating that turned out fine. Not performing it. Just telling it."

### The announcer read

**Goal:** polished, projected, hard-sell, in the LaFontaine tradition described in Bible 08.

**Construction pattern:**
- Full sentences, fuller stops, and short punchy fragments used deliberately for impact ("New. Bigger. Now available.").
- Where a rate control exists, a slightly slower-than-default rate reads as more authoritative; rushing an announcer read collapses the weight the register depends on.
- Where a style field exists, an instruction naming energy and audience scale helps: "a big room, a big claim, full projection, no hedging." **[PRINCIPLE]**
- This register should be used deliberately and sparingly, per Bible 08's finding that it is now a niche rather than a norm in contemporary advertising.

### The documentary-realist read

**Goal:** authority through restraint, an audible connection to the material, closer to Attenborough's intimacy than to a "voice of God."

**Construction pattern:**
- Longer, more measured sentences with genuine internal commas that mark real thought-breaks, not just breath.
- Avoid stacking short punchy fragments; the documentary register is undone by the same techniques that build the announcer register.
- Where a style field exists, an instruction naming curiosity and proximity outperforms an instruction naming authority: "someone standing next to the thing, quietly fascinated by it, not narrating from above it." **[PRINCIPLE]**
- If the engine supports emphasis or stress tags, place the emphasis on the noun or verb that carries new information in each sentence, not on the adjective; documentary narration earns its authority from information density delivered plainly, not from decorated delivery.

**The recurring lesson across all three registers.** In every case, the instruction that actually changes the output is a situation ("who is speaking, to whom, under what circumstance"), not an adjective ("warm," "confident," "premium"). This mirrors the adjustment-ladder principle from Bible 08 exactly: adjectives describe a verdict on output, situations supply an input the model can actually act on. The same craft discipline that makes a human VO director effective makes an AI voice generation prompt effective. **[PRINCIPLE]**

## A4. Arabic VO Craft, In Depth

This is the most consequential section of this document, because Arabic voice generation fails in ways that English voice generation simply does not, for structural reasons rooted in how the Arabic writing system works. Anyone who treats an Arabic VO generation request as "the same thing as English, just in another language" will get audibly wrong output and will frequently not understand why.

### The diacritics (tashkeel) problem, stated precisely

Standard written Arabic, in essentially all everyday text (news copy, marketing copy, scripts, social captions, client documents), omits the short vowel marks known as diacritics or tashkeel. A fluent human reader does not need them, because context, grammar, and vocabulary knowledge resolve the ambiguity automatically and instantly. A word rendered without diacritics can carry several entirely different meanings and pronunciations depending on which vowels are mentally supplied, and native readers do this so automatically they rarely notice they are doing it at all. **[SOURCED]**

A concrete, well documented example from the Arabic NLP and TTS research literature: a single consonant skeleton, depending on which diacritics are silently applied, can mean "he studied," "he taught someone," "a lesson" (a noun), "was taught" (passive), or an item of clothing. All five readings share the same written letters. Only the vowels, which are not written, distinguish them. **[SOURCED]**

A text-to-speech engine has no equivalent of lived fluency. It has statistical pattern-matching learned from training data, and when it encounters an undiacritized word with several plausible pronunciations, it has to guess, using whatever surrounding context its training allows it to weigh. Research on this exact problem confirms the mechanism directly: the advancement of Arabic text-to-speech has been persistently limited by two compounding challenges, the scarcity of large diacritized training data at scale, and the inherent ambiguity of undiacritized text feeding the model at inference time. **[SOURCED]**

**What adding diacritics to the input script actually fixes.** Supplying the short vowel marks in the input text removes the ambiguity before the model ever has to resolve it. Research in this space is explicit that models trained with, or fed, explicit diacritization consistently outperform their non-diacritized counterparts on pronunciation accuracy, though the gap narrows as a model's own training data volume grows large enough to make the vowel guess statistically reliable on its own. **[SOURCED]** The practical craft implication: for any Arabic VO generation where a specific pronunciation matters (a brand name, a technical term, a word that would otherwise be genuinely ambiguous in context, or any word the operator has already heard the engine mispronounce once), manually diacritizing that specific word, or the whole line around it, is the single most reliable lever available, more reliable than re-phrasing and more reliable than hoping a second generation attempt lands differently. Automatic diacritization tools exist and are commonly used as a pre-processing step inside deployed Arabic TTS systems precisely because manual diacritization of every script is not realistic at production volume. **[SOURCED]**

### The MSA versus dialect problem, and why it happens

Modern Standard Arabic (MSA, sometimes called Fus-ha) is the register of formal writing, news broadcasting, and most published text. It is nobody's native spoken register; it is learned formally and used for formal registers. The everyday spoken language of the Arab world is a set of regional dialects (commonly grouped as Egyptian, Gulf, Levantine, and Maghrebi, among others), which differ from MSA and from each other in vocabulary, grammar, and, critically for TTS, pronunciation. This split between a formal written/read register and a different everyday spoken register is a recognized linguistic phenomenon called diglossia, and Arabic diglossia is repeatedly identified in the TTS research literature as one of the core reasons Arabic is considered one of the more difficult languages for speech synthesis to get right. **[SOURCED]**

Because the large bulk of publicly available Arabic text and read-aloud audio used to train TTS models is MSA (news broadcasting, formal documents, religious and literary recitation), a model trained primarily on that data learns MSA's phoneme inventory, MSA's cadence, and MSA's intonation patterns as its default. **[SOURCED]** When that same model is then fed a script written in colloquial Egyptian, Gulf, or Levantine Arabic, using dialect vocabulary and dialect grammar, it frequently still applies an MSA-flavored pronunciation and MSA-flavored cadence underneath the dialect words, because the model's learned "sound" of Arabic speech was built almost entirely from formal-register audio. The result is a read that uses the right dialect words but sounds like a newsreader attempting a colloquial script rather than a native speaker of that dialect talking naturally. This is the single most common and most diagnostic failure in Arabic AI voiceover work, and it is frequently invisible to a non-native reviewer while being immediately obvious and slightly embarrassing to a native listener. **[PRINCIPLE]**

Documented linguistic markers that distinguish, for example, Egyptian Arabic from MSA at the phoneme level illustrate why this is not a subtle problem for a native ear: Egyptian Arabic characteristically replaces the MSA "q" sound with a glottal stop, and pronounces the letter that many other dialects and MSA render closer to an English "j" sound as a hard "g" instead. **[SOURCED]** A model defaulting to MSA phoneme habits will tend to preserve the formal consonant realizations even while reading dialect vocabulary, producing a read that a Cairene ear will immediately clock as "reading Ammiya in a newsreader's mouth."

**Mitigations, in order of reliability:**

1. **Choose a provider or voice with a documented, named dialect-specific voice or model**, rather than a generic "Arabic" preset. As of this writing, dialect-specific commercial voices exist for Gulf Arabic (documented on more than one major platform) and for Egyptian Arabic (documented on at least one major platform, plus specialist smaller providers and open fine-tunes built specifically to address this gap). A voice explicitly trained or fine-tuned on dialect audio carries the dialect's actual phoneme habits, not just its vocabulary. **[SOURCED]**
2. **Use reference-audio voice cloning from a native dialect speaker** rather than a generic preset, where the budget and consent situation allows it. Because a clone's performance ceiling is shaped by its reference audio (see A1 and A9), a clone built from a native Egyptian or Gulf speaker reading naturally in dialect will carry that speaker's actual phoneme and cadence habits into every subsequent generation, sidestepping the MSA-default problem at the source rather than fighting it after the fact. **[PRINCIPLE]**
3. **Provide phonetic transliteration or targeted diacritization hints** for the specific words most likely to trigger an MSA-default pronunciation, particularly words whose dialect pronunciation diverges sharply from the MSA spelling-implied pronunciation. This is a partial mitigation, useful for individual problem words, not a fix for the whole-cadence problem described above.
4. **Test before committing.** Because this failure is often invisible to a non-native reviewer, any Arabic dialect generation intended for broadcast or client delivery should be reviewed specifically by a native speaker of the target dialect, asked the specific question "does this sound like someone from here, or does it sound like a newsreader," rather than the general question "does this sound good."

### The practical implication for bilingual scripts

Because MSA and dialect Arabic differ in cadence and phoneme habits, and because English and Arabic differ even more fundamentally (different phoneme inventories, different stress patterns, different rhythm structures entirely), a single "multilingual" voice model asked to read both an English script and an Arabic script in the same voice will almost always produce a compromised result in at least one of the two languages, and frequently in both. **[PRINCIPLE]**

The mechanism is the same one described throughout this section: a voice model's cadence, phoneme handling, and prosody habits are shaped by whatever language and register dominated its training or reference audio. A multilingual model asked to switch languages mid-project is not switching between two equally native performances; it is applying one dominant set of learned habits across two different phonetic systems, and the language that was less represented in training (very often Arabic, and specifically dialect Arabic, relative to English) tends to come out sounding like a competent second-language speaker rather than a native one, complete with foreign-accented consonants, slightly wrong stress placement, and cadence that does not match how the dialect is actually spoken.

**The artifacts that appear when a single model is forced to do both:**
- English-influenced vowel quality inside Arabic words, particularly on loanwords and brand names.
- MSA-cadence bleeding into what is meant to be dialect delivery, compounding the problem described above.
- Inconsistent stress placement in Arabic multisyllabic words, because English stress patterns and Arabic stress patterns do not map onto each other directly.
- A read that a native Arabic listener describes as "understandable but foreign," which is a fatal quality for advertising work whose entire premise usually depends on sounding like it belongs to the audience.

This is why Arabic and English almost always need two separate voice or engine choices, generated as two separate passes, rather than one multilingual voice asked to carry both. This is stated as a firm operating rule in Part B, and it deliberately mirrors the same discipline the Creative Brief and Concept bible (Bible 18) applies to copywriting: each language gets its own native pass, not a shared pass translated across. The reasoning is structurally identical in both disciplines: a shared attempt optimizes for a similarity between languages that the audience in neither market actually experiences or rewards, at the cost of quality in both. **[PRINCIPLE]**

## A5. The Tool And Engine Landscape

The table below summarizes the major providers relevant to Arabic and English VO generation as understood from provider documentation and published trade reporting current to 2026-07-26. Feature and pricing detail for ElevenLabs specifically is treated with the most rigor in Part C, because it is the provider with the deepest published pricing detail available and the provider this document's cost snapshot centers on.

| Provider | English capability | Arabic capability | Notable for this craft |
|---|---|---|---|
| **ElevenLabs** | Extensive, industry-reference quality for English commercial VO. **[SOURCED]** | Supported under the Multilingual v2 model and the newer Eleven v3 (alpha as of its release) model, which the provider states brought a material quality jump specifically for Arabic and other non-English languages, described as catching Arabic voiceover quality up closer to the English-language experience. Provider marketing material references configurable Egyptian and other regional accent options, though this material is promotional in tone and light on independently verifiable technical specificity about exactly how dialect-authentic the underlying phoneme handling is. **[SOURCED]** | Deepest published pricing tier structure of any provider in this landscape (see Part C). Supports both instant and professional voice cloning depending on plan tier. |
| **Microsoft Azure AI Speech (Neural TTS)** | Extensive, enterprise-grade, broad language and voice count. **[SOURCED]** | Documented dialect-specific voices for multiple Arabic markets, including a named Egyptian Arabic voice (documented under the label Shakir for Arabic, Egypt) alongside voices for Gulf and other regional variants; overall the service has documented support across a very large number of language/locale variants and voices. **[SOURCED]** | One of the few providers with a clearly named, documented, dialect-specific Egyptian voice rather than a single generic "Arabic" option, which directly addresses the MSA-default problem described in A4. |
| **Google Cloud Text-to-Speech** | Extensive, WaveNet and Neural2 model families across a very wide language set. **[SOURCED]** | Documented Arabic support at the WaveNet tier; the generic Arabic locale code used by Google's documentation groups multiple Arabic-speaking territories under one broader variant rather than exposing separately named dialect voices in the way Azure and Amazon do. Exact current dialect granularity should be checked directly against Google's own "supported voices and languages" documentation before committing budget, as the specific current voice list was not independently confirmed in this research pass. **[UNVERIFIED, check directly]** | Straightforward for MSA-register or formal Arabic reads; less clearly differentiated than Azure or Amazon for dialect-specific work based on available documentation. |
| **Amazon Polly** | Extensive, broad neural voice catalogue. **[SOURCED]** | One of the more explicitly dialect-aware providers: ships a standard Arabic voice trained on MSA pronunciation (documented under the name Zeina), plus dedicated Gulf Arabic neural voices for both a female voice (documented under the name Hala) and a male voice (documented under the name Zayd), with the Gulf voices also able to be invoked in an MSA mode via the general Arabic language tag. **[SOURCED]** Specific dedicated Egyptian-dialect neural voice availability at Amazon Polly was not independently confirmed in this research pass. **[UNVERIFIED, check directly]** | Currently the clearest documented Gulf-dialect offering among the major cloud providers, with named male and female Gulf voices distinct from its MSA voice. |
| **Murf.ai** | Broad voice catalogue, strong for corporate/e-learning register. **[SOURCED]** | Provider documentation states Arabic support including Modern Standard Arabic and multiple regional accent options, as part of a broader multi-language, multi-accent voice library. **[SOURCED]** Exact number and naming of distinct Arabic dialect voices was not independently itemized in this research pass. **[UNVERIFIED, check directly]** | Positioned toward corporate, training, and e-learning voiceover rather than cinematic or advertising-grade emotional range; worth checking directly for the current Arabic voice roster before committing. |
| **PlayHT** | Broad voice catalogue, positioned toward conversational and real-time use cases. **[SOURCED]** | Provider markets Arabic voices explicitly, describing accurate pronunciation and natural conversational flow as a stated strength, as part of a very large stated total language and accent count. **[SOURCED]** | Marketed for real-time and conversational voice AI applications more than for cinematic narration; useful to test directly against a specific dialect sample before committing to a project.|
| **Cartesia** | Strong for low-latency, real-time conversational voice AI. **[SOURCED]** | Added Arabic support as part of its Sonic 3 model generation, with the newer Sonic 3.5 release (mid-2026) stated to cover a broad multi-language set including Arabic, and the provider separately documents Emirati Arabic as a distinct regional variant, suggesting at least Gulf-level dialect differentiation is a stated product feature. **[SOURCED]** | Notable for very low generation latency, which matters for real-time or conversational applications more than for pre-recorded narration; dialect depth beyond the Emirati variant was not independently itemized in this research pass. **[UNVERIFIED, check directly]** |
| **Resemble AI** | Broad voice catalogue and cloning-focused positioning, large stated language count for cloning. **[SOURCED]** | Stated to support a very large number of languages for voice cloning specifically; independent trade comparison describes its general voice quality as sounding comparatively more synthetic than some competitors, though this is a comparative, not absolute, assessment and worth testing directly. **[SOURCED, comparative claim, treat cautiously]** | Cloning-forward positioning; test directly against the specific dialect and register needed before assuming parity with ElevenLabs or Azure. |
| **WellSaid Labs** | Strong, narration-focused English voice catalogue, historically positioned toward corporate narration and e-learning. **[SOURCED]** | Documented as English-only, with no Arabic language support identified in this research pass. **[SOURCED]** | Not a candidate for any Arabic deliverable; relevant only as an English-only option in a bilingual production's decision table. |

### The Higgsfield-hosted router: a distinct case worth understanding on its own terms

Higgsfield, an AI content generation platform connected to this environment via MCP, exposes voice generation not as its own independently trained model but as a router. Its `text2speech_v2` tool ("Text to Speech V2") requires a `variant` parameter that selects one of five underlying third-party engines: `elevenlabs`, `minimax`, `seed_speech`, `vibe_voice`, or `cozy_voice`, alongside a `voice_type` parameter distinguishing a preset voice from an element/cloned voice and a `voice_id` parameter selecting the specific voice. **[SOURCED, from live MCP tool inspection, 2026-07-26]**

**This distinction matters and should be stated explicitly to any client or stakeholder relying on Higgsfield for VO.** Higgsfield is not an independent voice model competing with ElevenLabs; for the `elevenlabs` variant specifically, it is a wrapper reselling ElevenLabs' own engine through Higgsfield's own credit-based billing, on top of whatever ElevenLabs itself charges. This means Higgsfield's ElevenLabs-variant pricing is not directly comparable to an ElevenLabs direct subscription; it is a markup layered on top, priced in Higgsfield's own credit system rather than in ElevenLabs' dollar-per-character terms. See Part C for the specific credit economics and the specific limitation that Higgsfield does not expose a clean per-minute or per-thousand-character TTS rate through this interface.

**Higgsfield's other four variants** (minimax, seed_speech, vibe_voice, cozy_voice) are separate underlying engines with their own quality and language characteristics, not independently deep-researched in this pass beyond what the MCP tool inspection surfaced; treat their Arabic capability as unconfirmed until tested directly. **[UNVERIFIED, test directly before relying on for Arabic work]**

**Higgsfield's own general preset voice library**, surfaced via its `list_voices` tool, returned a large paginated set of English-sounding preset voice names (examples observed: Emily, John, Naomi, Callum, Onyx, Bram, Pixie, Grant, Simone, Eric, Remy, Marcus, Tamsin, Lola, Ines, Marisol, Roxie, Arthur, Cillian, Brooks, Tallulah, Hana, Gideon, Roman, Skye, Mabel, Sterling, Maya, Quinn, Harrison, and more). This preset library, as observed, is English-oriented and does not obviously surface named Arabic presets of its own. **[SOURCED, from live MCP tool inspection, 2026-07-26]** Practical consequence: Arabic capability through Higgsfield has to come either through the `elevenlabs` variant's own multilingual voices (with all the MSA-default caveats described in A4 still applying, since routing through Higgsfield does not change ElevenLabs' underlying model behavior), or through voice cloning using Higgsfield's `create_voice` or `create_voice_from_confirmed_audio` tools against a native dialect reference recording.

**One genuine exception worth flagging separately.** Among the models available through this same connected environment, `qwen_audio_tts` ("Qwen Audio 3.0 TTS Flash," an Alibaba Cloud model) exposes an explicit natural-language `instruction` parameter for directing emotion, dialect, speed, and style, which is a genuinely useful direction-engineering feature where it applies. However, its documented `language` hint options are `zh, en, fr, de, ja, ko, ru, pt, th, id, vi, it, ms`, and Arabic is not among them. **[SOURCED, from live MCP tool inspection, 2026-07-26]** This means Arabic is explicitly not a first-class supported language for this specific model, despite its otherwise attractive direction-instruction feature, and it should not be reached for on an Arabic job regardless of how appealing its instruction parameter looks on paper.

**A second exception, and the strongest Arabic-preset signal found in this environment.** `inworld_text_to_speech` ("Inworld Text to Speech," accessed via FAL, marked as intended for game-pipeline use) exposes a voice list that explicitly includes two named Arabic voices, listed as "Nour (ar)" and "Omar (ar)," among dozens of other-language voices. **[SOURCED, from live MCP tool inspection, 2026-07-26]** This is, among the models connected to this environment, the one with a confirmed native Arabic preset voice pairing (one female-coded, one male-coded name) rather than Arabic capability inferred only from a multilingual model's general language claim. Its game-pipeline framing suggests it may be positioned and tuned for interactive/character use rather than cinematic narration, which should be tested directly before assuming parity with a dedicated commercial VO provider.

**`seed_audio` ("Seed Audio 1.0," ByteDance)** exposes `voice_type` and `voice_id` parameters but no documented language list in this environment's tool inspection; it is likely primarily tuned for Chinese and English use based on its origin, and Arabic capability is unconfirmed. **[UNVERIFIED, test directly]**

## A6. Voice Cloning, Voice Design, And Preset Voices: Three Different Paths To A Voice

These three paths are frequently conflated in casual conversation about AI voice, and they carry meaningfully different craft implications, cost implications, and rights implications.

**Preset voice.** A voice the provider trained on its own data and ships as a ready-made, selectable option. No specific real person's likeness is being reproduced (or, where a preset voice happens to closely resemble a real person, that is a separate and serious rights problem in its own right, addressed below). Direction engineering for a preset voice works entirely through the text, punctuation, and any style controls described in A2, applied to an existing, fixed vocal instrument.

**Voice design.** A newer capability, offered by some providers including ElevenLabs, that generates an entirely new synthetic voice from a text description of the desired vocal qualities, rather than from a recording of a real person at all. This produces a voice that has never belonged to any real human, which sidesteps the consent and likeness questions that voice cloning raises, at the cost of losing the specific, irreplaceable qualities of an actual human instrument. **[PRINCIPLE]**

**Voice cloning.** Building a synthetic voice from reference audio of a specific real person, ranging from an "instant clone" (a short sample, lower fidelity, faster to produce, available at lower subscription tiers on providers like ElevenLabs) to a "professional clone" (a longer, higher-quality reference session, higher fidelity, gated to higher subscription tiers). A cloned voice's performance ceiling is shaped by what the reference recording actually contains, as discussed in A1 and A4: a clone can generate new sentences the reference speaker never said, but it cannot reliably generate an emotional register, dialect, or performance quality that was never present anywhere in the reference audio. **[PRINCIPLE]**

**The consent, ethics, and rights standard for cloning a real person's voice is covered in depth in Bible 08 (VO Casting and Voice Direction), Section A13, and is not duplicated at length here.** The short version, cross-referenced rather than restated: any voice that resembles an identifiable real person requires separate, specific, written consent before use, in most jurisdictions a person's voice carries personality-rights protection independent of any contractual framework, and the major performer unions' 2025 contract language on digital replicas and synthetic performers is the current reference standard for what "clear and conspicuous" consent actually requires. Nothing in this document changes or supersedes that standard; it applies identically whether the cloning is done through ElevenLabs, through Higgsfield's `create_voice_from_confirmed_audio` tool, or through any other provider. **[SOURCED, cross-reference Bible 08]**

## A7. Dubbing And Translation-Dubbing: A Distinct Workflow

Dubbing and translation-dubbing tools (Higgsfield exposes one directly, and several of the major providers in the landscape table offer equivalent capability) solve a different problem than the fresh-VO-generation workflow this document otherwise describes. Generating VO from a script starts with text and produces new audio. Dubbing starts with existing audio, in an existing language, and produces new audio in a different language, timed against the original performance's pacing and, in the more advanced tools, its emotional contour. **[PRINCIPLE]**

This distinction matters for briefing purposes: a request to "get this into Arabic" could mean either workflow, and they have different inputs, different cost structures, and different craft risks. A fresh-generation request needs a finished, native-language script as its input. A dubbing request needs the original audio or video as its input, and inherits all the MSA-versus-dialect and diacritization issues described in A4 on the target-language side, plus a further timing constraint: the translated dialogue generally has to fit inside the original speaker's timing envelope, which is its own compounding difficulty when Arabic's syllable density does not match the source language's. **[PRINCIPLE]** Never assume these are interchangeable requests without confirming which one is actually needed.

## A8. Vocabulary Glossary

| Term | Meaning |
|---|---|
| **SSML** | Speech Synthesis Markup Language. An XML-based markup standard, supported to varying degrees by different providers, that lets an operator embed explicit instructions (pronunciation, pauses, emphasis, rate) directly inside the text sent to a TTS engine, rather than relying on the engine to infer them. |
| **Phoneme tag** | An SSML element that specifies the exact phonetic pronunciation of a word or phrase using a defined phonetic alphabet, overriding the engine's own guess. The single most reliable tool for fixing a mispronounced name or brand term where supported. |
| **Prosody** | The rhythm, stress, and intonation pattern of speech, as distinct from the words themselves. What punctuation, pacing, and emphasis direction are all ultimately trying to control. |
| **Diacritics / tashkeel** | The short-vowel marks normally omitted from everyday written Arabic. Their absence is fine for a fluent human reader relying on context, and a primary source of pronunciation ambiguity for a TTS model. |
| **Diglossia** | The linguistic term for a language community's use of two distinct registers for different social functions, here specifically the split between formal written/read Modern Standard Arabic and the everyday spoken regional dialects. The structural root of the MSA-versus-dialect TTS problem. |
| **Multilingual model** | A single trained model capable of generating speech in more than one language. Convenient, but per A4, its cadence and phoneme habits are shaped by whichever language dominated its training data, which is a real quality risk for the less-represented language. |
| **Voice cloning** | Building a synthetic voice from reference audio of a specific real person. See A6 for the instant-versus-professional distinction and A1/A4 for the reference-audio ceiling effect. |
| **Voice design** | Generating an entirely new synthetic voice from a text description, with no real person's reference audio involved. |
| **Zero-shot voice** | A cloned or generated voice usable immediately from a very short or even single reference sample, without a dedicated fine-tuning or training pass. Faster and cheaper than a professional clone, at some cost to fidelity and range. |
| **Reference audio** | The recorded sample(s) a voice cloning system uses as its source material. Its content and range are a hard ceiling on what the resulting clone can convincingly perform later. |
| **Instant voice cloning** | A lower-fidelity, faster clone type built from a short sample, generally available at lower subscription tiers. |
| **Professional voice cloning** | A higher-fidelity clone type built from a longer, higher-quality reference session, generally gated to higher subscription tiers. |
| **Text normalization** | The pre-processing step that resolves written forms not meant to be read literally (numbers, dates, abbreviations, currency) into their correct spoken form before synthesis. |
| **Style / instruction parameter** | A natural-language or structured field, where an engine supports one, letting an operator state the desired emotional register or delivery style directly, rather than only inferring it from punctuation. |
| **Break / pause tag** | An explicit markup element, where supported, specifying a silence of a stated duration at a stated point in the text, independent of punctuation. |

---

# PART B: AGENT OPERATING MANUAL

This half is written so an AI subagent can occupy the role of a competent AI voice generation operator rather than a passive prompt-forwarder. It assumes Part A's craft reasoning and converts it into questions, templates, decision tables, and stop conditions.

## B1. The Exact Questions To Ask Before Generating Any VO

Ask these in order. Do not proceed past an unanswered question by inventing an answer. Where an answer must be assumed to keep moving, state the assumption explicitly and mark it as an assumption in the delivered output.

**Language and dialect**
1. Which language is this: English, Arabic, or both?
2. If Arabic, which register: Modern Standard Arabic, or a specific colloquial dialect (Egyptian, Gulf, Levantine, or other)? This must be a named decision, not an implied default.
3. If a dialect, is the script itself actually written in that dialect's vocabulary and grammar, or is it MSA text that someone expects to be "read with an accent"? These are different problems with different fixes.
4. If the project is bilingual, has each language been treated as its own generation pass with its own voice choice (see B3), or is a single multilingual voice being asked to cover both?

**Voice source**
5. Is this a preset voice, a voice-designed synthetic voice, or a cloned voice built from a real person's reference audio?
6. If a clone, has consent been obtained in writing, specific to this use, per the standard in Bible 08 Section A13? Do not proceed on an unconfirmed answer.
7. If a clone, what does the reference audio actually contain: is the needed emotional register and dialect actually present somewhere in that reference material, or is the request expecting the clone to perform something never demonstrated in its source?

**Emotional register and script**
8. What is the exact emotional register required, stated as a situation ("a person telling a friend something they are proud of, evenly, no showmanship") rather than an adjective ("warm")?
9. What register must be actively avoided, named explicitly?
10. What is the exact final script text, including all punctuation, exactly as it should be read? Punctuation is pacing instruction in this discipline (see A2); a script handed over without its final punctuation is an incomplete brief, not a formatting nicety.
11. Are there specific words (names, brand terms, numbers, acronyms) that need explicit pronunciation control, and has that control been supplied (diacritics for Arabic, phoneme tags or respelling for either language)?

**Technical and delivery**
12. Which engine or provider is being used, and does it expose a style/instruction parameter, inline emotion tags, an explicit pause/break tag, and a rate control, or does it rely on punctuation and text construction alone? The available control surface changes what can be directed at all.
13. What is the target runtime, and does the script fit that runtime at a pace that still leaves room for silence (the same arithmetic problem described in Bible 08 Section A6, unchanged by the fact that the performer is synthetic)?
14. Is this a fresh-generation request from a script, or a dubbing/translation-dubbing request against existing audio (see A7)? These are different workflows with different inputs.

## B2. Reusable Prompt / Direction Construction Template

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

### Worked fill, English

```
Language:                 English
Voice source:             Preset
SCRIPT TEXT:  "We didn't rush this. We built it, we broke it, and we built it again. That's the part nobody sees."
EMOTIONAL REGISTER:  A person telling a friend, matter-of-fact, slightly proud but not performing pride.
ANTI-REGISTER:  Salesy, upward inflection at the end of every clause, founder-explaining-the-product energy.
PACING:  Full stops kept hard. No rate adjustment needed, punctuation carries the pacing.
```

### Worked fill, Arabic (Egyptian dialect, illustrating the diacritics and dialect disciplines from A4)

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

## B3. The Bilingual Production Protocol

**The rule, stated plainly: generate the English and Arabic reads as two fully separate passes, with two separately chosen voices or engines, never as one multilingual voice covering both.**

This is the same discipline Bible 18 (Creative Brief and Concept) applies to copywriting itself: each language gets its own native pass against the same brief, not a shared script translated or rendered across languages. Applied to voice generation, the reasoning is structurally identical and is explained mechanically in A4 and A5: a voice model's cadence and phoneme habits are shaped by whichever language and register dominated its training or reference material, and a single voice asked to cover both languages will read as native in at most one of them, usually with the less-represented language (very often Arabic dialect specifically) suffering the visible compromise.

**What this means operationally:**
- The English pass and the Arabic pass are treated as two separate generation requests, each filled out on its own copy of the template in B2, each reviewed on its own terms.
- The English voice and the Arabic voice do not need to sound alike, match in timbre, or come from the same provider. Chasing a matched voice across languages, exactly as Bible 08 Section A9 warns against for human casting, optimizes for a similarity the audience in neither market perceives, at the cost of quality in both.
- Each language's script is written natively for that language and that register, not translated from the other. A translated Arabic script read by an Arabic voice will still surface the translation in its rhythm and idiom even if the voice itself is excellent.
- Timing will differ between the two languages. Plan for separate edits or separate cut lengths per language rather than assuming one runtime serves both.

**The scoped exception.** A single voice covering both languages is acceptable only where a specific, deliberate brand requirement makes voice continuity across languages more valuable than per-language native quality, for example a recurring brand mascot voice whose recognizability is itself the asset being protected. Where this exception is invoked, it must be documented as a conscious tradeoff, naming the quality cost being accepted in the weaker-represented language, not treated as a neutral default choice. **[PRINCIPLE]**

## B4. Model And Provider Selection Logic

| Goal | Best-fit provider(s), based on current documented capability | Why |
|---|---|---|
| English conversational or documentary read | ElevenLabs, WellSaid Labs, Azure Neural TTS | Deep English voice libraries with strong stated emotional range; WellSaid specifically built for narration-grade English delivery. |
| English announcer read | ElevenLabs, Azure Neural TTS | Broad preset libraries include projected, high-energy voice options; verify against a specific sample rather than assuming by category. |
| Arabic MSA formal read | Amazon Polly (Zeina), Azure Neural TTS, Google Cloud TTS, ElevenLabs Multilingual/v3 | All document credible MSA support; MSA is also the register these models are most likely to default toward even without special selection, per A4, which is an advantage here specifically. |
| Arabic Egyptian-dialect colloquial read | A named dialect-specific voice where available (check current Azure documentation for its named Egyptian voice), or reference-audio voice cloning from a native Egyptian dialect speaker | Per A4, dialect authenticity is the single hardest problem in this entire landscape; a generic "Arabic" preset is the least reliable path, a documented dialect-specific voice is better, and a native-speaker clone is the most reliable of the three. |
| Arabic Gulf-dialect colloquial read | Amazon Polly (Hala, Zayd), Cartesia (Emirati Arabic variant documented) | Currently the most clearly named, documented Gulf-dialect commercial options identified in this research pass. |
| Voice cloning of a specific real voice | ElevenLabs (instant and professional cloning tiers), Resemble AI, Higgsfield's `create_voice` / `create_voice_from_confirmed_audio` (which itself typically routes to an underlying engine) | ElevenLabs has the most detailed published cloning tier structure; always confirm written consent per Bible 08 Section A13 before any cloning work begins, regardless of provider. |
| Fastest / cheapest option for a quick English scratch or internal use | ElevenLabs Free or Starter tier, or a free tier of a comparable provider | Sufficient for scratch tracks and internal previsualization; not for client-facing broadcast delivery, per the same distinction Bible 08 draws between appropriate and inappropriate synthetic-voice uses. |
| Real-time or conversational voice AI application (not pre-recorded narration) | Cartesia, PlayHT | Both are positioned and marketed specifically around low-latency, conversational delivery rather than cinematic narration; a different selection axis than the rest of this table. |

**A standing caution for this whole table:** every cell should be verified against the provider's current documentation and, ideally, a direct generated sample, before being committed to a client-facing decision. Provider capability in this landscape changes faster than most craft references can track; this table reflects the state of documented capability as researched on 2026-07-26, not a permanent ranking.

## B5. Failure Modes And Tells

| Tell | What it actually means | The fix |
|---|---|---|
| An Arabic script with no diacritics produces an unexpected or wrong pronunciation on a specific word | Genuine, well documented ambiguity in undiacritized Arabic text, not a model malfunction | Diacritize that specific word or the surrounding line manually (see A4) |
| A dialect script comes back sounding like a newsreader | The MSA-default problem described in A4, the single most common Arabic AI voiceover failure | Switch to a documented dialect-specific voice, or move to reference-audio cloning from a native dialect speaker |
| A single voice is asked to read both an English script and an Arabic script | Violates the Bilingual Production Protocol in B3 | Split into two separate generation passes with two separately chosen voices, unless the brand-continuity exception is deliberately and explicitly invoked |
| Punctuation was stripped or "cleaned up" before sending text to the engine | All pacing control has been discarded, whether or not anyone intended that | Restore the punctuation exactly as it should be spoken; treat punctuation as an instruction layer, not a formatting nicety, per A2 |
| A cloned voice cannot produce the requested emotional register no matter how the text is adjusted | The reference audio never contained that register in the first place (the ceiling effect from A1/A4) | Re-record reference audio containing the needed register, or accept the ceiling and adjust the brief |
| An "Arabic voice" was selected with no dialect specified at all | The dialect decision was silently defaulted, almost always to MSA-flavored output | Ask which dialect is actually required before generating anything, per B1 question 2 |
| A generation sounds "close but wrong" and nobody can say exactly why | Almost always an unstated layer from A2: missing emotional direction, missing pronunciation control, or stripped pacing punctuation | Walk the five layers in A2 in order and check which one was never specified |
| A native-dialect reviewer was never in the approval chain for an Arabic deliverable | The MSA-versus-dialect failure is frequently invisible to a non-native reviewer | Make native-dialect review a mandatory delivery gate for any Arabic dialect work, not an optional nicety |

## B6. Trigger List: What Forces A VO Regeneration

| Upstream change | Regeneration required | Notes |
|---|---|---|
| **Script edit, any wording or punctuation change** | Yes, full regeneration of the affected lines at minimum | Punctuation changes alone can change the read (see A2); do not assume a wording-only change leaves pacing untouched |
| **Language or dialect change** | Yes, full regeneration, and per B3 this is never a same-voice swap if a language changed | Also triggers a fresh review by a native speaker of the new target dialect |
| **Gender or age recast of the voice** | Yes, full regeneration | If cloned, also confirm consent covers the new intended use context |
| **Runtime change** | Yes, re-derive pacing and possibly re-cut the script itself | Same arithmetic dependency Bible 08 Section A6 describes for human VO: pace, word count, and runtime are linked, not independent |
| **Switch from a preset voice to a cloned voice, or the reverse** | Yes, full regeneration, plus a consent check if moving toward a clone | Do not assume a cloned voice will reproduce a preset voice's register; treat as a new casting decision, not a technical substitution |
| **Reference audio for an existing clone is replaced or extended** | Yes, the clone's usable emotional and dialect range may have changed | Re-test the full range of registers the project needs against the new reference material before assuming parity with the old clone |
| **Provider or engine switch (e.g. moving from one variant to another on a router like Higgsfield)** | Yes, full regeneration and full re-review | Different engines have different pronunciation defaults, different pacing behavior, and different dialect handling even for "the same" requested language |
| **A pronunciation error is caught late** | Yes, targeted regeneration of the affected line, with pronunciation control applied this time | Do not attempt to patch a mispronunciation by re-recording around it if the tool allows a direct phoneme or diacritic fix instead |

---

## B7. Standing Behavioural Rules For The Agent Occupying This Role

1. **Never strip punctuation from a script before generation.** Punctuation is pacing instruction, not formatting. Preserve it exactly.
2. **Never treat an Arabic request as a single generic language decision.** Always ask which register, MSA or a named dialect, before generating anything.
3. **Never assume a dialect script written correctly will be read correctly.** The MSA-default problem happens at the model's pronunciation and cadence level, independent of whether the input text itself is properly dialectal.
4. **Diacritize ambiguous or high-risk Arabic words manually rather than hoping a re-generation resolves it differently.** This is the single most reliable Arabic pronunciation-control lever available.
5. **Never generate a bilingual project through one multilingual voice by default.** Two languages, two separate passes, two separately chosen voices, unless a documented brand-continuity exception has been explicitly invoked.
6. **Never proceed with voice cloning without confirming written, specific consent first.** This is the hardest line in this document and in Bible 08 alike.
7. **Never expect a cloned voice to perform an emotional register or dialect that its reference audio never demonstrated.** Check the reference material's actual range before promising a result.
8. **Always route Arabic dialect deliverables through a native-dialect reviewer before calling the work finished.** This failure is frequently invisible to a non-native ear.
9. **State the emotional target as a situation, not an adjective, in every generation request, in either language.** This mirrors the adjustment-ladder discipline from Bible 08 and is the same reason it works there.
10. **Distinguish a fresh-generation request from a dubbing request before starting.** They have different inputs and different failure surfaces.
11. **Treat every price, tier feature, and credit figure in this document as dated to 2026-07-26 and re-verify before quoting it in any budget conversation.** AI voice pricing changes fast; Part C says this explicitly and it applies to the whole document.
12. **Distinguish sourced fact from principle from unverified claim when advising, and say which one is being relied on.**

---

# PART C: DATED COST SNAPSHOT (as of 2026-07-26, refresh before relying on for budgeting)

**This entire section expires quickly. AI voice pricing, credit allocations, and tier features have moved on the order of weeks to months across every provider covered in this document over the past year. Do not use any figure below in a client quote, an internal budget, or a proposal without re-checking it directly against the provider's live pricing page first. Where this document says a number was fetched live, it means fetched live on 2026-07-26, not that it is permanently true.**

## C1. ElevenLabs, fetched live from elevenlabs.io/pricing on 2026-07-26 **[SOURCED, primary source, live fetch]**

| Tier | Monthly price | Credits per month | Approx. TTS minutes included | Extra-minute overage rate | Commercial license | Voice cloning included |
|---|---|---|---|---|---|---|
| **Free** | $0 | 10,000 | ~10 min | ~$0.36/min | No | No cloning; Voice Design available |
| **Starter** | $6/month | 30,000 | ~30 min | ~$0.20/min | Yes | Instant Voice Cloning |
| **Creator** | Standard $22/month (first month shown discounted 50%, to $11, in current live promotion) | 121,000 | ~121 min | ~$0.18/min | Yes | Professional Voice Cloning added |
| **Pro** | $99/month | 600,000 | ~600 min | ~$0.17/min | Yes | Professional Voice Cloning, plus 44.1kHz PCM output via API and 192kbps audio |
| **Scale** | $299/month | 1,800,000 | ~1,800 min | ~$0.17/min | Yes | 3 Professional Voice Clones, 3 workspace seats, team collaboration |
| **Business** | $990/month | 6,000,000 | ~6,000 min | ~$0.17/min | Yes | 10 Professional Voice Clones, 10 workspace seats, low-latency TTS as low as 5 cents/minute |
| **Enterprise** | Custom, contact sales | Custom | Custom | Custom | Yes | Custom, plus HIPAA BAAs, custom SSO, fully managed dubbing with Productions |

**Notes and caveats on the table above:**
- All figures above were read directly off the live ElevenLabs pricing page during this research session. The Creator tier's displayed price was ambiguous on the page itself: it showed "$22, first month 50% off" immediately alongside "$11/month," which most plausibly means the standing price is $22/month with a running promotional discount applying $11 to the first billed month. Confirm the standing, non-promotional price directly before quoting it, since promotional pricing is exactly the kind of figure that changes without notice. **[UNVERIFIED beyond what the page displayed]**
- Annual billing is available and was reported elsewhere in this research pass as working out to roughly two months free (paying for ten months of twelve) versus monthly billing; this specific annual-versus-monthly ratio was not independently re-verified against the live pricing page's own annual toggle in this pass and should be checked directly before quoting. **[UNVERIFIED, check directly]**
- "Credits" and "characters" are related but not identical units at ElevenLabs; credit consumption per character varies by which underlying model is used (for example, a faster/lower-fidelity model can cost fewer credits per character than the flagship multilingual model). The "~10 to ~6,000 minutes" column above reflects the platform's own stated approximate minutes-per-tier figures from its comparison table, not a fixed characters-to-minutes conversion that a production should assume holds exactly for every script.
- A startup grants program was observed on the live pricing page offering 12 months free access with an allotment of 33 million characters, intended for building and testing conversational AI agents specifically; this is a distinct program from the standard subscription tiers and has its own eligibility criteria not detailed on the pricing page itself. **[SOURCED, live fetch, eligibility unconfirmed]**

## C2. Higgsfield, verified live via connected MCP on 2026-07-26 **[SOURCED, primary source, live tool inspection]**

| Plan | Monthly price | Annual price | Credits included |
|---|---|---|---|
| **PLUS** | $49/month | $39/month billed annually | 1,000 credits |
| **ULTRA** | $129/month | $99/month billed annually | 3,000 credits |

**One-time credit top-ups:**

| Top-up size | Price |
|---|---|
| 500 credits | $26 |
| 1,000 credits | $49 |
| 2,000 credits | $95 |
| 4,000 credits | $190 |

**Critical ambiguity to flag explicitly, because it is easy to misread.** Higgsfield's own plan tooltip references "~60 character generations" per 1,000 credits. This refers to Higgsfield's Soul character-creation system (generating a reusable visual character asset), a completely different meaning of the word "character" from the "characters" unit used throughout the text-to-speech industry (a single letter or symbol of input text). Do not confuse the two. Higgsfield's plan page, as inspected, does not expose a clean, stated per-minute or per-thousand-TTS-character credit rate for its `text2speech_v2` tool. **[SOURCED, live tool inspection]** This is a genuine limitation for budgeting purposes: an operator cannot currently look up "how many Higgsfield credits does one minute of Arabic VO cost" as a published rate the way they can on ElevenLabs' own pricing page. The practical workaround is to run a test generation of known length first and back-calculate the credit cost from the account's credit balance before and after, rather than assuming a rate.

**The reselling relationship, stated plainly for budgeting purposes.** Where Higgsfield's `text2speech_v2` tool is used with `variant: elevenlabs`, the cost actually paid is Higgsfield's own credit-based price for that generation, which sits on top of (and is separate from) whatever ElevenLabs itself would charge for the same generation through a direct ElevenLabs subscription. These are not two ways of paying the same underlying cost; Higgsfield is a reseller layer with its own margin, not a pass-through. A production with meaningful, recurring TTS volume should compare the effective per-minute cost of a direct ElevenLabs subscription (C1 above) against the effective per-minute cost of generating the same volume through Higgsfield credits, using a real test generation to establish the Higgsfield-side rate, before committing to either as the standing production pipeline. **[PRINCIPLE, given the confirmed structural relationship]**

## C3. Other Providers: Pricing Verification Status

The following providers are covered in the capability landscape in Part A, Section A5, but their specific current dollar pricing was not independently and rigorously fetched from a live primary pricing page in this research pass to the same standard applied to ElevenLabs and Higgsfield above. **Treat every figure below as [UNVERIFIED] until checked directly against the provider's own current pricing page.**

| Provider | Pricing verification status as of 2026-07-26 |
|---|---|
| Microsoft Azure AI Speech (Neural TTS) | Priced on a consumption basis (typically per one million characters, tiered by voice type) under the broader Azure AI Services pricing structure; specific current per-character rates for Arabic-specific voices were not independently fetched in this pass. **[UNVERIFIED, check the live Azure AI Speech pricing page]** |
| Google Cloud Text-to-Speech | Priced on a consumption basis (typically per one million characters, tiered by voice model family such as WaveNet versus Neural2); specific current rates were not independently fetched in this pass. **[UNVERIFIED, check the live Google Cloud Text-to-Speech pricing page]** |
| Amazon Polly | Priced on a consumption basis (typically per one million characters, tiered by standard versus neural voice type); specific current rates were not independently fetched in this pass. **[UNVERIFIED, check the live Amazon Polly pricing page]** |
| Murf.ai | Subscription-tiered pricing model reported in trade sources; specific current dollar figures per tier were not independently fetched from Murf's own live pricing page in this pass. **[UNVERIFIED, check the live Murf.ai pricing page]** |
| PlayHT | Subscription-tiered pricing model reported in trade sources; specific current dollar figures per tier were not independently fetched from PlayHT's own live pricing page in this pass. **[UNVERIFIED, check the live PlayHT pricing page]** |
| Cartesia | Subscription and usage-based pricing reported in trade sources; specific current dollar figures were not independently fetched from Cartesia's own live pricing page in this pass. **[UNVERIFIED, check the live Cartesia pricing page]** |
| Resemble AI | Subscription-tiered pricing model reported in trade sources; specific current dollar figures were not independently fetched from Resemble AI's own live pricing page in this pass. **[UNVERIFIED, check the live Resemble AI pricing page]** |
| WellSaid Labs | Enterprise-oriented, typically quote-based pricing reported in trade sources; no public self-serve tier pricing was confirmed in this pass. **[UNVERIFIED, contact provider directly]** |

## C4. Standing Operating Rule For This Section

Before this document is used to inform any actual production budget: re-fetch the ElevenLabs pricing page directly, re-verify the Higgsfield plan and top-up pricing directly through its own plan display, and, for any other provider under consideration, fetch that provider's own live pricing page rather than relying on any figure in C3 above. This section should be treated the same way the DLight financial knowledge base treats FS2026 data: never load-bearing from memory, always re-fetched fresh immediately before it informs a real decision.
