import { v4 as uuid, validate as validateUuid } from "uuid";
import { InvalidIdError } from "./../../errors/invalid-id.error";

export class UniqueId {
  protected _id: string;

  constructor(id?: string) {
    this._id = id ?? uuid();
    this.validate();
  }

  private validate() {
    if (!validateUuid(this._id)) {
      throw new InvalidIdError("ID must be a valid UUID");
    }
  }

  get id(): string {
    return this._id;
  }
}
