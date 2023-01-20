import { ValidationError } from "./../validation.error";

describe("InvalidIdError Unit Test", () => {
  it("should a message default", () => {
    expect((): never => {
      throw new ValidationError();
    }).toThrow("Entity Validation Error");
  });
});
