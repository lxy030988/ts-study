// declare function create<T extends new (...args: any) => any>(params: T): InstanceType<T>

interface IContainer {
  cb: () => {}
  singe: boolean
  instance?: {}
}
interface NewAble<T> {
  new (...args: any[]): T
}

type TBind<T> = [key: PropertyKey, fn: NewAble<T>]

export class CreateIoc {
  private container: Map<PropertyKey, IContainer>
  constructor() {
    this.container = new Map<PropertyKey, IContainer>()
  }
  public bind<T>(...p: TBind<T>) {
    console.log('CreateIoc bind')
    const [key, fn] = p
    const cb = () => new fn()
    this.container.set(key, { cb, singe: false })
  }

  public singe<T>(...p: TBind<T>) {
    const [key, fn] = p
    const cb = () => new fn()
    this.container.set(key, { cb, singe: true })
  }

  public use<T>(key: PropertyKey) {
    console.log('CreateIoc use')
    const item = this.container.get(key)
    if (item !== undefined) {
      if (item.singe && !item.instance) {
        item.instance = item?.cb()
      }
      return (item.singe ? item.instance : item?.cb()) as T
    } else {
      throw Error('没有item')
    }
  }
}

// interface IUser {
//   test(str: string): void
// }

// class User implements IUser {
//   public test(str: string): void {
//     console.log('str', str)
//   }
// }

// const ioc = new CreateIoc()
// ioc.bind<IUser>('User', User)
// const user = ioc.use<IUser>('User')
// user.test('lxy')
