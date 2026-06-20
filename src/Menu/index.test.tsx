import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

const layers = { stars: "Star rating", rain1: "Rain" };

const burger = () => screen.getByRole("button", { name: "Toggle menu" });

test("menu starts collapsed", () => {
  render(<Menu layer="stars" layers={layers} onLayerChange={vi.fn()} />);
  expect(burger().getAttribute("aria-expanded")).toBe("false");
});

test("clicking the burger expands the menu", () => {
  render(<Menu layer="stars" layers={layers} onLayerChange={vi.fn()} />);
  fireEvent.click(burger());
  expect(burger().getAttribute("aria-expanded")).toBe("true");
});

test("selecting a layer calls onLayerChange and collapses", () => {
  const onLayerChange = vi.fn();
  render(<Menu layer="stars" layers={layers} onLayerChange={onLayerChange} />);
  fireEvent.click(burger());
  fireEvent.click(screen.getByRole("button", { name: "Rain" }));
  expect(onLayerChange).toHaveBeenCalledWith("rain1");
  expect(burger().getAttribute("aria-expanded")).toBe("false");
});

test("clicking outside collapses the menu", () => {
  render(<Menu layer="stars" layers={layers} onLayerChange={vi.fn()} />);
  fireEvent.click(burger());
  expect(burger().getAttribute("aria-expanded")).toBe("true");
  fireEvent.mouseDown(document.body);
  expect(burger().getAttribute("aria-expanded")).toBe("false");
});
