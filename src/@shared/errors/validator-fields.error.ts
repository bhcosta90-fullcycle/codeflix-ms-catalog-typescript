import { FieldsErrors } from "@shared/validator/@interface/validator-fields.interface";

export class ValidatorFieldError extends Error {
  constructor(public readonly _errors: FieldsErrors, message?: string) {
    super(message || "Validator Field Error");
    this.name = "ValidatorFieldError";
  }

  get errors(): FieldsErrors {
    return this._errors;
  }
}
