import { Navigate, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');

  if (!isUserExists) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      {/* Your main layout structure */}
      <Outlet /> {/* This renders the child routes */}
    </div>
  );
};

export default MainLayout;
