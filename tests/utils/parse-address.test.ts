import { parseAddress } from "../../src/lib/utils/property/parse-address";

describe("Parse address", () => {
  let property: any;

  beforeEach(() => {
    property = {
      address1: "1620 True Dreams St.",
      city: "Paradise",
      state: "NV",
      zipcode: "88488",
    };
  });

  it("returns the parsed address", () => {
    const expectedAddress = "1620 True Dreams St.";
    const expectedLocation = "Paradise, NV 88488";

    const { address, location } = parseAddress(property);

    expect(address).toEqual(expectedAddress);
    expect(location).toEqual(expectedLocation);
  });

  it("does not break when empty object is passed", () => {
    const { address, location } = parseAddress({} as any);

    expect(address).toBe("");
    expect(location).toBe("");
  });

  it("returns incomplete location", () => {
    const withNoZipcode = { ...property, zipcode: undefined };
    const withNoState = { ...property, state: undefined };
    const withNoCity = { ...property, city: undefined };
    const withOnlyCity: any = { city: "Paradise" };
    const withOnlyState: any = { state: "NV" };
    const withOnlyZipcode: any = { zipcode: "88488" };

    expect(parseAddress(withNoZipcode).location).toEqual("Paradise, NV");
    expect(parseAddress(withNoState).location).toEqual("Paradise 88488");
    expect(parseAddress(withNoCity).location).toEqual("NV 88488");
    expect(parseAddress(withOnlyCity).location).toEqual("Paradise");
    expect(parseAddress(withOnlyState).location).toEqual("NV");
    expect(parseAddress(withOnlyZipcode).location).toEqual("88488");
  });
});
