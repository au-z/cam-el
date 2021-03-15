import { property, html, Hybrids, define } from 'hybrids'
import {hsl_rgb, rgb_hex, rgb_hsl} from './lib/color'

const CamSwatch: Hybrids<any> = {
	h: property(0),
	s: property(0),
	l: property(0),
	r: property(0),
	g: property(0),
	b: property(0),
	a: property(1),
	hideLabel: false,
	hex: property('000000'),

	color: ({type, h, s, l, r, g, b, hex}) => {
		if(type === 'hsl') {
			hex = rgb_hex(hsl_rgb([h, s, l]))
			return `hsl(${h}, ${s}%, ${l}%)`
		} else if (type === 'rgb') {
			hex = rgb_hex([r, g, b])
			return `rgb(${r}, ${g}, ${b})`
		} else {
			return `#${hex}`
		}
	},

	type: ({h, s, l, r, g, b, hex}) => {
		if(l !== 0 && r === 0 && g === 0 && b === 0 && hex === '000000') return 'hsl'
		else if ((r !== 0 || g !== 0 || b !== 0) && hex === '000000' && l === 0) return 'rgb'
		else if (hex !== '000000') return 'hex'
	},

	calcHex: ({type, h, s, l, r, g, b, hex}) => {
		if(type === 'hsl') return rgb_hex(hsl_rgb([h / 360, s / 100, l / 100]))
		else if(type === 'rgb') return rgb_hex([r, g, b])
		else if(type === 'hex') return hex
		else return '000000'
	},

	textColor: ({type, h, s, l, r, g, b, a}) => {
		if(type === 'hsl') return `hsl(${h}, ${s / 2}%, ${(l + 61) % 100 * a}%)`
		if(type === 'rgb') {
			const [h, s, l] = rgb_hsl([r, g, b])
			return `hsl(${h * 360}, ${s * 50}%, ${(l * 100 + 61) % 100 * a}%)`
		}
		if(type === 'hex') return `black`
	},

	render: ({a, calcHex, color, textColor, hideLabel}) => html`
		<div part="swatch" style="color: ${textColor};">
			<div class="transparent-bg"></div>
			<div class="swatch"></div>

			${!hideLabel && html`<span part="label">${calcHex.toUpperCase()}</span>`}
			<slot></slot>
		</div>
		<style>
		div {
			position: relative;
			min-width: 40px;
			min-height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			z-index: 0;
		}

		.transparent-bg,
		.swatch {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: -1;
		}
		.transparent-bg {
			background: #fff;
			background-image: linear-gradient(45deg, #f6f6f6 25%, transparent 25%), linear-gradient(-45deg, #f6f6f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f6f6f6 75%), linear-gradient(-45deg, transparent 75%, #f6f6f6 75%);
			background-size: 16px 16px;
			background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
			z-index: -2;
		}
		.swatch {
			background: ${color};
			opacity: ${a};
		}

		span {
			font-family: var(--cam-font);
			padding: 4px 12px;
			font-size: 1rem;
			opacity: 0.6;
			letter-spacing: 0.15rem;
		}
		cam-input::part(input) {
			color: ${textColor};
		}
		</style>
	`,
}

define('cam-swatch', CamSwatch)
export default CamSwatch