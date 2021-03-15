import {Hybrids, define, html} from 'hybrids'
import CamEl, { camelRender } from './cam-el'

const CamBox: Hybrids<any> = {
	...CamEl,
	container: false,
	dir: '',
	flex: '',
	item: false,
	inline: false,
	wrap: '',
	justify: ({flex}) => flex.split(' ')?.[0],
	align: ({flex, justify}) => flex.split(' ')?.[1] || justify,
	render: camelRender(({flex, inline, justify, align, dir, wrap}) => html`
		<slot></slot>
		<style>
			:host {
				display: ${flex ? (inline ? 'inline-flex' : 'flex') : (inline ? 'inline-block' : 'block')};
				${justify && `justify-content: ${justify};`}
				${align && `align-items: ${align};`}
				${dir && `flex-direction: ${dir};`}
				${wrap && `flex-wrap: ${wrap};`}
			}
		</style>
	`),
}

define('cam-box', CamBox)
export default CamBox
