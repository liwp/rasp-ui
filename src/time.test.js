import {
  HOURS,
  dayNumberToName,
  decDay,
  decTime,
  generateHours,
  incDay,
  incTime,
  isDst,
  timeNumberToTime,
  today,
} from "./time";

beforeEach(() => {
  // Fri Nov 18 2016 00:00:00 GMT+0000 (GMT)
  jest.spyOn(Date, "now").mockReturnValue(1479427200000);
});

afterEach(() => {
  Date.now.mockRestore();
});

test("isDst in winter", () => {
  expect(isDst()).toBe(false);
});

test("isDst in summer", () => {
  // 1 July 2020 01:23:45 UTC+01:00
  jest.spyOn(Date, "now").mockReturnValue(1593563025000);
  expect(isDst()).toBe(true);
});

test("HOURS during winter", () => {
  expect(generateHours(false)).toEqual([
    "0600",
    "0700",
    "0800",
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
  ]);
});

test("HOURS during DST", () => {
  expect(generateHours(true)).toEqual([
    "0700",
    "0800",
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
  ]);
});

test("dayNumberToName outputs correct format", () => {
  const s = dayNumberToName(3);
  expect(s).toEqual("Mon, Nov 21");
});

test("decDay decrements day", () => {
  const { day, time } = decDay({ day: 2, time: HOURS.indexOf("1700") });
  expect(day).toEqual(1);
  expect(time).toEqual(HOURS.indexOf("1200"));
});

test("decDay rolls over to last day", () => {
  const { day, time } = decDay({ day: 0, time: HOURS.indexOf("1700") });
  expect(day).toEqual(6);
  expect(time).toEqual(HOURS.indexOf("1200"));
});

test("incDay increments day", () => {
  const { day, time } = incDay({ day: 2, time: HOURS.indexOf("1700") });
  expect(day).toEqual(3);
  expect(time).toEqual(HOURS.indexOf("1200"));
});

test("incDay rolls over to first day", () => {
  const { day, time } = incDay({ day: 6, time: HOURS.indexOf("1700") });
  expect(day).toEqual(0);
  expect(time).toEqual(HOURS.indexOf("1200"));
});

test("decTime decrements time", () => {
  const { day, time } = decTime({ day: 2, time: HOURS.indexOf("1700") });
  expect(day).toEqual(2);
  expect(time).toEqual(HOURS.indexOf("1600"));
});

test("decTime rolls over to the previous day", () => {
  const { day, time } = decTime({ day: 0, time: 0 });
  expect(day).toEqual(6);
  expect(time).toEqual(HOURS.length - 1);
});

test("incTime increments time", () => {
  const { day, time } = incTime({ day: 2, time: HOURS.indexOf("1700") });
  expect(day).toEqual(2);
  expect(time).toEqual(HOURS.indexOf("1800"));
});

test("incTime rolls over to the next day", () => {
  const { day, time } = incTime({ day: 6, time: HOURS.length - 1 });
  expect(day).toEqual(0);
  expect(time).toEqual(0);
});

test("today returns today's day and time", () => {
  Date.now.mockReturnValue(new Date(2018, 1, 1, 14).getTime());
  const { day, time } = today();
  expect(day).toEqual(0);
  expect(time).toEqual(HOURS.indexOf("1400"));
});

test("today returns noon for times before noon", () => {
  Date.now.mockReturnValue(new Date(2018, 1, 1, 11).getTime());
  const { day, time } = today();
  expect(day).toEqual(0);
  expect(time).toEqual(HOURS.indexOf("1200"));
});

test("today returns first hour for earlier times", () => {
  Date.now.mockReturnValue(new Date(2018, 1, 1, 6).getTime());
  const { day, time } = today();
  expect(day).toEqual(0);
  expect(time).toEqual(0);
});

test("today returns tomorrow noon for times after 7PM", () => {
  Date.now.mockReturnValue(new Date(2018, 1, 1, 20).getTime());
  const { day, time } = today();
  expect(day).toEqual(1);
  expect(time).toEqual(HOURS.indexOf("1200"));
});
