import { track as vercelTrack } from "@vercel/analytics";
import { useEffect } from "react";

import { SECTIONS, type SectionId } from "./sections";

// ── Analytics ────────────────────────────────────────────────────────────────
// One place for every event name the site emits. Components import `track()`
// from here and never `@vercel/analytics` directly, so names cannot drift.
//
// Two sinks, deliberately:
//   1. Vercel Web Analytics - cookieless aggregate dashboard, always gets
//      everything.
//   2. ntfy.sh - push, via the `/api/signal` route (the topic and token stay
//      server-side there, exactly like the Buttondown key in `./waitlist`).
//
// Nothing here reads or writes cookies, localStorage or sessionStorage. The
// visit accumulator below lives in module scope, so it survives client-side
// route changes and dies on reload. That keeps the site's "no consent banner"
// posture honest - see the privacy section of `/legal`.

// ── Event vocabulary ─────────────────────────────────────────────────────────

export type EventProps = Record<string, string | number | boolean | null>;

/**
 * How loudly an event reaches the phone. Tuned so the notification channel
 * stays worth reading: `section_viewed` alone fires seven times per visitor,
 * which is why the low-signal events are folded into the end-of-visit digest
 * rather than pushed one by one.
 */
type Tier =
  /** High intent. Priority 4, alert tone, on the main topic. */
  | "alert"
  /** Worth knowing about now. Priority 3, on the main topic. */
  | "normal"
  /** Delivered silently to the firehose topic. */
  | "quiet"
  /** Never pushed on its own; folded into the end-of-visit digest. */
  | "digest";

// Note: `waitlist_subscribed` is deliberately absent. That one is reported
// server-side from `./waitlist`, where it survives ad blockers and the visitor
// closing the tab, and where the request's geo headers are available.
const EVENT_TIER = {
  engage_submitted: "alert",
  contact_mailto: "alert",

  render_error: "normal",

  outbound_playground: "quiet",
  post_shared: "quiet",
  narration_play: "quiet",

  section_viewed: "digest",
  post_progress: "digest",
  page_not_found: "digest",
} as const satisfies Record<string, Tier>;

export type BiEvent = keyof typeof EVENT_TIER;

const SIGNAL_ENDPOINT = "/api/signal";

// ── First-touch acquisition ──────────────────────────────────────────────────

export interface Attribution {
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

let attribution: Attribution | undefined;

/**
 * Campaign and referrer as they were on the first page of this visit. Read once
 * and cached, because a client-side navigation drops the UTM query string and
 * the original values would otherwise be unrecoverable.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  if (attribution) return attribution;

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  const external =
    referrer && !referrer.startsWith(window.location.origin)
      ? referrer
      : undefined;

  attribution = {
    referrer: external,
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
  };
  return attribution;
}

// ── Visit accumulator ────────────────────────────────────────────────────────

interface Visit {
  startedAt: number;
  entryPath: string;
  sections: SectionId[];
  postProgress: Record<string, number>;
  narrated: string[];
  shared: string[];
  notFound: string[];
  /** Count of pushed events, so the digest can note activity it didn't store. */
  events: number;
}

let visit: Visit | undefined;
let digestSent = false;

function getVisit(): Visit {
  if (!visit) {
    visit = {
      startedAt: Date.now(),
      entryPath: typeof window === "undefined" ? "/" : window.location.pathname,
      sections: [],
      postProgress: {},
      narrated: [],
      shared: [],
      notFound: [],
      events: 0,
    };
  }
  return visit;
}

/** Folds a digest-tier event into the running visit summary. */
function accumulate(event: BiEvent, props: EventProps) {
  const v = getVisit();
  switch (event) {
    case "section_viewed": {
      const id = props.section as SectionId;
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
    default:
      break;
  }
}

/** Mirrors the loud events into the summary too, so the digest reads complete. */
function noteInDigest(event: BiEvent, props: EventProps) {
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

// ── Transport ────────────────────────────────────────────────────────────────

/**
 * Fire-and-forget POST to our own origin. `keepalive` lets it survive the
 * navigation that terminal events (mailto:, outbound links) trigger straight
 * after. Failures are swallowed: analytics must never break the page.
 */
function post(payload: unknown, useBeacon = false) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify(payload);

  if (useBeacon && typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(SIGNAL_ENDPOINT, blob)) return;
    } catch {
      // fall through to fetch
    }
  }

  void fetch(SIGNAL_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

/**
 * Record something a visitor did.
 *
 * Always reaches the Vercel dashboard. Reaches the phone according to the
 * event's tier in `EVENT_TIER`.
 */
export function track(event: BiEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  vercelTrack(event, props);

  const tier = EVENT_TIER[event] as Tier;
  if (tier === "digest") {
    accumulate(event, props);
    return;
  }

  noteInDigest(event, props);
  post({
    kind: "event",
    event,
    props,
    path: window.location.pathname,
    ...getAttribution(),
  });
}

// ── End-of-visit digest ──────────────────────────────────────────────────────

/**
 * One message summarising the whole visit, sent when the tab goes away. This is
 * the counterpart to the server's arrival ping: the arrival ping fires when we
 * know nothing about the visitor, this fires when we know everything.
 */
export function flushDigest() {
  if (typeof window === "undefined" || digestSent || !visit) return;

  const v = visit;
  const dwellSeconds = Math.round((Date.now() - v.startedAt) / 1000);
  const readSomething =
    v.sections.length > 0 ||
    v.events > 0 ||
    Object.keys(v.postProgress).length > 0;

  // An instant bounce carries no information the arrival ping didn't already
  // deliver, so don't spend a notification on it.
  if (!readSomething && dwellSeconds < 5) return;

  digestSent = true;
  post(
    {
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
      ...getAttribution(),
    },
    true,
  );
}

/**
 * Mounted once, at the app shell. `visibilitychange` rather than `beforeunload`,
 * which mobile Safari fires unreliably; `pagehide` covers the bfcache path.
 */
export function useVisitDigest() {
  useEffect(() => {
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

// ── Scroll depth ─────────────────────────────────────────────────────────────

/**
 * Fires `section_viewed` once per section per visit. Observes exactly the
 * anchors the `SectionRail` highlights, via the shared list in `./sections`.
 */
export function useSectionViews() {
  useEffect(() => {
    const seen = new Set<string>();
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target.id)) continue;
          seen.add(entry.target.id);
          track("section_viewed", { section: entry.target.id });
        }
      },
      // A section counts as read once a quarter of it has been on screen.
      { threshold: 0.25 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * Fires `post_progress` at 25/50/75/100% of an article, each threshold once.
 * Depth is measured against the article element, not the window, so the footer
 * and signup strip don't count as "read".
 */
export function useReadProgress(
  slug: string,
  ref: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const pct = Math.min(100, Math.round((scrolled / rect.height) * 100));
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track("post_progress", { slug, pct: t });
        }
      }
      if (fired.size === thresholds.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, ref]);
}
