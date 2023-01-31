import { UniqueEntityIdError } from "../../errors/unique-entity-id.error";
import { randomUUID } from "crypto";
import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id ?? randomUUID());
    this.validate();
  }

  private validate() {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (!regexExp.test(this.value)) {
      throw new UniqueEntityIdError();
    }
  }
}
