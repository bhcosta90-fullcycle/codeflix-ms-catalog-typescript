import { UniqueEntityId } from "../value-object/unique-entity-id.vo";
import { Entity } from "./entity";

class StubEntity extends Entity<
  { prop1: string; prop2: number; prop3?: string },
  { prop1: string; prop3?: string }
> {
  validate(): true {
    return true;
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
    it("should edit a prop1 value", () => {
      const arrange = { prop1: "prop1 value", prop2: 10 };
      const entity = new StubEntity(arrange);
      const spyValidated = jest.spyOn(StubEntity.prototype, "validate");
      entity.update({
        prop1: "testing",
        prop3: undefined,
      });

      expect(entity.toJSON()).toStrictEqual({
        id: entity.id,
        prop1: "testing",
        prop2: 10,
        prop3: null,
      });
      expect(spyValidated).toBeCalledTimes(1);
    });
  });
});
