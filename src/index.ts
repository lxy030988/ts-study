let a: string | number = '1'
a = 1

//元组 tuple 已知数量和类型的数组
const b: [string, number] = ['1', 1]

//普通枚举
enum ROLE {
  USER,
  ADMIN
}

//常量枚举
const enum ROLE1 {
  USER,
  ADMIN
}

const aaa: any = '22'
console.log(aaa)

//null undefined 其他类型的子类型  strictNullChecks=true 时 不生效

// aaa! 非空断言

//never 表示永远不存在的值的类型

// 返回当前版本号
function getVersion(version: string = '1.0.0'): string {
  return version
}

console.log(getVersion('1.0.122'))

const s1 = Symbol('key')

//bigInt
const max = Number.MAX_SAFE_INTEGER
const nmax = BigInt(Number.MAX_SAFE_INTEGER)
// console.log(nmax+1n)//1n 代表大整型  target=ESNext 生效
let bar: bigint
// number 和 bigint 不兼容

//字面量类型
const up: 'up' = 'up'
//可以实现枚举的效果

//字符串字面量和联合类型
type T1 = '1' | '2' | '3'
type T2 = string | number

//泛型
interface LengthWith {
  length: number
}

function logger<T extends LengthWith>(v: T) {
  console.log(v.length)
}

logger<string>('aaa')

let obj = {
  length: 10
}
type Obj = typeof obj
logger<Obj>(obj)
