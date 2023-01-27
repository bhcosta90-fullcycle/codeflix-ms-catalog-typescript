import { Category } from "./category.entity";

describe("CategoryEntity Unit Test", () => {
  it("Constructor", () => {
    const entity = new Category("movie");
    expect(entity.name).toBe("movie");
  });
});
