import fs from "fs";
import path from "path";
import { promisify } from "util";

import { JSDOM } from "jsdom";
import fetch from "node-fetch";

export async function fetchFromLocalSnapshot(): Promise<string> {
  const snapshot = path.resolve(__dirname, "snapshot", "calendar.html");
  const html = await promisify(fs.readFile)(snapshot, { encoding: "utf-8" });
  return html;
}

export async function fetchFromInternet(): Promise<string> {
  const res = await fetch("https://comic-walker.com/contents/calendar/");
  const html = await res.text();
  return html;
}

export async function getTableRows(): Promise<Element[]> {
  const html =
    process.env.NODE_ENV === "production"
      ? await fetchFromInternet()
      : await fetchFromLocalSnapshot();
  const {
    window: { document },
  } = new JSDOM(html);
  return Array.from(document.querySelectorAll(".calenderTable tr"));
}

export function fetchFromCalendarDay($tr: Element): string {
  return $tr.querySelector(".calenderDay").textContent;
}

export function fetchFromCalenderWeek($tr: Element): string {
  return $tr.querySelector(".calenderWeek").textContent;
}

export function fetchFromCalendarContents(
  $tr: Element,
): { title: string; href: string }[] {
  return Array.from($tr.querySelectorAll(".calenderContent p > a")).map(
    (node) => ({
      title: node.textContent,
      href: node.getAttribute("href"),
    }),
  );
}

export async function uncertain() {
  return (await getTableRows()).map(($tr) => ({
    date: fetchFromCalendarDay($tr),
    week: fetchFromCalenderWeek($tr),
    contents: fetchFromCalendarContents($tr),
  }));
}
