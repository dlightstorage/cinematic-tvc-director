# Cinematic TVC Director: Delegation Integration

Status: original planning record, superseded by the implementation described in
README.md. The video identified amElnagdy/delegate-skills; its pinned relays are
now bundled with a runnable Node terminal runtime. See
cinematic-tvc-director/references/upstream.md and VERIFICATION.md for current
implementation and verification status. Statements below about missing references
or nonexistent commands describe the earlier planning stage, not current status.

## Confirmed scope

Keep the package identity `cinematic-tvc-director`. Adapt the user's chosen
GitHub/video delegation system to commercial production using the supplied craft
library. The repository and video have not yet been identified; this document
records integration requirements, not a claim that the runtime is implemented.

The user chooses the provider and model for each role, including the orchestrator.
Support Codex, Claude, and additional providers through the reference system's
extension mechanism once inspected. Do not hardcode either provider as manager.
Keep planning/review model assignments separate from media-generation connectors.

## Imported source

Original archive: `D:/Ai/cinematic-tvc-director.skill`.
Working package: `cinematic-tvc-director/`.

The archive contains the skill entrypoint, a project-state template, evaluations,
operational references, and 26 full craft/audit bibles. There are no executable
scripts or provider adapters in the supplied archive. Its existing delegation
instructions depend on a host supplying subagent and question tools.

Treat the imported files as source material to adapt. Host-specific instructions,
tool names, model capability claims, and approval defaults must be reconciled with
the user's choices and the selected runtime before they become execution behavior.

## Role mapping

Paths below are relative to `cinematic-tvc-director/references/`.
These are responsibility boundaries, not a requirement to run every role for
every request. Preserve the ten-department blind pass when that workflow applies.

| Role | Primary source | Responsibility |
|---|---|---|
| Orchestrator / Director | `director-protocol.md`, `bibles/11-Director.md` | Route work, reconcile conflicts, record decisions within delegated authority |
| Creative brief and concept | `bibles/18-Creative-Brief-and-Concept.md` | Brief analysis, insight, proposition, concept and copy |
| Director of Photography | `bibles/01-Director-of-Photography.md` | Camera, lens, lighting and movement |
| Colorist | `bibles/02-Colorist.md` | Color pipeline and grading |
| Editor | `bibles/03-Editor.md` | Timing, pacing and edit construction |
| VFX and Motion Graphics | `bibles/04-VFX-and-Motion-Graphics.md` | Effects and graphic integration |
| Casting Director | `bibles/05-Casting-Director.md` | Casting and performance requirements |
| Costume and Wardrobe | `bibles/06-Costume-and-Wardrobe.md` | Clothing and wardrobe continuity |
| Makeup and Hair | `bibles/07-Makeup-and-Hair.md` | Appearance and look continuity |
| VO Casting and Voice Direction | `bibles/08-VO-Casting-and-Voice-Direction.md` | Voice casting, dialect and delivery |
| Production Design and Locations | `bibles/09-Production-Design-and-Locations.md` | Sets, locations, props and product presentation |
| Sound Design and Music | `bibles/10-Sound-Design-and-Music.md` | Sound and music direction |
| Script Supervisor | `continuity-audit.md`, `bibles/12-Script-Supervisor.md` | Independent continuity and dependency review |
| First AD / Line Producer | `logistics-audit.md`, `bibles/13-First-AD-and-Line-Producer.md` | Independent feasibility and logistics review |
| Treatment | `bibles/14-Directors-Treatment.md` | Director's treatment |
| Shot List and Storyboard | `bibles/15-Shot-List-and-Storyboard.md` | Shot IDs, framing, timing and visual sequence |
| Production Documentation | `bibles/16-Production-Bible-and-Master-Tables.md`, `bibles/17-Production-Locks-and-Decision-Records.md` | Master tables, locks and decision records |
| Image Prompting | `bibles/19-AI-Image-Generation-Prompts.md` | Still-image prompts and reference constraints |
| Text-to-Video Prompting | `bibles/20-AI-Text-to-Video-Generation-Prompts.md` | Video prompts |
| Sound Prompting | `bibles/21-AI-Text-to-Audio-Sound-Design-Prompts.md` | Sound-effect prompts |
| Voice Prompting | `bibles/22-AI-Arabic-and-English-VO-Generation-Prompts.md` | Arabic and English voice prompts |
| Image-to-Video Prompting | `bibles/23-AI-Image-to-Video-Generation-Prompts.md` | Motion conditioned on approved images |
| Music Prompting | `bibles/24-AI-Text-to-Music-Generation-Prompts.md` | Music-generation prompts |

