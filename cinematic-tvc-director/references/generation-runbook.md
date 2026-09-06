# Generation Runbook

The executable procedure for firing Higgsfield and keeping every asset attached to its reference row. Prompt templates, per-modality model selection tables, and the verified capability matrix live in `generation-ai-toolchain.md`. This file is the *how to run it* layer.

## Preconditions, all three required

1. **Stage 6 has passed.** Generating against an unaudited shot list spends real money on the wrong thing. The Handoff Gate is mandatory before any generation run, no exceptions for "it looks clean."
2. **The shot list is complete.** Every shot has a duration or timecode, a lens or lens family, a character or subject assignment, and a location or zone assignment. A shot missing any of the four is under-specified and will produce a prompt that guesses. Run the completeness audit in `templates-documents.md` (Bible 15 section) first.
3. **The state file has a generated-assets table.** If it does not, add it from the template before the first generation, not after.

## Check the balance before planning a batch

Call `mcp__*__balance` to get current credits and plan tier. Plan the batch against what actually exists rather than against an assumption. If the batch estimate exceeds the balance, say so before asking for approval rather than discovering it mid-run.

## The generation order

This order is not arbitrary. Each step produces the input the next step conditions on, which is what makes continuity hold across shots.

```
1. STILLS      generate the locked look: one reference still per character, per location, per key frame
                   |
2. VO           generate the voice track, if the film is VO-led and the picture must cut to it
                   |
3. MOTION       animate the stills into clips, using the still as start_image
                   |  (if VO/music is locked first, use audio_references on a model that accepts both)
4. MUSIC        score against the locked picture duration
                   |
5. SFX          generate elements at their frame-exact points
```

**Why stills first.** A still fixes appearance, composition, lighting and framing in one cheap artifact. Feeding it as `start_image` means the motion model no longer has to invent those things, so identity holds across shots instead of drifting. Generating motion from text alone and hoping for consistency is the most common and most expensive mistake in this pipeline.

**Why VO before motion, when the film is VO-led.** Bible 03's rule that full-runtime VO must be written as continuous prose first and cut to, not written around picture, has a generation consequence: if the voice track is locked first, the picture can be built against it via `audio_references`. Only three models accept a start frame and an audio reference in the same generation: `wan2_7`, `seedance_2_0`, `seedance_2_0_mini`. Choosing any other model forecloses audio-synced generation, so this decision has to be made before the model is picked, not after.

**Why music after picture.** A cue scored to a locked duration lands. A cue generated first forces the edit to accommodate it.

## Approval before every spend

Assemble, present, wait. The presentation must state, for each generation:

| Field | Why it is in the approval |
|---|---|
| Shot number and what it is | So the user knows what they are approving |
| Model chosen, with the reason | The reason is the check on the choice |
| Resolution and duration | Both drive cost non-linearly |
| Reference inputs and their roles | `start_image` vs `image_references` vs `audio_references` are different mechanisms, and confusing them is a silent failure |
| The full prompt text | The user should see the actual words, not a summary |
| Estimated credit cost | A number, not "some credits" |
| Batch total | The sum, stated before the go |

Then wait for an explicit go. Not an inferred one.

**On cost estimation, be honest about the limits.** Higgsfield does not expose a per-model, per-resolution, per-duration credit price table through this interface. The blended plan figures (roughly 4,800 images or 200 videos per 1,000 credits) are averages across cheap models, not per-model rates. State estimates as estimates. After each generation, record the actual cost if the interface reports it, and use observed actuals to sharpen later estimates rather than continuing to quote the blended average.

## Write-back is part of the generation, not a follow-up

The moment a generation returns, write its URL and ID into **both** places, in the same action:

1. The state file's generated-assets table (the index)
2. The specific master table row the asset belongs to (its home)

An asset recorded in only one of those is an orphan. If it is only in the state file, the department reading the Locations table cannot find the reference still for their set. If it is only in the master table, the credit spend is untracked.

### Write-back schema

| Asset | Master table | Row | Column |
|---|---|---|---|
| Location or set reference still | Locations and Sets | that zone | `Reference still (URL / ID)` |
| Character reference still | Cast | that character | `Reference still (URL / ID)` |
| Key frame still | Shot list | that shot | `Key frame (URL / ID)` |
| Shot video clip | Shot list | that shot | `Clip (URL / ID)` |
| Clip's extracted last frame | Shot list | the **next** shot | `Start frame in (URL / ID)` |
| VO take | Cast | the VO row | `VO take (URL / ID)` |
| Music cue | Production locks or a music table | that cue | `Cue (URL / ID)` |
| SFX element | Shot list | the shot it syncs to | `SFX (URL / ID)` |

If a master table lacks the column, add it. A schema that cannot hold the asset is the reason assets get orphaned.

The clip-to-next-shot row deserves attention: chaining shots means extracting a clip's last frame and feeding it as the next shot's `start_image`. Recording which frame fed which shot is what makes the chain auditable later. Without that record, a mid-chain regeneration silently breaks continuity downstream and nobody can tell where.

## Verify before scaling a batch

Generate one, look at it, then commit to the rest. Two checks:

**Identity drift.** Does the character or product still read as the same one across generations? Drift compounds, so catching it on shot 2 is cheap and catching it on shot 20 is not.

**Prompt-vs-reference fighting.** If a prompt re-describes appearance that a `start_image` already fixes, the words and the image compete and the output is mushy. In image-to-video the prompt's job is almost entirely motion: what moves, how much, and crucially **what must stay still**. An unspecified "stays still" is how you get unwanted animation everywhere.

## When a regeneration is triggered

Read the modality's regeneration trigger list in `generation-ai-toolchain.md`. Then, before regenerating:

1. Check whether the change re-opens an earlier stage. A palette change is not a prompt-rewrite job, it is a Stage 2 pivot that re-enters the loop, and regenerating assets against an unrevised palette rule just spends credits producing the same error at higher resolution.
2. Check what depends on the asset being replaced. If a clip's last frame fed the next shot's start frame, replacing that clip invalidates the next shot too. Trace the chain forward before regenerating, not after.
3. Mark the superseded asset as superseded in both tables rather than deleting the row. A deleted row loses the record that credits were spent, and loses the reason the asset was replaced.

## Failure modes worth naming

| Symptom | Cause | Fix |
|---|---|---|
| Generated before the gate passed | Skipped Stage 6 | Do not. The audit is cheaper than the credits |
| Character drifts across shots | Generated motion from text without a locked start frame | Generate the still first, use it as `start_image` |
| Audio-synced generation impossible after model chosen | Picked a model with no `audio_references` role | Decide the audio-first question before model selection. Only `wan2_7` and the Seedance 2.0 pair accept start frame plus audio reference |
| Picked `wan2_6` to animate a still | `wan2_6` has no frame conditioning at all | Use `wan2_7`. The two are not variants of one model |
| Tried to sync `gemini_omni` to an existing VO | `gemini_omni` accepts no `audio_references` | Choose a model that does |
| Asset cannot be found next session | Write-back skipped | Write to both the state file and the master table row, in the same action as the generation |
| Credit spend unexplained | No running total | Update the running spend on every generation |
| Unwanted motion everywhere in an animated still | Prompt said what moves, never what stays still | Specify the locked elements explicitly |
| Build count wrong after a scene was added | Counts go stale on any structural addition | Re-total the build list after every addition, per Bible 04 |
