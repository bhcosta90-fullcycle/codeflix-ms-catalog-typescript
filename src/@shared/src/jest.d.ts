import { FieldsErrors } from '@shared/domain/validators/validator-rules';

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
