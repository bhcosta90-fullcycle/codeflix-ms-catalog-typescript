import { UniqueId } from "../../vo/unique-id.vo";
import { EntityAbstract } from "./../../entity/entity.abstract";

export interface RepositoryInterface<E extends EntityAbstract> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueId): Promise<void>;
}

export class SearchParams<Filter> {
  private _page: number;
  private _per_page: number = 15;
  public filter: Filter | null;

  constructor(props: SearchProps<Filter>) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get per_page(): number {
    return this._per_page;
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
}

export type SearchProps<Filter> = {
  page?: number;
  per_page?: number;
  filter?: Filter | null;
};

export interface SearchableRepositoryInterface<
  E extends EntityAbstract,
  Filter,
  SearchInput = SearchParams<Filter>,
  SearchOutput = null
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
