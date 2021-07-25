import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs'
import parse from 'parse-headers'
import { AxiosInterceptorManager } from './AxiosInterceptorManager'

let defaults: AxiosRequestConfig = {
  method: 'GET',
  timeout: 0,
  headers: {
    common: {
      //针对所有方法的请求生效
      accept: 'application/json' //告诉服务器返回json格式的数据
    }
  },
  transformRequest: (data: Record<string, any>, headers: any) => {
    headers['common']['content-type'] = 'application/json'
    return JSON.stringify(data)
  },
  transformResponse: (res: any) => {
    return res.data
  }
}

let getStyleMethods = ['get', 'delete', 'head', 'options'] //get风格的请求
let postStyleMethods = ['post', 'put', 'patch'] //post风格的请求
getStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {}
})
postStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {
    'content-type': 'application/json' //请求体的格式
  }
})

let allMethods = [...getStyleMethods, ...postStyleMethods]

export class Axios<T> {
  public defaults = defaults
  public interceptors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse<T>>()
  }
  //T 响应对象 response 里的 data的类型
  request(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    config.headers = Object.assign(this.defaults.headers, config.headers)
    if (config.transformRequest && config.data) {
      config.data = config.transformRequest(config.data, config.headers)
    }
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
            if (config.transformResponse) {
              res = config.transformResponse(res)
            }
            resolve(res)
          } else {
            reject('request error failed with code 400')
          }
        }
      }
      if (headers) {
        for (let key in headers) {
          //common表示所有请求方法都生效 或者说key是一个方法名
          if (key === 'common' || allMethods.includes(key)) {
            for (let key2 in headers[key]) {
              request.setRequestHeader(key2, headers[key][key2])
            }
          } else {
            request.setRequestHeader(key, headers[key])
          }
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
      if (config.CancelToken) {
        config.CancelToken.then((msg: string) => {
          request.abort()
          reject(msg)
        })
      }
      request.send(body)
    })
  }
}
