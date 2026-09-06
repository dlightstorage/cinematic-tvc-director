# Audit Report: AI Generation Craft Bibles (19-24)

Narrow, negative-brief audit. Scope: five specific failure classes only, hunted with grep across
19-AI-Image-Generation-Prompts.md, 20-AI-Text-to-Video-Generation-Prompts.md,
21-AI-Text-to-Audio-Sound-Design-Prompts.md, 22-AI-Arabic-and-English-VO-Generation-Prompts.md,
23-AI-Image-to-Video-Generation-Prompts.md, 24-AI-Text-to-Music-Generation-Prompts.md.
Date of audit: 2026-07-26. No fixes applied, findings only.

---

## 1. Cross-file cost disagreement

**Result: CLEAN.** All six files were cross-checked line by line for the shared Higgsfield facts
(PLUS $49/mo or $39/mo annual = 1,000 credits; ULTRA $129/mo or $99/mo annual = 3,000 credits;
top-ups 500cr/$26, 1,000cr/$49, 2,000cr/$95, 4,000cr/$190; ~19-21 credits per dollar).

Every file states these identically:
- 19, line 339 and line 361
- 20, lines 425-435
- 21, lines 308-311
- 22, lines 423-433
- 23, lines 355-365
- 24, lines 331-341

No file has these numbers wrong, swapped, or garbled. This is the one failure class that came back
fully clean across the set.

---

## 2. Overlap contradictions (Files 20 and 23, video models; File 21 vs 22, audio)

### FINDING 2.1 — wan2_6 vs wan2_7 and gemini_omni: which models expose `audio_references`

**File:** 20-AI-Text-to-Video-Generation-Prompts.md, lines 222, 228, 245-246, 378
**File:** 23-AI-Image-to-Video-Generation-Prompts.md, lines 67, 73, 201

**Quote, File 20, line 222:**
> `wan2_6`, `wan2_7` | Open-weight, stylized/experimental | `wan2_7` adds synchronized audio and character-consistent video via `audio_references`

**Quote, File 20, line 228:**
> `gemini_omni` ("Gemini Omni Flash") | Google reference-driven model | Native audio, accepts `image_references` and `video_references`

**Quote, File 20, line 246:**
> `audio_references`. Used to sync a new clip to an existing audio performance, most notably documented on `wan2_7` in the Higgsfield roster...

**Quote, File 23, line 67:**
> most models (... wan2_7) accept a `start_image` and often an `end_image` ... while a smaller set (gemini_omni, wan2_6, seedance_2_0) additionally accept `image_references`, `video_references`, and `audio_references` as separate, distinct input types.

**Quote, File 23, line 201:**
> gemini_omni, wan2_6, and seedance_2_0 additionally expose `image_references`, `video_references`, and `audio_references` as inputs separate from `start_image`...

**Why this is a problem:** The two files disagree on two separate points about the same underlying
Higgsfield roster (both claim to be grounded in a live MCP fetch on 2026-07-26):
1. File 20 attributes `audio_references` to `wan2_7` specifically. File 23 attributes it to `wan2_6`
   specifically, and places `wan2_7` only in the plain start_image/end_image group.
2. File 20 says `gemini_omni` accepts only `image_references` and `video_references` (no
   `audio_references`). File 23 groups `gemini_omni` with `audio_references` support.

An agent using File 20 to plan an audio-synced Wan generation would call `wan2_7`; an agent using
File 23 for the same job would call `wan2_6`. One of these is wrong, or Higgsfield genuinely exposes
this parameter differently on the two model IDs and neither document says so. Either way this is a
direct, checkable, model-selection-breaking contradiction between two sibling files describing the
same live-fetched roster.

**Recommended fix:** Re-run the Higgsfield MCP tool/schema inspection for `wan2_6`, `wan2_7`, and
`gemini_omni` specifically, confirm which of the three actually exposes `audio_references`, and
correct whichever file is wrong (possibly both, if the true answer is neither or both).

### Secondary note — minor roster listing gap, not a contradiction

