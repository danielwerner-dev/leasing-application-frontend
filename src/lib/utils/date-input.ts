import dayjs from "dayjs";

interface Days {
  year: number;
  month: number;
  number: number;
}

export function getMonthDays(year: number, month: number) {
  const monthLength = dayjs(new Date(year, month)).daysInMonth();
  const days: Days[] = [];
  for (let i = 0; i < monthLength; i++) {
    days.push({
      year,
      month,
      number: i + 1,
    });
  }
  return days;
}

export function getCalendarDays(value: Date, weekStartsOn: number) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();

  let days: { year: number; month: number; number: number }[] = [];

  // add last month
  const daysBefore = (firstWeekday - weekStartsOn + 7) % 7;
  if (daysBefore > 0) {
    let lastMonth = month - 1;
    let lastMonthYear = year;
    if (lastMonth === -1) {
      lastMonth = 11;
      lastMonthYear = year - 1;
    }
    days = getMonthDays(lastMonthYear, lastMonth).slice(-daysBefore);
  }
  // add current month
  days = days.concat(getMonthDays(year, month));

  // add next month
  let nextMonth = month + 1;
  let nextMonthYear = year;

  if (nextMonth === 12) {
    nextMonth = 0;
    nextMonthYear = year + 1;
  }

  const daysAfter = 42 - days.length;
  days = days.concat(
    getMonthDays(nextMonthYear, nextMonth).slice(0, daysAfter)
  );
  return days;
}

export function getYears(min: Date, max: Date) {
  const years: number[] = [];
  for (let i = min.getFullYear(); i <= max.getFullYear(); i++) {
    years.push(i);
  }
  return years;
}

export const locale = {
  weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  weekStartsOn: 1,
};
