import { CategoryType } from "../../../domain/entity/category.entity";
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "@ca/core/@shared/infra/sequelize/sequelize-model.factory";

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
        name: chance.word({length: 15}),
        description: chance.paragraph(),
        is_active: true,
        created_at: chance.date(),
      })
    );
  }
}
