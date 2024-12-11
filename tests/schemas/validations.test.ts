import {
  emailValidation,
  incomeValidation,
  nameValidation,
  phoneNumberValidation,
  requiredDate,
} from "$lib/schemas/validations";

describe("Validations", () => {
  describe("name validation", () => {
    it("reject special characters", () => {
      expect(nameValidation.isValidSync("%@%^@##")).toBe(false);
    });

    it("rejects numbers", () => {
      expect(nameValidation.isValidSync("12345")).toBe(false);
    });

    it("rejects empty string", () => {
      expect(nameValidation.isValidSync("")).toBe(false);
    });

    it("rejects null or undefined", () => {
      expect(nameValidation.isValidSync(undefined)).toBe(false);
      expect(nameValidation.isValidSync(null)).toBe(false);
    });

    it("accepts valid name", () => {
      expect(nameValidation.isValidSync("John Smith")).toBe(true);
    });

    it("accepts accents", () => {
      expect(nameValidation.isValidSync("João Ferreira")).toBe(true);
    });
  });

  describe("phoneNumberValidation", () => {
    it("rejects invalid phone characters", () => {
      expect(phoneNumberValidation.isValidSync("123123123A")).toBe(false);
    });

    it("rejects undefined and null values", () => {
      expect(phoneNumberValidation.isValidSync(undefined)).toBe(false);
      expect(phoneNumberValidation.isValidSync(null)).toBe(false);
    });

    describe("for U.S. numbers", () => {
      it("rejects US number with less then 10 characters", () => {
        expect(phoneNumberValidation.isValidSync("254")).toBe(false);
      });

      it("rejects US numbers with more than 10 characters", () => {
        expect(
          phoneNumberValidation.isValidSync("2542542542542524252424")
        ).toBe(false);
      });

      it("accepts US number with 10 characters", () => {
        expect(phoneNumberValidation.isValidSync("2542542542")).toBe(true);
      });
    });

    describe("for international numbers", () => {
      it("rejects numbers with more than 15 characters after the plus sign", () => {
        expect(
          phoneNumberValidation.isValidSync("+123123123123123123123123")
        ).toBe(false);
      });

      it("rejects number with only the plus sign", () => {
        expect(phoneNumberValidation.isValidSync("+")).toBe(false);
      });

      it("accepts well formatted number", () => {
        expect(phoneNumberValidation.isValidSync("+5516997754738")).toBe(true);
      });
    });
  });

  describe("requiredDate", () => {
    it("rejects null and undefined", () => {
      expect(requiredDate.isValidSync(null)).toBe(false);
      expect(requiredDate.isValidSync(undefined)).toBe(false);
    });

    it("rejects number type as date", () => {
      expect(requiredDate.isValidSync(new Date().getTime())).toBe(false);
    });

    describe("with Date types", () => {
      it("rejects invalid date objects", () => {
        expect(requiredDate.isValidSync(new Date(NaN))).toBe(false);
      });

      it("rejects a valid Date object", () => {
        expect(requiredDate.isValidSync(new Date())).toBe(false);
      });
    });

    describe("with string types", () => {
      it("rejects invalid dates", () => {
        expect(requiredDate.isValidSync("2022/00/31")).toBe(false);
      });

      it("rejects date with different locale formatting", () => {
        expect(requiredDate.isValidSync("31/12/2022")).toBe(false);
        expect(requiredDate.isValidSync("2022/12/31")).toBe(false);
      });
    });
  });

  describe("emailValidation", () => {
    it("rejects null and undefined", () => {
      expect(emailValidation.isValidSync(null)).toBe(false);
      expect(emailValidation.isValidSync(undefined)).toBe(false);
    });

    it("rejects email with invalid format", () => {
      expect(emailValidation.isValidSync("a@a")).toBe(false);
      expect(emailValidation.isValidSync("aa.com")).toBe(false);
      expect(emailValidation.isValidSync("@a.com")).toBe(false);
      expect(emailValidation.isValidSync(".@a.com")).toBe(false);
      expect(emailValidation.isValidSync("a@!#$a.com")).toBe(false);
    });

    it("rejects email with ip instead of domain name", () => {
      expect(emailValidation.isValidSync("jsmith@192.168.0.1")).toBe(false);
    });

    it("accepts a valid email", () => {
      expect(emailValidation.isValidSync("jsmith@aol.com")).toBe(true);
    });
  });

  describe("incomeValidation", () => {
    it("rejects null and undefined", () => {
      expect(incomeValidation.isValidSync(null)).toBe(false);
      expect(incomeValidation.isValidSync(undefined)).toBe(false);
    });

    it("rejects income with invalid format", () => {
      expect(incomeValidation.isValidSync("abc.ab")).toBe(false);
      expect(incomeValidation.isValidSync("abc.00")).toBe(false);
      expect(incomeValidation.isValidSync("abc")).toBe(false);
      expect(incomeValidation.isValidSync("100.ab")).toBe(false);
      expect(incomeValidation.isValidSync("100.00.00")).toBe(false);
      expect(incomeValidation.isValidSync("1,000.00")).toBe(false);
      expect(incomeValidation.isValidSync("1000.")).toBe(false);
    });

    it("accepts income with valid format", () => {
      expect(incomeValidation.isValidSync("122.52")).toBe(true);
      expect(incomeValidation.isValidSync("122.5")).toBe(true);
      expect(incomeValidation.isValidSync("122")).toBe(true);
    });
  });
});
