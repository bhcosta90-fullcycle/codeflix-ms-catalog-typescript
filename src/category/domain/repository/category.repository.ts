import {
  SearchableRepositoryInterface,
  SearchParams as P,
  SearchResult as R,
} from "@shared/domains/repository/@interface/repository.interface";
import { CategoryEntity } from "../entity/category.entity";

export namespace CategoryRepository {
  export type Filter = string;

  export interface Repository
    extends SearchableRepositoryInterface<
      CategoryEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}

  class SearchParams extends P<Filter> {}

  class SearchResult extends R<CategoryEntity> {}
}
