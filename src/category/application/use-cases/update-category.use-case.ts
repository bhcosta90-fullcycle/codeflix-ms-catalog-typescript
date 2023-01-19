import { CategoryEntity } from './../../domain/entity/category.entity';
import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryOutput } from "./dto/category.output";
export class UpdateCategoryUseCase
  implements UseCaseInterface<CategoryUseCaseInput, CategoryOutput>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<CategoryOutput> {
    const entity: CategoryEntity = await this.repository.findById(input.id);

    entity.update({
      name: input.name,
      description: input.description
    })

    if (input.is_active === true) {
      entity.active()
    }

    if (input.is_active === false) {
      entity.deactivate();
    }

    this.repository.update(entity);
    
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
  name: string;
  description?: string;
  is_active?: boolean;
};
