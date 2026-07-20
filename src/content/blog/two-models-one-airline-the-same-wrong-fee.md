# Fluent Is Not the Same as Correct

### Stress-testing a proof-carrying verification architecture on a benchmark we didn't build, a domain we didn't design it for, and two frontier Claude models that land on the identical wrong dollar figure.

*Boundless Intuition Research*

---

Thomas is flying First Class from Montreal to Portland with ten checked bags. Apply the airline's own published fee schedule to his itinerary, in full, and the total is $3,445. Hand a frontier language model the same published rules, in full, and ask it to compute the same total, and it answers $3,185. Hand the identical question, the identical rules, to a second, newer, more capable model from the same lab, and it also answers $3,185.

Two different models. One wrong number, shared exactly. That agreement is the finding this post is built around. When we set out to test our verification architecture on a domain we did not design it for, we expected some rate of unaided error — models make mistakes. We did not expect the mistakes to be *the same* mistake, down to the dollar, on the majority of cases both models got wrong. That is not the signature of noise. It is the signature of a rule that both models are misreading in the same specific way.

This is a follow-on to our earlier work formalizing clinical diagnostic criteria in Lean 4[^1]. That project showed the architecture works on rules we chose, in a domain we understood deeply, against a benchmark we built ourselves. This one asks a less comfortable question: does it survive contact with a benchmark somebody else designed, ground truth we did not author, ninety-five rules across a real airline's actual fee schedule, and the newest models Anthropic has shipped? We think the honest answer, laid out below with the numbers that support it, is yes — and the way it fails is at least as informative as the way it succeeds.

## Measuring the case, not the average

Start with a distinction that shapes everything downstream, because it is easy to blur and the whole architecture depends on keeping it sharp.

A benchmark score is a statement about a sample. Run a model over a hundred problems, count how many it gets right, and you have learned something true and useful about the model *in aggregate* — but nothing at all about the one problem a real customer is asking about right now. Evaluation, in this sense, measures the average.

Verification asks a narrower, more useful question of a single case: does *this* conclusion follow from *these* rules, applied to *these* facts, without a gap? A deterministic program can answer that question the same way every time, for any one case, independent of whatever the aggregate accuracy across a thousand other cases happens to be. That is the property we are actually after — not a higher score, but a guarantee that travels with the individual answer.

The architecture we test below is the same one we've used before: a language model reads unstructured input and proposes a structured set of facts — nothing more — and a small, independently checkable program takes those facts and derives the answer. The model's only job is reading. The deciding is done by code a domain expert can open and read line by line.

## Borrowing a harder exam

A benchmark and a verification kernel built by the same team, at the same time, will tend to agree with each other — that's true regardless of domain, and it's a fair objection to any hand-built test. We wanted a test we couldn't be accused of having set up to pass: a benchmark we did not write, with ground truth we did not compute ourselves.

So we went looking for a benchmark we had no hand in: independently authored, independently graded, and hard enough that published results already showed frontier models struggling with it. We settled on **RuleArena**[^2], a 2025 benchmark purpose-built to probe exactly this failure mode — language models applying real-world rules that *read* like simple lookups but are quietly procedural. RuleArena spans three domains — airline baggage fees, NBA transaction legality, and tax — each graded by the benchmark's own reference implementation rather than by a human rater. We chose the airline domain specifically because that reference implementation is executable: a Python program we could run ourselves, case by case, to check our own re-encoding of the rules against an authority we did not write.

We took the 100 hardest problems in that domain — RuleArena's own "Level 3" tier — and ran them against `claude-opus-4-8` and `claude-fable-5`, Anthropic's current frontier and most-capable models, unaided, with the airline's actual published fee rules supplied as the system prompt. Then we built an extractor-plus-kernel architecture in Catala — a language model that only reads, a deterministic program that only decides — and ran the same 100 cases through it.

<details>
<summary>Why RuleArena and not another benchmark we checked</summary>

Before settling on RuleArena, we tested SARA, the Statutory Reasoning Assessment built from the US Internal Revenue Code — a well-cited, rigorously constructed benchmark. Run against current frontier models with a properly structured evaluation, it turned out to be close to saturated: 99 of 100 numeric cases correct for Opus 4.8, 100 of 100 for Fable 5. A saturated benchmark can't demonstrate what a verification layer buys you, because there's no unaided error left to fix. We report this rather than quietly dropping it, because a benchmark choice that isn't defensible on its own terms undercuts everything measured afterward.

