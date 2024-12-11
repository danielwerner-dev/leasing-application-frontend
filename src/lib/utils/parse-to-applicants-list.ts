import type { GetPaymentSummaryResponse } from "$lib/types/paymentSummary.type";

export const parseToApplicantsList = (
  applicantsPaymentSummary: GetPaymentSummaryResponse[],
  applicationFee: string
) => {
  const applicantList = applicantsPaymentSummary.map(
    (applicant: GetPaymentSummaryResponse) => ({
      id: applicant.applicationId,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      email: applicant.email,
      fee: applicationFee,
      isPaid: applicant.isPaid,
    })
  );

  return applicantList;
};
