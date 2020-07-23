import "reflect-metadata";
import { createConnection } from "typeorm";

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

export function proceedDetails(data: ComicReleaseData[]) {
  return data.map(([id, { detail }]) => ({
    id,
    ...detail,
    platform: getPlatformEnum(detail.platform),
  }));
}

export function extractRelease(data: ComicReleaseData[]) {
  return data.map(([id, { date }]) => ({
    comic: { id },
    date,
  }));
}

export async function sendDB(data: ComicReleaseData[]): Promise<void> {
  const details = proceedDetails(data);
  const releases = extractRelease(data);

  const connection = await createConnection();

  await connection
    .createQueryBuilder()
    .insert()
    .into(Comic)
    .values(details)
    .orUpdate({
      conflict_target: ["id"],
      overwrite: ["title", "link", "platform"],
    })
    .execute();

  await connection
    .createQueryBuilder()
    .insert()
    .into(Release)
    .values(releases)
    .orIgnore(true)
    .execute();

  await connection.close();
}
