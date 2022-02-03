import { propertyFn } from './utils'
import { dispatch, Hybrids } from 'hybrids'

export interface CamRef extends HTMLElement {
  _selector: string
  detail: (el: HTMLElement) => any
  event: string
  _selection: HTMLElement
}
const CamRef = (_selector = '', event = 'ref', detailFn = (selection: HTMLElement) => selection): Hybrids<CamRef> => ({
  _selector: (host, val = _selector) => val,
  event,
  detail: propertyFn(detailFn),
  _selection: {
    get: ({ render, _selector }) => _selector && render().querySelector(_selector),
    observe: (host, _selection) => {
      if (!_selection) return
      dispatch(host, host.event, { detail: host.detail(_selection), bubbles: true, composed: true })
    },
  },
})

export default CamRef
