import { getWeekNumberFromJapanese } from "./week";

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

export function estimateFullDate(
  estimatedYear: number,
  month: number,
  date: number,
  day: ReturnType<typeof getWeekNumberFromJapanese>,
): Date {
  const estimated = new Date(estimatedYear, month, date);
  return estimated.getDay() === day
    ? estimated
    : estimateFullDate(estimatedYear + 1, month, date, day);
}
