import {
  estimate,
  getDayFromJapanese,
  parseMonthAndDate,
  separateStringToMonthAndDate,
} from "./date";
import { uncertain } from "./dom";
import { combineLinkAndId } from "./utils";

export type ComicWalkerComicReleaseData = [
  string,
  {
    date: Date;
    detail: {
      title: string;
      link: string;
      platform: "ComicWalker";
    };
  },
];

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
export function parse2(
  dateString: string,
  weekString: string,
  contents: { title: string; href: string }[],
  startYear: number,
): ComicWalkerComicReleaseData[] {
  const { month, day } = separateStringToMonthAndDate(dateString);
  const date = estimate(startYear, month, day, getDayFromJapanese(weekString));
  const releases = contents.map(({ title, href }) =>
    createRelease(title, href, date),
  );
  return releases;
}

export async function fetchComics(): Promise<ComicWalkerComicReleaseData[]> {
  const uncertains = await uncertain();
  const startYear = new Date().getFullYear();
  const releasesMappings = uncertains.map(({ date, contents, week }) =>
    parse2(date, week, contents, startYear),
  );
  return concatReleases(releasesMappings);
}

export default fetchComics;
