import type { InferType } from "yup";

import type { applicantSchema } from "$lib/schemas/manage-applicants.schema";

export type InvitationStatus = "invited" | "error";

export type Applicant = InferType<typeof applicantSchema>;
