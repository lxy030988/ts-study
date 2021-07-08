//给库写类型声明
//tsconfig "paths" "*": ["types/*"]

export type Listener = (...args: any[]) => void
export type Type = string | symbol
export class EventEmmitter {
  static defaultMaxListeners: number
  emit(type: Type, ...args: any[]): void
  on(type: Type, listener: Listener): this
  addListener(type: Type, listener: Listener): this
  once(type: Type, listener: Listener): this
}
