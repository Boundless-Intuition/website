import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { SectionRail } from "@/components/site/SectionRail";
import { Hero } from "@/components/site/Hero";
import { VerificationMethod } from "@/components/site/VerificationMethod";
import { CoverageBand } from "@/components/site/CoverageBand";
import { VerificationValue } from "@/components/site/VerificationValue";
import { DomainGrid } from "@/components/site/DomainGrid";
import { Origin } from "@/components/site/Origin";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useSectionViews } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Scroll depth over the anchors the SectionRail highlights, so we can tell
  // whether the long-form argument gets read or everyone stops at the hero.
  useSectionViews();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <SectionRail />
      <main>
        <Hero />
        <VerificationMethod />
        <CoverageBand />
        <DomainGrid />
        <VerificationValue />
        <Origin />
      </main>
      <SiteFooter />
    </div>
  );
}
