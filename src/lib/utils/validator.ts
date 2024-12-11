import { type AnyObjectSchema, ValidationError } from "yup";

class Validator {
  private _schema: AnyObjectSchema;
  get schema() {
    return this._schema;
  }

  context = {};

  constructor(schema: AnyObjectSchema) {
    this._schema = schema;
  }

  validate(values: unknown): Record<string, string> {
    try {
      this.schema.validateSync(values, {
        abortEarly: false,
        context: this.context,
      });

      return {};
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = this.parseValidationErrors(err);
        return errors;
      }

      throw err;
    }
  }

  isValid(values: unknown): boolean {
    return this.schema.isValidSync(values, { context: this.context });
  }

  private parseValidationErrors(err: ValidationError): Record<string, string> {
    return err.inner.reduce((acc, error) => {
      if (!error.path || Object.keys(acc).includes(error.path)) {
        return acc;
      }

      return {
        ...acc,
        [error.path]: error.message,
      };
    }, {});
  }
}

export default Validator;
