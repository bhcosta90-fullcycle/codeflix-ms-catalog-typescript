import {
  CategoryEntity as Entity,
  CategoryProps as EntityProps,
} from "./category.entity";
import { UniqueId } from "../../../@shared/domains/vo/unique-id.vo";

describe("CategoryEntity Unit Test", () => {
  it("constructor", () => {
    let category = new Entity({
      name: "Test",
    });

    expect(category.name).toBe("Test");
    expect(category.is_active).toBeTruthy();
    expect(category.description).toBeNull();
    expect(category.created_at).toBeInstanceOf(Date);

    category = new Entity({
      name: "Test",
      description: "Test",
      is_active: false,
    });

    expect(category.is_active).toBeFalsy();
    expect(category.description).toBe("Test");

    const created_at = new Date();
    category = new Entity({
      name: "Test",
      created_at,
    });

    expect(category.created_at).toBe(created_at);
  });

  it("id field", () => {
    type TypeData = { props: EntityProps; id: UniqueId };

    const list: TypeData[] = [
      { props: { name: "t" }, id: null },
      { props: { name: "t" }, id: undefined },
      { props: { name: "t" }, id: new UniqueId() },
    ];

    list.map((rs: TypeData) => {
      const category = new Entity(rs.props, rs.id);
      expect(category.id).not.toBeNull;
      expect(category['_uniqueId']).toBeInstanceOf(UniqueId);
    });
  });

  it("should update a entity", () => {
    const category = new Entity({
      name: "Test",
      description: "Test",
      is_active: false,
    });
    category.update("Test 2", "Test 3");
    expect(category.name).toBe("Test 2");
    expect(category.description).toBe("Test 3");
  })

  it("should active a entity", () => {
    const category = new Entity({
      name: "Test",
      description: "Test",
      is_active: false,
    });
    category.enabled();
    expect(category.is_active).toBeTruthy();
  });

  it("should deactive a entity", () => {
    const category = new Entity({
      name: "Test",
      description: "Test",
      is_active: true,
    });
    category.disabled();
    expect(category.is_active).toBeFalsy();
  })
});
