# A Diagnosis Should Be a Proof, Not a Probability

### Formalizing the lupus classification criteria in Lean 4, and a 50-case benchmark against a frontier model.

*Boundless Intuition Research*

---

We gave a frontier language model a single patient record and asked it one question: does this patient meet classification criteria for lupus? Then we asked four more times, with the identical record, word for word. The answers came back: not lupus, lupus, lupus, not lupus, not lupus.

Same patient. Same chart. Five identical prompts. Two different diagnoses, separated by nothing but the random sampling inside the model.

The patient was one we constructed to be exactly this kind of trap. She was taking hydralazine, a blood-pressure drug well known for producing a lupus-like syndrome, and the easy read is to call her findings a drug reaction and move on. But she also carried the bloodwork of genuine lupus underneath the drug. The correct classification is lupus, and a model that answers "not lupus" three times out of five sends a real patient home with an untreated autoimmune disease. Worse, nothing in any single one of those five fluent, confident answers tells you which one you happened to receive.

This is not a story about a weak model. The model here is among the strongest available, and as the results below show, it classifies most of our cases correctly. It is a story about a property that no amount of model scale removes, and about an architecture that does. We built a clinical classifier whose verdicts are not sampled but proven, benchmarked it against a frontier model on a 50-case adversarial dataset, and measured exactly where each one succeeds and fails. What follows is the system, the evidence, and an honest account of the limits of both.

## When a diagnosis is an argument

A diagnostic classification is not a sentence to be completed. It is an argument to be made: a chain of rule applications over a patient's data that ends in a verdict. The published criteria for a disease spell that chain out precisely. They say which findings count, how much each is worth, which preconditions must hold before the assessment even begins, and which competing explanations disqualify a finding.

A language model does not execute that chain. It performs next-token prediction over a learned probability distribution. Asked to classify, it generates text that resembles the argument, drawn stochastically token by token. That mechanism produces three failure modes, and they are intrinsic rather than incidental:

The first is **non-determinism**. Because the output is sampled, the same input can produce different verdicts on different runs, and the reasoning can drift partway through a derivation without any visible sign in the final text. This is the behavior in the opening paragraph.

The second is **unverifiable confidence**. A fluent derivation is not evidence that the derivation is sound. The model's confidence reflects the shape of its token distribution, not the validity of the argument, so a wrong step arrives with exactly the same polish as a right one.

The third is the **absence of a completeness guarantee**. Nothing forces the model to check every disqualifying exception or to consider every competing diagnosis. When it skips one, the omission does not announce itself. It simply is not there.

For a consumer chatbot, this is a fine trade. For clinical classification, where a confidently wrong answer carries real cost, high average accuracy with no guarantee on the individual case is not a foundation you can build on. A trustworthy classification needs two properties that a sampled argument cannot supply. It needs **correctness**, meaning no step contradicts the patient's data or the rules. And it needs **completeness**, meaning no applicable criterion goes unevaluated and no disqualifying exception goes unchecked. Those are precisely the guarantees that formal verification was invented to provide.

## Evaluation measures the average; verification checks the case

It helps to separate two ideas that are easy to conflate.

Evaluation is a statement about a sample average. A model scores some accuracy across a benchmark. That number is statistical, it describes the model, and it says nothing about whether any particular answer is valid. When the grader is itself a language model, the problem compounds, because the grader is another probabilistic system drifting off-distribution in ways you cannot inspect.

Verification is a statement about a single output. A small, trusted program checks that this specific conclusion follows, by deduction, from the rules. The check is deterministic, it reproduces regardless of model weights or random seed, it is complete over the encoded rules rather than over a sample of cases, and it offers no gradient for an adversary to push against. Our aim was a clinical classifier whose every verdict is verified in this second sense: a derivation a kernel can check.

## The model reads, the kernel decides

The design demotes the language model from decision-maker to translator, and places authority in a formal proof system.

![Figure 1: architecture](figures/fig1_architecture.png)

*Figure 1. The model proposes a structured representation of the chart; the formal core decides the diagnosis. The dashed line is the trust boundary. The only probabilistic step is autoformalization, above the line; everything below it is verified.*

