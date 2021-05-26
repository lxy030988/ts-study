// infer 应用
export {}

//tuple转union
type TupleToUnion<T> = T extends Array<infer A> ? A : never
// type TupleToUnion<T> = T extends (infer A)[] ? A : never
type TTuple = [string, number]
type TUnion = TupleToUnion<TTuple>
type T11 = Array<number | string>
type T22 = TupleToUnion<T11>

//联合类型 转 交叉类型
//string|number => string&number
type T1 = { name: string }
type T2 = { age: number }
type ToIntersection<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never
type T3 = ToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>
