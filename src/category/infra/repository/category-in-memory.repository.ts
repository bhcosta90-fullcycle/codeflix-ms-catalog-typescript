import { CategoryRepository } from './../../domain/repository/category.repository';
import { Category } from "../../domain/entity/category.entity";
import { InMemorySearchableRepository } from "./../../../@shared/domain/repository/in-memory.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {
  //
}
