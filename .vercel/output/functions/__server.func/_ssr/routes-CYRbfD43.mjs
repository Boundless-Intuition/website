import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-BlX38kYS.mjs";
import { a as candlestick, b as useDomainCanvas, c as dataFlowNet, d as field, f as mix, h as redactionRain, i as asciiScan, l as dnaHelix, m as radarSweep, n as PipelineBackdrop, o as citationArcs, p as oklcha, r as asciiFlow, t as MethodVisual, u as ecgMonitor, v as smoothstep, y as tone } from "./MethodVisual-BqIWyxhw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CYRbfD43.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* GlitchText — a "decode to verified" headline effect.
*
* The text arrives as unstable, glitching noise — the visual of an AI answer
* that is fluent but not yet trusted — and a verification pass (the scanline)
* resolves it, character by character, into the clean final string. It is the
* site's own thesis rendered in motion: fluent, not correct, being disproved.
* It then rests briefly and re-runs on a loop so the headline never sits fully
* still — verification is a thing that keeps happening.
*
* Design notes:
* - SSR-safe: server and first client render both emit the plain final text
*   (no hydration mismatch). The animation is a client-only enhancement kicked
*   off in an effect.
* - Accessible: while animating, the real text is exposed to assistive tech via
*   an `sr-only` copy and the animated glyphs are `aria-hidden`. Once settled,
*   the plain, selectable text is what remains in the DOM.
* - No layout shift: undecoded characters keep their final glyph but render
*   transparent, so they reserve their true width and wrapping never jumps.
* - Honors `prefers-reduced-motion`: the effect simply never starts.
*
* Requires a positioned ancestor (e.g. `relative` on the wrapping heading) so
* the sweeping scanline can size to the full, possibly multi-line, text box.
*/
var GLYPHS = "<>/\\[]{}=+*—·:;≡⊢∎01".split("");
var STAGGER = 24;
var DUR = 260;
var TAIL = 80;
function GlitchText({ text, replayOnHover = true, repeatDelay = 4600 }) {
	const [cells, setCells] = (0, import_react.useState)(null);
	const raf = (0, import_react.useRef)(null);
	const timer = (0, import_react.useRef)(null);
	const chars = [...text];
	const order = /* @__PURE__ */ new Map();
	let slots = 0;
	chars.forEach((c, i) => {
		if (c !== " ") order.set(i, slots++);
	});
	const total = slots * STAGGER + DUR + TAIL;
	const stop = (0, import_react.useCallback)(() => {
		if (raf.current !== null) cancelAnimationFrame(raf.current);
		raf.current = null;
		if (timer.current !== null) clearTimeout(timer.current);
		timer.current = null;
	}, []);
	const play = (0, import_react.useCallback)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
		stop();
		let start = 0;
		const step = (ts) => {
			if (!start) start = ts;
			const t = ts - start;
			setCells(chars.map((ch, i) => {
				if (ch === " ") return {
					ch: " ",
					s: 2
				};
				const from = (order.get(i) ?? 0) * STAGGER;
				if (t >= from + DUR) return {
					ch,
					s: 2
				};
				if (t >= from) return {
					ch: GLYPHS[Math.random() * GLYPHS.length | 0],
					s: 1
				};
				return {
					ch,
					s: 0
				};
			}));
			if (t < total) raf.current = requestAnimationFrame(step);
			else {
				raf.current = null;
				setCells(null);
				timer.current = setTimeout(play, repeatDelay);
			}
		};
		raf.current = requestAnimationFrame(step);
	}, [
		text,
		stop,
		repeatDelay
	]);
	(0, import_react.useEffect)(() => {
		play();
		return stop;
	}, [play, stop]);
	if (!cells) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		onMouseEnter: replayOnHover ? play : void 0,
		children: text
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		onMouseEnter: replayOnHover ? play : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "hero-glitch",
				children: cells.map((c, i) => c.ch === " " ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " " }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: c.s === 0 ? "text-transparent" : c.s === 1 ? "text-[oklch(0.55_0.13_230)] dark:text-[oklch(0.82_0.11_220)]" : "",
					children: c.ch
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "hero-scanbar pointer-events-none absolute inset-x-0 h-px bg-[oklch(0.55_0.13_230)] dark:bg-[oklch(0.82_0.11_220)]",
				style: {
					["--scan-dur"]: `${total}ms`,
					boxShadow: "0 0 12px oklch(0.72 0.11 220 / 0.75)"
				}
			})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "doctrine",
		className: "relative -mt-16 overflow-hidden border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						media: "(max-width: 768px)",
						srcSet: "/artifact-hero-mobile.webp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/artifact-hero.webp",
						alt: "",
						className: "h-full w-full object-cover object-[62%_center] opacity-100 saturate-[0.92] contrast-[1.02] dark:opacity-[0.72] dark:saturate-[0.78]"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-accent/5 mix-blend-multiply dark:bg-background/25 dark:mix-blend-normal" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-background/85 lg:from-background/40 lg:via-transparent lg:to-background/55" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/5 lg:via-background/55 lg:to-transparent" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 h-full w-full text-foreground",
				viewBox: "0 0 1200 800",
				preserveAspectRatio: "xMidYMid slice",
				fill: "none",
				stroke: "currentColor",
				vectorEffect: "non-scaling-stroke",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: "0.22",
						strokeWidth: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "815",
								cy: "430",
								r: "118"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "815",
								cy: "430",
								r: "196",
								strokeDasharray: "2 6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "815",
								cy: "430",
								r: "286",
								opacity: "0.6"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: "0.28",
						strokeWidth: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M815 250 V610 M665 430 H965" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M803 430 h24 M815 418 v24",
								opacity: "0.8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "815",
								cy: "430",
								r: "5",
								opacity: "0.9"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: "0.16",
						strokeWidth: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 120 L1200 690" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M120 800 L1050 0",
								strokeDasharray: "3 7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "612",
								y: "272",
								width: "406",
								height: "316"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M612 430 H1018",
								opacity: "0.7"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: "0.3",
						strokeWidth: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M612 720 H1018" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M612 712 v16 M1018 712 v16" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M612 720 l10 -5 M612 720 l10 5 M1018 720 l-10 -5 M1018 720 l-10 5" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid absolute inset-0 opacity-40",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "paper-grain pointer-events-none absolute inset-0",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute left-6 top-20 hidden font-mono text-[10px] tracking-[0.2em] text-foreground/40 lg:block",
				children: "⌐ BI—001"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[10px] tracking-[0.2em] text-foreground/40 lg:block",
				children: "SHEET 1 / 6 ¬"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl gap-16 px-6 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ I"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Doctrine" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "relative mb-10 max-w-[16ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:text-[4.4rem]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlitchText, { text: "The trust layer for artificial intelligence." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[54ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Modern AI is fluent, not correct. It speaks with the confidence of an expert and the accountability of a guess. In high-stakes domains, that gap is not an inconvenience - it is a liability." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Boundless Intuition builds the verification layer for AI - formalizing domain rules into machine-checkable form and proving every answer correct before it reaches production."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 flex flex-wrap items-center gap-4 font-display text-[12px] font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/engage",
							className: "group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-5 py-3 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10",
							children: ["Bring us your rules", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#walkthrough",
							className: "group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-foreground transition-colors hover:border-foreground",
							children: ["Walk through a proof", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-2 right-0 max-w-[74%] rounded-sm border border-border bg-background/55 px-5 py-4 shadow-[0_20px_50px_-30px_oklch(0.22_0.03_250/0.55)] backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Plate · fig. I" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/40",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "46.2330° N \xA06.0557° E" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-[15.5px] font-medium leading-snug tracking-tight text-foreground",
							children: "Every input. One proof."
						})]
					})
				})]
			})
		]
	});
}
var STEPS = [
	{
		n: "01",
		title: "The model answers",
		body: "A copilot, agent, or model returns an answer, a decision, or an action. It is fluent and fast - and, on its own, impossible to trust. Today, this is where every system stops."
	},
	{
		n: "02",
		title: "The domain is formalized - once",
		body: "Your rules, standards, and policies are compiled into machine-checkable formal objects. This is done a single time, up front. It is the asset that makes every later answer verifiable."
	},
	{
		n: "03",
		title: "The answer becomes a claim",
		body: "Each answer is translated into a precise logical statement about what it asserts or does - a claim a theorem prover can reason about, stripped of the ambiguity of natural language."
	},
	{
		n: "04",
		title: "The prover checks it",
		body: "A theorem prover checks the claim against the formalized rules. It either proves the answer conforms - or returns a concrete counterexample, a witness to exactly how it fails."
	},
	{
		n: "05",
		title: "Only proven answers ship",
		body: "Verified answers proceed, carrying a signed, reproducible certificate. Refuted answers are blocked before they reach production, with the precise reason attached."
	}
];
var ACC = "oklch(0.72 0.09 220)";
function Node({ tag, title, sub, variant = "default" }) {
	const engine = variant === "engine";
	const verdict = variant === "verdict";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex min-w-0 flex-1 flex-col gap-2 rounded-sm border p-5 ${engine ? "border-transparent bg-ink text-ink-foreground" : "border-border bg-background/80 backdrop-blur-sm"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] ${engine ? "text-white/40" : "text-muted-foreground"}`,
				children: [engine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "vg-pulse inline-block size-1.5 shrink-0 rounded-full",
					style: { background: ACC }
				}), tag]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-1.5 font-display text-[15px] font-medium tracking-tight ${engine ? "text-white" : verdict ? "text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]" : "text-foreground"}`,
				children: [verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "vg-check",
					"aria-hidden": true,
					children: "✓"
				}), title]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `font-mono text-[11px] leading-snug ${engine ? "text-white/50" : "text-muted-foreground"}`,
				children: sub
			})
		]
	});
}
function Arrow({ vertical = false, delay = 0 }) {
	const style = { animationDelay: `${delay}s` };
	if (vertical) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "flex h-8 w-full shrink-0 items-center justify-center text-foreground/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 14 44",
			className: "h-8 w-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "7",
					y1: "3",
					x2: "7",
					y2: "33",
					stroke: "currentColor",
					strokeOpacity: "0.4",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M3 32 l4 7 4 -7",
					fill: "none",
					stroke: "currentColor",
					strokeOpacity: "0.55",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mf-dot-y pf-glow",
					cx: "7",
					cy: "3",
					r: "2.6",
					fill: ACC,
					style
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "flex w-10 shrink-0 items-center justify-center text-foreground/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 44 14",
			className: "h-3.5 w-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "2",
					y1: "7",
					x2: "34",
					y2: "7",
					stroke: "currentColor",
					strokeOpacity: "0.4",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M33 3 l7 4 -7 4",
					fill: "none",
					stroke: "currentColor",
					strokeOpacity: "0.55",
					strokeWidth: "1.2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mf-dot-x pf-glow",
					cx: "2",
					cy: "7",
					r: "2.6",
					fill: ACC,
					style
				})
			]
		})
	});
}
function VerificationMethod() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "method",
		className: "relative border-b border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "blueprint-grid-fine absolute inset-0 opacity-40",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ II"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Method" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "How an AI answer becomes a proof."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
						children: "We do not grade the model, fine-tune it, or ask it to check itself. We sit a proof engine between the AI and production, and let nothing through that cannot be verified against your rules."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-20 overflow-hidden rounded-sm border border-border bg-muted/30 p-6 lg:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineBackdrop, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none relative hidden items-stretch gap-3 lg:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-[1.4] flex-col gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
										tag: "AI output",
										title: "The answer",
										sub: "\"administer 45 mg…\""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
										tag: "Formalized domain",
										title: "The rules",
										sub: "compiled, machine-checkable"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
									tag: "Proof engine",
									title: "Theorem prover",
									sub: "checks claim ⊨ rules",
									variant: "engine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { delay: 1.3 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
									tag: "Result",
									title: "Verified · certified",
									sub: "or refuted, with a witness",
									variant: "verdict"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none relative flex flex-col lg:hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
									tag: "AI output",
									title: "The answer",
									sub: "\"administer 45 mg…\""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { vertical: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
									tag: "Formalized domain",
									title: "The rules",
									sub: "compiled, machine-checkable"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
									vertical: true,
									delay: .9
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
									tag: "Proof engine",
									title: "Theorem prover",
									sub: "checks claim ⊨ rules",
									variant: "engine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
									vertical: true,
									delay: 1.8
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
									tag: "Result",
									title: "Verified · certified",
									sub: "or refuted, with a witness",
									variant: "verdict"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5",
					children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex min-h-[400px] flex-col overflow-hidden bg-[oklch(0.965_0.008_90)] dark:bg-[oklch(0.175_0.014_250)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodVisual, { index: i }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/60 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-background via-background/90 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none relative flex h-full flex-col p-6 lg:p-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] tracking-[0.14em] text-foreground/60",
									children: s.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex min-h-[58%] flex-col gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "min-h-[2.4em] font-display text-[16px] font-medium leading-[1.2] tracking-tight text-foreground",
										children: s.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13.5px] leading-relaxed text-muted-foreground",
										children: s.body
									})]
								})]
							})
						]
					}, s.n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-12 max-w-[64ch] text-[15px] leading-relaxed text-muted-foreground",
					children: "The model proposes; the prover disposes. Verification is not another model second-guessing the first - it is mathematics, checking a fluent answer against rules that were written down long before the question was asked."
				})
			]
		})]
	});
}
/**
* CoverageBand — the "payoff" statistic: one proof covers the entire input
* space. The figure is 2^64 (every value of a 64-bit parameter), counted up
* with BigInt so all twenty digits stay exact, overshooting slightly before it
* settles — like an instrument finding its reading. Honors reduced motion.
*/
var TARGET = 18446744073709551616n;
var group = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
var FINAL = group(TARGET.toString());
var C1$1 = 1.7;
var C3$1 = 2.7;
var easeOutBack$1 = (p) => 1 + C3$1 * Math.pow(p - 1, 3) + C1$1 * Math.pow(p - 1, 2);
var easeInOut = (p) => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
var UP = 1800;
var HOLD = 2600;
var DOWN = 900;
var CYCLE = 5900;
function fracAt(t) {
	const m = t % CYCLE;
	if (m < UP) return easeOutBack$1(m / UP);
	if (m < 4400) return 1;
	if (m < 5300) return 1 - easeInOut((m - UP - HOLD) / DOWN);
	return 0;
}
function readout(frac) {
	return group((TARGET * BigInt(Math.max(0, Math.round(frac * 1e6))) / 1000000n).toString());
}
function CoverageBand() {
	const [display, setDisplay] = (0, import_react.useState)(FINAL);
	const ref = (0, import_react.useRef)(null);
	const raf = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
			setDisplay(FINAL);
			return;
		}
		let start = 0;
		const loop = (ts) => {
			setDisplay(readout(fracAt(ts - start)));
			raf.current = requestAnimationFrame(loop);
		};
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting) {
				if (raf.current === null) raf.current = requestAnimationFrame((ts) => {
					start = ts;
					loop(ts);
				});
			} else if (raf.current !== null) {
				cancelAnimationFrame(raf.current);
				raf.current = null;
				setDisplay(FINAL);
			}
		}, { threshold: .2 });
		io.observe(el);
		return () => {
			io.disconnect();
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "coverage",
		className: "relative overflow-hidden border-b border-border bg-ink text-ink-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "blueprint-grid pointer-events-none absolute inset-0 opacity-[0.12]",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-4xl px-6 py-28 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center justify-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-white/45",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-white/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "§ · Coverage" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-white/30" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-7 font-display text-[1.5rem] font-light leading-tight tracking-tight text-white/85 md:text-[2rem]",
					children: "How one proof holds across"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref,
					className: "font-mono text-[clamp(1.25rem,6.2vw,3.6rem)] font-medium leading-none tracking-tight tabular-nums text-[oklch(0.82_0.11_220)]",
					style: { textShadow: "0 0 32px oklch(0.72 0.09 220 / 0.45)" },
					children: display
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 100 8",
					preserveAspectRatio: "none",
					className: "mx-auto mt-5 h-2.5 w-full max-w-2xl text-white/25",
					"aria-hidden": true,
					children: Array.from({ length: 41 }).map((_, i) => {
						const x = i * 2.5;
						const major = i % 5 === 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: x,
							y1: major ? 0 : 3.5,
							x2: x,
							y2: 8,
							stroke: "currentColor",
							strokeWidth: major ? .8 : .5
						}, i);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-8 max-w-[48ch] text-[15px] leading-relaxed text-white/60",
					children: "possible inputs — every value of a single 64-bit parameter. A test suite samples a few thousand. A proof covers all of them, and lets zero escape."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35",
					children: [
						"2",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: "64" }),
						" · exhaustive, not sampled"
					]
				})
			]
		})]
	});
}
/**
* MeasuredFigure — renders a Value-section figure as an instrument readout.
*
* Numeric figures (e.g. "€20M · 4%") count up when scrolled into view and
* overshoot slightly before settling, like a needle gauge finding its value,
* shown in tabular-nums above a faint caliper tick-scale. Non-numeric figures
* ("Personal", "Precedent") render plainly. Honors prefers-reduced-motion.
*/
var C1 = 1.9;
var C3 = 2.9;
var easeOutBack = (p) => 1 + C3 * Math.pow(p - 1, 3) + C1 * Math.pow(p - 1, 2);
function MeasuredFigure({ value }) {
	const hasNumber = /\d/.test(value);
	const tokens = (0, import_react.useMemo)(() => value.split(/(\d+(?:\.\d+)?)/).map((raw) => {
		const num = /^\d+(?:\.\d+)?$/.test(raw);
		const decimals = num && raw.includes(".") ? raw.split(".")[1].length : 0;
		return {
			raw,
			num,
			target: num ? parseFloat(raw) : 0,
			decimals
		};
	}), [value]);
	const build = (eased) => tokens.map((t) => t.num ? Math.max(0, t.target * eased).toFixed(t.decimals) : t.raw).join("");
	const [display, setDisplay] = (0, import_react.useState)(value);
	const ref = (0, import_react.useRef)(null);
	const raf = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || typeof window === "undefined" || !hasNumber) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
			setDisplay(value);
			return;
		}
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				io.disconnect();
				const dur = 1300;
				let start = null;
				const step = (ts) => {
					if (start === null) start = ts;
					const p = Math.min(1, (ts - start) / dur);
					setDisplay(build(easeOutBack(p)));
					if (p < 1) raf.current = requestAnimationFrame(step);
					else setDisplay(value);
				};
				raf.current = requestAnimationFrame(step);
			}
		}, { threshold: .4 });
		io.observe(el);
		return () => {
			io.disconnect();
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, [value, hasNumber]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: "block font-display text-[26px] font-light leading-none tracking-tight tabular-nums text-foreground md:text-[30px]",
		children: display
	}), hasNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 100 8",
		preserveAspectRatio: "none",
		className: "mt-2.5 h-2 w-full text-foreground/25",
		"aria-hidden": true,
		children: Array.from({ length: 26 }).map((_, i) => {
			const x = i * 4;
			const major = i % 5 === 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x,
				y1: major ? 0 : 3.5,
				x2: x,
				y2: 8,
				stroke: "currentColor",
				strokeWidth: major ? .8 : .5
			}, i);
		})
	})] });
}
var t$1 = (light, dark) => ({
	light,
	dark
});
var AZURE$1 = t$1([
	.5,
	.15,
	255
], [
	.78,
	.13,
	250
]);
var SKY$1 = t$1([
	.55,
	.16,
	208
], [
	.85,
	.14,
	205
]);
var GREEN$1 = t$1([
	.53,
	.17,
	152
], [
	.81,
	.2,
	150
]);
var VISUALS$1 = [
	0,
	1,
	2,
	3
].map((i) => asciiFlow({
	tint: AZURE$1,
	hot: SKY$1,
	ok: GREEN$1,
	seed: 31 + i * 47
}));
/**
* ASCII slipstream background for the "makes teams faster" boxes — the
* Security panel's glyph language, redirected into a rightward wind field.
*/
function ValueBoxVisual({ index }) {
	const { canvasRef, pointerTargetRef } = useDomainCanvas((0, import_react.useMemo)(() => VISUALS$1[index % VISUALS$1.length], [index]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: pointerTargetRef,
		className: "pointer-events-auto absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full"
		})
	});
}
var PENALTIES = [
	{
		figure: "€20M · 4%",
		label: "GDPR",
		body: "The maximum fine is €20 million or 4% of global annual turnover - whichever is greater. A single unlawful data flow, or one hallucinated disclosure of personal data, is enough to trigger it.",
		source: {
			cite: "Art. 83 GDPR",
			href: "https://gdpr-info.eu/art-83-gdpr/"
		}
	},
	{
		figure: "$2M / yr",
		label: "HIPAA",
		body: "Per-violation annual caps on mishandled health data - before the mandatory breach notifications, the OCR investigation, and the class action that follows a leak.",
		source: {
			cite: "HHS OCR enforcement",
			href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html"
		}
	},
	{
		figure: "Personal",
		label: "SOX · SEC",
		body: "Executives personally attest to their controls. A materially wrong AI-generated disclosure is not just a corporate fine - it is individual, criminal-adjacent liability.",
		source: {
			cite: "18 U.S.C. § 1350",
			href: "https://www.law.cornell.edu/uscode/text/18/1350"
		}
	},
	{
		figure: "Precedent",
		label: "Litigation",
		body: "A fabricated citation, an unsafe instruction, a discriminatory decision - once a wrong answer reaches a customer, the cost is discovery, settlement, and case law written against you.",
		source: {
			cite: "Mata v. Avianca",
			href: "https://www.law.berkeley.edu/wp-content/uploads/archive/2025/12/Mata-v-Avianca-Inc.pdf"
		}
	}
];
var STAKES = [
	{
		tag: "Healthcare",
		head: "Measured in lives",
		body: "A wrong dose is not a bug ticket. Verification proves the safety envelope holds for every patient in the label window - before the answer ever reaches a clinician."
	},
	{
		tag: "Finance",
		head: "Measured in mandates",
		body: "A breached covenant or a misfiled disclosure costs fines, restitution, and trust - orders of magnitude beyond the price of proving the trade admissible first."
	},
	{
		tag: "Security",
		head: "Measured in breaches",
		body: "One over-permissioned grant is an incident waiting to happen. Catching it at proof time is free; catching it in a forensic report is not."
	}
];
var EFFICIENCY = [
	{
		head: "Fewer model calls",
		body: "Teams paper over unreliability with brute force - retries, self-consistency sampling, ensembles, LLM-as-judge chains - burning tokens to average out errors that never fully vanish. One verified answer replaces a fistful of speculative ones. A proof is deterministic and cacheable; it does not need to be re-rolled."
	},
	{
		head: "Errors die before they ship",
		body: "A mistake is cheap at proof time and ruinous in production. No rollbacks, no post-hoc audits, no war rooms. Verification deletes the expensive tail of a wrong answer - everything that happens after it escapes."
	},
	{
		head: "Auditable by construction",
		body: "Every certified answer arrives with its proof attached. The evidence your auditors ask for is a by-product of running the system, not a quarterly scramble."
	}
];
var PRODUCTIVITY = [
	{
		n: "01",
		head: "Ship at the speed of CI",
		body: "Manual review is the throttle on every AI feature. When correctness is proved automatically, teams merge and deploy without a compliance queue in the critical path."
	},
	{
		n: "02",
		head: "Engineers build, not babysit",
		body: "No brittle test suites chasing edge cases, no hand-tuned guardrail prompts. The rules are formalized once; the prover covers every case, forever."
	},
	{
		n: "03",
		head: "Audits in minutes, not quarters",
		body: "Certification becomes a query against signed proofs. Re-certifying after a change is automatic - the evidence regenerates itself."
	},
	{
		n: "04",
		head: "Automate the high-stakes work",
		body: "Once answers are provably safe, the decisions that were too risky to hand to AI - the ones that actually move the business - can finally be automated."
	}
];
var ACCENT$1 = "text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]";
var WAVE_PATH = (() => {
	const W = 300;
	const mid = 8;
	const amp = 5;
	const k = .14;
	const steps = 160;
	let d = "";
	for (let i = 0; i <= steps; i++) {
		const x = i / steps * W;
		const y = mid + amp * Math.min(1, Math.max(0, (x - 84) / 150)) * Math.sin(k * x);
		d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
	}
	return d;
})();
function WaveDivider({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 300 16",
		preserveAspectRatio: "none",
		className,
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: WAVE_PATH,
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1",
			vectorEffect: "non-scaling-stroke"
		})
	});
}
function Divider({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveDivider, { className: "h-4 flex-1 text-foreground/30" })]
	});
}
function VerificationValue() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "value",
		className: "relative border-b border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "blueprint-grid-fine absolute inset-0 opacity-40",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ IV"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Value" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "Cheaper than being wrong."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
						children: "Compliance is already one of the largest line items in a regulated business - and a single hallucinated answer can turn it into a lawsuit. Verification is a fixed, modest cost set against an open-ended one."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { label: "The price of a wrong answer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4",
							children: PENALTIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 bg-background p-6 lg:p-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasuredFigure, { value: p.figure }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-mono text-[10px] uppercase tracking-[0.18em] ${ACCENT$1}`,
										children: p.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13px] leading-relaxed text-muted-foreground",
										children: p.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: p.source.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "group mt-auto inline-flex items-center gap-1.5 border-t border-border/60 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground/60",
												children: "Source"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground/70 transition-colors group-hover:text-foreground",
												children: p.source.cite
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												className: "transition-transform group-hover:translate-x-0.5",
												children: "↗"
											})
										]
									})
								]
							}, p.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-[70ch] text-[14px] leading-relaxed text-muted-foreground",
							children: "And that is before the standing cost of staying compliant: the reviewers, the outside counsel, the audit consultants, the quarterly evidence-gathering. Formal verification turns that recurring manual tax into a check that runs itself."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { label: "Where the cost lands" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-px border border-border bg-border lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background p-8 lg:p-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "The cost of a wrong answer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col divide-y divide-border",
								children: STAKES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 py-5 first:pt-0 last:pb-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-mono text-[10px] uppercase tracking-[0.16em] ${ACCENT$1}`,
											children: s.tag
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-[17px] font-medium tracking-tight text-foreground",
											children: s.head
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[14px] leading-relaxed text-muted-foreground",
										children: s.body
									})]
								}, s.tag))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background p-8 lg:p-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "The cost of guessing around it"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col divide-y divide-border",
								children: EFFICIENCY.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 py-5 first:pt-0 last:pb-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-[17px] font-medium tracking-tight text-foreground",
										children: e.head
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[14px] leading-relaxed text-muted-foreground",
										children: e.body
									})]
								}, e.head))
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { label: "And it makes teams faster" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4",
					children: PRODUCTIVITY.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col overflow-hidden bg-background",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueBoxVisual, { index: idx }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-background/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none relative flex flex-col gap-4 p-6 lg:p-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] tracking-[0.14em] text-foreground/50",
										children: p.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-[16px] font-medium leading-[1.2] tracking-tight text-foreground",
										children: p.head
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[13.5px] leading-relaxed text-muted-foreground",
										children: p.body
									})
								]
							})
						]
					}, p.n))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-14 max-w-[66ch] text-[15px] leading-relaxed text-muted-foreground",
					children: "A proof runs once and holds forever. Set against the penalties it averts, the tokens spent second-guessing a model, and the audits it pre-empts, the verification layer is not a cost center - it is the cheapest insurance in the stack, and it makes everything downstream of it faster."
				})
			]
		})]
	});
}
/**
* ProofMark — the small verification glyph (replaces the wax seal).
*
* Default is ⊢, the logician's turnstile: "⊢ φ" reads "φ is provable". A quiet,
* precise mark of a discharged proof. Swap `symbol` for another (∎, ⊨, ∴, Q.E.D.)
* if you want a different note. Size and colour come from `className`.
*/
function ProofMark({ className = "", symbol = "⊢" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 40",
		className,
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "18.5",
			fill: "none",
			stroke: "currentColor",
			strokeOpacity: "0.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "20",
			y: "21",
			textAnchor: "middle",
			dominantBaseline: "central",
			fontSize: "19",
			fill: "currentColor",
			style: {
				fontFamily: "var(--font-mono)",
				fontWeight: 500
			},
			children: symbol
		})]
	});
}
/**
* proverField — the live backdrop inside the VerifyWidget's prover console.
*
* Unlike the other engines this one is state-reactive: the widget hands it a
* getter for the current run status and the field responds. Idle, it breathes
* as a dim glyph haze. While a check runs, a scan beam sweeps the console and
* the field surges. On a verdict the whole field re-tints — green with ✓s
* raining through the bright cells when the property is proved, warn-orange
* with ✗s when a counterexample is found — and ripple rings mark the moment.
*
* The console is always ink-dark, so callers pass Tints with identical
* light/dark values. Alphas stay low: the log text sits directly on top.
*/
var TAU = Math.PI * 2;
var clamp = (v, a, b) => v < a ? a : v > b ? b : v;
function proverField(opts, status) {
	const RAMP = " ·:∴+⊢";
	const cell = opts.cell ?? 17;
	return () => {
		let W = 0;
		let H = 0;
		let cols = 0;
		let rows = 0;
		let cw = cell;
		let chh = cell;
		let energy = .3;
		let vm = 0;
		let bt = 0;
		let doneAge = 9;
		let prevMode = "idle";
		return {
			resize(w, h) {
				W = w;
				H = h;
				cols = Math.max(1, Math.floor(w / cell));
				rows = Math.max(1, Math.floor(h / cell));
				cw = w / cols;
				chh = h / rows;
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, still } = env;
				const s = status();
				if (s.mode !== prevMode) {
					if (s.mode === "done") doneAge = 0;
					prevMode = s.mode;
				}
				const target = s.mode === "running" ? .8 : s.mode === "done" ? .55 : .3;
				energy += (target - energy) * clamp(dt * 3, 0, 1);
				vm += ((s.mode === "done" ? 1 : 0) - vm) * clamp(dt * 2.5, 0, 1);
				if (!still) {
					if (s.mode === "running") bt = (bt + dt / 1.15) % 1;
					if (s.mode === "done") doneAge += dt;
				}
				const base = tone(palette, opts.tint);
				const vcol = tone(palette, s.proven ? opts.ok : opts.bad);
				const beamX = bt * (W + 80) - 40;
				const px = pointer.x * W;
				const py = pointer.y * H;
				ctx.font = `${(Math.min(cw, chh) * .8).toFixed(1)}px "JetBrains Mono", monospace`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (let rw = 0; rw < rows; rw++) for (let c = 0; c < cols; c++) {
					const x = (c + .5) * cw;
					const y = (rw + .5) * chh;
					const n = field(c * .33, rw * .5, t * .5) * .5 + .5;
					const beam = s.mode === "running" ? smoothstep(55, 0, Math.abs(x - beamX)) * .75 : 0;
					const near = pointer.active ? smoothstep(90, 0, Math.hypot(x - px, y - py)) * .45 : 0;
					const i = clamp(n * energy + beam * .55 + near, 0, 1);
					const col = mix(base, vcol, vm);
					if (vm > .5 && i > .74) {
						ctx.fillStyle = oklcha(vcol, .1 + i * .3);
						ctx.fillText(s.proven ? "✓" : "✗", x, y);
						continue;
					}
					const g = RAMP[Math.floor(i * 5)];
					if (g === " ") continue;
					ctx.fillStyle = oklcha(col, .04 + i * .2);
					ctx.fillText(g, x, y);
				}
				if (s.mode === "running") {
					ctx.save();
					ctx.shadowBlur = 9;
					ctx.shadowColor = oklcha(base, .7);
					ctx.strokeStyle = oklcha(base, .38);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(beamX, 0);
					ctx.lineTo(beamX, H);
					ctx.stroke();
					ctx.restore();
				}
				if (doneAge < 1.4) {
					const cx = W * .5;
					const cy = H * .45;
					const maxR = Math.hypot(W, H) * .5;
					ctx.lineWidth = 1;
					for (let k = 0; k < 2; k++) {
						const p = clamp(doneAge / 1.4 - k * .12, 0, 1);
						if (p <= 0) continue;
						ctx.strokeStyle = oklcha(vcol, (1 - p) * .5);
						ctx.beginPath();
						ctx.arc(cx, cy, p * maxR, 0, TAU);
						ctx.stroke();
					}
				}
			}
		};
	};
}
var round1 = (n) => Math.round(n * 10) / 10;
var CLAIMS = [
	{
		domain: "Healthcare",
		agent: "AI clinical copilot",
		rule: "dose ≤ 60 mg ceiling · patient ≥ 10 kg (drug label)",
		value: "An AI copilot can hallucinate a dose. We prove every order stays inside the drug label before a clinician ever sees it.",
		param: {
			label: "patient weight",
			unit: "kg",
			min: 6,
			max: 120,
			step: 1,
			default: 34
		},
		safe: {
			lo: 10,
			hi: 100
		},
		answer: (w) => `Administer methotrexate ${round1(.6 * w)} mg this week (${w} kg patient).`,
		check: (w) => {
			const dose = round1(.6 * w);
			if (w < 10) return {
				proven: false,
				witness: `weight ${w} kg is below the 10 kg label minimum`
			};
			if (dose > 60) return {
				proven: false,
				witness: `at ${w} kg the formula yields ${dose} mg > 60 mg ceiling`
			};
			return {
				proven: true,
				witness: "the ordered dose stays inside the drug label"
			};
		},
		smt: (w) => [
			"$ z3 verify dose.smt2",
			`read AI answer → dose = ${round1(.6 * w)} mg,  weight = ${w} kg`,
			"(set-logic QF_LRA)",
			"(declare-const weight Real) (declare-const dose Real)",
			`(assert (= weight ${w}))              ; this patient`,
			"(assert (= dose (* 0.6 weight)))      ; the AI's dosing",
			"(assert (or (< weight 10)             ; below label, or",
			"            (> dose 60)))             ; above ceiling",
			"(check-sat)"
		]
	},
	{
		domain: "Access control",
		agent: "AI ops agent",
		rule: "read-only · no export · TTL ≤ 24 h",
		value: "AI agents write access policies now. We prove each grant obeys least-privilege and expiry before it is ever applied.",
		param: {
			label: "grant TTL",
			unit: "h",
			min: 1,
			max: 96,
			step: 1,
			default: 24
		},
		safe: {
			lo: 1,
			hi: 24
		},
		answer: (ttl) => `GRANT read ON pii.customers TO role=support · ttl=${ttl}h`,
		check: (ttl) => ttl > 24 ? {
			proven: false,
			witness: `ttl ${ttl}h exceeds the 24h maximum for PII access`
		} : {
			proven: true,
			witness: "grant is read-only, no export, and expires within 24h"
		},
		smt: (ttl) => [
			"$ z3 verify grant.smt2",
			`read AI answer → read-only, export=false, ttl = ${ttl}h`,
			"(set-logic QF_LIA)",
			"(declare-const ttl Int)",
			"(declare-const canWrite Bool) (declare-const canExport Bool)",
			`(assert (= ttl ${ttl}))`,
			"(assert (not canWrite)) (assert (not canExport))",
			"(assert (or canWrite canExport (> ttl 24)))  ; any escalation?",
			"(check-sat)"
		]
	},
	{
		domain: "Finance",
		agent: "AI portfolio agent",
		rule: "equity exposure ≤ 85% (fund mandate)",
		value: "An AI advisor proposes allocations. We prove each one satisfies the fund's mandate before a single trade is placed.",
		param: {
			label: "equity target",
			unit: "%",
			min: 0,
			max: 100,
			step: 1,
			default: 80
		},
		safe: {
			lo: 0,
			hi: 85
		},
		answer: (eq) => `Rebalance to ${eq}% equities / ${100 - eq}% bonds.`,
		check: (eq) => eq > 85 ? {
			proven: false,
			witness: `equity ${eq}% breaches the ≤ 85% mandate covenant`
		} : {
			proven: true,
			witness: "allocation satisfies the ≤ 85% equity covenant"
		},
		smt: (eq) => [
			"$ z3 verify allocation.smt2",
			`read AI answer → equity = ${eq}%, bonds = ${100 - eq}%`,
			"(set-logic QF_LRA)",
			"(declare-const equity Real)",
			`(assert (= equity ${eq}))`,
			"(assert (> equity 85))                ; breach the mandate?",
			"(check-sat)"
		]
	}
];
var ACCENT = "oklch(0.72 0.09 220)";
var WARN = "oklch(0.72 0.16 45)";
var T = (l, c, h) => ({
	light: [
		l,
		c,
		h
	],
	dark: [
		l,
		c,
		h
	]
});
var FIELD_CYAN = T(.8, .13, 210);
var FIELD_GREEN = T(.81, .2, 150);
var FIELD_WARN = T(.72, .18, 45);
function VerifyWidget() {
	const [sel, setSel] = (0, import_react.useState)(0);
	const [v, setV] = (0, import_react.useState)(CLAIMS[0].param.default);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [step, setStep] = (0, import_react.useState)(0);
	const [res, setRes] = (0, import_react.useState)(null);
	const timers = (0, import_react.useRef)([]);
	const statusRef = (0, import_react.useRef)({
		mode: "idle",
		proven: true
	});
	const { canvasRef, pointerTargetRef } = useDomainCanvas((0, import_react.useMemo)(() => proverField({
		tint: FIELD_CYAN,
		ok: FIELD_GREEN,
		bad: FIELD_WARN
	}, () => statusRef.current), []));
	const clearTimers = () => {
		timers.current.forEach((t) => window.clearTimeout(t));
		timers.current = [];
	};
	const reset = () => {
		clearTimers();
		setStatus("idle");
		setStep(0);
		setRes(null);
	};
	(0, import_react.useEffect)(() => {
		setV(CLAIMS[sel].param.default);
		reset();
		return clearTimers;
	}, [sel]);
	const c = CLAIMS[sel];
	const lines = c.smt(v);
	const run = () => {
		if (status === "running") return;
		clearTimers();
		const t0 = typeof performance !== "undefined" ? performance.now() : 0;
		const r = c.check(v);
		const ms = (typeof performance !== "undefined" ? performance.now() : 0) - t0;
		setRes({
			proven: r.proven,
			witness: r.witness,
			verdict: r.proven ? "unsat" : "sat",
			ms
		});
		setStatus("running");
		setStep(0);
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setStep(lines.length);
			setStatus("done");
			return;
		}
		lines.forEach((_, idx) => {
			timers.current.push(window.setTimeout(() => setStep(idx + 1), 300 * (idx + 1)));
		});
		timers.current.push(window.setTimeout(() => setStatus("done"), 300 * lines.length + 450));
	};
	const proven = res?.proven ?? true;
	const verdictColor = proven ? ACCENT : WARN;
	statusRef.current.mode = status;
	statusRef.current.proven = proven;
	const pct = (x) => (x - c.param.min) / (c.param.max - c.param.min) * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "try",
		className: "relative border-b border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "blueprint-grid-fine pointer-events-none absolute inset-0 opacity-40",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Demonstration" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "Verify an AI answer yourself."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
					children: [
						"Take an answer from an AI copilot, then",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "change the value"
						}),
						" and run the check. The verdict is computed live in your browser — push it out of bounds and watch it break. Nothing here is canned."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: CLAIMS.map((cl, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSel(idx),
						className: `group rounded-sm border p-4 text-left transition-all ${idx === sel ? "border-foreground/40 bg-foreground/[0.04]" : "border-border bg-background hover:border-foreground/25"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cl.domain }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/25",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cl.agent })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13.5px] leading-snug text-foreground",
							children: cl.value
						})]
					}, cl.domain))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: pointerTargetRef,
					className: "relative overflow-hidden rounded-sm bg-ink text-ink-foreground shadow-[0_30px_80px_-40px_oklch(0.22_0.03_250/0.45)] ring-1 ring-foreground/[0.08] transition-shadow duration-700",
					style: status === "done" && res ? { boxShadow: `0 0 70px -22px ${verdictColor}` } : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: canvasRef,
								className: "absolute inset-0 h-full w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center justify-between border-b border-white/10 px-5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `size-1.5 rounded-full ${status === "running" ? "animate-pulse" : ""}`,
									style: { background: status === "running" ? WARN : status === "done" ? verdictColor : "oklch(1 0 0 / 0.3)" }
								}), "proof engine"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-white/35",
								children: c.domain
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative border-b border-white/5 bg-white/[0.02] px-5 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40",
									children: ["AI answer · ", c.agent]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 font-mono text-[13.5px] leading-snug text-white/85",
									children: c.answer(v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "shrink-0 font-mono text-[11px] text-white/45",
											children: c.param.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: c.param.min,
											max: c.param.max,
											step: c.param.step,
											value: v,
											onChange: (e) => {
												setV(Number(e.target.value));
												reset();
											},
											className: "flex-1 cursor-pointer",
											style: { accentColor: ACCENT },
											"aria-label": c.param.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "w-16 shrink-0 text-right font-mono text-[15px] tabular-nums text-white",
											children: [v, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] text-white/40",
												children: [" ", c.param.unit]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-3 h-[3px] overflow-hidden rounded-full",
									"aria-hidden": true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0",
										style: { background: `linear-gradient(to right, oklch(0.72 0.18 45 / 0.45) 0% ${pct(c.safe.lo)}%, oklch(0.81 0.2 150 / 0.4) ${pct(c.safe.lo)}% ${pct(c.safe.hi)}%, oklch(0.72 0.18 45 / 0.45) ${pct(c.safe.hi)}% 100%)` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-white transition-[left] duration-100",
										style: { left: `${pct(v)}%` }
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1.5 flex items-center justify-between font-mono text-[9.5px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[oklch(0.81_0.2_150/0.8)]",
										children: [
											"provable · ",
											c.safe.lo,
											"–",
											c.safe.hi,
											" ",
											c.param.unit
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[oklch(0.72_0.18_45/0.8)]",
										children: "counterexample territory"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 font-mono text-[10.5px] text-white/35",
									children: ["checked against — ", c.rule]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative min-h-[190px] px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 font-mono text-[11.5px] leading-relaxed text-white/55",
								children: [status === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white/35",
									children: "$ z3 verify — press verify to run the check"
								}) : lines.slice(0, step).map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/20",
										children: s.startsWith("$") ? " " : "›"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: s.startsWith("$") ? "text-white/40" : "",
										children: s
									})]
								}, idx)), status === "done" && res && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									style: { color: verdictColor },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/20",
										children: proven ? "⊢" : "⊭"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"check-sat →",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: res.verdict
										}),
										proven ? " · no counterexample exists" : ` · counterexample: ${res.witness}`
									] })]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4",
							children: status === "done" && res ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex flex-wrap items-center gap-x-2 font-mono text-[11px]",
									style: { color: verdictColor },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: proven ? "proven" : "refuted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-white/25",
											children: "·"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-white/40",
											children: [
												"checked in ",
												res.ms < .5 ? "<0.5" : res.ms.toFixed(1),
												" ",
												"ms"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] text-white/65",
									children: res.witness
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: run,
								className: "shrink-0 rounded-sm p-1 transition-opacity hover:opacity-80",
								"aria-label": "Run again",
								style: { color: verdictColor },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofMark, {
									symbol: proven ? "⊢" : "⊭",
									className: "seal-stamp h-10 w-10"
								})
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: run,
								disabled: status === "running",
								className: "inline-flex items-center gap-2 border border-white/25 bg-white/5 px-5 py-2.5 font-display text-[12px] font-medium text-white transition-all hover:border-white/50 hover:bg-white/10 disabled:opacity-60",
								children: [status === "running" ? "Proving…" : "Verify", status !== "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							})
						})
					]
				})]
			})]
		})]
	});
}
var t = (light, dark) => ({
	light,
	dark
});
var CYAN = t([
	.52,
	.15,
	215
], [
	.8,
	.13,
	210
]);
var GREEN = t([
	.53,
	.17,
	152
], [
	.81,
	.2,
	150
]);
var RED = t([
	.55,
	.21,
	25
], [
	.72,
	.23,
	25
]);
var TEAL = t([
	.54,
	.13,
	195
], [
	.82,
	.13,
	195
]);
var MAGENTA = t([
	.55,
	.21,
	330
], [
	.78,
	.19,
	330
]);
var AMBER = t([
	.58,
	.16,
	78
], [
	.82,
	.17,
	82
]);
var AZURE = t([
	.5,
	.15,
	255
], [
	.78,
	.13,
	250
]);
var SKY = t([
	.55,
	.16,
	208
], [
	.85,
	.14,
	205
]);
var INDIGO = t([
	.45,
	.19,
	295
], [
	.76,
	.15,
	295
]);
var VIOLET = t([
	.56,
	.2,
	322
], [
	.83,
	.16,
	322
]);
var VISUALS = [
	{ make: asciiScan({
		tint: CYAN,
		verified: GREEN,
		alert: RED,
		speed: .5
	}) },
	{ make: ecgMonitor({
		tint: RED,
		alert: AMBER,
		speed: 1
	}) },
	{ make: dnaHelix({
		strand: TEAL,
		pairA: MAGENTA,
		pairB: AMBER,
		flag: RED,
		speed: 1
	}) },
	{ make: dataFlowNet({
		tint: AZURE,
		packet: SKY,
		threat: RED,
		density: 1.1
	}) },
	{ make: candlestick({
		up: GREEN,
		down: RED,
		limit: AMBER,
		speed: 1
	}) },
	{ make: citationArcs({
		tint: INDIGO,
		accent: VIOLET,
		conflict: RED,
		speed: 1
	}) },
	{ make: redactionRain({
		tint: GREEN,
		mask: AMBER,
		cell: 14,
		speed: 1
	}) },
	{ make: radarSweep({
		tint: AMBER,
		flag: RED,
		speed: 1
	}) }
];
function DomainVisual({ index }) {
	const visual = VISUALS[index % VISUALS.length];
	const { canvasRef, pointerTargetRef } = useDomainCanvas((0, import_react.useMemo)(() => visual.make, [visual]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: pointerTargetRef,
		className: "pointer-events-auto absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: visual.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "absolute inset-0 h-full w-full object-cover opacity-80",
			src: visual.video,
			autoPlay: true,
			loop: true,
			muted: true,
			playsInline: true,
			preload: "metadata"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full"
		})
	});
}
var DOMAINS = [
	{
		n: "01",
		title: "Security & Compliance",
		body: "Access-control policies, firewall rulesets, and organizational handbooks verified against compliance standards. Conflicts between policy-as-written and policy-as-enforced are surfaced automatically."
	},
	{
		n: "02",
		title: "Healthcare & Clinical Safety",
		body: "Dosing protocols, device specifications, and safety envelopes checked against regulatory requirements. Every critical parameter is verified - units, ranges, and boundary conditions included."
	},
	{
		n: "03",
		title: "Clinical Trials & Protocols",
		body: "Eligibility criteria, contraindication logic, and dosing rules verified against peer-reviewed guidelines. Ambiguities in the protocol are identified before they affect patient outcomes."
	},
	{
		n: "04",
		title: "Network & Infrastructure",
		body: "Firewall rulesets, segmentation policies, and infrastructure configurations verified against PCI-DSS, IEC 62443, and internal security baselines. Changes are proved safe before deployment."
	},
	{
		n: "05",
		title: "Finance & Risk",
		body: "Solvency covenants, exposure limits, and margin invariants verified against mandate requirements. Violations are surfaced as concrete counterexamples, not post-hoc audit findings."
	},
	{
		n: "06",
		title: "Legal & Regulatory",
		body: "Statutory text, regulatory obligations, and operational rules verified for internal consistency. Every derivation is traceable back to the source provision."
	},
	{
		n: "07",
		title: "Data Protection & Privacy",
		body: "Processing records, data-transfer mechanisms, and lawful-basis logic verified against GDPR and regional frameworks. Compliance is proved, not merely asserted."
	},
	{
		n: "08",
		title: "Export Control & Sanctions",
		body: "Classification determinations and dual-use assessments verified against current control lists. Every decision carries a machine-checkable derivation."
	}
];
function DomainGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "domains",
		className: "border-b border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-6 pt-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ III"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Domains" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "Wherever the rules are written down."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
					children: "The same verification pipeline serves any domain governed by written rules - standards, statutes, protocols, or policy. Eight active fronts. One method."
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 border-l border-border md:grid-cols-2",
				children: DOMAINS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/engage",
					className: "group relative flex min-h-[440px] flex-col overflow-hidden border-b border-r border-border bg-[oklch(0.965_0.008_90)] blueprint-grid-fine dark:bg-[oklch(0.175_0.014_250)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainVisual, { index: i }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-background/60 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-background via-background/88 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none relative flex h-full flex-col p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] tracking-[0.14em] text-foreground/70",
									children: d.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "text-[12px] text-foreground/60 opacity-0 transition-opacity group-hover:opacity-100",
									children: "↗"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex min-h-[34%] flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-[20px] font-medium leading-[1.2] tracking-tight text-foreground",
									children: d.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground",
									children: d.body
								})]
							})]
						})
					]
				}, d.n))
			})
		})]
	});
}
var EXAMPLES = [
	{
		id: "clinical",
		label: "Clinical safety",
		tag: "Healthcare",
		filename: "dose.smt2",
		runner: "z3 dose.smt2",
		claim: "A clinical assistant returns: \"administer 45 mg of methotrexate to a 34 kg patient.\" The sentence sounds right. Nothing about it, as text, tells you whether it is safe. That is what verification is for.",
		verdict: "unsat",
		verdictBody: "Safety envelope proved. No patient in the label window can receive a dose above 60 mg.",
		code: [
			[{
				t: "; dose.smt2 - pediatric dose safety envelope",
				c: "cmt"
			}],
			[{
				t: "(set-logic QF_LRA)",
				c: "kw"
			}],
			[{ t: "" }],
			[
				{ t: "(declare-const " },
				{
					t: "weight",
					c: "fn"
				},
				{ t: " Real)     " },
				{
					t: "; kg",
					c: "cmt"
				}
			],
			[
				{ t: "(declare-const " },
				{
					t: "height",
					c: "fn"
				},
				{ t: " Real)     " },
				{
					t: "; cm",
					c: "cmt"
				}
			],
			[
				{ t: "(declare-const " },
				{
					t: "dose",
					c: "fn"
				},
				{ t: "   Real)     " },
				{
					t: "; mg",
					c: "cmt"
				}
			],
			[{ t: "" }],
			[
				{ t: "(assert (and (>= weight " },
				{
					t: "10",
					c: "num"
				},
				{ t: ") (<= weight " },
				{
					t: "80",
					c: "num"
				},
				{ t: ")))" }
			],
			[
				{ t: "(assert (and (>= height " },
				{
					t: "80",
					c: "num"
				},
				{ t: ") (<= height " },
				{
					t: "200",
					c: "num"
				},
				{ t: ")))" }
			],
			[{ t: "" }],
			[
				{ t: "(assert (= dose (* " },
				{
					t: "15",
					c: "num"
				},
				{ t: " (bsa weight height))))" }
			],
			[{ t: "" }],
			[{
				t: "; negate the safety property; expect unsat",
				c: "cmt"
			}],
			[
				{ t: "(assert (> dose " },
				{
					t: "60.0",
					c: "num"
				},
				{ t: "))" }
			],
			[{ t: "" }],
			[{
				t: "(check-sat)",
				c: "kw"
			}]
		],
		stages: [
			{
				n: "01",
				title: "The claim",
				body: "A clinical assistant returns: \"administer 45 mg of methotrexate to a 34 kg patient.\" The sentence sounds right - but sounding right is not the same as being safe. Verification starts here.",
				lines: []
			},
			{
				n: "02",
				title: "Choose a logic",
				body: "We ask a theorem prover to reason in linear real arithmetic - a well-understood fragment of mathematics guaranteed to give a definite answer.",
				lines: [2]
			},
			{
				n: "03",
				title: "Name the unknowns",
				body: "Weight, height, and dose become real-valued variables. The prover will consider every possible assignment of numbers to them.",
				lines: [
					4,
					5,
					6
				]
			},
			{
				n: "04",
				title: "Encode the label",
				body: "The FDA monograph specifies the patient range the drug is licensed for: 10–80 kg, 80–200 cm. These become constraints the prover enforces across every possible patient.",
				lines: [8, 9]
			},
			{
				n: "05",
				title: "Encode the formula",
				body: "The label also gives the dosing formula: 15 mg per unit of body surface area. That equation becomes another assertion.",
				lines: [11]
			},
			{
				n: "06",
				title: "Negate the property",
				body: "We do not ask the prover to confirm the property. We ask it to find a counterexample - any patient who could receive more than 60 mg.",
				lines: [13, 14]
			},
			{
				n: "07",
				title: "The verdict",
				body: "The prover reports unsat: no such patient exists within the label window. The safety envelope is not a policy or a hope - it is a theorem, machine-checked and independently verifiable.",
				lines: [16]
			}
		]
	},
	{
		id: "security",
		label: "Security & compliance",
		tag: "Access control",
		filename: "rbac.smt2",
		runner: "z3 rbac.smt2",
		claim: "A copilot proposes: \"grant the intern the 'auditor' role so they can pull the quarterly report.\" The request sounds reasonable - but does it open a path to customer PII?",
		verdict: "unsat",
		verdictBody: "No role-graph path lets a non-privileged user reach PII. The grant is safe to apply and is bound by SOC 2 CC6.1 audit obligations.",
		code: [
			[{
				t: "; rbac.smt2 - privilege-escalation check",
				c: "cmt"
			}],
			[{
				t: "(set-logic QF_UF)",
				c: "kw"
			}],
			[{ t: "" }],
			[
				{ t: "(declare-sort " },
				{
					t: "Role",
					c: "fn"
				},
				{ t: " 0)" }
			],
			[
				{ t: "(declare-const " },
				{
					t: "intern auditor pii_reader",
					c: "fn"
				},
				{ t: " Role)" }
			],
			[{ t: "" }],
			[{
				t: "; inherits(a, b) means role a inherits every permission of b",
				c: "cmt"
			}],
			[
				{ t: "(declare-fun " },
				{
					t: "inherits",
					c: "fn"
				},
				{ t: " (Role Role) Bool)" }
			],
			[
				{ t: "(assert (" },
				{
					t: "inherits",
					c: "fn"
				},
				{ t: " intern auditor))" }
			],
			[{ t: "" }],
			[{
				t: "; audit role must NOT be able to read PII, directly or transitively",
				c: "cmt"
			}],
			[
				{ t: "(assert (not (" },
				{
					t: "inherits",
					c: "fn"
				},
				{ t: " auditor pii_reader)))" }
			],
			[{ t: "" }],
			[{
				t: "; negate: search for any escalation path intern → pii_reader",
				c: "cmt"
			}],
			[
				{ t: "(assert (" },
				{
					t: "inherits",
					c: "fn"
				},
				{ t: " intern pii_reader))" }
			],
			[{ t: "" }],
			[{
				t: "(check-sat)",
				c: "kw"
			}]
		],
		stages: [
			{
				n: "01",
				title: "The request",
				body: "A copilot proposes granting an intern the \"auditor\" role to pull a quarterly report. It sounds reasonable - but reasonable and safe are not the same thing.",
				lines: []
			},
			{
				n: "02",
				title: "Choose a logic",
				body: "We reason in uninterpreted functions - the natural logic of role graphs, where the only operations are membership and inheritance.",
				lines: [2]
			},
			{
				n: "03",
				title: "Name the roles",
				body: "The intern, the proposed auditor role, and the sensitive pii_reader role become atoms the solver can reason over.",
				lines: [4, 5]
			},
			{
				n: "04",
				title: "The proposed grant",
				body: "Applying the copilot's suggestion, the intern inherits from auditor. This is the change being audited.",
				lines: [8, 9]
			},
			{
				n: "05",
				title: "The compliance rule",
				body: "The organization's SOC 2 policy is explicit: auditor may not inherit pii_reader, directly or transitively.",
				lines: [11, 12]
			},
			{
				n: "06",
				title: "Search for an escalation",
				body: "We do not ask if the grant is safe. We ask the prover to construct any inheritance path from intern to pii_reader.",
				lines: [14, 15]
			},
			{
				n: "07",
				title: "The verdict",
				body: "The prover reports unsat: no escalation path exists under the stated policy. The grant is verifiably safe, and the full derivation is logged as an auditable record.",
				lines: [17]
			}
		]
	},
	{
		id: "finance",
		label: "Finance & risk",
		tag: "Mandate",
		filename: "mandate.smt2",
		runner: "z3 mandate.smt2",
		claim: "A trading copilot proposes: \"rebalance the fund to 80% equities.\" It fits the strategy - but does the trade stay inside the mandate the fund is legally bound to?",
		verdict: "unsat",
		verdictBody: "No covenant breach exists for this rebalance. The trade set is admissible under the mandate - proved, not spot-checked.",
		code: [
			[{
				t: "; mandate.smt2 - portfolio rebalance check",
				c: "cmt"
			}],
			[{
				t: "(set-logic QF_LRA)",
				c: "kw"
			}],
			[{ t: "" }],
			[
				{ t: "(declare-const " },
				{
					t: "equity",
					c: "fn"
				},
				{ t: " Real)   " },
				{
					t: "; fraction in equities",
					c: "cmt"
				}
			],
			[
				{ t: "(declare-const " },
				{
					t: "issuer",
					c: "fn"
				},
				{ t: " Real)   " },
				{
					t: "; largest single-issuer weight",
					c: "cmt"
				}
			],
			[{ t: "" }],
			[{
				t: "; proposed rebalance: 80/20 with a 4% top holding",
				c: "cmt"
			}],
			[
				{ t: "(assert (= equity " },
				{
					t: "0.80",
					c: "num"
				},
				{ t: "))" }
			],
			[
				{ t: "(assert (= issuer " },
				{
					t: "0.04",
					c: "num"
				},
				{ t: "))" }
			],
			[{ t: "" }],
			[{
				t: "; mandate covenants",
				c: "cmt"
			}],
			[
				{ t: "(assert (<= equity " },
				{
					t: "0.85",
					c: "num"
				},
				{ t: "))" }
			],
			[
				{ t: "(assert (<= issuer " },
				{
					t: "0.05",
					c: "num"
				},
				{ t: "))" }
			],
			[{ t: "" }],
			[{
				t: "; negate: search for any covenant breach",
				c: "cmt"
			}],
			[
				{ t: "(assert (or (> equity " },
				{
					t: "0.85",
					c: "num"
				},
				{ t: ") (> issuer " },
				{
					t: "0.05",
					c: "num"
				},
				{ t: ")))" }
			],
			[{ t: "" }],
			[{
				t: "(check-sat)",
				c: "kw"
			}]
		],
		stages: [
			{
				n: "01",
				title: "The proposal",
				body: "A trading copilot proposes rebalancing the fund to 80% equities. It fits the strategy - but the fund is bound by a mandate, and fitting the strategy is not the same as honoring the covenant.",
				lines: []
			},
			{
				n: "02",
				title: "Choose a logic",
				body: "Portfolio weights are real numbers with linear constraints, so we reason in linear real arithmetic - the prover will consider every admissible allocation.",
				lines: [2]
			},
			{
				n: "03",
				title: "Name the unknowns",
				body: "The equity fraction and the largest single-issuer weight become real-valued variables the solver reasons over.",
				lines: [4, 5]
			},
			{
				n: "04",
				title: "The proposed trade",
				body: "The copilot's rebalance fixes the numbers: 80% equities and a 4% top holding. This is the exact allocation being audited.",
				lines: [
					7,
					8,
					9
				]
			},
			{
				n: "05",
				title: "The mandate covenants",
				body: "The fund's mandate caps equities at 85% and forbids any single issuer above 5%. These become hard constraints.",
				lines: [
					11,
					12,
					13
				]
			},
			{
				n: "06",
				title: "Negate the property",
				body: "We do not ask whether the trade is compliant. We ask the prover to find any breach - an equity or issuer weight that violates a covenant.",
				lines: [15, 16]
			},
			{
				n: "07",
				title: "The verdict",
				body: "The prover reports unsat: no breach exists for this rebalance. The trade is admissible under the mandate, and the check runs again on every future order.",
				lines: [18]
			}
		]
	},
	{
		id: "privacy",
		label: "Data protection",
		tag: "GDPR transfer",
		filename: "gdpr.smt2",
		runner: "z3 gdpr.smt2",
		claim: "A data pipeline is about to replicate EU user records to a US region. The feature works - but is the transfer lawful under GDPR, or a reportable breach waiting to happen?",
		verdict: "unsat",
		verdictBody: "No configuration lets a transfer proceed without a lawful basis and an Article 46 safeguard. Compliance here is a theorem, not a checkbox.",
		code: [
			[{
				t: "; gdpr.smt2 - lawful cross-border transfer check",
				c: "cmt"
			}],
			[{
				t: "(set-logic QF_UF)",
				c: "kw"
			}],
			[{ t: "" }],
			[
				{ t: "(declare-const " },
				{
					t: "has_lawful_basis",
					c: "fn"
				},
				{ t: " Bool)  " },
				{
					t: "; Art. 6 basis",
					c: "cmt"
				}
			],
			[
				{ t: "(declare-const " },
				{
					t: "has_safeguard",
					c: "fn"
				},
				{ t: " Bool)     " },
				{
					t: "; Art. 46 SCCs",
					c: "cmt"
				}
			],
			[
				{ t: "(declare-const " },
				{
					t: "transfer_ok",
					c: "fn"
				},
				{ t: " Bool)" }
			],
			[{ t: "" }],
			[{
				t: "; policy: allow a transfer only with basis AND safeguard",
				c: "cmt"
			}],
			[{ t: "(assert (= transfer_ok (and has_lawful_basis has_safeguard)))" }],
			[{ t: "" }],
			[{
				t: "; the pipeline as configured: consent recorded, SCCs in place",
				c: "cmt"
			}],
			[{ t: "(assert has_lawful_basis)" }],
			[{ t: "(assert has_safeguard)" }],
			[{ t: "" }],
			[{
				t: "; negate: search for an allowed transfer with no safeguard",
				c: "cmt"
			}],
			[{ t: "(assert (and transfer_ok (not has_safeguard)))" }],
			[{ t: "" }],
			[{
				t: "(check-sat)",
				c: "kw"
			}]
		],
		stages: [
			{
				n: "01",
				title: "The transfer",
				body: "A data pipeline is about to replicate EU user records into a US region. The feature works - but a transfer that works and a transfer that is lawful are different questions.",
				lines: []
			},
			{
				n: "02",
				title: "Choose a logic",
				body: "The obligations are boolean conditions, so we reason in uninterpreted functions over propositions - every combination of facts is considered.",
				lines: [2]
			},
			{
				n: "03",
				title: "Name the facts",
				body: "Whether a lawful basis exists, whether an Article 46 safeguard is in place, and whether the transfer is permitted become boolean variables.",
				lines: [
					4,
					5,
					6
				]
			},
			{
				n: "04",
				title: "Encode the rule",
				body: "GDPR permits the transfer only when both a lawful basis and a valid safeguard are present. That rule becomes an equivalence the prover must respect.",
				lines: [8, 9]
			},
			{
				n: "05",
				title: "The configured pipeline",
				body: "As deployed, the pipeline records consent and has standard contractual clauses in place - both facts are asserted true.",
				lines: [
					11,
					12,
					13
				]
			},
			{
				n: "06",
				title: "Negate the property",
				body: "We ask the prover to find the dangerous case: a transfer that is permitted yet lacks a safeguard - a reportable breach.",
				lines: [15, 16]
			},
			{
				n: "07",
				title: "The verdict",
				body: "The prover reports unsat: no such configuration exists. Under this policy a transfer can never proceed unlawfully, and the guarantee is re-checked on every deployment.",
				lines: [18]
			}
		]
	}
];
var CLASS = {
	kw: "text-[oklch(0.72_0.09_220)]",
	num: "text-[oklch(0.82_0.09_60)]",
	cmt: "text-white/35 italic",
	fn: "text-white"
};
function CodeCard({ example, active, activeLines, isVerdict }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm bg-ink text-ink-foreground shadow-[0_30px_80px_-40px_oklch(0.22_0.03_250/0.5)] ring-1 ring-foreground/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/10 px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-[oklch(0.72_0.09_220)]" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10.5px] text-white/40",
						children: example.filename
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[10px] tabular-nums text-white/40",
					children: [
						"Stage ",
						active + 1,
						" / ",
						example.stages.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-white/5 bg-white/[0.02] px-5 py-2 font-mono text-[10.5px] text-white/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/25",
						children: "$"
					}),
					" ",
					example.runner
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "font-mono text-[13px] leading-[1.9]",
					children: example.code.map((line, li) => {
						const lineNo = li + 1;
						const highlighted = activeLines.has(lineNo);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative flex transition-all duration-500 ${activeLines.size > 0 && !highlighted ? "opacity-25" : "opacity-100"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-2 top-0 bottom-0 w-0.5 rounded-full transition-colors ${highlighted ? "bg-[oklch(0.72_0.09_220)]" : "bg-transparent"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-7 shrink-0 select-none pr-2 text-right text-[10px] tabular-nums text-white/20",
									children: lineNo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 whitespace-pre",
									children: line[0]?.t === "" && line.length === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "\xA0" }) : line.map((tok, ti) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: tok.c ? CLASS[tok.c] : "text-white/85",
										children: tok.t
									}, ti))
								})
							]
						}, li);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `overflow-hidden border-t border-white/10 transition-all duration-700 ${isVerdict ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1.5 flex items-center gap-2 font-mono text-[11px] text-[oklch(0.72_0.09_220)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "✓"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: example.verdict })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-white/70",
						children: example.verdictBody
					})]
				})
			})
		]
	});
}
function ProofWalkthrough() {
	const [exampleIdx, setExampleIdx] = (0, import_react.useState)(0);
	const [active, setActive] = (0, import_react.useState)(0);
	const [mobileCodeOpen, setMobileCodeOpen] = (0, import_react.useState)(true);
	const stageRefs = (0, import_react.useRef)([]);
	const example = EXAMPLES[exampleIdx];
	(0, import_react.useEffect)(() => {
		setActive(0);
	}, [exampleIdx]);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver((entries) => {
			const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
			if (visible.length > 0) {
				const idx = Number(visible[0].target.dataset.stage);
				if (!Number.isNaN(idx)) setActive(idx);
			}
		}, {
			rootMargin: "-35% 0px -55% 0px",
			threshold: 0
		});
		stageRefs.current.forEach((el) => el && observer.observe(el));
		return () => observer.disconnect();
	}, [exampleIdx]);
	const activeLines = new Set(example.stages[active]?.lines ?? []);
	const isVerdict = active === example.stages.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "walkthrough",
		className: "relative border-b border-border bg-muted/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "blueprint-grid-fine absolute inset-0 opacity-60",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-14 max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ V"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Interactive walkthrough" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-6 font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "Watch a claim become a theorem."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[62ch] text-[16px] leading-relaxed text-muted-foreground",
							children: "See how verification works, step by step: a natural-language claim is formalized into a mathematical object, checked against the rules that govern it, and either proved or refuted - with a concrete witness. Scroll to advance. Switch examples to see the same method applied across domains."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-14 flex flex-wrap items-center gap-1 rounded-sm border border-border bg-background/60 p-1 w-fit",
					role: "tablist",
					"aria-label": "Choose an example",
					children: EXAMPLES.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": i === exampleIdx,
						onClick: () => setExampleIdx(i),
						className: `rounded-sm px-4 py-2 font-display text-[12px] font-medium transition-colors ${i === exampleIdx ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`,
						children: ex.label
					}, ex.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky top-20 z-20 mb-10 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-sm border border-border bg-background/80 backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMobileCodeOpen((v) => !v),
							"aria-expanded": mobileCodeOpen,
							className: "flex w-full items-center justify-between px-4 py-2.5 font-mono text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-[oklch(0.72_0.09_220)]" }),
									example.filename,
									" · Stage ",
									active + 1,
									"/",
									example.stages.length
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: `transition-transform duration-300 ${mobileCodeOpen ? "rotate-180" : ""}`,
								children: "▾"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `overflow-hidden transition-[max-height,opacity] duration-300 ${mobileCodeOpen ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-[58vh] overflow-y-auto p-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeCard, {
									example,
									active,
									activeLines,
									isVerdict
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "relative",
						children: example.stages.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							ref: (el) => {
								stageRefs.current[i] = el;
							},
							"data-stage": i,
							className: "relative min-h-[52vh] border-l border-border pl-8 pb-16 last:pb-0 lg:min-h-[62vh]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-[7px] top-0 grid size-3.5 place-items-center rounded-full border-2 transition-colors ${i <= active ? "border-foreground bg-foreground" : "border-border bg-background"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `transition-all duration-500 ${i === active ? "opacity-100" : "opacity-40"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4 flex items-baseline gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[11px] tracking-[0.14em] text-foreground/60",
											children: s.n
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
											children: [
												"Stage ",
												i + 1,
												" of ",
												example.stages.length
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mb-4 font-display text-[26px] font-medium leading-[1.15] tracking-tight text-foreground",
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-[52ch] text-[15.5px] leading-[1.65] text-foreground/80",
										children: s.body
									})
								]
							})]
						}, s.n))
					}, example.id), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-24",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeCard, {
								example,
								active,
								activeLines,
								isVerdict
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex items-center gap-2",
								children: example.stages.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-px flex-1 transition-colors ${i <= active ? "bg-foreground/70" : "bg-border"}` }, i))
							})]
						})
					})]
				})
			]
		})]
	});
}
function Origin() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "lab",
		className: "border-b border-border bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-16 px-6 pt-28 pb-20 lg:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground/70",
							children: "§ VI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground/50",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lab" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-8 max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
					children: "Built at the edge of what's verifiable."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[56ch] space-y-5 text-[16px] leading-[1.65] text-foreground/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Founded in 2026 by research software and computing engineers at CERN - where systems must be correct, not just tested. We bring the engineering discipline of building mission-critical research infrastructure to artificial intelligence: no result without a check, no claim without a derivation." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "The lab operates from Geneva, within the gravitational field of the world's largest research computing infrastructure. We build tools that hold AI to the same standard we hold our own systems."
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "border-y border-border font-mono text-[12px]",
					children: [
						["Founded", "2026"],
						["Lineage", "CERN · Geneva"],
						["Coordinates", "46.2330° N · 6.0557° E"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4 border-b border-border py-4 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "uppercase tracking-[0.2em] text-muted-foreground",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "whitespace-pre-line text-right text-foreground",
							children: v
						})]
					}, k))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "mailto:research@boundlessintuition.com",
						className: "group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground",
						children: ["research@boundlessintuition.com", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "transition-transform group-hover:translate-x-1",
							children: "→"
						})]
					})
				})]
			})]
		})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationMethod, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageBand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyWidget, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationValue, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProofWalkthrough, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Origin, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
