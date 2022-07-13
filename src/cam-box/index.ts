import {define, html} from 'hybrids'
import CamEl from '../cam-el'

export const CamBox = define<any>({
	tag: 'cam-box',
	...CamEl,
	dir: '',
	flex: 'flex-start flex-start',
	wrap: '',
	inline: false,
	prop: {
		get: (host, val = []) => val,
		set: (host, val) => val,
	},
	justify: ({flex}) => flex.split(' ')?.[0],
	align: ({flex, justify}) => flex.split(' ')?.[1] || justify,
	render: ({flex, inline, justify, align, dir, wrap, _mx, _my, _px, _py}) => html`
		<slot></slot>
	`.css`
		:host {
			display: ${flex ? (inline ? 'inline-flex' : 'flex') : (inline ? 'inline-block' : 'block')};
			${justify && `justify-content: ${justify};`}
			${align && `align-items: ${align};`}
			${dir && `flex-direction: ${dir};`}
			${wrap && `flex-wrap: ${wrap};`}
			box-sizing: border-box;
			margin: calc(${_mx} * var(--cam-unit, 8px)) calc(${_my} * var(--cam-unit, 8px));
			padding: calc(${_px} * var(--cam-unit, 8px)) calc(${_py} * var(--cam-unit, 8px));
		}
	`,
})
