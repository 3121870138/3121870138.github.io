import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/config/routes';
import AuthGuard from '@/components/AuthGuard';

const RouterView = () => {
  const element = useRoutes(
    routes.map(route => ({
      ...route,
      element: (
        <Suspense fallback={<>加载中...</>}>
          <AuthGuard 
            requiredAuth={route.meta?.requiredAuth}
            permissions={route.meta?.permissions}
          >
            {route.element}
          </AuthGuard>
        </Suspense>
      ),
      children: route.children // 自动处理嵌套路由
    }))
  );

  return element;
};
export default RouterView;