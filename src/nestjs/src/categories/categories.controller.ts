import { CreateCategoryUseCase } from '@ca/core/category/application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from '@ca/core/category/application/use-cases/delete-category.use-case';
import { GetCategoryUseCase } from '@ca/core/category/application/use-cases/get-category.use-case';
import { ListCategoriesUseCase } from '@ca/core/category/application/use-cases/list-categories.use-case';
import { UpdateCategoryUseCase } from '@ca/core/category/application/use-cases/update-category.use-case';
import {
  Controller,
  Get,
  Post,
  Body,
  Put as Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './presenter/category.presenter';

@Controller('categories')
export class CategoriesController {
  @Inject(CategoriesService)
  protected readonly categoriesService: CategoriesService;

  @Inject(CreateCategoryUseCase.UseCase)
  protected readonly createCategoryUseCase: CreateCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  protected readonly updateCategoryUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  protected readonly getCategoryUseCase: GetCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  protected readonly deleteCategoryUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  protected readonly listCategoriesUseCase: ListCategoriesUseCase.UseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const output = await this.createCategoryUseCase.execute(createCategoryDto);
    return new CategoryPresenter(output);
  }

  @Get()
  async findAll(@Query() searchParams: SearchCategoryDto) {
    const output = await this.listCategoriesUseCase.execute(searchParams);
    return new CategoryCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new CategoryPresenter(await this.getCategoryUseCase.execute({ id }));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const output = await this.updateCategoryUseCase.execute({
      id,
      ...updateCategoryDto,
    });

    return new CategoryPresenter(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteCategoryUseCase.execute({ id });
  }
}
