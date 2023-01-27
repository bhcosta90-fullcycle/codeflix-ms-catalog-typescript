import { EntityValidationError } from "./../../../@shared/errors/entity-validation.error";
import { UniqueEntityId } from "./../../../@shared/domain/value-object/unique-entity-id.vo";
import { AbstractEntityError } from "../../../@shared/errors/abstract-entity.error";
import { Category } from "./category.entity";
import { omit } from "lodash";

describe("Category Unit Test", () => {
  describe("Create", () => {
    describe("exception in the constructor", () => {
      it("field name", () => {
        expect(
          () =>
            new Category({
              name: "mo",
            })
        ).toThrow(EntityValidationError);

        expect(
          () =>
            new Category({
              name: "m".repeat(256),
            })
        ).toThrow(EntityValidationError);
      });

        it("description field", () => {
          expect(
            () =>
              new Category({
                name: "movie",
                description: "so",
              })
          ).toThrow(EntityValidationError);
        });
    });
    it("passed all parameters to the constructor", () => {
      const created_at = new Date();

      const spyValidated = jest.spyOn(Category.prototype, "validate");
      const entity = new Category({
        name: "movie",
        description: "some description",
        is_active: false,
        created_at,
      });

      expect(entity.props).toStrictEqual({
        name: "movie",
        description: "some description",
        is_active: false,
        created_at,
      });
      expect(spyValidated).toBeCalledTimes(1);
    });

    describe("field id", () => {
      const data: any[] = [
        null,
        undefined,
        new UniqueEntityId("df72a9be-1d35-4a86-94a0-e177978b31a2"),
      ];

      test.each(data)("validate %o", (i: any) => {
        const category = new Category({ name: "testing" }, i);
        expect(category.id).not.toBeNull();
      });
    });

    it("passed a minimum parameter to the constructor", () => {
      const entity = new Category({
        name: "movie 2",
      });

      expect(omit(entity.props, "created_at")).toStrictEqual({
        name: "movie 2",
        description: null,
        is_active: true,
      });

      expect(entity.created_at).toBeInstanceOf(Date);
    });

    describe("Getter and setter", () => {
      const created_at = new Date();

      const entity = new Category({
        name: "movie",
        description: "some description",
        is_active: false,
        created_at,
      });

      it("name prop", () => {
        expect(entity.name).toBe("movie");
        entity["name"] = "other movie";
        expect(entity.name).toBe("other movie");
      });

      it("description prop", () => {
        expect(entity.description).toBe("some description");
        entity["description"] = undefined;
        expect(entity.description).toBeNull();
      });

      it("is_active prop", () => {
        expect(entity.is_active).toBeFalsy();
        entity["is_active"] = undefined;
        expect(entity.is_active).toBeTruthy();
      });

      it("created_at prop", () => {
        expect(entity.created_at).toBe(created_at);
      });
    });
  });

  describe("Update", () => {
    let entity: Category;
    let spyValidated: any;

    beforeEach(() => {
      spyValidated = jest.spyOn(Category.prototype, "validate");
      entity = new Category({
        name: "movie",
        description: "some description",
        is_active: false,
      });
    });

    describe("exception in the constructor", () => {
      it("field name", () => {
        expect(() =>
          entity.update({
            name: "mo",
          })
        ).toThrow(EntityValidationError);

        expect(() =>
          entity.update({
            name: "m".repeat(256),
          })
        ).toThrow(EntityValidationError);
      });

      it("description field", () => {
        expect(() =>
          entity.update({
            name: "movie",
            description: "so",
          })
        ).toThrow(EntityValidationError);
      });
    });

    it("a minimum prop", () => {
      expect(spyValidated).toBeCalledTimes(1);
      entity.update({
        name: "movie 2",
      });

      expect(omit(entity.props, "created_at")).toStrictEqual({
        name: "movie 2",
        description: "some description",
        is_active: false,
      });

      expect(spyValidated).toBeCalledTimes(2);
    });

    it("all props value", () => {
      entity.update({
        name: "movie 2",
        description: "some description 2",
      });

      expect(omit(entity.props, "created_at")).toStrictEqual({
        name: "movie 2",
        description: "some description 2",
        is_active: false,
      });
    });

    it("null and undefined description", () => {
      entity.update({
        name: "movie 2",
        description: null,
      });

      expect(omit(entity.props, "created_at")).toStrictEqual({
        name: "movie 2",
        description: null,
        is_active: false,
      });

      entity.update({
        name: "movie 2",
        description: undefined,
      });

      expect(omit(entity.props, "created_at")).toStrictEqual({
        name: "movie 2",
        description: null,
        is_active: false,
      });
    });
  });
});
