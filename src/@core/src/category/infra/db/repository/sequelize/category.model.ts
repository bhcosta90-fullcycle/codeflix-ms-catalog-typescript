import { CategoryProps } from "@ca/core/category/domain/entity/category.entity";
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

type CategoryModelProd = CategoryProps & {
  id: string;
};

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model<CategoryModelProd> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare is_active: boolean;

  @Column({ allowNull: false, type: DataType.DATE })
  declare created_at: Date;
}
