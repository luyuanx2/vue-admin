import request from '@/utils/request'
import qs from 'qs'
export function getLogList(query) {
  return request({
    url: '/sys/log/list',
    method: 'get',
    params: query
  })
}

export function recover(obj) {
  return request({
    url: '/sys/log/recover',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
  })
}

