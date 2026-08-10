import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome, CHROME_PULL } from "@/components/site/SiteChrome";
import { Hero } from "@/components/site/Hero";
import { ThesisBand } from "@/components/site/ThesisBand";
import { Origin } from "@/components/site/Origin";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useSectionViews } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Scroll depth over the page's section anchors, so we can tell whether the
  // argument gets read or everyone stops at the hero.
  useSectionViews();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteChrome />
      {/* The hero's own -mt-16 clears the top bar; CHROME_PULL clears the strip
          above it, so the plate starts at the top of the viewport and runs up
          behind the whole pinned stack. See SiteChrome for why flow-root is
          load-bearing. */}
      <main className={`flow-root ${CHROME_PULL}`}>
        <Hero />
        <ThesisBand />
        <Origin />
      </main>
      <SiteFooter />
    </div>
  );
}
