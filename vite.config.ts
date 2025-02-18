import { defineConfig, loadEnv } from "vite";

import million from "million/compiler";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [million.vite(), react({ fastRefresh: false })],
    worker: { plugins: [react()] },
    base: "./",
    server: {
      cors: false,
    },
  });
};
