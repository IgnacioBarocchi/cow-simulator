import VitePluginMarkdown from 'vite-plugin-md';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), VitePluginMarkdown()],
  assetsInclude: ['**/*.md']
})
