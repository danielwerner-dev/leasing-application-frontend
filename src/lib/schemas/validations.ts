import dayjs from "dayjs";
import { string } from "yup";

const usaPhoneRegex = /(^\d{10}$)/;
const startWithPlusSign = /^\+.*$/;
const internationalPhoneRegex = /(^\+[\d]{1,15}$)/;

export const NAME_REGEX = /^[^0-9!@#$%^&*~()[\]}{,.;?":/\\|<>]+$/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidation = string()
  .required("This field is required")
  .matches(EMAIL_REGEX, "Please enter email in format: name@example.com");

export const phoneNumberValidation = string()
  .required("This field is required")
  .test("phoneNumber", "Invalid phone number", function (value) {
    const validUsaPhone = usaPhoneRegex.test(value as string);
    const validIntlPhone = internationalPhoneRegex.test(value as string);
    if (validUsaPhone || validIntlPhone) {
      return true;
    }
    if (startWithPlusSign.test(value as string)) {
      return this.createError({
        message: `Maximum 16 characters, only numbers and "+” allowed`,
      });
    } else {
      return this.createError({
        message: "Must be 10 digits long, only numbers",
      });
    }
  });

export const nameValidation = string()
  .required("This field is required")
  .max(40, "Maximum 40 characters")
  .matches(NAME_REGEX, "Numbers and/or special characters are not allowed");

export const incomeValidation = string()
  .required("This field is required")
  .matches(/^[0-9]+(\.\d{1,2})?$/, "Maximum 9 characters, only numbers")
  .max(9, "Maximum 9 characters, only numbers");

export const requiredDate = string()
  .required("This field is required")
  .matches(/\d{2}\/\d{2}\/\d{4}/, "Date format must be MM/DD/YYYY")
  .test("dateFormat", "Date format must be MM/DD/YYYY", (value) => {
    return dayjs(value).isValid();
  });
