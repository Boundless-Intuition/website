import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ParticleField,
  ParticleControls,
  defaultSettings,
  type ParticleSettings,
} from "@/components/ParticleField";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boundless Intuition — AI Physics Research Lab" },
      {
        name: "description",
        content:
          "It's not intelligence but intuition. An AI physics research lab founded by CERN researchers.",
      },
      { property: "og:title", content: "Boundless Intuition" },
      { property: "og:description", content: "It's not intelligence but intuition." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme, setTheme } = useTheme();
  const [particleSettings, setParticleSettings] = useState<ParticleSettings>(defaultSettings);
  const [crosshair, setCrosshair] = useState<{ x: number; y: number }>(() => ({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  }));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setCrosshair({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background p-6 text-foreground transition-colors duration-300 md:p-12"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Particle collision field */}
      <ParticleField settings={particleSettings} />


      {/* Crosshair guide lines */}
      {/* Crosshair guide lines — follow the cursor */}
      <div
        className="pointer-events-none fixed top-0 -z-0 h-full w-px bg-foreground/[0.06]"
        style={{ transform: `translateX(${crosshair.x}px)` }}
      />
      <div
        className="pointer-events-none fixed left-0 -z-0 h-px w-full bg-foreground/[0.06]"
        style={{ transform: `translateY(${crosshair.y}px)` }}
      />

      {/* Header */}
      <header className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0 space-y-1 fade-up">
          <h2 className="text-base font-semibold uppercase tracking-[0.18em] md:text-lg">
            Boundless Intuition
          </h2>
        </div>
        <Link
          to="/blog"
          className="group shrink-0 rounded-full border border-border px-4 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground fade-up delay-1"
        >
          Blog
          <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center py-16">
        <div className="grid w-full grid-cols-12 items-start gap-8">
          <div className="col-span-12 lg:col-span-11 lg:col-start-2">
            {/* Brand tagline */}
            <div className="mb-12 fade-up delay-1">
              <p
                className="text-balance text-4xl leading-tight tracking-tight md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                It&apos;s not intelligence
                <br />
                <em className="italic">it's intuition.</em>
              </p>
            </div>

            <blockquote className="relative">
              <h1
                className="fade-up delay-2 text-balance text-2xl leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;The intellect has little to do on the road to discovery. There comes a{" "}
                <em className="italic">leap in consciousness</em>, call it{" "}
                <a href="https://en.wikipedia.org/wiki/Intuition" target="_blank" rel="noopener noreferrer"><em className="italic underline decoration-foreground decoration-[3px] underline-offset-4">intuition</em></a> or what you will, and the solution
                comes to you.&rdquo;
              </h1>
              <footer className="mt-6 flex items-center gap-4 fade-up delay-3">
                <div className="h-px w-8 bg-foreground/20" />
                <cite className="text-xs font-light uppercase not-italic tracking-wide text-muted-foreground">
                  Albert Einstein
                </cite>
              </footer>
            </blockquote>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-start justify-between gap-6 fade-up delay-3 md:flex-row md:items-end">
        <div className="flex gap-8 text-[10px] uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Established</span>
            <span>2026</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Classification</span>
            <span>AI / Physics Research</span>
          </div>
          <div className="hidden flex-col gap-1 md:flex">
            <span className="text-muted-foreground">Coordinates</span>
            <span>46.2330&deg; N, 6.0557&deg; E</span>
          </div>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex flex-col gap-1 text-left uppercase tracking-widest transition-opacity hover:opacity-60"
          >
            <span className="text-muted-foreground">Mode</span>
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
        </div>

        <div className="flex items-end gap-6 md:flex-col md:items-end">
          <ParticleControls settings={particleSettings} onChange={setParticleSettings} />
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-3">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
                Founded by CERN Researchers
              </p>
              <div className="h-3 w-px bg-foreground/20" />
              <img
                src="/cern-logo-blue.svg"
                alt="CERN"
                className="h-5 w-auto opacity-75 dark:hidden"
              />
              <img
                src="/cern-logo-white.svg"
                alt="CERN"
                className="hidden h-5 w-auto opacity-60 dark:block"
              />
            </div>
            <a
              href="mailto:research@boundlessintuition.com"
              className="text-[10px] uppercase tracking-widest underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              research@boundlessintuition.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
