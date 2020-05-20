import Time, { HOURS, generateHours, isDst } from "./time";

test("isDst in winter", () => {
  // Fri Nov 18 2016 00:00:00 GMT+0000 (GMT)
  const now = new Date(2016, 10, 18, 14);
  expect(isDst(now)).toBe(false);
});

test("isDst in summer", () => {
  // 1 July 2020 01:23:45 UTC+01:00
  const now = new Date(2020, 6, 1, 1, 23, 45);
  expect(isDst(now)).toBe(true);
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

test("dayToString outputs correct format", () => {
  const time = new Time(3, 0);
  const now = new Date(2018, 1, 1, 14);
  const s = time.dayToString(now);
  expect(s).toEqual("Sun, Feb 4");
});

test("hourToString outputs correct format", () => {
  const time = new Time(3, HOURS.indexOf("0900"));
  const s = time.hourToString();
  expect(s).toEqual("0900");
});

test("decDay decrements day", () => {
  const time = new Time(2, HOURS.indexOf("1700"));
  const newTime = time.decDay();
  expect(newTime).toEqual(new Time(1, HOURS.indexOf("1200")));
});

test("decDay rolls over to last day", () => {
  const time = new Time(0, HOURS.indexOf("1700"));
  const newTime = time.decDay();
  expect(newTime).toEqual(new Time(6, HOURS.indexOf("1200")));
});

test("incDay increments day", () => {
  const time = new Time(2, HOURS.indexOf("1700"));
  const newTime = time.incDay();
  expect(newTime).toEqual(new Time(3, HOURS.indexOf("1200")));
});

test("incDay rolls over to first day", () => {
  const time = new Time(6, HOURS.indexOf("1700"));
  const newTime = time.incDay();
  expect(newTime).toEqual(new Time(0, HOURS.indexOf("1200")));
});

test("decHour decrements hour", () => {
  const time = new Time(2, HOURS.indexOf("1700"));
  const newTime = time.decHour();
  expect(newTime).toEqual(new Time(2, HOURS.indexOf("1600")));
});

test("decHour rolls over to the previous day", () => {
  const time = new Time(0, 0);
  const newTime = time.decHour();
  expect(newTime).toEqual(new Time(6, HOURS.length - 1));
});

test("incHour increments hour", () => {
  const time = new Time(2, HOURS.indexOf("1700"));
  const newTime = time.incHour();
  expect(newTime).toEqual(new Time(2, HOURS.indexOf("1800")));
});

test("incHour rolls over to the next day", () => {
  const time = new Time(6, HOURS.length - 1);
  const newTime = time.incHour();
  expect(newTime).toEqual(new Time(0, 0));
});

test("today returns today's day and hour", () => {
  const time = Time.today(new Date(2018, 1, 1, 14));
  expect(time).toEqual(new Time(0, HOURS.indexOf("1400")));
});

test("today returns noon for hours before noon", () => {
  const time = Time.today(new Date(2018, 1, 1, 11));
  expect(time).toEqual(new Time(0, HOURS.indexOf("1200")));
});

test("today returns first hour for earlier hours", () => {
  const time = Time.today(new Date(2018, 1, 1, 6));
  expect(time).toEqual(new Time(0, 0));
});

test("today returns tomorrow noon for hours after 7PM", () => {
  const time = Time.today(new Date(2018, 1, 1, 20));
  expect(time).toEqual(new Time(1, HOURS.indexOf("1200")));
});
