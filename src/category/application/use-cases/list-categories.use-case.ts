import { SearchOutputMapper } from "./../../../@shared/use-cases/dto/search-output";
import { SearchOutputDto } from "../../../@shared/use-cases/dto/search-output";
import { SearchInputDto } from "../../../@shared/use-cases/dto/search-input";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category.output";
export class ListCategoriesUseCase
  implements UseCaseInterface<CategoryUseCaseInput, CategoryUseCaseOutput>
{
  constructor(protected repository: CategoryRepository.Repository) {}

  async execute(input: CategoryUseCaseInput): Promise<CategoryUseCaseOutput> {
    const params = new CategoryRepository.SearchParams(input);
    const entities = await this.repository.search(params);
    return this.toOutput(entities);
  }

  private toOutput(
    result: CategoryRepository.SearchResult
  ): CategoryUseCaseOutput {
    const items = result.items.map((entity) =>
      CategoryOutputMapper.toOutput(entity)
    );

    return {
      items,
      ...SearchOutputMapper.toOutput(result),
    };
  }
}

export type CategoryUseCaseInput = SearchInputDto<CategoryRepository.Filter>;

export type CategoryUseCaseOutput = SearchOutputDto<CategoryOutput>;
