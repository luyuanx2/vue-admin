import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {title: '首页', icon: 'dashboard', noCache: true}
    }]
  }
]
export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/example/table/complex-table',
  //   name: 'User',
  //   meta: {
  //     title: '用户管理',
  //     icon: 'example'
  //   },
  //   children: [
  //     {path: 'userList', component: _import('user/index'), name: 'UserList', meta: {title: '用户列表'}},
  //     {path: 'userList1', component: _import('user/index'), name: 'UserList', meta: {title: '用户列表'}}
  //   ]
  // },
  {
    path: '/acl',
    component: Layout,
    redirect: 'noredirect',
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'permission'
    },
    children: [
      {path: 'user', component: _import('acl/user/index'), name: 'UserManage', meta: {title: '用户管理'}},
      {path: 'acl', component: _import('acl/acl/index'), name: 'AclManage', meta: {title: '权限管理'}},
      {path: 'role', component: _import('acl/role/index'), name: 'RoleManage', meta: {title: '角色管理'}},
      {path: 'log', component: _import('acl/log/index'), name: 'LogManage', meta: {title: '权限更新记录'}}
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'Sys',
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {path: 'sql',component: _import('system/sql/index'), name: 'Sql', meta: {title: 'SQL监控'}},
      {path: 'swagger',component: _import('system/swagger/index'), name: 'Swagger', meta: {title: 'Swagger'}}
      ]
  }
  // ,
  // {
  //   path: '/iframe',
  //   component: Layout,
  //   redirect: '/iframe', // you can set roles in root nav
  //   children: [{
  //     path: ':routerPath',
  //     component: _import('iframe/index'),
  //     name: 'iframe',
  //     meta: {
  //       title: 'iframe',
  //       icon: 'people'
  //     }
  //   }]
  // }
]
