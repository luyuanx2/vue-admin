import request from '@/utils/request'
import qs from 'qs'

export function getUserList(query) {
  return request({
    url: 'sys/user/list',
    method: 'get',
    params: query
  })
}

export function addUser(obj) {
  return request({
    url: 'sys/user/addUser',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}
