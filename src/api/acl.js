import request from '@/utils/request'
import qs from 'qs'
export function getAclTree() {
  return request({
    url: '/sys/acl/tree',
    method: 'get'
  })
}

export function addAcl(obj) {
  return request({
    url: '/sys/acl/save',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}

export function updateAcl(obj) {
  return request({
    url: '/sys/acl/update',
    method: 'put',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}

export function deleteAcl(obj) {
  return request({
    url: '/sys/acl/delete',
    method: 'delete',
    params: obj
  })
}

