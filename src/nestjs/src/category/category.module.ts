import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import { CategoryInMemoryRepository } from '@ca/core/category/infra/repository/category-in-memory.repository';
import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from '@ca/core/category/domain/repository/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new CreateCategoryUseCase.UseCase(repository),
      inject: ['CategoryRepository'],
    },
    {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new ListCategoriesUseCase.UseCase(repository),
      inject: ['CategoryRepository'],
    },
    {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new UpdateCategoryUseCase.UseCase(repository),
      inject: ['CategoryRepository'],
    },
    {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new DeleteCategoryUseCase.UseCase(repository),
      inject: ['CategoryRepository'],
    },
    {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new GetCategoryUseCase.UseCase(repository),
      inject: ['CategoryRepository'],
    },
  ],
})
export class CategoryModule {}
