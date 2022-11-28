import { EntityValidationError } from "../../@shared/errors/entity-validation.error";
import { FieldsErrors } from "../../@shared/validator/@interface/validator-fields.interface";
import { ClassValidatorFields } from "../../@shared/validator/class-validator-fields";

type Expected =
  | { validator: ClassValidatorFields<any, any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessages(
    expected: Expected,
    received: FieldsErrors
  ): { pass: boolean; message: any } {
    let retErrors: any = null;
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        retErrors = error.error;
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }
      retErrors = validator.errors;
    }

    return assertContainsErrorsMessages(retErrors, received);
  },
});

function isValid() {
  return { pass: true, message: () => "" };
}

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? { pass: true, message: () => "" }
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      };
}
