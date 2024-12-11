import type { FileInfo } from "@invitation-homes/svelte-ui";

export const documentTypes = [
  "government-issued-id",
  "income-proof",
  "receipt",
  "supplementary",
] as const;
export type DocumentType = (typeof documentTypes)[number];

export const documentGroups = [
  "government",
  "proofOfIncome",
  "vouchers",
  "supplemental",
] as const;
export type DocumentGroup = (typeof documentGroups)[number];

export interface DocumentRecord {
  documents: Record<DocumentGroup, FileInfo[]>;
}

export interface DocumentValues {
  uploadDisabled: Record<DocumentGroup, boolean>;
  files: FileInfo[];
}

export const documentGroupTypes: Record<DocumentGroup, DocumentType> = {
  government: "government-issued-id",
  proofOfIncome: "income-proof",
  vouchers: "receipt",
  supplemental: "supplementary",
};

export const documentTypeGroups: Record<DocumentType, DocumentGroup> = {
  "government-issued-id": "government",
  "income-proof": "proofOfIncome",
  receipt: "vouchers",
  supplementary: "supplemental",
};

export const acceptedType: Record<DocumentGroup, string[]> = {
  government: ["pdf", "jpeg", "jpg", "png"],
  proofOfIncome: ["pdf", "jpeg", "jpg", "png"],
  vouchers: ["pdf", "jpeg", "jpg", "png"],
  supplemental: ["pdf", "jpeg", "jpg", "png"],
};
export const documentLimit: Record<DocumentGroup, number> = {
  government: 4,
  proofOfIncome: 4,
  vouchers: 4,
  supplemental: 4,
};
