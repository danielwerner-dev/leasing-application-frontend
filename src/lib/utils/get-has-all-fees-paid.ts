import { array, object } from "yup";

import type { FrontendApplication } from "$lib/types/FrontendApplication.type";
import type { GetPaymentSummaryResponse } from "$lib/types/paymentSummary.type";

const validApp = object().required("application is required");
const validPaymentSummary = array().required("payment summary array required");

export const getHasAllFeesPaid = (
  applicantsPaymentSummary: GetPaymentSummaryResponse[],
  application: FrontendApplication
): boolean => {
  validApp.validateSync(application);
  validPaymentSummary.validateSync(applicantsPaymentSummary);

  if (applicantsPaymentSummary.length) {
    return applicantsPaymentSummary.every(({ isPaid }) => isPaid);
  } else {
    return Boolean(application.paidById);
  }
};
