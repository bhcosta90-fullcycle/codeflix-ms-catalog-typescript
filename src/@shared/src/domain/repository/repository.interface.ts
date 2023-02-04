import { UniqueEntityId } from "../value-object/unique-entity-id.vo";
import { Entity } from "../entity/entity";

export interface RepositoryInterface<E extends Entity<any>> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchParamsProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: Filter;
};

export class SearchParams<Filter = string> {
  protected _page?: number;
  protected _per_page?: number = 15;
  protected _sort?: string;
  protected _sort_dir?: SortDirection;
  protected _filter?: Filter;

  constructor(protected props: SearchParamsProps) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter as any;
  }

  private set page(value: number) {
    let _page = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }
    this._page = _page;
  }

  private set per_page(value: number) {
    let _per_page = value === (true as any) ? this._per_page : +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any) !== _per_page
    ) {
      _per_page = this._per_page;
    }

    this._per_page = _per_page;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
  }

  private set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ""
        ? null
        : value;
  }

  public get page() {
    return this._page;
  }

  public get per_page() {
    return this._per_page;
  }

  public get sort() {
    return this._sort;
  }

  public get sort_dir() {
    return this._sort_dir;
  }

  public get filter() {
    return this._filter;
  }
}

export type SearchResultProps<E extends Entity<any>, Filter> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: Filter;
};

export class SearchResult<E extends Entity<any>, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string;
  readonly sort_dir: string;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
    this.last_page = Math.ceil(this.total / this.per_page);
  }

  toJSON(forceEntity = false) {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
      last_page: this.last_page,
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity<any>,
  Filter,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
