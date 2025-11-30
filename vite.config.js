import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  root: "src/",
  base: "/FindYourAnime/",
  plugins: [tailwindcss()],
});
