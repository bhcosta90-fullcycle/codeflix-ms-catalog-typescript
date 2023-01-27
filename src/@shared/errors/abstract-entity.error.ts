export class AbstractEntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEntityError";
  }
}
