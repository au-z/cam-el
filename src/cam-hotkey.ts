import {define, html} from 'hybrids'
import Mousetrap from 'mousetrap'
import { getset } from './utils'

const CamHotkey = define<any>({
	tag: 'cam-hotkey',
	bindings: {
		...getset({}),
		observe: (host, bindings) => {
			Object.entries(bindings).forEach(([keys, fn]) => {
				host.mousetrap.bind(keys, (e) => (fn as Function)(e))
			})
		},
	},
	mousetrap: ({render}) => Mousetrap(render().host),
	render: () => html`<slot></slot>`,
})

export default CamHotkey