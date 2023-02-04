import { setupSequelize } from "./db";

describe("DB Unit Test", () => {
  const db = setupSequelize({});

  it("verify return of db", () => {
    expect(db.sequelize).not.toBeNull();
  })
})