import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DDgF3BC-.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as objectType, r as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-Cgrkd3Pp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function apply(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", theme === "dark");
}
function ThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const initial = (typeof window !== "undefined" && window.localStorage.getItem("bi-theme") || null) ?? "dark";
		setTheme(initial);
		apply(initial);
		setMounted(true);
	}, []);
	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		apply(next);
		try {
			window.localStorage.setItem("bi-theme", next);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
		className: "grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/60 hover:text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[13px]",
			"aria-hidden": true,
			children: mounted ? theme === "dark" ? "☾" : "☀" : "·"
		})
	});
}
var SECTIONS = [
	{
		href: "/#doctrine",
		label: "Doctrine"
	},
	{
		href: "/#method",
		label: "Method"
	},
	{
		href: "/#try",
		label: "Demonstration"
	},
	{
		href: "/#domains",
		label: "Domains"
	},
	{
		href: "/#value",
		label: "Value"
	},
	{
		href: "/#walkthrough",
		label: "Walkthrough"
	},
	{
		href: "/#lab",
		label: "Lab"
	}
];
function TopBar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: `sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ${open ? "bg-background/85 backdrop-blur-md" : scrolled ? "bg-transparent backdrop-blur-[2px]" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						role: "img",
						"aria-label": "Boundless Intuition",
						className: "inline-block size-7 bg-foreground",
						style: {
							WebkitMaskImage: "url(/boundless_int_logo_white.png)",
							maskImage: "url(/boundless_int_logo_white.png)",
							WebkitMaskSize: "contain",
							maskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
							maskRepeat: "no-repeat",
							WebkitMaskPosition: "center",
							maskPosition: "center"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-light",
							children: "Boundless"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Intuition"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-light",
							children: "Labs"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden gap-8 font-display text-[12px] font-medium text-muted-foreground md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog",
						className: "transition-colors hover:text-foreground",
						children: "Blog"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://playground.boundlessintuition.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-1 transition-colors hover:text-foreground",
						children: ["Playground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "text-[10px]",
							children: "↗"
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/engage",
						className: "hidden items-center border border-foreground/25 px-4 py-1.5 font-display text-[12px] font-medium text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/5 sm:inline-flex",
						children: "Engage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": open ? "Close menu" : "Open menu",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						className: "grid size-9 place-items-center rounded-sm border border-border text-foreground transition-colors hover:bg-foreground/5 md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative block h-3 w-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}` })
							]
						})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `overflow-hidden transition-[max-height] duration-300 md:hidden ${open ? "max-h-96 border-t border-border bg-background/95 backdrop-blur-md" : "max-h-0"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col divide-y divide-border",
					children: [
						SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							onClick: () => setOpen(false),
							className: "py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
							children: s.label
						}, s.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							onClick: () => setOpen(false),
							className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
							children: "Blog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://playground.boundlessintuition.com/",
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: () => setOpen(false),
							className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
							children: ["Playground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "text-muted-foreground",
								children: "↗"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/engage",
							onClick: () => setOpen(false),
							className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground",
							children: ["Engage", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "text-muted-foreground",
								children: "→"
							})]
						})
					]
				})
			})
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SubscribeInput = objectType({
	email: stringType().email("That doesn't look like a valid email."),
	topics: arrayType(stringType()).max(12).default([])
});
var subscribeToWaitlist = createServerFn({ method: "POST" }).validator(SubscribeInput).handler(createSsrRpc("a09665e0a5ccb55e8be2ca52267403dc2b5094c9b6be00c64cbe098f9682d591"));
var UPDATES = [
	{
		date: "2026.07.13",
		tag: "Most recent",
		title: "Frontier models fail published clinical risk scores 20 to 45% of the time",
		excerpt: "Across six clinical calculators, the strongest models were wrong on up to 45% of cases. A deterministic rule, never another model, caught every miss, at a fraction of the cost of the call it checked.",
		meta: "verified · full report"
	},
	{
		date: "2026.07.06",
		tag: "Earlier",
		title: "The most capable model didn't win, and cost roughly 2× more",
		excerpt: "Our most expensive tier scored below both Opus and Sonnet on the harder benchmark, at about twice the cost per question. For this work, capability and spend aren't the same axis.",
		meta: "benchmark · 4 model tiers"
	},
	{
		date: "2026.06.27",
		tag: "Earlier",
		title: "Verifying an answer runs 15 to 50× cheaper than the call it checks",
		excerpt: "A deterministic rule runs in well under a millisecond. Priced per correct answer it's effectively free, since a wrong answer wastes its API spend too, so checking every one lowers the real cost.",
		meta: "cost analysis · from the ledger"
	}
];
/**
* The research-updates signup, embedded as the top strip of the site footer.
* Left: the pitch and email capture (through the `subscribeToWaitlist` server
* function, so the newsletter key stays server-side). Right: the most recent
* write-up, so people see what they'd actually receive.
*/
function Waitlist() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (status === "submitting") return;
		setStatus("submitting");
		setMessage("");
		try {
			const result = await subscribeToWaitlist({ data: {
				email,
				topics: []
			} });
			if (result.ok) {
				setMessage(result.status === "already" ? "You're already subscribed. Nothing to do." : "");
				setStatus("success");
			} else {
				setMessage(result.reason === "unconfigured" ? "Signups aren't open just yet. Reach us at research@boundlessintuition.com in the meantime." : "Something went wrong on our end. Please try again in a moment.");
				setStatus("error");
			}
		} catch {
			setMessage("We couldn't reach the server. Check your connection and try again.");
			setStatus("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "signal",
		className: "relative z-10 scroll-mt-20 border-t border-border bg-muted/30 [--sig:oklch(0.48_0.11_170)] dark:[--sig:oklch(0.78_0.13_170)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_0.92fr] lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative grid size-2.5 place-items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "wl-ping absolute inset-0 rounded-full bg-[var(--sig)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-[var(--sig)]" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Research updates" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-[16ch] font-display text-[2rem] font-light leading-[1.06] tracking-[-0.02em] text-foreground md:text-[2.6rem]",
						children: "The work, as we publish it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground",
						children: "New benchmarks, verification results, and tooling, sent when we have a real finding to share rather than on a schedule. Technical, infrequent, and no marketing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 max-w-md",
						children: status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "seal-stamp grid size-11 shrink-0 place-items-center rounded-full border-2 border-[var(--sig)] font-display text-[18px] text-[var(--sig)]",
								"aria-hidden": true,
								children: "∎"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[16px] font-medium tracking-tight text-foreground",
								children: "You're subscribed."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13.5px] leading-relaxed text-muted-foreground",
								children: message || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"We'll send new results to",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: email
									}),
									" as we publish them. Check your inbox to confirm."
								] })
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "group relative flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "waitlist-email",
												className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
												children: "Email"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "waitlist-email",
												type: "email",
												required: true,
												value: email,
												onChange: (e) => setEmail(e.target.value),
												placeholder: "you@organization.com",
												className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[16px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-transparent"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												className: "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--sig)] transition-transform duration-300 ease-out group-focus-within:scale-x-100"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: status === "submitting",
										className: "group inline-flex shrink-0 items-center justify-center gap-2 border border-foreground/40 bg-foreground/5 px-6 py-3 font-display text-[12px] font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground hover:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-60",
										children: status === "submitting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Subscribing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex gap-[3px]",
											"aria-hidden": true,
											children: [
												0,
												1,
												2
											].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "wl-bar h-2.5 w-[2px] bg-current",
												style: { animationDelay: `${i * .16}s` }
											}, i))
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Subscribe", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											className: "transition-transform group-hover:translate-x-1",
											children: "→"
										})] })
									})]
								}),
								status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "mt-3 border-l-2 border-[oklch(0.55_0.16_25)] pl-3 text-[13px] leading-relaxed text-[oklch(0.5_0.16_25)] dark:border-[oklch(0.7_0.16_25)] dark:text-[oklch(0.75_0.15_25)]",
									children: message
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-mono text-[11px] text-muted-foreground/70",
									children: "Unsubscribe anytime. We'll never share your address."
								})
							]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateStack, {})]
			})
		]
	});
}
/**
* A browsable deck of recent write-ups. The front card shows in full; the
* rest peek beneath as a tapering stack. Click the deck (or use the ←/→
* controls) to bring the next one forward with a smooth transition.
*/
function UpdateStack() {
	const [active, setActive] = (0, import_react.useState)(0);
	const n = UPDATES.length;
	const go = (delta) => setActive((a) => (a + delta + n) % n);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-md lg:mx-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[252px]",
			children: [UPDATES.map((u, i) => {
				const depth = (i - active + n) % n;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"aria-hidden": !(depth === 0),
					className: "absolute inset-x-0 top-0 flex h-[210px] flex-col rounded-sm border border-border bg-background/95 shadow-sm backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.25,1)]",
					style: {
						transform: `translateY(${depth * 18}px) scale(${1 - depth * .04})`,
						transformOrigin: "top center",
						opacity: depth === 0 ? 1 : depth === 1 ? .6 : .32,
						zIndex: n - depth,
						pointerEvents: "none"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: u.tag }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-foreground/60",
								children: u.date
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-hidden px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "line-clamp-2 font-display text-[16.5px] font-medium leading-[1.25] tracking-tight text-foreground",
								children: u.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground",
								children: u.excerpt
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[10.5px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 text-[var(--sig)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "∎"
								}), u.meta]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/55",
								children: "Boundless Intuition"
							})]
						})
					]
				}, u.date);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-hidden": true,
				tabIndex: -1,
				onClick: () => go(1),
				className: "absolute inset-0 z-20 cursor-pointer",
				style: { height: "210px" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
				children: [
					active + 1,
					" / ",
					n,
					" · recent updates"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go(-1),
					"aria-label": "Previous update",
					className: "grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground",
					children: "←"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go(1),
					"aria-label": "Next update",
					className: "grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground",
					children: "→"
				})]
			})]
		})]
	});
}
function SwissFlag({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		role: "img",
		"aria-label": "Switzerland",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "4",
				fill: "#D52B1E"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "13",
				y: "7",
				width: "6",
				height: "18",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "7",
				y: "13",
				width: "18",
				height: "6",
				fill: "#fff"
			})
		]
	});
}
var SECTION_LINKS = [
	["/#doctrine", "Doctrine"],
	["/#method", "Method"],
	["/#domains", "Domains"],
	["/#value", "Value"],
	["/#walkthrough", "Walkthrough"],
	["/#lab", "Lab"]
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waitlist, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 h-px w-full bg-border",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-7xl px-6 py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start justify-between gap-10 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "img",
							"aria-label": "Boundless Intuition",
							className: "inline-block size-7 bg-foreground",
							style: {
								WebkitMaskImage: "url(/boundless_int_logo_white.png)",
								maskImage: "url(/boundless_int_logo_white.png)",
								WebkitMaskSize: "contain",
								maskSize: "contain",
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
								WebkitMaskPosition: "center",
								maskPosition: "center"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-light",
								children: "Boundless"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Intuition"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-light",
								children: "Labs"
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-[14.5px] leading-relaxed text-muted-foreground",
						children: "The trust layer for artificial intelligence."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-x-14 gap-y-3 font-display text-[12px] font-medium text-muted-foreground sm:grid-cols-3",
						children: [
							SECTION_LINKS.map(([href, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href,
								className: "hover:text-foreground",
								children: label
							}, label)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/engage",
								className: "hover:text-foreground",
								children: "Engage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog",
								className: "hover:text-foreground",
								children: "Blog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://playground.boundlessintuition.com/",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-1 hover:text-foreground",
								children: ["Playground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "text-[10px]",
									children: "↗"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:research@boundlessintuition.com",
								className: "hover:text-foreground",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/legal",
								className: "hover:text-foreground",
								children: "Legal"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									role: "img",
									"aria-label": "CERN",
									className: "inline-block h-[18px] w-[18px] bg-foreground/70",
									style: {
										WebkitMaskImage: "url(/CERN_logo_badge.svg)",
										maskImage: "url(/CERN_logo_badge.svg)",
										WebkitMaskSize: "contain",
										maskSize: "contain",
										WebkitMaskRepeat: "no-repeat",
										maskRepeat: "no-repeat",
										WebkitMaskPosition: "center",
										maskPosition: "center"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwissFlag, { className: "h-[15px] w-[15px] rounded-[3px]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-3 w-px bg-border",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Boundless Intuition" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-foreground/70",
							children: "46.2330° N · 6.0557° E"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All results verifiable" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 select-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex translate-y-[26%] justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whitespace-nowrap font-display text-[19vw] font-light leading-none tracking-[-0.045em] text-foreground/[0.07]",
						children: "Boundless Intuition"
					})
				})
			})
		]
	});
}
//#endregion
export { TopBar as n, SiteFooter as t };
