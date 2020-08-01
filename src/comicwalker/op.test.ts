import * as dateMock from "jest-date-mock";
import { enableFetchMocks } from "jest-fetch-mock";

import mockSnapshot from "./__snapshots__/calendar.html.js";
import {
  fetchCalendarContents,
  fetchCalendarDay,
  fetchCalendarWeek,
  getJSDOM,
  getTableRaw,
  combineRawData,
  fetchComicReleases,
} from "./op";

describe("fetch", () => {
  beforeAll(() => {
    enableFetchMocks();
  });
  beforeEach(() => {
    dateMock.advanceTo(new Date(2020, 7, 2));
    fetchMock.mockResponse(async () => mockSnapshot);
  });
  afterEach(() => {
    dateMock.clear();
    fetchMock.resetMocks();
  });
  test("mockされたHTMLが正しいものかチェック", async () => {
    const dom = await getJSDOM();
    expect(dom.serialize()).toMatchSnapshot();
  });
  test("tr要素の整合性", async () => {
    const dom = await getJSDOM();
    const tr = await getTableRaw(dom);
    expect(tr).toMatchSnapshot();
  });
  test("日付の生文字列", async () => {
    const dom = await getJSDOM();
    const tr = await getTableRaw(dom);
    tr.forEach((t) => {
      expect(fetchCalendarDay(t)).toMatchSnapshot();
    });
  });
  test("曜日の生文字列", async () => {
    const dom = await getJSDOM();
    const tr = await getTableRaw(dom);
    tr.forEach((t) => {
      expect(fetchCalendarWeek(t)).toMatchSnapshot();
    });
  });
  test("コンテンツの生文字列", async () => {
    const dom = await getJSDOM();
    const tr = await getTableRaw(dom);
    tr.forEach((t) => {
      expect(fetchCalendarContents(t)).toMatchSnapshot();
    });
  });
  test("結合結果", async () => {
    expect(await combineRawData()).toMatchSnapshot();
  });
  test("変換後", async () => {
    expect(await fetchComicReleases()).toMatchSnapshot();
  });
});
