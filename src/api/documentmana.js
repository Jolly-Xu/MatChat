import request from "./request";


// 获取文章列表
export function getdocumentlist(page) {
    return request({
      url: '/user_literatures/',
      method: 'get',
      params:{
        page:page
      }
    })
}

// 文档总个数
export function documentlisttotal() {
  return request({
    url: '/literatures_total/',
    method: 'get',
  })
}

export function updata_doc(id,data) {
  return request({
    url: '/literatures/'+id+"/",
    method: 'PUT',
    data:data
  })
}


export function search_paper(content1,option1) {
  return request({
    url: '/search_paper/',
    method: 'GET',
    params:{
      content:content1,
      option:option1,
    }
  })
}


export function delete_doc(id) {
  return request({
    url: '/literatures/'+id+"/",
    method: 'DELETE',
  })
}


export function paper_add_api(d) {
  return request({
    url: '/UpFile/',
    method: 'Post',
    data:d
  })
}