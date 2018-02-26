import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    operator: '@cname',
    type: '@pick([1,2,3,4,5,6])',
    operateTime: +Mock.Random.date('T'),
    oldValue: "{\n" +
    "  \"operatorTime\" : \"2018-2-18 14:21\",\n" +
    "  \"name\" : \"greely\",\n" +
    "  \"mobile\" : \"15675504080\",\n" +
    "  \"id\" : 23,\n" +
    "  \"email\" : \"geely@happymmall.com\",\n" +
    "  \"age\" : 18\n" +
    "}",
    newValue: "{\n" +
    "  \"operatorTime\" : \"2018-2-18 14:21\",\n" +
    "  \"name\" : \"greely\",\n" +
    "  \"mobile\" : \"15675504080\",\n" +
    "  \"id\" : 23,\n" +
    "  \"email\" : \"geely@happymmall.com\",\n" +
    "  \"age\" : 18\n" +
    "}"
  }))
}

const recover = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

export default {
  getLogList: config => {
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
  recover: config => recover
}
