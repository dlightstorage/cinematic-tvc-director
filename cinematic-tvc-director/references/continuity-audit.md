# Continuity Audit (Stage 3 trace gate and Stage 6 negative-brief gate)

*Extracted from the gate-role craft bibles as executable procedure. Full craft reasoning behind every step is in `bibles/11-Director.md`, `bibles/12-Script-Supervisor.md`, `bibles/13-First-AD-and-Line-Producer.md`.*

# PART 2: SCRIPT SUPERVISOR (source 12-Script-Supervisor.md)

---

## 2.1 THE CONTINUITY AUDIT PROTOCOL (source B2)

Run in this order. DO NOT skip Step 0. DO NOT collapse Steps 3 and 4.

### STEP 0. Build the register
Before reading for meaning, read for inventory. Produce four lists.
- **Locked rules.** Every statement that constrains something. Record the exact wording, the location, and the quantifier used.
- **Counts and ranges.** Every number that totals something or bounds something. Record the number, its location, and what it is counting.
- **Cross-referenced entities.** Every entity that appears in more than one place. Record every location.
- **Premise facts.** Every fact that other reasoning visibly depends on. Record the fact, and record where the dependent reasoning lives.

This register is the lined script. Everything after this step reads from it.

### STEP 1. Establish the change set
1. Identify what has been added, removed, renamed or changed since the previous stable version.
2. If there is no previous version, treat the whole document as the change set and note that the audit is a FULL PASS rather than a DELTA PASS.
3. For each change record two things: the change itself, and the date or POSITION of the change relative to the rest of the document. Relative position tells you which rules predate the change and are therefore candidates for silent breakage.

### STEP 2. Trace each locked rule forward
For every rule in the register ask: **what exists in this document now that did not exist when this rule was written, and does any of it fall inside the rule's domain?**

- This is the highest-yield step in the entire protocol.
- Work rule by rule. For each rule ENUMERATE THE MEMBERS OF ITS DOMAIN FROM THE CURRENT DOCUMENT, not from the rule's own examples. A rule that says "all six of these use treatment X" is checked by counting the current members, not by rereading the six.
- Record for each rule: domain members found, whether each complies, and whether the rule's quantifier is still accurate.

### STEP 3. Trace each premise fact backward and forward
For every premise fact run both directions.
- **Backward:** where did this fact come from, and is the source still stating it that way?
- **Forward:** what reasoning, calculation, description or decision depends on this fact, and does that reasoning still hold?

**Critically: DO NOT search for the fact's vocabulary. Search for the reasoning that used it.** The dependent reasoning almost never repeats the fact's words. Ask "what would somebody have written because of this fact?" and hunt that.

### STEP 4. Re-total every count
1. For each count and range in the register, RE-DERIVE it from the current items. Never verify a count by reading it. Verify it by counting.
2. Then find every other location where that count or range is restated: introductions, summaries, headings, tables of contents, captions, prose, and any arithmetic downstream of it. Each of those is a SEPARATE finding if wrong.
3. For ranges, additionally check every reference to any individual number inside the range.

### STEP 5. Table against table
1. List every table in the document set.
2. For each pair of tables that mentions the same entity class, compare row by row.
3. Check specifically:
   - Does every entity in table A appear in table B where it should?
   - Do the attributes agree where both tables state the same attribute?
   - Do the row counts agree with each other and with any stated total?
   - Has anything been added to one table and not the other?

Tables are where drift is most detectable and least detected, because a table looks authoritative and rarely gets reread once written.

### STEP 6. Shown against named, both directions
Build two lists from the document set:
- Everything that is NAMED OR DESCRIBED in prose, rules, captions and headings.
- Everything that EXISTS in the actual inventory: the shot list, the asset list, the item schedule, the deliverable list.

Then run:
- **Named but not shown.** Report every reference with nothing behind it.
- **Shown but not named.** Report every item that no rule, description or count governs.

(Orphans are usually worse. A named-but-missing item announces itself as a gap. A shown-but-unnamed item is silently outside every rule in the document, including the rules that should have governed it.)

