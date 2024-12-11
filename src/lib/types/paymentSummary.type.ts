export interface GetPaymentSummaryResponse {
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  isPaid: boolean;
  paidById: string;
}

export interface ApplicantPaymentSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fee: number;
  isPaid: boolean;
}

export interface PaymentSummary {
  applicationFee: number;
  applicantList: ApplicantPaymentSummary[];
  isCurrentApplicationPaid: boolean;
  hasAllFeesPaid: boolean;
}
