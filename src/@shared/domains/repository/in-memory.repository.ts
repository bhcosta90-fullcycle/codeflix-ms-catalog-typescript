import { NotFoundError } from "./../../errors/not-found.error";
import { EntityAbstract } from "../entity/entity.abstract";
import { UniqueId } from "../vo/unique-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./@interface/repository.interface";

export abstract class InMemoryRepository<E extends EntityAbstract>
  implements RepositoryInterface<E>
{
  private items: E[] = [];

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

export class InMemorySearchableRepository<E extends EntityAbstract, Filter>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, Filter>
{
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
