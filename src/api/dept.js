import request from '@/utils/request'
import qs from 'qs'
export function listDept() {
  return request({
    url: '/sys/dept/listDept',
    method: 'get'
  })
}
export function addDept(obj) {
  return request({
    url: '/sys/dept/addDept',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}

export function deleteDept(obj) {
  return request({
    url: '/sys/dept/delete',
    method: 'delete',
    params: obj
  })
}
export function updateDept(obj) {
  return request({
    url: '/sys/dept/update',
    method: 'put',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}
