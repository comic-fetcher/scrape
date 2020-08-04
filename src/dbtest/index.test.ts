import { createConnection, getConnection } from "typeorm";

import { Comic } from "../typeorm/entities/comic";
import { Release } from "../typeorm/entities/release";

describe("test", () => {
  beforeAll(async () => {
    await createConnection({
      name: "test",
      type: "mysql",
      host: "localhost",
      port: 3306,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [Comic, Release],
    });
  });
  afterEach(async () => {
    const connection = getConnection("test");
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of connection.entityMetadatas) {
      const repository = connection.getRepository(entity.name);
      // eslint-disable-next-line no-await-in-loop
      await repository.query(`DELETE FROM comic`);
    }
  });
  afterAll(async () => {
    await getConnection("test").close();
  });
});
