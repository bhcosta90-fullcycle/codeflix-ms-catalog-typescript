import { CategoryEntity } from './../../../domain/entity/category.entity';
import { NotFoundError } from './../../../../@shared/errors/not-found.error';
import { CategoryInMemoryRepository } from './../../../infra/repository/category-in-memory.repository';
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity not found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const items = [new CategoryEntity({ name: "test 1" })];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
