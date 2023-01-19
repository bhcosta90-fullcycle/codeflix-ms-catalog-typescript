import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category.output";
export class GetCategoryUseCase
  implements UseCaseInterface<CategoryUseCaseInput, CategoryOutput>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<CategoryOutput> {
    const entity = await this.repository.findById(input.id);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type CategoryUseCaseInput = {
  id: string;
};
