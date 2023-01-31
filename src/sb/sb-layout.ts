import { define, html, parent, dispatch } from 'hybrids'
import { set } from '@auzmartist/hybrids-helpers'
import '../button.js'
import '../collapse.js'
import '../input.js'
import '../cam-box.js'
import '../grid.js'
import styles from './sb-layout.css?inline'

export interface SbLayoutElement extends HTMLElement {
  [key: string]: any
}

type H = SbLayoutElement

export const SbLayout = define<H>({
  tag: 'sb-layout',
  manifest: set({}, (host, val) => val),
  // prettier-ignore
  components: (h) => Array.from(h.children)
    .filter((child: Element) => !['logo'].includes(child.slot))
    .map((element: Element & {slot?: string}) => {
      const name = element.slot
      const tests = h.manifest[name]?.tests
      return { name, tests, element }
    }),
  selected: {
    value: '',
    connect: (host, key) => {
      const pathname = window.location.pathname.split('/').splice(1)
      host[key] = pathname[0]
      const config = host.manifest[host[key]]
      if (pathname[1]) {
        //
        host.selectTest(host[key], config?.tests.find((t) => t.name === pathname[1]).props)
      }
    },
  },
  component: ({ components, selected }) => components?.find((c) => c.name === selected)?.element,
  // prettier-ignore
  setProperty: ({component}) => (property, value) => component[property] = value,
  // prettier-ignore
  setAttribute: ({component}) => (property, value) => component?.setAttribute(property, value),
  // prettier-ignore
  onControlUpdate: ({setProperty}) => (host, e) => {
    setProperty(e.detail.name, e.detail.value)
  },
  // prettier-ignore
  selectTest: (host) => (name, props) => {
    host.selected = name
    // host.component = host.component?.cloneNode(true)
    Object.entries(props).forEach(([prop, value]) => host.component[prop] = value)
  },
  // prettier-ignore
  render: (h: H) => html`<route-r>
    <cam-grid class="layout" grid="auto 1fr, auto">
      <cam-box class="navbar" direction="column">
        <route-a href="/"><cam-box flex="center"><slot name="logo"></slot></cam-box></route-a>
        ${h.render_nav}
      </cam-box>
      <cam-grid class="content" grid="100%, auto 1fr auto">
        <cam-grid class="toolbar" flow="column" gap="0.5rem" p="1" items="flex-end">
          ${h.render_tools}
        </cam-grid>
        <cam-box class="main" flex="center">
          ${h.components ? h.components.map((c) => html`
            <route-n path="/${c.name}">
              <slot name="${c.name}"></slot>

              ${c.tests?.map((test) => html`
                <route-n path="/${test.name}"></route-n>
              `)}
            </route-n>
          `) : html`
            <slot></slot>
          `}
        </cam-box>
        <sb-controls class="controls" config="${h.manifest[h.selected]}"
          onupdate="${h.onControlUpdate}"></sb-controls>
      </cam-grid>
    </cam-grid>
  </route-r>
  `.style(styles),
  // prettier-ignore
  render_nav: (h: H) => html`<nav><ul>
    ${h.components.map((c) => html`<li><cam-collapse open="${h.selected === c.name}">
      <route-a href="/${c.name}"
      onclick="${h.selectTest.bind(null, c.name, {})}">
        <cam-button type="ghost">${c.name}</cam-button>
      </route-a>

      ${c.tests && html`<ul class="tests" slot="more">
        ${c.tests.map((t) => html`<li><route-a href="/${c.name}/${t.name}"
          onclick="${h.selectTest.bind(null, c.name, t.props)}">
          <small>${t.name}</small>
        </route-a></li>`)}
      </ul>`}
    </cam-collapse>
    </li>`)}
  </ul></nav>`,
  // prettier-ignore
  render_tools: (h: H) => html`
    <cam-button type="tech"><cam-icon>archive</cam-icon></cam-button>
    <cam-button type="tech"><cam-icon>camera</cam-icon></cam-button>
    <cam-button type="tech"><cam-icon>close</cam-icon></cam-button>
    <cam-button type="tech"><cam-icon>fullscreen</cam-icon></cam-button>`,
})

export const SbControls = define<any>({
  tag: 'sb-controls',
  config: set({}, (host, val) => val),
  sandbox: parent(SbLayout),
  component: ({ sandbox }) => sandbox.component,
  // prettier-ignore
  render: (h) => html`<cam-grid>
    ${Object.entries(h.config.props ?? {}).map(([name, prop]) => html`<cam-grid class="prop" grid="5rem 1fr, auto" gap="1rem" items="flex-start, center">
      <label>${name}</label> ${h.render_control(name, prop)}
    </cam-box>`)}
  </cam-grid>`.css`
    .prop {
      background: rgba(100, 100, 100, 0.1);
      margin: 0.1rem 0;
      padding: 0.2rem 1rem;
    }
  `,
  render_control: (h) => (name, prop) =>
    html`<cam-box class="control">
      <cam-input
        type="${prop?.input?.type ?? 'text'}"
        min="${prop?.input?.min}"
        max="${prop?.input?.max}"
        step="${prop?.input?.step ?? 1}"
        value="${h.component[name]}"
        toggle="${prop?.input?.type === 'checkbox'}"
        onupdate="${(host, e) => {
          e.stopPropagation()
          dispatch(host, 'update', { detail: { name, value: e.detail }, bubbles: true, composed: true })
        }}"
        size="${30}"
      ></cam-input>
    </cam-box>`,
})
