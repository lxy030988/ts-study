export {}
// 类型推断
//从右向左推断
let a = 1
let b = 'b'

//return推断
function fn1(a: number, b: number) {
  return a + b + ''
}

//从左向右推断
type Sum = (a: number, b: number) => number
let sum: Sum = (a, b) => {
  return a + b
}

let per = {
  name: 'name',
  age: 22
}

type Default = {
  name?: string
  age?: number
}
let prop: Default = {}
let props = {
  ...prop,
  home: 'home'
}
type Prop = typeof props

//mixin 合并
function mixin<T, U>(one: T, two: U) {
  const res = <T & U>{}
  for (const key in one) {
    ;(<T>res)[key] = one[key]
  }
  for (const key in two) {
    ;(<U>res)[key] = two[key]
  }
  return res
}

const x = mixin({ name: 'name' }, { age: 20 })
x.name
x.age

//typeof

//索引访问操作符
interface I1 {
  name: string
  age: number
  job: {
    name: string
    le: number
  }
}
let i1: I1['job'] = {
  name: '1',
  le: 1
}

//映射类型
type Person = {
  name: string
  age: number
  gender: '0' | '1'
}
type PartialPerson = {
  [key in keyof Person]?: Person[key]
}
type PPerson = Partial<Person>
