import { UniqueEntityId } from "../value-object/unique-entity-id.vo";
import { Entity } from "../entity/entity";
import { values } from "lodash";

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

export interface SearchableRepositoryInterface<
  E extends Entity<any>,
  SearchInput = SearchParams,
  SearchOutput = null
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
