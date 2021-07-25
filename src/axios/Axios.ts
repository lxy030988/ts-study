import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs'
import parse from 'parse-headers'
import { AxiosInterceptorManager } from './AxiosInterceptorManager'

export class Axios<T> {
  public interceptors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse<T>>()
  }
  //T 响应对象 response 里的 data的类型
  request(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    const chain = [
      { onFulfilled: this.dispatchRequest, onRejected: (e: any) => e }
    ]
    // [request3,request2,request1,request,response1,response2,response3]
    this.interceptors.request.interceptors.forEach((item: any) => {
      item && chain.unshift(item)
    })
    this.interceptors.response.interceptors.forEach((item: any) => {
      item && chain.push(item)
    })
    let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> =
      Promise.resolve(config)
    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!
      promise = promise.then(onFulfilled, onRejected)
    }
    return promise
    // return this.dispatchRequest(config)
  }

  //定义一个派发请求的方法
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { url, method, params, headers, data, timeout } = config
      let request = new XMLHttpRequest()

      let nParams: any = params
      if (params && typeof params == 'object') {
        nParams = qs.stringify(params)
        // /getuser?
        url += (url!.indexOf('?') == -1 ? '?' : '&') + nParams
      }

      request.open(method!, url!, true)
      request.responseType = 'json'
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status !== 0) {
          if (request.status >= 200 && request.status < 300) {
            let res: AxiosResponse<T> = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parse(request.getAllResponseHeaders()),
              config,
              request
            }
            resolve(res)
          } else {
            reject('request error failed with code 400')
          }
        }
      }
      if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key])
        }
      }
      let body: string | null = null
      if (data) {
        body = JSON.stringify(data)
      }
      request.onerror = () => {
        reject('net:网络连接错误')
      }
      if (timeout) {
        request.timeout = timeout
        request.ontimeout = () => {
          reject(`Error: timeout of ${timeout}ms exceeded`)
        }
      }
      request.send(body)
    })
  }
}
