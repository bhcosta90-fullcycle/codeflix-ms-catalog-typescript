import { CreateCategoryDto } from './dto/create-category.dto';
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
  Put,
  Param,
  Delete,
  Inject,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';

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
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }

  @Get()
  search(@Query() body: SearchCategoryDto) {
    return this.listUseCase.execute(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }
}
