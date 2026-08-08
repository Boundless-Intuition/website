import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TopBar } from "./TopBar-DCTQo05p.mjs";
import { h as P, m as Lead, t as AccuracyByArmChart, u as HeadlineMetricsRadar, y as TaxCostAccuracyChart } from "./charts-C6lQQitl.mjs";
import { t as SiteFooter } from "./SiteFooter-Dt_ACPC3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overview-DfvrPM-6.js
var import_jsx_runtime = require_jsx_runtime();
/**
* The shareable overview - an unlisted one-pager carrying the same content as
* the "Boundless Intuition" PDF that gets sent to investors, so a link can go
* out in place of an attachment.
*
* It wears the site's own TopBar and SiteFooter, laid out exactly as the
* landing page does (transparent bar, hero pulled up under it with -mt-16).
* Nothing anywhere else on the site links here, and the route sets
* `noindex, nofollow` so it stays out of search results.
*/
var PLAYGROUND = "https://playground.boundlessintuition.com/";
/**
* Publication date shown in the byline. Static on purpose - this is when the
* overview was last revised, not when the page happens to be rendered. Bump it
* whenever the numbers or domains change.
*/
var PUBLISHED = "Jul 30, 2026";
function ResourceRow({ label, href, children, internal }) {
	const className = "font-display text-[14.5px] font-medium text-foreground underline decoration-accent/50 decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:w-[9.5rem]",
			children: label
		}), internal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: href,
			className,
			children
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href,
			target: "_blank",
			rel: "noopener noreferrer",
			className,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "ml-1 text-[11px]",
				children: "↗"
			})]
		})]
	});
}
/** The links block that follows the aviation and clinical work. */
function ResourcePanel({ studyHref, studyLabel, playgroundSection }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-6 rounded-[10px] bg-muted/45 p-5 md:px-7 md:py-6 dark:bg-muted/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceRow, {
				label: "In-depth study",
				href: studyHref,
				internal: true,
				children: studyLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ResourceRow, {
				label: "Live playground",
				href: PLAYGROUND,
				children: ["Try it under ", playgroundSection]
			})]
		})
	});
}
/**
* A numbered benchmark section. The hierarchy is carried by type alone - the
* index sits as a hairline-ruled column beside the title rather than behind a
* coloured rule, so nothing competes with the figures below.
*/
function Benchmark({ index, title, domain, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20 first-of-type:mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/45",
						children: index
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "h-px w-6 bg-border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: domain })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-display text-[27px] font-light leading-[1.15] tracking-[-0.02em] text-foreground md:text-[32px]",
				children: title
			})]
		}), children]
	});
}
/**
* Figures on this page are plates rather than bordered cards: a soft panel
* holds the chart, and the caption sits underneath on the page itself. The
* blog's own <Figure> is left alone - nine figures across the two posts
* depend on its boxed treatment.
*/
function Plate({ n, caption, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[10px] bg-muted/45 px-4 py-6 md:px-7 md:py-8 dark:bg-muted/60",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "mt-3.5 flex gap-3 px-1 text-[13px] leading-relaxed text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-[3px] shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45",
				children: ["Fig ", n]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: caption })]
		})]
	});
}
/** Indented corpus callout, matching the PDF's blockquoted result lines. */
function Corpus({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 border-l border-border pl-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[16px] leading-[1.75] text-foreground/85",
			children
		})]
	});
}
/**
* Headline number under a hairline rule. Ruled rather than boxed - the page
* already carries plates for the figures, and a fifth bordered grid on top of
* those read as clutter.
*/
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-[28px] font-light leading-none tracking-[-0.02em] text-foreground",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2.5 text-[12.5px] leading-snug text-muted-foreground",
			children: label
		})]
	});
}
function OverviewPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative -mt-16 flex min-h-[clamp(440px,62vh,560px)] flex-col justify-end overflow-hidden md:min-h-[clamp(540px,72vh,760px)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"aria-hidden": true,
						className: "absolute inset-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
								media: "(max-width: 640px)",
								srcSet: "/overview-hero-mobile.webp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/overview-hero.webp",
								alt: "",
								className: "blog-cover-img h-full w-full object-cover object-center opacity-95 dark:opacity-80"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/15 dark:bg-background/25" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/65 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-background via-background/88 to-transparent" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto w-full max-w-3xl px-6 pb-20 md:pb-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Overview · Domains & Benchmarks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.025em] text-foreground md:text-[3.6rem]",
								children: "Boundless Intuition"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-display text-[19px] font-light italic text-muted-foreground md:text-[21px]",
								children: "The AI you can Trust"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-3xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[68ch]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lead, { children: "Boundless Intuition builds the verification layer for AI. We turn a company's policies, regulations, and domain's expert knowledge into machine-checkable logic, then verify every high-stakes AI action/output before it is trusted or executed." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "When an AI agent tries to perform a consequential action, such as approving a tax filing, calculating a clinical dosage, authorizing a payment, or changing a firewall rule." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our formal verification engine either produces a mathematical proof that the action satisfies the required rules or blocks it. Instead of asking companies to trust AI because it sounds confident, we give them machine-checkable proof that its decisions are correct, auditable, and compliant." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our long-term vision is to become the foundational layer for verified intelligence in high-stakes / mission-critical domains." })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-4 md:gap-x-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "100%",
								label: "Verified accuracy on RuleArena aviation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "14×",
								label: "Lower inference cost on aviation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "100%",
								label: "Verified accuracy on MedCalc-Bench"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: "8.5×",
								label: "Lower cost per correct answer on tax"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-3xl px-6 pt-20 pb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[13px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: "Domains & Benchmarks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-px w-full bg-border",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Benchmark, {
							index: "01",
							domain: "Aviation Verification",
							title: "RuleArena",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-[68ch]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We evaluate whether separating semantic extraction from deterministic execution improves correctness on RuleArena, an open evaluation benchmark for rule-guided reasoning, using its airline baggage fee domain." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(P, { children: [
										"Our pipeline of formalizers, a checker and a formal layer, improves frontier-model accuracy from 54% and 61% to 100%, while reducing inference cost by approximately",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "font-semibold text-foreground",
											children: "14×"
										}),
										" ",
										"and latency by a factor of",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "font-semibold text-foreground",
											children: "11×"
										}),
										"."
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
									n: 1,
									caption: "Accuracy of every arm on the 100 RuleArena airline cases. Verification lifts both frontier tiers to a perfect score, and carries the budget tier from 3% to 82%.",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccuracyByArmChart, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourcePanel, {
									studyHref: "/blog/fluency-is-not-correctness",
									studyLabel: "Fluency Is Not Correctness",
									playgroundSection: "aviation"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Benchmark, {
							index: "02",
							domain: "Clinical Verification",
							title: "MedCalc-Bench",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-[68ch]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our pipeline increased raw accuracy from 61-79% across all four Claude tiers to 100% at 29 ms at marginal cost per question." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Our audit even found bugs in MedCalc-Bench's own ground truth (wrong methadone conversion factors; 5 of 12 \"impossible\" questions have debatable labels)." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "Fable 5 (the most expensive model) scored below Sonnet and Opus; resampling flips only 11.7% of wrong answers. Errors are systematic." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
									n: 2,
									caption: "Baseline against verified across seven clinical metrics. The verified arm reaches the ceiling on every axis; the baseline gives ground on sensitivity, mimic accuracy, and run-to-run consistency.",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadlineMetricsRadar, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourcePanel, {
									studyHref: "/blog/a-diagnosis-should-be-a-proof-not-a-probability",
									studyLabel: "A Diagnosis Should Be a Proof, Not a Probability",
									playgroundSection: "clinical medicine"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Benchmark, {
							index: "03",
							domain: "Statutory Verification",
							title: "Tax code (Catala kernels, FR + US statutes)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-[68ch]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "We improved the performance of the non-frontier & open source models equivalent to that of frontier models with our pipeline." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Corpus, {
										label: "Easy-case corpus",
										children: [
											"Our verification pipeline enables a cheap, non-frontier model to match frontier-model accuracy at",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "8.5× lower cost per correct answer"
											}),
											", while reducing output tokens by",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "10 to 16×"
											}),
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Corpus, {
										label: "Hard-case French corpus",
										children: [
											"On the hard-case French corpus, frontier-model accuracy drops to",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "83.7%"
											}),
											", while cheap non-frontier models fall to",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "45.6%"
											}),
											". Our verification pipeline restores frontier-model accuracy to",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "100%"
											}),
											" ",
											"and, with iterative verification, also brings the cheap non-frontier model to",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "100%"
											}),
											", achieving this at",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "font-semibold text-foreground",
												children: "4× lower cost"
											}),
											" ",
											"than the frontier-model baseline."
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
								n: 3,
								caption: "Cost per correct answer against accuracy. Verification (blue) and iterative verification (green) dominate the unaided baselines (red): every verified arm is both cheaper and more accurate than the frontier baseline.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxCostAccuracyChart, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "mb-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground",
									children: "Ongoing research"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-[27px] font-light leading-[1.15] tracking-[-0.02em] text-foreground md:text-[32px]",
									children: "Domains in progress"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-[68ch]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "The three domains above are the ones we have taken far enough to report. The same pipeline is now being applied to other areas whose rules are already close to a formal specification - security control systems, where access and firewall policy is written as rules long before anyone writes code, and payment authorization, where every control has to be auditable regardless." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(P, { children: "That work is earlier than what is on this page, so we are not putting numbers to it yet. A domain gets published when it clears the same bar as the three above: a kernel checked by hand against the source rules, a full run across the benchmark, and every figure generated from that run's logged data. Early results are promising, and we will keep adding them here as they land." })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-16 flex flex-col gap-1.5 border-t border-border pt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "Team Boundless Intuition"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: PUBLISHED })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-hidden": true,
					className: "relative mt-4 h-[180px] overflow-hidden md:h-[340px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							media: "(max-width: 640px)",
							srcSet: "/overview-close-mobile.webp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/overview-close.webp",
							alt: "",
							loading: "lazy",
							className: "h-full w-full object-cover object-center opacity-90 dark:opacity-70"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/25 dark:bg-background/35" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background via-background/70 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/70 to-transparent" })
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
/**
* /overview - the unlisted overview one-pager.
*
* Nothing on the site links here: it is not in TopBar, SiteFooter, or the blog
* index, and it is not a blog post, so it never appears in BLOG_POSTS. The
* robots meta below keeps it out of search results, which is what makes the
* page effectively private - anyone with the URL can read it, and only people
* given the URL will find it.
*/
var SplitComponent = OverviewPage;
//#endregion
export { SplitComponent as component };
