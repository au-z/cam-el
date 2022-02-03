import { defineConfig } from 'vite';
import CssHmr from 'rollup-plugin-css-hmr';
import TestImport from './test-import.js';
console.log(CssHmr, TestImport)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [CssHmr('.ts')],
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
});
