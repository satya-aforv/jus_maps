import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!isUserExists) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return <Outlet />;
};

export default AuthGuard;
