import { useState } from "react";
import { ProcessFlow } from "./ProcessFlow";
import {
  EngageHeroBackdrop,
  EngageStepVisual,
  GateFlowBackdrop,
} from "./domain-visuals/EngageVisual";
import { PipelineBackdrop } from "./domain-visuals/MethodVisual";

const STEPS = [
  {
    n: "01",
    title: "Share your rules",
    body: "Send us the standards, policies, or regulations that govern your domain - handbooks, compliance documents, protocol specifications. We start with what you already have.",
  },
  {
    n: "02",
    title: "We formalize them",
    body: "Our team translates your rules into machine-checkable formal objects - precise mathematical representations that a theorem prover can reason about.",
  },
  {
    n: "03",
    title: "Proofs run on every change",
    body: "Verification integrates into your workflow. Every policy update, every configuration change is proved safe against your formalized rules - automatically, continuously.",
  },
  {
    n: "04",
    title: "You get verifiable guarantees",
    body: "Not assertions. Not test results. Mathematical proofs that your systems conform to the rules that govern them - auditable, reproducible, and independently checkable.",
  },
];

const DELIVERABLES = [
  {
    title: "Conflict Reports",
    body: "When rules contradict each other - a firewall allows what a handbook forbids, a policy grants what a standard restricts - we surface it with a concrete witness.",
  },
  {
    title: "Regression Proofs",
    body: "Every change to your configuration or policy is checked against the full rule set. Proofs run in CI, per commit, and block deployments that violate invariants.",
  },
  {
    title: "Verified Artifacts",
    body: "Formalized rules and their derivations, versioned and signed. An auditable record that your systems do what your documentation says they do.",
  },
];

const PROFILES = [
  {
    title: "Security & Compliance Teams",
    body: "CISOs, GRC leads, and policy owners who need provable assurance that access controls, firewall rules, and audit configurations match organizational policy.",
  },
  {
    title: "Regulated Product Teams",
    body: "Engineering leads shipping medical devices, financial systems, or safety-critical software under IEC, FDA, or SOC 2 obligations.",
  },
  {
    title: "Legal & Policy Organizations",
    body: "Teams managing complex regulatory environments - GDPR, export control, sanctions - who need consistency between written rules and operational reality.",
  },
  {
    title: "Research & Infrastructure",
    body: "Organizations running mission-critical research infrastructure where configuration correctness is not optional - and testing alone is not sufficient.",
  },
];

