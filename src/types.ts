export type RequiredDetail = {
  title: string;
  link: string;
  platform: "ComicWalker";
};

export type ComicReleaseData = [
  string,
  {
    date: Date;
    detail: RequiredDetail;
  },
];
