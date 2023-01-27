export class InvalidAbstractEntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEntityError";
  }
}
