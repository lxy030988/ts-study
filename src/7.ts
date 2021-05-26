//内置工具类型
export {}
interface Company {
  id: number
  name: string
}
interface User {
  id: number
  name: string
  company: Company
}
type pUser = Partial<User>
// const user: pUser = {
//   name: '1',
//   company: {}
// }
type DeepPartial<T> = {
  // [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
  [P in keyof T]?: T[P] extends {} ? DeepPartial<T[P]> : T[P]
}
type dpUser = DeepPartial<User>
const user: dpUser = {
  name: '1',
  company: {}
}
