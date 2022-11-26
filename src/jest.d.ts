import { FieldsErrors } from "@shared/validator/@interface/validator-fields.interface";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
