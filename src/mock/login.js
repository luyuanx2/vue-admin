import { param2Obj } from '@/utils'
import Mock from 'mockjs'

const userMap = {
  admin: {
    code: 2000,
    data: {
      role: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    }
  },
  editor: {
    code: 2000,
    data: {
      role: ['editor'],
      token: 'editor',
      introduction: '我是编辑',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }
  }
}

const sendCode = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {}
})


export default {
  loginByUsername: config => {
    // const { username } = JSON.parse(config.body)
    console.log(config.body)
    return userMap['admin']
  },
  loginByMobile: config => {
    // const { username } = JSON.parse(config.body)
    console.log(config.body)
    return userMap['admin']
  },
  getUserInfo: config => {
    console.log(config.body)
    const token = 'admin'
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success',
  sendCode: config => sendCode
}
