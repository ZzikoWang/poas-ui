// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      redirect: '/user/login',
    },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            // {
            //   path: '/',
            //   redirect: '/user/login',
            // },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/event',
              name: '事件分析',
              icon: 'dashboard',
              routes: [
                {
                  name: '添加事件',
                  icon: 'table',
                  path: '/event/addEvent',
                  component: './AddEvent',
                },
                {
                  name: '事件列表',
                  icon: 'smile',
                  path: '/event/eventAnalyse',
                  component: './ListEvent',
                },
              ],
            },
            {
              path: '/sentiment',
              name: '舆情分析',
              icon: 'dashboard',
              routes: [
                {
                  name: '舆情分析',
                  icon: 'smile',
                  path: '/sentiment/SentimentAnalysis',
                  component: './SentimentAnalysis',
                },
                {
                  name: '舆情列表',
                  icon: 'smile',
                  path: '/sentiment/sentimentList',
                  component: './sentimentList',
                },
                {
                  name: '评论列表',
                  icon: 'smile',
                  path: '/sentiment/CommentList',
                  component: './CommentList',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
