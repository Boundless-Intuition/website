import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-BMl7thHh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engage-C5XxD9IQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* ProcessFlow — the animated "how it works" pipeline for the Engage page.
*
* Four stages on a single track — rules in → formalize → prove on every change →
* certify. A glowing packet travels the track and each stage's halo flashes as it
* passes, so the whole diagram reads as one continuous run. Structure is drawn in
* the faint blueprint foreground; the packet and stage flashes use the accent.
* Pure CSS motion (pf-* classes); freezes gracefully under reduced motion.
*/
var ACC = "oklch(0.72 0.09 220)";
var MONO = { fontFamily: "var(--font-mono)" };
var STAGES = [
	{
		cx: 120,
		n: "01",
		label: "rules in"
	},
	{
		cx: 340,
		n: "02",
		label: "formalize"
	},
	{
		cx: 560,
		n: "03",
		label: "prove / change"
	},
	{
		cx: 780,
		n: "04",
		label: "certify"
	}
];
var FLASH_DELAY = [
	.3,
	1.9,
	3.6,
	5.3
];
function StageIcon({ index, cx }) {
	if (index === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fill: "none",
		stroke: "currentColor",
		strokeOpacity: "0.5",
		strokeWidth: "1.3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: cx - 20,
				y: 28,
				width: "26",
				height: "34",
				rx: "2",
				strokeOpacity: "0.28"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: cx - 10,
				y: 34,
				width: "26",
				height: "34",
				rx: "2",
				fill: "var(--background)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx - 4,
				y1: 44,
				x2: cx + 12,
				y2: 44,
				strokeOpacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx - 4,
				y1: 51,
				x2: cx + 12,
				y2: 51,
				strokeOpacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx - 4,
				y1: 58,
				x2: cx + 6,
				y2: 58,
				strokeOpacity: "0.4"
			})
		]
	});
	if (index === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: cx - 30,
		y: 30,
		width: "60",
		height: "38",
		rx: "3",
		fill: "none",
		stroke: "currentColor",
		strokeOpacity: "0.5",
		strokeWidth: "1.3"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: cx,
		y: 54,
		textAnchor: "middle",
		fontSize: "15",
		fill: ACC,
		style: MONO,
		children: "∀x· ⊢"
	})] });
	if (index === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: cx - 26,
		y1: 48,
		x2: cx + 26,
		y2: 48,
		stroke: "currentColor",
		strokeOpacity: "0.35"
	}), [
		-26,
		0,
		26
	].map((dx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: cx + dx,
		cy: 48,
		r: "4",
		fill: "currentColor",
		fillOpacity: "0.5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: `M${cx + dx - 3} 34 l2.5 3 5 -6`,
		fill: "none",
		stroke: ACC,
		strokeWidth: "1.5"
	})] }, i))] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cx - 22,
			y: 28,
			width: "44",
			height: "42",
			rx: "2",
			fill: "none",
			stroke: "currentColor",
			strokeOpacity: "0.5",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx - 14,
			y1: 38,
			x2: cx + 6,
			y2: 38,
			stroke: "currentColor",
			strokeOpacity: "0.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx - 14,
			y1: 45,
			x2: cx + 2,
			y2: 45,
			stroke: "currentColor",
			strokeOpacity: "0.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cx - 3,
			y: 54,
			width: "9",
			height: "9",
			rx: "1.5",
			fill: ACC
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: cx + 14,
			cy: 60,
			r: "8",
			fill: "none",
			stroke: ACC,
			strokeOpacity: "0.7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M${cx + 10} 60 l2.5 3 5 -6`,
			fill: "none",
			stroke: ACC,
			strokeWidth: "1.5"
		})
	] });
}
function ProcessFlow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 900 150",
		className: "h-full w-full text-foreground",
		preserveAspectRatio: "xMidYMid meet",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "90",
				y1: "85",
				x2: "810",
				y2: "85",
				stroke: "currentColor",
				strokeOpacity: "0.22"
			}),
			STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: s.cx,
					y1: 70,
					x2: s.cx,
					y2: 79,
					stroke: "currentColor",
					strokeOpacity: "0.25"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
					index: i,
					cx: s.cx
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "pf-flash pf-glow",
					style: { animationDelay: `${FLASH_DELAY[i]}s` },
					cx: s.cx,
					cy: 85,
					r: "14",
					fill: "none",
					stroke: ACC,
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: s.cx,
					cy: 85,
					r: "5",
					fill: "currentColor",
					fillOpacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: s.cx,
					y: 118,
					textAnchor: "middle",
					fontSize: "10.5",
					fill: "currentColor",
					fillOpacity: "0.55",
					style: MONO,
					children: s.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: s.cx,
					y: 134,
					textAnchor: "middle",
					fontSize: "9",
					fill: ACC,
					fillOpacity: "0.7",
					style: MONO,
					children: s.n
				})
			] }, s.n)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "pf-packet pf-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "90",
					cy: "85",
					r: "5.5",
					fill: ACC
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "90",
					cy: "85",
					r: "10",
					fill: "none",
					stroke: ACC,
					strokeOpacity: "0.5"
				})]
			})
		]
	});
}
var STEPS = [
	{
		n: "01",
		title: "Share your rules",
		body: "Send us the standards, policies, or regulations that govern your domain - handbooks, compliance documents, protocol specifications. We start with what you already have."
	},
	{
		n: "02",
		title: "We formalize them",
		body: "Our team translates your rules into machine-checkable formal objects - precise mathematical representations that a theorem prover can reason about."
	},
	{
		n: "03",
		title: "Proofs run on every change",
		body: "Verification integrates into your workflow. Every policy update, every configuration change is proved safe against your formalized rules - automatically, continuously."
	},
	{
		n: "04",
		title: "You get verifiable guarantees",
		body: "Not assertions. Not test results. Mathematical proofs that your systems conform to the rules that govern them - auditable, reproducible, and independently checkable."
	}
];
var DELIVERABLES = [
	{
		title: "Conflict Reports",
		body: "When rules contradict each other - a firewall allows what a handbook forbids, a policy grants what a standard restricts - we surface it with a concrete witness."
	},
	{
		title: "Regression Proofs",
		body: "Every change to your configuration or policy is checked against the full rule set. Proofs run in CI, per commit, and block deployments that violate invariants."
	},
	{
		title: "Verified Artifacts",
		body: "Formalized rules and their derivations, versioned and signed. An auditable record that your systems do what your documentation says they do."
	}
];
var PROFILES = [
	{
		title: "Security & Compliance Teams",
		body: "CISOs, GRC leads, and policy owners who need provable assurance that access controls, firewall rules, and audit configurations match organizational policy."
	},
	{
		title: "Regulated Product Teams",
		body: "Engineering leads shipping medical devices, financial systems, or safety-critical software under IEC, FDA, or SOC 2 obligations."
	},
	{
		title: "Legal & Policy Organizations",
		body: "Teams managing complex regulatory environments - GDPR, export control, sanctions - who need consistency between written rules and operational reality."
	},
	{
		title: "Research & Infrastructure",
		body: "Organizations running mission-critical research infrastructure where configuration correctness is not optional - and testing alone is not sufficient."
	}
];
function EngagePage() {
	const [formState, setFormState] = (0, import_react.useState)({
		name: "",
		company: "",
		domain: "",
		message: ""
	});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		const subject = encodeURIComponent(`Verification inquiry - ${formState.company || "General"}`);
		const body = encodeURIComponent(`Name: ${formState.name}\nCompany: ${formState.company}\nDomain: ${formState.domain}\n\n${formState.message}`);
		window.location.href = `mailto:research@boundlessintuition.com?subject=${subject}&body=${body}`;
		setSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid absolute inset-0 opacity-100",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 pt-24 pb-28 lg:pt-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ VII"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Engage" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-10 max-w-[18ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:text-[4.4rem]",
						children: "Bring us your rules."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[58ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We work with organizations to formalize the rules that govern their domain - standards, policies, regulations, protocols - into machine-checkable form. Then we build the verification layer that proves every decision conforms to them." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "This is not consulting. It is engineering. The output is not a report - it is a system that runs proofs, continuously, on every change, forever."
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border bg-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid-fine absolute inset-0 opacity-60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/70",
										children: "§ VII.i"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/50",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI verification" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
								children: "Between your AI and production."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
							children: "Your teams are already shipping AI into your domain. We make sure it cannot act outside the rules that govern it."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-16 grid gap-10 text-[16px] leading-[1.65] lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/85",
							children: "Copilots write configurations. Agents take actions. Models answer the questions your regulators care about. Each output is fluent, fast - and, on its own, impossible to trust. That gap between what an AI says and what your rules allow is the exposure formal verification closes."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "We sit a proof engine between your AI and production. Every answer is checked against the rules we formalized from your domain, and only the ones that pass - each carrying a signed, reproducible certificate - are allowed through. The rest are blocked before they ship, with the exact violation attached."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 rounded-sm border border-border bg-background/70 p-6 backdrop-blur-sm md:grid-cols-[1fr_auto_1.5fr_auto_1fr] md:items-stretch",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 rounded-sm border border-border bg-background p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Input"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[16px] font-medium tracking-tight text-foreground",
										children: "Your AI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "copilots · agents · models"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "flex items-center justify-center py-1 text-foreground/40 md:py-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rotate-90 md:rotate-0",
									children: "→"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 rounded-sm border border-transparent bg-ink p-5 text-ink-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40",
										children: "Verification gate · your rules"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[16px] font-medium tracking-tight text-white",
										children: "Checked against your formalized rules"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-white/50",
										children: "proof · or a concrete counterexample"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "flex items-center justify-center py-1 text-foreground/40 md:py-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rotate-90 md:rotate-0",
									children: "→"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 rounded-sm border border-border bg-background p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Output"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[16px] font-medium tracking-tight text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]",
										children: "Production"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "only verified answers ship"
									})
								]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ VII.ii"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Process" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "How it works."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-14 overflow-x-auto rounded-sm border border-border bg-muted/20 p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto h-44 min-w-[680px] max-w-5xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessFlow, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4",
						children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative flex flex-col gap-5 bg-background p-8 transition-colors hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-10 place-items-center rounded-full border border-foreground/20 font-mono text-[12px] tabular-nums text-foreground/60 transition-colors group-hover:border-foreground/40 group-hover:text-foreground",
										children: step.n
									}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden h-px flex-1 bg-border lg:block",
										"aria-hidden": true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-[19px] font-medium leading-[1.2] tracking-tight text-foreground",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[14px] leading-relaxed text-muted-foreground",
									children: step.body
								})
							]
						}, step.n))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border bg-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid-fine absolute inset-0 opacity-60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ VII.iii"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Deliverables" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "What you get."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-8 md:grid-cols-3",
					children: DELIVERABLES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-sm border border-border bg-background/80 p-8 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 place-items-center rounded-full bg-[oklch(0.72_0.09_220)]/15 text-[10px] text-[oklch(0.72_0.09_220)]",
								"aria-hidden": true,
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-[17px] font-medium tracking-tight text-foreground",
								children: d.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14.5px] leading-relaxed text-muted-foreground",
							children: d.body
						})]
					}, d.title))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ VII.iv"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "For" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-[20ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "Who this is for."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
						children: "If your domain has written rules and your organization needs provable assurance - not just test coverage - we should talk."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2",
					children: PROFILES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 bg-background p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-[17px] font-medium tracking-tight text-foreground",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14.5px] leading-relaxed text-muted-foreground",
							children: p.body
						})]
					}, p.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border bg-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid absolute inset-0 opacity-60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-16 lg:grid-cols-[1.1fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ VII.v"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contact" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-8 max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "Start a conversation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[48ch] space-y-5 text-[16px] leading-[1.65] text-foreground/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tell us about your domain and the rules that govern it. We'll assess whether formal verification is the right fit and scope an initial engagement." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "No pitch decks. No sales calls. Just engineers talking to engineers about what can be proved."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:research@boundlessintuition.com",
								className: "group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground",
								children: ["research@boundlessintuition.com", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:pt-8",
						children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center rounded-sm border border-border bg-background/80 p-12 text-center backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 text-[oklch(0.72_0.09_220)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl",
										children: "✓"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-2 font-display text-[19px] font-medium text-foreground",
									children: "Opening your email client"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[14px] text-muted-foreground",
									children: "If it didn't open, reach us directly at research@boundlessintuition.com"
								})
							] })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: handleSubmit,
							className: "rounded-sm border border-border bg-background/80 p-8 backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-name",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "engage-name",
										type: "text",
										required: true,
										value: formState.name,
										onChange: (e) => setFormState((s) => ({
											...s,
											name: e.target.value
										})),
										className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "Your name"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-company",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Organization"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "engage-company",
										type: "text",
										value: formState.company,
										onChange: (e) => setFormState((s) => ({
											...s,
											company: e.target.value
										})),
										className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "Company or institution"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-domain",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Domain"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "engage-domain",
										type: "text",
										value: formState.domain,
										onChange: (e) => setFormState((s) => ({
											...s,
											domain: e.target.value
										})),
										className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "e.g. Security, Healthcare, Finance"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-message",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Tell us about your rules"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "engage-message",
										rows: 4,
										value: formState.message,
										onChange: (e) => setFormState((s) => ({
											...s,
											message: e.target.value
										})),
										className: "w-full resize-none border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "What rules govern your domain? What would you like to verify?"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "mt-4 inline-flex items-center gap-2 border border-foreground/40 bg-foreground/5 px-6 py-3 font-display text-[12px] font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground hover:bg-foreground/10",
										children: ["Send inquiry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: "→"
										})]
									})
								]
							})
						})
					})]
				})
			})]
		})
	] });
}
function EngageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagePage, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { EngageRoute as component };
