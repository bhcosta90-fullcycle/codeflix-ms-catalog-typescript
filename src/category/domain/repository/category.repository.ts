import { Category } from "../entity/category.entity";
import { SearchableRepositoryInterface } from "./../../../@shared/domain/repository/repository.interface";
export interface CategoryRepository extends SearchableRepositoryInterface<Category, any, any> {}
