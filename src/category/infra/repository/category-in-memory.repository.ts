import { CategoryRepository } from "./../../domain/repository/category.repository";
import { Category } from "../../domain/entity/category.entity";
import { InMemorySearchableRepository } from "./../../../@shared/domain/repository/in-memory.repository";
import { SortDirection } from "../../../@shared/domain/repository/repository.interface";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  protected async applyFilter(
    items: Category[],
    filter: string
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}
