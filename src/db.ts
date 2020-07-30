import "reflect-metadata";
import { Connection, createConnection, InsertQueryBuilder } from "typeorm";

import { Comic, ComicPlatform } from "./typeorm/entities/comic";
import { Release } from "./typeorm/entities/release";
import { ComicReleaseData, RequiredDetail } from "./types";

export function getPlatformEnum(
  platform: RequiredDetail["platform"],
): ComicPlatform {
  switch (platform) {
    case "ComicWalker":
      return ComicPlatform.COMIC_WALKER;
    default:
      throw new Error("Illegal platform");
  }
}

export function extractComic([id, { detail }]: ComicReleaseData) {
  return {
    id,
    ...detail,
    platform: getPlatformEnum(detail.platform),
  };
}

export function extractComics(
  data: ComicReleaseData[],
): ReturnType<typeof extractComic>[] {
  return data.map((d) => extractComic(d));
}

export function extractRelease([id, { date }]: ComicReleaseData) {
  return {
    id: `${id}_${date.getTime()}`,
    comic: { id },
    date,
  };
}

export function extractReleases(
  data: ComicReleaseData[],
): ReturnType<typeof extractRelease>[] {
  return data.map((d) => extractRelease(d));
}

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
