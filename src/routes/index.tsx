import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { SectionRail } from "@/components/site/SectionRail";
import { Hero } from "@/components/site/Hero";
import { VerificationMethod } from "@/components/site/VerificationMethod";
import { CoverageBand } from "@/components/site/CoverageBand";
import { VerificationValue } from "@/components/site/VerificationValue";
import { VerifyWidget } from "@/components/site/VerifyWidget";
import { DomainGrid } from "@/components/site/DomainGrid";
import { ProofWalkthrough } from "@/components/site/ProofWalkthrough";
import { Origin } from "@/components/site/Origin";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <SectionRail />
      <main>
        <Hero />
        <VerificationMethod />
        <CoverageBand />
        <VerifyWidget />
        <DomainGrid />
        <VerificationValue />
        <ProofWalkthrough />
        <Origin />
      </main>
      <SiteFooter />
    </div>
  );
}
