import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Profile = lazy(() => import("../pages/User/Profile"));
const Settings = lazy(() => import("../pages/User/Settings"));


// 路由通用配置结构
const routes = [
  {
    path: '/',
    element: <MainLayout />, // 布局组件
    meta: {
      label: '首页',
      icon: <HomeOutlined />
    },
    children: [
      {
        index: true, // 标记为默认路由
        meta: {
          hideInMenu: true // 不在菜单显示
        },
        element: <Navigate to="/home" replace /> // 自动跳转到 /home
      },
      {
        path: 'home',
        element: <HomePage/>,
        meta: {
          label: '首页DDD',
          requiredAuth: false // 无需登录
        }
      }
    ]
  },
  {
    path: 'user',
    element: <MainLayout />, // 布局组件
    meta: { label: '用户中心', icon: <UserOutlined /> },
    children: [
      {
        path: 'profile',
        element: <Profile />,
        meta: { label: '个人资料' }
      },
      {
        path: 'settings',
        element: <Settings />,
        meta: { 
          label: '账户设置',
          requiredAuth: true,
          permissions: ['admin'] // 需要admin权限
        }
      }
    ]
  }
];

export default routes;
