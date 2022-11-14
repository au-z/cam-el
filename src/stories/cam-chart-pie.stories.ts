import { html } from 'lit-html'
import '../cam-chart-pie'

export default {
  title: 'cam-chart-pie',
  component: 'cam-chart-pie',
}

const Template = (args) => html`<div>
  <cam-chart-pie></cam-chart-pie>
</div> `

export const Default = Template.bind({})
Default.args = {
  h: Math.round(Math.random() * 360),
  s: Math.round(Math.random() * 100),
  l: Math.round(Math.random() * 100),
  a: Math.random(),
}
