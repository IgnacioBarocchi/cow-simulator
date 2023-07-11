import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite(), react()],
  base: "./", // Specify the relative path from your built app to the root of your server
  server: {
    cors: false,
  },
});
