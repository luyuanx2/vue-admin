import request from '@/utils/request'
import qs from 'qs'


const authData =  {
  username: 'lyy',
  password: 'lyysecret'
}
export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/authentication/form',
    method: 'post',
    data,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }],
    auth: authData
  })
}

export function loginByMobile (mobile, smsCode) {
  const data = {
    mobile,
    smsCode
  }
  return request({
    url: '/authentication/mobile',
    method: 'post',
    data,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }],
    auth: authData
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function loginByThirdparty (code) {
  return request({
    url: '/qqLogin/weixin',
    method: 'get',
    params: { code },
    auth: authData
  })
}

export function sendCode (mobile) {
  return request({
    url: '/code/sms/',
    method: 'get',
    params: { mobile }
  })
}

export function bindSocial (obj) {
  return request({
    url: '/sys/user/regist',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }]
  })
}
