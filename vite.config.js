import { resolve,dirname } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        animeListing: resolve(__dirname, "src/anime-listing/index.html"),
        animeDetail: resolve(__dirname, "src/anime-detail/index.html"),
        animeFavorites: resolve(__dirname, "src/anime-favorites/index.html"),
        quoteGenerator: resolve(__dirname, "src/quote-generator/index.html"),
        user: resolve(__dirname, "src/user/index.html"),
      }
    }
  },
  root: "src/",
  base: "/FindYourAnime/",
  plugins: [tailwindcss()],
});
