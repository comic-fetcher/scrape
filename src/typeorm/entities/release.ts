import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";

import { Comic } from "./comic";

@Entity()
export class Release {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne((type) => Comic, (comic) => comic.releases)
  comic!: Comic;

  @Column("datetime")
  date!: Date;
}
