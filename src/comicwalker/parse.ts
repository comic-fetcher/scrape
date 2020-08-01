import { estimateFullDate, separateStringToMonthAndDate } from "./date/day";
import { getWeekNumberFromJapanese } from "./date/week";
import { ComicWalkerComicReleaseData, ComicWalkerRawData } from "./types";

import { createRelease } from ".";

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
