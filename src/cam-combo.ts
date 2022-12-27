import { CamElement } from '@src/cam-el.js'
import { children, define, html } from 'hybrids'
import { CamOption } from '@src/cam-select.js'

export interface CamComboElement extends CamElement {
  [key: string]: any
}

export const CamCombo = define<CamComboElement>({
  tag: 'cam-combo',
  value: '',
  label: '',
  placeholder: '',
  options: children(CamOption),
  render: (host) => html`<div class="combo">
    <cam-input value="${host.value}"></cam-input>
    <select value="${host.value}" onchange="${onchange}">
      <slot></slot>
    </select>
  </div>`,
})

function onchange(host, e) {
  host.value = e.target ? e.target.value : e.path?.[0].value
}
