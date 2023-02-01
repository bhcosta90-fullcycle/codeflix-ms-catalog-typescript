import { CategoryType } from "../../../domain/entity/category.entity";
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

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
}
