import { isBefore, getDay } from "date-fns";

export function separateStringToMonthAndDate(
  text: string,
): {
  month: number;
  day: number;
} {
  if (!/[01]\d\/[0123]\d/.test(text))
    throw new Error(`${text} cannot separate to month and day!`);

  const [month, day] = text.split("/");
  return {
    month: Number(month) - 1,
    day: Number(day),
  };
}

export function parseMonthAndDate(now: Date, month: number, day: number): Date {
  const nowYear = now.getFullYear();
  const estimatedYear = new Date(nowYear, month, day);

  return isBefore(estimatedYear, now)
    ? new Date(nowYear + 1, month, day)
    : estimatedYear;
}

export function getDayFromJapanese(ja: string): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
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
      throw new Error("Illegal day");
  }
}

export function estimate(
  estimatedYear: number,
  month: number,
  date: number,
  day: ReturnType<typeof getDayFromJapanese>,
): Date {
  const estimated = new Date(estimatedYear, month, date);
  return estimated.getDay() === day
    ? estimated
    : estimate(estimatedYear + 1, month, date, day);
}
