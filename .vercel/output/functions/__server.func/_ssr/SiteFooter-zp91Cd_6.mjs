import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-zp91Cd_6.js
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
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: `sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ${open ? "bg-background/85 backdrop-blur-md" : "bg-gradient-to-b from-background/55 via-background/15 to-transparent backdrop-blur-[2px]"}`,
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
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden gap-8 font-display text-[12px] font-medium text-muted-foreground md:flex",
					children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						className: "transition-colors hover:text-foreground",
						children: s.label
					}, s.label))
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
					children: [SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						onClick: () => setOpen(false),
						className: "py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
						children: s.label
					}, s.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/engage",
						onClick: () => setOpen(false),
						className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground",
						children: ["Engage", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "text-muted-foreground",
							children: "→"
						})]
					})]
				})
			})
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
				className: "pointer-events-none absolute inset-x-0 bottom-0 h-[62%] select-none blueprint-grid-fine [mask-image:linear-gradient(to_top,black_55%,transparent)]"
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
