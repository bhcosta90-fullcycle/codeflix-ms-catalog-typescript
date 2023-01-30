import { NotFoundError } from "./../../errors/not-found.error";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
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
  implements SearchableRepositoryInterface<E, any, any> {
  
  search(props: any): Promise<E[]> {
    throw new Error("Method not implemented.");
  }
}
