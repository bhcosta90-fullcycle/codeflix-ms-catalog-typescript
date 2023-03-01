import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';
import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';

import { CategoriesModule } from './../../categories.module';
import { DatabaseModule } from './../../../database/database.module';
import { ConfigModule } from './../../../config/config.module';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../categories.controller';
import { CategoryRepository } from '@ca/core/category/domain/repository/category.repository';
import { CATEGORY_PROVIDERS } from '../../categories.provider';

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;
  let repository: CategoryRepository.Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createCategoryUseCase']).toBeInstanceOf(
      CreateCategoryUseCase.UseCase,
    );

    expect(controller['updateCategoryUseCase']).toBeInstanceOf(
      UpdateCategoryUseCase.UseCase,
    );

    expect(controller['getCategoryUseCase']).toBeInstanceOf(
      GetCategoryUseCase.UseCase,
    );

    expect(controller['deleteCategoryUseCase']).toBeInstanceOf(
      DeleteCategoryUseCase.UseCase,
    );

    expect(controller['listCategoriesUseCase']).toBeInstanceOf(
      ListCategoriesUseCase.UseCase,
    );
  });

  it('should create a category', async () => {
    const output = await controller.create({
      name: 'test',
    });

    const entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });
  });

  describe('should create a category', () => {
    const arrange = [
      {
        request: {
          name: 'Movie',
        },
        expectedPresenter: {
          name: 'Movie',
          description: null,
          is_active: true,
        },
      },
      {
        request: {
          name: 'Movie',
          description: null,
        },
        expectedPresenter: {
          name: 'Movie',
          description: null,
          is_active: true,
        },
      },
      {
        request: {
          name: 'Movie',
          is_active: true,
        },
        expectedPresenter: {
          name: 'Movie',
          description: null,
          is_active: true,
        },
      },
    ];

    test.each(arrange)(
      'with request $request',
      async ({ request, expectedPresenter }) => {
        const presenter = await controller.create(request);
        const entity = await repository.findById(presenter.id);

        expect(entity).toMatchObject({
          id: presenter.id,
          name: expectedPresenter.name,
          description: expectedPresenter.description,
          is_active: expectedPresenter.is_active,
          created_at: presenter.created_at,
        });

        expect(presenter.id).toBe(entity.id);
        expect(presenter.name).toBe(expectedPresenter.name);
        expect(presenter.description).toBe(expectedPresenter.description);
        expect(presenter.is_active).toBe(expectedPresenter.is_active);
        expect(presenter.created_at).toStrictEqual(entity.created_at);
      },
    );
  });
});
