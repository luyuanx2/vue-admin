import request from '@/utils/request'
import qs from 'qs'
export function getAclTree() {
  return request({
    url: '/sys/acl/tree',
    method: 'get'
  })
}

