import { PaymentType } from "$lib/types/payment.types";

export const parsePaymentDescription = (
  description: string,
  paymentType: PaymentType
): {
  lastDigits: string;
  cardBrand: string;
} => {
  let lastDigits = "";
  let cardBrand = "";

  if (paymentType === PaymentType.ACH) {
    lastDigits = /\d+$/.exec(description)?.[0] ?? "";
  } else {
    const splitPaymentDescription = description ? description.split("-") : [];
    lastDigits = splitPaymentDescription[2] ?? "";
    cardBrand = splitPaymentDescription[0] ?? "";
  }

  return {
    lastDigits,
    cardBrand,
  };
};
