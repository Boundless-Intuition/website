import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
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
      <TopBar />
      <main>
        <Hero />
        <ThesisBand />
        <Origin />
      </main>
      <SiteFooter />
    </div>
  );
}
