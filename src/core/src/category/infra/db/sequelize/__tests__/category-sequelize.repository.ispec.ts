import { CategorySequelizeRepository } from "./../category-sequelize.repository";
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { NotFoundError } from "@ca/core/@shared/errors/not-found.error";
import { UniqueEntityId } from "@ca/core/@shared/domain/value-object/unique-entity-id.vo";

describe("CategorySequelizeRepository Feature Test", () => {
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

  test("insert", async () => {
    let category = new Category({ name: "testing" });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: "testing",
      description: "some description",
      is_active: false,
    });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());
  });

  describe("find by id", () => {
    it("throw error", async () => {
      await expect(repository.findById("fake-id")).rejects.toThrow(
        new NotFoundError("Entity not found using id fake-id")
      );
      
      await expect(
        repository.findById(
          new UniqueEntityId("edd89498-aefc-4de0-99a3-ad17e58aa8cb")
        )
      ).rejects.toThrow(
        new NotFoundError(
          "Entity not found using id edd89498-aefc-4de0-99a3-ad17e58aa8cb"
        )
      );
    })
    
    it("get", async () => {
      const entity = new Category({ name: "testing" });
      await repository.insert(entity);
      let entityFound = await repository.findById(entity.id);
      expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());

      entityFound = await repository.findById(entity["_id"]);
      expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  })
});
