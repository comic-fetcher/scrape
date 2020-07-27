import {
  estimate,
  getDayFromJapanese,
  separateStringToMonthAndDate,
} from "./date";

describe("文字列から月と日付を返す", () => {
  test("無効なフォーマット", () => {
    expect(() => {
      separateStringToMonthAndDate("1001");
    }).toThrow();
  });
  test("無効な月", () => {
    expect(() => {
      separateStringToMonthAndDate("20/01");
    }).toThrow();
  });
  test("無効な日付", () => {
    expect(() => {
      separateStringToMonthAndDate("10/40");
    }).toThrow();
  });
  test("正しいフォーマット", () => {
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

describe("日本語の曜日から数値へ変換", () => {
  test("日は0", () => {
    expect(getDayFromJapanese("日")).toBe(0);
  });
  test("月は1", () => {
    expect(getDayFromJapanese("月")).toBe(1);
  });
  test("火は2", () => {
    expect(getDayFromJapanese("火")).toBe(2);
  });
  test("水は3", () => {
    expect(getDayFromJapanese("水")).toBe(3);
  });
  test("木は4", () => {
    expect(getDayFromJapanese("木")).toBe(4);
  });
  test("金は5", () => {
    expect(getDayFromJapanese("金")).toBe(5);
  });
  test("土は6", () => {
    expect(getDayFromJapanese("土")).toBe(6);
  });
  test("それ以外は例外を返す", () => {
    expect(() => {
      getDayFromJapanese("冥");
    }).toThrow();
  });
});

describe("日付を推定する", () => {
  test("2020/06/27(月)を渡したときに2020/07/27(月)を返す", () => {
    expect(estimate(2020, 6, 27, 1)).toEqual(new Date(2020, 6, 27));
  });
  test("2020/06/27(火)を渡したときに2021/07/27(火)を返す", () => {
    expect(estimate(2020, 6, 27, 2)).toEqual(new Date(2021, 6, 27));
  });
  test("2021/06/27(火)を渡したときに2021/07/27(火)を返す", () => {
    expect(estimate(2021, 6, 27, 2)).toEqual(new Date(2021, 6, 27));
  });
});
