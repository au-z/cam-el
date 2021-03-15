import {define, html, Hybrids} from 'hybrids'

function Draggable() {
	let [x0, y0] = [0, 0]
	let [x1, y1] = [0, 0]
	let [xOffset, yOffset] = [0, 0]
	let dragging = false

	function start(host, e) {
		if(e.type === 'touchstart') {
			x0 = e.touches[0].clientX - xOffset;
			y0 = e.touches[0].clientY - yOffset;
		} else {
			x0 = e.clientX - xOffset;
			y0 = e.clientY - yOffset;
		}
		dragging = true
	}

	function end(host, e) {
		x0 = x1
		y0 = y1
		dragging = false
	}

	function drag(host, e) {
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

		host.style.transform = `translate3d(${x1}px, ${y1}px, 0)`
	}

	return {
		start: () => start,
		drag: () => drag, 
		end: () => end,
	}
}

export interface CamDraggable extends HTMLElement {
	start: () => (host: CamDraggable, e: Event) => void,
	end: () => (host: CamDraggable, e: Event) => void,
	drag: () => (host: CamDraggable, e: Event) => void,
}

const CamDraggable: Hybrids<CamDraggable> = {
	...Draggable(),
	render: ({start, drag, end}) => html`<slot
		style="${{cursor: 'pointer'}}"
		onmousedown="${start}"
		onmousemove="${drag}"
		onmouseup="${end}"></slot>`,
}

define('cam-draggable', CamDraggable)
export default CamDraggable