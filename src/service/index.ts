import CMRequest from "./config";
import { BASE_URL } from "./config/config";
import LocalCache from "@/utils";

const instanceAxios = new CMRequest({
  baseURL: BASE_URL,
  timeout: 1000,
  interceptors: {
    requestInterceptor: (config) => { 
      const token = LocalCache.getCache("token");
      if(token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config 
    },
    requestInterceptorCatch: (err) => {
      // console.log("请求失败的拦截器······");
      return err
    },
    responseInterceptor: (res) => {
      // console.log("响应成功的拦截器······");
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log("响应失败的拦截器······");
      return err
    },
  },
  isShowLoading: true
});

export default instanceAxios;