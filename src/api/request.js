// 导入axios
import axios from "axios";
import store from "@/store";
import { useMessage } from "naive-ui";
window.$message = useMessage();
const request = axios.create({
  // baseURL 将自动加在 url`前面，除非 url 是一个绝对 URL。
  // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
  baseURL: "/api",
  // timeout设置一个请求超时时间，如果请求时间超过了timeout，请求将被中断，单位为毫秒（ms）
  timeout: 60000,
  // headers是被发送的自定义请求头，请求头内容需要根据后端要求去设置，这里我们使用本项目请求头。
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const uploadKnowledgeurl = "/api";

let whitelists = ["/user/Login/","/user/Register/"];
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以做一些处理，比如添加请求头等
    if (whitelists.includes(config.url)) {
      return config;
    } else {
      const islogin = store.getters.isLoggedIn;
      if (islogin) {
        let id = store.getters.userinfo.id;
        let user = store.getters.userinfo.id;
        let user_id = store.getters.userinfo.id;
        config.params = { ...config.params, id, user, user_id };
        return config
      }else{
        window.$message.error("请先点击左下角头像进行登录！")
        return Promise.reject("请登录");
      }
    }
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
// request.interceptors.response.use(
// 	response => {
// 		// 在这里可以对响应数据进行处理
// 		return response.data;
// 	},
// 	error => {
// 		// 响应错误处理
// 		return Promise.reject(error);
// 	}
// )

export default request;
