import request from '@/utils/request'

export function getUserList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}
