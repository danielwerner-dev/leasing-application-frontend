import { object, string } from "yup";

import Validator from "$lib/utils/validator";

import { emailValidation, nameValidation } from "./validations";

export const applicantSchema = object({
  firstName: nameValidation,
  lastName: nameValidation,
  coapplicantType: string().required("This field is required"),
  email: emailValidation,
}).test(
  "unique-email",
  "This email address is already associated with another applicant.",
  function (value) {
    if (!value.email) {
      return true;
    }

    if (
      this.options.context?.primaryEmail &&
      value.email === this.options.context.primaryEmail
    ) {
      return this.createError({
        path: `email`,
        message:
          "Email should be unique among co-applicants and main applicant.",
      });
    }

    const emailCount =
      this.options.context?.coapplicantApplicationsEmail?.filter(
        (email: string) => email === value.email
      ).length;

    if (emailCount >= 1) {
      return this.createError({
        path: `email`,
        message:
          "Email should be unique among co-applicants and main applicant.",
      });
    }

    return true;
  }
);

const validator = new Validator(applicantSchema);

export default validator;
