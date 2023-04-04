import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RcmRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface RcmRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RcmRequestInterceptor<T>
  isShowLoading?: Boolean
}