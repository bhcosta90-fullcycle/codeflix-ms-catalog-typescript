import { ValidatorFieldsInterface } from "../../@shared/validator/@interface/validator-fields.interface";
import { CategoryProps } from "category/domain/entity/category.entity";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../../@shared/validator/class-validator-fields";

class CategoryValidator extends ClassValidatorFields<CategoryRules, CategoryProps>{
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
}

class CategoryRules {
  constructor(data: CategoryProps) {
    Object.assign(this, data);
  }
}

export class CategoryValidatorFactory {
  static create(type: 'class-validator' = 'class-validator'): ValidatorFieldsInterface<CategoryRules> {
    switch (type) {
      default: return new CategoryValidator();
    }
  }
}
