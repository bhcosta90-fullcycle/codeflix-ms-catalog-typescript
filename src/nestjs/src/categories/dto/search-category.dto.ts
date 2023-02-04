import { SortDirection } from '@ca/shared/domain/repository/repository.interface';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
