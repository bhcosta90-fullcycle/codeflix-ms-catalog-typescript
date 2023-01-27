export class InvalidEntityIdError extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valid");
    this.name = "InvalidUniqueEntityIdError";
  }
}
