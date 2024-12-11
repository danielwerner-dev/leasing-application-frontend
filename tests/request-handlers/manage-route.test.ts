import { authorizeManageRoute } from "$lib/request-handlers/manage-route";
import { ApplicationType } from "$lib/types/FrontendApplication.type";

jest.mock("@sveltejs/kit", () => {
  return {
    redirect: (status: number, url: string) => {
      status;
      url;
      throw "redirect";
    },
  };
});

jest.mock("$lib/config/environment.server", () => {
  return {
    config: {
      env: {
        VITE_CUSTOMER_PROFILE_URL: "https://example.com/profile",
      },
    },
  };
});

describe("authorize manage route access", () => {
  it("pass successfully", () => {
    const applicationType = ApplicationType.PRIMARY;
    const applicationStatus = "pending";

    expect(() =>
      authorizeManageRoute(applicationType, applicationStatus)
    ).not.toThrow();
  });

  it("throws a redirect for co-applicants", () => {
    const applicationType = ApplicationType.COAPPLICANT;
    const applicationStatus = "pending";

    expect(() =>
      authorizeManageRoute(applicationType, applicationStatus)
    ).toThrow();
  });

  it("throws a redirect for application not pending", () => {
    const applicationType = ApplicationType.PRIMARY;
    const applicationStatus = "draft";

    expect(() =>
      authorizeManageRoute(applicationType, applicationStatus)
    ).toThrow();
  });
});
