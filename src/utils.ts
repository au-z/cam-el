import { Descriptor } from "hybrids";

const camelToDashMap = new Map()
function camelToDash(str) {
	let result = camelToDashMap.get(str)
	if (result === undefined) {
		result = str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		camelToDashMap.set(str, result)
	}
	return result
}

export const getset = (_default: any = null, connect?, observe?) => ({
	get: (_, val = _default) => val,
	set: (_, val) => val,
	connect,
	observe,
})

/**
 * A Hybrids property definition specifically for providing functions to components
 * @param defaultFn The default function if none is passed
 * @param connect connect handler
 * @param observe observe handler
 * @returns Hybrids property definition
 */
 export function propertyFn<E, T extends Function>(defaultFn: T, connect?, observe?): Descriptor<E, T> {
	const attrs = new WeakMap()
	const type = typeof defaultFn

	return {
		get: (host, val = defaultFn) => val,
		set: (host, val) => val,
		connect: type === 'function' ? (host, key, invalidate) => {
			if(!attrs.has(host)) {
				const attrName = camelToDash(key)
				attrs.set(host, attrName)
				
				if(host.hasAttribute(attrName)) {
					const attrValue = host.getAttribute(attrName)
					host[key] = attrValue as any
				}
			}

			return connect && connect(host, key, invalidate)
		} : connect,
		observe: type === 'function' ? (host, val, last) => {
			const attrName = attrs.get(host)
			const attrValue = host.getAttribute(attrName)
			if(attrValue) {
				host.removeAttribute(attrName)
			}

			if(observe) observe(host, val, last)
		} : observe,
	}
}