import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as BrandMark } from "./BrandMark-BgoQf2Gt.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as track$1, n as SECTIONS$1, t as BOOKING_URL } from "./TopBar-6m-7F0SY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-Czo5uKK6.js
var import_jsx_runtime = require_jsx_runtime();
/**
* The Swiss flag, in its own red. It is a national mark rather than a piece of
* the palette, so it keeps the colour it actually is.
*/
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
/**
* Social marks, drawn as single filled paths in `currentColor` so they take the
* theme and sit at the same ink as the CERN badge beside them. Official glyphs,
* not redrawn ones — a house-styled LinkedIn mark is just a wrong LinkedIn mark.
*/
var SOCIALS = [{
	label: "LinkedIn",
	href: "https://www.linkedin.com/company/boundless-intuition/",
	path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"
}, {
	label: "X",
	href: "https://x.com/bi_labs",
	path: "M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
}];
var PAGE_LINKS = SECTIONS$1.map((s) => ({
	href: `/#${s.id}`,
	label: s.label,
	external: false
}));
/**
* Site footer.
*
* Built on the same grammar as the rest of the site: mono labels in small caps,
* hairline rules, and a readout row that states facts rather than decorating
* them. The link lists carry mono column headings for the same reason the lab
* section has an eyebrow — a label tells you what a group of things is, and it
* costs one line to say.
*/
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/plates/twin-gazebos-comet.webp",
						alt: "",
						className: "plate-drift h-full w-full object-cover object-[50%_62%] opacity-[0.5]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/75" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-shell px-6 lg:px-10 py-16 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 md:grid-cols-[1.4fr_1fr] lg:gap-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-[34ch] text-[14.5px] leading-relaxed text-muted-foreground",
							children: "Foundational Infrastructure for Verified Intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:research@boundlessintuition.com",
							onClick: () => track$1("contact_mailto", { from: "footer" }),
							className: "group mt-7 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground",
							children: ["research@boundlessintuition.com", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-x-10 gap-y-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70",
							children: "Site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2.5 font-display text-[13px] font-medium text-muted-foreground",
							children: [PAGE_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: l.href,
								className: "transition-colors hover:text-foreground",
								children: l.label
							}) }, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: BOOKING_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								onClick: () => track$1("booking_opened", { from: "footer" }),
								className: "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
								children: ["Talk to the lab", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "text-[10px]",
									children: "↗"
								})]
							}) })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70",
							children: "Elsewhere"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2.5 font-display text-[13px] font-medium text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog",
									className: "transition-colors hover:text-foreground",
									children: "Blog"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://playground.boundlessintuition.com/",
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: () => track$1("outbound_playground", { from: "footer" }),
									className: "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
									children: ["Playground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "text-[10px]",
										children: "↗"
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/legal",
									className: "transition-colors hover:text-foreground",
									children: "Legal"
								}) })
							]
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 flex flex-col items-start justify-between gap-5 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								role: "img",
								"aria-label": "CERN",
								className: "inline-block h-[18px] w-[18px] bg-foreground/60",
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-5",
						children: SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": s.label,
							onClick: () => track$1("outbound_social", {
								network: s.label,
								from: "footer"
							}),
							className: "text-foreground/60 transition-colors hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 24 24",
								className: "size-[15px]",
								fill: "currentColor",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: s.path })
							})
						}, s.label))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 select-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex translate-y-[30%] justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "halftone-type whitespace-nowrap font-display text-[19vw] font-light leading-none tracking-[-0.045em]",
						children: "Boundless Intuition"
					})
				})
			})
		]
	});
}
//#endregion
export { SiteFooter as t };
