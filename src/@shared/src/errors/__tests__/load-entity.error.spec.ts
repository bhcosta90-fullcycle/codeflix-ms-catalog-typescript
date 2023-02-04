import { LoadEntityError } from "../load-entity.error";

describe("EntityValidationError Unit Test", () => {
  it("Constructor", () => {
    let error = new LoadEntityError({});
    expect(error.message).toBe("An entity not be loaded");
    expect(error.name).toBe("LoadEntityError");

    error = new LoadEntityError({}, "testing");
    expect(error.message).toBe("testing");
    expect(error.name).toBe("LoadEntityError");
  });
});
