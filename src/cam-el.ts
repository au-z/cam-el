import { set } from '@auzmartist/hybrids-helpers'

const unit = (x: string) => `calc(${x} * var(--cam-unit, 8px))`

export interface CamElement extends HTMLElement {
  m: string[]
  p: string[]
}
type H = CamElement

export const CamEl = {
  m: set('', (host: H, val) => val.split(/,\s*/).filter((v) => !!v)),
  p: set('', (host: H, val) => val.split(/,\s*/).filter((v) => !!v)),
}

export const camelCSS = ({ m, p }: H) => `
  box-sizing: border-box;
  ${m.length && `margin: ${unit(m[0])} ${unit(m[1] ?? m[0])} ${unit(m[2] ?? m[0])} ${unit(m[3] ?? m[1] ?? m[0])}`};
  ${p.length && `padding: ${unit(p[0])} ${unit(p[1] ?? p[0])} ${unit(p[2] ?? p[0])} ${unit(p[3] ?? p[1] ?? p[0])}`};
`
