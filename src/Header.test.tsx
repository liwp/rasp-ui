import { render } from "@testing-library/react";
import Header from "./Header";
import Time, { HOURS } from "./time";

test("header shows the hour and the layer label", () => {
  const { container } = render(
    <Header layer="Star rating" time={new Time(3, HOURS.indexOf("0900"))} />,
  );
  // The day string is new Date()-relative; assert only the deterministic parts.
  expect(container.textContent).toContain("0900");
  expect(container.textContent).toContain("(Star rating)");
});
