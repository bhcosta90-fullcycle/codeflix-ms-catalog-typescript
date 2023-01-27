import { CategoryModel } from "./category.model";
import { DataType, Sequelize } from "sequelize-typescript";

describe("CategoryModel Unit Test", () => {
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

  it("create", async () => {
    const arrange = {
      id: "ce73b0d4-c875-4b39-b272-4daf7fd9456a",
      name: "test",
      is_active: true,
      created_at: new Date(),
    };
    const model = await CategoryModel.create(arrange);
    expect(model.toJSON()).toStrictEqual(arrange);
  });

  it("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    expect(attributes).toStrictEqual([
      "id",
      "name",
      "description",
      "is_active",
      "created_at"
    ])
    
    expect(attributesMap.id).toMatchObject({
      primaryKey: true,
      field: "id",
      fieldName: "id",
      type: DataType.UUID(),
    });

    expect(attributesMap.name).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    expect(attributesMap.description).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    expect(attributesMap.is_active).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    expect(attributesMap.created_at).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(),
    });
  })
});
