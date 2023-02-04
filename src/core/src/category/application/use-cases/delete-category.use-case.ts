import { UseCaseInterface } from "@ca/shared/use-cases/use-case.interface";
import { CategoryRepository } from "../../domain/repository/category.repository";

export namespace DeleteCategoryUseCase {
  export class UseCase implements UseCaseInterface<Input, void> {
    constructor(protected repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<void> {
      const entity = await this.repository.findById(input.id);
      await this.repository.delete(entity.id);
    }
  }

  type Input = {
    id: string;
  };
}
