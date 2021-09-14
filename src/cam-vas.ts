import { define, html } from "hybrids"
import { propertyFn } from "./utils"

const CamVas = {
	tag: 'cam-vas',
	canvas: {
		get: ({render}) => render().querySelector('canvas'),
		connect: (host) => {
			const resize = (e) => host.resize(host.clientWidth, host.clientHeight)
			host.addEventListener('resize', resize)
			setTimeout(() => {
				host.resize(host.clientWidth, host.clientHeight)
			})
			host.run()

			return () => {
				host.removeEventListener('resize', resize)
			}
		},
	},
	ctx: ({canvas}) => canvas.getContext('2d'),
	draw: propertyFn((ctx: CanvasRenderingContext2D) => {}),
	throttle: 0,
	run: (host) => () => {
		if(host.throttle != null) {
			setTimeout(host.run, host.throttle)
		} else {
			requestAnimationFrame(() => host.run())
		}
		host.wipe()
		host.draw && host.draw(host.ctx)
	},
	wipe: ({canvas, ctx}) => () => ctx.clearRect(0, 0, canvas.width, canvas.height),
	resize: ({canvas}) => (w, h) => {
		canvas.width = w
		canvas.height = h
	},
	render: (host) => html`
		<slot></slot>
		<canvas part="canvas" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"></canvas>
		<style>
			:host {
				position: relative;
			}
			canvas {
				z-index: -1;
			}
		</style>
	`
}

define('cam-vas', CamVas)
export default CamVas