Research is delegated as needed using `research-protocol.md`. Additional skills
should be attachable to relevant roles without replacing the shared craft library.

## Behavior to preserve in the runtime

1. Resume from saved project state and existing decisions.
2. Preserve the intake, draft, trace, fix, consolidate and handoff loop.
3. Give department workers the same versioned brief and approved locks, plus only
   their own role references. Keep initial department responses private from peers.
4. Wait for all required department results before director reconciliation.
   A failed or missing worker is not a clean result.
5. Classify tensions as real conflict, false alarm or new risk. Send actionable
   revisions to the affected roles and save their revised outputs.
6. Keep proposed decisions distinct from approved locks. Resolve within the user's
   configured authority; retain unresolved user decisions as pending work.
7. Track which shots, characters, locations, products and outputs depend on changed
   facts. Reopen affected work and audit dependent reasoning, including numerical
   camera/lens assumptions. A global tone change may invalidate all departments.
8. Keep script-supervisor and logistics handoff reviews independent. Revalidate
   gates against current inputs rather than inheriting stale approval.
9. Save generated asset identifiers and URLs against their actual master-table
   rows as well as the project asset index.

## Execution integration requirements

Inspect the reference repository before choosing a language, scheduler, task
schema, adapter API, packaging or terminal command structure. Reuse its actual
delegation and extension contracts wherever they support these requirements.

The integration needs persisted task inputs, outputs, status, model assignment,
attempt history and failures; bounded concurrency and retry behavior; restart
recovery; and explicit separation between worker proposals and project-state
updates. Restarting must not silently repeat completed media-generation requests.

Existing `_state/project-state.md` contains valuable production state. Decide how
the reference runtime stores structured state and exposes this human-readable view
without introducing competing sources of truth.

Provider configuration must identify execution through a CLI, API or supported
host integration. A provider name in a prompt does not establish an integration.
Keep credentials outside packaged project files. Verify live capabilities before
relying on the imported generation model matrix.

## Acceptance scenarios

- Assign different supported models to two departments and independently change
  the orchestrator assignment.
- Run a blind department batch with a deliberately conflicting pair of plans;
  verify reconciliation and targeted revision before locks are updated.
- Interrupt a run, resume it and recover completed results without losing pending
  tasks or treating failed workers as successful.
- Change a product or camera assumption and reopen affected shots and departments;
  retain unaffected outputs with recorded review verdicts.
- Keep a decision pending when it exceeds the configured director authority.
- Add a provider adapter and attach an extra skill to one role.
- Package and run the result locally through the reference system's terminal flow.

No live provider calls, generated assets or runtime validation have occurred yet.

## Implementation plan

The user's clarification confirms a complete installable terminal application and
GitHub repository, including source code and installation scripts. A standalone
chat skill is insufficient. Codex, Claude Code and Antigravity are explicit
integration targets. This is the implementation plan; the commands below are
proposed product commands and do not exist yet.

### 1. Reference comparison and repository

Identify the video/repository to compare actual installation, delegation, planning
and configuration behavior. Record which features are inherited and which are
commercial-production extensions. The supplied conversation URL has not yielded
an identified upstream repository or video.

Prepare a GitHub repository named `cinematic-tvc-director`, with installation
instructions, runnable examples, tests and a release package. Resolve the owning
GitHub account and repository visibility before remote creation. Preserve original
source attribution and any upstream license obligations when reusing code.

Provisional implementation choice for a standalone build: TypeScript with a Node
CLI, schema-validated configuration and local SQLite state, with Markdown exports
for readable project documents. Reconcile this choice with the reference code
before implementation to avoid an unnecessary rewrite.

### 2. Installation and provider setup

Build PowerShell and POSIX installation entrypoints around the packaged CLI.
Use a terminal setup wizard to detect installed tools, let the user select which
integrations to enable/install, run supported vendor installation flows for the
selected tools, and report authentication or version problems through `doctor`.
Support Windows first, then verify macOS and Linux installation in CI.

