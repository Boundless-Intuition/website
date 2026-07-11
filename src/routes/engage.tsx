import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { EngagePage } from "@/components/site/EngagePage";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/engage")({
  head: () => ({
    meta: [
      { title: "Engage - Boundless Intuition" },
      {
        name: "description",
        content:
          "Bring us the rules that govern your domain - standards, policies, regulations - and we build the verification layer that proves every decision conforms to them. Work with Boundless Intuition.",
      },
      { property: "og:title", content: "Engage - Boundless Intuition" },
      {
        property: "og:description",
        content:
          "Bring us your rules. We make them machine-checkable and prove every change safe, continuously.",
      },
    ],
  }),
  component: EngageRoute,
});

function EngageRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main>
        <EngagePage />
      </main>
      <SiteFooter />
    </div>
  );
}
