import { define, html, children } from 'hybrids'
import styles from './field.css?inline'
export interface CamField extends HTMLElement {
  [key: string]: any
}

type H = CamField

export const CamField = define<H>({
  tag: 'cam-field',
  input: children((el) => el.tagName === 'INPUT')?.[0],
  _listeners: {
    get: ({ input }) => input,
    observe: (host, input) => {
      if (!input) return
      input.addEventListener('input', (e) => {
        console.log('input', e)
      })
      input.addEventListener('change', (e) => {
        console.log('change', e)
      })
    },
  },
  label: children((el) => el.tagName === 'LABEL')?.[0],
  render: (h: H) => html`<slot></slot>`.style(styles),
})
