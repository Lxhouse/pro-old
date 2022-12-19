import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
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
      name: '公告管理',
      path: '/entertainment',
      component: './Entertainment',
    },
  ],
  npmClient: 'yarn',
});
