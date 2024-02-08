import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

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
