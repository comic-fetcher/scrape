import { JSDOM } from "jsdom";
import fetch from "node-fetch";

export async function getTableRows(): Promise<Element[]> {
  const res = await fetch("https://comic-walker.com/contents/calendar/");
  const html = await res.text();
  const {
    window: { document },
  } = new JSDOM(html);
  return Array.from(document.querySelectorAll(".calenderTable tr"));
}

export function fetchFromCalendarDay($tr: Element): string {
  return $tr.querySelector(".calenderDay").textContent;
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
    contents: fetchFromCalendarContents($tr),
  }));
}
