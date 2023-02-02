import { UniqueEntityId } from './../../domain/value-object/unique-entity-id.vo';
import { Column, DataType, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize-model.factory";
import _chance from "chance";
const chance = _chance();

@Table
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id;

  @PrimaryKey
  @Column({ type: DataType.STRING(255), allowNull: true })
  declare name;

  static factory() {
    return new SequelizeModelFactory(StubModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.word(),
    }));
  }
}

describe("SequelizeModelFactory Feature Test", () => {
  let sequelize: Sequelize;
  beforeAll(
    () =>
      (sequelize = new Sequelize({
        dialect: "sqlite",
        host: ":memory:",
        logging: false,
        models: [StubModel],
      }))
  );

  beforeEach(async () => await sequelize.sync({ force: true }));

  afterAll(async () => await sequelize.close());

  describe("create a method", () => {
    it("no param", async () => {
      const entity = await StubModel.factory().create();
      new UniqueEntityId(entity.id);
      expect(entity.name).not.toBeNull();

      const modelFound = await StubModel.findByPk(entity.id);
      expect(entity.id).toBe(modelFound.id);
    });

    it("with param", async () => {
      const entity = await StubModel.factory().create({
        name: "testing",
        id: "2ea932c6-2702-4dc4-be59-f7a21dba4b29",
      });
      expect(entity.id).toBe("2ea932c6-2702-4dc4-be59-f7a21dba4b29");
      expect(entity.name).toBe("testing");
    });
  });
});
