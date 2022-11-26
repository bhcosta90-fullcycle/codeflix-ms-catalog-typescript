import { CategoryEntity } from "./category.entity";

describe("CategoryEntity Integration Test", () => {
  describe("create method", () => {
    it("should a invalid category when using name property", () => {
      expect(() => new CategoryEntity({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      expect(() => new CategoryEntity({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(
        () => new CategoryEntity({ name: "t".repeat(1000) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 100 characters"],
      });

      expect(
        () => new CategoryEntity({ name: 5 as any })
      ).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });
    });

    it("should a invalid category when using description property", () => {
      expect(
        () => new CategoryEntity({ name: "test", description: 5 as any })
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid category when using is_active property", () => {
      expect(
        () => new CategoryEntity({ name: "test", is_active: 5 as any })
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
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
  });

  describe("update method", () => {
    const category = new CategoryEntity({ name: "test" });

    it("should a invalid category when using name property", () => {
      expect(() => category.update({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      expect(() => category.update({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() =>
        category.update({ name: "t".repeat(1000) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 100 characters"],
      });

      expect(() => category.update({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });
    });

    it("should a invalid category when using description property", () => {
      expect(() =>
        category.update({ name: "test", description: 5 as any })
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });
  });
});
