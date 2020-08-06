import { fetchComicReleases as comicwalker } from "./comicwalker";
import { sendDB } from "./database";

(async () => {
  const comicwalkerReleases = await comicwalker();
  await sendDB(comicwalkerReleases);
})();
