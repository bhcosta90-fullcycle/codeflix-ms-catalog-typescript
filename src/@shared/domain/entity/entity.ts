import { UniqueEntityId } from "../value-object/unique-entity-id.vo";

export abstract class Entity<Props, PropUpdate = Props> {
  constructor(public props: Props, private _id?: UniqueEntityId) {
    this._id = this._id ?? new UniqueEntityId();
  }

  get id(): string {
    return this._id.value;
  }

  abstract validate(): true;

  public update(props: PropUpdate) {
    (Object.keys(props) as (keyof typeof props)[]).forEach((key) => {
      //@ts-ignore
      this.props[`${key}`] = props[key] === undefined ? null : props[key];
    });

    this.validate();
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
