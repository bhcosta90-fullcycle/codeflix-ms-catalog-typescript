import { UseCaseInterface } from "@ca/shared/use-cases/use-case.interface";
import { Category } from "./../../domain/entity/category.entity";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "./dto/category.output";

export namespace UpdateCategoryUseCase {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(protected repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity: Category = await this.repository.findById(input.id);

      entity.update({
        name: input.name,
        description: input.description,
      });

      if (input.is_active === true) {
        entity.activate();
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

  export type Input = {
    id: string;
    name: string;
    description?: string | null;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;
}