</details>

## The clause that turns a table into an optimization

The published fee policy reads like a spreadsheet: a base fee by bag position — first, second, third, and beyond — that varies by route and cabin class; a surcharge if a bag is oversized; a surcharge if it's overweight; and, for some route-and-class combinations, the first bag or two are complimentary. Read left to right, bag by bag, and you'd apply it exactly the way you'd fill in a spreadsheet.

The airline's own reference computation does something the table never states outright. When a passenger's route and class entitle them to, say, two complimentary bag slots, the airline does not hand that complimentary status to whichever two bags happen to be listed first on the itinerary. It assigns the free slots to whichever bags would otherwise have cost the *most* in oversize and overweight surcharges — a small combinatorial optimization, minimizing the passenger's total, sitting quietly underneath a policy that reads like plain data entry. It is exactly the kind of clause a fluent reader glides past, because nothing about the table's formatting flags it as a decision rather than a fact.

## A translator, not a judge

The design places a hard boundary between the one probabilistic step and everything after it.

![Figure 1: the verification pipeline, from RuleArena's rules to a published result](figures/pipeline_architecture.png)

*Figure 1. RuleArena's rules and its own reference script are the ground truth we build against. The Catala kernel is hand-written from the rules text and checked against that reference script on all 100 cases before being trusted for anything downstream. Every number in this post is generated directly from one logged experiment run — nothing here is hand-recomputed.*

A language model reads a passenger's itinerary — the fare, the cabin class, the route, and the size and weight of every checked bag — and extracts those facts as a structured record. It does not total a fee, and it is told explicitly not to. A Catala program takes that record and derives the total: the base fee owed at each bag position, every oversize and overweight surcharge, and the free-slot assignment, computed as an actual optimization rather than assumed to fall on the first N bags.

That optimization is three lines:

```catala
declaration insert_top3
  content Top3
  depends on acc content Top3, x content money
  equals
    if x > acc.v1 then Top3 { -- v1: x -- v2: acc.v1 -- v3: acc.v2 }
    else if x > acc.v2 then Top3 { -- v1: acc.v1 -- v2: x -- v3: acc.v2 }
    else if x > acc.v3 then Top3 { -- v1: acc.v1 -- v2: acc.v2 -- v3: x }
    else acc
```

`Top3` tracks the three largest surcharges seen so far as the kernel folds over a passenger's bags; folding it to the end yields exactly the bags that should receive the complimentary slots, because this fee schedule never grants more than three. It's a bounded insertion rather than a call to a sort function, because Catala's list primitives don't include one — the constraint that a proof-checkable language keeps its primitives small is a feature, not a limitation, here. We validated this re-encoding the only way that means anything: running it against RuleArena's own reference script on all 100 cases before trusting a single number it produced.

## What we measured

Three tiers, each run once unaided and once behind the kernel, over the same 100 cases.

| | Claude Opus 4.8 | Claude Fable 5 |
|---|---|---|
| Unaided, full rules supplied | 54 / 100 correct | 61 / 100 correct |
| Behind the kernel | 100 / 100 correct | 100 / 100 correct |
| Cost per full run | $18.08 → $1.32 | $16.92 → $3.63 |
| Time per case | 68.1s → 6.1s | 25.9s → 11.3s |

![Figure 2: accuracy by arm, all three model tiers](figures/accuracy_by_arm.png)

*Figure 2. Unaided accuracy sits well under perfect for both frontier tiers; every kernel-backed arm reaches it, with one informative exception discussed below.*

Both frontier models fail this benchmark unaided at a rate that isn't close to zero — 46 of 100 cases for Opus 4.8, 39 of 100 for Fable 5 — even with the complete published rules in front of them and an explicit sentence telling them the free-slot assignment is a choice, not a default. This wasn't a case of the models lacking information. The kernel, reading the identical facts, is exact on all 100.

![Figure 3: cost against accuracy, log scale](figures/cost_accuracy_pareto.png)

*Figure 3. The kernel-backed systems win on accuracy and cost at the same time here — there's no tradeoff to negotiate.*

![Figure 4: latency by arm](figures/latency_by_arm.png)

*Figure 4. The unaided models spend tens of seconds reasoning through the bag-assignment problem in natural language; extraction is fast regardless of how hard that underlying optimization is, because the kernel — not the model — solves it, in milliseconds.*

<details>
<summary>The full nine-arm table, including the cheap tier and the self-consistency variant</summary>

| Arm | Accuracy | LLM time/case | Cost/run | Cost/correct answer |
|---|---|---|---|---|
| Opus 4.8, unaided | 54.0% | 68.08s | $18.08 | $0.335 |
| Opus 4.8, verified | 100.0% | 3.32s + 2.78s kernel | $1.32 | $0.013 |
| Opus 4.8, verified + self-consistency loop | 100.0% | 10.67s | $4.44 | $0.044 |
| Fable 5, unaided | 61.0% | 25.91s | $16.92 | $0.277 |
| Fable 5, verified | 100.0% | 7.59s + 3.75s kernel | $3.63 | $0.036 |
| Fable 5, verified + self-consistency loop | 100.0% | 22.52s | $11.44 | $0.114 |
| Haiku 4.5, unaided | 3.0% | 23.75s | $2.05 | $0.682 |
| Haiku 4.5, verified | 82.0% | 1.92s + 3.63s kernel | $0.22 | $0.003 |
| Haiku 4.5, verified + self-consistency loop | 85.0% | 6.12s | $1.10 | $0.013 |

The cheap tier is the honest exception to a clean story: Haiku 4.5 nearly fails outright unaided, and behind the kernel it reaches 82–85%, not 100. Every one of those residual misses is an extraction error — a misread bag weight, one bag dropped from a list of ten — not a kernel failure. That's the correct way to read a verification system's limits: the kernel is exact by construction whenever the facts it receives are correct, so the only place risk still lives is a narrow, measurable reading step, not an open-ended reasoning one.

</details>

## The wrong number that wouldn't average away

The first time we ran this benchmark, before we'd added any hint about the free-slot rule, both frontier models made the *opposite* error: they overcharged, and 34 of Opus 4.8's 36 misses on that pass were clean multiples of $70, $140, or $210 — the price of assigning a free slot to the wrong bag. That's a legible signature on its own, but we wanted to know whether simply stating the rule would fix it.

We added one sentence to the system prompt: when N bags are complimentary, the free slots go to the N bags with the highest surcharge, not to whichever bags come first. The overcharging pattern vanished — not one remaining miss was a multiple of $70. But a new pattern replaced it. Both models now *undercharge* on every single failure, in both models' 39-to-46 misses, no exceptions. And on 31 of the cases both models got wrong, they landed on the *identical* wrong dollar figure — including Thomas's $3,185 against a correct $3,445.

Telling a model the rule exists changed the direction of its error. It did not change the fact of it. That's worth sitting with, because it rules out the easiest explanation — that the models simply hadn't been told — and points at something more structural underneath.

## Chasing the actual predictor of failure

The intuitive next hypothesis is the one most people would reach for first: harder cases have more moving parts, so a ten-bag itinerary should break down more often, and more badly, than a three-bag one. We had this hypothesis before we had the data, wrote it down, and then checked it directly rather than assuming it.

![Figure 5: dollar error against bag count, showing no relationship](figures/error_vs_bagcount.png)

*Figure 5. Every incorrect case, both models, bag count against dollar error. There's no climbing trend. The correlation between bag count and error size, restricted to wrong answers, is r = 0.10 for both models — statistically indistinguishable from no relationship at all.*

It doesn't hold. Average bag count on cases Opus 4.8 got wrong was 9.78, against 9.91 on cases it got right — the same, within noise. Fable 5: 9.87 wrong, 9.84 right. More facts to extract did not make either model more likely to fail, or fail by a larger margin. The number of atomic facts in a case is not what breaks unaided reasoning here.

What does predict a failure, cleanly, is whether the case has any complimentary slot to assign in the first place:

![Figure 6: failure rate against number of complimentary slots](figures/failure_by_k.png)

*Figure 6. K is the number of bag positions that are free for a given route and cabin class — zero, one, two, or three under this fee schedule. Both models are flawless when K is zero and fail roughly six times in ten whenever K is one or more.*

| Complimentary slots (K) | Opus 4.8 fails | Fable 5 fails |
|---|---|---|
| K = 0 (nothing free) | 0 of 23 | 0 of 23 |
| K = 1 | 12 of 13 | 8 of 13 |
| K = 2 | 30 of 48 | 27 of 48 |
| K = 3 | 4 of 16 | 4 of 16 |

Zero failures, either model, across all 23 cases with no complimentary slot at all — regardless of bag count, weight, or size. The moment a case requires *choosing* which bag gets the free slot, the failure rate jumps immediately. This was never a test of whether a model can add up ten line items. It's a test of whether it notices that one clause quietly redefines the task from arithmetic to assignment — and that's the one clause a fluent reader is most likely to skate past, because nothing in the formatting marks it as different from every other line in the table.

Cabin class sharpens this into something closer to a mechanism:

![Figure 7: failure rate by cabin class](figures/failure_by_class.png)

*Figure 7. Basic Economy — which never carries a complimentary bag under this schedule — is perfect for both models. Main Plus, which does carry one and a footnote about it, is wrong for both models on every case.*

| Cabin class | Opus 4.8 fails | Fable 5 fails |
|---|---|---|
| Basic Economy | 0 of 14 | 0 of 14 |
| Main Cabin | 7 of 17 | 3 of 17 |
| First | 5 of 20 | 7 of 20 |
| Business | 13 of 25 | 7 of 25 |
| Premium Economy | 11 of 14 | 12 of 14 |
| **Main Plus** | **10 of 10** | **10 of 10** |

Main Plus is a perfect 0-for-10 for both models, on every Main Plus case either one saw. The published rule table carries a footnote on that column: *"Main Plus includes 1 extra free checked bag in addition to the Main Cabin allowance."* The table's own numbers already price that bag in — reading the table correctly needs nothing more than the figures it contains. But a model that treats the footnote as a second, additive instruction has an obvious way to double-count it: work out the table's free slots, and then wave through one *more* bag on top, because the footnote says "extra."

The errors fit that story precisely. The ten Main Plus misses aren't one repeated dollar amount — they're $400, $300, $900, $360, $900, and so on, tracking whatever that one extra bag's own size and weight happened to cost. A single misread table cell would produce the same wrong number every time; a whole additional bag being waived produces exactly this variable pattern. We can't see either model's internal reasoning — it isn't exposed in the API — but the shape of the evidence is specific enough to trust: not "the model gets worse as a problem grows," but "the model misses the one clause that turns a lookup into an optimization, and a second, easily-conflated clause makes that worse for exactly one cabin class." A kernel has no footnote to double-count. Its free-slot count comes from the same table cells its total does, computed once, the same way, every time.

## Field notes from building this pipeline

<details>
<summary>Bug one — self-consistency voting assumed every fact was a scalar</summary>

Our self-consistency mode re-extracts a case several times and takes a majority vote, using a hashable form of the extracted facts to compare runs. We had designed that comparison around flat, scalar facts — a fare, a boolean, a headcount — so a plain per-field key seemed sufficient. The airline domain's facts include a *list* of bag records, and a list isn't hashable. The fix was a small recursive hashing function; the lesson was that "atomic facts" is a schema decision that gets more demanding as the domain does, and the plumbing underneath has to be general enough to keep up.

</details>

<details>
<summary>Bug two — a paraphrase quietly deletes the rule it's summarizing</summary>

Our first full run showed the unaided frontier model failing on nearly every case — 0% for Opus 4.8, 7% for Fable 5. That wasn't a real result; it was ours to fix. We'd summarized the fee schedule into a paragraph, assuming a short prose statement would carry enough of the rule to be a fair test. It doesn't, once a rule has more than a handful of numeric constants: this fee schedule has dozens of dollar figures across regions, classes, and bag positions, and a paraphrase silently drops most of them. The fix was to vendor the benchmark's actual rules text verbatim rather than summarize it — a discipline we already applied to the *kernel*, just extended to the *prompt*, and easy to overlook until a domain is large enough that it matters.

</details>

<details>
<summary>Bug three — a harder problem needs a bigger thinking budget</summary>

With the full rules text in the prompt and the model genuinely reasoning through a combinatorial assignment, one case spent 7,999 of its 8,000-token thinking budget and returned nothing at all. Raising the ceiling to 16,000 tokens fixed it. The general point survives the specific number: a token budget tuned for one problem's reasoning depth silently fails on a harder one, and the failure mode isn't a wrong answer — it's no answer.

</details>

## What this buys us, and what it doesn't

This result answers a specific, falsifiable question: whether a proof-carrying verification architecture — a model that only reads, a kernel that only decides — survives being pointed at a benchmark, a domain, and a set of models it was never built for. It does — and not marginally. A 46-point and a 39-point unaided failure rate, on the two newest Claude models, on a real, independently authored, real-world fee schedule, collapsed to zero by a kernel we could check case-by-case against someone else's reference implementation before trusting a single output.

It's worth stating the limit as plainly as the result. Verification guarantees that a specific set of extracted facts was correctly turned into an answer under the encoded rules. It does not, by itself, guarantee that the facts were read correctly in the first place — that residual risk is real, and the Haiku tier's 82–85% (against a kernel that is otherwise exact) is where we show it rather than hide it. What verification changes is the *shape* of that risk: instead of an open-ended "was this multi-step reasoning sound," which you cannot check case by case, you're left with "was this one field read correctly," a narrow question you can measure, retry, or hand to a second pass.

The pattern in this result isn't "language models are bad at arithmetic." It's narrower, and this time it comes with a clean quantitative test behind it rather than a hunch: models are bad at noticing when a rule that reads like a lookup table is quietly asking for an optimization, a branch, or a composition — not because the surrounding case is large, but because one specific clause is easy to read past — and when they miss that clause, they miss it fluently, with nothing in the answer to flag that anything went wrong, and no more often on a ten-fact case than a three-fact one. A kernel doesn't need to notice the trap. It just runs the rule, the same way, every time.

[^1]: See our companion post, [*A Diagnosis Should Be a Proof, Not a Probability*](/blog/a-diagnosis-should-be-a-proof-not-a-probability), which formalizes the 2019 EULAR/ACR lupus classification criteria in Lean 4 and runs the same evaluation-versus-verification comparison on a clinical benchmark.

[^2]: Zhou et al. **RuleArena: A Benchmark for Rule-Guided Reasoning with LLMs in Real-World Scenarios.** ACL 2025; arXiv:2412.08972. MIT license. Covers airline baggage fees, NBA transaction legality, and tax; this post uses the airline domain.

---

## References

1. Merigoux D, Chataing N, Protzenko J. **Catala: A Programming Language for the Law.** ICFP 2021. *The domain-specific language the verification kernel is written in — designed specifically so statutory and regulatory rules can be transcribed into checkable code rather than paraphrased.*
2. Dziri N, Lu X, Sclar M, et al. **Faith and Fate: Limits of Transformers on Compositionality.** NeurIPS 2023. *Documents the broader, scale-resistant class of compositional failure this result is one concrete instance of.*
3. Holzenberger N, Van Durme B. **Factoring Statutory Reasoning as Language Understanding Challenges.** ACL 2021. *SARA, the statutory benchmark we evaluated before RuleArena; see the disclosure above for why we moved past it.*

<details>
<summary>Benchmark provenance, exact optimization definition, and how to reproduce this</summary>

**Dataset.** RuleArena's airline domain, "Level 3" (hardest) tier, 100 problems, each a real itinerary — fare, cabin class, route, and up to eleven checked-bag items — with ground truth from the benchmark's own reference implementation, not a human label. We vendored the benchmark's published fee-schedule text verbatim rather than paraphrasing it, and cross-checked our Catala kernel against the reference script on all 100 cases before treating it as ground truth for anything in this post.

**The optimization, precisely.** For a given route, cabin class, and bag position, the published base fee is either a fixed amount or zero ("complimentary"). When K positions are complimentary, the reference computation assigns those K free slots to the K bags with the highest `max(oversize fee, overweight fee)`, minimizing the passenger's total. K never exceeds 3 under this fee schedule. The kernel computes this with the bounded top-3 fold shown above rather than a general sort, since Catala's list primitives don't include one.

**Method.** The K-value and cabin-class breakdowns are computed directly from each case's route and class against the same fee-table logic the kernel itself uses, cross-tabulated against each arm's logged per-case correctness — not estimated or sampled after the fact. The bag-count correlation is the Pearson correlation between bag count and absolute dollar error, restricted to incorrect cases, computed separately per model.

**Code.** The pipeline — the Catala kernel, the dataset-construction and cross-check scripts, the experiment harness, and the figure generation — is being prepared for an open-source release. A repository link will be added here once it's public.

</details>
