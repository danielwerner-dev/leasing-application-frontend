import { array, object, string } from "yup";

import Validator from "$lib/utils/validator";

const schema = object({
  name: string().required("Required").label("Name"),
  age: string()
    .required("Required")
    .matches(/^[0-9]+$/, "Not matching"),
  dog: object({
    name: string().required("Required"),
    breed: string(),
  }),
  cats: array(
    object({
      name: string().required("Required"),
      breed: string(),
    })
  ),
});

const validator = new Validator(schema);

describe("Validator", () => {
  let values: any;
  beforeEach(() => {
    values = {
      name: "John",
      age: "40",
      dog: {
        name: "Boy",
        breed: "Beagle",
      },
      cats: [
        { name: "Cat 1", breed: "I don't know any cat breeds" },
        { name: "Cat 2", breed: "The one from Friends?" },
      ],
    };
  });

  it("returns empty error object for valid schema", () => {
    const errors = validator.validate(values);
    const isValid = validator.isValid(values);

    expect(errors).toEqual({});
    expect(isValid).toBe(true);
  });

  it("returns errors for invalid values", () => {
    values.name = "";
    const errors = validator.validate(values);
    const isValid = validator.isValid(values);

    expect(errors.name).toEqual("Required");
    expect(isValid).toBe(false);
  });

  it("returns error message respecting schema order", () => {
    values.age = "";
    let errors = validator.validate(values);

    expect(errors.age).toEqual("Required");

    values.age = "abc";
    errors = validator.validate(values);

    expect(errors.age).toEqual("Not matching");
  });

  it("returns error for nested object", () => {
    values.dog.name = "";
    const errors = validator.validate(values);

    expect(errors["dog.name"]).toEqual("Required");
  });

  it("returns error for nested arrays", () => {
    values.cats[1].name = "";
    const errors = validator.validate(values);

    expect(errors["cats[1].name"]).toEqual("Required");
  });

  it("throws error if not a ValidationError", () => {
    const defectiveValidadator = new Validator(null as any);

    expect(() => defectiveValidadator.validate(values)).toThrow();
  });
});
