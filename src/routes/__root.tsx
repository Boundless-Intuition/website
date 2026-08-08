import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";
import { track, useVisitDigest } from "@/lib/analytics";
import { NotFound } from "@/components/site/NotFound";

function NotFoundComponent() {
  // Broken inbound links are worth knowing about; folded into the visit digest
  // rather than pushed on its own.
  useEffect(() => {
    track("page_not_found", {
      path: typeof window === "undefined" ? "" : window.location.pathname,
    });
  }, []);

  return <NotFound />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  // The SSR path already has elaborate error handling (see `src/server.ts`),
  // but client-side render failures were previously invisible in production.
  useEffect(() => {
    track("render_error", { message: error.message.slice(0, 200) });
  }, [error]);

  // No plate here, deliberately: this renders when something has already gone
  // wrong, and it must not depend on an asset fetch to be readable.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-[46ch]">
        <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Error
        </p>
        <h1 className="mb-6 font-display text-[2.2rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground">
          This page didn't load.
        </h1>
        <p className="text-[17px] leading-[1.7] text-foreground/85">
          Something failed on our end. Trying again often clears it; if it
          doesn't, the front door always works.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3 font-display text-[13px] font-medium">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3.5 text-background transition-all hover:bg-foreground/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="group inline-flex items-center gap-2 border border-foreground/30 bg-foreground/5 px-6 py-3.5 text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/10"
          >
            Back to the site
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title:
            "Boundless Intuition · Foundational layer for Verified Intelligence",
        },
        {
          name: "description",
          content:
            "Boundless Intuition builds the foundational layer for verified intelligence, formalizing domain rules into machine-checkable form and proving every AI answer correct before it reaches production. Founded 2026 in Geneva by research software engineers from CERN.",
        },
        { name: "author", content: "Boundless Intuition" },
        {
          property: "og:title",
          content:
            "Boundless Intuition · Foundational layer for Verified Intelligence",
        },
        {
          property: "og:description",
          content:
            "Machine-checkable verification for high-stakes AI. Every answer proved correct before it reaches production. Founded 2026 in Geneva by research software engineers from CERN.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://www.boundlessintuition.com/og/site.jpg",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "A colossal bronze gear mechanism in marble ruins over still water, rings of light spreading from it toward a figure holding a lantern",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://www.boundlessintuition.com/og/site.jpg",
        },
      ],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  // The site is dark, full stop. `dark` is written straight onto <html> in the
  // server-rendered markup rather than added by a pre-paint script: there is no
  // preference to read, so there is nothing to decide at runtime, and shipping
  // it in the HTML means it cannot flash or depend on JavaScript at all.
  //
  // The class stays even though nothing toggles it — the `dark:` variant is
  // `&:is(.dark *)`, so every `dark:` utility in the codebase needs an ancestor
  // carrying it.
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Sends the end-of-visit summary when the tab goes away.
  useVisitDigest();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
