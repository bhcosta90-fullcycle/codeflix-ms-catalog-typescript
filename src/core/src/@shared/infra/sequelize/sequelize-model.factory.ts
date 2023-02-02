export class SequelizeModelFactory {
  constructor(protected model, protected factoryProps: () => any) {}

  async create(data?: object) {
    return await this.model.create({ ...this.factoryProps(), ...data });
  }

  make() {}

  async buildCreate() {}

  buildMake() {}
}
