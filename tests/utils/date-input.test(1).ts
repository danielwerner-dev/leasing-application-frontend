import { getCalendarDays, getMonthDays, getYears } from "$lib/utils/date-input";

describe("Date Input utils", () => {
  describe("getMonthDays", () => {
    it("Should return month lengths for leap year", () => {
      expect(getMonthDays(2024, 0).length).toEqual(31);
      expect(getMonthDays(2024, 1).length).toEqual(29);
      expect(getMonthDays(2024, 2).length).toEqual(31);
      expect(getMonthDays(2024, 3).length).toEqual(30);
      expect(getMonthDays(2024, 4).length).toEqual(31);
      expect(getMonthDays(2024, 5).length).toEqual(30);
      expect(getMonthDays(2024, 6).length).toEqual(31);
      expect(getMonthDays(2024, 7).length).toEqual(31);
      expect(getMonthDays(2024, 8).length).toEqual(30);
      expect(getMonthDays(2024, 9).length).toEqual(31);
      expect(getMonthDays(2024, 10).length).toEqual(30);
      expect(getMonthDays(2024, 11).length).toEqual(31);
    });

    it("Should return month lengths for non-leap year", () => {
      expect(getMonthDays(2023, 0).length).toEqual(31);
      expect(getMonthDays(2023, 1).length).toEqual(28);
      expect(getMonthDays(2023, 2).length).toEqual(31);
      expect(getMonthDays(2023, 3).length).toEqual(30);
      expect(getMonthDays(2023, 4).length).toEqual(31);
      expect(getMonthDays(2023, 5).length).toEqual(30);
      expect(getMonthDays(2023, 6).length).toEqual(31);
      expect(getMonthDays(2023, 7).length).toEqual(31);
      expect(getMonthDays(2023, 8).length).toEqual(30);
      expect(getMonthDays(2023, 9).length).toEqual(31);
      expect(getMonthDays(2023, 10).length).toEqual(30);
      expect(getMonthDays(2023, 11).length).toEqual(31);
    });
  });

  describe("getCalendarDays", () => {
    describe("January Calendar Month", () => {
      const firstOfTheYear = new Date(2020, 0, 1);

      const calendarDays = getCalendarDays(firstOfTheYear, 1);

      it("Should show last two days of December", () => {
        expect(calendarDays[0].year).toEqual(2019);
        expect(calendarDays[0].month).toEqual(11);
        expect(calendarDays[0].number).toEqual(30);

        expect(calendarDays[1].year).toEqual(2019);
        expect(calendarDays[1].month).toEqual(11);
        expect(calendarDays[1].number).toEqual(31);
      });

      it("Should show first nine days of February", () => {
        expect(
          [...calendarDays.slice(34, 42)].every(
            (element) => element.month === 1
          )
        ).toEqual(true);
      });
    });

    describe("December Calendar Month", () => {
      const firstOfDecember = new Date(2020, 11, 1);

      const calendarDays = getCalendarDays(firstOfDecember, 1);

      it("Should show first ten days of January", () => {
        expect(
          [...calendarDays.slice(32, 42)].every(
            (element) => element.year === 2021
          )
        ).toEqual(true);
      });
    });
  });

  describe("getYears", () => {
    it("Should return list of years between min & max year parameters", () => {
      expect(
        getYears(new Date(1980, 1, 1), new Date(2000, 1, 1)).length
      ).toEqual(21);
    });
  });
});
