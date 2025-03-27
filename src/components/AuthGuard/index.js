import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthGuard = ({ children, requiredAuth, permissions }) => {
  const { isLoggedIn, userRoles } = useAuth();
  const location = useLocation();

  if (requiredAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (permissions && !permissions.some(p => userRoles.includes(p))) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default AuthGuard;