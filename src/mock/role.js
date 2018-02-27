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
    'selected': [
      201,202,203,204,205
    ]
    // 'selected|5': [
    //   '@increment'
    // ]
  }
})

const getRoleTreeData = Mock.mock({
  code: 2000,
  message: 'OK',
  data: [
    {
      id: 1,
      parentId: 0,
      name: '菜单目录',
      icon: '',
      seq: 0,
      checked: false,
      type: 1,
      level: '0',
      url: 'www.baidu.com',
      aclList: [
        {
          id: 2,
          parentId: 1,
          name: '首页',
          icon: 'dashboard',
          seq: 1,
          checked: true,
          type: 2,
          level: '0.2',
          url: 'www.baidu.com',
          aclList: []
        },
        {
          id: 3,
          parentId: 1,
          name: '用户管理',
          icon: 'dashboard',
          seq: 2,
          checked: false,
          type: 1,
          url: '',
          level: '0.3',
          aclList: []
        },
        {
          id: 4,
          parentId: 1,
          name: '权限管理',
          icon: 'dashboard',
          seq: 3,
          type: 1,
          checked: true,
          url: '',
          level: '0.4',
          aclList: [
            {
              id: 5,
              parentId: 4,
              name: '用户管理',
              icon: 'dashboard',
              seq: 1,
              type: 2,
              checked: true,
              url: 'www.baidu.com',
              level: '0.4.5',
              aclList: [
                {
                  id: 8,
                  parentId: 5,
                  name: '添加',
                  icon: '',
                  seq: 1,
                  type: 3,
                  checked: true,
                  url: 'www.baidu.com',
                  level: '0.4.5.8',
                  aclList: []
                },
                {
                  id: 9,
                  parentId: 5,
                  name: '删除',
                  icon: 'dashboard',
                  seq: 2,
                  type: 3,
                  checked: true,
                  url: 'www.baidu.com',
                  level: '0.4.5.9',
                  aclList: []
                },
                {
                  id: 10,
                  parentId: 5,
                  name: '修改',
                  icon: 'dashboard',
                  seq: 3,
                  type: 3,
                  checked: true,
                  url: 'www.baidu.com',
                  level: '0.4.5.10',
                  aclList: []
                }
              ]
            },
            {
              id: 6,
              parentId: 4,
              name: '权限管理',
              icon: 'dashboard',
              seq: 2,
              type: 2,
              checked: true,
              url: 'www.baidu.com',
              level: '0.4.6',
              aclList: [
                {
                  id: 11,
                  parentId: 6,
                  name: '添加',
                  icon: '',
                  seq: 1,
                  checked: true,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.6.11',
                  aclList: []
                },
                {
                  id: 12,
                  parentId: 6,
                  name: '删除',
                  icon: 'dashboard',
                  seq: 2,
                  type: 3,
                  checked: true,
                  url: 'www.baidu.com',
                  level: '0.4.6.12',
                  aclList: []
                },
                {
                  id: 13,
                  parentId: 6,
                  name: '修改',
                  icon: 'dashboard',
                  seq: 3,
                  type: 3,
                  checked: true,
                  url: 'www.baidu.com',
                  level: '0.4.6.13',
                  aclList: []
                }
              ]
            },
            {
              id: 7,
              parentId: 4,
              name: '角色管理',
              icon: 'dashboard',
              seq: 3,
              type: 2,
              checked: false,
              url: 'www.baidu.com',
              level: '0.4.7',
              aclList: [
                {
                  id: 14,
                  parentId: 5,
                  name: '添加',
                  icon: '',
                  seq: 1,
                  checked: true,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.7.14',
                  aclList: []
                },
                {
                  id: 15,
                  parentId: 5,
                  name: '删除',
                  icon: 'dashboard',
                  seq: 2,
                  type: 3,
                  checked: false,
                  url: 'www.baidu.com',
                  level: '0.4.7.15',
                  aclList: []
                },
                {
                  id: 16,
                  parentId: 5,
                  name: '修改',
                  icon: 'dashboard',
                  seq: 3,
                  type: 3,
                  checked: false,
                  url: 'www.baidu.com',
                  level: '0.4.7.16',
                  aclList: []
                }
              ]
            },
          ]
        }
      ]
    }
  ]
})

const changeAcls = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const changeUsers = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const addRole = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const updateRole = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
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
  getRoleUserList: config => getRoleUserList,
  getRoleTreeData: config => getRoleTreeData,
  changeAcls: config => changeAcls,
  changeUsers: config => changeUsers,
  addRole: config => addRole,
  updateRole: config => updateRole
}
