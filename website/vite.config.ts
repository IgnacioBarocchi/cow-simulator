import { defineConfig, loadEnv } from "vite";

import VitePluginMarkdown from 'vite-plugin-md';
import million from "million/compiler";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [million.vite(), react({ fastRefresh: false }), VitePluginMarkdown()],
    worker: {
      plugins: [react()],
      format: 'es',

    },
    base: "./",
    server: {
      cors: false,
    },
    build: {
      rollupOptions: {
        output: {
          format: "umd",
        },
      },
      // Disable code splitting (not recommended for large projects)
      inlineDynamicImports: true,
    },
    assetsInclude: ['**/*.md']
  });
};
