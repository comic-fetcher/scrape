export type ComicWalkerComicReleaseData = [
  string,
  {
    date: Date;
    detail: {
      title: string;
      link: string;
      platform: "ComicWalker";
    };
  },
];

export type ComicWalkerRawDataContent = {
  title: string;
  href: string;
};

export type ComicWalkerRawData = {
  day: string;
  week: string;
  contents: ComicWalkerRawDataContent[];
};
