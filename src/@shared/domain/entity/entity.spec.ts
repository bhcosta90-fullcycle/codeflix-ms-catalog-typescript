import { UniqueEntityId } from "../value-object/unique-entity-id.vo";
import { Entity } from "./entity";

class StubEntity extends Entity<
  { prop1: string; prop2: number },
  { prop1: string }
> {
  update(props: { prop1: string }) {
    this.props.prop1 = props.prop1;
  }
}

describe("Entity Unit Tests", () => {
  describe("Constructor", () => {
    it("should set props and id", () => {
      const arrange = { prop1: "prop1 value", prop2: 10 };
      const entity = new StubEntity(arrange);
      expect(entity.props).toStrictEqual(arrange);
      expect(entity["_id"]).toBeInstanceOf(UniqueEntityId);
    });

    it("should accept a valid uuid", () => {
      const arrange = { prop1: "prop1 value", prop2: 10 };
      const uniqueEntityId = new UniqueEntityId();
      const entity = new StubEntity(arrange, uniqueEntityId);
      expect(entity["_id"]).toBeInstanceOf(UniqueEntityId);
      expect(entity.id).toBe(uniqueEntityId.value);
    });

    it("should convert an entity to a JavaScript Object", () => {
      const arrange = { prop1: "prop1 value", prop2: 10 };
      const uniqueEntityId = new UniqueEntityId();
      const entity = new StubEntity(arrange, uniqueEntityId);
      expect(entity.toJSON()).toStrictEqual({
        id: entity.id,
        ...arrange,
      });
    });
  });

  describe("Update", () => {
    it("dddd", () => {
      const arrange = { prop1: "prop1 value", prop2: 10 };
      const entity = new StubEntity(arrange);
      entity.update({
        prop1: "djdiwajdiajdwi"
      });

      expect(entity.toJSON()).toStrictEqual({
        id: entity.id,
        ...arrange,
      });
    });
  });
});
