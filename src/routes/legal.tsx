import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal - Boundless Intuition" },
      {
        name: "description",
        content:
          "Terms of use and privacy notice for Boundless Intuition - the verification layer for artificial intelligence.",
      },
    ],
  }),
  component: LegalRoute,
});

const SECTIONS = [
  {
    n: "01",
    title: "Terms of use",
    body: "This website is provided for informational purposes. Nothing on it constitutes a binding offer, warranty, or professional advice. Verification engagements are governed exclusively by a separate written agreement executed between Boundless Intuition and the client.",
  },
  {
    n: "02",
    title: "Verification claims",
    body: "Formal proofs establish that a system conforms to the rules as formalized. The correctness of any guarantee is bounded by the fidelity of that formalization to the client's intent. We scope and document these assumptions explicitly in every engagement.",
  },
  {
    n: "03",
    title: "Privacy",
    body: "We collect only the information you send us directly - for example, when you submit an inquiry through the Engage page, which opens your own email client. We do not sell personal data. Materials you share for a verification engagement are treated as confidential under the terms of that engagement.",
  },
  {
    n: "04",
    title: "Intellectual property",
    body: "The content, marks, and design of this site are the property of Boundless Intuition. Formal artifacts produced during an engagement are owned as set out in the applicable agreement.",
  },
  {
    n: "05",
    title: "Contact",
    body: "Questions about these terms can be directed to research@boundlessintuition.com. This notice may be updated from time to time; the version published here is the current one.",
  },
];

function LegalRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="blueprint-grid absolute inset-0 opacity-100"
            aria-hidden
          />
          <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32">
            <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-foreground/70">§ VIII</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Legal</span>
            </div>
            <h1 className="mb-8 max-w-[18ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem]">
              Terms &amp; privacy.
            </h1>
            <p className="max-w-[58ch] text-[17px] leading-[1.6] text-foreground/85">
              Plain terms for a lab that values precision. Nothing here replaces
              the written agreement that governs an engagement - it exists so
              you know where you stand before we ever talk.
            </p>
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              {SECTIONS.map((s) => (
                <article
                  key={s.n}
                  className="flex flex-col gap-4 bg-background p-8 lg:p-10"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-foreground/50">
                    {s.n}
                  </span>
                  <h2 className="font-display text-[20px] font-medium tracking-tight text-foreground">
                    {s.title}
                  </h2>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Last updated · 2026 · Geneva
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
