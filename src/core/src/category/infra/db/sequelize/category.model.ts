import { CategoryType } from "../../../domain/entity/category.entity";
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "@ca/shared/infra/sequelize/sequelize-model.factory";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { UniqueEntityId } from "@ca/shared/domain/value-object/unique-entity-id.vo";
import { EntityValidationError } from "@ca/shared/errors/entity-validation.error";
import { LoadEntityError } from "@ca/shared/errors/load-entity.error";
import { CategoryRepository as DomainCategoryRepository } from '@ca/core/category/domain/repository/category.repository';
import { NotFoundError } from "@ca/shared/errors/not-found.error";
import { Op } from "sequelize";

export namespace CategorySequelize {
  
  export type CategoryModelType = {
    id: string;
  } & CategoryType;

  @Table({ tableName: "categories", timestamps: false })
  export class CategoryModel extends Model<CategoryModelType> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name: string;

    @Column({ allowNull: true, type: DataType.TEXT })
    declare description: string | null;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare is_active: boolean;

    @Column({ allowNull: false, type: DataType.DATE(3) })
    declare created_at: Date;

    static factory() {
      const chance: Chance.Chance = require("chance")();

      return new SequelizeModelFactory<CategoryModel, CategoryModelType>(
        CategoryModel,
        () => ({
          id: chance.guid({ version: 4 }),
          name: chance.word({ length: 15 }),
          description: chance.paragraph(),
          is_active: true,
          created_at: chance.date(),
        })
      );
    }
  }

  export class CategoryRepository
    implements DomainCategoryRepository.Repository
  {
    sortableFields: string[] = ["name", "created_at"];

    constructor(private categoryModel: typeof CategoryModel) {}

    async insert(entity: Category): Promise<void> {
      await this.categoryModel.create(entity.toJSON());
    }

    async findById(id: string | UniqueEntityId): Promise<Category> {
      //DDD Entidade - regras - valida
      const _id = `${id}`;
      const model = await this._get(_id);
      return CategoryMapper.toEntity(model);
    }

    async findAll(): Promise<Category[]> {
      const models = await this.categoryModel.findAll();
      return models.map((m) => CategoryMapper.toEntity(m));
    }

    async update(entity: Category): Promise<void> {
      await this._get(entity.id);
      await this.categoryModel.update(entity.toJSON(), {
        where: { id: entity.id },
      });
    }
    async delete(id: string | UniqueEntityId): Promise<void> {
      const _id = `${id}`;
      await this._get(_id);
      this.categoryModel.destroy({ where: { id: _id } });
    }

    private async _get(id: string): Promise<CategoryModel> {
      return this.categoryModel.findByPk(id, {
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
      });
    }

    async search(
      props: DomainCategoryRepository.SearchParams
    ): Promise<DomainCategoryRepository.SearchResult> {
      const offset = (props.page - 1) * props.per_page;
      const limit = props.per_page;
      const { rows: models, count } = await this.categoryModel.findAndCountAll({
        ...(props.filter && {
          where: { name: { [Op.like]: `%${props.filter}%` } },
        }),
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { order: [[props.sort, props.sort_dir]] }
          : { order: [["created_at", "DESC"]] }),
        offset,
        limit,
      });
      return new DomainCategoryRepository.SearchResult({
        items: models.map((m) => CategoryMapper.toEntity(m)),
        current_page: props.page,
        per_page: props.per_page,
        total: count,
        filter: props.filter,
        sort: props.sort,
        sort_dir: props.sort_dir,
      });
    }
  }
}

export class CategoryMapper {
  static toEntity(model: CategorySequelize.CategoryModel): Category {
    const { id, ...data } = model.toJSON();
    try {
      return new Category(data, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
