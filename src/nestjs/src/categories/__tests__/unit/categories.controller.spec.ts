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

describe('CategoriesController Unit Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
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

  it('xpto', () => {
    console.log(controller);
  });
});
