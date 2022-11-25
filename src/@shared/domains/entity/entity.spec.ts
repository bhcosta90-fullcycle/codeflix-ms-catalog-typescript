import { validate as uuidValidate } from "uuid";
import { UniqueId } from "../vo/unique-id.vo";
import { EntityAbstract } from "./entity.abstract";

class StubEntity extends EntityAbstract<{ prop1: string; prop2: number }> { }

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity['props']).toStrictEqual(arrange);
    expect(entity['_uniqueId']).toBeInstanceOf(UniqueId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const uniqueEntityId = new UniqueId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity['_uniqueId']).toBeInstanceOf(UniqueId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it("should convert an entity to a JavaScript Object", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const uniqueEntityId = new UniqueId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});