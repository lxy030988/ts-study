// Proxy

export {}
type Proxy<T> = {
  get(): T
  set(v: T): void
}
type Proxify<T> = {
  [K in keyof T]: Proxy<T[K]>
}

function proxify<T>(obj: T): Proxify<T> {
  let res = <Proxify<T>>{}
  for (const key in obj) {
    Object.defineProperty(res, key, {
      get: () => obj[key],
      set: (v) => (obj[key] = v)
    })
  }
  return res
}

interface Props {
  name: string
  age: number
}
let props: Props = {
  name: 'name',
  age: 20
}

let proxyProps = proxify(props)
console.log('proxyProps', proxyProps)
console.log(proxyProps.name)
;(proxyProps as any).name = 'lxy'
console.log(proxyProps.name)

function unProxify<T>(proxify: Proxify<T>): T {
  let res: any = <T>{}
  for (const key in proxify) {
    res[key] = proxify[key]
  }
  return res
}
let oProps = unProxify(proxyProps)
console.log('oProps', oProps, oProps.age)
