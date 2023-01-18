import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryEntity } from "../../domain/entity/category.entity";
import { CategoryOutput } from "./dto/category.output";
export class CreateCategoryUseCase
  implements UseCaseInterface<CategoryUseCaseInput, CategoryOutput>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<CategoryOutput> {
    const entity = new CategoryEntity(input);
    await this.repository.insert(entity);
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}

export type CategoryUseCaseInput = {
  name: string;
  description?: string;
  is_active?: boolean;
};
