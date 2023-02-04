import { UniqueEntityId } from "../../domain/value-object/unique-entity-id.vo";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize-model.factory";
import { setupSequelize } from "../testing/helpers/db";
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
    return new SequelizeModelFactory<StubModel, {id?: string, name: string}>(StubModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.word(),
    }));
  }
}

describe("SequelizeModelFactory Feature Test", () => {
  setupSequelize({ models: [StubModel] });

  describe("create a method", () => {
    it("no param", async () => {
      const entity = await StubModel.factory().create();
      expect(entity.id).not.toBeNull();
      expect(entity.name).not.toBeNull();
      new UniqueEntityId(entity.id);

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

  describe("make a method", () => {
    it("no param", () => {
      const entity = StubModel.factory().make();
      expect(entity.id).not.toBeNull();
      expect(entity.name).not.toBeNull();
      new UniqueEntityId(entity.id);
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

  describe("bulkCreate a method", () => {
    describe("using count = 1", () => {
      it("no param", async () => {
        const entity = await StubModel.factory().bulkCreate();
        expect(entity).toHaveLength(1);

        expect(entity[0].id).not.toBeNull();
        expect(entity[0].name).not.toBeNull();
        new UniqueEntityId(entity[0].id);

        const modelFound = await StubModel.findByPk(entity[0].id);
        expect(entity[0].id).toBe(modelFound.id);
      });

      it("with param", async () => {
        const entity = await StubModel.factory().bulkCreate(() => ({
          id: "e07807e9-874c-4189-9d07-3a3d2bb82153",
          name: "testing",
        }));
        expect(entity[0].id).toBe("e07807e9-874c-4189-9d07-3a3d2bb82153");
        expect(entity[0].name).toBe("testing");

        let modelFound = await StubModel.findByPk(entity[0].id);
        expect(entity[0].id).toBe(modelFound.id);
        expect(entity[0].name).toBe("testing");
      });
    });

    describe("using count = 2", () => {
      it("no param", async () => {
        const entity = await StubModel.factory().count(2).bulkCreate();
        expect(entity).toHaveLength(2);

        expect(entity[0].id).not.toBeNull();
        expect(entity[0].name).not.toBeNull();
        expect(entity[1].id).not.toBeNull();
        expect(entity[1].name).not.toBeNull();
        new UniqueEntityId(entity[0].id);
        new UniqueEntityId(entity[1].id);

        let modelFound = await StubModel.findByPk(entity[0].id);
        expect(entity[0].id).toBe(modelFound.id);

        modelFound = await StubModel.findByPk(entity[1].id);
        expect(entity[1].id).toBe(modelFound.id);
      });

      it("with param", async () => {
        const entity = await StubModel.factory().count(2).bulkCreate(() => ({
          name: "testing",
        }));
        expect(entity[0].id).not.toBeNull();
        expect(entity[0].name).toBe("testing");
        expect(entity[1].id).not.toBeNull();
        expect(entity[1].name).toBe("testing");
        expect(entity[0].id).not.toBe(entity[1].id);

        let modelFound = await StubModel.findByPk(entity[0].id);
        expect(entity[0].id).toBe(modelFound.id);

        modelFound = await StubModel.findByPk(entity[1].id);
        expect(entity[1].id).toBe(modelFound.id);
      });
    });
  });

  describe("bulkMake a method", () => {
    describe("using count = 1", () => {
      it("no param", async () => {
        const entity = StubModel.factory().bulkMake();
        expect(entity).toHaveLength(1);

        expect(entity[0].id).not.toBeNull();
        expect(entity[0].name).not.toBeNull();
        new UniqueEntityId(entity[0].id);
      });

      it("with param", () => {
        const entity = StubModel.factory().bulkMake(() => ({
          id: "e07807e9-874c-4189-9d07-3a3d2bb82153",
          name: "testing",
        }));
        expect(entity[0].id).toBe("e07807e9-874c-4189-9d07-3a3d2bb82153");
        expect(entity[0].name).toBe("testing");
      });
    });

    describe("using count = 2", () => {
      it("no param", () => {
        const entity = StubModel.factory().count(2).bulkMake();
        expect(entity).toHaveLength(2);

        expect(entity[0].id).not.toBeNull();
        expect(entity[0].name).not.toBeNull();
        expect(entity[1].id).not.toBeNull();
        expect(entity[1].name).not.toBeNull();
        new UniqueEntityId(entity[0].id);
        new UniqueEntityId(entity[1].id);
      });

      it("with param", () => {
        const entity = StubModel.factory()
          .count(2)
          .bulkMake(() => ({
            name: "testing",
          }));
        expect(entity[0].id).not.toBeNull();
        expect(entity[0].name).toBe("testing");
        expect(entity[1].id).not.toBeNull();
        expect(entity[1].name).toBe("testing");
        expect(entity[0].id).not.toBe(entity[1].id);
      });
    });
  });
});
