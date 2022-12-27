import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '管理员后台系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '登录',
      path: '/home',
      layout: false,
      component: './Login',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
    {
      name: '用户管理',
      path: '/info',
      component: './Info',
    },
    {
      name: '老人管理',
      path: '/user',
      component: './User',
    },
    {
      name: '文章管理',
      path: '/science',
      component: './Science',
    },
    {
      name: '社区管理',
      path: '/entertainment',
      component: './Entertainment',
    },
    {
      name: '药品管理',
      path: '/drug',
      component: './drug',
    },
  ],
  npmClient: 'yarn',
});
