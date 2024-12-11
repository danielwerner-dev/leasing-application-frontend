import { getApplicationFee } from "$lib/utils/application-fee";

describe("application fee", () => {
  it("gets the california fee when `los-angeles-ca` or `sacramento-ca` is the marketSlug", () => {
    expect(getApplicationFee("los-angeles-ca")).toEqual(45);
    expect(getApplicationFee("sacramento-ca")).toEqual(45);
  });

  it("gets the default fee value for other market slugs", () => {
    expect(getApplicationFee("not-california")).toEqual(50);
    expect(getApplicationFee("carolinas")).toEqual(50);
  });
});
