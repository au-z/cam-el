import { define, html } from 'hybrids'
export interface CamCollapse extends HTMLElement {
  [key: string]: any
}
type H = CamCollapse

export const CamCollapse = define<H>({
  tag: 'cam-collapse',
  open: false,
  render: ({ open }: H) =>
    html`
      <div part="content" class="${{ content: true, open }}" onclick="${(host, e) => (host.open = !host.open)}">
        <slot></slot>
      </div>
      <div part="more" class="${{ more: true, open }}">
        <slot name="more"></slot>
      </div>
    `.css`
    .content {
      position: relative;
    }

    .more {
      opacity: 0;
      height: 0;
      overflow: hidden;
      transition: 0.3s opacity ease;
    }
    .more.open {
      opacity: 1;
      height: auto;
    }`,
})
