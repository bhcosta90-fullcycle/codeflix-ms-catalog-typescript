import { CategorySequelizeRepository } from "./../category-sequelize.repository";
import { CategorySequelize, CategoryMapper } from "../category.model";
import { Category } from "@ca/core/category/domain/entity/category.entity";
import { NotFoundError } from "@ca/shared/errors/not-found.error";
import { UniqueEntityId } from "@ca/shared/domain/value-object/unique-entity-id.vo";
import { setupSequelize } from "@ca/shared/infra/testing/helpers/db";
import _chance from "chance";
import { CategoryRepository } from "@ca/core/category/domain/repository/category.repository";
const chance = _chance();

describe("CategorySequelizeRepository Feature Test", () => {
  setupSequelize({ models: [CategorySequelize.CategoryModel] });

  let repository: CategorySequelizeRepository;

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(
      CategorySequelize.CategoryModel
    );
  });

  test("should a execute action a insert", async () => {
    let category = new Category({ name: "testing" });
    await repository.insert(category);
    let model = await CategorySequelize.CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: "testing",
      description: "some description",
      is_active: false,
    });
    await repository.insert(category);
    model = await CategorySequelize.CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());
  });

  describe("should a execute action a find by id", () => {
    test("error", async () => {
      await expect(repository.findById("fake-id")).rejects.toThrow(
        new NotFoundError("Entity not found using id fake-id")
      );

      await expect(
        repository.findById(
          new UniqueEntityId("edd89498-aefc-4de0-99a3-ad17e58aa8cb")
        )
      ).rejects.toThrow(
        new NotFoundError(
          "Entity not found using id edd89498-aefc-4de0-99a3-ad17e58aa8cb"
        )
      );
    });

    test("success", async () => {
      const entity = new Category({ name: "testing" });
      await repository.insert(entity);
      let entityFound = await repository.findById(entity.id);
      expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());

      entityFound = await repository.findById(entity["_id"]);
      expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  });

  describe("should a execute action a update", () => {
    test("error", async () => {
      const entity = new Category({ name: "Movie" });
      await expect(repository.update(entity)).rejects.toThrow(
        new NotFoundError(`Entity not found using id ${entity.id}`)
      );
    });

    test("success", async () => {
      const entity = new Category({ name: "Movie" });
      await repository.insert(entity);

      entity.update({ name: "Movie updated", description: entity.description });
      await repository.update(entity);

      let entityFound = await repository.findById(entity.id);
      expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  });

  describe("should a execute action a delete", () => {
    test("error", async () => {
      await expect(repository.delete("fake id")).rejects.toThrow(
        new NotFoundError("Entity not found using id fake id")
      );

      await expect(
        repository.delete(
          new UniqueEntityId("9366b7dc-2d71-4799-b91c-c64adb205104")
        )
      ).rejects.toThrow(
        new NotFoundError(
          `Entity not found using id 9366b7dc-2d71-4799-b91c-c64adb205104`
        )
      );
    });

    it("success", async () => {
      const entity = new Category({ name: "Movie" });
      await repository.insert(entity);

      await repository.delete(entity.id);
      const entityFound = await CategorySequelize.CategoryModel.findByPk(
        entity.id
      );

      expect(entityFound).toBeNull();
    });
  });

  it("should return all categories", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  describe("search method tests", () => {
    it("should only apply paginate when other params are null", async () => {
      const created_at = new Date();
      await CategorySequelize.CategoryModel.factory()
        .count(16)
        .bulkCreate(() => ({
          id: chance.guid({ version: 4 }),
          name: "Movie",
          description: null,
          is_active: true,
          created_at: created_at,
        }));
      const spyToEntity = jest.spyOn(CategoryMapper, "toEntity");

      const searchOutput = await repository.search(
        new CategoryRepository.SearchParams({})
      );
      expect(searchOutput).toBeInstanceOf(CategoryRepository.SearchResult);
      expect(spyToEntity).toHaveBeenCalledTimes(15);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      });
      searchOutput.items.forEach((item) => {
        expect(item).toBeInstanceOf(Category);
        expect(item.id).toBeDefined();
      });
      const items = searchOutput.items.map((item) => item.toJSON());
      expect(items).toMatchObject(
        new Array(15).fill({
          name: "Movie",
          description: null,
          is_active: true,
          created_at: created_at,
        })
      );
    });

    it("should order by created_at DESC when search params are null", async () => {
      const created_at = new Date();
      await CategorySequelize.CategoryModel.factory()
        .count(16)
        .bulkCreate((index) => ({
          id: chance.guid({ version: 4 }),
          name: `Movie${index}`,
          description: null,
          is_active: true,
          created_at: new Date(created_at.getTime() + 100 + index),
        }));
      const searchOutput = await repository.search(
        new CategoryRepository.SearchParams({})
      );
      const items = searchOutput.items;
      [...items].reverse().forEach((item, index) => {
        expect(`${item.name}${index + 1}`);
      });
    });

    it("should apply paginate and filter", async () => {
      const defaultProps = {
        description: null,
        is_active: true,
        created_at: new Date(),
      };

      const categoriesProp = [
        { id: chance.guid({ version: 4 }), name: "test", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "a", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "TEST", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "TeSt", ...defaultProps },
      ];
      const categories = await CategorySequelize.CategoryModel.bulkCreate(
        categoriesProp
      );

      let searchOutput = await repository.search(
        new CategoryRepository.SearchParams({
          page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new CategoryRepository.SearchResult({
          items: [
            CategoryMapper.toEntity(categories[0]),
            CategoryMapper.toEntity(categories[2]),
          ],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "TEST",
        }).toJSON(true)
      );

      searchOutput = await repository.search(
        new CategoryRepository.SearchParams({
          page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new CategoryRepository.SearchResult({
          items: [CategoryMapper.toEntity(categories[3])],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "TEST",
        }).toJSON(true)
      );
    });

    it("should apply paginate and sort", async () => {
      expect(repository.sortableFields).toStrictEqual(["name", "created_at"]);
      const defaultProps = {
        description: null,
        is_active: true,
        created_at: new Date(),
      };

      const categoriesProp = [
        { id: chance.guid({ version: 4 }), name: "testing b", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "testing a", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "testing d", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "testing e", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "testing c", ...defaultProps },
      ];
      const categories = await CategorySequelize.CategoryModel.bulkCreate(
        categoriesProp
      );

      const arrange = [
        {
          params: new CategoryRepository.SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
          }),
          result: new CategoryRepository.SearchResult({
            items: [
              CategoryMapper.toEntity(categories[1]),
              CategoryMapper.toEntity(categories[0]),
            ],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null,
          }),
        },
        {
          params: new CategoryRepository.SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
          }),
          result: new CategoryRepository.SearchResult({
            items: [
              CategoryMapper.toEntity(categories[4]),
              CategoryMapper.toEntity(categories[2]),
            ],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null,
          }),
        },
        {
          params: new CategoryRepository.SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new CategoryRepository.SearchResult({
            items: [
              CategoryMapper.toEntity(categories[3]),
              CategoryMapper.toEntity(categories[2]),
            ],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null,
          }),
        },
        {
          params: new CategoryRepository.SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
          }),
          result: new CategoryRepository.SearchResult({
            items: [
              CategoryMapper.toEntity(categories[4]),
              CategoryMapper.toEntity(categories[0]),
            ],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null,
          }),
        },
      ];

      for (const i of arrange) {
        let result = await repository.search(i.params);
        expect(result.toJSON(true)).toMatchObject(i.result.toJSON(true));
      }
    });

    describe("should search using filter, sort and paginate", () => {
      const defaultProps = {
        description: null,
        is_active: true,
        created_at: new Date(),
      };
      const categoriesProps = [
        { id: chance.guid({ version: 4 }), name: "test", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "a", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "TEST", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "e", ...defaultProps },
        { id: chance.guid({ version: 4 }), name: "TeSt", ...defaultProps },
      ];
      let arrange = [
        {
          search_params: new CategoryRepository.SearchParams({
            page: 1,
            per_page: 2,
            sort: "name",
            filter: "TEST",
          }),
          search_result: new CategoryRepository.SearchResult({
            items: [
              new Category(categoriesProps[2]),
              new Category(categoriesProps[4]),
            ],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST",
          }),
        },
        {
          search_params: new CategoryRepository.SearchParams({
            page: 2,
            per_page: 2,
            sort: "name",
            filter: "TEST",
          }),
          search_result: new CategoryRepository.SearchResult({
            items: [new Category(categoriesProps[0])],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST",
          }),
        },
      ];

      beforeEach(async () => {
        await CategorySequelize.CategoryModel.bulkCreate(categoriesProps);
      });

      test.each(arrange)(
        "when value is $search_params",
        async ({ search_params, search_result }) => {
          let result = await repository.search(search_params);
          expect(result.toJSON(true)).toMatchObject(search_result.toJSON(true));
        }
      );
    });
  });
});
