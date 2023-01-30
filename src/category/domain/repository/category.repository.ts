import { Category } from "../entity/category.entity";
import { SearchableRepositoryInterface } from "./../../../@shared/domain/repository/repository.interface";

export type CategoryFilter = string;

export interface CategoryRepository
  extends SearchableRepositoryInterface<Category, CategoryFilter> {}
