import { UniqueEntityId } from "../value-object/unique-entity-id.vo";
import { Entity } from "../entity/entity";

export interface RepositoryInterface<E extends Entity<any>> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export class SearchParams {

}

export interface SearchableRepositoryInterface<
  E extends Entity<any>,
  SearchInput,
  SearchOutput
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
