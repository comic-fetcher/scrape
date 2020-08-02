import { ComicPlatform } from "../typeorm/entities/comic";

import { getPlatformEnum } from "./platform";

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