### STEP 7. Chronology and knowledge
- Assign every scene or section to a story day. Report any that cannot be assigned.
- Check that anything progressive moves in ONE DIRECTION ONLY: damage, deterioration, weather, time of day, accumulated knowledge.
- For every piece of information a character or reader is shown to possess, locate where they acquired it. Report anything known before it is learned.

### STEP 8. Spatial and relational
- For each pairing or relationship, check BOTH halves. Additions on one side of a mapping frequently leave the other side incomplete.
- For anything with a direction, a side, an order or a hierarchy, check that it is consistent everywhere it is stated.
- Look for the EYELINE CASE: two statements that are individually correct and jointly impossible.

### STEP 9. Report with exact locations
Every finding gets a precise location: section, heading, table name, row, and the exact quoted wording. A finding without a location is not a finding, it is an impression, and the person receiving it has to redo the search you already did.

### Severity ranking to apply throughout
Rank findings: LOGICAL first, then TEMPORAL, then SPATIAL, then PHYSICAL. An auditor who reports every deviation at the same severity is reporting noise.
- Physical errors are noticed. Logical errors are believed.

---

## 2.2 THE TWO GATE TYPES (source B3)

There are exactly two audit modes. Using the wrong one wastes the pass.

### GATE 1: THE BACKWARD AND FORWARD TRACE GATE

- **WHEN:** After any single change, EVERY TIME, WITHOUT EXCEPTION.
- **WHAT IT IS:** Take the one thing that changed. Trace it backward to its source and forward to everything that depends on it. Re-total anything the change touched. Check the change against every rule whose domain it might now be inside.
- **SCOPE:** Narrow in origin, wide in reach. One change, but you follow it as far as it goes.
- **WHY EVERY TIME:** The cost of a single change is never local. This gate exists to prevent the described-versus-premise failure.

Execution steps:
1. Name the change precisely (old value, new value, location).
2. Trace BACKWARD: where did this fact come from, is the source still stating it that way?
3. Trace FORWARD: what reasoning, calculation, description or decision depended on it? Hunt the reasoning, not the vocabulary.
4. Re-total every count or range the change touched.
5. Check the changed item against every rule whose domain it may now be inside.
6. Record the trace even when clean.

### GATE 2: THE NARROW NEGATIVE-BRIEF GATE

- **WHEN:** The document is long, mostly correct, and a specific rule or vocabulary has been superseded.
- **WHAT IT IS:** The auditor is given two things explicitly:
  - The exact OLD vocabulary, values, phrasings or patterns to hunt for.
  - The exact NEW rule those instances must now satisfy.
  The auditor then searches ONLY for the old, and evaluates every hit against the new.
- **WHY IT BEATS "review this document":** A general review of a mostly-correct long document produces a low signal-to-noise ratio, because attention is spread evenly across text that is almost entirely fine. Attention is a budget. A general brief spends it uniformly. A negative brief spends all of it on the places where an error is actually likely.

**HOW TO CONSTRUCT A NEGATIVE BRIEF (exact form):**

```
Hunt for: [exact old term, value, pattern, or phrasing]
Every instance must now satisfy: [exact new rule]
Search these locations: [document set, including appendices, captions, headings, tables of contents]
For each hit, report: location, current wording, whether it complies, and the required correction.
Report the total number of hits found, including the ones that already comply.
```

The last line is mandatory: the count of COMPLIANT hits is what proves the search actually ran.

### Choosing between the gates
- Gate 1 is MANDATORY and REACTIVE, triggered by change.
- Gate 2 is TARGETED and PROACTIVE, triggered by a known superseded rule.
- A mature process runs Gate 1 after every edit, and Gate 2 whenever a RULE changes rather than a FACT.

---

## 2.3 PREMISE vs DESCRIPTION (source A8.1)

Every fact in a document set has two possible roles.

- **DESCRIBED:** the document states the fact. "The hero wears a red coat." "There are six locations." "The palette is warm."
- **PREMISE:** other reasoning in the document depends on the fact being true. "Because the coat is red, the crowd is desaturated so she reads in the wide." "Because there are six locations, the schedule is six days." "Because the palette is warm, the night exterior uses sodium sources."

