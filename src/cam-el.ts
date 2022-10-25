import { css } from 'lit-css'

export interface CamElement extends HTMLElement {
  m: string
  p: string
  _mx: string
  _my: string
  _px: string
  _py: string
}

export const CamEl = {
  m: '0',
  p: '0',
  _mx: ({ m }) => (m.split(' ').length > 1 ? parseInt(m.split(' ')[0]) : parseInt(m)).toString(),
  _my: ({ m }) => (m.split(' ').length > 1 ? parseInt(m.split(' ')[1]) : parseInt(m)).toString(),
  _px: ({ p }) => (p.split(' ').length > 1 ? parseInt(p.split(' ')[0]) : parseInt(p)).toString(),
  _py: ({ p }) => (p.split(' ').length > 1 ? parseInt(p.split(' ')[1]) : parseInt(p)).toString(),
}

export const CamElStyles = ({ _mx, _my, _px, _py }: CamElement) => css`
  :host {
    box-sizing: border-box;
    margin: calc(${_mx} * var(--cam-unit, 8px)) calc(${_my} * var(--cam-unit, 8px));
    padding: calc(${_px} * var(--cam-unit, 8px)) calc(${_py} * var(--cam-unit, 8px));
  }
`
