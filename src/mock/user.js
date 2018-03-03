import Mock from 'mockjs'
import { param2Obj, deepCopy} from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    username: '@cname',
    telephone: /^1[0-9]{10}$/,
    mail: '@email',
    status: '@pick([1,2])',
    deptId: '@pick([1,2,3,4,5,6,7])',
    remark: '用户备注信息'
  }))
}

const addUser = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const updateUser = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const deleteUser = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})


export default {
  getUserList: config => {
    const { page = 1, limit = 20, deptId} = param2Obj(config.url)
    let mockList = List
    // if (sort === '-id') {
    //   mockList = mockList.reverse()
    // }
    let pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    let pageList1 = []
    let flag = true
    if(deptId != 0){
      flag = false
      // 深度拷贝数组
      pageList1 = deepCopy(pageList)
      pageList1.forEach((item) => {
        item.deptId = deptId
      })
    }
    return {
      code: 2000,
      data: {
        total: mockList.length,
        list: flag ? pageList : pageList1
      }
    }
  },
  addUser: config => addUser,
  updateUser: config => updateUser,
  deleteUser: config => deleteUser,
}
