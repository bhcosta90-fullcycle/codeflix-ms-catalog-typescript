import { FieldsErrors } from "@shared/validator/@interface/validator-fields.interface";

export class EntityValidationError extends Error {
  constructor(public readonly _errors: FieldsErrors, message?: string) {
    super(message || "Validator Field Error");
    this.name = "EntityValidatorError";
  }

  get errors(): FieldsErrors {
    return this._errors;
  }
}
