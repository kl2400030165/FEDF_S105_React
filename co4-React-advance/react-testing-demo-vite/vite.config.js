import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", //  required for React component tests
    globals: true,        // allows `describe`, `it`, `expect` without imports
    setupFiles: "./src/setupTests.js", // optional for jest-dom matchers
  },
});