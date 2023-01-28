import { NotFoundError } from "../not-found.error";

describe("NotFoundError Unit Test", () => {
  it("Constructor", () => {
    const error = new NotFoundError();
    expect(error.message).toBe("Entity not found");
    expect(error.name).toBe("NotFoundError");
  });
});