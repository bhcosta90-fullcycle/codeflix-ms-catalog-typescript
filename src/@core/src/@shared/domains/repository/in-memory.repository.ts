import { NotFoundError } from "./../../errors/not-found.error";
import { EntityAbstract } from "../entity/entity.abstract";
import { UniqueId } from "../vo/unique-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from "./@interface/repository.interface";

export abstract class InMemoryRepository<E extends EntityAbstract, Filter>
  implements RepositoryInterface<E, Filter>
{
  public items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueId): Promise<E> {
    return this.getItem(id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const _entity = await this.getItem(entity.id);
    const _index = this.items.findIndex((i) => i.id === _entity.id);
    this.items[_index] = entity;
  }

  async delete(id: string | UniqueId): Promise<void> {
    const _entity = await this.getItem(`${id}`);
    const _index = this.items.findIndex((i) => i.id === _entity.id);
    this.items.splice(_index, 1);
  }

  protected async getItem(id: string | UniqueId) {
    const _id = `${id}`;
    const item = this.items.find((i) => i.id === _id);
    if (!item) {
      throw new NotFoundError(`Entity not found using ID ${_id}`);
    }

    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends EntityAbstract, Filter>
  extends InMemoryRepository<E, Filter>
  implements SearchableRepositoryInterface<E, Filter>
{
  async search(props: SearchParams<Filter>): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);

    const itemsPaginated = await this.applyPaginate(
      itemsFiltered,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
    });
  }
  

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null
  ): Promise<E[]>;

  protected async applyPaginate(
    items: E[],
    page: SearchParams<Filter>["page"],
    per_page: SearchParams<Filter>["per_page"]
  ): Promise<E[]> {
    const start = (page - 1) * per_page; // 1 * 15 = 15
    const limit = start + per_page; // 15 + 15 = 30
    return items.slice(start, limit);
  }
}
