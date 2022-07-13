import { define, html } from "hybrids"
import { getset, propertyFn } from "./utils"

const CamVas = define<any>({
	tag: 'cam-vas',
	context: '2d',
	options: getset({}),
	canvas: {
		get: ({render}) => render().querySelector('canvas'),
		connect: (host) => {
			const resize = (e) => host.resize(host.clientWidth, host.clientHeight)
			host.addEventListener('resize', resize)

			setTimeout(() => {
				// console.log('RESIZE', host.clientWidth, host.clientHeight)
				host.resize(host.clientWidth, host.clientHeight)
			}, 800)
			host.run()

			return () => {
				host.removeEventListener('resize', resize)
			}
		},
	},
	ctx: ({canvas, context, options}) => canvas.getContext(context, options),
	draw: propertyFn((ctx) => {}),
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
	wipe: ({canvas, context, ctx}) => () => {
		if(context === '2d') ctx.clearRect(0, 0, canvas.width, canvas.height)
		else if(context === 'webgl') ctx.clear(ctx.DEPTH_BUFFER_BIT | ctx.COLOR_BUFFER_BIT)
	},
	resize: ({canvas}) => (w, h) => {
		canvas.width = w
		canvas.height = h
	},
	render: (host) => html`
		<slot></slot>
		<canvas part="canvas" style="position: absolute; left: 0; top: 0;"></canvas>
		<style>
			:host {
				position: relative;
				display: block;
			}
			canvas {
				z-index: -1;
			}
		</style>
	`
})

export default CamVas