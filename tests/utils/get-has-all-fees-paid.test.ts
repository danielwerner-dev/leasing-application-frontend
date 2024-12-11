import type { FrontendApplication } from "$lib/types/FrontendApplication.type";
import type { GetPaymentSummaryResponse } from "$lib/types/paymentSummary.type";
import { getHasAllFeesPaid } from "$lib/utils/get-has-all-fees-paid";

describe("Payment Summary - Has all fees paid", () => {
  let paymentSummary: GetPaymentSummaryResponse[];
  let application: FrontendApplication;

  beforeEach(() => {
    paymentSummary = [
      {
        applicationId: "e334fe30-9a97-4e06-8ba7-6d14372fdcd5",
        firstName: "Dolly",
        lastName: "Parton",
        email: "dolly@invitationhomes.com",
        type: "roommate",
        isPaid: true,
        paidById: "123",
      },
    ];

    application = { paidById: "" } as FrontendApplication;
  });
  it("should return true if application has been paid for", () => {
    const res = getHasAllFeesPaid(
      paymentSummary,
      application as FrontendApplication
    );
    expect(res).toBe(true);
  });

  it("should return true if application has been paid for", () => {
    paymentSummary[0].isPaid = false;
    const res = getHasAllFeesPaid(
      paymentSummary,
      application as FrontendApplication
    );
    expect(res).toBe(false);
  });

  it("should throw an error if application is not passed", () => {
    expect(() =>
      getHasAllFeesPaid(paymentSummary, undefined as any)
    ).toThrowError("application is required");
  });

  it("should throw an error if paymentSummary is not passed", () => {
    expect(() => getHasAllFeesPaid(undefined as any, application)).toThrowError(
      "payment summary array required"
    );
  });
});
