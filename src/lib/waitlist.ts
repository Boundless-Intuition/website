import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ── Waitlist signup ──────────────────────────────────────────────────────────
// A TanStack Start server function: the `.handler()` body is stripped from the
// client bundle, so the newsletter API key never reaches the browser. The
// client calls this like a normal async function; it runs as an RPC.
//
// Provider: Buttondown (https://buttondown.com). To go live:
//   1. Create a Buttondown account and copy your API key
//      (Settings → Programming → API).
//   2. Set BUTTONDOWN_API_KEY in the server environment:
//        • local dev  → add it to a `.env` file at the repo root
//        • production → add it in the Vercel project's Environment Variables
//   Until the key is set, the handler returns { ok: false, reason: "unconfigured" }
//   and the UI shows a graceful "not open yet" message rather than erroring.
//
// Swapping providers (ConvertKit/Kit, Mailchimp, …) means changing only the
// fetch() call below — the input contract and the whole UI stay the same.

const SubscribeInput = z.object({
  email: z.string().email("That doesn't look like a valid email."),
  topics: z.array(z.string()).max(12).default([]),
  // First-touch campaign, captured by `@/lib/analytics`. Stored on the
  // subscriber record because acquisition source cannot be reconstructed after
  // the fact from any dashboard.
  attribution: z
    .object({
      referrer: z.string().max(300).optional(),
      utm_source: z.string().max(100).optional(),
      utm_medium: z.string().max(100).optional(),
      utm_campaign: z.string().max(100).optional(),
    })
    .optional(),
});

export type SubscribeResult =
  | { ok: true; status: "subscribed" | "already" }
  | { ok: false; reason: "unconfigured" | "failed" };

type Attribution = z.infer<typeof SubscribeInput>["attribution"];

/**
 * Records a completed signup: a Vercel custom event and an ntfy alert.
 *
 * Deliberately server-side rather than fired from the browser. A signup is the
 * highest-intent thing that happens on this site, and the client-side path is
 * the unreliable one - `/_vercel/insights` is a common ad-blocker target, and
 * a technical audience blocks it at a meaningful rate. Running it here also
 * means the notification carries the request's geo headers.
 *
 * Never throws: reporting a signup must not fail the signup.
 */
async function announceSignup(
  status: "subscribed" | "already",
  attribution: Attribution,
): Promise<void> {
  try {
    // Imported lazily so these server-only modules stay out of the client graph.
    const [{ track }, { getRequest }, { sendNtfy, visitorContext }] =
      await Promise.all([
        import("@vercel/analytics/server"),
        import("@tanstack/react-start/server"),
        import("./visit-notify.server"),
      ]);

    await track("waitlist_subscribed", { status, ...(attribution ?? {}) });

    const request = getRequest();
    const { place, timezone, client } = visitorContext(request);
    const campaign = [
      attribution?.utm_source,
      attribution?.utm_medium,
      attribution?.utm_campaign,
    ]
      .filter(Boolean)
      .join(" / ");

    const lines = [
      status === "already"
        ? "Already-subscribed address re-submitted"
        : "**New research-updates subscriber**",
      "",
      `**Where** ${place}${timezone ? ` (${timezone})` : ""}`,
    ];
    if (attribution?.referrer)
      lines.push(`**Referrer** ${attribution.referrer}`);
    if (campaign) lines.push(`**Campaign** ${campaign}`);
    lines.push(`**Client** ${client}`);

    await sendNtfy(
      {
        title: `Subscriber — ${place}`,
        body: lines.join("\n"),
        priority: 4,
        tags: ["tada"],
      },
      undefined,
    );
  } catch (error) {
    console.warn("signup announcement failed", error);
  }
}

export const subscribeToWaitlist = createServerFn({ method: "POST" })
  .validator(SubscribeInput)
  .handler(async ({ data }): Promise<SubscribeResult> => {
    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      // Not wired up yet — let the UI explain instead of throwing a 500.
      return { ok: false, reason: "unconfigured" };
    }

    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: data.email,
        tags: data.topics,
        metadata: {
          source: "website-waitlist",
          ...(data.attribution ?? {}),
        },
      }),
    });

    if (res.status === 201 || res.status === 200) {
      await announceSignup("subscribed", data.attribution);
      return { ok: true, status: "subscribed" };
    }

    // Buttondown returns 400 with an "already exists" code for known emails —
    // treat that as success from the visitor's point of view.
    const body = await res.text().catch(() => "");
    if (res.status === 400 && /already|exists|duplicate/i.test(body)) {
      await announceSignup("already", data.attribution);
      return { ok: true, status: "already" };
    }

    console.error(`Buttondown subscribe failed (${res.status}): ${body}`);
    return { ok: false, reason: "failed" };
  });