There are three components, and the separation of trust between them is the entire point.

The **autoformalizer** is a language model that converts the free-text record into a structured term in a formal vocabulary. This is the only probabilistic step, and it is deliberately a narrow one: extract the findings that are present, not reason about the disease. The model is allowed to be wrong here, and we measure how often it is.

The **formal rulebook** is the published criteria, encoded as definitions in Lean 4, a language built for writing programs and mathematical proofs that a machine can check. This is where domain knowledge lives, as explicit, reviewable, version-controlled code rather than as opaque weights or a brittle prompt.

The **proof kernel** is a small, heavily scrutinized program, the trusted computing base of the whole system, whose only job is to check proofs. Because we encode the rulebook so that classification is a *decidable* proposition, meaning a property a machine can settle with a definite yes or no, the kernel can evaluate any concrete patient to a verdict and certify that verdict with a proof object. There is no sampling and no drift at this stage. The verdict is a theorem.

This inverts the usual posture. Instead of trusting the model and hoping its reasoning held, we trust a few hundred lines of formal logic and a kernel that mechanically verifies them, and we confine the model to the task it is genuinely reliable at, which is reading.

## Encoding a real standard: the lupus criteria

We did not invent a toy rule. We formalized the 2019 EULAR/ACR classification criteria for Systemic Lupus Erythematosus, an internationally adopted clinical standard, because it has the structure that most serious diagnostic rules share and therefore stresses the architecture in clinically meaningful ways.

The criteria have three parts. First, an **obligatory entry criterion**: an antinuclear antibody (ANA) titer of at least 1:80. If that gate fails, the patient cannot be classified as lupus, no matter what else is true. Second, a **weighted additive score across ten organ domains**, where each domain contributes only its single highest-weighted finding rather than the sum of its findings, classification requires a total of at least 10 points, and at least one of those points must come from a clinical rather than a purely laboratory domain. Third, an **attribution rule**: a finding counts only if there is no more likely explanation than lupus. That last clause is the crux of the diagnosis, because lupus has well-known impostors. Certain drugs (hydralazine, procainamide, minocycline, isoniazid) and certain chronic infections (endocarditis, HIV, hepatitis C, parvovirus B19) reproduce many of its findings.

In our system every scored criterion is an item with a weight and a domain, and a patient is a structured term that carries both the findings and the confounders that drive attribution:

```lean
structure Patient where
  anaTiterRecip    : Nat            -- reciprocal titer; 80 denotes 1:80
  findings         : List Item
  drugInducedLupus : Bool := false  -- a culprit drug is implicated
  chronicInfection : Bool := false  -- an SLE-mimicking infection is present
```

The domain-maximum score is a fold that takes, for each domain, the highest weight among the items that actually count, and then sums across domains:

```lean
def domainScore (p : Patient) (d : Domain) : Nat :=
  (allItems.filter (fun i => (domainOf i == d) && counts p i)).foldl
    (fun acc i => Nat.max acc (weight i)) 0

def totalScore (p : Patient) : Nat :=
  allDomains.foldl (fun acc d => acc + domainScore p d) 0
```

Classification then becomes a single proposition, with a `Decidable` instance that lets the kernel both decide and prove it for any concrete patient:

```lean
def classifiedSLE (p : Patient) : Prop :=
  entryGate p ∧ hasClinicalCriterion p = true ∧ totalScore p ≥ 10

instance (p : Patient) : Decidable (classifiedSLE p) := by
  unfold classifiedSLE; infer_instance
```

That `Decidable` instance is the engine of the whole approach. For any specific patient the verdict is not asserted, it is derived, and the derivation is a proof term the kernel will reject unless it actually holds:

```lean
theorem alice_has_sle : classifiedSLE alice := by decide  -- compiles, therefore proven
theorem bob_not_sle   : ¬ classifiedSLE bob   := by decide  -- compiles, therefore proven
```

## The attribution rule, where the mimics live

The interesting part is attribution, and it is worth seeing in full. Drug-induced lupus and the infections we model do not produce the antibodies that are specific to lupus, anti-dsDNA and anti-Smith. Their presence is therefore a positive marker of genuine disease, and it should switch off mimic-attribution entirely:

