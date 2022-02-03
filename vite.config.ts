import { defineConfig } from 'vite';
import CssHmr from 'rollup-plugin-css-hmr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [CssHmr('.ts')],
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^lit/
    },
  },
});
