import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/*.spec.ts?(x)"],
    setupFiles: ["vitest.setup.ts"],
  },
});
