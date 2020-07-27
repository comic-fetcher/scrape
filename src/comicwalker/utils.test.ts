import {
  extractIdFromLink,
  getFullLinkFromId,
  combineLinkAndId,
} from "./utils";

describe("ComicWalkerのIDを抽出する", () => {
  test("フルのURLから", () => {
    const link =
      "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/";
    const id = extractIdFromLink(link);

    expect(id).toBe("KDCW_KS04201360010000_68");
  });

  test("URLのサブ部分から", () => {
    const link = "contents/detail/KDCW_KS04201360010000_68/";
    const id = extractIdFromLink(link);

    expect(id).toBe("KDCW_KS04201360010000_68");
  });
});

test("ComicWalkerのIDからフルのURLを返却する", () => {
  const link = getFullLinkFromId("KDCW_KS04201360010000_68");

  expect(link).toBe(
    "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
  );
});

test("ComicWalkerのサブURLからIDとフルのURLを纏める", () => {
  expect(combineLinkAndId("contents/detail/KDCW_KS04201360010000_68/")).toEqual(
    {
      link:
        "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
      id: "KDCW_KS04201360010000_68",
    },
  );
});
