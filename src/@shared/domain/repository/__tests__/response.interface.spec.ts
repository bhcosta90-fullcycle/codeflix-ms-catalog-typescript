import { SearchParams } from "../repository.interface";

describe("SearchParams Unit Tests", () => {
  describe("page prop", () => {
    it("without parameters page prop", () => {
      const params = new SearchParams({});
      expect(params.page).toBe(1);
    });

    const arrange: { input: any; expected: number }[] = [
      { input: null, expected: 1 },
      { input: undefined, expected: 1 },
      { input: "", expected: 1 },
      { input: "fake", expected: 1 },
      { input: 0, expected: 1 },
      { input: -1, expected: 1 },
      { input: 5.5, expected: 1 },
      { input: true, expected: 1 },
      { input: false, expected: 1 },
      { input: {}, expected: 1 },

      { input: 1, expected: 1 },
      { input: 2, expected: 2 },
    ];

    test.each(arrange)("validate %o", (i: any) => {
      const params = new SearchParams({
        page: i.input,
      });
      expect(params.page).toBe(i.expected);
    });
  });

  describe("per_page prop", () => {
    it("without parameters per_page prop", () => {
      const params = new SearchParams({});
      expect(params.per_page).toBe(15);
    });

    const arrange: { input: any; expected: number }[] = [
      { input: null, expected: 15 },
      { input: undefined, expected: 15 },
      { input: "", expected: 15 },
      { input: "fake", expected: 15 },
      { input: 0, expected: 15 },
      { input: -1, expected: 15 },
      { input: 5.5, expected: 15 },
      { input: true, expected: 15 },
      { input: false, expected: 15 },
      { input: {}, expected: 15 },

      { input: 1, expected: 1 },
      { input: 2, expected: 2 },
    ];

    test.each(arrange)("validate %o", (i: any) => {
      const params = new SearchParams({
        per_page: i.input,
      });
      expect(params.per_page).toBe(i.expected);
    });
  });

  describe("sort prop", () => {
    it("without parameters per_page prop", () => {
      const params = new SearchParams({});
      expect(params.sort).toBeNull();
    });

    const arrange: { input: any; expected: number | string }[] = [
      { input: null, expected: null },
      { input: undefined, expected: null },
      { input: "", expected: null },
      { input: 0, expected: "0" },
      { input: -1, expected: "-1" },
      { input: 5.5, expected: "5.5" },
      { input: true, expected: "true" },
      { input: false, expected: "false" },
      { input: {}, expected: "[object Object]" },
      { input: "field", expected: "field" },
    ];

    test.each(arrange)("validate %o", (i: any) => {
      const params = new SearchParams({
        sort: i.input,
      });
      expect(params.sort).toBe(i.expected);
    });
  });

  describe("sort_dir prop", () => {
    it("default props sort dir", () => {
      let params = new SearchParams({});
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: null });
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: undefined });
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: "" });
      expect(params.sort_dir).toBeNull();
    });

    const arrange: { input: any; expected: number | string }[] = [
      { input: null, expected: "asc" },
      { input: undefined, expected: "asc" },
      { input: "", expected: "asc" },
      { input: 0, expected: "asc" },
      { input: "fake", expected: "asc" },

      { input: "asc", expected: "asc" },
      { input: "ASC", expected: "asc" },
      { input: "desc", expected: "desc" },
      { input: "DESC", expected: "desc" },
    ];

    test.each(arrange)("validate %o", (i: any) => {
      const params = new SearchParams({
        sort: "field",
        sort_dir: i.input as any,
      });

      expect(params.sort_dir).toBe(i.expected);
    });
  });

  describe("filter prop", () => {
    it("without parameters per_page prop", () => {
      const params = new SearchParams({});
      expect(params.filter).toBeNull();
    });

    const arrange: { input: any; expected: any }[] = [
      { input: null, expected: null },
      { input: undefined, expected: null },
      { input: "", expected: null },
      { input: 0, expected: 0 },
      { input: { prop1: "123" }, expected: { prop1: "123" } },
      { input: [0, 1], expected: [0, 1] },
    ];

    test.each(arrange)("validate %o", (i: any) => {
      const params = new SearchParams({
        filter: i.input,
      });
      expect(params.filter).toStrictEqual(i.expected);
    });
  });
});
