import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as track } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-0hrIaw_O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SECTIONS = [
	{
		id: "doctrine",
		label: "Doctrine"
	},
	{
		id: "method",
		label: "Method"
	},
	{
		id: "domains",
		label: "Domains"
	},
	{
		id: "value",
		label: "Value"
	},
	{
		id: "lab",
		label: "Lab"
	}
];
var EVENT_TIER = {
	engage_submitted: "alert",
	contact_mailto: "alert",
	render_error: "normal",
	outbound_playground: "quiet",
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
		sectionsTotal: SECTIONS.length,
		postProgress: v.postProgress,
		narrated: v.narrated,
		shared: v.shared,
		notFound: v.notFound,
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
		const onHide = () => {
			if (document.visibilityState === "hidden") flushDigest();
		};
		document.addEventListener("visibilitychange", onHide);
		window.addEventListener("pagehide", flushDigest);
		return () => {
			document.removeEventListener("visibilitychange", onHide);
			window.removeEventListener("pagehide", flushDigest);
		};
	}, []);
}
/**
* Fires `section_viewed` once per section per visit. Observes exactly the
* anchors the `SectionRail` highlights, via the shared list in `./sections`.
*/
function useSectionViews() {
	(0, import_react.useEffect)(() => {
		const seen = /* @__PURE__ */ new Set();
		const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter((el) => el !== null);
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
var THEME_KEY = "bi-theme";
/** Whether a route is allowed to render in the light palette. */
function allowsLight(pathname) {
	return pathname === "/blog" || pathname.startsWith("/blog/");
}
function storedTheme() {
	if (typeof window === "undefined") return null;
	try {
		const value = window.localStorage.getItem(THEME_KEY);
		return value === "light" || value === "dark" ? value : null;
	} catch {
		return null;
	}
}
function storeTheme(theme) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(THEME_KEY, theme);
	} catch {}
}
/** The theme a given path must render in. Dark unless the blog says otherwise. */
function themeForPath(pathname) {
	if (!allowsLight(pathname)) return "dark";
	return storedTheme() ?? "dark";
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", theme === "dark");
}
//#endregion
export { storeTheme as a, useReadProgress as c, getAttribution as i, useSectionViews as l, allowsLight as n, themeForPath as o, applyTheme as r, track$1 as s, SECTIONS as t, useVisitDigest as u };
