import React, { useState, useCallback } from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import routes from '@/config/routes';
import { removeToken } from '@/utils/auth';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // 获取主路由（顶部菜单项）
  const mainRoutes = routes.filter(route => route.path !== '/login');

  // 生成 icon
  const getIcon = (iconName) => {
    if (!iconName) return null;
    try {
      const Icon = require(`@ant-design/icons`)[iconName];
      return Icon ? <Icon /> : null;
    } catch (error) {
      console.error(`Icon ${iconName} not found`);
      return null;
    }
  };

  // 获取当前激活的顶部菜单
  const getActiveTopMenu = useCallback(() => {
    const pathname = location.pathname;
    const findName = '/' + pathname.split('/')[1]
    return mainRoutes.find(route => findName === route.path)?.path || '/';
    // return mainRoutes.find(route => pathname.startsWith(route.path))?.path || '';
  }, [location.pathname]);

  // 获取当前激活的侧边菜单项
  const getActiveSideMenu = useCallback(() => {
    const activeTop = getActiveTopMenu();
    console.log('🚀 ~ getActiveSideMenu ~ activeTop:', activeTop)
    const activeRoute = mainRoutes.find(route => route.path === activeTop);
    return activeRoute?.children || [];
  }, [getActiveTopMenu]);

  // 生成顶部菜单项
  const topMenuItems = mainRoutes.map(route => ({
    key: route.path,
    label: route.name,
    icon: route.icon && getIcon(route.icon)
  }));



  // 生成侧边菜单项
  const sideMenuItems = getActiveSideMenu().map(route => ({
    key: route.path,
    label: route.name,
    icon: route.icon && getIcon(route.icon),
    children: route.children?.map(child => ({
      key: child.path,
      label: child.name,
      icon: child.icon && getIcon(route.icon)
    }))
  }));

  // 处理顶部菜单点击
  const handleTopMenuClick = ({ key }) => {
    const route = mainRoutes.find(r => r.path === key);
    if (route?.children?.length) {
      navigate(route.children[0].path);
    } else {
      navigate(key);
    }
  };

  // 处理侧边菜单点击
  const handleSideMenuClick = ({ key }) => {
    navigate(key);
  };

  // 处理退出登录
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu
            mode="horizontal"
            selectedKeys={[getActiveTopMenu()]}
            items={topMenuItems}
            onClick={handleTopMenuClick}
            style={{ flex: 1 }}
          />
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            style={{ marginRight: 16 }}
          >
            退出登录
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider 
          width={200} 
          collapsed={collapsed}
          collapsible
          trigger={null}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%',
              height: 64,
              borderRadius: 0,
              color: '#fff'
            }}
          />
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={[getActiveTopMenu()]}
            items={sideMenuItems}
            onClick={handleSideMenuClick}
          />
        </Sider>
        <Content style={{ 
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
          borderRadius: 4
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;