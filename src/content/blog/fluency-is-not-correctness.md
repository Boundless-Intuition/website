# Fluency Is Not Correctness

##### Separating semantic parsing from deterministic execution in rule-governed reasoning

*Boundless Intuition Research*

---

## TL;DR

Large language models exhibit strong natural-language fluency but remain unreliable at executing formal rule systems. We evaluate whether separating semantic extraction from deterministic execution improves correctness on RuleArena, an open evaluation benchmark for rule-guided reasoning, using its airline baggage fee domain. We compare three tiers of Claude models, first unaided and then within a two-stage verification stack in which the language model acts only as an autoformalizer, translating each itinerary into a machine-checkable formal representation, while a deterministic solver, written in Catala, executes the policy. 

Verification raises frontier accuracy from 54% and 61% to 100% while simultaneously reducing inference cost by roughly a factor of fourteen and latency by an order of magnitude. Unaided, two frontier generations of the same model family return the identical wrong dollar amount on shared failure cases, which indicates that the errors originate in shared learned priors rather than insufficient inference-time reasoning. Most notably, a verified budget model outperforms unaided frontier models, suggesting that deterministic execution can compensate for substantial differences in model capability on rule-governed tasks.

---

## Where language models quietly go wrong

Modern language models have become remarkably capable at interpreting natural-language instructions. Whether they correctly execute the semantics of those instructions remains substantially less understood. A model can restate a policy accurately, walk through its application step by step, and still return a number the policy does not license.

This distinction matters because many practical domains, including taxation, healthcare, finance, and regulatory compliance, depend not on fluent explanations but on faithful execution of explicit rules. In these domains an answer is either derivable from the governing specification or it is not, and a persuasive derivation of a wrong answer is worse than no answer, because it disarms the reader's skepticism.

We investigate this question using RuleArena, a published evaluation benchmark in which real-world policies must be applied to concrete scenarios, and we focus on its airline baggage fee domain. A single case from that benchmark illustrates the phenomenon this report is about. Thomas is flying First Class from Montreal to Portland with ten checked bags, ranging from 55 to 99 pounds. Applying American Airlines' published fee schedule to his itinerary yields $3,445. A current frontier model, given the full published rules and an explicit note about the one difficult step, answers $3,185. The newest and most capable model in the same family, a full generation later and given more room for inference-time reasoning, also answers $3,185.

The two models do not merely fail. They fail identically, down to the dollar. If these failures were caused by limited reasoning capacity, the stronger model should miss differently or stop missing. It does neither. This observation motivated the experiment reported here: the failure appears to live in the model family's learned priors rather than in its inference-time effort, and if that is true, no amount of additional reasoning will remove it. A different system boundary might.

## The question we wanted to answer

We investigate whether failures on this benchmark arise primarily from faulty semantic execution rather than from limited reasoning capacity or limited language understanding.

### Hypothesis

A hypothesis is only useful if it makes predictions that can be tested, and ours makes two. First, replacing probabilistic rule execution with deterministic execution should eliminate most observed failures without requiring a stronger language model. Concretely, a two-stage system in which the language model only produces a structured semantic representation of the input, and an executable specification makes every normative decision, should reach near-perfect accuracy even when the underlying model is weak, and the residual errors should be attributable to semantic parsing rather than to rule execution.

The second prediction is sharper. If execution is the bottleneck, then a budget model behind a deterministic decision procedure should outperform a frontier model reasoning unaided, because the difficult computation has been moved out of the probabilistic component entirely.

### Putting the idea to the test

To test these predictions, we used the 100 hardest ("Level 3") problems from RuleArena's airline domain. Each problem is a realistic American Airlines itinerary: a ticket price, a cabin class, a route, and up to eleven items including one free personal item. Ground truth is computed by the benchmark's own reference implementation rather than by human annotation, a property that turns out to matter a great deal, as the next section explains.

