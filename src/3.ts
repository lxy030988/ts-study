export {}

//交叉类型 要满足双方的条件（子类型）
//交叉类型{}
type A = {
  name: string
  c: string
}
type B = {
  age: number
  c: string
}
type C = A & B
let c: C = { name: '1', age: 1, c: '' }

type D = A | B
let d: D = { name: '1', c: '' }

//交叉类型|
type AA = string | number
type BB = string | boolean
type CC = AA & BB
type DD = AA | BB
