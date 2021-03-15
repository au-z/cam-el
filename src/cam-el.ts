import { Hybrids, html, RenderFunction, render} from "hybrids"

interface CamElement extends HTMLElement {
	m: string,
	p: string,
	_mx: string,
	_my: string,
	_px: string,
	_py: string,
}

const CamEl: Hybrids<CamElement> = {
	m: '0',
	p: '0',
	_mx: ({m}) => m.split(' ').length > 1 ? parseInt(m.split(' ')[0]) : parseInt(m),
	_my: ({m}) => m.split(' ').length > 1 ? parseInt(m.split(' ')[1]) : parseInt(m),
	_px: ({p}) => p.split(' ').length > 1 ? parseInt(p.split(' ')[0]) : parseInt(p),
	_py: ({p}) => p.split(' ').length > 1 ? parseInt(p.split(' ')[1]) : parseInt(p),
}

export function camelRender<E extends CamElement>(
	fn: RenderFunction<E>,
	options?: {shadowRoot?: boolean | object}
) {
	return render<E>((host) => html`
		${fn(host)}
		<style>
			:host {
				box-sizing: border-box;
				margin: calc(${host._mx} * var(--cam-unit, 8px)) calc(${host._my} * var(--cam-unit, 8px));
				padding: calc(${host._px} * var(--cam-unit, 8px)) calc(${host._py} * var(--cam-unit, 8px));
			}
		</style>`, options)
}

export default CamEl
