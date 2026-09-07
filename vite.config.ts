import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  // GitHub Pages serves this repo as a project page at
  // https://rajuxstudio.github.io/Rajvir_porfalio/, so every built asset URL
  // needs that prefix. Dev server is unaffected (it serves from this base too).
  base: "/Rajvir_porfalio/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
