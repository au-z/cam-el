import {Hybrids, define, html} from 'hybrids'

const CamBox: Hybrids<any> = {
	container: false,
	dir: '',
	flex: '',
	item: false,
	inline: false,
	m: '0',
	p: '0',
	px: ({p}) => p.split(' ').length > 1 ? parseInt(p.split(' ')[0]) : parseInt(p),
	py: ({p}) => p.split(' ').length > 1 ? parseInt(p.split(' ')[1]) : parseInt(p),
	mx: ({m}) => m.split(' ').length > 1 ? parseInt(m.split(' ')[0]) : parseInt(m),
	my: ({m}) => m.split(' ').length > 1 ? parseInt(m.split(' ')[1]) : parseInt(m),
	justify: ({flex}) => flex.split(' ')?.[0],
	align: ({flex, justify}) => flex.split(' ')?.[1] || justify,
	render: ({mx, my, px, py, flex, inline, justify, align, dir}) => html`
	<div class="box" part="box">
		<slot></slot>
	</div>
	<style>
		.box {
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
