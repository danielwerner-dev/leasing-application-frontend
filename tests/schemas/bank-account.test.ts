import validator from "$lib/schemas/bank-account.schema";

describe("bank account validator", () => {
  let payload: any;
  beforeEach(() => {
    payload = {
      nameOnAccount: "Billy Idol",
      accountType: "checking",
      accountNumber: "1234",
      accountNumberConfirmation: "1234",
      routingNumber: "1234",
      routingNumberConfirmation: "1234",
    };
  });

  it("passes with a valid bank account", () => {
    expect(validator.isValid(payload)).toBe(true);
  });

  it("fails when account type is empty", () => {
    payload.accountType = "";
    expect(validator.isValid(payload)).toBe(false);
  });

  it("fails when account name has invalid characters", () => {
    payload.nameOnAccount = "Billy 1d0l";
    expect(validator.isValid(payload)).toBe(false);
  });

  it("fails when account type is not a valid value selection", () => {
    payload.accountType = "invalid value";
    expect(validator.isValid(payload)).toBe(false);
  });

  it("requires matching account number", () => {
    payload.accountNumber = "55432";

    expect(validator.isValid(payload)).toBe(false);
  });

  it("requires matching routing number", () => {
    payload.routingNumber = "55432";

    expect(validator.isValid(payload)).toBe(false);
  });
});
