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
  },
  {
    path: '/documentation',
    component: _import('login/index'),
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('login/index'),
      name: 'documentation',
      meta: { title: '文档', icon: 'documentation', noCache: true }
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
    path: '/permission',
    component: _import('login/index'),
    redirect: '/permission/index',
    meta: {role: ['admin']},
    children: [{
      path: 'index',
      component: _import('login/index'),
      name: 'permission',
      meta: {
        title: '权限测试页',
        icon: 'lock',
        role: ['admin']
      }
    }]
  },

  {
    path: '/icon',
    component: _import('login/index'),
    children: [{
      path: 'index',
      component: _import('login/index'),
      name: 'icons',
      meta: {title: '图标', icon: 'icon', noCache: true}
    }]
  },
  {
    path: '/components',
    component: _import('login/index'),
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: '组件',
      icon: 'component'
    },
    children: [
      {path: 'tinymce', component: Layout, name: 'tinymce-demo', meta: {title: 'tinymce'}},
      {path: 'markdown', component: Layout, name: 'markdown-demo', meta: {title: 'markdown'}},
      {path: 'json-editor', component: Layout, name: 'jsonEditor-demo', meta: {title: 'jsonEditor'}},
      {path: 'dnd-list', component: Layout, name: 'dndList-demo', meta: {title: 'dndList'}},
      {path: 'splitpane', component: Layout, name: 'splitpane-demo', meta: {title: 'splitPane'}},
      {path: 'avatar-upload', component: Layout, name: 'avatarUpload-demo', meta: {title: 'avatarUpload'}},
      {path: 'dropzone', component: Layout, name: 'dropzone-demo', meta: {title: 'dropzone'}},
      {path: 'sticky', component: Layout, name: 'sticky-demo', meta: {title: 'sticky'}},
      {path: 'count-to', component: Layout, name: 'countTo-demo', meta: {title: 'countTo'}},
      {path: 'mixin', component: Layout, name: 'componentMixin-demo', meta: {title: 'componentMixin'}},
      {path: 'back-to-top', component: Layout, name: 'backToTop-demo', meta: {title: 'backToTop'}}
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: '图表',
      icon: 'chart'
    },
    children: [
      {path: 'keyboard', component: Layout, name: 'keyboardChart', meta: {title: 'keyboardChart', noCache: true}},
      {path: 'line', component: Layout, name: 'lineChart', meta: {title: 'lineChart', noCache: true}},
      {path: 'mixchart', component: Layout, name: 'mixChart', meta: {title: 'mixChart', noCache: true}}
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: '综合实例',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: Layout,
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          {path: 'dynamic-table', component: Layout, name: 'dynamicTable', meta: {title: 'dynamicTable'}},
          {path: 'drag-table', component: Layout, name: 'dragTable', meta: {title: 'dragTable'}},
          {path: 'inline-edit-table', component: Layout, name: 'inlineEditTable', meta: {title: 'inlineEditTable'}},
          {path: 'complex-table', component: Layout, name: 'complexTable', meta: {title: 'complexTable'}}
        ]
      },
      {path: 'tab/index', icon: 'tab', component: Layout, name: 'tab', meta: {title: 'tab'}}
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: '表单',
      icon: 'form'
    },
    children: [
      {path: 'create-form', component: Layout, name: 'createForm', meta: {title: 'createForm', icon: 'table'}},
      {path: 'edit-form', component: Layout, name: 'editForm', meta: {title: 'editForm', icon: 'table'}}
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [
      {path: '401', component: Layout, name: 'page401', meta: {title: 'page401', noCache: true}},
      {path: '404', component: Layout, name: 'page404', meta: {title: 'page404', noCache: true}}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{path: 'log', component: Layout, name: 'errorLog', meta: {title: '错误日志', icon: 'bug'}}]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {path: 'export-excel', component: Layout, name: 'exportExcel', meta: {title: 'exportExcel'}},
      {path: 'export-selected-excel', component: Layout, name: 'selectExcel', meta: {title: 'selectExcel'}},
      {path: 'upload-excel', component: Layout, name: 'uploadExcel', meta: {title: 'uploadExcel'}}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    children: [{path: 'download', component: Layout, name: 'exportZip', meta: {title: 'zip', icon: 'zip'}}]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{path: 'index', component: Layout, name: 'theme', meta: {title: '换肤', icon: 'theme'}}]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{
      path: 'index',
      component: Layout,
      name: 'clipboardDemo',
      meta: {title: 'clipboardDemo', icon: 'clipboard'}
    }]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{path: 'index', component: Layout, name: 'i18n', meta: {title: '国际化', icon: 'international'}}]
  },

  {path: '*', redirect: '/404', hidden: true}
]
