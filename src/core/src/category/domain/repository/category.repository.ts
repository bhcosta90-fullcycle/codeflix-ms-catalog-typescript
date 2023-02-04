import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "@ca/shared/domain/repository/repository.interface";
import { Category } from "../entity/category.entity";
import { SearchableRepositoryInterface } from "@ca/shared/domain/repository/repository.interface";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
