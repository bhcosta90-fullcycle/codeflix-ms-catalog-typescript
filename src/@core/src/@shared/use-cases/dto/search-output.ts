import { SearchResult } from "./../../domains/repository/@interface/repository.interface";

export type SearchOutputDto<Items = any> = {
  items: Items[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
};

export class SearchOutputMapper {
  static toOutput(result: SearchResult): Omit<SearchOutputDto, "items"> {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
