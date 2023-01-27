export class InvalidEntity extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEntity";
  }
}
