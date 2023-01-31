import { define, html } from 'hybrids'
import styles from './button.css?inline'
import { Gridable, GridableElement, gridable } from '@src/grid.js'

export interface ButtonElement extends GridableElement, HTMLElement {
  type: 'basic' | 'primary' | 'secondary' | 'tech' | 'ghost'
  [key: string]: any
}

type H = ButtonElement

export const Button = define<H>({
  tag: 'cam-button',
  ...Gridable,
  flow: 'column', // override gridable default flow
  type: 'basic',
  disabled: false,
  render: (h: H) =>
    html`<button class="${h.type}" disabled="${h.disabled}" part="button"><slot></slot></button>`.css`
    button {
      ${gridable(h)}
    }
  `.style(styles),
})
