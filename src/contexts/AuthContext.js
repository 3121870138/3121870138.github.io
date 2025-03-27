// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 创建上下文对象
const AuthContext = createContext({
  isLoggedIn: false,
  userRoles: [],
  isLoading: true,
  login: () => {},
  logout: () => {},
  hasPermission: () => false
});

// 2. 创建Provider组件
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userRoles: [],
    isLoading: true
  });

  // 初始化时检查本地token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // 模拟解析JWT获取角色
      const mockRoles = ['user']; // 实际项目替换为真实解析逻辑
      setAuthState({
        isLoggedIn: true,
        userRoles: mockRoles,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // 登录方法
  const login = async (credentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 实际项目替换为真实登录逻辑
    localStorage.setItem('authToken', 'mock_token');
    setAuthState({
      isLoggedIn: true,
      userRoles: ['user'], // 可动态设置角色
      isLoading: false
    });
    navigate('/');
  };

  // 注销方法
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      isLoggedIn: false,
      userRoles: [],
      isLoading: false
    });
    navigate('/login');
  };

  // 权限校验方法
  const hasPermission = (requiredRoles = []) => {
    if (!requiredRoles.length) return true;
    return authState.userRoles.some(role => 
      requiredRoles.includes(role)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3. 创建自定义hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内使用');
  }
  return context;
};



// 登录组件示例
// function LoginPage() {
//   const { login } = useAuth();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login({ username: 'test', password: 'test' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">登录</button>
//     </form>
//   );
// }


// 在useEffect中添加token刷新逻辑
// useEffect(() => {
//   const refreshToken = setInterval(() => {
//     if (authState.isLoggedIn) {
//       // 执行token刷新逻辑
//     }
//   }, 55 * 60 * 1000); // 每55分钟刷新
  
//   return () => clearInterval(refreshToken);
// }, [authState.isLoggedIn]);



// 扩展hasPermission方法
// const hasPermission = (required) => {
//   if (typeof required === 'function') {
//     return required(authState.userRoles);
//   }
//   return required.some(role => authState.userRoles.includes(role));
// };

// // 使用函数式校验
// hasPermission(roles => roles.includes('admin'))
