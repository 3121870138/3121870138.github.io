import { NavLink } from 'react-router-dom';
import { Menu, SubMenu, MenuItem } from 'antd';
import { hasPermission } from '@/utils/auth'; // 权限校验方法

const renderMenu = (routes, parentPath = '') => {
  return routes.filter(route => {
    // 过滤隐藏项 & 检查权限
    return !route.meta?.hideInMenu && 
           hasPermission(route.meta?.permissions)
  }).map(route => {
    const fullPath = `${parentPath}/${route.path.replace(/^\//, '')}`;

    return (
      <SubMenu 
        key={fullPath}
        icon={route.meta?.icon}
        title={route.meta?.label}
      >
        {route.children ? (
          renderMenu(route.children, fullPath) // 递归处理子路由
        ) : (
          <MenuItem key={fullPath}>
            <NavLink to={fullPath}>{route.meta?.label}</NavLink>
          </MenuItem>
        )}
      </SubMenu>
    );
  });
};

// 在布局组件中使用
// const AppMenu = () => {
//   const menuItems = renderMenu(routes);
//   return <Menu theme="dark">{menuItems}</Menu>;
// };

export default renderMenu;