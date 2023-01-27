import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import { CategoryRepository } from '@ca/core/category/domain/repository/category.repository';
import { CategoryInMemoryRepository } from '@ca/core/category/infra/db/repository/category-in-memory.repository';

export namespace CategoryProvider {
  export namespace Repository {
    export const MEMORY = {
      provide: 'CategoryRepository',
      useClass: CategoryInMemoryRepository,
    };
  }

  export namespace UseCase {
    export const CREATE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new CreateCategoryUseCase.UseCase(repository),
      inject: [Repository.MEMORY.provide],
    };

    export const UPDATE = {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new UpdateCategoryUseCase.UseCase(repository),
      inject: [Repository.MEMORY.provide],
    };

    export const LIST = {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new ListCategoriesUseCase.UseCase(repository),
      inject: [Repository.MEMORY.provide],
    };

    export const GET = {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new GetCategoryUseCase.UseCase(repository),
      inject: [Repository.MEMORY.provide],
    };

    export const DELETE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (repository: CategoryRepository.Repository) =>
        new DeleteCategoryUseCase.UseCase(repository),
      inject: [Repository.MEMORY.provide],
    };
  }
}
