import {
  SearchableRepositoryInterface,
  SearchParams as P,
  SearchResult as R,
} from "../../../@shared/domains/repository/@interface/repository.interface";
import { CategoryEntity } from "../entity/category.entity";

export namespace CategoryRepository {
  export type Filter = string | null;

  export interface Repository
    extends SearchableRepositoryInterface<
      CategoryEntity,
      Filter,
      SearchParams,
      SearchResult
    > {}

  export class SearchParams extends P<Filter> {}

  export class SearchResult extends R<CategoryEntity> {}
}
