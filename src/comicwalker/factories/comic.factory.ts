import * as Factory from "factory.ts";

import { Comic, ComicPlatform } from "../../typeorm/entities/comic";
import { getFullLinkFromId } from "../utils/link";

const generateId = (i: number) =>
  `KDCW_KS${`${i}`.padStart(14, "0")}_${`${i % 100}`.padStart(2, "0")}`;

const generateLink = (i: number) => getFullLinkFromId(generateId(i));

export const comicFactory = Factory.Sync.makeFactory<Comic>({
  id: Factory.each(generateId),
  link: Factory.each(generateLink),
  title: "A",
  platform: ComicPlatform.COMIC_WALKER,
  releases: [],
});
