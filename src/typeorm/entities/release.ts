import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Comic } from "./comic";

@Entity()
export class Release {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => Comic, (comic) => comic.releases)
  comic!: Comic;

  @Column("date")
  date!: Date;
}
