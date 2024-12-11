import type { FileInfo } from "@invitation-homes/svelte-ui";

import type { FrontendCoapplicants } from "$lib/types/form-data/frontend/FrontendCoApplicants.type";
import type { FrontendDocuments } from "$lib/types/form-data/frontend/FrontendDocuments.type";
import type { FrontendEmployment } from "$lib/types/form-data/frontend/FrontendEmployment.type";
import type { FrontendGeneral } from "$lib/types/form-data/frontend/FrontendGeneral.type";
import type { FrontendPersonalDetails } from "$lib/types/form-data/frontend/FrontendPersonalDetails.type";
import type { FrontendResidences } from "$lib/types/form-data/frontend/FrontendResidences.type";
import type { TemplateCoapplicants } from "$lib/types/form-data/templates/TemplateCoApplicants.type";
import type { TemplateDocuments } from "$lib/types/form-data/templates/TemplateDocuments.type";
import type { TemplateEmployment } from "$lib/types/form-data/templates/TemplateEmployment.type";
import type { TemplateGeneral } from "$lib/types/form-data/templates/TemplateGeneral.type";
import type { TemplatePersonalDetails } from "$lib/types/form-data/templates/TemplatePersonalDetails.type";
import type { TemplateResidences } from "$lib/types/form-data/templates/TemplateResidences.type";

import type { PaymentType } from "./payment.types";
import type { DocumentGroup } from "$lib/types/Document.types";

export enum ApplicationType {
  PRIMARY = "primary",
  COAPPLICANT = "coapplicant",
}

export enum ApplicationStatus {
  created = "created",
  draft = "draft",
  pending = "pending",
  deleted = "deleted",
  denied = "denied",
  approved = "approved",
  canceled = "canceled",
}

export enum ApplicationPermission {
  EDIT = "canEditApplication",
  MANAGE = "canManageApplicants",
  PAYMENTS = "canMakePayments",
  DOCUMENTS = "canAddDocuments",
  DOWNLOAD = "canDownloadPDF",
  DELETE = "canDeleteApplication",
}

export interface FrontendFormData {
  general: FrontendGeneral | TemplateGeneral;
  personalDetails: FrontendPersonalDetails | TemplatePersonalDetails;
  residence: FrontendResidences | TemplateResidences;
  employment: FrontendEmployment | TemplateEmployment;
  documents: FrontendDocuments | TemplateDocuments;
  coapplicants: FrontendCoapplicants | TemplateCoapplicants;
}

export interface FrontendProperty {
  puCode: string;
  slug: string;
  propertyUrl: string;
  address1: string;
  city: string;
  state: string;
  zipcode: string;
  beds: number;
  baths: string;
  sqft: number;
  marketRent: string;
  availableAt: string;
  unitStatus: string;
  market: {
    slug: string;
  };
  isSyndicated: boolean;
}

export interface FrontendCustomer {
  customerId: string;
  email: string;
}

export interface FrontendPrimaryApplicationData {
  leaseStartDate: string;
  lastName: string;
  firstName: string;
  applicationType: string;
  leaseTerm: string;
}

export type FrontendDocumentFile =
  | FileInfo
  | {
      file: {
        name?: string;
        singleDocument?: string;
      };
      documentTitle?: string;
    };

export type FrontendYardiPaymentInfo = {
  paymentType?: PaymentType;
  description?: string;
  payerId?: string;
};

export interface FrontendIntegrationYardi {
  guestcardId?: string;
  applicantId?: string;
  paymentInfo?: FrontendYardiPaymentInfo;
}

export interface FrontendApplication {
  activeSection: string;
  applicationId: string;
  applicationType: ApplicationType;
  applicationStatus: ApplicationStatus;
  applicationVersion: string;
  thirdPartyId: string;
  paidById: string;
  primaryApplicationId: string;
  customer: FrontendCustomer;
  property: FrontendProperty;
  formData: FrontendFormData;
  primaryApplicationData: FrontendPrimaryApplicationData;
  integrationData: {
    files: {
      documents: Record<DocumentGroup, FrontendDocumentFile[]>;
    };
    yardi: FrontendIntegrationYardi;
  };
  promoted: boolean;
  audit: {
    createdAt: string;
    updatedAt: string;
  };
  permissions: {
    [key in ApplicationPermission]?: boolean;
  };
}
