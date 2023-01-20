import { Inject, Injectable } from '@nestjs/common';
import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';

@Injectable()
export class CategoryService {
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

  create(createCategoryDto: CreateCategoryUseCase.Input) {
    return this.createUseCase.execute(createCategoryDto);
  }

  findAll(input: ListCategoriesUseCase.Input) {
    return this.listUseCase.execute({});
  }

  findOne(id: string) {
    return this.getUseCase.execute({ id: id });
  }

  update(updateCategoryDto: UpdateCategoryUseCase.Input) {
    return this.updateUseCase.execute(updateCategoryDto);
  }

  remove(id: string) {
    return this.deleteUseCase.execute({ id: id });
  }
}
