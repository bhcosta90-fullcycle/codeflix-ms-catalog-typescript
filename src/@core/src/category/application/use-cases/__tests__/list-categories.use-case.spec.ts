import { CategoryEntity } from './../../../domain/entity/category.entity';
import { CategoryRepository } from '../../../../category/domain/repository/category.repository';
import { CategoryInMemoryRepository } from './../../../infra/repository/category-in-memory.repository';
import { ListCategoriesUseCase } from "../list-categories.use-case";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  test("toOutput method", () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
    });
    let output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new CategoryEntity({ name: "Movie" });
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
    });

    output = useCase["toOutput"](result);
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it("should returns output using empty input with categories ordered by created_at", async () => {
    const items = [
      new CategoryEntity({ name: "test 1" }),
      new CategoryEntity({
        name: "test 2",
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const items = [
      new CategoryEntity({ name: "a" }),
      new CategoryEntity({
        name: "AAA",
      }),
      new CategoryEntity({
        name: "AaA",
      }),
      new CategoryEntity({
        name: "b",
      }),
      new CategoryEntity({
        name: "c",
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      filter: "a",
    });

    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[1].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[2].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[1].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
