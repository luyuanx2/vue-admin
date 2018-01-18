import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    username: '@cname',
    telephone: /^1[0-9]{10}$/,
    email: '@email',
    status: '@pick([1,2])',
    deptId: '@pick([1,2,3,4,5,6,7])',
    remark: '备注信息'
  }))
}

const addUser = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})
export default {
  getUserList: config => {
    const { page = 1, limit = 20 } = param2Obj(config.url)

    let mockList = List
    // if (sort === '-id') {
    //   mockList = mockList.reverse()
    // }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 2000,
      data: {
        total: mockList.length,
        list: pageList
      }
    }
  },
  addUser: config => addUser,
}
