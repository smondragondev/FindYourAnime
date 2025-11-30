import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/",
  base: "/find-your-anime/",
  plugins: [
    tailwindcss(),
  ],
});
