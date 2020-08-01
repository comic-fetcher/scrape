import { concat } from "lodash";

import { estimateFullDate, separateStringToMonthAndDate } from "./date/day";
import { getWeekNumberFromJapanese } from "./date/week";
import { uncertain } from "./dom";
import { ComicWalkerComicReleaseData } from "./types";
import { combineLinkAndId } from "./utils/link";

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
      detail: {
        link,
        title,
        platform: "ComicWalker",
      },
    },
  ];
}

export function concatReleases(
  releases: ComicWalkerComicReleaseData[][],
): ComicWalkerComicReleaseData[] {
  return concat(...releases);
}

export function parse(
  dateString: string,
  weekString: string,
  contents: { title: string; href: string }[],
  startYear: number,
): ComicWalkerComicReleaseData[] {
  const { month, day } = separateStringToMonthAndDate(dateString);
  const date = estimateFullDate(
    startYear,
    month,
    day,
    getWeekNumberFromJapanese(weekString),
  );
  const releases = contents.map(({ title, href }) =>
    createRelease(title, href, date),
  );
  return releases;
}

export async function fetchComics(): Promise<ComicWalkerComicReleaseData[]> {
  const uncertains = await uncertain();
  const startYear = new Date().getFullYear();
  const releasesMappings = uncertains.map(({ date, contents, week }) =>
    parse(date, week, contents, startYear),
  );
  return concatReleases(releasesMappings);
}

export default fetchComics;
