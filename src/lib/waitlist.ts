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
});

export type SubscribeResult =
  | { ok: true; status: "subscribed" | "already" }
  | { ok: false; reason: "unconfigured" | "failed" };

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
        metadata: { source: "website-waitlist" },
      }),
    });

    if (res.status === 201 || res.status === 200) {
      return { ok: true, status: "subscribed" };
    }

    // Buttondown returns 400 with an "already exists" code for known emails —
    // treat that as success from the visitor's point of view.
    const body = await res.text().catch(() => "");
    if (res.status === 400 && /already|exists|duplicate/i.test(body)) {
      return { ok: true, status: "already" };
    }

    console.error(`Buttondown subscribe failed (${res.status}): ${body}`);
    return { ok: false, reason: "failed" };
  });