```lean
def genuineSleMarker (p : Patient) : Bool :=
  p.findings.contains dsDNAorSmith   -- anti-dsDNA or anti-Smith implies genuine SLE

def explainedByOther (p : Patient) (i : Item) : Bool :=
  ! genuineSleMarker p &&
    ((p.drugInducedLupus && drugExplains.contains i)
     || (p.chronicInfection && infExplains.contains i))

def counts (p : Patient) (i : Item) : Bool :=
  p.findings.contains i && ! explainedByOther p i
```

This single predicate is what decides the trap case from the introduction, and it is the rule that the frontier model applies inconsistently. We come back to why it matters both in the failure analysis and when we discuss editing the rulebook.

## A benchmark, not an anecdote

A claim of verified correctness deserves measurement, not one dramatic case study. So we built a benchmark and ran a controlled comparison.

The dataset is 50 synthetic patient vignettes, each a free-text record paired with an authored set of true facts. The distribution is balanced and adversarial on purpose. There are 20 lupus-positive and 30 lupus-negative cases. Sixteen are mimic cases, split evenly between drugs and infections, and they include both pure mimics that should be negative and genuine-disease-behind-a-mimic cases that should be positive. Eleven are boundary and arithmetic traps: cases that sit exactly on the threshold, cases where summing all findings in a domain over-counts because only the highest should be taken, and cases that reach ten points entirely from laboratory findings and therefore fail the clinical-criterion requirement. Six are entry-gate cases where the ANA is negative or below the cutoff.

We ran two systems over the same cases. The **baseline** receives the record and the full criteria in natural language and must produce both the score and the classification itself. We ran it as a frontier model with its strongest reasoning mode enabled, so this is a fair opponent rather than a strawman. The **verified** system receives the record, extracts the atomic findings only, with explicit instructions not to score or classify, and hands the structured term to the kernel.

Ground truth is the formal rulebook applied to each vignette's authored facts. That choice has a consequence we confront directly later. Every vignette was run five times in each system, 500 model calls in all, so that we could measure run-to-run consistency alongside accuracy.

## What we found

| Metric                            | Baseline (LLM only) | Verified (autoformalization + Lean) |
| --------------------------------- | ------------------- | ----------------------------------- |
| Verdict accuracy (mean of 5 runs) | 96.8%               | 100%                                |
| Sensitivity (true-positive rate)  | 90.0%               | 100%                                |
| Specificity (true-negative rate)  | 100%                | 100%                                |
| Mimic-case accuracy               | 90.0%               | 100%                                |
| Boundary and arithmetic accuracy  | 100%                | 100%                                |
| Entry-gate accuracy               | 100%                | 100%                                |
| Run-to-run consistency            | 98.0%               | 100%                                |
| False negatives (missed lupus)    | 2 of 20             | 0 of 20                             |
| False positives (over-classified) | 0                   | 0                                   |

![Figure 2: headline metrics](figures/fig2_headline.png)

*Figure 2. Headline metrics, baseline versus verified, as the mean of five runs. The verified system reaches 100% on all five. The baseline trails on sensitivity, mimic accuracy, and run-to-run consistency. The vertical axis is truncated at 80% to make the gaps legible.*

Breaking the baseline down by case category shows where its errors concentrate:

| Category                  | n   | Baseline accuracy |
| ------------------------- | --- | ----------------- |
| Clear SLE                 | 10  | 100%              |
| Sub-threshold             | 7   | 100%              |
| ANA-negative (entry gate) | 6   | 100%              |
| Boundary and arithmetic   | 11  | 100%              |
| Drug-induced mimic        | 8   | 92.5%             |
| Infection mimic           | 8   | 87.5%             |

![Figure 3: baseline accuracy by category](figures/fig3_per_category.png)

*Figure 3. Baseline accuracy by case category. Errors are confined to the two mimic categories; the model handles every structural and arithmetic trap perfectly. The verified system is at 100% across all categories, marked by the dashed line.*

