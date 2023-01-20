import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Inject(CreateCategoryUseCase.UseCase)
  protected createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  protected listUseCase: ListCategoriesUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  protected getUseCase: GetCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  protected deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  protected updateUseCase: UpdateCategoryUseCase.UseCase;

  @Post()
  create(@Body() createCategoryDto) {
    return this.createUseCase.execute({
      name: 'test',
    });
  }

  @Get()
  findAll() {
    return this.listUseCase.execute({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto) {
    return this.updateUseCase.execute({
      id: id,
      name: 'test update',
      description: null,
      is_active: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }
}