export function EngagePage() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    domain: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Verification inquiry - ${formState.company || "General"}`,
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nCompany: ${formState.company}\nDomain: ${formState.domain}\n\n${formState.message}`,
    );
    window.location.href = `mailto:research@boundlessintuition.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero — pulled under the transparent sticky header, matching the
          landing page overlay (pt-24/pt-32 keeps copy clear of the bar). */}
      <section className="relative -mt-16 overflow-hidden border-b border-border">
        <div
          className="blueprint-grid absolute inset-0 opacity-100"
          aria-hidden
        />
        {/* live prose→logic lens field; the cursor is the lens */}
        <EngageHeroBackdrop />
        {/* legibility scrims — heavier on the left where the copy sits */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="pointer-events-none relative mx-auto max-w-7xl px-6 pt-24 pb-28 lg:pt-32">
          <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-foreground/70">§ VII</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Engage</span>
          </div>

          <h1 className="mb-10 max-w-[18ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:text-[4.4rem]">
            Bring us your rules.
          </h1>

          <div className="max-w-[58ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85">
            <p>
              We work with organizations to formalize the rules that govern
              their domain - standards, policies, regulations, protocols - into
              machine-checkable form. Then we build the verification layer that
              proves every decision conforms to them.
            </p>
            <p className="text-muted-foreground">
              This is not consulting. It is engineering. The output is not a
              report - it is a system that runs proofs, continuously, on every
              change, forever.
            </p>
          </div>
        </div>
      </section>

      {/* AI verification */}
      <section className="relative border-b border-border bg-muted/40">
        <div
          className="blueprint-grid-fine absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/40" />
                <span className="text-foreground/70">§ VII.i</span>
                <span className="text-muted-foreground/50">·</span>
                <span>AI verification</span>
              </div>
              <h2 className="max-w-[18ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
                Between your AI and production.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Your teams are already shipping AI into your domain. We make sure
              it cannot act outside the rules that govern it.
            </p>
          </div>

          <div className="mb-16 grid gap-10 text-[16px] leading-[1.65] lg:grid-cols-2">
            <p className="text-foreground/85">
              Copilots write configurations. Agents take actions. Models answer
              the questions your regulators care about. Each output is fluent,
              fast - and, on its own, impossible to trust. That gap between what
              an AI says and what your rules allow is the exposure formal
              verification closes.
            </p>
            <p className="text-muted-foreground">
              We sit a proof engine between your AI and production. Every answer
              is checked against the rules we formalized from your domain, and
              only the ones that pass - each carrying a signed, reproducible
              certificate - are allowed through. The rest are blocked before
              they ship, with the exact violation attached.
            </p>
          </div>

          {/* Where it sits in your stack */}
          <div className="relative grid gap-3 overflow-hidden rounded-sm border border-border bg-background/70 p-6 backdrop-blur-sm md:grid-cols-[1fr_auto_1.5fr_auto_1fr] md:items-stretch">
            {/* ASCII slipstream flowing the same direction as the answers */}
            <GateFlowBackdrop />
            <div className="pointer-events-none relative flex flex-col gap-2 rounded-sm border border-border bg-background p-5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Input
              </span>
              <span className="font-display text-[16px] font-medium tracking-tight text-foreground">
                Your AI
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                copilots · agents · models
              </span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none relative flex items-center justify-center py-1 text-foreground/40 md:py-0"
            >
              <span className="inline-block rotate-90 md:rotate-0">→</span>
            </div>
            <div className="pointer-events-none relative flex flex-col gap-2 rounded-sm border border-transparent bg-ink p-5 text-ink-foreground">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                Verification gate · your rules
              </span>
              <span className="font-display text-[16px] font-medium tracking-tight text-white">
                Checked against your formalized rules
              </span>
              <span className="font-mono text-[11px] text-white/50">
                proof · or a concrete counterexample
              </span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none relative flex items-center justify-center py-1 text-foreground/40 md:py-0"
            >
              <span className="inline-block rotate-90 md:rotate-0">→</span>
            </div>
            <div className="pointer-events-none relative flex flex-col gap-2 rounded-sm border border-border bg-background p-5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Output
              </span>
              <span className="font-display text-[16px] font-medium tracking-tight text-[oklch(0.48_0.09_220)] dark:text-[oklch(0.78_0.09_220)]">
                Production
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                only verified answers ship
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="mb-16">
            <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-foreground/70">§ VII.ii</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Process</span>
            </div>
            <h2 className="max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              How it works.
            </h2>
          </div>

          {/* Animated pipeline — the four steps as one continuous run */}
          <div className="relative mb-14 overflow-x-auto rounded-sm border border-border bg-muted/20 p-6">
            <PipelineBackdrop />
            <div className="pointer-events-none relative mx-auto h-44 min-w-[680px] max-w-5xl">
              <ProcessFlow />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="group relative flex min-h-[400px] flex-col overflow-hidden bg-[oklch(0.965_0.008_90)] dark:bg-[oklch(0.14_0.014_250)]"
              >
                {/* Live visual — full-bleed card background */}
                <EngageStepVisual index={i} />
                {/* legibility scrims */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/60 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[76%] bg-gradient-to-t from-background via-background/90 to-transparent" />
                {/* Copy — a fixed share of the card so titles align across cards */}
                <div className="pointer-events-none relative flex h-full flex-col p-6 lg:p-7">
                  <span className="grid size-10 place-items-center rounded-full border border-foreground/25 bg-background/60 font-mono text-[12px] tabular-nums text-foreground/70 backdrop-blur-sm transition-colors group-hover:border-foreground/50 group-hover:text-foreground">
                    {step.n}
                  </span>
                  <div className="mt-auto flex min-h-[56%] flex-col gap-3">
                    <h3 className="min-h-[2.4em] font-display text-[18px] font-medium leading-[1.2] tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative border-b border-border bg-muted/40">
        <div
          className="blueprint-grid-fine absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <div className="mb-16">
            <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-foreground/70">§ VII.iii</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Deliverables</span>
            </div>
            <h2 className="max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
              What you get.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {DELIVERABLES.map((d) => (
              <div
                key={d.title}
                className="rounded-sm border border-border bg-background/80 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="grid size-6 place-items-center rounded-full bg-[oklch(0.72_0.09_220)]/15 text-[10px] text-[oklch(0.72_0.09_220)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <h3 className="font-display text-[17px] font-medium tracking-tight text-foreground">
                    {d.title}
                  </h3>
                </div>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/40" />
                <span className="text-foreground/70">§ VII.iv</span>
                <span className="text-muted-foreground/50">·</span>
                <span>For</span>
              </div>
              <h2 className="max-w-[20ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
                Who this is for.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              If your domain has written rules and your organization needs
              provable assurance - not just test coverage - we should talk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
            {PROFILES.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-3 bg-background p-8"
              >
                <h3 className="font-display text-[17px] font-medium tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative border-b border-border bg-muted/40">
        <div
          className="blueprint-grid absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/40" />
                <span className="text-foreground/70">§ VII.v</span>
                <span className="text-muted-foreground/50">·</span>
                <span>Contact</span>
              </div>
              <h2 className="mb-8 max-w-[16ch] font-display text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem]">
                Start a conversation.
              </h2>
              <div className="max-w-[48ch] space-y-5 text-[16px] leading-[1.65] text-foreground/80">
                <p>
                  Tell us about your domain and the rules that govern it. We'll
                  assess whether formal verification is the right fit and scope
                  an initial engagement.
                </p>
                <p className="text-muted-foreground">
                  No pitch decks. No sales calls. Just engineers talking to
                  engineers about what can be proved.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="mailto:research@boundlessintuition.com"
                  className="group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-display text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
                >
                  research@boundlessintuition.com
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:pt-8">
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-sm border border-border bg-background/80 p-12 text-center backdrop-blur-sm">
                  <div>
                    <div className="mb-4 text-[oklch(0.72_0.09_220)]">
                      <span className="text-3xl">✓</span>
                    </div>
                    <h3 className="mb-2 font-display text-[19px] font-medium text-foreground">
                      Opening your email client
                    </h3>
                    <p className="text-[14px] text-muted-foreground">
                      If it didn't open, reach us directly at
                      research@boundlessintuition.com
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-sm border border-border bg-background/80 p-8 backdrop-blur-sm"
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="engage-name"
                        className="mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Name
                      </label>
                      <input
                        id="engage-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                        className="w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="engage-company"
                        className="mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Organization
                      </label>
                      <input
                        id="engage-company"
                        type="text"
                        value={formState.company}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            company: e.target.value,
                          }))
                        }
                        className="w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40"
                        placeholder="Company or institution"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="engage-domain"
                        className="mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Domain
                      </label>
                      <input
                        id="engage-domain"
                        type="text"
                        value={formState.domain}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            domain: e.target.value,
                          }))
                        }
                        className="w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40"
                        placeholder="e.g. Security, Healthcare, Finance"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="engage-message"
                        className="mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Tell us about your rules
                      </label>
                      <textarea
                        id="engage-message"
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((s) => ({
                            ...s,
                            message: e.target.value,
                          }))
                        }
                        className="w-full resize-none border-b border-border bg-transparent px-0 py-2.5 font-display text-[15px] text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/40"
                        placeholder="What rules govern your domain? What would you like to verify?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center gap-2 border border-foreground/40 bg-foreground/5 px-6 py-3 font-display text-[12px] font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground hover:bg-foreground/10"
                    >
                      Send inquiry
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
