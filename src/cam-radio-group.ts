import {Hybrids, define, html, children, dispatch} from 'hybrids'
import {onRender} from './descriptors'
import CamInput from './cam-input'

function onInput(host, e) {
	const value = e.target.value
	host.inputs.forEach((input) => input.checked = input.value === value)
	dispatch(host, 'update', {detail: {name: host.name, value}, bubbles: true, composed: true})
}

const CamRadioGroup: Hybrids<any> = {
	name: '',
	inputs: children(CamInput),
	root: onRender((host: any, val) => host.inputs.forEach((input) => {
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