We compared three tiers of Claude: `claude-opus-4-8` (frontier), `claude-fable-5` (Anthropic's newest and most capable model), and `claude-haiku-4-5` (budget). Every tier was evaluated under the same three conditions, or arms, on the same 100 cases. In the *baseline* arm, the model receives the complete published fee rules verbatim as its system prompt, plus the itinerary, and produces the total fee directly. In the *verified* arm, the model performs autoformalization only, translating the itinerary into a machine-checkable formal representation, and a deterministic solver kernel, described below, executes the policy: the language model never computes a fee, and the kernel never interprets prose. The *loop* arm extends the verified arm with self-consistency voting, an assertion-retry round, and round-trip back-translation, escalating unresolved cases to the frontier model.

We deliberately made the baseline hard to beat. The unaided models receive the full policy text, not a paraphrase, and the prompt explicitly states that the free-bag assignment is an optimization rather than a positional lookup. Whatever failures the baseline shows cannot be blamed on missing information: the model is handed the rules and told exactly where the difficulty lies.

Across every arm we measured four things: accuracy against the reference implementation's ground truth, mean language-model latency per case (plus kernel latency where the kernel runs), total cost per run, and cost per correct answer.

## Why RuleArena?

We selected [RuleArena](https://arxiv.org/abs/2412.08972) (Zhou et al., ACL 2025, MIT license) because it provides executable ground truth through a reference implementation rather than human annotation. This property isolates semantic execution errors from annotation ambiguity: when a model disagrees with the benchmark, the disagreement can be traced to a specific step of a runnable program rather than to a label whose provenance is unknown. RuleArena covers three domains, airline baggage fees, NBA transaction legality, and tax. We used the airline domain because its executable ground truth allowed us to validate our own re-encoding of the policy directly against it.

### The implicit optimization problem

The published policy reads like a lookup table. There is a base fee by bag position (1st, 2nd, 3rd, 4th and beyond), by route, and by cabin class. There is a surcharge if a bag is oversized, and another if it is overweight. Some route and class combinations make the first one or two bags free. A human interpreting the policy would apply it left to right, bag by bag.

The reference implementation does something the tables never state explicitly. When N bags are free ("complimentary") for a given route and class, the airline does not grant that status to whichever bags happen to be listed first. It assigns the free slots to whichever N bags would otherwise incur the highest oversize or overweight surcharges, minimizing the total charge. The benchmark therefore implicitly requires solving a constrained optimization problem that is absent from the textual policy but present in the executable specification. It is exactly the kind of step a fluent reader glides past, and it is where, as the results below show, the unaided models fail.

## A different system boundary

Our system runs a minimal path through our verification stack, which pairs an autoformalizer with provers and domain-specific solvers. For this experiment it decomposes the task into two computational stages.

**Stage 1: autoformalization.** A language model reads the passenger's itinerary and formalizes it into a structured, machine-checkable representation: the ticket price, the cabin class, the route, and for every checked bag (skipping the free personal item), its size and weight. It performs no normative computation. It does not compute a fee, apply a threshold, or decide which bag is free.

**Stage 2: deterministic solving.** A deterministic decision procedure, written in Catala and hereafter called the verification kernel, acts as the solver over that formal representation, executing the policy: base fees by position, oversize and overweight surcharges per bag, and the optimal assignment of complimentary slots, solved as a genuine top-K selection rather than a guess.

### Why this decomposition works

This decomposition deliberately assigns language understanding to the language model while reserving all normative decision-making for the executable specification. The boundary minimizes the amount of computation delegated to probabilistic inference. Interpreting an itinerary is a task language models are demonstrably good at. Executing a policy with an embedded optimization is, as the results below show, a task they are demonstrably unreliable at, regardless of scale. The architecture places each task with the component that can be trusted to perform it. It is also the smallest useful slice of the full stack: the same boundary supports provers that return proof artifacts and counterexamples rather than a single number, and solvers for constraint systems far richer than a fee schedule.

![Figure 1: system architecture and evaluation pipeline](../results/figures_airline/pipeline_architecture.png)

*Figure 1. RuleArena's own rules and reference script are the source of truth. We hand-wrote the Catala kernel from the rules text and cross-checked it against the reference implementation on all 100 cases before trusting it. That cross-check is what makes the kernel usable as ground truth in everything downstream.* `run_experiment.py` *then runs all nine arms (three models across baseline, verified, and loop) over the same 100 cases. Every output, from the scores to the summary table to the per case response PDF, is generated from that run's logged data.*

The kernel's treatment of the optimization is compact enough to show in full:

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

`Top3` tracks the three largest values seen so far. Folding it over every bag's oversize or overweight surcharge finds the K bags (at most three, per this fee schedule) that should receive the free slots. It is the same computation the reference implementation performs with Python's sort, done here as a bounded insertion because Catala's list primitives have no built-in sort. We validated the re-encoding case by case against RuleArena's reference implementation before trusting it, and all 100 cases matched exactly on the first clean run.

## What we observed

### Correctness

| Arm                              | Accuracy   | LLM s/case          | $/run  | $/correct |
| -------------------------------- | ---------- | ------------------- | ------ | --------- |
| **frontier baseline** (Opus 4.8) | **54.0%**  | 68.08               | $18.08 | $0.335    |
| frontier verified                | **100.0%** | 3.32 (+2.78 kernel) | $1.32  | $0.013    |
| frontier loop                    | 100.0%     | 10.67               | $4.44  | $0.044    |
| **fable baseline** (Fable 5)     | **61.0%**  | 25.91               | $16.92 | $0.277    |
| fable verified                   | **100.0%** | 7.59 (+3.75 kernel) | $3.63  | $0.036    |
| fable loop                       | 100.0%     | 22.52               | $11.44 | $0.114    |
| cheap baseline (Haiku 4.5)       | 3.0%       | 23.75               | $2.05  | $0.682    |
| cheap verified                   | 82.0%      | 1.92 (+3.63 kernel) | $0.22  | $0.003    |
| cheap loop                       | 85.0%      | 6.12                | $1.10  | $0.013    |

![Figure 2: accuracy by arm](../results/figures_airline/accuracy_by_arm.png)

*Figure 2. Unaided accuracy for all three models sits well under 100%. Every frontier verified and loop arm reaches it. Haiku's verified and loop arms reach 82% and 85%.*

Unaided, the frontier models fail at a substantial rate: 46% of cases for Opus 4.8 and 39% for Fable 5, despite receiving the complete published rules and an explicit statement that the free-slot assignment is an optimization. Both verified frontier arms reach 100%. The budget model fails almost entirely unaided, at 3%, and reaches 82% verified and 85% with the loop.

The aggregate numbers tell the overall story, but individual failures are often more revealing. We've made the benchmark interactive so you can compare unaided model outputs with verified outputs on the same RuleArena cases.

Explore the live playground: https://playground.boundlessintuition.com/

### Efficiency

![Figure 3: cost vs accuracy](../results/figures_airline/cost_accuracy_pareto.png)

*Figure 3. Accuracy against cost per correct answer, on a log scale. The verified systems (blue) exceed the baselines (red) on accuracy and cost simultaneously.*

The verified frontier system is roughly 14 times cheaper per run than its unaided counterpart and about 25 times cheaper per correct answer. The cheapest configuration that beats every unaided baseline, the verified budget model, costs $0.22 per 100-case run, against $18.08 for the unaided frontier baseline.

### Latency

![Figure 4: latency by arm](../results/figures_airline/latency_by_arm.png)

*Figure 4. Mean latency per answer. The unaided baselines spend tens of seconds on inference-time reasoning through the assignment problem. Semantic parsing is fast regardless of how hard that problem is, because the kernel, not the model, executes it.*

The verified frontier system answers in roughly 6 seconds end to end against 68 seconds of unaided reasoning. Extracting a bag's dimensions is a short task regardless of how hard the underlying optimization is, and the kernel executes that optimization in milliseconds.

## Why the failures matter

Three observations from the results bear directly on the hypothesis.

**Identical errors across model generations.** On cases both frontier models miss, they frequently return the identical wrong dollar amount, including the $3,185 answer to the Thomas case described in the introduction. The persistence of identical errors across model generations suggests that these failures originate from shared learned priors rather than insufficient inference-time reasoning. Increased reasoning capacity improved explanation quality without correcting the underlying semantic execution. This is the pattern the hypothesis predicts: a prior about how a rule "should" work does not shrink as models get stronger, whereas a reasoning gap should.

**Verification eliminates frontier failures completely.** Both frontier models move from 54% and 61% to 100% behind the kernel, with no change to the models themselves. The 46-point and 39-point failure rates were therefore not caused by an inability to interpret the itinerary. The models could always read the input. What they could not reliably do was execute the policy, and removing that responsibility removed the failures.

**Residual budget-tier error is confined to semantic parsing.** The verified budget model reaches 82% rather than 100%, and every remaining miss is a parsing failure: an occasionally misread bag weight, or a bag dropped from a list of ten. None are kernel failures. Execution is exact by construction whenever the structured representation is correct, so the residual risk is narrow and measurable rather than open-ended. This is the error profile the hypothesis predicts for a weak parser in front of a sound decision procedure.

Taken together, the evidence supports the hypothesis. The dominant failure mode of the unaided models is semantic execution, not language understanding, and substituting deterministic execution removes it without requiring a stronger model.

### What changes when execution becomes deterministic

**Deterministic execution changes which model you need.** The verified budget model, at 82%, outperforms both unaided frontier models, at 54% and 61%, while costing about $0.22 per run against roughly $18 and answering in about 6 seconds against 68. A budget model with a verification layer beats a frontier model without one. The practical consequence is that on rule-governed tasks, capability spending and correctness are not the same axis: moving the normative computation into an executable specification buys more accuracy than moving up a model tier, at a small fraction of the price.

**Verification is not a tradeoff in this domain.** The usual expectation is that additional checking costs money or time. Here it saves both, because the expensive resource was never the check. It was the tens of seconds of inference-time reasoning the unaided model spends attempting an optimization it cannot reliably perform. Replacing that reasoning with a millisecond-scale execution shortens the language model's task to semantic parsing, which is fast and cheap at every tier.

**Where the approach applies.** The architecture requires that the governing rules be expressible as an executable specification and that the inputs be extractable as a structured semantic representation. Fee schedules, tax computations, benefit eligibility, and compliance thresholds fit this shape. Tasks whose difficulty lies in the interpretation itself, such as ambiguous clinical narratives or contested legal readings, do not, because the hard part cannot be moved across the trust boundary.

**When verification does not help.** The kernel cannot repair a wrong structured representation. If the parser misreads a weight, the kernel will execute the policy exactly, on the wrong facts. The budget tier's residual 18% is precisely this case. Verification narrows the failure surface to the parsing stage. It does not close it.

## The bigger picture

Our results suggest that the principal bottleneck in rule-governed reasoning is not language understanding but semantic execution. Two generations of frontier models, given the complete policy and told where the difficulty lies, fail on 39% to 46% of cases and frequently fail identically, which points to shared learned priors that additional inference-time reasoning does not dislodge. Separating the two functions, so that the language model performs interpretation and an executable specification performs every normative decision, eliminates the frontier failures entirely while reducing inference cost by roughly a factor of fourteen and latency by an order of magnitude, and it lifts a budget model above the unaided frontier. More broadly, these findings support a design paradigm in which language models perform interpretation, while executable specifications remain responsible for normative decision-making. The kernel in this experiment is the simplest instance of that paradigm; the same architecture extends to provers and solvers that return not only the answer but its derivation — which rule applied, which assumptions were made, and which constraints were checked.