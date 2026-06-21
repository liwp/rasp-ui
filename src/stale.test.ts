import { staleForecastLabel } from "./stale";

const NOW = new Date(2026, 5, 21, 14, 0, 0); // Sun 21 Jun 2026, 14:00 local

test("no cached date → not stale", () => {
  expect(staleForecastLabel(null, NOW)).toBeNull();
});

test("invalid date → not stale", () => {
  expect(staleForecastLabel(new Date("nonsense"), NOW)).toBeNull();
});

test("cached earlier today → not stale", () => {
  expect(staleForecastLabel(new Date(2026, 5, 21, 6, 0, 0), NOW)).toBeNull();
});

test("cached yesterday → stale, labelled with the date", () => {
  expect(staleForecastLabel(new Date(2026, 5, 20, 18, 0, 0), NOW)).toBe(
    "Sat 20 Jun",
  );
});
