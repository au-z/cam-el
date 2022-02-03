export interface Type<T> extends Function {
  new (...args: any[]): T
}

export interface Disposable {
  dispose: () => void
}
