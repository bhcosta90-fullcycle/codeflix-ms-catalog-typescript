import { CategoryEntity } from "./category.entity";

describe("CategoryEntity Integration Test", () => {
  describe("create method", () => {
    it("should a invalid category when using name property", () => {
      expect(() => new CategoryEntity({ name: null })).toThrow(
        "The name is required"
      );
      
      expect(() => new CategoryEntity({ name: "" })).toThrow(
        "The name is required"
      );
      
      expect(() => new CategoryEntity({ name: "t".repeat(1000) })).toThrow(
        "The name must be less or equal than 100 characters"
      );
      
      expect(() => new CategoryEntity({ name: 5 as any })).toThrow(
        "The name must be a string"
      );
    });

    it("should a invalid category when using description property", () => {
      expect(
        () => new CategoryEntity({ name: "test", description: 5 as any })
      ).toThrow("The description must be a string");
    });

    it("should a invalid category when using is_active property", () => {
      expect(
        () => new CategoryEntity({ name: "test", is_active: 5 as any })
      ).toThrow("The is_active must be a boolean");
    });

    it("should a valid category", () => {
      expect.assertions(0);
      new CategoryEntity({ name: "Movie" }); // NOSONAR
      new CategoryEntity({ name: "Movie", description: "some description" }); // NOSONAR
      new CategoryEntity({ name: "Movie", description: null }); // NOSONAR

      /* NOSONAR*/ new CategoryEntity({
        name: "Movie",
        description: "some description",
        is_active: false,
      });

      /* NOSONAR */ new CategoryEntity({
        name: "Movie",
        description: "some description",
        is_active: true,
      });
    });
  })

  describe("update method", () => {
    const category = new CategoryEntity({ name: 'test' });

    it("should a invalid category when using name property", () => {
      expect(() => category.update({ name: null })).toThrow(
        "The name is required"
      );
      
      expect(() => category.update({ name: "" })).toThrow(
        "The name is required"
      );
      
      expect(() => category.update({ name: "t".repeat(1000) })).toThrow(
        "The name must be less or equal than 100 characters"
      );
      
      expect(() => category.update({ name: 5 as any })).toThrow(
        "The name must be a string"
      );
    });

    it("should a invalid category when using description property", () => {
      expect(
        () => category.update({ name: "test", description: 5 as any })
      ).toThrow("The description must be a string");
    });

    it("should a valid category", () => {
      expect.assertions(0);
      category.update({ name: "name changed", description: null });
      category.update({ name: "name changed", description: "some description" });
    });
  })
});
