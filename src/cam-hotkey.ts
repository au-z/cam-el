import {define, html, property} from 'hybrids'
import Mousetrap from 'mousetrap'

const CamHotkey = {
	bindings: {
		...property({}),
		observe: (host, bindings) => {
			Object.entries(bindings).forEach(([keys, fn]) => {
				host.mousetrap.bind(keys, (e) => (fn as Function)(e))
			})
		},
	},
	mousetrap: ({render}) => Mousetrap(render().host),
	render: () => html`<slot></slot>`,
}
define('cam-hotkey', CamHotkey)
export default CamHotkey