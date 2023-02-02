import { DataType, Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";

describe("CategoryModel Feature Test", () => {
  let sequelize: Sequelize;
  beforeAll(
    () =>
      (sequelize = new Sequelize({
        dialect: "sqlite",
        host: ":memory:",
        logging: false,
        models: [CategoryModel],
      }))
  );

  beforeEach(async () => await sequelize.sync({ force: true }));

  afterAll(async () => await sequelize.close());

  test("create", async () => {
    const created_at = new Date();

    const category = await CategoryModel.create({
      id: "d95c23d1-3b6d-4af5-8bdf-e60a67d5cb21",
      name: "testing",
      is_active: true,
      created_at,
    });

    expect(category.toJSON()).toStrictEqual({
      id: "d95c23d1-3b6d-4af5-8bdf-e60a67d5cb21",
      name: "testing",
      is_active: true,
      created_at,
    });
  });

  test("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(CategoryModel.getAttributes());
    expect(attributes).toStrictEqual([
      "id",
      "name",
      "description",
      "is_active",
      "created_at",
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: "id",
      fieldName: "id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    });
  });
});
