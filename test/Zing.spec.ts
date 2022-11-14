import { camelToKebab, kebabToCamel, shades } from '../src/zing/Zing'
import { describe, test, expect } from 'vitest'

describe('Zing tests', () => {
  test('camelToKebab', () => {
    expect(camelToKebab('camEl')).toBe('cam-el')
    expect(camelToKebab('ZigZag')).toBe('zig-zag')
    expect(camelToKebab('FeFiFoFum')).toBe('fe-fi-fo-fum')
  })

  test('kebabToCamel', () => {
    expect(kebabToCamel('cam-el')).toBe('camEl')
    expect(kebabToCamel('zig-zag')).toBe('zigZag')
    expect(kebabToCamel('fe-fi-fo-fum')).toBe('feFiFoFum')
  })

  test('shades', () => {
    expect(shades('gray', 0xff0000).value.length).toBe(9)
    expect(shades('gray', 0xff0000).css.substring(0, 12)).toBe(`--gray-100: `)
  })
})
