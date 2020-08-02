import { ComicPlatform } from "../typeorm/entities/comic";
import { RequiredDetail } from "../types";

export function getPlatformEnum(
  platform: RequiredDetail["platform"],
): ComicPlatform {
  switch (platform) {
    case "ComicWalker":
      return ComicPlatform.COMIC_WALKER;
    default:
      throw new Error("Illegal platform");
  }
}
