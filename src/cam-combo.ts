import {CamElement} from './cam-el'
import {children, html, Hybrids as Component} from 'hybrids'
import { CamOption } from './cam-select'

export interface CamComboElement extends CamElement {
	[key: string]: any,
}

export const CamCombo: Component<CamComboElement> = {
	tag: 'cam-combo',
	value: '',
	label: '',
	placeholder: '',
	options: children(CamOption),
	render: (host) => html`<div class="combo">
		Hello
		<cam-input value="${host.value}"></cam-input>

		<select value="${host.value}" onchange="${onchange}">
			<slot></slot>
		</select>
	</div>`,
}

function onchange(host, e) {
	host.value = e.target ? e.target.value : e.path?.[0].value
}