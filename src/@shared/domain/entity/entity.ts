import { UniqueEntityId } from "../value-object/unique-entity-id.vo";

export abstract class Entity<Props> {
  constructor(public props: Props, private _id?: UniqueEntityId) {
    this._id = this._id ?? new UniqueEntityId();
  }

  get id(): string {
    return this._id.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
