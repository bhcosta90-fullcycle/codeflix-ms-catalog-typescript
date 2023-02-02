import { CategoryModel } from "./category.model";
import { UniqueEntityId } from "@ca/core/@shared/domain/value-object/unique-entity-id.vo";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { CategoryRepository } from "@ca/core/category/domain/repository/category.repository";
import { CategoryMapper } from "./category.mapper";
import { NotFoundError } from "@ca/core/@shared/errors/not-found.error";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  constructor(protected categoryModel: typeof CategoryModel) {}

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return CategoryMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }

  async update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  protected async _get(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity not found using id ${id}`),
    });
  }
}
