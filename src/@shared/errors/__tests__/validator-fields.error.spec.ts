import { EntityValidationError } from "../entity-validation.error";

describe("EntityValidationError Unit Test", () => {
  it("should a message default", () => {
    expect((): never => {
      throw new EntityValidationError(null);
    }).toThrow("Validator Field Error");
  });

  it("should 1 error in get error", () => {
    const error = new EntityValidationError({ field: ["some error"] });
    expect(error.errors).toStrictEqual({ field: ["some error"] });
  });
});