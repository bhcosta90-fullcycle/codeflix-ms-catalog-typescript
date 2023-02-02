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

  test("should a execute action a insert", async () => {
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

  describe("should a execute action a find by id", () => {
    test("error", async () => {
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
    });

    test("success", async () => {
      const entity = new Category({ name: "testing" });
      await repository.insert(entity);
      let entityFound = await repository.findById(entity.id);
      expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());

      entityFound = await repository.findById(entity["_id"]);
      expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  });

  describe("should a execute action a update", () => {
    test("error", async () => {
      const entity = new Category({ name: "Movie" });
      await expect(repository.update(entity)).rejects.toThrow(
        new NotFoundError(`Entity not found using id ${entity.id}`)
      );
    });

    test("success", async () => {
      const entity = new Category({ name: "Movie" });
      await repository.insert(entity);

      entity.update({ name: "Movie updated", description: entity.description });
      await repository.update(entity);

      let entityFound = await repository.findById(entity.id);
      expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  });

  describe("should a execute action a delete", () => {
    test("error", async () => {
      await expect(repository.delete("fake id")).rejects.toThrow(
        new NotFoundError("Entity not found using id fake id")
      );

      await expect(
        repository.delete(
          new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
        )
      ).rejects.toThrow(
        new NotFoundError(
          `Entity not found using id 9366b7dc-2d71-4799-b91c-c64adb205104`
        )
      );
    });

    it("success", async () => {
      const entity = new Category({ name: "Movie" });
      await repository.insert(entity);

      await repository.delete(entity.id);
      const entityFound = await CategoryModel.findByPk(entity.id);

      expect(entityFound).toBeNull();
    });
  });

  it("should return all categories", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });
});
