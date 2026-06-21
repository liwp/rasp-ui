import { expect, test } from "@playwright/test";

test("registers a service worker", async ({ page }) => {
  await page.goto("/");
  await expect
    .poll(
      () =>
        page.evaluate(async () => {
          const reg = await navigator.serviceWorker.getRegistration();
          return Boolean(reg?.active || reg?.installing || reg?.waiting);
        }),
      { timeout: 20_000 },
    )
    .toBe(true);
});

test("app shell loads offline", async ({ page, context }) => {
  await page.goto("/");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload(); // ensure the SW controls the page + shell is precached
  await expect(page.getByRole("button", { name: "Toggle menu" })).toBeVisible();

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("button", { name: "Toggle menu" })).toBeVisible();
  await context.setOffline(false);
});
