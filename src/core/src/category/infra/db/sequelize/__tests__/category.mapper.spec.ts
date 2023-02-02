import { CategorySequelizeRepository } from "./../category-sequelize.repository";
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategoryMapper } from "../category.mapper";
import { LoadEntityError } from "@ca/core/@shared/errors/load-entity.error";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { UniqueEntityId } from "@ca/core/@shared/domain/value-object/unique-entity-id.vo";

describe("CategoryMapper Unit Test", () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(
    () =>
      (sequelize = new Sequelize({
        dialect: "sqlite",
        host: ":memory:",
        logging: false,
        models: [CategoryModel],
      }))
  );

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => await sequelize.close());

  it("should throw error when category is invalid", () => {
    const model = CategoryModel.build({
      id: "033b983a-1c10-4b95-a71e-0f4579ab29e7",
    });
    try {
      CategoryMapper.toEntity(model);
      fail("The category is valid, but it throw a LoadEntityError");
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toStrictEqual({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be longer than or equal to 3 characters",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic error");

    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });

    const model = CategoryModel.build({
      id: "fc761756-648b-4fad-88cc-8b7ee10ac84a",
    });
    expect(() => CategoryMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalledTimes(1);
  });

  it("should convert a category model to a category entity", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: "5490020a-e866-4229-9adc-aa44b83234c4",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
    const entity = CategoryMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: "some value",
          description: "some description",
          is_active: true,
          created_at,
        },
        new UniqueEntityId("5490020a-e866-4229-9adc-aa44b83234c4")
      ).toJSON()
    );
  });
});
