import { define, html } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'
import { propertyFn } from './utils'

export interface CanvasElement extends HTMLElement {
  context: '2d'
  options: CanvasRenderingContext2DSettings
  throttle: 0

  canvas: HTMLCanvasElement
  ctx: ImageBitmapRenderingContext | CanvasRenderingContext2D | WebGLRenderingContext
  draw: (ctx: ImageBitmapRenderingContext | CanvasRenderingContext2D | WebGLRenderingContext) => void
  // // run the animation
  run: () => void
  // // clear the canvas
  wipe: () => void
  resize: (width: number, height: number) => void
}
type H = CanvasElement

export const CamVas = define<CanvasElement>({
  tag: 'cam-vas',
  context: '2d',
  options: getset({}),
  throttle: 0,
  canvas: {
    get: ({ render }: H & { render: () => ShadowRoot }) => render().querySelector('canvas'),
    connect: (host: H) => {
      const resize = (e: any) => host.resize(host.clientWidth, host.clientHeight)
      host.addEventListener('resize', resize)

      setTimeout(() => {
        console.log('RESIZE', host.clientWidth, host.clientHeight)
        host.resize(host.clientWidth, host.clientHeight)
      }, 800)
      host.run()

      return () => {
        host.removeEventListener('resize', resize)
      }
    },
  },
  ctx: ({ canvas, context, options }: H) => canvas.getContext(context, options),
  draw: propertyFn((ctx) => {}),
  run: (host) => () => {
    if (host.throttle != null) {
      setTimeout(host.run, host.throttle)
    } else {
      requestAnimationFrame(() => host.run())
    }
    host.wipe()
    host.draw && host.draw(host.ctx)
  },
  wipe:
    ({ canvas, ctx }: H) =>
    () => {
      if (ctx instanceof CanvasRenderingContext2D) ctx.clearRect(0, 0, canvas.width, canvas.height)
      else if (ctx instanceof WebGLRenderingContext) ctx.clear(ctx.DEPTH_BUFFER_BIT | ctx.COLOR_BUFFER_BIT)
    },
  resize:
    ({ canvas }: H) =>
    (w, h) => {
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
  `,
})
