import {Hybrids, define, html, dispatch} from 'hybrids'
import CamEl, {camelRender} from './cam-el'
import styles from './cam-input.styl'

const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

function scrubNumberInput(val, min, max, step, wrap, last) {
	let scrubbed = val
	const parsedVal = (val != null || val !== '') ? parseFloat(val) : 0

	if(!/^$/.test(val) && (min < 0 && max > 0 && val !== '-0')) {
		scrubbed = clamp(parsedVal, min, max)
	}
	if(wrap) {
		const parsedLast = parseFloat(last)
		scrubbed = parsedLast - parsedVal < 0 ?
			(parsedLast >= max) ? min : val :
			(parsedLast <= min) ? max : val
	}

	return [scrubbed, !/^$/.test(val) && val !== scrubbed.toString()]
}

function renderNumber({id, disabled, parsed, min, max, readonly, step, wrap}) {
	const onInput = (host, e) => {
		e.stopPropagation()
		const [value, changed] = scrubNumberInput(e.target.value, min, max, step, wrap, host.dataset.last)
		changed && dispatch(host, 'scrub', {detail: {min, max, input: e.target.value, value}, bubbles: true, composed: true})
		if(!/^$/.test(e.target.value)) {
			if(wrap) host.dataset.last = value
			e.target.value = value
		}
		dispatch(host, 'input', {detail: e.target.value, bubbles: true, composed: true})
	}

	return html`<input id="${id}" part="input" type="number"
		value="${parsed}"
		disabled="${disabled}"
		max="${wrap ? max + step : max}"
		min="${wrap ? min - step : min}"
		readonly="${readonly}"
		step="${step}"
		oninput="${onInput}"/>`
}

function onInput(host, e) {
	e.stopPropagation()
	let detail = e.target.value
	if(host.type === 'checkbox') {
		detail = e.target.checked
	}

	if(host.type === 'radio') {
		detail = e.target.value
		if(e.target.checked) {
			return dispatch(host, 'input', {detail, bubbles: true, composed: true})
		} else {
			return
		}
	}

	dispatch(host, 'input', {detail, bubbles: true, composed: true})
}

function onChange(host, e) {
	e.stopPropagation()
	if(host.type === 'checkbox') return
}

function renderInput(host) {
	const labelled = (input) => !host.label ? input : html`<cam-box flex="flex-start center"
		style="flex: 1 1">
		<label part="label" for="${host.id}">${host.label}</label>
		${input}
	</cam-box>`

	switch (host.type) {
		case 'number': return labelled(renderNumber(host))
		default: return labelled(html`<input id="${host.id}" part="input" type="${host.type}" data-type="${host.type}"
			checked="${host.checked}"
			class="${{toggle: host.toggle}}"
			disabled="${host.disabled}"
			name="${host.name}"
			placeholder="${host.placeholder}"
			size="${host.size}"
			value="${host.parsed}"
			oninput="${onInput}"
			onchange="${onChange}"
		/>`)
	}
}

function parseValue(value, type = 'text') {
	switch(type.toUpperCase()) {
		case 'NUMBER': return (value != null || value !== '') ? parseFloat(value) : 0
		case 'TEXT':
		default: return value.trim()
	}
}

const CamInput: Hybrids<any> = {
	...CamEl,
	checked: false,
	disabled: false,
	id: '',
	label: '',
	max: Infinity,
	min: -Infinity,
	name: '',
	placeholder: '',
	readonly: false,
	size: 10,
	step: 1,
	toggle: false,
	type: 'text',
	value: '',
	wrap: false,
	parsed: ({value, type}) => parseValue(value, type),
	render: camelRender((host) => renderInput(host).style(styles)),
}

define('cam-input', CamInput)
export default CamInput
