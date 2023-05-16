import { listen } from '@auzmartist/hybrids-helpers'
import { CamEl, CamElement } from '@src/cam-el.js'
import { children, define, html } from 'hybrids'
import styles from '@src/cam-select.css?inline'

export interface OptionElement extends CamElement {
  value: string
  _connect: undefined
  _select: (e: MouseEvent | TouchEvent) => void
}
type H = OptionElement

export const CamOption = define<OptionElement>({
  tag: 'cam-option',
  ...CamEl,
  value: '',
  _connect: {
    value: undefined,
    connect: listen((host: H) => ({
      click: host._select,
    })),
  },
  _select: (host) => (e: MouseEvent | TouchEvent) => {
    e.stopPropagation()
    console.log(e, host)
  },
  render: ({ value }) => html`<option value="${value}"><slot></slot></option>`,
})

export interface SelectElement extends CamElement {
  [key: string]: any
  options: OptionElement
}
type S = SelectElement

export const CamSelect = define<SelectElement>({
  tag: 'cam-select',
  options: children(CamOption),
  render: (host: S) =>
    html`<div class="select">
      <select></select>
      <slot></slot>
    </div>`.style(styles),
})
