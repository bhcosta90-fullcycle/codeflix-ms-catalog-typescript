export class InvalidUniqueEntityId extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valid");
    this.name = "InvalidUniqueEntityId";
  }
}
