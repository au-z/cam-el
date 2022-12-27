import path from 'path'
import CssHmr from 'rollup-plugin-css-hmr'
import { defineConfig } from 'vite'
const resolve = (rel) => path.resolve(__dirname, rel)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      lib: {
        entry: {
          'cam-el': 'src/index.ts',
          button: 'src/button.ts',
          input: 'src/input.ts',
          icon: 'src/icon.ts',
          theme: 'src/theme/theme.ts',
          grid: 'src/grid.ts',
          zing: 'src/zing/Zing.ts',
        },
        formats: ['es'],
      },
    },
    resolve: {
      alias: {
        '@src': resolve('src'),
        '@style': resolve('src/style'),
        '@auzmartist/cam-el': resolve(mode !== 'production' ? 'src' : 'dist'),
      },
    },
    plugins: [
      CssHmr({
        'src/**/*': { ext: '.ts', page: false },
      }),
    ],
  }
})
