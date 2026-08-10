import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as Figure, d as ImoTotalTimeChart, f as InlineCode, h as P, i as DataTable, l as Hr, n as CodeBlock, o as H2, p as LatencyByArmChart, r as CostAccuracyParetoChart, s as H3, t as AccuracyByArmChart, u as ImoTimeByProblemChart, v as UL } from "./charts-DaMzx0Id.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-CF6Txbv7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StepChip({ step, active, onHover, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onMouseEnter: onHover,
		onFocus: onHover,
		className: `rounded-sm border px-3 py-2 text-left font-display text-[13px] font-medium transition-colors ${active ? tone === "accent" ? "border-accent bg-accent/10 text-foreground" : "border-foreground/50 bg-foreground/5 text-foreground" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`,
		children: step.title
	});
}
function TrustBoundaryDiagram({ probabilistic, verified }) {
	const [active, setActive] = (0, import_react.useState)(null);
	const activeStep = active ? (active.zone === "prob" ? probabilistic : verified)[active.index] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sm border border-dashed border-foreground/30 bg-muted/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
				children: "Probabilistic — the model"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: probabilistic.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepChip, {
					step,
					tone: "amber",
					active: active?.zone === "prob" && active.index === i,
					onHover: () => setActive({
						zone: "prob",
						index: i
					})
				}, step.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative my-3 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-0 flex-1 border-t border-dashed border-foreground/30",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative z-10 bg-background px-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground",
					children: "trust boundary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-0 flex-1 border-t border-dashed border-foreground/30",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sm border border-border bg-muted/20 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent",
				children: "Verified — deterministic"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: verified.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepChip, {
					step,
					tone: "accent",
					active: active?.zone === "verified" && active.index === i,
					onHover: () => setActive({
						zone: "verified",
						index: i
					})
				}, step.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 min-h-[3.6em] rounded-sm border border-border bg-background px-4 py-3 text-[13.5px] leading-relaxed text-foreground/85",
			children: activeStep ? activeStep.detail : "Hover or focus a step above to read what it does."
		})
	] });
}
function FluencyIsNotCorrectness() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "tldr",
			children: "TL;DR"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Large language models exhibit strong natural-language fluency but remain unreliable at executing formal rule systems. We evaluate whether separating semantic extraction from deterministic execution improves correctness on RuleArena, an open evaluation benchmark for rule-guided reasoning, using its airline baggage fee domain. We compare three tiers of Claude models, first unaided and then within a two-stage verification stack in which the language model acts only as an autoformalizer, translating each itinerary into a machine-checkable formal representation, while a deterministic solver, written in Catala, executes the policy." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Verification raises frontier accuracy from 54% and 61% to 100% while simultaneously reducing inference cost by roughly a factor of fourteen and latency by an order of magnitude. Unaided, two frontier generations of the same model family return the identical wrong dollar amount on shared failure cases, which indicates that the errors originate in shared learned priors rather than insufficient inference-time reasoning. Most notably, a verified budget model outperforms unaided frontier models, suggesting that deterministic execution can compensate for substantial differences in model capability on rule-governed tasks." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hr, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "where-models-go-wrong",
			children: "Where language models quietly go wrong"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Modern language models have become remarkably capable at interpreting natural-language instructions. Whether they correctly execute the semantics of those instructions remains substantially less understood. A model can restate a policy accurately, walk through its application step by step, and still return a number the policy does not license." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This distinction matters because many practical domains, including taxation, healthcare, finance, and regulatory compliance, depend not on fluent explanations but on faithful execution of explicit rules. In these domains an answer is either derivable from the governing specification or it is not, and a persuasive derivation of a wrong answer is worse than no answer, because it disarms the reader's skepticism." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We investigate this question using RuleArena, a published evaluation benchmark in which real-world policies must be applied to concrete scenarios, and we focus on its airline baggage fee domain. A single case from that benchmark illustrates the phenomenon this report is about. Thomas is flying First Class from Montreal to Portland with ten checked bags, ranging from 55 to 99 pounds. Applying American Airlines' published fee schedule to his itinerary yields $3,445. A current frontier model, given the full published rules and an explicit note about the one difficult step, answers $3,185. The newest and most capable model in the same family, a full generation later and given more room for inference-time reasoning, also answers $3,185." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The two models do not merely fail. They fail identically, down to the dollar. If these failures were caused by limited reasoning capacity, the stronger model should miss differently or stop missing. It does neither. This observation motivated the experiment reported here: the failure appears to live in the model family's learned priors rather than in its inference-time effort, and if that is true, no amount of additional reasoning will remove it. A different system boundary might." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "the-question",
			children: "The question we wanted to answer"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We investigate whether failures on this benchmark arise primarily from faulty semantic execution rather than from limited reasoning capacity or limited language understanding." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "hypothesis",
			children: "Hypothesis"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "A hypothesis is only useful if it makes predictions that can be tested, and ours makes two. First, replacing probabilistic rule execution with deterministic execution should eliminate most observed failures without requiring a stronger language model. Concretely, a two-stage system in which the language model only produces a structured semantic representation of the input, and an executable specification makes every normative decision, should reach near-perfect accuracy even when the underlying model is weak, and the residual errors should be attributable to semantic parsing rather than to rule execution." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The second prediction is sharper. If execution is the bottleneck, then a budget model behind a deterministic decision procedure should outperform a frontier model reasoning unaided, because the difficult computation has been moved out of the probabilistic component entirely." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "putting-it-to-the-test",
			children: "Putting the idea to the test"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "To test these predictions, we used the 100 hardest (\"Level 3\") problems from RuleArena's airline domain. Each problem is a realistic American Airlines itinerary: a ticket price, a cabin class, a route, and up to eleven items including one free personal item. Ground truth is computed by the benchmark's own reference implementation rather than by human annotation, a property that turns out to matter a great deal, as the next section explains." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We compared three tiers of Claude:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-opus-4-8" }),
			" (frontier),",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-fable-5" }),
			" (Anthropic's newest and most capable model), and ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "claude-haiku-4-5" }),
			" (budget). Every tier was evaluated under the same three conditions, or arms, on the same 100 cases. In the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "baseline" }),
			" arm, the model receives the complete published fee rules verbatim as its system prompt, plus the itinerary, and produces the total fee directly. In the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "verified" }),
			" ",
			"arm, the model performs autoformalization only, translating the itinerary into a machine-checkable formal representation, and a deterministic solver kernel, described below, executes the policy: the language model never computes a fee, and the kernel never interprets prose. The ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "loop" }),
			" arm extends the verified arm with self-consistency voting, an assertion-retry round, and round-trip back-translation, escalating unresolved cases to the frontier model."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We deliberately made the baseline hard to beat. The unaided models receive the full policy text, not a paraphrase, and the prompt explicitly states that the free-bag assignment is an optimization rather than a positional lookup. Whatever failures the baseline shows cannot be blamed on missing information: the model is handed the rules and told exactly where the difficulty lies." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Across every arm we measured four things: accuracy against the reference implementation's ground truth, mean language-model latency per case (plus kernel latency where the kernel runs), total cost per run, and cost per correct answer." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "why-rulearena",
			children: "Why RuleArena?"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"We selected",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://arxiv.org/abs/2412.08972",
				target: "_blank",
				rel: "noreferrer",
				className: "text-accent underline underline-offset-2",
				children: "RuleArena"
			}),
			" ",
			"(Zhou et al., ACL 2025, MIT license) because it provides executable ground truth through a reference implementation rather than human annotation. This property isolates semantic execution errors from annotation ambiguity: when a model disagrees with the benchmark, the disagreement can be traced to a specific step of a runnable program rather than to a label whose provenance is unknown. RuleArena covers three domains, airline baggage fees, NBA transaction legality, and tax. We used the airline domain because its executable ground truth allowed us to validate our own re-encoding of the policy directly against it."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "implicit-optimization",
			children: "The implicit optimization problem"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The published policy reads like a lookup table. There is a base fee by bag position (1st, 2nd, 3rd, 4th and beyond), by route, and by cabin class. There is a surcharge if a bag is oversized, and another if it is overweight. Some route and class combinations make the first one or two bags free. A human interpreting the policy would apply it left to right, bag by bag." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The reference implementation does something the tables never state explicitly. When N bags are free (\"complimentary\") for a given route and class, the airline does not grant that status to whichever bags happen to be listed first. It assigns the free slots to whichever N bags would otherwise incur the highest oversize or overweight surcharges, minimizing the total charge. The benchmark therefore implicitly requires solving a constrained optimization problem that is absent from the textual policy but present in the executable specification. It is exactly the kind of step a fluent reader glides past, and it is where, as the results below show, the unaided models fail." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "system-boundary",
			children: "A different system boundary"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our system runs a minimal path through our verification stack, which pairs an autoformalizer with provers and domain-specific solvers. For this experiment it decomposes the task into two computational stages." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stage 1: autoformalization." }), " A language model reads the passenger's itinerary and formalizes it into a structured, machine-checkable representation: the ticket price, the cabin class, the route, and for every checked bag (skipping the free personal item), its size and weight. It performs no normative computation. It does not compute a fee, apply a threshold, or decide which bag is free."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stage 2: deterministic solving." }), " A deterministic decision procedure, written in Catala and hereafter called the verification kernel, acts as the solver over that formal representation, executing the policy: base fees by position, oversize and overweight surcharges per bag, and the optimal assignment of complimentary slots, solved as a genuine top-K selection rather than a guess."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "why-decomposition-works",
			children: "Why this decomposition works"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "This decomposition deliberately assigns language understanding to the language model while reserving all normative decision-making for the executable specification. The boundary minimizes the amount of computation delegated to probabilistic inference. Interpreting an itinerary is a task language models are demonstrably good at. Executing a policy with an embedded optimization is, as the results below show, a task they are demonstrably unreliable at, regardless of scale. The architecture places each task with the component that can be trusted to perform it. It is also the smallest useful slice of the full stack: the same boundary supports provers that return proof artifacts and counterexamples rather than a single number, and solvers for constraint systems far richer than a fee schedule." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 1,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"RuleArena's own rules and reference script are the source of truth. We hand-wrote the Catala kernel from the rules text and cross-checked it against the reference implementation on all 100 cases before trusting it. That cross-check is what makes the kernel usable as ground truth in everything downstream.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "font-mono text-[12.5px]",
					children: "run_experiment.py"
				}),
				" ",
				"then runs all nine arms (three models across baseline, verified, and loop) over the same 100 cases. Every output, from the scores to the summary table to the per case response PDF, is generated from that run's logged data."
			] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBoundaryDiagram, {
				probabilistic: [{
					title: "Stage 1 · autoformalization",
					detail: "A language model reads the passenger's itinerary and formalizes it into a structured, machine-checkable representation: ticket price, cabin class, route, and the size and weight of every checked bag. It performs no normative computation."
				}],
				verified: [{
					title: "Stage 2 · Catala kernel",
					detail: "A deterministic decision procedure executes the policy over that formal representation: base fees by position, oversize and overweight surcharges per bag, and the optimal assignment of complimentary slots as a genuine top-K selection."
				}, {
					title: "Cross-checked vs. reference script",
					detail: "The kernel was validated case by case against RuleArena's own reference implementation on all 100 cases before being trusted as ground truth for anything downstream."
				}]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The kernel's treatment of the optimization is compact enough to show in full:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: "catala",
			children: `declaration insert_top3
  content Top3
  depends on acc content Top3, x content money
  equals
    if x > acc.v1 then Top3 { -- v1: x -- v2: acc.v1 -- v3: acc.v2 }
    else if x > acc.v2 then Top3 { -- v1: acc.v1 -- v2: x -- v3: acc.v2 }
    else if x > acc.v3 then Top3 { -- v1: acc.v1 -- v2: acc.v2 -- v3: x }
    else acc`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineCode, { children: "Top3" }), " tracks the three largest values seen so far. Folding it over every bag's oversize or overweight surcharge finds the K bags (at most three, per this fee schedule) that should receive the free slots. It is the same computation the reference implementation performs with Python's sort, done here as a bounded insertion because Catala's list primitives have no built-in sort. We validated the re-encoding case by case against RuleArena's reference implementation before trusting it, and all 100 cases matched exactly on the first clean run."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "what-we-observed",
			children: "What we observed"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "correctness",
			children: "Correctness"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Arm",
				"Accuracy",
				"LLM s/case",
				"$/run",
				"$/correct"
			],
			rows: [
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "frontier baseline" }, "a"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "54.0%" }, "b"),
					"68.08",
					"$18.08",
					"$0.335"
				],
				[
					"frontier verified",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "100.0%" }, "c"),
					"3.32 (+2.78 kernel)",
					"$1.32",
					"$0.013"
				],
				[
					"frontier loop",
					"100.0%",
					"10.67",
					"$4.44",
					"$0.044"
				],
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "fable baseline" }, "d"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "61.0%" }, "e"),
					"25.91",
					"$16.92",
					"$0.277"
				],
				[
					"fable verified",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "100.0%" }, "f"),
					"7.59 (+3.75 kernel)",
					"$3.63",
					"$0.036"
				],
				[
					"fable loop",
					"100.0%",
					"22.52",
					"$11.44",
					"$0.114"
				],
				[
					"cheap baseline",
					"3.0%",
					"23.75",
					"$2.05",
					"$0.682"
				],
				[
					"cheap verified",
					"82.0%",
					"1.92 (+3.63 kernel)",
					"$0.22",
					"$0.003"
				],
				[
					"cheap loop",
					"85.0%",
					"6.12",
					"$1.10",
					"$0.013"
				]
			],
			note: "Frontier is Opus 4.8, fable is Fable 5, cheap is Haiku 4.5."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 2,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unaided accuracy for all three models sits well under 100%. Every frontier verified and loop arm reaches it. Haiku's verified and loop arms reach 82% and 85%." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccuracyByArmChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Unaided, the frontier models fail at a substantial rate: 46% of cases for Opus 4.8 and 39% for Fable 5, despite receiving the complete published rules and an explicit statement that the free-slot assignment is an optimization. Both verified frontier arms reach 100%. The budget model fails almost entirely unaided, at 3%, and reaches 82% verified and 85% with the loop." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The aggregate numbers tell the overall story, but individual failures are often more revealing. We've made the benchmark interactive so you can compare unaided model outputs with verified outputs on the same RuleArena cases." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Explore the live playground:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://playground.boundlessintuition.com/",
				target: "_blank",
				rel: "noreferrer",
				className: "text-accent underline underline-offset-2",
				children: "playground.boundlessintuition.com"
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "efficiency",
			children: "Efficiency"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 3,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accuracy against cost per run, on a log scale. The verified systems exceed the baselines on accuracy and cost simultaneously. Hover a point for the exact arm, its cost per run, and its cost per correct answer." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostAccuracyParetoChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The verified frontier system is roughly 14 times cheaper per run than its unaided counterpart and about 25 times cheaper per correct answer. The cheapest configuration that beats every unaided baseline, the verified budget model, costs $0.22 per 100-case run, against $18.08 for the unaided frontier baseline." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "latency",
			children: "Latency"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 4,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Mean latency per answer. The unaided baselines spend tens of seconds on inference-time reasoning through the assignment problem. Semantic parsing is fast regardless of how hard that problem is, because the kernel, not the model, executes it." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatencyByArmChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The verified frontier system answers in roughly 6 seconds end to end against 68 seconds of unaided reasoning. Extracting a bag's dimensions is a short task regardless of how hard the underlying optimization is, and the kernel executes that optimization in milliseconds." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "why-failures-matter",
			children: "Why the failures matter"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Three observations from the results bear directly on the hypothesis." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Identical errors across model generations." }), " On cases both frontier models miss, they frequently return the identical wrong dollar amount, including the $3,185 answer to the Thomas case described in the introduction. The persistence of identical errors across model generations suggests that these failures originate from shared learned priors rather than insufficient inference-time reasoning. Increased reasoning capacity improved explanation quality without correcting the underlying semantic execution. This is the pattern the hypothesis predicts: a prior about how a rule \"should\" work does not shrink as models get stronger, whereas a reasoning gap should."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verification eliminates frontier failures completely." }),
			" ",
			"Both frontier models move from 54% and 61% to 100% behind the kernel, with no change to the models themselves. The 46-point and 39-point failure rates were therefore not caused by an inability to interpret the itinerary. The models could always read the input. What they could not reliably do was execute the policy, and removing that responsibility removed the failures."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Residual budget-tier error is confined to semantic parsing." }),
			" ",
			"The verified budget model reaches 82% rather than 100%, and every remaining miss is a parsing failure: an occasionally misread bag weight, or a bag dropped from a list of ten. None are kernel failures. Execution is exact by construction whenever the structured representation is correct, so the residual risk is narrow and measurable rather than open-ended. This is the error profile the hypothesis predicts for a weak parser in front of a sound decision procedure."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Taken together, the evidence supports the hypothesis. The dominant failure mode of the unaided models is semantic execution, not language understanding, and substituting deterministic execution removes it without requiring a stronger model." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "deterministic-execution",
			children: "What changes when execution becomes deterministic"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deterministic execution changes which model you need." }),
			" ",
			"The verified budget model, at 82%, outperforms both unaided frontier models, at 54% and 61%, while costing about $0.22 per run against roughly $18 and answering in about 6 seconds against 68. A budget model with a verification layer beats a frontier model without one. The practical consequence is that on rule-governed tasks, capability spending and correctness are not the same axis: moving the normative computation into an executable specification buys more accuracy than moving up a model tier, at a small fraction of the price."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verification is not a tradeoff in this domain." }), " The usual expectation is that additional checking costs money or time. Here it saves both, because the expensive resource was never the check. It was the tens of seconds of inference-time reasoning the unaided model spends attempting an optimization it cannot reliably perform. Replacing that reasoning with a millisecond-scale execution shortens the language model's task to semantic parsing, which is fast and cheap at every tier."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Where the approach applies." }), " The architecture requires that the governing rules be expressible as an executable specification and that the inputs be extractable as a structured semantic representation. Fee schedules, tax computations, benefit eligibility, and compliance thresholds fit this shape. Tasks whose difficulty lies in the interpretation itself, such as ambiguous clinical narratives or contested legal readings, do not, because the hard part cannot be moved across the trust boundary."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "When verification does not help." }), " The kernel cannot repair a wrong structured representation. If the parser misreads a weight, the kernel will execute the policy exactly, on the wrong facts. The budget tier's residual 18% is precisely this case. Verification narrows the failure surface to the parsing stage. It does not close it."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "bigger-picture",
			children: "The bigger picture"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our results suggest that the principal bottleneck in rule-governed reasoning is not language understanding but semantic execution. Two generations of frontier models, given the complete policy and told where the difficulty lies, fail on 39% to 46% of cases and frequently fail identically, which points to shared learned priors that additional inference-time reasoning does not dislodge. Separating the two functions, so that the language model performs interpretation and an executable specification performs every normative decision, eliminates the frontier failures entirely while reducing inference cost by roughly a factor of fourteen and latency by an order of magnitude, and it lifts a budget model above the unaided frontier. More broadly, these findings support a design paradigm in which language models perform interpretation, while executable specifications remain responsible for normative decision-making. The kernel in this experiment is the simplest instance of that paradigm; the same architecture extends to provers and solvers that return not only the answer but its derivation: which rule applied, which assumptions were made, and which constraints were checked." })
	] });
}
function TowardsVerifiedSupertechnology() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Artificial intelligence is rapidly becoming the operating system of the modern world. It is writing code, making financial decisions, controlling critical infrastructure, conducting scientific research, and increasingly acting autonomously on our behalf." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"Yet despite all this progress, one fundamental problem remains unsolved.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "We have no reliable way to know whether an AI system is actually correct." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Today's frontier models optimize for plausibility, not truth. They can reason, plan, and execute, but they can also hallucinate, violate policies, misinterpret regulations, or make subtle mistakes that humans fail to notice until it's too late." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Scaling intelligence without scaling trust is a dangerous trajectory." }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "cost-of-unverified",
			children: "The Cost of Unverified Intelligence"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"On ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "June 4, 1996" }),
			", the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ariane 5" }),
			" rocket exploded just ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "37 seconds" }),
			" after launch, destroying a payload worth ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$370 million" }),
			". The official investigation revealed the cause: a software error inherited from Ariane 4. A 64-bit number was converted to a 16-bit one without bounds checking. The code worked exactly as it had been written, but the assumptions it relied on no longer held. No one had verified that those assumptions were still correct under the new conditions."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Today, software still fails this way. The difference is that increasingly, software is being written, operated, and orchestrated by AI. As autonomous systems begin making decisions on our behalf, the cost of silent failures grows exponentially." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We believe the next breakthrough in AI will not come from making models bigger." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "It will come from making intelligence verifiable." }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Every major computing revolution eventually acquired a trust layer. The internet required cryptography before it could power global commerce. Cloud computing required isolation before enterprises trusted it. Modern software evolved from simply running code to proving that critical systems behaved correctly." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "AI is approaching the same moment." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Today's safety approaches rely on prompts, classifiers, human review, and statistical evaluations. These methods improve behavior, but they cannot provide guarantees. In high-consequence domains, confidence is not enough." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Critical decisions require proof, not probability." }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "our-thesis",
			children: "Our Thesis"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"At Boundless Intuition, we believe trust should become a property of AI systems, not a hope placed in them. Our conviction is simple:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "every important AI decision should be verifiable before it is trusted." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "As AI becomes responsible for interpreting regulations, enforcing security policies, writing software, conducting scientific research, and operating critical infrastructure, verification becomes more than a technical challenge. It becomes a prerequisite for deploying AI responsibly at scale." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We believe the future of AI will not be defined by the models that generate the most convincing answers." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "It will be defined by the systems whose decisions can be trusted." }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "verified-superintelligence",
			children: "Towards Verified Superintelligence"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "As AI systems become more capable, society will increasingly depend on them for decisions that affect millions of people. The challenge is no longer generating intelligence. The challenge is ensuring that intelligence behaves correctly." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "As models continue to improve, the fraction of consequential AI decisions that a human can personally inspect approaches zero. Every assurance mechanism that depends on a person reading the output eventually reaches its limit." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The future requires a different foundation: one where trust scales with intelligence, and correctness becomes a property of the system itself rather than an expectation placed on the user." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We believe a world where advanced AI is safe to deploy is a world where consequential decisions can be verified before they are trusted. It is a world where correctness matters as much as capability, and where trust is earned through evidence rather than confidence." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "That is the future we are building toward. It is the foundation of trustworthy AI, and the path towards verified superintelligence." })
	] });
}
function ExtLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "text-accent underline underline-offset-2",
		children
	});
}
function APerfectScoreOnIMO2026() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Scaling intelligence without scaling trust is a dangerous trajectory. At Boundless Intuition, we are building systems for verified intelligence to address this." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "That requires solving two problems at once. Verification must be rigorous enough to establish correctness and fast enough to be useful in the real world." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Eventually, this approach must generalize. The same underlying reasoning system should be able to operate across mathematical theorems, tax rules, medical constraints, semiconductor specifications, security policies, and other domains. The formal representation and verification mechanism may differ, but the need for a checkable guarantee remains the same." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
			"The International Mathematical Olympiad is a useful stress test for that ambition. IMO 2026, held in Shanghai on 15–16 July 2026, is the most prestigious mathematics competition in the world, and its problems are hard in ways that expose the weaknesses of automated provers. We ran",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dirac" }),
			", our autonomous proving agent, on the publicly released formalizations of all six problems published by Axiom Maths and compared our results against other externally published provers on the same statements."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dirac proved all six." }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UL, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
			"Official contest problems:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtLink, {
				href: "https://www.imo-official.org/problems/2026/",
				children: "imo-official.org/problems/2026"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
			"Our verified solutions:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtLink, {
				href: "https://github.com/Boundless-Intuition/IMO2026",
				children: "github.com/Boundless-Intuition/IMO2026"
			})
		] })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "the-result",
			children: "The result"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "All three systems were run against the same formalizations. Total proving time across the six problems:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 1,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Total time to prove all six problems. Dirac takes 7h 18m; the other publicly reported results on the same formalizations are shown alongside for reference." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImoTotalTimeChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"System",
				"All six proved",
				"Total proving time",
				"Verification"
			],
			rows: [
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dirac (ours)" }, "d"),
					"Yes",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "7h 18m" }, "dt"),
					"Comparator pass"
				],
				[
					"Pramaana Hardy",
					"Yes",
					"8h 57m",
					"Comparator pass"
				],
				[
					"Axiom AxiomProver",
					"Yes",
					"24h 56m",
					"Comparator pass"
				]
			],
			note: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Figures for Hardy and AxiomProver are taken from the results published by",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtLink, {
					href: "https://github.com/pramaana-labs/imo2026-lean",
					children: "Pramaana Labs"
				}),
				" ",
				"and",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtLink, {
					href: "https://github.com/AxiomMath/IMO2026",
					children: "Axiom Maths"
				}),
				", respectively. We thank both Pramaana and Axiom Maths for publishing their results."
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3, {
			id: "per-problem",
			children: "Per problem"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
			n: 2,
			caption: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Time is not spread evenly across the paper. Q1, Q4 and Q5 are quick for every system; Q2, Q3 and Q6 account for most of Dirac’s total." }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImoTimeByProblemChart, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: [
				"Problem",
				"Dirac time",
				"Dirac lines",
				"Hardy time",
				"Hardy lines",
				"AxiomProver time",
				"AxiomProver lines"
			],
			rows: [
				[
					"Q1",
					"29m 05s",
					"513",
					"20m 26s",
					"393",
					"24m",
					"521"
				],
				[
					"Q2",
					"1h 20m 18s",
					"1,572",
					"2h 53m",
					"738",
					"6h",
					"1,224"
				],
				[
					"Q3",
					"2h 10m 28s",
					"2,697",
					"3h 04m",
					"2,772",
					"14h 29m",
					"4,229"
				],
				[
					"Q4",
					"15m 59s",
					"387",
					"16m 20s",
					"307",
					"39m",
					"520"
				],
				[
					"Q5",
					"18m 11s",
					"323",
					"31m 09s",
					"337",
					"1h 05m",
					"457"
				],
				[
					"Q6",
					"2h 44m 05s",
					"706",
					"1h 52m",
					"332",
					"2h 19m",
					"771"
				],
				[
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total" }, "t"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "7h 18m 06s" }, "dt"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "6,198" }, "dl"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "8h 57m" }, "ht"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "4,879" }, "hl"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "24h 56m" }, "at"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "7,722" }, "al")
				]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dirac is faster overall" }), " and the margin comes from the hard end of the paper rather than from the easy problems."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Q3 is where AxiomProver spent 14h 29m. Dirac cleared it in 2h 10m with a 2,697-line proof, shorter than Hardy’s 2,772 and well under AxiomProver’s 4,229." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Q2 is the geometry problem, historically the place where Lean proofs blow up in length and search time. Dirac finished in 1h 20m, against 2h 53m for Hardy and 6h for AxiomProver, by attacking the problem through vectors and linear algebra rather than synthetic geometry. The trade-off is visible in the line count: our proof is more than twice the length of Hardy’s." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "cost",
			children: "Cost"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			headers: ["Problem", "Cost (USD)"],
			rows: [
				["Q1", "$15.18"],
				["Q2", "$55.79"],
				["Q3", "$29.53"],
				["Q4", "$9.55"],
				["Q5", "$15.47"],
				["Q6", "$51.06"],
				[/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total" }, "t"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "$176.58" }, "c")]
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "where-it-got-interesting",
			children: "Where it got interesting"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Q3." }), " Dirac split the game into an upper bound and a lower bound, farmed out a large lemma toolkit to parallel sub-tasks, proved a long lower-bound argument, and assembled the pieces. It is our cleanest result of the six: faster and shorter."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Q6." }), " Dirac reduced the problem to a single crux lemma almost immediately, then spent roughly an hour stuck on the informal argument behind that crux. It eventually extracted a rigorous prime-bounding approach and formalized it cleanly. It got there, but the detour is why Q6 took 2h 44m and trails both competitors. It is the clearest target for the next iteration."] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, {
			id: "what-comes-next",
			children: "What comes next"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "IMO 2026 is one benchmark, but it gives us a clear way to measure progress. Dirac is currently the fastest among the publicly reported systems we compared against, demonstrating that autonomous formal proving can be both rigorous and fast, while still leaving significant room for improvement." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our next focus is pushing Dirac further on proof decomposition, difficult crux arguments, and proving cost, while improving how quickly and effectively it can generalize its reasoning beyond mathematical formalization." })
	] });
}
var narration_default = { "fluency-is-not-correctness": {
	"audio": "/blog/audio/fluency-is-not-correctness.mp3",
	"duration": 765.4,
	"hash": "017d74423f0defe7",
	"sections": 16,
	"profile": "9f6a918c-3993-4573-b404-b6270fe7dd27",
	"generatedAt": "2026-07-26T05:08:44.038Z"
} };
var BLOG_TAGS = [
	"Announcements",
	"Partnerships",
	"Research"
];
var BLOG_POSTS = [
	{
		slug: "dirac-perfect-score-imo-2026",
		title: "Dirac Achieves a Perfect 6/6 on IMO 2026 at Record Speed",
		subtitle: "Our autonomous prover produced machine-checked proofs of every problem at this year's International Mathematical Olympiad.",
		description: "We ran Dirac, our autonomous proving agent, on the publicly released formalizations of all six IMO 2026 problems. It produced a machine-checked proof of every one, in 7h 18m of total proving time at a cost of $176.58.",
		tags: ["Announcements", "Research"],
		author: "Boundless Intuition Research",
		date: "2026-08-11",
		readingTime: "5 min read",
		image: "/blog/imo-hero.webp",
		Content: APerfectScoreOnIMO2026
	},
	{
		slug: "towards-verified-superintelligence",
		title: "Towards Verified Superintelligence",
		subtitle: "Why the next breakthrough in AI is not bigger models, but verifiable intelligence.",
		description: "AI is becoming the operating system of the modern world, yet we have no reliable way to know whether an AI system is actually correct. Scaling intelligence without scaling trust is a dangerous trajectory.",
		tags: ["Announcements", "Research"],
		author: "Boundless Intuition Research",
		date: "2026-08-06",
		readingTime: "3 min read",
		image: "/blog/thesis-hero.webp",
		Content: TowardsVerifiedSupertechnology
	},
	{
		slug: "fluency-is-not-correctness",
		title: "Fluency Is Not Correctness",
		subtitle: "Separating semantic parsing from deterministic execution in rule-governed reasoning.",
		description: "On RuleArena's airline domain, verification lifts two frontier Claude models from 54% and 61% to 100% while cutting cost roughly fourteenfold, and a verified budget model beats both unaided frontier models.",
		tags: ["Research"],
		author: "Boundless Intuition Research",
		date: "2026-07-17",
		readingTime: "12 min read",
		image: "/blog/fluent-hero.webp",
		Content: FluencyIsNotCorrectness
	}
];
function getBlogPost(slug) {
	return BLOG_POSTS.find((p) => p.slug === slug);
}
/**
* Pre-rendered narration for a post, if one has been generated.
*
* The manifest is written by `bun run narrate` (see `scripts/README.md`), which
* drives a local Voicebox instance - nothing is synthesised at request time.
* A post with no entry falls back to the browser's own speech synthesis.
*/
function getNarration(slug) {
	const entry = narration_default[slug];
	return entry?.audio && entry.duration > 0 ? entry : void 0;
}
function formatBlogDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T00:00:00Z`)).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
//#endregion
export { getNarration as a, getBlogPost as i, BLOG_TAGS as n, formatBlogDate as r, BLOG_POSTS as t };
