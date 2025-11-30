import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 官方 Vite + React 最佳設定
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: false
  }
});
