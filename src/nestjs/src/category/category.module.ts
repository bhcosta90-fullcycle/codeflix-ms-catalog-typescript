import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import { CategoryInMemoryRepository } from '@ca/core/category/infra/repository/category-in-memory.repository';
import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryProvider } from './category.provider';

@Module({
  controllers: [CategoryController],
  providers: [
    ...Object.values(CategoryProvider.Repository),
    ...Object.values(CategoryProvider.UseCase),
  ],
})
export class CategoryModule {}
