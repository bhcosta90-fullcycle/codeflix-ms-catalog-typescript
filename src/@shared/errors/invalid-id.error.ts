export class InvalidIdError extends Error {
  constructor(message?: string) {
    super(message ?? "ID must be a valid");
    this.name = "EntityValidationError";
  }
}
