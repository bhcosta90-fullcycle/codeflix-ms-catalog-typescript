import { NotFoundError } from "../not-found.error";

describe("EntityValidationError Unit Test", () => {
  it("should a message default", () => {
    expect((): never => {
      throw new NotFoundError();
    }).toThrow("Validator Field Error");
  });
});