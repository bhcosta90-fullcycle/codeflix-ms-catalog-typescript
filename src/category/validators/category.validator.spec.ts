import { CategoryProps } from "../domain/entity/category.entity";
import { ValidatorFieldsInterface } from "../../@shared/validator/@interface/validator-fields.interface";
import {
  CategoryValidatorFactory,
  CategoryRulesClassValidator,
} from "./category.validator";
describe("CategoryValidator Tests", () => {
  describe("CategoryRulesClassValidator Unit Test", () => {
    let validator: CategoryRulesClassValidator;

    beforeEach(() => {
      validator = new CategoryRulesClassValidator();
    });

    it("invalidation cases for name field", () => {
      validator.validate({ name: null as any });
      expect(validator.errors).toStrictEqual({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 100 characters",
        ],
      });

      validator.validate({ name: "" });
      expect(validator.errors).toStrictEqual({
        name: ["name should not be empty"],
      });

      validator.validate({ name: "a".repeat(1000) });
      expect(validator.errors).toStrictEqual({
        name: ["name must be shorter than or equal to 100 characters"],
      });
    });

    it("invalidation cases for description field", () => {
      validator.validate({ name: "test", description: true as any });
      expect(validator.errors).toStrictEqual({
        description: ["description must be a string"],
      });
    });

    it("invalidation cases for is_active field", () => {
      validator.validate({ name: "test", is_active: "" as any });
      expect(validator.errors).toStrictEqual({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("invalidation cases for created_at field", () => {
      validator.validate({ name: "test", created_at: "" as any });
      expect(validator.errors).toStrictEqual({
        created_at: ["created_at must be a Date instance"],
      });
    });

    it("data validation", () => {
      expect.assertions(0);
      validator.validate({
        name: "test",
        created_at: new Date(),
        is_active: true,
        description: "test",
      });
    });
  });

  describe("CategoryValidatorFactory Unit Test", () => {
    let validator: CategoryRulesClassValidator;

    beforeEach(() => {
      validator = CategoryValidatorFactory.create();
    });

    it("data validation", () => {
      expect.assertions(0);
      validator.validate({
        name: "test",
        created_at: new Date(),
        is_active: true,
        description: "test",
      });
    });
  });
});
