import { dayOffsetToDir } from "./rasp";
import Time from "./time";

describe("dayOffsetToDir", () => {
  function sut(day) {
    const time = new Time(day, 0);
    return dayOffsetToDir(time);
  }

  test("today", () => {
    expect(sut(0)).toBe("UK2");
  });

  test("tomorrow", () => {
    expect(sut(1)).toBe("UK4+1");
  });

  test("today + 2", () => {
    expect(sut(2)).toBe("UK12+2");
  });

  test("today + 3", () => {
    expect(sut(3)).toBe("UK12+3");
  });

  test("today + 4", () => {
    expect(sut(4)).toBe("UK12+4");
  });

  test("today + 5", () => {
    expect(sut(5)).toBe("UK12+5");
  });

  test("today + 6", () => {
    expect(sut(6)).toBe("UK12+6");
  });
});
