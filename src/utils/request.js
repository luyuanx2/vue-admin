import axios from 'axios'
import Fingerprint from 'fingerprintjs'
// import qs from 'qs'
// import {Message, MessageBox} from 'element-ui'
import {Message} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://192.168.202.1:8999/manage',
  // baseURL: 'http://localhost:8999',
  timeout: 15000                  // 请求超时时间
})
const deviceId = new Fingerprint().get();
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'bearer ' + getToken()
  }
  // if (config.method.toLowerCase() === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  config.headers['deviceId'] = deviceId
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data
    console.log('响应拦截器')
    console.log(res)
    if (res.code === 4001) { //没有登录
      return res
    }
    if (res.code !== 2000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return res // Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    // if (error.response.status === 401 && error.response.data.headimg !== undefined) {
    //   return error.response
    // }
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
