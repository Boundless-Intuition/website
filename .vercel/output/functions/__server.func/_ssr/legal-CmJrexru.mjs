import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-BGrJXls8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-CmJrexru.js
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		n: "01",
		title: "Terms of use",
		body: "This website is provided for informational purposes. Nothing on it constitutes a binding offer, warranty, or professional advice. Verification engagements are governed exclusively by a separate written agreement executed between Boundless Intuition and the client."
	},
	{
		n: "02",
		title: "Verification claims",
		body: "Formal proofs establish that a system conforms to the rules as formalized. The correctness of any guarantee is bounded by the fidelity of that formalization to the client's intent. We scope and document these assumptions explicitly in every engagement."
	},
	{
		n: "03",
		title: "Privacy",
		body: "We collect only the information you send us directly - for example, when you submit an inquiry through the Engage page, which opens your own email client. We do not sell personal data. Materials you share for a verification engagement are treated as confidential under the terms of that engagement."
	},
	{
		n: "04",
		title: "Intellectual property",
		body: "The content, marks, and design of this site are the property of Boundless Intuition. Formal artifacts produced during an engagement are owned as set out in the applicable agreement."
	},
	{
		n: "05",
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
				className: "relative -mt-16 overflow-hidden border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "blueprint-grid absolute inset-0 opacity-100",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ VIII"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Legal" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mb-8 max-w-[18ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem]",
							children: "Terms & privacy."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[58ch] text-[17px] leading-[1.6] text-foreground/85",
							children: "Plain terms for a lab that values precision. Nothing here replaces the written agreement that governs an engagement - it exists so you know where you stand before we ever talk."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2",
						children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col gap-4 bg-background p-8 lg:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] tracking-[0.14em] text-foreground/50",
									children: s.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-[20px] font-medium tracking-tight text-foreground",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[14.5px] leading-relaxed text-muted-foreground",
									children: s.body
								})
							]
						}, s.n))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
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
