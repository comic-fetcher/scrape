import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import entities from "../typeorm/entities";
import { ComicReleaseData } from "../types";

import { extractComics, extractReleases } from "./extract";
import { storeComics, storeReleases } from "./store";

export function getConnection(): Promise<Connection> {
  return createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities,
  });
}

export async function sendDB(data: ComicReleaseData[]): Promise<void> {
  const connection = await getConnection();
  try {
    const comics = extractComics(data);
    const releases = extractReleases(data);
    await storeComics(connection, comics);
    await storeReleases(connection, releases);
  } finally {
    await connection.close();
  }
}
