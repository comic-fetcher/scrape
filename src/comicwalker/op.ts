import { JSDOM } from "jsdom";

import { fetchFromCalendarContents } from "./dom";
import { parseRawData } from "./parse";
import { ComicWalkerRawData, ComicWalkerComicReleaseData } from "./types";

import { concatReleases } from ".";

export async function getJSDOM() {
  const res = await fetch("https://comic-walker.com/contents/calendar/");
  const html = await res.text();
  return new JSDOM(html);
}

export async function getTableRaw(dom: JSDOM) {
  return Array.from(dom.window.document.querySelectorAll(".calenderTable tr"));
}

export function fetchCalendarDay(tr: Element): string {
  return tr.querySelector(".calenderDay").textContent;
}

export function fetchCalendarWeek(tr: Element): string {
  return tr.querySelector(".calenderWeek").textContent;
}

export function fetchCalendarContents(
  $tr: Element,
): { title: string; href: string }[] {
  return Array.from($tr.querySelectorAll(".calenderContent p > a")).map(
    (node) => ({
      title: node.textContent,
      href: node.getAttribute("href"),
    }),
  );
}

export async function combineRawData(): Promise<ComicWalkerRawData[]> {
  const jsdom = await getJSDOM();
  const tr = await getTableRaw(jsdom);
  const combined = await tr.map((t) => ({
    day: fetchCalendarDay(t),
    week: fetchCalendarWeek(t),
    contents: fetchFromCalendarContents(t),
  }));
  return combined;
}

export async function fetchComicReleases(): Promise<
  ComicWalkerComicReleaseData[]
> {
  const nowYear = new Date().getFullYear();
  const raw = await combineRawData();

  const c = raw.map((r) => parseRawData(r, nowYear));
  return concatReleases(c);
}
