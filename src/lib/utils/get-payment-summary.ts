import { getPaymentSummary as getPaymentSummaryConnector } from "$lib/client-connectors/bff";
import type { FrontendApplication } from "$lib/types/FrontendApplication.type";
import { ApplicationType } from "$lib/types/FrontendApplication.type";
import type {
  ApplicantPaymentSummary,
  PaymentSummary,
} from "$lib/types/paymentSummary.type";
import { getApplicationFee } from "$lib/utils/application-fee";

import type { PaymentSectionApplicant } from "$lib/types/payment.types";

export const getPaymentSummary = async (
  application: FrontendApplication
): Promise<PaymentSummary | undefined> => {
  let isCurrentApplicationPaid = false;
  let hasAllFeesPaid = false;
  let applicantList: PaymentSectionApplicant[] = [];
  const applicationFee = getApplicationFee(application.property.market.slug);

  if (
    application.applicationType === ApplicationType.PRIMARY &&
    !application.promoted
  ) {
    applicantList = application.formData.coapplicants.coapplicants.map(
      (coapp) => ({
        id: coapp.id,
        firstName: coapp.firstName,
        lastName: coapp.lastName,
        email: coapp.email,
        fee: applicationFee,
        isPaid: false,
      })
    );

    isCurrentApplicationPaid = Boolean(application.paidById);
    hasAllFeesPaid = false;
  } else {
    const res = await getPaymentSummaryConnector(application, applicationFee);

    // remove current applicant from list
    applicantList = res.applicantList.filter(
      (applicant: ApplicantPaymentSummary) =>
        applicant.id !== application.applicationId
    );
    isCurrentApplicationPaid = res.isCurrentApplicationPaid;
    hasAllFeesPaid = res.hasAllFeesPaid;
  }

  return {
    isCurrentApplicationPaid,
    hasAllFeesPaid,
    applicationFee,
    applicantList,
  };
};
