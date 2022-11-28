import {
  CategoryEntity as Entity,
  CategoryProps as EntityProps,
} from "./category.entity";
import { UniqueId } from "../../../@shared/domains/vo/unique-id.vo";

describe("CategoryEntity Unit Test", () => {
  beforeEach(() => Entity['validate'] = jest.fn());

  it("constructor", () => {
    let category = new Entity({
      name: "Test",
    });
    expect(Entity['validate']).toHaveBeenCalledTimes(1);
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

  describe("id field", () => {
    type TypeData = { props: EntityProps; id: UniqueId };

    const list: TypeData[] = [
      { props: { name: "t1" }, id: null },
      { props: { name: "t2" }, id: undefined },
      { props: { name: "t3" }, id: new UniqueId() },
    ];

    test.each(list)("validate %o", (item: TypeData) => {
      const category = new Entity(item.props, item.id);
      expect(category.id).not.toBeNull;
      expect(category.uniqueId).toBeInstanceOf(UniqueId);
    });
  });

  it("should update a entity", () => {
    const category = new Entity({
      name: "Test",
      description: "Test",
      is_active: false,
    });
    category.update({
      name: 'Test 2',
      description: 'Test 3'
    });
    expect(Entity['validate']).toHaveBeenCalledTimes(2);
    expect(category.name).toBe("Test 2");
    expect(category.description).toBe("Test 3");
  })

  it("should active a entity", () => {
    const category = new Entity({
      name: "Test",
      description: "Test",
      is_active: false,
    });
    category.active();
    expect(category.is_active).toBeTruthy();
  });

  it("should deactive a entity", () => {
    const category = new Entity({
      name: "Test",
      description: "Test",
      is_active: true,
    });
    category.deactive();
    expect(category.is_active).toBeFalsy();
  })
});
