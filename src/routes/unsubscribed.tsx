import { createFileRoute, Link } from "@tanstack/react-router";

// Post-unsubscribe landing. Not linked anywhere on the site; Buttondown
// redirects here after someone unsubscribes ("redirect after unsubscribe").

// Add names here to render individual typed signatures.
// Leave the array empty to sign generically as "The BI Labs team".
const COFOUNDERS: string[] = [];

const typewriter = {
  fontFamily: "'Courier Prime', 'Courier New', ui-monospace, monospace",
};

// A simple, light handwritten print for the greeting and the signature.
const hand = {
  fontFamily: "'Shadows Into Light', 'Bradley Hand', 'Segoe Print', cursive",
};

export const Route = createFileRoute("/unsubscribed")({
  head: () => ({
    meta: [
      { title: "Unsubscribed · Boundless Intuition" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Shadows+Into+Light&display=swap",
      },
    ],
  }),
  component: UnsubscribedRoute,
});

function Wordmark() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5 font-display text-[15px] tracking-tight text-foreground"
    >
      <span
        role="img"
        aria-label="Boundless Intuition"
        className="inline-block size-7 bg-foreground"
        style={{
          WebkitMaskImage: "url(/boundless_int_logo_white.png)",
          maskImage: "url(/boundless_int_logo_white.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <span>
        <span className="font-light">Boundless</span>{" "}
        <span className="font-semibold">Intuition</span>
      </span>
    </Link>
  );
}

function Signatures() {
  const names = COFOUNDERS.length ? COFOUNDERS : ["The BI Labs team"];
  return (
    <div className="flex flex-wrap items-end gap-x-10 gap-y-2">
      {names.map((name) => (
        <span
          key={name}
          style={hand}
          className="text-[21px] text-[oklch(0.17_0.03_250)]"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

function UnsubscribedRoute() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-20 text-foreground [--sig:oklch(0.48_0.09_220)] dark:[--sig:oklch(0.78_0.09_220)]">
      <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_36%,oklch(0.78_0.09_220/0.05),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex justify-center">
          <Wordmark />
        </div>

        {/* The typed sheet */}
        <div
          style={typewriter}
          className="mt-8 overflow-hidden rounded-sm border border-[oklch(0.22_0.03_250/0.15)] bg-[oklch(0.96_0.008_90)] p-9 text-[oklch(0.32_0.025_250)] shadow-[0_30px_70px_-35px_oklch(0.05_0.02_250/0.75)] md:p-12"
        >
          <div className="flex items-center justify-between border-b border-[oklch(0.22_0.03_250/0.15)] pb-4 text-[10px] uppercase tracking-[0.22em] text-[oklch(0.45_0.02_250)]">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[oklch(0.55_0.02_250)]" />
              Research signal
            </span>
            <span>Unsubscribed</span>
          </div>

          <h1
            style={hand}
            className="mt-6 text-[28px] leading-[1.2] text-[oklch(0.16_0.03_250)] md:text-[32px]"
          >
            You're all set.
          </h1>

          <div className="mt-7 space-y-4 text-[15px] leading-[1.8]">
            <p>You're unsubscribed, and that is completely okay.</p>
            <p>
              No more emails from us. Thank you for the time and attention you
              gave the work while you were here. It meant a lot.
            </p>
            <p>
              If you ever want the research back, the door stays open. Until
              then, keep everything verifiable.
            </p>
          </div>

          <div className="mt-9">
            <p className="text-[15px] text-[oklch(0.32_0.025_250)]">Yours,</p>
            <div className="mt-2.5">
              <Signatures />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.5_0.02_250)]">
              Boundless Intuition · Geneva · 46.2330° N 6.0557° E
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a
            href="/#signal"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--sig)] transition-opacity hover:opacity-80"
          >
            Changed your mind? Resubscribe
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to the site
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
