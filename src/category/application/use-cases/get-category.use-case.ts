import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryOutput } from "./dto/category.output";
export class GetCategoryUseCase
  implements UseCaseInterface<CategoryUseCaseInput, CategoryOutput>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<CategoryOutput> {
    const entity = await this.repository.findById(input.id);
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
  id: string;
};
