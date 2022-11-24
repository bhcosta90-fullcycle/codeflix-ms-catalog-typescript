import { CategoryEntity } from "./category.entity";

describe("CategoryEntity Unit Test", () => {
  it("constructor", () => {
    const category = new CategoryEntity({
      name: 'Movie',
      is_active: true,
    });
    expect(category.name).toBe("Movie");
  })
});
