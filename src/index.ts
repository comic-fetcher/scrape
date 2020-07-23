import comicwalker from "./comicwalker";
import { sendDB } from "./db";

(async () => {
  const comicwalkerReleases = await comicwalker();
  await sendDB(comicwalkerReleases);
})();
