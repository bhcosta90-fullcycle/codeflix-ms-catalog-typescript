import { ValidatorFieldError } from "./../validator-fields.error";

describe("ValidatorFieldError Unit Test", () => {
  it("should a message default", () => {
    expect((): never => {
      throw new ValidatorFieldError(null);
    }).toThrow("Validator Field Error");
  });

  it("should 1 error in get error", () => {
    const error = new ValidatorFieldError({ field: ['some error'] });
    expect(error.errors).toStrictEqual({ field: ['some error'] });
  })
})