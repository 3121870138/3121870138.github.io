import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/config/routes';
import AuthGuard from '@/components/AuthGuard';
import ErrorBoundary from '@/layouts/ErrorBoundary';
// 全局加载态组件
const Loading = () => <div>Loading...</div>;
const RouterView = () => {
  const element = useRoutes(
    routes.map(route => ({
      ...route,
      element: (
        <>
          {/* //  <AuthGuard 
          //     requiredAuth={route.meta?.requiredAuth}
          //     permissions={route.meta?.permissions}
          //   > */}
              {route.element}
            {/* </AuthGuard> */}
            </>
      ),
      children: route.children // 自动处理嵌套路由
    }))
  );

  return element;
  // console.log('🚀 ~ RouterView ~ element:', element)

};
// console.log('🚀 ~ RouterView:', RouterView)

export default RouterView;
