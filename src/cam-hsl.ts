import { html, dispatch, define } from 'hybrids'
import '@src/cam-box.js'
import '@src/input.js'
import '@src/swatch.js'
import { hex_rgb, hsl_rgb, parseColor, rgb_hex, rgb_hsl } from '@src/lib/color.js'
import { Color } from 'three'

import styles from '@src/cam-hsl.css?inline'

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
  color: ({ h, s, l }) => parseColor(`hsl(${h}, ${s}%, ${l}%)`),
  hsl: ({ color }) => color.getHSL(new Color()),
  labelColor: ({ color, hsl }) =>
    color.clone().offsetHSL(0, -hsl.s + hsl.s * 0.3, hsl.l > 0.5 ? -hsl.l + hsl.l * 0.2 : 1 - hsl.l - hsl.l * 0.5),
  alpha: false,
  render: ({ h, s, l, a, alpha, labelColor }) =>
    html` <div class="cam-hsl">
      <cam-swatch part="swatch" value="${`hsl(${h}, ${s}%, ${l}%)`}" a="${a}" display="none">
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
    </div>`.css`
      cam-input {
        --color: #${labelColor.getHexString()};
      }
    `.style(styles),
})
