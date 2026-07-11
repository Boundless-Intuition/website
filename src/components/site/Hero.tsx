import { Link } from "@tanstack/react-router";
import { TrustPanel } from "./TrustPanel";
import { Astrolabe } from "./Astrolabe";

export function Hero() {
  return (
    <section
      id="doctrine"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        className="blueprint-grid absolute inset-0 opacity-100"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-56 -top-40 hidden text-foreground opacity-[0.14] lg:block"
      >
        <Astrolabe className="h-[720px] w-[720px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pt-24 pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pt-32">
        <div>
          <div className="mb-10 flex items-center gap-3 font-display text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-foreground/70">§ I</span>
            <span className="text-muted-foreground/50">·</span>
            <span>Doctrine</span>
          </div>

          <h1 className="mb-10 max-w-[16ch] font-display text-[3rem] font-light leading-[1.02] tracking-[-0.03em] text-foreground md:text-[3.6rem] lg:text-[4.4rem]">
            The trust layer for artificial intelligence.
          </h1>

          <div className="max-w-[54ch] space-y-5 text-[17px] leading-[1.6] text-foreground/85">
            <p>
              Modern AI is fluent, not correct. It speaks with the confidence of
              an expert and the accountability of a guess. In high-stakes
              domains, that gap is not an inconvenience - it is a liability.
            </p>
            <p className="text-muted-foreground">
              Boundless Intuition builds the verification layer for AI -
              formalizing domain rules into machine-checkable form and proving
              every answer correct before it reaches production.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4 font-display text-[12px] font-medium">
            <Link
              to="/engage"
              className="group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-5 py-3 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10"
            >
              Bring us your rules
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href="#walkthrough"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-foreground transition-colors hover:border-foreground"
            >
              Walk through a proof
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        <div className="lg:pt-4">
          <TrustPanel />
        </div>
      </div>
    </section>
  );
}
