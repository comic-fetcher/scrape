import { JSDOM } from "jsdom";

import { fetchFromCalendarContents } from "./dom";

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

export type ComicWalkerRawDataContent = {
  title: string;
  href: string;
};

export type ComicWalkerRawData = {
  day: string;
  week: string;
  contents: ComicWalkerRawDataContent[];
};

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
