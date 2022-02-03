import { define, html, Descriptor } from 'hybrids'
import { Disposable, Type } from './interfaces'

class Shortcuts implements Disposable {
  reg: Record<string, ShortcutConfig> = {}
  private boundOnKeyUp: (e: KeyboardEvent) => void

  constructor(private host: HTMLElement) {
    this.boundOnKeyUp = this.onkeyup.bind(this)
    document.addEventListener('keyup', this.boundOnKeyUp)
  }

  dispose() {
    document.removeEventListener('keyup', this.boundOnKeyUp)
  }

  add(code: string, config: ShortcutConfig) {
    console.info('registering', code)
    this.reg[code] = config
  }

  delete(code: string) {
    delete this.reg[code]
  }

  private onkeyup(e: KeyboardEvent) {
    const code = this.parseToCode(e)
    const shortcut = this.reg[code]
    if (!shortcut) return
    console.log(shortcut)
    shortcut.callback(e)
  }

  private parseToCode(e: KeyboardEvent) {
    let code = e.key
    if (e.shiftKey) code = `Shift+${code}`
    if (e.ctrlKey) code = `Control+${code}`
    if (e.altKey || e.metaKey) code = `Alt+${code}`
    return code
  }
}

const disposable = <E, V>(Ctor: Type<Disposable>, connect?: Descriptor<E, V>['connect']) => ({
  value: undefined,
  connect: (host, key, invalidate) => {
    host[key] = new Ctor(host)
    const ondisconnect = connect?.(host, key, invalidate)
    return () => {
      host[key].dispose()
      if (ondisconnect) ondisconnect()
    }
  },
})

export interface ShortcutsElement extends HTMLElement {
  [key: string]: any
  create: string
  delete: string
}
type H = ShortcutsElement

export const CamShortcuts = define<ShortcutsElement>({
  tag: 'cam-shortcuts',
  create: 'shortcut:create',
  delete: 'shortcut:delete',
  registry: disposable(Shortcuts, (host: H, key) => {
    host.addEventListener(host.create, createShortcut)
    host.addEventListener(host.delete, deleteShortcut)
    return () => {
      host.removeEventListener(host.create, createShortcut)
      host.removeEventListener(host.delete, deleteShortcut)
    }

    function createShortcut({ detail }) {
      host[key].add(detail.code, detail)
    }
    function deleteShortcut({ detail }) {
      host[key].delete(detail)
    }
  }),
})

export interface ShortcutConfig {
  name?: string
  code: string
  callback: (e: KeyboardEvent) => void
}
