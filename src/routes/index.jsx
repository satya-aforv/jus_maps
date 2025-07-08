import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import AuthLayout from '../layout/Auth';
import MainLayout from './MainLayout';
import LoginPage from '../views/auth/login/Login';
import RegisterPage from '../views/auth/register/Register';
import Dashboard from '../layout/Dashboard';
import NotFoundPage from '../views/404/NotFoundPage.jsx'; // Make sure to create this component

// project-imports
import PagesRoutes from './PagesRoutes';
import NavigationRoutes from './NavigationRoutes';
import ComponentsRoutes from './ComponentsRoutes';
import FormsRoutes from './FormsRoutes';
import TablesRoutes from './TablesRoutes';
import ChartMapRoutes from './ChartMapRoutes';
import OtherRoutes from './OtherRoutes';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      loader: () => {
        const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (!isUserExists) {
          return redirect('/auth/login');
        }
        return null;
      },
      children: [
        { index: true, element: <Dashboard /> }
        // ...PagesRoutes,
        // ...NavigationRoutes,
        // ...ComponentsRoutes,
        // ...FormsRoutes,
        // ...TablesRoutes,
        // ...ChartMapRoutes,
        // ...OtherRoutes
      ]
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> }
      ]
    },
    {
      path: '*',
      element: <NotFoundPage /> // 404 handler
    }
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME
  }
);

export default router;
