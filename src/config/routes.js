// const MainLayout = lazy(() => import("../layouts/MainLayout"));
// const MainLayout = lazy(() => import("../components/Layout/index.jsx"));
// const HomePage = lazy(() => import("../pages/HomePage"));
// const Profile = lazy(() => import("../pages/User/Profile"));
// const Settings = lazy(() => import("../pages/User/Settings"));
// const Login = lazy(() => import("../pages/Login"));


// 路由通用配置结构
// const routes = [
//   {
//     path: 'login',
//     component: 'Login',
//     meta: { label: '登录', requiredAuth: false, hideInMenu: true }
//   },
//   {
//     path: '/',
//     component: 'MainLayout', // 布局组件
//     meta: {
//       label: '首页',
//       icon: <HomeOutlined />
//     },
//     children: [
//       {
//         index: true, // 标记为默认路由
//         meta: {
//           hideInMenu: true // 不在菜单显示
//         },
//         component: <Navigate to="/home" replace /> // 自动跳转到 /home
//       },
//       {
//         path: 'home',
//         component: <HomePage/>,
//         meta: {
//           label: '首页DDD',
//           requiredAuth: false // 无需登录
//         }
//       }
//     ]
//   },
//   {
//     path: 'user',
//     component: <MainLayout />, // 布局组件
//     meta: { label: '用户中心', icon: <UserOutlined /> },
//     children: [
//       {
//         path: 'profile',
//         component: <Profile />,
//         meta: { label: '个人资料' }
//       },
//       {
//         path: 'settings',
//         component: <Settings />,
//         meta: { 
//           label: '账户设置',
//           requiredAuth: true,
//           permissions: ['admin'] // 需要admin权限
//         }
//       }
//     ]
//   }
// ];
// const routes = [
//   {
//     path: '/login',
//     component: 'Login',
//     meta: { label: '登录', requiredAuth: false, hideInMenu: true }
//   },
//   {
//     path: '/',
//     layout: 'MainLayout', // 布局组件
//     meta: {
//       label: '首页',
//       icon: <HomeOutlined />
//     },
//     children: [
//       {
//         path: '/home',
//         component: 'HomePage',
//         meta: {
//           label: '首页DDD',
//           requiredAuth: false // 无需登录
//         }
//       }
//     ]
//   },
//   {
//     path: 'user',
//     layout: 'MainLayout', // 布局组件
//     meta: { label: '用户中心', icon: <UserOutlined /> },
//     children: [
//       {
//         path: 'profile',
//         component: 'Profile',
//         meta: { label: '个人资料' }
//       },
//       {
//         path: 'settings',
//         component: 'Settings',
//         meta: { 
//           label: '账户设置',
//           requiredAuth: true,
//           permissions: ['admin'] // 需要admin权限
//         }
//       }
//     ]
//   }
// ];
const routes = [
  // 登录页面
  {
    path: '/login',
    component: 'Login',
    layout: false // 不使用布局
  },
  // 顶部菜单 - 系统管理
  {
    path: '/',
    name: '主页',
    redirect: '/dashboard',
    component: 'Home/About',
    children: [
      {
        path: '/dashboard',
        name: '首页',
        component: 'Home/About',
        layout: 'BasicLayout'
      },{
        path: '/About2',
        name: '关于2',
        component: 'Home/About2'
      }
    ]
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'SettingOutlined',
    children: [
      // 左侧菜单
      {
        path: '/system/user',
        name: '用户管理',
        component: 'System/User'
      },
      {
        path: '/system/role',
        name: '角色管理',
        component: 'System/Role',
        // 可以指定自定义布局
        // layout: 'CustomLayout'
      }
    ]
  },
  // 顶部菜单 - 数据中心
  {
    path: '/data',
    name: '数据中心',
    icon: 'DatabaseOutlined',
    component: 'Data',
    children: [
      {
        path: '/data/analysis',
        name: '数据分析',
        component: 'Data/Analysis'
      },
      {
        path: '/data/analysis2',
        name: '数据分析2',
        component: 'Data/Analysis2'
      }
    ]
  }
]

export default routes;