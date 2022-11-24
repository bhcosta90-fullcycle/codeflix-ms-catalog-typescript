export class CategoryEntity {
  private _name: string;
  private _description?: string;
  private _is_active: boolean;
  private _date?: Date;

  constructor(protected readonly props: CategoryProps) {
    this._name = props.name;
    this._description = props.description;
    this._is_active = props.is_active;
    this._date = props.date;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get is_active(): boolean {
    return this._is_active;
  }

  get date(): Date {
    return this._date;
  }
}

type CategoryProps = {
  name: string;
  description?: string;
  is_active: boolean;
  date?: Date;
};
