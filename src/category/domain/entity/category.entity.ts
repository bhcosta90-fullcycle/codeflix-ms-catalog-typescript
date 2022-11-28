import { EntityValidationError } from "../../../@shared/errors/entity-validation.error";
import { EntityAbstract } from "../../../@shared/domains/entity/entity.abstract";
import { UniqueId } from "../../../@shared/domains/vo/unique-id.vo";
import { CategoryValidatorFactory } from "./../validators/category.validator";

export class CategoryEntity extends EntityAbstract<CategoryProps> {
  protected _name: string;
  protected _description?: string;
  protected _is_active: boolean;
  protected _created_at?: Date;

  constructor(props: CategoryProps, id?: UniqueId) {
    CategoryEntity.validate(props);
    super(props, id)
    this._name = props.name;
    this._description = props.description ?? null;
    this._is_active = props.is_active ?? true;
    this._created_at = props.created_at ?? new Date();
  };

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get is_active(): boolean {
    return this._is_active;
  }

  get created_at(): Date {
    return this._created_at;
  }

  update(props: Pick<CategoryProps, 'name' | 'description'>) {
    CategoryEntity.validate(props);
    this._name = props.name;
    this._description = props.description;
  }

  private static validate(props: Omit<CategoryProps, 'id' | 'created_at'>) {
    const validator = CategoryValidatorFactory.create();
    if (!validator.validate(props)) {
      throw new EntityValidationError(validator.errors);
    }
  }

  active() {
    this._is_active = true;
  }

  deactive() {
    this._is_active = false;
  }
}

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
