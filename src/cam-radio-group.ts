import {Hybrids, define, html, children, dispatch} from 'hybrids'
import CamInput from './cam-input'

const onRender = <E extends HTMLElement>(observe: (host: E, root: DocumentFragment) => void) => ({
	get: ({render}) => render(),
	observe
})

function onInput(host, e) {
	e.stopPropagation()
	const value = e.target.value
	host.inputs.forEach((input) => input.checked = input.value === value)
	dispatch(host, 'input', {detail: {name: host.name, value}, bubbles: true, composed: true})
}

const CamRadioGroup: Hybrids<any> = {
	name: '',
	inputs: children(CamInput),
	root: onRender((host, val) => host.inputs.forEach((input) => {
		input.name = host.name
		input.addEventListener('input', onInput.bind(null, host))
	})),
	render: () => html`<slot></slot>`.style(`
		:host {
			display: inherit;
		}
	`)
}

define('cam-radio-group', CamRadioGroup)
export default CamRadioGroup