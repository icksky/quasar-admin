import { RouteConfig } from 'vue-router'

import Layout from 'src/layouts/main-layout.vue'
import BlankLayout from 'src/App.vue'

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'las la-bars'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    target: '_blank'             the same as <a> link's target attribute
    whitelist: false             whether not required authentication
  }
*/

export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/dashboard/dashboard.vue'),
        meta: {
          title: '控制面板',
          icon: 'las la-tachometer-alt',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/login/login.vue'),
    meta: {
      whitelist: true,
      hidden: true,
    },
  },
  {
    path: '/404',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import('pages/error-pages/404.vue'),
        name: '404',
        meta: { hidden: true },
      },
    ],
  },
  {
    path: '/401',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import('pages/error-pages/401.vue'),
        name: '401',
        meta: { hidden: true },
      },
    ],
  },
  {
    path: '/error-pages',
    name: 'ErrorPages',
    meta: {
      title: '错误页面',
      icon: 'las la-dizzy',
    },
    redirect: '/error-pages/inner/401',
    component: BlankLayout,
    children: [
      {
        path: 'inner',
        component: Layout,
        children: [
          {
            path: '401',
            component: () => import('pages/error-pages/401.vue'),
            name: 'inner401',
            meta: {
              title: '401 (Layout)',
              icon: 'las la-circle',
            },
          },
        ],
      },
      {
        path: '404',
        component: () => import('pages/error-pages/404.vue'),
        meta: {
          title: '404',
          icon: 'las la-circle',
        },
      },
      {
        path: '400',
        component: () => import('pages/error-pages/400.vue'),
        meta: {
          title: '400',
          icon: 'las la-circle',
        },
      },
      {
        path: '500',
        component: () => import('pages/error-pages/500.vue'),
        meta: {
          title: '500',
          icon: 'las la-circle',
        },
      },
    ],
  },
  {
    path: 'https://github.com/icksky/quasar-admin',
    meta: {
      title: '项目地址',
      icon: 'lab la-gitlab',
    },
  },
]

export const asyncRoutes: RouteConfig[] = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/error-pages/404.vue'),
    meta: {
      hidden: true,
      whitelist: true,
    },
  },
]
