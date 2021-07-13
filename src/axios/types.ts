export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface AxiosRequestConfig {
  url: string
  method: Methods
  params: Record<string, any>
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers?: Record<string, any>
  config?: AxiosRequestConfig
  request?: XMLHttpRequest
}
