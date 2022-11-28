import { RepositoryInterface } from "../../../@shared/domains/repository/@interface/repository.interface";
import { CategoryEntity } from "../entity/category.entity";

export interface CategoryRepository
  extends RepositoryInterface<CategoryEntity> {}
