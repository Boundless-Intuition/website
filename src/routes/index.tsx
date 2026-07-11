import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Hero } from "@/components/site/Hero";
import { VerificationMethod } from "@/components/site/VerificationMethod";
import { VerificationValue } from "@/components/site/VerificationValue";
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
      <main>
        <Hero />
        <VerificationMethod />
        <DomainGrid />
        <VerificationValue />
        <ProofWalkthrough />
        <Origin />
      </main>
      <SiteFooter />
    </div>
  );
}
