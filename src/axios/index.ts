//可以创建一个axios实例 axios其实就是一个函数
//定义一个类的时候  一个类的原型Axios.prototype  一个类的实例

import { Axios } from './Axios'
import { CancelToken, isCancel } from './cancel'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  let context = new Axios<any>() //this指向上下文

  //让request 方法里的this永远指向context 也就是 new Axios()
  let instance = Axios.prototype.request.bind(context)

  //把Axios的类的实例 和 类的原型上的方法 都拷贝到instance上，也就是request方法上
  instance = Object.assign(instance, Axios.prototype, context)
  return instance as AxiosInstance
}

let axios = createInstance()
axios.CancelToken = new CancelToken()
axios.isCancel = isCancel

export default axios
export * from './types'
