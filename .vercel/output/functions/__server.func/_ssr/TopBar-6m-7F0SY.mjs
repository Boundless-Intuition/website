import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as BrandMark } from "./BrandMark-BgoQf2Gt.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as track } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TopBar-6m-7F0SY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS$1 = [{
	id: "doctrine",
	label: "Doctrine"
}, {
	id: "lab",
	label: "Lab"
}];
var SAMPLE_MS = 100;
var CAP = {
	pointer: 600,
	scroll: 300,
	keys: 400,
	clicks: 120,
	timeline: 100
};
var KEY_CLASS = {
	printable: 0,
	backspace: 1,
	navigation: 2,
	modifier: 3,
	other: 4
};
var state;
var started = false;
function now() {
	return state ? Math.round(performance.now() - state.startedAt) : 0;
}
function push(buffer, value, cap) {
	if (buffer.length >= cap) return;
	buffer.push(value);
}
var INTERACTIVE = new Set([
	"A",
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"SUMMARY",
	"LABEL"
]);
/**
* A short, stable description of what was clicked. Tag plus id plus the first
* class, which is enough to aggregate a heatmap without serialising a DOM path
* that would balloon the payload.
*/
function describeTarget(el) {
	return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${el.classList.length > 0 ? `.${el.classList[0]}` : ""}`.slice(0, 80);
}
/** True when nothing about the element invites a click - the useful heatmap case. */
function isInert(el) {
	if (INTERACTIVE.has(el.tagName)) return false;
	if (el.closest("a,button,input,select,textarea,[role='button'],[onclick]")) return false;
	return true;
}
function classifyKey(key) {
	if (key === "Backspace" || key === "Delete") return KEY_CLASS.backspace;
	if (key.startsWith("Arrow") || key === "Home" || key === "End" || key === "Tab") return KEY_CLASS.navigation;
	if (key === "Shift" || key === "Control" || key === "Alt" || key === "Meta") return KEY_CLASS.modifier;
	if (key.length === 1) return KEY_CLASS.printable;
	return KEY_CLASS.other;
}
/**
* Start capturing. Idempotent, and safe to call before hydration finishes.
* Every listener is passive where it can be, so none of this can delay scroll
* or input handling.
*/
function startBehaviorCapture() {
	if (typeof window === "undefined" || started) return () => {};
	started = true;
	state = {
		startedAt: performance.now(),
		pointer: [],
		scroll: [],
		keys: [],
		clicks: [],
		timeline: [],
		subPixelHits: 0,
		pointerEvents: 0,
		untrustedEvents: 0,
		maxScrollDepth: 0,
		activeMs: 0
	};
	const s = state;
	let lastX = 0;
	let lastY = 0;
	let moved = false;
	const onPointerMove = (e) => {
		lastX = e.clientX;
		lastY = e.clientY;
		moved = true;
		s.pointerEvents += 1;
		if (!e.isTrusted) s.untrustedEvents += 1;
		if (!Number.isInteger(e.clientX) || !Number.isInteger(e.clientY)) s.subPixelHits += 1;
	};
	const sampler = window.setInterval(() => {
		if (!moved) return;
		moved = false;
		push(s.pointer, [
			Math.round(lastX),
			Math.round(lastY),
			now()
		], CAP.pointer);
	}, SAMPLE_MS);
	let lastScrollY = window.scrollY;
	let lastScrollT = performance.now();
	let lastVelocity = 0;
	const onScroll = () => {
		const t = performance.now();
		const dt = (t - lastScrollT) / 1e3;
		if (dt < .016) return;
		const velocity = (window.scrollY - lastScrollY) / dt;
		const acceleration = (velocity - lastVelocity) / dt;
		push(s.scroll, [
			Math.round(velocity),
			Math.round(acceleration),
			now()
		], CAP.scroll);
		const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
		const depth = Math.min(100, Math.round(window.scrollY / docHeight * 100));
		if (depth > s.maxScrollDepth) s.maxScrollDepth = depth;
		lastScrollY = window.scrollY;
		lastScrollT = t;
		lastVelocity = velocity;
	};
	const down = /* @__PURE__ */ new Map();
	let lastUpAt = 0;
	const onKeyDown = (e) => {
		if (!down.has(e.code)) down.set(e.code, performance.now());
	};
	const onKeyUp = (e) => {
		const pressedAt = down.get(e.code);
		if (pressedAt === void 0) return;
		down.delete(e.code);
		const t = performance.now();
		const dwell = Math.round(t - pressedAt);
		const flight = lastUpAt === 0 ? 0 : Math.round(pressedAt - lastUpAt);
		lastUpAt = t;
		push(s.keys, [
			dwell,
			flight,
			classifyKey(e.key)
		], CAP.keys);
	};
	const onClick = (e) => {
		const target = e.target;
		if (!(target instanceof Element)) return;
		push(s.clicks, {
			x: Math.round(e.clientX),
			y: Math.round(e.clientY),
			t: now(),
			target: describeTarget(target),
			trusted: e.isTrusted,
			inert: isInert(target)
		}, CAP.clicks);
	};
	const mark = (kind, detail = "") => push(s.timeline, {
		t: now(),
		kind,
		detail
	}, CAP.timeline);
	const onVisibility = () => mark(document.visibilityState === "hidden" ? "hidden" : "visible");
	const onFocus = () => mark("focus");
	const onBlur = () => mark("blur");
	mark("route", window.location.pathname);
	window.addEventListener("pointermove", onPointerMove, { passive: true });
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("keydown", onKeyDown, { passive: true });
	window.addEventListener("keyup", onKeyUp, { passive: true });
	window.addEventListener("click", onClick, {
		passive: true,
		capture: true
	});
	document.addEventListener("visibilitychange", onVisibility);
	window.addEventListener("focus", onFocus);
	window.addEventListener("blur", onBlur);
	return () => {
		window.clearInterval(sampler);
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("keydown", onKeyDown);
		window.removeEventListener("keyup", onKeyUp);
		window.removeEventListener("click", onClick, { capture: true });
		document.removeEventListener("visibilitychange", onVisibility);
		window.removeEventListener("focus", onFocus);
		window.removeEventListener("blur", onBlur);
		started = false;
	};
}
function mean(xs) {
	return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}
function stdev(xs) {
	if (xs.length < 2) return 0;
	const m = mean(xs);
	return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
}
/**
* Straightness: total path length over start-to-end distance. A person's
* pointer wanders, giving a ratio well above 1. A programmatic move from A to B
* lands very close to 1, which is one of the stronger automation tells here.
*/
function straightness(path) {
	if (path.length < 3) return 0;
	let travelled = 0;
	for (let i = 1; i < path.length; i++) travelled += Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
	const direct = Math.hypot(path[path.length - 1][0] - path[0][0], path[path.length - 1][1] - path[0][1]);
	return direct < 1 ? 0 : Number((travelled / direct).toFixed(2));
}
/** The aggregate view - what the digest carries when the raw trace is not needed. */
function summarize() {
	if (!state) return void 0;
	const s = state;
	const dwell = s.keys.map((k) => k[0]);
	const flight = s.keys.filter((k) => k[1] > 0).map((k) => k[1]);
	const velocities = s.scroll.map((v) => Math.abs(v[0]));
	const round = (n) => Number(n.toFixed(2));
	return {
		durationMs: now(),
		pointerSamples: s.pointer.length,
		pointerStraightness: straightness(s.pointer),
		subPixelRatio: s.pointerEvents === 0 ? 0 : round(s.subPixelHits / s.pointerEvents),
		untrustedEvents: s.untrustedEvents,
		scrollSamples: s.scroll.length,
		maxScrollDepth: s.maxScrollDepth,
		scrollVelocityMean: round(mean(velocities)),
		scrollVelocityStdev: round(stdev(velocities)),
		keyCount: s.keys.length,
		dwellMean: round(mean(dwell)),
		dwellStdev: round(stdev(dwell)),
		flightMean: round(mean(flight)),
		flightStdev: round(stdev(flight)),
		clickCount: s.clicks.length,
		inertClicks: s.clicks.filter((c) => c.inert).length,
		untrustedClicks: s.clicks.filter((c) => !c.trusted).length,
		routes: s.timeline.filter((e) => e.kind === "route").length
	};
}
/** The raw buffers, for the heatmap and replay-style analysis. */
function trace() {
	if (!state) return void 0;
	return {
		pointer: state.pointer,
		scroll: state.scroll,
		keys: state.keys,
		clicks: state.clicks,
		timeline: state.timeline
	};
}
var STORAGE_KEY = "bi_vid";
var HASH_VERSION = 3;
function safe$1(fn, fallback) {
	try {
		return fn();
	} catch {
		return fallback;
	}
}
/**
* Canvas raster hash. The same drawing commands rasterise differently across
* GPU, driver and font stack, which is what makes this discriminating.
*
* Drawn twice on purpose. Browsers with anti-fingerprinting on (Brave, Firefox
* RFP, Tor) inject per-call noise, so the two passes disagree - that
* disagreement is itself the useful signal, and we return "unstable" rather
* than a hash that would differ on every page load and pollute the id space.
*/
function canvasTrait() {
	return safe$1(() => {
		const draw = () => {
			const c = document.createElement("canvas");
			c.width = 240;
			c.height = 60;
			const ctx = c.getContext("2d");
			if (!ctx) return "";
			ctx.textBaseline = "top";
			ctx.font = "14px 'Arial'";
			ctx.fillStyle = "#f60";
			ctx.fillRect(0, 0, 120, 30);
			ctx.fillStyle = "#069";
			ctx.fillText("BI ✓ verification éñ中", 2, 15);
			ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
			ctx.fillText("BI ✓ verification éñ中", 4, 20);
			ctx.globalCompositeOperation = "multiply";
			ctx.beginPath();
			ctx.arc(50, 30, 20, 0, Math.PI * 2, true);
			ctx.fill();
			return c.toDataURL();
		};
		const a = draw();
		if (!a) return "none";
		return a === draw() ? a : "unstable";
	}, "error");
}
/** GPU vendor/renderer. Software renderers here are a strong headless tell. */
function webglTrait() {
	return safe$1(() => {
		const c = document.createElement("canvas");
		const gl = c.getContext("webgl2") ?? c.getContext("webgl");
		if (!gl) return {
			renderer: "none",
			params: "none"
		};
		const dbg = gl.getExtension("WEBGL_debug_renderer_info");
		const renderer = dbg ? `${String(gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL))}/${String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL))}` : "masked";
		const vert = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
		const frag = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
		return {
			renderer,
			params: [
				gl.getParameter(gl.MAX_TEXTURE_SIZE),
				gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
				gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
				gl.getParameter(gl.MAX_VARYING_VECTORS),
				vert ? `${vert.rangeMin},${vert.rangeMax},${vert.precision}` : "x",
				frag ? `${frag.rangeMin},${frag.rangeMax},${frag.precision}` : "x",
				(gl.getSupportedExtensions() ?? []).sort().join(",")
			].join("|")
		};
	}, {
		renderer: "error",
		params: "error"
	});
}
/**
* Audio stack fingerprint via OfflineAudioContext. Rendered offline so it is
* silent and needs no user gesture; the float output differs by platform audio
* implementation.
*/
async function audioTrait() {
	try {
		const Ctor = window.OfflineAudioContext ?? window.webkitOfflineAudioContext;
		if (!Ctor) return "none";
		const ctx = new Ctor(1, 5e3, 44100);
		const osc = ctx.createOscillator();
		osc.type = "triangle";
		osc.frequency.value = 1e4;
		const comp = ctx.createDynamicsCompressor();
		comp.threshold.value = -50;
		comp.knee.value = 40;
		comp.ratio.value = 12;
		comp.attack.value = 0;
		comp.release.value = .25;
		osc.connect(comp);
		comp.connect(ctx.destination);
		osc.start(0);
		const data = (await ctx.startRendering()).getChannelData(0);
		let sum = 0;
		for (let i = 4500; i < 5e3; i++) sum += Math.abs(data[i]);
		return sum.toFixed(8);
	} catch {
		return "error";
	}
}
var FONT_PROBES = [
	"Arial",
	"Helvetica Neue",
	"Times New Roman",
	"Courier New",
	"Georgia",
	"Segoe UI",
	"Calibri",
	"Cambria",
	"Consolas",
	"Tahoma",
	"Verdana",
	"Menlo",
	"Monaco",
	"SF Pro Text",
	"Optima",
	"Futura",
	"Gill Sans",
	"Ubuntu",
	"Cantarell",
	"DejaVu Sans",
	"Liberation Sans",
	"Noto Sans",
	"Roboto",
	"Droid Sans",
	"MS Gothic",
	"SimSun",
	"Malgun Gothic"
];
/** Font probing by text-width delta against three baseline generics. */
function fontsTrait() {
	return safe$1(() => {
		const base = [
			"monospace",
			"sans-serif",
			"serif"
		];
		const ctx = document.createElement("canvas").getContext("2d");
		if (!ctx) return "none";
		const probe = "mmmmmmmmmmlli中文";
		const widths = /* @__PURE__ */ new Map();
		for (const b of base) {
			ctx.font = `72px ${b}`;
			widths.set(b, ctx.measureText(probe).width);
		}
		const present = [];
		for (const font of FONT_PROBES) for (const b of base) {
			ctx.font = `72px '${font}', ${b}`;
			if (ctx.measureText(probe).width !== widths.get(b)) {
				present.push(font);
				break;
			}
		}
		return present.join(",");
	}, "error");
}
/**
* Media device topology - how many cameras, mics and speakers exist. Labels are
* gated behind a permission we never ask for, so this reads counts only. A
* desktop browser reporting zero of everything is unusual for a real machine.
*/
async function mediaDevicesTrait() {
	try {
		if (!navigator.mediaDevices?.enumerateDevices) return "none";
		const devices = await navigator.mediaDevices.enumerateDevices();
		const count = (kind) => devices.filter((d) => d.kind === kind).length;
		return `${count("audioinput")}/${count("audiooutput")}/${count("videoinput")}`;
	} catch {
		return "error";
	}
}
/** Client-side view of the connection; the server view lives in `./network.server`. */
function connectionTrait() {
	return safe$1(() => {
		const c = navigator.connection;
		if (!c) return "unknown";
		return [
			c.effectiveType ?? "?",
			c.downlink ?? "?",
			c.rtt ?? "?",
			c.saveData ? "save" : "full"
		].join("/");
	}, "error");
}
function storageBlocked() {
	return safe$1(() => {
		const probe = "__bi_probe__";
		localStorage.setItem(probe, "1");
		localStorage.removeItem(probe);
		return false;
	}, true);
}
/** Collects the full trait vector. Runs once per page load. */
async function collectTraits() {
	const gl = webglTrait();
	const [audio, mediaDevices] = await Promise.all([audioTrait(), mediaDevicesTrait()]);
	return {
		ua: safe$1(() => navigator.userAgent, ""),
		platform: safe$1(() => navigator.userAgentData?.platform ?? navigator.platform, ""),
		languages: safe$1(() => (navigator.languages ?? []).join(","), ""),
		timezone: safe$1(() => Intl.DateTimeFormat().resolvedOptions().timeZone ?? "", ""),
		cores: safe$1(() => navigator.hardwareConcurrency ?? 0, 0),
		memory: safe$1(() => navigator.deviceMemory ?? 0, 0),
		touchPoints: safe$1(() => navigator.maxTouchPoints ?? 0, 0),
		colorDepth: safe$1(() => screen.colorDepth, 0),
		screen: safe$1(() => `${screen.width}x${screen.height}`, ""),
		canvas: canvasTrait(),
		webgl: gl.renderer,
		webglParams: gl.params,
		audio,
		fonts: fontsTrait(),
		mediaDevices,
		viewport: safe$1(() => `${window.innerWidth}x${window.innerHeight}`, ""),
		dpr: safe$1(() => window.devicePixelRatio, 1),
		connection: connectionTrait(),
		reducedMotion: safe$1(() => matchMedia("(prefers-reduced-motion: reduce)").matches, false),
		colorScheme: safe$1(() => matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", ""),
		storageBlocked: storageBlocked()
	};
}
/** FNV-1a, then widened with a second pass so the id has 64 bits of room. */
function hash(input) {
	let h1 = 2166136261;
	let h2 = 16777619;
	for (let i = 0; i < input.length; i++) {
		const c = input.charCodeAt(i);
		h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
		h2 = Math.imul(h2 + c, 2246822507) >>> 0;
	}
	return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}
/**
* The hashed subset. Volatile traits are excluded so the id survives a window
* resize, a network change and a theme switch.
*
* `canvas: "unstable"` collapses every anti-fingerprinting browser onto one
* shared bucket rather than giving each page load a fresh id. Those visitors
* are deliberately not identifiable here; see `stability` below.
*/
function identityInput(t) {
	return [
		HASH_VERSION,
		t.ua,
		t.platform,
		t.languages,
		t.timezone,
		t.cores,
		t.memory,
		t.touchPoints,
		t.colorDepth,
		t.screen,
		t.canvas,
		t.webgl,
		t.webglParams,
		t.audio,
		t.fonts,
		t.mediaDevices
	].join("~");
}
var cached;
/**
* Resolve the visitor identity.
*
* Storage first because it is exact. When storage is unavailable the computed
* hash stands in, which is the whole point of the fallback: a cleared cookie
* jar does not reset the id.
*/
async function resolveIdentity() {
	if (typeof window === "undefined") return void 0;
	if (cached) return cached;
	const traits = await collectTraits();
	const computed = hash(identityInput(traits));
	const stability = traits.canvas === "unstable" || traits.webgl === "masked" ? "low" : "high";
	if (!traits.storageBlocked) {
		const existing = safe$1(() => localStorage.getItem(STORAGE_KEY), null);
		if (existing) {
			cached = {
				id: existing,
				source: "stored",
				stability,
				traits
			};
			return cached;
		}
		safe$1(() => localStorage.setItem(STORAGE_KEY, computed), void 0);
	}
	cached = {
		id: computed,
		source: "computed",
		stability,
		traits
	};
	return cached;
}
var KEY = "bi_vid";
var COOKIE_MAX_AGE = 3600 * 24 * 400;
var DB_NAME = "bi_store";
var DB_STORE = "identity";
function safe(fn, fallback) {
	try {
		return fn();
	} catch {
		return fallback;
	}
}
function readCookie() {
	return safe(() => {
		const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${KEY}=([^;]*)`));
		return match ? decodeURIComponent(match[1]) : null;
	}, null);
}
function writeCookie(value) {
	safe(() => {
		const secure = location.protocol === "https:" ? "; Secure" : "";
		document.cookie = `${KEY}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
	}, void 0);
}
function readLocal() {
	return safe(() => localStorage.getItem(KEY), null);
}
function writeLocal(value) {
	safe(() => localStorage.setItem(KEY, value), void 0);
}
function readSession() {
	return safe(() => sessionStorage.getItem(KEY), null);
}
function writeSession(value) {
	safe(() => sessionStorage.setItem(KEY, value), void 0);
}
/** Promisified IndexedDB. Resolves null on any failure - private mode, quota, blocked. */
function openDb() {
	return new Promise((resolve) => {
		try {
			if (typeof indexedDB === "undefined") return resolve(null);
			const request = indexedDB.open(DB_NAME, 1);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => resolve(null);
			request.onblocked = () => resolve(null);
			setTimeout(() => resolve(null), 1500);
		} catch {
			resolve(null);
		}
	});
}
async function readIdb() {
	const db = await openDb();
	if (!db) return null;
	return new Promise((resolve) => {
		try {
			const request = db.transaction(DB_STORE, "readonly").objectStore(DB_STORE).get(KEY);
			request.onsuccess = () => resolve(typeof request.result === "string" ? request.result : null);
			request.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
}
async function writeIdb(value) {
	const db = await openDb();
	if (!db) return;
	safe(() => {
		db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE).put(value, KEY);
	}, void 0);
}
/**
* Resolve the durable id.
*
* `fallback` is the fingerprint hash from `./fingerprint`, used only when no
* store holds anything - so a visitor who has cleared everything is recognised
* by device traits rather than being treated as brand new.
*
* Precedence is longest-lived first: a cookie and localStorage both outlive the
* tab, sessionStorage does not, so it never wins a disagreement.
*/
async function persistIdentity(fallback) {
	if (typeof window === "undefined") return void 0;
	const [cookie, local, session, idb] = await Promise.all([
		Promise.resolve(readCookie()),
		Promise.resolve(readLocal()),
		Promise.resolve(readSession()),
		readIdb()
	]);
	const present = [
		["localStorage", local],
		["indexedDB", idb],
		["cookie", cookie],
		["sessionStorage", session]
	];
	const found = present.filter(([, v]) => v !== null).map(([n]) => n);
	const id = present.find(([, v]) => v !== null)?.[1] ?? fallback;
	const restored = [];
	for (const [name, value] of present) {
		if (value === id) continue;
		restored.push(name);
		if (name === "cookie") writeCookie(id);
		else if (name === "localStorage") writeLocal(id);
		else if (name === "sessionStorage") writeSession(id);
		else await writeIdb(id);
	}
	return {
		id,
		found,
		restored,
		partial: found.length > 0 && restored.length > 0
	};
}
var EVENT_TIER = {
	booking_opened: "alert",
	contact_mailto: "alert",
	render_error: "normal",
	announcement_clicked: "quiet",
	outbound_playground: "quiet",
	outbound_social: "quiet",
	post_shared: "quiet",
	narration_play: "quiet",
	section_viewed: "digest",
	post_progress: "digest",
	page_not_found: "digest"
};
var SIGNAL_ENDPOINT = "/api/signal";
var attribution;
/**
* Campaign and referrer as they were on the first page of this visit. Read once
* and cached, because a client-side navigation drops the UTM query string and
* the original values would otherwise be unrecoverable.
*/
function getAttribution() {
	if (typeof window === "undefined") return {};
	if (attribution) return attribution;
	const params = new URLSearchParams(window.location.search);
	const referrer = document.referrer;
	attribution = {
		referrer: referrer && !referrer.startsWith(window.location.origin) ? referrer : void 0,
		utm_source: params.get("utm_source") ?? void 0,
		utm_medium: params.get("utm_medium") ?? void 0,
		utm_campaign: params.get("utm_campaign") ?? void 0
	};
	return attribution;
}
var profile;
var profilePromise;
/**
* Resolve the durable identity once per page load.
*
* Deliberately not awaited on the critical path: canvas, WebGL, audio and font
* probing together cost tens of milliseconds, and none of it is worth delaying
* paint for. Kicked off from `useVisitDigest` and read again at flush time,
* which is seconds later at minimum.
*/
function resolveProfile() {
	if (profilePromise) return profilePromise;
	profilePromise = (async () => {
		const identity = await resolveIdentity();
		if (!identity) return void 0;
		const persisted = await persistIdentity(identity.id);
		profile = {
			id: persisted?.id ?? identity.id,
			source: identity.source,
			stability: identity.stability,
			found: persisted?.found ?? [],
			restored: persisted?.restored ?? [],
			traits: identity.traits
		};
		return profile;
	})().catch(() => void 0);
	return profilePromise;
}
var visit;
var digestSent = false;
function getVisit() {
	if (!visit) visit = {
		startedAt: Date.now(),
		entryPath: typeof window === "undefined" ? "/" : window.location.pathname,
		sections: [],
		postProgress: {},
		narrated: [],
		shared: [],
		notFound: [],
		events: 0
	};
	return visit;
}
/** Folds a digest-tier event into the running visit summary. */
function accumulate(event, props) {
	const v = getVisit();
	switch (event) {
		case "section_viewed": {
			const id = props.section;
			if (id && !v.sections.includes(id)) v.sections.push(id);
			break;
		}
		case "post_progress": {
			const slug = String(props.slug);
			const pct = Number(props.pct);
			v.postProgress[slug] = Math.max(v.postProgress[slug] ?? 0, pct);
			break;
		}
		case "page_not_found": {
			const path = String(props.path);
			if (!v.notFound.includes(path)) v.notFound.push(path);
			break;
		}
		default: break;
	}
}
/** Mirrors the loud events into the summary too, so the digest reads complete. */
function noteInDigest(event, props) {
	const v = getVisit();
	v.events += 1;
	if (event === "narration_play") {
		const slug = String(props.slug);
		if (!v.narrated.includes(slug)) v.narrated.push(slug);
	} else if (event === "post_shared") {
		const slug = String(props.slug);
		if (!v.shared.includes(slug)) v.shared.push(slug);
	}
}
/**
* Fire-and-forget POST to our own origin. `keepalive` lets it survive the
* navigation that terminal events (mailto:, outbound links) trigger straight
* after. Failures are swallowed: analytics must never break the page.
*/
function post(payload, useBeacon = false) {
	if (typeof window === "undefined") return;
	const body = JSON.stringify(payload);
	if (useBeacon && typeof navigator.sendBeacon === "function") try {
		const blob = new Blob([body], { type: "application/json" });
		if (navigator.sendBeacon(SIGNAL_ENDPOINT, blob)) return;
	} catch {}
	fetch(SIGNAL_ENDPOINT, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body,
		keepalive: true
	}).catch(() => {});
}
/**
* Record something a visitor did.
*
* Always reaches the Vercel dashboard. Reaches the phone according to the
* event's tier in `EVENT_TIER`.
*/
function track$1(event, props = {}) {
	if (typeof window === "undefined") return;
	track(event, props);
	if (EVENT_TIER[event] === "digest") {
		accumulate(event, props);
		return;
	}
	noteInDigest(event, props);
	post({
		kind: "event",
		event,
		props,
		path: window.location.pathname,
		...getAttribution()
	});
}
/**
* One message summarising the whole visit, sent when the tab goes away. This is
* the counterpart to the server's arrival ping: the arrival ping fires when we
* know nothing about the visitor, this fires when we know everything.
*/
function flushDigest() {
	if (typeof window === "undefined" || digestSent || !visit) return;
	const v = visit;
	const dwellSeconds = Math.round((Date.now() - v.startedAt) / 1e3);
	if (!(v.sections.length > 0 || v.events > 0 || Object.keys(v.postProgress).length > 0) && dwellSeconds < 5) return;
	digestSent = true;
	post({
		kind: "digest",
		entryPath: v.entryPath,
		exitPath: window.location.pathname,
		dwellSeconds,
		sections: v.sections,
		sectionsTotal: SECTIONS$1.length,
		postProgress: v.postProgress,
		narrated: v.narrated,
		shared: v.shared,
		notFound: v.notFound,
		profile,
		behavior: summarize(),
		trace: trace(),
		...getAttribution()
	}, true);
}
/**
* Mounted once, at the app shell. `visibilitychange` rather than `beforeunload`,
* which mobile Safari fires unreliably; `pagehide` covers the bfcache path.
*/
function useVisitDigest() {
	(0, import_react.useEffect)(() => {
		getAttribution();
		getVisit();
		resolveProfile();
		const stopBehavior = startBehaviorCapture();
		const onHide = () => {
			if (document.visibilityState === "hidden") flushDigest();
		};
		document.addEventListener("visibilitychange", onHide);
		window.addEventListener("pagehide", flushDigest);
		return () => {
			document.removeEventListener("visibilitychange", onHide);
			window.removeEventListener("pagehide", flushDigest);
			stopBehavior();
		};
	}, []);
}
/**
* Fires `section_viewed` once per section per visit. Observes exactly the
* anchors the TopBar and footer link to, via the shared list in `./sections`.
*/
function useSectionViews() {
	(0, import_react.useEffect)(() => {
		const seen = /* @__PURE__ */ new Set();
		const elements = SECTIONS$1.map((s) => document.getElementById(s.id)).filter((el) => el !== null);
		if (elements.length === 0) return;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting || seen.has(entry.target.id)) continue;
				seen.add(entry.target.id);
				track$1("section_viewed", { section: entry.target.id });
			}
		}, { threshold: .25 });
		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);
}
/**
* Fires `post_progress` at 25/50/75/100% of an article, each threshold once.
* Depth is measured against the article element, not the window, so the footer
* and signup strip don't count as "read".
*/
function useReadProgress(slug, ref) {
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const thresholds = [
			25,
			50,
			75,
			100
		];
		const fired = /* @__PURE__ */ new Set();
		const onScroll = () => {
			const rect = el.getBoundingClientRect();
			const scrolled = window.innerHeight - rect.top;
			const pct = Math.min(100, Math.round(scrolled / rect.height * 100));
			for (const t of thresholds) if (pct >= t && !fired.has(t)) {
				fired.add(t);
				track$1("post_progress", {
					slug,
					pct: t
				});
			}
			if (fired.size === thresholds.length) window.removeEventListener("scroll", onScroll);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, [slug, ref]);
}
/**
* The booking page. This replaced the Engage route: rather than a form that
* handed off to the visitor's mail client, high-intent visitors now put time in
* the calendar directly. Opened in a new tab everywhere it appears, and always
* reported as `booking_opened` — it is the site's strongest signal of intent.
*/
var BOOKING_URL = "https://www.cal.eu/boundless-intuition/30min";
var SECTIONS = SECTIONS$1.map((s) => ({
	href: `/#${s.id}`,
	label: s.label
}));
function TopBar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: `sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ${open ? "bg-background/85 backdrop-blur-md" : scrolled ? "bg-transparent backdrop-blur-[2px]" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-shell items-center justify-between px-6 lg:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 font-display text-[16px] tracking-tight text-foreground sm:gap-3 sm:text-[18px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "h-5 sm:h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-light",
							children: "Boundless"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Intuition"
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-light",
							children: "Labs"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden gap-8 font-display text-[12px] font-medium text-muted-foreground md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog",
						className: "transition-colors hover:text-foreground",
						children: "Blog"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://playground.boundlessintuition.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => track$1("outbound_playground", { from: "topbar" }),
						className: "inline-flex items-center gap-1 transition-colors hover:text-foreground",
						children: ["Playground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "text-[10px]",
							children: "↗"
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: BOOKING_URL,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: () => track$1("booking_opened", { from: "topbar" }),
					className: "hidden items-center border border-foreground/25 px-4 py-1.5 font-display text-[12px] font-medium text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/5 sm:inline-flex",
					children: "Talk to the lab"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					className: "grid size-9 place-items-center rounded-sm border border-border text-foreground transition-colors hover:bg-foreground/5 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative block h-3 w-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}` })
						]
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `overflow-hidden transition-[max-height] duration-300 md:hidden ${open ? "max-h-96 border-t border-border bg-background/95 backdrop-blur-md" : "max-h-0"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-shell px-6 lg:px-10 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col divide-y divide-border",
					children: [
						SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.href,
							onClick: () => setOpen(false),
							className: "py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
							children: s.label
						}, s.label)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							onClick: () => setOpen(false),
							className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
							children: "Blog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://playground.boundlessintuition.com/",
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: () => {
								setOpen(false);
								track$1("outbound_playground", { from: "topbar-mobile" });
							},
							className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground",
							children: ["Playground", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "text-muted-foreground",
								children: "↗"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: BOOKING_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: () => {
								setOpen(false);
								track$1("booking_opened", { from: "topbar-mobile" });
							},
							className: "flex items-center justify-between py-3 font-display text-[15px] font-medium text-foreground",
							children: ["Talk to the lab", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "text-muted-foreground",
								children: "↗"
							})]
						})
					]
				})
			})
		})]
	});
}
//#endregion
export { useReadProgress as a, track$1 as i, SECTIONS$1 as n, useSectionViews as o, TopBar as r, useVisitDigest as s, BOOKING_URL as t };
