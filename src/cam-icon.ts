import { define, html } from 'hybrids'

export const CamIcon = define<HTMLElement>({
  tag: 'cam-icon',
  render: () => html`<i class="icon" part="icon"><slot></slot></i>
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }
      i.icon {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 2em;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';
      }
    </style>`,
})
