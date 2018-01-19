import Mock from 'mockjs'

const listDept = Mock.mock({
  code: 2000,
  message: 'OK',
  data: [{
    id: 1,
    label: '部门列表',
    children: [{
      id: 2,
      label: '总经理室',
      children: []
    }, {
      id: 3,
      label: '市场部',
      disabled: true,
      children: [{
        id: 7,
        label: '招生部',
        children: []
      }, {
        id: 8,
        label: '咨询部',
        disabled: true,
        children: []
      }]
    },{
      id: 4,
      label: '教学部',
      disabled: true,
      children: []
    },{
      id: 5,
      label: '后勤部',
      disabled: true,
      children: []
    },{
      id: 6,
      label: '技术部',
      disabled: true,
      children: [{
        id: 9,
        label: '前端开发',
        children: []
      }, {
        id: 10,
        label: '后端开发',
        disabled: true,
        children: []
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
