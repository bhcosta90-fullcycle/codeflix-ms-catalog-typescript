import { UniqueId } from "../vo/unique-id.vo";

export abstract class EntityAbstract<Props = any> {

  abstract update(props: Props);

  public readonly uniqueId?: UniqueId;

  constructor(protected readonly props: Props, protected readonly _id?: UniqueId) {
    this.uniqueId = _id || new UniqueId();
  }

  get id(): string {
    return this.uniqueId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props
    } as Required<{ id: string } & Props>
  }
}