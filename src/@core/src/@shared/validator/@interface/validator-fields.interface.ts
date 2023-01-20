export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface<PropsValidated, TypeValidator> {
  errors: FieldsErrors;
  data: PropsValidated;
  validate(data: TypeValidator): boolean;
}