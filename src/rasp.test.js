import { cacheKey } from "./rasp";

describe("cacheKey", () => {
  test("basecase after noon", () => {
    const now = new Date("2021-12-17T13:24:56+01:00");
    expect(cacheKey(now, 5)).toBe("2021-12-17");
  });

  test("basecase before noon", () => {
    const now = new Date("2021-12-17T10:24:56+01:00");
    expect(cacheKey(now, 5)).toBe("2021-12-17T09:20:00.000Z");
  });

  describe("before noon", () => {
    test("timestamps within bucket share key", () => {
      const a = new Date("2021-12-17T03:24:56+01:00");
      const b = new Date("2021-12-17T03:39:56+01:00");
      expect(cacheKey(a, 20)).toBe(cacheKey(b, 20));
    });

    test("timestamps outside resolution have different keys", () => {
      const a = new Date("2021-12-17T03:24:56+01:00");
      const b = new Date("2021-12-17T03:30:56+01:00");
      expect(cacheKey(a, 10)).not.toBe(cacheKey(b, 10));
    });

    test("example keys", () => {
      const testCases = [
        [new Date("2021-12-17T03:26:56+01:00"), "2021-12-17T02:25:00.000Z"],
        [new Date("2021-12-17T03:25:56+01:00"), "2021-12-17T02:25:00.000Z"],
        [new Date("2021-12-17T03:24:56+01:00"), "2021-12-17T02:20:00.000Z"],
        // Around noon BST
        [new Date("2021-12-17T11:59:59.999+01:00"), "2021-12-17T10:55:00.000Z"],
        [new Date("2021-12-17T12:00:00+01:00"), "2021-12-17"],
        [new Date("2021-12-17T12:00:00.001+01:00"), "2021-12-17"],
        // Midnight
        [new Date("2021-12-17T23:59:59.999+01:00"), "2021-12-17"],
      ];

      testCases.forEach(([date, key]) => expect(cacheKey(date, 5)).toBe(key));
    });
  });

  describe("after noon", () => {
    test("fixed key", () => {
      const a = new Date("2021-12-17T13:24:56+01:00");
      const b = new Date("2021-12-17T23:24:56+01:00");
      expect(cacheKey(a, 10)).toBe(cacheKey(b, 10));
    });
  });
});

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
