import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PlateDrift--xvGAf8G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A moving plate, laid over its own still and cross-faded in once it is really
* playing — the clip's first frame *is* the poster, so the hand-off is invisible.
* Same contract as HeroFilm, with two differences that come from living below
* the fold rather than in the hero:
*
*  - the file is not even chosen until the section is within a viewport of the
*    scroll position, so a visitor who never reaches it spends nothing;
*  - playback is tied to visibility, so a loop nobody is looking at is not
*    decoding frames in a background tab or three screens up the page.
*
* As in the hero, nothing is fetched during SSR or first paint, and a visitor
* who has asked for less motion or is on a metered connection keeps the still.
*
* Expects `${base}.webm`, `${base}.mp4` and their `-mobile` pair in /public.
*/
function PlateFilm({ base, className = "", style }) {
	const ref = (0, import_react.useRef)(null);
	const [variant, setVariant] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (navigator.connection?.saveData) return;
		const v = ref.current;
		if (!v) return;
		const pick = () => setVariant(window.matchMedia("(max-width: 639.98px)").matches ? "mobile" : "desktop");
		if (typeof IntersectionObserver === "undefined") {
			pick();
			return;
		}
		let io = null;
		const arm = () => {
			io = new IntersectionObserver((entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				io?.disconnect();
				pick();
			}, { rootMargin: "40% 0px" });
			io.observe(v);
		};
		let cancel;
		if (typeof window.requestIdleCallback === "function") {
			const h = window.requestIdleCallback(arm, { timeout: 2e3 });
			cancel = () => window.cancelIdleCallback(h);
		} else {
			const h = window.setTimeout(arm, 600);
			cancel = () => window.clearTimeout(h);
		}
		return () => {
			cancel();
			io?.disconnect();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const v = ref.current;
		if (!v || !variant) return;
		const src = variant === "mobile" ? `${base}-mobile` : base;
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
			start(`${src}.mp4`);
		};
		v.addEventListener("error", onError);
		start(`${src}.${preferWebm ? "webm" : "mp4"}`);
		let io = null;
		if (typeof IntersectionObserver !== "undefined") {
			io = new IntersectionObserver((entries) => {
				for (const e of entries) if (e.isIntersecting) v.play().catch(() => {});
				else v.pause();
			}, { threshold: .1 });
			io.observe(v);
		}
		return () => {
			v.removeEventListener("error", onError);
			io?.disconnect();
		};
	}, [base, variant]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		className: `${className} transition-opacity duration-[1200ms] ease-out ${playing ? "opacity-100" : "opacity-0"}`,
		style,
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
/**
* A plate that moves as a picture rather than as a field of grain.
*
* The halftone engines animate what a plate depicts — falling water, a signal
* leaving an instrument. This does the opposite and animates the plate itself:
* a very slow drift, plus a little parallax under the cursor. Nothing is drawn
* on top, so it can never read as an effect laid over a painting.
*
* Three nested elements on purpose. The parallax is a transform on the outer
* wrapper and the drift is a CSS keyframe on the inner one — put both on the
* same element and the second silently replaces the first. The drift sits on a
* wrapper rather than on the image so that a plate with a film over it (see
* `film`) has both layers travelling on one animation: on two elements they
* would be two clocks, and the cross-fade between them would slide.
*/
function PlateDrift({ src, mobileSrc, focus = "50% 50%", strength = 16, film, drift = true, pointerTarget }) {
	const selfRef = (0, import_react.useRef)(null);
	const layerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !drift) return;
		const layer = layerRef.current;
		const target = pointerTarget?.current ?? selfRef.current;
		if (!layer || !target) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		let raf = 0;
		let tx = 0;
		let ty = 0;
		let cx = 0;
		let cy = 0;
		const step = () => {
			raf = 0;
			cx += (tx - cx) * .09;
			cy += (ty - cy) * .09;
			layer.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
			if (Math.abs(tx - cx) > .08 || Math.abs(ty - cy) > .08) raf = window.requestAnimationFrame(step);
		};
		const onMove = (e) => {
			if (reduce.matches) return;
			const r = target.getBoundingClientRect();
			if (r.width === 0 || r.height === 0) return;
			tx = ((e.clientX - r.left) / r.width - .5) * -strength;
			ty = ((e.clientY - r.top) / r.height - .5) * -strength;
			if (!raf) raf = window.requestAnimationFrame(step);
		};
		const settle = () => {
			tx = 0;
			ty = 0;
			if (!raf) raf = window.requestAnimationFrame(step);
		};
		target.addEventListener("pointermove", onMove);
		target.addEventListener("pointerleave", settle);
		reduce.addEventListener("change", settle);
		return () => {
			if (raf) window.cancelAnimationFrame(raf);
			target.removeEventListener("pointermove", onMove);
			target.removeEventListener("pointerleave", settle);
			reduce.removeEventListener("change", settle);
		};
	}, [
		drift,
		pointerTarget,
		strength
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: selfRef,
		className: "absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: layerRef,
			className: drift ? "absolute -inset-8 will-change-transform" : "absolute inset-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: drift ? "plate-drift absolute inset-0" : "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [mobileSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					media: "(max-width: 639.98px)",
					srcSet: mobileSrc
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "h-full w-full object-cover",
					style: { objectPosition: focus }
				})] }), film ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlateFilm, {
					base: film,
					className: "absolute inset-0 h-full w-full object-cover",
					style: { objectPosition: focus }
				}) : null]
			})
		})
	});
}
//#endregion
export { PlateDrift as t };
