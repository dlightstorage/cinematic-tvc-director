# Deliverables

Three outputs. Full templates and table schemas are in `templates-documents.md`; this file covers assembly order, the augmented schemas that hold generated assets, and the cross-document sync that keeps them from drifting apart.

## Build order

1. **Production package** first, even when the client presentation is what the user asked for. The presentation makes claims about the film, and a claim that the shot list cannot deliver is a promise you will have to walk back in the room.
2. **Client presentation** second, derived from the locked production package.
3. **AI generation package** last, after Stage 6 passes.

If the user only wants the presentation, still build enough of the production spine (concept, shot list, key crew decisions) to make its claims true. A treatment that promises what nothing can deliver is the failure mode Bible 14 names most sharply.

---

## 1. Client presentation

**Template:** `templates-documents.md`, Bible 14 section (treatment structure) as the content spine.
**Format:** a deck. If a DLight-branded presentation skill is available, use it rather than a generic one, so the output looks unmistakably like the agency's work. Otherwise use the standard pptx path.

**The one rule that governs every slide:** every slide must carry its own meaning without a presenter. A deck gets forwarded, read cold, and decided on in a meeting nobody from the agency attends. A slide that only makes sense when someone talks over it is a slide that fails at the moment it matters.

**Do not include presenter notes as the carrier of meaning.** If a point needs saying, it belongs on the slide.

Section order that works, adapted from the treatment structure:

| Slide group | Job |
|---|---|
| The problem | The real problem in the brief, stated so the client recognises it |
| The insight | The human truth, traceable to the research |
| The idea | The single-minded proposition, one line |
| Why it works | The argument, against the brief's own success measure |
| The film | Scene by scene, in prose a client can picture |
| Tone and world | Reference imagery, with the technical intent named |
| Craft | The visual language: format, lens logic, palette, movement |
| Sound and music | Intent, not a track list |
| The close | What the film ends on |
| Why us | Only if the brief is competitive |

On reference imagery: name the specific technical intent each reference carries. A client reads a reference more literally than a director intends, and an unlabelled mood image becomes a commitment you did not make.

---

## 2. Production package

Four documents. Templates in `templates-documents.md`.

| Document | Template source | Purpose |
|---|---|---|
| Director's treatment | Bible 14 section | The vision, in the director's voice, that the crew executes against |
| Shot list | Bible 15 section | What gets shot, in what order, with what |
| Crew bible | Bible 16 section | Cast table, Locations and Sets table, per-department entries |
| Production locks | Bible 17 section | The numbered non-negotiables |

### Augmented schemas: the asset columns

The base schemas in `templates-documents.md` predate generation. Add these columns so generated assets have a home. Without them, the write-back in `generation-runbook.md` has nowhere to land and assets orphan.

**Cast master table**, add:

| Column | Holds |
|---|---|
| `Reference still (URL / ID)` | The locked character look |
| `VO take (URL / ID)` | For the VO row, the approved read |
| `Asset status` | pending / generated / approved / superseded by [id] |

**Locations and Sets master table**, add:

| Column | Holds |
|---|---|
| `Reference still (URL / ID)` | The locked look for that zone |
| `Asset status` | pending / generated / approved / superseded by [id] |

**Shot list**, add:

| Column | Holds |
|---|---|
| `Key frame (URL / ID)` | The still this shot's motion is conditioned on |
| `Clip (URL / ID)` | The generated clip |
| `Start frame in (URL / ID)` | Which prior clip's last frame fed this shot, if chained |
| `SFX (URL / ID)` | Sound element synced to this shot |
| `Asset status` | pending / generated / approved / superseded by [id] |

The `Start frame in` column is what makes a chained sequence auditable. Extracting a clip's last frame to seed the next shot creates a dependency, and an unrecorded dependency means a mid-chain regeneration silently breaks everything after it with no way to trace where.

`Asset status` earns its column because "superseded by [id]" preserves the record that credits were spent and why the asset was replaced. Deleting the row loses both.

### The sync checklist

The treatment and the production bible are **parallel documents describing the same facts from different angles**. They drift out of sync exactly like duplicated prose does. After any change, run the 20-item sync checklist in `templates-documents.md` (Bible 14 section) across both.

The fields that appear in both and must agree: cast, wardrobe, locations, lenses, camera, palette, shot descriptions, timings. Updating one document and not the other is the most common way this package ships a contradiction.

---

## 3. AI generation package

One document, organised by shot, that a generation operator can execute from without reading anything else.

Structure:

```markdown
# AI Generation Package: [PROJECT]

**Generated against:** shot list version [x], locked [date]
**Stage 6 passed:** [date]
**Language(s):** [...]

## Global continuity plan
- Character identity locks: [which reference still or soul_id per character]
- Location identity locks: [which reference still per zone]
- Palette and look reference: [the still that defines the look]
- Audio-first or picture-first: [which, and therefore which models are eligible]
- Model family chosen, with the reason: [...]

## Asset manifest
[The full write-back table: every asset, its shot, its model, its status, its URL/ID]

## Per shot

### Shot [N]  -  [timecode]  -  [what it is]
- **Character(s) in frame:** [...]
- **Location / zone:** [...]
- **Lens / focal:** [...] (derived from locked format)
- **Duration:** [...]
- **Reference inputs and their roles:** start_image = [...] / image_references = [...] / audio_references = [...]
- **Model:** [...] because [...]
- **Resolution:** [...]
- **Prompt:**
  ```
  [the exact prompt text]
  ```
- **What must stay still:** [...]
- **Estimated credits:** [...]
- **Generated:** [URL / ID / date, or "pending approval"]

## VO package
[Per line: language, dialect, voice, register, the exact script text with punctuation as pacing, pronunciation notes, diacritics for Arabic]

## Music package
[Per cue: the master music brief, then this cue as a variation on it, duration, loop or one-shot, licensing model]

## SFX package
[Per element: one-shot or loop, exact duration, the frame it syncs to, layering notes]
```

Two things this structure enforces. **The reference-inputs line names the role, not just the file**, because `start_image` and `image_references` are different mechanisms and confusing them is a silent failure. **The "what must stay still" line is mandatory on motion prompts**, because an unspecified locked element is how you get unwanted animation everywhere.

For the VO package, the Arabic entries carry diacritics and a dialect note. Arabic script normally omits short vowels, which a fluent human reader resolves from context and a TTS model does not, so an undiacriticised script is an ambiguous pronunciation instruction. Bible 22 covers this and the separate MSA-versus-dialect problem.

For the music package, write **one master brief for the whole project first**, then generate each cue as a variation on that same written brief. Cues prompted independently from scratch produce a score that sounds disjointed, because nothing was holding the sonic palette together.

---

## Stage 6 applies to all three

Strip revision-history language before handing any of them over. "Per note," "revised," "audit catch," "Director's resolution #N" all belong in the development log, not in the deliverable. A crew member needs the current decision stated once, in the place they would look for it.

The stripping pass itself needs independent verification, because the most dangerous leftovers are the ones old enough that every previous audit already read past them without seeing them.
