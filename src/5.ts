// 类型
// 条件类型 extends

//条件类型分发（裸类型）

interface I1 {
  name1: string
}

interface I2 {
  name2: string
}

type T1<T> = T extends I1 ? I1 : I2
type T2<T> = { t: T } extends { t: I1 } ? I1 : I2

type tt1 = T1<I1>
type tt2 = T2<I1>

type tt3 = T1<I1 | I2> //裸类型 分发（一个一个传  一个一个返回） extends true
type tt4 = T2<I1 | I2> //不是裸类型 不分发（一起传） extends false
