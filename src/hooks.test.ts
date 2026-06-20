import { act, renderHook } from "@testing-library/react";
import { useImageStatus } from "./hooks";

class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = "";
  constructor() {
    images.push(this);
  }
}

let images: MockImage[];

beforeEach(() => {
  images = [];
  vi.stubGlobal("Image", MockImage);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("useImageStatus starts in loading", () => {
  const { result } = renderHook(() => useImageStatus("https://x/a.png"));
  expect(result.current).toBe("loading");
});

test("useImageStatus reports loaded when the image loads", () => {
  const { result } = renderHook(() => useImageStatus("https://x/a.png"));
  act(() => {
    images[0].onload?.();
  });
  expect(result.current).toBe("loaded");
});

test("useImageStatus reports error when the image fails", () => {
  const { result } = renderHook(() => useImageStatus("https://x/a.png"));
  act(() => {
    images[0].onerror?.();
  });
  expect(result.current).toBe("error");
});
