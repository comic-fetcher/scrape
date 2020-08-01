import { estimateFullDate, separateStringToMonthAndDate } from "./date/day";
import { getWeekNumberFromJapanese } from "./date/week";
import { ComicWalkerComicReleaseData, ComicWalkerRawData } from "./types";
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

export function parseRawData(
  raw: ComicWalkerRawData,
  year: number,
): ComicWalkerComicReleaseData[] {
  const { month, day } = separateStringToMonthAndDate(raw.day);
  const week = getWeekNumberFromJapanese(raw.week);
  const D = estimateFullDate(year, month, day, week);

  const releases = raw.contents.map(({ title, href }) =>
    createRelease(title, href, D),
  );

  return releases;
}
