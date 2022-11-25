export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors;
  data: PropsValidated;
  validate(data: any): boolean;
}