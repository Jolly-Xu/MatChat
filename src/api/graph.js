import request from "./request";

export function get_relation() {
  return request({
    url: "/main/get_relation",
    method: "get",
  });
}

export function get_tree() {
  return request({
    url: "/main/get_tree",
    method: "get",
  });
}


export function get_tree_map() {
  return request({
    url: '/main/get_tree_map',
    method: 'get',
  })
}