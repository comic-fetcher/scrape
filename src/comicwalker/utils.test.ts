import {
  extractIdFromLink,
  getFullLinkFromId,
  combineLinkAndId,
} from "./utils";

test("Extract ID from full link", () => {
  const link =
    "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/";
  const id = extractIdFromLink(link);

  expect(id).toBe("KDCW_KS04201360010000_68");
});

test("Extract ID from sub link", () => {
  const link = "contents/detail/KDCW_KS04201360010000_68/";
  const id = extractIdFromLink(link);

  expect(id).toBe("KDCW_KS04201360010000_68");
});

test("Get full link from ID", () => {
  const link = getFullLinkFromId("KDCW_KS04201360010000_68");

  expect(link).toBe(
    "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
  );
});

test("Combine link and ID", () => {
  const combined = combineLinkAndId(
    "contents/detail/KDCW_KS04201360010000_68/",
  );

  expect(combined).toEqual({
    link: "https://comic-walker.com/contents/detail/KDCW_KS04201360010000_68/",
    id: "KDCW_KS04201360010000_68",
  });
});
