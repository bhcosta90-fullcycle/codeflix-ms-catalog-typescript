import { FieldsErrors } from "../domain/validators/validator-fields.interface";

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Entity Validation Error");
    this.name = this.constructor.name;
  }
}
