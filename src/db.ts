import "reflect-metadata";
import { Connection, createConnection, InsertQueryBuilder } from "typeorm";

import { extractComics, extractReleases } from "./database/extract";
import entities, { Comic, Release } from "./typeorm/entities";
import { ComicReleaseData } from "./types";

export async function storeComics(
  connection: Connection,
  comics: Parameters<InsertQueryBuilder<Comic>["values"]>[0],
): Promise<void> {
  await connection
    .createQueryBuilder()
    .insert()
    .into(Comic)
    .orUpdate({
      conflict_target: ["id"],
      overwrite: ["title", "link", "platform"],
    })
    .values(comics)
    .execute();
}

export async function storeReleases(
  connection: Connection,
  releases: Parameters<InsertQueryBuilder<Release>["values"]>[0],
): Promise<void> {
  await connection
    .createQueryBuilder()
    .insert()
    .into(Release)
    .orIgnore(true)
    .values(releases)
    .execute();
}

export async function sendDB(data: ComicReleaseData[]): Promise<void> {
  const connection = await createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities,
  });

  const comics = extractComics(data);
  const releases = extractReleases(data);

  await storeComics(connection, comics);
  await storeReleases(connection, releases);

  await connection.close();
}
