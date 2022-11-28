import { UniqueId } from './../vo/unique-id.vo'
import { NotFoundError } from "../../errors/not-found.error";
import { EntityAbstract } from "../../domains/entity/entity.abstract";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends EntityAbstract<StubEntityProps> {
  update(props: StubEntityProps) {
    throw new Error("Method not implemented. " + JSON.stringify(props));
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

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
      repository.findById(
        new UniqueId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
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
      repository.delete(
        new UniqueId("9366b7dc-2d71-4799-b91c-c64adb205104")
      )
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
