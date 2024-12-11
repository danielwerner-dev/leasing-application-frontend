import { parsePropertyCode } from "$lib/utils/property/convert-pu-code";

describe("Convert Property Unit Code Function", () => {
  it("Should convert a valid pucode to the property id ", () => {
    const pucode = "12345-67890";
    const propertyCode = parsePropertyCode(pucode);
    expect(propertyCode).toBe("12345");
  });

  it("should fail if the pucode is not valid", () => {
    const pucode = "12345";
    expect(() => parsePropertyCode(pucode)).toThrowError("Invalid pucode");
  });

  it("should fail if the pucode is missing", () => {
    expect(() => parsePropertyCode(undefined as any as string)).toThrowError(
      "pucode is required"
    );
  });

  it("should fail if the pucode is null", () => {
    expect(() => parsePropertyCode(null as any as string)).toThrowError(
      "pucode must be a string"
    );
  });
});
