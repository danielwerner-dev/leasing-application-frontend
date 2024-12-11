export enum PaymentType {
  NONE = "",
  ACH = "ACH",
  CREDITCARD = "CREDIT",
  DEBITCARD = "DEBIT",
}

export interface PaymentSectionApplicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fee: number;
  isPaid: boolean;
}

export interface PaymentParams {
  amountToPay: number;
  applicantsToPay: PaymentSectionApplicant[];
  paymentType: PaymentType;
}

export interface PaymentContext {
  nameOnAccount: string;
  accountType: string;
  paymentType: PaymentType;
  accountNumber: string;
  routingNumber: string;
}
