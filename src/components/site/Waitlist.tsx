import { useState } from "react";
import { subscribeToWaitlist } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

// A browsable stack of recent write-ups, so people see the kind of thing
// they're signing up for. Pulled from real reports; newest first.
const UPDATES = [
  {
    date: "2026.07.13",
    tag: "Most recent",
    title:
      "Frontier models fail published clinical risk scores 20 to 45% of the time",
    excerpt:
      "Across six clinical calculators, the strongest models were wrong on up to 45% of cases. A deterministic rule, never another model, caught every miss, at a fraction of the cost of the call it checked.",
    meta: "verified · full report",
  },
  {
    date: "2026.07.06",
    tag: "Earlier",
    title: "The most capable model didn't win, and cost roughly 2× more",
    excerpt:
      "Our most expensive tier scored below both Opus and Sonnet on the harder benchmark, at about twice the cost per question. For this work, capability and spend aren't the same axis.",
    meta: "benchmark · 4 model tiers",
  },
  {
    date: "2026.06.27",
    tag: "Earlier",
    title: "Verifying an answer runs 15 to 50× cheaper than the call it checks",
    excerpt:
      "A deterministic rule runs in well under a millisecond. Priced per correct answer it's effectively free, since a wrong answer wastes its API spend too, so checking every one lowers the real cost.",
    meta: "cost analysis · from the ledger",
  },
];

/**
 * The research-updates signup, embedded as the top strip of the site footer.
 * Left: the pitch and email capture (through the `subscribeToWaitlist` server
 * function, so the newsletter key stays server-side). Right: the most recent
 * write-up, so people see what they'd actually receive.
 */
export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");
    try {
      const result = await subscribeToWaitlist({
        data: { email, topics: [] },
      });
      if (result.ok) {
        setMessage(
          result.status === "already"
            ? "You're already subscribed. Nothing to do."
            : "",
        );
        setStatus("success");
      } else {
        setMessage(
          result.reason === "unconfigured"
            ? "Signups aren't open just yet. Reach us at research@boundlessintuition.com in the meantime."
            : "Something went wrong on our end. Please try again in a moment.",
        );
        setStatus("error");
      }
    } catch {
      setMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  };

  return (
    <div
      id="signal"
      className="relative z-10 scroll-mt-20 border-b border-border bg-muted/30 [--sig:oklch(0.48_0.11_170)] dark:[--sig:oklch(0.78_0.13_170)]"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.92fr] lg:gap-20">
        {/* Left: pitch and capture */}
        <div>
          <div className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="relative grid size-2.5 place-items-center">
              <span className="wl-ping absolute inset-0 rounded-full bg-[var(--sig)]" />
              <span className="size-1.5 rounded-full bg-[var(--sig)]" />
            </span>
            <span>Research updates</span>
          </div>

          <h2 className="max-w-[16ch] font-display text-[2rem] font-light leading-[1.06] tracking-[-0.02em] text-foreground md:text-[2.6rem]">
            The work, as we publish it.
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">
            New benchmarks, verification results, and tooling, sent when we
            have a real finding to share rather than on a schedule. Technical,
            infrequent, and no marketing.
          </p>

          <div className="mt-8 max-w-md">
            {status === "success" ? (
              <div className="flex items-center gap-4">
                <div
                  className="seal-stamp grid size-11 shrink-0 place-items-center rounded-full border-2 border-[var(--sig)] font-display text-[18px] text-[var(--sig)]"
                  aria-hidden
                >
                  ∎
                </div>
                <div>
                  <p className="font-display text-[16px] font-medium tracking-tight text-foreground">
                    You're subscribed.
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                    {message || (
                      <>
                        We'll send new results to{" "}
                        <span className="text-foreground">{email}</span> as we
                        publish them. Check your inbox to confirm.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="group relative flex-1">
                    <label
                      htmlFor="waitlist-email"
                      className="mb-2 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@organization.com"
                      className="w-full border-b border-border bg-transparent px-0 py-2.5 font-display text-[16px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-transparent"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--sig)] transition-transform duration-300 ease-out group-focus-within:scale-x-100"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 border border-foreground/40 bg-foreground/5 px-6 py-3 font-display text-[12px] font-medium uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground hover:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        Subscribing
                        <span className="flex gap-[3px]" aria-hidden>
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="wl-bar h-2.5 w-[2px] bg-current"
                              style={{ animationDelay: `${i * 0.16}s` }}
                            />
                          ))}
                        </span>
                      </>
                    ) : (
                      <>
                        Subscribe
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-3 border-l-2 border-[oklch(0.55_0.16_25)] pl-3 text-[13px] leading-relaxed text-[oklch(0.5_0.16_25)] dark:border-[oklch(0.7_0.16_25)] dark:text-[oklch(0.75_0.15_25)]"
                  >
                    {message}
                  </p>
                )}
                <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
                  Unsubscribe anytime. We'll never share your address.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Right: a browsable stack of recent updates */}
        <UpdateStack />
      </div>
    </div>
  );
}

/**
 * A browsable deck of recent write-ups. The front card shows in full; the
 * rest peek beneath as a tapering stack. Click the deck (or use the ←/→
 * controls) to bring the next one forward with a smooth transition.
 */
function UpdateStack() {
  const [active, setActive] = useState(0);
  const n = UPDATES.length;
  const go = (delta: number) => setActive((a) => (a + delta + n) % n);

  return (
    <div className="mx-auto w-full max-w-md lg:mx-0">
      <div className="relative h-[252px]">
        {UPDATES.map((u, i) => {
          // 0 = front, 1 = one back, and so on. Drives the stacked offset.
          const depth = (i - active + n) % n;
          const front = depth === 0;
          return (
            <article
              key={u.date}
              aria-hidden={!front}
              className="absolute inset-x-0 top-0 flex h-[210px] flex-col rounded-sm border border-border bg-background/95 shadow-sm backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.25,1)]"
              style={{
                transform: `translateY(${depth * 18}px) scale(${1 - depth * 0.04})`,
                transformOrigin: "top center",
                opacity: depth === 0 ? 1 : depth === 1 ? 0.6 : 0.32,
                zIndex: n - depth,
                pointerEvents: "none",
              }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{u.tag}</span>
                <span className="tabular-nums text-foreground/60">
                  {u.date}
                </span>
              </div>

              <div className="flex-1 overflow-hidden px-5 py-4">
                <h3 className="line-clamp-2 font-display text-[16.5px] font-medium leading-[1.25] tracking-tight text-foreground">
                  {u.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                  {u.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[10.5px] text-muted-foreground">
                <span className="flex items-center gap-1.5 text-[var(--sig)]">
                  <span aria-hidden>∎</span>
                  {u.meta}
                </span>
                <span className="text-foreground/55">Boundless Intuition</span>
              </div>
            </article>
          );
        })}

        {/* Whole-deck click target → next card (mouse affordance; the
            explicit ←/→ buttons below carry keyboard + screen-reader use). */}
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => go(1)}
          className="absolute inset-0 z-20 cursor-pointer"
          style={{ height: "210px" }}
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {active + 1} / {n} · recent updates
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous update"
            className="grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next update"
            className="grid size-8 place-items-center rounded-sm border border-border text-foreground/70 transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
