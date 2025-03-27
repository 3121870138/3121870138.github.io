// src/router/index.jsx
import React, { lazy } from "react";

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"; // 主布局
import NotFound from "../layouts/NotFound";

// import HomePage from "../pages/HomePage";
// import AboutPage from "../pages/AboutPage";
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));

const routers = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]


// const generateMenuItems = (routes) => {
//   return routes.map(route => ({
//     path: route.path,
//     icon: React.createElement(require(`@ant-design/icons`)[route.icon]),
//     label: route.label,
//     children: route.children ? generateMenuItems(route.children) : null
//   }));
// };

// const preloadComponent = (loader) => {
//   const component = loader();
//   return component;
// };
// preloadComponent(() => import('./pages/Checkout'));  // ‌:ml-citation{ref="5" data="citationList"}


// const menuData = generateMenuItems(routers);
// console.log('🚀 ~ menuData:', menuData)

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 布局组件包裹所有子路由
    children: routers.map(route => ({
      path: route.path,
      element: route.element // || preloadComponent(lazy(() => import(route.component)))
    }))
  },
  {
    path: "*",
    element: <NotFound />,
  },
  // {
  //   path: "/admin",
  //   element: <AdminLayout />, // 管理后台布局
  //   children: [
  //     { path: "dashboard", element: <Dashboard /> },
  //     { path: "users", element: <UserList /> }
  //   ]
  // }
]);
console.log('🚀 ~ router:', router)

export default router;
