import Mock from 'mockjs'

const listDept = Mock.mock({
  code: 2000,
  message: 'OK',
  data: [{
    id: 1,
    label: '一级 2',
    children: [{
      id: 3,
      label: '二级 2-1',
      children: [{
        id: 4,
        label: '三级 3-1-1'
      }, {
        id: 5,
        label: '三级 3-1-2',
        disabled: true
      }]
    }, {
      id: 2,
      label: '二级 2-2',
      disabled: true,
      children: [{
        id: 6,
        label: '三级 3-2-1'
      }, {
        id: 7,
        label: '三级 3-2-2',
        disabled: true
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
  updateDept: config => updateDept,
}
