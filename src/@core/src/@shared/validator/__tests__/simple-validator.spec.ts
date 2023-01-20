import { ValidationError } from "../../errors/validation.error";
import { SimpleValidate } from "../simple-validator";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof SimpleValidate;
  error: ValidationError;
  params?: any[];
};

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = SimpleValidate.values(value, property);
  const method = validator[rule];
  method.apply(validator, params);
}

describe("SimpleValidate Unit Tests", () => {
  test("values method", () => {
    const validator = SimpleValidate.values("some value", "field");
    expect(validator).toBeInstanceOf(SimpleValidate);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];
    const error = new ValidationError("The field is required");
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });
  });

  test("string validation rule", () => {
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];
    const error = new ValidationError("The field must be a string");
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "test", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    });
  });

  test("maxLength validation rule", () => {
    //invalid cases
    let arrange: Values[] = [{ value: "aaaaaa", property: "field" }];
    const error = new ValidationError(
      "The field must be less or equal than 5 characters"
    );
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "aaaaa", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });
  });

  test("boolean validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ];
    const error = new ValidationError("The field must be a boolean");
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: false, property: "field" },
      { value: true, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
        params: [5],
      });
    });
  });

  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = SimpleValidate.values(null, "field");
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError("The field is required"));

    validator = SimpleValidate.values(5, "field");
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError("The field must be a string"));

    validator = SimpleValidate.values("aaaaaa", "field");
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(
      new ValidationError("The field must be less or equal than 5 characters")
    );

    validator = SimpleValidate.values(null, "field");
    expect(() => {
      validator.required().boolean();
    }).toThrow(new ValidationError("The field is required"));

    validator = SimpleValidate.values(5, "field");
    expect(() => {
      validator.required().boolean();
    }).toThrow(new ValidationError("The field must be a boolean"));
  });

  it("should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    SimpleValidate.values("test", "field").required().string();
    SimpleValidate.values("aaaaa", "field").required().string().maxLength(5);

    SimpleValidate.values(true, "field").required().boolean();
    SimpleValidate.values(false, "field").required().boolean();
  });
});