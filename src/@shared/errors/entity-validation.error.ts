import { FieldsErrors } from "@shared/validator/@interface/validator-fields.interface";

export class EntityValidationError extends Error {
  constructor(public readonly error: FieldsErrors, message?: string) {
    super(message || "Validator Field Error");
    this.name = "EntityValidatorError";
  }
}
