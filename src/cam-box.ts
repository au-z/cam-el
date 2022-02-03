import { define, html } from 'hybrids'
import { CamEl, CamElement, CamElStyles } from './cam-el'

export interface BoxElement extends CamElement {
  container: boolean
  direction: string
  flex: string
  item: boolean
  inline: boolean
  wrap: string
  // computed
  justify: string
  align: string
}
type H = BoxElement

export const CamBox = define<BoxElement>({
  tag: 'cam-box',
  ...CamEl,
  container: false,
  direction: 'row', // flex-direction
  flex: '',
  item: false,
  inline: false,
  wrap: '',
  justify: ({ flex }: H) => flex.split(' ')?.[0],
  align: ({ flex, justify }: H) => flex.split(' ')?.[1] || justify,
  render: (host: H) =>
    html`<slot></slot>`.css`
			${CamElStyles(host)}
			:host {
				display: ${host.flex ? (host.inline ? 'inline-flex' : 'flex') : host.inline ? 'inline-block' : 'block'};
				${host.justify && `justify-content: ${host.justify};`}
				${host.align && `align-items: ${host.align};`}
				${host.direction && `flex-direction: ${host.direction};`}
				${host.wrap && `flex-wrap: ${host.wrap};`}
			}
		`,
})
