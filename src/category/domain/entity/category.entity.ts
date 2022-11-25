import { EntityAbstract } from "../../../@shared/domains/entity/entity.abstract";
import { UniqueId } from "../../../@shared/domains/vo/unique-id.vo";

export class CategoryEntity extends EntityAbstract<CategoryProps> {
  private _name: string;
  private _description?: string;
  private _is_active: boolean;
  private _created_at?: Date;

  constructor(props: CategoryProps, id?: UniqueId) {
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

  update(name: string, description ?: string){
    this._name = name;
    this._description = description;
  }

  enabled() {
    this._is_active = true;
  }

  disabled() {
    this._is_active = false;
  }
}

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
