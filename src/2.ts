export {}
// unknown
//如果想调用unknown上的方法和属性
//1.断言 as
//2.typeof

let a: unknown = '111'
if (typeof a === 'string') {
  a.length
}

//联合类型中的unknown，不管和谁联合  最后都是unknown
type T1 = unknown | string
type T2 = unknown | string[]

//never是unknown的子类型
type isNever = never extends unknown ? true : false
type ukeys = keyof unknown
type anykeys = keyof any
type t3 = PropertyKey

//映射属性
type getType<T> = {
  [K in keyof T]: number
}
type ut = getType<unknown>
