import { ClassValidatorFields } from "../class-validator-fields";
import * as libClassValidator from "class-validator";
import { ValidatorFieldError } from "../../errors/entity-validation.error";

class StubClassValidatorFields extends ClassValidatorFields<
  {
    field: string;
  },
  {
    field: string;
  }
> {}

describe("ClassValidatorFields Unit Tests", () => {
  it("should initialize erros and validated variables with null", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.data).toBeNull();
  });

  it("should validate with errors", () => {
    try {
      const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
      spyValidateSync.mockReturnValue([
        { property: "field", constraints: { isRequired: "some error" } },
      ]);
      const validator = new StubClassValidatorFields();
      expect(validator.validate(null)).toBeFalsy();
      expect(spyValidateSync).toHaveBeenCalled();
      expect(validator.data).toBeNull();
      expect(validator.errors).toStrictEqual({ field: ["some error"] });
    }catch(e) {
      if (e instanceof ValidatorFieldError){
        expect(e.errors).toStrictEqual({ field: ['some error'] });
      }
    }
  });

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.data).toStrictEqual({ field: 'value' });
    expect(validator.errors).toBeNull();
  });
});