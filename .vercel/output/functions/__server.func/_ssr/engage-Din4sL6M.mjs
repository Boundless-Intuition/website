import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as TopBar, t as SiteFooter } from "./SiteFooter-zp91Cd_6.mjs";
import { _ as ruleLattice, b as useDomainCanvas, d as field, f as mix, g as rng, n as PipelineBackdrop, p as oklcha, r as asciiFlow, s as claimMorph, v as smoothstep, y as tone } from "./MethodVisual-BqIWyxhw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engage-Din4sL6M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* ProcessFlow — the animated "how it works" pipeline for the Engage page.
*
* Four stages on a single track — rules in → formalize → prove on every change →
* certify. A glowing packet travels the track and each stage's halo flashes as it
* passes, so the whole diagram reads as one continuous run. Structure is drawn in
* the faint blueprint foreground; the packet and stage flashes use the accent.
* Pure CSS motion (pf-* classes); freezes gracefully under reduced motion.
*/
var ACC = "oklch(0.72 0.09 220)";
var MONO = { fontFamily: "var(--font-mono)" };
var STAGES = [
	{
		cx: 120,
		n: "01",
		label: "rules in"
	},
	{
		cx: 340,
		n: "02",
		label: "formalize"
	},
	{
		cx: 560,
		n: "03",
		label: "prove / change"
	},
	{
		cx: 780,
		n: "04",
		label: "certify"
	}
];
var FLASH_DELAY = [
	.3,
	1.9,
	3.6,
	5.3
];
function StageIcon({ index, cx }) {
	if (index === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fill: "none",
		stroke: "currentColor",
		strokeOpacity: "0.5",
		strokeWidth: "1.3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: cx - 20,
				y: 28,
				width: "26",
				height: "34",
				rx: "2",
				strokeOpacity: "0.28"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: cx - 10,
				y: 34,
				width: "26",
				height: "34",
				rx: "2",
				fill: "var(--background)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx - 4,
				y1: 44,
				x2: cx + 12,
				y2: 44,
				strokeOpacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx - 4,
				y1: 51,
				x2: cx + 12,
				y2: 51,
				strokeOpacity: "0.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx - 4,
				y1: 58,
				x2: cx + 6,
				y2: 58,
				strokeOpacity: "0.4"
			})
		]
	});
	if (index === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: cx - 30,
		y: 30,
		width: "60",
		height: "38",
		rx: "3",
		fill: "none",
		stroke: "currentColor",
		strokeOpacity: "0.5",
		strokeWidth: "1.3"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: cx,
		y: 54,
		textAnchor: "middle",
		fontSize: "15",
		fill: ACC,
		style: MONO,
		children: "∀x· ⊢"
	})] });
	if (index === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: cx - 26,
		y1: 48,
		x2: cx + 26,
		y2: 48,
		stroke: "currentColor",
		strokeOpacity: "0.35"
	}), [
		-26,
		0,
		26
	].map((dx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: cx + dx,
		cy: 48,
		r: "4",
		fill: "currentColor",
		fillOpacity: "0.5"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: `M${cx + dx - 3} 34 l2.5 3 5 -6`,
		fill: "none",
		stroke: ACC,
		strokeWidth: "1.5"
	})] }, i))] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cx - 22,
			y: 28,
			width: "44",
			height: "42",
			rx: "2",
			fill: "none",
			stroke: "currentColor",
			strokeOpacity: "0.5",
			strokeWidth: "1.3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx - 14,
			y1: 38,
			x2: cx + 6,
			y2: 38,
			stroke: "currentColor",
			strokeOpacity: "0.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx - 14,
			y1: 45,
			x2: cx + 2,
			y2: 45,
			stroke: "currentColor",
			strokeOpacity: "0.4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cx - 3,
			y: 54,
			width: "9",
			height: "9",
			rx: "1.5",
			fill: ACC
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: cx + 14,
			cy: 60,
			r: "8",
			fill: "none",
			stroke: ACC,
			strokeOpacity: "0.7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `M${cx + 10} 60 l2.5 3 5 -6`,
			fill: "none",
			stroke: ACC,
			strokeWidth: "1.5"
		})
	] });
}
function ProcessFlow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 900 150",
		className: "h-full w-full text-foreground",
		preserveAspectRatio: "xMidYMid meet",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "90",
				y1: "85",
				x2: "810",
				y2: "85",
				stroke: "currentColor",
				strokeOpacity: "0.22"
			}),
			STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: s.cx,
					y1: 70,
					x2: s.cx,
					y2: 79,
					stroke: "currentColor",
					strokeOpacity: "0.25"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageIcon, {
					index: i,
					cx: s.cx
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "pf-flash pf-glow",
					style: { animationDelay: `${FLASH_DELAY[i]}s` },
					cx: s.cx,
					cy: 85,
					r: "14",
					fill: "none",
					stroke: ACC,
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: s.cx,
					cy: 85,
					r: "5",
					fill: "currentColor",
					fillOpacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: s.cx,
					y: 118,
					textAnchor: "middle",
					fontSize: "10.5",
					fill: "currentColor",
					fillOpacity: "0.55",
					style: MONO,
					children: s.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: s.cx,
					y: 134,
					textAnchor: "middle",
					fontSize: "9",
					fill: ACC,
					fillOpacity: "0.7",
					style: MONO,
					children: s.n
				})
			] }, s.n)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "pf-packet pf-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "90",
					cy: "85",
					r: "5.5",
					fill: ACC
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "90",
					cy: "85",
					r: "10",
					fill: "none",
					stroke: ACC,
					strokeOpacity: "0.5"
				})]
			})
		]
	});
}
/**
* Engage-page engines — the client journey dramatized in the same live-ASCII
* canvas language as the Method and Domain panels. Rules stream in and stack
* into a corpus (01), commits cross a standing prover beam (03), and a signed
* certificate types itself out and gets sealed (04). Step 02 reuses the
* ruleLattice compiler from the Method section with its own tints.
*
* These render as full-card backgrounds, so the brightest action concentrates
* in the upper half where the copy scrim is thinnest. All are mouse-reactive
* and allocation-free per frame.
*/
var TAU = Math.PI * 2;
var clamp = (v, a, b) => v < a ? a : v > b ? b : v;
/** Run `fn` with a glow set on the context, then restore. Use sparingly. */
function glow(ctx, color, blur, fn) {
	ctx.save();
	ctx.shadowBlur = blur;
	ctx.shadowColor = color;
	fn();
	ctx.restore();
}
function ruleIngest(opts) {
	const speed = opts.speed ?? 1;
	const N = 6;
	return () => {
		let W = 0;
		let H = 0;
		const docs = [];
		const r = rng(4111);
		let pulse = 0;
		let count = 217;
		const respawn = (d, offscreen) => {
			d.x = offscreen ? -40 - r() * W * .9 : r() * W * .5;
			d.y0 = (.1 + r() * .5) * H;
			d.y = d.y0;
			d.sp = 46 + r() * 34;
			d.ph = r() * TAU;
			d.seed = r() * 4096 | 0;
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				if (docs.length === 0) for (let i = 0; i < N; i++) {
					const d = {
						x: 0,
						y: 0,
						y0: 0,
						sp: 0,
						ph: 0,
						seed: 0
					};
					respawn(d, i > 0);
					docs.push(d);
				}
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const hot = tone(palette, opts.hot);
				const okc = tone(palette, opts.ok);
				const sx = W * .72;
				const sy = H * .3;
				pulse *= Math.exp(-dt * 3);
				ctx.font = "11px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const mc = Math.max(4, Math.floor(W / 44));
				const mr = Math.max(3, Math.floor(H / 46));
				for (let gy = 0; gy < mr; gy++) for (let gx = 0; gx < mc; gx++) {
					const v = field(gx * .7, gy * .8, t * .3) * .5 + .5;
					if (v < .6) continue;
					ctx.fillStyle = oklcha(palette.dim, .05 + v * .09);
					ctx.fillText("·", (gx + .5) / mc * W, (gy + .5) / mr * H);
				}
				ctx.lineWidth = 1;
				for (let i = 4; i >= 0; i--) {
					const ox = sx - 26 + i * 2.5;
					const oy = sy - 34 + i * 3;
					ctx.fillStyle = oklcha(palette.bg, .88);
					ctx.fillRect(ox, oy, 52, 68);
					ctx.strokeStyle = oklcha(base, clamp(.55 - i * .09 + pulse * .3, 0, 1));
					ctx.strokeRect(ox, oy, 52, 68);
				}
				ctx.strokeStyle = oklcha(mix(palette.dim, base, .6), .5);
				ctx.beginPath();
				for (let k = 0; k < 4; k++) {
					const ly = sy - 34 + 22 + k * 11;
					ctx.moveTo(sx - 18, ly);
					ctx.lineTo(sx + (k === 3 ? 4 : 18), ly);
				}
				ctx.stroke();
				ctx.font = "11px \"JetBrains Mono\", monospace";
				ctx.fillStyle = oklcha(hot, .85);
				ctx.fillText("§", sx - 16, sy - 22);
				ctx.font = "10px \"JetBrains Mono\", monospace";
				ctx.fillStyle = oklcha(mix(palette.dim, base, .7), .8);
				ctx.fillText(`rules · ${count}`, sx, sy + 48);
				if (pulse > .04) {
					glow(ctx, oklcha(okc, .8), 8, () => {
						ctx.fillStyle = oklcha(okc, pulse);
						ctx.fillText("✓", sx + 34, sy - 40);
					});
					const rr = (1 - pulse) * 30;
					ctx.strokeStyle = oklcha(okc, pulse * .6);
					ctx.beginPath();
					ctx.arc(sx, sy, 40 + rr, 0, TAU);
					ctx.stroke();
				}
				for (const d of docs) {
					const prog = clamp((d.x + 40) / Math.max(1, sx - 40), 0, 1);
					if (!still) {
						let ty = d.y0 + Math.sin(t * 1.1 + d.ph) * 22 * (1 - prog);
						if (pointer.active) ty += (pointer.y * H - ty) * .35 * (1 - prog);
						ty += (sy - ty) * smoothstep(.55, 1, prog);
						d.y += (ty - d.y) * clamp(dt * 4, 0, 1);
						d.x += d.sp * speed * (hover ? 1.5 : 1) * dt;
						if (d.x >= sx - 32) {
							count++;
							pulse = 1;
							respawn(d, true);
						}
					}
					if (d.x < -30) continue;
					const a = clamp(.3 + prog * .55, 0, 1);
					ctx.strokeStyle = oklcha(base, .15 + prog * .12);
					ctx.beginPath();
					ctx.moveTo(d.x - 32, d.y);
					ctx.lineTo(d.x - 15, d.y);
					ctx.stroke();
					ctx.fillStyle = oklcha(palette.bg, .82);
					ctx.fillRect(d.x - 11, d.y - 14, 22, 28);
					ctx.strokeStyle = oklcha(base, a);
					ctx.strokeRect(d.x - 11, d.y - 14, 22, 28);
					ctx.strokeStyle = oklcha(mix(palette.dim, base, .5), a * .7);
					ctx.beginPath();
					for (let k = 0; k < 3; k++) {
						const ly = d.y - 4 + k * 6;
						ctx.moveTo(d.x - 6, ly);
						ctx.lineTo(d.x + (k === 2 ? 1 : 7), ly);
					}
					ctx.stroke();
					ctx.font = "9px \"JetBrains Mono\", monospace";
					ctx.fillStyle = oklcha(hot, a);
					ctx.fillText("§", d.x - 5, d.y - 9);
				}
			}
		};
	};
}
function commitProofs(opts) {
	const speed = opts.speed ?? 1;
	const LANES = 3;
	const PER = 5;
	const HEXC = "0123456789abcdef";
	const DASH = [5, 6];
	const NODASH = [];
	return () => {
		let W = 0;
		let H = 0;
		const cs = [];
		const r = rng(9020);
		let bp = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
				if (cs.length === 0) for (let ln = 0; ln < LANES; ln++) for (let i = 0; i < PER; i++) cs.push({
					lane: ln,
					x: (i + r() * .7) / PER * w * 1.5,
					seed: r() * 4096 | 0,
					st: 0,
					fl: 0
				});
			},
			frame(ctx, env) {
				const { dt, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const okc = tone(palette, opts.ok);
				const bad = tone(palette, opts.bad);
				const bx = W * .58;
				const laneY = (ln) => H * (.16 + ln * .17);
				const v = 30 * speed * (hover ? 1.7 : 1);
				bp *= Math.exp(-dt * 3.5);
				ctx.lineWidth = 1;
				ctx.strokeStyle = oklcha(palette.dim, .16);
				ctx.beginPath();
				for (let ln = 0; ln < LANES; ln++) {
					const y = laneY(ln);
					ctx.moveTo(8, y);
					ctx.lineTo(W - 8, y);
				}
				ctx.stroke();
				glow(ctx, oklcha(base, .8), 7 + bp * 12, () => {
					ctx.strokeStyle = oklcha(mix(base, okc, bp), .45 + bp * .5);
					ctx.setLineDash(DASH);
					ctx.beginPath();
					ctx.moveTo(bx, H * .06);
					ctx.lineTo(bx, H * .6);
					ctx.stroke();
					ctx.setLineDash(NODASH);
				});
				ctx.font = "12px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = oklcha(base, .75);
				ctx.fillText("⊢", bx, H * .66);
				const px = pointer.x * W;
				const py = pointer.y * H;
				ctx.font = "11px \"JetBrains Mono\", monospace";
				for (const c of cs) {
					const y = laneY(c.lane);
					if (!still) {
						c.x -= v * dt;
						if (c.x < -24) {
							c.x = W + 20 + r() * 140;
							c.seed = r() * 4096 | 0;
							c.st = 0;
							c.fl = 0;
						}
						if (c.st === 0 && c.x <= bx) {
							c.st = c.seed % 6 === 3 ? 2 : 1;
							c.fl = 1;
							bp = 1;
						}
						c.fl *= Math.exp(-dt * 1.8);
					} else if (c.st === 0 && c.x <= bx) c.st = c.seed % 6 === 3 ? 2 : 1;
					const near = pointer.active ? smoothstep(46, 0, Math.hypot(c.x - px, y - py)) : 0;
					if (c.st === 2) {
						ctx.strokeStyle = oklcha(bad, .85);
						ctx.beginPath();
						ctx.arc(c.x, y, 3, 0, TAU);
						ctx.stroke();
						ctx.fillStyle = oklcha(bad, clamp(.5 + c.fl * .5, 0, 1));
						ctx.fillText("✗", c.x, y - 13);
					} else if (c.st === 1) {
						ctx.fillStyle = oklcha(mix(base, okc, .75), .9);
						ctx.beginPath();
						ctx.arc(c.x, y, 2.8, 0, TAU);
						ctx.fill();
						ctx.fillStyle = oklcha(okc, clamp(.4 + c.fl * .6 + near * .3, 0, 1));
						ctx.fillText("✓", c.x, y - 13);
						if (c.fl > .05) {
							ctx.strokeStyle = oklcha(okc, c.fl * .7);
							ctx.beginPath();
							ctx.arc(c.x, y, 5 + (1 - c.fl) * 14, 0, TAU);
							ctx.stroke();
						}
					} else {
						ctx.fillStyle = oklcha(mix(palette.dim, base, .6), .8);
						ctx.beginPath();
						ctx.arc(c.x, y, 2.6, 0, TAU);
						ctx.fill();
					}
					if (near > .45) {
						ctx.fillStyle = oklcha(base, near);
						ctx.fillText(`#${HEXC[c.seed & 15]}${HEXC[c.seed >> 4 & 15]}${HEXC[c.seed >> 8 & 15]}`, c.x, y + 15);
					}
				}
			}
		};
	};
}
function sealCert(opts) {
	const HEX = "89abcdef01234567";
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let gen = 0;
		let prev = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
			},
			frame(ctx, env) {
				const { t, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const hot = tone(palette, opts.hot);
				const seal = tone(palette, opts.seal);
				const T = 7.5 / speed;
				const tau = still ? 4.2 : t % T;
				if (tau < prev) gen++;
				prev = tau;
				const fade = 1 - smoothstep(T - .7, T - .05, tau);
				const lines = 6;
				const lh = Math.min(22, H * .48 / lines);
				const cw = 10;
				const cols = Math.max(8, Math.floor((W - 36) / cw));
				const px = pointer.x * W;
				const py = pointer.y * H;
				ctx.font = "12px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const cps = 34 * (hover ? 1.3 : 1);
				for (let li = 0; li < lines; li++) {
					const y = 22 + li * lh;
					const head = still ? cols : clamp((tau - li * .28) * cps, 0, cols);
					for (let c = 0; c < cols; c++) {
						if (c >= head) break;
						const x = 18 + (c + .5) * cw;
						const near = pointer.active ? smoothstep(60, 0, Math.hypot(x - px, y - py)) : 0;
						let gi = gen * 131 + li * 37 + c * 11 & 1023;
						if (near > .3) gi += t * 20 | 0;
						const ch = c % 9 === 4 ? "·" : HEX[gi & 15];
						const fresh = clamp(1 - (head - c) * .08, 0, 1);
						ctx.fillStyle = oklcha(mix(mix(palette.dim, base, .5 + near * .4), hot, fresh), (.2 + fresh * .62 + near * .25) * fade);
						ctx.fillText(ch, x, y);
					}
				}
				const stampT = 2.88;
				if (tau >= stampT - .3) {
					const drop = clamp((tau - (stampT - .3)) / .3, 0, 1);
					const sc = 1 + (1 - drop) * 1.5;
					const aS = drop * fade;
					const cx = W * .64 + (pointer.x - .5) * (pointer.active ? 12 : 0);
					const cy = H * .3 + (pointer.y - .5) * (pointer.active ? 9 : 0);
					glow(ctx, oklcha(seal, .8), 10, () => {
						ctx.strokeStyle = oklcha(seal, .85 * aS);
						ctx.lineWidth = 1.5;
						ctx.beginPath();
						ctx.arc(cx, cy, 24 * sc, 0, TAU);
						ctx.stroke();
						ctx.lineWidth = 1;
					});
					ctx.strokeStyle = oklcha(seal, .45 * aS);
					ctx.beginPath();
					ctx.arc(cx, cy, 30 * sc, 0, TAU);
					ctx.stroke();
					const rot = still ? .6 : t * .5;
					ctx.strokeStyle = oklcha(seal, .6 * aS);
					ctx.beginPath();
					for (let k = 0; k < 12; k++) {
						const an = rot + k / 12 * TAU;
						ctx.moveTo(cx + Math.cos(an) * 30 * sc, cy + Math.sin(an) * 30 * sc);
						ctx.lineTo(cx + Math.cos(an) * 34 * sc, cy + Math.sin(an) * 34 * sc);
					}
					ctx.stroke();
					ctx.font = "16px \"JetBrains Mono\", monospace";
					ctx.fillStyle = oklcha(seal, aS);
					ctx.fillText("✓", cx, cy - 4);
					ctx.font = "8px \"JetBrains Mono\", monospace";
					ctx.fillStyle = oklcha(seal, .85 * aS);
					ctx.fillText("∎ QED", cx, cy + 11);
					const since = tau - stampT;
					if (since > 0 && since < .9) {
						const p = since / .9;
						ctx.strokeStyle = oklcha(seal, (1 - p) * .7 * fade);
						ctx.beginPath();
						ctx.arc(cx, cy, 36 + p * 30, 0, TAU);
						ctx.stroke();
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
var CYAN = t([
	.52,
	.15,
	215
], [
	.8,
	.13,
	210
]);
var SKY = t([
	.55,
	.16,
	208
], [
	.85,
	.14,
	205
]);
var GREEN = t([
	.53,
	.17,
	152
], [
	.81,
	.2,
	150
]);
var RED = t([
	.55,
	.21,
	25
], [
	.72,
	.23,
	25
]);
var TEAL = t([
	.54,
	.13,
	195
], [
	.82,
	.13,
	195
]);
var AMBER = t([
	.58,
	.16,
	78
], [
	.82,
	.17,
	82
]);
var AZURE = t([
	.5,
	.15,
	255
], [
	.78,
	.13,
	250
]);
var INDIGO = t([
	.45,
	.19,
	295
], [
	.76,
	.15,
	295
]);
var VIOLET = t([
	.56,
	.2,
	322
], [
	.83,
	.16,
	322
]);
/** One full-card live visual per Engage process step (01–04). */
var VISUALS = [
	ruleIngest({
		tint: TEAL,
		hot: AMBER,
		ok: GREEN
	}),
	ruleLattice({
		chaos: VIOLET,
		ord: CYAN
	}),
	commitProofs({
		tint: AZURE,
		ok: GREEN,
		bad: RED
	}),
	sealCert({
		tint: INDIGO,
		hot: VIOLET,
		seal: GREEN
	})
];
function EngageStepVisual({ index }) {
	const { canvasRef, pointerTargetRef } = useDomainCanvas((0, import_react.useMemo)(() => VISUALS[index % VISUALS.length], [index]));
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
var heroMake = claimMorph({
	prose: AZURE,
	logic: SKY,
	cell: 21,
	speed: .7
});
function EngageHeroBackdrop() {
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
var gateMake = asciiFlow({
	tint: CYAN,
	hot: SKY,
	ok: GREEN,
	seed: 211,
	speed: .8
});
function GateFlowBackdrop() {
	const { canvasRef, pointerTargetRef } = useDomainCanvas(gateMake);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: pointerTargetRef,
		className: "pointer-events-auto absolute inset-0 overflow-hidden opacity-60",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full"
		})
	});
}
var STEPS = [
	{
		n: "01",
		title: "Share your rules",
		body: "Send us the standards, policies, or regulations that govern your domain - handbooks, compliance documents, protocol specifications. We start with what you already have."
	},
	{
		n: "02",
		title: "We formalize them",
		body: "Our team translates your rules into machine-checkable formal objects - precise mathematical representations that a theorem prover can reason about."
	},
	{
		n: "03",
		title: "Proofs run on every change",
		body: "Verification integrates into your workflow. Every policy update, every configuration change is proved safe against your formalized rules - automatically, continuously."
	},
	{
		n: "04",
		title: "You get verifiable guarantees",
		body: "Not assertions. Not test results. Mathematical proofs that your systems conform to the rules that govern them - auditable, reproducible, and independently checkable."
	}
];
var DELIVERABLES = [
	{
		title: "Conflict Reports",
		body: "When rules contradict each other - a firewall allows what a handbook forbids, a policy grants what a standard restricts - we surface it with a concrete witness."
	},
	{
		title: "Regression Proofs",
		body: "Every change to your configuration or policy is checked against the full rule set. Proofs run in CI, per commit, and block deployments that violate invariants."
	},
	{
		title: "Verified Artifacts",
		body: "Formalized rules and their derivations, versioned and signed. An auditable record that your systems do what your documentation says they do."
	}
];
var PROFILES = [
	{
		title: "Security & Compliance Teams",
		body: "CISOs, GRC leads, and policy owners who need provable assurance that access controls, firewall rules, and audit configurations match organizational policy."
	},
	{
		title: "Regulated Product Teams",
		body: "Engineering leads shipping medical devices, financial systems, or safety-critical software under IEC, FDA, or SOC 2 obligations."
	},
	{
		title: "Legal & Policy Organizations",
		body: "Teams managing complex regulatory environments - GDPR, export control, sanctions - who need consistency between written rules and operational reality."
	},
	{
		title: "Research & Infrastructure",
		body: "Organizations running mission-critical research infrastructure where configuration correctness is not optional - and testing alone is not sufficient."
	}
];
function EngagePage() {
	const [formState, setFormState] = (0, import_react.useState)({
		name: "",
		company: "",
		domain: "",
		message: ""
	});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		const subject = encodeURIComponent(`Verification inquiry - ${formState.company || "General"}`);
		const body = encodeURIComponent(`Name: ${formState.name}\nCompany: ${formState.company}\nDomain: ${formState.domain}\n\n${formState.message}`);
		window.location.href = `mailto:research@boundlessintuition.com?subject=${subject}&body=${body}`;
		setSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16 overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "blueprint-grid absolute inset-0 opacity-100",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngageHeroBackdrop, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none relative mx-auto max-w-7xl px-6 pt-24 pb-28 lg:pt-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ VII"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Engage" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mb-10 max-w-[18ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:text-[4.4rem]",
							children: "Bring us your rules."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[58ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We work with organizations to formalize the rules that govern their domain - standards, policies, regulations, protocols - into machine-checkable form. Then we build the verification layer that proves every decision conforms to them." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "This is not consulting. It is engineering. The output is not a report - it is a system that runs proofs, continuously, on every change, forever."
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border bg-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid-fine absolute inset-0 opacity-60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/70",
										children: "§ VII.i"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/50",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI verification" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
								children: "Between your AI and production."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
							children: "Your teams are already shipping AI into your domain. We make sure it cannot act outside the rules that govern it."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-16 grid gap-10 text-[16px] leading-[1.65] lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/85",
							children: "Copilots write configurations. Agents take actions. Models answer the questions your regulators care about. Each output is fluent, fast - and, on its own, impossible to trust. That gap between what an AI says and what your rules allow is the exposure formal verification closes."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "We sit a proof engine between your AI and production. Every answer is checked against the rules we formalized from your domain, and only the ones that pass - each carrying a signed, reproducible certificate - are allowed through. The rest are blocked before they ship, with the exact violation attached."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-3 overflow-hidden rounded-sm border border-border bg-background/70 p-6 backdrop-blur-sm md:grid-cols-[1fr_auto_1.5fr_auto_1fr] md:items-stretch",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateFlowBackdrop, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none relative flex flex-col gap-2 rounded-sm border border-border bg-background p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Input"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[16px] font-medium tracking-tight text-foreground",
										children: "Your AI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "copilots · agents · models"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "pointer-events-none relative flex items-center justify-center py-1 text-foreground/40 md:py-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rotate-90 md:rotate-0",
									children: "→"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none relative flex flex-col gap-2 rounded-sm border border-transparent bg-ink p-5 text-ink-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40",
										children: "Verification gate · your rules"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[16px] font-medium tracking-tight text-white",
										children: "Checked against your formalized rules"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-white/50",
										children: "proof · or a concrete counterexample"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "pointer-events-none relative flex items-center justify-center py-1 text-foreground/40 md:py-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rotate-90 md:rotate-0",
									children: "→"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none relative flex flex-col gap-2 rounded-sm border border-border bg-background p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground",
										children: "Output"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-[16px] font-medium tracking-tight text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]",
										children: "Production"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "only verified answers ship"
									})
								]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ VII.ii"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Process" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "How it works."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-14 overflow-x-auto rounded-sm border border-border bg-muted/20 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineBackdrop, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none relative mx-auto h-44 min-w-[680px] max-w-5xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessFlow, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4",
						children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative flex min-h-[400px] flex-col overflow-hidden bg-[oklch(0.965_0.008_90)] dark:bg-[oklch(0.14_0.014_250)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngageStepVisual, { index: i }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/60 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[76%] bg-gradient-to-t from-background via-background/90 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pointer-events-none relative flex h-full flex-col p-6 lg:p-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-10 place-items-center rounded-full border border-foreground/25 bg-background/60 font-mono text-[12px] tabular-nums text-foreground/70 backdrop-blur-sm transition-colors group-hover:border-foreground/50 group-hover:text-foreground",
										children: step.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto flex min-h-[56%] flex-col gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "min-h-[2.4em] font-display text-[18px] font-medium leading-[1.2] tracking-tight text-foreground",
											children: step.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[13.5px] leading-relaxed text-muted-foreground",
											children: step.body
										})]
									})]
								})
							]
						}, step.n))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border bg-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid-fine absolute inset-0 opacity-60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ VII.iii"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Deliverables" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "What you get."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-8 md:grid-cols-3",
					children: DELIVERABLES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-sm border border-border bg-background/80 p-8 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 place-items-center rounded-full bg-[oklch(0.72_0.09_220)]/15 text-[10px] text-[oklch(0.72_0.09_220)]",
								"aria-hidden": true,
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-[17px] font-medium tracking-tight text-foreground",
								children: d.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14.5px] leading-relaxed text-muted-foreground",
							children: d.body
						})]
					}, d.title))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/70",
								children: "§ VII.iv"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/50",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "For" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-[20ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
						children: "Who this is for."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted-foreground",
						children: "If your domain has written rules and your organization needs provable assurance - not just test coverage - we should talk."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2",
					children: PROFILES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 bg-background p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-[17px] font-medium tracking-tight text-foreground",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14.5px] leading-relaxed text-muted-foreground",
							children: p.body
						})]
					}, p.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative border-b border-border bg-muted/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "blueprint-grid absolute inset-0 opacity-60",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-16 lg:grid-cols-[1.1fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/70",
									children: "§ VII.v"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contact" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-8 max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]",
							children: "Start a conversation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-[48ch] space-y-5 text-[16px] leading-[1.65] text-foreground/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tell us about your domain and the rules that govern it. We'll assess whether formal verification is the right fit and scope an initial engagement." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "No pitch decks. No sales calls. Just engineers talking to engineers about what can be proved."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:research@boundlessintuition.com",
								className: "group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground",
								children: ["research@boundlessintuition.com", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:pt-8",
						children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center rounded-sm border border-border bg-background/80 p-12 text-center backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 text-[oklch(0.72_0.09_220)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl",
										children: "✓"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-2 font-display text-[19px] font-medium text-foreground",
									children: "Opening your email client"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[14px] text-muted-foreground",
									children: "If it didn't open, reach us directly at research@boundlessintuition.com"
								})
							] })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: handleSubmit,
							className: "rounded-sm border border-border bg-background/80 p-8 backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-name",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "engage-name",
										type: "text",
										required: true,
										value: formState.name,
										onChange: (e) => setFormState((s) => ({
											...s,
											name: e.target.value
										})),
										className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "Your name"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-company",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Organization"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "engage-company",
										type: "text",
										value: formState.company,
										onChange: (e) => setFormState((s) => ({
											...s,
											company: e.target.value
										})),
										className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "Company or institution"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-domain",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Domain"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "engage-domain",
										type: "text",
										value: formState.domain,
										onChange: (e) => setFormState((s) => ({
											...s,
											domain: e.target.value
										})),
										className: "w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "e.g. Security, Healthcare, Finance"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "engage-message",
										className: "mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
										children: "Tell us about your rules"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "engage-message",
										rows: 4,
										value: formState.message,
										onChange: (e) => setFormState((s) => ({
											...s,
											message: e.target.value
										})),
										className: "w-full resize-none border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40",
										placeholder: "What rules govern your domain? What would you like to verify?"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "mt-4 inline-flex items-center gap-2 border border-foreground/40 bg-foreground/5 px-6 py-3 font-display text-[12px] font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground hover:bg-foreground/10",
										children: ["Send inquiry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: "→"
										})]
									})
								]
							})
						})
					})]
				})
			})]
		})
	] });
}
function EngageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagePage, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { EngageRoute as component };
