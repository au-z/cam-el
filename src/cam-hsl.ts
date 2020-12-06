import { property, html, dispatch, Hybrids, define } from 'hybrids'
import CamBox from './cam-box'
import CamInput from './cam-input'
import CamSwatch from './cam-swatch'
import {hsl_rgb, rgb_hex} from './lib/color'

import style from './cam-hsl.styl'

const ref = (defaultVal) => ({
	...property(defaultVal),
	set: (host, value) => value,
})

const CamHsl: Hybrids<any> = {
	h: {
		...ref(190),
		observe: (host, value) => dispatch(host, 'change', {detail: host.hex, bubbles: true}),
	},
	s: {
		...ref(100),
		observe: (host, value) => dispatch(host, 'change', {detail: host.hex, bubbles: true}),
	},
	l: {
		...ref(50),
		observe: (host, value) => dispatch(host, 'change', {detail: host.hex, bubbles: true}),
	},

	hex: ({h, s, l}) => rgb_hex(hsl_rgb([h / 360, s / 100, l / 100])),

	render: ({h, s, l}) => html`<div class="node-hsl">
		<form part="form">
			<cam-input part="input" type="number" value="${h}" min="0" max="360" wrap
				oninput="${(host, e) => host.h = parseInt(e.detail)}"></cam-input>
			<cam-input part="input" type="number" value="${s}" min="0" max="100" wrap
				oninput="${(host, e) => host.s = parseInt(e.detail)}"></cam-input>
			<cam-input part="input" type="number" value="${l}" min="0" max="100" wrap
				oninput="${(host, e) => host.l = parseInt(e.detail)}"></cam-input>
		</form>
		<div class="swatch">
			<cam-swatch part="swatch" h=${h} s=${s} l=${l}></cam-swatch>
		</div>
	</div>

	<style>
	*,*:after,*:before {box-sizing: border-box}

	form {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 4px;
		padding: 4px 8px;
	}
	</style>
	`.define({CamBox, CamInput, CamSwatch}).style(style.toString())
}

define('cam-hsl', CamHsl)
export default CamHsl