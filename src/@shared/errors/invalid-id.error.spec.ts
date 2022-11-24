import { InvalidIdError } from "./invalid-id.error";

describe("InvalidIdError Unit Test", () => {
  it("should a message default", () => {
    expect((): never => {
      throw new InvalidIdError();
    }).toThrow("ID must be a valid");
  });
});