![Figure 4: confusion matrices](figures/fig4_confusion.png)

*Figure 4. Confusion matrices using the majority verdict over five runs, n equals 50. The baseline's two errors are both false negatives, the clinically dangerous direction. The verified system has none.*

Two things in these numbers shape how to read them, and both make the case stronger rather than weaker.

The first is that the frontier baseline is genuinely good (Figures 2 and 3). It classified every clear case, every sub-threshold case, every entry-gate case, and every one of the boundary and arithmetic traps correctly, including the subtle ones, such as the domain-maximum cases where naive summation over-counts and the laboratory-only cases that reach the threshold but fail the clinical-criterion requirement. On these structurally tricky cases the model applied the rule faithfully. The point here is not that the model cannot follow rules.

The second is that the model's failures land exactly where the clinical stakes are highest, and in the dangerous direction (Figure 4). Both baseline errors are false negatives, which is to say missed disease. Its 90% sensitivity means it failed to identify two of twenty genuine lupus patients. Its specificity was perfect, so it never over-classified, but in a screening or decision-support setting a missed autoimmune diagnosis is the costly error.

## The two patients the model missed

The two failures are not random noise. They are the two cases that require the attribution rule to be applied correctly in the harder direction, recognizing genuine disease that is hiding behind a mimic.

The first is the patient from the introduction, a woman on hydralazine with joint pain, but also with low complement levels and a positive anti-dsDNA antibody. The anti-dsDNA is not a feature of drug-induced lupus, so this is real lupus with the drug as a red herring, and the correct answer is positive. Across five identical runs the baseline returned negative, positive, positive, negative, negative, with computed scores of 10, 16, 16, 10, 10. It alternated between blaming the drug and recognizing the disease, governed by nothing but the sampler. This is the clearest possible illustration of the first failure mode: the verdict is a function of the random seed. The verified system returns positive on every run, because the rulebook states plainly that a lupus-specific antibody suppresses drug attribution, and the kernel computes the same derivation each time.

The second is a woman with treated HIV and a low platelet count, again with anti-dsDNA and low complement, and again genuinely lupus. HIV can lower platelets, so the model attributed the finding to the infection and returned negative on all five runs. Consistent this time, and consistently wrong. This is the second failure mode, a fluent and stable derivation that is simply incorrect. The verified system classifies it positive, for the same structural reason.

![Figure 5: per-run verdicts on the two hardest cases](figures/fig5_drift.png)

*Figure 5. Per-run verdicts on the two hardest cases, both of which are genuine lupus. The baseline's first verdict flips with the random seed, and its second is consistently wrong. The verified system is correct and identical on every run.*

Both cases have the same shape: a confounder is present, but a lupus-specific antibody overrides it. The correct policy is a single explicit predicate in the rulebook. The model approximates that policy stochastically, and it errs in the direction that misses disease.

## Where our own system can fail

We hold our own system to the standard we are applying to the baseline, which means confronting an obvious objection. The verified system scored 100% on the verdict for all 50 cases across all five runs, but that figure is partly true by construction. Ground truth is the rulebook, and the kernel cannot disagree with the rulebook. So the verdict accuracy of the verified system is not the quantity that is actually at risk.

The quantity at risk is the autoformalization step, where the model reads the chart, and we measure it directly. Across 250 translations, fifty cases times five runs, the model made exactly one extraction error. On a single case in a single run it omitted a fever finding, and the computed score came out as 16 instead of 18. The verdict was unaffected, because that case cleared the threshold on its renal criterion regardless.

That single slip is the honest characterization of the architecture's limit, and it is also the design's central advantage. The residual uncertainty has been relocated. It is no longer "was the multi-step clinical reasoning sound," an opaque question you cannot check case by case. It is "was a single finding read correctly," a narrow, measurable step that can be hardened on its own, by cross-checking against structured fields in the record, by extracting several times and reconciling, or by asking a human to confirm. None of those is available for the monolithic reasoning of the baseline. We will keep reporting this error rate, because a verification system that hides its own failure mode has defeated its own purpose.

