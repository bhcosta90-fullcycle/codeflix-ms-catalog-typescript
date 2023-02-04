import { EntityValidationError } from "../entity-validation.error";

describe("EntityValidationError Unit Test", () => {
  it("Constructor", () => {
    const error = new EntityValidationError({});
    expect(error.message).toBe("Entity Validation Error");
    expect(error.name).toBe("EntityValidationError");
  })
});