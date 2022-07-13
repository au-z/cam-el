import { propertyFn } from "./utils"
import {Descriptor, dispatch, Component} from 'hybrids'

export interface CamRef<E> {
	_selector: (host: E, val: string) => string,
	detail: Descriptor<E, (el: Component<E>) => any>,
	event: string,
	_selection: Descriptor<E, Component<E>>,
}
const CamRef = <E>(_selector = '', event = 'ref', detailFn = (selection: HTMLElement) => selection): CamRef<E> => ({
	_selector: (host, val = _selector) => val,
	event,
	detail: propertyFn<E, any>(detailFn),
	_selection: {
		get: ({render, _selector}: any) => _selector && render().querySelector(_selector),
		observe: (host: any, _selection) => {
			if(!_selection) return
			dispatch(host, host.event, {detail: host.detail(_selection), bubbles: true, composed: true})
		}
	},
})

export default CamRef
