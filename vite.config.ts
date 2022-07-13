import CemPluginHybrids from '@auzmartist/cem-plugin-hybrids';
import path from 'path';
import CssHmr from 'rollup-plugin-css-hmr';
import { defineConfig } from 'vite';
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import { dependencies } from './package.json';
const resolve = (rel) => path.resolve(__dirname, rel);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@auzmartist/cam-el/custom-elements.json': resolve('dist/custom-elements.json'),
      '@auzmartist/cam-el/css': resolve('dist/css'),
      '@auzmartist/cam-el': resolve('src'),
    },
  },
  plugins: [
    CssHmr('.ts'),
    VitePluginCustomElementsManifest({
      files: [
        './src/my-element/index.ts',
        './src/cam-box/index.ts',
      ],
      plugins: [
        CemPluginHybrids(),
      ],
      dev: true,
    })
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'cam-el',
    },
    rollupOptions: {
      external: [...Object.keys(dependencies || {})].map((pkg) => new RegExp(`^${pkg}(/.*)?`)),
    }
  },
});