File 23, line 201, lists `cinematic_studio_video` (without a version suffix) as a distinct model
alongside `cinematic_studio_video_v2`. File 20's A4b roster table (lines 217-230) only lists
`cinematic_studio_3_0` and `cinematic_studio_video_v2`, no bare `cinematic_studio_video`. This may
simply be an omission in File 20 rather than a factual conflict, but it means the two "same roster"
lists are not identical, and a reader cross-referencing them will notice the mismatch.

### FINDING 2.2 — otherwise consistent

Everything else checked between 20 and 23 lines up: both agree `start_image` is literal first-frame
conditioning, `end_image` is literal last-frame conditioning used together with `start_image` for
FLF2V/interpolation, `image_references` is loose style/identity steering distinct from the literal
first frame, and both agree Kling 3.0 supports first+last-frame mode together. Both files independently
describe Seedance 2.0 as the reference-consistency state of the art and both flag it as weaker on
human subjects, recommending Seedance 1.5 Pro, Kling, or Veo 3.1 instead for people. No contradiction
found there.

### File 21 (SFX) vs File 22 (VO): no voice-claim leakage found

**Result: CLEAN.** File 21 is explicit and disciplined about staying out of VO territory: line 9 states
speech/voiceover/dialogue synthesis is explicitly out of scope and routes to Bible 08 and the VO
companion bible. Lines 128, 245, and 313 specifically flag Higgsfield's `seed_audio` tool as a
"speech-oriented text-to-speech tool" mislabeled as text-to-audio, and instruct the reader not to use
it for ambience/SFX. File 22, line 188, independently describes the same `seed_audio` tool consistent
with that characterization (voice_type/voice_id parameters, likely Chinese/English-tuned, Arabic
unconfirmed). The two files agree with each other on this shared model rather than contradicting.
No voice-related claims found leaking into File 21's craft content.

---

## 3. Brand or project contamination

Grepped case-insensitively across all six files for: dedo, DLight, Nour, Mona, Karim, Sara, Youssef,
Laila, Hassan, Dalia, Marigold, Torch Red, Aztec Purple.

**Result: CLEAN. No contamination found.**

- **dedo** — 0 hits in all 6 files.
- **Mona, Karim, Sara, Youssef, Laila, Hassan, Dalia, Marigold, Torch Red, Aztec Purple** — 0 hits in
  all 6 files.
- **Nour** — 1 hit total, File 22, line 186: `"Nour (ar)" and "Omar (ar)"`, the Inworld Arabic TTS
  preset voice pair. This is the legitimate, deliberate mention flagged in the brief. Not contamination.
