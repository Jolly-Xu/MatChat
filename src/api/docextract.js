import request from "./request";

export function get_file_keywords() {
  return request({
    url: "/KeywordSearch/",
    method: "Get",
  });
}


export function postlit(data,index) {
  return request({
    url: '/LERE/file/'+index+'/',
    method: 'POST',
    data:{
      keywords:data
    }
  })
}

export function get_doc_url(index) {
  return request({
    url: '/xml_parsing/',
    method: 'Get',
    params:{
      XmlID:index
    }
  })
}

export function get_neo4jbyid(id) {
  return request({
    url: '/NeoSearch/?liter_id='+id,
    method: 'Get',
  })
}