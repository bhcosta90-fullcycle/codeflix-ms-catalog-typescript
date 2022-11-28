import { CategoryEntity } from "../../domain/entity/category.entity";
import { InMemorySearchableRepository } from "../../../@shared/domains/repository/in-memory.repository";
import { CategoryRepository } from "../../domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<CategoryEntity, CategoryFilter>
  implements CategoryRepository {}

type CategoryFilter = {
  name: string;
};
