import { html } from 'hybrids'
import { define } from 'hybrids'
import { set } from '@auzmartist/hybrids-helpers'
import { THEME } from '@src/theme/theme.js'
import { Zing } from '@src/zing/Zing.js'

const Z = Zing('cam-string').theme(THEME)

export interface StringElement extends HTMLElement {
  /** Sets or retrieves a comma-separated list of content types. */
  accept: string
  /** Sets or retrieves a text alternative to the graphic. */
  alt: string
  /** Specifies whether autocomplete is applied to an editable text field. */
  autocomplete: string
  capture: string
  /** Sets or retrieves the state of the check box or radio button. */
  checked: boolean
  /** Sets or retrieves the state of the check box or radio button. */
  defaultChecked: boolean
  /** Sets or retrieves the initial contents of the object. */
  defaultValue: string
  dirName: string
  disabled: boolean
  /** Returns a FileList object on a file type input object. */
  files: FileList | null
  /** Retrieves a reference to the form that the object is embedded in. */
  readonly form: HTMLFormElement | null
  /** Overrides the action attribute (where the data on a form is sent) on the parent form element. */
  formAction: string
  /** Used to override the encoding (formEnctype attribute) specified on the form element. */
  formEnctype: string
  /** Overrides the submit method attribute previously specified on a form element. */
  formMethod: string
  /** Overrides any validation or required attributes on a form or form elements to allow it to be submitted without validation. This can be used to create a "save draft"-type submit option. */
  formNoValidate: boolean
  /** Overrides the target attribute on a form element. */
  formTarget: string
  /** Sets or retrieves the height of the object. */
  height: number
  /** When set, overrides the rendering of checkbox controls so that the current value is not visible. */
  indeterminate: boolean
  readonly labels: NodeListOf<HTMLLabelElement> | null
  /** Specifies the ID of a pre-defined datalist of options for an input element. */
  readonly list: HTMLElement | null
  /** Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field. */
  max: string
  /** Sets or retrieves the maximum number of characters that the user can enter in a text control. */
  maxLength: number
  /** Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field. */
  min: string
  minLength: number
  /** Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list. */
  multiple: boolean
  /** Sets or retrieves the name of the object. */
  name: string
  /** Gets or sets a string containing a regular expression that the user's input must match. */
  pattern: string
  /** Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field. */
  placeholder: string
  readOnly: boolean
  /** When present, marks an element that can't be submitted without a value. */
  required: boolean
  selectionDirection: 'forward' | 'backward' | 'none' | null
  /** Gets or sets the end position or offset of a text selection. */
  selectionEnd: number | null
  /** Gets or sets the starting position or offset of a text selection. */
  selectionStart: number | null
  size: number
  /** The address or URL of the a media resource that is to be considered. */
  src: string
  /** Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field. */
  step: string
  /** Returns the content type of the object. */
  type: string
  /**
   * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
   * @deprecated
   */
  useMap: string
  /** Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting. */
  readonly validationMessage: string
  /** Returns a  ValidityState object that represents the validity states of an element. */
  readonly validity: ValidityState
  /** Returns the value of the data at the cursor's current position. */
  value: string
  /** Returns a Date object representing the form control's value, if applicable; otherwise, returns null. Can be set, to change the value. Throws an "InvalidStateError" DOMException if the control isn't date- or time-based. */
  valueAsDate: Date | null
  /** Returns the input field value as a number. */
  valueAsNumber: number
  readonly webkitEntries: ReadonlyArray<FileSystemEntry>
  webkitdirectory: boolean
  /** Sets or retrieves the width of the object. */
  width: number
  /** Returns whether an element will successfully validate based on forms validation rules and constraints. */
  readonly willValidate: boolean
  [key: string]: any
}
type H = StringElement

export const String = define<StringElement>({
  tag: 'cam-string',
  accept: 'string',
  alt: '',
  autocomplete: false,
  capture: false,
  checked: false,
  defaultChecked: false,
  defaultValue: '',
  dirName: '',
  disabled: false,
  files: set(undefined, (host, val) => val),
  height: 1,
  indeterminate: false,
  max: set(Infinity, (host, val) => val),
  maxLength: set(Infinity, (host, val) => val),
  min: set(-Infinity, (host, val) => val),
  minLength: set(undefined, (host, val) => val),
  name: '',
  pattern: '',
  placeholder: '',
  readOnly: false,
  required: false,
  selectionDirection: 'forward',
  size: set(10, (host, val) => val),
  src: '',
  step: 1,
  type: 'text',
  value: set('', ({ type, step }, val) => {
    switch (type) {
      case 'number':
        return step % 1 == 0 ? parseInt(val) : parseFloat(val)
      case 'checkbox':
        return new Boolean(val)
      case 'text':
      default:
        return val.toString()
    }
  }),
  width: set(Infinity, (host, val) => val),
  content: (host: H) =>
    html`<input
      accept="${host.accept}"
      alt="${host.alt}"
      autocomplete="${host.autocomplete}"
      capture="${host.capture}"
      checked="${host.checked}"
      default-checked="${host.defaultChecked}"
      dir-name="${host.dirName}"
      disabled="${host.disabled}"
      files="${host.files}"
      height="${host.height}"
      indeterminate="${host.indeterminate}"
      max="${host.max}"
      max-length="${host.maxLength}"
      min="${host.min}"
      min-length="${host.minLength}"
      multiple="${host.multiple}"
      name="${host.name}"
      pattern="${host.pattern}"
      placeholder="${host.placeholder}"
      readonly="${host.readonly}"
      requred="${host.requred}"
      selection-direction="${host.selectionDirection}"
      size="${host.size}"
      step="${host.step}"
      type="${host.type}"
      value="${host.value}"
      width="${host.width}"
      oninput="${oninput}"
    />`.css`
      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        margin: 0;
        outline: none;
        display: inline-block;
        transition: background 0.3s, border-color 0.3s;
        ${Z.get(({ theme }) => ({
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: theme('--input-700'),
          background: 'white',
        }))}
      }

      input:active,
      input:focus {
        ${Z.get(({ theme }) => ({
          boxShadow: `0 0 0 ${theme('--input-400')}`,
        }))}
      }

      input[type='text'],
      input[type='email'],
      input[type='password'],
      input[type='number'],
      input[type='search'],
      input[type='tel'],
      input[type='url'] {
        ${Z.get(({ theme }) => ({
          width: 'inherit',
          padding: '0.33rem 0.66rem',
          borderRadius: '2rem',
        }))}
      }
    `,
})

function oninput(host, e) {
  host.value = e.target.value
}
