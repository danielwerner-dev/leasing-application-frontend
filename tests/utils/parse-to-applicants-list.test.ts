import { parseToApplicantsList } from "../../src/lib/utils/parse-to-applicants-list";

describe("parse getApplicantsPaymentSummary from the backend call", () => {
  const applicationFee = "50";
  const paymentSummary = [
    {
      applicationId: "e334fe30-9a97-4e06-8ba7-6d14372fdcd5",
      firstName: "Dolly",
      lastName: "Parton",
      email: "dolly@invitationhomes.com",
      type: "roommate",
      isPaid: false,
      paidById: "",
    },
  ];

  it("should return an empty array if paymentSummary is an empty array", () => {
    const summary = parseToApplicantsList([], applicationFee);
    expect(summary).toEqual([]);
  });

  it("should return a parsed response", () => {
    const summary = parseToApplicantsList(paymentSummary, "50");
    expect(summary[0]).toHaveProperty("firstName");
    expect(summary[0]).toHaveProperty("lastName");
    expect(summary[0]).toHaveProperty("id");
    expect(summary[0].fee).toEqual("50");
  });
});
