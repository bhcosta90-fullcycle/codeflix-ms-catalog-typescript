import { Category } from "../category.entity";

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it("should a invalid category using name property", () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be longer than or equal to 3 characters",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be longer than or equal to 3 characters",
        ],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be longer than or equal to 3 characters",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () => new Category({ name: "t".repeat(256) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid category using description property", () => {
      expect(
        () => new Category({ description: 5 } as any)
      ).containsErrorMessages({
        description: [
          "description must be a string",
          "description must be longer than or equal to 3 characters",
        ],
      });
    });

    it("should a invalid category using is_active property", () => {
      expect(() => new Category({ is_active: 5 } as any)).containsErrorMessages(
        {
          is_active: ["is_active must be a boolean value"],
        }
      );
    });

    it("should a valid category", () => {
      expect.assertions(0);

      new Category({ name: "Movie" }); // NOSONAR
      new Category({ name: "Movie", description: "some description" }); // NOSONAR
      new Category({ name: "Movie", description: null }); // NOSONAR

      /* NOSONAR */ new Category({
        name: "Movie",
        description: "some description",
        is_active: false,
      });

      /* NOSONAR */ new Category({
        name: "Movie",
        description: "some description",
        is_active: true,
      });
    });
  });

  describe("update method", () => {
    it("should a invalid category using name property", () => {
      const category = new Category({ name: "Movie" });
      expect(() => category.update({name: null, description: null})).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be longer than or equal to 3 characters",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        category.update({ name: "", description: null })
      ).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be longer than or equal to 3 characters",
        ],
      });

      expect(() =>
        category.update({ name: 5 as any, description: null })
      ).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be longer than or equal to 3 characters",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        category.update({name: "t".repeat(256), description: null})
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid category using description property", () => {
      const category = new Category({ name: "Movie" });
      expect(() =>
        category.update({ name: null, description: 5 as any })
      ).containsErrorMessages({
        description: [
          "description must be a string",
          "description must be longer than or equal to 3 characters",
        ],
      });
    });

    it("should a valid category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Movie" });
      category.update({name: "name changed", description: null});
      category.update({name: "name changed", description: "some description"});
    });
  });
});
