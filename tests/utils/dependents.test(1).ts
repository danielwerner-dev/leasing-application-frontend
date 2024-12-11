import * as utils from "$lib/utils/dependents";

jest.useFakeTimers().setSystemTime(new Date("2023-01-01"));

describe("Dependents utils", () => {
  describe("hasOverEigteen", () => {
    let dependents: any;
    beforeEach(() => {
      dependents = [{ dateOfBirth: "01/02/2005" }];
    });

    it("returns false if there's no dependents over 18", () => {
      const res = utils.hasOverEighteen(dependents);

      expect(res).toBe(false);
    });

    it("returns true if there is a dependent over 18", () => {
      dependents.push({ dateOfBirth: "01/01/2005" });

      const res = utils.hasOverEighteen(dependents);

      expect(res).toBe(true);
    });

    it("returns false if dateOfBirth is empty", () => {
      dependents[0].dateOfBirth = "";

      const res = utils.hasOverEighteen(dependents);

      expect(res).toBe(false);
    });
  });
});
