import { html, Hybrids, define } from "hybrids";
import Mousetrap from "mousetrap";
import { hsl_rgb, rgb_hex, rgb_hsl } from "./lib/color";
import styles from './cam-swatch.css';

function copySwatchColor(host) {
  const hex = host.calcHex.toUpperCase();
  navigator.clipboard.writeText(hex).then(
    () => {},
    () => {
      console.error("[cam-swatch] could not copy swatch.");
    }
  );
}

function bindShortcuts(host, e) {
  Mousetrap.bind("mod+c", () => copySwatchColor(host));
}

function unbindShortcuts(host, e) {
  Mousetrap.unbind("mod+c");
}

const CamSwatch: Hybrids<any> = {
  tag: 'cam-swatch',
  h: Infinity, // [0, 360]
  s: Infinity, // [0, 100]
  l: Infinity, // [0, 100]
  r: Infinity,
  g: Infinity,
  b: Infinity,
  a: 1,
  hideLabel: false,
  hex: {
    get: (host, val = '000000') => val,
    set: (host, val) => val,
  },
  var: {
    get: (host, val = '') => val,
    set: (host, val) => val,
    observe: (host, variable) => {
      if(!variable) return
      const value = getComputedStyle(document.documentElement).getPropertyValue(variable)?.trim()
      if(value.startsWith('#')) {
        host.h = Infinity
        host.s = Infinity
        host.l = Infinity
        host.r = Infinity
        host.g = Infinity
        host.b = Infinity
        host.a = Infinity
        host.hex = value.substring(1)
      } else if(value.startsWith('hsl')) {
        const [match, h, s, l, a] = /^hsla?\(\s*(\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([0-9.]+))?\)$/gi.exec(value) ?? []
        if(h != null && s != null && l != null) {
          host.h = h
          host.s = s
          host.l = l
          host.a = a
        }
      } else if(value.startsWith('rgb')) {
        const [match, r, g, b, a] = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)$/gi.exec(value) ?? []
        if(r != null && g != null && b != null) {
          host.r = r
          host.g = g
          host.b = b
          host.a = a
        }
      }
    },
  },

  color: ({ type, h, s, l, r, g, b, hex }) => {
    if (type === "hsl") {
      hex = rgb_hex(hsl_rgb([h, s, l]));
      return `hsl(${h}, ${s}%, ${l}%)`;
    } else if (type === "rgb") {
      hex = rgb_hex([r, g, b]);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      return `#${hex}`;
    }
  },

  type: ({ h, s, l, r, g, b, hex }) => {
    if ([r, g, b].every((c) => !isNaN(c) && c !== Infinity)) return "rgb";
    else if ([h, s, l].every((c) => !isNaN(c) && c !== Infinity)) return "hsl";
    else if (hex !== "000000") return "hex";
  },

  calcHex: ({ type, h, s, l, r, g, b, hex }) => {
    if (type === "hsl") return rgb_hex(hsl_rgb([h / 360, s / 100, l / 100]));
    else if (type === "rgb") return rgb_hex([r, g, b]);
    else if (type === "hex") return hex;
    else return "000000";
  },

  textColor: ({ type, h, s, l, r, g, b, a }) => {
    if (type === "hsl") return `hsl(${h}, ${s / 2}%, ${((l + 61) % 100) * a}%)`;
    if (type === "rgb") {
      const [h, s, l] = rgb_hsl([r, g, b]);
      return `hsl(${h * 360}, ${s * 50}%, ${((l * 100 + 61) % 100) * a}%)`;
    }
    if (type === "hex") return `black`;
  },

  render: ({ a, calcHex, color, textColor, hideLabel }) => html`
    <div class="container" part="swatch" style="color: ${textColor};"
      title="Ctrl+C to Copy"
      onmouseover="${bindShortcuts}"
      onmouseout="${unbindShortcuts}">
      <div class="transparent-bg"></div>
      <div class="swatch"></div>

      ${!hideLabel && html`<span part="label">${calcHex.toUpperCase()}</span>`}
      <slot></slot>
    </div>
    <style>
      .swatch {
        background: ${color};
        opacity: ${a};
      }
      cam-input::part(input) {
        color: ${textColor};
      }
    </style>
  `.style(styles),
};

define("cam-swatch", CamSwatch);
export default CamSwatch;