There is a second limit worth stating plainly. Verification guarantees that the rules were applied correctly. It does not, on its own, guarantee that the rules are clinically optimal. That is true, and it is exactly where the architecture's strongest property lives.

## A rule you can edit, and prove

When we first encoded the attribution rule, it was too aggressive. It stripped the joint-pain finding from any patient on a culprit drug, unconditionally, which made the hydralazine case come out negative. A rheumatologist would object, correctly, that the serology proves genuine disease.

In a probabilistic system, encoding that objection means rewriting a prompt and hoping the change generalizes without quietly breaking ten other cases, with no guarantee either way. In a formal system the correction is a localized change to a single definition, the `genuineSleMarker` predicate shown earlier. We changed that one definition, recompiled, and all 50 cases were re-decided immediately, consistently, and with fresh proof terms. No regression is possible without the kernel reporting it.

This is the property that matters most for deployment. The clinical policy is an explicit object that a domain expert can read, argue with, and approve, and once approved it governs every patient identically and deterministically until it is deliberately revised and re-verified. The disagreement between an aggressive and a refined attribution policy is not a matter of model temperament. It is a diff. That auditability, and the ability to fix a rule once and have the fix apply everywhere with a proof, is something no prompt and no round of fine-tuning can offer.

## Beyond lupus

Lupus is one classification standard. The machine underneath it is domain-general. Any high-stakes field that runs on written rules, constraints, and consequences has the same shape that made this work: diagnostic criteria across medicine, statutory tax computation, regulatory compliance, insurance adjudication, financial controls. In each of these the prevailing approach is to deploy a fluent model that produces answers that are plausible but not proven, and in each of these a confidently wrong output carries liability. The requirement is the same everywhere. It is a verification layer that turns a model's proposed answer into a checkable proof against the governing rules.

The pattern repeats: an autoformalizer to bridge unstructured input and formal representation, a rulebook that encodes the domain as decidable propositions, and a kernel that certifies each verdict. The model proposes, and the kernel disposes.

## Reproducibility

The complete system is small and self-contained: the encoded criteria in Lean, the 50-case dataset with authored ground truth, the two-system experimental harness, and the raw per-run results. The benchmark reruns end to end, and every verdict is accompanied by a proof term.

## In closing

Given a published diagnostic standard in plain language, a frontier model classified our 50-case benchmark at 96.8% accuracy, with perfect specificity and flawless performance on every structurally difficult category. It also missed two of twenty genuine lupus patients, and on one of them it returned different diagnoses on identical, repeated queries. Those are not the failures of a weak system. They are the failures inherent in deciding a high-stakes question by sampling.

The verified system classified the same benchmark with perfect sensitivity and specificity, perfect run-to-run consistency, and a machine-checkable proof behind every verdict, with its only residual error confined to a single, measurable reading step that did not change a diagnosis. In any domain where a wrong answer carries a cost, an output you can prove correct is worth more than one that is merely likely to be. A diagnosis should be a proof, not a probability.

---

## References

1. Aringer M, Costenbader K, Daikh D, et al. **2019 European League Against Rheumatism / American College of Rheumatology classification criteria for systemic lupus erythematosus.** Arthritis & Rheumatology, 2019; 71(9): 1400-1412. *The clinical standard we formalized, including the entry criterion, weighted domains, and the attribution clause.*

2. Moura L de, Ullrich S. **The Lean 4 theorem prover and programming language.** Proceedings of the 28th International Conference on Automated Deduction (CADE), 2021. *The proof assistant and kernel that form our trusted computing base.*

3. Google DeepMind. **AI achieves silver-medal standard solving International Mathematical Olympiad problems** (AlphaProof and AlphaGeometry 2), 2024. *Evidence that machine-generated, formally checked proofs now reach expert-level reasoning, the foundation this approach builds on.*

4. Trinh TH, Wu Y, Le QV, He H, Luong T. **Solving olympiad geometry without human demonstrations** (AlphaGeometry). Nature, 2024; 625: 476-482. *A neuro-symbolic system pairing a language model with a formal engine, the same division of labor we use.*

