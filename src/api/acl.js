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

