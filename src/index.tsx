import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Outlet, RouterProvider, useRoutes } from 'react-router-dom';
import AboutPage from './pages/About';
import ErrorPage from './pages/Error';
import ThemesPage from './pages/Themes';
import UserProfilePage from './pages/UserProfile';
import NavigationBar from './components/NavigationBar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginProcessPage from './pages/LoginProcess';
import TermsOfService from './pages/terms';

const routes = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login/process',
    element: <LoginProcessPage />,
  },
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/themes',
        element: <ThemesPage />,
      },
      {
        path: '/terms-of-service',
        element: <TermsOfService />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute element={<UserProfilePage />} />,
      },
    ],
  },
];

function NavbarWrapper() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
