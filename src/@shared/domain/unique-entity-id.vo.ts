import { InvalidUniqueEntityId } from "./../errors/invalid-unique-entity-id.error";
import { randomUUID } from "crypto";

export class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id ?? randomUUID();
    this.validate();
  }

  private validate() {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    
    if (!regexExp.test(this.id)) {
      throw new InvalidUniqueEntityId();
    }
  }
}
