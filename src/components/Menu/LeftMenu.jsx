// src/components/LeftMenu.jsx
import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '@/config/routes';
import { useAuth } from '@/contexts/AuthContext';

// 递归处理路由配置生成菜单项
const generateMenuItems = (routes, parentPath = '') => {
  // const { hasPermission } = useAuth();
  
  return routes.reduce((items, route) => {
    // 过滤隐藏项和权限不足的项
    // if (route.meta.hideInMenu || !hasPermission(route.roles)) return items;
    if (route.meta.hideInMenu) return items;
    
    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/');
    
    const menuItem = {
      key: fullPath,
      label: route.meta.label,
      icon: route.meta.icon,
      children: route.children 
        ? generateMenuItems(route.children, fullPath)
        : undefined
    };

    return [...items, menuItem];
  }, []);
};

const LeftMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  // 生成过滤后的菜单项
  const menuItems = generateMenuItems(routes);

  // 根据当前路径设置选中状态
  useEffect(() => {
    const path = location.pathname;
    console.log('🚀 ~ useEffect ~ path:', path)
    setSelectedKeys([path]);
    
    // 自动展开父级菜单
    const keys = path.split('/').filter(Boolean);
    const newOpenKeys = !['home'].includes(keys[0]) ? keys.slice(0, -1).map((_, index) => 
      `/${keys.slice(0, index + 1).join('/')}`
    ) : ['/'];

    setOpenKeys(newOpenKeys)
  }, [location]);

  // 处理菜单点击
  const handleClick = ({ key }) => {
    navigate(key);
  };

  // 处理菜单展开
  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      mode="inline"
      // theme="dark"
      items={menuItems}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onClick={handleClick}
      onOpenChange={handleOpenChange}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default LeftMenu;
