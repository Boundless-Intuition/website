import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as TopBar } from "./TopBar-BFwy14zD.mjs";
import { t as SiteFooter } from "./SiteFooter-lXpN5stu.mjs";
import { t as PlateDrift } from "./PlateDrift--xvGAf8G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-BwKALS_v.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		n: "01",
		id: "terms",
		title: "Terms of use",
		body: "This website is provided for informational purposes. Nothing on it constitutes a binding offer, warranty, or professional advice. Verification engagements are governed exclusively by a separate written agreement executed between Boundless Intuition and the client."
	},
	{
		n: "02",
		id: "claims",
		title: "Verification claims",
		body: "Formal proofs establish that a system conforms to the rules as formalized. The correctness of any guarantee is bounded by the fidelity of that formalization to the client's intent. We scope and document these assumptions explicitly in every engagement."
	},
	{
		n: "03",
		id: "privacy",
		title: "Privacy",
		body: "We collect what you send us directly. For example, when you email us, or when you book a call through our scheduling provider, which handles that booking under its own privacy terms. We do not sell personal data. Materials you share for a verification engagement are treated as confidential under the terms of that engagement."
	},
	{
		n: "04",
		id: "measurement",
		title: "What this site measures",
		body: "Anonymous, aggregate usage only: which pages are read, roughly where visitors come from, and which site referred them. No advertising, no cross-site tracking, no session recording, and nothing that identifies you personally. One functional cookie, bi_seen, so the same browser is not reported to us twice. Measurement is by Vercel; any standard tracker blocker stops all of it."
	},
	{
		n: "05",
		id: "ip",
		title: "Intellectual property",
		body: "The content, marks, and design of this site are the property of Boundless Intuition. Formal artifacts produced during an engagement are owned as set out in the applicable agreement."
	},
	{
		n: "06",
		id: "contact",
		title: "Contact",
		body: "Questions about these terms can be directed to research@boundlessintuition.com. This notice may be updated from time to time; the version published here is the current one."
	}
];
function LegalRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative -mt-16 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlateDrift, {
						src: "/plates/monochord-scales.webp",
						focus: "50% 55%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/60"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-shell px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
								children: "Legal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mb-8 max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.04] tracking-[-0.03em] text-foreground md:text-[3.2rem]",
								children: "Terms & privacy."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-[52ch] text-[17px] leading-[1.7] text-foreground/85 lg:text-[18px]",
								children: "Plain terms for a lab that values precision. Nothing here replaces the written agreement that governs an engagement. It exists so you know where you stand before we ever talk."
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-shell px-6 lg:px-10 py-20 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border",
						children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							id: s.id,
							className: "grid scroll-mt-24 gap-4 border-b border-border py-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] tracking-[0.14em] text-muted-foreground/70",
									children: s.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-[18px] font-medium tracking-tight text-foreground",
									children: s.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[16px] leading-[1.8] text-muted-foreground",
								children: s.body
							})]
						}, s.n))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: "Last updated · 2026 · Geneva"
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { LegalRoute as component };
