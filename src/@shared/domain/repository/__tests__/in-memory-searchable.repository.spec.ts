import { Entity } from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository.interface";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {
  update(props: StubEntityProps): void {
    throw new Error("Method not implemented.");
  }
}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(
      (i) =>
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter
    );
  }
}

describe("InMemorySearchableRepository Unit Test", () => {
  let repository: StubInMemorySearchableRepository;
  beforeEach(() => (repository = new StubInMemorySearchableRepository()));

  describe("applyFilter method", () => {
    it("should no filter items when filter is null", async () => {
      const items = [
        new StubEntity({ name: "testing 1", price: 10 }),
        new StubEntity({ name: "testing 2", price: 15 }),
        new StubEntity({ name: "testing 3", price: 20 }),
        new StubEntity({ name: "testing 4", price: 25 }),
      ];
      const spyFilterMethod = jest.spyOn(items, "filter" as any);

      const response = await repository["applyFilter"](items, null);
      expect(response).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it("should filter using a filter param", async () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];
      const spyFilterMethod = jest.spyOn(items, "filter" as any);

      let response = await repository["applyFilter"](items, "TEST");
      expect(response).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      response = await repository["applyFilter"](items, "5");
      expect(response).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      response = await repository["applyFilter"](items, "no-filter");
      expect(response).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe("applySort method", () => {
    it("should no sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 10 }),
        new StubEntity({ name: "a", price: 15 }),
        new StubEntity({ name: "d", price: 20 }),
        new StubEntity({ name: "c", price: 25 }),
      ];
      let response = await repository["applySort"](items, null, null);
      expect(response).toStrictEqual(items);

      response = await repository["applySort"](items, "price", "asc");
      expect(response).toStrictEqual(items);
    });

    it("should sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 10 }),
        new StubEntity({ name: "a", price: 15 }),
        new StubEntity({ name: "d", price: 20 }),
        new StubEntity({ name: "c", price: 25 }),
      ];
      let response = await repository["applySort"](items, "name", "asc");
      expect(response).toStrictEqual([items[1], items[0], items[3], items[2]]);
    });
  });

  describe("applyPaginate method", () => {
    const items = [
      new StubEntity({ name: "a", price: 15 }),
      new StubEntity({ name: "b", price: 10 }),
      new StubEntity({ name: "c", price: 25 }),
      new StubEntity({ name: "d", price: 20 }),
      new StubEntity({ name: "e", price: 25 }),
    ];

    it("should paginate items", async () => {
      let response = await repository["applyPaginate"](items, 1, 2);
      expect(response).toStrictEqual([items[0], items[1]]);

      response = await repository["applyPaginate"](items, 2, 2);
      expect(response).toStrictEqual([items[2], items[3]]);

      response = await repository["applyPaginate"](items, 3, 2);
      expect(response).toStrictEqual([items[4]]);

      response = await repository["applyPaginate"](items, 4, 2);
      expect(response).toStrictEqual([]);
    });
  });

  describe("search method", () => {
    const entity = new StubEntity({ name: "a", price: 10 });

    it("should apply paginate when other params are null", async () => {
      const items = Array(16).fill(entity);
      repository.items = items;
      const result = await repository.search(new SearchParams({}));
      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          filter: null,
          sort: null,
          sort_dir: null,
        })
      );
    });

    describe("should apply paginate and filter", () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
        new StubEntity({ name: "TeSt", price: 0 }),
      ];
      beforeEach(() => (repository.items = items));

      const arrange = [
        {
          input: new SearchParams({
            filter: "test",
            page: 1,
            per_page: 2,
          }),
          output: new SearchResult({
            items: [items[0], items[1]],
            total: 3,
            current_page: 1,
            per_page: 2,
            filter: "test",
            sort: null,
            sort_dir: null,
          }),
        },
        {
          input: new SearchParams({
            filter: "test",
            page: 2,
            per_page: 2,
          }),
          output: new SearchResult({
            items: [items[3]],
            total: 3,
            current_page: 2,
            per_page: 2,
            filter: "test",
            sort: null,
            sort_dir: null,
          }),
        },
      ];

      test.each(arrange)("validate %o", async (i: any) => {
        const result = await repository.search(i.input);
        expect(result).toStrictEqual(i.output);
      });
    });

    describe("should apply paginate and sort asc", () => {
      const items = [
        new StubEntity({ name: "b", price: 10 }),
        new StubEntity({ name: "a", price: 15 }),
        new StubEntity({ name: "d", price: 20 }),
        new StubEntity({ name: "c", price: 25 }),
        new StubEntity({ name: "e", price: 30 }),
      ];
      beforeEach(() => (repository.items = items));

      const arrange = [
        {
          input: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
          }),
          output: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          input: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          output: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "asc",
          }),
        },
        {
          input: new SearchParams({
            page: 3,
            per_page: 2,
            sort: "name",
          }),
          output: new SearchResult({
            items: [items[4]],
            total: 5,
            current_page: 3,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "asc",
          }),
        },
      ];

      test.each(arrange)("validate %o", async (i: any) => {
        const result = await repository.search(i.input);
        expect(result).toStrictEqual(i.output);
      });
    });

    describe("should apply paginate and sort desc", () => {
      const items = [
        new StubEntity({ name: "b", price: 10 }), // 0
        new StubEntity({ name: "a", price: 15 }), // 1
        new StubEntity({ name: "d", price: 20 }), // 2
        new StubEntity({ name: "c", price: 25 }), // 3
        new StubEntity({ name: "e", price: 30 }), // 4
        new StubEntity({ name: "e", price: 35 }), // 5
        new StubEntity({ name: "f", price: 40 }), // 6
      ];
      beforeEach(() => (repository.items = items));

      const arrange = [
        {
          input: new SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          output: new SearchResult({
            items: [items[6], items[4]],
            total: 7,
            current_page: 1,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "desc",
          }),
        },
        {
          input: new SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          output: new SearchResult({
            items: [items[5], items[2]],
            total: 7,
            current_page: 2,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "desc",
          }),
        },
        {
          input: new SearchParams({
            page: 3,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          output: new SearchResult({
            items: [items[3], items[0]],
            total: 7,
            current_page: 3,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "desc",
          }),
        },
        {
          input: new SearchParams({
            page: 4,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          output: new SearchResult({
            items: [items[1]],
            total: 7,
            current_page: 4,
            per_page: 2,
            filter: null,
            sort: "name",
            sort_dir: "desc",
          }),
        },
      ];

      test.each(arrange)("validate %o", async (i: any) => {
        const result = await repository.search(i.input);
        expect(result).toStrictEqual(i.output);
      });
    });
  });
});
