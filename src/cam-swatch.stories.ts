import { html } from 'lit-html'
import CamSwatch from './cam-swatch'

export default {
  title: 'cam-swatch',
  decorators: [(story) => html`<div>${story()}</div>`],
  components: { CamSwatch },
  parameters: {
    actions: {
      handles: ['update'],
    },
  },
}

const Template = (args) => html`
  <cam-swatch .r="${args.r}" .g="${args.g}" .b="${args.b}" .hideLabel="${args.hideLabel}"></cam-swatch>
`

export const Default = Template.bind({})
Default.args = {
  r: Math.round(Math.random() * 255),
  g: Math.round(Math.random() * 255),
  b: Math.round(Math.random() * 255),
  a: 1,
  // hideLabel: true,
}
