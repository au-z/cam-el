type RuleKey = keyof CSSStyleDeclaration
type Rules = Record<RuleKey, string> | {}
type GetRule = (string: RuleKey) => string
type RulesFactory = (helpers: { theme: GetRule }) => Rules

const hexstr = (num: number) => `#${num.toString(16).padStart(6, '0')}`
const keystr = (name, level) => `--${name}-${level}00`
const ruleName = (ruleKey, prefix) => (prefix ? `${prefix}-${ruleKey}` : ruleKey)

export const camelToKebab = (camel: RuleKey) =>
  camel
    .toString()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
export const kebabToCamel = (kebab: string) => kebab.replace(/-([a-z])/g, (a) => a.substring(1).toUpperCase())

/**
 * Generate 10 linearly interpolated color shades within the same hue for a source medium brightness color.
 * @param name color variable prefix name '--name-{i}00'
 * @param source source color in hex integer 0xff0000
 * @param start source color index
 * @returns an api with getters for representations of the shade values {css, value, decimal}
 */
export const shades = (name: string, source: number, start: number = 4) => {
  start = Math.max(0, Math.min(8, start)) // generate 9 colors
  // normalize rgb
  const rgb = [(source >> 16) & 0xff, (source >> 8) & 0xff, source & 0xff].map((c) => c / 255)
  let S = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]
  rgb.forEach((c, cidx) => {
    const shift = (2 - cidx) * 8
    const lighten = (1 - c) / (8 - start + 1)
    const darken = c / (start + 1)
    S = S.map((shade, j) => {
      const factor = (j < start ? darken : j > start ? lighten : 0) * (j - start)
      return (shade += ((c + factor) * 255) << shift)
    })
  })
  return {
    get map() {
      return S.reduce((map, shade, i) => {
        map[`${keystr(name, i + 1)}`] = hexstr(shade)
        return map
      }, {})
    },
    get css() {
      return S.map((shade, i) => `${keystr(name, i + 1)}: ${hexstr(shade)};`).join('\n')
    },
    get value() {
      return S.map((shade) => hexstr(shade))
    },
    get decimal() {
      return S
    },
  }
}

export const Zing = (tagName: string = 'app') => {
  let _theme: Rules

  const cssv: GetRule = (pName: RuleKey) => _theme[pName] ?? 'unset'

  const _get = (postfix: string, fallback?: string) => `var(--${postfix}${fallback ? `, ${fallback}` : ''});\n`
  const get = (rules: Rules | RulesFactory = {}, ns?: string) => {
    const _rules: Rules = typeof rules === 'function' ? rules({ theme: cssv }) : rules
    return Object.entries(_rules)
      .map(([rule, fallback]) => {
        return `${camelToKebab(rule as RuleKey)}: ${_get(ruleName(camelToKebab(rule as RuleKey), ns), fallback)}`
      })
      .join('')
  }

  const _set = (postfix: string, value: string = 'initial') => `--${postfix}: ${value}; `
  const set = (rules: Rules | RulesFactory = {}, ns?: string) => {
    const _rules: Rules = typeof rules === 'function' ? rules({ theme: cssv }) : rules
    return Object.entries(_rules)
      .map(([rule, value]) => _set(ruleName(camelToKebab(rule as RuleKey), ns), value))
      .join('')
  }

  const def = (rules: Rules | RulesFactory = {}) => {
    const _rules: Rules = typeof rules === 'function' ? rules({ theme: cssv }) : rules
    return `${set(_rules)}${get(Object.keys(_rules))}`
  }

  const api = {
    get,
    set,
    def,
    theme(themeFn: (helpers) => Rules = () => ({})) {
      _theme = themeFn({
        shades,
      })
      return this
    },
    mixin(styles: string) {
      return this
    },
    cssv,
  }

  return api
}
