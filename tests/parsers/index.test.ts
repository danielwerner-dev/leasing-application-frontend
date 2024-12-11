import { parseToFrontend } from "$lib/parsers.server";
import GeneralParser from "$lib/parsers.server/form-data/general.parser";

import { getBackendMock } from "./index.mock";

import { getGeneralMock } from "./form-data/general.mock";

const generalParser = new GeneralParser();
const generalFrontendMock = getGeneralMock();

describe("Parser Index", () => {
  describe("parseToFrontend", () => {
    let backendData: any;
    beforeEach(() => {
      backendData = getBackendMock();
    });

    it("parses data to frontend application with no section completed", () => {
      const frontendData = parseToFrontend(backendData);

      expect(frontendData).toHaveProperty("formData");
      expect(Object.keys(frontendData.formData)).toHaveLength(6);
    });

    it("parses data to frontend with section completed", () => {
      backendData.formData.general =
        generalParser.toBackend(generalFrontendMock);

      const frontendData = parseToFrontend(backendData);

      expect(frontendData.formData.general).toEqual(generalFrontendMock);
    });

    it("parses data without application id", () => {
      backendData.applicationId = "";

      const frontendData = parseToFrontend(backendData);
      expect(frontendData.activeSection).toEqual("intro");
    });

    it("parses data with complete, partial or no integration data", () => {
      backendData.integrationData = undefined;
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      backendData.integrationData = {};
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      backendData.integrationData = { files: {}, yardi: {} };
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      backendData.integrationData = {
        files: {
          documents: {
            hello: "world",
          },
        },
        yardi: {
          guestcardId: "21234",
          applicantId: "1234",
          thirdPartyId: "1234",
          paymentId: "1234",
          paymentType: "ACH",
        },
      };
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();
    });

    it("parses data without complete, partial or no primary application data", () => {
      backendData.primaryApplicationData = undefined;
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      backendData.primaryApplicationData = {
        applicationType: "coapplicant",
        firstName: "Walter",
        lastName: "White",
        leaseStartDate: "09/10/2022",
        leaseTerm: "12",
      };
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();
    });

    it("parses data with primary application data", () => {
      backendData.applicationType = "coapplicant";
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      backendData.primaryApplicationData = {
        applicationType: "coapplicant",
        firstName: "Walter",
        lastName: "White",
        leaseStartDate: "09/10/2022",
        leaseTerm: "12",
      };

      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      const frontendData = parseToFrontend(backendData);

      expect(frontendData.applicationType).toEqual("coapplicant");
      expect(frontendData.formData.general.applicationType).toEqual(
        "coapplicant"
      );
    });

    it("parses data without complete, partial or no customer data", () => {
      backendData.customer = undefined;
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();

      backendData.customer = {
        customerId: "1234-1234",
        email: "customer@lease.com",
      };
      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();
    });

    it("parses data without form data", () => {
      backendData.formData = undefined;

      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();
    });

    it("parses data without main application", () => {
      backendData.primaryApplicationId = undefined;

      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();
    });

    it("parses data without main application", () => {
      backendData.primaryApplicationId = "7777-8888";

      const frontendData = parseToFrontend(backendData);
      expect(frontendData.primaryApplicationId).toEqual("7777-8888");
    });

    it("parses data without payment info", () => {
      backendData.integrationData.yardi.paymentInfo = undefined;

      expect(() => {
        parseToFrontend(backendData);
      }).not.toThrow();
    });

    it("parses data with payment info", () => {
      backendData.integrationData.yardi.paymentInfo = {
        paymentType: "CREDIT",
        description: "VISA-XXXX-1234",
        payerId: "1234",
      };

      const {
        integrationData: { yardi },
      } = parseToFrontend(backendData);
      expect(yardi.paymentInfo?.paymentType).toEqual("CREDIT");
      expect(yardi.paymentInfo?.description).toEqual("VISA-XXXX-1234");
      expect(yardi.paymentInfo?.payerId).toEqual("1234");
    });
  });
});
