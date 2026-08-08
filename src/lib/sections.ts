// The on-page sections of the home page, in document order. Ids must match the
// section anchors rendered by the components in `src/components/site/` (see the
// hrefs the TopBar/footer point at).
//
// Shared by the scroll-depth analytics hook (`useSectionViews` in `./analytics`)
// and the TopBar/footer link lists, so the three can never drift apart.
export const SECTIONS = [
  { id: "doctrine", label: "Doctrine" },
  { id: "lab", label: "Lab" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
