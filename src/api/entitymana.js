import request from "./request";

export function search_entiyname(content, userid) {
  return request({
    url: "/search_entorper/",
    method: "Get",
    params: {
      content: content,
      user: userid,
      search: 2,
    },
  });
}

export function search_entiy(type, content) {
  return request({
    url: "/search_extraction/",
    method: "Get",
    params: {
      type: type,
      content: content,
      search: 1,
    },
  });
}

export function search_entiyxin(content) {
  return request({
    url: "/search_entorper/",
    method: "Get",
    params: {
      content: content,
      search: 1,
    },
  });
}