- **DLight** — several hits, all in Part C budgeting-guidance language addressed to Mohamed/DLight
  as the intended reader of these internal craft bibles (e.g. File 20 line 459 "For any live DLight
  project using Higgsfield...", File 22 line 456 "the same way the DLight financial knowledge base
  treats FS2026 data...", File 24 line 169 "For any DLight-style commercial deliverable..."). These
  are legitimate references to the agency these documents are written for, not leaked client/project
  material from an unrelated proposal. Not contamination.

No fictional character names, no other client/project code names, no color-name contamination
(e.g. no "Marigold," "Torch Red," "Aztec Purple" anywhere) found in any of the six files.

---

## 4. Missing required structure

Checked each file for: PART A, PART B, PART C (dated cost snapshot), a claim-tagging convention
explicitly defined, a vocabulary glossary, at least 5-6 worked prompt examples, a failure-modes
section, and a trigger list.

| File | PART A/B/C | Tag convention defined | Glossary | Worked examples | Failure modes | Trigger list |
|---|---|---|---|---|---|---|
| 19 | Yes | Yes (line 7) | Yes (A8) | 6 (A3) | Yes (B5) | Yes (B6) |
| 20 | Yes | Yes (line 18 table) | Yes (A9) | 6 (A3) | Yes (B5) | Yes (B6) |
| 21 | Yes | **No, see 4.1** | Yes (A7) | 5 (A3) | Yes (B5) | Yes (B6) |
| 22 | Yes | Yes (line 6-9) | Yes (A8) | **~3, see 4.2** | Yes (B5) | Yes (B6) |
| 23 | Yes | Yes (line 6-9) | Yes (A8) | 6 (A5) | Yes (B5) | Yes (B6) |
| 24 | Yes | Yes (line 6) | Yes (A8) | 6 (A3) | Yes (B5) | Yes (B6) |

### FINDING 4.1 — File 21 never defines its own [SOURCED]/[PRINCIPLE]/[UNVERIFIED] convention

**File:** 21-AI-Text-to-Audio-Sound-Design-Prompts.md, lines 1-17 (opening/scope section)

File 21's opening section ("Scope note, read this first," lines 3-13) explains what the bible does
and does not cover, but nowhere states what [SOURCED], [PRINCIPLE], or [UNVERIFIED] mean, unlike
every other file in the set (19 line 7-13, 20 line 18-24, 22 line 6-9, 23 line 6-9, 24 line 6). File
21 nonetheless uses all three tags freely starting at line 86 ([PRINCIPLE]) and throughout Part C.
A reader opening File 21 in isolation has no definition of the tagging convention it relies on.

**Recommended fix:** Add a short "how to read the tags" block near the top of File 21, matching the
wording pattern used in the other five files, defining [SOURCED]/[PRINCIPLE]/[UNVERIFIED] explicitly.

### FINDING 4.2 — File 22 falls short of the 5-6 worked-prompt-example minimum

**File:** 22-AI-Arabic-and-English-VO-Generation-Prompts.md

Section A3 ("English VO Craft: Named, Proven Prompt And Direction Patterns," lines 74-113) presents
three named registers (natural conversational, announcer, documentary-realist), but only the first
one carries an explicit "**Worked example**" callout (line 88). The announcer and documentary-realist
sections describe construction patterns only, with no worked input/output example attached.

Section B2 adds two more explicit worked fills: "Worked fill, English" (line 299) and "Worked fill,
Arabic (Egyptian dialect...)" (line 310).

Total explicit worked examples in the file: 3 (1 in A3 + 2 in B2). This is below the "at least 5-6
worked prompt examples" bar every other file in the set clears (19, 20, 23, and 24 all have 6; 21 has
5). Given that File 22 covers two languages and three registers plus cloning/dubbing workflows, this
is also the file with the most surface area to cover and the thinnest worked-example coverage.

**Recommended fix:** Add explicit worked examples for the announcer and documentary-realist registers
in A3 (matching the format already used for the conversational register), and/or add a worked
example each for voice cloning and dubbing/translation-dubbing (A6/A7), to reach parity with the
other files.

---

## 5. Sourcing honesty

Checked whether each file's Part C (and any dollar/percentage figures elsewhere in the document)
distinguish live-verified numbers from guessed/aggregator numbers, with particular attention to
Files 20, 21, 23, 24 (partial web research risk) and a specific spot check of File 22's ElevenLabs
claims.

**Result: CLEAN, no unlabeled suspiciously-precise figures found.**

- Grepped all six files for every dollar figure and every N% figure outside of Part C: none were
  found. Every dollar/percentage claim in the entire document set is confined to the dated Part C
  cost snapshots, which is exactly where the "dated cost snapshot" requirement wants it.
- Within Part C, spot-checked every dollar figure for a tag. All six files consistently tag numbers
  as [SOURCED] (with a named source, e.g. "fetched live from elevenlabs.io/pricing on 2026-07-26" or
  "verified live via `show_plans_and_credits`") versus [UNVERIFIED] (aggregator-sourced, or a figure
  that could not be confirmed against a primary page). Examples of honest, well-flagged uncertainty:
  - File 20, C2: Sora API discontinuation date explicitly flagged `[UNVERIFIED, ... could not be
    corroborated against an official OpenAI statement]` (line 449); Kling/Veo/Luma/Pika pricing all
    flagged `[UNVERIFIED, third-party aggregation]` (lines 451-454).
  - File 21, C1: the derived $/second SFX cost is explicitly labeled a "back-of-envelope" derivation,
    "not a published per-second price" (line 280).
  - File 23, C2: an entire table of competitor pricing tagged `[UNVERIFIED]` with the explicit
    admission the figures are aggregator-sourced, not fetched from each vendor's own page (lines
    371-381).
  - File 24, C1/C2/C3: several tools (Udio, Soundraw, Stable Audio consumer tier, Mubert per-tier
    dollar figures) explicitly flagged `[UNVERIFIED]` with the stated reason (JavaScript-rendered
    pricing pages that could not be fetched) rather than silently presented as fact (lines 306, 313,
    320-321).

