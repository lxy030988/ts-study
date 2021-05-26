namespace namespace_a {
  class User {
    constructor(_name: string, _age: number) {}
  }

  type TUserC = ConstructorParameters<typeof User>

  function testUser(...p: TUserC): void {
    const [name, age] = p
    console.log(p, name, age)
  }
  testUser('1', 1)

  const b: ReadonlyArray<number> = [1, 3]
  // b.push(1)

  type T1 = Exclude<'1' | '2', '1'>
  type T2 = Extract<'1' | '2', '1'>
  declare function create<T extends new (...args: any) => any>(params: T): InstanceType<T>
  type T3 = NonNullable<string | null | number | undefined>
  type T4 = Parameters<typeof testUser>

  interface Person {
    name: string
    age: number
    level: number
  }
  const obj: ThisType<Person> = {
    dosth() {
      this.name // string
    }
  }

  type T5 = Partial<Person>
  type T6 = Required<T5>
  type T7 = Readonly<T6>
  type T8 = Pick<Person, 'name'>
  type T9 = Omit<Person, 'name'>

  type T10 = ReturnType<() => string>

  interface PageInfo {
    title: string
  }

  type Page = 'home' | 'about' | 'contact'

  const x: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    home: { title: 'home' }
  }
}

export {}
