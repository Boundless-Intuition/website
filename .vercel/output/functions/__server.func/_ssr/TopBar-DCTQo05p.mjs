import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as BrandMark } from "./BrandMark-BgoQf2Gt.mjs";
import { g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as track } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TopBar-DCTQo05p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS$1 = [{
	id: "doctrine",
	label: "Doctrine"
}, {
	id: "lab",
	label: "Lab"
}];
var EVENT_TIER = {
	booking_opened: "alert",
	contact_mailto: "alert",
	render_error: "normal",
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
/**
* Only rendered on the blog — the rest of the site is dark-only, so there is
* nothing to toggle there. See `@/lib/theme`.
*/
function ThemeToggle() {
	const pathname = useLocation({ select: (l) => l.pathname });
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setTheme(themeForPath(pathname));
		setMounted(true);
	}, [pathname]);
	if (!allowsLight(pathname)) return null;
	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		applyTheme(next);
		storeTheme(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		"aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} reading mode`,
		className: "grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/60 hover:text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[13px]",
			"aria-hidden": true,
			children: mounted ? theme === "dark" ? "☾" : "☀" : "·"
		})
	});
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: BOOKING_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => track$1("booking_opened", { from: "topbar" }),
						className: "hidden items-center border border-foreground/25 px-4 py-1.5 font-display text-[12px] font-medium text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/5 sm:inline-flex",
						children: "Talk to the lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
					})
				]
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
export { themeForPath as a, useSectionViews as c, applyTheme as i, useVisitDigest as l, SECTIONS$1 as n, track$1 as o, TopBar as r, useReadProgress as s, BOOKING_URL as t };
