import { html } from 'lit-html'
import '../cam-hsl.js'

export default {
  title: 'cam-hsl',
  component: 'cam-hsl',
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
}

const Template = (args) => html`<div>
  <cam-hsl .h="${args.h}" .s="${args.s}" .l="${args.l}" .a="${args.a}"></cam-hsl>
</div> `

export const Default = Template.bind({})
Default.args = {
  h: Math.round(Math.random() * 360),
  s: Math.round(Math.random() * 100),
  l: Math.round(Math.random() * 100),
  a: Math.random(),
}
