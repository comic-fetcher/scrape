import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import entities from "../typeorm/entities";
import { ComicReleaseData } from "../types";

import { extractComics, extractReleases } from "./extract";
import { storeComics, storeReleases } from "./store";

export function getConnection(): Promise<Connection> {
  return createConnection({
    type: "postgres",
    url: process.env.DB_URL,
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
