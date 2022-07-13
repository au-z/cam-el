import {define, dispatch, html} from 'hybrids'

export const MyElement = define<any>({
  tag: 'my-element',
  str: 'string',
  num: 42,
  bool: false,
  undef: undefined,
  descriptor: {
    value: 'defaultValue',
  },
  arr: {
    get: (_, val = []) => val,
    set: (_, val) => val,
  },
  obj: {
    get: (_, val = {}) => val,
    set: (_, val) => val,
  },
  _private: ({arr}) => arr.map((val) => val * 2),
  render: ({str}) => html`
    <span onclick="${(host) => dispatch(host, 'custom')}">
      Hello ${str}!
    </span><br>
    <slot></slot>
  `,
})
