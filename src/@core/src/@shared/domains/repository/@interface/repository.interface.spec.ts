import { Params, SearchParams } from "./repository.interface";

describe("RepositoryInterface Unit Test", () => {
  describe("page prop", () => {
    type TypeData = { page: any; expect: number };

    it("without params", () => {
      const params = new SearchParams({});
      expect(params.page).toBe(1);
    })

    const arranges = [
      {
        page: null,
        expect: 1,
      },
      {
        page: undefined,
        expect: 1,
      },
      {
        page: "",
        expect: 1,
      },
      {
        page: "fake",
        expect: 1,
      },
      {
        page: 0,
        expect: 1,
      },
      {
        page: -1,
        expect: 1,
      },
      {
        page: 5.5,
        expect: 1,
      },
      {
        page: true,
        expect: 1,
      },
      {
        page: false,
        expect: 1,
      },
      {
        page: 2,
        expect: 2,
      },
      {
        page: 3,
        expect: 3,
      },
    ];

    test.each(arranges)("validate %o", (i: TypeData) => {
      expect(new SearchParams({ page: i.page as any }).page).toBe(i.expect);
    });
  });

  describe("per_page prop", () => {
    type TypeData = { per_page: any; expect: number };

    it("without params", () => {
      const params = new SearchParams({});
      expect(params.per_page).toBe(15);
    });

    const arranges = [
      {
        per_page: null,
        expect: 15,
      },
      {
        per_page: undefined,
        expect: 15,
      },
      {
        per_page: "",
        expect: 15,
      },
      {
        per_page: "fake",
        expect: 15,
      },
      {
        per_page: 0,
        expect: 15,
      },
      {
        per_page: -1,
        expect: 15,
      },
      {
        per_page: 5.5,
        expect: 15,
      },
      {
        per_page: true,
        expect: 15,
      },
      {
        per_page: false,
        expect: 15,
      },
      {
        per_page: 2,
        expect: 2,
      },
      {
        per_page: 3,
        expect: 3,
      },
    ];

    test.each(arranges)("validate %o", (i: TypeData) => {
      expect(new SearchParams({ per_page: i.per_page as any }).per_page).toBe(i.expect);
    });
  });

  describe("filter prop", () => {
    type TypeData = { filter: any; expect: number };

    describe("Search Params", () => {
      it("without params", () => {
        let params = new SearchParams({});
        expect(params.filter).toBe(undefined);

        params = new SearchParams({ filter: null });
        expect(params.filter).toBe(null);

        params = new SearchParams({ filter: { name: "test" } });
        expect(params.filter).toStrictEqual({ name: "test" });
      });

      const arranges = [
        {
          filter: null,
          expect: null,
        },
        {
          filter: {},
          expect: {},
        },
      ];

      test.each(arranges)("validate %o", (i: TypeData) => {
        expect(
          new SearchParams({ filter: i.filter as any }).filter
        ).toStrictEqual(i.expect);
      });
    });

    describe("Params", () => {
      it("without params", () => {
        let params = new Params({});
        expect(params.filter).toBe(undefined);

        params = new Params({ filter: null });
        expect(params.filter).toBe(null);

        params = new Params({ filter: { name: "test" } });
        expect(params.filter).toStrictEqual({ name: "test" });
      });

      const arranges = [
        {
          filter: null,
          expect: null,
        },
        {
          filter: {},
          expect: {},
        },
      ];

      test.each(arranges)("validate %o", (i: TypeData) => {
        expect(new Params({ filter: i.filter as any }).filter).toStrictEqual(
          i.expect
        );
      });
    });
  });
});
