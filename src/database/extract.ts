import { ComicReleaseData } from "../types";

import { getPlatformEnum } from "./platform";

export function extractComic([id, { detail }]: ComicReleaseData) {
  return {
    id,
    ...detail,
    platform: getPlatformEnum(detail.platform),
  };
}

export function extractRelease([id, { date }]: ComicReleaseData) {
  return {
    id: `${id}_${date.getTime()}`,
    comic: { id },
    date,
  };
}

export function extractComics(
  data: ComicReleaseData[],
): ReturnType<typeof extractComic>[] {
  return data.map((d) => extractComic(d));
}

export function extractReleases(
  data: ComicReleaseData[],
): ReturnType<typeof extractRelease>[] {
  return data.map((d) => extractRelease(d));
}
