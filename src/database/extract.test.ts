import { ComicPlatform } from "../typeorm/entities/comic";

import { extractComic, extractRelease } from "./extract";

test("ComicReleaseDataから詳細部分を抽出したデータベース保存形式に変換", () => {
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

test("ComicReleaseDataから更新部分を抽出したデータベース保存形式に変換", () => {
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
