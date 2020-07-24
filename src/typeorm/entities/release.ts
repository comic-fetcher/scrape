import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from "typeorm";

import { Comic } from "./comic";

@Entity()
export class Release {
  @PrimaryColumn()
  id!: string;

  @ManyToOne((type) => Comic, (comic) => comic.releases)
  comic!: Comic;

  @Column("datetime")
  date!: Date;
}
