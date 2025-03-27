import { lazy } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

// 路由通用配置结构
const routes = [
  {
    path: '/',
    element: lazy(() => import('@/layouts/MainLayout')), // 布局组件
    meta: {
      hideInMenu: true // 不在菜单显示
    },
    children: [
      {
        path: 'home',
        element: lazy(() => import('@/pages/Home')),
        meta: {
          label: '首页',
          icon: <HomeOutlined />,
          requiredAuth: false // 无需登录
        }
      },
      {
        path: 'user',
        meta: { label: '用户中心', icon: <UserOutlined /> },
        children: [
          {
            path: 'profile',
            element: lazy(() => import('@/pages/User/Profile')),
            meta: { label: '个人资料' }
          },
          {
            path: 'settings',
            element: lazy(() => import('@/pages/User/Settings')),
            meta: { 
              label: '账户设置',
              requiredAuth: true,
              permissions: ['admin'] // 需要admin权限
            }
          }
        ]
      }
    ]
  }
];

export default routes;
