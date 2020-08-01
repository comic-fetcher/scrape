export function getFullLinkFromId(id: string): string {
  return `https://comic-walker.com/contents/detail/${id}/`;
}

export function extractIdFromLink(link: string): string {
  return link.slice(link.indexOf("KDCW"), -1);
}

export function combineLinkAndId(
  link: string,
): {
  link: string;
  id: ReturnType<typeof extractIdFromLink>;
} {
  const id = extractIdFromLink(link);
  return {
    link: getFullLinkFromId(id),
    id,
  };
}
