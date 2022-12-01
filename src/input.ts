import { define, html, dispatch } from 'hybrids'
import styles from './input.css'
import { Gridable, gridableCSS, GridableElement } from './grid.js'
import { THEME } from './theme/theme.js'
import { Zing } from './zing/Zing.js'

const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

const Scrub = {
  number: (val: string, { min, max, step, wrap, last }): [number, boolean] => {
    let scrubbed: number = parseFloat(val)
    const parsedVal = val != null || val !== '' ? parseFloat(val) : 0

    if (!/^$/.test(val) && min < 0 && max > 0 && val !== '-0') {
      scrubbed = clamp(parsedVal, min, max)
    }
    if (wrap) {
      const parsedLast = parseFloat(last)
      scrubbed = parsedLast - parsedVal < 0 ? (parsedLast >= max ? min : val) : parsedLast <= min ? max : val
    }

    return [scrubbed, !/^$/.test(val) && val !== scrubbed.toString()]
  },
}

const Z = Zing('cam-input').theme(THEME)

const inputStyles = `
input[data-type='text'],
input[data-type='email'],
input[data-type='password'],
input[type='number'],
input[type='checkbox'],
input[type='radio'] input[type='range'] {
  ${Z.get(({ theme }) => ({
    height: '24px',
    background: 'red !important',
  }))}
}
`

export interface InputElement extends GridableElement {
  autosize: boolean
  autosized: number
  checked: boolean
  disabled: boolean
  id: string
  maxlength: number
  min: number
  max: number
  placeholder: string
  readonly: boolean
  size: number
  name: string
  showSlot: boolean
  step: number
  toggle: boolean
  type: string
  value: any
  wrap: boolean
  parsed: string
}
type H = InputElement

export const CamInput = define<InputElement>({
  tag: 'cam-input',
  ...Gridable,
  autosize: false,
  autosized: ({ autosize, value }: H) => value.length * 0.5 + 1,
  checked: false,
  disabled: false,
  maxlength: Infinity,
  name: '',
  max: Infinity,
  min: -Infinity,
  placeholder: '',
  readonly: false,
  size: 8,
  showSlot: false,
  step: 1,
  toggle: false,
  type: 'text',
  value: '',
  wrap: false,
  parsed: ({ value, type }: H) => parseValue(value, type),
  render: (h: H) =>
    renderInput(h).css`
      :host {
        ${gridableCSS(h)}
      }
      ${inputStyles}
  `.style(styles),
})

function onRadioInput(host, e) {
  if (!e.target.checked) return
  host.value = e.target.value
  return dispatch(host, 'update', { detail: host.value, bubbles: true, composed: true })
}

function onInput(host, e) {
  if (host.type === 'radio') return onRadioInput(host, e)

  host.value = e.target.value
  if (host.type === 'checkbox') {
    host.value = e.target.checked
    const detail = host.value.toLowerCase() === 'true'
    dispatch(host, 'update', { detail, bubbles: true })
  } else {
    dispatch(host, 'update', { detail: host.value, bubbles: true, composed: true })
  }
}

function onChange(host, e) {
  if (host.type === 'checkbox') return
}

function renderNumber(host) {
  const { min, max, step, wrap } = host

  const onInput = (host, e) => {
    const [value, changed] = Scrub.number(e.target.value, { min, max, step, wrap, last: host.dataset.last })
    changed &&
      dispatch(host, 'scrub', { detail: { min, max, input: e.target.value, value }, bubbles: true, composed: true })
    if (!/^$/.test(e.target.value)) {
      if (wrap) host.dataset.last = value
      e.target.value = value
      host.value = value
    }

    dispatch(host, 'update', { detail: value, bubbles: true, composed: true })
  }

  return html`<input
    id="${host.id}"
    part="input"
    type="number"
    value="${host.parsed}"
    disabled="${host.disabled}"
    max="${wrap ? max + step : max}"
    min="${wrap ? min - step : min}"
    readonly="${host.readonly}"
    step="${step}"
    oninput="${onInput}"
    size="${host.size}"
    maxlength="${host.maxlength}"
    style="${{ width: host.autosize ? `${host.autosized}em` : 'auto' }}"
  />`
}

function renderRange({ id, disabled, parsed, min, max, step, readonly }) {
  const onInput = (host, e) => {
    dispatch(host, 'update', { detail: e.target.value, bubbles: true, composed: true })
  }

  return html`<input
    id="${id}"
    part="input"
    type="range"
    value="${parsed}"
    disabled="${disabled}"
    max="${max}"
    min="${min}"
    readonly="${readonly}"
    step="${step}"
    oninput="${onInput}"
  />`
}

function renderInput(host) {
  const slotted = (input) =>
    !host.showSlot
      ? input
      : html`
          <cam-box flex="flex-start center">
            <slot></slot>
            ${input}
          </cam-box>
        `

  switch (host.type) {
    case 'number':
      return slotted(renderNumber(host))
    case 'range':
      return slotted(renderRange(host))
    default:
      return slotted(html`
        <input
          id="${host.id}"
          part="input"
          type="${host.type}"
          data-type="${host.type}"
          checked="${host.checked}"
          class="${{ toggle: host.toggle }}"
          disabled="${host.disabled}"
          placeholder="${host.placeholder}"
          size="${host.size}"
          maxlength="${host.maxlength}"
          value="${host.parsed}"
          oninput="${onInput}"
          onchange="${onChange}"
        />
        <style>
          input {
            width: ${host.autosized}em;
          }
        </style>
      `)
  }
}

function parseValue(value, type = 'text') {
  switch (type.toUpperCase()) {
    case 'NUMBER':
    case 'RANGE':
      return value != null || value !== '' ? parseFloat(value) : 0
    case 'TEXT':
    default:
      return value.trim()
  }
}
