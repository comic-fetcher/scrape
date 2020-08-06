import { createConnection, getConnection } from "typeorm";

import entities, { Comic, Release } from "../typeorm/entities";

import { comicwalkerComicFactory } from "./factories/comic.factory";
import { releaseFactory } from "./factories/release.factory";
import { storeComics, storeReleases } from "./store";

describe("データベースでの実際の挙動の確認", () => {
  beforeAll(async () => {
    await createConnection({
      name: "test",
      type: "postgres",
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
    const comics = comicwalkerComicFactory.buildList(10);
    await storeComics(connection, comics);

    expect(await repo.count()).toBe(10);
  });

  test("重複10個で，30個のマンガを登録する", async () => {
    const connection = getConnection("test");

    const repo = connection.getRepository(Comic);
    const comics1 = comicwalkerComicFactory.buildList(10);
    await storeComics(connection, comics1);

    comicwalkerComicFactory.resetSequenceNumber();
    const comics2 = comicwalkerComicFactory.buildList(30);
    await storeComics(connection, comics2);

    expect(await repo.count()).toBe(30);
  });

  test("マンガリリースを1件登録する", async () => {
    const connection = getConnection("test");

    const comicRepo = connection.getRepository(Comic);
    const releaseRepo = connection.getRepository(Release);

    const comic = comicwalkerComicFactory.build();
    await comicRepo.save(comic);

    await storeReleases(connection, [
      releaseFactory(comic, new Date(2020, 0, 1)),
    ]);
    expect(await releaseRepo.count()).toBe(1);
  });

  test("別の日付のマンガリリースを2件登録する", async () => {
    const connection = getConnection("test");

    const comicRepo = connection.getRepository(Comic);
    const releaseRepo = connection.getRepository(Release);

    const comic = comicwalkerComicFactory.build();
    await comicRepo.save(comic);

    await storeReleases(connection, [
      releaseFactory(comic, new Date(2020, 0, 1)),
      releaseFactory(comic, new Date(2020, 0, 2)),
    ]);
    expect(await releaseRepo.count()).toBe(2);
  });

  test("同じ日付のマンガリリースを2件登録して，1件だけ残る", async () => {
    const connection = getConnection("test");

    const comicRepo = connection.getRepository(Comic);
    const releaseRepo = connection.getRepository(Release);

    const comic = comicwalkerComicFactory.build();
    await comicRepo.save(comic);

    await storeReleases(connection, [
      releaseFactory(comic, new Date(2020, 0, 1)),
      releaseFactory(comic, new Date(2020, 0, 1)),
    ]);
    expect(await releaseRepo.count()).toBe(1);
  });
});
