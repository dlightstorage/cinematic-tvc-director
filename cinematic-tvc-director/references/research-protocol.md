# Research Protocol

When the concept needs knowledge you do not have, fire a research subagent and persist what it finds. Findings that live only in a chat transcript are lost to the next session and to every other department.

## When to fire research

Fire research when a creative or production decision depends on a fact about the real world that you cannot answer with confidence. Common cases:

| Trigger | What to research |
|---|---|
| The film is set in a specific country or market | Casting norms, what reads as authentic locally, physical casting conventions, on-camera performance register |
| Wardrobe must read as culturally specific | Garment conventions, what a real person in that role actually wears, regional and generational variation, what a costume-y version gets wrong |
| A location type must read as real | What that space actually looks like in that market, materials, layout, lighting conditions, the details that signal authenticity |
| VO is in a language or dialect with variation | Dialect norms, what an audience hears as native vs foreign, the specific pronunciation problems of that language for TTS |
| The brief names a product category you do not know | Category conventions, competitor visual language, what the category's advertising cliches are so the anti-brief can name them |
| A period or subculture is involved | Period-accurate detail across wardrobe, props, hair, colour, and what anachronisms are most commonly missed |
| A technical claim will be made on screen | Whether the claim is accurate, and what substantiation exists |

The general test: if a department is going to build a costed plan on top of an assumption, and you are guessing at that assumption, research it first. A wardrobe plan built on a guessed cultural convention is a plan that gets rejected at the fitting.

## How to fire it

One subagent per topic. Do not bundle unrelated topics into one agent, because the output has to be filed per topic and a bundled agent produces a document nobody can cite.

The brief must contain:

1. **The specific question**, narrow enough to be answerable. "What do mid-career creative professionals in [market] actually wear to work" beats "research wardrobe."
2. **Why it matters**, which department will use it and for what decision. This shapes what detail the agent prioritises.
3. **The instruction to do real research**, using WebSearch (load via ToolSearch if deferred) and web fetch, not to write from general knowledge alone.
4. **The output path**, an exact filename following the convention below.
5. **The sourcing standard**: tag claims as sourced vs general principle, cite inline, and flag anything unverified rather than smoothing it over. A confidently wrong research file is worse than an honest gap, because a department will build on it.
6. **The anti-cliche instruction**: alongside what is authentic, name what the stereotyped or stock-photo version of this looks like, so the creative work can avoid it deliberately.

Point 6 earns its place. Research that only describes the authentic version leaves the cliche undefined, and an undefined cliche is one you walk into.

## Filing convention

One topic per file. Store in the project's research folder:

```
<project>/research/<topic-slug>.md
```

Slugs describe the topic, not the department that asked: `cairo-office-wardrobe-conventions.md`, not `wardrobe-research-1.md`. The next project may need the same file, and departments other than the one that commissioned it will want to read it.

Every research file opens with:

```markdown
# [Topic]

**Researched:** [YYYY-MM-DD]
**Commissioned for:** [which decision, which department]
**Sourcing:** [how it was researched, what was verifiable, what was not]

## Summary
[The short answer, for someone who will not read the rest]

## Findings
[The detail, with inline attribution]

## What the cliche version looks like
[The stereotyped version to avoid deliberately]

## Open questions
[What could not be verified, and what would settle it]
```

## Register it in the state file

Add a row to the state file's research table: topic, file path, date, and which departments use it. Without that row, the file exists but nothing points at it, which is the research equivalent of an orphaned asset.

## Re-using and refreshing

**Before firing research, check the state file's research table and the research folder.** The answer may already exist from an earlier stage or an earlier project.

**Research goes stale differently by type.** Cultural and period findings are durable. Market, competitor, and pricing findings decay. If a research file is being relied on for a decision and its date is old enough to matter, say so rather than treating it as current.

## Research is not a gate

Research informs a decision, it does not make it. When the research returns, the decision it was commissioned for still fires as an AskUserQuestion gate, now with better options. Do not let a research finding silently become a locked decision, because the user never chose it.
