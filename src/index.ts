import comicwalker from "./comicwalker";

(async () => {
  const comicwalkerReleases = await comicwalker();
  console.dir(comicwalkerReleases);
})();
