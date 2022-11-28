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

  constructor(data: CategoryProps) {
    Object.assign(this, data);
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
  public static create(): ClassValidatorFields<CategoryRules, CategoryProps> {
    return new CategoryRulesClassValidator();
  }
}