The description is one sentence. The premises can be scattered across a dozen sections written by different people at different times.

**THE MOST COMMON AND MOST DANGEROUS DOCUMENT ERROR IS CHANGING THE DESCRIPTION WITHOUT UPDATING THE REASONING BUILT ON IT.** The coat becomes blue. Someone updates the wardrobe section, because that is the section that obviously mentions the coat. Nobody updates the cinematography note about desaturating the crowd, because that note never says the word "coat," it says "so she reads in the wide." The document is now internally incoherent, and incoherent in a way that reads fine section by section. Both halves are individually well written. Only the relationship is broken. This is the eyeline error exactly: neither shot is wrong, the pair is wrong.

**OPERATIONAL RULE: when any fact changes, do not search for the fact. Search for the reasoning that depended on it.** Searching for "coat" finds the description. Finding the premises requires asking "what did this fact justify?" and then hunting the justifications, which will use entirely different vocabulary.

### Companion rule: a rule written early can silently stop being true (A8.2)
A rule written on page four, when the document contained twelve things, may be broken by a thirteenth thing added on page thirty. Nobody made a mistake. The rule was correct when written. The addition is correct in itself. The document is now wrong. Both halves pass inspection individually; the error lives in the intersection, and the intersection is not written down anywhere.

Shapes to hunt:
- A rule says "every item in this category uses treatment X." A later section adds an item to that category that cannot take treatment X.
- A rule says "the only exception is Y." A later section creates a second thing that is functionally an exception but is never called one.
- A rule says "these are always paired." A later addition introduces an unpaired instance.
- A rule says "there is never more than one per section." A later addition puts two in one section.

**The hunt is not "is this rule correct?" The hunt is "what has been added since this rule was written, and does any of it touch the rule's domain?"**

---

## 2.4 THE STALE-COUNT RULE (source A10)

A count is a fact with an expiry date that nobody writes down. It is true at the instant it is written and becomes false the moment anything is added or removed anywhere in the document. The count is almost never near the addition.

**Kinds of counts that go stale:**
- A headcount
- A build count
- A location count
- A shot range
- An item total
- A page total
- A day total
- Any range expressed as "X through Y"
- Any downstream arithmetic that multiplies or divides by a total

**RULES:**
1. **Every structural addition or deletion mandates a RE-TOTAL.** Not a check that the count "still seems right." A re-count from the actual items.
2. **Re-total every place the count appears, not just the primary one.** Introductions, summaries, headings, tables of contents, captions, downstream arithmetic, and any range expressed as "X through Y."
3. **Ranges are worse than counts.** Adding an item mid-sequence breaks the range and renumbers everything after it, and every reference to any of those numbers is now wrong.
4. **Counts stated in prose are the ones that get missed.** A number in a table is visibly data. A number in a sentence looks like writing.
5. **If a count cannot be re-derived from the document itself, it is not a count, it is a claim. Flag it.**

---

## 2.5 THE "CHECKED, NO CHANGE NEEDED, HERE IS WHY" REPORTING REQUIREMENT (source B4)

**A report that lists only what changed is indistinguishable from a report by somebody who forgot to check the rest.**

The reader cannot tell the difference between:
- "I checked sections four, seven and eleven, and they were fine, so I said nothing."
- "I never opened sections four, seven and eleven."

Both produce the same document. Both produce silence. Only one of them is work.

**OPERATIONAL REQUIREMENT: every continuity audit report contains an explicit CHECKED AND CLEAN section, listing every entity, rule and count that was traced, the locations traced, and the REASON it was found to be correct.**

The reason cannot be reduced to a tick.
- "Checked" is a claim.
- "Checked: the count of nine in the introduction was re-derived by counting the rows in the schedule table, which returned nine" is evidence. The second can be audited. The first cannot.

Three further benefits:
1. It exposes coverage gaps. An entity on neither the findings list nor the clean list was not checked, and that becomes visible immediately.
2. It prevents rework. The next auditor knows what has already been traced and how.
3. It disciplines the auditor. Knowing you will have to write down what you checked and why changes how you check.

