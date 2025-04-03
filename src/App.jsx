import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '@/config/routes';
import MainLayout from '@/components/Layouts/MainLayout';
import { isLogin } from '@/utils/auth.js'

const App = () => {
  // 懒加载组件
  const lazyLoad = (componentPath) => {
    const Component = React.lazy(() => import(`@/pages/${componentPath}`));
    return (
      <Suspense fallback={<div>加载中...</div>}>
        <Component />
      </Suspense>
    );
  };

  // 路由守卫组件
  const AuthRoute = ({ element }) => {
    return isLogin() ? element : <Navigate to="/login" replace />;
  };

  // 递归生成路由
  const generateRoutes = (routes) => {
    return routes.map(route => {
      if (route.path === '/login') {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={lazyLoad(route.component)}
          />
        );
      }

      if (route.children) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthRoute
                element={<MainLayout />}
              />
            }
          >
            {/* 默认重定向到第一个子路由 */}
            <Route 
              index 
              element={<Navigate to={route.children[0].path} replace />} 
            />
            {/* 生成子路由 */}
            {route.children.map(child => (
              <Route
                key={child.path}
                path={child.path.replace(route.path + '/', '')}
                element={lazyLoad(child.component)}
              />
            ))}
          </Route>
        );
      }

      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthRoute
              element={lazyLoad(route.component)}
            />
          }
        />
      );
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        {generateRoutes(routes)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;