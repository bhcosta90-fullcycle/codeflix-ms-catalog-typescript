import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  name: string;
  description?: string;
  is_active?: boolean;
}
