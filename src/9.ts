// Merge
type Compute<A> = A extends Function ? A : { [K in keyof A]: A[K] }
type R1 = Compute<{ x: 'x' } & { y: 'y' }>

type Merge<A extends {}, B extends {}> = Compute<A & Omit<B, keyof A>>
type O1 = {
  id: number
  name: string
}
type O2 = {
  id: number
  age: number
}
type R2 = Merge<O1, O2>
