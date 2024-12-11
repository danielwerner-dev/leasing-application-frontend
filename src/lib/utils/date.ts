import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

import type { FrontendResidence } from "$lib/types/form-data/frontend/FrontendResidences.type";

dayjs.extend(utc);

interface MoveInDateRange {
  min: string;
  max: string;
}

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";

const NEXT_DAYS_LIMIT = 14;

export const parseToISO = (date: string): string => {
  const ISOPattern = /^\d{4}-\d{2}-\d{2}$/;
  const USPattern = new RegExp(
    "^((0?[1-9])|(1[0-2]))/((0?[1-9])|([12][0-9])|([3][01]))/\\d{4}$"
  );

  const dateOnly = date.split("T")[0];

  if (ISOPattern.test(dateOnly)) {
    return new Date(dateOnly).toISOString();
  }

  if (USPattern.test(dateOnly)) {
    const [month, day, year] = dateOnly.split("/");

    return new Date(`${year}-${month}-${day}`).toISOString();
  }

  throw new TypeError(
    `Invalid date format: ${date}. Valid format: YYYY-MM-DD and MM/DD/YYYY`
  );
};

export const getToday = () => {
  return getDate(new Date().toISOString());
};

export const getDate = (date: string) => {
  const isoDate = parseToISO(date);

  return dayjs.utc(isoDate);
};

export const getDateForCalendar = (
  value?: string | number | Date | Dayjs | undefined
) => {
  const date = dayjs.utc(value).format("MM/DD/YYYY");

  return new Date(date);
};

export const getPreferredMoveInDateRange = (
  propertyAvailableAfter: string,
  applicationCreatedAt: string
): MoveInDateRange => {
  const availableAt = getDate(propertyAvailableAfter);
  const createdAt = getDate(applicationCreatedAt);

  const isAvailableNow = availableAt.isBefore(getToday());

  if (isAvailableNow) {
    return {
      min: createdAt.add(1, "day").format("MM/DD/YYYY"),
      max: createdAt.add(14, "day").format("MM/DD/YYYY"),
    };
  }

  const availableBeforeLimit =
    availableAt.diff(getToday(), "day") < NEXT_DAYS_LIMIT;
  if (availableBeforeLimit) {
    return {
      min: availableAt.add(1, "day").format("MM/DD/YYYY"),
      max: createdAt.add(14, "day").format("MM/DD/YYYY"),
    };
  }

  return {
    min: availableAt.add(1, "day").format("MM/DD/YYYY"),
    max: availableAt.add(4, "day").format("MM/DD/YYYY"),
  };
};

export const hasAtLeastMonths =
  (requiredMonths: number) => (dateAsString: string) => {
    if (!dateAsString) {
      return null;
    }

    const date = getDate(dateAsString);
    const requiredDate = getToday().subtract(requiredMonths, "months");

    return !date.isAfter(requiredDate);
  };

export const hasRequiredResidenceMonths = (
  residences: FrontendResidence[],
  requiredMonths: number
) => {
  if (!Array.isArray(residences)) {
    return false;
  }

  const dates = residences.map((residence) => residence.startDate);

  const validDate = dates.find(hasAtLeastMonths(requiredMonths));

  return Boolean(validDate);
};

export const olderThanEighteen = (dateAsString: string) => {
  const date = getDate(dateAsString);
  const today = getToday();

  return today.diff(date, "year") >= 18;
};
