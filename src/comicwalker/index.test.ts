import {
  createRelease,
  concatReleases,
  ComicWalkerComicReleaseData,
  parse,
} from ".";

test("Create release", () => {
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
      },
    },
  ]);
});

test("Concat releases", () => {
  const release1: ComicWalkerComicReleaseData = [
    "KDCW_KS04201360010000_68",
    {
      date: new Date(2020, 6, 26),
      detail: {
        title: "東方酔蝶華　 ロータスイーター達の酔醒",
        link:
          "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
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
      },
    },
  ];

  expect(concatReleases([[release1], [release2]])).toEqual([
    release1,
    release2,
  ]);
});

describe("Parsing", () => {
  test("Create release from raw data", () => {
    const now = new Date(2020, 6, 20);
    const date = new Date(2020, 6, 26);
    expect(
      parse(
        "07/26",
        [
          {
            title: "東方酔蝶華　 ロータスイーター達の酔醒",
            href:
              "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
          },
        ],
        now,
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
          },
        },
      ],
    ]);
  });
  test("Create multiple releases from raw data", () => {
    const now = new Date(2020, 6, 20);
    const date = new Date(2020, 6, 26);
    expect(
      parse(
        "07/26",
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
        now,
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
          },
        },
      ],
      [
        "KDCW_AM21201313010000_68",
        {
          date: new Date(2020, 6, 26),
          detail: {
            title: "人間たちの幻想郷",
            link:
              "https://comic-walker.com/contents/detail/KDCW_AM21201313010000_68/",
          },
        },
      ],
    ]);
  });
});
