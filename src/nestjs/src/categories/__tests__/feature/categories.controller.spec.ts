import { CategoriesController } from '../../categories.controller';

describe('CategoriesController Feature Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
