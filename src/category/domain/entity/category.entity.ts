import { randomUUID } from "crypto";

export class Category {
  constructor(public props: CategoryType, public id?: string) {
    this.id = this.id ?? randomUUID();
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set name(name) {
    this.props.name = name;
  }

  private set description(description) {
    this.props.description = description ?? null;
  }

  private set is_active(is_active) {
    this.props.is_active = is_active ?? true;
  }
}

export type CategoryType = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
