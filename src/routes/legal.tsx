import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/site/TopBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PlateDrift } from "@/components/site/PlateDrift";
import { clearIdentity } from "@/lib/persistence";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal · Boundless Intuition" },
      {
        name: "description",
        content:
          "Terms of use and privacy notice for Boundless Intuition, the foundational infrastructure for verified intelligence.",
      },
    ],
  }),
  component: LegalRoute,
});

// `id` is what a deep link points at. People do link to the privacy clause of
// a legal page specifically, and a section that cannot be addressed forces them
// to send the whole page and say "scroll down".
const SECTIONS = [
  {
    n: "01",
    id: "terms",
    title: "Terms of use",
    body: "This website is provided for informational purposes. Nothing on it constitutes a binding offer, warranty, or professional advice. Verification engagements are governed exclusively by a separate written agreement executed between Boundless Intuition and the client.",
  },
  {
    n: "02",
    id: "claims",
    title: "Verification claims",
    body: "Formal proofs establish that a system conforms to the rules as formalized. The correctness of any guarantee is bounded by the fidelity of that formalization to the client's intent. We scope and document these assumptions explicitly in every engagement.",
  },
  {
    n: "03",
    id: "privacy",
    title: "Privacy",
    body: "We collect what you send us directly. For example, when you email us, or when you book a call through our scheduling provider, which handles that booking under its own privacy terms. We do not sell personal data. Materials you share for a verification engagement are treated as confidential under the terms of that engagement.",
  },
  {
    n: "04",
    id: "measurement",
    title: "What this site measures",
    body: "Anonymous, aggregate usage only: which pages are read, roughly where visitors come from, and which site referred them. No advertising, no cross-site tracking, no session recording, and nothing that identifies you personally. One functional cookie, bi_seen, so the same browser is not reported to us twice. Measurement is by Vercel; any standard tracker blocker stops all of it.",
  },
  {
    n: "05",
    id: "ip",
    title: "Intellectual property",
    body: "The content, marks, and design of this site are the property of Boundless Intuition. Formal artifacts produced during an engagement are owned as set out in the applicable agreement.",
  },
  {
    n: "06",
    id: "contact",
    title: "Contact",
    body: "Questions about these terms can be directed to research@boundlessintuition.com. This notice may be updated from time to time; the version published here is the current one.",
  },
];

function LegalRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main>
        {/* -mt-16 pulls this under the transparent sticky header, matching
            the landing overlay; pt-24/pt-32 keeps the copy clear of the bar.

            The plate is a monochord: one string stretched over a marble rule
            engraved with divisions, a figure stopping it at a marked division
            while another holds the lantern to the work. A written standard, and
            a measurement taken against it — which is what this page is. It ends
            in a dissolve rather than a rule, like every other band on the site. */}
        <section className="relative -mt-16 overflow-hidden">
          <PlateDrift
            src="/plates/monochord-scales.webp"
            // keeps the string, the graduated rule and its reflection in frame
            focus="50% 55%"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
          />

          <div className="relative mx-auto max-w-shell px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-28">
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Legal
            </p>
            <h1 className="mb-8 max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.04] tracking-[-0.03em] text-foreground md:text-[3.2rem]">
              Terms &amp; privacy.
            </h1>
            <p className="max-w-[52ch] text-[17px] leading-[1.7] text-foreground/85 lg:text-[18px]">
              Plain terms for a lab that values precision. Nothing here replaces
              the written agreement that governs an engagement. It exists so you
              know where you stand before we ever talk.
            </p>
          </div>
        </section>

        {/* Set as a document rather than as cards. Boxes force every clause
            into the same cell height, so short ones sat half empty while the
            measurement notice overflowed — and legal text is never even in
            length. Ruled rows size to their own content: the number and title
            hold a fixed left column, the body runs in a reading measure beside
            it, and the hairlines between are the only structure needed. */}
        <section className="bg-background">
          <div className="mx-auto max-w-shell px-6 lg:px-10 py-20 lg:py-24">
            <div className="border-t border-border">
              {SECTIONS.map((s) => (
                <article
                  key={s.n}
                  id={s.id}
                  className="grid scroll-mt-24 gap-4 border-b border-border py-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-12"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground/70">
                      {s.n}
                    </span>
                    <h2 className="font-display text-[18px] font-medium tracking-tight text-foreground">
                      {s.title}
                    </h2>
                  </div>
                  {/* No measure cap: the body runs the full width of its
                      column, out to the page edge. Sized up a little and set
                      looser to compensate — a long line needs the extra leading
                      to keep the eye from dropping a row on the return. */}
                  <p className="text-[16px] leading-[1.8] text-muted-foreground">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Last updated · 2026 · Geneva
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
