import {CamElement} from './cam-el'
import {children, define, html, Hybrids} from 'hybrids'
import styles from './cam-select.css'

export interface CamOptionElement extends CamElement {
	[key: string]: any;
}

export const CamOption: Hybrids<CamOptionElement> = {
	value: '',
	text: '',
	render: ({value, text}) => html`<option value="${value}">
		${text ? html`${text}` : html`<slot></slot>`}
	</option>`
}

export interface CamSelectElement extends CamElement {
	[key: string]: any;
}

export const CamSelect: Hybrids<CamSelectElement> = {
	options: children(CamOption),
	render: () => html`<div class="select">
		<select></select>
		<slot></slot>
	</div>`.style(styles)
}

define('cam-select', CamSelect)