Related obligation: record the note about the PROBLEM, including consciously accepted mismatches. "This section and that section disagree, the disagreement was raised, and the decision was to keep both because X." Without that note, the next reader finds the contradiction and reopens a settled question.

---

## 2.6 CONTINUITY AUDIT REPORT TEMPLATE (source B7)

```
# CONTINUITY AUDIT REPORT

## 0. SCOPE
Documents audited (with version identifiers):
Audit type: [full pass | delta pass | negative-brief pass]
Change set audited: [what changed since last stable version, or "full document"]
Deliverables covered:
Date:

## 1. HEADLINE
[One paragraph. The number of findings by severity, and the single
finding that most needs a decision.]

## 2. FINDINGS BY SEVERITY

### 2.1 LOGICAL (a contradiction, or something known before it is learned)
| # | Finding | Location A (exact) | Location B (exact) | Why it is a contradiction | Required decision |
|---|---|---|---|---|---|

### 2.2 TEMPORAL (story day, order, progression, elapsed time)
| # | Finding | Location | Expected | Found | Required decision |
|---|---|---|---|---|---|

### 2.3 SPATIAL / RELATIONAL (direction, pairing, mapping, geography, hierarchy)
| # | Finding | Location A | Location B | Conflict | Required decision |
|---|---|---|---|---|---|

### 2.4 SPECIFICATION / PHYSICAL (values, counts, names, colours, materials)
| # | Finding | Location | Stated | Should be | Required decision |
|---|---|---|---|---|---|

## 3. BROKEN-BY-ADDITION FINDINGS
[Rules that were correct when written and are no longer true because
something was added later. Each entry names the rule, its location,
the addition, its location, and the exact way they collide.]
| # | Rule (quoted) | Rule location | Later addition | Addition location | How it breaks |
|---|---|---|---|---|---|

## 4. STALE COUNTS AND RANGES
| # | Count / range | Stated as | Re-derived as | Every location where it is restated | Status |
|---|---|---|---|---|---|

## 5. NAMED BUT NOT SHOWN
| # | Named item | Where named | Missing from |
|---|---|---|---|

## 6. SHOWN BUT NOT NAMED
| # | Item that exists | Where it exists | Governed by no rule / referenced nowhere |
|---|---|---|---|

## 7. CHECKED AND CLEAN
[Mandatory. Every entity, rule and count that was traced and found
correct, with the locations traced and the reason it is correct.
A report without this section is incomplete.]
| # | Entity / rule / count | Locations traced | Why it is correct |
|---|---|---|---|

## 8. NOT CHECKED, AND WHY
[Anything in scope that was not traced, and the reason: out of scope,
blocked on a missing document, or awaiting a decision. Never leave
this section empty by omission.]

## 9. UNRESOLVED DECISIONS AWAITING THE OWNER
[Findings that are not errors but choices. State the options and the
consequence of each, and do not choose.]

## 10. UNDER-SPECIFICATION FLAGS
[Places where the document cannot be audited because it does not say
enough. What is missing and what it blocks.]

## 11. ASSUMPTIONS MADE
[Every place the audit had to assume an intent. Each one is a question
for the owner.]
```

---

## 2.7 SCRIPT SUPERVISOR TRIGGER TABLE (source B8)

Each row states the change and the specific things it forces you to re-check. Re-checking anything not on the list is optional. Re-checking everything on the list is not.

