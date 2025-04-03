export const hasPermission = (permissions) => {
  // const { userRoles } = useAuth();
  // // 无权限要求 或 满足任一权限
  // return !permissions || permissions.some(p => userRoles.includes(p));
  return true;
};

const TOKEN_KEY = 'admin_token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  return !!getToken();
};