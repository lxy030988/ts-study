import { parseScript } from 'esprima'
import { Pattern } from 'estree'
import 'reflect-metadata'

import { CreateIoc } from './ioc'
const con = new CreateIoc()

interface ITypes {
  [key: string]: symbol
}
const TYPES: ITypes = {
  index: Symbol.for('Index')
}

interface IIndex {
  logs(str: string): void
}

class Index implements IIndex {
  constructor() {}
  public logs(str: string): void {
    console.log('str:', str)
  }
}
class Index2 implements IIndex {
  constructor() {}
  public logs(str: string): void {
    console.log('Index2 str:', str)
  }
}
// con.bind('Index', Index)
con.bind(TYPES.index, Index)

function getParams(fn: Function) {
  const ast = parseScript(fn.toString())
  const node = ast.body[0]
  let fnParams: Pattern[] = []

  if (node.type === 'FunctionDeclaration') {
    fnParams = node.params
  }

  let params: string[] = []

  fnParams.forEach((item) => {
    if (item.type === 'Identifier') {
      params.push(item.name)
    }
  })
  return params
}

//判断一个对象 是否有对应的key
function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key)
}

//{} object  代码块 函数体
function constructor<T extends { new (...args: any[]): {} }>(c: T) {
  class Ctro extends c {
    constructor(...args: any[]) {
      super(args)
      const _parasm = getParams(c)
      let _p: string
      for (_p of _parasm) {
        // "noImplicitThis": false
        // "noImplicitAny": false
        // this[_p] = new Index()
        const _meta = Reflect.getMetadata(TYPES[_p], c)
        // console.log('this[_p]', hasKey(this, _p) && (this[_p] as any).length)
        if (hasKey(this, _p)) {
          if (!(this[_p] as any).length && _meta) {
            // this[_p] = con.use('Index')
            // this[_p] = con.use(TYPES[_p])
            this[_p] = _meta
          } else {
            this[_p] = (this[_p] as any)[0]
          }
        }
      }
    }
  }
  return Ctro
}

function inject(key: PropertyKey): Function {
  return (target: Function, targetKey: string, index?: number) => {
    console.log('inject', key, target, targetKey, index)
    if (!targetKey) {
      Reflect.defineMetadata(key, con.use(key), target)
    }
  }
}

@constructor
class IndexCtro {
  private index: IIndex
  constructor(@inject(TYPES.index) index?: IIndex) {
    this.index = index!
    console.log('IndexCtro constructor')
  }
  info() {
    // console.log('this.index', this.index)
    this.index.logs('lixiangyu')
  }
}
const index = new IndexCtro()
index.info()

const index2 = new IndexCtro(new Index2())
index2.info()
