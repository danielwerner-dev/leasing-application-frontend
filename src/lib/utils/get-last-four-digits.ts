import { number } from "yup";

const preconditions = number()
  .required("number is required")
  .typeError("must be a number");

export const getLastFourDigits = (num: string): string => {
  preconditions.validateSync(num);

  if (num.length >= 5) {
    return num.slice(num.length - 4, num.length);
  } else {
    return num;
  }
};
