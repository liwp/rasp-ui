import {
  HOURS,
  dayNumberToName,
  timeNumberToTime,
  decDay,
  decTime,
  incDay,
  incTime,
  today
} from "./time";

beforeAll(() => {
  // Fri Nov 18 2016 00:00:00 GMT+0000 (GMT)
  jest.spyOn(Date, "now").mockReturnValue(1479427200000);
});

afterAll(() => {
  Date.now.mockRestore();
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
  const { day, time } = decTime({ day: 0, time: HOURS.indexOf("0800") });
  expect(day).toEqual(6);
  expect(time).toEqual(HOURS.indexOf("1900"));
});

test("incTime increments time", () => {
  const { day, time } = incTime({ day: 2, time: HOURS.indexOf("1700") });
  expect(day).toEqual(2);
  expect(time).toEqual(HOURS.indexOf("1800"));
});

test("incTime rolls over to the next day", () => {
  const { day, time } = incTime({ day: 6, time: HOURS.indexOf("1900") });
  expect(day).toEqual(0);
  expect(time).toEqual(HOURS.indexOf("0800"));
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

test("today returns 8AM for times before 8AM", () => {
  Date.now.mockReturnValue(new Date(2018, 1, 1, 7).getTime());
  const { day, time } = today();
  expect(day).toEqual(0);
  expect(time).toEqual(HOURS.indexOf("0800"));
});

test("today returns tomorrow noon for times after 7PM", () => {
  Date.now.mockReturnValue(new Date(2018, 1, 1, 20).getTime());
  const { day, time } = today();
  expect(day).toEqual(1);
  expect(time).toEqual(HOURS.indexOf("1200"));
});
