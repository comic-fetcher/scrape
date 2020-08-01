import { ComicWalkerComicReleaseData } from "./types";

import { createRelease, concatReleases, parse } from ".";

test("低レベルな生データを更新オブジェクトに変換", () => {
  const date = new Date(2020, 6, 26);
  expect(
    createRelease(
      "東方酔蝶華　 ロータスイーター達の酔醒",
      "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
      date,
    ),
  ).toEqual([
    "KDCW_KS04201360010000_68",
    {
      date,
      detail: {
        title: "東方酔蝶華　 ロータスイーター達の酔醒",
        link:
          "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
        platform: "ComicWalker",
      },
    },
  ]);
});

test("複数の更新を集約する", () => {
  const release1: ComicWalkerComicReleaseData = [
    "KDCW_KS04201360010000_68",
    {
      date: new Date(2020, 6, 26),
      detail: {
        title: "東方酔蝶華　 ロータスイーター達の酔醒",
        link:
          "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
        platform: "ComicWalker",
      },
    },
  ];
  const release2: ComicWalkerComicReleaseData = [
    "KDCW_AM21201313010000_68",
    {
      date: new Date(2020, 6, 26),
      detail: {
        title: "人間たちの幻想郷",
        link:
          "https://comic-walker.com/contents/detail/KDCW_AM21201313010000_68/",
        platform: "ComicWalker",
      },
    },
  ];
  expect(concatReleases([[release1], [release2]])).toEqual([
    release1,
    release2,
  ]);
});

describe("ComicWalkerのデータを変換する", () => {
  test("今年の一つの更新を変換する", () => {
    const date = new Date(2020, 6, 26);
    expect(
      parse(
        "07/26",
        "日",
        [
          {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            href:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
          },
        ],
        2020,
      ),
    ).toEqual([
      [
        "KDCW_KS04201360010000_68",
        {
          date,
          detail: {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            link:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
            platform: "ComicWalker",
          },
        },
      ],
    ]);
  });
  test("来年の更新の更新を変換する", () => {
    const date = new Date(2021, 0, 1);
    expect(
      parse(
        "01/01",
        "金",
        [
          {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            href:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
          },
        ],
        2020,
      ),
    ).toEqual([
      [
        "KDCW_KS04201360010000_68",
        {
          date,
          detail: {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            link:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
            platform: "ComicWalker",
          },
        },
      ],
    ]);
  });
  test("今年の複数の更新を変換する", () => {
    const date = new Date(2020, 6, 26);
    expect(
      parse(
        "07/26",
        "日",
        [
          {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            href:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
          },
          {
            title: "人間たちの幻想郷",
            href:
              "https://comic-walker.com/contents/detail/KDCW_AM21201313010000_68/",
          },
        ],
        2020,
      ),
    ).toEqual([
      [
        "KDCW_KS04201360010000_68",
        {
          date,
          detail: {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            link:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
            platform: "ComicWalker",
          },
        },
      ],
      [
        "KDCW_AM21201313010000_68",
        {
          date,
          detail: {
            title: "人間たちの幻想郷",
            link:
              "https://comic-walker.com/contents/detail/KDCW_AM21201313010000_68/",
            platform: "ComicWalker",
          },
        },
      ],
    ]);
  });
});
