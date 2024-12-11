export interface Section {
  id: SectionId | "intro" | "payment";
  title: string;
}

export const SECTIONS: Section[] = [
  { id: "intro", title: "Overview" },
  { id: "general", title: "General info" },
  { id: "personalDetails", title: "Personal details" },
  { id: "residence", title: "Residence" },
  { id: "employment", title: "Employment" },
  { id: "documents", title: "Documents" },
  { id: "coapplicants", title: "Applicants" },
  { id: "payment", title: "Pay & Submit" },
];

export const SECTION_IDS = [
  "general",
  "personalDetails",
  "residence",
  "employment",
  "documents",
  "coapplicants",
] as const;

export const BACKEND_SECTION_IDS = [
  "general",
  "personalDetails",
  "residence",
  "employment",
  "documents",
  "coapplicants",
] as const;

export const SECTION_IDS_EXTENDED = [
  "intro",
  ...SECTION_IDS,
  "payment",
] as const;

export const CALIFORNIA_MARKETS = ["los-angeles-ca", "sacramento-ca"];

export type SectionId = (typeof SECTION_IDS)[number];
export type SectionIdExtended = (typeof SECTION_IDS_EXTENDED)[number];
export type BackendSectionId = (typeof BACKEND_SECTION_IDS)[number];

export const getSection = (sectionId: string) => {
  const selectedSection = SECTIONS.find((section) => section.id === sectionId);

  if (!selectedSection) {
    throw new Error(
      `[sections:getSection] Section does not exist for id: ${sectionId}`
    );
  }

  return selectedSection;
};
