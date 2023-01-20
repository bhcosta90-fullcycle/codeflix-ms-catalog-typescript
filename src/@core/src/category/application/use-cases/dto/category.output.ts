import { CategoryEntity } from "./../../../domain/entity/category.entity";
export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export class CategoryOutputMapper {
  static toOutput(entity: CategoryEntity): CategoryOutput {
    return {
      id: entity.id,
      name: entity.name,
      created_at: entity.created_at,
      description: entity.description,
      is_active: entity.is_active,
    };
  }
}
