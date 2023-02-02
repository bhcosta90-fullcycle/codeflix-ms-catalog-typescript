import { UniqueEntityId } from "@ca/core/@shared/domain/value-object/unique-entity-id.vo";
import { EntityValidationError } from "@ca/core/@shared/errors/entity-validation.error";
import { LoadEntityError } from "@ca/core/@shared/errors/load-entity.error";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { CategoryModel } from "./category.model";

export class CategoryMapper {
  static toEntity(model: CategoryModel): Category {
    const { id, ...data } = model.toJSON();
    try {
      return new Category(data, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
