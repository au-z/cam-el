import { html, define } from 'hybrids'
import Mousetrap from 'mousetrap'
import { hsl_rgb, rgb_hex, rgb_hsl } from '@src/lib/color.js'
import styles from '@src/cam-swatch.css?inline'

export interface SwatchElement extends HTMLElement {
  r: number
  g: number
  b: number
  h: number
  s: number
  l: number
  a: number
  hideLabel: boolean
  hex: string
  value: string

  // non-input
  color: string
  type: string
  calcHex: string
  textColor: string
}
type H = SwatchElement

export const CamSwatch = define<SwatchElement>({
  tag: 'cam-swatch',
  h: { set: (host, val = Infinity) => val },
  s: { set: (host, val = Infinity) => val },
  l: { set: (host, val = Infinity) => val },
  r: { set: (host, val = Infinity) => val },
  g: { set: (host, val = Infinity) => val },
  b: { set: (host, val = Infinity) => val },
  a: { set: (host, val = 1) => val },
  value: '',
  hideLabel: false,
  hex: '000000',

  color: ({ type, h, s, l, r, g, b, hex, value }: H) => {
    if (type === 'css') {
      return value
    }
    if (type === 'hsl') {
      hex = rgb_hex(hsl_rgb([h, s, l]))
      return `hsl(${h}, ${s}%, ${l}%)`
    } else if (type === 'rgb') {
      hex = rgb_hex([r, g, b])
      return `rgb(${r}, ${g}, ${b})`
    } else {
      return `#${hex}`
    }
  },

  type: ({ h, s, l, r, g, b, value, hex }: H) => {
    if (!!value) return 'css'
    if ([r, g, b].every((c) => !isNaN(c) && c !== Infinity)) return 'rgb'
    else if ([h, s, l].every((c) => !isNaN(c) && c !== Infinity)) return 'hsl'
    else if (hex !== '000000') return 'hex'
  },

  calcHex: ({ type, h, s, l, r, g, b, hex }: H) => {
    if (type === 'hsl') return rgb_hex(hsl_rgb([h / 360, s / 100, l / 100]))
    else if (type === 'rgb') return rgb_hex([r, g, b])
    else if (type === 'hex') return hex
    else return '000000'
  },

  textColor: ({ type, h, s, l, r, g, b, a }: H) => {
    if (type === 'hsl') return `hsl(${h}, ${s / 2}%, ${((l + 61) % 100) * a}%)`
    if (type === 'rgb') {
      const [h, s, l] = rgb_hsl([r, g, b])
      return `hsl(${h * 360}, ${s * 50}%, ${((l * 100 + 61) % 100) * a}%)`
    }
    if (type === 'hex') return `black`
  },

  render: ({ a, calcHex, color, textColor, hideLabel }: H) =>
    html`
      <div
        class="cam-swatch"
        part="swatch"
        onmouseover="${bindShortcuts}"
        onmouseout="${unbindShortcuts}"
        title="Ctrl+C to Copy"
      >
        <div class="transparent-bg"></div>
        <div class="swatch"></div>

        ${!hideLabel && html` <span part="label" style="${{ color: textColor }}">${calcHex.toUpperCase()}</span> `}
        <slot></slot>
      </div>
    `.css`
      .swatch {
        background: ${color};
        opacity: ${a};
      }

      cam-input::part(input) {
        color: ${textColor};
      }
  `.style(styles),
})

function bindShortcuts(host, e) {
  Mousetrap.bind('mod+c', () => copySwatchColor(host))
}

function unbindShortcuts(host, e) {
  Mousetrap.unbind('mod+c')
}

function copySwatchColor(host) {
  const hex = host.calcHex.toUpperCase()
  navigator.clipboard.writeText(hex).then(
    () => {},
    () => {
      console.error('[cam-swatch] could not copy swatch.')
    }
  )
}
