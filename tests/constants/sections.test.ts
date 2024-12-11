import { getSection, SECTIONS } from "$lib/constants/sections";

describe("Sections Constants", () => {
  it("Should contain all section", () => {
    expect(SECTIONS.length).toBe(8);
    expect(SECTIONS[0].id).toBe("intro");
    expect(SECTIONS[1].id).toBe("general");
    expect(SECTIONS[2].id).toBe("personalDetails");
    expect(SECTIONS[3].id).toBe("residence");
    expect(SECTIONS[4].id).toBe("employment");
    expect(SECTIONS[5].id).toBe("documents");
    expect(SECTIONS[6].id).toBe("coapplicants");
    expect(SECTIONS[7].id).toBe("payment");
  });

  it("Should be able to get correct section title", () => {
    expect(getSection("intro").title).toBe("Overview");
    expect(getSection("general").title).toBe("General info");
    expect(getSection("personalDetails").title).toBe("Personal details");
    expect(getSection("residence").title).toBe("Residence");
    expect(getSection("employment").title).toBe("Employment");
    expect(getSection("documents").title).toBe("Documents");
    expect(getSection("coapplicants").title).toBe("Applicants");
    expect(getSection("payment").title).toBe("Pay & Submit");
  });

  it("Should throw an error for invalid sections", () => {
    expect(() => {
      getSection("Made up section");
    }).toThrowError("[sections:getSection] Section does not exist for id:");
  });
});
