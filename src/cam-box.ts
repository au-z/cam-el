import {Hybrids, define, html} from 'hybrids'
import CamEl from './cam-el'

const CamBox: Hybrids<any> = {
	...CamEl,
	container: false,
	dir: '',
	flex: '',
	item: false,
	inline: false,
	justify: ({flex}) => flex.split(' ')?.[0],
	align: ({flex, justify}) => flex.split(' ')?.[1] || justify,
	render: ({mx, my, px, py, flex, inline, justify, align, dir}) => html`
	<slot></slot>
	<style>
		:host {
			box-sizing: border-box;
			margin: calc(${mx} * var(--cam-unit, 8px)) calc(${my} * var(--cam-unit, 8px));
			padding: calc(${px} * var(--cam-unit, 8px)) calc(${py} * var(--cam-unit, 8px));
			display: ${flex ? (inline ? 'inline-flex' : 'flex') : (inline ? 'inline-block' : 'block')};
			${justify && `justify-content: ${justify};`}
			${align && `align-items: ${align};`}
			${dir && `flex-direction: ${dir};`}
		}
	<style>`,
}

define('cam-box', CamBox)
export default CamBox
