import dayjs from "dayjs";

import * as utils from "$lib/utils/date";

describe("Date utils", () => {
  describe("parseToISO", () => {
    it("parses ISO formatted date, ignoring the timezone offset", () => {
      const date = "2022-12-31T15:30:32.000Z";

      const res = utils.parseToISO(date);

      expect(res).toEqual("2022-12-31T00:00:00.000Z");
    });

    it("parses US formatted date only", () => {
      const date = "12/31/2022";

      const res = utils.parseToISO(date);

      expect(res).toEqual("2022-12-31T00:00:00.000Z");
    });

    it("throws if date is not formatted in US or ISO format", () => {
      const date = "31/12/2022";

      expect(() => utils.parseToISO(date)).toThrowError(
        `Invalid date format: ${date}. Valid format: YYYY-MM-DD and MM/DD/YYYY`
      );
    });
  });

  describe("getToday", () => {
    let today: any;
    beforeEach(() => {
      today = "2022-12-18T00:00:00.000Z";

      jest.spyOn(utils, "getDate").mockImplementation(jest.fn());
      jest.useFakeTimers().setSystemTime(new Date(today));
    });
    it("calls get date with today's date", () => {
      utils.getToday();

      expect(utils.getDate).toHaveBeenCalledWith(today);
    });
  });

  describe("getDate", () => {
    it("returns dayjs date object with timezone offset removed", () => {
      const date = "2022-12-25T15:49:38.123Z";

      const cleansedDate = utils.getDate(date);

      expect(cleansedDate.toISOString()).toEqual("2022-12-25T00:00:00.000Z");
    });
  });

  describe("getDateForCalendar", () => {
    it("returns the same date independent of timezone", () => {
      const date = "2022-12-25T00:00:00.000Z";
      const dateWithTimezone = dayjs(new Date(date)).format("MM/DD/YYYY");
      const dateForCalendar = dayjs(utils.getDateForCalendar(date)).format(
        "MM/DD/YYYY"
      );

      expect(dateWithTimezone).toEqual("12/24/2022");
      expect(dateForCalendar).toEqual("12/25/2022");
    });
  });

  describe("getPreferredMoveInDateRange", () => {
    let availableAt: any;
    let createdAt: any;
    let today: any;
    beforeEach(() => {
      availableAt = "12/15/2022";
      createdAt = "12/17/2022";
      today = "2022-12-18T00:00:00.000Z";

      jest.useFakeTimers().setSystemTime(new Date(today));
    });

    describe("if property is available", () => {
      it("returns min application start next day and max application start + 14 days", () => {
        const { min, max } = utils.getPreferredMoveInDateRange(
          availableAt,
          createdAt
        );

        expect(min).toEqual("12/18/2022");
        expect(max).toEqual("12/31/2022");
      });
    });

    describe("if property is not available", () => {
      describe("and will be available within the next 14 days", () => {
        it("returns min available date next day and max application started plus 14 days", () => {
          availableAt = "12/25/2022";

          const { min, max } = utils.getPreferredMoveInDateRange(
            availableAt,
            createdAt
          );

          expect(min).toEqual("12/26/2022");
          expect(max).toEqual("12/31/2022");
        });
      });

      describe("and will not be available within the next 14 days", () => {
        it("returns min available date next day and max available date plus 4 days", () => {
          availableAt = "01/14/2023";

          const { min, max } = utils.getPreferredMoveInDateRange(
            availableAt,
            createdAt
          );

          expect(min).toEqual("01/15/2023");
          expect(max).toEqual("01/18/2023");
        });
      });
    });
  });

  describe("hasAtLeastMonths", () => {
    let testDate: any;
    let today: any;
    beforeEach(() => {
      testDate = utils.hasAtLeastMonths(36);
      today = "2022-12-25";

      jest.useFakeTimers().setSystemTime(new Date(today));
    });

    it("returns `null` when no currentStartDate is provided", () => {
      expect(testDate("")).toBe(null);
    });

    it("returns `false` when currentStartDate does not have the minimum requirement", () => {
      const date = "12/26/2019";
      expect(testDate(date)).toBe(false);
    });

    it("returns `true` when currentStartDate meet the requirements", () => {
      const date = "12/25/2019";
      expect(testDate(date)).toBe(true);
    });
  });

  describe("hasRequiredResidenceMonth", () => {
    let pastResidences: any;
    let today: any;

    beforeEach(() => {
      pastResidences = [
        { startDate: "01/12/2022" },
        { startDate: "10/12/2021" },
      ];
      today = "2022-12-25";

      jest.useFakeTimers().setSystemTime(new Date(today));
    });

    it("returns `false` when no residence meet the requirement", () => {
      expect(utils.hasRequiredResidenceMonths(pastResidences, 36)).toBe(false);
    });

    it("returns `true` when the oldest residence is the last in the array", () => {
      pastResidences[1].startDate = "12/25/2019";
      expect(utils.hasRequiredResidenceMonths(pastResidences, 36)).toBe(true);
    });

    it("returns `true` when oldest residence is the first in the array", () => {
      pastResidences[0].startDate = "12/25/2019";

      expect(utils.hasRequiredResidenceMonths(pastResidences, 36)).toBe(true);
    });

    it("returns `false` when non-array argument is passed", () => {
      pastResidences = "hello world";

      expect(utils.hasRequiredResidenceMonths(pastResidences, 36)).toBe(false);
    });
  });

  describe("olderThanEighteen", () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date("2023-01-01"));
    });

    it("returns false if date is more recent than 18 years", () => {
      const res = utils.olderThanEighteen("01/05/2015");

      expect(res).toBe(false);
    });

    it("returs true if date is older than 18 years ago", () => {
      const res = utils.olderThanEighteen("01/05/1980");

      expect(res).toBe(true);
    });

    it("returns true if date is exactly 18 years ago", () => {
      const res = utils.olderThanEighteen("01/01/2005");

      expect(res).toBe(true);
    });
  });
});
