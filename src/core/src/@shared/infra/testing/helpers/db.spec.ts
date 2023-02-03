import { setupSequelize } from '@ca/core/@shared/infra/testing/helpers/db';
describe("DB Unit Test", () => {
  const db = setupSequelize({});

  it("verify return of db", () => {
    expect(db.sequelize).not.toBeNull();
  })
})