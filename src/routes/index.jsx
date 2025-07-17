import { lazy } from 'react';
import { createBrowserRouter, Navigate, redirect, Route } from 'react-router-dom';
import AuthLayout from '../layout/Auth';
import MainLayout from './MainLayout';
import LoginPage from '../views/auth/login/Login';
import RegisterPage from '../views/auth/register/Register';
import Dashboard from '../layout/Dashboard';
import NotFoundPage from '../views/404/NotFoundPage.jsx'; // Make sure to create this component
import Loadable from 'components/Loadable';

import Profile from '../views/profile/index.jsx';
import RouteAnalysisPage from '../views/route-analysis/index.jsx';
import RouteTable from '../views/routeTable/index.jsx';
import RouteInfo from '../views/RouteInfo.jsx';
const DefaultPages = Loadable(lazy(() => import('views/navigation/dashboard/Default')));

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
        {
          path: '/',
          element: <Dashboard />,
          children: [
            {
              path: '/',
              element: <DefaultPages />
            },
            {
              path: '/profile',
              element: <Profile />
            },
            {
              path: '/routes',
              element: <RouteTable />
            },
            {
              path: '/route-analysis/:id',
              element: <RouteAnalysisPage />
            },
            {
              path: '/route-info/:id',
              element: <RouteInfo />
            }
          ]
        }

        // ...PagesRoutes,
        // ...NavigationRoutes,
        // ...ComponentsRoutes,
        // ...FormsRoutes
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
