// The on-page sections of the home page, in document order. Ids must match the
// section anchors rendered by the components in `src/components/site/` (see the
// hrefs the TopBar/footer point at).
//
// Shared by the scroll-spy rail (`SectionRail`) and the scroll-depth analytics
// hook (`useSectionViews` in `./analytics`), so the two can never drift apart.
export const SECTIONS = [
  { id: "doctrine", label: "Doctrine" },
  { id: "method", label: "Method" },
  { id: "try", label: "Demonstration" },
  { id: "domains", label: "Domains" },
  { id: "value", label: "Value" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "lab", label: "Lab" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
