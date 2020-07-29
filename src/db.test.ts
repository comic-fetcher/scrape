import { extractRelease, getPlatformEnum, extractComic } from "./db";
import { ComicPlatform } from "./typeorm/entities/comic";

describe("文字列からプラットフォームのenumを返す", () => {
  test("ComicWalker", () => {
    expect(getPlatformEnum("ComicWalker")).toBe(ComicPlatform.COMIC_WALKER);
  });
  test("それ以外は例外を投げる", () => {
    expect(() => {
      // @ts-expect-error Aというプラットフォームは存在しないので
      getPlatformEnum("A");
    }).toThrow();
  });
});

test("Comicをデータベースに保存する形式に変換", () => {
  expect(
    extractComic([
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
    ]),
  ).toEqual({
    id: "KDCW_KS04201360010000_68",
    title: "東方酔蝶華　 ロータスイーター達の酔醒",
    link: "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
    platform: ComicPlatform.COMIC_WALKER,
  });
});

test("ComicReleaseから更新日を抽出してデータベース保存形式に変換", () => {
  expect(
    extractRelease([
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
    ]),
  ).toEqual({
    id: "KDCW_KS04201360010000_68_1595689200000",
    comic: { id: "KDCW_KS04201360010000_68" },
    date: new Date(2020, 6, 26),
  });
});
