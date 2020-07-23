import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";

import { Release } from "./release";

export enum ComicPlatform {
  COMIC_WALKER = "ComicWalker",
}

@Entity()
export class Comic {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  link!: string;

  @Column({
    type: "enum",
    enum: ComicPlatform,
  })
  platform!: ComicPlatform;

  @OneToMany((type) => Release, (release) => release.comic)
  releases!: Release;
}
