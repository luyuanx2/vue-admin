import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  { path: '/404', component: _import('login/index'), hidden: true },
  { path: '/401', component: _import('login/index'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/user',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'UserManage',
    meta: {
      title: '用户管理',
      icon: 'example'
    },
    children: [
      {
        path: '/user/userManage',
        component: _import('user/index'),
        redirect: '/example/table/complex-table',
        name: 'index',
        meta: {
          title: '用户管理',
          icon: 'example'
        },
        children: [
          { path: 'userList', component: _import('user/UserList'), name: 'UserList', meta: {title: '用户列表'}},
          { path: 'userList1', component: _import('user/UserList'), name: 'UserList', meta: {title: '用户列表'}},
          { path: 'userList2', component: _import('user/UserList'), name: 'UserList', meta: {title: '用户列表'}}
        ]
      },
      { path: 'userList', icon: 'tab', component: _import('login/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  }
]
