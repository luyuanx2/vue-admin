import Mock from 'mockjs'
import loginAPI from './login'
import userAPI from './user'
import deptAPI from './dept'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/authentication\/form/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)
// 用户相关
Mock.mock(/\/sys\/user\/list\.*/, 'get', userAPI.getUserList)
Mock.mock(/\/sys\/user\/addUser\.*/, 'post', userAPI.addUser)
// 部门相关
Mock.mock(/\/sys\/dept\/listDept\.*/, 'get', deptAPI.listDept)
Mock.mock(/\/sys\/dept\/addDept\.*/, 'post', deptAPI.addDept)
Mock.mock(/\/sys\/dept\/delete\.*/, 'delete', deptAPI.deleteDept)
Mock.mock(/\/sys\/dept\/update\.*/, 'put', deptAPI.updateDept)
export default Mock
