import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    userName: '@cname',
    mobile: '@mobile',
    'status|1': ['published', 'draft', 'deleted']
  }))
}

export default {
  getUserList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
