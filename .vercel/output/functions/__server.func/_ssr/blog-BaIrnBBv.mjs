import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BLOG_TAGS, r as formatBlogDate, t as BLOG_POSTS } from "./blog-CF6Txbv7.mjs";
import { n as SiteChrome, t as CHROME_PULL } from "./useDomainCanvas-B2gSGwZX.mjs";
import { t as SiteFooter } from "./SiteFooter-Czo5uKK6.mjs";
import { t as BlogHeroBackdrop } from "./BlogVisual-Dq-WQyV1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-BaIrnBBv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = ["All", ...BLOG_TAGS];
function BlogPage() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const posts = (0, import_react.useMemo)(() => filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tags.includes(filter)), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16 overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogHeroBackdrop, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none relative mx-auto max-w-shell px-6 lg:px-10 pt-24 pb-16 lg:pt-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Blog" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mb-6 max-w-[20ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem]",
							children: "Latest updates from Boundless Intuition Labs."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[58ch] text-[17px] leading-[1.6] text-foreground/85",
							children: "Benchmarks, verification results, and the failures we found along the way, published as we finish a report, not on a schedule."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-shell flex-wrap gap-2 px-6 lg:px-10 py-5",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(f),
					"aria-pressed": filter === f,
					className: `border px-4 py-1.5 font-display text-[12px] font-medium transition-colors ${filter === f ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"}`,
					children: f
				}, f))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-shell px-6 lg:px-10 py-16",
				children: posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "py-16 text-center text-[15px] text-muted-foreground",
					children: [
						"No posts under “",
						filter,
						"” yet."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border border-t border-border",
					children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog/$slug",
						params: { slug: post.slug },
						className: "group relative block overflow-hidden py-12",
						children: [post.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"aria-hidden": true,
							className: "absolute inset-0 overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: post.image,
									alt: "",
									loading: "lazy",
									className: "blog-cover-img h-full w-full object-cover opacity-40 saturate-[0.85] transition-[opacity,filter] duration-700 group-hover:opacity-60 group-hover:saturate-110 dark:opacity-35 dark:group-hover:opacity-55"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/70 to-transparent" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex flex-wrap items-center gap-x-3 gap-y-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px] sm:tracking-[0.18em]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex w-full flex-wrap gap-2.5 sm:w-auto sm:gap-3",
												children: post.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "border border-border px-2 py-0.5 text-foreground/70",
													children: tag
												}, tag))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBlogDate(post.date) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground/50",
												children: "·"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.readingTime })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-[24px] font-medium leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent md:text-[28px]",
										children: post.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground",
										children: post.description
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex shrink-0 items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80 [text-shadow:0_0_10px_var(--background),0_1px_16px_var(--background)] transition-colors group-hover:text-accent md:mr-6 md:self-auto",
								children: ["Read", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform duration-300 group-hover:translate-x-0.5",
									children: "→"
								})]
							})]
						})]
					}, post.slug))
				})
			})
		})
	] });
}
function BlogIndexRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteChrome, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: `flow-root ${CHROME_PULL}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogPage, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { BlogIndexRoute as component };
