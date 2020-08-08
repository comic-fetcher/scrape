import { Connection, InsertQueryBuilder } from "typeorm";

import { Comic, Release } from "../typeorm/entities";

export async function storeComics(
  connection: Connection,
  comics: Parameters<InsertQueryBuilder<Comic>["values"]>[0],
): Promise<void> {
  await connection
    .createQueryBuilder()
    .insert()
    .into(Comic)
    .orIgnore(true)
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
