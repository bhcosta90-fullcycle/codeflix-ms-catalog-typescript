import { Injectable } from '@nestjs/common';
import { Category } from '@ca/core/category/domain/entity/category.entity';

@Injectable()
export class AppService {
  getHello(): string {
    const category = new Category({
      name: 'test',
    });
    console.log(category.toJSON());

    return 'Hello World!';
  }
}
