import { CategorySequelizeRepository } from "./category.repository";
import { CategoryModel } from "./category.model";
import { Sequelize } from "sequelize-typescript";
import { CategoryEntity } from "@ca/core/category/domain/entity/category.entity";
describe("CategorySequelizeRepository Unit Test", () => {
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

  it("should inserts a new entity", async () => {
    let category = new CategoryEntity({
      name: "test",
    });
    repository.insert(category);
    const model = await CategoryModel.findByPk(category.id);
    expect(model?.toJSON()).toStrictEqual({
      id: category.id,
      is_active: category.is_active,
      description: category.description,
      name: category.name,
      created_at: category.created_at,
    });
  });
});
