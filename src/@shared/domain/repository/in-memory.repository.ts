import { NotFoundError } from "./../../errors/not-found.error";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from "./repository.interface";
import { Entity } from "../entity/entity";
import { UniqueEntityId } from "../value-object/unique-entity-id.vo";

export abstract class InMemoryRepository<E extends Entity<any>>
  implements RepositoryInterface<E>
{
  public items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const item = await this._get(entity.id);
    const index = this.items.findIndex((i) => i.id === item.id);
    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const item = await this._get(`${id}`);
    const indexFound = this.items.findIndex((i) => i.id === item.id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((i: E) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity not found using id ${id}`);
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity<any>>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, string>
{
  sortableFields: string[] = ["name", "created_at"];

  async search(props: SearchParams<string>): Promise<SearchResult<E, string>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);

    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    );

    const itemPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: itemPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      filter: props.filter,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: SearchParams["filter"]
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: SearchParams["sort"],
    sort_dir: SearchParams["sort_dir"]
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === "asc" ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ): Promise<E[]> {
    const start = (page - 1) * per_page; // 1 * 15 = 15
    const limit = start + per_page; // 15 + 15 = 30
    return items.slice(start, limit);
  }
}
