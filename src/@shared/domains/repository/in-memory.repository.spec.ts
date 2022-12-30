import { UniqueId } from "./../vo/unique-id.vo";
import { NotFoundError } from "../../errors/not-found.error";
import { EntityAbstract } from "../../domains/entity/entity.abstract";
import {
  InMemoryRepository,
  InMemorySearchableRepository,
} from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

type StubFilter = {
  name: string;
};

class StubEntity extends EntityAbstract<StubEntityProps> {
  update(props: StubEntityProps) {
    throw new Error("Method not implemented. " + JSON.stringify(props));
  }

  get name(): string {
    return this.props.name;
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<
  StubEntity,
  StubFilter
> {
  protected async applyFilter(
    items: StubEntity[],
    filter: StubFilter
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.name.toLowerCase());
    });
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));
  it("should inserts a new entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository["items"][0].toJSON());
  });

  it("should throws error when entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    );

    expect(
      repository.findById(new UniqueId("9366b7dc-2d71-4799-b91c-c64adb205104"))
    ).rejects.toThrow(
      new NotFoundError(
        `Entity not found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });

  it("should finds a entity by id", async () => {
    const spyRepositoryGetId = jest.spyOn(repository, "getItem" as any);
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(spyRepositoryGetId).toHaveBeenCalledTimes(1);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 },
      entity.uniqueId
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(
      repository["items"][0].toJSON()
    );
  });

  it("should throws error on delete when entity not found", () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    );

    expect(
      repository.delete(new UniqueId("9366b7dc-2d71-4799-b91c-c64adb205104"))
    ).rejects.toThrow(
      new NotFoundError(
        `Entity not found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`
      )
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository["items"]).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository["items"]).toHaveLength(0);
  });
});

describe("InMemorySearchableRepository Unit Tests", () => {
  let repository: StubInMemorySearchableRepository;
  beforeEach(() => (repository = new StubInMemorySearchableRepository()));

  it("should inserts a new entity", async () => {
    await repository.insert(new StubEntity({ name: "1 test", price: 5 }));
    await repository.insert(new StubEntity({ name: "2 test", price: 5 }));
    await repository.insert(new StubEntity({ name: "3 test", price: 5 }));
    await repository.insert(new StubEntity({ name: "4 test", price: 5 }));
    const data = await repository.search({
      filter: {
        name: "1 test",
      },
      page: 1,
      per_page: 15,
    });
    expect(data.toJSON().total).toBe(1);
  });
});
