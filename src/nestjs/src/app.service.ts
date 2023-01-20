import { CategoryEntity } from '@ca/core/category/domain/entity/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const category = new CategoryEntity({
      name: 'test',
    });
    console.log(category.toJSON());
    return 'Hello World!';
  }
}