| Change | Forces re-check of |
|---|---|
| **An item is added to any enumerable category** | Every total for that category, every range covering it, every "all / every / always" rule whose domain now includes it, every table listing the category, every downstream calculation using the total, the table of contents, and any summary |
| **An item is removed** | The same list, plus every cross-reference pointing to the removed item, plus every pairing that item was half of |
| **An item is renamed** | Every mention of the old name including captions, headings, file names, table rows and prose; plus every rule that referenced it by name; plus any alphabetical or logical ordering it participated in |
| **A rule is changed or replaced** | Every existing member of that rule's domain against the new rule; every place the old rule is restated or paraphrased; every exception previously carved out of the old rule; every example that illustrated the old rule. Run a negative-brief gate with the old vocabulary |
| **A value, colour, size, material or technical spec is changed** | The description itself, and separately every piece of reasoning that used the old value as a premise. Search for the consequence, not the value |
| **A section is inserted or reordered** | Every numbered reference after the insertion point, every range, every "see section X" pointer, the table of contents, and any narrative that depends on order |
| **Anything is renumbered** | Every reference to every affected number, everywhere, including inside other tables |
| **A date, duration or runtime changes** | Every schedule derived from it, every downstream date, every "X days before Y" expression, and the total |
| **A person, character or role is added or removed** | Headcount, every table listing people, every assignment or ownership mapping, every scene or section they appear in, every rule about who does what, and any "all of the above" statement |
| **A location is added or removed** | Location count, schedule, any geography or travel logic, every scene assigned to it, and any rule scoped by location |
| **Two documents are merged** | Every entity that appears in both, every rule that appears in both with different wording, every count, and precedence between the two |
| **A deliverable or version is added** | The whole audit, run again for that deliverable. Do not assume a pass on the hero version covers the variants |
| **A previously flagged finding is fixed** | The fix itself, plus everything the original error had already propagated into, plus whether the fix introduced a new collision |
| **A decision is reversed** | Every change that was made because of the original decision, tracked backward. Reversals are the most under-traced change type of all |
| **Any external constraint changes (legal, platform, regulatory, client)** | Every element governed by the constraint in every deliverable, plus any claim or statement that depended on the old constraint |
| **Time passes and nothing changes** | Nothing. Absence of change is not a trigger. This row exists to make the point that the trigger list is exhaustive and finite, and that an audit run without a trigger is a Gate 2 pass with no brief, which is the least productive thing this role can do |

---
---


---

# CROSS-ROLE SUMMARY OF THE THREE SHARED LAWS

1. **Coverage must be recorded, not just findings.** Director: Section 3 NO-CHANGE CONFIRMATIONS. Script Supervisor: Section 7 CHECKED AND CLEAN plus Section 8 NOT CHECKED AND WHY. Both state the same epistemic rule: a record containing only changes is indistinguishable from a record produced by somebody who only examined what they changed.
2. **Re-derive, do not relabel; re-total, do not adjust.** Director rule 1.5 and 1st AD staleness law 3.2 are the same law applied to technique and to quantity.
3. **Hunt the reasoning, not the vocabulary.** Script Supervisor premise-versus-description rule 2.3, Director NEW RISK class 1.2 Step 3, and 1st AD hidden-cost table 3.3 are three instances of the same search discipline: the consequence of a fact is never written in the fact's own words.

---

## STANDARD TESTS (mandatory section of every audit report)

Continuity and craft standard are different questions. A document can be perfectly self-consistent and still be anonymous work, so this section is a required part of the report, not an optional extra. Append it after the CHECKED AND CLEAN and NOT CHECKED sections and give every test an explicit verdict with evidence.

| Test | Fails when | Verdict format |
|---|---|---|
| **Specificity** | A creative choice is stated as a category rather than a decision. "Warm lighting", "an emotional score", "a relatable cast", "generic dressing" are all categories | PASS with the 3 most specific choices quoted, or FAIL naming every category still standing in for a decision, with its file and line |
| **Attribution** | A craft choice cannot be traced to a practitioner, a technique, or a stated reason | PASS with examples, or FAIL listing each unattributed choice |
| **Anti-cliche** | The execution is the first thing anyone would think of for this brief, and the anti-brief does not explicitly rule it out | PASS naming the cliche and what this does instead, or FAIL |
| **Traceability** | A final line of copy, or a shot's existence, cannot be walked backward to the insight or proposition it serves | PASS with one worked backward walk, or FAIL naming the broken chain |

A verdict of PASS with no evidence is not a verdict. The same discipline that makes "checked, no change needed, here is why" a real audit outcome applies here: a bare PASS is indistinguishable from a test that was skipped.

If a test fails, the document goes to Stage 4 even when continuity is clean. Consistent-but-anonymous is a failure state, it is just a quieter one than a contradiction.
