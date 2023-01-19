import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryEntity } from "../../domain/entity/category.entity";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category.output";
export class CreateCategoryUseCase
  implements UseCaseInterface<CategoryUseCaseInput, CategoryOutput>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<CategoryOutput> {
    const entity = new CategoryEntity(input);
    await this.repository.insert(entity);
    return CategoryOutputMapper.toOutput(entity);;
  }
}

export type CategoryUseCaseInput = {
  name: string;
  description?: string;
  is_active?: boolean;
};
