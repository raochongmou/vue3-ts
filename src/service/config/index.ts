import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { RcmRequestInterceptor, RcmRequestConfig } from "./type";
import { ElLoading } from 'element-plus';
import type { LoadingOptionsResolved } from "element-plus/lib/components/loading/src/types";


class CMRequest {
  instance: AxiosInstance
  loading?: any
  isShowLoading?: Boolean
  // interceptors?: RcmRequestInterceptor
  constructor(config: RcmRequestConfig) {
    this.instance = axios.create(config);
    this.isShowLoading = config.isShowLoading??true
    // this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      // this.interceptors?.requestInterceptor, 
      // this.interceptors?.requestInterceptorCatch
      config.interceptors?.requestInterceptor, 
      config.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor, 
      config.interceptors?.responseInterceptorCatch
      // this.interceptors?.responseInterceptor, 
      // this.interceptors?.responseInterceptorCatch
    );

    // 全局拦截器
    this.instance.interceptors.request.use((config) => {
      if(this.isShowLoading) {
        this.loading = ElLoading.service({
          text: "正在加载...",
          lock: false,
          body: true,
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.5)"
          // fullscreen: true
        });
      }
      // console.log("全局请求成功的拦截器```");
      return config
    }, (err) => {
      // console.log("全局请求失败的拦截器```");
      return err
    })
    this.instance.interceptors.response.use((res) => {
      // console.log("全局请求成功的拦截器```");
      setTimeout(() => {
        this.loading?.close();
      }, 2000);
      return res
    }, (err) => {
      // console.log("全局响应失败的拦截器");
      this.loading?.close();
      return err
    })
  }
  // request(config: AxiosRequestConfig): void {
  request<T = any>(config: RcmRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const interceptors = config.interceptors;
      if(interceptors?.requestInterceptor) {
        config = interceptors.requestInterceptor(config);
      }
      this.instance.request<any, T>(config).then(res => {
        // console.log(res);
        // const res1 = interceptors.responseInterceptor(res);
        resolve(res);
        return res;
      })
    })
  }
  get<T = any>(config: RcmRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }
  delete<T = any>(config: RcmRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  post<T = any>(config: RcmRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  patch<T = any>(config: RcmRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default CMRequest;