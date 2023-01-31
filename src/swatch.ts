import { html, define } from 'hybrids'
import Mousetrap from 'mousetrap'
import styles from '@src/swatch.css?inline'
import { Color } from 'three'
import { parseColor } from './lib/color.js'

export interface SwatchElement extends HTMLElement {
  value: string
  display: 'hex' | 'rgb' | 'hsl' | 'none'
  color: Color
  hsl: ReturnType<Color['getHSL']>
  label: string
  labelColor: Color
}
type H = SwatchElement

export const CamSwatch = define<SwatchElement>({
  tag: 'cam-swatch',
  value: '',
  color: ({ value }) => parseColor(value),
  display: 'hex',
  hsl: ({ color }) => color.getHSL(new Color()),
  label: ({ color, hsl, display }) => {
    switch (display) {
      case 'hex':
        return `#${color.getHexString()}`
      case 'rgb':
        return `rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)})`
      case 'hsl':
        return `hsl(${Math.round(hsl.h * 360)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`
      case 'none':
        return ''
    }
  },
  labelColor: ({ color, hsl }: H) =>
    color.clone().offsetHSL(0, -hsl.s + hsl.s * 0.3, hsl.l > 0.5 ? -hsl.l + hsl.l * 0.2 : 1 - hsl.l - hsl.l * 0.5),
  render: (h: H) =>
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

        <br />
        ${h.display !== 'none' && html`<span part="label">${h.label}</span>`}
        <slot></slot>
      </div>
    `.css`
      .swatch {
        background: #${h.color.getHexString()};
        opacity: 1;
      }

      span {
        color: #${h.labelColor.getHexString()};
      }
  `.style(styles),
})

function bindShortcuts(host, e) {
  Mousetrap.bind('mod+c', () => copySwatchColor(host))
}

function unbindShortcuts(host, e) {
  Mousetrap.unbind('mod+c')
}

function copySwatchColor(host: H) {
  navigator.clipboard.writeText(host.label).then(
    () => {},
    () => {
      console.error('[cam-swatch] could not copy swatch.')
    }
  )
}
