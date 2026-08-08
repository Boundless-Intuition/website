import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PlateDrift-CxdTP5DY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A plate that moves as a picture rather than as a field of grain.
*
* The halftone engines animate what a plate depicts — falling water, a signal
* leaving an instrument. This does the opposite and animates the plate itself:
* a very slow drift, plus a little parallax under the cursor. Nothing is drawn
* on top, so it can never read as an effect laid over a painting.
*
* Two nested elements on purpose. The drift is a CSS keyframe on the image and
* the parallax is a transform on the wrapper — put both on one element and the
* second silently replaces the first.
*/
function PlateDrift({ src, focus = "50% 50%", strength = 16, pointerTarget }) {
	const selfRef = (0, import_react.useRef)(null);
	const layerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
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
	}, [pointerTarget, strength]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: selfRef,
		className: "absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: layerRef,
			className: "absolute -inset-8 will-change-transform",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "plate-drift h-full w-full object-cover",
				style: { objectPosition: focus }
			})
		})
	});
}
//#endregion
export { PlateDrift as t };
