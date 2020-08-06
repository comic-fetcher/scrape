import { getDayFromJapaneseKanji } from "./week";

describe("日本語の漢字から曜日の数値へ変換", () => {
  test("日は0", () => {
    expect(getDayFromJapaneseKanji("日")).toBe(0);
  });
  test("月は1", () => {
    expect(getDayFromJapaneseKanji("月")).toBe(1);
  });
  test("火は2", () => {
    expect(getDayFromJapaneseKanji("火")).toBe(2);
  });
  test("水は3", () => {
    expect(getDayFromJapaneseKanji("水")).toBe(3);
  });
  test("木は4", () => {
    expect(getDayFromJapaneseKanji("木")).toBe(4);
  });
  test("金は5", () => {
    expect(getDayFromJapaneseKanji("金")).toBe(5);
  });
  test("土は6", () => {
    expect(getDayFromJapaneseKanji("土")).toBe(6);
  });
  test("それ以外はnullを返す", () => {
    expect(getDayFromJapaneseKanji("冥")).toBeNull();
  });
});
