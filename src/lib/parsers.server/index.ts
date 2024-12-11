import type { BackendApplication } from "$lib/connectors/leasing-application-service/types/BackendApplication.type";
import {
  BACKEND_SECTION_IDS,
  BackendSectionId,
  SECTION_IDS_EXTENDED,
  SectionId,
} from "$lib/constants/sections";
import {
  ApplicationType,
  FrontendApplication,
  FrontendFormData,
} from "$lib/types/FrontendApplication.type";
import type Parser from "$lib/types/Parser.type";
import type { TemplateOptions } from "$lib/types/Parser.type";
import { PaymentType } from "$lib/types/payment.types";
import logger from "$lib/utils/logger";

import CoapplicantsParser from "./form-data/coapplicants.parser";
import DocumentsParser from "./form-data/documents.parser";
import EmploymentParser from "./form-data/employment.parser";
import GeneralParser from "./form-data/general.parser";
import PersonalDetailsParser from "./form-data/personal-details.parser";
import ResidenceParser from "./form-data/residence.parser";
import FilesParser from "./integration-data/files.parser";

const FRONTEND_SECTIONS: Record<BackendSectionId, SectionId> = {
  general: "general",
  personalDetails: "personalDetails",
  residence: "residence",
  employment: "employment",
  documents: "documents",
  coapplicants: "coapplicants",
};

export const SECTION_PARSERS: Record<SectionId, Parser> = {
  general: new GeneralParser(),
  personalDetails: new PersonalDetailsParser(),
  residence: new ResidenceParser(),
  employment: new EmploymentParser(),
  documents: new DocumentsParser(),
  coapplicants: new CoapplicantsParser(),
};

export const parseToFrontend = (
  application: BackendApplication
): FrontendApplication => {
  logger.info("Parsing application to Frontend", {
    applicationId: application.applicationId,
    customerId: application.customer?.customerId,
    property: application.property,
  });

  const completedSections = Object.keys(application.formData ?? {});

  const formData: Partial<FrontendFormData> = BACKEND_SECTION_IDS.reduce(
    (acc, section) => {
      const frontEndSection = FRONTEND_SECTIONS[section];
      const parser = SECTION_PARSERS[frontEndSection];
      if (completedSections.includes(section)) {
        return {
          ...acc,
          [frontEndSection]: parser.toFrontend(application.formData[section]),
        };
      }

      const templateOptions: TemplateOptions = {
        marketSlug: application.property.market.slug,
      };

      return {
        ...acc,
        [frontEndSection]: parser.getTemplate(templateOptions),
      };
    },
    {}
  );

  let activeSection = "intro";

  if (
    application.applicationId &&
    (completedSections.length > 0 ||
      application.applicationType === ApplicationType.PRIMARY)
  ) {
    activeSection = SECTION_IDS_EXTENDED[completedSections.length + 1];
  }

  const filesParser = new FilesParser();
  const integrationDataDocuments = filesParser.toFrontend(
    application.integrationData?.files
  );

  if (application.applicationType === ApplicationType.COAPPLICANT) {
    if (formData && formData.general && application.primaryApplicationData) {
      const {
        applicationType,
        firstName,
        lastName,
        leaseTerm,
        leaseStartDate,
      } = application.primaryApplicationData;
      formData.general.applicationType = applicationType;
      formData.general.firstName = firstName;
      formData.general.lastName = lastName;
      formData.general.leaseTerm = leaseTerm;
      formData.general.leaseStartDate = leaseStartDate;
    }
  }

  return {
    applicationId: application.applicationId,
    applicationType: application.applicationType,
    applicationStatus: application.applicationStatus,
    applicationVersion: application.applicationVersion,
    thirdPartyId: application.thirdPartyId,
    primaryApplicationId: application.primaryApplicationId,
    paidById: application.paidById,
    customer: {
      customerId: application.customer?.customerId || "",
      email: application.customer?.email || "",
    },
    property: {
      puCode: application.property.puCode,
      slug: application.property.slug,
      propertyUrl: application.property.propertyUrl,
      city: application.property.city,
      state: application.property.state,
      zipcode: application.property.zipcode,
      address1: application.property.address1,
      beds: application.property.beds,
      baths: application.property.baths,
      sqft: application.property.sqft,
      marketRent: application.property.marketRent,
      availableAt: application.property.availableAt,
      unitStatus: application.property.unitStatus,
      market: {
        slug: application.property.market.slug,
      },
      isSyndicated: application.property.isSyndicated,
    },
    formData: formData as FrontendFormData,
    integrationData: {
      files: {
        documents: integrationDataDocuments,
      },
      yardi: {
        guestcardId: application.integrationData?.yardi?.guestcardId || "",
        applicantId: application.integrationData?.yardi?.applicantId || "",
        paymentInfo: {
          description:
            application.integrationData?.yardi?.paymentInfo?.description || "",
          payerId:
            application.integrationData?.yardi?.paymentInfo?.payerId || "",
          paymentType:
            application.integrationData?.yardi?.paymentInfo?.paymentType ||
            PaymentType.NONE,
        },
      },
    },
    audit: {
      createdAt: application.audit.createdAt,
      updatedAt: application.audit.updatedAt,
    },
    activeSection,
    primaryApplicationData: {
      applicationType:
        application.primaryApplicationData?.applicationType || "",
      firstName: application.primaryApplicationData?.firstName || "",
      lastName: application.primaryApplicationData?.lastName || "",
      leaseStartDate: application.primaryApplicationData?.leaseStartDate || "",
      leaseTerm: application.primaryApplicationData?.leaseTerm || "",
    },
    promoted: application.promoted,
    permissions: application.permissions,
  };
};
