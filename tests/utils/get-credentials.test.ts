import { getCredentials } from "$lib/utils/get-credentials.server";

const mockIdToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImhlbGxvLXdvcmxkIn0.QcfhqPIE91Trd-8heqr9EDrXV2b6lg1LlT60kQ3iBjU";

describe("getCredentials", () => {
  it("return the id token and customerId", () => {
    const cookie = `idToken=${mockIdToken}; someOtherStuff=asjdfkljasdfkljasjdfalsjdalfj`;
    const { customerId, idToken } = getCredentials(cookie);

    expect(customerId).toEqual("hello-world");
    expect(idToken).toEqual(mockIdToken);
  });

  it("returns empty object with invalid cookie", () => {
    const cookie = `asjdfkljasdfkljasjdfalsjdalfj`;
    expect(getCredentials(cookie)).toEqual({});
  });

  it("returns empty object with empty cookie", () => {
    expect(getCredentials(undefined as unknown as string)).toEqual({});
  });

  it("returns empty object with invalid token", () => {
    const cookie = `idToken=my-invalid-token; someOtherStuff=asjdfkljasdfkljasjdfalsjdalfj`;
    expect(getCredentials(cookie)).toEqual({});
  });

  it("returns an empty object with cookie without token", () => {
    const cookie = "someOtherStuff=asjdfkljasdfkljasjdfalsjdalfj";
    expect(getCredentials(cookie)).toEqual({});
  });
});
