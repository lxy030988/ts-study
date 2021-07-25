import { AxiosInterceptorManager } from './AxiosInterceptorManager'

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  params?: Record<string, any>
  headers?: Record<string, any>
  data?: Record<string, any>
  timeout?: number
  transformRequest?: (data: Record<string, any>, headers: any) => any
  transformResponse?: (data: Record<string, any>) => any
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers?: Record<string, any>
  config?: AxiosRequestConfig
  request?: XMLHttpRequest
}
