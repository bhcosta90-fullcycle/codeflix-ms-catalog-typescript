import { UniqueId } from "../vo/unique-id.vo";

export abstract class EntityAbstract<Props> {

  private _uniqueId?: UniqueId;

  constructor(protected readonly props: Props, protected readonly _id?: UniqueId) {
    this._uniqueId = _id || new UniqueId();
  }

  get id(): string {
    return this._uniqueId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props
    } as Required<{ id: string } & Props>
  }
}