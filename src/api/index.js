// index 页面的api请求
const baseFetchUrl = "/api";
import request from "./request";
import store from "@/store";
import { useMessage } from "naive-ui";
window.$message = useMessage();
const chatFetchUrl = "/Api";

export function chat2test(data) {
  if (store.getters.isLoggedIn) {
    const controller = new AbortController();
    const signal = controller.signal;
    return [
      fetch(chatFetchUrl + "/mat_chat/", {
        method: "Post",
        signal,
        body: JSON.stringify(data),
      }),
      controller,
    ];
  }else{
    window.$message.error("请先点击左下角头像进行登录！")
  }
}

export function postrule(data) {
  return request({
    method: "post",
    data: data,
    url: "/rules",
  });
}

export function ConnDatabases(data) {
  return request({
    method: "post",
    data: data,
    url: "/connect_sql/",
  });
}

export function getTablesByBasename(data) {
  return request({
    method: "post",
    data: data,
    url: "/select_column/",
  });
}

export function changeDB(data) {
  return request({
    method: "post",
    data: data,
    url: "/get_db_name/",
  });
}

export function getHistory() {
  return request({
    method: "GET",
    url: "/history_message/",
  });
}

export function openhistory(id) {
  return request({
    method: "POST",
    data: {
      id: id,
    },
    url: "/choose_chat/",
  });
}

export function connecttoDemo() {
  return request({
    method: "POST",
    url: "/sql_demo/",
  });
}

export function login(data) {
  return request({
    url: "/user/Login/",
    method: "post",
    data,
  });
}


export function register(data) {
  return request({
    url: '/user/Register/',
    method: 'post',
    data
  })
}