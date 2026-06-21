import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  test: {
    globals: true,
    environment: "jsdom",
    // Unit tests only; e2e/*.spec.ts is run by Playwright, not Vitest.
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
