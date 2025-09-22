import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  optimizeDeps: {
    exclude: ["@noble/curves"], // prevent Vite from pre-bundling this lib
  },
  build: {
    commonjsOptions: {
      ignoreTryCatch: (id) => id === "@noble/curves",
    },
    rollupOptions: {
      external: ["@noble/curves"], // don’t try to type-check/bundle it
    },
  },
});
