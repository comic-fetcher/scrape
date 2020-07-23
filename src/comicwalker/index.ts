import { ComicReleaseData } from "../types";

import { parseMonthAndDate, separateStringToMonthAndDate } from "./date";
import { uncertain } from "./uncertain";
import { combineLinkAndId } from "./utils";

export type ComicWalkerComicReleaseData = ComicReleaseData<{
  title: string;
  link: string;
}>;

export function createRelease(
  title: string,
  href: string,
  date: Date,
): ComicWalkerComicReleaseData {
  const { link, id } = combineLinkAndId(href);
  return [
    id,
    {
      date,
      detail: { link, title },
    },
  ];
}

export function concatReleases(
  releases: ComicWalkerComicReleaseData[][],
): ComicWalkerComicReleaseData[] {
  return releases.reduce((p, c) => [...p, ...c], []);
}

export function parse(
  dateString: string,
  contents: { title: string; href: string }[],
  now: Date,
): ComicWalkerComicReleaseData[] {
  const { month, day } = separateStringToMonthAndDate(dateString);
  const date = parseMonthAndDate(now, month, day);
  const releases = contents.map(({ title, href }) =>
    createRelease(title, href, date),
  );
  return releases;
}

export async function fetchComics(): Promise<ComicWalkerComicReleaseData[]> {
  const uncertains = await uncertain();
  const now = new Date();
  const releasesMappings = uncertains.map(({ date, contents }) =>
    parse(date, contents, now),
  );
  return concatReleases(releasesMappings);
}

export default fetchComics;