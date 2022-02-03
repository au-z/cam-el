import { html } from 'lit-html'
import '../cam-swatch.js'

export default {
  title: 'cam-swatch',
  component: 'cam-swatch',
  parameters: {
    actions: {
      handles: ['update'],
    },
  },
}

const Template = (args) => html`<div>
  <cam-swatch
    .hideLabel="${args.hideLabel}"
    .r="${args.r}"
    .g="${args.g}"
    .b="${args.b}"
    .h="${args.h}"
    .s="${args.s}"
    .l="${args.l}"
    .a="${args.a}"
    .hex="${args.hex}"
  ></cam-swatch>
</div> `

export const RGB = Template.bind({})
RGB.args = {
  r: Math.round(Math.random() * 255),
  g: Math.round(Math.random() * 255),
  b: Math.round(Math.random() * 255),
  a: Math.random().toFixed(2),
}

export const HSL = Template.bind({})
HSL.args = {
  h: Math.round(Math.random() * 360),
  s: Math.round(Math.random() * 100),
  l: Math.round(Math.random() * 100),
  a: Math.random().toFixed(2),
}

export const hex = Template.bind({})
hex.args = {
  hex: Math.floor(Math.random() * 16777215).toString(16),
}

export const hideLabel = Template.bind({})
hideLabel.args = {
  ...HSL.args,
  a: 1,
  hideLabel: true,
}
