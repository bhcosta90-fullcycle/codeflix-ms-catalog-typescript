import { CategoryEntity } from "./category.entity";

describe("CategoryEntity Integration Test", () => {
  describe("create method", () => {
    it("should a invalid category when using name property", () => {
      try {
        new CategoryEntity({ name: null });
      } catch (e) {
        expect(e.errors).toStrictEqual({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 100 characters",
          ],
        });
      }
      
      try {
        new CategoryEntity({ name: "" });
      } catch (e) {
        expect(e.errors).toStrictEqual({
          name: ["name should not be empty"],
        });
      }

      try {
        new CategoryEntity({ name: "t".repeat(1000) });
      } catch (e) {
        expect(e.errors).toStrictEqual({
          name: ["name must be shorter than or equal to 100 characters"],
        });
      }
      
      try {
        new CategoryEntity({ name: 5 as any });
      } catch (e) {
        expect(e.errors).toStrictEqual({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 100 characters",
          ],
        });
      }
    });

    it("should a invalid category when using description property", () => {
      try {
        new CategoryEntity({ name: "test", description: 5 as any });
      } catch (e) {
        expect(e.errors).toStrictEqual({
          description: ["description must be a string"],
        });
      }
    });

    it("should a invalid category when using is_active property", () => {
      try {
        new CategoryEntity({ name: "test", is_active: 5 as any })
      } catch(e) {
        expect(e.errors).toStrictEqual({
          is_active: ["is_active must be a boolean value"],
        });
      }
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
      try {
        category.update({ name: null })
      } catch(e) {
        expect(e.errors).toStrictEqual({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 100 characters",
          ],
        });
      }
      
      try {
        category.update({ name: "" })
      } catch(e) {
        expect(e.errors).toStrictEqual({
          name: ["name should not be empty"],
        });
      }
      
      try {
        category.update({ name: "t".repeat(1000) })
      } catch(e) {
        expect(e.errors).toStrictEqual({
          name: ["name must be shorter than or equal to 100 characters"],
        });
      }
      
      try {
        category.update({ name: 5 as any })
      } catch(e) {
        expect(e.errors).toStrictEqual({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 100 characters",
          ],
        });
      }
    });

    it("should a invalid category when using description property", () => {
      try {
        category.update({ name: "test", description: 5 as any })
      }catch(e) {
        expect(e.errors).toStrictEqual({
          description: ["description must be a string"],
        });
      }
    });

    it("should a valid category", () => {
      expect.assertions(0);
      category.update({ name: "name changed", description: null });
      category.update({ name: "name changed", description: "some description" });
    });
  })
});
