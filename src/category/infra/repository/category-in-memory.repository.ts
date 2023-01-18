import { CategoryEntity } from "../../domain/entity/category.entity";
import { InMemorySearchableRepository } from "../../../@shared/domains/repository/in-memory.repository";
import { CategoryRepository } from "../../domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<
    CategoryEntity,
    CategoryRepository.Filter
  >
  implements CategoryRepository.Repository
{
  protected async applyFilter(
    items: CategoryEntity[],
    filter: CategoryRepository.Filter
  ): Promise<CategoryEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
