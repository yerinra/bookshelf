import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
// import {type PluginOption } from 'vite'
import terser from "@rollup/plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), visualizer() as PluginOption],
  plugins: [react()],
  build: {
    minify: "terser", // Use terser for minification
    rollupOptions: {
      plugins: [terser()],
    },
  },
  server: {
    proxy: {
      "/keyword": {
        target: "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/keyword/, ""),
        secure: false,
        ws: true,
      },
      "/isbn": {
        target: "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/isbn/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
