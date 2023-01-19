import { CategoryEntity } from "./../../../domain/entity/category.entity";
export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export class CategoryOutputMapper {
  static toOutput(entity: CategoryEntity) {
    return entity.toJSON();
  }
}
