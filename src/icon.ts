import { define, html } from 'hybrids'
import { THEME } from './theme/theme.js'

import { Zing } from './zing/Zing.js'

const Z = Zing('cam-icon').theme(THEME)

export const CamIcon = define<HTMLElement>({
  tag: 'cam-icon',
  render: () => html`<i class="icon" part="icon"><slot></slot></i>`.css`
      :host {
        display: inline-block;
        line-height: 0;
      }
      i.icon {
        ${Z.get(({ theme }) => ({
          color: 'unset',
          fontFamily: 'Material Icons',
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: 'normal',
        }))}
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
      }`,
})
