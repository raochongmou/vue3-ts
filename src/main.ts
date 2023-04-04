import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import { initVuex } from "./store";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "normalize.css";
import 'element-plus/dist/index.css';
// import RCMRquest from "./service";
import './assets/main.css';
import getGlobalFormatTime from "@/global/getGlobalFormat";


// interface IDataType {
//   config: Object
//   data: Object
//   headers: Object
//   request: Object
//   status: Number
//   statusText: String
// }

// RCMRquest.post<IDataType>({
//   url: "/users/list",
//   // method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NjU5MzE1NTgsImV4cCI6MTY2ODUyMzU1OH0.npf1Lr1HU72lC-mjeL-4RXdVDR3HK1fpBInzriOT_aI3Dy0REJIWHxrjomfLj37SeoozQqJPJjTERSP9xvH37pe5j24NKxlUmIg3d9fz6Q2RgGXXhs1DwGgNewwpaY6g5_3Ccxi5yx5Q_TL1gUaB3aY31wc8RrEslE9vCFJiuYI"
//   },
//   interceptors: {
//      requestInterceptor: (config) => {
//       console.log("单个请求的拦截器");
//       return config;
//      },
//      responseInterceptor: (res) => {
//       console.log("单个响应的拦截器");
//       return res;
//      }
//   },
//   data: {
//     offset: 0,
//     size: 100
//   }
// }).then(res => {
//   console.log(res.config);
//   console.log(res.data);
// })

const app = createApp(App)
getGlobalFormatTime(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
initVuex();
app.use(router).use(store).mount('#app')

