import { parseRawData, createRelease } from "./parse";

test("parseRawData", () => {
  expect(
    parseRawData(
      {
        day: "08/31",
        week: "月",
        contents: [
          {
            title: "はらぺこ魔理沙のしあわせごはん",
            href:
              "https://comic-walker.com/contents/detail/KDCW_AM21201274010000_68/",
          },
          {
            title: "東方智霊奇伝　反則探偵さとり",
            href:
              "https://comic-walker.com/contents/detail/KDCW_AM21201276010000_68/",
          },
          {
            title: "人間たちの幻想郷",
            href:
              "https://comic-walker.com/contents/detail/KDCW_AM21201313010000_68/",
          },
        ],
      },
      2020,
    ),
  ).toEqual([
    [
      "KDCW_AM21201274010000_68",
      {
        date: new Date(2020, 7, 31),
        detail: {
          title: "はらぺこ魔理沙のしあわせごはん",
          link:
            "https://comic-walker.com/contents/detail/KDCW_AM21201274010000_68/",
          platform: "ComicWalker",
        },
      },
    ],
    [
      "KDCW_AM21201276010000_68",
      {
        date: new Date(2020, 7, 31),
        detail: {
          title: "東方智霊奇伝　反則探偵さとり",
          link:
            "https://comic-walker.com/contents/detail/KDCW_AM21201276010000_68/",
          platform: "ComicWalker",
        },
      },
    ],
    [
      "KDCW_AM21201313010000_68",
      {
        date: new Date(2020, 7, 31),
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

test("createRelease", () => {
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
