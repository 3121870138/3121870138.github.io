import React from 'react';
import { Outlet } from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import LeftMenu from '@/components/Menu/LeftMenu'
const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <div style={{ padding: '0' }}>
        <Breadcrumb
          style={{ margin: '16px' }}
          items={[
            { title: '首页', href: '/' },
            { title: '详情页' }
          ]}
          separator="/"  // 可选：全局定义分隔符‌:ml-citation{ref="5,8" data="citationList"}
        />
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <LeftMenu />
            {/* <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            /> */}
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {/* 子路由内容将在此处渲染 */}
            <Outlet />
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default MainLayout;