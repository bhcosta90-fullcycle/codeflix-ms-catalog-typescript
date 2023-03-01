import { EntityValidationError } from "@ca/shared/errors/entity-validation.error";
import { Entity } from "@ca/shared/domain/entity/entity";
import { UniqueEntityId } from "@ca/shared/domain/value-object/unique-entity-id.vo";
import { CategoryValidatorFactory } from "../validators/category.validator";
import { CategoryFakeBuilder } from "./category.faker";

export class Category extends Entity<
  CategoryType,
  Pick<CategoryType, "name" | "description">
> {
  constructor(protected props: CategoryType, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
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

  update(props: Pick<CategoryType, "name" | "description">): void {
    Category.validate(props);
    this.name = props.name;
    this.description = props.description;
  }

  static validate(props: CategoryType) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  static fake() {
    return CategoryFakeBuilder;
  }
}

export type CategoryType = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
