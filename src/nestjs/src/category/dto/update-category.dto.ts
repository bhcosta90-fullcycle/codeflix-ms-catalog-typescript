import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';

export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  name: string;
  description: string | null;
  is_active?: boolean;
}
