import { UseCaseInterface } from "../../../@shared/use-cases/use-case.interface";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category.output";
export namespace GetCategoryUseCase {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(protected repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.repository.findById(input.id);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  type Input = {
    id: string;
  };

  export type Output = CategoryOutput;
}
