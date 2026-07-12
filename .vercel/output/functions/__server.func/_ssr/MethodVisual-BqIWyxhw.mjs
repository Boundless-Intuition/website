import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MethodVisual-BqIWyxhw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LIGHT = {
	isDark: false,
	bg: [
		.965,
		.008,
		90
	],
	ink: [
		.22,
		.03,
		250
	],
	dim: [
		.42,
		.02,
		250
	],
	accent: [
		.48,
		.09,
		220
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
		.78,
		.09,
		220
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
* Method-step engines — five ASCII-native visuals dramatizing the pipeline
* steps (01–05). Unlike the domain panels these render as full-card
* backgrounds, so they stay glyph-based (the "live ASCII" language of the
* Security panel) and concentrate their brightest action in the upper half
* where the copy scrim is thinnest. All are mouse-reactive and allocation-free
* per frame.
*/
var TAU$1 = Math.PI * 2;
var clamp$1 = (v, a, b) => v < a ? a : v > b ? b : v;
/** Run `fn` with a glow set on the context, then restore. Use sparingly. */
function glow$1(ctx, color, blur, fn) {
	ctx.save();
	ctx.shadowBlur = blur;
	ctx.shadowColor = color;
	fn();
	ctx.restore();
}
function tokenStream(opts) {
	const GLYPHS = "aenotirsl dhcum.,;·—+=<>/";
	const speed = opts.speed ?? 1;
	return () => {
		let rows = [];
		let cols = 0;
		const cw = 9.5;
		let W = 0;
		let H = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
				const lh = 20;
				cols = Math.max(6, Math.floor((w - 28) / cw));
				const n = Math.max(3, Math.floor((h - 24) / lh));
				const r = rng(1013);
				rows = [];
				for (let i = 0; i < n; i++) rows.push({
					head: r() * cols * 1.4 - cols * .2,
					sp: 7 + r() * 10,
					y: 16 + (i + .5) * lh,
					seed: Math.floor(r() * 4096),
					gen: 0
				});
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const hot = tone(palette, opts.hot);
				ctx.font = "13px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const px = pointer.x * W;
				const py = pointer.y * H;
				for (let ri = 0; ri < rows.length; ri++) {
					const row = rows[ri];
					const near = pointer.active ? smoothstep(70, 0, Math.abs(row.y - py)) : 0;
					if (!still) {
						row.head += row.sp * speed * (1 + near * 2.4 + (hover ? .35 : 0)) * dt;
						if (row.head > cols + 8) {
							row.head = -3 - (row.seed >> 4) % 6;
							row.gen++;
						}
					} else if (row.head < 4) row.head = cols * .6;
					const head = row.head;
					for (let c = 0; c < cols; c++) {
						const x = 16 + (c + .5) * cw;
						if (c > head) {
							const g = field(c * .35, ri * .9, t * .5) * .5 + .5;
							if (g > .62) {
								ctx.fillStyle = oklcha(palette.dim, .1 + g * .08);
								ctx.fillText("·", x, row.y);
							}
							continue;
						}
						const fresh = clamp$1(1.15 - (head - c) * .05, 0, 1);
						let gi = (row.seed + c * 31 + row.gen * 97) % 25;
						if (pointer.active && Math.abs(x - px) < 34 && near > .3) gi = (gi + (t * 22 | 0)) % 25;
						const ch = GLYPHS[gi];
						if (ch === " ") continue;
						const emph = clamp$1(fresh + near * .5, 0, 1);
						ctx.fillStyle = oklcha(mix(mix(palette.dim, base, .45 + near * .4), hot, fresh * fresh), .3 + emph * .62);
						ctx.fillText(ch, x, row.y);
					}
					if (head >= 0 && head <= cols) {
						const cx = 16 + (head + .5) * cw;
						const blink = still ? 1 : .55 + .45 * Math.sin(t * 9 + ri);
						glow$1(ctx, oklcha(hot, .9), 10, () => {
							ctx.fillStyle = oklcha(hot, .5 + blink * .45);
							ctx.fillRect(cx - cw * .4, row.y - 8, cw * .8, 16);
						});
					}
				}
			}
		};
	};
}
function ruleLattice(opts) {
	const ORD = "∀∧→§⊢=¶≤";
	const RAW = "kxq?~zjw%&";
	const speed = opts.speed ?? 1;
	return () => {
		let ps = [];
		let gcols = 0;
		let grows = 0;
		let W = 0;
		let H = 0;
		const DASH = [5, 7];
		const NODASH = [];
		return {
			resize(w, h) {
				W = w;
				H = h;
				const cell = Math.max(26, Math.sqrt(w * h / 150));
				gcols = Math.max(3, Math.round(w / cell));
				grows = Math.max(3, Math.round(h / cell));
				const r = rng(77);
				ps = [];
				for (let gy = 0; gy < grows; gy++) for (let gx = 0; gx < gcols; gx++) ps.push({
					lx: (gx + .5) / gcols * w,
					ly: (gy + .5) / grows * h,
					o: 0,
					seed: Math.floor(r() * 4096)
				});
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, still } = env;
				const raw = tone(palette, opts.chaos);
				const ord = tone(palette, opts.ord);
				const fx = (pointer.active ? clamp$1(pointer.x, .05, .95) : .5 + .4 * Math.sin(t * .4 * speed)) * W;
				for (const p of ps) {
					const tgt = p.lx < fx ? 1 : 0;
					p.o = still ? tgt : p.o + (tgt - p.o) * clamp$1(dt * 3, 0, 1);
				}
				ctx.lineWidth = 1;
				for (let gy = 0; gy < grows; gy++) for (let gx = 0; gx < gcols; gx++) {
					const i = gy * gcols + gx;
					const a = ps[i];
					if (a.o < .6) continue;
					if (gx + 1 < gcols) {
						const b = ps[i + 1];
						if (b.o >= .6) {
							ctx.strokeStyle = oklcha(ord, .05 + .14 * Math.min(a.o, b.o));
							ctx.beginPath();
							ctx.moveTo(a.lx, a.ly);
							ctx.lineTo(b.lx, b.ly);
							ctx.stroke();
						}
					}
					if (gy + 1 < grows) {
						const b = ps[i + gcols];
						if (b.o >= .6) {
							ctx.strokeStyle = oklcha(ord, .05 + .14 * Math.min(a.o, b.o));
							ctx.beginPath();
							ctx.moveTo(a.lx, a.ly);
							ctx.lineTo(b.lx, b.ly);
							ctx.stroke();
						}
					}
				}
				ctx.font = "13px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (const p of ps) {
					const wob = 1 - p.o;
					const dx = field(p.lx * .013, p.ly * .017 + p.seed, t * .7) * 34 * wob;
					const dy = field(p.ly * .015 + 9, p.lx * .011 - p.seed, t * .62) * 30 * wob;
					const scr = p.o > .25 && p.o < .75;
					const set = p.o >= .75 || scr ? ORD : RAW;
					const gi = scr ? (p.seed + (t * 18 | 0)) % set.length : p.seed % set.length;
					ctx.fillStyle = oklcha(mix(raw, ord, p.o), clamp$1(.3 + p.o * .55 + wob * .15, 0, 1));
					ctx.fillText(set[gi], p.lx + dx, p.ly + dy);
				}
				glow$1(ctx, oklcha(ord, .8), 9, () => {
					ctx.strokeStyle = oklcha(ord, .65);
					ctx.setLineDash(DASH);
					ctx.beginPath();
					ctx.moveTo(fx, 4);
					ctx.lineTo(fx, H - 4);
					ctx.stroke();
					ctx.setLineDash(NODASH);
				});
			}
		};
	};
}
function claimMorph(opts) {
	const PROSE = "the answer said to give. ";
	const LOGIC = "∀∃¬∧∨→⊨λ⊢:=()";
	const cell = opts.cell ?? 16;
	const speed = opts.speed ?? 1;
	return () => {
		let cols = 0;
		let rows = 0;
		let cw = cell;
		let ch = cell;
		let W = 0;
		let H = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
				cols = Math.max(1, Math.floor(w / cell));
				rows = Math.max(1, Math.floor(h / cell));
				cw = w / cols;
				ch = h / rows;
			},
			frame(ctx, env) {
				const { t, palette, pointer, still } = env;
				const pro = tone(palette, opts.prose);
				const log = tone(palette, opts.logic);
				ctx.font = "13px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const lt = still ? 0 : t * speed;
				const lx = (pointer.active ? pointer.x : .5 + .34 * Math.sin(lt * .5)) * W;
				const ly = (pointer.active ? pointer.y : .42 + .28 * Math.cos(lt * .37)) * H;
				const R = Math.min(W, H) * .4 * (1 + .06 * Math.sin(lt * 1.7));
				for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
					const x = (c + .5) * cw;
					const y = (r + .5) * ch;
					const d = Math.hypot(x - lx, y - ly);
					const s = smoothstep(R, R * .45, d);
					const hsh = c * 7 + r * 13 + (c * c + r) % 5;
					let g;
					if (s > .72) g = LOGIC[hsh % 13];
					else if (s > .2) g = LOGIC[(hsh + (t * 16 | 0)) % 13];
					else g = PROSE[(hsh + (t * 1.2 | 0)) % 25];
					if (g === " ") continue;
					const shimmer = field(c * .4, r * .5, t * .6) * .5 + .5;
					ctx.fillStyle = oklcha(mix(pro, log, s), clamp$1(.14 + shimmer * .2 + s * .62, 0, 1));
					ctx.fillText(g, x, y);
				}
				glow$1(ctx, oklcha(log, .7), 8, () => {
					ctx.strokeStyle = oklcha(log, .4);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.arc(lx, ly, R, 0, TAU$1);
					ctx.stroke();
				});
				ctx.strokeStyle = oklcha(log, .6);
				ctx.beginPath();
				ctx.moveTo(lx - R - 5, ly);
				ctx.lineTo(lx - R + 5, ly);
				ctx.moveTo(lx + R - 5, ly);
				ctx.lineTo(lx + R + 5, ly);
				ctx.moveTo(lx, ly - R - 5);
				ctx.lineTo(lx, ly - R + 5);
				ctx.moveTo(lx, ly + R - 5);
				ctx.lineTo(lx, ly + R + 5);
				ctx.stroke();
			}
		};
	};
}
function proofSearch(opts) {
	const speed = opts.speed ?? 1;
	const LEVELS = 3;
	const INT = "∧∨→";
	return () => {
		let nodes = [];
		let edges = [];
		let W = 0;
		let H = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
				nodes = [];
				edges = [];
				const xPad = 22;
				const yPad = Math.max(18, h * .09);
				for (let lv = 0; lv <= LEVELS; lv++) {
					const n = 1 << lv;
					for (let i = 0; i < n; i++) {
						const isLeaf = lv === LEVELS;
						const isSol = isLeaf && i === n - 1;
						nodes.push({
							x: xPad + (w - 2 * xPad) * lv / LEVELS,
							y: yPad + (h - 2 * yPad) * ((i + .5) / n),
							lv,
							g: lv === 0 ? "⊢" : isSol ? "∎" : isLeaf ? "⊥" : INT[(lv * 5 + i * 3) % 3]
						});
					}
				}
				let k = 0;
				const off = (lv) => (1 << lv) - 1;
				const walk = (lv, i) => {
					if (lv === LEVELS) return;
					for (let c = 0; c < 2; c++) {
						const ci = i * 2 + c;
						edges.push({
							a: off(lv) + i,
							b: off(lv + 1) + ci,
							k: k++,
							onPath: i === (1 << lv) - 1 && ci === (1 << lv + 1) - 1,
							leafEnd: lv + 1 === LEVELS
						});
						walk(lv + 1, ci);
					}
				};
				walk(0, 0);
			},
			frame(ctx, env) {
				const { t, palette, pointer, still } = env;
				const base = tone(palette, opts.tint);
				const ok = tone(palette, opts.ok);
				const bad = tone(palette, opts.bad);
				const eDur = .42 / speed;
				const nE = edges.length;
				const tAll = nE * eDur;
				const total = tAll + 2.4;
				const tau = still ? tAll + .6 : t % total;
				const holding = tau >= tAll;
				const proven = holding ? smoothstep(0, .4, tau - tAll) : 0;
				const dxk = (pointer.x - .5) * (pointer.active ? 16 : 6);
				const dyk = (pointer.y - .5) * (pointer.active ? 12 : 4);
				const nx = (n) => n.x + dxk * (n.lv / LEVELS);
				const ny = (n) => n.y + dyk * (n.lv / LEVELS);
				ctx.lineWidth = 1;
				for (const e of edges) {
					const A = nodes[e.a];
					const B = nodes[e.b];
					const t0 = e.k * eDur;
					const prog = clamp$1((tau - t0) / eDur, 0, 1);
					const ax = nx(A);
					const ay = ny(A);
					const bx = nx(B);
					const by = ny(B);
					ctx.strokeStyle = oklcha(palette.dim, .14);
					ctx.beginPath();
					ctx.moveTo(ax, ay);
					ctx.lineTo(bx, by);
					ctx.stroke();
					if (prog <= 0) continue;
					if (e.onPath && proven > 0) glow$1(ctx, oklcha(ok, .8), 8, () => {
						ctx.strokeStyle = oklcha(ok, .9 * proven);
						ctx.lineWidth = 1.6;
						ctx.beginPath();
						ctx.moveTo(ax, ay);
						ctx.lineTo(bx, by);
						ctx.stroke();
						ctx.lineWidth = 1;
					});
					else {
						ctx.strokeStyle = oklcha(base, e.onPath ? .5 : .26);
						ctx.beginPath();
						ctx.moveTo(ax, ay);
						ctx.lineTo(ax + (bx - ax) * prog, ay + (by - ay) * prog);
						ctx.stroke();
					}
					if (e.leafEnd && !e.onPath) {
						const since = tau - (t0 + eDur);
						if (since > 0 && since < .6) {
							const f = 1 - since / .6;
							glow$1(ctx, oklcha(bad, .8), 8, () => {
								ctx.fillStyle = oklcha(bad, f * .95);
								ctx.font = "11px \"JetBrains Mono\", monospace";
								ctx.textAlign = "center";
								ctx.textBaseline = "middle";
								ctx.fillText("✗", bx + 9, by);
							});
						}
					}
				}
				ctx.font = "12px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (const n of nodes) {
					const x = nx(n);
					const y = ny(n);
					const isSol = n.g === "∎";
					const near = pointer.active ? smoothstep(60, 0, Math.hypot(x - pointer.x * W, y - pointer.y * H)) : 0;
					const a = clamp$1(.45 + near * .5 + (isSol ? proven * .55 : 0), 0, 1);
					if (isSol && proven > 0) {
						glow$1(ctx, oklcha(ok, .9), 12, () => {
							ctx.fillStyle = oklcha(ok, a);
							ctx.fillText(n.g, x, y);
						});
						const rr = (tau - tAll) % 1.2 * 26;
						ctx.strokeStyle = oklcha(ok, clamp$1(.5 - rr / 60, 0, 1));
						ctx.beginPath();
						ctx.arc(x, y, 6 + rr, 0, TAU$1);
						ctx.stroke();
					} else {
						ctx.fillStyle = oklcha(mix(palette.dim, base, .5 + near * .5), a);
						ctx.fillText(n.g, x, y);
					}
				}
				if (!holding && !still) {
					const k = Math.min(nE - 1, Math.floor(tau / eDur));
					const e = edges[k];
					const prog = clamp$1((tau - k * eDur) / eDur, 0, 1);
					const A = nodes[e.a];
					const B = nodes[e.b];
					const x = nx(A) + (nx(B) - nx(A)) * prog;
					const y = ny(A) + (ny(B) - ny(A)) * prog;
					glow$1(ctx, oklcha(base, .9), 10, () => {
						ctx.fillStyle = oklcha(base, .95);
						ctx.beginPath();
						ctx.arc(x, y, 2.6, 0, TAU$1);
						ctx.fill();
					});
				}
			}
		};
	};
}
function shipGate(opts) {
	const GLYPHS = "≈∑αβ∆πΩµ√≠";
	const speed = opts.speed ?? 1;
	const N = 16;
	return () => {
		let W = 0;
		let H = 0;
		const agents = [];
		const r = rng(3301);
		let gp = 0;
		const respawn = (a, offscreen) => {
			a.x = offscreen ? -14 - r() * 120 : r() * W * .5;
			a.y = (.12 + r() * .76) * H;
			a.vx = 46 + r() * 42;
			a.vy = 0;
			a.ph = r() * TAU$1;
			a.gi = Math.floor(r() * 10);
			a.ok = r() < .7;
			a.st = 0;
			a.fl = 0;
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				if (agents.length === 0) for (let i = 0; i < N; i++) {
					const a = {
						x: 0,
						y: 0,
						vx: 0,
						vy: 0,
						ph: 0,
						gi: 0,
						ok: true,
						st: 0,
						fl: 0
					};
					respawn(a, false);
					agents.push(a);
				}
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const okc = tone(palette, opts.ok);
				const bad = tone(palette, opts.bad);
				const gx = W * .62;
				gp *= Math.exp(-dt * 3.2);
				ctx.font = "14px \"JetBrains Mono\", monospace";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (const a of agents) {
					if (!still) if (a.st === 0) {
						const ty = pointer.active ? pointer.y * H : a.y;
						a.y += ((ty - a.y) * 1.6 + Math.cos(t * 1.4 + a.ph) * 18) * dt;
						a.x += a.vx * speed * (hover ? 1.45 : 1) * dt;
						if (a.x >= gx) {
							a.st = a.ok ? 1 : 2;
							a.fl = 1;
							gp = 1;
							if (!a.ok) a.vy = -70;
						}
					} else if (a.st === 1) {
						a.x += a.vx * 1.25 * speed * dt;
						a.fl *= Math.exp(-dt * 2.2);
						if (a.x > W + 24) respawn(a, true);
					} else {
						a.vy += 780 * dt;
						a.y += a.vy * dt;
						a.x += a.vx * .18 * dt;
						a.fl *= Math.exp(-dt * 1.4);
						if (a.y > H + 24) respawn(a, true);
					}
					const g = GLYPHS[a.gi];
					if (a.st === 0) {
						ctx.fillStyle = oklcha(mix(palette.dim, base, .7), .85);
						ctx.fillText(g, a.x, a.y);
						ctx.strokeStyle = oklcha(base, .25);
						ctx.beginPath();
						ctx.moveTo(a.x - 22, a.y);
						ctx.lineTo(a.x - 9, a.y);
						ctx.stroke();
					} else if (a.st === 1) {
						glow$1(ctx, oklcha(okc, .7), a.fl * 10, () => {
							ctx.fillStyle = oklcha(okc, .95);
							ctx.fillText(g, a.x, a.y);
						});
						ctx.strokeStyle = oklcha(okc, .55);
						ctx.strokeRect(a.x - 8, a.y - 9, 16, 18);
						if (a.fl > .04) {
							const rr = (1 - a.fl) * 22;
							ctx.strokeStyle = oklcha(okc, a.fl * .8);
							ctx.beginPath();
							ctx.arc(a.x, a.y, 10 + rr, 0, TAU$1);
							ctx.stroke();
							ctx.fillStyle = oklcha(okc, a.fl);
							ctx.fillText("✓", a.x + 14, a.y - 12);
						}
					} else {
						ctx.fillStyle = oklcha(bad, clamp$1(.25 + a.fl * .75, 0, 1));
						ctx.fillText(g, a.x, a.y);
						if (a.fl > .4) {
							ctx.fillStyle = oklcha(bad, a.fl);
							ctx.fillText("✗", a.x + 12, a.y - 12);
						}
					}
				}
				glow$1(ctx, oklcha(base, .8), 6 + gp * 14, () => {
					ctx.strokeStyle = oklcha(mix(base, okc, gp), .5 + gp * .5);
					ctx.lineWidth = 1.4;
					ctx.beginPath();
					ctx.moveTo(gx, 6);
					ctx.lineTo(gx, H - 6);
					ctx.stroke();
					ctx.lineWidth = 1;
				});
				ctx.fillStyle = oklcha(base, .5);
				ctx.font = "9px \"JetBrains Mono\", monospace";
				for (let y = 14; y < H - 8; y += 26) ctx.fillText("›", gx + 6, y);
			}
		};
	};
}
function asciiFlow(opts) {
	const RAMP = " ··:-=>≫";
	const cell = opts.cell ?? 15;
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let cols = 0;
		let rows = 0;
		let cw = cell;
		let chh = cell;
		const comets = [];
		const flashes = [];
		const r = rng(opts.seed ?? 97);
		const respawn = (c, offscreen) => {
			c.x = offscreen ? -30 - r() * W * 1.6 : r() * W;
			c.y = (.16 + r() * .68) * H;
			c.sp = 90 + r() * 70;
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				cols = Math.max(1, Math.floor(w / cell));
				rows = Math.max(1, Math.floor(h / cell));
				cw = w / cols;
				chh = h / rows;
				if (comets.length === 0) {
					for (let i = 0; i < 2; i++) {
						const c = {
							x: 0,
							y: 0,
							sp: 0
						};
						respawn(c, i > 0);
						comets.push(c);
					}
					for (let i = 0; i < 4; i++) flashes.push({
						on: false,
						x: 0,
						y: 0,
						age: 0
					});
				}
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const hot = tone(palette, opts.hot);
				const okc = tone(palette, opts.ok);
				const tempo = (hover ? 1.35 : 1) * speed;
				const ft = still ? .8 : t * tempo;
				const px = pointer.x * W;
				const py = pointer.y * H;
				ctx.font = `${(Math.min(cw, chh) * .92).toFixed(1)}px "JetBrains Mono", monospace`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (let rw = 0; rw < rows; rw++) for (let c = 0; c < cols; c++) {
					const x = (c + .5) * cw;
					const y = (rw + .5) * chh;
					const v = field(c * .32 - ft * 1.1, rw * .55, ft * .25) * .5 + .5;
					const gust = .5 + .5 * Math.sin(c * .55 - ft * 2.4 + rw * .9);
					const near = pointer.active ? smoothstep(90, 0, Math.hypot(x - px, y - py)) : 0;
					const i = clamp$1(v * .5 + gust * gust * .42 + near * .6, 0, 1);
					let gi = Math.floor(i * 7);
					if (near > .55) gi = 7;
					const g = RAMP[gi];
					if (g === " ") continue;
					ctx.fillStyle = oklcha(i > .85 ? mix(base, hot, (i - .85) / .15) : mix(palette.dim, base, i), .07 + i * .3 + near * .2);
					ctx.fillText(g, x, y);
				}
				for (const c of comets) {
					if (!still) {
						c.x += c.sp * tempo * dt;
						if (c.x > W - 14) {
							const fl = flashes.find((f) => !f.on);
							if (fl) {
								fl.on = true;
								fl.x = W - 16;
								fl.y = c.y;
								fl.age = 0;
							}
							respawn(c, true);
						}
					}
					if (c.x < -20) continue;
					const trail = c.sp * .22;
					ctx.strokeStyle = oklcha(hot, .35);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(c.x - trail, c.y);
					ctx.lineTo(c.x - 3, c.y);
					ctx.stroke();
					glow$1(ctx, oklcha(hot, .7), 6, () => {
						ctx.fillStyle = oklcha(hot, .85);
						ctx.beginPath();
						ctx.arc(c.x, c.y, 1.8, 0, TAU$1);
						ctx.fill();
					});
				}
				ctx.font = "11px \"JetBrains Mono\", monospace";
				for (const fl of flashes) {
					if (!fl.on) continue;
					if (!still) fl.age += dt;
					const life = 1.1;
					if (fl.age > life) {
						fl.on = false;
						continue;
					}
					const p = fl.age / life;
					ctx.fillStyle = oklcha(okc, (p < .2 ? p / .2 : 1 - (p - .2) / .8) * .8);
					ctx.fillText("✓", fl.x, fl.y - p * 6);
				}
			}
		};
	};
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
/**
* The generative engines behind the domain panels — one bespoke visual per
* field, each with its own vibrant two-tone palette so the section reads as a
* spectrum rather than a single accent. All are mouse-reactive and autoplay,
* draw in CSS pixels (the hook has scaled the context for DPR), and avoid
* per-frame allocation.
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
function asciiScan(opts) {
	const ramp = opts.ramp ?? " ·:-=+*#⊨✓";
	const cell = opts.cell ?? 13;
	const speed = opts.speed ?? .5;
	const scale = .06;
	return () => {
		let cols = 0;
		let rows = 0;
		let cw = cell;
		let ch = cell;
		let fontPx = cell;
		return {
			resize(w, h) {
				cols = Math.max(1, Math.floor(w / cell));
				rows = Math.max(1, Math.floor(h / cell));
				cw = w / cols;
				ch = h / rows;
				fontPx = Math.min(cw, ch) * 1.04;
			},
			frame(ctx, env) {
				const { t, palette, pointer, hover, still, w } = env;
				const base = tone(palette, opts.tint);
				const ok = tone(palette, opts.verified);
				const bad = opts.alert ? tone(palette, opts.alert) : null;
				ctx.font = `${fontPx.toFixed(1)}px "JetBrains Mono", monospace`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const sxN = t * .22 % 1.7;
				const sx = sxN * w;
				const fx = pointer.active ? pointer.x : .5;
				const fy = pointer.active ? pointer.y : .5;
				for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
					let v = field(c * cw * scale, r * ch * scale, still ? 1.2 : t * speed);
					v = v * .5 + .5;
					const cx = (c + .5) * cw;
					const scanD = Math.abs(cx - sx);
					const scanned = smoothstep(cell * 3.4, 0, scanD);
					if (bad && ((c * 92821 ^ r * 68917) & 2147483647) % 37 === 0) {
						const fresh = sx > cx ? clamp(1 - (sx - cx) / (w * .55), 0, 1) : 0;
						if (fresh > .03) {
							const drawX = () => {
								ctx.fillStyle = oklcha(bad, .3 + fresh * .7);
								ctx.fillText("✗", cx, (r + .5) * ch);
							};
							if (fresh > .75) glow(ctx, oklcha(bad, .9), 8, drawX);
							else drawX();
							continue;
						}
					}
					const nx = c / cols;
					const ny = r / rows;
					const focus = smoothstep(.4, 0, Math.hypot(nx - fx, ny - fy)) * (pointer.active ? .85 : 0);
					let i = clamp(v * .7 + focus + scanned * .55, 0, 1);
					let gi = Math.floor(i * (ramp.length - 1));
					if (scanned > .55) gi = ramp.length - 1;
					const g = ramp[gi];
					if (g === " ") continue;
					ctx.fillStyle = oklcha(scanned > .15 ? mix(base, ok, scanned) : mix(palette.dim, base, i), clamp(.16 + i * .66 + scanned * .3, 0, 1));
					ctx.fillText(g, cx, (r + .5) * ch);
				}
				if (sxN <= 1 && !still) {
					ctx.strokeStyle = oklcha(ok, .5);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(sx, 0);
					ctx.lineTo(sx, env.h);
					ctx.stroke();
				}
			}
		};
	};
}
function ecgWave(u) {
	const bump = (c, w) => Math.exp(-((u - c) ** 2) / (2 * w * w));
	return bump(.14, .03) * .18 - bump(.19, .012) * .22 + bump(.215, .011) * 1 - bump(.245, .014) * .34 + bump(.38, .05) * .3;
}
function ecgMonitor(opts) {
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
			},
			frame(ctx, env) {
				const { t, palette, pointer, hover, still } = env;
				const col = tone(palette, opts.tint);
				const warn = opts.alert ? tone(palette, opts.alert) : col;
				const y0 = H * .58;
				const amp = H * .3;
				const beats = 2.3;
				const rate = (pointer.active ? .6 + pointer.x * 1.7 : hover ? 1.6 : 1) * speed * .5;
				const step = 2;
				const glowCol = oklcha(col, .9);
				const grid = Math.max(12, Math.round(H / 14));
				ctx.lineWidth = 1;
				for (let x = 0; x <= W; x += grid) {
					ctx.strokeStyle = oklcha(col, x / grid % 5 === 0 ? .1 : .04);
					ctx.beginPath();
					ctx.moveTo(x + .5, 0);
					ctx.lineTo(x + .5, H);
					ctx.stroke();
				}
				for (let y = 0; y <= H; y += grid) {
					ctx.strokeStyle = oklcha(col, y / grid % 5 === 0 ? .1 : .04);
					ctx.beginPath();
					ctx.moveTo(0, y + .5);
					ctx.lineTo(W, y + .5);
					ctx.stroke();
				}
				const phaseOf = (x) => x / W * beats + (still ? .2 : t * rate);
				const ampMul = (bi) => (bi % 7 + 7) % 7 === 3 ? 1.5 : 1;
				const sampleY = (x) => {
					const ph = phaseOf(x);
					const u = ph - Math.floor(ph);
					const jitter = field(x * .02, 0, t * 2) * .02;
					return y0 - amp * ampMul(Math.floor(ph)) * (ecgWave(u) + jitter);
				};
				ctx.strokeStyle = oklcha(col, .12);
				ctx.beginPath();
				ctx.moveTo(0, y0);
				ctx.lineTo(W, y0);
				ctx.stroke();
				const envTop = y0 - amp * 1.12;
				const envBot = y0 + amp * .3;
				ctx.fillStyle = oklcha(warn, .05);
				ctx.fillRect(0, envTop, W, envBot - envTop);
				ctx.setLineDash([4, 5]);
				ctx.strokeStyle = oklcha(warn, .5);
				ctx.beginPath();
				ctx.moveTo(0, envTop);
				ctx.lineTo(W, envTop);
				ctx.moveTo(0, envBot);
				ctx.lineTo(W, envBot);
				ctx.stroke();
				ctx.setLineDash([]);
				glow(ctx, glowCol, 10, () => {
					ctx.strokeStyle = oklcha(col, .85);
					ctx.lineWidth = 1.7;
					ctx.beginPath();
					for (let x = 0; x <= W; x += step) {
						const y = sampleY(x);
						if (x === 0) ctx.moveTo(x, y);
						else ctx.lineTo(x, y);
					}
					ctx.stroke();
				});
				let minY = Infinity;
				let minX = 0;
				ctx.strokeStyle = oklcha(warn, .95);
				ctx.lineWidth = 1.9;
				ctx.beginPath();
				let pen = false;
				for (let x = 0; x <= W; x += step) {
					const y = sampleY(x);
					if (y < minY) {
						minY = y;
						minX = x;
					}
					if (y < envTop) if (!pen) {
						ctx.moveTo(x, y);
						pen = true;
					} else ctx.lineTo(x, y);
					else pen = false;
				}
				ctx.stroke();
				ctx.lineWidth = 1;
				if (minY < envTop - 2) {
					ctx.font = "10px \"JetBrains Mono\", monospace";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					glow(ctx, oklcha(warn, .9), 8, () => {
						ctx.fillStyle = oklcha(warn, 1);
						ctx.fillText("✗", minX, Math.max(8, minY - 10));
					});
				}
				if (!still) {
					const y = sampleY(W - 1);
					glow(ctx, glowCol, 14, () => {
						ctx.fillStyle = oklcha(col, 1);
						ctx.beginPath();
						ctx.arc(W - 3, y, 3, 0, TAU);
						ctx.fill();
					});
				}
				if (pointer.active) {
					const px = pointer.x * W;
					ctx.strokeStyle = oklcha(col, .3);
					ctx.setLineDash([2, 4]);
					ctx.beginPath();
					ctx.moveTo(px, 0);
					ctx.lineTo(px, H);
					ctx.stroke();
					ctx.setLineDash([]);
					const y = sampleY(px);
					ctx.fillStyle = oklcha(col, .9);
					ctx.beginPath();
					ctx.arc(px, y, 2.4, 0, TAU);
					ctx.fill();
				}
			}
		};
	};
}
function dnaHelix(opts) {
	const speed = opts.speed ?? 1;
	const LETTERS = [
		"A",
		"T",
		"C",
		"G"
	];
	const COMP = [
		"T",
		"A",
		"G",
		"C"
	];
	return () => {
		let W = 0;
		let H = 0;
		return {
			resize(w, h) {
				W = w;
				H = h;
			},
			frame(ctx, env) {
				const { t, palette, pointer, hover, still } = env;
				const midY = H / 2;
				const amp = H * .3;
				const k = Math.PI * 2 * 2.2 / W;
				const spin = (still ? .6 : t) * speed * 1.4 * (hover ? 1.5 : 1);
				const strandCol = tone(palette, opts.strand);
				const cA = tone(palette, opts.pairA);
				const cB = tone(palette, opts.pairB);
				const flag = opts.flag ? tone(palette, opts.flag) : cB;
				const px = pointer.x * W;
				const unzip = (x) => pointer.active ? smoothstep(120, 24, Math.abs(x - px)) : 0;
				const gap = amp * .85;
				const yRaw = (x, off) => midY + amp * Math.sin(x * k + spin + off);
				const yOf = (x, off) => {
					const u = unzip(x);
					const target = off === 0 ? midY - gap : midY + gap;
					return yRaw(x, off) * (1 - u) + target * u;
				};
				const depthOf = (x, off) => Math.cos(x * k + spin + off);
				for (const off of [0, Math.PI]) {
					ctx.beginPath();
					for (let x = 0; x <= W; x += 4) {
						const y = yOf(x, off);
						if (x === 0) ctx.moveTo(x, y);
						else ctx.lineTo(x, y);
					}
					ctx.strokeStyle = oklcha(strandCol, .55);
					ctx.lineWidth = 1.6;
					ctx.stroke();
				}
				const rungGap = 16;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (let x = rungGap / 2; x < W; x += rungGap) {
					const u = unzip(x);
					const y1 = yOf(x, 0);
					const y2 = yOf(x, Math.PI);
					const d1 = depthOf(x, 0);
					const pi = Math.floor(x / rungGap);
					const bi = (pi ^ pi >> 2) % 4;
					const mut = pi % 11 === 4;
					const pairCol = mut ? flag : pi % 2 === 0 ? cA : cB;
					const front = (d1 + 1) / 2;
					if (u < .5) {
						ctx.strokeStyle = oklcha(pairCol, (.25 + front * .55) * (1 - u));
						ctx.lineWidth = 1 + front * 1.4;
						ctx.beginPath();
						ctx.moveTo(x, y1);
						ctx.lineTo(x, y2);
						ctx.stroke();
					} else {
						const stub = 7;
						ctx.strokeStyle = oklcha(pairCol, .7);
						ctx.lineWidth = 1.4;
						ctx.beginPath();
						ctx.moveTo(x, y1);
						ctx.lineTo(x, y1 + stub);
						ctx.moveTo(x, y2);
						ctx.lineTo(x, y2 - stub);
						ctx.stroke();
						const la = (u - .5) * 2;
						ctx.font = "10px \"JetBrains Mono\", monospace";
						ctx.fillStyle = oklcha(mut ? flag : pairCol, la);
						ctx.fillText(LETTERS[bi], x, y1 + stub + 8);
						ctx.fillText(COMP[bi], x, y2 - stub - 8);
					}
					for (const [y, near] of [[y1, d1 > 0], [y2, d1 <= 0]]) {
						const r = near ? 2.6 : 1.4;
						ctx.fillStyle = oklcha(strandCol, near ? .95 : .4);
						ctx.beginPath();
						ctx.arc(x, y, r, 0, TAU);
						ctx.fill();
					}
					if (mut) {
						const pl = still ? .5 : .5 + .5 * Math.sin(t * 3 + pi);
						ctx.strokeStyle = oklcha(flag, .25 + pl * .45);
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.arc(x, (y1 + y2) / 2, 4 + pl * 3, 0, TAU);
						ctx.stroke();
					}
				}
			}
		};
	};
}
function dataFlowNet(opts) {
	const density = opts.density ?? 1;
	const THREATS = 16;
	const SPARKS = 120;
	const HITS = 20;
	return () => {
		let W = 0;
		let H = 0;
		let nodes = [];
		let links = [];
		let adj = [];
		let flows = [];
		let ax = [];
		let ay = [];
		const threats = [];
		const sparks = [];
		const hits = [];
		let fwFlash = 0;
		let spawnAcc = 0;
		let seeded = false;
		let r = rng(41);
		const freeThreat = () => threats.find((t) => !t.on);
		const freeSpark = () => sparks.find((s) => !s.on);
		const freeHit = () => hits.find((h) => !h.on);
		const seed = () => {
			r = rng(41);
			const count = clamp(Math.round(W * H / 1e4 * density), 14, 32);
			nodes = [];
			for (let k = 0; k < count; k++) {
				const x = (.08 + r() * .84) * W;
				const y = (.14 + r() * .72) * H;
				nodes.push({
					x,
					y,
					vx: 0,
					vy: 0,
					hx: x,
					hy: y,
					pulse: 0
				});
			}
			ax = new Array(count).fill(0);
			ay = new Array(count).fill(0);
			links = [];
			adj = nodes.map(() => []);
			const seen = /* @__PURE__ */ new Set();
			const order = [];
			for (let i = 0; i < count; i++) {
				order.length = 0;
				for (let j = 0; j < count; j++) {
					if (j === i) continue;
					order.push([j, Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)]);
				}
				order.sort((p, q) => p[1] - q[1]);
				const take = 2 + (r() < .35 ? 1 : 0);
				for (let s = 0; s < take && s < order.length; s++) {
					const j = order[s][0];
					const key = i < j ? `${i}:${j}` : `${j}:${i}`;
					if (seen.has(key)) continue;
					seen.add(key);
					const li = links.length;
					links.push({
						a: i,
						b: j,
						rest: order[s][1]
					});
					adj[i].push(li);
					adj[j].push(li);
				}
			}
			flows = [];
			const nFlow = Math.min(links.length, Math.round(count * .9));
			for (let k = 0; k < nFlow; k++) flows.push({
				link: Math.floor(r() * links.length),
				p: r(),
				sp: .35 + r() * .5,
				dir: r() < .5 ? 1 : -1
			});
			threats.length = 0;
			for (let k = 0; k < THREATS; k++) threats.push({
				on: false,
				x: 0,
				y: 0,
				vx: 0,
				vy: 0
			});
			sparks.length = 0;
			for (let k = 0; k < SPARKS; k++) sparks.push({
				on: false,
				x: 0,
				y: 0,
				vx: 0,
				vy: 0,
				age: 0,
				life: 0
			});
			hits.length = 0;
			for (let k = 0; k < HITS; k++) hits.push({
				on: false,
				y: 0,
				age: 0
			});
			fwFlash = 0;
			spawnAcc = 0;
			seeded = true;
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				seed();
			},
			frame(ctx, env) {
				if (!seeded) seed();
				const { dt, palette, pointer, hover, still } = env;
				const edge = tone(palette, opts.tint);
				const pkt = tone(palette, opts.packet);
				const bad = tone(palette, opts.threat);
				const cx = W * .5;
				const px = pointer.x * W;
				const py = pointer.y * H;
				const step = Math.min(.033, dt);
				if (!still) {
					for (let i = 0; i < nodes.length; i++) {
						const n = nodes[i];
						let fx = (n.hx - n.x) * 3.4;
						let fy = (n.hy - n.y) * 3.4;
						if (pointer.active) {
							const dx = n.x - px;
							const dy = n.y - py;
							const d = Math.hypot(dx, dy);
							const R = 155;
							if (d < R && d > .01) {
								const f = 1 - d / R;
								const s = 2300 * f * f;
								fx += dx / d * s;
								fy += dy / d * s;
							}
						}
						for (let j = 0; j < nodes.length; j++) {
							if (j === i) continue;
							const m = nodes[j];
							const dx = n.x - m.x;
							const dy = n.y - m.y;
							const d2 = dx * dx + dy * dy;
							if (d2 < 3844 && d2 > .01) {
								const d = Math.sqrt(d2);
								const s = (1 - d / 62) * 420;
								fx += dx / d * s;
								fy += dy / d * s;
							}
						}
						ax[i] = fx;
						ay[i] = fy;
					}
					for (const L of links) {
						const a = nodes[L.a];
						const b = nodes[L.b];
						const dx = b.x - a.x;
						const dy = b.y - a.y;
						const d = Math.hypot(dx, dy) || .01;
						const f = (d - L.rest) * 9 * .5;
						const ux = dx / d;
						const uy = dy / d;
						ax[L.a] += ux * f;
						ay[L.a] += uy * f;
						ax[L.b] -= ux * f;
						ay[L.b] -= uy * f;
					}
					for (let i = 0; i < nodes.length; i++) {
						const n = nodes[i];
						n.vx = (n.vx + ax[i] * step) * .9;
						n.vy = (n.vy + ay[i] * step) * .9;
						const sp = Math.hypot(n.vx, n.vy);
						if (sp > 520) {
							n.vx = n.vx / sp * 520;
							n.vy = n.vy / sp * 520;
						}
						n.x = clamp(n.x + n.vx * step, 2, W - 2);
						n.y = clamp(n.y + n.vy * step, 2, H - 2);
						n.pulse = Math.max(0, n.pulse - step * 2.2);
					}
				}
				ctx.lineWidth = 1;
				for (const L of links) {
					const a = nodes[L.a];
					const b = nodes[L.b];
					const stretch = clamp((Math.hypot(a.x - b.x, a.y - b.y) - L.rest) / (L.rest + 1), 0, 1);
					ctx.strokeStyle = oklcha(stretch > .25 ? mix(edge, pkt, stretch) : edge, .16 + stretch * .42 + (hover ? .08 : 0));
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.stroke();
				}
				const fwA = .3 + fwFlash * .55;
				const drawFw = () => {
					ctx.setLineDash([2, 6]);
					ctx.strokeStyle = oklcha(pkt, fwA);
					ctx.lineWidth = 1 + fwFlash * 1.6;
					ctx.beginPath();
					ctx.moveTo(cx, H * .04);
					ctx.lineTo(cx, H * .96);
					ctx.stroke();
					ctx.setLineDash([]);
				};
				if (fwFlash > .05) glow(ctx, oklcha(pkt, .85), 10, drawFw);
				else drawFw();
				if (!still) fwFlash = Math.max(0, fwFlash - step * 2.4);
				for (const pk of flows) {
					const L = links[pk.link];
					if (!L) continue;
					const a = nodes[L.a];
					const b = nodes[L.b];
					if (!still) pk.p += pk.sp * step * pk.dir;
					if (pk.p >= 1 || pk.p <= 0) {
						const at = pk.p >= 1 ? L.b : L.a;
						nodes[at].pulse = 1;
						const opt = adj[at];
						const nl = opt.length ? opt[Math.floor(r() * opt.length)] : pk.link;
						pk.link = nl;
						if (links[nl].a === at) {
							pk.dir = 1;
							pk.p = 0;
						} else {
							pk.dir = -1;
							pk.p = 1;
						}
						continue;
					}
					const x = a.x + (b.x - a.x) * pk.p;
					const y = a.y + (b.y - a.y) * pk.p;
					const tp = pk.p - .14 * pk.dir;
					const txp = a.x + (b.x - a.x) * tp;
					const typ = a.y + (b.y - a.y) * tp;
					ctx.strokeStyle = oklcha(pkt, .5);
					ctx.lineWidth = 1.4;
					ctx.beginPath();
					ctx.moveTo(txp, typ);
					ctx.lineTo(x, y);
					ctx.stroke();
					ctx.fillStyle = oklcha(pkt, .95);
					ctx.beginPath();
					ctx.arc(x, y, 1.8, 0, TAU);
					ctx.fill();
				}
				for (const n of nodes) {
					const pr = 2 + n.pulse * 3.2;
					if (n.pulse > .05) glow(ctx, oklcha(pkt, .8), 8, () => {
						ctx.fillStyle = oklcha(mix(edge, pkt, n.pulse), .92);
						ctx.beginPath();
						ctx.arc(n.x, n.y, pr, 0, TAU);
						ctx.fill();
					});
					else {
						ctx.fillStyle = oklcha(edge, .75);
						ctx.beginPath();
						ctx.arc(n.x, n.y, pr, 0, TAU);
						ctx.fill();
					}
				}
				if (!still) {
					spawnAcc += step;
					const rate = hover ? .32 : .62;
					while (spawnAcc > rate) {
						spawnAcc -= rate;
						const th = freeThreat();
						if (th) {
							th.on = true;
							th.x = -10;
							th.y = (.12 + r() * .76) * H;
							const tx = W * (.72 + r() * .26);
							const ty = pointer.active ? py : (.12 + r() * .76) * H;
							const dx = tx - th.x;
							const dy = ty - th.y;
							const d = Math.hypot(dx, dy) || 1;
							const sp = 150 + r() * 120;
							th.vx = dx / d * sp;
							th.vy = dy / d * sp;
						}
					}
				}
				for (const th of threats) {
					if (!th.on) continue;
					if (!still) {
						th.x += th.vx * step;
						th.y += th.vy * step;
					}
					if (th.x >= cx) {
						th.on = false;
						fwFlash = 1;
						const hit = freeHit();
						if (hit) {
							hit.on = true;
							hit.y = th.y;
							hit.age = 0;
						}
						for (let s = 0; s < 12; s++) {
							const sk = freeSpark();
							if (!sk) break;
							const ang = r() * TAU;
							const spd = 60 + r() * 190;
							sk.on = true;
							sk.x = cx;
							sk.y = th.y;
							sk.vx = Math.cos(ang) * spd - 40;
							sk.vy = Math.sin(ang) * spd;
							sk.age = 0;
							sk.life = .35 + r() * .35;
						}
						continue;
					}
					if (th.x > W + 20 || th.y < -20 || th.y > H + 20) {
						th.on = false;
						continue;
					}
					glow(ctx, oklcha(bad, .9), 8, () => {
						ctx.strokeStyle = oklcha(bad, .9);
						ctx.lineWidth = 1.6;
						ctx.beginPath();
						ctx.moveTo(th.x - th.vx * .03, th.y - th.vy * .03);
						ctx.lineTo(th.x, th.y);
						ctx.stroke();
						ctx.fillStyle = oklcha(bad, 1);
						ctx.beginPath();
						ctx.arc(th.x, th.y, 2.2, 0, TAU);
						ctx.fill();
					});
				}
				for (const hit of hits) {
					if (!hit.on) continue;
					if (!still) hit.age += step;
					const life = .6;
					if (hit.age > life) {
						hit.on = false;
						continue;
					}
					const p = hit.age / life;
					ctx.strokeStyle = oklcha(pkt, (1 - p) * .8);
					ctx.lineWidth = 1.4;
					ctx.beginPath();
					ctx.arc(cx, hit.y, 2 + p * 16, 0, TAU);
					ctx.stroke();
				}
				for (const sk of sparks) {
					if (!sk.on) continue;
					if (!still) {
						sk.x += sk.vx * step;
						sk.y += sk.vy * step;
						sk.vx *= .92;
						sk.vy *= .92;
						sk.age += step;
					}
					if (sk.age > sk.life) {
						sk.on = false;
						continue;
					}
					const a = 1 - sk.age / sk.life;
					ctx.fillStyle = oklcha(bad, a);
					ctx.beginPath();
					ctx.arc(sk.x, sk.y, 1.6 * a + .5, 0, TAU);
					ctx.fill();
				}
				if (pointer.active && !still) {
					ctx.strokeStyle = oklcha(pkt, .22);
					ctx.setLineDash([2, 5]);
					ctx.beginPath();
					ctx.arc(px, py, 26, 0, TAU);
					ctx.stroke();
					ctx.setLineDash([]);
				}
			}
		};
	};
}
function candlestick(opts) {
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let candles = [];
		let n = 0;
		let last = 50;
		let r = rng(3);
		let lastT = 0;
		let seeded = false;
		const next = () => {
			const o = last;
			const c = clamp(o + (r() - .48) * 9, 8, 92);
			const h = Math.max(o, c) + r() * 5;
			const l = Math.min(o, c) - r() * 5;
			last = c;
			return {
				o,
				h,
				l,
				c,
				v: .25 + r() * .75
			};
		};
		const seed = () => {
			r = rng(3);
			last = 50;
			n = clamp(Math.floor(W / 13), 6, 40);
			candles = [];
			for (let i = 0; i < n + 1; i++) candles.push(next());
			seeded = true;
			lastT = 0;
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				seed();
			},
			frame(ctx, env) {
				if (!seeded) seed();
				const { t, palette, pointer, hover, still } = env;
				const up = tone(palette, opts.up);
				const down = tone(palette, opts.down);
				const lim = tone(palette, opts.limit);
				const interval = (hover ? .5 : .85) / speed;
				if (lastT === 0) lastT = t;
				let guard = 0;
				while (!still && t - lastT > interval && guard++ < 4) {
					candles.shift();
					candles.push(next());
					lastT += interval;
				}
				const frac = still ? 0 : clamp((t - lastT) / interval, 0, 1);
				let min = Infinity;
				let max = -Infinity;
				for (const cd of candles) {
					if (cd.l < min) min = cd.l;
					if (cd.h > max) max = cd.h;
				}
				const pad = 10;
				const range = Math.max(1, max - min);
				const yOf = (p) => pad + (max - p) / range * (H - 2 * pad);
				const pitch = W / n;
				const bw = Math.max(3, pitch * .55);
				const limitP = max - range * .12;
				const ly = yOf(limitP);
				let inBreach = false;
				for (let i = Math.max(0, candles.length - 3); i < candles.length; i++) if (candles[i].h > limitP) inBreach = true;
				const drawLimit = () => {
					ctx.setLineDash([4, 5]);
					ctx.strokeStyle = oklcha(lim, inBreach ? .9 : .6);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(0, ly);
					ctx.lineTo(W, ly);
					ctx.stroke();
					ctx.setLineDash([]);
				};
				if (inBreach) glow(ctx, oklcha(lim, .8), 8, drawLimit);
				else drawLimit();
				for (let i = 0; i < candles.length; i++) {
					const cd = candles[i];
					const x = i * pitch - frac * pitch + pitch / 2;
					if (x < -bw || x > W + bw) continue;
					const bull = cd.c >= cd.o;
					const breach = cd.h > limitP;
					const col = breach ? lim : bull ? up : down;
					ctx.strokeStyle = oklcha(col, .8);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(x, yOf(cd.h));
					ctx.lineTo(x, yOf(cd.l));
					ctx.stroke();
					const yo = yOf(cd.o);
					const yc = yOf(cd.c);
					const top = Math.min(yo, yc);
					const bh = Math.max(1.5, Math.abs(yc - yo));
					const draw = () => {
						ctx.fillStyle = oklcha(col, breach ? .95 : .8);
						ctx.fillRect(x - bw / 2, top, bw, bh);
					};
					if (breach) glow(ctx, oklcha(lim, .9), 8, draw);
					else draw();
					if (breach) {
						ctx.font = "10px \"JetBrains Mono\", monospace";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						ctx.fillStyle = oklcha(lim, .95);
						ctx.fillText("✗", x, yOf(cd.h) - 9);
					}
					const vh = cd.v * H * .1;
					ctx.fillStyle = oklcha(bull ? up : down, .3);
					ctx.fillRect(x - bw / 2, H - 3 - vh, bw, vh);
				}
				ctx.strokeStyle = oklcha(palette.dim, .55);
				ctx.lineWidth = 1.2;
				ctx.beginPath();
				let started = false;
				for (let i = 4; i < candles.length; i++) {
					let sum = 0;
					for (let j = i - 4; j <= i; j++) sum += candles[j].c;
					const x = i * pitch - frac * pitch + pitch / 2;
					const y = yOf(sum / 5);
					if (!started) {
						ctx.moveTo(x, y);
						started = true;
					} else ctx.lineTo(x, y);
				}
				ctx.stroke();
				if (pointer.active) {
					const hi = Math.round((pointer.x * W + frac * pitch) / pitch - .5);
					if (hi >= 0 && hi < candles.length) {
						const cd = candles[hi];
						const x = hi * pitch - frac * pitch + pitch / 2;
						const yT = yOf(cd.h) - 5;
						const yB = yOf(cd.l) + 5;
						ctx.strokeStyle = oklcha(lim, .75);
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(x - bw, yT);
						ctx.lineTo(x + bw, yT);
						ctx.moveTo(x - bw, yB);
						ctx.lineTo(x + bw, yB);
						ctx.stroke();
					}
					ctx.strokeStyle = oklcha(palette.dim, .4);
					ctx.setLineDash([2, 4]);
					ctx.beginPath();
					ctx.moveTo(pointer.x * W, 0);
					ctx.lineTo(pointer.x * W, H);
					ctx.moveTo(0, pointer.y * H);
					ctx.lineTo(W, pointer.y * H);
					ctx.stroke();
					ctx.setLineDash([]);
				}
			}
		};
	};
}
function citationArcs(opts) {
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let left = [];
		let right = [];
		let leftLabels = [];
		let rightLabels = [];
		let arcs = [];
		let seeded = false;
		const seed = () => {
			const r = rng(11);
			const nSide = 6;
			left = [];
			right = [];
			leftLabels = [];
			rightLabels = [];
			for (let i = 0; i < nSide; i++) {
				left.push(H * (.12 + .76 * i / (nSide - 1)));
				right.push(H * (.12 + .76 * i / (nSide - 1)));
				leftLabels.push(`§ ${i + 2}.${1 + i * 7 % 9}`);
				rightLabels.push(`art. ${i + 4}(${1 + i % 4})`);
			}
			arcs = [];
			for (let i = 0; i < 11; i++) arcs.push({
				a: Math.floor(r() * nSide),
				b: Math.floor(r() * nSide),
				phase: r(),
				dur: 2.2 + r() * 2.5,
				conflict: r() < .24
			});
			seeded = true;
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				seed();
			},
			frame(ctx, env) {
				if (!seeded) seed();
				const { dt, palette, pointer, hover, still } = env;
				const base = tone(palette, opts.tint);
				const acc = tone(palette, opts.accent);
				const bad = opts.conflict ? tone(palette, opts.conflict) : acc;
				const lx = W * .16;
				const rx = W * .84;
				const px = pointer.x * W;
				const py = pointer.y * H;
				let hlSide = -1;
				let hlIdx = -1;
				if (pointer.active) {
					let bd = 52;
					for (let i = 0; i < left.length; i++) {
						const d = Math.hypot(px - lx, py - left[i]);
						if (d < bd) {
							bd = d;
							hlSide = 0;
							hlIdx = i;
						}
					}
					for (let i = 0; i < right.length; i++) {
						const d = Math.hypot(px - rx, py - right[i]);
						if (d < bd) {
							bd = d;
							hlSide = 1;
							hlIdx = i;
						}
					}
				}
				const anyHl = hlIdx >= 0;
				ctx.font = "9px \"JetBrains Mono\", monospace";
				ctx.textBaseline = "middle";
				for (let i = 0; i < left.length; i++) {
					const y = left[i];
					const hl = hlSide === 0 && hlIdx === i;
					ctx.strokeStyle = oklcha(base, hl ? .9 : .4);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(lx - 8, y);
					ctx.lineTo(lx, y);
					ctx.stroke();
					ctx.fillStyle = oklcha(base, hl ? 1 : .7);
					ctx.beginPath();
					ctx.arc(lx, y, hl ? 3 : 2, 0, TAU);
					ctx.fill();
					ctx.textAlign = "right";
					ctx.fillStyle = oklcha(base, hl ? .95 : .45);
					ctx.fillText(leftLabels[i], lx - 12, y);
				}
				for (let i = 0; i < right.length; i++) {
					const y = right[i];
					const hl = hlSide === 1 && hlIdx === i;
					ctx.strokeStyle = oklcha(base, hl ? .9 : .4);
					ctx.beginPath();
					ctx.moveTo(rx, y);
					ctx.lineTo(rx + 8, y);
					ctx.stroke();
					ctx.fillStyle = oklcha(base, hl ? 1 : .7);
					ctx.beginPath();
					ctx.arc(rx, y, hl ? 3 : 2, 0, TAU);
					ctx.fill();
					ctx.textAlign = "left";
					ctx.fillStyle = oklcha(base, hl ? .95 : .45);
					ctx.fillText(rightLabels[i], rx + 12, y);
				}
				const bez = (u, p0, p1, p2) => (1 - u) * (1 - u) * p0 + 2 * (1 - u) * u * p1 + u * u * p2;
				ctx.textAlign = "center";
				for (const arc of arcs) {
					if (!still) arc.phase += dt / arc.dur * speed;
					const u = arc.phase % 1;
					const y1 = left[arc.a];
					const y2 = right[arc.b];
					const cx = W * .5 + (still ? 0 : Math.sin(arc.phase) * 12);
					const cyc = (y1 + y2) / 2 + (y1 - y2) * .15;
					const col = arc.conflict ? bad : acc;
					const touched = hlSide === 0 && arc.a === hlIdx || hlSide === 1 && arc.b === hlIdx;
					const baseA = anyHl ? touched ? .55 : .05 : .14;
					ctx.strokeStyle = oklcha(arc.conflict ? bad : base, baseA);
					ctx.lineWidth = touched ? 1.4 : 1;
					if (arc.conflict) ctx.setLineDash([3, 4]);
					ctx.beginPath();
					ctx.moveTo(lx, y1);
					ctx.quadraticCurveTo(cx, cyc, rx, y2);
					ctx.stroke();
					ctx.setLineDash([]);
					ctx.lineWidth = 1;
					const steps = 6;
					for (let s = 0; s < steps; s++) {
						const uu = u - s * .02;
						if (uu < 0 || uu > 1) continue;
						const x = bez(uu, lx, cx, rx);
						const y = bez(uu, y1, cyc, y2);
						ctx.fillStyle = oklcha(col, (1 - s / steps) * (.5 + (hover ? .3 : 0) + (touched ? .2 : 0)));
						ctx.beginPath();
						ctx.arc(x, y, 1.8 - s * .15, 0, TAU);
						ctx.fill();
					}
					if (u > .96) if (arc.conflict) {
						ctx.font = "10px \"JetBrains Mono\", monospace";
						ctx.fillStyle = oklcha(bad, 1);
						ctx.fillText("✗", rx - 9, y2 - 9);
						ctx.font = "9px \"JetBrains Mono\", monospace";
					} else glow(ctx, oklcha(acc, .9), 8, () => {
						ctx.fillStyle = oklcha(acc, 1);
						ctx.beginPath();
						ctx.arc(rx, y2, 3, 0, TAU);
						ctx.fill();
					});
				}
			}
		};
	};
}
function redactionRain(opts) {
	const cell = opts.cell ?? 14;
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let cols = 0;
		let rows = 0;
		let heads = [];
		let spd = [];
		let fontPx = cell;
		const seed = () => {
			const r = rng(23);
			cols = Math.max(1, Math.floor(W / cell));
			rows = Math.max(1, Math.floor(H / cell));
			fontPx = cell * .92;
			heads = [];
			spd = [];
			for (let c = 0; c < cols; c++) {
				heads.push(-r() * rows);
				spd.push(4 + r() * 6);
			}
		};
		const hash = (c, row) => (c * 73856093 ^ row * 19349663) >>> 0;
		const HEXSET = "a7f39ce04b81d265";
		return {
			resize(w, h) {
				W = w;
				H = h;
				seed();
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, still } = env;
				const green = tone(palette, opts.tint);
				const mask = tone(palette, opts.mask);
				ctx.font = `${fontPx.toFixed(1)}px "JetBrains Mono", monospace`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const cw = W / cols;
				const ch = H / rows;
				const trail = 9;
				const px = pointer.x * W;
				const py = pointer.y * H;
				for (let c = 0; c < cols; c++) {
					if (!still) {
						heads[c] += spd[c] * speed * dt;
						if (heads[c] - trail > rows) heads[c] = -2;
					} else heads[c] = c % 5 + rows * .4;
					const head = heads[c];
					for (let k = 0; k < trail; k++) {
						const row = Math.floor(head) - k;
						if (row < 0 || row >= rows) continue;
						const x = (c + .5) * cw;
						const y = (row + .5) * ch;
						const bright = 1 - k / trail;
						const redacted = hash(c, row) % 4 === 0;
						const revealed = pointer.active && Math.hypot(x - px, y - py) < 70;
						if (redacted && !revealed) {
							ctx.fillStyle = oklcha(mask, .25 + bright * .6);
							const s = cw * .62;
							ctx.fillRect(x - s / 2, y - ch * .34, s, ch * .62);
						} else if (redacted) {
							const raw = HEXSET[hash(c, row) % 16];
							const drawRaw = () => {
								ctx.fillStyle = oklcha(mask, .5 + bright * .5);
								ctx.fillText(raw, x, y);
							};
							if (k === 0) glow(ctx, oklcha(mask, .8), 6, drawRaw);
							else drawRaw();
						} else {
							const digit = (hash(c, row + Math.floor(t * 6)) & 1).toString();
							const col = k === 0 ? green : green;
							const a = k === 0 ? 1 : .15 + bright * .55;
							if (k === 0) glow(ctx, oklcha(green, .8), 6, () => {
								ctx.fillStyle = oklcha(col, 1);
								ctx.fillText(digit, x, y);
							});
							else {
								ctx.fillStyle = oklcha(col, a);
								ctx.fillText(digit, x, y);
							}
						}
					}
				}
				if (pointer.active) {
					ctx.strokeStyle = oklcha(mask, .55);
					ctx.setLineDash([3, 6]);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.arc(px, py, 70, 0, TAU);
					ctx.stroke();
					ctx.setLineDash([]);
				}
			}
		};
	};
}
function radarSweep(opts) {
	const speed = opts.speed ?? 1;
	return () => {
		let W = 0;
		let H = 0;
		let cx = 0;
		let cy = 0;
		let maxR = 0;
		let blips = [];
		const seed = () => {
			const r = rng(29);
			cx = W / 2;
			cy = H / 2;
			maxR = Math.min(W, H) * .46;
			blips = [];
			for (let i = 0; i < 9; i++) blips.push({
				r: (.25 + r() * .72) * maxR,
				ang: r() * TAU,
				drift: (r() - .5) * .14,
				flagged: r() < .3
			});
		};
		return {
			resize(w, h) {
				W = w;
				H = h;
				seed();
			},
			frame(ctx, env) {
				const { t, dt, palette, pointer, hover, still } = env;
				const green = tone(palette, opts.tint);
				const red = tone(palette, opts.flag);
				const sweep = (still ? .7 : t * (hover ? 1.5 : 1) * speed) % TAU;
				ctx.strokeStyle = oklcha(green, .18);
				ctx.lineWidth = 1;
				for (let i = 1; i <= 3; i++) {
					ctx.beginPath();
					ctx.arc(cx, cy, maxR * i / 3, 0, TAU);
					ctx.stroke();
				}
				ctx.beginPath();
				ctx.moveTo(cx - maxR, cy);
				ctx.lineTo(cx + maxR, cy);
				ctx.moveTo(cx, cy - maxR);
				ctx.lineTo(cx, cy + maxR);
				ctx.stroke();
				for (let i = 0; i < 36; i++) {
					const a = TAU * i / 36;
					const major = i % 9 === 0;
					const r1 = maxR - (major ? 9 : 4);
					ctx.strokeStyle = oklcha(green, major ? .4 : .2);
					ctx.beginPath();
					ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
					ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
					ctx.stroke();
				}
				if (!still && typeof ctx.createConicGradient === "function") {
					const g = ctx.createConicGradient(sweep - .9, cx, cy);
					g.addColorStop(0, oklcha(green, 0));
					g.addColorStop(.82, oklcha(green, 0));
					g.addColorStop(.99, oklcha(green, .28));
					g.addColorStop(1, oklcha(green, .4));
					ctx.fillStyle = g;
					ctx.beginPath();
					ctx.moveTo(cx, cy);
					ctx.arc(cx, cy, maxR, 0, TAU);
					ctx.fill();
				}
				glow(ctx, oklcha(green, .8), 8, () => {
					ctx.strokeStyle = oklcha(green, .85);
					ctx.lineWidth = 1.4;
					ctx.beginPath();
					ctx.moveTo(cx, cy);
					ctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
					ctx.stroke();
				});
				for (const b of blips) {
					if (!still) b.ang += b.drift * dt;
					let d = sweep - b.ang;
					d = (d % TAU + TAU) % TAU;
					const lit = still ? .7 : Math.exp(-d * 2.2);
					const x = cx + Math.cos(b.ang) * b.r;
					const y = cy + Math.sin(b.ang) * b.r;
					const col = b.flagged ? red : green;
					const a = .15 + lit * .85;
					if (lit > .25) glow(ctx, oklcha(col, a), b.flagged ? 12 : 7, () => {
						ctx.fillStyle = oklcha(col, a);
						ctx.beginPath();
						ctx.arc(x, y, b.flagged ? 3 : 2.2, 0, TAU);
						ctx.fill();
					});
					else {
						ctx.fillStyle = oklcha(col, a);
						ctx.beginPath();
						ctx.arc(x, y, b.flagged ? 3 : 2.2, 0, TAU);
						ctx.fill();
					}
					ctx.font = "10px \"JetBrains Mono\", monospace";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					if (b.flagged && lit > .4) {
						ctx.strokeStyle = oklcha(red, lit * .7);
						ctx.beginPath();
						ctx.arc(x, y, 5 + (1 - lit) * 6, 0, TAU);
						ctx.stroke();
						ctx.fillStyle = oklcha(red, lit);
						ctx.fillText("✗", x + 9, y - 9);
					} else if (!b.flagged && lit > .35 && lit < .95) {
						ctx.fillStyle = oklcha(green, lit * .8);
						ctx.fillText("✓", x + 8, y - 8);
					}
				}
				if (pointer.active) {
					const rpx = pointer.x * W;
					const rpy = pointer.y * H;
					ctx.strokeStyle = oklcha(green, .25);
					ctx.setLineDash([3, 5]);
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(cx, cy);
					ctx.lineTo(rpx, rpy);
					ctx.stroke();
					ctx.setLineDash([]);
					ctx.strokeStyle = oklcha(green, .6);
					ctx.beginPath();
					ctx.arc(rpx, rpy, 9, 0, TAU);
					ctx.stroke();
					let bi = -1;
					let bd = 46;
					for (let i = 0; i < blips.length; i++) {
						const bx = cx + Math.cos(blips[i].ang) * blips[i].r;
						const by = cy + Math.sin(blips[i].ang) * blips[i].r;
						const dd = Math.hypot(bx - rpx, by - rpy);
						if (dd < bd) {
							bd = dd;
							bi = i;
						}
					}
					if (bi >= 0) {
						const b = blips[bi];
						const bx = cx + Math.cos(b.ang) * b.r;
						const by = cy + Math.sin(b.ang) * b.r;
						const col = b.flagged ? red : green;
						glow(ctx, oklcha(col, .9), 8, () => {
							ctx.strokeStyle = oklcha(col, .95);
							ctx.strokeRect(bx - 8, by - 8, 16, 16);
						});
						ctx.strokeStyle = oklcha(col, .5);
						ctx.beginPath();
						ctx.moveTo(rpx, rpy);
						ctx.lineTo(bx, by);
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
var MAGENTA = t([
	.55,
	.21,
	330
], [
	.78,
	.19,
	330
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
/** One full-card live visual per Method step (01–05). */
var VISUALS = [
	tokenStream({
		tint: t([
			.56,
			.2,
			322
		], [
			.83,
			.16,
			322
		]),
		hot: MAGENTA
	}),
	ruleLattice({
		chaos: AMBER,
		ord: TEAL
	}),
	claimMorph({
		prose: INDIGO,
		logic: AMBER
	}),
	proofSearch({
		tint: AZURE,
		ok: GREEN,
		bad: RED
	}),
	shipGate({
		tint: CYAN,
		ok: GREEN,
		bad: RED
	})
];
function MethodVisual({ index }) {
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
var pipelineMake = asciiScan({
	tint: CYAN,
	verified: GREEN,
	cell: 15,
	speed: .35
});
function PipelineBackdrop() {
	const { canvasRef, pointerTargetRef } = useDomainCanvas(pipelineMake);
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
//#endregion
export { ruleLattice as _, candlestick as a, useDomainCanvas as b, dataFlowNet as c, field as d, mix as f, rng as g, redactionRain as h, asciiScan as i, dnaHelix as l, radarSweep as m, PipelineBackdrop as n, citationArcs as o, oklcha as p, asciiFlow as r, claimMorph as s, MethodVisual as t, ecgMonitor as u, smoothstep as v, tone as y };
