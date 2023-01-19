import { CategoryRepository } from "category/domain/repository/category.repository";
import { CategoryOutput } from "./dto/category.output";
export class DeleteCategoryUseCase
  implements UseCaseInterface<CategoryUseCaseInput, void>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<void> {
    const entity = await this.repository.findById(input.id);
    await this.repository.delete(entity.id);
  }
}

export type CategoryUseCaseInput = {
  id: string;
};
