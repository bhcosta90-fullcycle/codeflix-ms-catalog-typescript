import { UniqueId } from "../vo/unique-id.vo";

export abstract class EntityAbstract<Props> {
  
  private _uniqueId?: UniqueId;

  constructor(protected props: Props, protected _id?: UniqueId) {
    this._uniqueId = _id || new UniqueId();
  }

  get id(): string {
    return this._uniqueId.value;
  }
}