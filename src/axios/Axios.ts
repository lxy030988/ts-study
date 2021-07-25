import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs'
import parse from 'parse-headers'

export class Axios {
  //T 响应对象 response 里的 data的类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config)
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
