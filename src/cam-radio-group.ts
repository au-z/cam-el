import { define, html, children, dispatch } from 'hybrids'
import { InputElement } from './cam-input'

function onInput(host, e) {
  e.stopPropagation()
  const value = e.target.value
  host.value = value
  host.inputs.forEach((input) => (input.checked = input.value === value))
  dispatch(host, 'update', { detail: { name: host.name, value }, bubbles: true, composed: true })
}

export interface RadioGroupElement extends HTMLElement {
  name: string
  inputs: InputElement[]
  value: string
  root: ShadowRoot
}
type H = RadioGroupElement

export const CamRadioGroup = define<RadioGroupElement>({
  tag: 'cam-radio-group',
  name: '',
  value: '',
  inputs: children((el) => el.tag === 'cam-input'),
  root: {
    get: (host: H & { render: () => ShadowRoot }) => host.render(),
    observe: (host: H, val: ShadowRoot) =>
      host.inputs.forEach((input: InputElement) => {
        input.name = host.name
        input.addEventListener('input', onInput.bind(null, host))
      }),
  },
  render: () =>
    html`<slot></slot>`.style(`
		:host {
			display: inherit;
		}
	`),
})
