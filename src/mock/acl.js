import Mock from 'mockjs'

const aclTree = Mock.mock({
  code: 2000,
  message: 'OK',
  data: [
    {
      id: 1,
      parentId: 0,
      name: '菜单目录',
      icon: '',
      seq: 0,
      type: 1,
      level: '0',
      url: 'www.baidu.com',
      children: [
        {
          id: 2,
          parentId: 1,
          name: '首页',
          icon: 'dashboard',
          seq: 1,
          type: 2,
          level: '0.2',
          url: 'www.baidu.com',
        },
        {
          id: 3,
          parentId: 1,
          name: '用户管理',
          icon: 'dashboard',
          seq: 2,
          type: 1,
          url: '',
          level: '0.3',
          children: [

          ]
        },
        {
          id: 4,
          parentId: 1,
          name: '权限管理',
          icon: 'dashboard',
          seq: 3,
          type: 1,
          url: '',
          level: '0.4',
          children: [
            {
              id: 5,
              parentId: 4,
              name: '用户管理',
              icon: 'dashboard',
              seq: 1,
              type: 2,
              url: 'www.baidu.com',
              level: '0.4.5',
              children: [
                {
                  id: 8,
                  parentId: 5,
                  name: '添加',
                  icon: '',
                  seq: 1,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.5.8',
                },
                {
                  id: 9,
                  parentId: 5,
                  name: '删除',
                  icon: 'dashboard',
                  seq: 2,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.5.9',
                },
                {
                  id: 10,
                  parentId: 5,
                  name: '修改',
                  icon: 'dashboard',
                  seq: 3,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.5.10',
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
              url: 'www.baidu.com',
              level: '0.4.6',
              children: [
                {
                  id: 11,
                  parentId: 6,
                  name: '添加',
                  icon: '',
                  seq: 1,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.6.11',
                },
                {
                  id: 12,
                  parentId: 6,
                  name: '删除',
                  icon: 'dashboard',
                  seq: 2,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.6.12',
                },
                {
                  id: 13,
                  parentId: 6,
                  name: '修改',
                  icon: 'dashboard',
                  seq: 3,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.6.13',
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
              url: 'www.baidu.com',
              level: '0.4.7',
              children: [
                {
                  id: 14,
                  parentId: 5,
                  name: '添加',
                  icon: '',
                  seq: 1,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.7.14',
                },
                {
                  id: 15,
                  parentId: 5,
                  name: '删除',
                  icon: 'dashboard',
                  seq: 2,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.7.15',
                },
                {
                  id: 16,
                  parentId: 5,
                  name: '修改',
                  icon: 'dashboard',
                  seq: 3,
                  type: 3,
                  url: 'www.baidu.com',
                  level: '0.4.7.16',
                }
              ]
            },
          ]
        }
      ]
    }
  ]
})

const addAcl = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {}
})
const updateAcl = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {}
})

export default {
  aclTree: config => aclTree,
  addAcl: config => addAcl,
  updateAcl: config => updateAcl
}
