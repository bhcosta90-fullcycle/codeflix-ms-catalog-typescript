import { UniqueId } from "../unique-id.vo";
import { validate } from "uuid";

describe("UniqueId Unit Test", () => {
  const spyUniqueIdValidateMethod = jest.spyOn(
    UniqueId.prototype as any,
    "validate"
  );

  it("should throw error when uuid is invalid", () => {
    const spyUniqueIdValidateMethod = jest.spyOn(
      UniqueId.prototype as any,
      "validate"
    );
    expect(() => new UniqueId("test")).toThrow("ID must be a valid UUID");
    expect(spyUniqueIdValidateMethod).toHaveBeenCalledTimes(1);
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "ce73b0d4-c875-4b39-b272-4daf7fd9456a";
    const vo = new UniqueId(uuid);
    expect(vo.value).toBe(uuid);
    expect(spyUniqueIdValidateMethod).toHaveBeenCalledTimes(1);
  });

  it("should accept withoud uuid passed in constructor", () => {
    const vo = new UniqueId();
    expect(validate(vo.value)).toBeTruthy;
    expect(spyUniqueIdValidateMethod).toHaveBeenCalledTimes(1);
  });
});
