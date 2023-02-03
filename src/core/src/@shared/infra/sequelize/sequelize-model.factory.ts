export class SequelizeModelFactory {
  #count: number = 1;

  constructor(protected model, protected defaultFactoryProps: () => any) {}

  count(count: number): this {
    this.#count = count;
    return this;
  }

  async create(data?: object) {
    return await this.model.create({ ...this.defaultFactoryProps(), ...data });
  }

  make(data?: object): any {
    return this.model.build({ ...this.defaultFactoryProps(), ...data });
  }

  async bulkCreate(factoryProps?: (index: number) => any) {
    const data = new Array(this.#count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index))
      .map((data) => ({
        ...this.defaultFactoryProps(),
        ...data,
      }));
    
    return this.model.bulkCreate(data);
  }

  bulkMake(factoryProps?: (index: number) => any) {
    const data = new Array(this.#count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index))
      .map((data) => ({
        ...this.defaultFactoryProps(),
        ...data,
      }));
    return this.model.bulkBuild(data);
  }
}
