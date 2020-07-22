import { parseMonthAndDate, separateStringToMonthAndDate } from "./date";

describe("Separate", () => {
  test("Illigal format", () => {
    expect(() => {
      separateStringToMonthAndDate("1001");
    }).toThrow();
  });
  test("Illigal month", () => {
    expect(() => {
      separateStringToMonthAndDate("20/01");
    }).toThrow();
  });
  test("Illigal day", () => {
    expect(() => {
      separateStringToMonthAndDate("10/40");
    }).toThrow();
  });
  test("Correct format", () => {
    expect(separateStringToMonthAndDate("01/01")).toEqual({
      month: 0,
      day: 1,
    });
    expect(separateStringToMonthAndDate("01/11")).toEqual({
      month: 0,
      day: 11,
    });
    expect(separateStringToMonthAndDate("01/21")).toEqual({
      month: 0,
      day: 21,
    });
    expect(separateStringToMonthAndDate("01/31")).toEqual({
      month: 0,
      day: 31,
    });
    expect(separateStringToMonthAndDate("10/01")).toEqual({
      month: 9,
      day: 1,
    });
  });
});

describe("Date parsing", () => {
  test("Given month and day are after", () => {
    const now = new Date(2020, 6, 1);

    const parsed = parseMonthAndDate(now, 7, 1);

    expect(parsed.getFullYear()).toBe(2020);
  });

  test("Given month and day are before", () => {
    const now = new Date(2020, 6, 1);

    const parsed = parseMonthAndDate(now, 5, 1);

    expect(parsed.getFullYear()).toBe(2021);
  });

  test("Given month and day are same", () => {
    const now = new Date(2020, 6, 1);

    const parsed = parseMonthAndDate(now, 6, 1);

    expect(parsed.getFullYear()).toBe(2020);
  });
});
