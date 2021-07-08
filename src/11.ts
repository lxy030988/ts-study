//扩展局部变量的类型
declare var String: StringConstructor
interface StringConstructor {
  new (v?: any): String
  (v?: any): string
  readonly prototype: String
}

export {}
//相同名称的interface会进行合并
declare global {
  interface String {
    double(): string
  }
}

String.prototype.double = function () {
  console.log('this', this)
  return (this as string) + (this as string)
}

let s = 'hello'.double()
console.log('s', s)

class Person {
  name: string
}

let p: Person = { name: 'aa' }

let c: typeof Person = Person

//class enum 类型  值  都可以

//命名空间： 可以扩展类 可以扩展函数 可以扩展枚举

//用 联合类型 扩展库的接口和类型
type A = {
  a: string
  b: number
}

type B = A & {
  c: boolean
}
let xx: B = { a: 'a', b: 1, c: false }
