import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as track$1, o as useSectionViews, r as TopBar, t as BOOKING_URL } from "./TopBar-CG-62kmp.mjs";
import { t as SiteFooter } from "./SiteFooter-D8FQLPjU.mjs";
import { a as smoothstep, i as rng, o as tone, r as oklcha, s as useDomainCanvas } from "./useDomainCanvas-CNinD-23.mjs";
import { t as PlateDrift } from "./PlateDrift-CxdTP5DY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CewVbtRk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
		className: "relative -mt-16 overflow-hidden lg:flex lg:min-h-[min(56.25vw,60rem)] lg:flex-col lg:justify-end",
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
				className: "relative mx-auto w-full max-w-shell grid gap-16 px-6 lg:px-10 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "@container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[12px]",
							children: "Verified Intelligence Infrastructure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mb-8 text-balance font-display text-[2.5rem] font-light leading-[1.08] tracking-[-0.03em] text-foreground md:text-[3rem] lg:text-[clamp(2.4rem,7.2cqw,3.3rem)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: "Foundational layer for"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: "Verified Intelligence"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-[52ch] text-[17px] leading-[1.6] text-foreground/85 lg:max-w-[40ch] lg:text-[20px] lg:leading-[1.7]",
							children: "The most fluent systems ever built still cannot tell you when they are wrong. Scaling intelligence without scaling trust is a dangerous trajectory."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center gap-3 font-display text-[13px] font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/blog/$slug",
								params: { slug: "towards-verified-superintelligence" },
								className: "group inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3.5 text-background transition-all hover:bg-foreground/90",
								children: ["Read the thesis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: BOOKING_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								onClick: () => track$1("booking_opened", { from: "hero" }),
								className: "group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-6 py-3.5 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10",
								children: ["Talk to the lab", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})]
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
/**
* Live halftone drawn onto a painted plate.
*
* The rule both engines follow: the painting is never taken apart. An earlier
* version dissolved a third of a plate into drifting grain, which read as an
* effect applied over the picture rather than as the picture — stone does not
* wander, and §7 is explicit that the water is mirror-flat and still. So each
* engine animates only what its plate already depicts moving, and nothing else.
*
* Both draw per §10's rules for the animated halftone: grains snap to a fixed
* 3px lattice, stay 2–3px hard squares, and a fraction spike warm on their own
* timer. Under prefers-reduced-motion `useDomainCanvas` draws a single still
* frame, which leaves a complete, motionless figure rather than an empty one.
*
* Positions are given in SOURCE-IMAGE coordinates and mapped through the same
* cover-fit crop used to draw the plate, so the drawn element stays locked to
* the painted one at every box aspect ratio. That mapping is what makes the
* animation belong to the image instead of floating over it.
*/
/** §10: grains snap to a fixed lattice so the halftone stays 1-bit, not soft. */
var LATTICE = 3;
var snap = (v) => Math.round(v / LATTICE) * LATTICE;
/**
* The crop `drawImage` uses to cover a box — and the basis for the mapping.
*
* `focus` anchors what survives the crop, 0..1 on each axis, centred by
* default. A 3:2 plate in a wide band loses a third of its height, and centring
* that loss takes the top off the subject; the anchor is how a plate keeps the
* thing it is a picture of.
*/
function coverFit(el, w, h, focusX = .5, focusY = .5) {
	const ia = el.naturalWidth / el.naturalHeight;
	const ba = w / h;
	if (ia > ba) {
		const sh = el.naturalHeight;
		const sw = sh * ba;
		return {
			sx: (el.naturalWidth - sw) * focusX,
			sy: 0,
			sw,
			sh
		};
	}
	const sw = el.naturalWidth;
	const sh = sw / ba;
	return {
		sx: 0,
		sy: (el.naturalHeight - sh) * focusY,
		sw,
		sh
	};
}
/**
* Water leaving stone: §4's Plume — "dense at its source, scattering into
* separate grains as it travels" — falling from a spout to the waterline and
* mirrored beneath it, since the plate paints a still surface and the fall owes
* it a reflection.
*/
function platePour(opts) {
	const spread = opts.spread ?? .012;
	const count = opts.count ?? 260;
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let img = null;
		let crop = {
			sx: 0,
			sy: 0,
			sw: 0,
			sh: 0
		};
		const r = rng(9137);
		const drops = [];
		for (let i = 0; i < count; i++) drops.push({
			p: r(),
			v: .22 + r() * .16,
			seed: r(),
			size: r() < .62 ? 2 : 3,
			glints: r() < .08
		});
		if (typeof Image !== "undefined") {
			const el = new Image();
			el.decoding = "async";
			el.onload = () => {
				img = el;
				if (W > 0) crop = coverFit(el, W, H);
			};
			el.src = opts.src;
		}
		return {
			resize(w, h) {
				W = w;
				H = h;
				if (img) crop = coverFit(img, w, h);
			},
			frame(ctx, env) {
				const { t, dt, w, h, palette, pointer, still } = env;
				const { sx, sy, sw, sh } = crop;
				if (img) ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
				if (!img || sw === 0) return;
				const iw = img.naturalWidth;
				const ih = img.naturalHeight;
				const toX = (nx) => (nx * iw - sx) / sw * w;
				const toY = (ny) => (ny * ih - sy) / sh * h;
				const grain = tone(palette, opts.grain);
				const warm = tone(palette, opts.glint);
				const fall = opts.waterline - opts.source.y;
				const lantern = pointer.active && !still;
				const lx = pointer.x * w;
				const ly = pointer.y * h;
				const REACH = Math.min(w, h) * .42;
				const draught = lantern ? (pointer.x - .5) * .014 : 0;
				for (let pass = 0; pass < 2; pass++) {
					ctx.fillStyle = pass === 0 ? oklcha(grain, .85) : oklcha(warm, .95);
					for (let i = 0; i < drops.length; i++) {
						const d = drops[i];
						if (pass === 0) {
							if (!still) {
								d.p += d.v * speed * dt;
								if (d.p > 1) d.p -= 1;
							}
						} else if (!d.glints) continue;
						const p = d.p;
						const fan = spread * p * p;
						const wob = Math.sin(d.seed * 6.283 + p * 4.1) * fan;
						const nx = opts.source.x + wob + draught * p * p;
						const ny = opts.source.y + fall * p;
						const a = smoothstep(0, .05, p) * (1 - smoothstep(.86, 1, p));
						if (a <= .02) continue;
						if (pass === 1) {
							if (Math.sin(t * 2.1 + d.seed * 19.7) < .9) continue;
						}
						const x = snap(toX(nx));
						const y = snap(toY(ny));
						const s = d.size;
						ctx.globalAlpha = pass === 0 ? a : a * .9;
						ctx.fillRect(x, y, s, s);
						const ry = toY(2 * opts.waterline - ny);
						if (ry < h) {
							ctx.globalAlpha = a * .26;
							ctx.fillRect(x, snap(ry), s, s);
						}
					}
				}
				if (lantern) {
					ctx.fillStyle = oklcha(warm, 1);
					for (let i = 0; i < drops.length; i++) {
						const d = drops[i];
						const p = d.p;
						const fan = spread * p * p;
						const wob = Math.sin(d.seed * 6.283 + p * 4.1) * fan;
						const x = snap(toX(opts.source.x + wob + draught * p * p));
						const y = snap(toY(opts.source.y + fall * p));
						const near = 1 - Math.hypot(x - lx, y - ly) / REACH;
						if (near <= .02) continue;
						const a = smoothstep(0, .05, p) * (1 - smoothstep(.86, 1, p));
						if (a <= .02) continue;
						ctx.globalAlpha = a * near * near * .95;
						ctx.fillRect(x, y, d.size, d.size);
					}
				}
				ctx.globalAlpha = 1;
			}
		};
	};
}
/**
* Emission drawn *over* a plate that something else is rendering.
*
* Unlike the engine above, this never draws the picture — the lab plate is a
* CSS `object-cover` image so that it can drift and parallax, and this only
* lays grain on top of it. It therefore has to reproduce that crop rather than
* own it: given the plate's natural aspect and its `object-position`, the same
* mapping falls out. Feed it the wrong aspect or focus and the emission stops
* lining up with the instrument it is supposed to be leaving.
*
* Grain is born at the instrument's own edge and travels straight out, in
* periodic wavefronts — §4's Rings, "spreading outward and thinning", carried
* by a Plume's worth of individual grains rather than drawn as arcs. A stream
* that began somewhere out in open sky read as arriving from nowhere; this
* leaves the sphere, which is the only place on this plate anything could.
*
* The cursor sets the ink: ivory in the open field, struck to lantern ochre
* where it is held, decided per grain so the boundary is dithered.
*/
function plateEmission(opts) {
	const bands = opts.bands ?? 4;
	const count = opts.count ?? 300;
	const speed = opts.speed ?? 1;
	const intensity = opts.intensity ?? 1;
	const focusX = opts.focus?.x ?? .5;
	const focusY = opts.focus?.y ?? .5;
	const a0 = opts.arc.from * Math.PI / 180;
	const a1 = opts.arc.to * Math.PI / 180;
	return () => {
		const r = rng(7331);
		const motes = [];
		for (let i = 0; i < count; i++) motes.push({
			ang: a0 + (a1 - a0) * r(),
			band: i % bands,
			jitter: (r() - .5) * .11,
			seed: r(),
			size: r() < .74 ? 2 : 3
		});
		return {
			resize() {},
			frame(ctx, env) {
				const { t, w, h, palette, pointer, still } = env;
				if (w === 0 || h === 0) return;
				const ia = opts.sourceAspect;
				const ba = w / h;
				let toX;
				let toY;
				if (ia > ba) {
					const vis = ba / ia;
					const off = (1 - vis) * focusX;
					toX = (n) => (n - off) / vis * w;
					toY = (n) => n * h;
				} else {
					const vis = ia / ba;
					const off = (1 - vis) * focusY;
					toX = (n) => n * w;
					toY = (n) => (n - off) / vis * h;
				}
				const pale = tone(palette, opts.grain);
				const warm = tone(palette, opts.glint);
				const lit = pointer.active && !still;
				const lx = pointer.x * w;
				const ly = pointer.y * h;
				const REACH = Math.min(w, h) * .38;
				const yk = ia;
				const span = opts.reach - opts.inner;
				const clock = still ? .42 : t * .09 * speed;
				for (let i = 0; i < motes.length; i++) {
					const m = motes[i];
					let p = (clock + m.band / bands + m.jitter) % 1;
					if (p < 0) p += 1;
					const rad = opts.inner + span * p;
					const ang = m.ang + Math.sin(m.seed * 6.283) * .09 * p;
					const nx = opts.origin.x + Math.cos(ang) * rad;
					const ny = opts.origin.y + Math.sin(ang) * rad * yk;
					const px = toX(nx);
					const py = toY(ny);
					if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue;
					const lip = smoothstep(a0, a0 + .3, ang) * (1 - smoothstep(a1 - .3, a1, ang));
					const a = smoothstep(0, .06, p) * (1 - smoothstep(.45, 1, p)) * lip * intensity;
					if (a <= .02) continue;
					const near = lit ? Math.max(0, 1 - Math.hypot(px - lx, py - ly) / REACH) : 0;
					ctx.fillStyle = near > .28 ? oklcha(warm, .95) : oklcha(pale, .88);
					ctx.globalAlpha = a * (1 + near * near * .9);
					ctx.fillRect(snap(px), snap(py), m.size, m.size);
				}
				ctx.globalAlpha = 1;
			}
		};
	};
}
var t = (light, dark) => ({
	light,
	dark
});
var GRAIN = t([
	.44,
	.16,
	266
], [
	.94,
	.018,
	92
]);
var GLINT = t([
	.6,
	.14,
	74
], [
	.85,
	.13,
	82
]);
var pourMake = platePour({
	src: "/plates/aqueduct-procession.webp",
	grain: GRAIN,
	glint: GLINT,
	source: {
		x: .512,
		y: .262
	},
	waterline: .585,
	spread: .012,
	count: 260,
	speed: 1
});
var labPlumeMake = plateEmission({
	sourceAspect: 1536 / 1024,
	focus: {
		x: .5,
		y: .34
	},
	grain: GRAIN,
	glint: GLINT,
	origin: {
		x: .69,
		y: .32
	},
	inner: .205,
	reach: .66,
	arc: {
		from: 156,
		to: 292
	},
	bands: 4,
	count: 300,
	speed: 1,
	intensity: .85
});
/** The aqueduct, with its own falling water drawn live — see platePour. */
function PlatePourVisual({ pointerTarget }) {
	const { canvasRef, pointerTargetRef } = useDomainCanvas(pourMake, pointerTarget);
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
/**
* The emission over the lab plate — see plateEmission. Pointer-transparent,
* because the plate beneath it drifts on the same section's pointer and the
* copy above it has links; this layer only draws.
*/
function LabPlumeOverlay({ pointerTarget }) {
	const { canvasRef } = useDomainCanvas(labPlumeMake, pointerTarget);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full"
		})
	});
}
/**
* The thesis band between the hero and the lab.
*
* Full-bleed rather than a figure in a box: the statement is the lab's position
* on what the work is for, and a hairline frame around it would read as an
* exhibit. The plate runs edge to edge and dissolves into the page at the top
* and bottom, so the band has no seam — it is a stretch of the page that
* happens to be painted.
*
* The plate is an aqueduct that stops mid-air, with a procession walking the
* top toward the unbuilt end behind a single lantern, and measured water
* falling from the broken edge. Infrastructure meant to outlast the people who
* laid it, caught unfinished — which is the copy's "the future we are building
* toward" without illustrating the words.
*
* The painting is left whole. The only live element is the water itself, drawn
* as a halftone plume falling from the spout and mirrored under the surface —
* the plate's own motion continued rather than an effect laid over it. The
* arcade runs in from the right and the rest is open water, which is where the
* statement goes.
*/
function ThesisBand() {
	const bandRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: bandRef,
		className: "relative overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatePourVisual, { pointerTarget: bandRef }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-shell px-6 lg:px-10 py-20 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[30ch] lg:max-w-[44ch]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "What we believe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 font-display text-[1.2rem] font-light leading-[1.55] tracking-[-0.01em] text-foreground/90 lg:text-[1.5rem]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We believe a world where advanced AI is safe to deploy is a world where consequential decisions can be verified before they are trusted. It is a world where correctness matters as much as capability, and where trust is earned through evidence rather than confidence." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That is the future we are building toward. It is the foundation of trustworthy AI, and the path towards verified superintelligence." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/overview",
							className: "group mt-10 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground",
							children: ["See our benchmarks", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						})
					]
				})
			})
		]
	});
}
/**
* The lab.
*
* Immersive, on the same pattern as the thesis band: one plate edge to edge,
* copy over the open side of it, no frame and no seam. An earlier version split
* the band in two and ended the picture partway across, which put a hard
* vertical edge down the middle of the section however the edge was drawn —
* a plate that stops inside the viewport always reads as a panel.
*
* The copy is deliberately short: no founding dates, no coordinates. The plate
* carries what a lab is — three people calibrating an instrument together, one
* polishing the graduated ring, one adjusting a theodolite, one steadying the
* sphere — so the words only have to say who and where.
*
* Two live elements. The plate itself drifts on a very slow cycle and leans
* away from the cursor; over it, grain leaves the sphere's own edge in slow
* wavefronts and spends itself across the open sky. It emits from the
* instrument because that is the only place on this plate anything could —
* a stream starting out in open sky read as arriving from nowhere.
*
* The cursor sets the plume's ink: ivory in the open field, struck to lantern
* ochre where it is held.
*/
function Origin() {
	const bandRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "lab",
		ref: bandRef,
		className: "relative overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlateDrift, {
				src: "/plates/armillary-sphere-polishing.webp",
				focus: "50% 34%",
				pointerTarget: bandRef
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabPlumeOverlay, { pointerTarget: bandRef }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent lg:h-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-shell px-6 lg:px-10 py-20 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[30ch] lg:max-w-[42ch]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "The lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-8 max-w-[16ch] font-display text-[2.2rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground md:text-[2.7rem]",
							children: "Built at the edge of what's verifiable."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[17px] leading-[1.7] text-foreground/85 lg:text-[18px]",
							children: "We are a team of researchers and engineers, working out of Geneva. We come from CERN, where a system is not finished until it has been proved correct, and we build the tools that hold AI to that same standard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:research@boundlessintuition.com",
							onClick: () => track$1("contact_mailto", { from: "lab" }),
							className: "group mt-10 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground",
							children: ["research@boundlessintuition.com", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						})
					]
				})
			})
		]
	});
}
function Index() {
	useSectionViews();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThesisBand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Origin, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Index as component };
