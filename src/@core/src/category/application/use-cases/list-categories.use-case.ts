import { SearchOutputMapper } from "./../../../@shared/use-cases/dto/search-output";
import { SearchOutputDto } from "../../../@shared/use-cases/dto/search-output";
import { SearchInputDto } from "../../../@shared/use-cases/dto/search-input";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category.output";

export namespace ListCategoriesUseCase {
  export class UseCase
    implements UseCaseInterface<Input, Output>
  {
    constructor(protected repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const entities = await this.repository.search(params);
      return this.toOutput(entities);
    }

    private toOutput(result: CategoryRepository.SearchResult): Output {
      const items = result.items.map((entity) =>
        CategoryOutputMapper.toOutput(entity)
      );

      return {
        items,
        ...SearchOutputMapper.toOutput(result),
      };
    }
  }

  export type Input = SearchInputDto<CategoryRepository.Filter>;

  type Output = SearchOutputDto<CategoryOutput>;
}
