import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as track$1, r as TopBar } from "./TopBar-CWfn6P43.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useDomainCanvas-M9puoThv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* The one announcement strip. Rendered by SiteChrome, which pins it above the
* top bar; see that file for the height arithmetic every page keys off.
*
* One line of type and an arrow, and nothing else — no rule, no chip, no
* accent, and no fill beyond the fall from page black to nothing. The plate
* runs up behind it, so it reads as part of the screen rather than a band
* bolted above it.
*
* Sentence-case mono rather than the wide uppercase the rest of the chrome
* uses: at this length the tracked caps run past half the viewport and stop
* scanning as a single line.
*
* Curated, not derived from BLOG_POSTS: the newest post is not automatically
* the one worth stopping a visitor for. To retire the strip, drop it from
* `SiteChrome`; to repoint it, edit the three constants below.
*/
var SLUG = "dirac-perfect-score-imo-2026";
var HEADLINE = "Boundless Intuition’s prover Dirac proves 6/6 on IMO 2026 at record speed";
var HEADLINE_SHORT = "Dirac proves 6/6 on IMO 2026";
/** Feeds CHROME_HEIGHT in SiteChrome — change the two together. */
var ANNOUNCEMENT_HEIGHT = "h-10";
function AnnouncementBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/blog/$slug",
		params: { slug: SLUG },
		onClick: () => track$1("announcement_clicked", { slug: SLUG }),
		"aria-label": `${HEADLINE} — read the result`,
		className: "group relative z-50 block bg-gradient-to-b from-background/85 via-background/55 to-transparent",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: `mx-auto flex ${ANNOUNCEMENT_HEIGHT} max-w-shell items-center justify-center gap-2 px-6 md:hidden`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11.5px] text-foreground/75",
				children: HEADLINE_SHORT
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-foreground/50 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-foreground/80",
				children: "→"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: `mx-auto hidden ${ANNOUNCEMENT_HEIGHT} max-w-shell items-center justify-center gap-2.5 px-6 md:flex lg:px-10`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[13px] text-foreground/75 transition-colors group-hover:text-foreground",
				children: HEADLINE
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[12px] text-foreground/50 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-foreground/80",
				children: "→"
			})]
		})]
	});
}
/**
* The page chrome: the announcement strip with the top bar under it. Pages that
* want the strip render this instead of a bare <TopBar />, which is also the one
* place to add or retire it across every route at once.
*
* The strip is *not* pinned. It sits in the flow at the top of the page and
* scrolls away for good; only the top bar sticks, exactly as it did before the
* strip existed. So nothing that sticks below the chrome needs re-keying — the
* blog's filter bar and the post table of contents still offset against the
* bar's own 4rem.
*
* What the page does owe the strip is CHROME_PULL. The strip is transparent, so
* it only reads as part of the screen if the plate behind it is the screen: a
* page whose first section already carries the site's `-mt-16` (pulling it under
* the transparent bar) additionally pulls its <main> up by the strip's 40px, and
* the art then starts at the very top of the viewport.
*
* That pull goes on <main> together with `flow-root`, and the pairing is
* load-bearing: without a block formatting context, <main>'s top margin
* collapses with its first child's into the single most-negative of the two, and
* only one of the two pulls survives.
*/
var CHROME_PULL = "-mt-10";
function SiteChrome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {})] });
}
var LIGHT = {
	isDark: false,
	bg: [
		.965,
		.008,
		90
	],
	ink: [
		.2,
		.03,
		250
	],
	dim: [
		.36,
		.025,
		250
	],
	accent: [
		.52,
		.13,
		74
	]
};
var DARK = {
	isDark: true,
	bg: [
		.19,
		.015,
		250
	],
	ink: [
		.94,
		.012,
		90
	],
	dim: [
		.72,
		.02,
		90
	],
	accent: [
		.82,
		.13,
		82
	]
};
function readPalette() {
	if (typeof document === "undefined") return LIGHT;
	return document.documentElement.classList.contains("dark") ? DARK : LIGHT;
}
/** Build an `oklch(L C H / a)` string, clamping alpha. */
function oklcha([l, c, h], a = 1) {
	return `oklch(${l} ${c} ${h} / ${a < 0 ? 0 : a > 1 ? 1 : a})`;
}
/** Mix two OKLCH colors by t in [0,1] (naive per-channel; fine for accents). */
function mix(a, b, t) {
	const k = t < 0 ? 0 : t > 1 ? 1 : t;
	return [
		a[0] + (b[0] - a[0]) * k,
		a[1] + (b[1] - a[1]) * k,
		a[2] + (b[2] - a[2]) * k
	];
}
function tone(p, t) {
	return p.isDark ? t.dark : t.light;
}
/** mulberry32 — tiny deterministic PRNG for stable, non-jittery layouts. */
function rng(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
/** Smooth 0..1 ramp. */
function smoothstep(edge0, edge1, x) {
	const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
}
/**
* Cheap, deterministic value-noise-ish scalar field built from layered sines.
* Not true Perlin, but smooth, seamless enough, and allocation-free — ideal
* for driving ASCII intensity and flow directions across many canvases.
*/
function field(x, y, t) {
	return (Math.sin(x * 1.7 + t * .7) * Math.cos(y * 1.3 - t * .5) + Math.sin((x + y) * .9 - t * .9) + Math.sin(x * .4 - y * 1.1 + t * .35) * .8) / 2.8;
}
/**
* Drives a single <canvas> from an Engine factory.
*
* Responsibilities kept out of the engines:
*  - HiDPI: sizes the backing store to devicePixelRatio (capped at 2) and
*    scales the 2D context so engines draw in CSS pixels.
*  - ResizeObserver: re-measures on layout changes.
*  - IntersectionObserver: only runs the rAF loop while on (or near) screen —
*    essential when eight of these live on one page.
*  - visibilitychange: pauses in background tabs.
*  - prefers-reduced-motion: draws exactly one still frame, no loop.
*  - pointer tracking on an external target (the card), normalized to 0..1.
*
* The returned refs are attached by the component: `canvasRef` to the <canvas>
* and `pointerTargetRef` to the element whose hover/pointer should drive the
* animation (usually the whole card).
*/
function useDomainCanvas(makeEngine, externalTarget) {
	const canvasRef = (0, import_react.useRef)(null);
	const pointerTargetRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || typeof window === "undefined") return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		const engine = makeEngine();
		const pointer = {
			x: .5,
			y: .5,
			active: false
		};
		let hover = false;
		let w = 0;
		let h = 0;
		let dpr = 1;
		const measure = () => {
			const rect = canvas.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) return;
			const cap = window.innerWidth < 640 ? 1.5 : 2;
			dpr = Math.min(cap, window.devicePixelRatio || 1);
			w = Math.round(rect.width);
			h = Math.round(rect.height);
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			engine.resize(w, h);
		};
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		const drawStill = () => {
			if (w === 0) measure();
			if (w === 0) return;
			ctx.clearRect(0, 0, w, h);
			engine.frame(ctx, {
				w,
				h,
				t: 0,
				dt: 0,
				pointer: {
					x: .5,
					y: .5,
					active: false
				},
				palette: readPalette(),
				hover: false,
				still: true
			});
		};
		let raf = 0;
		let start = 0;
		let last = 0;
		let onScreen = false;
		let running = false;
		const tick = (now) => {
			if (!running) return;
			if (start === 0) {
				start = now;
				last = now;
			}
			const t = (now - start) / 1e3;
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			const env = {
				w,
				h,
				t,
				dt,
				pointer,
				palette: readPalette(),
				hover,
				still: false
			};
			ctx.clearRect(0, 0, w, h);
			engine.frame(ctx, env);
			raf = window.requestAnimationFrame(tick);
		};
		const play = () => {
			if (running || reduce.matches) return;
			if (!onScreen || document.hidden) return;
			if (w === 0) measure();
			if (w === 0) return;
			running = true;
			start = 0;
			last = 0;
			raf = window.requestAnimationFrame(tick);
		};
		const pause = () => {
			running = false;
			if (raf) window.cancelAnimationFrame(raf);
			raf = 0;
		};
		const ro = new ResizeObserver(() => {
			measure();
			if (reduce.matches) drawStill();
		});
		ro.observe(canvas);
		const io = new IntersectionObserver((entries) => {
			onScreen = entries[0]?.isIntersecting ?? false;
			if (onScreen) if (reduce.matches) drawStill();
			else play();
			else pause();
		}, { rootMargin: "120px" });
		io.observe(canvas);
		const onVisibility = () => {
			if (document.hidden) pause();
			else play();
		};
		document.addEventListener("visibilitychange", onVisibility);
		const target = externalTarget?.current ?? pointerTargetRef.current ?? canvas;
		const onMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			pointer.x = (e.clientX - rect.left) / Math.max(1, rect.width);
			pointer.y = (e.clientY - rect.top) / Math.max(1, rect.height);
			pointer.active = true;
		};
		const onEnter = () => {
			hover = true;
		};
		const onLeave = () => {
			hover = false;
			pointer.active = false;
			pointer.x = .5;
			pointer.y = .5;
		};
		target.addEventListener("pointermove", onMove);
		target.addEventListener("pointerenter", onEnter);
		target.addEventListener("pointerleave", onLeave);
		const onReduceChange = () => {
			if (reduce.matches) {
				pause();
				drawStill();
			} else play();
		};
		reduce.addEventListener("change", onReduceChange);
		const themeObserver = new MutationObserver(() => {
			if (reduce.matches || !running) drawStill();
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		measure();
		if (reduce.matches) drawStill();
		return () => {
			pause();
			ro.disconnect();
			io.disconnect();
			themeObserver.disconnect();
			reduce.removeEventListener("change", onReduceChange);
			document.removeEventListener("visibilitychange", onVisibility);
			target.removeEventListener("pointermove", onMove);
			target.removeEventListener("pointerenter", onEnter);
			target.removeEventListener("pointerleave", onLeave);
		};
	}, [makeEngine, externalTarget]);
	return {
		canvasRef,
		pointerTargetRef
	};
}
//#endregion
export { oklcha as a, tone as c, mix as i, useDomainCanvas as l, SiteChrome as n, rng as o, field as r, smoothstep as s, CHROME_PULL as t };
