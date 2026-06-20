import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "./Footer";
import Time, { HOURS } from "./time";

const setup = () => {
  const onTimeChange = vi.fn();
  const time = new Time(2, HOURS.indexOf("1200"));
  render(<Footer time={time} onTimeChange={onTimeChange} />);
  return { onTimeChange, time };
};

test("previous-day button steps back a day", () => {
  const { onTimeChange, time } = setup();
  fireEvent.click(screen.getByRole("button", { name: "Previous day" }));
  expect(onTimeChange).toHaveBeenCalledWith(time.decDay());
});

test("previous-hour button steps back an hour", () => {
  const { onTimeChange, time } = setup();
  fireEvent.click(screen.getByRole("button", { name: "Previous hour" }));
  expect(onTimeChange).toHaveBeenCalledWith(time.decHour());
});

test("next-hour button steps forward an hour", () => {
  const { onTimeChange, time } = setup();
  fireEvent.click(screen.getByRole("button", { name: "Next hour" }));
  expect(onTimeChange).toHaveBeenCalledWith(time.incHour());
});

test("next-day button steps forward a day", () => {
  const { onTimeChange, time } = setup();
  fireEvent.click(screen.getByRole("button", { name: "Next day" }));
  expect(onTimeChange).toHaveBeenCalledWith(time.incDay());
});

test("today button resets the time", () => {
  const { onTimeChange } = setup();
  fireEvent.click(screen.getByRole("button", { name: "Today" }));
  expect(onTimeChange).toHaveBeenCalledTimes(1);
});
