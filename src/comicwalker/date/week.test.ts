import { getWeekNumberFromJapanese } from "./week";

describe("日本語の曜日から数値へ変換", () => {
  test("日は0", () => {
    expect(getWeekNumberFromJapanese("日")).toBe(0);
  });
  test("月は1", () => {
    expect(getWeekNumberFromJapanese("月")).toBe(1);
  });
  test("火は2", () => {
    expect(getWeekNumberFromJapanese("火")).toBe(2);
  });
  test("水は3", () => {
    expect(getWeekNumberFromJapanese("水")).toBe(3);
  });
  test("木は4", () => {
    expect(getWeekNumberFromJapanese("木")).toBe(4);
  });
  test("金は5", () => {
    expect(getWeekNumberFromJapanese("金")).toBe(5);
  });
  test("土は6", () => {
    expect(getWeekNumberFromJapanese("土")).toBe(6);
  });
  test("それ以外は例外を返す", () => {
    expect(() => {
      getWeekNumberFromJapanese("冥");
    }).toThrow();
  });
});
