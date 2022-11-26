import { CategoryProps } from "../domain/entity/category.entity";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ClassValidatorFields } from "../../@shared/validator/class-validator-fields";

export class CategoryRules {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ name, description, is_active, created_at }: CategoryProps) {
    Object.assign(this, { name, description, is_active, created_at });
  }
}

export class CategoryRulesClassValidator extends ClassValidatorFields<
  CategoryRules,
  CategoryProps
> {
  validate(data: CategoryProps): boolean {
    return super.validate(new CategoryRules(data));
  }
}

export class CategoryValidatorFactory {
  static create(
    type: "class-validator" = "class-validator"
  ): ClassValidatorFields<CategoryRules, CategoryProps> {
    switch (type) {
      default:
        return new CategoryRulesClassValidator();
    }
  }
}
