import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    name: '@cname',
    type: '@pick([1,2])',
    status: '@pick([1,2])'
  }))
}


const addRole = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const getRoleUserList = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
    'users|15': [
      {
        id: '@increment',
        username: '@cname',
        status: '@pick([1,2])'
      }
    ],
    'selected|5': [
      '@increment'
    ]
  }
})

export default {
  getRoleList: config => {
    const { page = 1, limit = 20} = param2Obj(config.url)
    let mockList = List
    let pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 2000,
      data: {
        total: List.length,
        list: pageList
      }
    }
  },
  addRole: config => addRole,
  getRoleUserList: config => getRoleUserList
}
