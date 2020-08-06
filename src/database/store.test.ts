import { createConnection, getConnection } from "typeorm";

import { comicFactory } from "../comicwalker/factories/comic.factory";
import entities, { Comic } from "../typeorm/entities";

import { storeComics } from "./store";

describe("データベースでの実際の挙動の確認", () => {
  beforeAll(async () => {
    await createConnection({
      name: "test",
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities,
    });
  });
  afterEach(async () => {
    const connection = getConnection("test");
    await connection.dropDatabase();
    await connection.synchronize();
  });
  afterAll(async () => {
    await getConnection("test").close();
  });

  test("重複なしで，10個のマンガを登録する", async () => {
    const connection = getConnection("test");

    const repo = connection.getRepository(Comic);
    const comics = comicFactory.buildList(10);
    await storeComics(connection, comics);

    expect(await repo.count()).toBe(10);
  });

  test("重複10個で，30個のマンガを登録する", async () => {
    const connection = getConnection("test");

    const repo = connection.getRepository(Comic);
    const comics1 = comicFactory.buildList(10);
    await storeComics(connection, comics1);

    comicFactory.resetSequenceNumber();
    const comics2 = comicFactory.buildList(30);
    await storeComics(connection, comics2);

    expect(await repo.count()).toBe(30);
  });
});
