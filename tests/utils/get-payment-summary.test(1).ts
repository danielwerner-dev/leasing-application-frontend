import * as bff from "$lib/client-connectors/bff";
import {
  ApplicationType,
  FrontendApplication,
} from "$lib/types/FrontendApplication.type";
import * as utils from "$lib/utils/get-payment-summary";

import {
  getPaymentSummaryApiResponseMock,
  getPaymentSummaryMock,
} from "./mocks/get-payment-summary.mock";

jest.mock("$lib/client-connectors/bff", () => {
  return {
    getPaymentSummary: jest.fn(),
  };
});

describe("Get payment summary", () => {
  let application: FrontendApplication;

  beforeEach(() => {
    application = getPaymentSummaryMock() as FrontendApplication;
    jest
      .spyOn(bff, "getPaymentSummary")
      .mockResolvedValue(getPaymentSummaryApiResponseMock());
  });

  it("returns a list of coapplicants from formData.coapplicant if applicant is primary", async () => {
    const res = await utils.getPaymentSummary(
      application as FrontendApplication
    );

    expect(res).toStrictEqual({
      applicantList: [
        {
          email: "dollyparton@dolly.com",
          fee: 50,
          firstName: "dolly",
          id: "395ac22e-186c-4aa5-a7d1-502ad27926ce",
          isPaid: false,
          lastName: "parton",
        },
        {
          email: "postmalone@posty.com",
          fee: 50,
          firstName: "post",
          lastName: "malone",
          id: "415ac22e-186c-4aa5-a7d1-502ad27929bd",
          isPaid: false,
        },
      ],
      applicationFee: 50,
      hasAllFeesPaid: false,
      isCurrentApplicationPaid: false,
    });
  });

  it("executes call to leasing application service when co-applicant and returns applicant payment summary", async () => {
    application.applicationType = ApplicationType.COAPPLICANT;
    const res = await utils.getPaymentSummary(
      application as FrontendApplication
    );

    expect(bff.getPaymentSummary).toBeCalled();
    expect(res).toStrictEqual({
      applicantList: [
        {
          email: "dollyparton@dolly.com",
          fee: 50,
          firstName: "dolly",
          lastName: "parton",
          id: "395ac22e-186c-4aa5-a7d1-502ad27926ce",
          isPaid: false,
        },
        {
          email: "postmalone@posty.com",
          fee: 50,
          firstName: "post",
          lastName: "malone",
          id: "415ac22e-186c-4aa5-a7d1-502ad27929bd",
          isPaid: false,
        },
      ],
      applicationFee: 50,
      hasAllFeesPaid: false,
      isCurrentApplicationPaid: false,
    });
  });

  it("removes the current co-applicant from payment summary list", async () => {
    application.applicationType = ApplicationType.COAPPLICANT;
    application.applicationId = "395ac22e-186c-4aa5-a7d1-502ad27926ce";
    const res = await utils.getPaymentSummary(
      application as FrontendApplication
    );
    expect(bff.getPaymentSummary).toBeCalled();
    expect(res).toStrictEqual({
      applicantList: [
        {
          email: "postmalone@posty.com",
          fee: 50,
          firstName: "post",
          lastName: "malone",
          id: "415ac22e-186c-4aa5-a7d1-502ad27929bd",
          isPaid: false,
        },
      ],
      applicationFee: 50,
      hasAllFeesPaid: false,
      isCurrentApplicationPaid: false,
    });
  });
});