Keep tool selection separate from model selection. Hosted models are selected
through their provider; they are not downloaded when installing the CLI. Discover
available models when the provider offers that capability, permit explicit model
IDs otherwise, and validate access before launching a production run.

### 3. Provider adapters

Use a shared adapter contract for capability checks, invocation, normalized events,
results, cancellation, errors, usage metadata and explicit session resumption.
Never use a global "most recent session" for concurrent role runs.

| Initial adapter | Verified integration basis | Implementation verification |
|---|---|---|
| Codex CLI | `codex exec`, non-interactive structured output | Check installed flags, event decoding and session handling |
| Claude Code CLI | `claude -p --output-format json` | Parse result/error envelopes and explicit session IDs |
| Antigravity CLI | `agy -p --output-format json` | Parse status/response and explicit conversation IDs |
| Custom provider | User-specified executable argument array or an implemented API adapter | Require capability declaration and an adapter conformance check |

Add API/local-model adapters as concrete integrations, not a blanket promise that
every model supports tools, media or orchestration. An orchestration assignment
must support the structured planning contract, with validation and bounded repair.

### 4. Crew and orchestration

Create role definitions pointing to the existing source library. Configure each
role's adapter, model, reasoning options where supported, and attached skills.
Allow one provider for the whole crew or mixed providers. Let the user separately
select the orchestrator and its decision authority.

Implement brief intake, a reviewable execution plan, dependency scheduling,
isolated worker contexts, blind department batches, director reconciliation,
targeted revisions and independent final review. Workers write proposals into
task-local outputs; the coordinator validates and incorporates them into state.

Expose pending user decisions with their affected tasks. Continue unrelated ready
work while waiting. Save configuration and input snapshots for every attempt so
changes to model assignments do not alter the provenance of completed work.

### 5. Persistent project state

Store projects, tasks, attempts, role assignments, decisions, locks, entities,
artifacts, dependency edges, reviews and provider session IDs locally. Use atomic
state transitions and explicit task ownership to avoid duplicate dispatch.

Keep production documents and generated artifacts as accessible project files.
Create change-impact records before scheduling revisions. Preserve the supplied
stage loop and state template through import/export, with one authoritative state
store and derived readable reports.

### 6. Terminal experience and commercial outputs

Proposed command surface:

```text
tvc setup
tvc doctor
tvc providers list
tvc models list --provider codex
tvc crew configure
tvc skills attach <role> <skill-path>
tvc init <project>
tvc plan --brief <brief-file>
tvc run
tvc status
tvc decisions
tvc resume
tvc change --entity <entity-id> --from <change-file>
tvc export --format production
```

Show live task status, role/model assignment, failures and pending decisions.
Permit Arabic briefs and output alongside English. Deliver the concept, treatment,
shot list, department plans, master tables, production locks, review reports and
generation prompt package as actual files. Implement separate media connectors
with asset write-back when generation is configured and authorized.

### 7. Validation and release

Validate scheduling, failure recovery, selective invalidation, decision authority,
adapter output parsing and isolation using deterministic process fixtures. Follow
with authenticated smoke runs for each configured real provider; report unavailable
providers as untested rather than treating fixtures as evidence of live support.

Run an end-to-end fictional commercial through planning, delegation, conflict
resolution and review, then change its product or camera and verify targeted
re-entry. Test installation from the built release artifact in a clean environment.
Publish the tested source and installation instructions to the resolved GitHub
repository, without project credentials or private campaign artifacts.

## Verified integration references

Checked 2026-09-06. These document possible integration mechanisms; local provider
installation, account access and actual invocation remain untested.

- [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- [Claude Code programmatic execution](https://code.claude.com/docs/en/headless)
- [Antigravity headless mode](https://antigravity.google/docs/cli/headless/)

## Current delivery status

- Imported all 40 source files and verified their SHA-256 values against the archive.
- Read the skill entrypoint, crew protocol, state template and existing evaluations;
  mapped the full library by responsibility. The full craft corpus has not yet
  undergone a line-by-line audit.
- Prepared this integration design and phased implementation plan.
- No runtime, installer, GitHub remote or published package exists yet.
- Exact reference parity needs the missing video or upstream repository link.
