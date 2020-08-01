import { extractIdFromLink, getFullLinkFromId, combineLinkAndId } from "./link";

describe("ComicWalkerのIDを抽出する", () => {
  test("フルのURLから", () => {
    expect(
      extractIdFromLink(
        "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
      ),
    ).toBe("KDCW_KS04201360010000_68");
  });
  test("URLのサブ部分から", () => {
    expect(extractIdFromLink("contents/detail/KDCW_KS04201360010000_68/")).toBe(
      "KDCW_KS04201360010000_68",
    );
  });
});

test("ComicWalkerのIDからフルのURLを返却する", () => {
  expect(getFullLinkFromId("KDCW_KS04201360010000_68")).toBe(
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
