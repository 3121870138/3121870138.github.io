
import { Menu } from 'antd';
import renderMenu from '@/components/Menu';
import routes from '@/config/routes';
// 在布局组件中使用
const AppMenu = () => {
  const menuItems = renderMenu(routes);
  return <Menu theme="dark">{menuItems}</Menu>;
};
// 布局组件示例
const BasicLayout = ({ children }) => (
  <div className="layout">
    1111
    {children}
    {/* <AppMenu /> 
    <div className="content">
      {children}
    </div> */}
  </div>
);
export default BasicLayout;