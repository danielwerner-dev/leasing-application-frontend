import { PaymentType } from "$lib/types/payment.types";

import { parsePaymentDescription } from "../../src/lib/utils/payment-info";

describe("parsePaymentDescription", () => {
  it("should return expected values when payment type equals credit card", () => {
    const description = "VISA-XXXX-1234";

    const parsed = parsePaymentDescription(description, PaymentType.CREDITCARD);
    expect(parsed.cardBrand).toEqual("VISA");
    expect(parsed.lastDigits).toEqual("1234");
  });

  it("should return expected values when payment type equals debit card", () => {
    const description = "VISA-XXXX-1234";

    const parsed = parsePaymentDescription(description, PaymentType.DEBITCARD);
    expect(parsed.cardBrand).toEqual("VISA");
    expect(parsed.lastDigits).toEqual("1234");
  });

  it("should return expected values when payment type equals ACH", () => {
    const description = "xxxxx1234-xxxxx5678";

    const parsed = parsePaymentDescription(description, PaymentType.ACH);
    expect(parsed.cardBrand).toEqual("");
    expect(parsed.lastDigits).toEqual("5678");
  });

  it("should return default values when empty description passed", () => {
    const description = "";

    const parsed = parsePaymentDescription(description, PaymentType.ACH);
    expect(parsed.cardBrand).toEqual("");
    expect(parsed.lastDigits).toEqual("");
  });

  it("should return default values when undefined description passed", () => {
    const parsed = parsePaymentDescription(
      undefined as unknown as string,
      PaymentType.CREDITCARD
    );

    expect(parsed.cardBrand).toEqual("");
    expect(parsed.lastDigits).toEqual("");
  });
});
