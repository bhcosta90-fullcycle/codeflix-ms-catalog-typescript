export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || "Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
