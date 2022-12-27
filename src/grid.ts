import { set } from '@auzmartist/hybrids-helpers'
import { define, html } from 'hybrids'
import { CamEl, camelCSS, CamElement } from '@src/cam-el.js'

export const Gridable = {
  ...CamEl,
  grid: set('', (host: H, val) => val.split(/,\s*/)),
  columns: set('', ({ grid }: H, val) => val || grid[0] || 'unset'),
  rows: set('', ({ grid }: H, val) => val || grid[1] || grid[0] || 'unset'),
  gap: set('', ({ grid }: H, val) => (!!val.split(/,\s*/)[0] ? val.split(/,\s*/) : [grid[2], grid[3]] || 'initial')),
  columnGap: ({ gap }) => gap[0] || 'unset',
  rowGap: ({ gap }) => gap[1] || gap[0] || 'unset',
  items: set('', (host: H, val = '') => val.split(/,\s*/)),
  justify: ({ items }) => items[0] || 'flex-start',
  align: ({ items, justify }) => items[1] || justify,
  flow: '',
  inline: false,
}

export interface GridableElement extends CamElement {
  grid: string
  items: string
  columns: string
  rows: string
  gap: string
  columnGap: string
  rowGap: string
  justify: string
  align: string
  flow: string
  inline: boolean
}
type H = GridableElement

export const gridable = (h: GridableElement) => `
  display: ${h.inline ? 'inline-grid' : 'grid'};
  grid-auto-flow: ${h.flow || 'initial'};
  grid-template-columns: ${h.columns};
  grid-template-rows: ${h.rows};
  column-gap: ${h.columnGap};
  row-gap: ${h.rowGap};
  justify-content: ${h.justify};
  align-items: ${h.align};
  ${camelCSS(h)}
`

export const Grid = define<H>({
  tag: 'cam-grid',
  ...Gridable,
  render: (h: H) => html`<slot></slot>`.css`
    :host {
      ${gridable(h)}
    }
	`,
})
