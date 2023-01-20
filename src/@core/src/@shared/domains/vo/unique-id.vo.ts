import { v4 as uuid, validate as validateUuid } from "uuid";
import { InvalidIdError } from "../../errors/invalid-id.error";
import { ValueObjectAbstract } from "./value-object.abstract";

export class UniqueId extends ValueObjectAbstract {
  protected _id: string;

  constructor(id?: string) {
    super(id ?? uuid());
    this.validate();
  }

  private validate() {
    if (!validateUuid(this.value)) {
      throw new InvalidIdError("ID must be a valid UUID");
    }
  }
}
