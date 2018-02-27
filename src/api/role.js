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

export function getRoleTreeData(query) {
  return request({
    url: 'sys/role/roleTree',
    method: 'get',
    params: {
      roleId: query
    }
  })
}

export function changeAcls(obj) {
  return request({
    url: 'sys/role/changeAcls',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}

export function changeUsers(obj) {
  return request({
    url: 'sys/role/changeUsers',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
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

export function updateRole(obj) {
  return request({
    url: '/sys/role/update',
    method: 'put',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}
