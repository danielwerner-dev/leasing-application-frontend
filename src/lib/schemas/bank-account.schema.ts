import { object, ref, string } from "yup";

import Validator from "$lib/utils/validator";

const schema = object({
  nameOnAccount: string()
    .required("This field is required")
    .min(5, "Minimum 5 characters")
    .max(42, "Maximum 42 characters")
    .matches(/^([A-Za-z]+\s?)*$/, "Maximum 42 characters, only letters"),
  accountType: string()
    .required("This field is required")
    .oneOf(["checking", "savings"], "Not a valid selection"),
  accountNumber: string()
    .required("This field is required")
    .matches(/^[0-9]+$/, `Maximum 17 characters, only numbers.`)
    .max(17, `Maximum 17 characters, only numbers.`),
  accountNumberConfirmation: string()
    .defined()
    .oneOf([ref("accountNumber")], "Account numbers don't match."),
  routingNumber: string()
    .required("This field is required")
    .matches(/^[0-9]+$/, `Must be 9 digits long, only numbers`)
    .max(9, `Must be 9 digits long, only numbers`),
  routingNumberConfirmation: string()
    .defined()
    .oneOf([ref("routingNumber")], "Routing numbers don't match."),
});

const validator = new Validator(schema);

export default validator;
