import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useDomainCanvas-BjzCv2zR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
		.47,
		.13,
		170
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
		.79,
		.14,
		170
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
function useDomainCanvas(makeEngine) {
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
			dpr = Math.min(2, window.devicePixelRatio || 1);
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
		const target = pointerTargetRef.current ?? canvas;
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
	}, [makeEngine]);
	return {
		canvasRef,
		pointerTargetRef
	};
}
//#endregion
export { smoothstep as a, rng as i, mix as n, tone as o, oklcha as r, useDomainCanvas as s, field as t };
