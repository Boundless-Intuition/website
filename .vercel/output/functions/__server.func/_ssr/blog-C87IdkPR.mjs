import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BLOG_TAGS, r as formatBlogDate, t as BLOG_POSTS } from "./blog-CYul9FM9.mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-WfempdH_.mjs";
import { a as smoothstep, n as mix, o as tone, r as oklcha, s as useDomainCanvas, t as field } from "./useDomainCanvas-wwM0K-cd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-C87IdkPR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Blog engines — the masthead field for the blog index, drawn in the house
* visual system (see docs/visual-system.md): a coarse 1-bit halftone of
* hard-edged squares over a soft ultramarine field.
*
* The behaviour is *plume*. A dense stream of grains leaves a source just off
* the lower-right corner and travels up and to the left, widening and thinning
* as it goes, breaking out of its lattice into separate grains until nothing
* is left but a scatter over the headline. Emission, time, dispersal — and it
* empties toward the upper left on its own, which is the house rule and also
* exactly where the copy sits.
*
* The motion is filaments scrolling *downstream* through the stream rather
* than grains flying about: the halftone stays snapped to its lattice near the
* source, so it reads as flow rather than as sparks.
*
* Other rules kept: hard-edged squares (no anti-aliasing, no glow, no bloom),
* four colours only, scattered grains spiking to warm ochre-gold on their own
* timer like mica in sand, and a single short prism smear lying along one
* segment of the stream and nowhere else.
*
* The cursor is the lantern: grains near it warm toward gold and thicken.
*
* Allocation-light per frame — colours are quantized into a small ramp so
* fillStyle strings are built once per frame rather than once per grain, and
* cells outside the stream bail out before touching the noise field.
*/
/** brightness steps within one warmth tier */
var LEVELS = 5;
/** cold grain → ochre-gold, in four steps so warming reads as a fade */
var WARMTHS = 4;
/** unit vector the stream travels along: up and to the left, mostly lateral */
var DIR_X = -.945;
var DIR_Y = -.327;
/** its perpendicular, for measuring across the stream */
var PERP_X = .327;
var PERP_Y = -.945;
/**
* Prism dispersion, gold → rose → violet → blue, written as a monotonically
* falling sequence (negative angles are legal in CSS) so interpolating between
* stops never sweeps through green. The palette has no green in it anywhere.
*/
var PRISM_HUES = [
	82,
	52,
	24,
	2,
	-22,
	-46,
	-68,
	-88
];
/** length of the one smear, as a fraction of the stream's reach */
var PRISM_HALF = .05;
var PRISM_SPAN = 11;
/**
* One cheap stable hash per cell. The caller bit-slices the result for
* presence, jitter and glint phase so the inner loop only hashes once:
* bits 0-10 presence, 11-20 glint phase, 21-26 jitter x, 27-31 jitter y.
*/
function hash2(x, y) {
	let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
	h = Math.imul(h ^ h >>> 13, 1274126177);
	return (h ^ h >>> 16) >>> 0;
}
function halftonePlume(opts) {
	const cellBase = opts.cell ?? 9;
	const dotBase = opts.dot ?? 3;
	const speed = opts.speed ?? 1;
	const intensity = opts.intensity ?? 1;
	const density = opts.density ?? .72;
	const source = opts.source ?? {
		x: .9,
		y: 1.06
	};
	const reach = opts.reach ?? 1.15;
	const curve = opts.curve ?? .06;
	const spread = opts.spread ?? .09;
	const flare = opts.flare ?? .34;
	const washAlpha = opts.washAlpha ?? {
		light: .06,
		dark: .26
	};
	return () => {
		let W = 0;
		let H = 0;
		let cols = 0;
		let rows = 0;
		let cell = cellBase;
		let dot = dotBase;
		const ink = Array.from({ length: WARMTHS }, () => new Array(LEVELS).fill(""));
		const prism = new Array(PRISM_SPAN).fill("");
		return {
			resize(w, h) {
				W = w;
				H = h;
				cell = w < 640 ? cellBase + 3 : cellBase;
				dot = w < 640 ? dotBase + 1 : dotBase;
				cols = Math.ceil(w / cell) + 1;
				rows = Math.ceil(h / cell) + 1;
			},
			frame(ctx, env) {
				const { t, palette, pointer, still } = env;
				const tt = still ? 0 : t * speed;
				const sx = W * source.x;
				const sy = H * source.y;
				const reachPx = W * reach;
				const curvePx = W * curve;
				const washTone = tone(palette, opts.wash);
				const wa = (palette.isDark ? washAlpha.dark : washAlpha.light) * intensity;
				const g = ctx.createLinearGradient(sx, sy, sx + DIR_X * reachPx, sy + DIR_Y * reachPx);
				g.addColorStop(0, oklcha(washTone, wa));
				g.addColorStop(.45, oklcha(washTone, wa * .6));
				g.addColorStop(1, oklcha(washTone, 0));
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, W, H);
				const grainTone = tone(palette, opts.grain);
				const glintTone = tone(palette, opts.glint);
				for (let w = 0; w < WARMTHS; w++) {
					const c = mix(grainTone, glintTone, w / (WARMTHS - 1));
					for (let l = 0; l < LEVELS; l++) {
						const a = (.05 + l / (LEVELS - 1) * .27) * intensity;
						ink[w][l] = oklcha(c, a);
					}
				}
				const prismL = palette.isDark ? .78 : .5;
				for (let i = 0; i < PRISM_SPAN; i++) {
					const f = i / (PRISM_SPAN - 1) * (PRISM_HUES.length - 1);
					const i0 = Math.floor(f);
					const i1 = Math.min(PRISM_HUES.length - 1, i0 + 1);
					prism[i] = oklcha([
						prismL,
						.13,
						PRISM_HUES[i0] + (PRISM_HUES[i1] - PRISM_HUES[i0]) * (f - i0)
					], .34 * intensity);
				}
				const prismAt = .44 + Math.sin(tt * .07) * .035;
				const sway = Math.sin(tt * .13) * curvePx * .6;
				const px = pointer.x * W;
				const py = pointer.y * H;
				for (let ry = 0; ry < rows; ry++) {
					const y0 = ry * cell;
					const dy = y0 - sy;
					for (let cx = 0; cx < cols; cx++) {
						const x0 = cx * cell;
						const dx = x0 - sx;
						const s = dx * DIR_X + dy * DIR_Y;
						if (s < 0) continue;
						const u = s / reachPx;
						if (u > 1) continue;
						const n = dx * PERP_X + dy * PERP_Y - curvePx * u * u - sway * u;
						const lat = Math.abs(n) / (W * (spread + flare * u));
						if (lat > 1.15) continue;
						let d = density * (1 - smoothstep(.05, 1, u)) * (1 - smoothstep(.25, 1.05, lat));
						if (d <= .004) continue;
						const turb = field(s * .011 - tt * 1.15, n * .022, tt * .18);
						const gust = Math.sin(u * 6.5 - tt * .85);
						d *= (.34 + 1.22 * (.5 + .5 * turb)) * (.8 + .3 * gust);
						let lamp = 0;
						if (pointer.active) {
							lamp = smoothstep(180, 24, Math.hypot(x0 - px, y0 - py));
							d += lamp * .28;
						}
						const h = hash2(cx, ry);
						const presence = (h & 2047) / 2048;
						const loose = smoothstep(.06, .82, u);
						let seg = 0;
						if (loose > .02) {
							const ph = (hash2(ry, cx) & 1023) / 1024 + tt * .34;
							seg = ph - Math.floor(ph);
							d *= .32 + .68 * Math.sin(seg * Math.PI);
						}
						if (d <= presence) continue;
						let level = (d - presence) * 2.6 * LEVELS | 0;
						if (level > LEVELS - 1) level = LEVELS - 1;
						const phase = (h >>> 11 & 1023) / 1024 + tt * .055;
						const gf = phase - Math.floor(phase);
						const glint = gf > .97 ? Math.sin((gf - .97) / .03 * Math.PI) : 0;
						let warmth = (glint > lamp ? glint : lamp) * WARMTHS | 0;
						if (warmth > WARMTHS - 1) warmth = WARMTHS - 1;
						if (glint > .5 && level < LEVELS - 1) level += 1;
						let x = x0;
						let y = y0;
						if (loose > .02) {
							const jx = (h >>> 21 & 63) / 64 - .5;
							const jy = (h >>> 27 & 31) / 32 - .5;
							const amp = loose * cell * 1.15;
							const run = seg * cell * 3.4 * loose;
							x = Math.round(x0 + jx * amp + DIR_X * run);
							y = Math.round(y0 + jy * amp + DIR_Y * run);
						}
						const pd = u - prismAt;
						if (pd > -.05 && pd < PRISM_HALF && Math.abs(n) < cell * 1.6) {
							let pi = (pd + PRISM_HALF) / (PRISM_HALF * 2) * PRISM_SPAN | 0;
							if (pi > PRISM_SPAN - 1) pi = PRISM_SPAN - 1;
							ctx.fillStyle = prism[pi];
						} else ctx.fillStyle = ink[warmth][level];
						ctx.fillRect(x, y, dot, dot);
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
var heroMake = halftonePlume({
	grain: t([
		.44,
		.16,
		266
	], [
		.94,
		.018,
		92
	]),
	glint: t([
		.6,
		.14,
		74
	], [
		.85,
		.13,
		82
	]),
	wash: t([
		.42,
		.19,
		266
	], [
		.4,
		.21,
		266
	]),
	cell: 9,
	dot: 3,
	speed: .45,
	intensity: .62,
	density: .85,
	source: {
		x: 1.06,
		y: .86
	},
	reach: 1,
	curve: .07,
	spread: .09,
	flare: .34,
	washAlpha: {
		light: .06,
		dark: .26
	}
});
function BlogHeroBackdrop() {
	const { canvasRef, pointerTargetRef } = useDomainCanvas(heroMake);
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
