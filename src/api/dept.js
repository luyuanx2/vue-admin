import request from '@/utils/request'

export function listDept(query) {
  return request({
    url: '/sys/dept/listDept',
    method: 'get',
    params: query
  })
}
export function addDept(query) {
  return request({
    url: '/sys/dept/addDept',
    method: 'post',
    params: query
  })
}
