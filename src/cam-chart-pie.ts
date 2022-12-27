import { define, html } from 'hybrids'
import { cssVar } from '@auzmartist/hybrids-helpers'
import '@src/cam-vas'

export interface ChartPieElement extends HTMLElement {
  [key: string]: any
}
type H = ChartPieElement

export const CamChartPie = define<H>({
  tag: 'cam-chart-pie',
  width: {
    set: (host, val = 200) => val,
    observe: cssVar('--cam-chart-pie-w', (x) => `${x}px`),
  },
  height: {
    set: (host, val = 200) => val,
    observe: cssVar('--cam-chart-pie-h', (y) => `${y}px`),
  },
  canvas: {
    get: ({ render }) => render().querySelector('#canvas'),
    observe: ({ width, height }, canvas) => {
      drawChart(canvas, {
        width,
        height,
        data: [
          { value: '1', count: 10 },
          { value: '2', count: 12 },
          { value: '3', count: 8 },
        ],
        colors: {
          '1': 0xff8833,
          '2': 0x8822ff,
          '3': 0x22ffaa,
        },
      })
    },
  },
  render: () => html`<cam-vas id="canvas"></cam-vas>`.css`
  :host {
    display: block;
    width: var(--cam-chart-pie-w);
    height: var(--cam-chart-pie-h);
    border: 1px solid #aaa;
    border-radius: 1rem;
  }
  cam-vas {
    height: 100%;
  }`,
})

function drawChart(canvas, { width, height, data, colors }) {
  const total = data.reduce((sum, { count }) => (sum += count), 0)

  canvas.draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    const theta = (Math.PI * 2) / data
    let startAngle = 0
    data.forEach((d) => {
      console.log((startAngle * 180) / Math.PI, ((startAngle + theta) * 180) / Math.PI)
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 2 - 4, 0, Math.PI / 8)
      ctx.fillStyle = `#${Number(colors[d.toString()]).toString(16)}`
      ctx.fill()
      startAngle += theta
    })
  }
}
