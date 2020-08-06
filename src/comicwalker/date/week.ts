export function getDayFromJapaneseKanji(ja: string) {
  switch (ja) {
    case "日":
      return 0;
    case "月":
      return 1;
    case "火":
      return 2;
    case "水":
      return 3;
    case "木":
      return 4;
    case "金":
      return 5;
    case "土":
      return 6;
    default:
      return null;
  }
}
