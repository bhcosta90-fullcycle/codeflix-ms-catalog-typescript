import { ValidatorFieldError } from "../errors/validator-fields.error";
import { validateSync } from "class-validator";
import {
  FieldsErrors,
  ValidatorFieldsInterface
} from "./@interface/validator-fields.interface";

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null;
  data: PropsValidated = null;

  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.data = data;
    }

    if (errors.length) {
      throw new ValidatorFieldError(this.errors);
    }

    return !errors.length;
  }
}