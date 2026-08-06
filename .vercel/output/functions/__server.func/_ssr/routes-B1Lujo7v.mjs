import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as useSectionViews, s as track$1, t as SECTIONS } from "./theme-0hrIaw_O.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-Dr4S4eQG.mjs";
import { s as useDomainCanvas } from "./useDomainCanvas-wwM0K-cd.mjs";
import { a as candlestick, c as dataFlowNet, d as radarSweep, f as redactionRain, i as asciiScan, l as dnaHelix, n as PipelineBackdrop, o as citationArcs, r as asciiFlow, t as MethodVisual, u as ecgMonitor } from "./MethodVisual-BAErQcRh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1Lujo7v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SectionRail() {
	const [active, setActive] = (0, import_react.useState)(SECTIONS[0].id);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el) => el !== null);
		if (!els.length) return;
		const visible = /* @__PURE__ */ new Set();
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) visible.add(entry.target.id);
			else visible.delete(entry.target.id);
			const next = SECTIONS.find((s) => visible.has(s.id));
			if (next) setActive(next.id);
		}, { rootMargin: "-45% 0px -45% 0px" });
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Page sections",
		className: "fixed right-5 top-[42%] z-40 hidden -translate-y-1/2 xl:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "group flex flex-col items-end gap-1",
			children: SECTIONS.map((s) => {
				const isActive = active === s.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/#${s.id}`,
						"aria-current": isActive ? "true" : void 0,
						className: "flex items-center justify-end gap-3 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 ${isActive ? "text-foreground group-hover:text-foreground" : "text-muted-foreground hover:text-foreground"}`,
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: `h-px shrink-0 transition-all duration-300 ${isActive ? "w-8 bg-accent" : "w-4 bg-foreground/25 group-hover:bg-foreground/45"}`
						})]
					})
				}, s.id);
			})
		})
	});
}
/**
* The moving hero plate. Sits on top of the still poster in Hero.tsx and
* cross-fades in once it is actually playing — the clip's first frame *is* the
* poster, so the hand-off is invisible.
*
* Nothing is fetched during SSR or first paint: the element gets no src until
* after mount, and only for a visitor who wants motion and is not on a metered
* connection. Everyone else keeps the still and spends zero extra bytes.
*
* The camera in the source is locked and only the water moves, so the file is a
* crossfade loop: the build-up is trimmed off and the tail is dissolved back
* onto the head, giving 5.6s that repeat without a cut.
*/
function HeroFilm({ className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const [variant, setVariant] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (navigator.connection?.saveData) return;
		setVariant(window.matchMedia("(max-width: 639.98px)").matches ? "mobile" : "desktop");
	}, []);
	(0, import_react.useEffect)(() => {
		const v = ref.current;
		if (!v || !variant) return;
		const base = variant === "mobile" ? "/hero-plate-mobile" : "/hero-plate";
		v.muted = true;
		v.preload = "auto";
		const start = (file) => {
			v.src = file;
			v.play().catch(() => {});
		};
		const preferWebm = v.canPlayType("video/webm; codecs=\"vp9\"") !== "";
		let usedFallback = false;
		const onError = () => {
			if (usedFallback) return;
			usedFallback = true;
			start(`${base}.mp4`);
		};
		v.addEventListener("error", onError);
		start(`${base}.${preferWebm ? "webm" : "mp4"}`);
		return () => v.removeEventListener("error", onError);
	}, [variant]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		className: `${className} transition-opacity duration-[1200ms] ease-out ${playing ? "opacity-100" : "opacity-0"}`,
		autoPlay: true,
		loop: true,
		muted: true,
		playsInline: true,
		preload: "none",
		disablePictureInPicture: true,
		"aria-hidden": true,
		tabIndex: -1,
		onPlaying: () => setPlaying(true)
	});
}
var PLATE_CROP = "h-full w-full object-cover object-[52%_58%] sm:object-[14%_8%]";
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "doctrine",
		className: "relative -mt-16 overflow-hidden lg:min-h-[min(56.25vw,60rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 isolate",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 opacity-[0.45] sm:contrast-[1.05] sm:saturate-[0.64] dark:opacity-[0.92] sm:dark:filter-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							media: "(max-width: 639.98px)",
							srcSet: "/hero-plate-poster-mobile.webp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/hero-plate-poster.webp",
							alt: "",
							className: PLATE_CROP
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroFilm, { className: `absolute inset-0 ${PLATE_CROP}` })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/25 dark:bg-background/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/55 via-background/40 to-background/60 lg:from-background/25 lg:via-transparent lg:to-background/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent lg:via-background/48 lg:to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { background: "radial-gradient(ellipse 82% 76% at 66% 55%, transparent 25%, color-mix(in oklab, var(--background) 58%, transparent) 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 opacity-[0.07] mix-blend-overlay dark:opacity-[0.09]",
						style: { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/35 to-transparent md:h-48 lg:h-20 lg:via-background/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-shell gap-16 px-6 lg:px-10 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "@container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mb-10 text-balance font-display text-[3rem] font-light leading-[1.08] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:mb-16 lg:text-[clamp(2.6rem,9.8cqw,4.4rem)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: "Foundational layer for"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: "Verified Intelligence"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[52ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85 lg:max-w-[42ch] lg:space-y-8 lg:text-[18px] lg:leading-[1.75]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Modern AI is fluent, not correct. It has the confidence of an expert with the accountability of a guess. In high-stakes domains, that gap is a liability." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "We formalize your domain rules into machine-checkable form and prove every answer correct before it reaches production."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-14 flex flex-wrap items-center gap-4 font-display text-[12px] font-medium lg:mt-28",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/engage",
								className: "group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-5 py-3 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10",
								children: ["Bring us your rules", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#method",
								className: "group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-foreground transition-colors hover:border-foreground",
								children: ["See the method", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#signal",
							className: "group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground lg:mt-14",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative grid size-2 place-items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "wl-ping absolute inset-0 rounded-full bg-[oklch(0.48_0.11_170)] dark:bg-[oklch(0.78_0.13_170)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-[oklch(0.48_0.11_170)] dark:bg-[oklch(0.78_0.13_170)]" })]
								}),
								"Get research updates",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-y-0.5",
									children: "↓"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "hidden lg:block"
				})]
			})
		]
	});
}
var STEPS = [
	{
		n: "01",
		title: "The model answers",
		body: "A copilot, agent, or model returns an answer. Fluent, fast, and on its own impossible to trust. Today this is where every system stops."
	},
	{
		n: "02",
		title: "The domain is formalized, once",
		body: "Your rules, standards, and policies are compiled into machine-checkable objects, once, up front. That asset is what makes every later answer verifiable."
	},
	{
		n: "03",
		title: "The answer becomes a claim",
		body: "Each answer is translated into a precise logical statement about what it asserts or does, with the ambiguity of natural language stripped out."
	},
	{
		n: "04",
		title: "The prover checks it",
		body: "A theorem prover checks the claim against the formalized rules. Either it proves the answer conforms, or it returns a counterexample showing exactly how it fails."
	},
	{
		n: "05",
		title: "Only proven answers ship",
		body: "Verified answers proceed with a signed, reproducible certificate. Refuted answers are blocked before production, with the reason attached."
	}
];
var ACC = "oklch(0.72 0.13 170)";
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
				className: `flex items-center gap-1.5 font-display text-[15px] font-medium tracking-tight ${engine ? "text-white" : verdict ? "text-[oklch(0.48_0.11_170)] dark:text-[oklch(0.78_0.13_170)]" : "text-foreground"}`,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "method",
		className: "relative bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-shell px-6 lg:px-10 py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "How an AI answer becomes a proof."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
						children: "We do not grade the model or ask it to check itself. We sit a proof engine between the AI and production, and let nothing through that cannot be verified against your rules."
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
						className: "group relative flex min-h-[400px] flex-col overflow-hidden bg-[oklch(0.9_0.012_90)] dark:bg-[oklch(0.08_0.009_250)]",
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
					children: "The model proposes; the prover disposes. This is not another model second-guessing the first. It is mathematics, checking a fluent answer against rules written down long before the question was asked."
				})
			]
		})
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
		className: "group relative overflow-hidden bg-ink text-ink-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					media: "(max-width: 768px)",
					srcSet: "/coverage-field-mobile.webp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/coverage-field.webp",
					alt: "",
					loading: "lazy",
					className: "coverage-pan h-full w-full object-cover opacity-30 saturate-[0.75] transition-[opacity,filter] duration-1000 ease-out group-hover:opacity-60 group-hover:saturate-100"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[oklch(0.72_0.13_170/0.07)] opacity-50 mix-blend-screen transition-opacity duration-1000 group-hover:opacity-100" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: { background: "radial-gradient(ellipse 60% 55% at 50% 45%, color-mix(in oklab, var(--ink) 45%, transparent), transparent 100%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/35 to-transparent md:h-48" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/35 to-transparent md:h-48" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-4xl px-6 py-32 text-center md:py-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-7 font-display text-[1.5rem] font-light leading-tight tracking-tight text-white/85 md:text-[2rem]",
					children: "How one proof holds across"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref,
					className: "font-mono text-[clamp(1.25rem,6.2vw,3.6rem)] font-medium leading-none tracking-tight tabular-nums text-[oklch(0.82_0.14_170)]",
					style: { textShadow: "0 0 32px oklch(0.72 0.13 170 / 0.45)" },
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
					children: "possible inputs, every value of a single 64-bit parameter. A test suite samples a few thousand. A proof covers all of them."
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
		body: "€20 million or 4% of global annual turnover, whichever is greater. One unlawful data flow, or one hallucinated disclosure of personal data, is enough to trigger it.",
		source: {
			cite: "Art. 83 GDPR",
			href: "https://gdpr-info.eu/art-83-gdpr/"
		}
	},
	{
		figure: "$2M / yr",
		label: "HIPAA",
		body: "Per-violation annual caps on mishandled health data, before the breach notifications, the OCR investigation, and the class action.",
		source: {
			cite: "HHS OCR enforcement",
			href: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html"
		}
	},
	{
		figure: "Personal",
		label: "SOX · SEC",
		body: "Executives personally attest to their controls. A materially wrong AI-generated disclosure is individual, criminal-adjacent liability, not just a corporate fine.",
		source: {
			cite: "18 U.S.C. § 1350",
			href: "https://www.law.cornell.edu/uscode/text/18/1350"
		}
	},
	{
		figure: "Precedent",
		label: "Litigation",
		body: "A fabricated citation, an unsafe instruction, a discriminatory decision. Once it reaches a customer, the cost is discovery, settlement, and case law written against you.",
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
		body: "A wrong dose is not a bug ticket. We prove the safety envelope holds for every patient in the label window, before a clinician ever sees the answer."
	},
	{
		tag: "Finance",
		head: "Measured in mandates",
		body: "A breached covenant costs fines, restitution, and trust, orders of magnitude beyond the price of proving the trade admissible first."
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
		body: "Teams paper over unreliability with brute force: retries, self-consistency sampling, LLM-as-judge chains, all burning tokens to average out errors that never fully vanish. One verified answer replaces a fistful of speculative ones, and a proof is deterministic and cacheable."
	},
	{
		head: "Errors die before they ship",
		body: "A mistake is cheap at proof time and ruinous in production. Verification deletes the expensive tail of a wrong answer: the rollbacks, the audits, the war rooms."
	},
	{
		head: "Auditable by construction",
		body: "Every certified answer arrives with its proof attached. The evidence auditors ask for is a by-product of running the system, not a quarterly scramble."
	}
];
var PRODUCTIVITY = [
	{
		n: "01",
		head: "Ship at the speed of CI",
		body: "Manual review is the throttle on every AI feature. Prove correctness automatically and the compliance queue leaves the critical path."
	},
	{
		n: "02",
		head: "Engineers build, not babysit",
		body: "No brittle test suites chasing edge cases, no hand-tuned guardrail prompts. The rules are formalized once; the prover covers every case."
	},
	{
		n: "03",
		head: "Audits in minutes, not quarters",
		body: "Certification becomes a query against signed proofs. After a change, the evidence regenerates itself."
	},
	{
		n: "04",
		head: "Automate the high-stakes work",
		body: "Once answers are provably safe, the decisions too risky to hand to AI, the ones that move the business, can finally be automated."
	}
];
var ACCENT = "text-[oklch(0.48_0.11_170)] dark:text-[oklch(0.78_0.13_170)]";
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
	const plateRef = (0, import_react.useRef)(null);
	const handlePlateMove = (e) => {
		const el = plateRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		el.style.setProperty("--fx", `${e.clientX - r.left}px`);
		el.style.setProperty("--fy", `${e.clientY - r.top}px`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "value",
		className: "relative border-b border-border bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-shell px-6 lg:px-10 py-28",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "Cheaper than being wrong."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
						children: "Compliance is already one of the largest line items in a regulated business, and one hallucinated answer can turn it into a lawsuit. Verification is a fixed cost set against an open-ended one."
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
										className: `font-mono text-[10px] uppercase tracking-[0.18em] ${ACCENT}`,
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
							children: "And that is before the standing cost of staying compliant: reviewers, outside counsel, audit consultants, quarterly evidence-gathering. Verification turns that recurring manual tax into a check that runs itself."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { label: "Where the cost lands" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: plateRef,
						onPointerMove: handlePlateMove,
						className: "relative overflow-hidden border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"aria-hidden": true,
							className: "absolute inset-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									media: "(max-width: 768px)",
									srcSet: "/value-field-mobile.webp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/value-field.webp",
									alt: "",
									loading: "lazy",
									className: "h-full w-full object-cover"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0",
									style: { background: "radial-gradient(620px circle at var(--fx, 50%) var(--fy, 50%), color-mix(in oklab, var(--background) 50%, transparent), color-mix(in oklab, var(--background) 76%, transparent) 80%)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0",
									style: { background: "radial-gradient(420px circle at var(--fx, 50%) var(--fy, 50%), color-mix(in oklab, var(--accent) 5%, transparent), transparent 70%)" }
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border/60 bg-background/85 p-8 backdrop-blur-[2px] lg:p-10",
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
												className: `font-mono text-[10px] uppercase tracking-[0.16em] ${ACCENT}`,
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
								className: "border border-border/60 bg-background/85 p-8 backdrop-blur-[2px] lg:p-10",
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
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { label: "And it makes teams faster" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4",
					children: PRODUCTIVITY.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col overflow-hidden bg-[oklch(0.9_0.012_90)] dark:bg-[oklch(0.08_0.009_250)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueBoxVisual, { index: idx }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-background/25" }),
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
					children: "A proof runs once and holds forever. Set against the penalties it averts and the audits it pre-empts, verification is the cheapest insurance in the stack, and it makes everything downstream of it faster."
				})
			]
		})
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
		body: "Access-control policies, firewall rulesets, and handbooks verified against compliance standards. Gaps between policy-as-written and policy-as-enforced surface automatically."
	},
	{
		n: "02",
		title: "Healthcare & Clinical Safety",
		body: "Dosing protocols, device specifications, and safety envelopes checked against regulatory requirements, including units, ranges, and boundary conditions."
	},
	{
		n: "03",
		title: "Clinical Trials & Protocols",
		body: "Eligibility criteria, contraindication logic, and dosing rules verified against peer-reviewed guidelines. Protocol ambiguities surface before they reach patients."
	},
	{
		n: "04",
		title: "Network & Infrastructure",
		body: "Rulesets, segmentation policies, and configurations verified against PCI-DSS, IEC 62443, and internal baselines. Changes are proved safe before deployment."
	},
	{
		n: "05",
		title: "Finance & Risk",
		body: "Solvency covenants, exposure limits, and margin invariants verified against the mandate. Violations arrive as concrete counterexamples, not audit findings."
	},
	{
		n: "06",
		title: "Legal & Regulatory",
		body: "Statutory text, regulatory obligations, and operational rules verified for internal consistency. Every derivation traces back to its source provision."
	},
	{
		n: "07",
		title: "Data Protection & Privacy",
		body: "Processing records, transfer mechanisms, and lawful-basis logic verified against GDPR and regional frameworks. Compliance is proved, not asserted."
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
		className: "relative border-b border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto max-w-shell px-6 lg:px-10 pt-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "Wherever the rules are written down."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
					children: "One pipeline serves any domain governed by written rules: standards, statutes, protocols, policy. Eight fronts, one method."
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto max-w-shell border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 border-l border-border md:grid-cols-2",
				children: DOMAINS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/engage",
					className: "group relative flex min-h-[440px] flex-col overflow-hidden border-b border-r border-border bg-[oklch(0.9_0.012_90)] dark:bg-[oklch(0.08_0.009_250)]",
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
function Origin() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "lab",
		className: "relative bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-shell gap-16 px-6 lg:px-10 pt-28 pb-20 lg:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-8 max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
				children: "Built at the edge of what's verifiable."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[56ch] space-y-5 text-[16px] leading-[1.65] text-foreground/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Founded in 2026 by research software and computing engineers from CERN, where systems must be correct, not just tested. We bring that discipline to artificial intelligence: no result without a check, no claim without a derivation." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "The lab operates from Geneva. We hold AI to the same standard we hold our own systems."
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						onClick: () => track$1("contact_mailto", { from: "lab" }),
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
	useSectionViews();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationMethod, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageBand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationValue, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Origin, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
