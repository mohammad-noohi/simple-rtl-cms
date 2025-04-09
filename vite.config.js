// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // اگه پروژه‌ات ری‌اکته
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") /* eslint-disable-line no-undef */,
    },
  },
});
