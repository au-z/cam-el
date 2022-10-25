import { CamEl, CamElement } from './cam-el'
import { children, define, html } from 'hybrids'
import styles from './cam-select.css'

export interface CamOptionElement extends CamElement {
  value: string
  text: string
}

export const CamOption = define<CamOptionElement>({
  tag: 'cam-option',
  ...CamEl,
  value: '',
  text: '',
  render: ({ value, text }) => html`<option value="${value}">${text ? html`${text}` : html`<slot></slot>`}</option>`,
})

export interface CamSelectElement extends CamElement {
  [key: string]: any
  options: CamOptionElement
}

export const CamSelect = define<CamSelectElement>({
  tag: 'cam-select',
  options: children(CamOption),
  render: () =>
    html`<div class="select">
      <select></select>
      <slot></slot>
    </div>`.style(styles),
})
