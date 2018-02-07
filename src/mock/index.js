import Mock from 'mockjs'
import loginAPI from './login'
import userAPI from './user'
import deptAPI from './dept'
import aclAPI from './acl'
import roleAPI from './role'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/authentication\/form/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/authentication\/mobile/, 'post', loginAPI.loginByMobile)
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
// 权限相关
Mock.mock(/\/sys\/acl\/tree\.*/, 'get', aclAPI.aclTree)
Mock.mock(/\/sys\/acl\/save\.*/, 'post', aclAPI.addAcl)
// 角色相关
Mock.mock(/\/sys\/role\/list\.*/, 'get', roleAPI.getRoleList)
Mock.mock(/\/sys\/role\/save\.*/, 'post', roleAPI.addRole)
// 发送短信验证码
Mock.mock(/\/code\/sms\.*/, 'get', loginAPI.sendCode)
export default Mock
