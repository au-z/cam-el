import { propertyFn } from "./utils"
import {Descriptor, dispatch, Hybrids} from 'hybrids'

export interface CamRef<E> {
	_selector: (host: E, val: string) => string,
	detail: Descriptor<E, (el: Hybrids<E>) => any>,
	event: string,
	_selection: Descriptor<E, Hybrids<E>>,
}
const CamRef = <E>(_selector = '', event = 'ref', detailFn = (selection: HTMLElement) => selection): CamRef<E> => ({
	_selector: (host, val = _selector) => val,
	event,
	detail: propertyFn(detailFn),
	_selection: {
		get: ({render, _selector}) => _selector && render().querySelector(_selector),
		observe: (host, _selection) => {
			if(!_selection) return
			dispatch(host, host.event, {detail: host.detail(_selection), bubbles: true, composed: true})
		}
	},
})

export default CamRef
