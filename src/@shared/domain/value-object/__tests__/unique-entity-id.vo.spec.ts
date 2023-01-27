import { InvalidUniqueEntityIdError } from "../../../errors/invalid-unique-entity-id.error";
import { UniqueEntityId } from "../unique-entity-id.vo";

describe("UniqueEntityId Unit Test", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
  
  it("should throw error when id is invalid", () => {
    expect(() => new UniqueEntityId("fake-id")).toThrow(
      new InvalidUniqueEntityIdError()
    );
    expect(validateSpy).toBeCalledTimes(1);
  });

  it("should accept a id passed in constructor", () => {
    const uuid = "e2ff35d9-8b13-4e66-ba57-d14033bf5fdb";
    const entityId = new UniqueEntityId(uuid);
    expect(entityId.value).toBe("e2ff35d9-8b13-4e66-ba57-d14033bf5fdb");
    expect(validateSpy).toBeCalledTimes(1);
  });

  describe("should accept a empty value in constructor", () => {
    const entityId = new UniqueEntityId();
    expect(entityId.value).toBeTruthy();
    expect(validateSpy).toBeCalledTimes(1);

    const data: any[] = [null, undefined];

    test.each(data)("validate %o", (i: any) => {
      const entityId = new UniqueEntityId(i);
      expect(entityId.value).toBeTruthy();
      expect(validateSpy).toBeCalledTimes(1);
    });
  });
});
