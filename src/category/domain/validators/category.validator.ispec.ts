import {
  CategoryRules,
  CategoryRulesClassValidator,
  CategoryValidatorFactory,
} from "./category.validator";

describe("CategoryValidator Tests", () => {
  describe("CategoryValidatorFactory Integration Test", () => {
    let validator: CategoryRulesClassValidator;
    beforeEach(() => (validator = CategoryValidatorFactory.create()));
    it("invalidation cases for name field", () => {
      expect({ validator, data: { name: null } }).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      expect({ validator, data: { name: "" } }).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      expect({
        validator,
        data: { name: "t".repeat(256) },
      }).containsErrorMessages({
        name: ["name must be shorter than or equal to 100 characters"],
      });
    });

    it("invalidation cases for description field", () => {
      expect({ validator, data: { description: 5 } }).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("invalidation cases for is_active field", () => {
      expect({ validator, data: { is_active: 5 } }).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });

      expect({ validator, data: { is_active: 0 } }).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });

      expect({ validator, data: { is_active: 1 } }).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("invalidation cases for created_at field", () => {
      expect({ validator, data: { created_at: 1 } }).containsErrorMessages({
        created_at: ["created_at must be a Date instance"],
      });
    });

    describe("valid cases for fields", () => {
      type Arrange = {
        name: string;
        description?: string;
        is_active?: boolean;
        created_at?: Date;
      };
      const arrange: Arrange[] = [
        { name: "some value" },
        {
          name: "some value",
          description: undefined,
        },
        { name: "some value", description: null },
        { name: "some value", is_active: true },
        { name: "some value", is_active: false },
        { name: "some value", created_at: new Date() },
      ];

      test.each(arrange)("validate %o", (item) => {
        const isValid = validator.validate(item);
        expect(isValid).toBeTruthy();
        expect(validator.data).toStrictEqual(new CategoryRules(item));
      });
    });
  });

  describe("CategoryRulesClassValidator Integration Test", () => {
    let validator: CategoryRulesClassValidator;
    beforeEach(() => (validator = new CategoryRulesClassValidator()));

    it("invalidation cases for name field", () => {
      expect(() => validator.validate({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      expect(() => validator.validate({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() =>
        validator.validate({ name: 5 as any })
      ).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      expect({
        validator,
        data: { name: "t".repeat(256) },
      }).containsErrorMessages({
        name: ["name must be shorter than or equal to 100 characters"],
      });
    });

    it("invalidation cases for description field", () => {
      expect(() =>
        validator.validate({ name: "test", description: 5 as any })
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("invalidation cases for is_active field", () => {
      expect(() =>
        validator.validate({ name: "test", is_active: 5 as any })
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });

      expect(() =>
        validator.validate({ name: "test", is_active: 0 as any })
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });

      expect(() =>
        validator.validate({ name: "test", is_active: 1 as any })
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("invalidation cases for created_at field", () => {
      expect(() =>
        validator.validate({ name: "test", created_at: 1 as any })
      ).containsErrorMessages({
        created_at: ["created_at must be a Date instance"],
      });
    });

    describe("valid cases for fields", () => {
      type Arrange = {
        name: string;
        description?: string;
        is_active?: boolean;
        created_at?: Date;
      };
      const arrange: Arrange[] = [
        { name: "some value" },
        {
          name: "some value",
          description: undefined,
        },
        { name: "some value", description: null },
        { name: "some value", is_active: true },
        { name: "some value", is_active: false },
        { name: "some value", created_at: new Date() },
      ];

      test.each(arrange)("validate %o", (item) => {
        const isValid = validator.validate(item);
        expect(isValid).toBeTruthy();
        expect(validator.data).toStrictEqual(new CategoryRules(item));
      });
    });
  });
});
