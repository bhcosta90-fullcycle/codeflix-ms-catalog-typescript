export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || "Validator Field Error");
    this.name = "EntityValidatorError";
  }
}
