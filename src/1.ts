// 类型保护
export {}

// instanceof 判断实例是否是某个类  a instanceof A

//null保护
function fn1(str: string | null) {
  // if (str === null) {
  //   return ''
  // }
  str = str ?? ''
  return str.charAt(0)
}

//可辨识的联合类型
interface I1 {
  class: 'class1'
  text1: 'text1'
}
interface I2 {
  class: 'class2'
  text2: 'text2'
}
type T1 = I1 | I2
function fn2(p: T1) {
  if (p.class === 'class1') {
    console.log(p)
  }
  if (p.class === 'class2') {
    console.log(p)
  }
}
//可辨识的联合类型2
interface User {
  name: string
}
type Action =
  | {
      type: 'add'
      payload: User
    }
  | { type: 'del'; payload: number }
function fn3(p: Action) {
  switch (p.type) {
    case 'add':
      p.payload.name
      break
    case 'del':
      p.payload
      break
  }
}

// interface Bird {
//   swing: number
// }
// interface Dog {
//   leg: number
// }
// function fn4(p: Bird | Dog) {
//   if ('swing' in p) {
//     console.log('Bird', p)
//   } else {
//     console.log('Dog', p)
//   }
// }

//自定义的类型保护
interface Bird {
  leg: number
}
interface Dog {
  leg: number
}
function isBird(p: Bird | Dog): p is Bird {
  return p.leg === 2
}
