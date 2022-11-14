import { define, html } from 'hybrids'
import { Zing } from '@src/zing/Zing.js'
import { THEME } from '@src/theme/theme.js'
import styles from './button.css'
import { Gridable, GridableElement, gridableCSS } from './grid.js'

const Z = Zing('cam-button').theme(THEME)

export interface ButtonElement extends GridableElement, HTMLElement {
  [key: string]: any
}

type H = ButtonElement

export const Button = define<H>({
  tag: 'cam-button',
  ...Gridable,
  flow: 'column', // override gridable default flow
  type: 'basic',
  disabled: false,
  render: (h: H) =>
    html`<button class="${h.type}" disabled="${h.disabled}"><slot></slot></button>`.css`
    button {
      ${Z.get(({ theme }) => ({
        padding: '0.5rem 1.25rem',
        background: theme('--input-800'),
        color: theme('--input-200'),
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme('--input-200'),
        borderRadius: '0.5rem',
        fontFamily: 'sans-serif',
        letterSpacing: '0.1em',
      }))}

      ${caseCSS(h.type, {
        primary: ({ theme }) => ({
          background: theme('--input-400'),
          color: theme('--input-100'),
          border: 'none',
        }),
        secondary: ({ theme }) => ({
          background: theme('--input-200'),
          color: theme('--input-900'),
          border: 'none',
        }),
        tech: ({ theme }) => ({
          background: theme('--input-100'),
          color: theme('--input-700'),
          padding: '0.35rem',
          fontSize: '0.66em',
          fontWeight: 'bold',
          borderColor: theme('--input-400'),
          borderRadius: '0.5rem',
        }),
        ghost: ({ theme }) => ({
          background: 'transparent',
          border: 'none',
          color: theme('--input-300'),
        }),
      })}
      cursor: pointer;
      transition: 0.3s all ease;

      ${gridableCSS(h)}
    }

    button[disabled] {
      ${Z.get(({ theme }) => ({
        padding: '0.5rem 1.25rem',
        background: theme('--gray-800'),
        color: theme('--gray-400'),
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: theme('--input-200'),
        border: 'var(--cam-button-border-width) var(--cam-button-border-style) var(--cam-button-border-color)',
        borderRadius: '0.5rem',
        fontFamily: 'sans-serif',
        letterSpacing: '0.1em',
      }))}
      box-shadow: none;
    }

    button:focus {
      ${Z.get(({ theme }) => ({
        outline: `2px solid ${theme('--input-active')}`,
      }))}
    }

    button.ghost {
      ${Z.get(['background', 'color', 'border'], 'ghost')}
      box-shadow: none;
    }
  `.style(styles),
})

const caseCSS = (propertyValue: string, cases: Record<string, Function>) => {
  const [key, rules] = Object.entries(cases).find(([key, rules]) => key === propertyValue) ?? [null, {}]
  return key ? Z.get(rules, key) : ';'
}
