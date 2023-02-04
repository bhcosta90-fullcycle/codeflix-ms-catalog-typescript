import { NotFoundError } from "../../../errors/not-found.error";
import { UniqueEntityId } from "../../value-object/unique-entity-id.vo";
import { Entity } from "../../entity/entity";
import { RepositoryInterface } from "../repository.interface";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {
  constructor(public props: StubEntityProps, id?: UniqueEntityId) {
    super(props, id);
  }

  update(props: StubEntityProps): void {
    this.props.name = props.name;
    this.props.price = props.price;
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Test", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw error when on find id entity is not found", async () => {
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

  it("should find entity by id", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    await repository.insert(entity);
    let entityFound = await repository.findById(entity.id);
    expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity["_id"]);
    expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all entities", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it("should throw error when on update entity is not found", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.id}`)
    );
  });

  it("should update a entity", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    await repository.insert(entity);

    const entityUpdate = new StubEntity({ name: "testing", price: 50 }, entity['_id']);
    await repository.update(entityUpdate);
    expect(entityUpdate.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw error when on delete entity is not found", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    expect(repository.delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.id}`)
    );
  });

  it("should delete a entity", async () => {
    const entity = new StubEntity({ name: "testing", price: 50 });
    await repository.insert(entity);
    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity['_id']);
    expect(repository.items).toHaveLength(0);
  });
});
