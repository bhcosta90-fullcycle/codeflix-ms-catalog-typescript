import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryEntity } from "../../domain/entity/category.entity";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category.output";

export namespace CreateCategoryUseCase {
  export class UseCase
    implements UseCaseInterface<Input, Output>
  {
    constructor(protected repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new CategoryEntity(input);
      await this.repository.insert(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;
}
