import { expect, test } from "@playwright/test";

const CDN = "**mrsap.org**";

test("renders the forecast overlay when the CDN responds", async ({ page }) => {
  await page.route(CDN, (route) =>
    route.fulfill({
      path: "e2e/fixtures/forecast.png",
      contentType: "image/png",
    }),
  );
  await page.goto("/");
  const overlay = page.locator(".leaflet-overlay-pane img").first();
  await expect(overlay).toBeVisible();
  await expect
    .poll(() => overlay.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
  await expect(page.locator(".forecast-error")).toHaveCount(0);
});

test("shows an error when the CDN fails", async ({ page }) => {
  await page.route(CDN, (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".forecast-error")).toBeVisible();
  await expect(page.locator(".forecast-error")).toContainText(
    "Forecast unavailable",
  );
  await expect(page.locator(".spinner-container")).toHaveCount(0);
});
