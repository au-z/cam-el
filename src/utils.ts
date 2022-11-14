import { Descriptor } from 'hybrids'

/**
 * Generate a range
 * @param a length or start of range
 * @param b optional end of range
 * @param value optional initial value or generator for each element
 * @returns An array sized to the specified range
 */
export const range = (a: number, b: number = 0, value?: any | ((i) => any)) => {
  if (b) {
    let temp = a
    a = b
    b = temp
  }
  return [...new Array(a - b)].map((_, i) => (typeof value === 'function' ? value(i) : value !== null ? value : i))
}

const camelToDashMap = new Map()
function camelToDash(str) {
  let result = camelToDashMap.get(str)
  if (result === undefined) {
    result = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    camelToDashMap.set(str, result)
  }
  return result
}

/**
 * A Hybrids property definition specifically for providing functions to components
 * @param defaultFn The default function if none is passed
 * @param connect connect handler
 * @param observe observe handler
 * @returns Hybrids property definition
 */
export function propertyFn<E extends HTMLElement, V extends Function>(
  defaultFn: V,
  connect?: Descriptor<E, V>['connect'],
  observe?: Descriptor<E, V>['observe']
): Descriptor<E, V> {
  const attrs = new WeakMap()

  return {
    get: (host: E, val = defaultFn) => val,
    set: (host: E, val) => val,
    connect: (host: E, key, invalidate) => {
      if (!attrs.has(host)) {
        const attrName = camelToDash(key)
        attrs.set(host, attrName)

        if (host.hasAttribute(attrName)) {
          const attrValue = host.getAttribute(attrName)
          host[key] = attrValue
        }
      }

      return connect && connect(host as any, key, invalidate)
    },
    observe: (host, val, last) => {
      const attrName = attrs.get(host)
      const attrValue = host.getAttribute(attrName)
      if (attrValue) {
        host.removeAttribute(attrName)
      }

      if (observe) observe(host, val, last)
    },
  }
}
