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
    await Promise.all(
      connection.entityMetadatas.map(
        (entity) => connection.getRepository(entity.name).clear,
      ),
    );
  });
  afterAll(async () => {
    await getConnection("test").close();
  });
});
