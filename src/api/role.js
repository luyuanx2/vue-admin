import request from '@/utils/request'
import qs from 'qs'

export function getRoleList(query) {
  return request({
    url: 'sys/role/list',
    method: 'get',
    params: query
  })
}

export function getRoleUserList(query) {
  return request({
    url: 'sys/role/users',
    method: 'get',
    params: {
      roleId: query
    }
  })
}

export function addRole(obj) {
  return request({
    url: 'sys/role/save',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}
