import { track as vercelTrack } from "@vercel/analytics";
import { useEffect } from "react";

import { SECTIONS, type SectionId } from "./sections";
import {
  startBehaviorCapture,
  summarize,
  trace,
  type BehaviorSummary,
  type BehaviorTrace,
} from "./behavior";
import { resolveIdentity, type DeviceTraits } from "./fingerprint";
import { persistIdentity } from "./persistence";

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
// This module DOES read and write client storage. `./persistence` keeps a
// durable visitor id across cookie, localStorage, sessionStorage and IndexedDB,
// `./fingerprint` derives a device hash that stands in when those are cleared,
// and `./behavior` records pointer, scroll and keystroke-timing traces. All
// three ride along on the end-of-visit digest.
//
// That is a material change from anonymous aggregate measurement, so the
// measurement section of `/legal` describes it in those terms. If you add a
// signal here, update that section in the same commit - a privacy notice that
// disagrees with this file is a liability on its own, independent of whether
// the collection was lawful.

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

// ── Visitor profile ──────────────────────────────────────────────────────────

export interface VisitorProfile {
  id: string;
  /** "stored" when a client store had it, "computed" when derived from traits. */
  source: string;
  /** "low" for browsers that randomise fingerprint surfaces - id is per-session. */
  stability: string;
  /** Stores that already held the id. Empty on a first visit. */
  found: string[];
  /** Stores that had lost it and were re-seeded from the survivors. */
  restored: string[];
  traits: DeviceTraits;
}

let profile: VisitorProfile | undefined;
let profilePromise: Promise<VisitorProfile | undefined> | undefined;

/**
 * Resolve the durable identity once per page load.
 *
 * Deliberately not awaited on the critical path: canvas, WebGL, audio and font
 * probing together cost tens of milliseconds, and none of it is worth delaying
 * paint for. Kicked off from `useVisitDigest` and read again at flush time,
 * which is seconds later at minimum.
 */
function resolveProfile(): Promise<VisitorProfile | undefined> {
  if (profilePromise) return profilePromise;

  profilePromise = (async () => {
    const identity = await resolveIdentity();
    if (!identity) return undefined;

    const persisted = await persistIdentity(identity.id);

    profile = {
      id: persisted?.id ?? identity.id,
      source: identity.source,
      stability: identity.stability,
      found: persisted?.found ?? [],
      restored: persisted?.restored ?? [],
      traits: identity.traits,
    };

    // Dev-only inspection hatch. `bun run dev`, then in the console:
    //   __biProfile          what this browser is fingerprinted as
    //   __biBehavior()       the live behavioural summary
    //   __biTrace()          the raw pointer / key / click buffers
    // Guarded by import.meta.env.DEV, so Vite strips the whole block from the
    // production bundle - there is no debug surface on the live site.
    if (import.meta.env.DEV) {
      Object.assign(window, {
        __biProfile: profile,
        __biBehavior: summarize,
        __biTrace: trace,
      });
    }

    return profile;
  })().catch((error: unknown) => {
    // Was `.catch(() => undefined)`, which swallowed any failure in canvas,
    // WebGL, audio rendering, font probing or IndexedDB and left `profile`
    // undefined with nothing to go on. The digest then arrives looking merely
    // incomplete rather than broken, which is a bad thing to debug twice.
    console.warn("visitor profile failed to resolve", error);
    return undefined;
  });

  return profilePromise;
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
/**
 * Both transports available during pagehide are capped at 64KB: `sendBeacon`
 * refuses a larger blob outright, and `fetch` with `keepalive` is subject to
 * the same limit. Over that, the digest silently never arrives.
 *
 * So budget below the cap and shed the optional payload rather than lose the
 * whole message. The trace is the expendable part; the profile and the
 * behavioural summary are the point of the digest and always stay.
 */
const MAX_BEACON_BYTES = 60_000;

function withinBudget(payload: Record<string, unknown>): string {
  let body = JSON.stringify(payload);
  if (body.length <= MAX_BEACON_BYTES) return body;

  body = JSON.stringify({ ...payload, trace: undefined, traceDropped: true });
  if (body.length <= MAX_BEACON_BYTES) return body;

  // Still too big without the trace: drop the raw component vector too, keeping
  // the id and the verdict, which is what the server actually needs to match on.
  const profile = payload.profile as Record<string, unknown> | undefined;
  return JSON.stringify({
    ...payload,
    trace: undefined,
    traceDropped: true,
    profile: profile ? { ...profile, traits: undefined } : undefined,
  });
}

function post(payload: unknown, useBeacon = false) {
  if (typeof window === "undefined") return;
  const body =
    useBeacon && payload && typeof payload === "object"
      ? withinBudget(payload as Record<string, unknown>)
      : JSON.stringify(payload);

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
      // `profile` rather than `resolveProfile()`: this runs inside a pagehide
      // handler, where there is no opportunity to await anything. If the probes
      // have not finished by now the digest simply goes without them.
      profile,
      behavior: summarize(),
      trace: trace(),
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
    void resolveProfile();
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

// ── Scroll depth ─────────────────────────────────────────────────────────────

/**
 * Fires `section_viewed` once per section per visit. Observes exactly the
 * anchors the TopBar and footer link to, via the shared list in `./sections`.
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
