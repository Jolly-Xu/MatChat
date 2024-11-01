import request from "./request";
export function search_neotitle() {
  return request({
    url: "/NeoUserSearch/",
    method: "Get",
  });
}

// 获取知识图谱
export function getMKG(name, stype, userid) {
  return request({
    url: "/medicine/getMKG",
    method: "get",
    params: { name: name, stype: stype, user: userid },
  });
}

export function getMKG2(name, stype, userid) {
  return request({
    url:"/medicine/getMKG",
    method: "get",
    params: { name: name, stype: 3, user: userid, type: stype },
  });
}
