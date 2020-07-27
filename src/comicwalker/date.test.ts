import {
  estimate,
  getDayFromJapanese,
  separateStringToMonthAndDate,
} from "./date";

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

describe("Get day from Japanese", () => {
  test("日 must be 0", () => {
    expect(getDayFromJapanese("日")).toBe(0);
  });
  test("月 must be 1", () => {
    expect(getDayFromJapanese("月")).toBe(1);
  });
  test("火 must be 2", () => {
    expect(getDayFromJapanese("火")).toBe(2);
  });
  test("水 must be 3", () => {
    expect(getDayFromJapanese("水")).toBe(3);
  });
  test("木 must be 4", () => {
    expect(getDayFromJapanese("木")).toBe(4);
  });
  test("金 must be 5", () => {
    expect(getDayFromJapanese("金")).toBe(5);
  });
  test("土 must be 6", () => {
    expect(getDayFromJapanese("土")).toBe(6);
  });
  test("Illegal", () => {
    expect(() => {
      getDayFromJapanese("冥");
    }).toThrow();
  });
});

describe("Estimate date", () => {
  test("2020/07/27(Mon)", () => {
    expect(estimate(2020, 6, 27, 1)).toEqual(new Date(2020, 6, 27));
  });
  test("2021/07/27(Tue)", () => {
    expect(estimate(2020, 6, 27, 2)).toEqual(new Date(2021, 6, 27));
  });
});
