import { applicantSchema as schema } from "$lib/schemas/manage-applicants.schema";

describe("manage applicant validator", () => {
  let mockCoapplicants: any;
  beforeEach(() => {
    mockCoapplicants = {
      firstName: "Test",
      lastName: "Validation",
      coapplicantType: "roommate",
      email: "test.validation@test.com",
      applicationStatus: "draft",
      invitationStatus: "invited",
    };
  });

  it("validates email address", () => {
    expect(schema.isValidSync(mockCoapplicants)).toBe(true);
  });

  it("require email address", () => {
    mockCoapplicants.email = null;
    expect(schema.isValidSync(mockCoapplicants)).toBe(false);
  });

  it("require email addresses to be unique among coapplicants", () => {
    expect(
      schema.isValidSync(mockCoapplicants, {
        abortEarly: false,
        context: {
          coapplicantApplicationsEmail: ["test.validation@test.com"],
        },
      })
    ).toBe(false);
  });

  it("validates email address unique among coapplicants", () => {
    expect(
      schema.isValidSync(mockCoapplicants, {
        abortEarly: false,
        context: {
          coapplicantApplicationsEmail: ["test2.validation@test.com"],
        },
      })
    ).toBe(true);
  });

  it("require email address to be not equal primary email", () => {
    expect(
      schema.isValidSync(mockCoapplicants, {
        abortEarly: false,
        context: {
          primaryEmail: "test.validation@test.com",
        },
      })
    ).toBe(false);
  });

  it("validates email address not equal primary email", () => {
    expect(
      schema.isValidSync(mockCoapplicants, {
        abortEarly: false,
        context: {
          primaryEmail: "test2.validation@test.com",
        },
      })
    ).toBe(true);
  });
});
