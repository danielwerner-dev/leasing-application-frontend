import { getLastFourDigits } from "$lib/utils/get-last-four-digits";

describe("Get last four numbers from a number", () => {
  it("returns the last four numbers", () => {
    const accountNum = "123456789";
    const expectedNumber = "6789";

    const num = getLastFourDigits(accountNum);
    expect(num).toEqual(expectedNumber);
  });

  it("returns all the numbers when there is only 3 numbers", () => {
    const accountNum = "123";
    const expectedNumber = "123";

    const num = getLastFourDigits(accountNum);
    expect(num).toEqual(expectedNumber);
  });

  it("returns all the numbers when there is only four numbers ", () => {
    const accountNum = "9877";
    const expectedNumber = "9877";

    const num = getLastFourDigits(accountNum);
    expect(num).toEqual(expectedNumber);
  });

  it("should fail if number is missing", () => {
    expect(() => getLastFourDigits(undefined as any as string)).toThrowError(
      "number is required"
    );
  });

  it("should fail if number is null", () => {
    const nullAccount: any = null;
    expect(() => getLastFourDigits(nullAccount)).toThrowError(
      "must be a number"
    );
  });

  it("should fail if number is a string", () => {
    expect(() => getLastFourDigits("not a number")).toThrowError(
      "must be a number"
    );
  });
});
