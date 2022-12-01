import { html, dispatch, define } from 'hybrids'
import './cam-box.js'
import './input.js'
import './cam-swatch.js'
import { hex_rgb, hsl_rgb, rgb_hex, rgb_hsl } from '@src/lib/color.js'

import styles from './cam-hsl.css'

export interface HSLElement extends HTMLElement {
  h: number
  s: number
  l: number
  a: number
  alpha: boolean
  _hex: string
  hex: string
}

function emitChange(host) {
  dispatch(host, 'change', {
    detail: {
      h: host.h,
      s: host.s,
      l: host.l,
      a: host.a,
      hex: host._hex,
    },
    bubbles: true,
    composed: true,
  })
}

export const CamHsl = define<HSLElement>({
  tag: 'cam-hsl',
  h: { value: 0, observe: emitChange },
  s: { value: 100, observe: emitChange },
  l: { value: 50, observe: emitChange },
  a: { value: 1, observe: emitChange },
  alpha: false,
  hex: {
    value: '',
    observe: (host, hex) => {
      if (!hex || hex.length !== 6) return
      const [h, s, l] = rgb_hsl(hex_rgb(hex))
      host.h = Math.round(h * 360)
      host.s = Math.round(s * 100)
      host.l = Math.round(l * 100)
    },
  },
  _hex: ({ h, s, l }) => rgb_hex(hsl_rgb([h / 360, s / 100, l / 100])),

  render: ({ h, s, l, a, alpha }) =>
    html` <div class="cam-hsl">
      <cam-swatch part="swatch" h=${h} s=${s} l=${l} a="${a}" hide-label>
        <cam-box class="container" flex="flex-start">
          <cam-box m="1" flex="flex-start" direction="column">
            <cam-input
              part="hue"
              type="number"
              value="${h}"
              label="Hue"
              min="0"
              max="360"
              wrap
              slot
              onupdate="${(host, e) => (host.h = parseInt(e.detail))}"
            >
              <small title="Hue">H&nbsp;</small>
            </cam-input>
            <cam-input
              part="saturation"
              type="number"
              value="${s}"
              label="Saturation"
              min="0"
              max="100"
              wrap
              slot
              onupdate="${(host, e) => (host.s = parseInt(e.detail))}"
            >
              <small title="Saturation">S&nbsp;</small>
            </cam-input>
            <cam-input
              part="luminance"
              type="number"
              value="${l}"
              label="Luminance"
              min="0"
              max="100"
              wrap
              slot
              onupdate="${(host, e) => (host.l = parseInt(e.detail))}"
            >
              <small title="luminosity">L&nbsp;</small>
            </cam-input>
          </cam-box>
          ${alpha &&
          html`<div class="rot-container">
            <div>
              <cam-input
                class="alpha"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value="${a}"
                onupdate="${(host, e) => (host.a = parseFloat(e.detail))}"
              />
            </div>
          </div>`}
        </cam-box>
      </cam-swatch>
    </div>`.style(styles),
})
