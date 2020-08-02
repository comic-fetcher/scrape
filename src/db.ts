import "reflect-metadata";
import { Connection, createConnection, InsertQueryBuilder } from "typeorm";

import { extractComics, extractReleases } from "./database/extract";
import { Comic } from "./typeorm/entities/comic";
import { Release } from "./typeorm/entities/release";
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
  const connection = await createConnection();

  const comics = extractComics(data);
  const releases = extractReleases(data);

  await storeComics(connection, comics);
  await storeReleases(connection, releases);

  await connection.close();
}
