import {define, html, Hybrids} from 'hybrids'

export function Draggable(options?: {absolutePositioning: boolean}) {
	options = {
		absolutePositioning: false,
		...options || {},
	}

	let [x0, y0] = [0, 0]
	let [x1, y1] = [0, 0]
	let [xOffset, yOffset] = [0, 0]
	let dragging = false

	function draggableInit(host) {
		if(options.absolutePositioning) {
			xOffset = parseFloat(/\d+/.exec(host.style.left)[0])
			yOffset = parseFloat(/\d+/.exec(host.style.top)[0])
		}
	}

	function draggableStart(host, e) {
		if(!e) return
		if(e.type === 'touchstart') {
			x0 = e.touches[0].clientX - xOffset;
			y0 = e.touches[0].clientY - yOffset;
		} else {
			x0 = e.clientX - xOffset;
			y0 = e.clientY - yOffset;
		}
		dragging = true
	}

	function draggableEnd(host, e) {
		x0 = x1
		y0 = y1
		dragging = false
	}

	function draggableDrag(host, e) {
		if(!dragging) return
		e.preventDefault()

		if(e.type === 'touchmove') {
			x1 = e.touches[0].clientX - x0
			y1 = e.touches[0].clientY - y0
		} else {
			x1 = e.clientX - x0;
			y1 = e.clientY - y0;
		}

		xOffset = x1
		yOffset = y1

		if(options.absolutePositioning) {
			host.style.left = `${x1}px`
			host.style.top = `${y1}px`
		} else {
			host.style.transform = `translate3d(${x1}px, ${y1}px, 0)`
		}
	}

	return {
		draggableInit,
		draggableStart,
		draggableDrag, 
		draggableEnd,
	}
}

export interface CamDraggable extends HTMLElement {
	draggableStart: () => (host: CamDraggable, e: Event) => void,
	draggableDrag: () => (host: CamDraggable, e: Event) => void,
	draggableEnd: () => (host: CamDraggable, e: Event) => void,
}

const CamDraggable: Hybrids<CamDraggable> = {
	...Draggable(),
	render: (host) => html`<slot
		style="${{cursor: 'pointer'}}"
		onmousedown="${host.draggableStart}"
		ontouchstart="${host.draggableStart}"
		onmousemove="${host.draggableDrag}"
		ontouchmove="${host.draggableDrag}"
		onmouseup="${host.draggableEnd}"
		ontouchend="${host.draggableEnd}"
	></slot>`,
}

define('cam-draggable', CamDraggable)
export default CamDraggable