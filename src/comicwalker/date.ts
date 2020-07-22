import { isBefore } from "date-fns";

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
