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
  tag: "cam-swatch",
  h: Infinity,
  s: Infinity,
  l: Infinity,
  r: Infinity,
  g: Infinity,
  b: Infinity,
  a: 1,
  hideLabel: false,
  hex: "000000",

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
