import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'>
{
  name: string;
  description?: string;
  is_active?: boolean;
}
