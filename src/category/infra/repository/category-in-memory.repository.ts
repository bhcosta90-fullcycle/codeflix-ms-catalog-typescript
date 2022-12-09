import { CategoryEntity } from "../../domain/entity/category.entity";
import { InMemorySearchableRepository } from "../../../@shared/domains/repository/in-memory.repository";
import { CategoryRepository } from "../../domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<CategoryEntity, CategoryFilter>
  implements CategoryRepository
{
  protected async applyFilter(
    items: CategoryEntity[],
    filter: CategoryFilter
  ): Promise<CategoryEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.name.toLowerCase());
    });
  }
}

type CategoryFilter = {
  name?: string;
};

const x = new CategoryInMemoryRepository();
x.search({
  page: 1,
  per_page: 1,
  filter: {
    name: "test",
  },
});
