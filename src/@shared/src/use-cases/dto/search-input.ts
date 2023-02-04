export type SearchInputDto<Filter> = {
  page?: number;
  per_page?: number;
  filter?: Filter;
};
