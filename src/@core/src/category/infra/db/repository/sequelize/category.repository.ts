import { Params } from "@ca/core/@shared/domains/repository/@interface/repository.interface";
import { UniqueId } from "@ca/core/@shared/domains/vo/unique-id.vo";
import { CategoryEntity } from "@ca/core/category/domain/entity/category.entity";
import { CategoryRepository } from "@ca/core/category/domain/repository/category.repository";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  constructor(protected categoryModel: typeof CategoryModel) {}

  search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }
  
  async insert(entity: CategoryEntity): Promise<void> {
    await this.categoryModel.create({
      id: entity.id,
      is_active: entity.is_active,
      description: entity.description,
      name: entity.name,
      created_at: entity.created_at,
    });
  }
  
  findById(id: string | UniqueId): Promise<CategoryEntity> {
    throw new Error("Method not implemented.");
  }
  
  findAll(props: Params<string>): Promise<CategoryEntity[]> {
    throw new Error("Method not implemented.");
  }
  
  update(entity: CategoryEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string | UniqueId): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
