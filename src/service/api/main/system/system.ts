import instanceAxios from "@/service";

export function getPageListAxios(pageUrl, queryList) {
  return instanceAxios.post({
    url: pageUrl,
    data: queryList
  })
}

export function delPageDataAxios(pageUrl: any, id: number) {
  return instanceAxios.delete({
    url: `/${pageUrl}/${id}`
  })
}

export function getDepDataAxios(url: any, params) {
  return instanceAxios.post({
    url,
    params
  })
}

export function getRoleDataAxios(url: any, params) {
  return instanceAxios.post({
    url,
    params
  })
}

export function editPageDataAxios(url: any, data) {
  console.log("url", url);
  console.log("data", data);
  
  return instanceAxios.patch({
    url,
    data
  })
}

export function addPageDataAxios(url: any, data) {
  console.log("url", url);
  console.log("data", data);
  
  return instanceAxios.post({
    url,
    data
  })
}