//请求拦截器：先添加先执行   响应拦截器：先添加后执行

export class AxiosInterceptorManager<T> {
  public interceptors: any[] = []
  //添加一个拦截器
  use(
    onFulfilled?: (value: T) => T | Promise<T>,
    onRejected?: (error: any) => any
  ): number {
    this.interceptors.push({
      onFulfilled,
      onRejected
    })
    return this.interceptors.length - 1
  }

  //根据索引删除一个拦截器
  eject(id: number) {
    this.interceptors[id] = null
  }
}