**Spot check, File 22 ElevenLabs pricing (the fact flagged as most important in that file):**
Lines 401-417. The full tier table (Free/Starter/Creator/Pro/Scale/Business/Enterprise) is tagged
`[SOURCED, primary source, live fetch]` at the section header. The one genuinely ambiguous figure,
the Creator tier's "$22 vs $11/month" promotional pricing, is explicitly called out as ambiguous on
the source page itself and flagged `[UNVERIFIED beyond what the page displayed]` (line 414), with an
instruction to confirm the standing price before quoting it. The annual-billing discount ratio is
separately flagged `[UNVERIFIED, check directly]` (line 415). This is the correct, honest way to
handle an ambiguous vendor page: nothing here reads as a precise number dressed up as fact.

No specific dollar figure, percentage, or date was found anywhere in the six files that reads as
suspiciously precise without an accompanying tag.

---

## CHECKED AND CLEAN

- Cross-file Higgsfield core pricing facts (PLUS/ULTRA prices, credit amounts, top-up tiers,
  credits-per-dollar) are identical and correct across all 6 files.
- Brand/project/team-name contamination: no hits for dedo, Mona, Karim, Sara, Youssef, Laila,
  Hassan, Dalia, Marigold, Torch Red, Aztec Purple in any of the 6 files. The single "Nour" hit is
  the legitimate Inworld Arabic voice name. All "DLight" hits are legitimate, intended references to
  the agency these bibles are written for.
- File 21 (SFX) does not leak voice/VO claims; it explicitly scopes VO out and correctly
  characterizes Higgsfield's `seed_audio` as a mislabeled speech tool, consistent with File 22's
  independent description of the same tool.
- Files 20 and 23 agree on the core vocabulary and mechanics of start_image, end_image,
  image_references, video_references, and on Kling 3.0's FLF2V support and Seedance 2.0's
  consistency/human-subject-weakness tradeoff.
- All dollar/percentage figures across all 6 files are confined to their dated Part C sections and
  consistently tagged [SOURCED] or [UNVERIFIED] with a stated reason; no untagged, suspiciously
  precise financial claims found anywhere in Part A/B of any file.
- File 22's ElevenLabs pricing table is properly sourced and its one genuine ambiguity (Creator tier
  promo pricing) is honestly flagged rather than stated as fact.
- PART A / PART B / PART C, a vocabulary glossary, a failure-modes section, and a trigger list are
  present in all 6 files.

## NOT CHECKED

- No independent live re-verification of any pricing figure was performed; this audit only checked
  internal consistency and internal tagging discipline, not whether the underlying numbers are
  currently true (Part C of every file already flags itself as needing a refresh).
- The other Higgsfield model parameters not named in the brief (e.g. exact resolution/duration
  options per model, `higgsfield_preset` catalogue contents) were not cross-checked between files 20
  and 23 beyond the start/end/reference-image mechanics explicitly asked about.
- File 19 (image generation) and File 24 (music generation) were not checked against each other for
  overlap contradictions, since the brief scoped the overlap check to files 20/23 (video) and 21/22
  (audio) specifically.
- Internal consistency of the worked prompt templates' craft content (i.e., whether the example
  prompts themselves are good prompts) was not evaluated; this audit only checked the five named
  failure classes, not general quality.
- Grammar, prose quality, and formatting consistency (heading levels, table formatting) were not
  evaluated beyond what was needed to confirm required sections exist.
