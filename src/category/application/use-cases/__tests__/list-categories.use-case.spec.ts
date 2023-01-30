import { NotFoundError } from "../../../../@shared/errors/not-found.error";
import { Category } from "../../../domain/entity/category.entity";
import { CategoryRepository } from "../../../domain/repository/category.repository";
import { CategoryInMemoryRepository } from "../../../infra/db/repository/category-in-memory.repository";import { ListCategoriesUseCase } from "../list-categories.use-case";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(repository as any);
  });

  test("toOutput method", () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: "",
      sort_dir: "",
      filter: null,
    });
    let output = useCase["toOutput"](result as any);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new Category({ name: "Movie" });
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: "",
      sort_dir: "",
      filter: null,
    });

    output = useCase["toOutput"](result as any);
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
      new Category({ name: "test 1" }),
      new Category({
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
      new Category({ name: "a testing" }),
      new Category({
        name: "AAA",
      }),
      new Category({
        name: "AaA testing",
      }),
      new Category({
        name: "b testing",
      }),
      new Category({
        name: "c testing",
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      filter: "a"
    });

    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
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
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });
  });
});
