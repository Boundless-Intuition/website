import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatBlogDate, n as BLOG_TAGS, t as BLOG_POSTS } from "./blog-CKUsRWAJ.mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-C2SUD4Kr.mjs";
import { a as smoothstep, n as mix, o as tone, r as oklcha, s as useDomainCanvas, t as field } from "./useDomainCanvas-BjzCv2zR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-D_4L3HV2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Blog engines — the hero backdrop for the blog index. A flowing scalar
* field rendered as coarse pixel blocks through an ordered Bayer dither:
* retro-compute waves that breathe and drift. Mouse-reactive (the cursor is
* a gravity well that bends and brightens the field around itself) and
* allocation-light per frame — colors are quantized to a small ramp so
* fillStyle strings are built once per frame, not once per cell.
*/
var BAYER = [
	[
		0,
		32,
		8,
		40,
		2,
		34,
		10,
		42
	],
	[
		48,
		16,
		56,
		24,
		50,
		18,
		58,
		26
	],
	[
		12,
		44,
		4,
		36,
		14,
		46,
		6,
		38
	],
	[
		60,
		28,
		52,
		20,
		62,
		30,
		54,
		22
	],
	[
		3,
		35,
		11,
		43,
		1,
		33,
		9,
		41
	],
	[
		51,
		19,
		59,
		27,
		49,
		17,
		57,
		25
	],
	[
		15,
		47,
		7,
		39,
		13,
		45,
		5,
		37
	],
	[
		63,
		31,
		55,
		23,
		61,
		29,
		53,
		21
	]
].map((row) => row.map((v) => (v + .5) / 64));
function ditherField(opts) {
	const cell = opts.cell ?? 11;
	const speed = opts.speed ?? 1;
	const LEVELS = 8;
	return () => {
		let W = 0;
		let H = 0;
		let cols = 0;
		let rows = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
				cols = Math.ceil(w / cell);
				rows = Math.ceil(h / cell);
			},
			frame(ctx, env) {
				const { t, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const hot = tone(palette, opts.hot);
				const low = mix(palette.dim, base, .55);
				const ramp = [];
				for (let i = 0; i < LEVELS; i++) {
					const k = i / (LEVELS - 1);
					ramp.push(oklcha(mix(low, hot, k * k), .2 + k * .62 + (hover ? .06 : 0)));
				}
				const px = pointer.x * W;
				const py = pointer.y * H;
				const tt = still ? 0 : t * speed;
				for (let ry = 0; ry < rows; ry++) {
					const y = ry * cell;
					const fy0 = ry * .21 - tt * .04;
					const thRow = BAYER[ry & 7];
					for (let cx = 0; cx < cols; cx++) {
						const x = cx * cell;
						let fx = cx * .13 + tt * .11;
						let fy = fy0;
						let g = 0;
						if (pointer.active) {
							const dx = x + cell / 2 - px;
							const dy = y + cell / 2 - py;
							const d = Math.hypot(dx, dy) + 1e-4;
							g = smoothstep(190, 10, d);
							fx += dx / d * g * 1.35;
							fy += dy / d * g * 1.35;
						}
						let v = .5 + .5 * field(fx, fy, tt * .5) + .24 * field(fx * 2.3 + 5, fy * 2.1 - 3, tt * .85);
						v = v * .78 + g * .5;
						if (v <= thRow[cx & 7]) continue;
						ctx.fillStyle = ramp[Math.min(LEVELS - 1, Math.max(0, v * LEVELS | 0))];
						ctx.fillRect(x, y, cell - 1, cell - 1);
					}
				}
			}
		};
	};
}
var t = (light, dark) => ({
	light,
	dark
});
var SKY = t([
	.58,
	.15,
	174
], [
	.86,
	.14,
	172
]);
var heroMake = ditherField({
	tint: t([
		.53,
		.13,
		168
	], [
		.8,
		.13,
		168
	]),
	hot: SKY,
	cell: 11,
	speed: .6
});
function BlogHeroBackdrop() {
	const { canvasRef, pointerTargetRef } = useDomainCanvas(heroMake);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: pointerTargetRef,
		className: "pointer-events-auto absolute inset-0 overflow-hidden opacity-40",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full"
		})
	});
}
var FILTERS = ["All", ...BLOG_TAGS];
function BlogPage() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const posts = (0, import_react.useMemo)(() => filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tag === filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16 overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogHeroBackdrop, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none relative mx-auto max-w-7xl px-6 pt-24 pb-16 lg:pt-32",
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
							children: "Benchmarks, verification results, and the failures we found along the way - published as we finish a report, not on a schedule."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-5",
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
				className: "mx-auto max-w-7xl px-6 py-16",
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
										className: "mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "border border-border px-2 py-0.5 text-foreground/70",
												children: post.tag
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogPage, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { BlogIndexRoute as component };