5. Wu Y, Jiang AQ, Li W, et al. **Autoformalization with large language models.** Advances in Neural Information Processing Systems (NeurIPS), 2022. *Establishes the autoformalization step, translating natural language into a formal representation a machine can verify.*

6. Dziri N, Lu X, Sclar M, et al. **Faith and Fate: limits of transformers on compositionality.** Advances in Neural Information Processing Systems (NeurIPS), 2023. *Documents the systematic, scale-resistant failures of language models on multi-step compositional and arithmetic reasoning, the class of failure our results reproduce.*

7. Holtzman A, Buys J, Du L, Forbes M, Choi Y. **The curious case of neural text degeneration.** International Conference on Learning Representations (ICLR), 2020. *On stochastic decoding, the mechanism behind the run-to-run non-determinism in Figure 5.*

8. Singhal K, Azizi S, Tu T, et al. **Large language models encode clinical knowledge.** Nature, 2023; 620: 172-180. *Shows that frontier models hold substantial clinical knowledge, consistent with our strong baseline, while motivating the need for guarantees on top of it.*

9. Graber ML, Franklin N, Gordon R. **Diagnostic error in internal medicine.** Archives of Internal Medicine, 2005; 165(13): 1493-1499. *Quantifies the clinical cost of diagnostic error, including premature closure and anchoring, the human analog of the model's missed-mimic failures.*

10. Vaglio A, Grayson PC, Fenaroli P, et al. **Drug-induced lupus: traditional and new concepts.** Autoimmunity Reviews, 2018; 17(9): 912-918. *Clinical basis for our attribution rule, including why anti-dsDNA argues against a pure drug-induced picture.*

---

## Appendix

### A. Dataset composition

Fifty synthetic vignettes, 20 lupus-positive and 30 lupus-negative, authored so that ground truth is unambiguous and the formal rulebook is the single source of truth.

| Category | n | Designed to test |
|---|---|---|
| Clear SLE | 10 | Straightforward positives across organ domains |
| Sub-threshold | 7 | Entry met but score below 10 |
| ANA-negative | 6 | Entry gate fails despite other findings |
| Drug-induced mimic | 8 | Attribution to a culprit drug, both pure and disease-behind-drug |
| Infection mimic | 8 | Attribution to a chronic infection, both pure and disease-behind-infection |
| Boundary and arithmetic | 11 | Exact threshold, domain-maximum counting, laboratory-only-no-clinical |

### B. Metric definitions

**Verdict accuracy** is the fraction of cases whose predicted classification matches ground truth, averaged over five runs. **Sensitivity** is the true-positive rate over the 20 lupus-positive cases; **specificity** is the true-negative rate over the 30 negatives. **Score exact-match** is the fraction of cases whose computed additive score equals the ground-truth score. **Run-to-run consistency** is the fraction of cases for which a system returned the same verdict on all five runs. Confusion matrices and per-category figures use the **majority verdict** across the five runs.

### C. Model and configuration

Both systems used the same frontier model with adaptive thinking enabled. The baseline received the full criteria in natural language and produced the score and classification directly; the score was requested independently of the entry gate so that the score metric is comparable across systems. The verified system used structured extraction constrained to the atomic-finding vocabulary, with explicit instructions not to score or classify. Each system was run five times over all 50 cases, for 500 model calls in total.

### D. The formal encoding

Classification is encoded as a decidable proposition: the conjunction of the entry gate (ANA at least 1:80), the presence of at least one clinical criterion, and a total weighted score of at least 10. The score uses domain-maximum aggregation, taking only the highest-weighted counting item per domain across all ten domains. Attribution is a Boolean predicate that suppresses a finding when a confounder explains it, except when a lupus-specific antibody (anti-dsDNA or anti-Smith) is present, in which case attribution is switched off and the finding counts. Because the proposition is decidable, Lean's kernel evaluates any concrete patient to a definite verdict and emits a proof term; the kernel is the only component that must be trusted.

### E. Reproduction

The repository contains the Lean formalization, the dataset with authored facts, the experimental harness, the figure-generation script, and the raw results. Running the harness recomputes ground truth from the rulebook, executes both systems over five runs, and regenerates the metrics and figures reproduced in this post.
