import Mock from 'mockjs'

const listDept = Mock.mock({
  code: 2000,
  message: 'OK',
  data: [{
    id: 1,
    name: '部门列表',
    deptList: [{
      id: 2,
      name: '总经理室',
      deptList: []
    }, {
      id: 3,
      name: '市场部',
      disabled: true,
      deptList: [{
        id: 7,
        name: '招生部',
        deptList: []
      }, {
        id: 8,
        name: '咨询部',
        disabled: true,
        deptList: []
      }]
    },{
      id: 4,
      name: '教学部',
      disabled: true,
      deptList: []
    },{
      id: 5,
      name: '后勤部',
      disabled: true,
      deptList: []
    },{
      id: 6,
      name: '技术部',
      disabled: true,
      deptList: [{
        id: 9,
        name: '前端开发',
        deptList: []
      }, {
        id: 10,
        name: '后端开发',
        disabled: true,
        deptList: []
      }]
    }]
  }]
})

const addDept = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
    id: '@integer(50, 100)',
    label: '新增的'
  }
})

const deleteDept = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

const updateDept = Mock.mock({
  code: 2000,
  message: 'OK',
  data: {
  }
})

export default {
  listDept: config => listDept,
  addDept: config => addDept,
  deleteDept: config => deleteDept,
  updateDept: config => updateDept
}
