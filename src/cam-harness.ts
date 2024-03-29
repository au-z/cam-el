import { children, Component, define, html, RenderFunction } from 'hybrids'
import { getset } from '@auzmartist/hybrids-helpers'

export interface HarnessElement extends HTMLElement {
  // input props
  props: { name: string; value: any; type: string }[]
  // event bindings
  bindings: { event: string }[]
  noevents: boolean
  values: Record<string, any>
  innerContent: string
  logs: string[]
  // computed
  slotted: HTMLElement[]
  _slot: HTMLElement
}

type H = HarnessElement

export const CamHarness = define<HarnessElement>({
  tag: 'cam-harness',
  props: {
    ...getset([]),
    // set initial props
    observe: (host: H, props, last) => {
      if (props.length === 0) return
      host.slotted.forEach((el) =>
        props
          .filter((p) => p.value != null)
          .forEach((prop) => {
            if (prop.type === 'innerText') {
              el.innerText = prop.value
            } else {
              el[prop.name] = prop.value
            }
          })
      )
    },
  },
  bindings: getset([]),
  noevents: false,
  values: {
    get: (host, val = {}) => val,
    set: (host, val) => val,
    observe: ({ slotted }: H, values, last) => {
      slotted.forEach((el) =>
        Object.entries(values).forEach(([prop, val]) => {
          el[prop] = val
        })
      )
    },
  },
  innerContent: {
    get: (host, val = '') => val,
    set: (host, val) => val,
    observe: ({ slotted }, content, last) => {
      slotted.forEach((el) => (el.innerText = content))
    },
  },
  logs: {
    get: (_, val = []) => val,
    set: (_, val) => val,
  },
  slotted: children(() => true),
  _slot: {
    get: ({ render }: H & { render: any }) => render().querySelector('slot'),
    observe: (host, slot) => {
      if (!slot) return
      host.bindings.forEach((b) => {
        slot.addEventListener(b.event, (e: CustomEvent) => logEvent(host, b.event, e))
      })
    },
  },
  render: (host: H) => html`
    <cam-box flex="space-evenly center" wrap="wrap"> ${host.props.map((p) => renderProp(host, p))} </cam-box>
    <cam-box class="content" p="1" flex="center center">
      <slot></slot>
    </cam-box>
    ${host.bindings.length > 0 &&
    html` <cam-box p="1" class="logs"> ${host.logs.map((l) => renderLog(host, l))} </cam-box> `}
    <style>
      :host {
        display: inline-block;
        border: 1px solid #cfd3e6;
        border-radius: 0.5rem;
        overflow: hidden;
      }
      .logs {
        max-height: 12rem;
        overflow-y: scroll;
        border-top: 1px solid #cfd3e6;
      }
      .content {
        border-top: 1px solid #cfd3e6;
      }
    </style>
  `,
})

function setValue(obj, property, val) {
  return { ...obj, [property]: val }
}

function renderProp(host, prop) {
  let inputType = 'text'
  switch (prop.type) {
    case 'boolean':
      inputType = 'checkbox'
      break
    default:
      inputType = 'text'
      break
  }
  return html`<cam-box p="1" class="prop">
    <!-- Inner -->
    ${prop.type === 'innerText'
      ? html`
          <cam-input slot value="${prop.value ?? ''}" onupdate="${(_, { detail }) => (host.innerContent = detail)}">
            <label>${prop.name}&nbsp;&nbsp;</label>
          </cam-input>
        `
      : html`
          <cam-input
            type="${inputType}"
            toggle
            slot
            value="${prop.value ?? ''}"
            onupdate="${(_, { detail }) => (host.values = setValue(host.values, prop.name, detail))}"
          >
            <label>${prop.name}&nbsp;&nbsp;</label>
          </cam-input>
        `}
  </cam-box>`
}

function renderLog(host, log) {
  return html`<div class="log">
    <small>${log.event}:&nbsp;&nbsp;</small>
    <span>${JSON.stringify(log.data)}</span>
  </div>`
}

function logEvent(host, event, e: CustomEvent) {
  host.logs = [{ event, data: e.detail, e }, ...host.logs]
}
