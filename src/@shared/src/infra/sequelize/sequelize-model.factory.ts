import { Model } from "sequelize-typescript";

export class SequelizeModelFactory<ModelClass extends Model, ModelsProps = any> {
  #count: number = 1;

  constructor(protected model, protected defaultFactoryProps: () => any) {}

  count(count: number): this {
    this.#count = count;
    return this;
  }

  async create(data?: ModelsProps): Promise<ModelClass> {
    return await this.model.create({ ...this.defaultFactoryProps(), ...data });
  }

  make(data?: ModelsProps): ModelClass {
    return this.model.build({ ...this.defaultFactoryProps(), ...data });
  }

  async bulkCreate(
    factoryProps?: (index: number) => ModelsProps
  ): Promise<ModelClass[]> {
    const data = new Array(this.#count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => ({
        ...this.defaultFactoryProps(),
        ...factory(index),
      }));

    return this.model.bulkCreate(data);
  }

  bulkMake(factoryProps?: (index: number) => ModelsProps): ModelClass[] {
    const data = new Array(this.#count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => ({
        ...this.defaultFactoryProps(),
        ...factory(index),
      }));

    return this.model.bulkBuild(data);
  }
}
