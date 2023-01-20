import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createUseCase: CreateCategoryUseCase.UseCase,
    private readonly listUseCase: ListCategoriesUseCase.UseCase,
    private readonly categoryService: CategoryService,
  ) {}

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
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto) {
    return this.categoryService.update({
      id: id,
      name: 'test update',
      description: null,
      is_active: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
