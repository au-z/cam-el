import { html } from 'hybrids'
import { define } from 'hybrids'
import { range } from '@src/utils.js'

export const THEME = ({ shades }) => ({
  ...shades('gray', 0x59686c, 2).map,
  ...shades('input', 0x67aece, 3).map,
  '--input-active': '#29A5DF',
  ...shades('success', 0x60bfa1, 2).map,
  ...shades('warning', 0xf3b477, 2).map,
  ...shades('error', 0xf8513d, 2).map,
})

export const theme = (key: string) => THEME[key]

export const ThemeColors = define<any>({
  tag: 'cam-theme-colors',
  colors: {
    set: (host, val = '') => val.split(/\s+/),
  },
  render: ({ colors }) => html`
    ${colors.map(
      (color) => html`
        <label>${color}</label>
        ${range(9).map((_, i) => html` <cam-swatch value="var(${`--${color}-${i + 1}00`})" hide-label></cam-swatch>`)}
      `
    )}
  `.css`
    :host {
      display: grid;
      grid-template-rows: repeat(${colors.length}, 40px);
      grid-template-columns: 1fr repeat(9, 40px);
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0;
    }
    cam-swatch {
      border-radius: 0.5rem;
      overflow: hidden;
    }
  `,
})
