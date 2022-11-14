import { set } from '@auzmartist/hybrids-helpers'
import { define, html } from 'hybrids'
import { CamEl, camelCSS, CamElement } from './cam-el.js'

export const Gridable = {
  ...CamEl,
  grid: set('', (host: H, val) => val.split(/,\s*/)),
  columns: set('', ({ grid }: H, val) => val || grid[0] || 'unset'),
  rows: set('', ({ grid }: H, val) => val || grid[1] || grid[0] || 'unset'),
  gap: set('', ({ grid }: H, val) => val || grid[2] || 'initial'),
  items: set('', (host: H, val = '') => val.split(/,\s*/)),
  justify: ({ items }) => items[0] || 'flex-start',
  align: ({ items, justify }) => items[1] || justify,
  flow: 'row',
  inline: false,
}

export interface GridableElement extends CamElement {
  grid: string
  items: string
  columns: string
  rows: string
  gap: string
  justify: string
  align: string
  flow: string
  inline: boolean
}
type H = GridableElement

export const gridableCSS = (h: GridableElement) => `
  display: ${h.inline ? 'inline-grid' : 'grid'};
  grid-auto-flow: ${h.flow || 'initial'};
  grid-template-columns: ${h.columns};
  grid-template-rows: ${h.rows};
  gap: ${h.gap};
  justify-content: ${h.justify};
  align-items: ${h.align};
  ${camelCSS(h)}
`

export const Grid = define<H>({
  tag: 'cam-grid',
  ...Gridable,
  render: (h: H) => html`<slot></slot>`.css`
    :host {
      ${gridableCSS(h)}
    }
	`,
})
